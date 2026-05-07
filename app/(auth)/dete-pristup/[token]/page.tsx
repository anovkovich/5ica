import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AppShell } from "@/components/layout/AppShell";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { ClaimDeviceForm } from "@/components/auth/ClaimDeviceForm";
import { getDeviceLinkByToken } from "@/lib/device-links";
import { getUserById } from "@/lib/users";

type Props = {
  params: Promise<{ token: string }>;
};

export const dynamic = "force-dynamic";

export default async function DetePristupPage({ params }: Props) {
  const { token } = await params;

  const link = await getDeviceLinkByToken(token);
  if (!link) {
    return <ExpiredView />;
  }

  const child = await getUserById(link.childId);
  if (!child || child.type !== "child" || child.deletedAt) {
    return <ExpiredView />;
  }

  return (
    <AppShell>
      <header className="px-5 py-5">
        <Logo size="md" href={null} />
      </header>

      <div className="flex-1 px-5 py-4 flex flex-col items-center text-center">
        <AvatarDisplay avatarId={child.avatarId} size="xl" className="mb-5" />

        <h1 className="text-2xl font-extrabold mb-2 tracking-tight">
          Hajde, <span className="text-primary">{child.displayName}</span>! 👋
        </h1>
        <p className="text-sm text-base-content/70 mb-8 max-w-xs">
          Klikni dugme ispod i prijavi se na svoj 5ica nalog. Ostaćeš logovan/a
          na ovom uređaju.
        </p>

        <div className="w-full max-w-xs">
          <ClaimDeviceForm token={token} />
        </div>

        <p className="text-xs text-base-content/50 mt-8 max-w-xs leading-relaxed">
          Ako nisi <strong>{child.displayName}</strong>, zatvori ovu stranicu.
        </p>
      </div>
    </AppShell>
  );
}

function ExpiredView() {
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
          Link je nevažeći
        </h1>
        <p className="text-sm text-base-content/70 mb-6 px-4 max-w-xs mx-auto">
          Ovaj link je istekao ili je već iskorišćen. Pitaj roditelja da pošalje
          novi.
        </p>

        <Link
          href="/"
          className="btn btn-ghost rounded-2xl font-semibold h-14"
        >
          Nazad na početnu
        </Link>
      </div>
    </AppShell>
  );
}
