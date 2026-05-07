# 08 — Adaptive Learning Engine

## Cilj

Algoritmi koji biraju "pravo pitanje u pravo vreme" za svako dete, sa balansom: izazov + samopouzdanje + spaced repetition.

---

## 1. Problem

Naivno biranje pitanja (random) ima problema:
- Lako pitanje: dete se dosađuje
- Pretežak: dete se obeshrabri i odlazi
- Ponavljanje: dete pamti odgovore napamet, ne uči
- Ne pokriva slabe oblasti: dete vežba isto što već zna

**Cilj algoritma**: maksimizirati učenje + retenciju + zabavu istovremeno.

---

## 2. Glavni input signali

### 2.1. Po pitanju (granularno)

- `attemptHistory[userId, questionId]`: `{ correctCount, incorrectCount, lastSeenAt, avgTimeMs }`
- `globalDifficulty[questionId]`: izvedeno iz svih korisnika (početni `level` field, kalibrira se sa vremenom)
- `chapterAccuracy[userId, chapterId]`: trenutno znanje oblasti

### 2.2. Po sesiji

- `recentMistakes[userId]`: poslednji 20 grešaka — koje oblasti
- `lastSeenQuestions[userId]`: poslednjih 50 pitanja koje je dete videlo
- `currentStreak[userId]`: koliko tačnih unutar tekuće sesije (lokalna serija)

### 2.3. Po cilju

- `userGoal`: "general practice" | "weakness focus" | "exam prep" (Sprint mode)
- `urgency`: za 8. razred bliže maturi = veći fokus na slabim oblastima

---

## 3. Algoritmi po sesiji

### 3.1. Quick session (5 pitanja)

**Cilj**: Brz dnevni warmup, drži streak, pokrije par oblasti.

**Algoritam**:
```
1. Identifikuj 3 slabije oblasti (chapterAccuracy < 70%)
2. Identifikuj 2 jače oblasti (chapterAccuracy >= 70%)
3. Selektuj:
   - 3 pitanja iz slabih (1 po oblasti, balansirano)
   - 2 pitanja iz jačih (drži samopouzdanje)
4. Filtriraj: ne pitanja viđena u poslednjih 24h
5. Filtriraj: ne pitanja sa attemptCount > 3 i correctCount > 2 (već naučio)
6. Sortiraj: najteže prvo, lakše na kraju (ostavi pozitivan finish)
```

**Pseudocode**:
```typescript
async function selectQuickSession(userId: ObjectId): Question[] {
  const user = await User.findById(userId);
  const userGrade = user.grade;
  
  // Get recent answer history
  const recentAnswers = await Answer.find({
    userId,
    answeredAt: { $gte: thirtyDaysAgo() }
  }).limit(500);
  
  // Compute chapter accuracy
  const chapterStats = computeChapterStats(recentAnswers);
  
  // Sort chapters by accuracy
  const weakChapters = chapterStats
    .filter(c => c.attempts >= 5 && c.accuracy < 0.7)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);
  
  const strongChapters = chapterStats
    .filter(c => c.accuracy >= 0.7)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5);
  
  // If no history, fallback to grade-level chapters
  if (weakChapters.length === 0) {
    return await getRandomQuestionsForGrade(userGrade, 5);
  }
  
  // Pick from weak (3) + strong (2)
  const weakQuestions = await selectFromChapters(weakChapters.slice(0, 3), 1);
  const strongQuestions = await selectFromChapters(strongChapters.slice(0, 2), 1);
  
  return shuffle([...weakQuestions, ...strongQuestions]);
}
```

### 3.2. Standard session (15 pitanja)

**Cilj**: Dublja vežba, više mešanja.

**Distribucija**:
- 9 iz slabih oblasti (60%)
- 4 iz srednjih (50-70% accuracy, 27%)
- 2 iz jakih (drže samopouzdanje, 13%)

**Plus**:
- Ubaci 2-3 pitanja iz **spaced repetition** queue-a (vidi 5)

### 3.3. Marathon session (50 pitanja)

**Cilj**: Pregled celog programa za razred.

**Distribucija**:
- Pokrije sve oblasti razreda barem 1 pitanjem
- Više pitanja iz oblasti gde imaš manje istorije

### 3.4. Mixed mode (default ako user ne bira)

Backend bira "smart default":
- Ako je dete <5. razreda: quick (5 pitanja, 3 min) — drži angažman
- Ako je 8. razred i Sprint aktivan: standard (15 pitanja, 10 min) — više pripreme
- Inače: quick

---

## 4. Težina pitanja

### 4.1. Statička težina (level field)

Ima 3 nivoa: E (Easy), M (Medium), H (Hard). Iz baze.

**Distribucija u sesiji**:
- Quick: 1 H, 3 M, 1 E (ostaje izazov, balansirana)
- Standard: 3 H, 9 M, 3 E
- Marathon: 10 H, 30 M, 10 E

### 4.2. Dinamička težina (kalibracija)

Posle 100 odgovora po pitanju, izračunavamo:

```
difficultyScore = (1 - totalCorrect/totalAnswered) * 100
```

