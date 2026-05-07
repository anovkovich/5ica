# 09 — Content Pipeline

## Cilj

Životni ciklus pitanja: import → validacija → AI objašnjenja → moderacija → kontinuirano poboljšavanje.

---

## 1. Trenutno stanje sadržaja

| Resurs | Količina | Status |
|---|---|---|
| Pitanja | 8.428 | Imported, mapped |
| Predmeti | 14 | Mapped |
| Klase (predmet × razred) | 58 | Mapped sa confidence |
| Poglavlja | 298 | Imenovana |
| AI objašnjenja | 0 | Treba generisanje |
| Mock testovi | 0 | Treba kreiranje |
| Slike u pitanjima | 0 | V1 nema |

---

## 2. Import pitanja (jednom-i-gotovo)

### 2.1. Skripta

`scripts/import-questions.ts` — uzima 4 JSON-a (`subjects`, `classes`, `chapters`, `my_questions`) i upisuje u MongoDB.

### 2.2. Validacija pri import-u

Za svako pitanje:

**Strict checks (fail import)**:
- `title` and `titleLat` postoje, nisu prazni
- `correctAnswer` and `correctAnswerLat` postoje
- Tačno 2 ili 3 pogrešna odgovora
- `level` je u {E, M, H}
- `subjectId`, `classId`, `chapterId` postoje u svojim kolekcijama
- `correctAnswer` ne sadrži duplikat među `wrongAnswers`

**Soft checks (warning)**:
- Dužina `title` < 10 znakova → flag
- Dužina `correctAnswer` > 100 znakova → flag (može biti previše dugačak za UI)
- Dijakritike svuda gde treba (no broken UTF-8)

### 2.3. Idempotentnost

Skripta upsertuje po `legacyId`. Ako se ponovo pokrene, postojeća pitanja se ažuriraju, ne dupliciraju.

### 2.4. Run komanda

```bash
pnpm db:import-questions
```

**Ne pokreće se u produkciji posle inicijalnog**. Treba flag `--allow-prod` za bezbednost.

---

## 3. AI objašnjenja — generisanje

### 3.1. Bulk generisanje (jednom-i-gotovo, 1-2 sata trajanja)

Skripta `scripts/generate-ai-explanations.ts`:

```typescript
async function generateAll() {
  const questions = await Question.find({ active: true });
  
  for (const q of questions) {
    if (await AiExplanation.exists({ questionId: q._id })) continue;
    
    try {
      const basic = await generateBasicExplanation(q);
      const detailed = await generateDetailedExplanation(q);
      
      await AiExplanation.create({
        questionId: q._id,
        basicExplanation: basic,
        detailedExplanation: detailed,
        verified: false,
      });
      
      await sleep(100); // rate limiting
    } catch (err) {
      console.error(`Failed for ${q._id}:`, err);
      // Continue, retry later
    }
  }
}
```

### 3.2. Provider strategija

**Primary**: Groq Llama 3.3 70B (free, brz, dovoljno kvalitetan za srpski)
- Limit: 30 requests/min na free tier
- 8.428 pitanja / 30 req/min = ~5 sati za bulk

**Backup**: Google Gemini Flash 2 (free tier)
- Ako Groq pukne ili rate limit hit

**Premium za detaljna**: Anthropic Claude Haiku 4.5 ($1/M)
- Za detailed objašnjenja koristim ovaj zbog kvaliteta

### 3.3. Quality assurance

Nasumice odaberem 100 generisanih objašnjenja. Educator-konsultant pregleda:
- Tačnost (da li je faktički tačno?)
- Jezik (gramatika, srpski idiomi)
- Pristupačnost (dete 5. razreda razume?)

Cilj: <5% grešaka. Ako >5%, refaktoriši prompt i regeneriši.

### 3.4. Iterativno poboljšavanje

User može da klikne "Objašnjenje nije korisno" → flag.

Kad neko objašnjenje ima **>3 not-helpful** flag-ova:
- Stavlja se u admin queue
- Educator pregleda
- Regeneriše ili ručno popravlja

---

## 4. Mock testovi — kreiranje

### 4.1. Format male mature (zvanični)

**Mala matura 2024-2027** (proverajem zvanični standard pre lansiranja):
- 3 testa: matematika, srpski, kombinovani
- Svaki test: 20 zadataka
- Vreme: 120 min po testu
- Bodovanje: 0-20 po testu, 0-60 ukupno

Naš mock format treba da bude **identičan**.

### 4.2. Sastavljanje mock testa

Skripta `scripts/create-mock-test.ts`:

```typescript
async function createMatemMockTest(year: number, n: number) {
  // 20 pitanja matematike, distribuirano:
  // - 6 lakih (level E)
  // - 10 srednjih (level M)
  // - 4 teška (level H)
  // - Pokrije sve glavne oblasti 8. razreda
  
  const easy = await Question.aggregate([
    { $match: { subjectId: matSubjectId, grade: 8, level: 'E' } },
    { $sample: { size: 6 } }
  ]);
  // ... medium, hard
  
  await MockTest.create({
    name: `Matura ${year} — Matematika Mock ${n}`,
    type: 'matematika-mala-matura',
    questions: [...easy, ...medium, ...hard].map((q, i) => ({
      questionId: q._id,
      points: q.level === 'H' ? 2 : 1,
      order: i
    })),
    totalPoints: 24,
    durationMinutes: 120,
    passingScore: 12,
    active: true
  });
}
```

