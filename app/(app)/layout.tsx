import { LogOut } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { requireAuth } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const child = await requireAuth(["child"]);

  return (
    <AppShell>
      <header className="bg-base-100 border-b border-base-300 sticky top-0 z-30 md:relative">
        <div className="px-4">
          <div className="flex items-center justify-between min-h-14 py-2.5">
            <div className="flex items-center gap-2.5">
              <AvatarDisplay avatarId={child.avatarId} size="sm" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-base-content/55 leading-none">
                  Pozdrav
                </div>
                <div className="text-sm font-bold leading-tight">
                  {child.displayName}
                </div>
              </div>
            </div>

            <form action={logoutAction}>
              <button
                type="submit"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Odjavi se"
              >
                <LogOut size={16} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </AppShell>
  );
}
