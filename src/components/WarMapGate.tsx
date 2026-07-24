"use client";

import { useEffect, useState, useTransition } from "react";
import { Lock, Printer, Unlock, Loader2, Map } from "lucide-react";
import {
  WAR_MAP_COOKIE,
  WAR_MAP_PRICE_DISPLAY,
  WAR_MAP_PRODUCT_NAME,
  WAR_MAP_ROUTE,
} from "@/lib/war-map";
import { WarMapSheet } from "@/components/WarMapSheet";
import { warMapHeadline } from "@/data/war-map-2026";

const IS_DEV = process.env.NODE_ENV === "development";

function hasLegacyWarMapCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${WAR_MAP_COOKIE}=1`);
}

export function WarMapGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const configRes = await fetch("/api/war-map/checkout");
        const config = await configRes.json();
        if (active) setStripeConfigured(Boolean(config.configured));
      } catch {
        if (active) setStripeConfigured(false);
      }

      const params = new URLSearchParams(window.location.search);

      if (params.get("checkout") === "cancelled" && active) {
        setCancelled(true);
        window.history.replaceState({}, "", WAR_MAP_ROUTE);
      }

      const sessionId = params.get("session_id");
      if (sessionId) {
        try {
          const res = await fetch(`/api/war-map/verify?session_id=${sessionId}`);
          const data = await res.json();
          if (data.unlocked && active) {
            startTransition(() => setUnlocked(true));
            window.history.replaceState({}, "", WAR_MAP_ROUTE);
            if (active) setMounted(true);
            return;
          }
          if (active && data.error) {
            setError(
              data.error ??
                "Payment verification failed. Contact support if you were charged.",
            );
          }
        } catch {
          // fall through to status check
        }
      }

      try {
        const statusRes = await fetch("/api/war-map/status");
        const status = await statusRes.json();
        if (status.unlocked && active) {
          startTransition(() => setUnlocked(true));
          if (active) setMounted(true);
          return;
        }
      } catch {
        // fall through
      }

      if (IS_DEV && hasLegacyWarMapCookie() && active) {
        startTransition(() => setUnlocked(true));
      }

      if (active) setMounted(true);
    }

    void bootstrap();
    return () => {
      active = false;
    };
  }, [startTransition]);

  const startCheckout = async () => {
    setLoading(true);
    setError(null);
    setCancelled(false);

    try {
      const res = await fetch("/api/war-map/checkout", { method: "POST" });
      const data = await res.json();

      if (data.demo) {
        document.cookie = `${WAR_MAP_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 365}`;
        setUnlocked(true);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setError(data.error ?? "Checkout unavailable. Try again.");
    } catch {
      setError("Checkout failed. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-crimson" aria-hidden />
        <span className="sr-only">Loading WAR MAP</span>
      </div>
    );
  }

  if (unlocked) {
    return (
      <div className="space-y-4">
        <div className="print:hidden flex flex-wrap items-center justify-between gap-3 rounded-xl border border-crimson/15 bg-white/90 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-ink/70">
            <Unlock className="h-4 w-4 text-crimson" aria-hidden />
            <span>
              Unlocked · Projected <strong className="text-ink">{warMapHeadline.record}</strong> ·{" "}
              {warMapHeadline.bowl}
            </span>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-full bg-crimson px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-cream transition hover:bg-crimson-dark active:scale-[0.98]"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden />
            Print one page
          </button>
        </div>
        <WarMapSheet />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-crimson/20 bg-white shadow-[0_12px_40px_rgba(26,10,10,0.08)]">
        <div className="bg-gradient-to-br from-crimson to-crimson-dark px-6 py-8 text-cream sm:px-8">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-ink/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
            <Map className="h-3 w-3" aria-hidden />
            Digital download
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            2026 WAR MAP
          </h2>
          <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-cream/85">
            The one-page Sooner season preview: depth charts, unit grades, projected
            scores, freshman hopefuls, NFL draft board, and bowl placement — packed
            tight for your fridge or locker.
          </p>
          <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">
            {WAR_MAP_PRICE_DISPLAY}
            <span className="ml-2 text-sm font-semibold uppercase tracking-wide text-cream/70">
              one-time
            </span>
          </p>
        </div>

        <div className="space-y-5 px-6 py-6 sm:px-8">
          <ul className="grid gap-2 text-sm text-ink/70 sm:grid-cols-2">
            {[
              "Full 12-game projected scores",
              "Unit grades A–F with strengths",
              "Starter & depth chart by position",
              "2027 NFL draft potentials",
              "Freshman impact hopefuls",
              `${warMapHeadline.record} · ${warMapHeadline.bowl} call`,
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          {cancelled && (
            <p className="rounded-lg border border-ink/10 bg-cream/60 px-3 py-2 text-sm text-ink/70">
              Checkout cancelled — no charge. Unlock anytime below.
            </p>
          )}

          {error && (
            <p className="rounded-lg border border-crimson/25 bg-crimson/5 px-3 py-2 text-sm text-crimson">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-cream shadow-[0_8px_24px_rgba(132,22,23,0.28)] transition hover:bg-crimson-dark disabled:opacity-70 active:scale-[0.99]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Lock className="h-4 w-4" aria-hidden />
            )}
            {stripeConfigured
              ? `Unlock for ${WAR_MAP_PRICE_DISPLAY}`
              : IS_DEV
                ? "Demo unlock (dev)"
                : `Unlock for ${WAR_MAP_PRICE_DISPLAY}`}
          </button>

          <p className="text-center text-xs leading-relaxed text-ink/45">
            {WAR_MAP_PRODUCT_NAME}. Locker Room members unlock automatically. Instant
            access after payment — print anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
