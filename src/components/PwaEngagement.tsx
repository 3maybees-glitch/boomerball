"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Bell, Download, Share, X } from "lucide-react";
import { DEFAULT_VAPID_PUBLIC_KEY } from "@/lib/push/public-key";
import { PUSH_TOPICS, type PushTopic } from "@/lib/push/types";

const DISMISS_KEY = "bb-pwa-banner-dismissed";
const TOPICS_KEY = "bb-push-topics";
const OPEN_EVENT = "bb-open-pwa-alerts";

const TOPIC_LABELS: Record<PushTopic, string> = {
  gameday: "Game day",
  mmqb: "MMQB Mondays",
  recruiting: "Recruiting",
};

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function readStoredTopics(): PushTopic[] {
  try {
    const raw = localStorage.getItem(TOPICS_KEY);
    if (!raw) return [...PUSH_TOPICS];
    const parsed = JSON.parse(raw) as PushTopic[];
    const filtered = parsed.filter((t) => PUSH_TOPICS.includes(t));
    return filtered.length > 0 ? filtered : [...PUSH_TOPICS];
  } catch {
    return [...PUSH_TOPICS];
  }
}

function subscribeOpen(onStoreChange: () => void) {
  window.addEventListener(OPEN_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(OPEN_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getDismissedSnapshot() {
  return localStorage.getItem(DISMISS_KEY) === "1";
}

function getStandaloneSnapshot() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function getIsIOSSnapshot() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function getPushSupportedSnapshot() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

export function openPwaAlerts(): void {
  try {
    localStorage.removeItem(DISMISS_KEY);
  } catch {
    // ignore storage failures
  }
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function PwaAlertsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => openPwaAlerts()}>
      Alerts &amp; install
    </button>
  );
}

export function PwaEngagement() {
  const dismissed = useSyncExternalStore(
    subscribeOpen,
    getDismissedSnapshot,
    () => true,
  );
  const isStandalone = useSyncExternalStore(
    subscribeOpen,
    getStandaloneSnapshot,
    () => false,
  );
  const isIOS = useSyncExternalStore(subscribeOpen, getIsIOSSnapshot, () => false);
  const pushSupported = useSyncExternalStore(
    subscribeOpen,
    getPushSupportedSnapshot,
    () => false,
  );

  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [topics, setTopics] = useState<PushTopic[]>([...PUSH_TOPICS]);
  const [expanded, setExpanded] = useState(false);
  const [topicsReady, setTopicsReady] = useState(false);

  useEffect(() => {
    const onOpen = () => setExpanded(true);
    window.addEventListener(OPEN_EVENT, onOpen);

    const id = window.setTimeout(() => {
      setTopics(readStoredTopics());
      setTopicsReady(true);
    }, 0);

    let cancelled = false;
    if ("serviceWorker" in navigator) {
      void (async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
          });
          const sub = await registration.pushManager.getSubscription();
          if (!cancelled) setSubscribed(Boolean(sub));
        } catch (err) {
          console.warn("[pwa] service worker registration failed", err);
        }
      })();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(id);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setExpanded(false);
    window.dispatchEvent(new Event(OPEN_EVENT));
  }

  function toggleTopic(topic: PushTopic) {
    setTopics((current) => {
      const next = current.includes(topic)
        ? current.filter((t) => t !== topic)
        : [...current, topic];
      const normalized = next.length > 0 ? next : [...PUSH_TOPICS];
      localStorage.setItem(TOPICS_KEY, JSON.stringify(normalized));
      return normalized;
    });
  }

  async function enableAlerts() {
    if (!pushSupported) {
      setStatus(
        isIOS && !isStandalone
          ? "Install to your Home Screen first, then enable alerts."
          : "Push isn’t supported in this browser.",
      );
      return;
    }

    setBusy(true);
    setStatus(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Notifications were blocked. Enable them in browser settings.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const publicKey =
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          topics,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Could not save subscription");
      }

      setSubscribed(true);
      setStatus("You’re on the alert list. Boomer Sooner.");
      localStorage.setItem(DISMISS_KEY, "1");
      window.dispatchEvent(new Event(OPEN_EVENT));
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to enable alerts");
    } finally {
      setBusy(false);
    }
  }

  async function disableAlerts() {
    setBusy(true);
    setStatus(null);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setSubscribed(false);
      setStatus("Alerts turned off on this device.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to disable alerts");
    } finally {
      setBusy(false);
    }
  }

  if (!topicsReady) return null;

  const hideBanner = dismissed && !expanded;
  if (hideBanner && !status) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-lg overflow-hidden rounded-2xl border border-cream/20 bg-ink text-cream shadow-[0_16px_48px_rgba(26,10,10,0.35)]">
        <div className="flex items-start gap-3 px-4 py-3.5">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson text-cream">
            <Bell className="h-4 w-4" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-bold uppercase tracking-wide text-cream">
              {subscribed ? "Alerts on" : "Game-day alerts"}
            </p>
            <p className="mt-0.5 text-sm leading-snug text-cream/70">
              {subscribed
                ? "You’ll get MMQB, recruiting, and kickoff reminders when we publish them."
                : "Install Boomer Ball and turn on push for Saturdays, Monday recaps, and recruiting drops."}
            </p>

            {expanded && (
              <fieldset className="mt-3 space-y-2">
                <legend className="sr-only">Alert topics</legend>
                {PUSH_TOPICS.map((topic) => (
                  <label
                    key={topic}
                    className="flex cursor-pointer items-center gap-2 text-sm text-cream/85"
                  >
                    <input
                      type="checkbox"
                      checked={topics.includes(topic)}
                      onChange={() => toggleTopic(topic)}
                      className="h-4 w-4 rounded border-cream/40 bg-ink accent-crimson"
                    />
                    {TOPIC_LABELS[topic]}
                  </label>
                ))}
              </fieldset>
            )}

            {isIOS && !isStandalone && (
              <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-cream/55">
                <Share className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>
                  On iPhone: tap Share, then{" "}
                  <strong className="font-semibold text-cream/80">
                    Add to Home Screen
                  </strong>
                  . Push works after install.
                </span>
              </p>
            )}

            {status && (
              <p className="mt-2 text-xs leading-relaxed text-cream/75" role="status">
                {status}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {!subscribed ? (
                <button
                  type="button"
                  onClick={enableAlerts}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-crimson transition hover:bg-white disabled:opacity-60"
                >
                  <Bell className="h-3.5 w-3.5" aria-hidden />
                  {busy ? "Enabling…" : "Enable alerts"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={disableAlerts}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cream/30 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-cream/90 transition hover:bg-cream/10 disabled:opacity-60"
                >
                  Turn off
                </button>
              )}

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="rounded-full px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-cream/60 transition hover:text-cream"
              >
                {expanded ? "Hide topics" : "Topics"}
              </button>

              {!isStandalone && !isIOS && (
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-cream/45">
                  <Download className="h-3 w-3" aria-hidden />
                  Install from browser menu
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="rounded-full p-1.5 text-cream/50 transition hover:bg-cream/10 hover:text-cream"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
