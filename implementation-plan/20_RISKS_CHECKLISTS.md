# 20 — Risk Register & Checklists

## Cilj

Sve potencijalne katastrofe sa mitigacijama, plus kritične checklists pre lansiranja koje moraju biti završene 100%.

---

## 1. Risk Register (kompletan)

### 1.1. Tehnički rizici

| ID | Rizik | Verov. | Uticaj | Score | Mitigacija |
|---|---|---|---|---|---|
| T-01 | MongoDB Atlas outage tokom sezone | niska (1%) | kritičan | 5 | M30+ SLA, pripremljen restore plan, communication template |
| T-02 | Vercel cena prelazi runway | srednja | srednja | 6 | Cloudflare cache + plan migracije na Hetzner u Y2 |
| T-03 | LLM provider menja cene/uslove | srednja | mali | 4 | Apstrakcioni layer, cache po pitanju, lako prebacivanje |
| T-04 | Push notifikacije ne rade na nečijem iOS-u | srednja | srednja | 5 | Email fallback za sve push-eve |
| T-05 | DDoS napad na sezonu | mala | visok | 5 | Cloudflare WAF + Bot Fight Mode |
| T-06 | Database korupcija (silly bug) | mala | kritičan | 6 | Daily snapshots + 6h-backup, manual review za destructive ops |
| T-07 | Memory leak u Node procesima | mala | srednji | 4 | Sentry monitoring, auto-restart Vercel |
| T-08 | Rate limit kod zaobilažen | mala | srednji | 4 | Cloudflare layer + multiple rate limit levels |
| T-09 | Performance puca pri sezonskom peak-u | srednja | visok | 7 | Pre-sezona load test, Vercel auto-scale |
| T-10 | Email deliverability problem (spam) | mala | visok | 5 | Resend reputation, SPF/DKIM/DMARC pravilno, bounce handling |

### 1.2. Pravni rizici

| ID | Rizik | Verov. | Uticaj | Score | Mitigacija |
|---|---|---|---|---|---|
| L-01 | Tvrdnja da pitanja nisu naša | mala (ako ima ugovor) | kritičan | 6 | Potpisani ugovor sa prijateljem + Y2 regeneracija top 20% |
| L-02 | Privacy violation (deca podaci) | mala | kritičan | 6 | Parental consent, audit, advokat pregled |
| L-03 | Pravna pretnja od veće kompanije | niska Y1 | visok | 4 | Konsultuj advokata pre reagovanja |
| L-04 | Tax compliance pogreška | mala | srednji | 4 | Računovođa angažovan |
| L-05 | TOS / privacy ne-kompliantan sa lokalnim zakonima | mala | visok | 5 | Advokat pregled pre lansiranja |
| L-06 | GDPR breach (EU posetioci) | mala | visok | 5 | Cookie consent, data deletion endpoints |
| L-07 | Refund policy challenge | mala | srednji | 4 | Jasno definisana, pravno potvrđena |

### 1.3. Tržišni rizici

| ID | Rizik | Verov. | Uticaj | Score | Mitigacija |
|---|---|---|---|---|---|
| M-01 | Roditelji ne plaćaju Sprint | srednja | kritičan | 9 | A/B test cena, jasna Free vs Sprint comparison, peer pressure mehanike |
| M-02 | D7 retention ispod 25% | srednja | kritičan | 9 | Iterativan pristup, ne lansiraš Sprint dok nije pogođeno |
| M-03 | Premalo 8-gradera u bazi do feb | srednja | visok | 7 | Targetirano marketing, bezplatni magneti za 8-grade |
| M-04 | FB ads CPM raste, CAC pogađa LTV | srednja | srednji | 6 | Diversifikacija na TikTok, organic, SEO |
| M-05 | Veliki igrač kopira | niska Y1 | visok | 5 | Brzina, brand, dubinske roditeljske veze (parent-duel = lock-in) |
| M-06 | Negativan PR / virusni incident | mala | visok | 5 | Crisis comm plan, community management |
| M-07 | Mala matura format se menja | mala | srednji | 4 | Praćenje Zavoda za vrednovanje, fleksibilan content engine |
| M-08 | Konkurencija (Učiteljica) lansira sličan paket | mala | srednji | 4 | Speed-to-market, brand jak |

### 1.4. Operativni rizici

| ID | Rizik | Verov. | Uticaj | Score | Mitigacija |
|---|---|---|---|---|---|
| O-01 | Ti se razboliš tokom sezone | mala | visok | 5 | Backup support (VA spremna na poziv), procesi dokumentovani |
| O-02 | Educator-konsultant odustane | mala | srednji | 4 | Backup person identifikovan |
| O-03 | Bank statement integration ne radi | mala | srednji | 4 | Manuelni proces validan kao backup |
| O-04 | Customer support overflow tokom sezone | srednja | srednji | 6 | VA spremna, FAQ optimized, self-service |
| O-05 | Cash flow napetost između sezona | srednja | visok | 7 | Y1 lichno finansiranje, lean overhead |
| O-06 | Sezonski peak nadmašuje serversku kapacitet | mala | visok | 5 | Pre-season load test + Vercel auto-scale |

