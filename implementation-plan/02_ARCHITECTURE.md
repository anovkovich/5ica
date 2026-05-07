# 02 — System Architecture

## Cilj

Definisati tehničku arhitekturu na nivou koji omogućava implementaciju bez dodatnih pitanja, sa svim odlukama o tech-u, deployment-u, i kako delovi razgovaraju.

---

## 1. Visoki pogled

```
┌─────────────────────────────────────────────────┐
│                    Korisnici                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐ │
│  │   Dete   │  │ Roditelj │  │    Admin/Ti    │ │
│  │ (mobile) │  │ (mob/web)│  │    (web)       │ │
│  └────┬─────┘  └────┬─────┘  └────────┬───────┘ │
└───────┼─────────────┼─────────────────┼─────────┘
        │             │                 │
        ▼             ▼                 ▼
┌──────────────────────────────────────────────┐
│         Cloudflare (CDN + DDoS + WAF)        │
└─────────────────────┬────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│              Vercel (Next.js 16)              │
│  ┌────────────────────────────────────────┐  │
│  │  App Router (Server Components)        │  │
│  │  - Public marketing pages              │  │
│  │  - /app — main dete UX                 │  │
│  │  - /roditelj — parent dashboard        │  │
│  │  - /admin — internal tools             │  │
│  │  - /api — REST/RSC endpoints           │  │
│  └────────────────────────────────────────┘  │
└──────┬──────────────┬───────────────┬────────┘
       │              │               │
       ▼              ▼               ▼
┌────────────┐ ┌──────────────┐ ┌──────────────┐
│ MongoDB    │ │ Cache Layer  │ │ Redis (KV)   │
│ Atlas      │ │ (Vercel KV   │ │ Sessions,    │
│ Cluster    │ │ ili Upstash) │ │ Rate limit   │
└────────────┘ └──────────────┘ └──────────────┘

Spoljni servisi:
┌─────────────────────────────────────────────┐
│ - Resend (transakcioni email)               │
│ - Groq / Gemini Flash (LLM za objašnjenja)  │
│ - PostHog (analytics + feature flags)       │
│ - Sentry (greske, performance)              │
│ - Cloudinary (avatari, slike pitanja)       │
│ - NBS API (IPS QR generisanje)              │
│ - Web Push API (PWA notifikacije)           │
└─────────────────────────────────────────────┘
```

---

## 2. Tech stack — finalni izbor

### 2.1. Frontend / Backend (jedno isto kod Next.js)

**Framework**: **Next.js 16** (App Router) + **React 19**
- Razlog: usklađenost sa postojećim Aleksinim projektima (playLiga + HaloUspomene oba na Next 16). Server components po default-u.
- **Pre koda**: pročitati `node_modules/next/dist/docs/` jer Next 16 ima breaking changes od onoga što je u training data-i.
- Alternative razmotrene i odbačene: SvelteKit (manji ekosistem), Remix (preklapanje sa Next).

**Stilovi**: **Tailwind CSS 4** + **DaisyUI 5** (sa theme plugin u oklch)
- Razlog: usklađenost sa Aleksinim postojećim projektima (oba koriste DaisyUI). Manja dependency površina nego shadcn. Brže do MVP. Tema se definiše kroz `@plugin "daisyui/theme"` u `globals.css`.
- shadcn/ui je razmotren ali odbačen — DaisyUI radi 90%+ slučajeva sa manje overhead-a, a Aleksa već zna sintaksu iz 2 produkcije.
- shadcn/ui ostaje **escape hatch** ako neka specifična komponenta DaisyUI-a stvarno fali.
- **Stroga pravila** (iz playLiga konvencije):
  - ❌ Nikad hardkodovan hex
  - ❌ Nikad custom CSS osim ako apsolutno mora
  - ✅ Samo DaisyUI semantic tokeni (`btn-primary`, `bg-base-100`, `text-base-content/70`)
  - ✅ Mobile-first sa `sm: md: lg:` prefiksima

**Brand boje**: vidi `06_DESIGN_SYSTEM.md` za kompletnu paletu "Dnevnička petica" (royal blue + crimson + gold).

**Form handling**: React Hook Form + Zod
- Razlog: deklarativni, type-safe, server validation kroz isti Zod schema

**Type safety**: TypeScript strict mode
- Razlog: hvata greške pre runtime-a, AI alati pravilno koriste tipove

### 2.2. Database

**Primary**: MongoDB Atlas (M10 cluster za MVP, M30 za sezonu)
- Razlog: već imamo strukturu koja je iz Mongo-a, ne refaktorišemo
- M10 ($60/mes) je dovoljan za prvih 5.000 korisnika
- M30 ($120/mes) za 50.000+

