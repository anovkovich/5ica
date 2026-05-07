# Mala Matura App — Strateški plan (v2, fokusirano)

## 1. Strateška vizija

**Postati podrazumevana digitalna priprema za malu maturu u Srbiji** kroz besplatnu gejmifikovanu vežbu za sve uzraste 1-8. razreda, koja konvertuje u plaćeni Mala Matura Sprint paket u sezoni mart-jun.

**Jedan proizvod, jedan rok, jedan poslovni model.** Sve ostalo je gradnja levka koji vodi u njega.

---

## 2. Tržišna realnost

### Šta Srbija plaća

Roditelji u Srbiji **ne plaćaju app pretplate** generalno, **ali plaćaju**:

| Kategorija | Tipičan iznos | Frekvencija |
|---|---|---|
| Privatni časovi | 2.500-5.000 RSD/čas | nedeljno |
| Knjige i zbirke za maturu | 3.000-8.000 RSD | jednom |
| Pripremni kursevi | 30.000-80.000 RSD | jednom |
| Letnji kampovi, takmičenja | 15.000-50.000 RSD | jednom |

**Implikacija**: cenovnik treba da liči na *paket priprema* (jednokratno, jasna vrednost), ne na Netflix.

### Tržišna veličina

- ~75.000 osmaka godišnje (mala matura cohort u Srbiji)
- Gradske porodice sa dovoljnim primanjima i digital-savvy: ~30% = **~22.500 osmaka godišnje** sa stvarnom mogućnošću da plate
- Pri 4.990 RSD i 10% konverziji: **TAM = ~11M RSD/god** za prvu sezonu, raste sa svesti o brendu

### Konkurencija — prazno polje

| Konkurent | Slabost |
|---|---|
| Učiteljica.rs / Pripremise | UX iz 2010, naplata SMS-om, bez AI, bez gejmifikacije |
| Khan Academy (sr) | Nema mala matura format, ne prati program |
| YouTube | Pasivna konzumacija, bez merenja, bez konkurencije |
| eŠkola | Beživotno, bez motivacije |
| ChatGPT | Nije strukturiran, roditelj ne vidi napredak |

Niko nema kombinaciju **gejmifikacija + AI tutor + roditeljski dashboard + razred-bazirana konkurencija**.

---

## 3. Proizvod — jedan klin, jedna naplata

### Free (zauvek besplatno)
- Sva pitanja za sve razrede 1-8
- Dnevna gejmifikovana vežba (XP, level, streak)
- Sva tri kruga konkurencije: drugovi, razred, škola, Srbija lige
- **Roditelj-vs-dete duel** (ključna porodična mehanika)
- Roditeljski dashboard sa nedeljnim izveštajem
- Osnovno AI objašnjenje pri grešci

### Mala Matura Sprint (jednokratno, sezona mart-jun)
- **Cena**: **4.990 RSD** (early bird do 1. marta: 3.990 RSD)
- 90-dnevni personalizovani plan učenja
- 12 mock testova u realnom formatu mature
- AI duboka objašnjenja sa primerima i sličnim zadacima
- Detaljan nedeljni izveštaj roditelju
- Spremnost-skor uživo (ažurira se posle svake sesije)
- "Garantovan rezultat": ako dete ne dobije 50+/100, vraća se 50% novca
- Sertifikat o završenom sprintu

### Šta NE pravimo
- ~~Mesečna pretplata~~ — Srbija ne plaća
- ~~B2B prodaja školama~~ — sales-heavy, slow, ne treba nam
- ~~Native iOS/Android app~~ — PWA je dovoljan
- ~~Više različitih cenovnih planova~~ — komplikuje odluku, smanjuje konverziju

---

## 4. Gejmifikacija — sloj po sloj

### 4.1. Dnevni loop (free)

**Sesije**:
- **Brzi trening**: 5 pitanja, 3 min — dnevna obaveza, daje streak
- **Standardna**: 15 pitanja, 10 min — ozbiljnija
- **Maraton**: 50 pitanja, 30 min — daje 10× XP

**Adaptivna težina**: 60% pitanja iz oblasti gde je dete slabo, 40% gde je jako (drži samopouzdanje + popravlja slabosti).

**Skor**:
- 3-odgovorna pitanja sa "Dalje": **+3 / -2 / 0**
- 4-odgovorna: **+2 / 0**
- Streak bonus: ×1.5 multiplikator nakon 7 dana zaredom
- Brzina bonus: rešavanje za <10s = +1 XP

### 4.2. Streak — najjača kuka

