# 19 — Roadmap & Milestones

## Cilj

Sedmica-po-sedmica plan od zero do prve sezone. Svaki milestone ima jasne deliverables i quality gate.

---

## 1. High-level fazni pregled

| Faza | Sedmice | Cilj | Quality gate |
|---|---|---|---|
| Faza 0 | Setup (1-2 nedelje pre koda) | Pravna + brand temelji | Domain, ugovor, social pokrenut |
| Faza 1 | MVP (Ned 1-8) | Funkcionalan kviz za 1 predmet | 1 porodica koristi 7 dana |
| Faza 2 | Beta (Ned 9-16) | Svi predmeti, AI, duel, dashboard | 50 porodica, NPS >40 |
| Faza 3 | Public (Ned 17-24) | Marketing site, gamefikacija polished | 5.000 sign-ups, D7 >25% |
| Faza 4 | Sprint (Ned 25-32) | Sprint paket build | Beta 50 Sprint kupaca |
| Faza 5 | Sezona (Mar-Jun) | Glavna prodaja | 400+ Sprint kupaca |

---

## 2. Faza 0 — Pre-development (2 nedelje)

### 2.1. Sedmica -2

**Pravno**:
- [ ] Razgovor sa prijateljem o ugovoru autorskih prava
- [ ] Konsultacija advokata (1h, 5-10k RSD)
- [ ] Trademark check za "Mala Matura"

**Brand**:
- [ ] Domain `malamatura.app` (ili alternativa) kupljen
- [ ] Email `info@malamatura.app` setup
- [ ] Logo placeholder

**Pravna struktura**:
- [ ] APR registracija paušalca (1 dan)
- [ ] Bank račun otvoren

### 2.2. Sedmica -1

**Pravno**:
- [ ] Ugovor potpisan i overen
- [ ] TOS draft
- [ ] Privacy Policy draft

**Brand**:
- [ ] Instagram nalog `@malamaturapitanja` registrovan
- [ ] FB Page i Group otvoreni
- [ ] TikTok account
- [ ] Prvi Reel postuje (testira engagement)
- [ ] Email magnet PDF "10 najtežih pitanja"

**Tech setup**:
- [ ] GitHub repo
- [ ] Vercel account
- [ ] MongoDB Atlas account (free M0)
- [ ] Resend, PostHog, Sentry accounts

---

## 3. Faza 1 — MVP (Sedmica 1-8)

**Cilj fazi**: Funkcionalan kviz za matematiku 8. razreda + osnovna gamefikacija + magic link auth.

### 3.1. Sedmica 1 — Foundation

**Tech**:
- [ ] Next.js 15 + Tailwind + Mongoose setup
- [ ] Mongo schema (Faza 1 collections: users, families, magicLinks, sessions)
- [ ] Auth: magic link flow
- [ ] Cloudflare DNS + Vercel deploy
- [ ] Tailwind + shadcn/ui base components

**Deliverable**: praznu shell sa magic link auth radi.

### 3.2. Sedmica 2 — Data import

**Tech**:
- [ ] Mongo schema (questions, subjects, classes, chapters)
- [ ] Skripta `import-questions.ts`
- [ ] Validacija: sve 8.428 pitanja ispravno importovano
- [ ] Indeksi kreirani

**Deliverable**: baza je puna, queryable.

### 3.3. Sedmica 3 — Quiz core

**Tech**:
- [ ] API: `/api/kviz/start`, `/api/kviz/odgovor`
- [ ] Naivni question selection (random za matematiku 8)
- [ ] XP calculation (3-Q +3, 4-Q +2, etc.)
- [ ] Quiz session document model

**UI**:
- [ ] Home screen (placeholder)
- [ ] Quiz screen
- [ ] Result screen (basic)

**Deliverable**: dete može da odigra 5-pitanja sesiju.

### 3.4. Sedmica 4 — Streak + UX polish

**Tech**:
- [ ] Streak logic + freeze
- [ ] Push notifikacija setup (VAPID)
- [ ] Service Worker za PWA

**UI**:
- [ ] Home screen sa streak prikazom
- [ ] Onboarding flow (parent + child)
- [ ] Avatar selection (12 default)

**Deliverable**: PWA installabilan, push push works.

### 3.5. Sedmica 5 — Roditeljski osnov

**Tech**:
- [ ] API: `/api/roditelj/dashboard`
- [ ] Email weekly report skripta (manual trigger za sad)

**UI**:
- [ ] Roditeljski layout
- [ ] Basic dashboard (1 dete, statistika)
- [ ] Settings za dete (notifikacije, leaderboards)

**Deliverable**: roditelj vidi šta dete radi.

### 3.6. Sedmica 6 — Marketing site

**UI**:
- [ ] Homepage (hero, kako radi, FAQ)
- [ ] /kako-radi
- [ ] /cene
- [ ] /pravila-koriscenja, /privatnost
- [ ] Email signup form

**SEO**:
- [ ] Meta tags, OG tags
- [ ] Sitemap, robots.txt