**ORM/ODM**: Mongoose (sa TypeScript-om)
- Razlog: mature, deklarativna shema, plugin ekosistem
- Alternative razmotrene: Prisma (još uvek slabija MongoDB podrška), čista Mongo driver (preopširno)

**Cache**: Vercel KV (Redis-pod-haubom) ili Upstash Redis
- Razlog: rate limiting, session storage, kratki keševi (recent activity)

### 2.3. Autentifikacija

**Sistem**: Lucia Auth (samohostovan) ili Auth.js (NextAuth)
- Razlog: magic link, bez šifara, OWASP-compliant
- Lucia preporuka jer je lakša da customize-uješ za roditelj/dete logiku
- Alternative razmotrene: Clerk (skupo brzo, vendor lock-in), čisto JWT (previše security risk za solo dev)

### 2.4. Email

**Servis**: Resend
- Razlog: dev-friendly API, dobar Inbox placement, jeftin (3.000 mailova/mes besplatno)
- Templates: React Email (komponente za email, isti React patterns)
- Alternative: Brevo (Sendinblue) — jeftiniji za scale, ali Resend bolji DX

### 2.5. AI / LLM

**Model**: Groq Llama 3.3 70B (besplatno tier, brz)
- Backup: Google Gemini Flash 2 (besplatan tier ima dobre limite)
- Production scale: Anthropic Claude Haiku 4.5 ($1/M input tokens — jeftino sa keširanjem)
- Razlog: keširamo objašnjenja po pitanju, generišemo jednom, koristimo zauvek
- Cache strategy: Mongo collection `aiExplanations` sa TTL od 0 (nikad ne ističe)

### 2.6. Analytics i feature flags

**Analytics**: PostHog (self-hosted ili cloud)
- Razlog: jedan alat za eventi + feature flags + session recording + cohorts
- Cloud free tier: 1M events/mes
- Alternative: Mixpanel (skuplji), čisto Google Analytics (slabiji za product analytics)

### 2.7. Error monitoring

**Servis**: Sentry
- Razlog: standard, dobar za Next.js, free tier dovoljno za MVP

### 2.8. Image hosting

**Servis**: Cloudinary
- Razlog: avatari, slike u pitanjima (ako budu trebali za matematiku/fiziku), automatska optimizacija
- Free tier: 25 GB storage, 25 GB bandwidth/mes — dovoljno za Y1

### 2.9. Hosting

**MVP do 5k plaćenih**: Vercel Pro ($20/mes po članu tima)
- Razlog: zero-config Next.js, edge functions, brza globalna distribucija

**Posle 5k plaćenih**: razmotri VPS (Hetzner ili DigitalOcean) ako Vercel troškovi prelaze $200/mes
- Razlog: Vercel je premium za convenience, ali skup za scale

### 2.10. CDN i sigurnost

**Cloudflare** (Free plan dovoljan)
- DDoS zaštita
- WAF za očiglednog napada
- Bot Fight Mode
- Geo-blocking (možemo ograničiti samo Srbija/region ako želimo)

---

## 3. PWA arhitektura

### 3.1. Komponente PWA-a

1. **Web App Manifest** (`/public/manifest.json`)
   - Ime app-a, ikone (svih veličina), tema boja, display mod
2. **Service Worker** (`/public/sw.js`)
   - Cache strategija (network-first za API, cache-first za assete)
   - Offline fallback
   - Push notification handler
3. **Install prompt** (`<InstallPWA />` komponenta)
   - Custom UI za "Dodaj na home screen" — ne prepuštaj browser-u
4. **Push notification system**
   - VAPID keys
   - Subscription endpoint na backendu
   - Cron job za slanje (Vercel Cron ili Inngest)

### 3.2. Specifičnosti za platforme

**iOS (Safari 17.4+)**:
- Push notifikacije rade samo ako je app instaliran (Add to Home Screen)
- Treba edukovati korisnika da instalira (custom prompt)
- Service worker ima ograničenja na pozadinski rad

**Android (Chrome 110+)**:
- Push notifikacije rade i bez instalacije
- Nativni install prompt funkcioniše
- Cellular cache rad bolji nego iOS

**Desktop**:
- PWA install rade u Chrome, Edge, Brave
- Roditeljski dashboard primarno desktop ekraj

### 3.3. Library izbor za PWA

**`@ducanh2912/next-pwa`** ili **`serwist`** (naslednik next-pwa)
- Preporuka: **serwist** — savremeniji, bolji TS support, aktivniji development

---

## 4. Routing arhitektura

### 4.1. App Router struktura