- **Vidljiv broj sa vatrom** na home screenu
- **Streak freeze**: dete dobija 1 freeze na 7 dana streak-a (besplatno) — pokriva propušten dan
- **Milestone bedževi**: 7, 30, 100, 365 dana — svaki ima poseban bedž
- **Push notifikacija oko 18h**: "Marko, ostao ti je samo 1 sat za streak danas"
- **Strah od gubitka** je psihološki najjača retencija

### 4.3. XP, leveli, kolekcionarstvo

| Element | Detalj |
|---|---|
| **Leveli** | 1-100, eksponencijalna kriva. Level 10 ≈ 10 dana redovne vežbe |
| **Avatari** | 30+ avatara, otključavanje XP-om — dete bira identitet |
| **Bedževi** | "Razlomci master", "Streak 30", "Top 3 u razredu nedelje" |
| **Karte za kolekciju** | Sakupljaš mini-katalog za svaki predmet — "Pokemon" mehanika |

**Pravilo**: nema pay-to-win. Sve se otključava igranjem, ne plaćanjem. Sprint paket je **nešto drugo** (priprema za maturu), ne premium XP.

### 4.4. Socijalni sloj — viralni motor

**Krug 1 — Drugovi (3-15 ljudi)**
- Dodaješ ih kodom (npr. "MK0834")
- Vidiš njihov streak, XP, level
- Direktan duel: "izazovi Petra na 5 pitanja iz istorije"

**Krug 2 — Razred (20-30 dece, isto odeljenje)**
- Automatski razred-grupa (8-2 OS "Vuk Karadžić")
- Nedeljni leaderboard po XP-u
- Nadimci za privatnost, ali deca u razredu znaju ko je ko
- "Ti si 4. u razredu nedelje"

**Krug 3 — Škola** (opcionalno)
- Mesečno takmičenje "Najbolji 8. razred škole"
- Roditelj može da isključi za svoje dete

**Krug 4 — Srbija lige**
- Bronzana → Srebrna → Zlatna → Dijamantska
- ~30 ljudi po grupi (matchmaking)
- Top 5 napreduje, dno 5 pada — nedeljni reset

**Anti-toksičnost**:
- NEMA chat-a (nema bullying-a)
- Nadimci u javnim leaderboardima
- Roditelj može da isključi javne lige

### 4.5. Roditelj-vs-dete duel — porodična kuka

**Najmoćnija mehanika za retenciju i konverziju**, jer roditelj koji *igra* je daleko vrednije nego roditelj koji samo gleda.

**Kako radi**:
- Roditelj iz "Roditelj mode" klikne "Izazovi Marka"
- Bira predmet i razred (može svoj jaki predmet ili dečji razred)
- **Sinhroni mod**: oboje u app-u istovremeno, 5 pitanja, ko je tačniji + brži pobeđuje
- **Asinhroni mod**: jedan reši, drugi posle vidi rezultat i pokušava da prebaci u 24h
- Pobednik dobija mali XP bonus, oboje dobijaju "porodični" bedž
- Statistika: "Sa tatom: 7-3 (ti vodiš)" — gradi se mali narativ

**Zašto ovo radi**:
- Dete dobija šansu da "pobedi roditelja" — *moćna* psihološka nagrada za uzrast 8-15
- Roditelj se zabavlja, ne samo "monitoringuje" — ostaje u sistemu
- Postaje **porodični ritual** ("hajde da odigramo pre večere")
- Roditelj koji proveri 5 pitanja iz biologije 5. razreda i ne zna 2 odgovora → odmah razume zašto njegovo dete ima poteškoća → kupuje Sprint
- **Viral mehanika**: dete priča drugu "moja mama je dobila 1 od 5 iz srpskog haha" → drug instalira da igra sa svojom mamom

**Verzija za baku/dedu/teču**: roditelj može da pošalje pozivnicu drugom članu porodice koji se priključuje samo za duel mod (ne pravi nalog, samo gostuje). Familija postaje sistem.

### 4.6. Roditeljski dashboard (free)

Posebna stranica/app ("Roditelj mode") sa pristupom magic-link-om:

**Dnevni**: "Marko je danas vežbao 12 minuta, +50 XP, streak 14 dana ✓"

**Nedeljni email**:
- Vreme učenja po danu (graf)
- 3 najslabije oblasti
- 3 najjače oblasti
- **Spremnost % za malu maturu** (ažurira se sa svakim mock testom)
- Rang u razredu/školi
- Statistika porodičnih duela

**Mesečni**: kompletan izveštaj + preporuke ("šta treba da vežba sledeći mesec")

