import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { AppShell } from "@/components/layout/AppShell";
import { MagicLinkForm } from "@/components/auth/MagicLinkForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Prijavi se",
  description: "Prijavi se na 5ica nalog magic linkom.",
};

export default async function PrijaviSePage() {
  const user = await getCurrentUser();
  if (user) {
    if (user.type === "parent") redirect("/roditelj");
    if (user.type === "child") redirect("/app");
    if (user.type === "admin") redirect("/admin");
  }

  return (
    <AppShell>
      <header className="px-5 py-5">
        <Logo size="md" href="/" />
      </header>

      <div className="flex-1 px-5 py-4 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold mb-1.5 tracking-tight">
            Prijavi se
          </h1>
          <p className="text-sm text-base-content/70">
            Unesi email — poslaćemo ti magic link.
          </p>
        </div>

        <MagicLinkForm />

        <p className="text-center text-xs text-base-content/55 mt-8 leading-relaxed px-2">
          Klikom prihvataš{" "}
          <Link href="/pravila" className="link">
            pravila korišćenja
          </Link>{" "}
          i{" "}
          <Link href="/privatnost" className="link">
            politiku privatnosti
          </Link>
          .
        </p>
      </div>

      <footer className="px-5 py-4 text-center text-xs text-base-content/50">
        <Link href="/" className="hover:text-primary">
          ← Nazad na početnu
        </Link>
      </footer>
    </AppShell>
  );
}
