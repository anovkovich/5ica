# 07 — Gamification Economy

## Cilj

Kompletna mehanika gejmifikacije sa balansom: XP, leveli, streak, bedževi, lige. Ovaj dokument je matematika i pravila — UI implementacija je u `05_UX_SCREENS_FLOWS.md`.

---

## 1. XP — osnovna valuta

### 1.1. Pravila zarade

| Akcija | XP | Napomena |
|---|---|---|
| Tačno 3-odgovorno pitanje | +3 | Sa "Dalje" opcijom |
| Tačno 4-odgovorno pitanje | +2 | Bez skip-a |
| Pogrešno 3-odgovorno | -2 | Smanjuje EV nasumičnog pogađanja |
| Pogrešno 4-odgovorno | 0 | Bez kazne |
| Skipped (Dalje) | 0 | Bez kazne, bez bonusa |
| Brzi odgovor (<10s tačan) | +1 bonus | Stimuliše tempo |
| Spori odgovor (>60s tačan) | -1 mali penal | Sprečava AFK exploite |

### 1.2. Multiplikatori

| Multiplikator | Uslov | Vrednost |
|---|---|---|
| Streak bonus | streak >= 7 dana | ×1.5 |
| Streak bonus dugi | streak >= 30 dana | ×1.75 |
| Maraton bonus | sesija = 50 pitanja | ×10 (ali jednom dnevno) |
| Mock test bonus | sprint mock test | ×2 |
| Duel pobeda | win duel | flat +20 |
| Prvi put dnevno | prva sesija dana | ×1 (bez bonusa, ali daje streak) |

### 1.3. Anti-exploit

- Maks 500 XP po danu (sprečava AFK farming)
- Maks 3 maratona po nedelji (sprečava izgaranje)
- Iste pitanja unutar 24h ne donose XP (sprečava ponavljanje istog za XP)
- Server uvek validira (klijent ne kalkuliše XP)

---

## 2. Leveli

### 2.1. XP po levelu (kriva)

```
level_xp(L) = 100 * L^1.5
```

| Level | XP za level | Kumulativno |
|---|---|---|
| 1 | 100 | 100 |
| 5 | 1.118 | 4.305 |
| 10 | 3.162 | 19.624 |
| 20 | 8.944 | 110.000 |
| 50 | 35.355 | 1.180.000 |
| 100 | 100.000 | 6.667.000 |

### 2.2. Šta dobijaš na level-up

- Animacija "Level UP!" (full-screen)
- Notifikacija u dashboardu roditelja
- Otključavanje avatara/kostima na specifičnim levelima:
  - Level 5: 2 nova avatara
  - Level 10: 1 epic avatar
  - Level 25: legendary avatar
  - Level 50: ultra-rare avatar
  - Level 100: "OG" avatar

### 2.3. Pravilo

Levelovanje **ne donosi nikakvu funkcionalnu prednost** osim avatara. **Pay-to-win prevention**: niko ne može kupiti XP.

---

## 3. Streak — najjača kuka

### 3.1. Definicija

**1 dan streak-a** = bar 1 kompletna sesija (any: quick, standard, marathon, duel, mock) tog dana (00:00 - 23:59 user lokalno vreme).

### 3.2. Kalkulacija

```typescript
function updateStreak(user, today) {
  const lastDate = user.lastActiveDate;
  
  if (lastDate === today) {
    // Already counted today, no change
    return user.currentStreak;
  }
  
  const yesterday = today - 1 day;
  
  if (lastDate === yesterday) {
    // Continued streak
    return user.currentStreak + 1;
  }
  
  if (lastDate === today - 2 days && user.streakFreezeAvailable > 0) {
    // Freeze saves the streak
    user.streakFreezeAvailable -= 1;
    return user.currentStreak + 1;
  }
  
  // Streak broken
  return 1;  // Today is day 1
}
```

### 3.3. Streak Freeze (zaštita)

- 1 freeze dobiješ na svakih 7 dana streak-a
- Maks 2 freeze-a u inventaru
- Iskoristi se automatski ako propustiš dan
- "Streak freeze iskorišćen" notifikacija sledeći dan

### 3.4. Ne plašimo decu

Ako streak prekine bez freeze-a:
- Empatska poruka: "Streak se završio. Hajde da počnemo novi! 🔥"
- BEZ guilt-ovanja
- BEZ retroaktivne kazne za XP
- Posle 5 dana neaktivnosti: re-engagement email roditelju (ne detetu)

