import { Sparkles, Zap, Trophy, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

export default async function AppHomePage() {
  const child = await getCurrentUser();
  if (!child || child.type !== "child") return null;

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="text-center pt-4">
        <h1 className="text-3xl font-extrabold mb-1 tracking-tight">
          Zdravo,{" "}
          <span className="text-primary">{child.displayName}</span>! 🎉
        </h1>
        <p className="text-sm text-base-content/70">
          {child.grade}. razred · Spreman/na za peticu?
        </p>
      </div>

      <div className="bg-gradient-to-br from-secondary/15 to-accent/15 rounded-2xl p-6 text-center border border-secondary/20">
        <div className="text-5xl mb-3">🚀</div>
        <h2 className="text-lg font-bold mb-1">
          Kvizovi uskoro!
        </h2>
        <p className="text-sm text-base-content/75 leading-snug">
          Tvoj nalog je spreman. Već ti pripremamo pitanja, drugare, lige i
          bedževe.
        </p>
      </div>

      {/* Coming soon features */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-base-content/55 mb-3 px-1">
          Šta dolazi
        </div>

        <FeaturePreview
          icon={<Zap size={18} />}
          color="text-accent bg-accent/15"
          title="Dnevni kviz"
          desc="5 pitanja za 3 minuta"
        />
        <FeaturePreview
          icon={<Trophy size={18} />}
          color="text-primary bg-primary/15"
          title="Lige i bedževi"
          desc="Skupi svojih 5ica"
        />
        <FeaturePreview
          icon={<Users size={18} />}
          color="text-secondary bg-secondary/15"
          title="Drugovi i duel sa mamom"
          desc="Igraj sa drugarima i pobedi roditelje"
        />
        <FeaturePreview
          icon={<Sparkles size={18} />}
          color="text-success bg-success/15"
          title="Streak i avatari"
          desc="Vežbaj svaki dan, otključavaj nove"
        />
      </div>
    </div>
  );
}

function FeaturePreview({
  icon,
  color,
  title,
  desc,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-base-100 border border-base-200 rounded-2xl">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-base-content/60 leading-snug">{desc}</div>
      </div>
    </div>
  );
}
