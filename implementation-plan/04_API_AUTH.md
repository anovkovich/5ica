# 04 — API Specification & Authentication

## Cilj

Definisati svaki API endpoint sa: rutom, metodom, autentifikacijom, payload-om, validacijom, business logikom, i error stanjima.

---

## 1. Auth pristup

### 1.1. Magic link flow (osnovni)

**Korak 1**: Roditelj unese email → POST `/api/auth/magic-link`

**Korak 2**: Server generiše token, šalje email sa linkom `/verifikacija/[token]`

**Korak 3**: Roditelj klikne link → GET `/api/auth/verify?token=...` → setuje session cookie → redirect

**Korak 4**: Roditelj je ulogovan kao "parent". On dodaje dete kroz "+ Dodaj dete" UI, što ne traži email od deteta. Dete dobija svoj nalog, ulazi kroz device-bound token.

### 1.2. Dete login (jednostavno)

Dete na svom telefonu koji je već autentifikovan kao "child[ID]" — uvek logovano dok roditelj ne ukloni device.

Ako dete pristupa sa novog uređaja:
- Roditelj ulogovan na svom telefonu klikne "Pošalji link Marku"
- Dete dobija magic link na email koji roditelj definiše (ili push na svoj telefon)

### 1.3. Cookie / session strategija

- HTTP-only cookie `mm_session`
- 30 dana valid
- `SameSite=Lax`, `Secure` (samo HTTPS)
- Session token je 32-char random, hashed u bazi (SHA-256)
- Session se rotira na svakih 7 dana

### 1.4. Authorization model

Svaki request ide kroz middleware koji:
1. Proverava `mm_session` cookie
2. Loaduje user iz `users` collection
3. Postavlja `req.user` (ili Next.js context)
4. Ako ruta zahteva specifični role/type, proverava

Roli:
- `parent` — ima email, može upravljati svojom decom
- `child` — pripada parent-u, ne može menjati settings (samo gameplay)
- `admin` — interna, IP-restricted

---

## 2. API endpoints — kompletna specifikacija

### Notation

```
METHOD /path
Auth: required-role (or "public")
Body: { ... }  (Zod schema, tipovi)
Response 200: { ... }
Errors: 401, 403, 404, 422
```

---

### 2.1. Auth endpoints

#### POST `/api/auth/magic-link`

**Auth**: public (with rate limit)

**Body**:
```typescript
{
  email: string,           // valid email
  intent?: "signin" | "register",
  callbackUrl?: string,    // gde redirect-ujemo posle verify
}
```

**Logic**:
1. Validate email format (Zod)
2. Rate limit: 5/15min po IP, 3/hour po email
3. Generate token (32-char random)
4. Store u `magicLinks` collection sa `expiresAt: now + 15min`
5. Send email kroz Resend sa template-om `magic-link.tsx`
6. Return success bez detalja (ne otkriva da li email postoji)

**Response 200**: `{ success: true }`

**Errors**:
- 422 — invalid email format
- 429 — rate limit exceeded

---

#### GET `/api/auth/verify?token=...&callbackUrl=...`

**Auth**: public

**Logic**:
1. Find magicLink by token
2. Check `expiresAt > now` and `usedAt === null`
3. Mark `usedAt = now`
4. Find or create user by email
5. Create session
6. Set cookie
7. Redirect to callbackUrl (or `/app`)

**Response**: 302 Redirect

**Errors**:
- 400 — token invalid or expired
- 500 — internal error

---

#### POST `/api/auth/logout`

**Auth**: required (any)

**Logic**: Delete current session, clear cookie

**Response 200**: `{ success: true }`

---

#### POST `/api/auth/dete-create`

**Auth**: parent

**Body**:
```typescript
{
  displayName: string,    // 2-30 chars
  birthYear: number,      // 2010-2020
  grade: number,          // 1-8
  classCode?: string,     // "8-2" format, optional
  schoolName?: string,    // optional
  avatarId?: string,      // default "default"
}
```

**Logic**:
1. Validate input
2. Create child user (no email, type=child, parentId=req.user.id)
3. Update `families` collection
4. Return child user with auto-login token (parent device only)

**Response 200**:
```typescript
{
  child: { id, displayName, grade, ... },
  childLoginToken: string  // za scan QR ili link
}
```

---

### 2.2. User & Profile endpoints

#### GET `/api/me`

**Auth**: required

**Returns**: 
```typescript
{
  id, type, displayName, avatarId, email,
  // For child:
  grade, classCode, totalXp, level, currentStreak, ...,
  // For parent:
  children: [{ id, displayName, grade, ... }],
}
```

