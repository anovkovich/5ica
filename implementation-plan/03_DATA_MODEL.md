# 03 — Data Model

## Cilj

Kompletna MongoDB shema za sve kolekcije, sa indeksima, query patterns, migracionim skriptama, i TTL pravilima.

---

## 1. Kolekcije (overview)

| Kolekcija | Svrha | Approx scale |
|---|---|---|
| `subjects` | 14 predmeta | static (14) |
| `classes` | 58 (predmet × razred) | static (58) |
| `chapters` | 298 poglavlja | static (298) |
| `questions` | 8.428 pitanja | static (8k+) |
| `aiExplanations` | Cache AI objašnjenja po pitanju | grows to ~8k |
| `users` | Roditelji + deca | grows |
| `families` | Veza roditelja sa decom | grows (1 per family) |
| `magicLinks` | Auth tokeni (TTL) | rotira |
| `sessions` | Auth sesije | rotira |
| `quizSessions` | Aktivne i završene kviz sesije | grows |
| `answers` | Pojedinačni odgovori (audit + analytics) | grows brzo |
| `streaks` | Streak history po useru | grows |
| `badges` | Definicija bedževa | static |
| `userBadges` | Bedževi po useru | grows |
| `friends` | Prijateljstva | grows |
| `duels` | Duel pozivnice i rezultati | grows |
| `leagues` | Definicija liga | static (4) |
| `leagueMemberships` | User u ligi nedeljno | grows (rotira) |
| `mockTests` | Mock test definicije | grows polako |
| `mockTestResults` | Rezultati mock testova | grows |
| `studyPlans` | Sprint personalizovani planovi | grows |
| `purchases` | Sprint kupovine | grows |
| `notifications` | Logovanje slanja push/email | rotira (TTL 30d) |
| `events` | Generic event log za fallback (osim PostHog) | rotira (TTL 7d) |

---

## 2. Detaljne sheme (Mongoose)

### 2.1. `subjects`

```typescript
{
  _id: ObjectId,
  name: String,             // "Matematika"
  slug: String,             // "matematika"
  category: String,         // "obavezni", "umetnost", "prirodne-nauke"
  gradeRange: String,       // "1-8" ili "5-8"
  malaMatura: Boolean,      // true za 7 ključnih predmeta
  questionCount: Number,    // denormalizovan brojač
  iconName: String,         // ime ikone iz biblioteke
  colorHex: String,         // primarna boja predmeta za UI
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ slug: 1 }` unique
- `{ malaMatura: 1, name: 1 }` za "samo mala matura predmeti" query

### 2.2. `classes`

```typescript
{
  _id: ObjectId,
  subjectId: ObjectId,      // ref subjects
  grade: Number | null,     // 1-8 ili null (Digitalni svet)
  gradeConfidence: String,  // "high" | "medium" | "low"
  questionCount: Number,
  rationale: String,        // za interno
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ subjectId: 1, grade: 1 }`

### 2.3. `chapters`

```typescript
{
  _id: ObjectId,
  subjectId: ObjectId,
  classId: ObjectId,
  grade: Number | null,
  name: String,             // "Pitagorina teorema"
  questionCount: Number,
  difficulty: String,        // "lako" | "srednje" | "tesko" — agregacija po pitanjima
  order: Number,            // redosled u predmetu (manuelno postavlj)
  sampleQuestions: [String], // 3 sample tekstova za preview
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ subjectId: 1, grade: 1, order: 1 }`
- `{ classId: 1 }`

### 2.4. `questions`

