# 16 — Testing & QA Strategy

## Cilj

Sistem testova koji obezbeđuje kvalitet bez preopterećenja test code-a (sole-dev je pažljiv sa vremenom).

---

## 1. Test pyramid

```
              E2E (5%)
            /         \
          /  Integration \
         /     (20%)      \
        / ─────────────── \
       /   Unit (75%)       \
      ───────────────────────
```

**Pravilo**: brzi testovi su za većinu logike, sporiji E2E samo za kritične flow-ove.

---

## 2. Unit testovi (Vitest)

### 2.1. Pokrivenost

Funkcije koje **moraju** imati unit testove:
- XP kalkulacija (pure functions)
- Streak update logika
- Question selection algoritam (adaptive engine)
- IPS QR generator
- Spaced repetition (SM-2)
- Mock test scoring
- Readiness skor kalkulacija

### 2.2. Pokrivenost koju ne pišemo

- Trivijalni gettery / setteri
- React komponente (osim utility hook-ova)
- Database queries (test sa integration testovima)

### 2.3. Setup

```bash
pnpm add -D vitest @vitest/ui
```

`vitest.config.ts`:
```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
  },
});
```

### 2.4. Pravila

- 1 fajl po module: `xp-calculator.ts` → `xp-calculator.test.ts`
- Naziv testa: opisni `should give bonus XP when streak >= 7 days`
- AAA pattern: Arrange / Act / Assert
- Bez snapshot tests-ova (krhki)

### 2.5. Primer

```typescript
// xp-calculator.test.ts
import { calculateXp } from './xp-calculator';

describe('calculateXp', () => {
  it('gives +3 for correct 3-answer question', () => {
    const result = calculateXp({
      isCorrect: true,
      questionType: 'three-answer',
      timeMs: 5000,
      currentStreak: 3,
    });
    expect(result.baseXp).toBe(3);
    expect(result.streakBonus).toBe(0);
  });
  
  it('applies 1.5x multiplier for streak >= 7', () => {
    const result = calculateXp({
      isCorrect: true,
      questionType: 'three-answer',
      timeMs: 5000,
      currentStreak: 10,
    });
    expect(result.totalXp).toBe(Math.floor(3 * 1.5)); // 4
  });
  
  it('gives -2 for incorrect 3-answer question', () => {
    const result = calculateXp({
      isCorrect: false,
      questionType: 'three-answer',
      timeMs: 5000,
      currentStreak: 0,
    });
    expect(result.totalXp).toBe(-2);
  });
});
```

---

## 3. Integration testovi

### 3.1. Pokrivenost

Test-uju kritične API endpoint-e sa stvarnom Mongo bazom (lokalna ili Atlas test cluster).

Specifični:
- POST /api/auth/magic-link (creates magic link)
- GET /api/auth/verify (verifies and creates session)
- POST /api/kviz/start (creates session, picks questions)
- POST /api/kviz/[id]/odgovor (validates correct, updates XP)
- POST /api/sprint/kupi (creates purchase + QR)
- POST /api/admin/purchase/[id]/confirm (activates Sprint)

### 3.2. Setup

- Lokalni MongoDB kroz Docker Compose
- Pre svakog testa: `db.dropDatabase()`
- Helper functions za seed test data

```typescript
// test/integration/setup.ts
beforeEach(async () => {
  await db.dropDatabase();
  await seedTestData();
});
```

### 3.3. Test framework

Same Vitest, ali sa `environment: 'node'` i live DB.

### 3.4. Coverage

Cilj: **all P0 endpoints**. P1 može imati samo unit, P2 samo manuelno.

---

## 4. E2E testovi (Playwright)

### 4.1. Pokrivenost (samo CRITICAL paths)

5-7 testova:

1. **Roditelj signup flow**: landing → email → magic link → verify → onboarding → child created
2. **Dete first quiz**: child enters via QR → onboarding quiz → result screen → home
3. **Dnevna sesija**: home → quick training → 5 questions → result → XP earned
4. **Roditelj-vs-dete duel async**: parent creates duel → child notification → child plays → parent sees result
5. **Sprint purchase flow**: parent → sprint info → purchase → QR → admin confirm → activated
6. **Mock test flow**: sprint user → start mock → answer 20 → submit → result
7. **Edge case payment flow**: duplicate payment → admin detect → refund → email confirmation

### 4.2. Setup

```bash
pnpm add -D @playwright/test
npx playwright install chromium webkit firefox
```

### 4.3. Pravila

- Tests run protiv staging environment-a (zaseban deploy)
- Db reset između testova
- Browser snapshots za vizuelnu regresiju (samo critical screens)

### 4.4. CI run

- Pri svakom PR-u na main: run E2E test suite
- Daily skedule: full E2E run
- Pri svakom deploy-u u staging: smoke E2E

---

## 5. Manual QA checklist

### 5.1. Pre svakog deploy-a u prod

**Smoke test (5 min)**:
- [ ] Homepage loaduje
- [ ] Magic link email arrives
- [ ] Sign up + verify radi
- [ ] Child onboarding kompletira
- [ ] First quiz radi (correct + incorrect path)
- [ ] Streak updates
- [ ] Roditelj dashboard loaduje
- [ ] Sprint info strana loaduje

### 5.2. Posle major feature-a

**Detaljniji manual test (30 min)**:
- Test svih flow-ova feature-a
- Test edge cases-a (network down, expired session, itd.)
- Test na 3 device-a (iPhone Safari, Android Chrome, desktop Chrome)

---

## 6. Testing po fazama

### 6.1. MVP (Faza 1)

