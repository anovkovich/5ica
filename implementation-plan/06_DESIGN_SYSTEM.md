# 06 — Design System

## Cilj

Vizuelni i interakcijski standardi koji obezbeđuju konzistentno iskustvo bez svakodnevnog donošenja "kako ovo treba da izgleda" odluka.

**Stack**: Tailwind 4 + DaisyUI 5 (sa custom theme plugin u oklch). Bez hardkodovanog hex-a, bez custom CSS-a osim ako apsolutno mora.

---

## 1. Brand identitet

### 1.1. Brand ime
**5ica** (cifra 5 + "ica", izgovara se "petica" — najviša ocena u srpskoj školi).

### 1.2. Logo

**Vizuelno**: velika **"5"** u **secondary** boji (crimson) + sitnije **"ica"** u **neutral** (charcoal).

```
┌────────────────┐
│                │
│   5  ica       │
│                │
└────────────────┘
```

- "5" = Inter Bold ili Cabinet Grotesk Bold, ~64-96px na hero
- "ica" = Inter Medium, ~32-48px

**Kulturalni okidač**: u srpskim dnevnicima učitelji pišu petice **crvenom olovkom**. Logo evokuje upravo taj pokret — petica zapisana na papiru. Niko od konkurenata ovo ne koristi.

### 1.3. Personality

- **Topao** ali ne djetinjast
- **Profesionalan** ali ne dosadan
- **Energičan** ali ne agresivan
- Pristupačan deci 7-15 god i roditeljima 35-50 god istovremeno

### 1.4. Tone of voice

Za decu: pozitivni okvir ("Bravo!", "Skoro!", "Hajde da..."), bez korporativnog tona, "ti" (familijarno).
Za roditelje: profesionalan + topao, konkretni brojevi, "vi" (formalniji).

---

## 2. Brand boje — paleta "Dnevnička petica"

### 2.1. Strategija

- **Primary (royal blue)**: smiren glavni UI ton — dugmad, navbar, linkovi
- **Secondary (crimson)**: "5ica red" za logo i posebne momente (achievement, level up, badge unlock)
- **Accent (gold)**: XP, streak vatra, sertifikati
- **Base**: topla off-white sa blagim plavičastim undertone-om — papirno svetlo

### 2.2. DaisyUI v5 theme

Definiše se u `app/globals.css`:

