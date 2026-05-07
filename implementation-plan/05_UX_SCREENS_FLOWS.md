# 05 — UX Flows & Screen Specifications

## Cilj

Svaki ekran u app-u, sa: layout-om, komponentama, akcijama, edge case-ovima, microcopy-jem.

---

## 1. Korisnički putevi (kompletni)

### 1.1. Roditeljsko putovanje (acquisition)

```
1. Vidi reklamu "Mala Matura: 240 dana ostalo"
   ↓
2. Klikne, dolazi na landing /
   ↓
3. Čita "kako radi", vidi screenshots
   ↓
4. Klikne "Probaj besplatno"
   ↓
5. Unese email
   ↓
6. Magic link u email-u, klikne
   ↓
7. Onboarding: "Reci nam o detetu"
   - Ime (nadimak), godina rođenja, razred
   - Avatar select
   - Optional: razred kod (8-2)
   - Optional: školu
   ↓
8. Generiše QR / link → "Otvori na detetovom telefonu"
   ↓
9. Roditelj predaje telefon detetu
   ↓
10. Dete radi prvi onboarding kviz (3 pitanja, "Hajde da vidimo gde si")
   ↓
11. Generiše početni status, pokazuje XP, streak (1 dan)
   ↓
12. CTA "Pošalji roditelju izveštaj" → email roditelju "Marko je uspešno počeo"
```

**Kritični momenti**:
- Korak 7 (onboarding roditelja): što kraći. 4 polja max.
- Korak 10 (prvi kviz deteta): mora biti zabavan, ne plašiti, **bez gubljenja XP-a u onboarding-u**.
- Korak 12: roditelj koji dobija email "Marko je počeo" je **proxy za vrednost**.

---

### 1.2. Detetovo dnevno putovanje

```
1. Push notifikacija oko 18h: "Marko, ostao ti je 1 sat za streak danas"
   ↓
2. Otvara app
   ↓
3. Home screen — vidi:
   - Streak: 14 dana 🔥
   - Današnja sesija: "Brzi trening (5 pitanja, 3 min)"
   - Drug-aktivnost: "Petar je upravo dobio bedž"
   ↓
4. Klikne "Igraj"
   ↓
5. Kviz screen (vidi 2.4 dole)
   ↓
6. Tačan: animacija zelene check, XP+, sledeće
   Pogrešan: animacija crvenog X, "Hajde da vidimo zašto" → AI objašnjenje
   ↓
7. Posle 5 pitanja: rezultat ekran
   - Tačno X/5
   - +XP
   - Streak održan
   - "Igraj još" / "Završi"
   ↓
8. Vraća se na home ili odlazi
```

**Kritični momenti**:
- Korak 1 (push): mora biti precizno tempiran, blago zadirkujuća poruka — ne strašna.
- Korak 6 (greška): NE ukoriti, već "hajde da vidimo zašto" — empatska poruka.
- Korak 7 (rezultat): jasan progress, jedan CTA glavni.

---

### 1.3. Roditelj-vs-dete duel putovanje

**Roditelj inicira**:
```
1. Roditelj otvara svoj dashboard
   ↓
2. Vidi "Sa Markom: 7-3 (Marko vodi)"
   ↓
3. Klikne "Izazovi Marka"
   ↓
4. Bira: predmet (npr. "Geografija 5"), 5 pitanja, sync ili async
   ↓
5. Sync: "Marko mora da bude u app-u sada" — push
   ↓
6. Marko prima push "Mama te izaziva!" → klikne, ulazi u duel
   ↓
7. Duel screen — vidi sliku roditelja i sebe, scoreboard
   ↓
8. Pitanja se prikazuju oba istovremeno, ko brže tačno = tačka
   ↓
9. Posle 5 pitanja: rezultat
   - Marko 3, Mama 2 → "Marko pobedio!"
   - +XP za oboje, +bedž za Marka
   - "Igraj revanš?" / "Završi"
   ↓
10. Statistika: "Sa mamom: 8-3 (Marko vodi)"
```