```typescript
{
  _id: ObjectId,
  legacyId: String,         // _id iz starog mongo dump-a, za debugging
  
  title: String,            // Ćirilica (kanonska)
  titleLat: String,         // Latinica
  
  correctAnswer: String,    // Ćirilica
  correctAnswerLat: String, // Latinica
  
  wrongAnswers: [{
    text: String,           // Ćirilica
    textLat: String,        // Latinica
  }],                       // 2-3 elementa
  
  level: String,            // "E" | "M" | "H" — Easy/Medium/Hard
  difficultyScore: Number,  // 1-100, kalkulisan iz user response data
  
  subjectId: ObjectId,
  classId: ObjectId,
  chapterId: ObjectId,
  grade: Number | null,
  
  hasImage: Boolean,        // za buduće
  imageUrl: String,         // za buduće
  
  // Performance metrika (denormalizovana)
  timesShown: Number,
  timesAnswered: Number,
  timesCorrect: Number,
  avgTimeSeconds: Number,
  
  // Moderation
  flagged: Boolean,
  flaggedReason: String,
  flaggedBy: [ObjectId],
  active: Boolean,          // false znaci ne pokazujemo
  
  source: String,           // "import-2026-05" | "ai-generated" | "manual"
  sourceMetadata: Object,   // za audit
  
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ chapterId: 1, active: 1 }` — primary query path (pitanja iz poglavlja)
- `{ subjectId: 1, grade: 1, level: 1, active: 1 }` — fallback query
- `{ legacyId: 1 }` unique sparse — samo za migrate-ovane
- `{ flagged: 1 }` — admin queue
- `{ classId: 1, active: 1 }`

**Validation rules**:
- `wrongAnswers.length` must be 2 or 3
- `correctAnswer` must not equal any `wrongAnswers[].text`
- `level` must be in `['E', 'M', 'H']`

### 2.5. `aiExplanations`

```typescript
{
  _id: ObjectId,
  questionId: ObjectId,     // ref questions, unique
  
  basicExplanation: {       // za free verziju
    text: String,           // Latinica
    generatedAt: Date,
    model: String,          // "groq-llama-3.3-70b"
    tokens: Number,
  },
  
  detailedExplanation: {    // za Sprint
    text: String,
    examples: [String],     // 2-3 slična zadatka
    relatedQuestionIds: [ObjectId],
    generatedAt: Date,
    model: String,
    tokens: Number,
  },
  
  // Verifikacija od strane educator-konsultanta
  verified: Boolean,
  verifiedAt: Date,
  verifiedBy: ObjectId,     // admin user
  
  // User feedback
  helpfulCount: Number,
  notHelpfulCount: Number,
  
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ questionId: 1 }` unique

**Stratagy**: Generiše se lazy on-demand prvi put kad neko pogreši pitanje. Posle keš zauvek.

### 2.6. `users`

```typescript
{
  _id: ObjectId,
  
  type: String,             // "child" | "parent" | "admin"
  
  // Common
  email: String | null,     // parent always has, child optional
  displayName: String,      // nadimak za dete, ime za roditelja
  avatarId: String,         // referenca na statičnu biblioteku
  
  // Child-only
  parentId: ObjectId,       // ref users (parent)
  birthYear: Number,        // za prilagođavanje, ne tačan datum
  grade: Number,            // 1-8
  schoolId: ObjectId,       // ref schools (ako uveden, vidi 2.x)
  classCode: String,        // "8-2" format, ne ID
  
  // Game state (denormalizovano)
  totalXp: Number,
  level: Number,
  currentStreak: Number,
  longestStreak: Number,
  streakFreezeAvailable: Number,
  lastActiveDate: Date,
  
  // Notifications
  pushSubscription: Object | null,  // VAPID subscription
  pushEnabled: Boolean,
  emailEnabled: Boolean,
  
  // Privacy settings (parent-controlled for children)
  shareInClassLeaderboard: Boolean,
  shareInSchoolLeaderboard: Boolean,
  shareInSerbiaLeagues: Boolean,
  
  // Auth-related
  language: String,         // "sr-Cyrl" | "sr-Latn"
  
  // Lifecycle
  createdAt, updatedAt,
  lastLoginAt: Date,
  deletedAt: Date | null,   // soft delete
}
```

**Indeksi**:
- `{ email: 1 }` unique sparse (only parents have email)
- `{ parentId: 1 }` — get children of parent
- `{ classCode: 1, grade: 1 }` — class leaderboard
- `{ lastActiveDate: -1 }` — recent activity
- `{ totalXp: -1, currentStreak: -1 }` — global leaderboards
- `{ deletedAt: 1 }` sparse