| Score | Klasifikacija | Koristi se kao |
|---|---|---|
| 0-25 | Vrlo lako | Boost confidence |
| 25-50 | Lako | Standard practice |
| 50-75 | Srednje | Default |
| 75-90 | Teško | Challenge |
| 90+ | Vrlo teško | Sprint advanced |

**Reklasifikacija**: ako je `difficultyScore` značajno različit od `level` (npr. pitanje označeno kao H ima score 30), ažurira se za buduće selekcije.

### 4.3. Pitanje-težina-progresija u sesiji

Unutar 1 sesije:
- Prvi 1-2 pitanja: lakša (warm up, daj samopouzdanje)
- Sredina (3-12 u standard sesiji): mešovito (challenge)
- Poslednje 1-2: lakše (završi pozitivno, "skoro savršeno!")

---

## 5. Spaced repetition

### 5.1. Modifikovan SM-2 algoritam

Klasičan **SuperMemo SM-2** za jezike, prilagođen za naš slučaj:

```typescript
interface ReviewSchedule {
  questionId: ObjectId;
  userId: ObjectId;
  easiness: number;       // 1.3 - 2.5+
  interval: number;       // dani do sledeće
  repetitions: number;    // koliko puta tačno za redom
  nextReview: Date;
}

function updateSchedule(prev: ReviewSchedule, quality: 0|1|2|3|4|5): ReviewSchedule {
  // quality: 0-2 = neuspešno, 3-5 = uspešno
  let { easiness, interval, repetitions } = prev;
  
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * easiness);
    repetitions += 1;
  }
  
  easiness = Math.max(1.3, easiness + (0.1 - (5-quality) * (0.08 + (5-quality) * 0.02)));
  
  return {
    ...prev,
    easiness,
    interval,
    repetitions,
    nextReview: new Date(Date.now() + interval * 24 * 60 * 60 * 1000)
  };
}
```

### 5.2. Quality mapping (od user response)

- Tačan odgovor + brz (<10s): quality 5
- Tačan + normalno (10-30s): quality 4
- Tačan + spor (>30s): quality 3
- Pogrešan + brz (sumnjivo): quality 1
- Pogrešan + normalno: quality 2
- Pogrešan + spor (probao da misli): quality 2

### 5.3. Implementacija

Posle svakog odgovora, ažuriraj `reviewSchedule` za to pitanje. Pri sledećem session selection-u:
- Pitanja sa `nextReview <= today` ulaze u "due" pool
- Daj prioritet "due" pitanjima u standard/marathon sesijama (do 3-5 ubacenih po sesiji)

### 5.4. Edge cases

- Prvi put video pitanje: easiness = 2.5, interval = 0 (tačan = sledeći put za 1 dan, pogrešan = ponovo)
- "Already mastered" (3+ tačnih za redom, easiness > 2.5): ne pokazuj 30+ dana
- "Burn out" prevention: maks 5 review pitanja po sesiji

---

## 6. Greška recovery

### 6.1. Dete pogreši pitanje

**Trenutno**:
- Crveni X, AI objašnjenje
- "Hajde da vidimo zašto..."

**Sledeća sesija**:
- Isto pitanje se ne pojavljuje (24h cooldown da spreči pamćenje na osnovu greške)
- Ali isti `chapter` može biti ciljano (ako je slab)

**Sledeća nedelja**:
- Ako je još slab u oblasti: ponovo to pitanje (sa varijacijom u redosledu odgovora)
- Sa drugačijim AI objašnjenjem (drugi pristup)

### 6.2. Eskalacija ako 3 puta pogrešno

- Posle 3 grešaka istog pitanja:
  - Označi `userQuestionState: "struggling"`
  - Roditelj dobija u nedeljnom izveštaju: "Marko ima poteškoća sa razlomcima — možda 5 minuta zajedno?"
  - Sledeća sesija pokušava lakše varijante iz iste oblasti

---

## 7. Spremnost-skor (Readiness) — za Sprint

### 7.1. Definicija

`readiness` je broj 0-100 koji procenjuje "šanse da prođe malu maturu sa min 50 poena (od 100)".

### 7.2. Kalkulacija (faktori)

```
readiness = weighted_avg(
  matematika_score: 0.25,
  srpski_score: 0.25,
  kombinovani_score: 0.50  // 5 predmeta razdeljeno
)
```

Gde svaki `score` je weighted average accuracy preko relevantnih oblasti.

### 7.3. Mock test integration

Kada dete uradi mock test:
- Mock score (0-100) ima veliki uticaj (40%)
- Ostalih 60% ostaje iz dnevne vežbe accuracy

```
readiness = 0.4 * mockTestAvg + 0.6 * dailyAccuracyAvg
```

Najnoviji mock test ima veću težinu nego stari.

### 7.4. Update frekvencija

- Posle svake sesije: lazy recompute
- Prikazuje se u home screenu i u roditeljskom dashbord-u
- Trend: "Pre 2 nedelje 47%, sad 56% (+9%)"

### 7.5. Plan compliance

Sprint plan = 30 min/dan, 5 dana/nedelje, kompletan kroz 90 dana.

