# 01 — Principles & Decision Frameworks

## Cilj ovog dokumenta

Definisati **vodeća načela** koja su tihi sudija svake sledeće odluke. Kad se zaglaviš ("šta da radim?"), vraćaš se ovde.

---

## 1. Vrhovni princip

> **Mala matura sezona u maju 2027. je jedini cilj koji postoji.**

Sve ostalo služi tome:
- Free verzija postoji da bi imala 8-gradere koji konvertuju u Sprint
- Gejmifikacija postoji da bi free retencija bila visoka
- Roditeljski sloj postoji da bi se konverzija kupila
- Brand sajt postoji da bi se Sprint mogao naplatiti
- Push notifikacije postoje da bi se streak održao i ne propušten dan utovaranja u sezoni

Sve što ne služi prvom Sprint sezoni je **scope creep** i baca se na "v2 backlog".

---

## 2. Načela proizvoda

### 2.1. Kreni od bola, ne od rešenja
Roditelj kupuje Sprint zato što ga je strah da mu dete neće proći malu maturu, ili da neće upisati željenu školu. Nije zato što vole tehnologiju ili AI. Microcopy, marketing, sve UI tekst odražava ovo:

- ❌ "Naša AI tehnologija pruža personalizovano učenje"
- ✅ "Marko je trenutno na 47% spremnosti. Sprint paket popravlja 12 oblasti gde je slab"

### 2.2. Dete je korisnik. Roditelj je kupac.
- UX dizajn za **dete** (8-15 god)
- Roditeljski dashboard i marketing materijal za **roditelja** (35-50 god)
- Nikad ne miks. Roditelj ne treba da igra dečji UI (osim u duel modu). Dete ne treba da vidi roditeljski izveštaj.

### 2.3. Free mora biti **stvarno dobro**, ne osakaćeno
Klasična greška: free je "demo" sa 30 pitanja. Naša verzija: free je punopravan dnevni alat za vežbu sa svim predmetima i razredima. Sprint je **drugačiji proizvod** za **drugačije potrebe** (priprema za ispit), ne premium-XP-bafer.

Pošto roditelj 5. razreda ne misli o maturi, tek za par godina će postati naš kupac. Free verzija je *investicija u 4 godine kasnije*.

### 2.4. Brzina > savršenstvo
- Lansiraj sa 1 predmetom (matematika 8). Dodaj ostale u Beta fazi.
- Ne čekaj "savršen" UI. Tailwind + osnovne komponente za MVP.
- Iteriraj sa pravim korisnicima, ne sa imaginarnim.

### 2.5. Ne pravi za sebe, pravi za korisnika
Ti nisi 8-grader, nisi roditelj 8-gradera. Tvoji estetski preferenci nisu relevantni. **Testiraj sa 5 dece i 5 roditelja pre nego što ulažeš u rast.**

### 2.6. Mobilno prvo, sve ostalo drugo
85%+ koraka je sa telefona. Desktop je sekunda. Tablet je treća. Sve UI specifikacije počinju sa mobilnim.

### 2.7. Bez chat-a, bez DM, bez foruma
Razlog: bullying, nadzor, pravna izloženost za maloletnike. **Nikad** ne dodaj direktnu komunikaciju među decom. Konkurencija = brojevi i bedževi, ne reči.

---

## 3. Načela inženjeringa

### 3.1. Boring tech wins
- Next.js 15 (App Router, server components)
- MongoDB (već imamo strukturu)
- Tailwind + shadcn/ui (kopiraš komponente, ne instaliraš)
- Vercel za hosting MVP-a, kasnije možda VPS
- Cloudflare za CDN
- Resend ili Brevo za email
- Cloudinary ili UploadThing za slike

**Ne biraj nove tehnologije.** Cilj je da gradiš proizvod, ne da učiš framework.

### 3.2. Server-side first
Server Components po default-u. Client komponente samo gde su zaista potrebne (interakcija, stanje). Ovo daje:
- Bolji SEO za marketing stranice
- Brži first paint na sporim mobilnim mrežama
- Manje JS bundle-a

### 3.3. Schema-first
Pre nego što piše API, definišeš MongoDB schemu sa Zod validacijom. Pre nego što praviš UI, definišeš API sa OpenAPI ili tipiziranim handler-ima. Ovo prevenira "evolution chaos" gde se podaci i kod razilaze.

### 3.4. Idempotentnost po default-u
Svaka API operacija mora biti bezbedna za retry. Korisnici su na mobilnom internetu, koji će prekidati. Ako klikne "Predaj odgovor" dva puta, ne dobija duple bodove.

### 3.5. Caching agresivno
- AI objašnjenja: keširanje po `questionId` zauvek (jednom generisano, mnogo puta korišćeno)
- Statični sadržaji (subjects, classes, chapters): keš na 1h
- Korisnički podaci: keš na 5 sek (recent activity)

