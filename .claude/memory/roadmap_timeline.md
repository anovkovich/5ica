---
name: 5ica roadmap timeline
description: Sedmica-po-sedmica plan od pre-development-a do prve sezone
type: project
---

## High-level fazni pregled

| Faza | Sedmice | Cilj | Quality gate |
|---|---|---|---|
| Faza 0 | Setup | Pravne + brand temelji | Domain, ugovor, social pokrenut |
| Faza 1 | MVP (Ned 1-8) | Funkcionalan kviz za matematiku 8 | 1 porodica koristi 7 dana |
| Faza 2 | Beta (Ned 9-16) | Svi predmeti, AI, duel, dashboard | 50 porodica, NPS >40 |
| Faza 3 | Public (Ned 17-24) | Marketing site, gamefikacija polished | 5.000 sign-ups, D7 >25% |
| Faza 4 | Sprint (Ned 25-32) | Sprint paket build | Beta 50 Sprint kupaca |
| Faza 5 | Sezona (Mar-Jun 2027) | Glavna prodaja | 400+ Sprint kupaca |

## Faza 0 — Pre-development

**Sedmica -2**:
- Razgovor sa prijateljem o ugovoru autorskih prava
- Konsultacija advokata
- Trademark check za "5ICA"
- Domain `5ica.rs` kupljen + DNS
- APR registracija paušalca

**Sedmica -1**:
- Ugovor potpisan i overen
- TOS i Privacy draft
- Instagram `@5ica` registrovan
- FB Page i Group otvoreni
- TikTok account
- Tech accounts: GitHub, Vercel, MongoDB Atlas, Resend, PostHog, Sentry

## Faza 1 — MVP (Ned 1-8, leto 2026)

- **Ned 1**: Next.js + Tailwind + Mongoose, Mongo schema, magic link auth, deploy
- **Ned 2**: Data import (8.428 pitanja), validacija, indeksi
- **Ned 3**: Quiz core (start, odgovor, XP), home + quiz + result UI
- **Ned 4**: Streak + freeze, push setup (VAPID), PWA service worker
- **Ned 5**: Roditeljski osnov (dashboard, weekly email, settings)
- **Ned 6**: Marketing site (homepage, kako-radi, cene, TOS, Privacy)
- **Ned 7**: Tests + bug fix sweep, edge states
- **Ned 8**: Internal beta (5 porodica), feedback, fixes

## Faza 2 — Beta (Ned 9-16, jesen 2026)

- **Ned 9**: All 14 predmeta + adaptive question selection
- **Ned 10**: AI explanations (bulk generate svih 8.428), modal posle pogreske
- **Ned 11**: Bedževi + leveli (~100 bedževa, level XP curve)
- **Ned 12**: Drugovi + razred leaderboard
- **Ned 13**: Duel mehanika (sync + async, parent-child)
- **Ned 14**: Lige (Bronza-Dijamant, weekly reset cron)
- **Ned 15**: Roditelj polish (multi-child, detailed dashboard, spremnost %)
- **Ned 16**: Beta launch (50 porodica), feedback session, bug tracking

**Quality gate Faza 2**: D7 >25%, NPS >40, P0/P1 popravljeni.

## Faza 3 — Public (Ned 17-24, novembar 2026)

- **Ned 17-18**: Performance optimization (Lighthouse 90+), mobile testing
- **Ned 19**: Marketing prep (30 Reels queued, blog posts, email sequence)
- **Ned 20**: **Public launch (1. novembar 2026)** — email blast, social, FB ads
- **Ned 21-22**: A/B test onboarding, email iteration, influencer outreach
- **Ned 23-24**: Quality gate verification

**Quality gate Faza 3**: 5.000 sign-ups, D7 >25%, parent dashboard usage >50%.

## Faza 4 — Sprint development (Ned 25-32, dec 2026 - feb 2027)

- **Ned 25-26**: Mock testovi (12 testova kreirana), mock test UI
- **Ned 27**: Sprint plan generator, inicijalni asesman, daily plan
- **Ned 28**: Sprint payment (NBS QR, admin panel, activation flow)
- **Ned 29**: Sprint AI (detailed explanations, daily AI coach)
- **Ned 30**: Roditelj Sprint dashboard
- **Ned 31**: 50 beta Sprint kupaca, payment + activation flow tested
- **Ned 32**: Sprint launch readiness, Y1 final checks

**Quality gate Faza 4**: 50 Sprint kupaca prošlo flow, payment + activation proces ready.

## Faza 5 — Sezona (mart-jun 2027) — GLAVNI PRIHOD

| Datum | Milestone |
|---|---|
| 1. mart | Sprint full price live (4.990), Early bird kraj |
| 15. mart | "60 dana do mature" check-in |
| 1. april | "30 dana" intenzivna kampanja |
| 15. maj | Final stretch |
| Sredina juna | Mala matura |
| Kraj jula | Refund flow kraj |

**Quality gate Y1 success**: 400-560 Sprint kupaca, neto 0 do +1M RSD.

## Y2 i Y3 (high-level)

- **Y2 (mala matura 2028)**: 1.500-2.500 Sprint kupaca, ~9-12M prihoda. Familija plan launch, online plaćanja.
- **Y3 (mala matura 2029)**: 5.000+ Sprint kupaca, ~26-30M prihoda. Regional ekspanzija (BiH, CG), Sprint za prijemne (srednja škola).