**Async varijanta**:
- Roditelj reši sam, Marko dobija "Mama te izaziva, ima 24h" → kad otvori, vidi mamin skor i pokušava da prebaci

---

### 1.4. Konverzija u Sprint putovanje

**Jesen, 8. razred počinje**:
```
1. Dete koristi free već 2-6 meseci
   ↓
2. Sredinom septembra: u home screenu se pojavljuje banner
   "Mala matura: 250 dana"
   ↓
3. Nedelja kasnije: "Tvoja spremnost: 47%"
   - Pokazuje slabe oblasti
   - Dugme "Vidi šta moraš da popraviš" — ali sa lock-om
   ↓
4. Roditelj dobija nedeljni email — sad uključuje sekciju
   "Marko trenutno ima 47% spremnost za malu maturu.
    Sprint paket od 1. marta će ga dovesti do 80%+.
    Rezerviši mesto: 3.990 RSD (early bird, 1.000 RSD popust)."
   ↓
5. Roditelj klikne "Saznaj više"
   ↓
6. Marketing strana o Sprint-u (vidi 4.x dole)
   ↓
7. "Rezerviši Early Bird"
   ↓
8. Plaćanje ekran — IPS QR, instrukcije, reference broj
   ↓
9. Roditelj platio (ručna provera), 24h kasnije:
   ↓
10. Email "Sprint je aktiviran! Marko sad ima pristup..."
    Marko vidi novi UI badge "Sprinter"
```

---

## 2. Detetovo UX — ekran-po-ekran

### 2.1. Home screen (`/app`)

**Cilj**: očigledan šta sledeće, motivacija, social proof.

**Layout (mobile-first, max 480px content)**:

```
┌───────────────────────────────┐
│ ☰ Avatar  •  Petar M  •   ⚙️│  Header (50px)
├───────────────────────────────┤
│                               │
│   🔥 14                       │  Streak veliki broj
│   Dana zaredom!               │
│                               │
├───────────────────────────────┤
│  Spremnost za malu maturu     │  Sprint zone (samo za 8. razred)
│  ████████████░░░░ 67%         │
├───────────────────────────────┤
│                               │
│   ⚡ Brzi trening              │  Glavni CTA
│   5 pitanja • 3 min           │
│   [PLAY]                      │
│                               │
├───────────────────────────────┤
│  Ili:                         │
│  ◯ Standardna sesija (15 Q)   │
│  ◯ Maraton (50 Q, 10× XP)     │
├───────────────────────────────┤
│  Tvoji drugovi                │
│  ┌────┐┌────┐┌────┐┌────┐    │
│  │MK 🔥│PJ ⚡│AS  │+pos│      │
│  │14d │ 7d │ 3d  │     │      │
│  └────┘└────┘└────┘└────┘    │
├───────────────────────────────┤
│  📊 Razred 8-2: 4. mesto      │
├───────────────────────────────┤
│ [Home] [Liga] [Drugovi] [Ja]  │  Bottom nav (fixed)
└───────────────────────────────┘
```

**Glavni CTA logika**:
- Default: "Brzi trening" (5 pitanja, 3 min) — cilja za streak
- Ako je 7. ili 8. razred i ima Sprint: "Sprint plan dana — 15 pitanja"
- Ako je dete <5. razreda i nije igralo danas: "Brzi trening"

**Edge cases**:
- Prvi put (0 streak): "Hajde da počnemo!" sa prijateljskom porukom
- Streak 0 zbog propuštenog dana: "Tvoj streak se prekinuo. Hajde da počnemo novi!" (ne plašimo)
- Sa freeze: "Iskoristio si streak freeze (1/2 ostalo)"

**Microcopy primeri**:
- "Igraj" (ne "Start")
- "5 pitanja • 3 min"
- "Bravo!" (posle uspeha)
- "Ne brini, sutra opet!" (posle propuštenog dana)

---

### 2.2. Kviz screen (`/app/kviz/[sessionId]`)