### 3.6. Logging od dana 1
- Svaka mutation operacija loguje user_id, action, timestamp, ip
- Audit log za sve roditeljsko-detinje akcije (ko je kome promenio podatke)
- Bez ovoga, dijagnostika korisničkih problema je nemoguća

### 3.7. Privatnost dece kao prvi razred
Posebna oprezivost:
- Nikad ne logujemo PII (puno ime) u event tracking
- Korisnička imena su nadimci, ne pravo ime
- Slike avatara su iz biblioteke, ne upload-ovi
- Email se dobija od roditelja, ne od deteta

---

## 4. Framework za odluke

### 4.1. Tri pitanja pre svake odluke

Pre nego što kreneš na bilo šta:

**P1: Da li ovo služi mala matura sezoni 2027?**
Ako ne, baci u "v2 backlog". Ako da:

**P2: Šta se desi ako to NE uradimo?**
Ako odgovor je "nista, niko neće primetiti", baci. Ako "konverzija pada za 20%", radi prvo. Ako "bez toga ne smemo lansirati" (pravna, sigurnosna), kritičan prioritet.

**P3: Koji je najmanji korak koji testira hipotezu?**
Ako odgovor uključuje "izgradi za 4 nedelje pa ćemo videti", razbij na manje korake. Validacija pre investiranja.

### 4.2. Kanonički odgovori na česta pitanja

| Pitanje | Odgovor |
|---|---|
| Da li dodajem pretplatu? | NE. Odlučeno. Free + Sprint. (vidi `25_DECISIONS.md`) |
| Da li radim B2B sa školama? | NE. Odlučeno. (vidi `25_DECISIONS.md`) |
| Da li pravim native app? | NE. PWA. Možda v3 nakon 5.000 plaćenih. |
| Da li podržavam i ćirilicu i latinicu? | DA. Korisnik bira u settings, default latinica. Podaci već imaju oba. |
| Da li radim engleski jezik? | NE u v1. Možda Y3 ako idemo regionalno (ali BiH/CG = isti jezik). |
| Da li podržavam tablet/desktop? | DA, ali responsive — ne dva odvojena UI-ja. |
| Da li gradim svoje analytics? | NE. PostHog ili Mixpanel u Y1. |
| Da li gradim svoj A/B testing? | NE. PostHog feature flags ili GrowthBook. |
| Da li piše korisnik svojih ruku? | DA — magic link na roditeljski email. Bez šifara. |

### 4.3. Šta NIKAD ne radimo

Apsolutni "ne" koji štite proizvod od katastrofa:

1. **Ne uvodimo direktnu komunikaciju (chat, DM)** između dece
2. **Ne logujemo lične podatke (PII)** u analytics platformama
3. **Ne dozvoljavamo pay-to-win** (kupljen XP, kupljeni leveli) — uništava integritet rangova
4. **Ne pokazujemo reklame deci** (free verzija ima reklame samo na roditeljskom dashbordu, ako uopšte)
5. **Ne pravimo "addictive"** mehanike koje zadržavaju protiv volje (auto-play sledeće sesije, dark patterns za napuštanje) — Duolingo greška
6. **Ne tragiramo lokacije** dece. Geo se izvodi samo iz IP-a kad treba (lokalizacija sadržaja po Srbiji), nikad GPS.
7. **Ne pravimo poseban iOS/Android osim PWA** dok ne dostignemo 5.000+ plaćenih
8. **Ne deluje sa investitorima** dok nemamo 1.000 plaćenih i revenue (pregovara mesto bolje sa traction-om)
9. **Ne otpuštamo podatke vrednije od $1k vrednosti bez ugovora i provere** (pitanja, tutori, partneri)
10. **Ne prebacujemo cenovnu strukturu sredinom sezone** — strogo zaključi ceni u februaru, drži kroz jun

---

## 5. Načela rasta

### 5.1. Retencija pre akvizicije
1.000 dnevno aktivnih korisnika je vrednije od 50.000 koji su otišli posle dana 1. **Ne troši na FB ads pre nego što D7 ne dostigne 25%.**

### 5.2. Roditelji su kanali
Najjeftinija akvizicija je preporuka roditelja roditelju. Sve UX odluke za roditelje treba da generišu trenutke deljenja:
- Email "Marko je 4. u svom razredu" — proslijedlja drugu mami
- Sertifikat za malu maturu — kači na frizider, drugi roditelj pita "šta je to"

### 5.3. Sezonalnost je sila prirode
Ne pokušavaj da boriš protiv nje. Iskoristi je:
- Avgust-januar: rast korisničke baze (free)
- Februar: aktivacija 8-gradera
- Mart-jun: harvest
- Jul: oporavak, planiranje
- Niko ne uči u julu i avgustu. Ne troši marketing budget tada.

