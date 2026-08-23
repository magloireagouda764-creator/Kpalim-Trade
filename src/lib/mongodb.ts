import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

if (!MONGODB_URI) throw new Error('MONGODB_URI manquant dans .env.local');

interface Cache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var __mongoCache: Cache | undefined;
}

const cached: Cache = global.__mongoCache ?? { conn: null, promise: null };
if (!global.__mongoCache) global.__mongoCache = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