---

## 4. Bedževi (badges)

### 4.1. Kategorije

| Kategorija | Primer | Brojevi |
|---|---|---|
| Streak | "Streak 7", "Streak 30", "Streak 100", "Streak 365" | 4 |
| Predmet master | "Razlomci master" (svi pitanja iz oblasti tačna) | ~50 |
| Social | "Prvi drug", "10 drugova", "Razred king" | ~10 |
| Duel | "Pobedio mamu 5x", "10 wins", "Streak 5 dueli" | ~10 |
| Mock test | "Prvi mock", "Spreman" (80%+ na mocku) | ~5 |
| Milestone | "Level 10", "1000 pitanja", "Sezona 1" | ~10 |
| Sezona | "Mala Matura 2027 graduate" | 1 po sezoni |
| Easter eggs | Skriveni / surprise | 5+ |

**Cilj broja**: ~100 bedževa do v1 (pre prve sezone). Daje smisao za istraživanje.

### 4.2. Rarity

- **Common** (sive ikone): 60% svih bedževa
- **Rare** (plave): 25%
- **Epic** (ljubičaste): 10%
- **Legendary** (zlatne): 5%

Rariji bedževi imaju veći XP reward + animaciju otključavanja.

### 4.3. Otključavanje

- Server svaki put posle završene sesije proverava nove bedževe (lazy)
- Ako se otključava: insertuj u `userBadges`, send notifikaciju
- Animacija pri sledećem otvaranju app-a

### 4.4. Profile flex

- Profile prikazuje 5 najrijih bedževa kao "showcase"
- Drugovi mogu da vide showcase
- "Compare" feature: vidi koji bedževi su tvoji vs druga

---

## 5. Lige (Leagues)

### 5.1. Hijerarhija

```
Bronza → Srebro → Zlato → Dijamant
   ↓         ↓        ↓        ↓
 Najniži               Najviši
```

### 5.2. Mehanika

**Nedeljna**:
- Ponedeljak 00:00 = nova nedelja, novi grupe
- Svaki user u svojoj ligi se random spaja u **grupe od 30 ljudi** (matchmaking po user-ovom XP nivou da bude balans)
- Tokom nedelje: skupljaš XP koji se broje za **weekly XP**
- Nedelja 23:59: rezultat
  - Top 5: promovisani u sledeću ligu
  - Position 6-25: ostaju u istoj
  - Bottom 5: pali u nižu ligu

**Najviša liga (Diamond)**: top 5 ostaju, bottom 5 padaju.
**Najniža (Bronze)**: top 5 promovisani, dno ne pada (bottom limit).

### 5.3. Nagrade za rang

| Rank u grupi | XP nagrada | Dodatak |
|---|---|---|
| 1 (gold medal) | +200 XP | Special badge "Liga šampion W{N}" |
| 2-3 | +100 XP | — |
| 4-5 | +50 XP | — |
| 6-25 | +20 XP | — |
| 26-30 | 0 | Demote |

### 5.4. UI

- Vidiš svoju trenutnu poziciju u real-time
- "Ostaje ti X XP do top 5" — motivator
- Live update kad neko pretekne (animacija)

### 5.5. Privatnost

Roditelj može da isključi učešće u Srbija ligama (ostaju samo razred + drugovi).

---

## 6. Razred + Škola leaderboards

### 6.1. Razred (auto-grupa)

Korisnici sa istim `classCode` ("8-2") + istom školom + istim razredom su automatski u jednoj grupi.

**Display**:
- Top 30 (svi u razredu)
- Nedeljno + svevreme
- Nadimci, ne pravi imena

### 6.2. Škola (opcionalno)

Svi učenici iste škole + istog razreda u jednoj grupi.

**Display**:
- Mesečno
- Top 50

### 6.3. Privacy

Roditelj može da isključi za svoje dete.

---

## 7. Drugovi (Friends)

### 7.1. Mehanika

- Korisnik dobija **friend code** (6-char alphanumeric, derived from displayName + ID)
- Deli kod sa drugom (whatsapp/viber)
- Drug unosi kod → request → accepting (oba moraju)
- Maks 50 drugova (sprečava growth-hacking sa boto-ima)

### 7.2. UI prikazi

- Lista drugova sortirana po: streak desc, level desc
- Online indicator (zelena tačka ako aktivan u poslednjih 5 min)
- Možeš videti njihov profil (bedževi, level, streak)
- "Izazovi" dugme za duel

