# 5ica — Pre-launch landing

Web sajt sa waitlist-om za **5ica** edu app. Skuplja email-ove roditelja koji žele da budu obavešteni o lansiranju aplikacije.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind 4** + **DaisyUI 5** (custom "petica" tema)
- **Web3Forms** za email capture (free, do 250 prijava/mes)
- **react-hook-form** + **zod** za validaciju
- **framer-motion** + **lucide-react** + **sonner**

## Stranice

- `/` — Home (Hero, Benefits, How It Works, Brand Story, FAQ, Final CTA)
- `/za-roditelje` — Roditelji-fokus
- `/za-decu` — Deca-fokus
- `/sprint` — Mala Matura Sprint paket info
- `/privatnost` — Politika privatnosti
- `/pravila` — Pravila korišćenja

## Setup (prvi put)

### 1. Instalacija

```bash
cd C:\Users\Aleksa\Documents\5ica
pnpm install
```

(Ako nemaš `pnpm`: `npm i -g pnpm`)

### 2. Web3Forms ključ

1. Idi na [web3forms.com](https://web3forms.com)
2. Unesi email gde hoćeš da primaš signup-ove (npr. `info@5ica.rs` ili tvoj lični email)
3. Klikni "Create Access Key" — dobiješ uuid string
4. Kopiraj `.env.example` u `.env.local`:

```bash
cp .env.example .env.local
```

5. Otvori `.env.local` i nalepi key:

```
NEXT_PUBLIC_WEB3FORMS_KEY=tvoj-uuid-ovde
```

### 3. Pokreni dev server

```bash
pnpm dev
```

Otvori [http://localhost:3000](http://localhost:3000).

## Šta dalje

Ovaj sajt će:

- **Faza 1** (sada): prikupljati email-ove dok gradimo MVP. Email-ovi stižu u tvoj inbox preko Web3Forms.
- **Faza 2**: kad budemo imali MongoDB + Resend, prebacujemo email capture na backend (sa potvrdom email-a).
- **Faza 3**: kad MVP bude live, šaljemo "vi ste prvi" email celoj listi.

## Struktura

```
5ica/
├── app/
│   ├── (marketing)/        # Marketing route group
│   │   ├── layout.tsx      # NavBar + Footer wrapper
│   │   ├── page.tsx        # /
│   │   ├── za-roditelje/page.tsx
│   │   ├── za-decu/page.tsx
│   │   ├── sprint/page.tsx
│   │   ├── privatnost/page.tsx
│   │   └── pravila/page.tsx
│   ├── globals.css         # Tailwind + DaisyUI petica theme
│   └── layout.tsx          # Root + Inter font + Toaster
├── components/
│   ├── ui/
│   │   └── Logo.tsx
│   ├── layout/
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   └── landing/
│       ├── Hero.tsx
│       ├── WaitlistForm.tsx
│       ├── Benefits.tsx
│       ├── HowItWorks.tsx
│       ├── BrandStory.tsx
│       ├── FAQ.tsx
│       ├── FinalCTA.tsx
│       └── SuccessModal.tsx
├── lib/
│   └── cn.ts               # clsx + tailwind-merge
└── public/                 # static assets (favicon, OG images)
```

## Deployment

Kad budeš spreman:

1. Push na GitHub
2. Connect na Vercel
3. Postavi `NEXT_PUBLIC_WEB3FORMS_KEY` u Vercel env vars
4. (Kad kupiš domen) `5ica.rs` → Vercel CNAME

## Komande

```bash
pnpm dev          # Dev server na :3000
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm type-check   # TypeScript check
```