#### PATCH `/api/me`

**Auth**: required

**Body**: subset of user fields user can update

#### PATCH `/api/dete/[childId]/settings`

**Auth**: parent (must own child)

Updates child preferences (notification settings, leaderboard visibility, etc.)

---

### 2.3. Quiz / Session endpoints

#### POST `/api/kviz/start`

**Auth**: child

**Body**:
```typescript
{
  type: "quick" | "standard" | "marathon",
  subjectId?: ObjectId,    // default: weakest subject
  chapterId?: ObjectId,    // default: weakest chapter
  grade: number,           // default: user's grade
}
```

**Logic**:
1. Determine question count: quick=5, standard=15, marathon=50
2. Run adaptive selection algorithm (vidi `08_ADAPTIVE_ENGINE.md`)
3. Create `quizSession` document
4. Return session with first question

**Response 200**:
```typescript
{
  sessionId: ObjectId,
  totalQuestions: number,
  currentQuestion: {
    questionId, title, options: [{ text }],  // shuffled
    timeStartedAt: Date,
  }
}
```

---

#### POST `/api/kviz/[sessionId]/odgovor`

**Auth**: child (must own session)

**Body**:
```typescript
{
  questionId: ObjectId,
  selectedAnswer: string | null,  // null = skipped
  timeMs: number,
}
```

**Logic**:
1. Validate session is in-progress
2. Validate question is current
3. Check correctness
4. Update `quizSession.questions[i]` with result
5. Insert into `answers` collection
6. Calculate XP delta
7. Update user.totalXp atomically
8. Return result + next question (or session complete)

**Response 200**:
```typescript
{
  isCorrect: boolean,
  correctAnswer: string,
  xpEarned: number,
  newTotalXp: number,
  levelUp?: { from, to },
  // Next question or session done
  nextQuestion?: { ... },
  sessionComplete?: boolean,
  sessionResult?: {
    totalCorrect, totalQuestions, xpEarned, newBadges: [],
  }
}
```

**Idempotentnost**: Klijent šalje `requestId` kao header. Server čuva poslednjih 5 minuta po ovom ID-u u Redis. Duple ne procesira.

---

#### POST `/api/kviz/[sessionId]/objasnjenje`

**Auth**: child (must own session, must have answered question)

**Body**:
```typescript
{
  questionId: ObjectId,
  detail: "basic" | "detailed",  // detailed only for sprint users
}
```

**Logic**:
1. Validate user has access (sprint check for detailed)
2. Lookup `aiExplanations` cache
3. If miss: call LLM API, generate, cache
4. Return explanation

**Response 200**:
```typescript
{
  explanation: string,
  examples?: string[],     // detailed only
  relatedQuestionIds?: ObjectId[]  // detailed only
}
```

---

#### POST `/api/kviz/[sessionId]/zavrsi`

**Auth**: child

**Logic**:
1. Mark session as completed (if not already)
2. Update streak (vidi `07_GAMIFICATION_ECONOMY.md`)
3. Check badge unlocks
4. Return final summary

**Response 200**:
```typescript
{
  totalXp: number,
  finalScore: number,
  badgesUnlocked: [{ badgeCode, name, iconUrl }],
  streakAfter: number,
  leagueStanding?: { rank, change },
}
```

---

### 2.4. Friends & social

#### GET `/api/drugovi`

**Auth**: child

**Returns**: list of accepted friends sa minimal info

#### POST `/api/drugovi/dodaj`

**Auth**: child

**Body**: `{ friendCode: string }`

**Logic**:
1. Find user by friendCode (xp-derived 6-char nickname code)
2. Create `friends` document with `acceptedAt: null`
3. Send notification to other side

#### POST `/api/drugovi/[friendId]/prihvati`

**Auth**: child (must be challenged side)

#### DELETE `/api/drugovi/[friendId]`

**Auth**: child

---

### 2.5. Duel endpoints

#### POST `/api/duel/novi`

**Auth**: child or parent

**Body**:
```typescript
{
  opponentId: ObjectId,    // friend's userId or "parent" / child userId
  type: "child-child" | "parent-child",
  mode: "sync" | "async",
  context: {
    subjectId: ObjectId,
    chapterId?: ObjectId,
    grade: number,
    questionCount: number,  // default 5
  }
}
```

