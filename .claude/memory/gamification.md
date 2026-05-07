---
name: 5ica gamification mechanics
description: XP, leveli, streak, lige, drugovi, parent-child duel — sve mehanike i balans
type: project
---

## XP ekonomija

| Akcija | XP |
|---|---|
| Tačno 3-odgovorno | +3 |
| Pogrešno 3-odgovorno | -2 |
| Skip (Dalje) | 0 |
| Tačno 4-odgovorno | +2 |
| Pogrešno 4-odgovorno | 0 |
| Brzi tačan (<10s) | +1 bonus |
| Spori tačan (>60s) | -1 |

**Streak multiplier**: ×1.5 nakon 7 dana, ×1.75 nakon 30 dana
**Maraton bonus**: ×10 (1× dnevno)
**Mock test bonus**: ×2

**Anti-exploit**: maks 500 XP/dan, maks 3 maratona/nedeljno, isti pitanja unutar 24h ne donose XP.

## Leveli

Formula: `level_xp(L) = 100 * L^1.5`
- Level 5: 4.305 cumulative XP
- Level 10: 19.624 XP (cca 30 dana redovne vežbe)
- Level 50: 1.180.000 XP

**Nikad pay-to-win**. Levelovanje samo otključava avatare, ne funkcionalne prednosti.

## Sesije (3 nivoa)

- **Brzi trening**: 5 pitanja, 3 min — drži streak
- **Standardna**: 15 pitanja, 10 min
- **Maraton**: 50 pitanja, 30 min, ×10 XP

**Adaptivna težina**: 60% iz slabih oblasti, 40% iz jakih (drži samopouzdanje + popravlja).

## Streak

Definicija: 1 dan = bar 1 kompletna sesija u danu (00:00-23:59 lokalno).

**Streak Freeze**: 1 freeze na svakih 7 dana, maks 2 u inventaru. Auto-koristi se ako propusti dan.

**Push notifikacija ~18h**: "Marko, ostao ti je 1 sat za streak danas".

**Pravilo**: ne plašimo decu kad prekine. Empatska poruka: "Streak se završio. Hajde da počnemo novi! 🔥".

## Lige (Bronza → Srebro → Zlato → Dijamant)

- Nedeljne grupe od 30 ljudi (random matchmaking u istoj ligi)
- Top 5 promovisani, dno 5 padaju
- Reset svakog ponedeljka 00:00

## Razred + Škola leaderboard

- Auto-grupa po `classCode` ("8-2") + školu + razred
- Roditelj može da isključi
- Nadimci (privatnost), ne pravo ime

## Drugovi

- Friend code 6-char (npr. "MK7B3X")
- Maks 50 drugova (anti-bot)
- Direktan duel "Izazovi"
- **NEMA chat** — samo brojevi i bedževi (anti-bullying)

## Parent-vs-child duel (KRITIČNA mehanika)

**Sync mode**: oboje u app-u, real-time pooling 1s
**Async mode**: jedan reši, drugi 24h da pokuša prebaciti
**Familija mode**: roditelj poziva baku/dedu kao gost (24h magic link)

5 pitanja po duel-u, oba igrača iste pitanja (fair).

**Skor**: `correct * 10 + speedBonus`. Brzi odgovor +5.

**Stats narativ**: "Sa mamom: 7-3 (Marko vodi)".

**Posebne nagrade**:
- Detete pobedi: +30 XP, "Pobedio mamu" bedž (5/10/25 puta = bronza/srebro/zlato)
- Roditelj pobedi: "Sledeći put bolje!" (ne-shame)

## Bedževi

~100 bedževa do v1:
- Streak (7, 30, 100, 365)
- Predmet master (svi pitanja iz oblasti tačna)
- Social, Duel, Mock test
- Milestone (Level 10, 1000 pitanja, Sezona 1)
- Easter eggs (5+ skrivenih)

Rarity: Common (60%) → Rare (25%) → Epic (10%) → Legendary (5%)

## Avatari + kolekcionarske kartice

- 12 default avatara, 18 otključavaš XP-om, 5 specijalnih bedžem
- ~80 kolekcionarskih kartica preko predmeta (Pitagora, Karađorđe, Andrić, itd.)
- Sve kolekcionarsko = etika, NIŠTA funkcionalno

## Push notifikacijski sistem

Maks 1/dan po kategoriji, maks 2/dan ukupno. Tihi sat 21:00-08:00.
Roditelj može da isključi za bilo koje dete.
