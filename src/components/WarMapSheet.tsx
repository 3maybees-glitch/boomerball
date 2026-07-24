import {
  WAR_MAP_DISCLAIMER,
  WAR_MAP_SUBTITLE,
  WAR_MAP_TITLE,
  warMapComposite,
  warMapDraftProspects,
  warMapFreshmen,
  warMapHeadline,
  warMapKeys,
  warMapSchedule,
  warMapStrengthsWeaknesses,
  warMapUnitGrades,
} from "@/data/war-map-2026";

function venueLabel(venue: "H" | "A" | "N") {
  if (venue === "H") return "HOME";
  if (venue === "A") return "AWAY";
  return "NEUT";
}

export function WarMapSheet() {
  const wins = warMapSchedule.filter((g) => g.pick === "W").length;
  const losses = warMapSchedule.filter((g) => g.pick === "L").length;

  return (
    <article
      id="war-map-sheet"
      className="war-map-sheet mx-auto w-full max-w-[8.5in] overflow-hidden border border-crimson/25 bg-[#faf6e8] text-ink shadow-[0_12px_40px_rgba(26,10,10,0.12)] print:max-w-none print:border-0 print:shadow-none"
    >
      {/* Masthead */}
      <header className="relative overflow-hidden bg-gradient-to-br from-crimson via-crimson to-crimson-dark px-3 py-2.5 text-cream sm:px-4">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 8px, rgba(253,249,216,0.35) 8px, rgba(253,249,216,0.35) 9px)",
          }}
          aria-hidden
        />
        <div className="relative flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-cream/70">
              Boomer Ball · Oklahoma Sooners
            </p>
            <h1 className="font-display text-[1.85rem] font-extrabold leading-none tracking-tight sm:text-[2.15rem]">
              {WAR_MAP_TITLE}
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-cream/80">
              {WAR_MAP_SUBTITLE}
            </p>
          </div>
          <div className="rounded border border-cream/25 bg-ink/25 px-2.5 py-1.5 text-right backdrop-blur-sm">
            <p className="font-display text-2xl font-extrabold leading-none tracking-tight">
              {warMapHeadline.record}
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-wide text-cream/75">
              SEC {warMapHeadline.secRecord} · {warMapHeadline.bowl}
            </p>
          </div>
        </div>
        <div className="relative mt-2 flex flex-wrap gap-x-3 gap-y-1 border-t border-cream/20 pt-1.5 text-[9px] font-medium text-cream/85">
          <span>{warMapHeadline.bowlDetail}</span>
          <span aria-hidden>·</span>
          <span>{warMapHeadline.spPlusRank}</span>
          <span aria-hidden>·</span>
          <span>{warMapHeadline.identity}</span>
        </div>
      </header>

      <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left column */}
        <div className="border-b border-crimson/15 lg:border-b-0 lg:border-r">
          {/* Composite grades */}
          <section className="border-b border-crimson/15 px-3 py-2 sm:px-3.5">
            <div className="mb-1.5 flex items-baseline justify-between">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
                Unit Report Card
              </h2>
              <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/50">
                Overall {warMapComposite.overall.letter} ({warMapComposite.overall.score})
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
              {warMapUnitGrades.map((unit) => (
                <div
                  key={unit.key}
                  className="rounded border border-crimson/12 bg-white/70 px-1.5 py-1 text-center"
                >
                  <p className="text-[8px] font-bold uppercase tracking-wide text-ink/45">
                    {unit.label}
                  </p>
                  <p className="font-display text-base font-extrabold leading-none text-crimson">
                    {unit.letter}
                  </p>
                  <p className="text-[8px] tabular-nums text-ink/55">{unit.grade}</p>
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-ink/60">
              <span>
                OFF <strong className="text-ink">{warMapComposite.offense.letter}</strong>
              </span>
              <span>
                DEF <strong className="text-ink">{warMapComposite.defense.letter}</strong>
              </span>
              <span>
                ST <strong className="text-ink">{warMapComposite.specialTeams.letter}</strong>
              </span>
            </div>
          </section>

          {/* Depth + strengths */}
          <section className="border-b border-crimson/15 px-3 py-2 sm:px-3.5">
            <h2 className="mb-1.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
              Depth Chart & Unit Strengths
            </h2>
            <div className="space-y-1">
              {warMapUnitGrades.map((unit) => (
                <div
                  key={`depth-${unit.key}`}
                  className="grid grid-cols-[2.1rem_1fr] gap-x-1.5 border-b border-dashed border-crimson/10 pb-1 last:border-0 last:pb-0"
                >
                  <div className="pt-0.5">
                    <span className="inline-block rounded bg-crimson px-1 py-0.5 font-display text-[10px] font-bold leading-none text-cream">
                      {unit.label}
                    </span>
                    <p className="mt-0.5 text-[9px] font-bold text-crimson">{unit.letter}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold leading-snug text-ink">
                      {unit.starters.join(" · ")}
                      {unit.depth.length > 0 && (
                        <span className="font-normal text-ink/50">
                          {" "}
                          / {unit.depth.join(", ")}
                        </span>
                      )}
                    </p>
                    <p className="text-[9px] leading-snug text-ink/55">{unit.strength}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths / weaknesses */}
          <section className="grid grid-cols-2 gap-0">
            <div className="border-r border-crimson/15 px-3 py-2 sm:px-3.5">
              <h2 className="mb-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-crimson">
                Team Strengths
              </h2>
              <ul className="space-y-0.5">
                {warMapStrengthsWeaknesses.strengths.map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[9px] leading-snug text-ink/75"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-crimson" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-3 py-2 sm:px-3.5">
              <h2 className="mb-1 font-display text-xs font-bold uppercase tracking-[0.12em] text-crimson">
                Watch Points
              </h2>
              <ul className="space-y-0.5">
                {warMapStrengthsWeaknesses.weaknesses.map((item) => (
                  <li
                    key={item}
                    className="flex gap-1.5 text-[9px] leading-snug text-ink/75"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ink/35" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div>
          {/* Schedule projections */}
          <section className="border-b border-crimson/15 px-3 py-2 sm:px-3.5">
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
                Schedule & Projected Scores
              </h2>
              <p className="text-[9px] font-bold tabular-nums text-ink/55">
                {wins}–{losses} projected
              </p>
            </div>
            <div className="overflow-hidden rounded border border-crimson/12">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-crimson text-[8px] font-bold uppercase tracking-wide text-cream">
                    <th className="px-1.5 py-1 font-semibold">Date</th>
                    <th className="px-1 py-1 font-semibold">Opp</th>
                    <th className="px-1 py-1 font-semibold">V</th>
                    <th className="px-1 py-1 font-semibold">Pick</th>
                    <th className="px-1.5 py-1 font-semibold">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {warMapSchedule.map((game, i) => (
                    <tr
                      key={`${game.date}-${game.opponent}`}
                      className={
                        i % 2 === 0
                          ? "bg-white/80"
                          : "bg-cream-dark/40"
                      }
                    >
                      <td className="whitespace-nowrap px-1.5 py-0.5 text-[9px] tabular-nums text-ink/60">
                        {game.date}
                      </td>
                      <td className="px-1 py-0.5 text-[9px] font-semibold text-ink">
                        {game.opponent}
                        {game.conference ? (
                          <span className="ml-0.5 text-[7px] font-bold text-crimson">SEC</span>
                        ) : null}
                      </td>
                      <td className="px-1 py-0.5 text-[8px] font-bold text-ink/50">
                        {venueLabel(game.venue)}
                      </td>
                      <td
                        className={`px-1 py-0.5 text-[9px] font-extrabold ${
                          game.pick === "W" ? "text-crimson" : "text-ink/45"
                        }`}
                      >
                        {game.pick}
                      </td>
                      <td className="whitespace-nowrap px-1.5 py-0.5 text-[9px] font-semibold tabular-nums text-ink">
                        {game.score}
                        <span className="ml-1 font-normal text-ink/40">{game.note}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-1.5 rounded bg-crimson/8 px-2 py-1 text-[9px] font-semibold leading-snug text-crimson">
              Bowl call: {warMapHeadline.bowl} — {warMapHeadline.bowlDetail}.{" "}
              {warMapHeadline.playoffOdds}.
            </p>
          </section>

          {/* Draft board */}
          <section className="border-b border-crimson/15 px-3 py-2 sm:px-3.5">
            <h2 className="mb-1.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
              NFL Draft Board (2027)
            </h2>
            <ul className="space-y-1">
              {warMapDraftProspects.map((p) => (
                <li
                  key={p.name}
                  className="grid grid-cols-[4.5rem_1fr] gap-x-1.5 text-[9px] leading-snug"
                >
                  <span className="font-bold tabular-nums text-crimson">
                    R{p.round} <span className="text-ink/40">{p.pos}</span>
                  </span>
                  <span>
                    <strong className="text-ink">{p.name}</strong>
                    <span className="text-ink/55"> — {p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Freshmen */}
          <section className="border-b border-crimson/15 px-3 py-2 sm:px-3.5">
            <h2 className="mb-1.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
              Freshman Hopefuls
            </h2>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-1">
              {warMapFreshmen.map((f) => (
                <p key={f.name} className="text-[9px] leading-snug">
                  <span className="font-bold text-crimson">{f.pos}</span>{" "}
                  <strong className="text-ink">{f.name}</strong>
                  <span className="text-ink/55"> — {f.note}</span>
                </p>
              ))}
            </div>
          </section>

          {/* Keys */}
          <section className="px-3 py-2 sm:px-3.5">
            <h2 className="mb-1 font-display text-sm font-bold uppercase tracking-[0.12em] text-crimson">
              Season Keys
            </h2>
            <ol className="space-y-0.5">
              {warMapKeys.map((key, i) => (
                <li key={key} className="flex gap-1.5 text-[9px] leading-snug text-ink/75">
                  <span className="font-display font-bold text-crimson">{i + 1}.</span>
                  {key}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-1 border-t border-crimson/20 bg-ink px-3 py-1.5 text-[8px] text-cream/70 sm:px-3.5">
        <p>boomerball.app/war-map · {WAR_MAP_DISCLAIMER}</p>
        <p className="font-semibold uppercase tracking-wide text-cream/90">Boomer Sooner</p>
      </footer>
    </article>
  );
}
