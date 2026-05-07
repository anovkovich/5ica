"use client";

import { motion } from "framer-motion";
import {
  Eye,
  MessageSquare,
  Trophy,
  Shield,
  Mail,
  CheckCircle2,
  ArrowRight,
  Bell,
} from "lucide-react";
import { WaitlistForm } from "@/components/landing/WaitlistForm";
import { ParentDashboardMockup } from "@/components/landing/ParentDashboardMockup";

const pillars = [
  {
    icon: Eye,
    title: "Vidiš tačno šta dete radi",
    desc: "Koliko vremena dnevno vežba, na kojim predmetima, gde napreduje, gde zapinje. Bez magle.",
    bgClass: "bg-primary/15",
    textClass: "text-primary",
    borderHover: "hover:border-primary/30",
  },
  {
    icon: MessageSquare,
    title: "Igraš sa svojim detetom",
    desc: "Roditelj-vs-dete duel u sinhronom ili asinhronom modu. Statistika 'Sa mamom: 7-3' postaje porodični ritual.",
    bgClass: "bg-secondary/15",
    textClass: "text-secondary",
    borderHover: "hover:border-secondary/30",
  },
  {
    icon: Trophy,
    title: "Spremnost za maturu",
    desc: "Procena spremnosti se ažurira posle svake sesije. Tačno znaš šta dete zna i šta još mora.",
    bgClass: "bg-accent/15",
    textClass: "text-accent",
    borderHover: "hover:border-accent/30",
  },
  {
    icon: Shield,
    title: "Privatnost dece je sveta",
    desc: "Bez chat-a, bez slika, bez deljenja ličnih podataka. Roditelj ima punu kontrolu.",
    bgClass: "bg-success/15",
    textClass: "text-success",
    borderHover: "hover:border-success/30",
  },
];

const benefits = [
  "Nedeljni email izveštaj o detetovom napretku",
  "Dashboard sa konkretnim metričnima (vreme, XP, streak, predmeti)",
  "Roditelj-vs-dete duel — sinhroni i asinhroni mod",
  "Familija mode: pozivi za baku, dedu, teču",
  "Prikaz spremnosti za malu maturu (za 8. razred)",
  "Mogućnost da igra više dece u jednoj porodici",
  "Kontrola privatnosti — svaki leaderboard može da se isključi",
  "Rana kupovina Sprint paketa sa popustom (Early Bird)",
];

export default function ZaRoditeljePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(52% 0.20 258 / 0.6) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(22% 0.02 250) 1px, transparent 1px), linear-gradient(to right, oklch(22% 0.02 250) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container relative mx-auto max-w-6xl px-4 pt-12 pb-20 md:pt-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
              >
                Za roditelje
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.05] tracking-tight"
              >
                Konkretni rezultati.{" "}
                <span className="relative inline-block">
                  <span className="text-primary">Bez magle.</span>
                  <svg
                    aria-hidden
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    height="12"
                  >
                    <path
                      d="M2 8 Q 50 2, 100 6 T 198 6"
                      stroke="oklch(52% 0.20 258)"
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
                Najveći problem nije što dete ne uči — nego što ne znaš koliko
                zaista zna. <strong>5ica ti daje brojeve.</strong>
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="#prijavi-se"
                className="btn btn-primary btn-lg rounded-2xl gap-2 px-6 shadow-md hover:shadow-lg transition-shadow"
              >
                Prijavi se na waitlist
                <ArrowRight size={18} />
              </motion.a>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ParentDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-20 md:py-28 bg-base-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Šta dobiješ kao{" "}
              <span className="text-primary">roditelj</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-base-100 rounded-3xl p-7 border border-base-300 ${p.borderHover} hover:shadow-md transition-all group`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${p.bgClass} ${p.textClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-base-content/75 leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email mockup section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-block bg-info/10 text-info text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Nedeljni izveštaj
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                U tvom inbox-u svakog{" "}
                <span className="text-info">ponedeljka</span>.
              </h2>
              <p className="text-lg text-base-content/75 mb-8 leading-relaxed">
                Bez logovanja u app, bez naginjanja na ekrane. Sve ključno o
                detetovom napretku — strukturirano, kratko, na email.
              </p>

              <div className="space-y-3">
                {[
                  "Vreme učenja po danima u nedelji",
                  "Tri najslabije oblasti — sa preporukama",
                  "Procenat spremnosti i trend",
                  "Rang u razredu i ligi",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-success flex-shrink-0 mt-0.5"
                    />
                    <span className="text-base-content/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden max-w-lg mx-auto">
                {/* Email header */}
                <div className="px-6 py-4 border-b border-base-200">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                      <span className="text-base">5</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">5ica</div>
                      <div className="text-xs text-base-content/60 truncate">
                        nedeljni-izvestaj@5ica.rs
                      </div>
                    </div>
                    <div className="text-xs text-base-content/60">
                      Pon, 9:00
                    </div>
                  </div>
                  <h4 className="font-bold text-lg leading-tight mt-3">
                    Markov nedeljni napredak — 12% bolji
                  </h4>
                </div>

                {/* Email body */}
                <div className="p-6 space-y-4">
                  <p className="text-sm leading-relaxed">
                    Pozdrav Aleksandra! Marko je ove nedelje{" "}
                    <strong>vežbao 4 dana</strong> i napravio značajan napredak
                    u oblasti procente.
                  </p>

                  <div className="bg-base-200 rounded-xl p-4">
                    <div className="text-xs uppercase tracking-wider text-base-content/60 mb-3 font-semibold">
                      Ovonedeljna statistika
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-2xl font-bold">3h 42m</div>
                        <div className="text-xs text-base-content/60">
                          Vreme
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-success">
                          78%
                        </div>
                        <div className="text-xs text-base-content/60">
                          Tačnost
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">
                          +247
                        </div>
                        <div className="text-xs text-base-content/60">XP</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-warning/10 border border-warning/30 rounded-xl p-3.5">
                    <div className="text-xs text-warning-content font-semibold mb-1 flex items-center gap-1.5">
                      <Bell size={12} />
                      Treba pomoć
                    </div>
                    <div className="text-sm">
                      Procenti — Marko ima 42% tačnosti. Predloženo: 5 min
                      vežbe svaki dan.
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm w-full rounded-xl">
                    Vidi detaljan izveštaj →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full benefits list */}
      <section className="py-20 md:py-24 bg-base-200">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Sve što dobiješ
            </h2>
          </div>

          <div className="bg-base-100 rounded-3xl border border-base-300 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-success flex-shrink-0 mt-0.5"
                  />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="prijavi-se"
        className="py-20 md:py-28 relative overflow-hidden bg-base-100 scroll-mt-24"
      >
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(52% 0.20 258 / 0.6) 0%, transparent 70%)",
          }}
        />

        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <Mail size={40} className="mx-auto text-primary mb-4" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Prijavi se i budi prvi.
          </h2>
          <p className="text-base-content/70 mb-10 text-lg">
            Kad lansiramo, dobićeš email sa beta pristupom. Bez troška, bez
            obaveze.
          </p>
          <div className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-200 max-w-md mx-auto">
            <WaitlistForm variant="inline" source="za-roditelje" />
          </div>
        </div>
      </section>
    </>
  );
}
