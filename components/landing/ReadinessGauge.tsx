"use client";

import { motion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";

const subjects = [
  { name: "Matematika", pct: 78, bgClass: "bg-primary" },
  { name: "Srpski", pct: 65, bgClass: "bg-info" },
  { name: "Kombinovani test", pct: 58, bgClass: "bg-secondary" },
];

const current = 67;
const target = 87;

export function ReadinessGauge() {
  return (
    <div className="relative max-w-md mx-auto">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-3xl blur-2xl opacity-60 -z-10 scale-95"
      />

      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-7 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-base-content/60 font-semibold mb-2">
            Spremnost za malu maturu
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-5xl md:text-6xl font-extrabold text-secondary leading-none">
                {current}
                <span className="text-2xl font-semibold text-base-content/60">
                  %
                </span>
              </div>
              <div className="text-xs text-base-content/60 mt-1">Trenutno</div>
            </div>
            <div className="inline-flex items-center gap-1 text-success text-sm font-semibold pb-1">
              <ArrowUp size={14} />
              +12% ovog meseca
            </div>
          </div>
        </div>

        {/* Two-layer progress bar */}
        <div className="mb-3">
          <div className="relative h-4 bg-base-200 rounded-full overflow-hidden">
            {/* Sprint potential — accent ghost behind */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${target}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-accent/40 rounded-full"
            />
            {/* Current — solid crimson on top */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${current}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary to-secondary/85 rounded-full"
            />
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-base-content/70">
                Trenutno{" "}
                <strong className="text-base-content">{current}%</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-base-content/70">
                Cilj sa Sprintom{" "}
                <strong className="text-base-content">{target}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Sprint promise */}
        <div className="bg-gradient-to-r from-secondary/10 via-accent/10 to-secondary/10 rounded-2xl p-3.5 mt-5 mb-5 border border-accent/20">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles size={14} className="text-accent flex-shrink-0" />
            <span>
              Sprint dovodi do{" "}
              <strong className="text-secondary">{target}%</strong> za 90 dana
            </span>
          </div>
        </div>

        {/* Per-subject progress */}
        <div>
          <div className="text-xs uppercase tracking-wider text-base-content/60 font-semibold mb-3">
            Po predmetima
          </div>
          <div className="space-y-3">
            {subjects.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-sm font-bold tabular-nums text-base-content/80">
                    {s.pct}%
                  </span>
                </div>
                <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.15 }}
                    className={`h-full ${s.bgClass} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
