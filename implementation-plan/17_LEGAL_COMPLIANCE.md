# 17 — Legal & Compliance

## Cilj

Sve pravne i regulatorne stvari koje moraju biti dovršene **pre nego što se uzme prvi dinar**. Ovo je gating dokument — bez ovih stavki, ne lansiramo.

---

## 1. Kritične zavisnosti (gating)

### 1.1. Mora biti gotovo pre prvog plaćenog korisnika

- [ ] Ugovor o ustupanju autorskih prava sa prijateljem (pitanja iz JSON-a)
- [ ] TOS (Pravila korišćenja) na sajtu
- [ ] Privacy Policy (Politika privatnosti) na sajtu
- [ ] Parental consent flow za maloletnike
- [ ] Pravna registracija (paušalac ili DOO)
- [ ] Bank račun za primanje uplata

### 1.2. Mora biti gotovo do prve sezone (mart 2027)

- [ ] Cookie consent banner (ako EU saobraćaj značajan)
- [ ] Refund policy detaljna i objavljena
- [ ] Komercijalna polisa "Iskazana cena", "Garantija prolaza" — pravna forma
- [ ] Računovođa angažovan (paušalac)
- [ ] Test plaćanje sa stvarnom uplatom verifikovan

---

## 2. Pravna struktura

### 2.1. V1 — Paušalac (preduzetnik paušalno oporezovan)

**Prednosti**:
- Najjednostavniji da se osnuje (1 dan)
- Mali troškovi (~5-10k RSD/mes računovodstvo)
- Limit prihoda: 6M RSD/godišnje (više od dovoljno za Y1)
- Nema PDV ako prihod < 8M RSD

**Procedura**:
1. APR registracija (online, 5.000 RSD)
2. Definicija delatnosti: "85.59 — Ostali oblici obrazovanja"
3. Otvori bank račun za delatnost (paušalca može i lični)
4. Postavi paušalnu poresku obavezu sa Poreskom upravom
5. Računovođa angažovan za godišnje izveštaje

**Trošak setup-a**: ~10-15k RSD jednom

### 2.2. V2 — DOO (Y2)

Kad prihod prelazi ~1M RSD/mes (Y2):
- Pređi na DOO
- Početni kapital: 100 RSD (formalan minimum)
- Setup: 30-50k RSD (advokat + APR)
- Mesečni overhead: 50-80k RSD (računovođa, pravne usluge)
- Porez na dobit: 15%

### 2.3. Otvorena pitanja

- [ ] Računovođa preporuka — pitati u FB grupama startup-a u Beogradu
- [ ] Da li delatnost "85.59" je optimalna? Verifikuj sa računovođom

---

## 3. Ugovor o ustupanju autorskih prava (KRITIČAN)

### 3.1. Kontekst

Tvoj prijatelj je autor 8.428 pitanja. Da bi mogao da ih komercijalno koristiš, **mora da ti formalno ustupi autorska prava** (ili da ti dâ licencu).

### 3.2. Šta ugovor mora da sadrži

**Standardni elementi**:
- Identifikacija strana (autor i ti)
- Predmet (8.428 pitanja, sa specifikacijom — npr. JSON fajl + hash)
- Vrsta prenosa: ustupanje (full transfer) ili licenca (može biti exclusive)
- Teritorija: ceo svet
- Trajanje: bez ograničenja
- Naknada: simbolična (1 RSD ili konkretna suma — vidi 3.3)
- Garancija da je on stvaran autor (warranty)
- Klauzula o moralnim pravima (deo koji ne može biti prenet po srpskom pravu)
- Saglasnost za izmenu (ti možeš da menjaš pitanja)

### 3.3. Naknada — opcije

**Opcija A**: Simbolična (1 RSD, "iz prijateljskih odnosa")
- Najjednostavnije
- Pravno valid u Srbiji

**Opcija B**: Royalty
- 5-10% prihoda od proizvoda koji koristi pitanja
- Dobro za long-term partnerstvo
- Komplikuje računovodstvo

**Opcija C**: Jednokratna naknada
- Npr. 50.000-100.000 RSD jednokratno
- Čisto, sigurno, definitivno