**Cilj**: fokus na pitanju, brz ritam, jasan progress.

```
┌───────────────────────────────┐
│ X        ⏱ 0:24       3 / 5  │  Top bar (close, time, progress)
├───────────────────────────────┤
│                               │
│  Površina kvadrata sa         │
│  stranicom 5 cm je:           │  Pitanje (centered, large font)
│                               │
│                               │
├───────────────────────────────┤
│                               │
│  ┌─────────────────────────┐  │
│  │  20 cm²                 │  │  Odgovor 1
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │  25 cm²                 │  │
│  └─────────────────────────┘  │
│  ┌─────────────────────────┐  │
│  │  30 cm²                 │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │   ← Dalje (preskoči)    │  │  Skip dugme (samo za 3-Q)
│  └─────────────────────────┘  │
│                               │
└───────────────────────────────┘
```

**Animacije**:
- Dugmad scale-up na touch
- Tačan: zeleni glow + check + slide left
- Pogrešan: red shake + crveni X
- "Bravo!" / "Skoro!" mikroporuka

**Posle pogreške, full-screen modal**:
```
┌───────────────────────────────┐
│        Skoro!                 │
│                               │
│  Tačan odgovor: 25 cm²        │
│                               │
│  Hajde da vidimo zašto:       │
│                               │
│  Površina kvadrata = a × a    │
│  5 × 5 = 25 cm²               │  AI objašnjenje
│                               │
│  [Razumem, dalje →]           │
└───────────────────────────────┘
```

**Edge cases**:
- Loading sledećeg pitanja: skeleton, ne spinner (manje nervira)
- Greška u network-u: "Nema interneta. Pokušaj opet" + retry
- Vremenska sesija prekinuta (ako uvedemo): pause modal sa "Nastavi"

---

### 2.3. Rezultat sesije (`/app/kviz/[sessionId]/rezultat`)

```
┌───────────────────────────────┐
│                               │
│      ⭐ Bravo!                │
│                               │
│      4 / 5 tačno              │
│                               │
│      +12 XP                   │
│                               │
│      🔥 Streak: 15 dana       │
│                               │
├───────────────────────────────┤
│  Po oblastima:                │
│  ✓ Razlomci                   │
│  ✓ Kvadar                     │
│  ✗ Procenti                   │
│                               │
│  Hoćeš da vežbaš procenti?    │
│  [Da, hajde] [Možda kasnije]  │
├───────────────────────────────┤
│  Ako otključa bedž:           │
│  ┌──────────────────────────┐ │
│  │   🏆 Streak Master       │ │
│  │   15 dana zaredom!       │ │
│  └──────────────────────────┘ │
└───────────────────────────────┘
```

---

### 2.4. Liga / Leaderboard (`/app/liga`)

```
┌───────────────────────────────┐
│ Tvoja liga: 🥈 Srebro         │
│ Grupa 12 / 24 ljudi           │
│                               │
│ Vreme do reseta: 3 dana       │
├───────────────────────────────┤
│   Promovišu se (top 5):       │
│ 1. Marija K.    1240 XP       │
│ 2. Bojan P.      980 XP       │
│ 3. Anja S.       760 XP       │
│ 4. Dejan M.      680 XP       │
│ 5. Ti             570 XP   👈│
│                               │
│ Ostaju (6-19):                │
│ 6. Petar K.      520 XP       │
│ ...                           │
│                               │
│ Padaju u bronzu (bottom 5):   │
│ 20. Ivan Z.       80 XP       │
│ ...                           │
└───────────────────────────────┘
```

**Tab svicher**: Liga | Razred | Škola | Drugovi

---

### 2.5. Drugovi (`/app/drugovi`)

