# Deployment — 5ica Pre-Launch Landing

> Kratak praktičan plan za deploy ovog landing sajta. Ping me sa "deploy" kad budeš spreman.

## Trenutno stanje

- ✅ Lokalni dev server radi (`yarn dev` → http://localhost:3000)
- ⏳ Domain `5ica.rs` — nije kupljen
- ⏳ GitHub repo — nije inicijalizovan
- ⏳ Vercel — nije konektovan
- ⏳ MongoDB Atlas cluster — nije kreiran (nije ni potrebno za V0 landing)
- ⏳ Web3Forms ključ — treba postaviti pre deploy-a

---

## Korak 1 — GitHub repo (5 min)

### Setup
```bash
cd C:\Users\Aleksa\Documents\5ica
git init
git add .
git commit -m "Initial commit: 5ica pre-launch landing"
```

### Kreiraj repo na GitHub
1. Idi na https://github.com/new
2. Naziv: `5ica` ili `5ica-landing`
3. Privatan ili javni — preporuka **privatni** za V0
4. Bez README/license/gitignore (već imamo)
5. Kreiraj

### Push
```bash
git remote add origin https://github.com/[tvoj-username]/5ica.git
git branch -M main
git push -u origin main
```

**Napomena**: NE radim git operacije bez tvoje saglasnosti. Ti pokrećeš ove komande.

---

## Korak 2 — Vercel deploy (5 min)

### Konektuj na Vercel
1. Idi na https://vercel.com/new
2. Import GitHub repo (`5ica`)
3. Framework Preset: **Next.js** (automatski detektovan)
4. Root Directory: ostavi default
5. Build Command: ostavi default (`next build`)
6. Output Directory: ostavi default

### Postavi env varijable u Vercel
Pre prvog deploy-a, dodaj u Vercel Dashboard → Project → Settings → Environment Variables:

| Naziv | Vrednost | Environment |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | tvoj-uuid-iz-web3forms.com | Production, Preview, Development |

### Deploy
- Klikni "Deploy"
- Sačekaj 2-3 min
- Dobiješ URL: `5ica.vercel.app` (ili sa hash-om)

---

## Korak 3 — Web3Forms setup (3 min)

1. Idi na https://web3forms.com
2. Unesi email gde hoćeš signup-ove (npr. `info@5ica.rs` ili tvoj Gmail)
3. Klikni "Create Access Key"
4. Kopiraj UUID
5. **Lokalno**: kopiraj `.env.example` → `.env.local`, dodaj key
6. **Vercel**: postavi key u env varijablama (vidi Korak 2)

**Test signup**: idi na deployed URL, popuni formu, proveri inbox za email.

---

## Korak 4 — Custom domain (kasnije, kad kupiš `5ica.rs`)

### Kupi domain
- Preporučeni registrator za `.rs`: **exo.rs**, **plus.host**, **mozzart.rs** ili sl.
- Cena: ~15-20€/godina

### Konektuj na Vercel
1. Vercel Dashboard → Project → Settings → Domains
2. Dodaj `5ica.rs` i `www.5ica.rs`
3. Vercel ti daje DNS upute (CNAME / A records)
4. Idi na panel registratora, postavi DNS:
   - `5ica.rs` → A record `76.76.21.21` (Vercel)
   - `www.5ica.rs` → CNAME `cname.vercel-dns.com`
5. Sačekaj DNS propagaciju (5 min - 24h, obično <30 min)
6. Vercel automatski izda SSL sertifikat

### Update OG tagova
U `app/layout.tsx`, dodaj `metadataBase`:
```tsx
metadataBase: new URL("https://5ica.rs"),
```

---

## Korak 5 — MongoDB Atlas (kasnije, kad migrara waitlist sa Web3Forms)

V0 koristi Web3Forms (sve emailom u inbox). Kad budemo spremni za pravu bazu:

### Setup (besplatan M0 tier)
1. Idi na https://www.mongodb.com/cloud/atlas
2. Kreiraj nalog
3. Kreiraj M0 cluster (Free tier, 512MB)
4. Region: **Frankfurt** (najbliži Srbiji u EU)
5. Whitelist IP: `0.0.0.0/0` (svi IP-jevi, jer Vercel ima rotirajuće)
6. Kreiraj database user
7. Kopiraj connection string

### Add to Vercel env
- `MONGODB_URI` = `mongodb+srv://...`

### Migrate waitlist code
- Dodaj `lib/db.ts` (Mongoose singleton)
- Dodaj `models/WaitlistSubscriber.ts`
- Zameni Web3Forms POST sa internal API koji upisuje u Mongo + šalje confirmation email

---

## Pre-flight checklist (pre prvog production deploy-a)

- [ ] `.env.local` ima Web3Forms key (lokalni test)
- [ ] `yarn build` prolazi bez grešaka (lokalni test)
- [ ] `yarn lint` prolazi
- [ ] Mobile responsive proveren u Chrome DevTools
- [ ] Sve linkove u footer-u rade
- [ ] Politika privatnosti i Pravila korišćenja prošli quick read
- [ ] Web3Forms test signup → email stiže u inbox
- [ ] OG slika dodana u `public/` (1200x630 PNG)
- [ ] Favicon dodan u `public/`

---

## Y0.5 update — kad MVP počne

Kad budemo gradili pravi app (ne samo landing):

1. Promeni domain strukturu — landing na `5ica.rs/`, app na `5ica.rs/app`
2. Migriraj waitlist data iz Web3Forms u Mongo `waitlistSubscribers` kolekciju
3. Pošalji "vi ste prvi" email celoj listi sa Resend
4. Connect MongoDB Atlas, set up Sentry, set up PostHog
5. Update DNS ako treba subdomena za admin (`admin.5ica.rs`)

Detaljan plan u `implementation-plan/19_ROADMAP_MILESTONES.md`.

---

## Notes

- **Vercel free tier** dovoljan za waitlist sajt do ~10k poseta/mes
- **Vercel Pro** ($20/mes) trebaće tek pre prve sezone (mart 2027)
- **Web3Forms free** = 250 prijava/mes, dovoljno za pre-launch fazu
- **MongoDB Atlas M0** = besplatno, dovoljno za prvih 1k email-ova

---

## Troubleshooting

### Build error u Vercel ali radi lokalno
- Proveri da li `.env.example` sadrži sve env varijable
- Proveri da li Vercel ima istog Node.js verzija kao lokalna (`24.x`)

### Email ne stiže iz Web3Forms
- Proveri spam folder
- Proveri da je access key tačan u env varijablama
- Test sa drugog email-a

### DNS ne radi posle 24h
- Proveri TTL u DNS settings (smanji na 600s)
- Use https://www.whatsmydns.net/ za verifikaciju propagacije
