# 10 — Sprint Product Specification

## Cilj

Kompletna specifikacija Mala Matura Sprint paketa: šta uključuje, kako se aktivira, kako se prati, strategija diferencijacije od Free verzije.

---

## 1. Definicija proizvoda

**Mala Matura Sprint** = 90-dnevni intenzivan paket priprema za malu maturu, namenjen učenicima 8. razreda i njihovim roditeljima.

**Sub-brand**: zvanično "5ica Sprint" — sub-brand glavnog 5ica brand-a.

**Period dostupnosti**: mart-jun (ili sept-jun za "godišnji" varijantu — Y2+).

**Cena**: 4.990 RSD jednokratno (early bird 3.990 do 1. marta).

---

## 2. Strateška diferencijacija — "structure not content"

### 2.1. Kritična odluka

**Free verzija ima sva 8.500+ pitanja, sve predmete, sve gejmifikacija mehanike. Sprint NE gate-uje pitanja — Sprint dodaje strukturu i alate za pripremu ispita.**

### 2.2. Mantra

> **"Free je za vežbu. Sprint je za pripremu mature."**

Free i Sprint nisu "loša verzija vs dobra verzija". To su **različiti proizvodi za različite ciljeve**:
- **Free**: dnevna gejmifikovana navika učenja, godinama
- **Sprint**: 90 dana fokusirane pripreme za konkretan ispit

### 2.3. Side-by-side comparison

| Aspekt | Free (vežba) | Sprint (priprema mature) |
|---|---|---|
| Cilj | Dnevna navika učenja | Konkretan ispit za 90 dana |
| Pitanja | Sva 8.500+ | Sva 8.500+ (isto) |
| Predmeti | 14 | 14 (isto) |
| Gejmifikacija (XP, lige, drugovi) | Sve | Sve (isto) |
| Roditelj-vs-dete duel | Sve | Sve (isto) |
| Roditeljski dashboard | Osnovni | Detaljan + projekcije |
| **Plan učenja** | Ti biraš šta vežbaš | **AI gradi 90-dnevni plan** |
| **Mock testovi** | — | **12 u formatu mature** |
| **AI objašnjenja** | Osnovna | **Detaljna sa primerima** |
| **AI Coach** | — | **Dnevni push 7am** |
| **Predvidjena ocena** | — | **Real number forecast** |
| **Cohort + leaderboard** | — | **Zatvorena Sprint grupa** |
| **Sertifikat** | — | **PDF na kraju** |
| Cena | 0 RSD | 4.990 RSD |

### 2.4. Zašto ne gate pitanja

1. **Free je glavni funel za Sprint** — slabiji free = manje 8-gradera u februaru = manje Sprint kupaca u sezoni
2. **Pošten branding** — niko ne voli "demo verziju". Free je punopravan proizvod.
3. **Roditelji nisu glupi** — gating-om gubimo poverenje. Strukturom dobijamo poverenje.

### 2.5. Zašto je Sprint stvarno vredan

Roditelj koji misli "Marko može i besplatno da vežba" propušta:
- **Plan**: bez plana, dete vežba haotično. 90 dana usmerene vežbe je 5x efektivnije od slučajne.
- **Mock testovi**: niko ne pravi mock testove u realnom formatu. Sprint dete *zna* kako matura izgleda, dok free dete pogađa.
- **Coaching**: dnevni AI coach je kao mali trener. Bez njega, dete često ne zna gde da krene.
- **Predvidjena ocena**: roditelj zna gde Marko stoji, ne nadgleda nasumično.
- **Cohort**: takmičenje u zatvorenoj grupi je drugačije od takmičenja u Free Srbija ligi.

---

## 3. Šta uključuje (6 ekskluzivnih feature-a)

### 3.1. Personalizovan 90-dnevni plan

**Plan generation** (kad user kupi):
1. Inicijalni asesman: 30 pitanja preko svih predmeta male mature
2. Algorithm identifikuje slabe oblasti (vidi `08_ADAPTIVE_ENGINE.md`)
3. Generiše plan po nedeljama:
   - Nedelja 1-3: fokus na 3 najslabija predmeta (3-5 sesija dnevno, 15 min)
   - Nedelja 4-6: balans + dodaj mock test
   - Nedelja 7-9: dublji rad na slabim oblastima + 2 mock testa
   - Nedelja 10-12: mock-test heavy, simulacija ispita

