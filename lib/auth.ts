import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionByToken } from "./sessions";
import { getUserById, type User, type UserType } from "./users";

export const SESSION_COOKIE_NAME = "mm_session";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await getSessionByToken(token);
  if (!session) return null;

  return getUserById(session.userId);
}

/**
 * Server Component helper — koristi se u layout.tsx za auth gate.
 * Redirektuje na /prijavi-se ako user nije autentifikovan.
 */
export async function requireAuth(allowedTypes?: UserType[]): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/prijavi-se");
  }

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    // User je logovan ali pogrešan tip — redirect na home
    redirect("/");
  }

  return user;
}

/**
 * Set session cookie iz Server Action-a.
 *
 * NAPOMENA: Next.js 16 dozvoljava cookie set SAMO u Server Action-ima i Route
 * Handler-ima, NE u Server Components. Za Route Handler-e koristi
 * `response.cookies.set(...)` direktno (vidi `/api/auth/verify/route.ts`).
 */
export async function setSessionCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
