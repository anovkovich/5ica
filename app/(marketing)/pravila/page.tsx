import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pravila korišćenja",
  description: "Pravila korišćenja 5ica waitlist-a.",
};

export default function PravilaPage() {
  return (
    <article className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Pravila korišćenja
        </h1>
        <p className="text-base-content/60 mb-10">
          Poslednja izmena: 7. maj 2026.
        </p>

        <div className="prose prose-lg max-w-none space-y-6 text-base-content/85">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Šta je 5ica</h2>
            <p>
              5ica je edukativna web aplikacija u predlansiranju, namenjena
              učenicima 1-8. razreda osnovne škole u Srbiji. Trenutni sajt služi
              za prijavu na waitlist — listu zainteresovanih koje obaveštavamo
              kada aplikacija bude dostupna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Prijava na waitlist</h2>
            <p>
              Prijavom na waitlist (unošenjem email adrese) potvrđujete da:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Imate najmanje 18 godina ili saglasnost roditelja</li>
              <li>Email adresa je vaša ili imate dozvolu da je koristite</li>
              <li>
                Slažete se da vam šaljemo obaveštenja o lansiranju aplikacije
              </li>
              <li>
                Ste pročitali i prihvatili{" "}
                <a href="/privatnost" className="link link-primary">
                  Politiku privatnosti
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. Naše obaveze</h2>
            <p>Mi se obavezujemo da:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Vaš email koristimo samo za obaveštenja o 5ica aplikaciji</li>
              <li>Ne prodajemo, delimo ili distribuiramo vaše podatke trećim licima</li>
              <li>U svakom trenutku možete da se odjavite</li>
              <li>Šaljemo najviše 1-2 emaila mesečno</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Aplikacija i Sprint paket</h2>
            <p>
              Trenutno sajt prikazuje informacije o budućoj aplikaciji i Mala
              Matura Sprint paketu. <strong>Cene i uslovi koji su prikazani na
              ovom sajtu su orijentaciona pretkazivanja</strong> i mogu biti
              promenjeni do trenutka zvaničnog lansiranja.
            </p>
            <p className="mt-3">
              Konačni uslovi Sprint paketa biće detaljno objavljeni pre nego
              što počne prodaja u martu 2027.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Intelektualna svojina</h2>
            <p>
              Brand "5ica", logo, dizajn sajta i sav sadržaj su vlasništvo 5ica
              tima. Bez naše pisane saglasnosti ne smete da kopirate, menjate
              ili komercijalno koristite naše materijale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Odgovornost</h2>
            <p>
              Sajt 5ica.rs je u pre-launch fazi. Ne odgovaramo za bilo kakvu
              štetu nastalu zbog kašnjenja lansiranja, izmena u finalnoj
              aplikaciji ili Sprint paketu. Vaš email je čuvan, a vi ste
              obavešteni — to je jedina obaveza koju imamo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Izmene pravila</h2>
            <p>
              Ako menjamo ova pravila, obavestićemo vas email-om pre nego što
              promene stupe na snagu. Nastavak korišćenja sajta po stupanju
              promena znači da prihvatate izmenjena pravila.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Sporovi i sud</h2>
            <p>
              Sva pitanja koja se ne mogu rešiti dogovorom rešavaju se pred
              nadležnim sudom u Beogradu, prema zakonima Republike Srbije.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Kontakt</h2>
            <p>
              Pitanja i prijave grešaka:{" "}
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
