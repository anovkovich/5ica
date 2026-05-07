---
name: 5ica design system summary
description: Brand boje (DaisyUI tema), tipografija, komponente, decomposition pravila
type: project
---

## Brand boje — paleta "Dnevnička petica"

**Inspiracija**: u srpskim dnevnicima, učitelji pišu petice **crvenom olovkom**. Crvena = uspeh, ponos. Brand 5ica koristi to kao kulturalni okidač — niko od konkurenata to ne radi.

**Strategija**: royal blue za UI mir, crimson za "5" logo i posebne momente, gold za XP/streak/achievement.

```css
/* DaisyUI v5 theme */
@plugin "daisyui/theme" {
  name: "petica";
  default: true;
  color-scheme: light;

  /* PRIMARY: Royal blue — knowledge, autoritet, calm UI */
  --color-primary: oklch(52% 0.20 258);
  --color-primary-content: oklch(100% 0 0);

  /* SECONDARY: Crimson — "5ica red", logo, posebni momenti */
  --color-secondary: oklch(58% 0.21 25);
  --color-secondary-content: oklch(100% 0 0);

  /* ACCENT: Warm gold — XP, streak, achievement */
  --color-accent: oklch(80% 0.15 80);
  --color-accent-content: oklch(22% 0.02 250);

  /* NEUTRAL: Charcoal */
  --color-neutral: oklch(22% 0.02 250);
  --color-neutral-content: oklch(98% 0 0);

  /* BASE: Topla off-white sa blagim plavičastim undertone-om */
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

  --radius-box: 1rem;
  --radius-btn: 0.5rem;
  --btn-text-case: none;
}
```

## Mobile-only viewport za app surfaces

**Kritičnо pravilo** (odlučeno 2026-05-07): sve **autentifikovane app stranice** (`/app/*`, `/roditelj/*`, `/admin/*`) **i auth stranice** (`/prijavi-se`, `/verifikacija/*`) koriste **mobile-only viewport** od `max-w-md` (448px), centriran na desktopu.

**Razlog**: app je inherentno mobilna iskustvo — deca koriste telefone, roditelji glance-uju notifikacije. PWA install pattern je mobilni. Pravljenje desktop layout-a je dupli rad koji niko neće koristiti.

**Šablon**: koristi `<AppShell>` komponentu iz `components/layout/AppShell.tsx`:

```tsx
import { AppShell } from "@/components/layout/AppShell";

export default function MojaAppStrana() {
  return (
    <AppShell>
      <header>...</header>
      <main className="flex-1">...</main>
    </AppShell>
  );
}
```

**Šta AppShell radi**:
- **Mobile (<768px)**: card je full-screen, edge-to-edge, kao native PWA
- **Desktop (≥768px)**: card je **vertikalno centriran** (max-w-md, ~448px), sa rounded-3xl + shadow-2xl + border. Pozadina ima **suptilan brand gradient** (royal blue + crimson + gold radial overlay-i).
- Outer flex container drži card centriran i ako je content kraći od viewport-a.

**Izuzetak**: marketing stranice (`/`, `/za-roditelje`, `/za-decu`, `/sprint`, `/privatnost`, `/pravila`) ostaju **full-width responsive** — to je web za posetioce, ne app.

## Pravila korišćenja boja

| Boja | Kada | Primer |
|---|---|---|
| `primary` | Glavni CTA, navbar brand, glavni link | "Igraj" dugme, "Kupi Sprint" |
| `secondary` | Logo "5", proslava, posebni momenti | Streak milestone, level up, badge unlock |
| `accent` | XP brojevi, streak vatra, sertifikati | "+12 XP", streak counter |
| `success` | Tačan odgovor, pozitivan indikator | "Bravo!" ✓ |
| `error` | Pogrešan odgovor, validation | "X" animacija (kratak shake, ne agresivan) |
| `warning` | Streak rizik, niska aktivnost | "Streak ti gori za 1h" |
| `info` | Roditeljski izveštaji, neutralne info | "Marko je ove nedelje vežbao 23 min" |
| `base-100` | Glavna pozadina (papirno svetla) | Cards, sve pages |
| `base-200` | Zebra tabele, suptilne sekcije | Liga rows |
| `base-300` | Bordere, hover state | Card border |

## Logo

**Vizuelno**: velika "5" u crimson (secondary) + sitnije "ica" u charcoal (neutral).

```
[5]ica
```

- "5" = Inter Bold ili Cabinet Grotesk Bold, ~64-96px na hero
- "ica" = Inter Medium, ~32-48px
- Optional: blagim "olovka touch" stilizacija — crimson "5" sa blagim teksturalnim crtama, da liči na rukom napisanu peticu