**Preporuka**: Razgovaraj sa prijateljem. Ako je verodostojan friend, opcija A. Ako želi nešto, opcija C sa cenom za koju oboje saglasi.

### 3.4. Format

- 2 originala (po jedan svaki)
- Pisana forma (zakon zahteva)
- Verifikovan kod javnog beležnika (NE obavezno, ali jako preporučujem za paranoju)

### 3.5. Akcija

**Pre prvog plaćenog dinara**:
1. Razgovaraj sa prijateljem
2. Konsultuj advokata (1-2 sata, 5-10k RSD)
3. Sastavi ugovor (template + customizing)
4. Potpiši i overi (advokat ili javni beležnik)
5. Skeniraj, čuvaj kopiju u 3 mesta

**Ne kasnije od februara 2027** (pre prve Sprint sezone).

---

## 4. TOS (Pravila korišćenja)

### 4.1. Šta TOS mora da pokrije

- Ko može da koristi servis (deca + roditelji, sa parental consent)
- Šta servis radi (description)
- Šta korisnik sme/ne sme (npr. ne hack-uj, ne deli accounts)
- Naša odgovornost (limited)
- Sprint paket — uslovi, edge cases (duplikati, pogrešni iznosi)
- Plaćanje — kako i kad
- Izmene TOS-a (notification rule)
- Solenje sporova (Beograd nadležan sud)
- Kontakt

### 4.2. Format

- Srpski jezik (latinica primarno, ćirilica verzija dostupna)
- Jasno, ne pravnički zatvoreno
- Linkovi na sve relevantne sekcije
- Datum poslednje izmene

### 4.3. Akcija

1. Pisaj prvi draft sam (na osnovu javnih TOS-a Khan Academy, Duolingo)
2. Konsultuj advokata (5-10k RSD)
3. Final verzija na sajtu pre prvog korisnika
4. Re-verifikuj svaki kvartal

### 4.4. TOS template structure

```
1. Definicije
2. Prihvatanje uslova
3. Naš servis (šta nudimo)
4. Pristup i registracija
5. Maloletnici (specifična pravila)
6. Plaćanje (Sprint)
7. Sprint paket (uslovi, šta uključuje, edge cases)
8. Korišćenje pravilno (acceptable use)
9. Intelektualna svojina (nas i korisnika)
10. Odgovornost
11. Završetak naloga
12. Izmene
13. Kontakt i sporovi
```

---

## 5. Privacy Policy

### 5.1. Mora da pokrije

- Koje podatke prikupljamo
- Zašto ih prikupljamo
- Kako ih čuvamo
- Sa kim ih delimo (Resend, PostHog, MongoDB Atlas, itd.)
- Kako ih korisnik može da pristupi / izbriše (GDPR + Srpski Zakon o ZP)
- Cookies (lista)
- **Specifično za decu**: parental consent, ograničena upotreba podataka

### 5.2. Srpski Zakon o zaštiti podataka

Bazu na GDPR-u, ali Srbija ima specifičan zakon:
- Mora **service za maloletnike imaju pisanu saglasnost roditelja**
- Roditelj ima pravo na pristup podacima deteta
- Roditelj ima pravo da zatraži brisanje
- Pravo na zaboravljanje
- Pravo na portabilnost podataka

### 5.3. Šta ČUVAMO

| Podatak | Pravna osnova | Trajanje |
|---|---|---|
| Roditeljev email | Saglasnost (signup) | Do brisanja naloga |
| Detetov nadimak | Saglasnost roditelja | Do brisanja |
| Kviz odgovori | Performans usluge | 5 godina (ili do brisanja) |
| Bank statements (uplate) | Pravna obaveza (5 god po Zakonu o knjigovodstvu) | 5 godina |
| Audit logs | Sigurnost | 2 godine |
| Email konverzacije sa support-om | Operativno | 2 godine |

### 5.4. Šta NE čuvamo

- IP adrese (anonimizovane: poslednji oktet 0)
- Pravo ime deteta (samo nadimak)
- Tačan datum rođenja (samo godina)
- Geo-lokaciju (osim grada IZ IP-a, za regional content)
- Slike sa kamera (svojevoljno: avatar je iz biblioteke)

