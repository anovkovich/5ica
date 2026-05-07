# 26 — MVP Architecture & Build Sequence

> Sintetički dokument koji konsoliduje arhitektonsku strategiju za prelazak iz pre-launch landing-a u **funkcionalan MVP**. Ovaj plan je **odobren 2026-05-07** od strane korisnika i postaje kanon za Faza 1-4 implementacije.

---

## 1. Veliki princip — JEDAN Next.js projekat

Marketing + App + Roditelj + Admin **u istom repu** (`5ica/`), pomoću **App Router route groups**.

Razlozi:
- Single codebase = jedan deploy, jedan build, deljen brand
- Solo dev — manje overhead-a
- Server-first arhitektura tretira sve isto
- Konzistentnost sa playLiga + HaloUspomene konvencijama (Aleksa već radi tako)

Odbačeno: dva odvojena projekta (marketing + app subdomen). Razlog: cross-domain auth komplikacije, dupli održavanje branda, ne treba nam.

---

## 2. Kompletna URL i route grupa struktura

```
5ica/
├── app/
│   ├── (marketing)/          # ✅ POSTOJI — javne stranice
│   │   ├── layout.tsx        # NavBar + Footer
│   │   ├── page.tsx          # /
│   │   ├── za-roditelje/
│   │   ├── za-decu/
│   │   ├── sprint/
│   │   ├── privatnost/
│   │   └── pravila/
│   │
│   ├── (auth)/               # 🔨 SEDMICA 1
│   │   ├── prijavi-se/
│   │   │   ├── page.tsx
│   │   │   └── MagicLinkForm.tsx
│   │   └── verifikacija/[token]/page.tsx
│   │
│   ├── (app)/                # 🔨 SEDMICA 3-4 — DETE PWA
│   │   ├── layout.tsx        # Bottom nav, mobile-first
│   │   └── app/
│   │       ├── page.tsx      # Home — streak + dnevna sesija
│   │       ├── kviz/
│   │       ├── liga/
│   │       ├── drugovi/
│   │       ├── duel/
│   │       ├── profil/
│   │       └── settings/
│   │
│   ├── (parent)/             # 🔨 SEDMICA 1 (placeholder), 5 (full)
│   │   ├── layout.tsx        # Sidebar nav
│   │   └── roditelj/
│   │       ├── page.tsx      # Dashboard
│   │       ├── dete/[id]/
│   │       ├── sprint/
│   │       └── settings/
│   │
│   ├── (admin)/              # 🔨 SEDMICA 8+
│   │   └── admin/
│   │
│   ├── api/
│   │   ├── waitlist/         # ✅ POSTOJI
│   │   ├── auth/             # 🔨 SEDMICA 1
│   │   │   ├── magic-link/route.ts
│   │   │   ├── verify/route.ts
│   │   │   └── logout/route.ts
│   │   ├── dete/             # 🔨 SEDMICA 2
│   │   ├── kviz/             # 🔨 SEDMICA 3
│   │   ├── duel/             # 🔨 SEDMICA 9+
│   │   └── push/             # 🔨 SEDMICA 4
│   │
│   ├── manifest.ts           # 🔨 SEDMICA 4 — PWA
│   ├── opengraph-image.tsx   # ✅ POSTOJI
│   └── layout.tsx            # ✅ POSTOJI
```

---

## 2.5. Mobile-only viewport za app surfaces

**Pravilo (odlučeno 2026-05-07)**: app surfaces (`/app/*`, `/roditelj/*`, `/admin/*`, auth) imaju **mobile-only viewport** sa `max-w-md` (448px), centriran na desktopu sa "phone-card" stilizacijom. Marketing strane ostaju full-width.

Razlog: app je inherentno mobilno iskustvo. Pravljenje desktop layout-a je dupli rad koji niko neće koristiti.

Detalji u `06_DESIGN_SYSTEM.md` i `.claude/memory/design_system.md`.

## 3. PWA scoping strategija

