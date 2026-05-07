# 5ica — Projekat brief za Claude

> Ovaj fajl Claude čita automatski kada se otvori projekat u `C:\Users\Aleksa\Documents\5ica\`. Pruža kompletan kontekst da Claude može da nastavi rad bez ponavljanja.

---

## Šta je 5ica

**5ica** (čita se "petica") je web + PWA aplikacija za dnevnu vežbu i pripremu za malu maturu, namenjena učenicima 1-8. razreda osnovne škole u Srbiji. Brand "5ica" koristi vizuelnu igru (broj 5 + nastavak "ica") koja se izgovara identično srpskoj reči "petica" (najviša ocena u školi).

**Vlasnik / osnivač**: Aleksa (aleksa@coinsub.io)

**Status**: Pre-development. Plan i strategija završeni, kupovina domena u toku, kod nije počet.

**Cilj sezone**: Mala matura, jun 2027. Lansiranje MVP-a planirano za avgust 2026, soft launch novembar 2026, glavna prodajna sezona mart-jun 2027.

---

## Poslovni model (čvrsto fiksiran)

**Free verzija** (zauvek besplatno):

- Sva pitanja za sve razrede 1-8
- Dnevna gejmifikovana vežba
- Lige, drugovi, razred-leaderboard
- Roditelj-vs-dete duel
- Roditeljski dashboard sa nedeljnim izveštajem

**Sprint paket** (jednokratno, sezona mart-jun):

- **4.990 RSD** standardno, **3.990 RSD** early bird (do 1. marta)
- 90-dnevni personalizovani plan
- 12 mock testova u realnom formatu mature
- Detaljnija AI objašnjenja
- "Structure not content" strategija — Free ima sva pitanja, Sprint dodaje plan + mock testovi + AI coach + cohort. **Bez garancije povraćaja.**

**ODBAČENO** (ne forsiraj):

- ❌ Mesečne pretplate (Srbija ne plaća)
- ❌ B2B prodaja školama (sales-heavy, slow)
- ❌ Native iOS/Android app u v1 (PWA dovoljan)

---

## Tech stack (fiksiran, usklađen sa playLiga + HaloUspomene)

- **Framework**: Next.js 16 (App Router, Server Components) + React 19 — **ne** Next 15
- **Stilovi**: **Tailwind 4 + DaisyUI 5** (theme plugin sa oklch) — **ne** shadcn/ui
- **Database**: MongoDB Atlas (M10 → M30 za sezonu) sa Mongoose
- **Auth**: Lucia Auth ili Auth.js (magic link, no passwords)
- **PWA**: serwist (naslednik next-pwa)
- **Email**: Resend + React Email templates
- **Animacije**: framer-motion
- **Ikone**: lucide-react
- **Toasts**: sonner
- **AI/LLM**: Groq Llama 3.3 70B primarni, Gemini Flash 2 backup, Anthropic Claude Haiku 4.5 za detaljna Sprint objašnjenja (sa keširanjem po questionId)
- **Analytics**: PostHog (cloud)
- **Errors**: Sentry
- **Hosting**: Vercel Pro
- **CDN**: Cloudflare
- **Plaćanja Y1**: NBS IPS QR (manuelna potvrda u admin panelu)
- **Plaćanja Y2**: Monri ili NestPay

**Pravila CSS-a (iz playLiga konvencije)**:

- ❌ Nikad hardkodovan hex
- ❌ Nikad custom CSS osim ako apsolutno mora
- ✅ Samo DaisyUI semantic tokeni (`btn-primary`, `bg-base-100`, `text-base-content/70`)
- ✅ Mobile-first sa `sm: md: lg:` prefiksima

**Component decomposition pravila**:

- Single Responsibility: 1 komponenta = 1 odgovornost
- Max 100 redova po fajlu
- Extract before abstract
- Generic-first naming: `components/ui/` (reusable) vs `components/[domain]/` (specifičan)
- Server-default, Client samo za interaktivnost (`'use client'`)

**Mobile-only viewport za app surfaces** (odlučeno 2026-05-07):

- App surfaces (`/app/*`, `/roditelj/*`, `/admin/*`, auth) koriste `max-w-md` (448px) viewport, centriran na desktopu sa "phone-card" stilizacijom (rounded-3xl, shadow-2xl, border, base-200 bg).
- Marketing strane (`/`, `/za-roditelje`, etc.) ostaju **full-width responsive**.
- Razlog: app je inherentno mobilno iskustvo. Desktop layout je dupli rad koji niko neće koristiti.
- Šablon u `.claude/memory/design_system.md`.

---

## Struktura projekta

```
C:\Users\Aleksa\Documents\5ica\
├── CLAUDE.md                          # Ovo (čita Claude automatski)
├── BUSINESS_PLAN.md                   # Strateški biznis plan (v2)
├── data/                              # Source data
│   ├── my_questions.json              # 8.428 pitanja (kopija originala)
│   ├── subjects.json                  # 14 predmeta sa metadata
│   ├── classes.json                   # 58 (predmet × razred) sa grade guess
│   └── chapters.json                  # 298 imenovanih poglavlja sa samples
├── implementation-plan/               # 22 dokumenta — biblija projekta
│   ├── 00_INDEX.md                    # Master index, počni odavde
│   ├── 01_PRINCIPLES_DECISIONS.md     # Vodeća načela
│   ├── 02_ARCHITECTURE.md             # Tech, deploy, security
│   ├── 03_DATA_MODEL.md               # MongoDB sheme, indeksi
│   ├── 04_API_AUTH.md                 # API specifikacija
│   ├── 05_UX_SCREENS_FLOWS.md         # UX, ekran-po-ekran
│   ├── 06_DESIGN_SYSTEM.md            # Boje, tipografija, komponente
│   ├── 07_GAMIFICATION_ECONOMY.md     # XP, leveli, lige, balans
│   ├── 08_ADAPTIVE_ENGINE.md          # Algoritmi izbora pitanja
│   ├── 09_CONTENT_PIPELINE.md         # Pitanja, AI explanations
│   ├── 10_SPRINT_PRODUCT.md           # Mala Matura Sprint
│   ├── 11_PARENT_SYSTEM.md            # Dashboard, duel, notifikacije
│   ├── 12_PAYMENTS.md                 # NBS QR, edge case handling
│   ├── 13_ADMIN_PANEL.md              # Internal alati
│   ├── 14_MARKETING_GROWTH.md         # Brand, kanali, kampanje
│   ├── 15_ANALYTICS_METRICS.md        # KPI-jevi, eventi
│   ├── 16_TESTING_QA.md               # Test strategija
│   ├── 17_LEGAL_COMPLIANCE.md         # TOS, privacy, ugovor
│   ├── 18_LAUNCH_PLAYBOOK.md          # Pre-launch + sezona
│   ├── 19_ROADMAP_MILESTONES.md       # Sedmica-po-sedmica
│   ├── 20_RISKS_CHECKLISTS.md         # Risk register
│   └── 25_DECISIONS.md                # Decision log
└── .claude/
    └── memory/                        # Project-local Claude memorija
        ├── MEMORY.md                  # Index
        └── *.md                       # Pojedinačne memorije
```

> **Napomena za buduću sesiju**: implementation-plan/ koristi naziv "Mala Matura" lokalno u nekim dokumentima jer je pisan pre brand finalizacije. Tretiraj sva pominjanja "Mala Matura App" kao `5ica`. Sprint paket ostaje "Mala Matura Sprint" kao sub-brand.

---

## Trenutno stanje (2026-05-07)

**Završeno**:

- ✅ Strateški plan (BUSINESS_PLAN.md)
- ✅ Implementation plan (22 dokumenta)
- ✅ Data corpus mapiran (subjects, classes, chapters, questions)
- ✅ Brand finalizovan: 5ica
- ✅ Domain `5ica.rs` identifikovan kao slobodan

**U toku**:

- ⏳ Kupovina `5ica.rs` (i potencijalno `.app`, `.com`, `.co`)
- ⏳ Trademark check kod ZIS-a za "5ICA" u klasama 9 i 41

**Sledeće**:

- Pravna osnova: APR registracija paušalca, ugovor sa prijateljem za pitanja, advokat (TOS, Privacy)
- Marketing: Instagram nalog `@5ica`, prvi Reels iz baze pitanja
- Tech setup: GitHub repo, Vercel, MongoDB Atlas free cluster
- MVP sedmica 1: Next.js + Mongo + magic link auth

---

## Ključna pitanja na koja Claude treba da zna odgovor

### Kako se proizvod zove?

**5ica** (vizuelno: broj 5 + "ica"; izgovara se "petica"). Ne "Mala Matura". Ne "5-ica". Ne "Petica". **5ica**.

### Koji je glavni cilj?

Mala matura sezona, jun 2027. Y1 cilj: 400-560 Sprint kupaca, ~2-3M RSD prihoda, blizu break-even-a.

### Tri kritične metrike koje sve drugo služi

1. D7 retention u free fazi **>25%**
2. % 8-gradera u bazi do februara **>15%**
3. Free → Sprint konverzija **>5%**

### Šta NIKAD ne radimo?

- Direktnu komunikaciju (chat, DM) između dece
- Pay-to-win mehanike
- Reklame deci u app-u
- Tracking lokacije dece
- Native app pre 5.000 plaćenih
- Investitora pre Y2

### Koji je sledeći korak?

Vidi `implementation-plan/19_ROADMAP_MILESTONES.md` Faza 0 (sedmica -2 i -1) i Faza 1 (sedmica 1-8).

---

## Brand identitet

- **Ime**: 5ica
- **Izgovor**: "petica"
- **Vizuelno**: velika **"5"** u **secondary** (crimson) + sitnije **"ica"** u **neutral** (charcoal)
- **Slogan kandidati**: "Vežbaj za peticu", "Skupi svojih 5ica", "5ica Sprint — priprema za malu maturu"
- **Tone**: topao + profesionalan, srpski, ne korporativan

### Brand boje — paleta "Dnevnička petica"

Inspiracija: u srpskim dnevnicima učitelji pišu petice **crvenom olovkom**

| Token       | Vrednost (oklch)                      | Gde se koristi                  |
| ----------- | ------------------------------------- | ------------------------------- |
| `primary`   | `oklch(52% 0.20 258)` royal blue      | Glavni CTA, navbar, linkovi     |
| `secondary` | `oklch(58% 0.21 25)` crimson          | Logo "5", proslava, achievement |
| `accent`    | `oklch(80% 0.15 80)` warm gold        | XP, streak, sertifikati         |
| `success`   | `oklch(65% 0.16 155)` emerald         | Tačan odgovor                   |
| `error`     | `oklch(60% 0.22 18)` pure red         | Pogrešan odgovor                |
| `warning`   | `oklch(76% 0.15 75)` amber            | Streak rizik                    |
| `info`      | `oklch(64% 0.14 220)` sky blue        | Roditeljski izveštaji           |
| `base-100`  | `oklch(99% 0.003 250)` warm off-white | Glavna pozadina                 |

Kompletni theme plugin za DaisyUI v5: vidi `implementation-plan/06_DESIGN_SYSTEM.md` sekcija 2.2.

---

## Pravila ponašanja Claude-a u ovom projektu

1. **Ne menjaj strateške odluke bez eksplicitnog pristanka.** Ako predlažeš pivot, prvo pitaj.
2. **Pre koda, čitaj `implementation-plan/`.** Specifikacije postoje, koristi ih.
3. **Decision log u `implementation-plan/25_DECISIONS.md` se ažurira sa svakom novom odlukom**, ne samo arhivira.
4. **Memorija u `.claude/memory/`** je za stvari koje moraju da prežive sesiju ali nisu u kodu/planu.
5. **Pišeš odgovore na srpskom** kad korisnik piše srpski. Tehnički termini u engleskom su OK.
6. **Pravne i finansijske odluke**: konsultuj korisnika pre ikakve preporuke za action. Ovo nije auto-pilot zona.
7. **Git operacije**: bez izričite saglasnosti ne radimo commit/push. Drži se toga.
8. **Bez "Co-Authored-By: Claude"** ili sličnih potpisa u commit porukama. **NIKAD.** Iz playLiga konvencije.
9. **Auto-update na strateške promene**: kada korisnik tokom sesije izmeni nešto fundamentalno (cenovni model, brand, glavni feature, garancija, target audience, tech stack, itd.), **automatski** ažuriraj sve relevantne dokumente bez čekanja na pitanje. Konkretno:
   - `implementation-plan/*.md` (sve relevantne sekcije)
   - `.claude/memory/*.md` (relevantne memorije)
   - `BUSINESS_PLAN.md` (ako biznisna promena)
   - Public copy u `components/` i `app/(marketing)/` (ako se pominje promenjena tema)
   - `CLAUDE.md` (ako menja brand/strategy fundamentale)
   - `25_DECISIONS.md` (uvek upiši novu odluku sa datumom i razlozima)

   **Ne pita** "treba li da ažuriram fajlove" — to je default ponašanje. Pita SAMO "imaš li još promena pre nego što krenem".

---

## Reference

- Strategijska memorija (user-level): `C:\Users\Aleksa\.claude\projects\C--Users-Aleksa\memory\`
- Email: aleksa@coinsub.io