```
/app
├── (marketing)              # Public marketing site
│   ├── page.tsx             # / Homepage
│   ├── kako-radi/page.tsx   # /kako-radi
│   ├── cene/page.tsx        # /cene
│   ├── za-roditelje/page.tsx
│   ├── za-decu/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── kontakt/page.tsx
│   ├── pravila-koriscenja/page.tsx  # TOS
│   └── privatnost/page.tsx          # Privacy Policy
│
├── (auth)                   # Auth flows
│   ├── prijavi-se/page.tsx          # Magic link request
│   └── verifikacija/[token]/page.tsx # Magic link verify
│
├── (app)                    # Authenticated app — dete UX
│   ├── layout.tsx           # Sa bottom nav, header
│   ├── page.tsx             # Home — daily session, streak
│   ├── kviz/
│   │   ├── [predmet]/[razred]/page.tsx
│   │   └── sesija/[sessionId]/page.tsx
│   ├── liga/page.tsx        # Lige + leaderboards
│   ├── razred/page.tsx      # Leaderboard razreda
│   ├── drugovi/page.tsx     # Friends list
│   ├── duel/
│   │   ├── novi/page.tsx    # Initiate duel
│   │   └── [duelId]/page.tsx
│   ├── profil/page.tsx
│   └── settings/page.tsx
│
├── (parent)                 # Roditelj UX
│   ├── layout.tsx
│   ├── page.tsx             # Roditeljski dashboard
│   ├── dete/[childId]/
│   │   ├── page.tsx         # Detalji o detetu
│   │   ├── napredak/page.tsx
│   │   └── settings/page.tsx
│   ├── duel/page.tsx        # Roditelj-vs-dete duel
│   └── sprint/page.tsx      # Sprint paket info i kupovina
│
├── (admin)                  # Internal admin (auth-protected, IP-limited)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── korisnici/page.tsx
│   ├── pitanja/page.tsx
│   ├── konverzije/page.tsx
│   └── revenue/page.tsx
│
└── api                      # API routes
    ├── auth/
    │   ├── magic-link/route.ts
    │   └── verify/route.ts
    ├── kviz/
    │   ├── start/route.ts
    │   ├── odgovori/route.ts
    │   └── zavrsi/route.ts
    ├── duel/
    ├── sprint/
    ├── webhooks/
    └── admin/
```

### 4.2. Domeni i subdomeni (preporuka)

- **Glavni**: `malamatura.app` (ili sličan, kupiti **odmah**)
- **Marketing**: isti, `/`
- **App**: isti domen, `/app`
- **Roditelj**: isti domen, `/roditelj`
- **Admin**: zaseban subdomen, `admin.malamatura.app` — IP whitelist, posebna autentifikacija

### 4.3. Imenovanje rute

- Sve rute na **srpskom latinicom** (kviz, predmet, razred, duel, drugovi, roditelj)
- Slug-ovi za predmete: `matematika`, `srpski-jezik`, `istorija` itd. (već definisano u `subjects.json`)
- Brojevi za razrede: `r5`, `r6`, `r7`, `r8` ili samo `5`, `6`, `7`, `8` — preporuka **brojevi** (kraće)

---

## 5. Skalabilnost — gde će puknuti

### 5.1. Verovatne tačke pucanja

| Komponenta | Pri čemu broju korisnika puca | Mitigacija |
|---|---|---|
| MongoDB M10 | ~5.000 aktivnih dnevno | Migrate na M30 ($60→$120/mes) |
| Vercel Hobby | 100 GB bandwidth/mes | Pro plan ($20/mes) ili Cloudflare cache |
| Resend free | 3.000 mailova/mes | Plaćeni plan od $20/mes (50k) |
| Groq free tier | rate limit po sat | Switch na Gemini Flash (drugi free tier) ili plati Haiku |
| Cloudinary free | 25 GB bandwidth/mes | Plaćeni plan ili Cloudflare R2 sa custom layer |
| PostHog free | 1M events/mes | Self-host PostHog ili plaćeni cloud |

### 5.2. Spremnost za sezonske pikove

April-jun = 5-10× viši saobraćaj. Pre 1. marta:
- Database scale up (M30)
- Vercel Pro (ako nismo)
- Stress test: 100 simultanih sesija (k6 ili Artillery)
- Cloudflare cache rules potvrđene
- Sentry alerts podešeni za >100 grešaka/min

### 5.3. Šta se NE skalira (i ne treba)

Single-region (Frankfurt) je dovoljan za Srbiju + region. **Ne radimo multi-region**.

Ne radimo microservises. **Monolit Next.js + jedna baza**. Refactoring posle 50.000 plaćenih, ne pre.

---

## 6. Sigurnosne osnove

### 6.1. Auth specifičnosti

