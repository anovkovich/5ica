/**
 * Postavi sve MongoDB indekse za 5ica.
 * Pokreni: yarn tsx scripts/ensure-indexes.ts
 *
 * Idempotent — može se pozvati više puta. Indeksi se kreiraju samo ako ne postoje.
 */

import { config } from "dotenv";
import { resolve } from "path";

// Učitaj .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { ensureUserIndexes } from "../lib/users";
import { ensureSessionIndexes } from "../lib/sessions";
import { ensureMagicLinkIndexes } from "../lib/magic-links";
import { ensureDeviceLinkIndexes } from "../lib/device-links";
import { ensureIndexes as ensureWaitlistIndexes } from "../lib/waitlist";

async function main() {
  console.log("📦 Kreiram MongoDB indekse...\n");

  console.log("  ▶ users");
  await ensureUserIndexes();
  console.log("    ✓ users indeksi kreirani");

  console.log("  ▶ sessions");
  await ensureSessionIndexes();
  console.log("    ✓ sessions indeksi kreirani");

  console.log("  ▶ magicLinks");
  await ensureMagicLinkIndexes();
  console.log("    ✓ magicLinks indeksi kreirani");

  console.log("  ▶ deviceLinks");
  await ensureDeviceLinkIndexes();
  console.log("    ✓ deviceLinks indeksi kreirani");

  console.log("  ▶ waitlistSubscribers");
  await ensureWaitlistIndexes();
  console.log("    ✓ waitlistSubscribers indeksi kreirani");

  console.log("\n✅ Svi indeksi spremni!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Greška:", err);
  process.exit(1);
});
