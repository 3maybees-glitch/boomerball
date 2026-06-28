"use client";

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
  variant?: "primary" | "secondary";
}

export function LockerRoomCTA({
  label = `Join ${PREMIUM_TIER_NAME}`,
  className,
  variant = "primary",
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
    variant === "primary"
      ? "bg-crimson text-cream hover:bg-crimson-dark"
      : "border-2 border-crimson bg-white text-crimson hover:bg-cream";

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={cn(
          "rounded-full px-8 py-3.5 font-bold transition disabled:opacity-60",
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
        <p className="mt-2 max-w-xs text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-center text-[10px] leading-relaxed text-ink/50">
        {PREMIUM_PRICE_DISPLAY} one-time · lifetime access · Secure payment via Stripe ·{" "}
        {PREMIUM_PRODUCT_NAME}
      </p>
    </div>
  );
}
