import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Kako 5ica čuva i koristi vaše podatke.",
};

export default function PrivatnostPage() {
  return (
    <article className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Politika privatnosti
        </h1>
        <p className="text-base-content/60 mb-10">
          Poslednja izmena: 7. maj 2026.
        </p>

        <div className="prose prose-lg max-w-none space-y-6 text-base-content/85">
          <section>
            <h2 className="text-2xl font-bold mb-3">Ko smo mi</h2>
            <p>
              5ica je edukativna aplikacija za osnovnoškolce u Srbiji. Trenutno
              smo u predlansiranju i prikupljamo email-ove zainteresovanih
              roditelja kako bismo ih obavestili kada aplikacija bude dostupna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Koje podatke prikupljamo</h2>
            <p>U ovoj fazi (waitlist) prikupljamo samo:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Email adresu koju nam vi dobrovoljno dajete</li>
              <li>Datum prijave</li>
              <li>Stranicu sa koje ste se prijavili (npr. /sprint)</li>
            </ul>
            <p className="mt-3">
              <strong>Ne prikupljamo</strong>: ime, prezime, adresu, telefon,
              IP adresu, lokaciju, ili bilo koji drugi lični podatak.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Kako koristimo podatke</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Obaveštavamo vas kada aplikacija postane dostupna (jednokratno)
              </li>
              <li>
                Šaljemo povremeno korisne informacije o pripremi za malu maturu
                (max 1-2 emaila mesečno, možete da odjavite svaki put)
              </li>
              <li>Statistički pratimo koliko ljudi se prijavljuje</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              Kome delimo vaše podatke
            </h2>
            <p>
              <strong>Nikome.</strong> Vaš email se ne prodaje, ne deli sa
              partnerima, niti koristi za reklame trećih lica.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Vaša prava</h2>
            <p>U svakom trenutku možete:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Da zatražite uvid u podatke koje imamo o vama</li>
              <li>Da zatražite ispravku ili brisanje</li>
              <li>Da se odjavite sa email liste</li>
              <li>
                Da podnesete pritužbu Povereniku za informacije od javnog
                značaja i zaštitu podataka o ličnosti
              </li>
            </ul>
            <p className="mt-3">
              Za sve ovo, pišite nam na{" "}
              <a href="mailto:5ica.kontakt@gmail.com" className="link link-primary">
                5ica.kontakt@gmail.com
              </a>
              . Odgovaramo u roku od 7 radnih dana.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Bezbednost podataka</h2>
            <p>
              Vaš email se čuva na sigurnim serverima u EU. Pristup ima samo tim
              5ice. Koristimo HTTPS šifrovanje za sav saobraćaj.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Maloletnici</h2>
            <p>
              Waitlist je namenjen <strong>samo roditeljima</strong>. Deca ne
              treba da unose svoje email adrese. Kada aplikacija bude dostupna,
              kreiranje detetovog naloga je striktno preko roditeljske
              saglasnosti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Izmene polise</h2>
            <p>
              Ako menjamo ovu politiku, obavestićemo vas email-om pre nego što
              promene stupe na snagu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Kontakt</h2>
            <p>
              Pitanja, sugestije, zahtevi — sve ide na{" "}
              <a href="mailto:5ica.kontakt@gmail.com" className="link link-primary">
                5ica.kontakt@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