## Tipografija

- **Primary font**: Inter (latinica + ćirilica, 9 weight-ova)
- **Display**: Inter Bold ili Cabinet Grotesk
- **Mono**: JetBrains Mono (kod, brojevi)

```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

## Spacing (Tailwind 4 standard)

`p-4`, `gap-3`, `mt-6` — Tailwind utility, ne proizvoljne vrednosti.

## Border radius (DaisyUI)

`rounded-box` (1rem) za kartice, `rounded-btn` (0.5rem) za dugmad, `rounded-full` za avatare.

## Komponente — DaisyUI patterns (iz playLiga konvencije)

```tsx
// Dugmad
<button className="btn btn-primary">Igraj</button>
<button className="btn btn-outline btn-sm">Otkazati</button>
<button className="btn btn-secondary">Pohvali se</button>

// Kartica
<div className="card bg-base-100 shadow-sm border border-base-200">
  <div className="card-body">
    <h2 className="card-title">Pitanje</h2>
    <p className="text-base-content/70">Sadržaj</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary btn-sm">Odgovori</button>
    </div>
  </div>
</div>

// Stats (npr. roditeljski dashboard)
<div className="stats stats-vertical lg:stats-horizontal shadow w-full">
  <div className="stat">
    <div className="stat-title">Streak</div>
    <div className="stat-value text-accent">14</div>
    <div className="stat-desc">dana zaredom</div>
  </div>
  <div className="stat">
    <div className="stat-title">Spremnost</div>
    <div className="stat-value text-primary">67%</div>
    <div className="stat-desc">za malu maturu</div>
  </div>
</div>

// Badges (predmet, status)
<span className="badge badge-primary">Matematika</span>
<span className="badge badge-success">Tačno</span>
<span className="badge badge-error">Pogrešno</span>
<span className="badge badge-secondary">5ica!</span>

// Alerts
<div className="alert alert-success">
  <span>Bravo! +12 XP</span>
</div>
<div className="alert alert-error">
  <span>Skoro! Pokušaj ponovo.</span>
</div>

// Forme
<label className="form-control w-full">
  <div className="label">
    <span className="label-text">Email roditelja</span>
  </div>
  <input type="email" className="input input-bordered w-full" placeholder="vas@email.rs" />
</label>

// Tabela (liga, razred leaderboard)
<div className="overflow-x-auto">
  <table className="table table-zebra">
    <thead>
      <tr><th>#</th><th>Ime</th><th>XP</th><th>Streak</th></tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>MK</td><td>1240</td><td>14 🔥</td></tr>
    </tbody>
  </table>
</div>
```

## Component decomposition pravila

1. **Single Responsibility**: 1 komponenta = 1 odgovornost
2. **Max 100 redova po fajlu**, više = razbij
3. **Extract before abstract**: razbij u istom fajlu pre nego što izvodiš u zaseban
4. **Generic-first naming**:
   - `components/ui/` → Button, Card, Input (reusable)
   - `components/[domain]/` → QuestionCard, DuelScoreboard (specifičan)
5. **Props minimum**: 10+ = signal za split
6. **Server-default**, Client samo za interaktivnost (`'use client'`)

## Animacije (framer-motion)

- **Brzo i suptilno**: 150-300ms za UI tranzicije
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard)
- **Reduced motion**: poštuj `prefers-reduced-motion`

Specifične:
- **Tačan odgovor**: scale-up zelene check ikone + +XP brojač animira gore
- **Pogrešan**: shake + crveni X (kratak, ne agresivan)
- **Streak unlock**: vatra ikon scale 0 → 1.2 → 1, glow effect
- **Level up**: full-screen modal slide up, konfeti, secondary (crimson) "5" pulse

## Ikone

**lucide-react** (open source, konzistentan stil)

Veličine: 16px (inline), 20px (input), 24px (nav), 32px (hero)

## Microcopy ton

- Za decu: pozitivni okvir ("Bravo!", "Skoro!", "Hajde da..."), bez korporativnog tona, "ti" ne "vi"
- Za roditelje: profesionalan + topla, konkretni brojevi, "vi" (formalnije)
- Konzistentno: "Igraj" ne "Start", "Kviz" ne "Test", "Pitanje" ne "Zadatak"

## Pristupačnost

- WCAG 2.1 AA: contrast 4.5:1
- Touch target min 44×44px (kritičnо za decu)
- ARIA labels na ikona-only dugmadima
- Tab navigation funkcioniše svuda
- VoiceOver iOS testiran za kritične flow-ove
