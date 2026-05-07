# Mala Matura App — Implementacioni Plan
## Master Index

> Ovaj direktorijum je biblija projekta. Svaki dokument pokriva jedan aspekt do dubine na kojoj može da se implementira bez dodatnih pitanja. Čitaj redom prvi put. Posle se referenciraj kao priručnik.

**Verzija**: 1.0
**Datum**: 2026-05-06
**Vlasnik**: Aleksa

---

## Kako koristiti ovaj plan

Ovo NIJE nepromenjiv ugovor. Ovo je **donja granica detalja** za izvršenje. Svaki dokument:
- Definiše šta se gradi i zašto
- Postavlja merljive izlazne kriterijume
- Navodi otvorena pitanja koja moraš da odlučiš pre koda
- Identifikuje rizike i šta NE raditi

Svako odstupanje od plana **upiši u `25_DECISIONS.md`** sa razlogom. Plan se menja sa znanjem, ne sa raspoloženjem.

---

## Struktura dokumenata

### Deo I — Temelji (foundation)
| # | Dokument | Šta pokriva |
|---|---|---|
| 01 | [PRINCIPLES_DECISIONS.md](./01_PRINCIPLES_DECISIONS.md) | Vodeća načela, framework za odluke, šta NIKAD ne radimo |
| 02 | [ARCHITECTURE.md](./02_ARCHITECTURE.md) | Sistemska arhitektura, tech stack, deployment |
| 03 | [DATA_MODEL.md](./03_DATA_MODEL.md) | MongoDB sheme, indeksi, migracije, query patterns |
| 04 | [API_AUTH.md](./04_API_AUTH.md) | API endpoint specifikacije, autentifikacija (magic link), autorizacija |

### Deo II — Proizvod i UX
| # | Dokument | Šta pokriva |
|---|---|---|
| 05 | [UX_SCREENS_FLOWS.md](./05_UX_SCREENS_FLOWS.md) | Kompletni korisnički putevi i ekran-po-ekran specifikacija |
| 06 | [DESIGN_SYSTEM.md](./06_DESIGN_SYSTEM.md) | Tipografija, boje, komponente, microcopy, ton |

### Deo III — Mehanike proizvoda
| # | Dokument | Šta pokriva |
|---|---|---|
| 07 | [GAMIFICATION_ECONOMY.md](./07_GAMIFICATION_ECONOMY.md) | XP, leveli, streak, bedževi, lige, takmičenja, balans |
| 08 | [ADAPTIVE_ENGINE.md](./08_ADAPTIVE_ENGINE.md) | Algoritmi izbora pitanja, spaced repetition, težina |
| 09 | [CONTENT_PIPELINE.md](./09_CONTENT_PIPELINE.md) | Import pitanja, AI objašnjenja, validacija, regeneracija |

### Deo IV — Specifični proizvodi
| # | Dokument | Šta pokriva |
|---|---|---|
| 10 | [SPRINT_PRODUCT.md](./10_SPRINT_PRODUCT.md) | Mala Matura Sprint paket: mock testovi, plan, AI coach |
| 11 | [PARENT_SYSTEM.md](./11_PARENT_SYSTEM.md) | Roditeljski dashboard, duel, email, notifikacije |

### Deo V — Operativa
| # | Dokument | Šta pokriva |
|---|---|---|
| 12 | [PAYMENTS.md](./12_PAYMENTS.md) | NBS QR, manuelna potvrda, edge cases, računovodstvo |
| 13 | [ADMIN_PANEL.md](./13_ADMIN_PANEL.md) | Admin alati, podrška, content management |
| 14 | [MARKETING_GROWTH.md](./14_MARKETING_GROWTH.md) | Sajt, SEO, social, email, content kalendar, viral mehanike |

### Deo VI — Merenje i kvalitet
| # | Dokument | Šta pokriva |
|---|---|---|
| 15 | [ANALYTICS_METRICS.md](./15_ANALYTICS_METRICS.md) | KPI-jevi, eventi, dashboards, weekly review |
| 16 | [TESTING_QA.md](./16_TESTING_QA.md) | Test strategija, kvalitetne kapije po fazi |
| 17 | [LEGAL_COMPLIANCE.md](./17_LEGAL_COMPLIANCE.md) | TOS, privacy, autorska prava, GDPR/zaštita podataka, deca |