**Dnevni plan**:
- "Danas vežbaj: Razlomci (10 pitanja), Pravopis (5 pitanja)"
- Procenjeno vreme
- Ako preskočiš dan, sledeći dan se prilagođava

### 3.2. 12 mock testova

- 4 matematike + 4 srpskog + 4 kombinovana
- Format identičan zvaničnoj maturi (20 zadataka, 120 min)
- Posle testa: detaljan izveštaj (po oblasti, gde si pao)
- Percentile: "Ti si u top 35% Sprint kupaca koji su rešili ovaj test"

### 3.3. Detaljan AI tutor (vs basic free)

**Free verzija**:
- "Tačan odgovor je 25 cm². Površina kvadrata = stranica × stranica."

**Sprint verzija**:
- Korak-po-korak rešenje
- 2-3 slična zadatka sa rešenjima
- Tip kako da zapamtiš pravilo
- Tipičnu grešku koju deca prave

### 3.4. Dnevni AI coach

Svako jutro u 7am, push notifikacija sa konkretnim savetom:
- "Marko, danas radi 5 zadataka iz procenta — to je tvoja najslabija oblast"
- "Sutra je mock test 3 — danas se odmori"
- "Spremnost ti je porasla za 3% ove nedelje 🎉"

### 3.5. Predvidjena ocena za maturu

Ažurira se posle svakog mock testa. Roditelj vidi:
- "Marko trenutno može da osvoji 62/100"
- "Sa nastavkom plana: prognoza 78/100 do mature"
- Trend graf (12 nedelja unazad)

Ovo je **glavni roditeljski hook**. Konkretan broj, ne magla.

### 3.6. Sprint cohort + leaderboard

- Svi Sprint kupci 2027 = zatvorena cohort grupa
- Mesečno takmičenje "Top 10 Sprint kupaca"
- "Sprinter" bedž javno vidljiv u profilu i lista
- Cohort osećaj — premium status

---

## 4. Activation flow

### 4.1. Kupovina

(Vidi `12_PAYMENTS.md` za detaljan payment flow)

Sažetak:
1. Roditelj klikne "Kupi Sprint"
2. Backend generiše IPS QR + reference broj
3. Roditelj plati u banking app-u
4. Admin (ili automatski u Y2) potvrdi uplatu
5. Sprint state → `active`

### 4.2. Inicijalni asesman

Pri prvi login posle aktivacije:
- "Dobrodošao u Sprint! Hajde da vidimo gde si"
- 30 pitanja iz svih predmeta male mature
- ~30 minuta
- Generiše bazni readiness skor + plan

### 4.3. Onboarding modal

Posle asesmana:
- "Tvoja početna spremnost: 47%"
- "Tvoj plan ima 12 nedelja, 30 min dnevno"
- "Cilj: 80%+ do mature"
- "Hajde da kreneš!"

---

## 5. Sprint UX (specifičnosti)

### 5.1. Sprint home screen

```
┌───────────────────────────────┐
│ 🚀 Sprint dan 23 / 90         │
│ 🔥 Streak: 21 dan             │
├───────────────────────────────┤
│ Tvoja spremnost               │
│ ████████░░░░ 67% (+12% ovaj   │
│                  mesec)        │
├───────────────────────────────┤
│ Današnji plan:                │
│ ✓ Razlomci (10 Q) — gotov     │
│ ▶ Pravopis (5 Q) — sledeći    │
│ ☐ Mock test 4 — sutra         │
├───────────────────────────────┤
│ [Krenimo! ▶]                  │
└───────────────────────────────┘
```

### 5.2. Mock test UI

Posebna sekcija sa:
- Odbrojavanje vremena
- Lista 20 zadataka levo, trenutni desno
- "Označi za pregled" funkcija
- "Predaj test" sa potvrdom
- Posle predaje: rezultat + detaljan izveštaj

### 5.3. Sprint badge

Svi Sprint korisnici dobijaju vidljiv "Sprinter" bedž u profilu i list-ama.

---

## 6. Pricing varijante

