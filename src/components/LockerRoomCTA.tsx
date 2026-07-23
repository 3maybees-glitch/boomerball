"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  PREMIUM_COOKIE,
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_PRODUCT_NAME,
  PREMIUM_ROUTE,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";
import { cn } from "@/lib/utils";

const IS_DEV = process.env.NODE_ENV === "development";

interface LockerRoomCTAProps {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "featured";
  /** Use on dark backgrounds (e.g. crimson footer) for readable fine print */
  onDark?: boolean;
}

export function LockerRoomCTA({
  label = `Join ${PREMIUM_TIER_NAME}`,
  className,
  variant = "primary",
  onDark = false,
}: LockerRoomCTAProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (data.demo && IS_DEV) {
        document.cookie = `${PREMIUM_COOKIE}=1; path=/; max-age=315360000; SameSite=Lax`;
        window.location.href = PREMIUM_ROUTE;
        return;
      }
      setError(data.error ?? data.message ?? "Unable to start checkout. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const baseStyles =
    variant === "featured"
      ? "bg-cream px-10 py-4 text-lg text-crimson shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-4 ring-cream/40 transition hover:scale-[1.03] hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      : variant === "primary"
        ? "bg-crimson px-8 py-3.5 text-cream hover:bg-crimson-dark"
        : "border-2 border-crimson bg-white px-8 py-3.5 text-crimson hover:bg-cream";

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={cn(
          "rounded-full font-bold transition disabled:opacity-60 disabled:hover:scale-100",
          baseStyles,
        )}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Redirecting to Stripe…
          </span>
        ) : (
          label
        )}
      </button>
      {error && (
        <p
          className={cn(
            "mt-2 max-w-xs text-center text-sm",
            onDark ? "text-cream" : "text-red-600",
          )}
          role="alert"
        >
          {error}
        </p>
      )}
      <p
        className={cn(
          "mt-3 max-w-sm text-center leading-relaxed",
          onDark ? "text-sm text-cream/75" : "text-[10px] text-ink/50",
        )}
      >
        {PREMIUM_PRICE_DISPLAY} one-time · lifetime access · Secure payment via Stripe ·{" "}
        {PREMIUM_PRODUCT_NAME}
      </p>
      <p
        className={cn(
          "mt-1.5 text-center leading-relaxed",
          onDark ? "text-xs text-cream/60" : "text-[10px] text-ink/45",
        )}
      >
        <Link
          href="/terms"
          className={cn(
            "underline underline-offset-2",
            onDark ? "decoration-cream/30 hover:text-cream/80" : "decoration-ink/20 hover:text-ink/70",
          )}
        >
          Terms
        </Link>
        {" · "}
        <Link
          href="/refunds"
          className={cn(
            "underline underline-offset-2",
            onDark ? "decoration-cream/30 hover:text-cream/80" : "decoration-ink/20 hover:text-ink/70",
          )}
        >
          Refunds
        </Link>
      </p>
    </div>
  );
}
