import { ObjectId } from "mongodb";
import { randomBytes, createHash } from "crypto";
import { getDb } from "./mongodb";

export type Session = {
  _id: ObjectId;
  userId: ObjectId;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  lastUsedAt: Date;
  userAgent: string | null;
  ipAddress: string | null;
};

const COLLECTION = "sessions";
const SESSION_TTL_DAYS_PARENT = 30;
const SESSION_TTL_DAYS_CHILD = 60;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Generiši novi session token za korisnika.
 * Vraća RAW token (treba ga staviti u cookie). Hash se čuva u bazi.
 */
export async function createSession(input: {
  userId: ObjectId;
  userType: "parent" | "child" | "admin";
  userAgent?: string | null;
  ipAddress?: string | null;
}): Promise<{ token: string; expiresAt: Date }> {
  const db = await getDb();
  const collection = db.collection<Session>(COLLECTION);

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);

  const ttlDays =
    input.userType === "child"
      ? SESSION_TTL_DAYS_CHILD
      : SESSION_TTL_DAYS_PARENT;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlDays * 24 * 60 * 60 * 1000);

  await collection.insertOne({
    _id: new ObjectId(),
    userId: input.userId,
    tokenHash,
    expiresAt,
    createdAt: now,
    lastUsedAt: now,
    userAgent: input.userAgent ?? null,
    ipAddress: input.ipAddress ?? null,
  });

  return { token, expiresAt };
}

/**
 * Pronađi sesiju iz raw tokena (iz cookie-ja).
 * Vraća null ako sesija ne postoji ili je istekla.
 */
export async function getSessionByToken(
  token: string
): Promise<Session | null> {
  if (!token) return null;
  const db = await getDb();
  const collection = db.collection<Session>(COLLECTION);

  const tokenHash = hashToken(token);
  const session = await collection.findOne({
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (session) {
    // Update lastUsedAt async (ne čekamo)
    collection
      .updateOne({ _id: session._id }, { $set: { lastUsedAt: new Date() } })
      .catch((err) => console.error("Session lastUsed update failed:", err));
  }

  return session;
}

export async function deleteSession(token: string): Promise<void> {
  const db = await getDb();
  const tokenHash = hashToken(token);
  await db.collection<Session>(COLLECTION).deleteOne({ tokenHash });
}

export async function deleteAllSessionsForUser(
  userId: ObjectId
): Promise<void> {
  const db = await getDb();
  await db.collection<Session>(COLLECTION).deleteMany({ userId });
}

export async function ensureSessionIndexes() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex({ tokenHash: 1 }, { unique: true });
  await collection.createIndex({ userId: 1 });
  // TTL indeks — Mongo automatski briše istekle sesije
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}
