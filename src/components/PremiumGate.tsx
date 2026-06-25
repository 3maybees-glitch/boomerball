"use client";

import { useCallback, useEffect, useState } from "react";
import { Lock, Unlock, Loader2 } from "lucide-react";
import { PREMIUM_COOKIE, PREMIUM_PRICE_DISPLAY } from "@/lib/premium";

function hasPremiumCookie(): boolean {
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

  const syncPremiumState = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("premium") === "success") {
      document.cookie = `${PREMIUM_COOKIE}=1; path=/; max-age=31536000; SameSite=Lax`;
      window.history.replaceState({}, "", "/advanced");
    }
    setUnlocked(hasPremiumCookie());
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      syncPremiumState();
      setMounted(true);
    });
  }, [syncPremiumState]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.demo) {
        document.cookie = `${PREMIUM_COOKIE}=1; path=/; max-age=31536000; SameSite=Lax`;
        setUnlocked(true);
        return;
      }
      setError(data.error ?? "Unable to start checkout. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
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
          Premium access active — lifetime advanced stats unlocked.
        </div>
        {children}
      </div>
    );
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border-2 border-crimson/30 bg-white">
        <div className="pointer-events-none select-none blur-sm">{children}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-cream/80 backdrop-blur-[2px]">
          <div className="mx-4 max-w-md rounded-2xl border-2 border-crimson bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-crimson">
              <Lock className="h-7 w-7 text-cream" aria-hidden />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-crimson">
              Unlock Advanced Stats
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              One-time purchase for lifetime access to EPA, success rate, havoc rate,
              pressure metrics, and more — updated weekly during the season.
            </p>
            <p className="mt-4 font-display text-3xl font-bold text-crimson">
              {PREMIUM_PRICE_DISPLAY}
              <span className="text-sm font-normal text-ink/60"> one-time</span>
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-crimson px-6 py-3 font-bold text-cream transition hover:bg-crimson-dark disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Processing…
                </span>
              ) : (
                "Purchase Lifetime Access"
              )}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <p className="mt-4 text-[10px] text-ink/50">
              Secure payment via Stripe. Fan project — not affiliated with the
              University of Oklahoma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
