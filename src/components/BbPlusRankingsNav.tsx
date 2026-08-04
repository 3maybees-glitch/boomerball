import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BbPlusBoardKind } from "@/lib/bb-plus";

const TABS: {
  kind: BbPlusBoardKind;
  href: string;
  label: string;
  gated?: boolean;
}[] = [
  { kind: "combined", href: "/rankings", label: "Combined" },
  { kind: "offense", href: "/rankings/offense", label: "Offense", gated: true },
  { kind: "defense", href: "/rankings/defense", label: "Defense", gated: true },
];

export function BbPlusRankingsNav({ active }: { active: BbPlusBoardKind }) {
  return (
    <div
      className="mb-8 flex flex-wrap gap-2"
      role="tablist"
      aria-label="BB+ ranking boards"
    >
      {TABS.map((tab) => {
        const isActive = tab.kind === active;
        return (
          <Link
            key={tab.kind}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition",
              isActive
                ? "bg-crimson text-cream shadow-[0_4px_16px_rgba(132,22,23,0.25)]"
                : "border border-crimson/15 bg-white/90 text-crimson hover:border-crimson/35 hover:bg-cream",
            )}
          >
            {tab.gated && <Lock className="h-3 w-3" aria-hidden />}
            {tab.label}
            {tab.gated && (
              <span className="sr-only">Locker Room members</span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
