# 18 — Launch Playbook

## Cilj

Korak-po-korak vodič za pre-launch, soft launch, public launch, i prvu sezonu. Za svaku fazu: ciljevi, akcije, rizici, success metrika.

---

## 1. Vremenska tabela (visoki nivo)

| Mes | Faza | Glavni cilj |
|---|---|---|
| Avg 2026 | Pre-launch -3 | Brand foundation, lista čekanja |
| Sep 2026 | Pre-launch -2 | Rast publike, beta tester recruit |
| Okt 2026 | Pre-launch -1 | MVP build, beta start |
| Nov 2026 | Soft launch | Public free verzija live |
| Dec 2026-Jan 2027 | Growth | Rast 8-grade publike |
| Feb 2027 | Pre-sezona | Early bird Sprint, kampanje |
| Mar-Jun 2027 | **SEZONA** | Glavna prodaja, peak revenue |
| Jul 2027 | Post-sezona | Recap, sertifikati, planiranje |
| Avg 2027 | Hladan period | Y2 priprema |

---

## 2. Pre-launch (avgust-oktobar 2026)

### 2.1. Avgust 2026 (Mes -3)

**Glavni cilj**: Brand foundation, signup forme

**Akcije**:
- [ ] Registruj `@malamaturapitanja` Instagram
- [ ] Reservation `@malamatura` TikTok, FB Page, FB Group
- [ ] Domain `malamatura.app` kupljen + DNS
- [ ] Logo v1 (ili placeholder)
- [ ] Landing page sa email signup (Vercel deploy)
- [ ] Email magnet: PDF "10 najtežih pitanja sa prošle male mature" (besplatan)
- [ ] Google Workspace email setup (`info@malamatura.app`)

**Sadržaj plan**:
- 30 Instagram Reels queued (1 dnevno)
- 8 Facebook posts (2 nedeljno)
- 1 blog post nedeljno (2 ukupno)

**Marketing budget**: 0 RSD (organic only)

**KPI cilj**: 100 follower-a, 50 emaila

### 2.2. Septembar 2026 (Mes -2)

**Glavni cilj**: Rast publike, content engine

**Akcije**:
- [ ] Daily posting ritm (1 Reel + 1 Story)
- [ ] FB Group "Roditelji osmaka 2027" otvorena, aktivna moderacija
- [ ] Cross-promotion sa 2-3 edukatora (besplatan plug u njihove publike)
- [ ] Email newsletter pokrenuta (nedeljna)
- [ ] 4 blog post-a published (SEO-targeted)

**Sadržaj plan**:
- Diversifikacija formata (Reel + Carousel + Static)
- Početak engagement strategije (komentari, deljenje)

**Marketing budget**: 50€ za testiranje FB ads (signal, ne scale)

**KPI cilj**: 1.000 follower-a, 200 emaila

### 2.3. Oktobar 2026 (Mes -1)

**Glavni cilj**: MVP build + beta tester recruitment

**Akcije Tech**:
- [ ] MVP build kompletan (Faza 1 iz `19_ROADMAP_MILESTONES.md`)
- [ ] Beta deploy on staging
- [ ] 50 beta porodica recruited (FB Group post)

**Akcije Marketing**:
- [ ] Soft launch teaser ("Nešto novo dolazi u novembru!")
- [ ] Email sequence za beta sign-up

**KPI cilj**: 3.000 follower-a, 800 emaila, 50 beta porodica

---

## 3. Soft Launch (novembar 2026)

### 3.1. Pre-launch checklist (pre nego što kažemo "live")

- [ ] **Pravno**: TOS, Privacy Policy, Parental consent flow
- [ ] **Pravno**: Ugovor o ustupanju autorskih prava potpisan
- [ ] **Tech**: All Faza 1 + Faza 2 features rade
- [ ] **Tech**: Performance test prošao (100 simulatanih korisnika)
- [ ] **Tech**: Sentry, PostHog, Cloudflare aktivni
- [ ] **Tech**: PWA install + push notifikacije rade na iOS i Android
- [ ] **Tech**: Email magic link delivery <30s
- [ ] **Sadržaj**: 30 dana sadržaja queued
- [ ] **Sadržaj**: Onboarding flow polished (3 review-a)
- [ ] **Sadržaj**: AI explanations generisani za sve 8.428 pitanja
- [ ] **Brand**: Logo, copy, microcopy finalni
- [ ] **Brand**: 5 testimonijala iz beta (real children + parents)

### 3.2. Launch day plan (D-day)

**Subota, 1. novembar 2026** (preporuka):