```
┌───────────────────────────────┐
│  Tvoj kod: MK7B3X             │
│  [Kopiraj] [Pošalji]          │
│                               │
├───────────────────────────────┤
│  Dodaj druga                  │
│  [Unesi kod...]   [+]         │
├───────────────────────────────┤
│  ⏳ Petar M te poziva         │
│     [Prihvati] [Odbij]        │
├───────────────────────────────┤
│  Tvoji drugovi (3):           │
│  ┌─────────────────────────┐  │
│  │ Marija K  🔥 14 dana    │  │
│  │ Level 15                │  │
│  │ [Izazovi]               │  │
│  └─────────────────────────┘  │
│  ...                          │
└───────────────────────────────┘
```

---

### 2.6. Profil (`/app/profil`)

```
┌───────────────────────────────┐
│      [Avatar veliki]          │
│      Petar M.                 │
│      Level 12                 │
│      🔥 14 dana                │
├───────────────────────────────┤
│  Statistika:                  │
│  • 1.247 pitanja rešeno       │
│  • 78% tačnosti               │
│  • Najjači predmet: Istorija  │
│  • Najslabiji: Procenti       │
├───────────────────────────────┤
│  Bedževi (12 / 50):           │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐         │
│  │🔥││📚││⚡││🎯││❓│         │
│  └──┘└──┘└──┘└──┘└──┘         │
│  [Vidi sve]                   │
├───────────────────────────────┤
│  Moja kolekcija (3 / 14):     │
│  Otključani predmeti...       │
└───────────────────────────────┘
```

---

### 2.7. Settings (`/app/settings`)

Minimalistički — dete ne treba dugačke menije:
- Avatar promena
- Jezik (latinica / ćirilica)
- Notifikacije ON/OFF (samo PARENT MOZE da menja default-e)
- "Roditelj kontrola" — link ka roditeljskom dashbordu
- Pomoć / FAQ
- Logout

---

## 3. Roditeljsko UX — ekran-po-ekran

### 3.1. Roditeljski dashboard (`/roditelj`)

**Cilj**: Jasan pregled šta dete radi, šta funkcioniše, šta ne. Konverzioni triggeri za Sprint.

```
┌───────────────────────────────┐
│ Pozdrav, Aleksandra! 👋       │
│                               │
│ Tvoja deca:                   │
│ [Marko 12g, 7r] [Ana 8g, 3r]  │  Tabovi po deci
├───────────────────────────────┤
│ Marko ovog meseca             │
│ ┌─────────────────────────┐   │
│ │ Vežbao 23 dana zaredom  │   │
│ │ 4h 32min ukupno         │   │
│ │ +1.240 XP               │   │
│ └─────────────────────────┘   │
├───────────────────────────────┤
│ Spremnost za malu maturu      │
│ (za 8. razred 2027)           │
│ ████████░░░░░░ 47%            │
│                               │
│ 🟢 Dobro: Istorija, Geografija│
│ 🟡 Srednje: Matematika        │
│ 🔴 Slabo: Procenti, Pravopis  │
│                               │
│ ┌─────────────────────────┐   │
│ │ 📦 Sprint paket počinje  │   │
│ │    1. mart 2027.         │   │
│ │ Early bird: 3.990 RSD   │   │
│ │ [Saznaj više]            │   │
│ └─────────────────────────┘   │
├───────────────────────────────┤
│ Igraj sa Markom               │
│ Sa tatom: 7-3 (Marko vodi) 🥇 │
│ [Izazovi Marka]               │
├───────────────────────────────┤
│ Nedelja u brojkama (graf)     │
│ Pon Uto Sre Čet Pet Sub Ned   │
│  ▆   ▇   ▅   ▆   ▇   ▃   ▇   │
└───────────────────────────────┘
```

---

### 3.2. Detalji o detetu (`/roditelj/dete/[childId]`)

Detaljniji pregled:
- Tabela predmeta sa accuracy %
- Top 5 najslabijih oblasti (nedelja, mesec)
- Trend learning curve
- Mock test rezultati ako sprint aktivan
- Linkovi: "Pošalji push da igra danas", "Izazovi", "Settings"

---

### 3.3. Sprint info (`/roditelj/sprint`)

