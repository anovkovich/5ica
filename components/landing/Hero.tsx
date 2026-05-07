"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";
import { WaitlistForm } from "./WaitlistForm";
import { PhoneMockup } from "./PhoneMockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern — notebook lines suptilno */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, oklch(22% 0.02 250) 31px, oklch(22% 0.02 250) 32px)",
        }}
      />

      {/* Background gradient blobs */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(58% 0.21 25 / 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(80% 0.15 80 / 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text + form */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-base-100/80 backdrop-blur border border-base-300 px-4 py-1.5 rounded-full mb-6 text-sm font-medium shadow-sm"
            >
              <Sparkles size={14} className="text-accent" />
              <span>Lansiranje uskoro — pridruži se prvima</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.05] tracking-tight"
            >
              Vežbaj za{" "}
              <span className="relative inline-block">
                <span className="text-secondary">peticu</span>
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  height="12"
                >
                  <path
                    d="M2 8 Q 50 2, 100 6 T 198 6"
                    stroke="oklch(58% 0.21 25)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-base-content/75 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Gejmifikovana aplikacija u kojoj deca vežbaju svoje vijuge i
              pripremaju se za malu maturu. Za <strong>1-8. razred</strong>{" "}
              osnovne škole.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <WaitlistForm variant="hero" source="homepage-hero" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex items-center gap-3 justify-center lg:justify-start text-sm text-base-content/60"
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
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${g} border-2 border-base-100`}
                  />
                ))}
              </div>
              <span>
                <strong className="text-base-content">127 roditelja</strong> je
                već prijavljeno
              </span>
            </motion.div>
          </div>

          {/* Right: phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="hidden md:flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-base-content/40"
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
