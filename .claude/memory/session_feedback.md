---
name: Session feedback and lessons learned
description: Korisnička feedback iz strateških diskusija — šta je proradilo, šta je odbijeno
type: feedback
---

## Validovani pristupi (zadrži)

### Strateški: brutalno realna analiza
**Why**: Aleksa je tražio "surovo ali realno" za biznis ideju. Detaljna analiza tržišta sa odbacivanjem nekih putova (pretplata, B2B) bila je validovana — odluke su prihvaćene.
**How to apply**: kad pita za analizu opcija, daj sve loše strane otvoreno. Pošteno > polirano.

### Implementacioni: visoko-detaljni planski dokumenti
**Why**: Tražio "ultra detaljan plan kako napraviti strukturu" sa overom da troši "1-2M tokena". 22-dokument biblija je dobro primljena.
**How to apply**: kad zahteva dubinu, idi u dubinu. Ne sažimaj kad je dato dozvoljenje za detaljnost.

### Tehnički: spawn-uj Haiku subagent za bulk task-ove
**Why**: Aleksa je sam predložio da Haiku radi imenovanje 298 poglavlja umesto Opus-a (zbog tokena).
**How to apply**: za task-ove gde je domain knowledge kritičan (npr. srpski osnovnoškolski kurikulum), Haiku ne radi dovoljno dobro — koristi Opus. Za bulk repetativne task-ove sa jasnim instrukcijama, Haiku je OK.

## Odbačeni pristupi (NE forsiraj)

### Mesečna pretplata
**Razlog odbijanja**: "Srbija ne plaća app pretplate" — Aleksa je decisivno odbio.
**How to apply**: ne predlažu pretplatu kao dodatni revenue model. Sprint je jedini paid proizvod.

### B2B prodaja školama
**Razlog odbijanja**: "Ne planiram da idem po školama i prodajem.. ne treba nam to."
**How to apply**: ne predlaži B2B kanal. Ako traži ekspanziju, idi B2C novim segmentima (srednja škola u Y3).

### Pravne sekcije u memoriji
**Razlog odbijanja**: "ovo nam ne treba! - ovi pravni rizici i ne znam sta"
**How to apply**: pravne stvari su u `implementation-plan/17_LEGAL_COMPLIANCE.md` (nego u memoriji nisu potrebne kao zaseban memo). Aleksa želi memoriju za **strategijske i kreativne** stvari, ne za "rizike i pravna razmatranja".

## Validovani brand izbori

### "5ica" preko "Mala Matura"
**Why**: Aleksa je prvi primetio da "Mala Matura" pin-uje brand za jedan rok i jednu starost. Free verzija je celogodišnji proizvod za 1-8. razred.
**Decision**: brand = **5ica**, sub-brand = **5ica Sprint** (za matura paket).

### Domain strategija — niska cena
**Why**: `petica.rs` zauzet, `petica.app` premium pricing — Aleksa nije hteo da plati. `5ica.rs` slobodan.
**How to apply**: ne predlaži premium domene. Cost-conscious pristup.

## Ključne odluke iz konverzacije (chronological)

1. **Lokacija**: Srbija only u Y1, region u Y3
2. **Cilj**: mala matura sezona jun 2027
3. **Cenovni model**: Free + Sprint jednokratno (ne pretplata, ne B2B)
4. **Tech stack**: NextJS + Mongo + PWA (od nule)
5. **AI**: free tier-i sa keširanjem (Groq + Gemini Flash + Haiku za detailed)
6. **Skoring**: +3/-2/0 za 3-Q sa skip-om, +2/0 za 4-Q
7. **Ključna mehanika**: parent-child duel (sync + async + familija mode)
8. **Brand**: 5ica (cifra 5 + ica, izgovor petica)
9. **Domain**: `5ica.rs` slobodan, kupiti odmah sa `.app` i `.com` i `.co` ako su slobodni
10. **MVP fokus**: matematika 8. razred kao prvi predmet
