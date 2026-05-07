import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI nije postavljen. Proveri .env.local ili Vercel env varijable."
  );
}

const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse connection across HMR reloads u development-u
  const g = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!g._mongoClientPromise) {
    g._mongoClientPromise = new MongoClient(uri, options)
      .connect()
      .catch((e) => {
        delete g._mongoClientPromise;
        throw e;
      });
  }
  clientPromise = g._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export default clientPromise;

/**
 * Helper za pristup glavnoj bazi.
 */
export async function getDb() {
  const client = await clientPromise;
  return client.db("5ica");
}
