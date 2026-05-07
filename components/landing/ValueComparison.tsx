"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const options = [
  {
    name: "Privatni časovi",
    price: "36.000 - 60.000 RSD",
    detail: "3.000-5.000 RSD/čas × 2 nedeljno × 12 nedelja",
    pros: ["Lični kontakt", "1-na-1 pažnja"],
    cons: ["Skupo", "Vezana je za raspored profesora", "Bez mock testova"],
    color: "border-base-300",
    accent: "bg-base-200 text-base-content/70",
  },
  {
    name: "Pripremni kurs",
    price: "30.000 - 80.000 RSD",
    detail: "Pripremni institut, jednokratno",
    pros: ["Struktuiran program"],
    cons: [
      "Velike grupe (15-30 dece)",
      "Bez personalizacije",
      "Bez praćenja kod kuće",
    ],
    color: "border-base-300",
    accent: "bg-base-200 text-base-content/70",
  },
  {
    name: "Knjige i zbirke",
    price: "6.000 - 10.000 RSD",
    detail: "Komplet zbirki za maturu",
    pros: ["Jeftino", "Trajno"],
    cons: ["Bez plana", "Bez interakcije", "Dete mora samo da se motiviše"],
    color: "border-base-300",
    accent: "bg-base-200 text-base-content/70",
  },
  {
    name: "5ica Sprint",
    price: "4.990 RSD",
    detail: "90 dana, sve uključeno",
    pros: [
      "6-12× jeftinije od časova",
      "Personalizovan plan",
      "12 mock testova u formatu mature",
      "Dnevni AI coach",
      "Detaljan parent report",
    ],
    cons: [],
    color: "border-secondary",
    accent: "bg-secondary/15 text-secondary",
    highlighted: true,
  },
];

export function ValueComparison() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(80% 0.15 80 / 0.5) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="text-center mb-14">
          <div className="inline-block bg-accent/15 text-accent-content text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Realna cena pripreme
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Koliko stvarno košta{" "}
            <span className="text-secondary">priprema mature</span>?
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Većina roditelja u Srbiji ulaže <strong>30.000-60.000 RSD</strong>{" "}
            na pripremu. Sprint je 6-12× jeftiniji.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {options.map((option, i) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-6 border-2 ${option.color} ${
                option.highlighted
                  ? "bg-gradient-to-br from-base-100 to-secondary/5 shadow-lg"
                  : "bg-base-100"
              }`}
            >
              {option.highlighted && (
                <div className="absolute -top-3 left-6 bg-secondary text-secondary-content text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Najbolja vrednost
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-bold text-lg mb-1">{option.name}</h3>
                <div
                  className={`text-2xl font-extrabold ${
                    option.highlighted
                      ? "text-secondary"
                      : "text-base-content/80"
                  }`}
                >
                  {option.price}
                </div>
                <div className="text-xs text-base-content/60 mt-1">
                  {option.detail}
                </div>
              </div>

              {option.pros.length > 0 && (
                <ul className="space-y-1.5 mb-3">
                  {option.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex items-start gap-2 text-sm leading-snug"
                    >
                      <Check
                        size={14}
                        className={`flex-shrink-0 mt-1 ${
                          option.highlighted
                            ? "text-success"
                            : "text-base-content/50"
                        }`}
                      />
                      <span
                        className={
                          option.highlighted
                            ? ""
                            : "text-base-content/70"
                        }
                      >
                        {pro}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {option.cons.length > 0 && (
                <ul className="space-y-1.5">
                  {option.cons.map((con) => (
                    <li
                      key={con}
                      className="flex items-start gap-2 text-sm leading-snug text-base-content/55"
                    >
                      <X
                        size={14}
                        className="text-base-content/40 flex-shrink-0 mt-1"
                      />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing punch */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-base-100 border-2 border-base-300 rounded-2xl px-6 py-4">
            <span className="text-base-content/70">
              Sprint je <strong className="text-secondary">55 RSD/dan</strong>{" "}
              za 90 dana intenzivne pripreme.
            </span>
            <span className="text-base-content/40">·</span>
            <span className="text-base-content/60 text-sm">
              Manje od kafe.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
