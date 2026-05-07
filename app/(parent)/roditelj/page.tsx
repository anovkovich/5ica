import { Sparkles } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default async function RoditeljDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold mb-1 tracking-tight">
          Pozdrav, <span className="text-primary">{user?.displayName}</span> 👋
        </h1>
        <p className="text-sm text-base-content/70">
          Tvoj 5ica nalog je aktivan.
        </p>
      </div>

      <div className="bg-base-200 rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent-content flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-bold mb-0.5">Aplikacija je u izgradnji</h2>
            <p className="text-sm text-base-content/70 leading-snug">
              Bićeš među prvima koji probaju funkcionalnosti čim budu spremne.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-base-100">
            <span className="text-success">✓</span>
            <span>Roditeljski nalog kreiran</span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg">
            <span className="text-base-content/40">○</span>
            <span className="text-base-content/60">
              Kreiranje naloga za dete
            </span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg">
            <span className="text-base-content/40">○</span>
            <span className="text-base-content/60">Dnevni kvizovi za dete</span>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg">
            <span className="text-base-content/40">○</span>
            <span className="text-base-content/60">
              Roditeljski izveštaji + duel
            </span>
          </div>
        </div>
      </div>

      <div className="text-xs text-base-content/60 pt-4 border-t border-base-200">
        <p>
          Logovan/a kao <strong>{user?.email}</strong>
        </p>
        <p className="text-base-content/50">Sesija aktivna 30 dana</p>
      </div>
    </div>
  );
}