**Deliverable**: javno landing je ready.

### 3.7. Sedmica 7 — Bug fix sweep + tests

**Tech**:
- [ ] Unit testovi za XP, streak, question selection
- [ ] Integration test za auth flow
- [ ] Manual smoke test svih flow-ova

**UX**:
- [ ] Empty states
- [ ] Error states
- [ ] Loading states

**Deliverable**: stable, production-ready.

### 3.8. Sedmica 8 — Internal beta

**Akcija**:
- [ ] Deploy u staging environment
- [ ] 5 internal testera (porodica, prijatelji, ti)
- [ ] Feedback collection
- [ ] Quick fixes

**Quality gate**:
- [ ] 1 porodica koristi 7 dana zaredom
- [ ] Sve P0/P1 bugovi popravljeni
- [ ] Streak, XP, push rade

---

## 4. Faza 2 — Beta (Sedmica 9-16)

**Cilj fazi**: Svi predmeti dostupni, AI explanation cache pun, duel mehanika, beta sa 50 porodica.

### 4.1. Sedmica 9 — All subjects

**Tech**:
- [ ] Adaptive question selection algoritam (Faza 1 verzija)
- [ ] UI za izbor predmeta + razreda
- [ ] Subject + chapter color coding

**Deliverable**: dete može da bira 14 predmeta i 8 razreda.

### 4.2. Sedmica 10 — AI explanations

**Tech**:
- [ ] Skripta `generate-ai-explanations.ts`
- [ ] Bulk run za sve 8.428 pitanja (basic + detailed)
- [ ] API endpoint `/api/kviz/objasnjenje`

**UI**:
- [ ] Modal sa AI objašnjenjem posle pogreske
- [ ] "Helpful?" feedback dugmad

**Deliverable**: cache 8.428 objašnjenja, user može da vidi kad pogreši.

### 4.3. Sedmica 11 — Bedževi + leveli

**Tech**:
- [ ] Badge engine (criteria checking)
- [ ] Level XP curve
- [ ] User badges + level UI

**UI**:
- [ ] Profile screen sa bedževima
- [ ] Level up animacija
- [ ] Badge unlock animacija

**Deliverable**: 100 bedževa definisano, level system funkcionalan.

### 4.4. Sedmica 12 — Drugovi + razred leaderboard

**Tech**:
- [ ] Friend code + system
- [ ] Razred + školu leaderboard queries

**UI**:
- [ ] Drugovi screen
- [ ] Razred leaderboard
- [ ] Friend request flow

**Deliverable**: socijalni sloj radi.

### 4.5. Sedmica 13 — Duel mehanika

**Tech**:
- [ ] Duel API (sync + async)
- [ ] Real-time pooling for sync
- [ ] Parent-child duel logic

**UI**:
- [ ] Duel screen (oba mode)
- [ ] Roditelj-vs-dete iz dashboard-a
- [ ] Stats prikaz "Sa mamom: 7-3"

**Deliverable**: duel funkcionalan, family mode radi.

### 4.6. Sedmica 14 — Lige

**Tech**:
- [ ] Liga matchmaking algoritam (groupiranje)
- [ ] Weekly reset cron job
- [ ] Promote / demote logic

**UI**:
- [ ] Liga screen sa rankings
- [ ] Promote/demote animacije

**Deliverable**: nedeljne lige funkcionalne.

### 4.7. Sedmica 15 — Roditelj polish

**Tech**:
- [ ] Detailed parent dashboard
- [ ] Weekly report email automation
- [ ] Spremnost % calculation za 8. razred

**UI**:
- [ ] Multi-child support
- [ ] Detail child page
- [ ] Spremnost gauge

**Deliverable**: roditelj ima pun dashboard.

### 4.8. Sedmica 16 — Beta launch

**Akcija**:
- [ ] Recruit 50 porodica iz FB grupe
- [ ] Beta onboarding (50 porodica primaju free Sprint = compensation)
- [ ] Feedback session (bi-weekly)
- [ ] Bug tracking aktivan

**Quality gate**:
- [ ] 50 porodica registrovano
- [ ] D7 retention >25% (minimal viable)
- [ ] NPS >40 iz prvog feedback round-a
- [ ] Sve P0/P1 popravljeni

---

## 5. Faza 3 — Public (Sedmica 17-24)

**Cilj fazi**: Public free verzija live, marketing počinje, target 5.000 sign-ups.

### 5.1. Sedmica 17-18 — Polish + perf

**Tech**:
- [ ] Performance audit + optimization (Lighthouse 90+)
- [ ] Mobile testing na real devices (iPhone, Android)
- [ ] Cloudflare cache rules
- [ ] CDN za assets

**UX**:
- [ ] Final UI polish
- [ ] Animacije polished
- [ ] Microcopy review

### 5.2. Sedmica 19 — Marketing prep

**Sadržaj**:
- [ ] 30 Reels queued
- [ ] 10 blog post-ova published
- [ ] Email sequence za nove sign-ups (welcome + onboarding)
- [ ] Logo finalan (freelance ili polish)

