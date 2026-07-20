import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";
import type { StoredPushSubscription, PushSubscriptionJSON, PushTopic } from "./types";
import { normalizeTopics } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "push-subscriptions.json");
const BLOB_PATHNAME = "boomerball/push-subscriptions.json";

type StoreFile = {
  version: 1;
  subscriptions: StoredPushSubscription[];
};

declare global {
  // Persistent across warm serverless invocations in the same isolate.
  var __boomerBallPushStore: StoreFile | undefined;
}

function emptyStore(): StoreFile {
  return { version: 1, subscriptions: [] };
}

function sanitizeStore(parsed: unknown): StoreFile {
  if (!parsed || typeof parsed !== "object") return emptyStore();
  const maybe = parsed as StoreFile;
  if (!Array.isArray(maybe.subscriptions)) return emptyStore();
  return {
    version: 1,
    subscriptions: maybe.subscriptions.filter(
      (row) => row?.subscription?.endpoint && row.subscription.keys?.p256dh,
    ),
  };
}

function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

async function readFromBlob(): Promise<StoreFile | null> {
  if (!blobConfigured()) return null;
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return emptyStore();
    }
    const text = await new Response(result.stream).text();
    if (!text) return emptyStore();
    return sanitizeStore(JSON.parse(text));
  } catch {
    return emptyStore();
  }
}

async function writeToBlob(store: StoreFile): Promise<boolean> {
  if (!blobConfigured()) return false;
  try {
    await put(BLOB_PATHNAME, JSON.stringify(store), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return true;
  } catch (err) {
    console.warn(
      "[push] Blob store write failed",
      err instanceof Error ? err.message : err,
    );
    return false;
  }
}

async function readFromFile(): Promise<StoreFile | null> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return sanitizeStore(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeToFile(store: StoreFile): Promise<boolean> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

async function readStore(): Promise<StoreFile> {
  const fromBlob = await readFromBlob();
  if (fromBlob) return fromBlob;

  const fromFile = await readFromFile();
  if (fromFile) return fromFile;

  if (globalThis.__boomerBallPushStore) {
    return globalThis.__boomerBallPushStore;
  }

  return emptyStore();
}

async function writeStore(store: StoreFile): Promise<void> {
  globalThis.__boomerBallPushStore = store;

  const wroteBlob = await writeToBlob(store);
  if (wroteBlob) return;

  const wroteFile = await writeToFile(store);
  if (wroteFile) return;

  console.warn(
    "[push] Durable store unavailable — subscriptions kept in memory only for this instance. Set BLOB_READ_WRITE_TOKEN for production.",
  );
}

export async function listPushSubscriptions(
  topic?: PushTopic,
): Promise<StoredPushSubscription[]> {
  const store = await readStore();
  if (!topic) return store.subscriptions;
  return store.subscriptions.filter((row) => row.topics.includes(topic));
}

export async function upsertPushSubscription(
  subscription: PushSubscriptionJSON,
  topics: PushTopic[],
): Promise<StoredPushSubscription> {
  const store = await readStore();
  const next: StoredPushSubscription = {
    subscription,
    topics: normalizeTopics(topics),
    updatedAt: new Date().toISOString(),
  };

  const idx = store.subscriptions.findIndex(
    (row) => row.subscription.endpoint === subscription.endpoint,
  );
  if (idx >= 0) store.subscriptions[idx] = next;
  else store.subscriptions.push(next);

  await writeStore(store);
  return next;
}

export async function removePushSubscription(endpoint: string): Promise<boolean> {
  const store = await readStore();
  const before = store.subscriptions.length;
  store.subscriptions = store.subscriptions.filter(
    (row) => row.subscription.endpoint !== endpoint,
  );
  if (store.subscriptions.length === before) return false;
  await writeStore(store);
  return true;
}
