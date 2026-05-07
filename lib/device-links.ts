import { ObjectId } from "mongodb";
import { randomBytes } from "crypto";
import { getDb } from "./mongodb";

export type DeviceLink = {
  _id: ObjectId;
  token: string;
  childId: ObjectId;
  parentId: ObjectId;
  expiresAt: Date;
  claimedAt: Date | null;
  createdAt: Date;
};

const COLLECTION = "deviceLinks";
const DEVICE_LINK_TTL_DAYS = 7;

/**
 * Generiši novi device link za dete.
 * Roditelj ovo zove iz dashboard-a, šalje URL detetu (WhatsApp / SMS / etc).
 * Dete klikne URL → kreira se sesija.
 */
export async function createDeviceLink(input: {
  childId: ObjectId;
  parentId: ObjectId;
}): Promise<{ token: string; expiresAt: Date }> {
  const db = await getDb();
  const collection = db.collection<DeviceLink>(COLLECTION);

  const token = randomBytes(32).toString("hex");
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + DEVICE_LINK_TTL_DAYS * 24 * 60 * 60 * 1000
  );

  await collection.insertOne({
    _id: new ObjectId(),
    token,
    childId: input.childId,
    parentId: input.parentId,
    expiresAt,
    claimedAt: null,
    createdAt: now,
  });

  return { token, expiresAt };
}

/**
 * Učitaj device link iz tokena, bez konzumiranja (za rendering claim stranice).
 */
export async function getDeviceLinkByToken(
  token: string
): Promise<DeviceLink | null> {
  if (!token) return null;
  const db = await getDb();
  return db.collection<DeviceLink>(COLLECTION).findOne({
    token,
    expiresAt: { $gt: new Date() },
    claimedAt: null,
  });
}

/**
 * Konzumira device link — atomic markiranje kao claimed.
 * Vraća null ako je već istekao ili iskorišćen.
 */
export async function consumeDeviceLink(token: string): Promise<{
  childId: ObjectId;
  parentId: ObjectId;
} | null> {
  if (!token) return null;
  const db = await getDb();
  const collection = db.collection<DeviceLink>(COLLECTION);

  const result = await collection.findOneAndUpdate(
    {
      token,
      expiresAt: { $gt: new Date() },
      claimedAt: null,
    },
    { $set: { claimedAt: new Date() } },
    { returnDocument: "after" }
  );

  if (!result) return null;
  return {
    childId: result.childId,
    parentId: result.parentId,
  };
}

/**
 * Obriši sve neiskorišćene device linkove za dete (kad parent generiše novi,
 * stari pending postaju nevažeći).
 */
export async function revokeAllPendingForChild(
  childId: ObjectId
): Promise<void> {
  const db = await getDb();
  await db
    .collection<DeviceLink>(COLLECTION)
    .deleteMany({ childId, claimedAt: null });
}

export async function ensureDeviceLinkIndexes() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex({ token: 1 }, { unique: true });
  await collection.createIndex({ childId: 1, claimedAt: 1 });
  await collection.createIndex({ parentId: 1 });
  // TTL — automatski briše stare unclaimed linkove
  await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 86400 });
}
