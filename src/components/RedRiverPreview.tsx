import Image from "next/image";
import {
  RED_RIVER_INFOGRAPHIC,
  RED_RIVER_KICKOFF,
  RED_RIVER_SOURCES,
  RED_RIVER_X_POST,
  redRiverComparison,
} from "@/data/red-river-2026";
import { SourceAttribution } from "@/components/SourceAttribution";

const keys = [
  {
    title: "Stop handing Texas the ball",
    body: "Oklahoma is minus-6 in turnover margin, 136th nationally. Since 2023 the Sooners have outscored opponents 226-52 off takeaways in wins, and been outscored 132-33 off them in losses. This year's losses are already 24-6 the wrong way.",
  },
  {
    title: "Throw it. The explosives have to travel.",
    body: "John Mateer has six touchdown passes of 20-plus yards already, after 11 such throws in 13 games last season. Oklahoma is averaging 99.0 rushing yards, 131st in the country, into a Texas rush defense allowing 99.3. The explosives and the tight ends have to carry the down-and-distance plan.",
  },
  {
    title: "Make Arch Manning's day look like Athens",
    body: "The Sooners held Gunner Stockton to 14 of 25 for 171 yards, a touchdown, and an interception. They have allowed one passing touchdown all year and rank fourth in pass defense. Texas scores 33.3 a game, and Manning is 16-3 as a starter with four wins over AP top-10 teams.",
  },
];

