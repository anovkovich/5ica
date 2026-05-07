import Link from "next/link";
import { Plus, ChevronRight } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getChildrenByParent } from "@/lib/children";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";

export default async function RoditeljDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const children = await getChildrenByParent(user._id);

  return (
    <div className="px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold mb-1 tracking-tight">
          Pozdrav, <span className="text-primary">{user.displayName}</span> 👋
        </h1>
        <p className="text-sm text-base-content/70">
          {children.length === 0
            ? "Hajde da kreiramo nalog za prvo dete."
            : `Imaš ${children.length} ${
                children.length === 1
                  ? "dete"
                  : children.length < 5
                    ? "deteta"
                    : "dece"
              } u 5ica.`}
        </p>
      </div>

      {/* Children list */}
      {children.length === 0 ? (
        <EmptyChildrenState />
      ) : (
        <div className="space-y-2">
          {children.map((child) => (
            <Link
              key={child._id.toString()}
              href={`/roditelj/dete/${child._id.toString()}`}
              className="flex items-center gap-3 p-3 bg-base-100 border border-base-300 rounded-2xl hover:border-primary/40 hover:bg-base-200 transition-colors"
            >
              <AvatarDisplay avatarId={child.avatarId} size="md" />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{child.displayName}</div>
                <div className="text-xs text-base-content/60">
                  {child.grade}. razred
                </div>
              </div>
              <ChevronRight size={18} className="text-base-content/40" />
            </Link>
          ))}

          {children.length < 5 && (
            <Link
              href="/roditelj/dete/novi"
              className="flex items-center gap-3 p-3 border-2 border-dashed border-base-300 rounded-2xl text-base-content/60 hover:text-primary hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-base-200 flex items-center justify-center flex-shrink-0">
                <Plus size={22} />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Dodaj još jedno dete</div>
                <div className="text-xs">Maks 5 po nalogu</div>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyChildrenState() {
  return (
    <Link
      href="/roditelj/dete/novi"
      className="block p-8 text-center border-2 border-dashed border-base-300 rounded-3xl hover:border-primary/40 transition-colors"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
        <Plus size={28} />
      </div>
      <div className="font-bold text-lg mb-1">Dodaj prvo dete</div>
      <p className="text-sm text-base-content/70">
        Kreiraj nalog — bez email-a, samo nadimak i razred
      </p>
    </Link>
  );
}