```
07:00 — Final check (Sentry, Vercel, baza)
08:00 — DNS check, brzi test svih flow-ova
09:00 — Email blast na waiting list ("Smo live!")
10:00 — Instagram + TikTok announcement Reels
11:00 — Facebook Group post + announcement
12:00 — Meta ads activated (small budget 100€/day)
13:00 — Monitor metrike u real-time
24:00 — Rezime dana
```

**Sadržaj announcement-a**:
- "Posle godinu dana razvoja..."
- "Naša misija: pomoći deci da spremno dočekaju malu maturu"
- "Free verzija dostupna danas"
- "Sprint paket dolazi u martu 2027"
- "Hvala beta porodicama: [lista]"

### 3.3. First 7 days

**Daily**:
- Pratiti metrike (sign-ups, errors)
- Quickly odgovarati na support tickets
- Engage sa svakim user-om koji komentariše na social
- Feedback session sa 2-3 nove porodice

**KPI cilj posle 7 dana**:
- 500 sign-ups
- D7 retention >20% (early indicator)
- <10 P0 / P1 bugs

### 3.4. First 30 days

**Glavni fokus**: ciljano povećanje 8-grade audience-a + retention.

**Akcije**:
- [ ] Daily content
- [ ] Refine onboarding na osnovu drop-off podataka
- [ ] A/B test email subject lines
- [ ] Engage influencer-e (1-2 micro-influencer-a sa 5-15k followers, mom blogger)

**KPI cilj kraj novembra**:
- 5.000 sign-ups
- D7 retention >25%
- 15% udeo 8-gradera u bazi

---

## 4. Growth period (decembar 2026 — februar 2027)

### 4.1. Decembar 2026 (Mes +1)

**Glavni cilj**: Polish + holiday push

**Akcije**:
- [ ] Bug fix sweep (sve P0/P1 popravljeno)
- [ ] Beta feedback iteration (UX poboljšanja)
- [ ] "Učenje uz čokoladu" holiday content sa kalendarom
- [ ] Roditeljski-focused emails (8-grade strah pre poluraspusta)

**KPI**: 10.000 sign-ups, 20% 8-graderi

### 4.2. Januar 2027 (Mes +2)

**Glavni cilj**: 8-grade audience build

**Akcije**:
- [ ] Targeting refine: 8-grade roditelji prvi prioritet
- [ ] Retargeting kampanja: posetioci koji se nisu registrovali
- [ ] Soft Sprint announcement (counter "Mala matura: 90 dana")
- [ ] Early bird preregistration page open

**Marketing budget**: 100k RSD/mes

**KPI**: 20.000 sign-ups, 25% 8-graderi, 100 early bird preregistracija

### 4.3. Februar 2027 (Mes +3)

**Glavni cilj**: Pre-sezona "warm up", aggressive Sprint marketing

**Akcije**:
- [ ] **Early bird Sprint live**: 3.990 RSD do 1. marta
- [ ] Email kampanja na sve 8-grade roditelje
- [ ] Spremnost % počinje da se prikazuje u app-u (8-grade only)
- [ ] Roditeljski email weekly: spremnost update + Sprint pitch
- [ ] Influencer partnerships finalized (5+ micro-influencers)

**Marketing budget**: 200k RSD u februaru

**KPI**:
- 30.000 sign-ups, 30% 8-graderi
- 200-400 Sprint early bird pre-orders
- D7 retention >25% (held steady)

---

## 5. Sezona (mart-jun 2027) — GLAVNI PRIHOD

### 5.1. Mart 2027 (Sezona Mes 1)

**1. mart**: Sprint full price aktiviran (4.990 RSD)

**Glavni cilj**: Maksimizacija Sprint sales

**Akcije**:
- [ ] Hijerarhija marketinga prebačena na Sprint promocije
- [ ] Daily countdown content ("Mala matura: 87 dana")
- [ ] FB / Google ads heavy push (200-300k RSD/mes)
- [ ] PR pitch na 2-3 publikacije (Politika nedeljnik, Mama Magazine)
- [ ] Sprint kupcima: prvi mock test
- [ ] Free 8-graderi: "Spremnost gauge" pošten ali ohrabri Sprint

**KPI**:
- 100-200 Sprint sales u martu
- Free → Sprint conversion stabilizuje

### 5.2. April 2027 (Sezona Mes 2)

**Glavni cilj**: Sustain Sprint sales + retention

**Akcije**:
- [ ] Daily content fokus na Sprint
- [ ] "60 dana do mature" kampanja
- [ ] Mock test 4-5 za Sprint kupce
- [ ] Email nudges za zone roditelja koji oklevaju

