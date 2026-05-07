import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Link je istekao",
};

export default function VerifikacijaErrorPage() {
  return (
    <AppShell>
      <header className="px-5 py-5">
        <Logo size="md" href="/" />
      </header>

      <div className="flex-1 px-5 py-4 flex flex-col text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/15 text-error mb-4 mx-auto">
          <AlertCircle size={32} />
        </div>

        <h1 className="text-2xl font-extrabold mb-2 tracking-tight">
          Link je istekao
        </h1>
        <p className="text-sm text-base-content/70 mb-6 px-4">
          Magic link je važeći samo 15 minuta i može da se iskoristi jednom.
        </p>

        <Link
          href="/prijavi-se"
          className="btn btn-primary rounded-2xl font-semibold h-14"
        >
          Zatraži novi link
        </Link>

        <p className="text-xs text-base-content/55 mt-8">
          Imaš pitanje?{" "}
          <a href="mailto:5ica.kontakt@gmail.com" className="link">
            5ica.kontakt@gmail.com
          </a>
        </p>
      </div>
    </AppShell>
  );
}