**Kritično**: roditelj ne vidi tačan dnevni rezultat dok ne bude dovoljno podataka (7+ dana). Tako se gradi "vredi" osećaj pre nego što se postavi konverzija u Sprint.

---

## 5. Konverzija free → Sprint — gde se zarađuje

### Faza 1 — septembar do januar (8. razred počinje)
- App počinje da prikazuje "Mala matura: 240 dana" countdown
- Roditelj dobija email: "Procena: vaše dete je trenutno na 47% spremnosti za malu maturu"
- Soft pitch: "Sprint paket počinje 1. mart. Rezerviši mesto: **3.990 RSD** (early bird, 1.000 RSD popust)"

### Faza 2 — februar (60 dana pre)
- Free verzija počinje "premium content tease":
  - "Mock test simulacija (samo Sprint)"
  - "Personalizovan plan učenja (samo Sprint)"
  - "AI duboka objašnjenja (samo Sprint)"
- Roditelj dobija detaljnu analizu: "Vaše dete je slabo u 12 oblasti. Sprint paket pokriva sve 12 sa garantovanim planom."

### Faza 3 — mart-jun (sezona)
- Sprint je live
- Cena: **4.990 RSD** (early bird još 3.990 do 1. marta)
- Hooks u free verziji:
  - "Tvoji drugovi su upisali Sprint" (peer pressure)
  - "U razredu 8-2: 12 đaka pripremaja sa Sprintom" (social proof)
  - Roditeljski email: "Možeš da popraviš Markovu spremnost za 30% u 90 dana"
  - Countdown timer: "Mala matura: 87 dana"

### Diferencijacija od Free verzije (ključno za smanjenje konfuzije)

**"Free je za vežbu. Sprint je za pripremu mature."** — strategija "structure not content".

Free verzija ima sva 8.500+ pitanja. Sprint **ne gate-uje pitanja** — dodaje 6 ekskluzivnih alata: personalizovan 90-dnevni plan, 12 mock testova u formatu mature, detaljan AI tutor (vs basic free), dnevni AI coach, predvidjenu ocenu na maturi, Sprint cohort + leaderboard.

Side-by-side comparison na sprint stranici jasno opravdava cenu — roditelj vidi šta dobija plus i razume da plaća strukturu, ne sadržaj.

---

## 6. Sezonalni biznis — kako preživeti i zaraditi

### Cash flow realnost

**Avgust-februar (7 meseci)** = burn faza:
- Rast korisničke baze
- Bez prihoda
- Troškovi: hosting, AI API (smanjeno bez Sprint-a), marketing, plata

**Mart-jun (4 meseca)** = harvest faza:
- 90% godišnjeg prihoda
- Vrhunac: april-maj

**Implikacija**: moraš imati **runway od 8-9 meseci** pre prve sezone. Inače te ubije čekanje.

### Updated profitne projekcije (3 godine)

| Sezona | Free korisnici (do feb) | 8-graderi u bazi | Konverzija | Sprint kupci | Prihod |
|---|---|---|---|---|---|
| **MM 2027** (Y1) | 30-50k | ~5-7k | 8% | 400-560 | **2,0-2,8M RSD** |
| **MM 2028** (Y2) | 100-150k | ~15-20k | 12% | 1.800-2.400 | **9-12M RSD** |
| **MM 2029** (Y3) | 250-300k | ~35-40k | 15% | 5.250-6.000 | **26-30M RSD** |

**Operativni troškovi godišnji** (manji bez multiproizvoda):
- Y1: ~3,5M RSD (hosting, AI API, marketing 150k/mes, osnivačka plata 100-150k/mes)
- Y2: ~6M RSD (mali tim, više marketinga)
- Y3: ~10M RSD (veći tim, regionalna ekspanzija start)

**Net profit projekcije**:
- Y1: **-2 do 0M RSD** (ulaganje u korisničku bazu)
- Y2: **+5-8M RSD**
- Y3: **+18-25M RSD**

**Reality check**: ako sve klikne (PR pohvala, virusni moment, partnerstvo sa poznatim profesorom), Y3 može biti 50M+. Ako ne klikne (loša retencija u Y1), prepoloviti.

---

## 7. Go-to-market — od 0 do 50.000 free

### Pre-launch (3 meseca pre soft launch-a)

**Cilj**: Lista čekanja od 3-5k email-ova roditelja 8. razreda + Instagram nalog sa 5-10k followera.

Taktike:
1. **Instagram nalog "Mala Matura Pitanja"** — 1-2 zanimljiva pitanja dnevno. Sadržaj već imaš (8.428 pitanja).
2. **Facebook grupa "Roditelji osmaka 2027"** — moderirana, vredna, ne marketing
3. **Besplatan PDF "Najteža pitanja sa prošle male mature"** — email magnet
4. **Saradnja sa 1-2 poznata profesora/tutora** — kredibilitet + njihova publika

