# 25 — Decision Log

## Cilj

Živi dokument sa svakom važnom odlukom kroz život projekta. Format: kontekst, opcije, izabrana odluka, razlog, kada bi se promenilo.

**Pravilo**: Svaka odluka koja menja strategiju ili nereverzibilnu tehničku odluku **mora** biti ovde upisana.

---

## Format

```
## [YYYY-MM-DD] [N] — Naslov odluke

**Kontekst**: u kojoj situaciji
**Opcije razmatrane**:
- A: ...
- B: ...
**Odluka**: ...
**Razlog**: ...
**Kada se menja**: ako se desi ...
**Posledice**: koje delove projekta ovo menja
```

---

## Inicijalne odluke (uvedeno tokom strategijskog plana)

### 2026-05-06 [001] — Tržište: samo Srbija u Y1

**Kontekst**: Razmatrano da li lansirati za region (BiH, CG, makedoniju) odjednom.

**Opcije**:
- A: Samo Srbija u Y1
- B: Region od početka

**Odluka**: A — samo Srbija.

**Razlog**: Mala matura format je specifičan za Srbiju. Druge zemlje imaju različite ispite (Bosna ima posebni, Crna Gora isto). Različit market sizing, content mora biti adaptiran.

**Kada se menja**: Y3, kada Y1+Y2 stabilizuju Srbiju i imamo resurse.

---

### 2026-05-06 [002] — Cenovni model: jednokratni Sprint, NE pretplata

**Kontekst**: Razmatrano da li uvesti mesečnu pretplatu pored Sprint-a.

**Opcije**:
- A: Free + Sprint jednokratno (4.990 RSD)
- B: Free + Mesečna pretplata + Sprint
- C: Samo pretplata

**Odluka**: A — free + jednokratni Sprint.

**Razlog**: Srpsko tržište ne plaća app pretplate. Plaća jednokratne pakete priprema. Sprint odgovara mentalnoj kategoriji "knjiga / kurs", ne "Netflix".

**Kada se menja**: ako podaci Y2 pokažu da je 1.000+ porodica spremno da plaća pretplatu.

**Posledice**:
- Cash flow je sezonski
- Run-way pre prve sezone je 8-9 meseci
- Ne razvijamo subscription tooling

---

### 2026-05-06 [003] — B2B prodaja školama: NE u Y1

**Kontekst**: Razmatrano da li ići na škole sa B2B paketima.

**Opcije**:
- A: Samo B2C, bez B2B
- B: B2C primarni, B2B sekundarni
- C: B2B fokus

**Odluka**: A — samo B2C.

**Razlog**: B2B sales je sales-heavy, slow (cycle 6-12 meseci), raspoređuje fokus. Imamo dovoljno tržišta u B2C za Y1-Y2.

**Kada se menja**: Y3+ ako želimo dodatni revenue stream.

---

### 2026-05-06 [004] — Tech stack: Next.js + MongoDB + PWA

**Kontekst**: Razmatrane alternative.

**Opcije**:
- A: Next.js + MongoDB + PWA
- B: SvelteKit + Postgres + native app
- C: Remix + Postgres + native
- D: Supabase + Next + native

**Odluka**: A.

**Razlog**:
- MongoDB: data već u Mongo formatu iz import-a
- Next.js: najveći ekosistem, najbolji DX, server components
- PWA: bez app store frikcije, brži time-to-market
- Solo dev: boring tech > novel tech

**Kada se menja**: ako Vercel troškovi prelaze 200€/mes bez prihoda da to opravdaju → migrate na Hetzner. Native app posle 5.000 plaćenih.

---

### 2026-05-06 [005] — Plaćanja: NBS QR (manuelno) u Y1

**Kontekst**: Razmatrano kako primati uplate.

**Opcije**:
- A: NBS IPS QR (manuelno potvrđujem)
- B: Online card processor (Monri / NestPay)
- C: Hibrid

**Odluka**: A.

**Razlog**:
- Niska / nula provizija
- Setup complexity nizak
- Ne treba payment processor middleman za lansiranje
- Sprint je 4-5k RSD jednokratno, manuelno potvrđivanje skalabilno do nekoliko stotina mesečno

**Kada se menja**: Y2 — uvesti Monri kao opciju paralelno sa NBS QR-om.

---

### 2026-05-06 [006] — AI explanation provider: cache po pitanju, multi-provider

**Kontekst**: Koji LLM koristiti za AI objašnjenja.

**Opcije**:
- A: Samo Anthropic Claude Haiku (plaćen)
- B: Samo Groq (free tier)
- C: Multi-provider sa cache-om

**Odluka**: C.

**Razlog**:
- Cache po questionId zauvek = jednom plaćeno
- 8.428 pitanja × $0.001 ≈ $8 za sve pre-generation
- Multi-provider redundancy: Groq primarno, Gemini Flash backup, Haiku za detailed Sprint
- Per-user trošak je $0 (cache hit)

**Kada se menja**: ako quality drops sa free tier-ima → switch primary na Haiku za sve.

---

### 2026-05-06 [007] — Bez chat-a između dece

**Kontekst**: Razmatrano dodavanje chat / DM funkcije.

**Odluka**: NE, nikad u Y1-Y2.

