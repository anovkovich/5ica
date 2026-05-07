import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addSubscriber } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email("Email nije validan"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Saglasnost je obavezna",
  }),
  source: z.string().max(100).default("homepage"),
});

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
            message: "Neispravni podaci",
            details: parsed.error.flatten().fieldErrors,
          },
        },
        { status: 422 }
      );
    }

    const userAgent = req.headers.get("user-agent") ?? undefined;

    const result = await addSubscriber({
      email: parsed.data.email,
      source: parsed.data.source,
      userAgent,
    });

    return NextResponse.json({
      ok: true,
      data: {
        alreadyExists: result.alreadyExists,
        message: result.alreadyExists
          ? "Već si na listi! Bićeš obavešten/a kad krenemo."
          : "Hvala što veruješ u nas! Bićeš među prvima.",
      },
    });
  } catch (error) {
    console.error("[waitlist/subscribe] error:", error);
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
