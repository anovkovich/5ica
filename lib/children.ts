import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import type { User } from "./users";

const COLLECTION = "users";
const MAX_CHILDREN_PER_PARENT = 5;

export type ChildInput = {
  parentId: ObjectId;
  displayName: string;
  grade: number;
  avatarId: string;
};

export type Child = User & {
  type: "child";
  parentId: ObjectId;
  grade: number;
};

/**
 * Kreiraj nalog za dete (pripadan roditelju).
 * Ne dozvoljava više od MAX_CHILDREN_PER_PARENT.
 */
export async function createChild(input: ChildInput): Promise<Child> {
  const db = await getDb();
  const collection = db.collection<User>(COLLECTION);

  const existingChildren = await collection.countDocuments({
    parentId: input.parentId,
    type: "child",
    deletedAt: null,
  });

  if (existingChildren >= MAX_CHILDREN_PER_PARENT) {
    throw new Error(
      `Možeš da dodaš najviše ${MAX_CHILDREN_PER_PARENT} dece po nalogu`
    );
  }

  const now = new Date();
  const child: Omit<Child, "_id"> = {
    type: "child",
    email: null,
    parentId: input.parentId,
    displayName: input.displayName.trim(),
    avatarId: input.avatarId,
    grade: input.grade,
    language: "sr-Latn",
    createdAt: now,
    lastLoginAt: null,
    deletedAt: null,
  };

  const result = await collection.insertOne(child as Child);
  return { ...child, _id: result.insertedId } as Child;
}

export async function getChildrenByParent(
  parentId: ObjectId
): Promise<Child[]> {
  const db = await getDb();
  const collection = db.collection<User>(COLLECTION);

  const children = await collection
    .find({
      parentId,
      type: "child",
      deletedAt: null,
    })
    .sort({ createdAt: 1 })
    .toArray();

  return children as Child[];
}

export async function getChildById(
  id: ObjectId | string,
  parentId?: ObjectId
): Promise<Child | null> {
  const db = await getDb();
  const _id = typeof id === "string" ? new ObjectId(id) : id;

  const filter: Record<string, unknown> = {
    _id,
    type: "child",
    deletedAt: null,
  };
  if (parentId) filter.parentId = parentId;

  return (await db.collection<User>(COLLECTION).findOne(filter)) as Child | null;
}

export async function deleteChild(
  id: ObjectId,
  parentId: ObjectId
): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .collection<User>(COLLECTION)
    .updateOne(
      { _id: id, parentId, type: "child", deletedAt: null },
      { $set: { deletedAt: new Date() } }
    );
  return result.modifiedCount > 0;
}