**Logic**:
1. Validate authorization (friends, or parent-child)
2. Select questions (same set for both, run once)
3. Create `duels` document
4. If sync: notify opponent in real-time (push + WebSocket later)
5. If async: opponent has 24h

**Response 200**: `{ duelId, mode }`

---

#### GET `/api/duel/[duelId]`

**Auth**: child or parent (participant)

**Returns**: duel state + scores so far

#### POST `/api/duel/[duelId]/odgovor`

**Auth**: participant

**Body**: same as quiz answer endpoint

#### POST `/api/duel/[duelId]/zavrsi`

**Auth**: participant

**Logic**: Compute winner, award XP, send result push

---

### 2.6. Leaderboards

#### GET `/api/leaderboard/razred`

**Auth**: child

**Returns**: top 30 in user's class (by weekly XP)

#### GET `/api/leaderboard/skola`

**Auth**: child

#### GET `/api/leaderboard/liga`

**Auth**: child

**Returns**: user's group in current league + rank

---

### 2.7. Parent endpoints

#### GET `/api/roditelj/dashboard`

**Auth**: parent

**Returns**:
```typescript
{
  children: [{
    id, displayName, grade,
    weeklyMinutes: number,
    weeklyXp: number,
    currentStreak: number,
    weakestChapters: [{ chapterId, name, accuracy }],
    strongestChapters: [...],
    classRank?: number,
    schoolRank?: number,
    sprintReadiness?: number,  // 0-100, only if sprint active
  }]
}
```

#### GET `/api/roditelj/dete/[childId]/napredak`

**Auth**: parent (owns child)

**Returns**: detailed progress (charts data)

#### POST `/api/roditelj/duel/izazov`

**Auth**: parent

**Body**: `{ childId, mode, context }`

---

### 2.8. Sprint endpoints

#### GET `/api/sprint/info`

**Auth**: parent (or public for marketing)

**Returns**: pricing, dates, what's included

#### POST `/api/sprint/kupi`

**Auth**: parent

**Body**:
```typescript
{
  childId: ObjectId,
  earlyBird: boolean,  // determines price
}
```

**Logic**:
1. Validate child is in 8th grade
2. Generate NBS QR payload (vidi `12_PAYMENTS.md`)
3. Create `purchase` with state="pending"
4. Return QR code + reference number

**Response 200**:
```typescript
{
  purchaseId, qrPayload, qrImageUrl, referenceCode,
  amountRsd, instructions
}
```

#### GET `/api/sprint/[purchaseId]/status`

**Auth**: parent

**Returns**: payment state

#### POST `/api/sprint/[purchaseId]/kontakt-podrska`

**Auth**: parent

**Body**: `{ reason: string, message: string }`

Kontakt podrška za probleme sa kupovinom (duplirana uplata, pogrešan iznos, problem sa aktivacijom). Podrška manuelno odgovara na svaki slučaj.

---

### 2.9. Mock test endpoints

#### GET `/api/sprint/mock-testovi`

**Auth**: child (with active sprint)

**Returns**: list of available mock tests + status

#### POST `/api/sprint/mock-test/[mockTestId]/start`

#### POST `/api/sprint/mock-test/[resultId]/predaj`

---

### 2.10. AI explanation endpoints

Već u Quiz section (2.3).

---

### 2.11. Push notifikacija

#### POST `/api/push/subscribe`

**Auth**: child or parent

**Body**: VAPID subscription object

**Logic**: Store sub on user document

#### POST `/api/push/unsubscribe`

---

### 2.12. Admin endpoints

#### GET `/api/admin/dashboard`

**Auth**: admin (IP-restricted)

#### GET `/api/admin/korisnici`

**Auth**: admin

#### POST `/api/admin/purchase/[id]/confirm`

**Auth**: admin

**Logic**: Mark purchase as paid (manual NBS QR confirmation)

#### POST `/api/admin/pitanje/[id]/flag`

**Auth**: admin

#### GET `/api/admin/revenue`

**Auth**: admin

---

### 2.13. Webhook endpoints

#### POST `/api/webhooks/email-bounce`

Resend webhook za email bounces — markiraj user.emailEnabled = false

#### POST `/api/webhooks/posthog-error-budget`

Custom alert ako error rate prekoračen

---

## 3. Standardni response format

Sve API rute koriste isti success format:

```typescript
{
  ok: true,
  data: { ... }   // payload
}

// Or error:
{
  ok: false,
  error: {
    code: string,         // "rate_limit_exceeded"
    message: string,      // user-friendly Serbian
    details?: object,
    requestId: string,    // for debugging
  }
}
```

