"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Kada kreće aplikacija?",
    a: "Radimo na MVP-u tokom 2026. Lansiranje free verzije planirano za jesen 2026, a Mala Matura Sprint za mart 2027. Prijavi se na mejl listu da budeš među prvima.",
  },
  {
    q: "Da li je aplikacija besplatna?",
    a: "Free verzija je besplatna zauvek — sva pitanja, lige, drugovi, duel sa roditeljima. Plaća se samo Mala Matura Sprint paket (90-dnevna intenzivna priprema za maturu, 4.990 RSD).",
  },
  {
    q: "Za koji uzrast je namenjena?",
    a: "Učenici 1-8. razreda osnovne škole. Pokriva sve predmete: matematiku, srpski, istoriju, geografiju, biologiju, fiziku, hemiju, informatiku, muzičko, likovno.",
  },
  {
    q: "Kako se podaci dece čuvaju?",
    a: "Privatnost dece nam je prioritet. Bez ličnih podataka, bez chat-a između dece, bez foto upload-a. Koriste se samo nadimci. Roditelj ima punu kontrolu nad svim podešavanjima.",
  },
  {
    q: "Šta je Mala Matura Sprint?",
    a: "90-dnevni intenzivan paket priprema za malu maturu. Uključuje 12 mock testova u realnom formatu mature, personalizovan plan, dnevnog AI coach-a, detaljan izveštaj roditelju i Sprint cohort. Sve iz Free verzije plus ekstra alati za pripremu ispita.",
  },
  {
    q: "Da li radi na iPhone i Android?",
    a: "Da. 5ica je PWA (Progressive Web App) — radi u browseru, može da se instalira na home screen kao prava aplikacija. Bez App Store i Google Play frikcije.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-info/10 text-info text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Pitanja
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Često postavljena.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`bg-base-100 border-2 rounded-2xl overflow-hidden transition-all ${
                  isOpen
                    ? "border-secondary shadow-md"
                    : "border-base-200 hover:border-base-300"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold text-lg leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-secondary text-secondary-content"
                        : "bg-base-200 text-base-content/60"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-base-content/75 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-base-content/70 mb-2">Imaš drugo pitanje?</p>
          <a
            href="mailto:5ica.kontakt@gmail.com"
            className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
          >
            Piši nam na 5ica.kontakt@gmail.com →
          </a>
        </div>
      </div>
    </section>
  );
}