**Pravilo**: Service Worker cache-uje **samo `/app/*` i `/roditelj/*`**, ne marketing.

Razlog:
- Marketing strane treba uvek fresh (SEO, A/B testovi)
- App treba offline (kviz bez interneta)
- `manifest.json` ima `start_url: "/app"` — install otvara app

Library: **serwist** (naslednik next-pwa).

Install prompt komponenta se prikazuje samo na `/app` rutama, ne na marketing-u.

---

## 4. Autentifikacija

### 4.1. Roditelj — magic link

```
1. Klik "Probaj besplatno" na landing-u
2. /prijavi-se → email input
3. POST /api/auth/magic-link → token u Mongo (TTL 15min)
4. Resend pošalje email sa /verifikacija/[token]
5. Klik na link → token verifikuje se → session cookie set
6. Ako prvi put: kreira user, redirect na /roditelj/onboarding
7. Inače: redirect na /roditelj
```

### 4.2. Dete — device-link (bez email-a)

```
1. Roditelj u /roditelj kreira dete (samo nadimak + razred + avatar)
2. Backend generiše device-link: /dete-pristup/[token]
3. Roditelj otvara link na dečjem telefonu (ili WhatsApp)
4. Klik → device-bound session (60 dana, čuva se cookie)
5. Redirect na /app
6. Dete uvek ulazi tim cookie-jem na tom telefonu
7. Roditelj može revokovati iz /roditelj/dete/[id]/settings
```

**Zašto je elegantno**: deca nemaju email (privatnost), nema šifara, roditelj ima kontrolu.

### 4.3. Session strategija

- **Cookie**: `mm_session` (HTTP-only, Secure, SameSite=Lax)
- **Sadržaj**: opaque session ID (32-char random)
- **Server lookup** u Mongo `sessions` kolekciji
- **TTL**: 30 dana za roditelja, 60 dana za dete
- **Rotacija**: roditelj na 7 dana, dete bez rotacije
- **Revoke**: brisanje iz DB invalidira odmah

Nije JWT — mogli bismo to, ali sessions u DB-u daju revoke kontrolu.

### 4.4. Auth check strategija

**Ne koristimo middleware** za auth (Edge runtime + Mongo komplikacije).

Umesto toga: **Server Components u layout.tsx** rade auth check:
- `(app)/layout.tsx` — proverava da li je user `child`
- `(parent)/layout.tsx` — proverava da li je user `parent`
- `(admin)/layout.tsx` — proverava `admin` + IP whitelist

Ako fail → `redirect("/prijavi-se")`.

---

## 5. Email infrastructure

**Resend** za sve transakcione email-ove.

**Fallback strategija** za dev mode:
- Ako `RESEND_API_KEY` env var **postoji** → šalje real email
- Ako **ne postoji** → console.log magic link u terminal (za testing bez Resend setup-a)

Ovo znači da MVP radi i pre nego što korisnik registruje Resend nalog.

---

## 6. Što čini ovo profesionalnim

1. **Server-first**: svaka stranica je Server Component dok joj ne treba interaktivnost
2. **Type-safe end-to-end**: Zod schema → TS types → Server Action → Client
3. **MongoDB facade pattern**: niko ne piše `db.collection(...)` direktno
4. **Idempotent endpoints**: klijent šalje `X-Request-Id`, server ne procesira duplikate
5. **Adaptive quiz engine** server-only
6. **AI explanations cache** po `questionId` — fixed cost, ne variable
7. **Push notifications smart**: max 1/dan/kategorija, tihi sat 21-08
8. **PWA scope-ovan** na `/app` — marketing brz, app offline
9. **Audit log od dana 1**
10. **Single Mongo + Vercel = 0 vendor lock**

---

## 7. MVP build sequence — 8 nedelja