---

## 4. Error codes (kanonski)

| Code | HTTP | Značenje |
|---|---|---|
| `validation_failed` | 422 | Zod validation error |
| `rate_limit_exceeded` | 429 | Previše zahteva |
| `unauthorized` | 401 | Nije autentifikovan |
| `forbidden` | 403 | Autentifikovan ali nema dozvolu |
| `not_found` | 404 | Resurs ne postoji |
| `conflict` | 409 | Idempotency conflict ili duplikat |
| `payment_pending` | 402 | Plaćanje nije potvrđeno |
| `expired` | 410 | Token ili resurs istekao |
| `internal_error` | 500 | Server greška |

---

## 5. Validation strategija

### 5.1. Zod schemas

Svaka route ima `schema.ts` fajl:

```typescript
// app/api/kviz/start/schema.ts
export const startQuizSchema = z.object({
  type: z.enum(["quick", "standard", "marathon"]),
  subjectId: z.string().regex(/^[0-9a-f]{24}$/).optional(),
  chapterId: z.string().regex(/^[0-9a-f]{24}$/).optional(),
  grade: z.number().int().min(1).max(8),
});
```

Server route koristi `safeParse`:

```typescript
const result = startQuizSchema.safeParse(await req.json());
if (!result.success) {
  return jsonError("validation_failed", "Neispravan ulaz", { issues: result.error.issues });
}
```

### 5.2. Server-side trust

**Nikad ne veruj klijentu** za:
- XP iznose (uvek server kalkuliše)
- Tačnost odgovora (uvek server proverava)
- Ko je kome roditelj/dete (uvek iz baze)
- Trenutno vreme za streak (uvek server time)

Klijent može dati savete/optimističke updates, ali server je istina.

---

## 6. Rate limiting

### 6.1. Implementacija

Vercel KV ili Upstash Redis sliding-window counter.

```typescript
// pseudo
async function rateLimit(key: string, max: number, windowSec: number) {
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);
  if (count > max) throw new RateLimitError();
}
```

### 6.2. Limiti po endpoint-u

| Endpoint | Limit | Window |
|---|---|---|
| `/api/auth/*` | 5 | 1 min po IP |
| `/api/kviz/start` | 30 | 1h po user |
| `/api/kviz/*/odgovor` | 200 | 1h po user |
| `/api/objasnjenje` | 20 | 1 dan po user |
| `/api/duel/novi` | 20 | 1 dan po user |
| `/api/sprint/kupi` | 5 | 1 dan po user |
| `/api/admin/*` | 100 | 1 min po IP |
| `/api/*` (general) | 60 | 1 min po user |

---

## 7. Idempotentnost

### 7.1. Implementacija

Klijent generiše `requestId` (UUID) i šalje kao header `X-Request-Id`. Server čuva u Redis za 5 min.

```typescript
async function withIdempotency(req, handler) {
  const reqId = req.headers.get('X-Request-Id');
  if (!reqId) return handler();
  
  const cached = await redis.get(`idempotency:${reqId}`);
  if (cached) return JSON.parse(cached);
  
  const result = await handler();
  await redis.setex(`idempotency:${reqId}`, 300, JSON.stringify(result));
  return result;
}
```

### 7.2. Apply na

- POST /api/kviz/*/odgovor
- POST /api/sprint/kupi
- POST /api/duel/novi
- POST /api/duel/*/odgovor
- POST /api/auth/magic-link

---

## 8. CORS i origin restrictions

**Default**: same-origin only. Bez CORS-a nigde.

Ako treba (npr. mobile native app u Y3): explicit allowlist u `next.config.js`.

---

## 9. Testiranje API-ja

Vidi `16_TESTING_QA.md`. Svaki API endpoint ima:
- Unit test za validaciju
- Integration test sa lokalnom Mongo
- E2E test za critical paths (auth, quiz, payment)

---

## 10. API verzionisanje

**v1** je sadašnja. Sve rute pod `/api/` (bez `/v1/` prefixa za sad).

Ako se menja breaking-mente: novi prefix `/v2/api/...`. Stari ostaje 6 meseci za backward compat.

---

## 11. Otvorena pitanja

- [ ] WebSocket za real-time duel sync ili polling? **Preporuka: polling 2s u v1, WS u v2.**
- [ ] GraphQL ili REST? **REST — odlučeno, manji overhead, jednostavnije za solo dev.**
- [ ] tRPC? **NE — vezivanje za TS klijent, gubimo fleksibilnost.**