Marketing-style strana sa:
- "Šta dobijate":
  - 90-dnevni plan
  - 12 mock testova
  - AI tutor
  - Detaljan izveštaj
  - Garancija
- Cena (sa countdown-om za early bird)
- Testimonijali
- FAQ
- "Rezerviši odmah" CTA

---

### 3.4. Plaćanje (`/roditelj/sprint/plati`)

```
┌───────────────────────────────┐
│ Plaćanje: 3.990 RSD           │
│ Sprint za Marka, 8. razred    │
│                               │
│ ┌─────────────────────────┐   │
│ │                         │   │
│ │   [QR KOD]              │   │
│ │                         │   │
│ └─────────────────────────┘   │
│                               │
│ Skenirajte QR kod u banking   │
│ app-u (Banca Intesa, OTP, ...).│
│                               │
│ Ili ručno:                    │
│ Račun: 160-XXXXXX-XX          │
│ Iznos: 3.990 RSD              │
│ Poziv: SPRINT-MK-2027-0234    │
│                               │
│ [Kopiraj sve]                 │
│                               │
│ Posle uplate:                 │
│ Sprint će biti aktiviran u    │
│ roku od 24 sata. Bićete       │
│ obavešteni email-om.          │
│                               │
│ Status: ⏳ Čeka uplatu        │
└───────────────────────────────┘
```

---

## 4. Marketing pages

### 4.1. Homepage (`/`)

**Hero sekcija**:
- "Spremi malu maturu uz aplikaciju koja **stvarno** funkcioniše"
- Subhero: "Besplatna gejmifikovana vežba + paket priprema za maturu"
- 2 CTA: "Probaj besplatno" / "Saznaj o Sprint-u"
- Hero slika: dete + roditelj na telefonu

**Below the fold**:
- "Kako radi" (3 koraka)
- Social proof (Y2+: testimonijali)
- "Šta vežbamo" — sva 14 predmeta
- "Spremnost za malu maturu" — Sprint paket pitch
- FAQ
- Footer

### 4.2. Kako radi (`/kako-radi`)

Detaljnije, sa screenshots i animacijama.

### 4.3. Cene (`/cene`)

```
┌──────────────────┐  ┌──────────────────┐
│      FREE        │  │      SPRINT      │
│                  │  │                  │
│  ZAUVEK BESPLAT- │  │  4.990 RSD       │
│  NO              │  │  jednokratno     │
│                  │  │                  │
│  ✓ Sva pitanja   │  │  Sve iz FREE +:  │
│  ✓ Sve sezone    │  │  ✓ Mock testovi  │
│  ✓ Drugovi       │  │  ✓ Sprint plan   │
│  ✓ Razred liga   │  │  ✓ AI tutor      │
│  ✓ Roditelj duel │  │  ✓ Garancija     │
│                  │  │                  │
│  [Probaj]        │  │  [Rezerviši]     │
└──────────────────┘  └──────────────────┘

Early bird (do 1. marta): 3.990 RSD
```

### 4.4. Za roditelje (`/za-roditelje`)

Roditeljski-focused landing:
- Šta vidite kao roditelj
- Kako pomaže detetu
- Testimonijali roditelja
- Sprint pitch

### 4.5. Za decu (`/za-decu`)

Deca-friendly:
- Avatari, bedževi
- Drugovi i takmičenja
- Streak i lige
- "Možeš da pobediš mamu" 😄

---

## 5. Onboarding flows (detalj)

### 5.1. Roditelj onboarding (4 ekrana)

**Ekran 1**: "Hajde da kreiramo nalog za tvoje dete"
- Email roditelja
- "Prima li dete email?" → DA / NE
- ako NE: postaviće se device-bound

**Ekran 2**: "Reci nam o detetu"
- Nadimak (kako ga zovemo)
- Godina rođenja (dropdown 2010-2020)
- Razred (1-8)

