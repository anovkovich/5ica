# 12 — Payments

## Cilj

Kompletan flow plaćanja za Sprint paket: NBS QR kod, manuelna potvrda, automatsko aktiviranje, edge cases (duplikati, pogrešni iznosi).

---

## 1. V1 strategija — NBS IPS QR

### 1.1. Zašto NBS QR

- Domestic plaćanje, deluje sa svim srpskim bankama
- Niska / nula provizija (samo standardna bankovna)
- Bez payment processor middleman-a (Stripe, Visa Direct)
- Pravno: korisnik plaća direktno na tvoj račun
- Operativno: ti vidiš uplatu u svom bank statement-u, manuelno potvrdjuješ u admin panel-u

### 1.2. Manjak (i kako ga prevazići)

- Nije sinhrono (kupac ne vidi "uspešno" odmah)
- Treba manuelna potvrda (ti ili VA)
- Email konfirmacija dolazi za 24h (ne instant)

### 1.3. Šta NIJE NBS QR

- NIJE kreditna kartica (Visa/Mastercard)
- NIJE PayPal (ne radi za RS sa naplatom)
- NIJE Bitcoin/crypto

V1 = samo NBS QR. Y2 = razmišljaj o online card processor-u.

---

## 2. NBS IPS QR specifikacija

### 2.1. Format

NBS IPS QR je QR kod sa NBS-specifičnim tekstualnim payload-om:

```
K:PR|V:01|C:1|R:160000000000000099|N:Mala Matura|I:RSD499000|SF:189|S:Sprint paket|RO:97MK20270001
```

Polja:
- `K:PR` — verzija
- `V:01` — type
- `C:1` — currency code
- `R:` — IBAN broj račun (tvoj)
- `N:` — naziv primaoca
- `I:` — iznos (RSD bez decimala, 499000 = 4990 RSD)
- `SF:` — model (189 = standardni)
- `S:` — svrha (slobodan tekst)
- `RO:` — referenca/poziv (mora biti unique po uplati)

### 2.2. Generation

Library: **`@nbs-rs/ips-qr`** (ako postoji, ili pišeš svoju)

Ili:
- Generiši payload string
- Encode u QR kod (kroz **`qrcode`** npm paket)
- Renderuj kao SVG ili PNG za prikaz

### 2.3. Validacija

Pre slanja korisniku, validiraj:
- IBAN tačan (tvoj račun)
- Iznos = (`amountRsd * 100`) string
- Poziv unique
- Maksimalni broj karaktera u svrsi

### 2.4. Reference broj format

Naša konvencija:
```
SPRINT-{childInitials}-{year}-{purchaseSeq}
```

Primer: `SPRINT-MK-2027-0234`

- SPRINT — type
- MK — Marko initials
- 2027 — sezona
- 0234 — sequential broj kupaca te sezone

Format mora biti razumljiv u admin panelu i unique.

---

## 3. Purchase flow (kompletan)

### 3.1. Korak 1 — Klijent inicira

Roditelj iz Sprint info strane:
1. Klikne "Rezerviši Sprint"
2. Bira dete (ako ima više)
3. Vidi cenu (4.990 ili 3.990 early bird)
4. Klikne "Plati"

### 3.2. Korak 2 — Backend kreira purchase

```typescript
POST /api/sprint/kupi
Body: { childId: ObjectId, earlyBird: boolean }

// Backend:
1. Validate child belongs to parent
2. Validate child is in 8th grade
3. Determine amount: earlyBird ? 3990 : 4990
4. Generate referenceCode: "SPRINT-MK-2027-0234"
5. Generate IPS QR payload
6. Create Purchase document with state="pending"
7. Return: { purchaseId, qrPayload, qrImageUrl, referenceCode, amountRsd, instructions }
```

### 3.3. Korak 3 — Klijent prikazuje QR

Posebna stranica `/roditelj/sprint/[purchaseId]/plati`:

```
┌─────────────────────────────────┐
│ Plaćanje: 3.990 RSD             │
│ Sprint paket za Marka           │
├─────────────────────────────────┤
│  [QR KOD VELIKI]                │
├─────────────────────────────────┤
│ Skeniraj QR u banking app-u     │
│ (Banca Intesa, OTP, Raiffeisen, │
│  AIK, NLB, Komercijalna...)     │
│                                 │
│ Ili ručno:                      │
│ Račun: 160-XXXXXXX-XX           │
│ Primalac: [Tvoja firma]         │
│ Iznos: 3.990 RSD                │
│ Svrha: Mala Matura Sprint       │
│ Poziv na broj: SPRINT-MK-2027-  │
│                0234             │
│ Model: 97                       │
│                                 │
│ [Kopiraj sve podatke]           │
├─────────────────────────────────┤
│ Status: ⏳ Čeka uplatu           │
│                                 │
│ Posle uplate:                   │
│ • Sprint će biti aktiviran      │
│   za 24h                        │
│ • Email potvrda na...           │
└─────────────────────────────────┘
```

### 3.4. Korak 4 — Roditelj plati u banking app-u

User otvori svoj banking app (Banca Intesa npr.), skeniraju QR, potvrde uplatu.

### 3.5. Korak 5 — Ti vidiš uplatu

U svom bank statement-u (ili banking notifikaciji):
- "Primljena uplata 3.990 RSD"
- "Poziv: SPRINT-MK-2027-0234"
- "Pošiljalac: [Roditeljevo ime]"

