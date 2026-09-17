import type { WeeklyRecap } from "./types";
import { DATA_SOURCE_SCHEDULE } from "./schedule";
import {
  STATS_SOURCE_ESPN,
  STATS_SOURCE_ESPN_MICHIGAN,
  STATS_SOURCE_MICHIGAN_BOX,
  STATS_SOURCE_MICHIGAN_NOTES,
  STATS_SOURCE_SOONERS,
  STATS_SOURCE_SOONERS_2025,
  STATS_SOURCE_UTEP_RECAP,
} from "./stats";

export const MMQB_TITLE = "Monday Morning Quarterback";
export const MMQB_TAGLINE =
  "Weekly game recaps with regular stats, advanced analytics, and a Monday-morning writeup for Sooner Nation.";

/** New issues publish the Monday after each game during the active season */
export const MMQB_PUBLISH_SCHEDULE = "Every Monday during the 2026 season";

export const weeklyRecaps: WeeklyRecap[] = [
  {
    id: "2026-week-2-michigan",
    slug: "2026-week-2-michigan",
    week: 2,
    season: 2026,
    publishedDate: "2026-09-14",
    opponent: "Michigan",
    location: "Michigan Stadium, Ann Arbor, MI",
    isHome: false,
    result: "L",
    score: "10-17",
    record: "1-1 (0-0 SEC)",
    headline: "Turnovers cost No. 11 Sooners in 17-10 loss at the Big House",
    lede:
      "Oklahoma never led in Ann Arbor and fell 17-10 to No. 24 Michigan in front of a program-record 111,240 at Michigan Stadium. The Sooners outgained the Wolverines 289-263 and tied the game 10-10 in the fourth quarter, then John Mateer's interception at the OU 16 set up Jordan Marshall's 1-yard winner. A 10-0 hole at halftime and two giveaways were the difference on a day the defense mostly held.",
    sections: [
      {
        title: "QB Watch",
        body:
          "Mateer finished 17 of 33 for 189 yards, one touchdown, and one interception, plus 13 carries for 45 yards. The split tells the story: 7 of 16 for 52 yards in a scoreless first half, then nine straight completions to start the second half — including a 22-yard strike to Mackenzie Alleyne that made it 10-7. The closing sequence did not. On third-and-9 from the 16, Jyaire Hill jumped the throw, returned it 24 yards to the 6, and Michigan scored two plays later. Three incompletions on the next-to-last drive and a sack to end it left the dual-threat encore looking like the 2025 version on the road. NCAA passer rating: 103.6 on 5.7 yards per attempt.",
        stats: [
          { label: "Mateer Pass", value: "17-33, 189 yds" },
          { label: "Pass TD / INT", value: "1 / 1" },
          { label: "Rush Yds", value: "45" },
          { label: "QB Rating", value: "103.6" },
        ],
      },
      {
        title: "Offense Report",
        body:
          "Ben Arbuckle's unit totaled 289 yards (189 pass, 100 rush) on 62 plays — 4.7 per snap — and converted only 3 of 13 third downs. Rocky Beers was the outlet that worked: six catches for 94 yards, including a 43-yarder that flipped the field for Tate Sandell's tying 34-yard field goal. Lloyd Avant ran nine times for 35 yards; the committee never found a consistent crease against Michigan's front. Oklahoma scored on its first two second-half possessions (90 yards in eight plays, then 83 yards in eight) and then went punt, interception, punt, turnover on downs. Red-zone finishing was a field goal from the 16. Time of possession: 26:43.",
        stats: [
          { label: "Total Yds", value: "289" },
          { label: "Rush / Pass", value: "100 / 189" },
          { label: "1st Downs", value: "17" },
          { label: "3rd Down", value: "3-13" },
        ],
      },
      {
        title: "Defense Report",
        body:
          "Venables' group did enough to win a one-score game. Michigan managed 263 yards, 14 first downs, and 4 of 13 on third down. Bryce Underwood ran for 87 yards and a 38-yard touchdown that made it 7-0 late in the first; that explosive plus a 36-yard throw to JJ Buchanan were the Wolverines' only real chunk plays. Owen Heinecke led all tacklers with 10 and a sack. Taylor Wein added six tackles, 1.5 for loss, and a forced fumble; Reggie Powers III had a sack and two TFLs. After halftime Oklahoma held Michigan to 75 yards on 25 plays — then gave the ball back at the 6. Star linebacker Kip Lewis left in the first half with an apparent knee injury.",
        stats: [
          { label: "Pts Allowed", value: "17" },
          { label: "Yards Allowed", value: "263" },
          { label: "Opp 3rd Downs", value: "4-13" },
          { label: "Sacks", value: "2" },
        ],
      },
      {
        title: "Special Teams",
        body:
          "Sandell was 1-for-1 from 34 yards and 1-for-1 on extra points, tying the game with 11:49 left. Grayson Miller averaged 48.6 yards on five punts, landed three inside the 20, and pinned Michigan at the 1 with a 62-yarder that Jer'Michael Carter downed. Isaiah Sategna III returned three punts for 17 yards; coverage otherwise kept Michigan from flipping the field. The kicking game did its job. The offense could not cash the field position.",
        stats: [
          { label: "FG", value: "1-1 (34)" },
          { label: "Punt Avg", value: "48.6" },
          { label: "Inside 20", value: "3" },
          { label: "Attendance", value: "111,240" },
        ],
      },
      {
        title: "What's Next",
        body:
          "The 1-1 Sooners come home to face New Mexico on Saturday, Sept. 19, at 6:30 p.m. CT at Memorial Stadium. It is the last non-conference date before a trip to Georgia. A bounce-back against the Lobos is the floor; the Michigan tape is a measuring-stick reminder that turnovers and third down still decide September. Boomer Ball will publish the next Monday Morning Quarterback after Norman.",
      },
    ],
    premiumSections: [
      {
        title: "Advanced Take",
        body:
          "Yardage said this was a coin-flip. Expected points did not. Boomer Ball estimates −0.08 EPA per play on offense — the lost fumble, the Hill interception, and 3-of-13 on third down wiped out the second-half rally — and −0.06 EPA per play allowed on defense, which is a winning profile if you don't gift a short field. Success rate sat near 41% (17 first downs, but too many second-and-longs after sacks). Mateer's estimated QB grade of 5.7 reflects 5.7 YPA, one score, one turnover-worthy throw, and that 7-of-16 first half. Michigan took 7 points off the interception and 0 off two of its own fumbles (both recovered).",
        stats: [
          { label: "Off EPA/Play", value: "−0.08 est." },
          { label: "Def EPA/Play", value: "−0.06 allowed" },
          { label: "Success Rate", value: "41% off" },
          { label: "QB Grade", value: "5.7 est." },
        ],
      },
      {
        title: "Efficiency Board",
        body:
          "Yards per play were essentially even: 4.7 for Oklahoma (289 on 62) and 4.5 allowed (263 on 58). Explosive margin was not — Beers' 43-yarder was OU's only 30-plus gain, while Underwood's 38-yard run and Buchanan's 36-yard catch flipped the first half. Red-zone finishing: 1-of-1 for a field goal versus Michigan's 2-of-2 (one touchdown, one field goal). Second-half defensive EPA was the green number: 75 yards on 25 snaps is a top-tier half. Points per drive allowed still landed at 1.42 because the short field counted the same as a 91-yard march. Small-sample warning still applies with two games in the book.",
        stats: [
          { label: "Yds/Play", value: "4.7" },
          { label: "Yds/Play Allwd", value: "4.5" },
          { label: "Explosives 30+", value: "1" },
          { label: "Pts/Drive Allwd", value: "1.42" },
        ],
      },
    ],
    sources: [
      { label: "soonersports.com postgame notes", url: STATS_SOURCE_MICHIGAN_NOTES },
      { label: "Michigan box score", url: STATS_SOURCE_MICHIGAN_BOX },
      { label: "ESPN recap", url: STATS_SOURCE_ESPN_MICHIGAN },
      { label: "soonersports.com stats", url: STATS_SOURCE_SOONERS },
    ],
  },
  {
    id: "2026-week-1-utep",
    slug: "2026-week-1-utep",
    week: 1,
    season: 2026,
    publishedDate: "2026-09-07",
    opponent: "UTEP",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    result: "W",
    score: "51-0",
    record: "1-0 (0-0 SEC)",
    headline: "Sooners open 2026 with a 51-0 shutout of UTEP",
    lede:
      "No. 10 Oklahoma started the Brent Venables encore season the way a playoff hopeful should: score on the first eight possessions, get John Mateer out early, and post a 51-0 shutout of UTEP at Memorial Stadium. Isaiah Sategna III supplied the splash — an 88-yard punt return and a 34-yard touchdown catch — while the defense limited the Miners to 198 yards and two third-down conversions.",
    sections: [
      {
        title: "QB Watch",
        body:
          "Mateer did exactly what Venables asked: take what is there, protect the football, and stay out of negative plays. He completed 11 of 17 for 225 yards and three touchdowns with no interceptions, then sat late in the third quarter. The explosive layer showed up immediately — 40 yards to Rocky Beers, 34 to Sategna, and 48 to Trell Harris. Whitt Newbauer closed the night with a 3-yard rushing score and a 6-yard completion. NCAA passer rating: 234.1 on 13.2 yards per attempt.",
        stats: [
          { label: "Mateer Pass", value: "11-17, 225 yds" },
          { label: "Pass TD / INT", value: "3 / 0" },
          { label: "YPA", value: "13.2" },
          { label: "QB Rating", value: "234.1" },
        ],
      },
      {
        title: "Offense Report",
        body:
          "Ben Arbuckle's unit posted 401 yards (231 pass, 170 rush) and 18 first downs. The Sooners rushed 39 times for 170 yards — about 52 more than last season's per-game average — and finished the opening 76-yard march with a Lloyd Avant 1-yard plunge. The finishing mix was not perfect (three field goals from Tate Sandell and Liam Evans), but the explosive-play margin was lopsided. Oklahoma converted six third downs to UTEP's two and held the ball 30:32.",
        stats: [
          { label: "Total Yds", value: "401" },
          { label: "Rush / Pass", value: "170 / 231" },
          { label: "1st Downs", value: "18" },
          { label: "3rd Down Conv.", value: "6" },
        ],
      },
      {
        title: "Defense Report",
        body:
          "Venables' defense opened with a shutout. UTEP managed 198 yards, 10 first downs, and 86 passing yards. The Miners twice drove into field-goal range in the first half (50 and 43 yards) and missed both kicks — the only real stress of the night. After halftime, Peyton Bowen forced a fumble that Taylor Wein recovered; two plays later Mateer hit Sategna for 34 yards and a 34-0 lead. From there the front kept UTEP behind the sticks.",
        stats: [
          { label: "Pts Allowed", value: "0" },
          { label: "Yards Allowed", value: "198" },
          { label: "Opp 1st Downs", value: "10" },
          { label: "Opp 3rd Downs", value: "2 conv." },
        ],
      },
      {
        title: "Special Teams",
        body:
          "Sategna's 88-yard punt return was Oklahoma's first punt-return touchdown since the 2023 opener and made it 14-0 before the first quarter was half over. He finished with 215 all-purpose yards. Sandell hit from 33 and 32; Evans added a 34-yarder. Coverage and operation were clean enough that the Miners never flipped the field with a return of their own.",
        stats: [
          { label: "PR TD", value: "88 yds" },
          { label: "Sategna A/P", value: "215 yds" },
          { label: "FG", value: "3-3" },
          { label: "Blocked Kicks", value: "0" },
        ],
      },
      {
        title: "What's Next",
        body:
          "The 1-0 Sooners go on the road to face No. 16 Michigan next Saturday, Sept. 12, at 11 a.m. CT on FOX. The Big House is the first real measuring-stick of 2026 — a jump from a 14-rated opener to an 88-rated road environment on the strength board. Boomer Ball will publish the next Monday Morning Quarterback after Ann Arbor.",
      },
    ],
    premiumSections: [
      {
        title: "Advanced Take",
        body:
          "Scoring on the first eight possessions is a drive-efficiency outlier, even against a Group of Five opener. Boomer Ball estimates +0.36 EPA per play on offense and −0.22 EPA per play allowed on defense — a roughly 0.58 EPA margin. Success rate sat near 56% (first-down wins plus those six third-down conversions), while UTEP's success rate hovered around 32% after two missed field goals wiped out their only efficient marches. Mateer's estimated QB grade of 9.1 reflects 13.2 YPA, three scores, and zero turnover-worthy throws before the hook.",
        stats: [
          { label: "Off EPA/Play", value: "+0.36 est." },
          { label: "Def EPA/Play", value: "−0.22 allowed" },
          { label: "Success Rate", value: "56% off" },
          { label: "QB Grade", value: "9.1 est." },
        ],
      },
      {
        title: "Efficiency Board",
        body:
          "Yards per play landed around 7.0 (401 yards on 39 rushes and 18 pass attempts). Explosive rate was the separator: three completions of 34-plus yards plus the 88-yard return. Red-zone finishing was the one leak — Avant and Newbauer punched in from the 1 and 3, but three field goals kept the offensive touchdown rate from matching the EPA. Defensively, havoc showed up as the Bowen forced fumble more than a sack binge; the more important number is points per drive allowed at 0.00. Treat every Week 1 efficiency grade as a small-sample estimate, not a season SP+.",
        stats: [
          { label: "Yds/Play", value: "7.0 est." },
          { label: "Yds/Play Allwd", value: "3.5 est." },
          { label: "Explosives 30+", value: "4" },
          { label: "Pts/Drive Allwd", value: "0.00" },
        ],
      },
    ],
    sources: [
      { label: "soonersports.com recap", url: STATS_SOURCE_UTEP_RECAP },
      { label: "soonersports.com stats", url: STATS_SOURCE_SOONERS },
      { label: "ESPN box score", url: STATS_SOURCE_ESPN },
    ],
  },
  {
    id: "2025-cfp-alabama",
    slug: "2025-cfp-alabama",
    week: 13,
    season: 2025,
    publishedDate: "2025-12-22",
    opponent: "Alabama (CFP First Round)",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    result: "L",
    score: "24-34",
    record: "10-3 (6-2 SEC)",
    headline: "Sooners' CFP run ends at home as Alabama answers in the rematch",
    lede:
      "Oklahoma's landmark 2025 season closed with a 24-34 loss to Alabama in the College Football Playoff first round at Memorial Stadium. The Sooners finished 10-3 and earned their first CFP berth in the SEC era, but the Crimson Tide's balanced offense and red-zone efficiency proved the difference in the rematch.",
    sections: [
      {
        title: "QB Watch",
        body:
          "John Mateer finished 22-of-38 for 241 yards, two touchdowns, and one interception while adding 42 rushing yards. He moved the ball in chunks — three completions of 25+ yards — but Alabama's pressure disrupted timing on third down, where OU converted just 4 of 14 attempts. The dual-threat foundation was there; finishing drives was not.",
        stats: [
          { label: "Mateer Pass", value: "22-38, 241 yds" },
          { label: "Pass TD / INT", value: "2 / 1" },
          { label: "Rush Yds", value: "42" },
          { label: "3rd Down", value: "4-14" },
        ],
      },
      {
        title: "Offense Report",
        body:
          "Oklahoma totaled 368 yards and scored on three of four red-zone trips, but field position and explosive-play margin favored Alabama. The Sooners averaged 5.1 yards per play — respectable — yet managed only one play of 40+ yards. Ben Arbuckle's unit leaned on Mateer's legs and Isaiah Sategna III underneath, but the Tide limited the ground game to 3.4 yards per carry.",
        stats: [
          { label: "Total Yds", value: "368" },
          { label: "Yards/Play", value: "5.1" },
          { label: "Rush YPC", value: "3.4" },
          { label: "Red Zone", value: "3-4 TD" },
        ],
      },
      {
        title: "Defense Report",
        body:
          "Brent Venables' unit generated pressure but could not sustain stops after the first quarter. Alabama scored touchdowns on four of five red-zone possessions and averaged 6.8 yards per play. OU's defense held up on early downs (42% success rate allowed) but gave up three explosive pass plays of 30+ yards that flipped field position.",
        stats: [
          { label: "Pts Allowed", value: "34" },
          { label: "Yards Allowed", value: "412" },
          { label: "Sacks", value: "2" },
          { label: "Explosive Plays", value: "3 (30+ yds)" },
        ],
      },
      {
        title: "What's Next",
        body:
          "The 2025 chapter is closed at 10-3 with a CFP berth — a program reset year by any measure. Attention turns to spring practice, roster development, and a 2026 schedule that opens with UTEP at home before a road trip to Michigan. Boomer Ball will publish a fresh Monday Morning Quarterback after every 2026 game.",
      },
    ],
    premiumSections: [
      {
        title: "Advanced Take",
        body:
          "Oklahoma's offense posted an estimated 0.02 EPA per play in this game — essentially even — while the defense allowed +0.18 EPA per play, well above their season average. The gap in success rate (OU 44% vs. Bama 52%) on standard downs foreshadowed the final margin. Mateer's estimated QB grade of 6.4 reflected efficient yardage offset by the interception and three sacks.",
        stats: [
          { label: "Off EPA/Play", value: "+0.02" },
          { label: "Def EPA/Play", value: "+0.18 allowed" },
          { label: "Success Rate", value: "44% off" },
          { label: "QB Grade", value: "6.4 est." },
        ],
      },
    ],
    sources: [
      { label: "soonersports.com", url: DATA_SOURCE_SCHEDULE },
      { label: "ESPN box score", url: STATS_SOURCE_ESPN },
    ],
    isArchive: true,
  },
  {
    id: "2025-week-11-alabama",
    slug: "2025-week-11-alabama",
    week: 11,
    season: 2025,
    publishedDate: "2025-11-17",
    opponent: "Alabama",
    location: "Bryant-Denny Stadium, Tuscaloosa, AL",
    isHome: false,
    result: "W",
    score: "23-21",
    record: "8-2 (4-2 SEC)",
    headline: "Sooners shock No. 4 Alabama in Tuscaloosa",
    lede:
      "John Mateer and a composed Oklahoma defense delivered the signature win of Brent Venables' fourth season, knocking off Alabama 23-21 in Bryant-Denny Stadium. The victory pushed the Sooners to 8-2 and announced that OU belonged on the national stage in year two of SEC play.",
    sections: [
      {
        title: "QB Watch",
        body:
          "Mateer was at his best on the road: 18-of-28 for 231 yards, a touchdown, and no turnovers, plus 61 rushing yards on designed runs and scrambles. He converted third downs with his legs twice in the second half and managed the game without a turnover against a defense that had forced 18 takeaways entering the week.",
        stats: [
          { label: "Mateer Pass", value: "18-28, 231 yds" },
          { label: "Pass TD / INT", value: "1 / 0" },
          { label: "Rush Yds", value: "61" },
          { label: "QB Rating", value: "142.7" },
        ],
      },
      {
        title: "Offense Report",
        body:
          "Arbuckle's offense did not need fireworks — just efficiency. Oklahoma averaged 5.6 yards per play, won time of possession 32:18 to 27:42, and leaned on a balanced 245 yards passing and 142 rushing. The Sooners scored on both trips inside the 20 and avoided the self-inflicted mistakes that had plagued earlier SEC losses.",
        stats: [
          { label: "Total Yds", value: "387" },
          { label: "Yards/Play", value: "5.6" },
          { label: "TOP", value: "32:18" },
          { label: "Turnovers", value: "0" },
        ],
      },
      {
        title: "Defense Report",
        body:
          "Venables' group bent but did not break. Alabama gained 402 total yards but went 2-of-5 in the red zone, and OU's front generated four sacks. The Sooners held the Tide to 3.9 yards per carry and forced a critical punt in the fourth quarter that set up the game-winning field position.",
        stats: [
          { label: "Yards Allowed", value: "402" },
          { label: "Sacks", value: "4" },
          { label: "Rush YPC", value: "3.9 allowed" },
          { label: "Red Zone", value: "2-5 TD" },
        ],
      },
      {
        title: "What's Next",
        body:
          "At 8-2, Oklahoma controlled its path to the SEC Championship race with Missouri and LSU still on the schedule. A home date with Missouri loomed as the Sooners tried to lock down a top-four seed — and a potential rematch with Alabama down the road.",
      },
    ],
    premiumSections: [
      {
        title: "Advanced Take",
        body:
          "This was the highest offensive success-rate game of OU's SEC slate to that point (54%), driven by Mateer's efficiency on early downs. The defense's havoc rate spiked to 18% — four sacks plus two pass breakups on third down — flipping expected points on two Alabama drives. Estimated SP+ performance: +8 offense, +5 defense for the game.",
        stats: [
          { label: "Off Success Rate", value: "54%" },
          { label: "Havoc Rate", value: "18%" },
          { label: "EPA/Play", value: "+0.14" },
          { label: "QB Grade", value: "8.1 est." },
        ],
      },
    ],
    sources: [
      { label: "soonersports.com", url: "https://soonersports.com/sports/football/stats/2025" },
      { label: "ESPN box score", url: STATS_SOURCE_ESPN },
    ],
    isArchive: true,
  },
  {
    id: "2025-week-2-michigan",
    slug: "2025-week-2-michigan",
    week: 2,
    season: 2025,
    publishedDate: "2025-09-08",
    opponent: "Michigan",
    location: "Gaylord Family – Oklahoma Memorial Stadium, Norman, OK",
    isHome: true,
    result: "W",
    score: "24-13",
    record: "2-0",
    headline: "Defense sets the tone in statement win over Michigan",
    lede:
      "Oklahoma's 24-13 victory over Michigan in the Memorial Stadium opener showed what Brent Venables' rebuilt defense could look like at full strength. The Sooners limited the Wolverines to 13 points and 298 total yards while John Mateer managed a efficient, turnover-free afternoon.",
    sections: [
      {
        title: "QB Watch",
        body:
          "Mateer completed 19 of 30 passes for 221 yards and a touchdown in his first big-stage start at home. He took what the defense gave him — no forced throws into tight windows — and added 34 rushing yards. The stat line was not flashy, but it was exactly what a road-tested Michigan defense required: patience and ball security.",
        stats: [
          { label: "Mateer Pass", value: "19-30, 221 yds" },
          { label: "Pass TD / INT", value: "1 / 0" },
          { label: "Rush Yds", value: "34" },
          { label: "Comp %", value: "63.3%" },
        ],
      },
      {
        title: "Offense Report",
        body:
          "Ben Arbuckle's first home game as coordinator featured a balanced 342-yard effort. Oklahoma ran 71 plays, averaged 4.8 yards per snap, and won the turnover battle. The ground game found creases late as Michigan's front tired, finishing with 121 rushing yards at 4.1 per carry.",
        stats: [
          { label: "Total Yds", value: "342" },
          { label: "Plays", value: "71" },
          { label: "Rush Yds", value: "121" },
          { label: "Turnovers", value: "0" },
        ],
      },
      {
        title: "Defense Report",
        body:
          "Venables' return to play-calling was the story. OU held Michigan to 2-of-10 on third down, recorded three sacks, and forced a fumble. The Wolverines mustered only 98 rushing yards and did not reach the end zone after the first quarter.",
        stats: [
          { label: "Pts Allowed", value: "13" },
          { label: "Yards Allowed", value: "298" },
          { label: "3rd Down", value: "2-10" },
          { label: "Sacks", value: "3" },
        ],
      },
      {
        title: "What's Next",
        body:
          "A road trip to Philadelphia against Temple followed before Auburn opened SEC play at Memorial Stadium. The Michigan result validated the offseason staff changes and gave Mateer a confidence boost heading into conference play.",
      },
    ],
    premiumSections: [
      {
        title: "Advanced Take",
        body:
          "Oklahoma's defense posted an estimated 0.08 EPA per play allowed — elite for a Power Four opener. Success rate on defense (38% allowed) ranked in the top quartile nationally for Week 2. Mateer's 0.12 EPA per play passing placed him in the upper tier of FBS quarterbacks that week, with zero turnover-worthy throws charted.",
        stats: [
          { label: "Def EPA/Play", value: "+0.08 allowed" },
          { label: "Success Rate Def", value: "38% allowed" },
          { label: "Pass EPA/Play", value: "+0.12" },
          { label: "QB Grade", value: "7.6 est." },
        ],
      },
    ],
    sources: [
      { label: "soonersports.com", url: STATS_SOURCE_SOONERS_2025 },
      { label: "ESPN box score", url: STATS_SOURCE_ESPN },
    ],
    isArchive: true,
  },
];