### 5.3. Sedmica 20 — Public launch

**Akcija**:
- [ ] Soft launch (1. novembar 2026)
- [ ] Email blast na waiting list
- [ ] Social blast
- [ ] FB ads aktivirani (50€/dan)

**Monitor**: sign-ups, errors, performance u real-time.

### 5.4. Sedmica 21-22 — Optimize

**Akcija**:
- [ ] A/B test onboarding (varijante na osnovu drop-off podataka)
- [ ] Email sequence iteration
- [ ] Influencer outreach
- [ ] Bug fix sweep

### 5.5. Sedmica 23-24 — Quality gate

**Quality gate**:
- [ ] 5.000 sign-ups
- [ ] D7 retention >25%
- [ ] Engagement metrics zdravi (avg sesija >1.2/DAU)
- [ ] Roditeljski dashboard usage >50%

Ako ne pogađaju — refaktoriši pre Sprint development-a.

---

## 6. Faza 4 — Sprint development (Sedmica 25-32)

**Cilj fazi**: Sprint paket gotov, beta sa 50 Sprint kupaca, Sprint flow tested.

### 6.1. Sedmica 25-26 — Mock testovi

**Tech**:
- [ ] MockTest schema + seed
- [ ] Mock test UI (timer, navigation, submit)
- [ ] Mock test scoring + percentile
- [ ] 12 mock testova kreirana

### 6.2. Sedmica 27 — Sprint plan generator

**Tech**:
- [ ] Inicijalni asesman (30 pitanja)
- [ ] Plan generation (12-nedeljni)
- [ ] Daily plan algoritam

**UI**:
- [ ] Sprint home screen
- [ ] Daily plan prikaz
- [ ] Spremnost gauge

### 6.3. Sedmica 28 — Sprint payment

**Tech**:
- [ ] NBS QR generator
- [ ] Purchase flow
- [ ] Admin panel za uplate
- [ ] Activation flow

**UI**:
- [ ] Sprint info strana
- [ ] Plaćanje ekran sa QR-om
- [ ] Status tracking

### 6.4. Sedmica 29 — Sprint AI

**Tech**:
- [ ] Detailed AI explanations (Sprint only)
- [ ] AI coach (daily push poruke)
- [ ] Premium content gating

### 6.5. Sedmica 30 — Roditelj Sprint dashboard

**UI**:
- [ ] Dnevni Sprint pregled za roditelja
- [ ] Detaljni izveštaji
- [ ] Mock test rezultati

### 6.6. Sedmica 31 — Sprint testing

**Akcija**:
- [ ] 50 beta Sprint kupaca (out of beta porodica)
- [ ] Test plaćanje, aktivacija, mock testovi
- [ ] Refund flow tested manualno
- [ ] Quality assurance

### 6.7. Sedmica 32 — Sprint launch readiness

**Quality gate**:
- [ ] 50 Sprint kupaca prošlo flow
- [ ] Edge case payment proces funkcionalan (duplikat, pogrešan iznos)
- [ ] Pravne dokumente final (Sprint uslovi, TOS, Privacy)
- [ ] Marketing materijal za Sprint spreman (Free vs Sprint comparison)
- [ ] Performance test prošao za sezonsku skalu

---

## 7. Faza 5 — Sezona (Mart-Jun 2027)

(Detaljno u `18_LAUNCH_PLAYBOOK.md` sekcija 5)

Glavni mileštoni:

| Datum | Milestone |
|---|---|
| 1. mart 2027 | Sprint full price live, Early bird kraj |
| 15. mart | "60 dana do mature" check-in |
| 1. april | "30 dana" intenzivna kampanja |
| 15. maj | "Final" stretch |
| Sredina juna | Mala matura odbrana |
| Jul | Y1 retrospektiva, sertifikati, testimonijali |

**Quality gate (Y1 success)**:
- [ ] 400-560 Sprint kupaca prodato
- [ ] Net Y1 profit: 0 do +1M RSD

---

## 8. Granular tracking — Github Project ili Linear

### 8.1. Issue tagging

- `phase-1`, `phase-2`, etc.
- `priority/p0`, `priority/p1`, `priority/p2`
- `type/bug`, `type/feature`, `type/refactor`
- `area/auth`, `area/quiz`, `area/sprint`, etc.

### 8.2. Sedmični review

Ponedeljkom ujutro:
- Šta je urađeno prošle nedelje
- Šta je u planu ovu nedelju
- Blockers
- Risks

### 8.3. Mesečni rollup

1. u mesecu:
- Faze progress
- KPI status
- Decisions log

---

## 9. Otvorena pitanja

- [ ] Hoće li se MVP delivery klizati? Bilo koji buffer? **Buffer 2 nedelje između faza**.
- [ ] Da li Faza 4 (Sprint) može počneti pre Faza 3 quality gate-a? **NE — bez retencije, Sprint nema kupce**.
- [ ] Da li seznoska kalibracija znači adjustujemo plan po podacima? **DA — mesečni review i fix tokom sezone**.