### 5.5. Akcija

1. Sastaviti draft (template + customizing)
2. Advokat pregled (5-10k RSD, kombinovati sa TOS-om)
3. Final verzija na sajtu
4. Cookie banner ako EU saobraćaj značajan

---

## 6. Parental consent flow

### 6.1. Specifičnost zbog dece

Po zakonu (i etičkom standardu), maloletnici < 14 godina ne mogu da daju saglasnost sami. Roditelj mora da to uradi.

U našem slučaju, dete < 14 godina = **svi 1-7. razred**, plus deo 8. razreda.

### 6.2. Implementacija

**Roditelj se prvi registruje**:
1. Email
2. Magic link
3. **Eksplicitna saglasnost** sa checkbox-om:
   - "Razumem i prihvatam Pravila korišćenja i Politiku privatnosti"
   - "Dajem saglasnost za kreiranje naloga za moje dete i obradu njegovih podataka kako je navedeno u Politici privatnosti"
4. Posle saglasnosti — može da kreira detetov nalog

### 6.3. Bez ovoga ne lansiramo

Bez parental consent flow-a:
- Pravna izloženost (potencijalna kazna od Komisije za ZP do 2M RSD)
- Etička greška
- Reputacioni rizik

**Akcija**: ovo je **Faza 1 MVP requirement**, ne odlažu.

---

## 7. Cookie compliance

### 7.1. Cookies koje koristimo

- `mm_session` — auth (essential, no consent needed)
- PostHog — analytics (consent needed za EU)
- Resend — email tracking (consent needed)

### 7.2. Cookie banner

V1: jednostavan banner sa:
- "Koristimo kolačiće za rad servisa i analitiku"
- Linkovi na cookies polisu i privacy policy
- 2 dugmad: "Prihvati sve" / "Samo neophodne"

Tools: jednostavan custom (50 linija TS) ili **CookieYes** (free for small sites).

### 7.3. Implementacija

- Default: samo essential cookies
- Posle consent: aktivira PostHog, etc.
- Choice se čuva u local storage + cookie

---

## 8. Sprint paket — pravna napomena

Sprint je **jednokratan paket usluge** (90-dnevna priprema). Nije pretplata, nije proizvod sa garancijom rezultata.

### 8.1. Pravne formulacije u TOS-u

```
Sprint paket pruža pristup planu učenja, mock testovima, AI alatima i 
roditeljskim izveštajima u trajanju od 90 dana (mart-jun 2027).

Sprint NE garantuje konkretan rezultat na maloj maturi. Aplikacija je
alat za pripremu — uspeh zavisi od angažovanja deteta.

Refund: Sprint je jednokratan paket. Refund je dostupan samo u edge 
case-evima (force majeure, tehnički problem sa naše strane, nemogućnost
korišćenja zbog naše greške) i obrađuje se case-by-case kroz podršku.
```

### 8.2. Šta NE pišemo

- "Garantujemo prolaz"
- "50/100 ili novac nazad"
- "Money-back garancija"
- Bilo kakvo specifično obećanje rezultata

### 8.3. Akcija

- Tekst u TOS-u (sekcija "Sprint paket")
- Tekst na sajtu na Sprint info strani jasno kaže šta dobija (plan, mock, AI), bez obećanja rezultata
- Email potvrda kupovine sadrži šta uključuje, ne garancije

---

## 9. Tax compliance (paušalac)

### 9.1. Mesečne obaveze

- Paušalna porez (određen po delatnosti, ~10-15k RSD/mes)
- Doprinosi za penzijsko, zdravstveno
- Računovođa filuje izveštaje

### 9.2. Godišnje obaveze

- Završni izveštaj
- Izveštaj o prihodu

### 9.3. Limit

- 6M RSD/godišnje za paušalca (ako više, automatski moras pređi na DOO)
- Ako blizu limita, planiraj prelazak DOO

### 9.4. PDV

- Prag: 8M RSD prihoda godišnjeg (Srpski zakon)
- Ako pređeš: registracija PDV obvezna (20% PDV na sve prodaje)
- Y1 si daleko od ovoga, Y2 možda

