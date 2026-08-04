import { BbPlusRankingsNav } from "@/components/BbPlusRankingsNav";
import {
  BB_PLUS_DISCLAIMER,
  BB_PLUS_EDITION,
  BB_PLUS_UPDATED,
} from "@/data/bb-plus-rankings";
import {
  BB_PLUS_METHODOLOGY,
  formatBbPlus,
  getBbPlusBoard,
  type BbPlusBoardKind,
  type BbPlusRankedTeam,
} from "@/lib/bb-plus";
import { cn } from "@/lib/utils";

function ratingTone(rating: number): string {
  if (rating >= 18) return "text-crimson";
  if (rating >= 10) return "text-crimson/90";
  if (rating >= 0) return "text-ink";
  return "text-ink/70";
}

function SupportingMetrics({
  kind,
  team,
}: {
  kind: BbPlusBoardKind;
  team: BbPlusRankedTeam;
}) {
  if (kind === "offense") {
    return (
      <p className="mt-1 text-xs text-ink/55">
        EPA {team.offense.epaPerPlay > 0 ? "+" : ""}
        {team.offense.epaPerPlay.toFixed(2)} · Success {team.offense.successRate}% ·
        Expl. {team.offense.explosiveRate}% · {team.offense.pointsPerGame.toFixed(1)}{" "}
        PPG
      </p>
    );
  }
  if (kind === "defense") {
    return (
      <p className="mt-1 text-xs text-ink/55">
        Havoc {team.defense.havocRate}% · Pressure {team.defense.pressureRate}% ·{" "}
        {team.defense.pointsAllowedPerGame.toFixed(1)} PAPG · 3rd-down stop{" "}
        {team.defense.thirdDownStopPct}%
      </p>
    );
  }
  return (
    <p className="mt-1 text-xs text-ink/55">
      Off {formatBbPlus(team.bbPlusOffense)} · Def {formatBbPlus(team.bbPlusDefense)} ·{" "}
      {team.conference}
    </p>
  );
}

export function BbPlusRankingsBoard({
  kind,
  showMethodology = true,
  showNav = true,
}: {
  kind: BbPlusBoardKind;
  showMethodology?: boolean;
  /** Set false when the parent page already renders BbPlusRankingsNav. */
  showNav?: boolean;
}) {
  const board = getBbPlusBoard(kind);
  const heading =
    kind === "offense"
      ? "Offense BB+"
      : kind === "defense"
        ? "Defense BB+"
        : "Combined BB+";

  return (
    <div>
      {showNav && <BbPlusRankingsNav active={kind} />}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson/70">
            {BB_PLUS_EDITION} · Updated {BB_PLUS_UPDATED}
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            Top 12 · {heading}
          </h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink/65">
            All conferences, one board. Ranked with Boomer Ball’s advanced
            offense and defense efficiency stack — built for the press cycle and
            the rest of the 2026 regular season.
          </p>
        </div>
        <div className="rounded-xl border border-crimson/20 bg-crimson px-4 py-3 text-cream shadow-[0_8px_24px_rgba(132,22,23,0.2)]">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-cream/75">
            Board size
          </p>
          <p className="font-display text-2xl font-bold tabular-nums">12</p>
        </div>
      </div>

      <ol className="space-y-3">
        {board.map((team) => {
          const isSooners = team.id === "oklahoma";
          return (
            <li
              key={team.id}
              className={cn(
                "rounded-2xl border bg-white/95 p-4 shadow-[0_4px_20px_rgba(26,10,10,0.06)] sm:p-5",
                isSooners
                  ? "border-crimson/40 ring-1 ring-crimson/15"
                  : "border-crimson/12",
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl font-display",
                    team.rank <= 4
                      ? "bg-crimson text-cream"
                      : "bg-cream text-crimson",
                  )}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    Rank
                  </span>
                  <span className="text-2xl font-bold leading-none tabular-nums">
                    {team.rank}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                        {team.school}{" "}
                        <span className="font-semibold text-ink/45">
                          {team.mascot}
                        </span>
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-crimson/75">
                        {team.conference}
                        {isSooners ? " · Boomer Ball home board" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                        {heading}
                      </p>
                      <p
                        className={cn(
                          "font-display text-3xl font-bold tabular-nums",
                          ratingTone(team.rating),
                        )}
                      >
                        {formatBbPlus(team.rating)}
                      </p>
                    </div>
                  </div>

                  <SupportingMetrics kind={kind} team={team} />
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {team.note}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {showMethodology && (
        <section className="mt-10 rounded-2xl border border-crimson/12 bg-white/90 p-5 sm:p-6">
          <h3 className="font-display text-xl font-bold text-crimson">
            How BB+ works
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {BB_PLUS_METHODOLOGY.map((item) => (
              <li key={item.title}>
                <p className="text-xs font-bold uppercase tracking-wider text-crimson/80">
                  {item.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-ink/50">
            {BB_PLUS_DISCLAIMER}
          </p>
        </section>
      )}
    </div>
  );
}