### Launch (mes 1-3 javnog rada — leto/rana jesen 2026)

Free verzija ide live. Ključna metrika: **D7 retention** — koliko se korisnika vrati 7. dana. Ako je >25%, proizvod radi. Ako <15%, popravi pre nego trošiš na marketing.

Marketing budžet prvih 3 meseca: **~150.000 RSD/mes na Meta** (FB/IG)

### Jesen-zima (mes 4-7 — okt 2026 do feb 2027)

**Fokus**: rast 8-grade audience-a + early bird Sprint marketing
- Targetirano FB/IG: roditelji 8-grade
- Early bird Sprint: 3.990 RSD do 1. marta
- Roditeljski izveštaji počinju da prikazuju "Sprint preporuka" automatski
- Cilj kraj februara: 30-50k free, 200-400 early bird Sprint kupljen

### Sezona (mes 8-11 — mart-jun 2027)

**Glavna prodaja**:
- Email kampanja na liste čekanja: "Sprint je sada live, 4.990 RSD"
- Re-targeting reklame na free 8-grade korisnike
- Partnerstvo sa 1-2 publikacije (Politika, Mama Magazine)
- Cilj: ukupno **400-560 Sprint kupaca** (sa već prodatim early bird-ovima)

### Letnji period (jul-avg 2027)

- Recap na društvenim mrežama: "Naši đaci na maturi 2027" — testimonijalni
- Soft launch za sledeću generaciju (počinje rast 7-grade audience-a)

---

## 8. Faze izgradnje (12 meseci do prve sezone)

| Faza | Trajanje | Šta se gradi | Ključna metrika |
|---|---|---|---|
| **1. MVP** | Ned 1-8 | Next.js + Mongo, kviz + skoring + streak za matematiku 8. razreda, magic-link auth, osnovni roditeljski email | 1 porodica koristi 7 dana zaredom |
| **2. Beta** | Ned 9-16 | Svi 14 predmeta, AI objašnjenja (cache), nedeljni roditeljski izveštaj, mock test mod, **roditelj-vs-dete duel** | 50 porodica, NPS >40 |
| **3. Public free** | Ned 17-24 | Marketing sajt, gejmifikacija (XP, lige, razred-leaderboard), avatari, bedževi, push notifikacije | 5.000 sign-ups, D7 retention >25% |
| **4. Sprint MVP** | Ned 25-32 | Sprint paket: mock testovi, personalizovan plan, dublje AI, AI coach, cohort, NBS QR uplate | Early bird testiranje, 50 kupaca |
| **5. Sezona** | Ned 33+ | Mart-jun harvest, fokus na konverziji, marketing | Y1 cilj: 400-560 Sprint kupaca |

**Strogo pravilo**: ne prelaziš fazu dok metrika prethodne nije ispunjena. Ako Faza 3 ne dostigne 25% D7, NE ulaziš u sezonu — refaktoriši retenciju 4-6 nedelja više.

---

## 9. Tim i operativa

**MVP do Sprint launch (mes 1-7)**: ti + 1 part-time
- Ti: full-stack development, sve odluke, content review
- Educator-konsultant (10h/ned, 30-50k RSD/mes): proverava sadržaj, pomera odluke o programu

**Sezona priprema (mes 8-11)**: dodaj 1
- Marketing/content (full-time, 80-120k RSD/mes): Instagram, FB ads, email kampanje, customer support tokom sezone

**Posle Y1 sezone (mes 12+)**:
- Junior dev (~80-100k RSD) — ti se izvlačiš iz koda
- Customer support pre i tokom Y2 sezone (mart-jun, part-time)

---

## 10. Pravna i finansijska osnova

**Početak (Y1, do prvih 1M RSD prihoda)**:
- **Paušalac (preduzetnik paušalno oporezovan)** — najjednostavnije
- Plaćanja: NBS IPS QR direktno na preduzetnički račun
- Ovo je dovoljno za prvih 12-18 meseci

**Posle 1M RSD prihoda mesečno (Y2)**:
- Prelaz na **DOO** (porez na dobit 15%, fleksibilno za reinvestiranje)
- Online plaćanje: NestPay (UniCredit/Raiffeisen) ili Monri
- Računovođa full-time od 50-80k RSD/mes

