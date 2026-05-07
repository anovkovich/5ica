"use client";

import { motion } from "framer-motion";
import { Mail, UserPlus, Gamepad2, BarChart3 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Mail,
    title: "Roditelj se prijavi",
    desc: "Brza registracija sa email-om. Bez šifara — magic link na tvoj email.",
  },
  {
    n: "02",
    icon: UserPlus,
    title: "Kreira nalog za dete",
    desc: "Nadimak, razred, avatar. Bez deljenja ličnih podataka deteta.",
  },
  {
    n: "03",
    icon: Gamepad2,
    title: "Dete vežba dnevno",
    desc: "5-15 minuta. XP, streak, takmičenje sa drugarima iz razreda.",
  },
  {
    n: "04",
    icon: BarChart3,
    title: "Roditelj prati napredak",
    desc: "Nedeljni izveštaj na email + dashboard sa konkretnim brojkama.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-base-200">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Kako radi
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Četiri koraka do prve{" "}
            <span className="text-secondary">5</span>
            <span>ice</span>.
          </h2>
        </div>

        {/* Connecting line desktop */}
        <div className="relative">
          <div
            aria-hidden
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="bg-base-100 rounded-3xl p-6 shadow-sm border border-base-300 h-full hover:shadow-md transition-shadow">
                    {/* Step number floating */}
                    <div className="relative">
                      <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-accent text-white font-extrabold text-sm flex items-center justify-center shadow-lg">
                        {step.n}
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-primary mb-4">
                        <Icon size={26} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base-content/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
