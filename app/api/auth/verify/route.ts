import { NextRequest, NextResponse } from "next/server";
import { consumeMagicLink } from "@/lib/magic-links";
import { getUserByEmail, createParentUser, updateLastLogin } from "@/lib/users";
import { createSession } from "@/lib/sessions";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/auth/verify?token=...
 * Verifikuje magic link token, kreira/uzima user-a, postavlja session cookie,
 * i redirektuje na /roditelj (ili /verifikacija/error ako je token nevažeći).
 */
export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${origin}/verifikacija/error`);
  }

  const result = await consumeMagicLink(token);
  if (!result) {
    return NextResponse.redirect(`${origin}/verifikacija/error`);
  }

  // Token validan — pronađi ili kreiraj korisnika
  let user = await getUserByEmail(result.email);
  if (!user) {
    user = await createParentUser({ email: result.email });
  } else {
    await updateLastLogin(user._id);
  }

  // Sesija
  const userAgent = req.headers.get("user-agent") ?? null;
  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const { token: sessionToken, expiresAt } = await createSession({
    userId: user._id,
    userType: "parent",
    userAgent,
    ipAddress,
  });

  // Redirect sa cookie postavljenim u response (legalno u Route Handler-u)
  const response = NextResponse.redirect(`${origin}/roditelj`);
  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return response;
}