```css
@import "tailwindcss";
@plugin "daisyui";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

@plugin "daisyui/theme" {
  name: "petica";
  default: true;
  color-scheme: light;

  /* PRIMARY: Royal blue — knowledge, autoritet */
  --color-primary: oklch(52% 0.20 258);
  --color-primary-content: oklch(100% 0 0);

  /* SECONDARY: Crimson — "5ica red", logo, achievement */
  --color-secondary: oklch(58% 0.21 25);
  --color-secondary-content: oklch(100% 0 0);

  /* ACCENT: Warm gold — XP, streak */
  --color-accent: oklch(80% 0.15 80);
  --color-accent-content: oklch(22% 0.02 250);

  /* NEUTRAL */
  --color-neutral: oklch(22% 0.02 250);
  --color-neutral-content: oklch(98% 0 0);

  /* BASE */
  --color-base-100: oklch(99% 0.003 250);
  --color-base-200: oklch(96% 0.006 250);
  --color-base-300: oklch(91% 0.012 250);
  --color-base-content: oklch(22% 0.02 250);

  /* SEMANTIC */
  --color-info: oklch(64% 0.14 220);
  --color-info-content: oklch(100% 0 0);
  --color-success: oklch(65% 0.16 155);
  --color-success-content: oklch(100% 0 0);
  --color-warning: oklch(76% 0.15 75);
  --color-warning-content: oklch(22% 0 0);
  --color-error: oklch(60% 0.22 18);
  --color-error-content: oklch(100% 0 0);

  /* RADII */
  --radius-box: 1rem;
  --radius-btn: 0.5rem;
  --btn-text-case: none;
}

html {
  scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2.3. Pravila korišćenja boja

| Boja | Kada se koristi | Primer u UI |
|---|---|---|
| `primary` (royal blue) | Glavni CTA, navbar brand, glavni linkovi | "Igraj" dugme, "Kupi Sprint" |
| `secondary` (crimson) | Logo "5", proslava, posebni momenti | Streak milestone, level up, badge unlock, "Petica!" |
| `accent` (gold) | XP brojevi, streak vatra, sertifikati | "+12 XP" tekst, streak counter, sprint sertifikat |
| `success` (emerald) | Tačan odgovor, pozitivan indikator | "Bravo!" ✓ animacija |
| `error` (pure red) | Pogrešan odgovor, validation greške | "X" animacija (kratak shake), "Polje je obavezno" |
| `warning` (amber) | Streak rizik, niska aktivnost | "Streak ti gori za 1h" |
| `info` (sky blue) | Roditeljski izveštaji, neutralne info | "Marko je ove nedelje vežbao 23 min" |
| `base-100` | Glavna pozadina (papirno svetla) | Cards, sve stranice |
| `base-200` | Zebra tabele, suptilne sekcije | Liga rows, list separators |
| `base-300` | Bordere, hover state | Card border, divider |
| `base-content/70` | Sekundarni tekst, muted | "Pre 5 minuta" |

### 2.4. Dark mode

V1: **NEMA dark mode**. Razlog: troši dizajn vreme, deca uglavnom rade danju. Razmotriti u v2.

V2 implementacija (kad bude): drugi DaisyUI theme `petica-dark` sa `data-theme` switcher.

---

## 3. Tipografija

### 3.1. Font family

**Primary**: **Inter** (latinica + ćirilica)
- 9 weight-ova
- Open source, odlična čitljivost na svim ekranima
- Lokalno hostovan u `public/fonts/`

**Display**: **Inter Bold** ili **Cabinet Grotesk** (za heading-e i naslove)

**Mono**: **JetBrains Mono** (za kod, tehničke brojeve)

### 3.2. Type scale (Tailwind defaults)

```
text-xs    12px / 16px    Microcopy, footnotes
text-sm    14px / 20px    Body small
text-base  16px / 24px    Body default
text-lg    18px / 28px    Lead
text-xl    20px / 28px    Subheading
text-2xl   24px / 32px    H3
text-3xl   30px / 36px    H2
text-4xl   36px / 40px    H1 mobile
text-5xl   48px / 1       H1 desktop / hero
```

### 3.3. Big numbers (streak, XP)

Custom klasa za velike brojeve u UI:
```tsx
<span className="text-6xl font-bold text-secondary">14</span>
<span className="text-base text-base-content/70">dana zaredom</span>
```

---

## 4. Spacing

Tailwind utility skala (`p-4`, `gap-3`, `mt-6`). **Ne proizvoljne vrednosti** (`mt-[13px]`).

---

## 5. Border radius

DaisyUI tokeni:
- `rounded-btn` (0.5rem) — dugmad
- `rounded-box` (1rem) — kartice, modali
- `rounded-full` — avatari, badge-ovi pill stila

---

## 6. Komponente — DaisyUI patterns

Iz playLiga konvencije, primenjeno na 5ica:

### 6.1. Dugmad

```tsx
<button className="btn btn-primary">Igraj</button>
<button className="btn btn-secondary">Pohvali se</button>
<button className="btn btn-outline btn-sm">Otkazati</button>
<button className="btn btn-ghost">Možda kasnije</button>
<button className="btn btn-error btn-sm">Obriši</button>
```

### 6.2. Kartica (kviz pitanja)

```tsx
<div className="card bg-base-100 shadow-sm border border-base-200">
  <div className="card-body">
    <h2 className="card-title">Površina kvadrata sa stranicom 5cm je:</h2>
    <div className="space-y-2 mt-4">
      <button className="btn btn-block">20 cm²</button>
      <button className="btn btn-block">25 cm²</button>
      <button className="btn btn-block">30 cm²</button>
    </div>
    <button className="btn btn-ghost btn-sm mt-2">← Dalje (preskoči)</button>
  </div>
</div>
```

### 6.3. Stats (roditeljski dashboard)

```tsx
<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
  <div className="stat">
    <div className="stat-title">Streak</div>
    <div className="stat-value text-accent">🔥 14</div>
    <div className="stat-desc">dana zaredom</div>
  </div>
  <div className="stat">
    <div className="stat-title">Spremnost</div>
    <div className="stat-value text-primary">67%</div>
    <div className="stat-desc">za malu maturu</div>
  </div>
  <div className="stat">
    <div className="stat-title">5ice ovog meseca</div>
    <div className="stat-value text-secondary">28</div>
    <div className="stat-desc">+5 od prošle nedelje</div>
  </div>
</div>
```

### 6.4. Badges

```tsx
<span className="badge badge-primary">Matematika</span>
<span className="badge badge-success">Tačno</span>
<span className="badge badge-error">Pogrešno</span>
<span className="badge badge-secondary">5ica!</span>
<span className="badge badge-accent">+12 XP</span>
<span className="badge badge-ghost">8. razred</span>
```

### 6.5. Alerts

```tsx
<div className="alert alert-success">
  <span>Bravo! +12 XP</span>