### Sedmica 1 — Foundation (kritična)
- Mongo schemas: `users`, `sessions`, `magicLinks`, `families`
- Lib facades: `auth.ts`, `users.ts`, `sessions.ts`, `magic-links.ts`, `email.ts`
- API: `/api/auth/magic-link`, `/api/auth/verify`, `/api/auth/logout`
- UI: `/prijavi-se`, `/verifikacija/[token]`
- Roditelj layout + placeholder `/roditelj` strana
- Resend integration sa console fallback

**Quality gate**: Aleksa primi magic link, klik → autentifikovan kao parent na `/roditelj`.

### Sedmica 2 — Data import + child accounts
- `scripts/import-questions.ts` — 8.428 pitanja u Mongo
- 14 predmeta + 58 klasa + 298 poglavlja sa indeksima
- API: `/api/dete/create`, `/api/dete/[id]/device-link`, `/api/dete-pristup/[token]`
- UI: roditeljski onboarding + child creation form
- Lib: `lib/families.ts`, `lib/device-links.ts`

**Quality gate**: roditelj kreira dete, dete ulazi preko device-linka, vidi prazan `/app`.

### Sedmica 3 — Quiz core
- Adaptive selection algoritam (basic 60/40)
- API: `/api/kviz/start`, `/api/kviz/[id]/odgovor`, `/api/kviz/[id]/zavrsi`
- XP calculator (`lib/quiz/xp.ts`)
- UI: `/app` home + `/app/kviz/[sessionId]`
- Komponente: `QuestionCard`, `AnswerOption`, `QuizProgress`, `XpDisplay`

**Quality gate**: dete odigra 5-pitanja sesiju, vidi rezultat, XP raste.

### Sedmica 4 — Streak + PWA
- Streak logic + freeze
- Service Worker preko serwist
- Web App Manifest
- VAPID keys + push subscription
- Custom install prompt
- Komponente: `StreakDisplay`, `StreakFlame`, `InstallPrompt`

**Quality gate**: PWA install na iOS i Android, push stiže.

### Sedmica 5 — Roditelj dashboard osnova
- API: `/api/roditelj/dashboard`, `/api/roditelj/dete/[id]/napredak`
- UI: `/roditelj` sa multi-child switcher + statistika
- Nedeljni email izveštaj (Vercel Cron, subota 10:00)

**Quality gate**: roditelj otvori dashboard, vidi tačno šta dete radi.

### Sedmica 6 — Polish + bug fix
- Mobile testing iPhone Safari + Android Chrome
- Lighthouse 90+
- Sentry integracija
- Empty/loading/error stanja

### Sedmica 7 — Tests + smoke
- Unit testovi: XP, streak, question selection
- Integration: auth + quiz endpoints
- E2E: critical paths (signup → first quiz → result)

### Sedmica 8 — Internal beta
- 5 porodica
- 7-dana feedback period
- **Quality gate Faza 1**: 1 porodica koristi 7 dana zaredom

---

## 8. Sledeće faze (kratko)

- **Faza 2 (sed 9-16)**: svi 14 predmeta, AI objašnjenja, bedževi, lige, drugovi, parent-child duel
- **Faza 3 (sed 17-24)**: public launch, polish, marketing aktivacija
- **Faza 4 (sed 25-32)**: Sprint paket razvoj
- **Faza 5 (mart-jun 2027)**: SEZONA, glavni revenue

Detaljno u `19_ROADMAP_MILESTONES.md`.

---

## 9. Šta se NE menja u odnosu na ranije plan

Ovo je sinteza, ne novi plan. Za detalje konkretnih sistema:
- DB sheme: `03_DATA_MODEL.md`
- API specifikacija: `04_API_AUTH.md`
- Gejmifikacija: `07_GAMIFICATION_ECONOMY.md`
- Adaptive engine: `08_ADAPTIVE_ENGINE.md`
- Sprint paket: `10_SPRINT_PRODUCT.md`
- Roditeljski sistem: `11_PARENT_SYSTEM.md`
- Plaćanja: `12_PAYMENTS.md`

Ovaj dokument je kanonski za **redosled implementacije** i **PWA scoping/auth odluke**.
