"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  BarChart3,
  ClipboardList,
  Dices,
  Mail,
  Shield,
  Star,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionReveal";
import { LockerRoomCTA } from "@/components/LockerRoomCTA";
import {
  LOCKER_ROOM_FEATURES,
  LOCKER_ROOM_PITCH,
  LOCKER_ROOM_TOOL_HIGHLIGHTS,
  type LockerRoomFeatureIcon,
} from "@/data/locker-room-features";
import {
  PREMIUM_PRICE_DISPLAY,
  PREMIUM_RECRUIT_ROUTE,
  PREMIUM_TIER_NAME,
} from "@/lib/premium";

const iconMap: Record<LockerRoomFeatureIcon, LucideIcon> = {
  analytics: BarChart3,
  grades: Star,
  comps: ArrowLeftRight,
  simulator: Dices,
  scheme: Target,
  recruiting: ClipboardList,
  updates: Zap,
  lifetime: Shield,
  magic: Mail,
};

type LockerRoomShowcaseProps = {
  variant?: "home" | "join";
  showCta?: boolean;
};

export function LockerRoomShowcase({
  variant = "home",
  showCta = true,
}: LockerRoomShowcaseProps) {
  const featuredTools = LOCKER_ROOM_TOOL_HIGHLIGHTS;

  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson/70">
          Premium · {PREMIUM_PRICE_DISPLAY} lifetime
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-crimson sm:text-4xl">
          Everything inside {PREMIUM_TIER_NAME}
        </h2>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink/70">
          {LOCKER_ROOM_PITCH}
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {featuredTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-2xl border border-crimson/25 bg-crimson p-6 text-cream shadow-[0_8px_28px_rgba(132,22,23,0.2)] transition hover:border-crimson-dark hover:shadow-[0_12px_36px_rgba(92,15,16,0.3)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/65">
                  Included with membership
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold">{tool.title}</h3>
              </div>
              <span className="rounded-full bg-cream/15 px-3 py-1 text-xs font-bold text-cream">
                {tool.sample}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-cream/90">{tool.teaser}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/75">{tool.detail}</p>
            <span className="mt-4 inline-flex text-sm font-bold text-cream underline decoration-cream/30 underline-offset-4 group-hover:decoration-cream">
              Preview tool →
            </span>
          </Link>
        ))}
      </div>

      <MotionStagger className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCKER_ROOM_FEATURES.map((feature) => {
          const Icon = iconMap[feature.icon];
          const isFeatured = feature.featured;
          const card = (
            <div
              className={`flex h-full flex-col rounded-2xl border p-5 transition ${
                isFeatured
                  ? "border-crimson/20 bg-white shadow-[0_4px_20px_rgba(26,10,10,0.06)]"
                  : "border-crimson/12 bg-white/95 shadow-[0_4px_20px_rgba(26,10,10,0.04)]"
              } ${feature.href ? "hover:border-crimson/35 hover:shadow-[0_8px_28px_rgba(132,22,23,0.12)]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="inline-flex rounded-xl bg-crimson/10 p-2.5 text-crimson">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                {feature.badge && (
                  <span className="rounded-full bg-cream-dark px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink/55">
                    {feature.badge}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{feature.desc}</p>
              {feature.href && (
                <span className="mt-4 text-xs font-bold uppercase tracking-wide text-crimson">
                  Included →
                </span>
              )}
            </div>
          );

          return (
            <MotionStaggerItem key={feature.title}>
              {feature.href ? (
                <Link href={feature.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </MotionStaggerItem>
          );
        })}
      </MotionStagger>

      {showCta && (
        <div
          className={`mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center ${
            variant === "join" ? "justify-center sm:justify-start" : ""
          }`}
        >
          <LockerRoomCTA label={`Join ${PREMIUM_TIER_NAME}`} />
          <Link
            href={PREMIUM_RECRUIT_ROUTE}
            className="text-sm font-semibold text-crimson underline decoration-crimson/30 underline-offset-4 transition hover:decoration-crimson"
          >
            See the full recruitment pitch
          </Link>
        </div>
      )}
    </div>
  );
}
