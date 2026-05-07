import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AppShell } from "@/components/layout/AppShell";
import { requireAuth } from "@/lib/auth";

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth(["parent"]);

  return (
    <AppShell>
      <header className="bg-base-100 border-b border-base-300 sticky top-0 z-30 md:relative">
        <div className="px-4">
          <div className="flex items-center justify-between min-h-14 py-2.5">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/60 border-l border-base-300 pl-2">
                Roditelj
              </span>
            </div>

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Odjavi se"
                title={user.email ?? "Odjavi se"}
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
