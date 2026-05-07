"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Crown, Star, Award } from "lucide-react";

const leagues = [
  { name: "Bronza", color: "from-amber-700 to-amber-900", emoji: "🥉" },
  { name: "Srebro", color: "from-slate-300 to-slate-500", emoji: "🥈" },
  { name: "Zlato", color: "from-yellow-400 to-yellow-600", emoji: "🥇" },
  { name: "Dijamant", color: "from-cyan-300 to-blue-500", emoji: "💎" },
];

const badges = [
  { icon: Flame, label: "Streak 30", color: "text-accent" },
  { icon: Star, label: "5ice Master", color: "text-secondary" },
  { icon: Crown, label: "Razred king", color: "text-primary" },
  { icon: Trophy, label: "Liga šampion", color: "text-warning" },
  { icon: Award, label: "Predmet master", color: "text-success" },
];

export function KidShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative max-w-md mx-auto"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-3xl blur-2xl opacity-60 -z-10 scale-95"
      />

      <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden">
        {/* Top profile bar */}
        <div className="bg-gradient-to-br from-secondary to-accent p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
              🧒
            </div>
            <div className="flex-1">
              <div className="text-xs opacity-80">Profil</div>
              <div className="font-bold text-xl leading-tight">Marko</div>
              <div className="text-xs opacity-90">Level 14 · Razred 8-2</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80">Streak</div>
              <div className="font-extrabold text-2xl flex items-center gap-1">
                <Flame size={20} />
                14
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* XP Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Level 14</span>
              <span className="text-base-content/60">1.247 / 1.500 XP</span>
            </div>
            <div className="h-3 bg-base-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "83%" }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
              />
            </div>
          </div>

          {/* Liga */}
          <div className="bg-base-200 rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wider text-base-content/60 mb-3 font-semibold">
              Trenutna liga
            </div>
            <div className="flex items-center justify-between gap-2">
              {leagues.map((league, i) => (
                <div
                  key={league.name}
                  className={`flex-1 text-center transition-all ${
                    i === 2 ? "scale-110" : "opacity-50 scale-90"
                  }`}
                >
                  <div
                    className={`text-2xl mb-1 ${i === 2 ? "" : "grayscale"}`}
                  >
                    {league.emoji}
                  </div>
                  <div
                    className={`text-[10px] font-bold ${
                      i === 2 ? "text-secondary" : "text-base-content/60"
                    }`}
                  >
                    {league.name.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bedževi */}
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-base-content/60 mb-3">
              <span className="font-semibold">Bedževi</span>
              <span>27 / 100</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {badges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="aspect-square rounded-xl bg-base-200 flex items-center justify-center group hover:bg-base-300 transition-colors"
                    title={badge.label}
                  >
                    <Icon size={20} className={badge.color} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
