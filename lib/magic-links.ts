import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { getDb } from "./mongodb";

export type MagicLink = {
  _id: ObjectId;
  token: string;
  email: string;
  intent: "parent-signin";
  expiresAt: Date;
  usedAt: Date | null;
  createdAt: Date;
  ipAddress: string | null;
};

const COLLECTION = "magicLinks";
const MAGIC_LINK_TTL_MINUTES = 15;

export async function createMagicLink(input: {
  email: string;
  ipAddress?: string | null;
}): Promise<{ token: string; expiresAt: Date }> {
  const db = await getDb();
  const collection = db.collection<MagicLink>(COLLECTION);

  const token = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + MAGIC_LINK_TTL_MINUTES * 60 * 1000);

  await collection.insertOne({
    _id: new ObjectId(),
    token,
    email: input.email.trim().toLowerCase(),
    intent: "parent-signin",
    expiresAt,
    usedAt: null,
    createdAt: now,
    ipAddress: input.ipAddress ?? null,
  });

  return { token, expiresAt };
}

/**
 * Konzumira magic link — ako je validan, vraća email i markira kao iskorišćen.
 * Vraća null ako je token nevažeći, istekao, ili već iskorišćen.
 */
export async function consumeMagicLink(token: string): Promise<{
  email: string;
} | null> {
  if (!token) return null;
  const db = await getDb();
  const collection = db.collection<MagicLink>(COLLECTION);

  const link = await collection.findOne({
    token,
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!link) return null;

  // Marker kao iskorišćen (race-condition safe — atomic update)
  const updateResult = await collection.updateOne(
    { _id: link._id, usedAt: null },
    { $set: { usedAt: new Date() } }
  );

  if (updateResult.modifiedCount === 0) {
    // Drugi request je već konzumirao — fail securely
    return null;
  }

  return { email: link.email };
}

/**
 * Rate limit check — koliko magic linkova je traženo za email u poslednjem satu.
 */
export async function recentMagicLinksForEmail(
  email: string,
  windowMinutes = 60
): Promise<number> {
  const db = await getDb();
  const since = new Date(Date.now() - windowMinutes * 60 * 1000);
  return db.collection<MagicLink>(COLLECTION).countDocuments({
    email: email.trim().toLowerCase(),
    createdAt: { $gte: since },
  });
}

export async function ensureMagicLinkIndexes() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex({ token: 1 }, { unique: true });
  await collection.createIndex({ email: 1, createdAt: -1 });
  // TTL — automatski briše stare linkove sat vremena posle isteka
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 3600 });
}
