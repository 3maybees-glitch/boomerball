"use client";

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
import type { LockerRoomFeatureIcon } from "@/data/locker-room-features";

type Perk = {
  icon: LockerRoomFeatureIcon;
  title: string;
  desc: string;
};

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

const cellSpans = [
  "lg:col-span-2",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
  "",
  "",
  "",
  "",
  "",
];

export function JoinPerksBento({ perks }: { perks: Perk[] }) {
  return (
    <MotionStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {perks.map((perk, index) => {
        const Icon = iconMap[perk.icon];
        const isFeatured = index === 0 || index === 2 || index === 3;

        return (
          <MotionStaggerItem key={perk.title} className={cellSpans[index] ?? ""}>
            <div
              className={`flex h-full flex-col rounded-2xl border p-5 transition ${
                isFeatured
                  ? "border-crimson/25 bg-crimson text-cream shadow-[0_8px_28px_rgba(132,22,23,0.2)]"
                  : "border-crimson/12 bg-white/95 shadow-[0_4px_20px_rgba(26,10,10,0.06)]"
              }`}
            >
              <div
                className={`inline-flex w-fit rounded-xl p-2.5 ${
                  isFeatured ? "bg-cream/15 text-cream" : "bg-crimson/10 text-crimson"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3
                className={`mt-4 font-display text-lg font-bold ${
                  isFeatured ? "text-cream" : "text-ink"
                }`}
              >
                {perk.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  isFeatured ? "text-cream/75" : "text-ink/70"
                }`}
              >
                {perk.desc}
              </p>
            </div>
          </MotionStaggerItem>
        );
      })}
    </MotionStagger>
  );
}