export function RedRiverPreview() {
  return (
    <section id="red-river" className="scroll-mt-24 border-b border-crimson/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-crimson">
            Game preview · {RED_RIVER_KICKOFF.dateLabel}
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            The defense can hang with No. 1. The offense has to prove it.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink/75 sm:text-lg">
            Unranked Oklahoma (2-2, 0-1 SEC) meets No. 1 Texas (4-0, 1-0) at{" "}
            {RED_RIVER_KICKOFF.time} in the {RED_RIVER_KICKOFF.meeting}, the{" "}
            {RED_RIVER_KICKOFF.name}, at the {RED_RIVER_KICKOFF.stadium} in{" "}
            {RED_RIVER_KICKOFF.city}. {RED_RIVER_KICKOFF.network} has the call
            with {RED_RIVER_KICKOFF.announcers}. {RED_RIVER_KICKOFF.designation}.
          </p>
          <dl className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
            {[
              RED_RIVER_KICKOFF.time,
              RED_RIVER_KICKOFF.network,
              `${RED_RIVER_KICKOFF.stadium} · ${RED_RIVER_KICKOFF.city}`,
              "OU home designation",
              RED_RIVER_KICKOFF.meeting,
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-crimson/15 bg-cream px-3 py-1.5 text-crimson"
              >
                {item}
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-crimson/12 bg-cream/40">
            <div className="grid grid-cols-[1.2fr_0.9fr_0.9fr] gap-2 border-b border-crimson/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50 sm:px-6">
              <span>Through four games</span>
              <span className="text-crimson">Oklahoma</span>
              <span>Texas</span>
            </div>
            <div className="divide-y divide-crimson/10">
              {redRiverComparison.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.2fr_0.9fr_0.9fr] items-baseline gap-2 px-4 py-3 sm:px-6"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{row.label}</p>
                    {row.note && (
                      <p className="mt-0.5 text-xs text-ink/55">{row.note}</p>
                    )}
                  </div>
                  <p className="font-display text-xl font-bold tabular-nums text-crimson sm:text-2xl">
                    {row.ou}
                  </p>
                  <p className="font-display text-xl font-bold tabular-nums text-ink sm:text-2xl">
                    {row.texas}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <div className="space-y-8 text-base leading-relaxed text-ink/80">
              <div>
                <h3 className="font-display text-2xl font-bold text-crimson">
                  Two quarterbacks, one unfinished offense
                </h3>
                <p className="mt-3">
                  John Mateer has completed 66.1% of his passes for 883 yards
                  and eight touchdowns, a 151.0 efficiency rating. Arch Manning
                  has completed 63.5% for 862 yards and seven touchdowns, a
                  141.3 rating, and he is 16-3 as a starter. The counting stats
                  are close. The supporting casts are not.
                </p>
                <p className="mt-3">
                  Texas has already beaten Texas State 59-7, No. 1 Ohio State
                  24-23, UTSA 30-6, and No. 14 Tennessee 20-17 on the road.
                  Manning threw for 305 yards and four scores in the opener,
                  then 195 and a touchdown against the Buckeyes. Against UTSA he
                  was the leading rusher, 50 yards on nine carries. Oklahoma&apos;s
                  last month was a 51-0 opener, a 10-17 loss at Michigan, a
                  14-6 scrape past New Mexico, and a 13-41 loss at No. 2 Georgia
                  in which the Sooners were outgained by 10 yards, 306-296.
                </p>
                <p className="mt-3">
                  Mateer was 25 of 34 for 231 at Sanford Stadium, with
                  touchdowns of 17 yards to Rocky Beers and 14 to Manny Choice.
                  Beers, in his first year in Norman after Colorado State, has
                  18 catches for 255 yards and two scores and ranks sixth
                  nationally among tight ends at 63.8 yards a game. Isaiah
                  Sategna III leads the team with 20 receptions for 267 yards
                  and two touchdowns. Lloyd Avant leads the run game with 164
                  yards on 42 carries. That is 3.9 a rush, and it is the number
                  Texas will try to keep.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-crimson">
                  The case is the defense
                </h3>
                <p className="mt-3">
                  Oklahoma allows 238.0 yards a game, fifth nationally, and
                  122.5 through the air, fourth. Opponents are converting 23.1%
                  of third downs, third in the country, and scoring on 60% of
                  red-zone trips, second. One passing touchdown has been thrown
                  on this defense in four games. Every defensive starter began
                  his college career at Oklahoma. Owen Heinecke leads the team
                  with 27 tackles. David Stone and Kip Lewis entered the year
                  as preseason All-Americans.
                </p>
                <p className="mt-3">
                  In Athens that group held a Georgia offense that had been
                  averaging 539 yards to 306, and Stockton to a 118.7 passer
                  rating. The scoreboard still said 41-13. Omarion Robinson&apos;s
                  first career interception set up a Beers touchdown, and
                  Courtland Guillory forced a fumble Bishop Thomas recovered.
                  The down-to-down defense traveled. The margin did not,
                  because the offense could not stay on schedule and the
                  giveaways kept tilting the field.
                </p>
                <p className="mt-3">
                  This is the fourth time the Sooners have played the AP&apos;s No.
                  1 and No. 2 in back-to-back games, after 1963, 1987, and 2000.
                  The 2000 team beat both. This one already lost to No. 2. Texas
                  is also the team that won this rivalry 23-6 last October after
                  Oklahoma led 6-3 at halftime, then ran 26 plays to the
                  Sooners&apos; four in the third quarter.
                </p>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-crimson">
                  What the series actually says
                </h3>
                <p className="mt-3">
                  Texas leads the all-time series 65-51-5. Oklahoma leads 30-23-3
                  since 1970 and is 17-10 since 2000, including 4-4 when Texas
                  is ranked in the AP top five. The Sooners are 0-4-1 against
                  Texas when the Longhorns are No. 1. The tie was 15-15 in 1984,
                  with OU ranked No. 3. The last of the losses was 34-3 in 2024.
                  Oklahoma&apos;s last win over any AP No. 1 was Missouri in 2007.
                </p>
                <p className="mt-3">
                  Since 1971, Oklahoma is 3-4 against Texas when the Sooners
                  enter unranked. Since 2013, when only one of the two is
                  ranked, the unranked team is 4-3, including unranked Texas
                  last year. The designated visitor has won four of the last
                  five, not counting last year. This year the visitor is Texas.
                  Oklahoma has still won five of the last eight meetings, 11 of
                  the last 17, and 17 of the last 27.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4 lg:sticky lg:top-24">
              {keys.map((key, index) => (
                <article
                  key={key.title}
                  className="rounded-2xl border border-crimson/12 bg-cream/50 p-5"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-crimson">
                    Key {index + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">
                    {key.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">
                    {key.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="grid items-start gap-8 rounded-2xl border border-ink/10 bg-ink p-5 text-cream sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/60">
                X post · @boomerballapp
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold leading-tight">
                The post, with the graphic
              </h3>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-cream/85">
                {RED_RIVER_X_POST}
              </p>
              <p className="mt-4 text-xs text-cream/50">
                Graphic for the post. Copy is ready for @boomerballapp.
              </p>
            </div>
            <figure>
              <Image
                src={RED_RIVER_INFOGRAPHIC}
                alt="Boomer Ball infographic previewing Oklahoma against No. 1 Texas in the Red River Rivalry on Oct. 10, 2026, with defense, quarterback, and turnover numbers."
                width={1080}
                height={1350}
                unoptimized
                className="h-auto w-full rounded-xl border border-cream/15"
              />
              <figcaption className="mt-3 text-xs text-cream/55">
                Red River preview graphic · sources in the notes below
              </figcaption>
            </figure>
          </div>
        </div>

        <SourceAttribution className="mt-8" sources={[...RED_RIVER_SOURCES]} />
      </div>
    </section>
  );
}
