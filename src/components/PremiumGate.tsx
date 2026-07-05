"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock, Mail, ShieldCheck, Unlock, Loader2 } from "lucide-react";
import {
  PREMIUM_COOKIE,
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_PRODUCT_NAME,
  PREMIUM_ROUTE,
  PREMIUM_TIER_NAME,
  PREMIUM_TIER_TAGLINE,
} from "@/lib/premium";

const IS_DEV = process.env.NODE_ENV === "development";

function hasLegacyPremiumCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${PREMIUM_COOKIE}=1`);
}

interface PremiumGateProps {
  children: React.ReactNode;
}

export function PremiumGate({ children }: PremiumGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(true);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicMessage, setMagicMessage] = useState<string | null>(null);

  const verifySession = useCallback(async (sessionId: string) => {
    const res = await fetch(`/api/verify-premium?session_id=${sessionId}`);
    const data = await res.json();
    if (data.premium) {
      setUnlocked(true);
      window.history.replaceState({}, "", PREMIUM_ROUTE);
      return true;
    }
    setError(data.error ?? "Payment verification failed. Contact support if you were charged.");
    return false;
  }, []);

  const verifyMagicLink = useCallback(async (token: string) => {
    const res = await fetch(`/api/restore-premium?token=${encodeURIComponent(token)}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.premium) {
      setUnlocked(true);
      window.history.replaceState({}, "", window.location.pathname);
      return true;
    }
    setError(data.error ?? "Magic link expired or invalid. Request a new one below.");
    return false;
  }, []);

  const syncPremiumState = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("checkout") === "cancelled") {
      setCancelled(true);
      window.history.replaceState({}, "", PREMIUM_ROUTE);
    }

    const magicToken = params.get("magic_token");
    if (magicToken) {
      const ok = await verifyMagicLink(magicToken);
      if (ok) return;
    }

    const sessionId = params.get("session_id");
    if (sessionId) {
      const ok = await verifySession(sessionId);
      if (ok) return;
    }

    try {
      const statusRes = await fetch("/api/premium-status");
      const status = await statusRes.json();
      if (status.premium) {
        setUnlocked(true);
        return;
      }
    } catch {
      // fall through
    }

    if (IS_DEV && hasLegacyPremiumCookie()) {
      setUnlocked(true);
    }
  }, [verifySession, verifyMagicLink]);

  useEffect(() => {
    fetch("/api/checkout")
      .then((res) => res.json())
      .then((data) => setStripeConfigured(Boolean(data.configured)))
      .catch(() => setStripeConfigured(false));
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      syncPremiumState().finally(() => setMounted(true));
    });
  }, [syncPremiumState]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    setCancelled(false);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.demo && IS_DEV) {
        document.cookie = `${PREMIUM_COOKIE}=1; path=/; max-age=315360000; SameSite=Lax`;
        setUnlocked(true);
        return;
      }
      setError(data.error ?? data.message ?? "Unable to start checkout. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setMagicLoading(true);
    setMagicMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: magicEmail,
          redirect: window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setMagicMessage(data.message);
        return;
      }
      setError(data.error ?? "Unable to send magic link. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setMagicLoading(false);
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-crimson" aria-hidden />
      </div>
    );
  }

  if (unlocked) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          <Unlock className="h-4 w-4" aria-hidden />
          {PREMIUM_TIER_NAME} access active — lifetime analytics unlocked.
        </div>
        {children}
      </div>
    );
  }

  return (
    <div>
      {cancelled && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Checkout cancelled — your card was not charged. Ready when you are.
        </div>
      )}
      <div className="relative overflow-hidden rounded-2xl border border-crimson/20 bg-white/95 shadow-[0_8px_32px_rgba(26,10,10,0.08)]">
        <div className="pointer-events-none select-none blur-sm">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-cream/80 backdrop-blur-[2px]">
          <div className="mx-4 max-w-md rounded-2xl border border-crimson/25 bg-white p-8 text-center shadow-[0_12px_40px_rgba(132,22,23,0.15)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-crimson">
              <Lock className="h-7 w-7 text-cream" aria-hidden />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-crimson/70">
              Members Only
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-crimson">
              Enter {PREMIUM_TIER_NAME}
            </h2>
            <p className="mt-2 text-sm text-ink/70">{PREMIUM_TIER_TAGLINE}</p>
            <ul className="mt-4 space-y-1.5 text-left text-sm text-ink/75">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />
                SP+, EPA, havoc rate & PFF-style player grades
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-crimson" aria-hidden />
                Scheme guides, recruiting intel & weekly season updates
              </li>
            </ul>
            <p className="mt-4 font-display text-3xl font-bold text-crimson">
              {PREMIUM_PRICE_DISPLAY}
              <span className="text-sm font-normal text-ink/60"> one-time · lifetime</span>
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-crimson px-6 py-3 font-bold text-cream transition hover:bg-crimson-dark disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Redirecting to Stripe…
                </span>
              ) : (
                `Unlock ${PREMIUM_TIER_NAME}`
              )}
            </button>

            <div className="mt-6 border-t border-cream-dark pt-5 text-left">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-ink/45">
                Already purchased?
              </p>
              <p className="mt-1.5 text-center text-xs leading-relaxed text-ink/60">
                Enter the email you used at checkout and we&apos;ll send a magic link
                to get back in on this device.
              </p>
              <form onSubmit={handleMagicLink} className="mt-3 space-y-2.5">
                <label className="block">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-crimson/20 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm placeholder:text-ink/35 focus:border-crimson focus:outline-none focus:ring-2 focus:ring-crimson/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={magicLoading || !magicEmail.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-crimson/25 bg-cream px-6 py-2.5 text-sm font-bold text-crimson transition hover:bg-crimson/10 disabled:opacity-60"
                >
                  {magicLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending link…
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" aria-hidden />
                      Send me a magic link
                    </>
                  )}
                </button>
              </form>
              {magicMessage && (
                <p className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs leading-relaxed text-green-800">
                  {magicMessage}
                </p>
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {!stripeConfigured && IS_DEV && (
              <p className="mt-3 text-xs text-amber-700">
                Dev mode: Stripe keys not set — checkout unlocks demo access locally.
              </p>
            )}
            <p className="mt-4 text-[10px] leading-relaxed text-ink/50">
              Secure payment via Stripe · {PREMIUM_PRODUCT_NAME} · Published by{" "}
              <a
                href="https://maybeecreations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink/70"
              >
                Maybee Creations
              </a>
              . Not affiliated with the University of Oklahoma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