**Razlog**:
- Bullying risk
- Pravni rizik (nadzor maloletnika)
- Operativna komplikacija (moderacija)

**Kada se menja**: nikad bez ozbiljne moderacije infrastructure-a (Y3+).

---

### 2026-05-06 [008] — Streak freeze sistem: 1 freeze na 7 dana

**Kontekst**: Kako ravnotežu motivacije i ne-frustracije.

**Opcije**:
- A: Bez freeze-a
- B: 1 freeze na 7 dana
- C: 2 freeze-a na 5 dana
- D: Unlimited

**Odluka**: B.

**Razlog**:
- A: brutalan, gubitak streak-a frustriraju
- B: balans (1 propušten dan ne ubija)
- C: previše permisivno, streak gubi vrednost
- D: nemoguće zadržati cilju

**Kada se menja**: ako podaci u beti pokažu da preteran broj korisnika gubi streak.

---

### 2026-05-06 [009] — Roditelj-vs-dete duel: KRITIČNA mehanika

**Kontekst**: Predloženo na zahtev korisnika nakon strategijskog razgovora.

**Odluka**: DA, prioritetno u Faza 2.

**Razlog**:
- Roditelj koji *igra* je daleko vrednije nego roditelj koji samo gleda
- Viralnost: dete priča drugu, drug instalira
- Familija mode (gostovanje): dodatna virala

**Posledice**:
- Faza 2 prioritet (sed 13)
- Special bedževi za pobedu nad roditeljem
- Async + sync mode oba potrebna

---

### 2026-05-07 [010] — Bez money-back garancije (REVIDOVANO)

**Kontekst**: Prvobitno odlučeno (2026-05-06) da bude 50% money-back garancija ako dete prati plan a dobije <50/100. Korisnik je 2026-05-07 revidovao odluku.

**Razlozi za uklanjanje**:
- Polovična garancija (50% nazad, ne 100%) deluje kao marketing trik, ne kao stvarna garancija
- Operativna komplikacija (proveriti plan compliance, prihvatati skenirane izveštaje, manuelni transferi)
- Pravna izloženost ako "compliance" definicija postane kontroverzna
- Sprint vrednost se brani kroz **strukturu** (plan + mock testovi + AI coach), ne kroz risk reversal

**Nova odluka**: Sprint nema garanciju povraćaja. Diferencijacija od Free verzije je u **strukturi i alatima za ispit** ("structure not content" strategija — vidi `10_SPRINT_PRODUCT.md` sekcija 2).

**Kada se menja**: ako konverzija u Sprintu drastično pada zbog frikcije pri kupovini, razmotri **trial mehaniku** (npr. prvih 7 dana sa potpunim refund-om) umesto post-matura garancije.

---

### 2026-05-06 [011] — V1 fokus: matematika 8. razred za MVP

**Kontekst**: Koji je prvi predmet/razred za MVP.

**Odluka**: Matematika 8. razred.

**Razlog**:
- Bliski cilju (mala matura 2027)
- Najveći broj pitanja (potencijal za beta testing)
- Dobro pokrije korisnika koji će kupiti Sprint

**Kada se menja**: ako beta porodice kažu da im treba drugačiji predmet — adjust.

---

### 2026-05-06 [012] — Brand naziv: "Mala Matura" (preliminary)

**Kontekst**: Brand identitet.

**Odluka**: Preliminary "Mala Matura" — sa proverom trademarka.

**Razlog**:
- SEO-prijateljski (high-intent keyword)
- Direktno relevantan
- Lako za zapamtiti

**Kada se menja**: ako trademark check otkrije da je već registrovan kod nekog drugog.

---

## Lessons Learned (živi)

(Ovde se beleže greške koje su nas koštale i šta smo iz njih naučili. Inicijalno prazna sekcija — popunjava se kako projekat napreduje.)

### Template:

```
## YYYY-MM-DD — [Lesson title]

**Šta se desilo**: ...
**Šta smo izgubili**: vreme, novac, korisnike, ...
**Uzrok**: ...
**Šta smo naučili**: ...
**Kako sprečavamo da se ponovi**: ...
```

---

## Backlog odluka (za buduće odlučivanje)

Stvari koje moramo da odlučimo, ali ne pre određenog vremena:

- **2026-09**: Da li koristiti pravu malu maturu za mock testove (pravna provera)
- **2026-10**: Logo finalan (freelance ili polish)
- **2026-11**: Push notifikacija default cadence
- **2026-12**: Q1 marketing budget allocation
- **2027-01**: Sprint cena finalizacija (test 4.990 vs 5.490)
- **2027-07**: Y2 features prioritization
- **2027-09**: Familija plan launch?
- **2027-10**: Online plaćanja (Monri integration)
- **2027-11**: Native app (iOS/Android) — da ili ne za Y3
- **2028-01**: Regional ekspanzija plan (BiH, CG)

---

## Pristup ovog dokumenta

- **Tvoj log** — niko drugi ne čita osim tebe (ili tima u Y2+)
- **Pisanje** = clarity. Često ćeš shvatiti odluku tek kad je napišeš
- **Vraćanje** = nostalgija + učenje. Posle 6 meseci pročitaj sve, vidi koliko si napredovao
