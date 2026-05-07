import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const sections = [
  {
    title: "Aplikacija",
    links: [
      { href: "/za-roditelje", label: "Za roditelje" },
      { href: "/za-decu", label: "Za decu" },
      { href: "/sprint", label: "Mala Matura Sprint" },
    ],
  },
  {
    title: "Kompanija",
    links: [
      { href: "/#prijavi-se", label: "Prijava na waitlist" },
      { href: "mailto:5ica.kontakt@gmail.com", label: "Kontakt" },
    ],
  },
  {
    title: "Pravno",
    links: [
      { href: "/privatnost", label: "Politika privatnosti" },
      { href: "/pravila", label: "Pravila korišćenja" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-neutral text-neutral-content overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(98% 0 0) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Subtle gradient blob */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(58% 0.21 25 / 0.5) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-baseline font-bold">
                <span className="text-secondary text-4xl leading-none">5</span>
                <span className="text-neutral-content text-2xl leading-none">
                  ica
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur">
                <Sparkles size={12} />
                Uskoro
              </span>
            </div>

            <p className="text-neutral-content/70 leading-relaxed max-w-md">
              Vežbaj za peticu. Gejmifikovana aplikacija u kojoj deca vežbaju
              svoje vijuge i pripremaju se za malu maturu.
            </p>

            <div className="pt-2">
              <a
                href="mailto:5ica.kontakt@gmail.com"
                className="inline-flex items-center gap-2 text-neutral-content/80 hover:text-secondary transition-colors text-sm"
              >
                <Mail size={16} />
                5ica.kontakt@gmail.com
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-content/50 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-neutral-content/85 hover:text-secondary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-content/10 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-sm text-neutral-content/55">
          <p>© {new Date().getFullYear()} 5ica. Sva prava zadržana.</p>
          <p className="flex items-center gap-1.5">
            Napravljeno sa{" "}
            <span className="text-secondary text-base">♥</span> u Srbiji
          </p>
        </div>
      </div>
    </footer>
  );
}
