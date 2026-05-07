---
name: 5ica critical metrics
description: Tri Y1 metrike koje su jedine bitne — sve drugo služi ovome
type: project
---

## Tri kritične metrike

Sve inženjerske, marketing, i strateške odluke u Y1 se proveravaju kroz prizmu ove tri metrike. **Ako bilo koja ne pogodi prag, ne lansiraj sledeću fazu.**

### 1. D7 retention u free fazi
**Cilj**: >25%
**Definicija**: korisnici koji su se vratili 7 dana posle signup-a / total signups

**Šta radimo ako padne**:
- <25%: STOP marketing budget, refaktoriši retenciju
- <20%: 4 nedelje fix-eva pre nego što se troši na marketing

### 2. % 8-gradera u korisničkoj bazi do februara 2027
**Cilj**: >15%
**Definicija**: 8th_grade_users / total_users

**Šta radimo ako padne**:
- Marketing target nije pogodjen, refaktoriši FB ads + content fokus
- Dupli marketing budget ka roditeljima 8. razreda

### 3. Free → Sprint konverzija u sezoni
**Cilj**: >5%
**Definicija**: Sprint kupci u sezoni / aktivni 8-graderi u bazi do februara

**Šta radimo ako padne**:
- Survey roditelje koji nisu kupili
- Adjust pricing ili paket sadržaj
- Refine marketing copy

## Tier 2 metrike (prate se nedeljno)

- **DAU / MAU stickiness** — proxy za naviku, cilj >15%
- **Streak distribucija** — koliko ljudi ima 7+, 30+, 100+ dana
- **Engagement po feature-u** (duel, friends, leaderboards, mock tests)
- **% roditelja koji su otvorili dashboard u 7 dana** — cilj 60%

## Tier 3 (tehnički)

- p95 TTI <3s na 3G
- Error rate <1 per 1000 sesija
- Uptime >99.5%
- API p95 <500ms

## Tier 4 (marketing)

- CAC <2.000 RSD po sign-up-u
- Email open rate >30%
- Conversion funnel pragovi (vidi 15_ANALYTICS_METRICS.md)

## North Star

**Free → Sprint konverzija u sezoni** je North Star. Sve ostalo se podređuje ovome.

## Y1 → Y3 cilj

- Y1: >5% konverzija
- Y2: >10%
- Y3: >15%