### 3.6. Korak 6 — Manuelna potvrda

U admin panelu (vidi `13_ADMIN_PANEL.md`):
1. Sekcija "Pending uplate"
2. Vidiš listu pending purchase-eva
3. Za svaku, klikneš "Potvrdi uplatu"
4. Backend ažurira state="active", aktivira Sprint
5. Šalje email roditelju "Sprint je aktiviran"

### 3.7. Korak 7 — Klijent vidi aktivaciju

Auto-poll svaki 30s (ili push):
- Status "Active"
- "Sprint je aktiviran! Možeš početi"
- Redirect ka dashboard-u

### 3.8. Korak 8 — Sprint period počinje

Vidi `10_SPRINT_PRODUCT.md` Activation flow.

---

## 4. Edge cases

### 4.1. User ne plati

- After 7 dana: status="cancelled"
- Auto-email: "Tvoja rezervacija je istekla. Možeš ponovo rezervisati"

### 4.2. Pogrešan iznos

User uplati 3.000 umesto 3.990:
- Admin vidi razliku u panelu
- Email kontakt user-u: "Treba 990 RSD još"
- Ako user plati razliku → activate
- Ako ne → refund full + cancel

### 4.3. Pogrešan poziv

User plati bez tačnog poziva:
- Admin manuelno match-uje po iznosu + imenu
- Težak slučaj — možda treba kontakt user-a

### 4.4. Više uplata istog poziva (dupli klik)

User pošalje 2 uplate iste:
- Prvu activate
- Drugu refund (vraća 3.990)
- Email "Vraćamo dupliranu uplatu"

### 4.5. Refund posle aktivacije (case-by-case)

User traži refund posle aktivacije:
- **V1 polise**: nema automatskog refund-a niti garancije. Sprint je jednokratan paket.
- **Edge cases** koji opravdavaju manuelni refund (case-by-case, support discretion):
  - Dete je preminulo, hospitalizovano, ili drugi force majeure
  - Dete je promenilo školu i ne polaže maturu u Srbiji
  - Tehnički problem sa naše strane koji onemogućava korišćenje
- Refund (kad se dogovori) se izvršava manuelno, bank transfer
- Ne komuniciramo refund opciju u marketing materijalu

---

## 5. Računovodstvo

### 5.1. Format pribora

Svaka uplata mora imati:
- Datum
- Iznos
- Pošiljalac
- Poziv na broj
- Bank statement screenshot (ili API export)

### 5.2. Mesečni izveštaj

Excel ili PDF sa:
- Sve uplate ovog meseca
- Refund-ovi
- Net iznos
- Poreska osnovica

### 5.3. Paušalac obaveze

Ako si paušalac:
- Mesečno: kvitanca o uslugama (svaka kupovina = 1 kvitanca)
- Tromesečno: poreska prijava
- Računovođa pomaže (~5-10k RSD/mes)

### 5.4. DOO obaveze (Y2)

Posle 1M RSD/mes prihoda:
- Pređi na DOO
- PDV registrovan ako prihod > 8M RSD/godišnje (verovatno Y3)
- Računovođa full-time obavezno

---

## 6. Online plaćanja (Y2 plan)

### 6.1. Kandidati

| Provider | Plus | Minus |
|---|---|---|
| **NestPay** (UniCredit) | Lokalni, dobro za RS | Setup složeniji |
| **Monri** | Modern API, dobre dokumentacije | Provizija 1.5-2% |
| **Stripe** | Najbolji DX | Ne podržava RS pravna lica direktno (workaround: registracija u EU) |
| **AllSecure** | Lokalni | Stara API |

### 6.2. Preporuka za Y2

**Monri** za balansa između DX i lokalnih potreba.

### 6.3. Migration plan

- Y1: samo NBS QR
- Y1 leto: setup Monri (paralelno sa NBS QR-om kao backup)
- Y2 sezona: oba dostupna, predlažemo Monri kao default

---

## 7. Post-matura email (samo za pohvale, ne refund)

Email roditelju (jul 2027):
- "Hvala što si verovao u nas"
- Pitanje: "Kakav je rezultat male mature?"
- Ako pozitivan rezultat → "Pošalji testimonijal" CTA
- Ako negativan → empatska poruka, link na kontakt

**Bez automatske refund mehanike.** Komunikacija je za:
- Sakupljanje testimonijala (pozitivni)
- Sakupljanje insight-a (gde je sistem pao)
- Direktna komunikacija sa support-om za edge cases

---

## 8. Otvorena pitanja

- [ ] Da li trebamo formalni "ugovor o pružanju usluge" za svaku Sprint kupovinu? **Preporuka: dovoljan je TOS + email potvrda. Ali konsultuj advokata pre lansiranja.**
- [ ] Kako handle-ujemo VAT (PDV) ako pređemo prag? **Y3 problem. Trenutno paušalac < 8M RSD nije obveznik PDV-a.**
- [ ] Da li dodajemo crypto plaćanje? **NE. Niko u Srbiji ne plaća za edu app sa Bitcoin-om.**
- [ ] Da li bilo kakvu opciju za rate plaćanja (3 rate)? **Možda u Y2. Prelazi 4.990 nije veliki za 1 rata, čekaj sa tim.**