- **Magic link expires** za 15 min
- **Rate limit** na auth endpoint: 5 zahteva/min po IP-u
- **CSRF protection** na sve POST/PUT/DELETE
- **Session token** rotacija na svakih 7 dana
- **Logout flow** koji invalidira sve sesije (paranoia mod za roditelje)

### 6.2. Input validation

- Sve API ulaze prolaze kroz Zod schema
- File upload: samo slike (mime + magic bytes), max 5 MB
- Tekst u profilu: HTML stripped, max 100 chars za nadimak

### 6.3. Headers (next.config.js)

```javascript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': '...' // strict, vidi dole
}
```

### 6.4. CSP (Content Security Policy)

Striktan CSP, dozvoljava samo:
- self + Vercel za scripts
- self + Cloudinary za images
- self + Resend tracking pixels (ako ih koristimo)
- inline scripts samo sa nonce-om

### 6.5. Rate limiting

Po IP i po user_id:
- Auth: 5/min
- API generalno: 60/min po useru, 200/min po IP
- AI explanation request: 20/dan po useru
- Push subscription: 5/dan po useru

### 6.6. PII zaštita

- Email se hash-uje (SHA-256) za PostHog identifier
- IP-jevi se anonimiziraju (last octet 0) u logovima
- Audit log se rotira na 90 dana (osim pravnih obaveza)

---

## 7. Razvojno okruženje

### 7.1. Lokalno

- **Node.js 22+** (LTS)
- **pnpm** za package manager (brži, manje disk troši nego npm)
- **MongoDB lokalno** kroz Docker compose (ili koristi Mongo Atlas dev cluster — besplatan M0)
- **`.env.local`** sa ključevima — NIKAD u repu

### 7.2. Skripte

`package.json` minimalno mora imati:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test",
    "db:seed": "tsx scripts/seed.ts",
    "db:import-questions": "tsx scripts/import-questions.ts"
  }
}
```

### 7.3. Git workflow

- `main` grana je live
- Feature branches: `feat/duel-mechanic`, `fix/streak-bug`
- PR review preko sebe (commit pre push, čitaj diff još jednom)
- Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`)
- Tags za release: `v0.1.0` (MVP), `v0.5.0` (beta), `v1.0.0` (public)

### 7.4. CI/CD

- Vercel deploy on push to `main`
- Preview deploys za feature branches (svaki PR ima link)
- GitHub Actions:
  - `lint` na svaki push
  - `type-check` na svaki push
  - `test` na PR
  - `e2e` na main

---

## 8. Backup i disaster recovery

### 8.1. Database backup

- MongoDB Atlas radi automatski snapshot svakih 6h
- Retencija: 7 dana free, 30 dana M30
- Manuelni snapshot pre svakog migrata

### 8.2. Code backup

- GitHub primary
- Glacier-style backup u Cloudflare R2 ili B2 — mesečno (paranoja)

### 8.3. Plan oporavka

Ako Vercel pukne:
- Pre-built Docker image deploy na Hetzner (15 min)
- DNS switch na Cloudflare (~5 min propagacija)

Ako MongoDB Atlas pukne:
- Atlas SLA je 99.95%, ali...
- Restore iz najnovijeg snapshot-a (~1h za M30)

Ako baza je korumpiran (npr. silly bug obrisao 50% korisnika):
- Restore iz pre-incident snapshot-a
- Maksimalan gubitak: 6h podataka
- Komunikacija korisnicima: javno transparentno (saopštenje + 1 mesec besplatnog Sprint pristupa)

---

## 9. Otvorena pitanja za odluku pre implementacije

- [ ] Domen ime: `malamatura.app`, `malamatura.rs`, drugo? Kupiti odmah.
- [ ] MongoDB Atlas region: Frankfurt (najbliži Srbiji u EU)?
- [ ] Da li PWA install prompt na prvi posetilac ili posle aktivacije?
- [ ] Push notifikacije kao opt-in ili opt-out po default-u? **Preporuka: opt-in eksplicitan**.
- [ ] Image upload u v1? **Preporuka: ne**. Slike pitanja samo statični SVG/PNG iz repoa.

---

## 10. Risk-ovi specifični za arhitekturu

| Risk | Verovatnoća | Mitigacija |
|---|---|---|
| Vercel cena raste eksponencijalno sa traffic-om | srednja | Cloudflare cache + plan migration na VPS pre Y2 |
| MongoDB Atlas outage | niska | SLA 99.95%, restore plan, status page |
| LLM provider menjа cene/uslove | srednja | Apstrakcioni layer u kodu, lako prebaciš provider-a |
| PWA push ne radi na nečijem iOS-u | srednja | Email fallback za sve push-eve |
| iOS Safari menja PWA podršku | niska | Pratimo WWDC najave, imamo plan |