### 7.3. Anti-toksičnost

- Bez chat-a
- Bez slanja poklona / hearts (sprečava lažni intimitet sa botovima)
- Block lista — ako neko tebe doda i ti to ne želiš
- Block je dvostran (ti njega, on tebe ne vidi)

---

## 8. Duel mehanika (kompletan dizajn)

### 8.1. Tipovi

**Child-vs-child**:
- Inicirao drug
- Async (default, 24h da odgovoriš)
- Ili sync (real-time, ako oboje su u app-u)

**Parent-vs-child**:
- Inicirao roditelj iz roditelj dashbord-a
- Async (24h) ili sync (sa push notifikacijom da uđu istovremeno)
- Posebna sekcija u stats: "Sa mamom: 7-3"

### 8.2. Pravila

- 5 pitanja po duel-u (ili 10, biraš)
- Iste pitanja za oba igrača (server bira jednom)
- Skor = (broj tačnih × 10) + (bonus za brzinu)
- Brzina bonus: prvi koji odgovori tačno dobija +5

### 8.3. Sync mode (real-time)

- Oboje u app-u
- Pitanja se prikazuju istovremeno (server polling 1s ili WS u v2)
- Vidiš "Marko je odgovorio!" indicator
- Završetak = kad oboje završe

### 8.4. Async mode (24h)

- Inicijator reši svoju seriju (5 pitanja)
- Drugi igrač vidi izazov, ima 24h
- Drugi igra istu seriju pitanja, ne vidi inicijatorove odgovore
- Posle završetka oboje: rezultat

### 8.5. Posebne mehanike za roditelj-dete

- Roditelj može da bira **predmet i razred** (može svoj razred ili dečji)
- Ako dete pobedi: dobija **specijalni bedž** "Pobedio mamu 5x" itd.
- Ako roditelj pobedi: pohvalna poruka detetu "Mama je naučila brže! Možeš ti to popraviti"
- Stats: "Sa mamom: 7-3 (Marko vodi)" — narativ

### 8.6. Familija mode (gostovanje baka/deda)

- Roditelj može da pošalje pozivnicu drugom članu porodice
- Gost ulazi kroz magic link (24h-time-bound)
- Gost ne pravi nalog, ulazi u "guest" mode samo za duel
- Posle duel-a: "Hoćeš li napraviti svoj nalog?" CTA

---

## 9. Avatari i kolekcionarstvo

### 9.1. Avatari

- **Default 12**: dostupni svima odmah
- **Otključavanje XP-om**: 18 dodatnih, na različitim levelima
- **Otključavanje bedževima**: 5 specijalnih (samo iz teških bedževa)

Avatari su SVG, lake za customization (boja, frizura, izrazi).

### 9.2. Kolekcionarske kartice

Po predmetu, korisnik sakuplja "kartice" — vizualni reprezent karaktera ili motiva iz tog predmeta:

- Matematika: Pitagora, Euler, Arhimed... (5 kartica)
- Istorija: Karađorđe, Stefan Nemanja, Tito... (10 kartica)
- Književnost: Andrić, Vuk Karadžić, Mokranjac... (10 kartica)

Ukupno ~80 kartica preko svih predmeta.

**Kako se dobija**:
- 10% chance posle završene sesije (random)
- Garantovan posle level-up
- Garantovan posle bedž-otključavanja

**Šta pruža**:
- Ekstra avatar opciju
- Profile flex
- Ništa funkcionalno (etika)

---

## 10. Push notifikacija ekosistem

### 10.1. Kategorije

| Kategorija | Primer | Frekvencija |
|---|---|---|
| Streak održavanje | "Ostao ti je 1 sat" | dnevno (samo ako nije igrao) |
| Bedž otključavanje | "Otključao si bedž X" | po događaju |
| Liga events | "Liga uskoro završava" | nedeljno |
| Drug aktivnost | "Petar je upravo nadmašio tvoj rezultat" | po događaju |
| Duel pozivnica | "Mama te izaziva!" | po događaju |
| Spremnost update | "Tvoja spremnost: 67% (+3% ove nedelje)" | nedeljno (8. razred) |
| Sprint countdown | "Mala matura: 87 dana" | ne češće od mesečno |
| Sprint promo | "Early bird ističe za 7 dana" | strogo merljivo |

### 10.2. Pravila slanja

- Maks 1 push dnevno po kategoriji
- Maks 2 push dnevno ukupno (osim dueli, koji su event-driven)
- Tihi sat 21:00 - 08:00 (ne saljemo pushe)
- Fallback na email ako push nije dostupan i kritično je

