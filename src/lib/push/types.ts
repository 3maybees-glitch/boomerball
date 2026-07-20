export const PUSH_TOPICS = ["gameday", "mmqb", "recruiting"] as const;

export type PushTopic = (typeof PUSH_TOPICS)[number];

export type PushSubscriptionJSON = {
  endpoint: string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type StoredPushSubscription = {
  subscription: PushSubscriptionJSON;
  topics: PushTopic[];
  updatedAt: string;
};

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
  badge?: string;
  topic?: PushTopic;
};

export function isPushTopic(value: unknown): value is PushTopic {
  return (
    typeof value === "string" &&
    (PUSH_TOPICS as readonly string[]).includes(value)
  );
}

export function normalizeTopics(topics: unknown): PushTopic[] {
  if (!Array.isArray(topics)) return [...PUSH_TOPICS];
  const filtered = topics.filter(isPushTopic);
  return filtered.length > 0 ? filtered : [...PUSH_TOPICS];
}
