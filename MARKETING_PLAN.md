# Marketing — 5ica Pre-Launch

> Praktičan plan za **prikupljanje email-ova roditelja** od trenutka deploy-a do MVP launch-a (cca 6-9 meseci pre prve sezone). Ping me sa "marketing" kad budeš spreman da krenemo.

## Cilj — kvantifikovan

**Do februara 2027** (60 dana pre prve sezone):
- 30.000-50.000 sign-ups na waitlist
- 30%+ od toga su roditelji 8-gradera (~10.000-15.000 osmaka)
- 3.000+ Instagram followera
- FB grupa "Roditelji osmaka 2027" sa 1.000+ aktivnih članova

**Konverzija do Sprint-a (mart-jun 2027)**:
- 5%+ konverzija free → Sprint = **400-560 Sprint kupaca u Y1**

---

## Faza 0 — Setup (1-2 sata, danas/sutra)

### Instagram

- [ ] Registruj `@5ica.app` ili `@5icapitanja` (proveri dostupnost)
- [ ] Postavi profilnu sliku (5ica logo)
- [ ] Bio: *"Vežbaj za peticu. Aplikacija za pripremu male mature 1-8. razred. 🚀 Lansiranje 2026."*
- [ ] Linktree (ili samo direktni link na 5ica.rs kad bude live)
- [ ] Switch na Business profile za insights

### Facebook

- [ ] Kreiraj **Page** "5ica"
- [ ] Kreiraj **Grupu** "Roditelji osmaka 2027" (privatna grupa, moderirana)
  - Pravila: bez prodaje, bez spam-a, samo razgovor o pripremi mature
  - Ti si admin, kasnije dodaješ moderatore
- [ ] Cross-post Page sa Insta-om

### TikTok

- [ ] Registruj `@5ica` (cross-posting Insta Reels-a)
- [ ] Bez velikih očekivanja u Y1, ali rezerviši ime sad

### Email lista

V0 koristi Web3Forms (kako je već postavljeno). Email-ovi stižu u tvoj inbox.

Ručno održavaš listu u Excel-u/Notion-u:
- Email
- Datum signup-a
- Source (sa koje stranice — već imamo source field u WaitlistForm)

Kad bude vreme za pravi backend (Y0.5), migriraćemo u MongoDB + Resend.

---

## Faza 1 — Content kickstart (30 dana, ovaj mesec)

### Cilj
- 30 Instagram Reels objavljeno (1 dnevno)
- 8 FB Group post-ova (2/nedelja)
- 4 blog post-a na 5ica.rs/blog (kasnije, kad MVP dodamo blog)
- 1 PDF magnet "10 najtežih pitanja sa prošle male mature"

### Sadržaj engine — kako da imaš 30 Reels-a brzo

Imaš **8.428 pitanja** u bazi. Skripta može da ekstraktuje:
- Pitanje + tačan odgovor + 2-3 wrong answers
- Generiše JPG slajd za Reel (Canva template + dynamic text)
- Generiše caption sa hashtag-ima

Kad budeš spreman da pokrenem, javi — napravim:
- `scripts/extract-content.ts` skripta
- Canva template (može i SVG-based generated image)
- Caption template

### Reels format ideje

**60% — Pitanje dana**
```
[Slide 1 — pitanje, 5s]
[Slide 2 — pauza, 3s, "Razmisli..."]
[Slide 3 — tačan odgovor + ka mema/animacija]
```
Music: trending educational sound

**20% — Kako da rešiš**
```
[Slide 1 — težak zadatak]
[Slide 2-4 — korak po korak rešenje]
[Slide 5 — "Sledeći put pitanje, follow"]
```

**10% — Saveti za roditelje**
```
"3 stvari koje pomažu detetu pred maturu"
```

**10% — Iza scene / brand**
```
"Kako gradimo 5ica" — autentični vlogovi
```

### Hashtag strategija

Lokalni:
- #malamatura
- #malomaturu
- #priprematatu
- #osnovnaškola
- #đakprvak
- #Srbija
- #priprematematice
- #srpskazadecu

Globalni (manji weight, ali broader reach):
- #education
- #studytok
- #math

---

## Faza 2 — Email magnet (1 dan)

**Cilj**: Konverziona stranica sa PDF download-om u zamenu za email.

### PDF: "10 najtežih pitanja sa prošle male mature 2026"

10 stranica, design u Canva ili Figma:
- Naslovna sa 5ica logom
- 10 pitanja (sa odgovorima dole)
- Završna stranica sa CTA "Pridruži se beti"

Koristiš pitanja iz baze, izaberi top 10 najteža (level "H" + low correct rate).

### Implementacija na sajtu

Dodajemo novu marketing rutu `/pripremni-pdf`:
- Hero sa preview-om PDF-a
- Email forma (ista WaitlistForm sa `source="pripremni-pdf"`)
- Posle submit-a: email sa PDF link-om (Web3Forms može ovo)

### Promocija PDF-a
- Pin u Instagram bio
- Highlight na Insta story
- Post na FB grupu
- "Bonus" CTA na svakoj sajt stranici

