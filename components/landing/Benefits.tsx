"use client";

import { motion } from "framer-motion";
import { Trophy, Users, BarChart3, Target, Flame, Sparkles } from "lucide-react";

export function Benefits() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(22% 0.02 250) 1px, transparent 1px), linear-gradient(to right, oklch(22% 0.02 250) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            Šta dobijaš
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Učenje koje deca{" "}
            <span className="relative inline-block">
              <em className="not-italic text-secondary">vole</em>
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                height="8"
              >
                <path
                  d="M2 5 Q 25 1, 50 4 T 98 4"
                  stroke="oklch(80% 0.15 80)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Ne još jedan dosadni online kurs. Aplikacija u kojoj deca žele da
            vežbaju.
          </p>
        </div>

        {/* Asimetrični grid */}
        <div className="grid md:grid-cols-6 gap-6">
          {/* Big card — Gejmifikacija */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 bg-gradient-to-br from-primary to-primary/80 text-primary-content rounded-3xl p-8 md:p-10 relative overflow-hidden group"
          >
            <div
              aria-hidden
              className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={24} className="text-accent" />
                <span className="text-sm font-medium uppercase tracking-wider opacity-80">
                  Gejmifikacija
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                XP, lige, streak, bedževi.
              </h3>
              <p className="text-primary-content/85 text-lg leading-relaxed mb-6 max-w-md">
                Dete se vraća jer je zabavno. Skuplja petice u svojoj 5ici, igra
                sa drugarima iz razreda, napreduje kroz lige.
              </p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="bg-white/15 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
                  <Flame size={14} className="text-accent" />
                  <span>Streak 14 dana</span>
                </div>
                <div className="bg-white/15 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className="text-accent font-bold">5</span>
                  <span>Liga: Zlato</span>
                </div>
                <div className="bg-white/15 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span>+247 XP danas</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Roditelj-vs-dete duel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users size={20} />
              <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                Porodični duel
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-3 leading-tight">
              Igraj sa mamom.
            </h3>
            <p className="text-secondary-content/85 leading-relaxed mb-4 text-sm">
              Roditelj-vs-dete u real-time-u. I baka može da uskoči.
            </p>
            <div className="bg-white/15 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-xs opacity-70 mb-1">Sa mamom danas</div>
              <div className="text-3xl font-bold">3 — 1</div>
              <div className="text-xs opacity-70 mt-1">Marko vodi 🏆</div>
            </div>
          </motion.div>

          {/* Roditeljski dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 bg-base-100 border-2 border-base-300 rounded-3xl p-8 hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-info/15 text-info flex items-center justify-center mb-4">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 leading-tight">
              Roditelj vidi sve.
            </h3>
            <p className="text-base-content/75 leading-relaxed mb-5">
              Konkretni brojevi, ne magla. Vreme, predmeti, slabe oblasti, rang
              u razredu.
            </p>

            {/* Mock stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Vežbao", value: "23 min" },
                { label: "Tačno", value: "78%" },
                { label: "Streak", value: "14 d" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-base-200 rounded-xl p-3 text-center"
                >
                  <div className="text-xs text-base-content/60 mb-1">
                    {s.label}
                  </div>
                  <div className="font-bold text-lg leading-none">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Spremnost za maturu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3 bg-base-100 border-2 border-base-300 rounded-3xl p-8 hover:border-secondary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-success/15 text-success flex items-center justify-center mb-4">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 leading-tight">
              Spremnost za maturu.
            </h3>
            <p className="text-base-content/75 leading-relaxed mb-5">
              Sprint paket dovodi dete do 80%+ za 90 dana — sa
              personalizovanim planom i mock testovima.
            </p>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-base-content/60">Trenutna spremnost</span>
                <span className="font-bold text-secondary">67%</span>
              </div>
              <div className="h-3 bg-base-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "67%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                />
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <Sparkles size={12} />
                <span>+12% ovog meseca</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