### 4.3. Brojevi mock testova

Sprint paket = **12 mock testova** (po jedan svakih 7 dana tokom 90-dnevnog plana):
- 4 matematike
- 4 srpskog
- 4 kombinovana

### 4.4. Iz arhive prošlih ispita?

Idealno: koristiti **prave male mature** iz prošlih godina (Zavod za vrednovanje ih objavljuje).

**Pravne implikacije**: Pre korišćenja, proveriti licencu (verovatno javno dostupne, ali ne sigurno za komercijalnu upotrebu).

**MVP plan**: prvih 12 mockova kreirana iz baze pitanja sa balansom težina. **Y2**: ako pravne provere prođu, dodaj prave male mature kao "ekstra mockovi".

---

## 5. Moderacija pitanja

### 5.1. User-flagged

User klikne "Prijavi grešku":
- Razlog: "Tačan odgovor nije tačan" / "Pitanje nejasno" / "Drugo"
- Tekst opisa
- Submit kreira `flag` na pitanju

### 5.2. Admin queue

Admin panel pokazuje:
- Sva pitanja sa `flagged: true`
- Sortirano po broju flagova (najviše prvo)
- Sample odgovora od korisnika

Admin akcije:
- "Tačno, pitanje je dobro" → unflag
- "Tačan odgovor pogrešan, popravi" → edit + unflag
- "Pitanje nejasno, ukloni" → `active: false`

### 5.3. Auto-flag

Ako pitanje ima `correct rate < 20%` (skoro svi pogađaju) — sumnjivo, auto-flag za pregled.

---

## 6. Regeneracija pitanja (Y2 risk-mitigation)

### 6.1. Zašto

"Pitanja iz nepoznatih izvora" pravna nesigurnost. Kao mitigacija:
- Y2: regenerišemo top 20% najčešće korišćenih pitanja kroz LLM
- Pa polako svih 8.428

### 6.2. Pristup

```
Za svako pitanje koje treba regenerisati:
1. Iskoristi originalno pitanje kao "inspiration"
2. LLM generiše novo pitanje sa istom temom + težinom + tipom
3. Educator-konsultant pregleda
4. Ako prolazi: zameni original sa novim
5. Audit log: stari ID → novi ID
```

### 6.3. Hybrid

Trenutno (Y1): koristimo originale (sa ugovorom o ustupanju autorskih prava od prijatelja).
**Pravna napomena**: pre prvog plaćenog dinara, ima potpisani ugovor.

---

## 7. Slike u pitanjima

### 7.1. V1 odluka

**NEMA slika u v1**. Sve pitanja su tekstualna.

Razlog:
- Trenutni dataset ne sadrži slike
- Slike komplikuju import, storage, copyright
- Mnogi predmeti (matematika, fizika) bi imali koristi, ali nije blocking

### 7.2. V2 plan

Posle 1.000 plaćenih:
- Dodati podršku za `imageUrl` u pitanjima
- Cloudinary storage
- Manuelno dodati slike za top 100 matematičkih i fizičkih pitanja
- Pokriti formule kroz LaTeX rendering

---

## 8. Lokalizacija sadržaja

### 8.1. Ćirilica + latinica

Sva pitanja imaju oba pisma. User bira u settings (default latinica).

### 8.2. Sinonimna pisma

Latinica je default zbog:
- Pravopis je u srpskom standardu na latinici (mlađa generacija)
- Tipkanje je lakše na qwerty
- Internacionalna kompatibilnost (kad se pomera ka regionu)

Ali ćirilica je tradicija — držimo obe.

### 8.3. Regionalne varijante

V1: samo standardni srpski.

V2 (regionalna ekspanzija):
- BiH varijanta (manje vlast Vuk pravopisa)
- CG varijanta (par specifičnih reči)
- Implementacija: pojedinačni override za "regional dialect" field per question

---

## 9. Continuous content quality

### 9.1. Metrike koje pratim

- Per-question accuracy (target: 30-80% — ako je 95%+, prelako, ako je <20%, sumnjivo)
- Per-question avg time (extreme outliers su flagovi)
- "Not helpful" na AI objašnjenja (target: <5%)
- User flagovi (target: <1% pitanja)

### 9.2. Mesečni review

Svaki mesec, educator-konsultant + ti:
- Top 10 najproblematičnijih pitanja (najviše flagova) → odluka
- Sample 50 random AI objašnjenja → quality check
- Distribucija accuracy → da li treba kalibracija težina

### 9.3. Sezonski review

Pre svake sezone:
- Pregled statistika prethodne sezone
- Ažuriranje mock testova (možda nove u skladu sa zvaničnim setima)
- Backup database snapshot

---

## 10. Otvorena pitanja

- [ ] Pitanja iz prošlih malih matura — koristiti? Pravna provera. **Akcija: pre Y2 sezone**.
- [ ] Da li dodavati pitanja od korisnika (UGC)? **NE u v1. Možda u v3.**
- [ ] Da li javno objavljujemo bazu pitanja kao "free PDF" za marketing? **DA, to je magnet za email-ove**.
