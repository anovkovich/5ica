---
name: 5ica tech stack decisions
description: Finalizovan tehnološki izbor — usklađen sa playLiga i HaloUspomene konvencijama
type: project
---

## Frontend / Backend

**Next.js 16** (App Router, Server Components)
- Razlog: usklađenost sa playLiga i HaloUspomene (oba koriste 16). React 19. Tailwind 4.
- Pre koda **obavezno pročitati** node_modules/next/dist/docs/ jer Next 16 ima breaking changes.

## React

**React 19** (najnovija stabilna)

## Stilovi

**Tailwind CSS 4** + **DaisyUI 5** (theme plugin sa oklch)
- Ne shadcn/ui. Razlog: već koristiš DaisyUI u playLiga i HaloUspomene, konzistentnost preko projekata, manja dependency površina, brže do MVP.
- shadcn/ui ostaje kao escape hatch ako neka specifična komponenta DaisyUI-u stvarno fali (retka situacija).
- Inter font (latinica + ćirilica)

**Strogo CSS pravilo** (iz playLiga konvencije):
- ❌ Nikad hardkodovan hex
- ❌ Nikad custom CSS osim ako apsolutno mora
- ✅ Samo DaisyUI semantic tokeni: `btn-primary`, `bg-base-100`, `text-base-content/70`
- ✅ Mobile-first: `sm: md: lg:` prefiksi

## Database

**MongoDB Atlas** sa **Mongoose** ODM
- Razlog: source data već u Mongo formatu. HaloUspomene koristi MongoDB (mongodb driver direktno, ali Mongoose je bolji za schema). playLiga koristi Prisma+Postgres ali za naš slučaj Mongo bolje pristaje.

## Cache + Rate limiting

**Vercel KV** ili **Upstash Redis**

## Autentifikacija

**Lucia Auth** ili **Auth.js (NextAuth)** sa magic link flow-om
- Bez šifara — magic link na email roditelja

## Animacije

**framer-motion** (već koristiš u oba projekta)

## Ikone

**lucide-react** (već koristiš u oba projekta)

## Toasts

**sonner** (kao u HaloUspomene — bolja API od react-hot-toast)

## PWA

**serwist** (naslednik next-pwa)

## Email

**Resend** + **React Email** templates

## AI / LLM

**Multi-provider sa keširanjem po questionId**:
- Primary: **Groq Llama 3.3 70B** (free)
- Backup: **Google Gemini Flash 2** (free)
- Premium za Sprint detailed: **Anthropic Claude Haiku 4.5** (~$1/M)

## Analytics

**PostHog** (cloud, free do 1M events/mes)

## Error monitoring

**Sentry** (kao u HaloUspomene)
- @sentry/nextjs paket
- Client + server + edge configs

## Image hosting

**Cloudinary** (free 25GB/mes)

## Hosting

- **MVP**: Vercel Pro
- **Y2 (>$200/mes)**: razmotri migrate na Hetzner

## CDN i sigurnost

**Cloudflare** (Free)

## Plaćanja

- **Y1**: NBS IPS QR (manuelna potvrda)
- **Y2**: Monri ili NestPay
- Library za QR: **qrcode** + **@types/qrcode** (kao u HaloUspomene)

## Validacija

**Zod** (server + client schemas)

## Forme

**react-hook-form** + Zod resolver

## Utility

- **clsx** za className composition
- **tailwind-merge** za smart className merge
- **date-fns** za vreme manipulacije (lakši od momenta, native za TS)

## Testing

- **Vitest** (unit + integration)
- **Playwright** (E2E, kritični putevi)
- **k6** ili **Artillery** (load test pre prve sezone)

## Routing convention (iz playLiga pattern-a)

App Router groups:
- `(public)` — bez prijave (marketing, blog)
- `(auth)` — auth flows
- `(app)` — autentifikovan dete UX
- `(parent)` — roditelj UX
- `(admin)` — IP-restricted admin

Sve rute na **srpskom latinicom**: `/kviz`, `/predmet`, `/razred`, `/duel`, `/drugovi`, `/lige`.

## Component decomposition pravila

Iz playLiga konvencije + Aleksa naglasak "što više da rasčlanimo u što jednostavnije":

1. **Single Responsibility**: jedna komponenta = jedna odgovornost
2. **Max 100 redova po komponenti**, prelazi → razbij
3. **Extract before abstract**: prvo razbij u istom fajlu, tek pri 3+ jednakim instancama izvedi
4. **Generic-first naming**:
   - `components/ui/` → Button, Card, Input, Modal (reusable)
   - `components/[domain]/` → QuestionCard, DuelScoreboard, LeagueTable (specifičan)
5. **Props minimum**: 10+ props = signal za split
6. **Server vs Client**: Next 16 default Server. Client samo za interaktivnost ('use client').

## Folder struktura (planirana, sledi playLiga pattern)

```
5ica/
├── app/
│   ├── (public)/         # Marketing site
│   ├── (auth)/           # Magic link flows
│   ├── (app)/            # Dete UX
│   ├── (parent)/         # Roditelj UX
│   ├── (admin)/          # Admin tools
│   └── api/
├── components/
│   ├── ui/               # Generic: Button, Card, Input, Badge, Modal, Toast
│   ├── quiz/             # QuestionCard, AnswerOption, QuizProgress, QuizTimer
│   ├── duel/             # DuelRoom, DuelScoreboard, DuelInvitation
│   ├── league/           # LeagueLeaderboard, LeaguePromotionRow
│   ├── parent/           # ChildSwitcher, WeeklyReport, SprintReadiness
│   ├── streak/           # StreakDisplay, StreakFlame, StreakFreezeIndicator
│   ├── badge/            # BadgeIcon, BadgeShowcase, BadgeUnlockModal
│   └── layout/           # Header, BottomNav, Sidebar
├── lib/
│   ├── db.ts             # Mongoose singleton
│   ├── auth.ts           # Magic link helpers
│   ├── slugify.ts        # Srpska latinica slug helper
│   ├── xp.ts             # XP kalkulacija (pure functions)
│   ├── streak.ts         # Streak logic
│   ├── adaptive.ts       # Question selection
│   └── ai.ts             # LLM provider abstraction
├── data/
│   ├── my_questions.json
│   ├── subjects.json
│   ├── classes.json
│   └── chapters.json
├── scripts/
│   ├── import-questions.ts
│   └── generate-ai-explanations.ts
├── public/
├── .claude/
└── ...
```

## Git policy (kritičnо)

- **NE radi commit/push bez izričite saglasnosti** (Aleksa preferenca)
- Conventional commits (`feat:`, `fix:`, `chore:`)
- Bez "Co-Authored-By: Claude" potpisa (iz playLiga konvencije)
