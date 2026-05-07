---
name: Strategic decisions for 5ica
description: Fiksirane biznis i proizvodne odluke iz strateškog rada — ne menjati bez eksplicitne diskusije
type: project
---

Sve odluke su iz konsultacije sa korisnikom (Aleksa) tokom strateškog rada 2026-05-06/07.

## Poslovni model

**JEDAN proizvod, JEDNA naplata**: Free verzija + Mala Matura Sprint (4.990 RSD jednokratno, 3.990 RSD early bird).

**Odbačeno explicitno**:
- Mesečna pretplata (Vežbam Pro 990/mes) — Aleksa je odlučio da Srbija ne plaća app pretplate
- B2B prodaja školama — sales-heavy, slow, ne želi to izvršenje

**Why**: Srbija plaća jednokratne pakete priprema (knjige, kursevi, časovi), ne app pretplate. Sprint odgovara mentalnoj kategoriji "knjiga", ne "Netflix". Sezonska koncentracija prihoda = jasniji biznis.

## Skoring sistem (gamification)

- 3-odgovorna pitanja sa "Dalje" (skip): **+3 / -2 / 0**
- 4-odgovorna pitanja bez skip-a: **+2 / 0**

Razlog: `+3 / -1` daje pozitivan EV za nasumično pogađanje (dete bi uvek pogađalo umesto skip-ovalo). Sa `-2`, skip postaje strategijski racionalan kad ne znaš.

## Roditelj-vs-dete duel (KRITIČNA mehanika)

Dodato na zahtev korisnika tokom strateške diskusije. Sinhroni i asinhroni mod. Familija mode (gostovanje baka/deda preko magic linka).

**Why**: roditelj koji *igra* je daleko vrednije nego roditelj koji samo gleda. Viralna mehanika (dete priča drugu, drug instalira da igra sa svojom mamom). Konverzioni driver (roditelj koji proba 5 pitanja iz biologije i ne zna 2 → razume zašto dete ima poteškoća → kupuje Sprint).

## Sprint paket sadržaj — "structure not content" strategija

**Strateška odluka 2026-05-07**: Free verzija ima sva 8.500+ pitanja. Sprint **ne gate-uje sadržaj** — dodaje strukturu i alate za pripremu ispita.

Sprint ekskluzivno (6 feature-a):
1. Personalizovan 90-dnevni plan (algorithm)
2. 12 mock testova u realnom formatu mature
3. Detaljan AI tutor (korak-po-korak vs basic free)
4. Dnevni AI coach (push 7am)
5. Predvidjena ocena na maturi
6. Sprint cohort + leaderboard (zatvorena grupa kupaca)

Plus: PDF sertifikat o završetku.

**Mantra**: *"Free je za vežbu. Sprint je za pripremu mature."*

**NEMA money-back garancije** (odlučeno 2026-05-07: pola-pola garancija deluje kao marketing trik, bolje da nemamo nego polovično).

**Sprint trust signal**: side-by-side comparison "Free vs Sprint" na sprint stranici jasno pokazuje da Sprint nije gating, već struktuiran put za ispit.

## Tech stack (fiksiran)

- Next.js 15 (App Router, Server Components)
- MongoDB + Mongoose
- Lucia Auth ili Auth.js (magic link, no passwords)
- Tailwind + shadcn/ui
- PWA preko serwist
- Resend (email) + React Email
- Multi-LLM: Groq primary, Gemini Flash backup, Claude Haiku za detailed Sprint
- PostHog + Sentry
- Vercel Pro hosting, Cloudflare CDN
- NBS IPS QR za plaćanje Y1 (manuelna potvrda); Monri Y2

## Šta NIKAD ne radimo

- Direktna komunikacija (chat, DM) između dece
- Pay-to-win mehanike
- Reklame deci u app-u
- GPS tracking dece
- Native iOS/Android pre 5.000 plaćenih
- Investitora pre Y2

## Ciljano tržište Y1

Samo Srbija. Region (BiH, CG) Y3+ ako Y1+Y2 stabilizuju.

## V1 fokus za MVP

Matematika 8. razred kao prvi predmet. Ostali predmeti dodaju se u Beta fazi (sed 9-16).
