import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/sessions";
import { SESSION_COOKIE_NAME, clearSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      await deleteSession(token);
    }

    await clearSessionCookie();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[auth/logout] error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: { code: "internal_error", message: "Logout greška" },
      },
      { status: 500 }
    );
  }
}