---

## Faza 3 — Soft launch (kraj meseca)

Kad sajt bude live na 5ica.rs (vidi `DEPLOYMENT.md`):

### Launch dan (subota uveče, kad ljudi listaju FB)

**18:00** — Email blast na waitlist (ako je već nešto skupljeno):
- Subject: *"5ica.rs je live — vežba za peticu počinje"*

**18:30** — Instagram + TikTok announcement Reel:
- 60s, "Šta gradimo i zašto"

**19:00** — FB Page + Group post:
- Long-form ("Zdravo svi, mi smo 5ica...")

**20:00** — Aktiviraj Meta ads (50€/dan budget za prvih 7 dana):
- Targeting: roditelji 35-50, deca 11-15, Srbija
- Creative: Reel video sa captionom
- Cilj: sign-up

**Daily monitoring** prvih 7 dana:
- Sign-ups (cilj: 500 u prvoj nedelji)
- D7 retention iz dev-tool ne možemo meriti dok nemamo MVP

---

## Faza 4 — Steady state (mes 2-6)

### Daily
- 1 Instagram Reel + Stories
- Comment reply-i u 1h

### Weekly
- 1 FB Group post (vrednost-driven, ne marketing)
- Insta Live nedeljno (kad imamo testimonials u Y0.5)

### Monthly
- Blog post (kad implementiramo blog)
- Newsletter na waitlist
- Performance review (sign-ups, source breakdown, CAC)

---

## Faza 5 — Pre-sezonska kampanja (jan-feb 2027)

(Detaljno u `implementation-plan/14_MARKETING_GROWTH.md`)

Kratko:
- Targetirano FB ads samo za 8-grade roditelje
- Email kampanja: "Mala matura 60 dana"
- Spremnost % počinje da se prikazuje u app-u (8-grade only)
- Early bird Sprint live od 1. februara

---

## Sezona (mart-jun 2027)

(Vidi `implementation-plan/18_LAUNCH_PLAYBOOK.md` sekcija 5)

Glavni budžet: **150-300k RSD ukupno za sezonu**
- 60% Meta ads
- 30% Google Ads (intent search "mala matura priprema")
- 10% TikTok

ROAS target: **3:1**

---

## Tools koji su nam potrebni

| Tool | Cena | Setup vreme |
|---|---|---|
| Buffer ili Later (scheduling) | $15/mes | 30 min |
| Canva Pro | $13/mes | 1h |
| Notion ili Airtable (CRM) | Free | 30 min |
| Meta Business Suite (FB+IG ads) | Free | 1h |
| Google Analytics + Search Console | Free | 30 min |

**Preporuka**: počni sa **Buffer free trial** + Canva Pro. Ostatak može i besplatno.

---

## Troškovi marketinga (Y1 do prve sezone)

| Stavka | Mesečni | Ukupno (12 mes) |
|---|---|---|
| Meta ads | 50-150€ | 600-1.800€ |
| Google Ads (samo sezona) | 0-100€ | 300-500€ (ukupno) |
| Tools (Buffer, Canva) | $30 | $360 |
| Influencer partnerships (Y0.5+) | varijabilno | 200-500€ |
| **Total budžet Y1** | | **~1.500-3.000€** |

To je realan budžet za bootstrap fazu. Skaliraj kako sign-ups raste.

---

## KPI tracking — manualni za sad, automatski u MVP

Nedeljno proveravaj:
- Total sign-ups
- Sign-ups po source-u (homepage / sprint / za-roditelje / ...)
- IG followers + engagement rate
- FB Group članovi + post engagement
- Email open rate (kad pošaljemo prvi newsletter)
- Top performing Reel / post

Mesečno:
- CAC (cost per signup) iz Meta ads
- 8-grade % u bazi
- Geographic breakdown (Beograd / NS / Niš / ostatak)

---

## Sledeći konkretan korak

1. **Deploy sajta** (`DEPLOYMENT.md`) — 30 minuta posla
2. **Setup Instagram + FB grupu** — 1-2 sata
3. **Sadržaj generator skripta** — javi mi kad si spreman, napravim sa Canva template-om
4. **Prvih 10 ručno-kreiranih Reels-a** dok skripta nije gotova — 1-2 sata u Canva-i
5. **Email magnet PDF** — 4-6 sati u Figma/Canva

Ukupno do prvog sign-up-a: **~2 dana posla raspoređena**.

---

## Y1 → Y2 → Y3 marketing growth cilj

| Sezona | Y1 (2027) | Y2 (2028) | Y3 (2029) |
|---|---|---|---|
| Cilj sign-ups | 30-50k | 100-150k | 250-300k |
| 8-graderi | 5-7k | 15-20k | 35-40k |
| Sprint kupci | 400-560 | 1.800-2.400 | 5.250-6.000 |
| Marketing budžet | 1.500-3.000€ | 6-10.000€ | 15-25.000€ |

Konverzija raste sa brand recognition-om. Y1 je bootstrap, Y3 je matura tržište.