**Ekran 3**: "Razred i škola (opciono)"
- Razred kod ("8-2")
- Naziv škole (autocomplete iz baze, ili "Drugo")
- "Dodaj kasnije ako ne znaš"

**Ekran 4**: "Avatar"
- 12 default avatara, dete bira (ili roditelj za njega)
- "Dovrši"

→ Generiše QR / link, prikazuje "Pošalji ovaj link Marku ili otvorite na njegovom telefonu"

### 5.2. Dete onboarding (3 ekrana)

**Ekran 1**: Kratak hello
- "Zdravo Marko! Hajde da vidimo šta već znaš 🎯"
- 1 dugme: "Krenimo"

**Ekran 2**: 3 lakša pitanja iz omiljenog predmeta deteta (ili default Matematika ako ne zna)
- Bez tajmera, bez kazni
- Cilj: "ah, ovo je zabavno"

**Ekran 3**: Rezultat
- "Bravo! Tvoj početni level: 1"
- "Streak: Dan 1 🔥"
- "Igraj još!" → home

---

## 6. Empty states

Svaki ekran ima specifičan empty state:

| Ekran | Empty | Microcopy |
|---|---|---|
| Drugovi | Nema drugova | "Pozovi prvog druga! Tvoj kod: MK7B3X" |
| Bedževi | 0 unlocked | "Tvoj prvi bedž čeka — odigraj 3 dana zaredom!" |
| Liga | Nije u ligi (prva nedelja) | "Tvoja prva liga počinje za 2 dana" |
| Mock testovi | Nije Sprint | "Mock testovi su deo Sprint paketa..." |
| Push | Nije subscribed | "Uključi notifikacije da ne propustiš streak" |
| Kviz history | Nikad nije igrao | "Vreme da kreneš!" |

---

## 7. Loading states

- Skeleton screens (NE spinneri) gde god je moguće
- Per-component, ne celokupan ekran
- Shimmer animacija za fancy osećaj

---

## 8. Error states

| Tip | Prikaz |
|---|---|
| Network down | Banner "Bez interneta. Pokušaj opet" + retry button |
| Server error | "Nešto nije uredu. Pokušaj kasnije." + email kontakt |
| 404 | "Stranica ne postoji" + link na home |
| 403 | "Nemaš pristup ovome" + objašnjenje |
| Validacija | Inline po polju, crvena boja, jasna poruka |

---

## 9. Accessibility (a11y)

### 9.1. Obavezni nivo (WCAG 2.1 AA)

- Sva dugmad imaju `aria-label`
- Sve slike imaju `alt`
- Color contrast 4.5:1 minimum
- Tab navigation funkcioniše svuda
- Screen reader testirano (VoiceOver iOS)
- Focus indicators vidljivi

### 9.2. Specifično za decu

- Velika dugmad (min 44×44px touch target)
- Nema dvostrukog tap-a (everything single-tap)
- Nema komplikovanih gesturova
- Tekst minimum 16px

---

## 10. Microcopy guide (ton glasa)

### 10.1. Za decu

- Jednostavan jezik
- Pozitivni okvir ("Hajde da...", "Odlično!", "Skoro!")
- Bez forsiranja kupovine
- Bez korporativnog tona
- Primeri:
  - ✅ "Bravo! Naučio si nešto novo"
  - ❌ "Vaš odgovor je bio uspešan"

### 10.2. Za roditelje

- Profesionalan ali topla
- Konkretni brojevi i činjenice
- Konstruktivno
- Primeri:
  - ✅ "Marko trenutno pokriva 67% gradiva. Sa 30 minuta vežbanja dnevno može doći do 90% za 60 dana."
  - ❌ "Vaše dete trenutno ne ispunjava sve standarde"

### 10.3. Konzistentnost

- "Igraj" ne "Start"
- "Kviz" ne "Test"
- "Pitanje" ne "Zadatak"
- "Tačno / Pogrešno" ne "Correct / Wrong"
- "Nedelja" ne "Sedmica"
- "Mejl" ne "Email" (kad pišemo deci); "Email" za roditelje
