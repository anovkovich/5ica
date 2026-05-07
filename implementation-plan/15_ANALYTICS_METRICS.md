# 15 — Analytics & Metrics

## Cilj

Šta merimo, kako merimo, koji su pragovi koji znače "promenimo nešto".

---

## 1. North Star Metric

**Free → Sprint konverzioni rate u sezoni** (mart-jun 2027)

Definicija:
```
Sprint kupci u sezoni / Aktivni 8-graderi u bazi do februara
```

Cilj:
- Y1: **>5%** (ako manje, Sprint vrednovanje treba refaktorisanje)
- Y2: **>10%**
- Y3: **>15%**

Sve ostalo se podređuje ovome.

---

## 2. Tier 1 — Kritične metrike (weekly review)

### 2.1. D7 Retention (free fazi)

Definicija:
```
D7 = users who returned 7 days after signup / total signups
```

Cilj: **>25%**.

Ako pada ispod 20% — STOP marketing budget, refaktoriši retenciju.

### 2.2. % 8-gradera u bazi

Definicija:
```
8th_grade_users / total_users
```

Cilj do februara 2027: **>15%**.

Ako manje — paid ads ne pogađa target, refokusiraj.

### 2.3. Free → Sprint konverzija

(Vidi 1.0)

---

## 3. Tier 2 — Operativne metrike (weekly review)

### 3.1. Aktivnost

- **DAU** (Daily Active Users) — bilo koja sesija
- **WAU** (Weekly)
- **MAU** (Monthly)
- **DAU/MAU stickiness** — proxy za "navika"
- Cilj DAU/MAU: **>15%**

### 3.2. Sesije

- Prosečan broj sesija po DAU
- Prosečno trajanje sesije
- Distribucija po tipu (quick / standard / marathon)
- Cilj: prosečno >1.2 sesije po DAU

### 3.3. Streak

- Distribucija streak-a (koliko ljudi ima 7+, 30+, 100+ dana)
- Streak break rate (koliko nedeljno gube streak)
- Streak freeze usage rate
- Cilj: 30% ljudi sa 7+ dana streak-a posle 14 dana koriščenja

### 3.4. Engagement po feature-u

- Duel attempts
- Parent-child duels
- Friend additions
- Class leaderboard views
- League participation
- Mock test attempts (za Sprint)

### 3.5. Roditeljski dashboard

- % roditelja koji su otvorili dashboard u 7 dana
- % koji su otvorili nedeljni email
- % koji su iskoristili duel
- Cilj: 60% roditelja ulazi bar jednom nedeljno

---

## 4. Tier 3 — Tehničke metrike (daily monitoring)

### 4.1. Performance

- Mediana TTI (Time to Interactive) na mobile
- p95 TTI
- Cilj p95: **<3s** na 3G

### 4.2. Greške

- Error rate (Sentry)
- Cilj: **<1 greška per 1000 sesija**

### 4.3. Stability

- Uptime (Vercel + UptimeRobot)
- Cilj: **99.5%+**

### 4.4. API response times

- p50, p95, p99 po endpointu
- Cilj p95: **<500ms**

### 4.5. Resource usage

- DB query time
- LLM API latency (za AI explanation)
- Memory / CPU u Vercel dashboard-u

---

## 5. Tier 4 — Marketing metrike

### 5.1. Acquisition

- **CAC** (Cost per Acquisition) — total ad spend / new sign-ups
- CAC po kanalu (FB, IG, TikTok, Google)
- Cilj CAC: **<2.000 RSD** za sign-up

### 5.2. Conversion funnels

| Step | Cilj |
|---|---|
| Visit landing page | — |
| Start signup | 5% of visitors |
| Complete signup | 80% of starts |
| Verify magic link | 70% of completes |
| First quiz session | 60% of verified |
| Day 7 active | 25% of verified |
| Day 30 active | 15% of verified |
| Sprint conversion | 5% of active 8-graders |

### 5.3. Email metrike

- Open rate (cilj: >30%)
- CTR (cilj: >5%)
- Unsubscribe rate (cilj: <0.5%/email)

### 5.4. Social metrike

- Follower growth rate
- Engagement rate (likes + comments / followers)
- Reach
- Save rate (najjači indikator vrednosti)

---

## 6. Tier 5 — Revenue metrike

### 6.1. Sprint metrike

- Sprint sales count (po nedelji, po sezoni)
- Average revenue per Sprint
- Refund rate (cilj <2%)
- Early bird vs full price ratio

### 6.2. Forecasting

- Sprint sales forecast za sezonu (rolling)
- Predikcija na osnovu mjeseci do mature

---

## 7. Implementacija — PostHog setup

### 7.1. Eventi koje pratimo

#### Auth
- `signup_started`
- `signup_completed`
- `magic_link_sent`
- `magic_link_clicked`
- `magic_link_verified`
- `child_created`

#### Quiz / Game
- `session_started` (props: type, subject, grade)
- `question_answered` (props: questionId, isCorrect, timeMs)
- `session_completed` (props: type, correct, total, xpEarned)
- `streak_broken`
- `streak_milestone_reached` (props: days)
- `level_up` (props: from, to)
- `badge_unlocked` (props: badgeCode)
- `marathon_started`
- `marathon_completed`

#### Social
- `friend_added`
- `friend_request_sent`
- `friend_request_accepted`
- `class_leaderboard_viewed`
- `school_leaderboard_viewed`
- `league_promoted`
- `league_demoted`

#### Duel
- `duel_initiated` (props: type sync/async)
- `duel_completed` (props: outcome)
- `parent_child_duel_initiated`
- `family_guest_invited`