**Pravna napomena za pitanja**:
- **Pre prvog naplaćenog dinara, potpiši formalni ugovor o ustupanju autorskih prava sa prijateljem za 8.428 pitanja**. Usmena saglasnost = problem ako se naplata pokrene i neko ospori. 1 sat sa advokatom, 5-10k RSD, kritičan korak.

---

## 11. Rizici i mitigacije

| Rizik | Verovatnoća | Uticaj | Mitigacija |
|---|---|---|---|
| Loša retencija u free fazi (<25% D7) | srednja | kritičan | Faza 3 pre marketinga; ako ne pogodi, refaktoriši pre sezone |
| Slaba konverzija free→Sprint (<5%) | niska-srednja | visok | A/B testiraj cenu, jasna Free vs Sprint comparison, premium content tease u februaru |
| Premalo 8-gradera u bazi do februara | srednja | visok | Targetirani FB ads samo za 8-grade roditelje, jesen 2026 |
| Pravna tužba oko pitanja | niska | srednja | Ugovor sa prijateljem + Y2 regenerisanje top 20% kroz LLM |
| Sezonalni cash flow pritisak | visoka | srednja | Lično finansiranje 8-9 meseci runway-a, eventualno privatna mala investicija |
| Veliki igrač kopira | niska Y1, raste Y2-3 | visok | Brand + brzina + dubinske porodične veze (parent duel = lock-in) |
| FB ads CPM raste, CAC pogađa | srednja | srednja | Diversifikuj: TikTok content, organski Instagram, SEO |
| Push notifikacije iritiraju roditelje | niska | niska | Konfigurišuća, default umerenu frekvenciju |

---

## 12. Najmanji vredan korak — sledećih 7 dana

1. **Pravni**: napiši i potpiši ugovor o ustupanju autorskih prava sa prijateljem za 8.428 pitanja (5-10k RSD kod advokata)
2. **Marketing**: registruj Instagram nalog **"Mala Matura Pitanja"** (ili sličan), pripremi prvih 30 postova iz baze (1 mesec sadržaja unapred)
3. **Tech**: setup Next.js + Mongo + auth (Clerk ili Auth.js), import 4 JSON-a (subjects, classes, chapters, questions)
4. **Test pitanje**: napravi sirov ekran "izaberi predmet → kviz" za matematiku 8. razred. Testiraj na 1 detetu

Ako tih 7 dana donese: ugovor potpisan, 30 postova spremno, MVP ekran radi → **kreni dalje**. Ako ne, gledaš zašto pre nego što gradiš ostalo.

---

## 13. Apsolutni "Don'ts"

- **Ne počinji sa svih 14 predmeta**. Klin = matematika 8. razred. Ostali predmeti dolaze u Beta fazi.
- **Ne pravi native iOS/Android app**. PWA je dovoljan godinu+ dana.
- **Ne ulagaj u dizajn agenciju za 500k pre prvog korisnika**. Tailwind + 1 freelance dizajner = dovoljno.
- **Ne stavljaj "AI" kao glavnu reklamu**. Roditeljima je važan rezultat (poeni na maturi), ne tehnologija.
- **Ne lansiraj Sprint pre nego što free ima >25% D7 retencije**. Bez retencije, nema konverzije.
- **Ne preuzimaj investitora pre Y2**. Možeš sam, sa cash flow-om, sa boljim uslovima.
- **Ne vraćaj se na pretplatu ili B2B u Y1**. Fokus = jedan proizvod, jedna sezona.
- **Ne dodaj chat / direktne poruke između dece**. Bullying = kraj proizvoda.

---

## 14. Zaključak

**Y1 (mata 2027)**: -2 do 0M RSD, validacija svih hipoteza, prvih 400-560 Sprint kupaca

**Y2 (matura 2028)**: **+5-8M RSD neto profita**, mali tim, ustaljen biznis

**Y3 (matura 2029)**: **+18-25M RSD neto profita**, regionalna ekspanzija na vidiku (BiH, CG sa istim jezikom)

**Ovo je biznis koji ne mora da bude jednorog**. Može biti **profitabilan, izdržljiv, sezonski biznis** koji ti daje slobodu i potencijal za regionalnu ekspanziju ako sve klikne.

**Tri kritične metrike za Y1**:
1. **D7 retention u free fazi >25%** — ako ne, ne lansiraj Sprint
2. **% 8-gradera u bazi do februara >15%** — ako ne, marketing nije pogodio target
3. **Free → Sprint konverzija >5%** — ako ne, Sprint vrednovanje treba refaktorisanje

Ako ova tri pogađaju, ostatak je egzekucija. Ako jedno ne pogodi — popravljaš tu metriku pre nego što skaliraš.