**KPI**:
- 100-150 Sprint sales u aprilu
- Cumulative: 200-350 Sprint kupaca

### 5.3. Maj 2027 (Sezona Mes 3)

**Glavni cilj**: Final push + Sprint retention

**Akcije**:
- [ ] "30 dana do mature" urgency kampanja
- [ ] Sprint kupci: finalna mock testovi
- [ ] Roditeljski email "Marko je spreman?" sa tačnom procenom
- [ ] PR follow-up + testimonial collection

**KPI**:
- 50-100 Sprint sales u maju
- Cumulative: 250-450

### 5.4. Jun 2027 (Sezona Mes 4)

**Glavna mala matura**: očekivanja sredinom juna

**Akcije**:
- [ ] "Final week" content
- [ ] Sprint kupci: review modes, "spremni ste" kampanja
- [ ] Posle mature: čestitke, Sprint sertifikati distribuirani

**KPI**:
- 50-100 Sprint sales u prvoj polovini juna
- Cumulative Y1: **400-560 Sprint kupaca**

---

## 6. Post-sezona (jul-avgust 2027)

### 6.1. Jul 2027

**Glavni cilj**: Recap, retention, planiranje

**Akcije**:
- [ ] Refund flow (kraj jula deadline)
- [ ] Testimonial collection (uspesi mature)
- [ ] Y1 → Y2 retrospektiva
- [ ] Public report "Naša prva sezona u brojkama"
- [ ] Sertifikati za sve Sprint kupce (PDF)

### 6.2. Avgust 2027

**Glavni cilj**: Y2 priprema

**Akcije**:
- [ ] Y2 plan finalize
- [ ] Tech roadmap
- [ ] Possible Y2 features ranked
- [ ] Budget Y2 setup

---

## 7. Y2 plan (skraćeno)

### 7.1. Mes po mes

- Sep-Okt 2027: stabilizacija + nove features (familija plan?)
- Nov 2027 - Feb 2028: Y2 audience build
- Mar-Jun 2028: Y2 sezona (target 1.500-2.500 Sprint kupaca)
- Jul-Avg 2028: pripreme za Y3

### 7.2. Y2 inovacije

- Familija plan launch
- Online plaćanja (Monri / NestPay)
- Native iOS/Android (možda)
- Regional ekspanzija start (BiH, CG)
- Možda godišnji Sprint kao opcija

---

## 8. Risk scenarios i mitigation

### 8.1. "D7 retention pada ispod 25% pre marketing scale-a"

**Action**:
- STOP marketing budget
- Refaktoriši onboarding (najveći leak point)
- Refaktoriši home screen (motivacija)
- Re-launch posle 4 nedelje fix-eva

### 8.2. "Free → Sprint konverzija pada ispod 5%"

**Action**:
- Survey roditelja "zašto niste kupili?"
- Adjust pricing ili paket sadržaj
- Refine marketing copy ka roditeljima
- Re-test pre kraja sezone

### 8.3. "Marketing CAC raste >2.500 RSD"

**Action**:
- Diversifikacija (TikTok, organic content)
- A/B test ad creative-e
- Refine targeting
- Možda smanji budžet (negativan ROI)

### 8.4. "Tehnička katastrofa u sezoni"

**Action**:
- Vidi `02_ARCHITECTURE.md` 8 — disaster recovery
- Public komunikacija transparently
- Compensate kupce (mesec besplatno produženje, refund opcije)

---

## 9. Komunikacija i PR

### 9.1. Tone of voice za public komunikaciju

- Profesionalno ali topla
- Konkretni brojevi
- Bez "growth-hacker" žargona
- Bez over-the-top "DISRUPTING EDU" tona

### 9.2. PR pitch template

Subject: "Aplikacija koja [konkretan rezultat]"

Body:
- Šta radimo
- Šta je novost (gejmifikacija + roditeljski sloj)
- Statistika (npr. "500 dece je već uspešno spremilo malu maturu")
- Kontakt info

### 9.3. Spokesperson

Ti si lice projekta. Ne skrivaj se iza brand-a.

---

## 10. Otvorena pitanja

- [ ] Da li lansiramo nedelje ili meseci ispred plana ako MVP gotov ranije? **Lansiramo čim 30+ beta porodica koristi 7+ dana — ne forsiramo datum**.
- [ ] PR strategija u domaćim medijima — sada ili kasnije? **Pre Sprint sezone (februar)**.
- [ ] Public landing strana koja link-uje na app.malamatura.app ili sve na malamatura.app? **Sve na isti domen, /app routinje za logovan**.
