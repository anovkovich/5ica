import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AppShell } from "@/components/layout/AppShell";
import { consumeMagicLink } from "@/lib/magic-links";
import { getUserByEmail, createParentUser, updateLastLogin } from "@/lib/users";
import { createSession } from "@/lib/sessions";
import { setSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function VerifikacijaPage({ params }: Props) {
  const { token } = await params;

  const result = await consumeMagicLink(token);

  if (!result) {
    return <ExpiredOrInvalidView />;
  }

  // Token validan — pronađi ili kreiraj korisnika
  let user = await getUserByEmail(result.email);
  if (!user) {
    user = await createParentUser({ email: result.email });
  } else {
    await updateLastLogin(user._id);
  }

  // Kreiraj sesiju
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? null;
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const { token: sessionToken, expiresAt } = await createSession({
    userId: user._id,
    userType: "parent",
    userAgent,
    ipAddress,
  });

  await setSessionCookie(sessionToken, expiresAt);

  // Redirect na roditeljski dashboard
  redirect("/roditelj");
}

function ExpiredOrInvalidView() {
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
