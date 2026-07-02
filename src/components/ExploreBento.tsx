"use client";

import Link from "next/link";
import {
  BarChart3,
  Calendar,
  ClipboardList,
  HatGlasses,
  Newspaper,
  Users,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionReveal";

export type ExploreLinkData = {
  href: string;
  label: string;
  desc: string;
  icon: "stats" | "roster" | "schedule" | "legends" | "news" | "mmqb" | "join" | "locker";
  accent?: "default" | "crimson" | "dark";
};

const iconMap: Record<ExploreLinkData["icon"], LucideIcon> = {
  stats: BarChart3,
  roster: Users,
  schedule: Calendar,
  legends: Trophy,
  news: Newspaper,
  mmqb: ClipboardList,
  join: HatGlasses,
  locker: HatGlasses,
};

type ExploreBentoProps = {
  links: ExploreLinkData[];
};

const accentStyles = {
  default:
    "border-crimson/12 bg-white/90 hover:border-crimson/40 hover:shadow-[0_12px_40px_rgba(132,22,23,0.12)]",
  crimson:
    "border-crimson/30 bg-crimson text-cream hover:border-crimson-dark hover:shadow-[0_12px_40px_rgba(92,15,16,0.35)]",
  dark: "border-ink/20 bg-ink text-cream hover:border-crimson/50 hover:shadow-[0_12px_40px_rgba(26,10,10,0.25)]",
};

export function ExploreBento({ links }: ExploreBentoProps) {
  const cellSpans = [
    "lg:col-span-2 lg:row-span-2",
    "",
    "",
    "",
    "",
    "lg:col-span-2",
    "",
  ];

  return (
    <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(140px,auto)]">
      {links.map((link, index) => {
        const accent = link.accent ?? "default";
        const isAccent = accent !== "default";
        const Icon = iconMap[link.icon];

        return (
          <MotionStaggerItem
            key={link.href}
            className={cellSpans[index] ?? ""}
          >
            <Link
              href={link.href}
              className={`group flex h-full min-h-[140px] flex-col justify-between rounded-2xl border p-5 transition duration-300 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson ${accentStyles[accent]}`}
            >
              <div
                className={`inline-flex w-fit rounded-xl p-2.5 transition ${
                  isAccent
                    ? "bg-cream/15 text-cream group-hover:bg-cream/25"
                    : "bg-crimson/10 text-crimson group-hover:bg-crimson group-hover:text-cream"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="mt-4">
                <h3
                  className={`font-display text-lg font-bold leading-tight ${
                    isAccent ? "text-cream" : "text-ink group-hover:text-crimson"
                  }`}
                >
                  {link.label}
                </h3>
                <p
                  className={`mt-1.5 text-sm leading-snug ${
                    isAccent ? "text-cream/75" : "text-ink/65"
                  }`}
                >
                  {link.desc}
                </p>
              </div>
            </Link>
          </MotionStaggerItem>
        );
      })}
    </MotionStagger>
  );
}