### 6.1. Standardni Sprint (preporuka v1)

- **Cena**: 4.990 RSD
- **Period**: mart-jun (90 dana)
- **Sve uključeno**: 12 mockova, plan, AI tutor, AI coach, izveštaji, cohort, sertifikat

### 6.2. Early bird

- **Cena**: 3.990 RSD
- **Period**: kupljeno do 1. marta
- **Sve isto kao standardni**

### 6.3. Familija (drugo dete -50%)

Ako roditelj kupi Sprint za 2+ dece (rare ali moguće sa blizancima):
- Prvi: 4.990 RSD
- Drugi: 2.495 RSD (-50%)
- Treći+: 1.997 RSD (-60%)

### 6.4. Razmislite za Y2

- **Godišnji Sprint** (sept-jun): 9.990 RSD — pokriva celu 8. godinu
  - Plus: bolji cash flow, više vežbe
  - Minus: razvodnja "Sprint sezone" branda
  - Odluka: ne u Y1, razmotri u Y2 ako podaci kažu

---

## 7. Roditeljski Sprint dashboard

Posebne sekcije u roditeljskom dashbordu kad je Sprint aktivan:

### 7.1. Glavni indikator

```
🚀 Sprint aktivan
Dan 23 / 90
Spremnost: 67% ↑
Predvidjena ocena na maturi: 62/100
Sledeći mock test: 5 dana
```

### 7.2. Nedeljni report (email + dashboard)

- Šta je radio ove nedelje
- Šta je propustio
- Trenutni rang u Sprint cohort grupi
- **Predvidjena ocena na maturi** sa trend
- Akcioni koraci za roditelja

### 7.3. Mock test rezultati

Detaljnije od free verzije:
- Po-zadatak breakdown
- Vreme po zadatku
- "Gde je gubio vreme"
- Predlog šta da rešava sledeće

---

## 8. Marketing materijal za Sprint

(Detalji u `14_MARKETING_GROWTH.md`)

Ključne poruke:
- "Free je za vežbu. Sprint je za pripremu mature."
- "Sve iz Free + plan, mock testovi, AI coach"
- "90 dana do uspeha"
- "Konkretni rezultati"

Ne koristimo:
- Strah ("Vaše dete neće proći")
- AI hype ("Naša AI tehnologija")
- Generičke marketinške fraze
- Polovične "garancije" ili money-back tvrdnje

---

## 9. Sprint roadmap (Y1 → Y3)

### 9.1. Y1 (Mala Matura 2027)

- 12 mock testova (kreirani iz baze)
- AI objašnjenja iz LLM-a
- Manuelni payment flow
- Standard cena 4.990, early bird 3.990
- Cilj: 400-560 kupaca

### 9.2. Y2 (Mala Matura 2028)

- 16 mock testova (4 dodatna sa pravim mature setom ako pravno)
- Online plaćanja
- Cena 5.490 (raste sa inflacijom)
- Familija plan launch
- Možda: godišnji Sprint kao opcija
- Cilj: 1.800-2.400 kupaca

### 9.3. Y3 (Mala Matura 2029)

- Regionalna ekspanzija (BiH, CG)
- Sprint za prijemne (srednja škola) — novi paket
- Cena 5.990
- Cilj: 5.250-6.000 kupaca

---

## 10. Otvorena pitanja

- [ ] Da li nuditi Sprint partial pristup ako prekine ranije? **NE — nije pretplata, jednokratan paket. Ali "godišnji Sprint" varijanta može biti opcija u Y2**.
- [ ] Da li Sprint kupci imaju dostup posle juna? **DA, do kraja kalendarske godine, kao read-only access da pregledaju**.
- [ ] Da li "premium pitanja" exclusive (500-1000 ekstremno teških pitanja samo za Sprint)? **NE u Y1. Razmotriti u Y2 ako konkurencija počne da kopira**.

---

## 11. Šta NE radimo

- ❌ Bez money-back garancije ili povraćaja novca (odlučeno 2026-05-07)
- ❌ Bez gating-a pitanja iz Free verzije
- ❌ Bez time-lock-a sadržaja
- ❌ Bez "premium pitanja" exclusive (V1)
- ❌ Bez pretplate na Sprint
