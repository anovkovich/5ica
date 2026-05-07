"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Trophy,
  Users2,
  Sparkles,
  Award,
  Mail,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { KidShowcase } from "@/components/landing/KidShowcase";

const features = [
  {
    icon: Flame,
    title: "Streak",
    desc: "Vežbaj svaki dan i čuvaj svoj streak. 7, 30, 100 dana — svaki je posebna priča.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Trophy,
    title: "Lige",
    desc: "Bronza, Srebro, Zlato, Dijamant. Igraj i napreduj kroz lige sa drugarima.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Users2,
    title: "Drugovi",
    desc: "Dodaj druga sa kodom. Vidi njegov napredak. Pošalji izazov na kviz.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Avatari",
    desc: "30+ avatara. Otključavaj nove kako napreduješ. Tvoj profil — tvoj stil.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Award,
    title: "Bedževi",
    desc: "100+ bedževa za sakupljanje. Streak masters, predmet masteri, easter eggs.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Gamepad2,
    title: "Maraton mod",
    desc: "50 pitanja u jednoj sesiji za 10× XP. Samo za hrabre.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

export default function ZaDecuPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(58% 0.21 25 / 0.5) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(80% 0.15 80 / 0.5) 0%, transparent 70%)",
          }}
        />

        <div className="container relative mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
              >
                Za decu
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.05] tracking-tight"
              >
                Skupi svoje{" "}
                <span className="text-secondary">5ice</span>.
                <br />
                <span className="text-3xl md:text-4xl font-bold text-base-content/70">
                  Pobedi mamu.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-base-content/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Vežbanje koje liči na igru. Sa svojim avatarom, drugarima i
                ligama. <strong>Učiš dok se kuvaš.</strong>
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="#prijavi-se"
                className="btn btn-secondary btn-lg rounded-2xl gap-2 px-6 shadow-md hover:shadow-lg transition-shadow"
              >
                Prijavi se na waitlist
                <ArrowRight size={18} />
              </motion.a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <KidShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 md:py-28 bg-base-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Sve što čini vežbu{" "}
              <span className="text-secondary">zabavnom</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-base-100 rounded-3xl p-6 border border-base-300 hover:shadow-md transition-all group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/75 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roditelj-vs-dete duel */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"
        />

        <div className="container relative mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Porodični duel
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                Igraj sa{" "}
                <span className="text-secondary">mamom</span>.
                <br />
                Ili sa bakom.
              </h2>
              <div className="space-y-4 text-base-content/80 text-lg leading-relaxed">
                <p>
                  Najbolji deo? Možeš da{" "}
                  <strong>izazoveš mamu, tatu, baku ili dedu</strong> na duel.
                  Sinhroni mod (oboje u app-u istovremeno) ili asinhroni (jedan
                  reši, drugi ima 24 sata da prebaci).
                </p>
                <p>
                  Pobediš ih? Dobiješ specijalan bedž "Pobedio mamu". I onda se
                  hvališ.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200"
            >
              <div className="text-xs uppercase tracking-wider text-base-content/60 mb-4 text-center font-semibold">
                Sa mamom danas
              </div>

              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-4xl mb-2">
                    🧒
                  </div>
                  <div className="font-bold">Marko</div>
                  <div className="text-5xl font-extrabold text-secondary mt-1">
                    3
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-base-content/30">
                  vs
                </div>

                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto rounded-full bg-base-200 flex items-center justify-center text-4xl mb-2">
                    👩
                  </div>
                  <div className="font-bold text-base-content/70">Mama</div>
                  <div className="text-5xl font-extrabold text-base-content/40 mt-1">
                    1
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-2xl p-4 text-center">
                <div className="text-xs text-base-content/60 mb-1">
                  Ukupno svih duela
                </div>
                <div className="font-extrabold text-lg">
                  <span className="text-secondary">7</span>
                  <span className="text-base-content/40 mx-2">—</span>
                  <span className="text-base-content/60">3</span>
                </div>
                <div className="text-xs text-secondary mt-1 font-semibold">
                  🏆 Marko vodi
                </div>
              </div>

              <button className="btn btn-secondary btn-block rounded-2xl mt-5 gap-2">
                Izazovi mamu
                <ArrowRight size={16} />
              </button>
            </motion.div>
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
            Reci roditelju da{" "}
            <span className="text-secondary">se prijavi</span>.
          </h2>
          <p className="text-base-content/70 mb-10 text-lg">
            Kada krenemo, bićeš među prvima.
          </p>
          <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200 max-w-md mx-auto">
            <WaitlistForm variant="inline" source="za-decu" />
          </div>
        </div>
      </section>
    </>
  );
}