### 10.3. Personalizacija

- Vreme: bira se na osnovu kada user obično igra (ML kasnije, fixed 18:30 za sad)
- Sadržaj: kontekstualan (streak broj, ime predmeta, itd.)
- A/B testovi za microcopy

---

## 11. Anti-cheat mere

### 11.1. Klijent

- Server-side validation svega
- Klijent uvek šalje samo "izabrao sam ovaj odgovor", ne "ja sam u pravu"
- Time check: ako user šalje 100 odgovora u 10 sekundi → flagged, sesija invalidirana

### 11.2. Rate limiting

- Maks 1 sesija u toku (ne možeš započeti 2)
- Maks 3 sesije po sat (sprečava farming)
- Maks 10 sesija po dan

### 11.3. Bot detekcija

- Iste odgovore 100% (sumnjivo)
- Iste vremena 100% (definitivno bot)
- IP od istog mesta sa 10+ naloga = flagged
- Captcha za nove naloge ako je IP sumnjiv

### 11.4. Posledice

- Soft flag: smanjenje XP za 50% za 24h, audit
- Hard flag: account suspended, email roditelju za pregled
- Hard ban: trajno, sa pravom žalbe

---

## 12. Balansiranje (kako naštimovati cifre)

### 12.1. Inicijalne pretpostavke

- Prosečno dete radi 1 sesija/dan, 5 pitanja, 60% tačnost = +9 XP/dan
- Sa streak bonusom (×1.5 posle 7 dana) = ~13 XP/dan
- 30 dana = ~400 XP = level ~6
- 365 dana = ~5.000 XP = level ~14
- 5 godina = ~25.000 XP = level ~30 (preda kraja osnovne)

Cilj: dete koje koristi ozbiljno **5 godina** dostigne level ~30. Level 50+ je za "ekspertne" igrače.

### 12.2. Praćenje balansa

PostHog metrike koje pratimo:
- Prosečni XP/sesija
- Prosečna sesija dnevno
- Distribucija levela (peak na kojim levelima zaglavi se)
- Streak distribucija (koliko ljudi ima 7+, 30+, 100+ dana)
- Bedž retencija (koji su preteški/prelagani)

### 12.3. Tweaks po sezonima

- Posle 3 meseca livea: review balans
- Ako je previše ljudi na level 5 i ne raste: snizi krivu
- Ako je premalo bedževa otključano: dodaj lakše ili prilagodi tresholde
- Ako se streak prekida prečesto: razmotri 2 freeze-a po 5 dana umesto 1 po 7

### 12.4. Šta ne radimo

- Nikad ne brišemo XP retroaktivno (gubimo poverenje)
- Ne menjamo level krivu posle godinu (frustriramo postojeće)
- Ne nerf-ujemo bedževe (uvek dostupni)

---

## 13. Konkurencija i etika

### 13.1. Šta NE radimo

- **Bez "kupi XP"** — pay-to-win destroyuje sistem
- **Bez "premium avatari za novac"** — ostalo etičko
- **Bez pritiska da igraš protiv volje** — ako roditelj kaže "stop push", odmah
- **Bez lažnih konkurenata** (botovi koji simuliraju aktivnost) — jednom otkriveno = trust gone

### 13.2. Etička retencija

Mi želimo da dete:
- Vežba ~10 min dnevno (ne 2h)
- Razvije naviku, ne zavisnost
- Vraća se zato što voli, ne zato što se boji da izgubi streak

Mehanike koje **dodaju vrednost** (gradimo): adaptive težina, AI objašnjenja, social proof.
Mehanike koje **stvaraju zavisnost** (NE gradimo): infinite scroll, slot machine random rewards, FOMO timers koji su lažni, dark patterns.

---

## 14. Otvorena pitanja

- [ ] Da li dodajemo "energy" sistem (limit pitanja po danu)? **NE — protiv etike, protiv free-as-funel logike**.
- [ ] Da li dodajemo "hearts" (gubiš pri grešci)? **NE — Duolingo je iz ovog razloga dobio kritiku, kontraproduktivno za učenje**.
- [ ] Da li daje 3-day-streak freeze (umesto 1)? **DA u v1.5 ako podaci pokažu da je 1 nedovoljno**.
- [ ] Razred leaderboard se zasniva na svim XP ili nedelji? **Nedeljni primarno, "all-time" kao sekundarni tab**.