### Deo VII — Izvršenje
| # | Dokument | Šta pokriva |
|---|---|---|
| 18 | [LAUNCH_PLAYBOOK.md](./18_LAUNCH_PLAYBOOK.md) | Pre-launch, soft launch, sezonska kampanja |
| 19 | [ROADMAP_MILESTONES.md](./19_ROADMAP_MILESTONES.md) | Sedmica-po-sedmica plan do prve sezone |
| 20 | [RISKS_CHECKLISTS.md](./20_RISKS_CHECKLISTS.md) | Risk register + kritične checklists pre lansiranja |

### Deo VIII — Životni dokumenti (žive sa projektom)
| # | Dokument | Šta pokriva |
|---|---|---|
| 25 | [DECISIONS.md](./25_DECISIONS.md) | Decision log: svaka važna odluka, kada, zašto |

---

## Kako se ovaj plan kreće u izvršenje

**Sedmica 0** (sad): pročitaj sve. Prepišite ono što ne razumeš ili sa čim se ne slažeš u `25_DECISIONS.md` sa svojom odlukom.

**Sedmica 1-8 (MVP)**: prati `19_ROADMAP_MILESTONES.md`. Otvori `20_RISKS_CHECKLISTS.md` jednom nedeljno i ažuriraj.

**Sedmica 9-16 (Beta)**: dodaj predmete i mehanike kako je u `07_GAMIFICATION_ECONOMY.md` i `09_CONTENT_PIPELINE.md`.

**Sedmica 17-24 (Public)**: drugi gear — marketing prema `14_MARKETING_GROWTH.md` i `18_LAUNCH_PLAYBOOK.md`.

**Sedmica 25-32 (Sprint MVP)**: implementacija prema `10_SPRINT_PRODUCT.md`.

**Sedmica 33+ (Sezona)**: izvršenje prema `18_LAUNCH_PLAYBOOK.md` sezona-mod.

---

## Kritične zavisnosti — ono što sve drugo blokira

Ako bilo šta od ovoga nije završeno, **ne lansiraš**:

- [ ] Ugovor o ustupanju autorskih prava sa prijateljem za pitanja (`17_LEGAL_COMPLIANCE.md`)
- [ ] Privacy policy + TOS pravno proveren (`17_LEGAL_COMPLIANCE.md`)
- [ ] Maloletnička saglasnost (parental consent flow) — bez ovoga ne dodirujes decu (`17_LEGAL_COMPLIANCE.md`)
- [ ] Push notifikacija API-jem za PWA na iOS 17.4+ funkcionalan (`02_ARCHITECTURE.md`)
- [ ] Postanak NBS QR koda za uplatu testiran sa stvarnom uplatom (`12_PAYMENTS.md`)
- [ ] D7 retention >25% u beti (`19_ROADMAP_MILESTONES.md` Faza 2 quality gate)

---

## Tri metrike koje su jedine bitne

Sve ostalo služi ovome:

1. **D7 retention u free fazi** — meri da li gejmifikacija drži decu. Cilj: **>25%**.
2. **% 8-gradera u korisničkoj bazi do februara** — meri da li marketing pogađa target. Cilj: **>15%**.
3. **Free → Sprint konverzija** — meri da li Sprint vredi novca u očima roditelja. Cilj: **>5%**.

Ovo su predmet `15_ANALYTICS_METRICS.md`. Sve inženjerske odluke se proveravaju kroz prizmu ove tri metrike.

---

## Filozofija plana

Ne pokušavamo da budemo savršeni od prvog dana. Pokušavamo da budemo **dovoljno dobri da ne pravimo katastrofalne greške**. Sve što je ovde napisano je tu jer:
- Bez toga, **ne možeš lansirati** (pravne, sigurnosne, tehničke osnove), ili
- Bez toga, **ne možeš zaraditi** (konverzija, retencija, fokus), ili
- Bez toga, **ne možeš da skaliraš** (arhitekturne odluke koje su skupe za promenu kasnije)

Ako predloga u dokumentu ne radi za tebe, **zameni ga, ali napiši zašto**. Decision log čuva uzrok-posledicu.