</div>

<div className="alert alert-info">
  <span>Marko je danas vežbao 12 min ✓</span>
</div>

<div className="alert alert-warning">
  <span>⏰ Streak ti gori za 1h</span>
</div>
```

### 6.6. Forme

```tsx
<label className="form-control w-full">
  <div className="label">
    <span className="label-text">Email roditelja</span>
  </div>
  <input
    type="email"
    className="input input-bordered w-full"
    placeholder="vas@email.rs"
  />
  <div className="label">
    <span className="label-text-alt text-error">Email nije validan</span>
  </div>
</label>
```

### 6.7. Tabela (liga, razred leaderboard)

```tsx
<div className="overflow-x-auto">
  <table className="table table-zebra">
    <thead>
      <tr>
        <th>#</th>
        <th>Drug</th>
        <th>XP</th>
        <th>Streak</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>MK7B3X</td>
        <td className="font-bold text-accent">1240</td>
        <td>🔥 14</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 6.8. Navbar

```tsx
<div className="navbar bg-base-100 border-b border-base-200 px-4">
  <div className="navbar-start">
    <span className="text-2xl font-bold">
      <span className="text-secondary">5</span>
      <span className="text-base-content">ica</span>
    </span>
  </div>
  <div className="navbar-end gap-2">
    <button className="btn btn-ghost btn-sm">Profil</button>
    <button className="btn btn-primary btn-sm">Igraj</button>
  </div>
</div>
```

### 6.9. Bottom navigation (dete app)

```tsx
<div className="btm-nav bg-base-100 border-t border-base-200">
  <button className="active text-primary">
    <HomeIcon className="w-5 h-5" />
    <span className="btm-nav-label">Home</span>
  </button>
  <button>
    <TrophyIcon className="w-5 h-5" />
    <span className="btm-nav-label">Liga</span>
  </button>
  <button>
    <UsersIcon className="w-5 h-5" />
    <span className="btm-nav-label">Drugovi</span>
  </button>
  <button>
    <UserIcon className="w-5 h-5" />
    <span className="btm-nav-label">Profil</span>
  </button>
</div>
```

### 6.10. Modal (level up, badge unlock)

```tsx
<dialog className="modal modal-open">
  <div className="modal-box text-center">
    <h2 className="text-3xl font-bold text-secondary">Level UP!</h2>
    <p className="text-6xl my-6">🎉</p>
    <p className="text-xl">Stigao si na Level 10</p>
    <p className="text-base-content/70 mt-2">Otključao si novi avatar</p>
    <div className="modal-action">
      <button className="btn btn-primary">Nastavi</button>
    </div>
  </div>
</dialog>
```

---

## 7. Component decomposition pravila

**Glavni princip**: što više komponente raščlanjene, što manje abstracted. Svaka radi jednu stvar.

### 7.1. Šest pravila

1. **Single Responsibility**: 1 komponenta = 1 odgovornost. Ako radi više stvari, razbij.
2. **Max 100 redova po fajlu**. Prelazi → razbij dalje.
3. **Extract before abstract**: prvo razbij u istom fajlu (sub-komponente unutar fajla), tek pri 3+ jednakim instancama izdvoji u zaseban fajl.
4. **Generic-first naming**:
   - `components/ui/` → Button, Card, Input (reusable, generic)
   - `components/[domain]/` → QuestionCard, DuelScoreboard (specifičan)
5. **Props minimum**: 10+ props = signal za split.
6. **Server-default**, Client samo za interaktivnost (`'use client'`). Next 16 + React 19 čine staru "container/presentational" podelu zastarelom.

### 7.2. Folder struktura

```
components/
├── ui/                       # Generic, reusable
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Skeleton.tsx
│   ├── Avatar.tsx
│   ├── EmptyState.tsx
│   ├── PageHeader.tsx
│   ├── ConfirmDialog.tsx
│   └── index.ts              # barrel export
├── quiz/
│   ├── QuestionCard.tsx
│   ├── AnswerOption.tsx
│   ├── QuizProgress.tsx
│   ├── QuizTimer.tsx
│   ├── SkipButton.tsx
│   ├── ResultScreen.tsx
│   ├── XpDisplay.tsx
│   └── index.ts
├── duel/
│   ├── DuelRoom.tsx
│   ├── DuelScoreboard.tsx
│   ├── DuelInvitation.tsx
│   ├── DuelHistoryItem.tsx
│   └── index.ts
├── streak/
│   ├── StreakDisplay.tsx
│   ├── StreakFlame.tsx
│   ├── StreakFreezeIndicator.tsx
│   └── index.ts
├── league/
│   ├── LeagueLeaderboard.tsx
│   ├── LeagueRow.tsx
│   ├── LeaguePromotionDivider.tsx
│   └── index.ts
├── badge/
│   ├── BadgeIcon.tsx
│   ├── BadgeShowcase.tsx
│   ├── BadgeUnlockModal.tsx
│   └── index.ts
├── parent/
│   ├── ChildSwitcher.tsx
│   ├── WeeklyReportCard.tsx
│   ├── SprintReadinessGauge.tsx
│   ├── DuelInviteForm.tsx
│   └── index.ts
├── sprint/
│   ├── SprintBanner.tsx
│   ├── MockTestCard.tsx
│   ├── ReadinessProgress.tsx
│   ├── DailyPlan.tsx
│   └── index.ts
└── layout/
    ├── Header.tsx
    ├── BottomNav.tsx
    ├── ParentSidebar.tsx
    └── index.ts
```