**TTL**: nikad ne brišemo, koristimo `deletedAt`.

### 2.7. `families`

```typescript
{
  _id: ObjectId,
  parentId: ObjectId,       // primary parent
  coParentIds: [ObjectId],  // opciono drugi roditelj
  childrenIds: [ObjectId],
  
  // Sprint relationships
  sprintsActive: [ObjectId], // children sa aktivnim sprint-om
  
  // Settings
  preferences: {
    weeklyEmailDay: String, // "sunday"
    weeklyEmailTime: String, // "20:00"
    notificationLanguage: String,
  },
  
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ parentId: 1 }` unique
- `{ childrenIds: 1 }`

### 2.8. `magicLinks`

```typescript
{
  _id: ObjectId,
  token: String,            // 32-char crypto random
  email: String,
  type: String,             // "parent-signin" | "parent-magic-grant"
  intent: Object,           // payload for after-verify, e.g. { childId: ... }
  expiresAt: Date,          // now + 15 min
  usedAt: Date | null,
  createdAt: Date,
  ipAddress: String,        // za audit
}
```

**Indeksi**:
- `{ token: 1 }` unique
- `{ expiresAt: 1 }` TTL na 1 sat (auto-delete)

### 2.9. `sessions`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  token: String,            // session cookie value (hashed)
  expiresAt: Date,          // now + 30 days
  userAgent: String,
  ipAddress: String,
  createdAt: Date,
  lastUsedAt: Date,
}
```

**Indeksi**:
- `{ token: 1 }` unique
- `{ userId: 1 }`
- `{ expiresAt: 1 }` TTL automatic

### 2.10. `quizSessions`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,             // "quick" (5Q) | "standard" (15Q) | "marathon" (50Q) | "duel" | "mockTest" | "sprint"
  
  context: {
    subjectId: ObjectId,
    chapterId: ObjectId | null,  // null = mixed
    grade: Number,
  },
  
  questions: [{
    questionId: ObjectId,
    presentedAt: Date,
    answeredAt: Date | null,
    selectedAnswer: String | null,  // text of answer
    isCorrect: Boolean | null,
    timeMs: Number | null,
    skipped: Boolean,
  }],
  
  // Aggregate
  totalQuestions: Number,
  answered: Number,
  correct: Number,
  incorrect: Number,
  skipped: Number,
  xpEarned: Number,
  
  startedAt: Date,
  completedAt: Date | null,
  abandoned: Boolean,
  abandonedAt: Date | null,
  
  // For duel mode
  duelId: ObjectId | null,
  
  // For mock test
  mockTestId: ObjectId | null,
  
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ userId: 1, completedAt: -1 }`
- `{ userId: 1, type: 1, completedAt: -1 }`
- `{ duelId: 1 }`
- `{ startedAt: 1 }` — recent activity

### 2.11. `answers`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  questionId: ObjectId,
  quizSessionId: ObjectId,
  
  isCorrect: Boolean,
  timeMs: Number,
  selectedAnswer: String,
  skipped: Boolean,
  
  // Context for spaced repetition
  attemptNumber: Number,    // koliko puta je user video ovo pitanje
  hadAiExplanation: Boolean,
  
  answeredAt: Date,
}
```

**Indeksi**:
- `{ userId: 1, questionId: 1 }` — has user seen this question
- `{ userId: 1, answeredAt: -1 }` — recent activity
- `{ questionId: 1, isCorrect: 1 }` — question difficulty calc
- `{ userId: 1, isCorrect: 1, answeredAt: -1 }` — weakness analysis

**TTL**: nikad ne brišemo (audit + spaced repetition).

### 2.12. `streaks`

Ne posebna kolekcija — u `users.currentStreak`. Audit log:

```typescript
// streakHistory
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,               // YYYY-MM-DD
  active: Boolean,          // true = vežbao
  freezeUsed: Boolean,
  streakAfter: Number,
}
```

**Indeksi**:
- `{ userId: 1, date: -1 }`

### 2.13. `badges`

```typescript
{
  _id: ObjectId,
  code: String,             // "streak-7", "razlomci-master"
  name: String,
  description: String,
  iconUrl: String,
  category: String,         // "streak" | "subject" | "social" | "milestone"
  rarity: String,           // "common" | "rare" | "epic" | "legendary"
  
  unlockCriteria: {
    type: String,           // "streak" | "chaptersComplete" | "duelsWon" | etc.
    threshold: Number,
    metadata: Object,
  },
  
  xpReward: Number,
  active: Boolean,
}
```

**Indeksi**:
- `{ code: 1 }` unique
- `{ category: 1, active: 1 }`

### 2.14. `userBadges`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  badgeId: ObjectId,
  unlockedAt: Date,
  shown: Boolean,           // user has seen the unlock animation
}
```

