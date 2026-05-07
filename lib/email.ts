import { Resend } from "resend";

const RESEND_KEY = process.env.RESEND_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "5ica <onboarding@resend.dev>";

const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

/**
 * Pošalji magic link email.
 * Ako RESEND_API_KEY nije postavljen, loguje link u konzolu (dev mode).
 */
export async function sendMagicLinkEmail(input: {
  to: string;
  token: string;
}): Promise<void> {
  const verificationUrl = `${SITE_URL}/api/auth/verify?token=${input.token}`;

  if (!resend) {
    console.log("\n╔══════════════════════════════════════════════╗");
    console.log("║ MAGIC LINK (dev mode — Resend nije postavljen) ║");
    console.log("╚══════════════════════════════════════════════╝");
    console.log(`📧 To: ${input.to}`);
    console.log(`🔗 ${verificationUrl}`);
    console.log("");
    return;
  }

  const html = magicLinkEmailHtml({
    verificationUrl,
    email: input.to,
  });

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: input.to,
    subject: "Tvoj link za 5ica",
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error("Slanje email-a nije uspelo");
  }
}

function magicLinkEmailHtml({
  verificationUrl,
  email,
}: {
  verificationUrl: string;
  email: string;
}): string {
  return `<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tvoj link za 5ica</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; max-width: 100%;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 24px 40px; text-align: center;">
              <div style="display: inline-block; font-weight: 900; line-height: 1;">
                <span style="font-size: 56px; color: #d83a44;">5</span><span style="font-size: 32px; color: #1a1a2e;">ica</span>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 0 40px 40px 40px; color: #1a1a2e;">
              <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">Klikni za pristup 5ici</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin: 0 0 24px 0;">
                Pozdrav! Klikni na dugme ispod da bi se prijavio/la na svoj 5ica nalog.
                Link je važeći <strong>15 minuta</strong>.
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                <tr>
                  <td>
                    <a href="${verificationUrl}" style="display: inline-block; background: #4f5fff; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Pristupi 5ici →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin: 0 0 8px 0;">
                Ako dugme ne radi, kopiraj ovaj link u browser:
              </p>
              <p style="font-size: 13px; color: #4f5fff; word-break: break-all; margin: 0;">
                ${verificationUrl}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background: #f9fafb; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; line-height: 1.5;">
              <p style="margin: 0 0 4px 0;">
                Ovaj email je poslat na <strong>${email}</strong> jer je neko zatražio prijavu na 5ica.
              </p>
              <p style="margin: 0;">
                Ako nisi ti, samo ignoriši ovu poruku — link ističe za 15 minuta.
              </p>
            </td>
          </tr>
        </table>

        <p style="color: #9ca3af; font-size: 12px; margin: 24px 0 0 0; text-align: center;">
          5ica — Vežbaj za peticu. ${new Date().getFullYear()}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
