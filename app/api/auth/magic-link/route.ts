import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createMagicLink,
  recentMagicLinksForEmail,
} from "@/lib/magic-links";
import { sendMagicLinkEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email("Email nije validan"),
});

const RATE_LIMIT_PER_HOUR = 10;
const SKIP_RATE_LIMIT = process.env.NODE_ENV === "development";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "validation_failed",
            message: "Unesi validan email",
          },
        },
        { status: 422 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();

    // Rate limiting po email-u (skip u dev-u)
    if (!SKIP_RATE_LIMIT) {
      const recentCount = await recentMagicLinksForEmail(email, 60);
      if (recentCount >= RATE_LIMIT_PER_HOUR) {
        return NextResponse.json(
          {
            ok: false,
            error: {
              code: "rate_limit_exceeded",
              message: "Previše zahteva. Pokušaj ponovo za sat vremena.",
            },
          },
          { status: 429 }
        );
      }
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

    const { token } = await createMagicLink({ email, ipAddress });

    await sendMagicLinkEmail({ to: email, token });

    return NextResponse.json({
      ok: true,
      data: {
        message: "Link je poslat na tvoj email. Proveri inbox (i spam folder).",
      },
    });
  } catch (error) {
    console.error("[auth/magic-link] error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "internal_error",
          message: "Nešto nije u redu sa naše strane. Pokušaj ponovo.",
        },
      },
      { status: 500 }
    );
  }
}