**Indeksi**:
- `{ userId: 1, unlockedAt: -1 }`
- `{ userId: 1, badgeId: 1 }` unique

### 2.15. `friends`

```typescript
{
  _id: ObjectId,
  user1Id: ObjectId,        // always smaller ObjectId
  user2Id: ObjectId,        // always larger ObjectId
  initiatedBy: ObjectId,
  acceptedAt: Date | null,
  rejectedAt: Date | null,
  removedAt: Date | null,
  createdAt: Date,
}
```

**Indeksi**:
- `{ user1Id: 1, user2Id: 1 }` unique
- `{ user1Id: 1, acceptedAt: 1 }`
- `{ user2Id: 1, acceptedAt: 1 }`

### 2.16. `duels`

```typescript
{
  _id: ObjectId,
  type: String,             // "child-child" | "parent-child"
  
  challenger: {
    userId: ObjectId,
    quizSessionId: ObjectId,
    score: Number | null,
    completedAt: Date | null,
  },
  challenged: {
    userId: ObjectId,
    quizSessionId: ObjectId | null,
    score: Number | null,
    completedAt: Date | null,
  },
  
  context: {
    subjectId: ObjectId,
    chapterId: ObjectId | null,
    grade: Number,
    questionCount: Number,    // 5, default
  },
  
  selectedQuestionIds: [ObjectId],  // ista pitanja za oba igrača
  
  mode: String,             // "sync" | "async"
  
  state: String,            // "pending" | "in-progress" | "completed" | "expired"
  
  winner: String | null,    // "challenger" | "challenged" | "tie"
  
  expiresAt: Date,          // 24h od poziva za async
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ "challenger.userId": 1, state: 1 }`
- `{ "challenged.userId": 1, state: 1 }`
- `{ expiresAt: 1 }` TTL na 7 dana posle expire

### 2.17. `leagues` + `leagueMemberships`

```typescript
// leagues — static
{
  _id: ObjectId,
  code: String,             // "bronze" | "silver" | "gold" | "diamond"
  name: String,
  rank: Number,             // 1-4
  promoteCount: Number,     // top 5 promoted
  demoteCount: Number,      // bottom 5 demoted
  iconUrl: String,
}

// leagueMemberships — weekly rotating
{
  _id: ObjectId,
  userId: ObjectId,
  leagueId: ObjectId,
  groupId: String,          // "diamond-2027-w12-g3"
  weekStart: Date,
  weekEnd: Date,
  weeklyXp: Number,         // XP earned this week
  finalRank: Number | null, // 1-30 in their group
  promotedTo: ObjectId | null,
  demotedTo: ObjectId | null,
}
```

**Indeksi**:
- `{ userId: 1, weekStart: -1 }`
- `{ groupId: 1, weeklyXp: -1 }` — leaderboard query
- `{ weekEnd: 1 }` TTL on 90 days (rolling history)

### 2.18. `mockTests`

```typescript
{
  _id: ObjectId,
  name: String,             // "Mock 1 — Sredina sezone"
  type: String,             // "matematika-mala-matura" | "kombinovani-mala-matura" | "srpski-mala-matura"
  
  questions: [{
    questionId: ObjectId,
    points: Number,
    order: Number,
  }],
  
  totalPoints: Number,
  durationMinutes: Number,  // npr. 120 za malu maturu
  passingScore: Number,
  
  active: Boolean,
  availableFrom: Date,
  availableUntil: Date,
}
```

