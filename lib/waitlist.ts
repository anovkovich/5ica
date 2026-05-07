import { getDb } from "./mongodb";

export type WaitlistSubscriber = {
  email: string;
  source: string;
  userAgent?: string;
  createdAt: Date;
};

const COLLECTION = "waitlistSubscribers";

/**
 * Dodaj email na waitlist. Ako email već postoji, ažurira `lastTouchedAt` i source ako je nov.
 */
export async function addSubscriber(input: {
  email: string;
  source: string;
  userAgent?: string;
}): Promise<{ alreadyExists: boolean }> {
  const db = await getDb();
  const collection = db.collection<WaitlistSubscriber>(COLLECTION);

  const normalizedEmail = input.email.trim().toLowerCase();

  const existing = await collection.findOne({ email: normalizedEmail });

  if (existing) {
    await collection.updateOne(
      { email: normalizedEmail },
      { $set: { lastTouchedAt: new Date() } }
    );
    return { alreadyExists: true };
  }

  await collection.insertOne({
    email: normalizedEmail,
    source: input.source,
    userAgent: input.userAgent,
    createdAt: new Date(),
  });

  return { alreadyExists: false };
}

/**
 * Provera da li email postoji.
 */
export async function emailExists(email: string): Promise<boolean> {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  const result = await collection.findOne({
    email: email.trim().toLowerCase(),
  });
  return result !== null;
}

/**
 * Brojač svih subskribera (za admin dashboard kasnije).
 */
export async function countSubscribers(): Promise<number> {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  return collection.countDocuments();
}

/**
 * Brojač po source-u (homepage, sprint, za-roditelje, itd.)
 */
export async function countBySource(): Promise<Record<string, number>> {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  const results = await collection
    .aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$source", count: { $sum: 1 } } },
    ])
    .toArray();

  return results.reduce<Record<string, number>>((acc, { _id, count }) => {
    acc[_id] = count;
    return acc;
  }, {});
}

/**
 * Kreiraj indeks za brzu pretragu po email-u (poziva se prilikom prvog mount-a).
 */
export async function ensureIndexes() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ source: 1 });
  await collection.createIndex({ createdAt: -1 });
}
