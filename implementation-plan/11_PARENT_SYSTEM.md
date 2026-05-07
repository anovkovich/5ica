# 11 — Parent System

## Cilj

Roditeljski dashboard, sistem notifikacija, duel mehanika, multi-child porodica.

---

## 1. Roditeljski personas

### 1.1. Tipovi roditelja (3 archetypa)

**"Aktivni saputnik"** (~25%):
- Prati svako dete dnevno
- Igra duel sa detetom
- Kupuje Sprint čim se pojavi
- *Naš prvi advocat*

**"Diskretni nadzornik"** (~50%):
- Čita nedeljni email
- Ne otvara dashboard često
- Kupuje Sprint ako vidi vrednost
- *Većinski segment, treba im jasnost i poverenje*

**"Krizni roditelj"** (~25%):
- Otvara app tek kad počne mala matura strah (februar 8. razreda)
- Kupuje Sprint pod pritiskom
- *Treba ih pretvarati u ranije aktivne kroz email kampanje*

### 1.2. Šta svaki očekuje

| Persona | Glavna potreba |
|---|---|
| Aktivni | Detalji, kontrola, učešće |
| Diskretni | Brzi pregled, "sve je u redu" potvrda |
| Krizni | Hitna pomoć, jasan ROI od Sprint-a |

UX ne pravi različite UI-jeve — pravi **layered information** (osnovne stvari odmah, detalji ako se klikne).

---

## 2. Parent dashboard arhitektura

### 2.1. Glavni layouti

**Mobile (primary)**:
- Single column
- Card-based stack
- Bottom nav: Dashboard, Deca, Duel, Sprint, Settings

**Desktop**:
- Split view: leva strana = lista dece, desna = detalji
- Side menu: Dashboard, Deca, Duel, Sprint, Akademija (FAQ + tutorials), Settings

### 2.2. Glavne sekcije

(detalji u `05_UX_SCREENS_FLOWS.md` 3.1)

1. **Header**: pozdrav, switcher dece
2. **Glavna kartica**: aktivnost ovog meseca
3. **Spremnost** (samo 8. razred ili Sprint aktivan)
4. **Sprint promo** (ako pre Sprint-a)
5. **Igraj sa detetom** (duel CTA)
6. **Aktivnost graf**

---

## 3. Multi-child support

### 3.1. Modeling

Roditelj može imati 1-5 dece. Schema:
- `users[type=parent]` ima 1 to N `children[]` references
- `families` collection drži strukturu

### 3.2. UX

- Tab switcher na vrhu: "Marko 7r" "Ana 3r" "Petar 5r"
- Ili swipe na mobilnom
- Default: prvi dete sa pendingom (npr. Sprint)

### 3.3. Family Plan (Y2 feature)

- 1 dete: standardna cena
- 2 dece: drugi -50%
- 3+ dece: treći -60%

Ne treba u Y1, ali skupa kalkulisat ćemo Y2.

---

## 4. Notifikacijski sistem

### 4.1. Tipovi

| Tip | Kanal | Frekvencija |
|---|---|---|
| Nedeljni izveštaj | Email | Nedeljno (subota 11am) |
| Mesečni pregled | Email | Mesečno (1. u mesecu) |
| Achievement alert | Push | Po događaju (max 1/dan) |
| Spremnost update (8. razred) | Email | Mesečno |
| Sprint conversion (jesen) | Email | 3 puta tokom oktobra-januara |
| Sprint reminder (sezona) | Email | Nedeljno tokom mart-juna |
| Refund follow-up | Email | Posle male mature |
| Critical alert (npr. flag) | Email + Push | Po događaju |

### 4.2. Email templates

Sve kroz **React Email** (komponente).

**Templates** (svi u `emails/` folderu):
- `magic-link.tsx`
- `welcome-parent.tsx`
- `weekly-report.tsx` (parametrizovan)
- `monthly-overview.tsx`
- `sprint-promo.tsx`
- `sprint-purchase-confirmation.tsx`
- `sprint-week-progress.tsx`
- `child-achievement.tsx`
- `streak-broken.tsx` (subtilan, ne-guilt)
- `refund-followup.tsx`

### 4.3. Push notification system

VAPID + Service Worker (vidi `02_ARCHITECTURE.md`).

- Subscribe je opt-in (treba klik)
- Settings: roditelj može da iskljuci push za bilo koje dete
- Tihi sat 21-08 (ne saljemo)
- Maks 1 push dnevno po roditelju (ne preteramo)

### 4.4. Anti-spam pravila

- Maks 4 emaila nedeljno na roditelja (osim transakcionih kao magic link)
- "Otkaži pretplatu" link u svakom email-u (legalno obavezno + dobra praksa)
- Bounce handling: posle 3 bounce-a, isključi email za korisnika

---

## 5. Roditelj-vs-dete duel (detaljnije)

### 5.1. Trigger sa roditeljske strane

Iz dashboard-a:
- Klik "Igraj sa Markom"
- Modal: "Šta želiš da igraš?"
  - Predmet (dropdown sva 14)
  - Razred (dropdown — može i svoj jaki: Mama može matematiku 8. razreda iako je Marko 5)
  - Broj pitanja: 3 / 5 / 10
  - Mode: Sync (oboje sad) / Async (kad Marko može)

### 5.2. Sync mode flow

