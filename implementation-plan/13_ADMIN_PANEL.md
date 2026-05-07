# 13 — Admin Panel

## Cilj

Internal alati koji omogućavaju da operišeš proizvod sam ili sa malim timom: potvrda uplata, content management, moderacija, support.

---

## 1. Pristup

### 1.1. Auth

- Posebna ruta: `admin.malamatura.app` (subdomen)
- IP whitelist (samo tvoja kuća, kancelarija, VPN)
- Posebna autentifikacija sa 2FA (Google Authenticator)
- Sessions kraće (1h, refresh sa 2FA)

### 1.2. Roli

- `superadmin` — ti, sve pristupe
- `support` (Y2) — VA koji pomaže sa support tikt-ovima
- `moderator` (Y2) — educator-konsultant, pristup samo content-u

---

## 2. Glavne sekcije

### 2.1. Dashboard

```
┌──────────────────────────────────────┐
│ Mala Matura Admin                    │
├──────────────────────────────────────┤
│ Danas:                               │
│ • 47 novih korisnika                 │
│ • 12 sprint kupovina (4 pending)     │
│ • 423 aktivne sesije                 │
│ • 89 AI explanation requests         │
│                                      │
│ Pažnja:                              │
│ ⚠ 3 pending uplate čekaju potvrdu   │
│ ⚠ 1 refund zahtev                   │
│ ⚠ 5 flagged pitanja                 │
├──────────────────────────────────────┤
│ Brzi pristup:                        │
│ [Uplate] [Refunds] [Content] [Users] │
└──────────────────────────────────────┘
```

### 2.2. Pending uplate (najvažnije!)

```
Pending Sprint Uplate (4):

┌──────────────────────────────────────┐
│ SPRINT-MK-2027-0234   3.990 RSD      │
│ Roditelj: aleksandra@gmail.com       │
│ Dete: Marko, 8. razred               │
│ Kreirano: 2027-02-15 14:23           │
│ [Vidi bank statement] [Potvrdi]      │
├──────────────────────────────────────┤
│ SPRINT-PJ-2027-0235   4.990 RSD      │
│ ...                                  │
└──────────────────────────────────────┘
```

**Akcije**:
- "Potvrdi" → state=active, šalje email
- "Odbi" → state=cancelled, razlog notes
- "Kontakt" → otvara mailto sa template-om

**Helper**:
- Ako je integrisan banking API: prikaže "Match: pronađena uplata SPRINT-MK-2027-0234 na 2027-02-15"
- Bez API-ja: ti ručno proveriš statement, klikneš potvrdi

### 2.3. Refund zahtevi

```
Refund Zahtevi (1):

┌──────────────────────────────────────┐
│ SPRINT-MK-2027-0234   2.495 RSD      │
│ Status: Posted matura, eligible      │
│ Roditelj: aleksandra@gmail.com       │
│ Plan compliance: 78% (eligible)      │
│ Dokumentacija: ✓ (slika izveštaja)   │
│ Komentar: "Marko je dobio 35/100"    │
│                                      │
│ [Pregledaj sliku] [Approve] [Reject] │
└──────────────────────────────────────┘
```

**Akcije**:
- "Approve" → mark refunded, email roditelju + ti pošalješ bank transfer
- "Reject" → razlog, email sa objašnjenjem

### 2.4. Korisnici

Search interface:
- By email
- By displayName / nickname
- By ID

User detail page:
- Osnovni podaci
- Statistika (XP, level, streak)
- Sve sesije (paginated)
- Sve odgovore (sa filtering)
- Sprint statusi
- Notifications log
- Audit log (sve akcije)

Akcije:
- Soft delete account
- Restore deleted
- Password reset (n/a, koristimo magic link)
- Force logout (invalidate sve sesije)
- "Pošalji magic link" (helper za support)

### 2.5. Content management

#### Predmeti / Klase / Poglavlja

- View only (rare changes)
- Edit ime, opis, redosled

#### Pitanja

