"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

const freeFeatures = [
  "Sva 8.500+ pitanja",
  "14 predmeta, 1-8. razred",
  "XP, leveli, bedževi",
  "Streak sa freeze",
  "Razred, škola, Srbija lige",
  "Drugovi i drug-duel",
  "Roditelj-vs-dete duel",
  "Familija mode (baka, deda)",
  "Roditeljski dashboard",
  "Nedeljni email roditelju",
];

const sprintExtras = [
  "Personalizovan 90-dnevni plan",
  "12 mock testova u formatu mature",
  "Detaljan AI tutor (korak-po-korak)",
  "Dnevni AI coach (push 7am)",
  "Predvidjena ocena na maturi",
  "Detaljan parent report sa trendovima",
  "Sprint cohort + ekskluzivni leaderboard",
  "Sprint sertifikat o završetku",
];

const freeMissing = [
  "Bez plana — ti biraš šta vežbaš",
  "Bez mock testova",
  "Osnovna AI objašnjenja",
];

export function PlanComparison() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-base-200">
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="text-center mb-14">
          <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Free vs Sprint
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Free je za <span className="text-primary">vežbu</span>.
            <br />
            Sprint je za <span className="text-secondary">pripremu mature</span>.
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Iste pitanja, dve potpuno različite stvari. Free je dnevna navika
            učenja. Sprint je struktuirana priprema za konkretan ispit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* FREE card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-3xl p-8 border-2 border-base-300 relative"
          >
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                Free
              </div>
              <h3 className="text-3xl font-extrabold mb-1">Vežba</h3>
              <p className="text-base-content/60 text-sm">
                Dnevna gejmifikovana vežba za 1-8. razred
              </p>
            </div>

            <div className="mb-6">
              <ul className="space-y-2.5">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className="text-success flex-shrink-0 mt-0.5"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-base-300 pt-5 mb-5">
              <div className="text-xs font-medium text-base-content/60 mb-2 uppercase tracking-wider">
                Šta nedostaje
              </div>
              <ul className="space-y-2">
                {freeMissing.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-base-content/60"
                  >
                    <X
                      size={16}
                      className="text-base-content/40 flex-shrink-0 mt-0.5"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-base-300 pt-5 flex items-end justify-between">
              <div>
                <div className="text-3xl font-extrabold">0 RSD</div>
                <div className="text-xs text-base-content/60">zauvek</div>
              </div>
              <span className="text-xs text-base-content/60 italic">
                Free je tu uvek
              </span>
            </div>
          </motion.div>

          {/* SPRINT card — highlighted */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Glow */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-accent/40 rounded-3xl blur-xl opacity-60 -z-10 scale-95"
            />

            <div className="bg-gradient-to-br from-base-100 to-secondary/5 rounded-3xl p-8 border-2 border-secondary shadow-xl relative h-full">
              {/* Popular badge */}
              <div className="absolute -top-3 right-6 bg-secondary text-secondary-content text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Za maturu
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                  Sprint
                </div>
                <h3 className="text-3xl font-extrabold mb-1">Priprema mature</h3>
                <p className="text-base-content/70 text-sm">
                  90-dnevni plan + ekspertski alati za 8. razred
                </p>
              </div>

              <div className="mb-6">
                <div className="bg-success/10 border border-success/30 rounded-xl p-3 mb-4 flex items-center gap-2 text-sm">
                  <Check size={16} className="text-success flex-shrink-0" />
                  <span>
                    <strong>Sve iz Free</strong> + sledeće ekstra:
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {sprintExtras.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm font-medium"
                    >
                      <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="text-secondary" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-secondary/20 pt-5 flex items-end justify-between mb-5">
                <div>
                  <div className="text-3xl font-extrabold text-secondary">
                    4.990{" "}
                    <span className="text-lg text-base-content/70 font-medium">
                      RSD
                    </span>
                  </div>
                  <div className="text-xs text-base-content/60">
                    jednokratno · za ceo Sprint
                  </div>
                </div>
                <span className="text-xs bg-accent/15 text-accent-content px-2 py-1 rounded-full font-medium">
                  -1.000 Early Bird
                </span>
              </div>

              <a
                href="#prijavi-se"
                className="btn btn-secondary btn-block rounded-2xl gap-2"
              >
                Rezerviši Early Bird
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