```
1. Roditelj klikne "Sync — sad"
2. Backend kreira duel, status="pending"
3. Push detetu: "Mama te izaziva! Klikni za pridruživanje"
4. Detete prima push, klikne, ulazi u duel waiting room
5. "Mama je spremna, klikni Start kad budeš spreman"
6. Oboje klike Start → duel počinje
7. Pitanja se prikazuju oba istovremeno
8. Posle 5 pitanja: rezultat ekran (oboje vide)
```

**Edge cases**:
- Dete ne odgovori za 60 sec → push reminder
- Posle 5 min bez ulaska deteta → mama dobija "Marko trenutno nije dostupan, hoćeš async?"

### 5.3. Async mode flow

```
1. Roditelj klikne "Async"
2. Roditelj rešava 5 pitanja sam (tajmer beleži vreme)
3. Status="awaiting-child", expiresAt=24h
4. Push detetu: "Mama te izaziva, ima 24h"
5. Detete kad ima vremena: ulazi, vidi mamin score (ne odgovore)
6. Detete rešava 5 pitanja istih
7. Rezultat: "Marko 4, Mama 3 — pobedio si!"
8. Stat: "Sa mamom: 8-3"
```

### 5.4. Skor logika

```
score = (correct * 10) + (speedBonus)
speedBonus = max(0, (60 - timeSec)) * 0.5  // brzi odgovor donosi više
```

Ko je viši skor = pobednik. Tie = obojstrano win.

### 5.5. Rewards

| Ishod | Šta dobija |
|---|---|
| Detete pobedi | +30 XP, "Pobedio mamu" bedž (5 puta = bronza, 10 = srebro, 25 = zlato) |
| Roditelj pobedi | "Sledeći put bolje!" mikroporuka, ne-shame |
| Tie | Obostrano +10 XP |

### 5.6. Familija mode (gostovanje)

Roditelj može da pošalje pozivnicu drugom članu porodice (baka, deda, teča):

```
1. Roditelj iz dashboard: "Pozovi nekog drugog"
2. Ime gosta, email
3. Email gostu sa magic linkom (24h valid)
4. Gost klikne, ulazi u "guest mode"
5. Bira da li hoće da igra sa Markom (jedinim detetom u toj porodici)
6. Duel ide kao parent-child duel, ali sa gostom kao izazivačem
7. Posle duel-a: "Hoćeš da napraviš svoj nalog za vežbanje?" CTA
```

**Konverzija gostiju u korisnike**: super viralna mehanika.

### 5.7. Stats UI

Roditeljski profil ima sekciju:
- "Sa Markom: 7-3 (Marko vodi)"
- "Sa Anom: 12-15 (Ana vodi)"
- Klik na to: detaljan history

---

## 6. Pravo i privatnost (parental controls)

### 6.1. Roditelj može da promeni za dete

- Avatar
- Nadimak (display name)
- Razred (ako greška u onboarding)
- Razred kod (8-2)
- Notifikacije ON/OFF (sve ili specifične)
- Privatnost: leaderboards (razred / škola / Srbija lige)
- Drugovi (može da odobri ili ukloni)

### 6.2. Dete NE može da promeni

- Email roditelja
- Avatar (ako je roditelj zaključao)
- Privatnost (default je locked)

### 6.3. Brisanje deteta

Roditelj može da obriše dete:
- Soft delete (`deletedAt`)
- Audit log
- Posle 30 dana hard delete (osim ako pravne obaveze drugačije)

### 6.4. Pristup podataka

Roditelj može da skine:
- Sve podatke deteta u JSON (GDPR right)
- Po klik "Izvezi sve podatke"

---

## 7. Onboarding roditelja (checklist)

### 7.1. First-time experience

Posle email verifikacije:

```
1. Welcome screen: "Drago nam je da si tu!"
2. "Reci nam o detetu" (forma)
3. "Hajde da kreiraš detetov nalog"
4. Avatar pick (ili dete bira)
5. "Pošalji link Marku" — QR ili copy-link
6. Tutorial: "Kako da iskoristiš dashboard"
   - Kako da vidiš napredak
   - Kako da igraš duel
   - Kako da kupiš Sprint
7. "Postavi notifikacije" (opt-in)
8. Završi → redirect ka dashboard
```

### 7.2. First week experience

Email automation:
- Day 0: Welcome
- Day 3: "Kako Marko napreduje?" (sa ranim podacima)
- Day 7: Prvi nedeljni izveštaj
- Day 14: "Igraj sa Markom prvi put?" (duel CTA)
- Day 30: Prvi mesečni pregled

---

## 8. Roditeljska "akademija" (FAQ + tutorials)

V1: jednostavna FAQ stranica + 3-5 video tutoriala.

V2: prošireniji "učimo zajedno":
- "Kako pomoći detetu sa matematikom"
- "Šta je mala matura"
- "Kako razumeti spremnost-skor"

Ovo gradi brand i autoritet.

---

## 9. Otvorena pitanja

- [ ] Da li dozvoljavamo 2 roditelja na 1 dete (razvedeni roditelji)? **DA u v1.5 — coParentIds field već u shemi**.
- [ ] Da li roditelj može da deli svoj nalog sa drugim roditeljem (npr. otac i majka oba u app-u)? **DA — koristi se isti email, magic link funkcioniše za oba uređaja**.
- [ ] Da li dete može da ima 2 roditelja sa različitim email-ima? **DA u v1.5**.