### 7.3. Primer kviz ekrana — pre i posle decomposition-a

**❌ Loše** (`QuizScreen.tsx`, 200 redova, sve unutra):
```tsx
export default function QuizScreen() {
  // Header sa tajmerom i progressom
  // Pitanje
  // Dugmad sa odgovorima
  // Skip dugme
  // Animacija pri tačno/pogrešno
  // Modal sa AI objašnjenjem
  // Toast sa XP-om
  // ... 200 redova
}
```

**✅ Dobro** (`QuizScreen.tsx`, 30 redova):
```tsx
import { QuizHeader } from '@/components/quiz/QuizHeader'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { ExplanationModal } from '@/components/quiz/ExplanationModal'

export default function QuizScreen() {
  const { state, actions } = useQuizSession()

  return (
    <main className="min-h-screen flex flex-col">
      <QuizHeader
        progress={state.progress}
        timer={state.timer}
        onClose={actions.confirmExit}
      />
      <QuestionCard
        question={state.currentQuestion}
        onAnswer={actions.answer}
        onSkip={actions.skip}
      />
      {state.showExplanation && (
        <ExplanationModal
          questionId={state.currentQuestion.id}
          onContinue={actions.next}
        />
      )}
    </main>
  )
}
```

### 7.4. Šta NE pravimo

- **Bez "container vs presentational" odvojenih fajlova** (zastarelo sa Server Components)
- **Bez HOC-ova** (`withAuth`, `withTheme`) — koriste se hook-ovi
- **Bez render-prop pattern-a** osim ako je stvarno potreban (retko)
- **Bez "smart" + "dumb" raspodele** — koristi `'use client'` i Server Components

---

## 8. Avatari

V1: **30 unaprijed kreiranih SVG avatara**
- 12 default dostupno svima
- 18 otključavaš XP-om / bedževima
- Različite boje, frizure, izrazi
- Polno-neutralni gde je moguće
- Bez foto upload-a (privatnost dece)

Lokacija: `public/avatars/avatar-01.svg`, `avatar-02.svg`, itd.

---

## 9. Animacije

Library: **framer-motion** (već koristiš u oba projekta).

### 9.1. Pravila

- Brzo i suptilno: 150-300ms za UI tranzicije
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Reduced motion: poštuj `prefers-reduced-motion`

### 9.2. Specifične animacije

**Tačan odgovor**:
- Dugme zelenkasto pulsiranje (200ms)
- Check ikon scale 0 → 1 (200ms)
- +XP brojač animira gore (400ms)
- Konfeti partikli (500ms, samo na 5/5)

**Pogrešan odgovor**:
- Dugme **kratak** crveni shake (X-axis, 200ms, 3x)
- X ikon scale 0 → 1
- "Skoro!" microcopy fade in
- Tačan odgovor highlight green
- *NE* preteran, *NE* shame-driven

**Streak unlock**:
- Vatra ikona scale 0 → 1.2 → 1 (500ms bounce)
- Broj brojač 0 → N (1s)
- Glow effect na celoj kartici

**Level up** (full-screen modal):
- Modal slide up
- Konfeti
- Crimson "5" pulsira (secondary boja)
- Novi level broj rotira u

**Badge unlock**:
- Zlatna (accent) ramica scale 0 → 1.1 → 1
- Vibration 10ms (na podržanim uređajima)

---

## 10. Ikone

**lucide-react** (open source, konzistentan stil)

Veličine:
- 16px — inline u tekstu
- 20px — input adornments
- 24px — bottom nav, top bar
- 32px — featured/hero

Pravilo: ne mešaj stil ikona. Sve iz lucide-react.

---

## 11. Microcopy biblioteka

