import { cn } from "@/lib/cn";

/**
 * AppShell — mobile-only viewport za sve app surfaces (auth, parent, app, admin).
 *
 * Ponašanje:
 * - **Mobile** (<768px): card je full-screen, edge-to-edge, kao native PWA
 * - **Desktop** (≥768px): card je vertikalno centriran (max-w-md, ~448px),
 *   sa rounded-3xl + shadow + subtle brand gradient u pozadini
 */
export function AppShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-base-200 relative md:flex md:items-center md:justify-center md:p-6 lg:p-8">
      {/* Subtle brand gradient — samo na desktopu, suptilan */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 800px 600px at 15% 0%, oklch(52% 0.20 258 / 0.12), transparent 60%), radial-gradient(ellipse 700px 500px at 85% 100%, oklch(58% 0.21 25 / 0.10), transparent 60%), radial-gradient(ellipse 500px 400px at 50% 50%, oklch(80% 0.15 80 / 0.06), transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative w-full max-w-md bg-base-100 flex flex-col mx-auto",
          // Mobile: full-screen
          "min-h-screen",
          // Desktop: phone-card
          "md:min-h-0 md:rounded-3xl md:overflow-hidden md:shadow-2xl md:border md:border-base-300",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
