"use client";

import { motion } from "framer-motion";
import { Flame, CheckCircle2 } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ maxWidth: 320 }}>
      {/* Floating decorations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="absolute -top-6 -left-12 z-20 hidden sm:block"
      >
        <div className="bg-base-100 rounded-2xl shadow-xl px-4 py-3 border border-base-200 flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <div>
            <div className="text-xs text-base-content/60">Streak</div>
            <div className="font-bold text-lg leading-none">14 dana</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="absolute -bottom-4 -right-8 z-20 hidden sm:block"
      >
        <div className="bg-secondary text-secondary-content rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 transform rotate-6">
          <span className="text-3xl font-bold leading-none">5</span>
          <div className="text-xs leading-tight">
            <div>Tačan</div>
            <div className="font-bold">odgovor!</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute top-1/2 -right-12 z-20 hidden md:block"
      >
        <div className="bg-accent text-accent-content rounded-full shadow-lg px-4 py-2 font-bold text-sm">
          +12 XP
        </div>
      </motion.div>

      {/* Phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: 15 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Outer phone frame */}
        <div
          className="relative bg-neutral rounded-[2.5rem] p-3 shadow-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 -2px 0 rgba(0,0,0,0.3) inset",
          }}
        >
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral rounded-b-2xl z-10" />

          {/* Screen */}
          <div className="bg-base-100 rounded-[2rem] overflow-hidden relative aspect-[9/19]">
            {/* Status bar */}
            <div className="px-6 pt-3 pb-2 flex justify-between text-[10px] font-medium text-base-content/70">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span>5G</span>
                <span>●●●●●</span>
              </span>
            </div>

            {/* App header */}
            <div className="px-5 py-3 flex items-center justify-between border-b border-base-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-sm font-bold">
                  M
                </div>
                <div>
                  <div className="text-xs text-base-content/60">Pozdrav</div>
                  <div className="text-sm font-semibold">Marko</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-accent">
                <Flame size={14} />
                <span className="font-bold text-sm">14</span>
              </div>
            </div>

            {/* Question card */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="badge badge-primary badge-sm">Matematika</span>
                <span className="text-base-content/60">3 / 5</span>
              </div>

              <h3 className="text-base font-semibold mb-4 leading-snug">
                Površina kvadrata sa stranicom 5cm je:
              </h3>

              <div className="space-y-2">
                <div className="bg-base-200 rounded-xl py-3 px-4 text-sm font-medium">
                  20 cm²
                </div>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="bg-success text-success-content rounded-xl py-3 px-4 text-sm font-bold flex items-center justify-between"
                >
                  <span>25 cm²</span>
                  <CheckCircle2 size={16} />
                </motion.div>
                <div className="bg-base-200 rounded-xl py-3 px-4 text-sm font-medium">
                  30 cm²
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="absolute bottom-0 inset-x-0 px-5 py-3 bg-base-200/50 border-t border-base-200">
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <div className="text-base-content/60">XP danas</div>
                  <div className="font-bold text-accent">+47</div>
                </div>
                <div className="text-xs text-right">
                  <div className="text-base-content/60">Spremnost</div>
                  <div className="font-bold text-primary">67%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