Login frequency > 70% se prati za internu metriku — koristi se za:
- Roditeljski izveštaj ("dete prati plan dobro")
- AI coach prilagođavanje (ako padne, coach predlaže lakše ciljeve)

---

## 8. AI explanation engine

### 8.1. Triggeri

AI objašnjenje se generiše:
- Kad user pogreši pitanje (basic explanation)
- Kad user klikne "Objasni mi više" (detailed, samo za Sprint)
- Lazy, jednom po pitanju, keširano zauvek

### 8.2. Prompt template (basic)

```
Sistem: Ti si profesor srpske osnovne škole. Objasni jednostavno, prijateljski, za dete uzrasta {grade} razred.

Pitanje: {question.title}
Tačan odgovor: {question.correctAnswer}
Pogrešni odgovori: {wrongAnswers}

Korisnik je odabrao: {selectedAnswer}

Napiši:
1. Kratko objašnjenje zašto je tačan odgovor tačan (max 50 reči)
2. Zašto je korisnik verovatno pogrešio (max 30 reči)
3. Tip ili savet kako da zapamti (max 30 reči)

Format: jednostavan tekst, ne Markdown. Latinica.
```

### 8.3. Prompt template (detailed, Sprint)

```
Sistem: Ti si profesor srpske osnovne škole. Pripremi dete za malu maturu.

Pitanje: ...

Napiši:
1. Detaljno objašnjenje principa (100-150 reči)
2. 2 slična zadatka sa rešenjima
3. Tip kako da zapamti
4. Tipičnu grešku koju deca prave

Format: Markdown. Latinica.
```

### 8.4. Cache strategy

- Generiši jednom po `(questionId, type)` paru
- Cache zauvek u `aiExplanations` collection
- Verifikacija: educator-konsultant pregleda nedeljno top 50 najpopularnijih objašnjenja, flag-uje pogrešne

### 8.5. Fallback ako LLM ne radi

- Backup model (Gemini Flash ako Groq ne radi)
- Static fallback: "Tačan odgovor je {correctAnswer}. {chapter.description ili generic}."
- Posle 24h, ponovi pokušaj generisanja

### 8.6. Ekonomika

- 8.428 pitanja × ~2KB po objašnjenju ≈ 17 MB ukupno (zanemarljivo)
- Generisanje: 8.428 × ~500 input tokens × ~$1/M = ~$4 (jednom)
- Re-generacija (npr. ako menjamo prompt): isto, jednom
- Per-user trošak: 0 (cache hit)

**Zaključak**: AI objašnjenja su **fixed cost**, ne variable, posle prve generacije.

---

## 9. "Smart" intervencije

### 9.1. Detekcija stagnacije

Ako user igra 14 dana ali `readiness` ne raste:
- Notifikacija: "Hajde da pređemo na druge oblasti"
- Smart switch: predlog drugog predmeta

### 9.2. Detekcija "izgaranja"

Ako user igra >2h u danu, više dana zaredom:
- Push: "Vreme za pauzu! Vraćaš se sutra još bolji"
- Možda i blokada za taj dan (paternal model)

### 9.3. Detekcija "kondicije"

Ako user igra 7+ dana ali sa sve manje pitanja po sesiji:
- Mičemo na lakše pitanja par dana (rebuild confidence)

---

## 10. Predikcija — readiness forecast

### 10.1. Linear trend

Ako readiness raste 1% po nedelji u proseku:
- Forecast: za 12 nedelja (Sprint period) = +12% readiness
- Tako prezentujemo roditelju: "Sa Sprint planom, Marko može doći do 80% za 12 nedelja"

### 10.2. Realistični target za marketing

- Nikad ne obećavamo "savršen rezultat"
- "60-80% spremnosti za maturu" = realan target
- Predvidjenu ocenu prikazujemo kao **range** ("62-72/100") sa konfidencijom — ne kao garanciju
- Nikad ne koristimo reči "garantujemo" ili "obećavamo" oko ocene

---

## 11. Implementacioni red

### 11.1. Faza 1 (MVP)

- Naivni random select (ne adaptive)
- Po grade-u i predmetu
- Bez spaced repetition

### 11.2. Faza 2 (Beta)

- Quick session adaptive (60/40 weak/strong)
- Basic chapter accuracy tracking
- Random unutar oblasti

### 11.3. Faza 3 (Public)

- Standard + marathon adaptive
- Spaced repetition (SM-2)
- Difficulty calibration

### 11.4. Faza 4 (Sprint)

- Readiness score
- Personalized weekly plans
- AI prediction integration

---

## 12. Otvorena pitanja

- [ ] Da li dodajemo "review mode" kao posebnu sesiju (samo spaced rep due pitanja)? **Preporuka: DA u Faze 4, kao "Pregled"**.
- [ ] Da li naprijavljujemo decu kad ne rade dovoljno? **Preporuka: ne. Samo info roditelju nedeljno.**
- [ ] Da li ML model za predikciju u v2/v3? **Možda u Y3 ako podaci pokažu da rule-based nije dovoljan**.
