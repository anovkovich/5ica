"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Trophy } from "lucide-react";

export function ParentDashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative max-w-lg mx-auto"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-60 -z-10 scale-95"
      />

      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-base-200 border-b border-base-300">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/70" />
            <div className="w-3 h-3 rounded-full bg-warning/70" />
            <div className="w-3 h-3 rounded-full bg-success/70" />
          </div>
          <div className="flex-1 mx-4 px-3 py-1 bg-base-100 rounded-md text-xs text-base-content/60">
            5ica.rs/roditelj
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs text-base-content/60">Pozdrav,</div>
              <div className="font-bold text-lg">Aleksandra</div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Marko vežba sada
            </div>
          </div>

          {/* Main stat — Spremnost */}
          <div className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-base-content/70 uppercase tracking-wider">
                Spremnost za malu maturu
              </span>
              <span className="text-xs text-success flex items-center gap-1">
                <TrendingUp size={12} />
                +12%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-5xl font-extrabold text-secondary">
                67
              </span>
              <span className="text-2xl font-medium text-base-content/60">
                %
              </span>
            </div>
            <div className="h-2.5 bg-base-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "67%" }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
              />
            </div>
          </div>

          {/* Mini stats grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-base-200 rounded-xl p-3">
              <div className="flex items-center gap-1 text-accent mb-1">
                <Flame size={14} />
                <span className="text-xs font-medium">Streak</span>
              </div>
              <div className="font-bold text-lg leading-none">14d</div>
            </div>
            <div className="bg-base-200 rounded-xl p-3">
              <div className="flex items-center gap-1 text-primary mb-1">
                <Trophy size={14} />
                <span className="text-xs font-medium">Liga</span>
              </div>
              <div className="font-bold text-sm leading-none">Zlato</div>
            </div>
            <div className="bg-base-200 rounded-xl p-3">
              <div className="text-xs text-base-content/60 mb-1">Nedelja</div>
              <div className="font-bold text-lg leading-none">3h 42min</div>
            </div>
          </div>

          {/* Weak areas */}
          <div>
            <div className="text-xs font-medium text-base-content/60 uppercase tracking-wider mb-2">
              Slabe oblasti
            </div>
            <div className="space-y-2">
              {[
                { name: "Procenti", pct: 42, bgClass: "bg-error" },
                { name: "Pravopis", pct: 58, bgClass: "bg-warning" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-sm flex-1">{item.name}</span>
                  <div className="w-20 h-1.5 bg-base-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.bgClass} rounded-full`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-10 text-right">
                    {item.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute -bottom-4 -right-4 md:-right-12 bg-base-100 rounded-2xl shadow-xl border border-base-200 px-4 py-3 max-w-[220px]"
      >
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success/15 text-success flex items-center justify-center flex-shrink-0 text-sm">
            ✓
          </div>
          <div>
            <div className="text-xs text-base-content/60">Nedeljni izveštaj</div>
            <div className="font-semibold text-sm">Stigao u tvoj inbox</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
