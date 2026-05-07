"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";

export function FinalCTA() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-neutral text-neutral-content">
      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(58% 0.21 25 / 0.6) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(80% 0.15 80 / 0.6) 0%, transparent 70%)",
        }}
      />

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(98% 0 0) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 backdrop-blur">
            ★ Lansiranje uskoro ★
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Tvoje dete zaslužuje{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              peticu
            </span>
            .
          </h2>

          <p className="text-lg md:text-xl text-neutral-content/80 mb-12 max-w-2xl mx-auto">
            Prijavi se sada i budi među prvima koji probaju 5icu kad bude
            spremna. Bez obaveze, bez naplate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 text-base-content rounded-3xl p-8 md:p-10 max-w-md mx-auto shadow-2xl border border-white/10"
        >
          <WaitlistForm variant="inline" source="final-cta" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center gap-3 justify-center text-sm text-neutral-content/60"
        >
          <div className="flex -space-x-2">
            {[
              "from-primary to-secondary",
              "from-secondary to-accent",
              "from-accent to-primary",
              "from-info to-success",
            ].map((g, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-neutral`}
              />
            ))}
          </div>
          <span>
            <strong className="text-neutral-content">127 roditelja</strong> je
            već prijavljeno
          </span>
        </motion.div>
      </div>
    </section>
  );
}
