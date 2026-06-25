import { SourceAttribution } from "@/components/SourceAttribution";
import type { RecruitingClass } from "@/data/recruiting-types";
import {
  computePositionBreakdown,
  formatCommitDate,
  starDisplay,
} from "@/lib/recruiting-metrics";

interface RecruitingBreakdownProps {
  recruitingClass: RecruitingClass;
}

function RankCell({ rank, stars }: { rank?: number; stars?: number }) {
  if (!rank) {
    return <span className="text-ink/35">—</span>;
  }
  return (
    <div className="text-right">
      <span className="font-semibold text-ink">#{rank}</span>
      {stars && (
        <span className="ml-1 text-xs text-amber-600" aria-label={`${stars} stars`}>
          {starDisplay(stars)}
        </span>
      )}
    </div>
  );
}

export function RecruitingBreakdown({ recruitingClass }: RecruitingBreakdownProps) {
  const { on3, twoFourSeven, espn, commits, year, updatedAt } = recruitingClass;
  const positionBreakdown = computePositionBreakdown(recruitingClass);
  const sortedCommits = [...commits].sort(
    (a, b) => (a.on3.national ?? 9999) - (b.on3.national ?? 9999),
  );

  const offenseCount = commits.filter((c) =>
    ["QB", "RB", "WR", "TE", "OL"].includes(c.positionGroup),
  ).length;
  const defenseCount = commits.length - offenseCount;

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="font-display text-lg font-bold text-crimson">
          {year} Recruiting Breakdown
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          Side-by-side national ranks from On3, 247Sports, and ESPN for every verbal
          commit. Updated {updatedAt}.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-crimson/20 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-ink/60">On3 Team Rank</p>
          <p className="font-display text-3xl font-bold text-crimson">#{on3.nationalRank}</p>
          {on3.classScore && (
            <p className="mt-1 text-sm text-ink/65">
              Class score {on3.classScore.toFixed(2)}
            </p>
          )}
          <p className="mt-1 text-xs text-ink/50">
            {on3.commits} commits · {on3.blueChips} blue chips
          </p>
        </div>
        <div className="rounded-xl border-2 border-crimson/20 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-ink/60">247Sports Team Rank</p>
          <p className="font-display text-3xl font-bold text-crimson">
            #{twoFourSeven.nationalRank}
          </p>
          <p className="mt-1 text-sm text-ink/65">Composite team rankings</p>
          <p className="mt-1 text-xs text-ink/50">
            {twoFourSeven.commits} commits · {twoFourSeven.blueChips} four-stars+
          </p>
        </div>
        <div className="rounded-xl border-2 border-crimson bg-crimson p-4 text-cream">
          <p className="text-xs font-semibold uppercase text-cream/80">ESPN Team Rank</p>
          <p className="font-display text-3xl font-bold">#{espn.nationalRank}</p>
          <p className="mt-1 text-sm text-cream/85">ESPN300 team board</p>
          <p className="mt-1 text-xs text-cream/70">
            {espn.commits} commits · {espn.blueChips} ESPN300
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-crimson/15 bg-cream-dark px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase text-ink/55">Total Commits</p>
          <p className="font-display text-2xl font-bold text-crimson">{commits.length}</p>
        </div>
        <div className="rounded-lg border border-crimson/15 bg-cream-dark px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase text-ink/55">Offense</p>
          <p className="font-display text-2xl font-bold text-crimson">{offenseCount}</p>
        </div>
        <div className="rounded-lg border border-crimson/15 bg-cream-dark px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase text-ink/55">Defense</p>
          <p className="font-display text-2xl font-bold text-crimson">{defenseCount}</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border-2 border-crimson/15 bg-white p-5">
        <h4 className="font-display text-base font-bold text-crimson">
          Position Breakdown
        </h4>
        <p className="mt-1 text-sm text-ink/60">
          Commit count and average national rank by position group across each service.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left text-xs font-semibold uppercase text-crimson">
                <th className="py-2 pr-4">Position</th>
                <th className="py-2 pr-4 text-right">Commits</th>
                <th className="py-2 pr-4 text-right">Avg On3</th>
                <th className="py-2 pr-4 text-right">Avg 247</th>
                <th className="py-2 text-right">Avg ESPN</th>
              </tr>
            </thead>
            <tbody>
              {positionBreakdown.map((row) => (
                <tr key={row.group} className="border-b border-cream-dark/60">
                  <td className="py-2.5 font-medium">{row.label}</td>
                  <td className="py-2.5 text-right font-semibold text-crimson">
                    {row.count}
                  </td>
                  <td className="py-2.5 text-right text-ink/75">
                    {row.avgOn3 ? `#${row.avgOn3}` : "—"}
                  </td>
                  <td className="py-2.5 text-right text-ink/75">
                    {row.avg247 ? `#${row.avg247}` : "—"}
                  </td>
                  <td className="py-2.5 text-right text-ink/75">
                    {row.avgEspn ? `#${row.avgEspn}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border-2 border-crimson/15 bg-white p-5">
        <h4 className="font-display text-base font-bold text-crimson">
          Commit Board — Service Comparison
        </h4>
        <p className="mt-1 text-sm text-ink/60">
          National player ranks as listed by each recruiting service. Sorted by On3
          national rank.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-cream-dark text-left text-xs font-semibold uppercase text-crimson">
                <th className="py-2 pr-3">Player</th>
                <th className="py-2 pr-3">Pos</th>
                <th className="hidden py-2 pr-3 md:table-cell">School</th>
                <th className="py-2 pr-3 text-right">On3</th>
                <th className="py-2 pr-3 text-right">247</th>
                <th className="py-2 pr-3 text-right">ESPN</th>
                <th className="hidden py-2 sm:table-cell">Committed</th>
              </tr>
            </thead>
            <tbody>
              {sortedCommits.map((commit) => (
                <tr key={commit.id} className="border-b border-cream-dark/60">
                  <td className="py-2.5">
                    <div className="font-medium">{commit.name}</div>
                    <div className="text-xs text-ink/55 md:hidden">
                      {commit.highSchool} · {commit.hometown}
                    </div>
                  </td>
                  <td className="py-2.5 text-ink/70">{commit.position}</td>
                  <td className="hidden py-2.5 text-ink/65 md:table-cell">
                    <div>{commit.highSchool}</div>
                    <div className="text-xs text-ink/50">{commit.hometown}</div>
                  </td>
                  <td className="py-2.5">
                    <RankCell rank={commit.on3.national} stars={commit.on3.stars} />
                  </td>
                  <td className="py-2.5">
                    <RankCell
                      rank={commit.twoFourSeven.national}
                      stars={commit.twoFourSeven.stars}
                    />
                  </td>
                  <td className="py-2.5">
                    <RankCell rank={commit.espn.national} stars={commit.espn.stars} />
                  </td>
                  <td className="hidden py-2.5 text-ink/60 sm:table-cell">
                    {formatCommitDate(commit.commitDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SourceAttribution
        className="mt-6"
        sources={[
          {
            label: "On3",
            url: "https://www.on3.com/college/oklahoma-sooners/football/2027/commits/",
          },
          {
            label: "247Sports",
            url: "https://247sports.com/college/oklahoma/season/2027-football/commits/",
          },
          {
            label: "ESPN Recruiting",
            url: "https://www.espn.com/college-football/team/recruiting/_/id/201/class/2027",
          },
        ]}
      />

      <p className="mt-4 text-xs text-ink/50">
        Recruiting data compiled from public On3, 247Sports Composite, and ESPN player
        profiles. Rankings change frequently during the cycle; not affiliated with any
        recruiting service.
      </p>
    </div>
  );
}
