import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type UserType = "parent" | "child" | "admin";

export type User = {
  _id: ObjectId;
  type: UserType;

  // Parent only
  email: string | null;

  // Child only
  parentId: ObjectId | null;

  displayName: string;
  avatarId: string;
  language: "sr-Latn" | "sr-Cyrl";

  // Lifecycle
  createdAt: Date;
  lastLoginAt: Date | null;
  deletedAt: Date | null;
};

const COLLECTION = "users";

export async function getUserById(id: ObjectId | string): Promise<User | null> {
  const db = await getDb();
  const _id = typeof id === "string" ? new ObjectId(id) : id;
  return db.collection<User>(COLLECTION).findOne({ _id, deletedAt: null });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const db = await getDb();
  return db.collection<User>(COLLECTION).findOne({
    email: email.trim().toLowerCase(),
    type: "parent",
    deletedAt: null,
  });
}

export async function createParentUser(input: {
  email: string;
  displayName?: string;
}): Promise<User> {
  const db = await getDb();
  const collection = db.collection<User>(COLLECTION);

  const email = input.email.trim().toLowerCase();
  const displayName = input.displayName ?? email.split("@")[0];

  const user: Omit<User, "_id"> = {
    type: "parent",
    email,
    parentId: null,
    displayName,
    avatarId: "default",
    language: "sr-Latn",
    createdAt: new Date(),
    lastLoginAt: new Date(),
    deletedAt: null,
  };

  const result = await collection.insertOne(user as User);
  return { ...user, _id: result.insertedId } as User;
}

export async function updateLastLogin(userId: ObjectId): Promise<void> {
  const db = await getDb();
  await db
    .collection<User>(COLLECTION)
    .updateOne({ _id: userId }, { $set: { lastLoginAt: new Date() } });
}

export async function ensureUserIndexes() {
  const db = await getDb();
  const collection = db.collection(COLLECTION);
  await collection.createIndex(
    { email: 1 },
    {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } },
    }
  );
  await collection.createIndex({ parentId: 1 });
  await collection.createIndex({ deletedAt: 1 }, { sparse: true });
}