### 11.1. Pozitivne reakcije

"Bravo!", "Tako je!", "Odlično!", "Super!", "Kao iz topa!", "Pametno!", "Tačno!", "5ica!"

### 11.2. Greške (empatska)

"Skoro!", "Možeš ti to!", "Pokušaj još jednom!", "Hajde da vidimo zašto..."

### 11.3. Streak

- "Streak je živ! 🔥"
- "{N} dana zaredom — neverovatno!"
- "Ostao ti je samo 1 sat za današnji streak"
- "Streak freeze iskorišćen — tvoj rad je sačuvan"

### 11.4. Konverzija u Sprint (subtilno)

- "Tvoja spremnost: 47%"
- "Sa pravim planom, možeš dostići 80%+"
- "Sprint paket počinje 1. mart"

### 11.5. Konzistentnost

- "Igraj" ne "Start"
- "Kviz" ne "Test"
- "Pitanje" ne "Zadatak"
- "Tačno / Pogrešno" ne "Correct / Wrong"
- "5ica" ne "Petica" (brand)
- "Mejl" za decu, "Email" za roditelje

---

## 12. Pisma — ćirilica + latinica

V1: **default latinica**. Korisnik bira u Settings.

Sva pitanja imaju oba u bazi. API vraća oba. Klijent prikazuje prema `user.language`.

Marketing site: latinica primarno (šira čitljivost). TOS i Privacy: obe verzije dostupne.

---

## 13. Responsive breakpoints

```
sm: 640px       Velike telefone
md: 768px       Tablet portrait
lg: 1024px      Tablet landscape, manji laptop
xl: 1280px      Desktop
2xl: 1536px     Big desktop
```

**Mobile-first**: pišemo CSS za mobile, prepisujemo za veće.

- **Detsko app primarno mobile**, mora raditi na tablet-u.
- **Roditeljsko primarno desktop**, mora raditi na mobile-u.

---

## 14. Pristupačnost (a11y)

### 14.1. Obavezni nivo (WCAG 2.1 AA)

- Sva dugmad imaju `aria-label`
- Sve slike imaju `alt`
- Color contrast 4.5:1 minimum
- Tab navigation funkcioniše svuda
- Screen reader testirano (VoiceOver iOS)
- Focus indicators vidljivi

### 14.2. Specifično za decu

- **Velika dugmad** (min 44×44px touch target)
- Single-tap (nema double-tap)
- Bez kompleksnih gesturova
- Tekst min 16px

---

## 15. Brand asseti — kreiranje

### 15.1. Logo

V1: tekstualni logo u Inter Bold (5 u secondary, ica u neutral) + opcioni "olovka" akcent
V2 (posle 1.000 plaćenih): zaposli profesionalca da napravi finalni logo (~30-50k RSD)

### 15.2. Ikone za PWA

8 veličina: 72, 96, 128, 144, 152, 192, 384, 512 px
Maskable verzija (Android adaptive): full-bleed sa safe zone u centru.

### 15.3. Social media images

- Open Graph: 1200×630
- Instagram post: 1080×1080
- Instagram story: 1080×1920

### 15.4. Favicon

- favicon.ico (32×32, 16×16)
- apple-touch-icon (180×180)
- favicon.svg (modern browsers)

---

## 16. Implementacioni red

### 16.1. Faza 1 (MVP)

- Tailwind 4 + DaisyUI 5 setup u `globals.css`
- `petica` theme plugin definisan
- Inter font lokalno
- 12 default avatara (može AI-generated u nuždi)
- Logo placeholder (tekstualni)
- `components/ui/` osnovne komponente (Button, Card, Input, Modal)

### 16.2. Faza 2 (Beta)

- Custom komponente za game (Streak, XP, Question card)
- framer-motion animacije
- Toast sistem (sonner)
- Skeleton komponente

### 16.3. Faza 3 (Public)

- Marketing strana sa profesionalnim hero ilustracijama
- Finalni logo
- Brand voice document (microcopy katalog finalan)
- Favicon set

### 16.4. Faza 4 (Sprint)

- Sprint-specifične komponente (Mock test UI, Readiness gauge)
- Premium feel (gradijenti, slight gold accents)
- Sertifikat PDF template

---

## 17. Otvorena pitanja

- [ ] Logo: ti ili freelance dizajner? **Preporuka**: ti za MVP (Inter tekstualni), freelance posle 1.000 plaćenih.
- [ ] Da li imati maskotu? **Preporuka**: ne u v1, dodaj u v2 ako brand to potreba.
- [ ] Dark mode? **Preporuka**: ne u v1, razmisli u v2.