### 2.19. `mockTestResults`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  mockTestId: ObjectId,
  
  startedAt: Date,
  submittedAt: Date,
  durationSeconds: Number,
  
  answers: [{
    questionId: ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean,
    timeSeconds: Number,
    points: Number,
  }],
  
  totalScore: Number,
  totalPossible: Number,
  percentile: Number,       // pozicija u svim koji su radili
  
  byChapter: [{
    chapterId: ObjectId,
    correct: Number,
    total: Number,
  }],
}
```

**Indeksi**:
- `{ userId: 1, submittedAt: -1 }`
- `{ mockTestId: 1, totalScore: -1 }` — percentile calc

### 2.20. `studyPlans` (Sprint specific)

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  purchaseId: ObjectId,
  
  generatedAt: Date,
  basedOnAssessment: Object, // initial state diagnostic
  
  weeks: [{
    weekNumber: Number,    // 1-12
    weekStart: Date,
    focus: [{
      chapterId: ObjectId,
      reason: String,       // "weakness" | "review" | "challenge"
      targetSessions: Number,
      targetMinutes: Number,
    }],
    mockTestId: ObjectId | null,
  }],
  
  currentReadiness: Number, // 0-100
  readinessHistory: [{
    date: Date,
    score: Number,
  }],
  
  active: Boolean,
}
```

### 2.21. `purchases`

```typescript
{
  _id: ObjectId,
  type: String,             // "sprint-2027"
  
  parentUserId: ObjectId,
  childUserId: ObjectId,
  
  amountRsd: Number,        // 4990 ili 3990
  currency: String,         // "RSD"
  
  state: String,            // "pending" | "paid" | "active" | "completed" | "refunded" | "cancelled"
  
  payment: {
    method: String,         // "ips-qr" | "bank-transfer" | "card-future"
    referenceCode: String,  // "SPRINT-MK-2027-0234"
    qrPayload: String,      // generated NBS QR
    expectedAmount: Number,
    confirmedAt: Date | null,
    confirmedBy: ObjectId,  // admin who confirmed
  },
  
  // Sprint lifecycle
  activatedAt: Date | null,
  expiresAt: Date | null,   // jul 2027 npr.
  
  // Money-back guarantee
  refundEligible: Boolean,
  refundRequestedAt: Date | null,
  refundReason: String,
  refundAmount: Number,
  refundedAt: Date | null,
  
  createdAt, updatedAt
}
```

**Indeksi**:
- `{ parentUserId: 1, state: 1 }`
- `{ childUserId: 1, state: 1 }`
- `{ "payment.referenceCode": 1 }` unique sparse
- `{ state: 1, expiresAt: 1 }`

### 2.22. `notifications`

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  channel: String,          // "push" | "email"
  
  template: String,         // "weekly-parent-report"
  payload: Object,
  
  state: String,            // "queued" | "sent" | "failed" | "bounced"
  
  sentAt: Date | null,
  failedAt: Date | null,
  failureReason: String,
  
  createdAt: Date,
}
```

**Indeksi**:
- `{ userId: 1, sentAt: -1 }`
- `{ state: 1 }`

**TTL**: 30 dana

### 2.23. `events` (fallback log)

```typescript
{
  _id: ObjectId,
  userId: ObjectId | null,
  type: String,             // event name
  payload: Object,
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
}
```

**TTL**: 7 dana (PostHog je primary, ovo je fallback samo)

---

## 3. Query patterns — najvažniji

### 3.1. Daily home screen

```javascript
// Get user with denormalized state
const user = await User.findById(userId).lean();

// Get today's recommended session
const recentAnswers = await Answer.find({ 
  userId, 
  answeredAt: { $gte: sevenDaysAgo } 
}).sort({ answeredAt: -1 }).limit(50);