- Unit testovi za XP, streak, question selection
- Integration test za magic link flow
- E2E za Roditelj signup + first quiz
- Manual QA pre deploy

### 6.2. Beta (Faza 2)

- Unit testovi za AI explanation cache logic
- Integration testovi za sve quiz endpoint-e
- E2E za duel async flow
- Manual QA sa 50 beta porodica

### 6.3. Public (Faza 3)

- Unit testovi za league logic
- Integration za leaderboard queries
- E2E za sve critical paths
- Load testing (vidi 7)

### 6.4. Sprint (Faza 4)

- Unit za readiness calculation, mock test scoring
- Integration za purchase + Sprint activation
- E2E za Sprint flow + payment edge cases
- Manual QA pažljiviji (revenue na liniji)

---

## 7. Performance testing

### 7.1. Pre prve sezone

Sezonski peak može biti 5-10× normal traffic. Pre 1. marta 2027:

- **Load test sa Artillery ili k6**:
  - 100 simultanih sesija
  - 1.000 RPM peak za 10 minuta
- Cilj: p95 latency <500ms, error rate <0.5%
- Ako ne prolazi: scale up DB ili optimize queries

### 7.2. Continuous

- Sentry performance monitoring (real user metrics)
- Vercel Analytics (Core Web Vitals)
- DB query slow log review nedeljno

---

## 8. Security testing

### 8.1. Static analysis

- `pnpm audit` jednom nedeljno
- Dependabot za dependency updates
- ESLint security rules

### 8.2. Dynamic analysis

- Pre prve sezone: pen test (manuelni)
- Provere:
  - SQL injection (Mongo injection)
  - XSS u user-generated content (display name, etc.)
  - CSRF na mutation endpoint-e
  - Rate limiting na auth
  - Session fixation
  - IDOR (one user accessing another's data)

### 8.3. Bug bounty (V2+)

Posle 5.000 plaćenih:
- Listed na bug bounty platform (HackerOne ili Detectify)
- Reward: 50-500€ po nalazu

---

## 9. Accessibility testing

### 9.1. Tools

- **axe DevTools** (besplatan extension)
- **Pa11y** za CI
- **VoiceOver** (iOS) manual screen reader test

### 9.2. Pokrivenost

Pre svakog deploy-a:
- Run axe na home, kviz, dashboard
- Manual VoiceOver test za kritične flow-ove

### 9.3. WCAG 2.1 AA compliance

Required:
- Color contrast 4.5:1
- Keyboard navigation
- Focus indicators
- ARIA labels
- Semantic HTML

---

## 10. Beta testing protokol

### 10.1. Beta program (Faza 2, ned 9-16)

**Recruitment**:
- 50 porodica (objavljeno na FB grupu)
- Mix: 20 8-grade, 15 6-7. grade, 15 niži

**Compensation**:
- Free Sprint (vrednost 4.990 RSD) ako 8-grader
- Mali poklon (npr. branded hoodie ili 1.000 RSD voucher) za niže razrede

**Obaveze**:
- Koriste app 4 nedelje
- Popune feedback formular (svako 2 nedelje)
- Prisustvuju 1 video poziv (45 min) za detaljan feedback

### 10.2. Beta feedback channels

- Slack channel za real-time feedback
- Bi-weekly survey
- Bi-weekly call (Q&A + UX testing)
- "Prijavi grešku" feature u app-u

### 10.3. Beta exit criteria

Pre prelaska u Public:
- [ ] D7 retention >25% u beti
- [ ] NPS >40
- [ ] Manje od 5 P0/P1 bugova nepopravljenih
- [ ] Feedback potvrdjuje vrednost

---

## 11. Quality gates (po fazi)

### 11.1. MVP → Beta

- [ ] Sve unit testovi prolaze
- [ ] Magic link integration test prolazi
- [ ] Manual smoke test prolazi
- [ ] 1 porodica koristi 7 dana zaredom

### 11.2. Beta → Public

- [ ] Beta sa 50 porodica
- [ ] D7 retention >25%
- [ ] NPS >40
- [ ] Critical bugs popravljeni
- [ ] Performance load test prolazi

### 11.3. Public → Sprint

- [ ] Public sa 5.000 sign-ups
- [ ] D7 still >25%
- [ ] Sprint feature complete (12 mocks, plan, AI coach, cohort)
- [ ] Payment flow tested end-to-end
- [ ] Legal docs final (TOS, Privacy)

### 11.4. Sprint → Sezona

- [ ] 50+ early bird kupaca prošlo flow uspešno
- [ ] Refund flow tested manualno
- [ ] Marketing materijal spreman
- [ ] Sezonsku skalabilnost potvrđenu

---

## 12. Bug tracking

### 12.1. Tools

- GitHub Issues za internal bugs
- Sentry za auto-captured errors
- Linear ili Trello (opcionalno) za organizaciju

### 12.2. Severity definitions

- **P0** — production down, immediate fix
- **P1** — major feature broken, fix u 24h
- **P2** — minor issue, fix u 1 nedelji
- **P3** — cosmetic, fix kad zgodno

### 12.3. SLA tokom sezone

- P0: response u 1h, fix u 4h
- P1: response u 4h, fix u 24h
- P2: fix u nedelji
- P3: backlog

---

## 13. Otvorena pitanja

- [ ] Da li trošiti vreme na visual regression testing? **NE V1, samo manual screenshot review**.
- [ ] Continuous Integration workflow setup — kompleksnost? **Minimal: lint + type-check + unit + smoke E2E na svaki PR**.
- [ ] Da li gradimo "test mode" gde je dostupna baza za rucni testing? **DA — staging environment paralelno**.