### 1.5. Etički rizici

| ID | Rizik | Verov. | Uticaj | Score | Mitigacija |
|---|---|---|---|---|---|
| E-01 | App stvara nezdravu zavisnost kod dece | mala | visok | 5 | Anti-pattern dizajn, tihi sat, parent kontrole |
| E-02 | AI objašnjenja faktički netačna | mala | srednji | 4 | Educator review + user feedback flagging |
| E-03 | Bullying preko leaderboards | mala | srednji | 4 | Bez chat-a, anonimni nadimci, parent kontrola |
| E-04 | Roditelj pritisak (kupiti Sprint da bi bio "dobar roditelj") | srednja | mali | 3 | Marketing copy ne plaši, samo informisi |

### 1.6. Score legenda

- 1-3 = Low risk, monitor
- 4-6 = Medium risk, pripremi mitigaciju
- 7-9 = High risk, aktivno upravljaj
- 10+ = Critical, drop project ako ne možeš da rešiš

---

## 2. Top 5 risks za fokus

### 2.1. M-01 — Roditelji ne plaćaju Sprint

**Verovatnoća**: srednja
**Uticaj**: kritičan
**Score**: 9 (najvišii)

**Šta radimo**:
- Y1 base case je 400-560 kupaca; ako ostvarimo 50%, još uvek smo blizu break-even-a
- Side-by-side Free vs Sprint comparison na sprint stranici jasno opravdava cenu
- Peer pressure: "Drugovi su upisali" mehanika
- Roditeljski email "Spremnost: 47%" daje konkretno opravdanje

**Trigger za action**: ako u februaru manje od 100 early bird-ova → smanji cenu za public ili adjustuj poruke.

### 2.2. M-02 — D7 retention ispod 25%

**Verovatnoća**: srednja
**Uticaj**: kritičan

**Šta radimo**:
- Beta faza sa 50 porodica testira ovo pre marketing-a
- Quality gate Faza 2: ne idemo na Fazu 3 dok nije pogođeno
- Streak, push, gamification iterirana

**Trigger za action**: D7 ispod 20% u beti → 4 nedelje refaktora pre nego što se troši na marketing.

### 2.3. O-05 — Cash flow napetost

**Verovatnoća**: srednja
**Uticaj**: visok

**Šta radimo**:
- Lichno finansiranje 8-9 meseci runway-a pre prve sezone
- Lean overhead (ne kupuj skupa rešenja)
- Educator-konsultant honorar po potrebi
- Ako napetost ozbiljna: friends & family krug 30k EUR za 5-10%

### 2.4. T-09 — Performance pri sezonskom peak-u

**Verovatnoća**: srednja
**Uticaj**: visok

**Šta radimo**:
- Pre 1. marta 2027: load test sa 500 simultanih korisnika
- DB scale up na M30 minimum
- Cloudflare cache rules potvrđeni
- Sentry alerts za >100 grešaka/min

### 2.5. M-03 — Premalo 8-gradera u bazi do feb

**Verovatnoća**: srednja
**Uticaj**: visok

**Šta radimo**:
- Marketing targetiranje specifično 8-grade roditelje od jeseni 2026
- Lokalna PR (Politika dodatak, Mama Magazine) u januaru
- Email magneti specifični za malu maturu

**Trigger za action**: ako u januaru manje od 4.000 8-gradera u bazi → dupli marketing budget februar.

---

## 3. Pre-launch checklists (kritične)

### 3.1. Pravna kompletnost (gating)

Ne možeš primiti prvi dinar dok:

- [ ] **Ugovor o ustupanju autorskih prava** sa prijateljem potpisan
- [ ] **TOS** na sajtu, advokat overio
- [ ] **Privacy Policy** na sajtu, advokat overio
- [ ] **Parental consent flow** funkcionalan
- [ ] **Refund policy** napisana, na sajtu
- [ ] **APR registracija** (paušalac) gotova
- [ ] **Bank račun** otvoren za delatnost
- [ ] **Računovođa** angažovan

### 3.2. Tehnička kompletnost (gating)

- [ ] Performance test prošao: p95 <500ms na 100 simultanih
- [ ] Sentry, PostHog, Cloudflare funkcionalni
- [ ] Backup automatski (Mongo Atlas snapshot)
- [ ] Rollback plan dokumentovan
- [ ] PWA install + push rade (iOS 17.4+, Android Chrome 110+)
- [ ] Magic link delivery <30s
- [ ] Sve P0 i P1 bugovi popravljeni
- [ ] Smoke test prošao
- [ ] HTTPS svuda
- [ ] Headers (CSP, X-Frame, etc.) postavljeni

### 3.3. Sezonska gotovost (1. mart 2027)

Pre Sprint full launch:

- [ ] 50+ early bird Sprint kupaca proslo flow uspešno
- [ ] Refund flow tested manualno
- [ ] Mock testovi sva 12 ready i tested
- [ ] Sprint plan generator radi
- [ ] AI coach (daily push) ready
- [ ] Detailed AI explanations dostupne za sve pitanja
- [ ] DB scale-up potvrden (M30 minimum)
- [ ] Marketing materijal final
- [ ] Email templates Sprint-specific final
- [ ] Press release nacrt spreman
- [ ] Customer support proces formalan
- [ ] Crisis communication plan finalan

### 3.4. Sezonska post-mortem (jul 2027)

Posle prve sezone:

- [ ] Postavi public report: "Naša prva sezona u brojkama"
- [ ] Refund proces zatvoren
- [ ] Y1 finansijski izveštaj sa računovođom
- [ ] Lessons learned dokumentovan
- [ ] Y2 plan finalize do avgusta

---

## 4. Daily / Weekly checklists (sezona)

### 4.1. Daily (mart-jun)

Jutro (15 min):
- [ ] Sentry errors (any P0?)
- [ ] Pending Sprint uplate (potvrdi sve)
- [ ] Pending refund zahtevi
- [ ] DAU yesterday (any unusual drop?)
- [ ] Sprint sales yesterday

Veče (10 min):
- [ ] Customer support email triage
- [ ] Tomorrow social content scheduled?
- [ ] Tomorrow ad budget set?

### 4.2. Weekly (sezona)

Ponedeljak (1h):
- [ ] Pregled prošle nedelje (KPI dashboard)
- [ ] Sprint sales trend (na track sa target-om?)
- [ ] D7 retention prošle nedelje
- [ ] CAC po kanalu
- [ ] Bug backlog
- [ ] Sledeća nedelja prioriteti

### 4.3. Monthly (sezona)

1. u mesecu (2h):
- [ ] Računovodstveni report sa računovođom
- [ ] PostHog dashboards exported
- [ ] Marketing budget review (ROI po kanalu)
- [ ] Tech health (slow queries, error rates)
- [ ] User feedback summary (top 10 issues)

---

## 5. Crisis playbooks

### 5.1. "Server je dole"

**Detect**: Sentry alert + Vercel status

**Action plan**:
1. (5 min) Verify outage stvaran
2. (10 min) Komunikacija na social: "Tehnička pauza, vraćamo se"
3. (20 min) Restore from snapshot ako DB problem
4. (30 min) Public update sa preciznim tajmingom
5. (60 min) Resolved, post-mortem počinje

**Komunikacija template**:
> "Imamo tehnički problem od [vreme]. Radimo na rešavanju. Update u 30 min. Hvala na strpljenju."

### 5.2. "Privacy incident"

**Detect**: User report ili audit log anomaly

**Action plan**:
1. (1h) Stop širenje (block compromised endpoint)
2. (4h) Forenzika — koliki je obim
3. (24h) Notifikacija pogođenih korisnika
4. (72h) Notifikacija Komisiji za zaštitu podataka (zakonska obaveza)
5. (1 nedelju) Public statement + transparentni post-mortem

### 5.3. "Pravna pretnja"

**Detect**: Email od advokata ili druge stranke

**Action plan**:
1. **Ne reaguj sam** — pošalji advokatu
2. (2 dana) Konsultuj svog advokata
3. (1 nedelju) Dogovaraj odgovor sa advokatom
4. **Nikad ne brišeš ništa** dok pravni proces traje

### 5.4. "Negativan PR"

**Detect**: Twitter, Reddit, FB post sa puno engagementa

**Action plan**:
1. (1h) Verifikuj činjenice
2. (2h) Ako činjenice tačne: priznaj
3. (4h) Daj plan kako rešavamo
4. (24h) Update statusa

---

## 6. Decision frameworks

### 6.1. "Da li lansirati feature X?"

3 pitanja:
- Da li služi mala matura sezoni 2027?
- Da li imamo dovoljno bandwidth-a u trenutnoj fazi?
- Šta gubimo ako odložimo do Y2?

Ako sva tri odgovora pozitivni, idemo. Ako ne, na backlog.

### 6.2. "Da li potrošiti X RSD na Y?"

3 pitanja:
- Da li donosi prihod ove sezone?
- Da li smanjuje troškove ove sezone?
- Ako ne ni jedno, da li gradi neopravljivo za sledeću sezonu?

### 6.3. "Da li primiti negativan feedback?"

Ako se ponavlja od 3+ korisnika u 1 nedelji: ozbiljno. Inače, **podaci > anekdote**.

---

## 7. Monthly risk review

Svaki mesec proveravam:
- Da li su novi rizici nastali?
- Koji rizici su sazreli (verovatnoća se promenila)?
- Koje mitigacije su izvršene?
- Šta nije prošlo testiranje?

**Akcije**:
- Update tabelu u ovom dokumentu
- Promeni mitigation plan-ove ako potrebno

---

## 8. Otvorena pitanja

- [ ] Da li raditi formalniji risk assessment sa eksterim konsultantom? **NE u Y1, možda Y3 ako >30M RSD prihod**.
- [ ] Da li potrebna kompanijska osiguranja? **D&O u Y2 ako prihod >5M/mes, kibernetička u Y3**.