// Compute weak chapters from recent answers
// (logic in 08_ADAPTIVE_ENGINE.md)
```

### 3.2. Class leaderboard

```javascript
const classmates = await User.find({
  classCode: user.classCode,
  grade: user.grade,
  shareInClassLeaderboard: true,
  deletedAt: null,
})
.sort({ totalXp: -1 })
.limit(30)
.select('displayName avatarId totalXp level currentStreak')
.lean();
```

### 3.3. Question selection for session

```javascript
// 60% from weak chapters, 40% from strong (drives engagement)
// (full algorithm u 08_ADAPTIVE_ENGINE.md)

const sessionQuestions = await Question.aggregate([
  { $match: { chapterId: { $in: weakChapterIds }, active: true } },
  { $sample: { size: 9 } },  // 60% of 15
  // ...
]);
```

### 3.4. Sprint readiness calculation

Vidi `10_SPRINT_PRODUCT.md` — kompleksna agregacija mock test rezultata + chapter pokrivenosti.

---

## 4. Indeksi — svi na jednom mestu

```javascript
// One-time index creation script
db.subjects.createIndex({ slug: 1 }, { unique: true });
db.subjects.createIndex({ malaMatura: 1, name: 1 });

db.classes.createIndex({ subjectId: 1, grade: 1 });

db.chapters.createIndex({ subjectId: 1, grade: 1, order: 1 });
db.chapters.createIndex({ classId: 1 });

db.questions.createIndex({ chapterId: 1, active: 1 });
db.questions.createIndex({ subjectId: 1, grade: 1, level: 1, active: 1 });
db.questions.createIndex({ legacyId: 1 }, { unique: true, sparse: true });
db.questions.createIndex({ flagged: 1 });
db.questions.createIndex({ classId: 1, active: 1 });

db.aiExplanations.createIndex({ questionId: 1 }, { unique: true });

db.users.createIndex({ email: 1 }, { unique: true, sparse: true });
db.users.createIndex({ parentId: 1 });
db.users.createIndex({ classCode: 1, grade: 1 });
db.users.createIndex({ lastActiveDate: -1 });
db.users.createIndex({ totalXp: -1, currentStreak: -1 });
db.users.createIndex({ deletedAt: 1 }, { sparse: true });

db.families.createIndex({ parentId: 1 }, { unique: true });
db.families.createIndex({ childrenIds: 1 });

db.magicLinks.createIndex({ token: 1 }, { unique: true });
db.magicLinks.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 3600 });

db.sessions.createIndex({ token: 1 }, { unique: true });
db.sessions.createIndex({ userId: 1 });
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

db.quizSessions.createIndex({ userId: 1, completedAt: -1 });
db.quizSessions.createIndex({ userId: 1, type: 1, completedAt: -1 });
db.quizSessions.createIndex({ duelId: 1 });
db.quizSessions.createIndex({ startedAt: 1 });

db.answers.createIndex({ userId: 1, questionId: 1 });
db.answers.createIndex({ userId: 1, answeredAt: -1 });
db.answers.createIndex({ questionId: 1, isCorrect: 1 });
db.answers.createIndex({ userId: 1, isCorrect: 1, answeredAt: -1 });

db.streakHistory.createIndex({ userId: 1, date: -1 });

db.badges.createIndex({ code: 1 }, { unique: true });
db.badges.createIndex({ category: 1, active: 1 });

db.userBadges.createIndex({ userId: 1, unlockedAt: -1 });
db.userBadges.createIndex({ userId: 1, badgeId: 1 }, { unique: true });

db.friends.createIndex({ user1Id: 1, user2Id: 1 }, { unique: true });
db.friends.createIndex({ user1Id: 1, acceptedAt: 1 });
db.friends.createIndex({ user2Id: 1, acceptedAt: 1 });

db.duels.createIndex({ "challenger.userId": 1, state: 1 });
db.duels.createIndex({ "challenged.userId": 1, state: 1 });

db.leagueMemberships.createIndex({ userId: 1, weekStart: -1 });
db.leagueMemberships.createIndex({ groupId: 1, weeklyXp: -1 });
db.leagueMemberships.createIndex({ weekEnd: 1 }, { expireAfterSeconds: 7776000 }); // 90 days