#### AI Explanation
- `ai_explanation_requested` (props: type basic/detailed)
- `ai_explanation_helpful_yes`
- `ai_explanation_helpful_no`

#### Sprint funnel
- `sprint_info_viewed`
- `sprint_purchase_started`
- `sprint_qr_displayed`
- `sprint_payment_pending`
- `sprint_activated`
- `sprint_first_session`
- `sprint_mock_test_started`
- `sprint_mock_test_completed`
- `sprint_support_contacted` (edge case komunikacija sa podrškom)

#### Parent
- `parent_dashboard_opened`
- `parent_email_opened` (kroz email pixel)
- `parent_email_clicked`
- `parent_settings_changed`
- `weekly_report_generated`

#### Notification
- `push_subscribed`
- `push_unsubscribed`
- `push_received`
- `push_clicked`

#### Errors
- `app_error` (props: errorCode, route)
- `payment_error`

### 7.2. User properties

Setuj na user level:
- `userType`: child | parent | admin
- `grade`: 1-8 (za child)
- `signupDate`
- `parentSignupDate` (za grupisanje)
- `subjectStrengths`: weakest, strongest
- `sprintActive`: true | false
- `streakAt30days`: stream snapshot
- `lifetime_revenue`: za parent

### 7.3. Cohort analysis

PostHog cohorts:
- "8-graderi 2026/2027 generacija"
- "Sprint kupci 2027"
- "Free aktivni 7+ dana"
- "Streak 30+ dana"
- "Parent power users" (otvaraju dashboard 3+ puta nedeljno)

---

## 8. Dashboards

### 8.1. Daily standup dashboard

Trenutni KPI-jevi za jutarnji pogled (5 min):
- Yesterday: signups, sessions, sprint sales
- Trend: 7-day MA
- Alerts: bilo šta van norme

### 8.2. Weekly review dashboard

Detaljniji pregled za nedeljnu reviiziju (30 min):
- Funnels
- Cohort retention
- Per-feature engagement
- Channel CAC

### 8.3. Sezonski dashboard (mart-jun)

Specifičan za Sprint:
- Daily Sprint sales
- Sprint funnel (info → purchase → active)
- Refund queue
- Predikcija sezone

### 8.4. Tech health dashboard

- Error rate
- API latency
- DB query time
- Resource usage

---

## 9. Decision framework

### 9.1. Kad metrika padne ispod cilja

```
Step 1: Verifikuj da je problem stvaran (ne tracking bug)
Step 2: Identifikuj koja faza funela puca
Step 3: Hipoteze za uzrok
Step 4: A/B test za najveću hipotezu
Step 5: Mere rezultat 1-2 nedelje
Step 6: Roll-out ili refaktoriši
```

### 9.2. Ne paničariti zbog jednog dana

- Daily fluktuacije normalne (±20%)
- Trend signifikantan ako je 7-dnevni MA pomeren >15%
- Pre konkretnog action-a, čekaj 14 dana podataka

---

## 10. A/B testing strategija

### 10.1. Tools

PostHog feature flags + experiments. Free za prvih ~1.000 korisnika.

### 10.2. Šta testiramo

**Sezonski (najveći ROI)**:
- Sprint cena 4.990 vs 5.490 vs 4.490
- Sprint kopirajt: comparison tabela u headline vs feature-listing
- Early bird kraj date

**Trajno**:
- Push notifikacije: 18:00 vs 18:30 vs 19:00
- Onboarding: 3 vs 4 ekrana
- Marketing landing hero copy varijante

### 10.3. Statistical significance

- Min sample size: 200 po varijanti za UX, 1.000 za conversion
- Confidence: 95%
- Run minimum 14 dana (bias of weekly cycles)

### 10.4. Don'ts

- Nikad ne testiramo cenu na svim korisnicima istovremeno bez stop-loss-a
- Nikad ne testiramo essential UX flows (auth, payment) — samo polished verzije

---

## 11. Privacy preserving analytics

### 11.1. PII handling

Nikad ne šaljemo u PostHog:
- Pravo ime
- Email
- IP (PostHog redactuje)

Šaljemo:
- Hashed email (SHA-256) za identification
- DisplayName / nickname (već anonimno)
- Bezbedne event props

### 11.2. GDPR / Zakon o zaštiti podataka

- Cookie consent banner (samo za EU + opt-in default)
- Privacy policy disclosure
- Data export request endpoint
- Data delete request endpoint

---

## 12. Reporting cadence

### 12.1. Daily (5 min)

Quick check ujutru:
- Active users yesterday
- Errors danas
- Sprint sales (sezona)

### 12.2. Weekly (30 min, Monday)

Pregled prošlu nedelju:
- Tier 1 metrike trend
- Funnel performance
- Šta je funkcionisalo / nije
- Action items za sledeću nedelju

### 12.3. Monthly (2h, 1. u mesecu)

Strategic review:
- Sve tier metrike
- Roadmap progress
- Budget pregled
- Plan za sledeći mesec

### 12.4. Sezonski (ceo dan, jul)

Posle Sprint sezone:
- Šta je radilo, šta nije
- Lessons learned
- Plan za sledeću sezonu

---

## 13. Otvorena pitanja

- [ ] Self-host PostHog ili cloud? **Cloud V1, self-host posle 1M events/mes**.
- [ ] Da li gradimo svoj BI dashboard ili koristimo PostHog only? **PostHog only V1, custom V2 ako PostHog ne pokriva potrebe**.
- [ ] Realtime dashboard za sezonu? **DA — jednostavan custom za live Sprint sales tracking**.
