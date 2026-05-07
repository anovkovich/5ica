"use client";

import { motion } from "framer-motion";

export function BrandStory() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background tint */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Story text */}
          <div>
            <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Naša priča
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
              Zašto baš{" "}
              <span className="text-secondary">crvena</span> petica?
            </h2>

            <div className="space-y-5 text-base-content/80 text-lg leading-relaxed">
              <p>
                Svako od nas se seća kad bi učiteljica izvadila{" "}
                <strong>crvenu olovku</strong> i napisala onu peticu u dnevniku.
                To je bio momenat.
              </p>
              <p>
                Petica u srpskoj školi je više od ocene. To je{" "}
                <strong>ponos</strong>, priznanje truda, mali ritual koji decu
                motiviše dugo posle časa.
              </p>
              <p>
                Mi smo napravili aplikaciju da nadogradi taj momenat. Da dete
                koje vežba na 5ici svaki dan{" "}
                <strong>skuplja svoje petice</strong> — ovog puta na svom
                telefonu, sa svojim drugarima, na svoj način.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-10 pl-6 border-l-4 border-secondary">
              <p className="text-base-content/70 italic">
                "Niko od konkurenata u Srbiji ne koristi tu kulturalnu vezu.
                Crvena petica je naš identitet."
              </p>
            </div>
          </div>

          {/* Notebook illustration */}
          <motion.div
            initial={{ opacity: 0, rotate: -3, y: 20 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Paper card */}
            <div
              className="relative bg-[oklch(98%_0.015_85)] rounded-lg shadow-2xl overflow-hidden mx-auto max-w-md"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0,0,0,0.25), 0 4px 6px -2px rgba(0,0,0,0.05), 0 0 0 1px oklch(91% 0.012 250)",
              }}
            >
              {/* Notebook spiral holes (top) */}
              <div className="flex justify-around bg-base-300/40 py-3 px-8 border-b border-base-300/60">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-base-100 border border-base-300/60 shadow-inner"
                  />
                ))}
              </div>

              <div className="px-10 py-12 relative">
                {/* Red margin line */}
                <div
                  aria-hidden
                  className="absolute left-16 top-0 bottom-0 w-px bg-secondary/30"
                />

                {/* Lined paper */}
                <div
                  aria-hidden
                  className="absolute inset-x-10 inset-y-12 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0, transparent 35px, oklch(91% 0.012 250) 35px, oklch(91% 0.012 250) 36px)",
                  }}
                />

                <div className="relative">
                  <div className="text-base-content/50 text-sm mb-3 font-mono">
                    Dnevnik VIII-2 • Matematika
                  </div>
                  <div className="text-base-content/70 mb-2 font-handwriting">
                    Marković, Petar
                  </div>
                  <div className="text-base-content/50 text-sm mb-8">
                    15. maj 2027.
                  </div>

                  {/* The big red 5 */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: -8 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      duration: 0.8,
                    }}
                    className="text-center"
                  >
                    <span
                      className="inline-block text-[180px] md:text-[200px] font-extrabold text-secondary leading-none"
                      style={{
                        textShadow:
                          "2px 2px 0 oklch(58% 0.21 25 / 0.2), -1px -1px 0 oklch(58% 0.21 25 / 0.15)",
                      }}
                    >
                      5
                    </span>
                  </motion.div>

                  <div className="text-right text-base-content/60 text-sm mt-6">
                    — Ana M., učiteljica
                  </div>
                </div>
              </div>
            </div>

            {/* Floating sticky note */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-6 -right-4 md:-right-12 bg-accent text-accent-content px-4 py-3 shadow-lg rounded-md max-w-[180px]"
            >
              <div className="text-xs font-medium opacity-70 mb-1">
                Učiteljica:
              </div>
              <div className="font-bold text-sm leading-snug">
                Bravo Petre! Tako se uči!
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