db.mockTestResults.createIndex({ userId: 1, submittedAt: -1 });
db.mockTestResults.createIndex({ mockTestId: 1, totalScore: -1 });

db.purchases.createIndex({ parentUserId: 1, state: 1 });
db.purchases.createIndex({ childUserId: 1, state: 1 });
db.purchases.createIndex({ "payment.referenceCode": 1 }, { unique: true, sparse: true });

db.notifications.createIndex({ userId: 1, sentAt: -1 });
db.notifications.createIndex({ state: 1 });
db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 days

db.events.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 }); // 7 days
```

---

## 5. Migracije i seed

### 5.1. Skripta `scripts/import-questions.ts`

```typescript
// Pseudocode
import questions from '../my_questions.json';
import subjects from '../subjects.json';
import classes from '../classes.json';
import chapters from '../chapters.json';

async function migrate() {
  await connectDb();
  
  // 1. Insert subjects
  for (const s of subjects) {
    await Subject.upsertOne({ _id: s.id }, s);
  }
  
  // 2. Insert classes
  for (const c of classes) {
    await Class.upsertOne({ _id: c.id }, c);
  }
  
  // 3. Insert chapters
  for (const ch of chapters) {
    await Chapter.upsertOne({ _id: ch.id }, ch);
  }
  
  // 4. Insert questions (transform legacy format)
  for (const q of questions) {
    const wrongAnswers = [
      { text: q.wrongAnswerNumberOne, textLat: q.wrongAnswerNumberOne_lat },
      { text: q.wrongAnswerNumberTwo, textLat: q.wrongAnswerNumberTwo_lat },
    ];
    
    await Question.upsertOne({ legacyId: q._id.$oid }, {
      legacyId: q._id.$oid,
      title: q.title,
      titleLat: q.title_lat,
      correctAnswer: q.correctAnswer,
      correctAnswerLat: q.correctAnswer_lat,
      wrongAnswers,
      level: q.level,
      subjectId: q.subjectId.$oid,
      classId: q.subjectClassId.$oid,
      chapterId: q.subjectClassChapterId.$oid,
      active: true,
      timesShown: 0,
      timesAnswered: 0,
      timesCorrect: 0,
      avgTimeSeconds: 0,
      flagged: false,
      source: 'import-2026-05',
    });
  }
  
  console.log('Migration complete');
}
```

### 5.2. Migracija strategy

**Verzija sheme**: čuvati u kolekciji `_migrations`
- Svaka migracija ima broj (`001_initial`, `002_add_streak_freeze`)
- Skripte u `migrations/` direktorijumu
- Prilikom deploy-a, pokrene se "pending" migracije pre serverstart-a

---

## 6. Storage estimates (sezona)

Za 50.000 free + 1.000 plaćenih:
- `users`: 51k × 2KB = ~100 MB
- `answers`: 51k × 50 dnevno × 60 dana = 153M dokumenata × 0.5KB = ~75 GB
- `quizSessions`: 51k × 5 × 60 = 15M × 1KB = ~15 GB
- `aiExplanations`: 8k × 5KB = 40 MB

**Najveće je `answers` kolekcija** — može biti 75 GB+ tokom sezone. M30 cluster ima 40GB storage. Razlozi za:
- Reduce: `answers` arhiviraj posle 30 dana u kolekciju `answersArchive` (manji RAM working set)
- Ili: M40 cluster ($240/mes) sa 80GB storage

**Odluka**: pre prve sezone, kalkulisat ćemo pravo opterećenje, biraćemo M30 ili M40.

---

## 7. Otvorena pitanja

- [ ] Koja je tačna struktura "schools" kolekcije (treba li nam uopšte u v1)? **Preporuka: NE u MVP, dodaj kad B2B uđe u plan posle Y2.**
- [ ] Da li podržavati više dece u istoj porodici od starta? **Preporuka: DA, Family Plan može biti u v1.5 sa popustom.**
- [ ] Verzija sheme: Mongoose `versionKey` da ili ne? **Preporuka: ne, koristimo schema migrations umesto.**
