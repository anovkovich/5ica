"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { consumeDeviceLink } from "@/lib/device-links";
import { getUserById, updateLastLogin } from "@/lib/users";
import { createSession } from "@/lib/sessions";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Server Action — dete klikne "Pristupi 5ici" dugme na claim stranici.
 * Konzumira device link, kreira sesiju, postavlja cookie, redirektuje na /app.
 */
export async function claimDeviceLinkAction(
  formData: FormData
): Promise<{ ok: false; error: string } | void> {
  const token = String(formData.get("token") ?? "");
  if (!token) {
    return { ok: false, error: "Link je nevažeći" };
  }

  const result = await consumeDeviceLink(token);
  if (!result) {
    return {
      ok: false,
      error: "Link je istekao ili je već iskorišćen",
    };
  }

  const child = await getUserById(result.childId);
  if (!child || child.type !== "child" || child.deletedAt) {
    return { ok: false, error: "Dete nije pronađeno" };
  }

  await updateLastLogin(child._id);

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? null;
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const { token: sessionToken, expiresAt } = await createSession({
    userId: child._id,
    userType: "child",
    userAgent,
    ipAddress,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  redirect("/app");
}
