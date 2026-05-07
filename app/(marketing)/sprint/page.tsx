"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Mail,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  BellRing,
} from "lucide-react";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { ReadinessGauge } from "@/components/landing/ReadinessGauge";
import { PlanComparison } from "@/components/landing/PlanComparison";
import { ValueComparison } from "@/components/landing/ValueComparison";

const includes = [
  {
    icon: Calendar,
    title: "Personalizovan 90-dnevni plan",
    desc: "Plan se gradi na osnovu inicijalnog asesmana. Slabe oblasti = više vežbe.",
  },
  {
    icon: BookOpen,
    title: "12 mock testova",
    desc: "U realnom formatu mature: 4 mat + 4 srpski + 4 kombinovani. 120 min po testu, ocenjeno.",
  },
  {
    icon: TrendingUp,
    title: "Detaljan AI tutor",
    desc: "Korak-po-korak rešenja, slični primeri, tipovi za pamćenje pravila — dublje od free verzije.",
  },
  {
    icon: BellRing,
    title: "Dnevni AI coach",
    desc: "Push svako jutro u 7am sa konkretnim planom: 'Marko, danas radi 5 zadataka iz procenata'.",
  },
  {
    icon: Target,
    title: "Predvidjena ocena za maturu",
    desc: "Tačna procena ocene koju Marko može da osvoji. Ažurira se posle svakog mock testa.",
  },
  {
    icon: Users,
    title: "Sprint cohort + leaderboard",
    desc: "Zatvorena grupa Sprint kupaca. Vidiš kako Marko stoji u odnosu na ostale koji se pripremaju.",
  },
];

const phases = [
  {
    week: "Nedelja 1-3",
    title: "Asesman + slabe oblasti",
    desc: "Identifikujemo gde Marko zapinje. 3 najslabija predmeta dobijaju fokus.",
  },
  {
    week: "Nedelja 4-6",
    title: "Balans + prvi mock test",
    desc: "Vežbamo balansirano. Prva simulacija mature da vidiš startnu poziciju.",
  },
  {
    week: "Nedelja 7-9",
    title: "Dublji rad + 2 mock testa",
    desc: "Težina raste. Mock testovi otkrivaju tačno gde Marko gubi poene.",
  },
  {
    week: "Nedelja 10-12",
    title: "Mock-test heavy + finalna runda",
    desc: "Simulacija ispita 4 puta. Mentalna priprema. Finalni polish.",
  },
];

export default function SprintPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(58% 0.21 25 / 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(80% 0.15 80 / 0.5) 0%, transparent 70%)",
          }}
        />

        <div className="container relative mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5"
              >
                <Sparkles size={12} />
                Mart - Jun 2027
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold mb-6 leading-[0.95] tracking-tight"
              >
                Mala Matura{" "}
                <span className="relative inline-block">
                  <span className="text-secondary">Sprint</span>
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
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-base-content/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                90-dnevni intenzivan paket priprema. Sve iz Free verzije{" "}
                <strong>plus plan, mock testovi i AI coach</strong> — sve što
                Marku treba da spremno dočeka jun.
              </motion.p>

              {/* Pricing block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block bg-base-100 rounded-3xl p-6 shadow-xl border border-base-200 text-left mb-6"
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-5xl font-extrabold">4.990</span>
                  <span className="text-xl font-medium text-base-content/70">
                    RSD
                  </span>
                </div>
                <div className="text-sm text-base-content/60">
                  jednokratno · za ceo Sprint
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm bg-accent/15 text-accent-content px-3 py-1.5 rounded-full font-medium">
                  <Zap size={14} />
                  <span>
                    Early Bird: <strong>3.990 RSD</strong> do 1. marta
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="#prijavi-se"
                  className="btn btn-secondary btn-lg rounded-2xl gap-2 px-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  Rezerviši Early Bird
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ReadinessGauge />
            </div>
          </div>
        </div>
      </section>

      {/* PLAN COMPARISON — Free vs Sprint */}
      <PlanComparison />

      {/* VALUE COMPARISON — Sprint vs alternative pripreme */}
      <ValueComparison />

      {/* Includes — deep dive into Sprint exclusive features */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-info/10 text-info text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Sprint ekskluzivno
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Šta tačno dodaje{" "}
              <span className="text-secondary">Sprint</span>.
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Šest stvari koje Marko ne može da dobije kroz besplatno vežbanje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {includes.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-base-100 rounded-3xl p-6 border border-base-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base-content/75 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12-week timeline */}
      <section className="py-20 md:py-28 bg-base-200">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-info/10 text-info text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              90 dana plan
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Korak po korak do{" "}
              <span className="text-secondary">male mature</span>.
            </h2>
          </div>

          <div className="space-y-4 relative">
            <div
              aria-hidden
              className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-secondary via-accent to-success hidden md:block"
            />

            {phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 md:gap-8 items-start relative"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent text-white font-extrabold text-lg flex items-center justify-center shadow-lg z-10">
                  {i + 1}
                </div>
                <div className="flex-1 bg-base-100 rounded-2xl p-5 md:p-6 border border-base-300">
                  <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                    {phase.week}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                  <p className="text-base-content/75 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-base-100">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(58% 0.21 25 / 0.6) 0%, transparent 70%)",
          }}
        />

        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <Mail size={40} className="mx-auto text-secondary mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Rezerviši Early Bird popust.
          </h2>
          <p className="text-base-content/70 mb-10 text-lg">
            Prijavi se na waitlist i obavestićemo te čim Sprint bude dostupan.
            Early Bird popust: <strong>1.000 RSD</strong>.
          </p>
          <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200 max-w-md mx-auto">
            <WaitlistForm variant="inline" source="sprint" />
          </div>
        </div>
      </section>
    </>
  );
}