---

## 10. Trademark i intelektualna svojina

### 10.1. Brand ime

Pre kupovine domena i lansiranja:
- [ ] Provera da li je "Mala Matura" registrovani trademark u Srbiji (ZIS — Zavod za intelektualnu svojinu)
- [ ] Ako nije: registruj svoj trademark (~30k RSD, traje 6 meseci)

**Ako jeste registrovan**: ti ne smeš da koristiš isti, izaberi alternative.

### 10.2. Logo

- Tvoj dizajn = tvoja autorska prava (automatska)
- Ako freelance dizajner, ugovor o prenosu autorskih prava

---

## 11. Maloletničke specifičnosti (Srbija + EU)

### 11.1. Srpski Zakon o zaštiti podataka — član 19 (saglasnost)

Za maloletnike < 14 godina:
- Pisana saglasnost roditelja obavezna
- Mora biti u jasnoj, razumljivoj formi
- Mora navesti tačno koji podaci se obrađuju i zašto

### 11.2. EU GDPR (kompletnost)

Iako je primarno targeting Srbija, ako EU korisnici dolaze:
- Article 8: deca < 16 godina (default; pojedine zemlje 13)
- Pristup za roditelje
- Pravo na brisanje
- Data Portability

### 11.3. Specifične mere

- **Uvek** roditelj treba kontrolu privacy settings za dete
- **Nikad** ne kreiramo profil deteta bez roditelja saglasnosti
- **Anonimne** lige sa nadimcima (ne pravim imenom)
- **Bez chat-a** između dece (već odlučeno)
- **Bez personalizovanih reklama** dete (free verzija ima reklame samo na roditeljskom dashbord-u, ako uopšte)

---

## 12. Crisis legal scenarios

### 12.1. Ako neko tvrdi da su pitanja njegova

1. Stop pokazivanja flagged pitanja
2. Provera ugovora sa prijateljem
3. Konsultuj advokata
4. Pravno: ti imaš ugovor o ustupanju, što ti štiti
5. Ako sumnja održiva: regenerišite spornu pitanja kroz LLM

### 12.2. Ako sigurnosni incident

Privacy data leak:
1. Stop širenja
2. Notifikacija Komisiji za zaštitu podataka u 72h (zakonska obaveza)
3. Notifikacija pogođenih korisnika
4. Public statement
5. Forenzika — kako se dogodilo
6. Mitigacija — kako sprečavamo

### 12.3. Ako pravna pretnja od konkurencije

- Konsultuj advokata, ne reaguj sam
- Dokumentuj sve komunikacije
- Ne brisaj ništa

---

## 13. Akcioni plan

### 13.1. Prvih 7 dana

- [ ] Razgovor sa prijateljem o ugovoru
- [ ] Konsultacija advokata (1h)
- [ ] Trademark check za "Mala Matura"
- [ ] Domain registracija
- [ ] APR registracija paušalca

### 13.2. Mes 1

- [ ] Ugovor o ustupanju potpisan
- [ ] TOS draft → advokat → final
- [ ] Privacy Policy draft → advokat → final
- [ ] Bank račun otvoren
- [ ] Računovođa angažovan

### 13.3. Mes 2

- [ ] Cookie banner implementiran
- [ ] Parental consent flow u app-u
- [ ] Refund policy formal
- [ ] Trademark application (ako prošao check)

### 13.4. Mes 3-4

- [ ] Test paymentom prošao kroz NBS QR
- [ ] Test refund flow tested manualno
- [ ] Sve pravne dokumente verifikovati pre sezone

---

## 14. Otvorena pitanja

- [ ] Da li bilo koji "manjak iskaznih dokumenata" sprema rizik za prvu sezonu? **Mora se proveri pre 1. marta 2027.**
- [ ] Da li trebamo D&O osiguranje za pravne nezgode? **NE u Y1, razmislite u Y2 ako prihod >5M RSD/mes**.
- [ ] Da li potrebna licenca od Ministarstva prosvete? **NE — mi nismo škola, samo edu sadržaj.**
