import type { OpponentStrength } from "@/lib/schedule-sos";
import { SOS_TIER_STYLES } from "@/lib/schedule-sos";

interface OpponentStrengthBadgeProps {
  strength: OpponentStrength;
  compact?: boolean;
}

export function OpponentStrengthBadge({
  strength,
  compact = false,
}: OpponentStrengthBadgeProps) {
  const styles = SOS_TIER_STYLES[strength.tier];

  return (
    <div
      className={`rounded-lg border ${styles.badge} ${compact ? "p-2" : "p-3"}`}
      title={strength.note}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-display text-sm font-bold">{strength.label}</span>
        <span className="font-display text-lg font-bold tabular-nums">
          {strength.score}
          <span className="text-xs font-normal opacity-70">/100</span>
        </span>
      </div>
      {!compact && (
        <>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/10">
            <div
              className={`h-full rounded-full ${styles.bar}`}
              style={{ width: `${strength.score}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-snug opacity-85">{strength.note}</p>
        </>
      )}
    </div>
  );
}