```
Pitanja (8.428 total):
[Search] [Filter: Subject ▼] [Filter: Grade ▼] [Filter: Status ▼]

┌──────────────────────────────────────┐
│ ID: ... | Mat 8. | Razlomci          │
│ "Površina kvadrata sa stranicom 5cm" │
│ Tačan: 25 cm² | Težina: M            │
│ Stats: 1.234 prikaz, 67% accuracy    │
│ [Edit] [Flag] [Deactivate] [History] │
└──────────────────────────────────────┘
```

**Akcije**:
- Edit pitanje (rar slučaj)
- Flag (queue za pregled)
- Deactivate (state=false, neće se pojavljivati)
- "Regenerate AI explanation" (ako je staro objašnjenje loše)

#### AI explanations

- Lista svih explanation-a
- Filter "not helpful" (>3 negativne)
- Edit ručno ili "Regenerate"

#### Mock testovi

- Kreiraj novi mock test (forma + pick pitanja)
- Edit postojeći (samo pre nego što ga neko počne)
- Delete (samo ako niko nije koristio)

### 2.6. Analitika

(Pojednostavljeno — pravi analytics u PostHog)

Quick stats:
- Sezonska konverzija (free → sprint)
- DAU, WAU, MAU
- Per-grade breakdown
- Revenue by week

### 2.7. Notifications

- Šalji manuelnu poruku grupi:
  - Filter: free 8-graderi koji su aktivni
  - Template: pre-built ili custom
  - Šalji email, push, ili oba
- Useful za:
  - Sezonska kampanja
  - Hitne najave (npr. "Sprint ekstra mock test")

### 2.8. Audit log

Sve admin akcije logirane:
- Ko, kada, šta
- Read-only za sve osim superadmin

---

## 3. Bank statement integration (opcija)

### 3.1. V1: Manuelno

- Ti pregledaš bank statement svaki dan
- U admin panelu klikneš "Potvrdi" za svaki match

### 3.2. V2: Banking API

Ako tvoja banka ima API (Banca Intesa, OTP imaju):
- Daily pull statement
- Auto-match po referenceCode
- Pre-populated "Potvrdi" gotov, ti samo verifikuj

V2 ili Y3, ne hitno.

---

## 4. Customer support workflow

### 4.1. Support tikets (V1 = Email)

- Korisnici kontaktiraju kroz `podrska@malamatura.app`
- Forwarduje se ka tebi
- Ti odgovaraš

### 4.2. Support tools (V2 = Crisp ili Intercom)

V2: integracija chat tool-a, ali kasnije.

### 4.3. Common tickets

- "Dete ne može da uđe" → resend magic link
- "Greška u plaćanju" → check pending uplate
- "Greška u pitanju" → flag, pregledaj
- "Refund zahtev" → vidi 2.3

### 4.4. Self-service knowledge base

V2: FAQ sekcija + chatbot (ako Y3).

---

## 5. Operativne procedure

### 5.1. Daily routine (sezona)

- Jutro: pregledaj pending uplate, potvrdi
- Jutro: pregledaj refund zahteve
- Popodne: pregledaj flagged pitanja
- Veče: brz pregled support email-a

### 5.2. Weekly routine

- Ponedeljak: review proteklog nedelje (analytics, KPIs)
- Sreda: content quality (sample 50 AI explanation-a)
- Petak: backup, tech health check

### 5.3. Monthly routine

- 1. u mesecu: računovodstveni izveštaj
- 1. u mesecu: marketinški review (CAC, conversion)
- Sredina meseca: roadmap update

---

## 6. Tech stack za admin

- Same Next.js codebase, samo `(admin)` route group
- Auth middleware za admin role check
- Tailwind UI komponente za admin (admin-prefixed komponente)
- shadcn/ui Table, Form, Dialog za admin alate

---

## 7. Otvorena pitanja

- [ ] Da li support delegirati VA odmah ili sam radim Y1? **Sam Y1, VA u Y2**.
- [ ] Da li koristimo postojeći helpdesk SaaS ili gradimo svoj? **V1 = Email + admin panel. V2 = Crisp ili Intercom**.
- [ ] Audit log retention? **2 godine** (za pravne potrebe).