### 5.4. Brand pre proizvoda
"Mala Matura Pitanja" Instagram je stvarno **prvi proizvod**. Free app je **drugi**. Sprint paket je **treći**. Brand je predznak: "uradili smo dobar Insta godinu dana, sad imamo i app, sad imamo i paket".

---

## 6. Ekonomska načela

### 6.1. Cash je sve
Sezonalni biznis sa runway-om. Pre nego što potrošiš nešto:
- Da li donosi prihod ove sezone? (oštro)
- Da li smanjuje troškove ove sezone? (mekan)
- Da li gradi za sledeću sezonu? (sa dokazom)

Ako ništa od toga, NE.

### 6.2. Cena se ne smanjuje, već se diže
4.990 RSD je za **2027 sezonu**. **Y2 (2028)**: 5.490 RSD. **Y3 (2029)**: 5.990 RSD. Plus inflacija.

Smanjivanje cene = signaliziranje da proizvod ne vredi. Diže se cena, ne snižava. Ako rasterećuješ, radi to kroz **akcije i popuste** (early bird, family), ne kroz spuštanje liste.

### 6.3. Ne preuzimaj investitora pre Y2
Boostrap kroz Y1. Validna razloga:
- Bolji uslovi sa traction-om (cap manje agresivan)
- Ne praviš strategiju za izlaz pre nego što imaš proizvod
- Ne troši se vreme na pitching — gradi proizvod

Ako treba malo gotovine: friends & family krug, max 30k EUR za 5-10% bez kontrole.

---

## 7. Kvalitet i zrelost

### 7.1. Definicija "Done" za feature
Feature je gotov kad:
- [ ] Funkcija radi na latest Chrome desktop
- [ ] Radi na Safari iOS najnovija
- [ ] Radi na Chrome Android najnovija
- [ ] Edge cases (loading, error, empty) imaju UI
- [ ] Logging za uspeh i grešku postoji
- [ ] PostHog event je dodat (gde je relevantno)
- [ ] Pravopis srpskog je proveren
- [ ] Pristupačnost: tab navigacija, alt tekstovi, contrast 4.5+
- [ ] Performance: TTI < 3s na 3G

### 7.2. Definicija "Lansirano" za faze
Faza je lansirana kad:
- [ ] Sve features Phase X iz `19_ROADMAP_MILESTONES.md` su Done
- [ ] Quality gate metrika je pogođena
- [ ] Postoji rollback plan ako nešto pukne
- [ ] Postoji dashboard koji pokazuje da li radi

### 7.3. Greške koje se NE ponavljaju
Vodimo `25_DECISIONS.md` sa "lessons learned" sekcijom. Svaka greška koja je nas koštala vremena dobiveno je nazad ako se pojavi u dokumentu i ne ponovi se.

---

## 8. Vremenske odluke

### 8.1. Reverzibilne vs nereverzibilne odluke
- **Reverzibilna** (boja dugmeta, copy teksta, raspored): odluči brzo, popravi posle.
- **Nereverzibilna** (tech stack, brand ime, pricing model, pravna struktura): razmisli temeljito, traži savet, dokumentuj.

### 8.2. 5-minutno pravilo
Ako odluka zahteva više od 5 minuta razmišljanja i nije nereverzibilna, **bacaj novčić ili biraj uvek prvu opciju**. Vreme razmišljanja je veći trošak od pogrešne odluke koja se može ispraviti.

### 8.3. Eskalacija
Kada se zaglaviš:
1. Pre 30 min: gugluj, čitaj StackOverflow, čitaj relevantni dokument iz ovog plana
2. Posle 30 min: pitaj educator-konsultanta ili Claude
3. Posle 2 sata: skrati feature na manju verziju koja ti ne ulazi u problem

Ne treba da budeš heroj. Ako blokira nešto, idi okolo.

---

## 9. Etika

Možeš da staviš ovo u zaglavlje TOS-a, ali to je više ono što ti samom važi:

- **Ne lažemo o rezultatima**. Ako je dete na 47%, kažemo 47%, ne ulepšavamo.
- **Ne plašimo decu**. Ne kažemo "propašćeš". Kažemo "ovde je prilika za napredak".
- **Ne plašimo roditelje preko mere**. Naglašavamo prilike, ne katastrofe.
- **Ne prodajemo PII**. Ikad. Ni anonimno.
- **Ne kreiramo zavisnost protiv volje deteta**. Ako roditelj kaže "zaustavi push notifikacije", odmah.
- **Ne ekstrahujemo podatke iz škola** bez saglasnosti.

Etika nije marketing. Etika je interna obaveza koja ti omogućava da spavaš noću.
