import type { IconicGame } from "./legends-types";

export const ICONIC_GAMES_SOURCE =
  "https://soonersports.com/sports/football/opponent-history";

/** Ten of the most famous games in Oklahoma Sooners football history */
export const iconicGames: IconicGame[] = [
  {
    id: "1971-nebraska",
    title: "Game of the Century",
    nickname: "vs. #1 Nebraska",
    date: "November 25, 1971",
    opponent: "Nebraska",
    location: "Owen Field, Norman, OK",
    result: "L",
    score: "OU 31, Nebraska 35",
    era: "1970s Wishbone Dynasty",
    tags: ["Rivalry", "No. 1 vs No. 2", "Classic"],
    description:
      "The first time college football's top two teams met when both were undefeated. A packed Owen Field watched Nebraska's I-formation edge OU's wishbone in a back-and-forth classic that lived up to the hype — still debated as the greatest regular-season game ever played.",
    stats: [
      { label: "OU Rush Yds", value: "472" },
      { label: "Joe W. Rush", value: "266" },
      { label: "Attendance", value: "62,000" },
      { label: "Combined Pts", value: "66" },
    ],
    image: "/legend-games/1971-nebraska.webp",
  },
  {
    id: "2000-orange-bowl",
    title: "Perfect Season Sealed",
    nickname: "BCS National Championship",
    date: "January 3, 2000",
    opponent: "Florida State",
    location: "Orange Bowl, Miami, FL",
    result: "W",
    score: "OU 13, Florida State 2",
    era: "Stoops Dynasty Begins",
    tags: ["National Title", "Bowl", "Undefeated"],
    description:
      "Bob Stoops' first season ended with a 13-0 record and a defensive masterpiece. The Sooners held FSU to just two points — a safety — while Josh Heupel managed the game and the defense dominated one of the era's most explosive offenses.",
    stats: [
      { label: "OU Record", value: "13-0" },
      { label: "FSU Points", value: "2" },
      { label: "OU Sacks", value: "5" },
      { label: "Heupel Pass Yds", value: "168" },
    ],
    image: "/legend-games/2000-orange-bowl.webp",
  },
  {
    id: "2014-sugar-bowl",
    title: "Sugar Bowl Stunner",
    nickname: "Upset of Alabama",
    date: "January 2, 2014",
    opponent: "Alabama",
    location: "Superdome, New Orleans, LA",
    result: "W",
    score: "OU 45, Alabama 31",
    era: "Air Raid Renaissance",
    tags: ["Upset", "Bowl", "Statement Win"],
    description:
      "Las Vegas made Alabama a two-touchdown favorite, but Trevor Knight and the Sooners shredded the Crimson Tide with 487 yards of offense. OU's biggest bowl upset in a generation announced the program was back on the national stage.",
    stats: [
      { label: "Knight Pass Yds", value: "348" },
      { label: "Knight Rush Yds", value: "83" },
      { label: "Total Offense", value: "487" },
      { label: "Spread Upset", value: "+14" },
    ],
    image: "/legend-games/2014-sugar-bowl.webp",
  },
  {
    id: "2008-red-river",
    title: "Red River Shootout",
    nickname: "Toppling #1 Texas",
    date: "October 11, 2008",
    opponent: "Texas",
    location: "Cotton Bowl, Dallas, TX",
    result: "W",
    score: "OU 45, Texas 35",
    era: "Air Raid Peak",
    tags: ["Rivalry", "No. 1 Upset", "Neutral Site"],
    description:
      "Sam Bradford and the highest-scoring offense in the country dropped 45 on a Texas team ranked No. 1 in the BCS. The Sooners' precision passing attack turned the Cotton Bowl into a statement that OU owned the Big 12's biggest stage.",
    stats: [
      { label: "Bradford Pass Yds", value: "311" },
      { label: "Bradford TD", value: "5" },
      { label: "OU Total Yds", value: "497" },
      { label: "Texas Rank", value: "#1" },
    ],
    image: "/legend-games/2008-red-river.webp",
  },
  {
    id: "1985-orange-bowl",
    title: "Boz & the '86 Defense",
    nickname: "National Championship",
    date: "January 1, 1986",
    opponent: "Penn State",
    location: "Orange Bowl, Miami, FL",
    result: "W",
    score: "OU 25, Penn State 10",
    era: "Switzer Era",
    tags: ["National Title", "Bowl", "Defense"],
    description:
      "Barry Switzer's third national title featured the legendary '86 Defense' — Brian Bosworth, Tony Casillas, and company smothered Penn State while Jamelle Holieway ran the wishbone. The Sooners finished 11-1 and cemented the 1980s as a golden age.",
    stats: [
      { label: "PSU Total Yds", value: "246" },
      { label: "Holieway Rush", value: "92" },
      { label: "OU Sacks", value: "4" },
      { label: "Final AP Rank", value: "#1" },
    ],
    image: "/legend-games/1985-orange-bowl.webp",
  },
  {
    id: "2018-west-virginia",
    title: "Mountaineer Shootout",
    nickname: "59-56 in Norman",
    date: "November 23, 2018",
    opponent: "West Virginia",
    location: "Gaylord Family Stadium, Norman, OK",
    result: "W",
    score: "OU 59, West Virginia 56",
    era: "Riley Air Raid",
    tags: ["Shootout", "Big 12", "Record Offense"],
    description:
      "Kyler Murray and Will Grier traded haymakers in one of the highest-scoring games in OU history. Murray's 296 passing and 66 rushing yards plus four total TDs edged a Will Grier-led offense that piled up 704 yards — pure Big 12 chaos.",
    stats: [
      { label: "Murray Total TD", value: "4" },
      { label: "Combined Pts", value: "115" },
      { label: "WVU Total Yds", value: "704" },
      { label: "OU Total Yds", value: "556" },
    ],
    image: "/legend-games/2018-west-virginia.webp",
  },
  {
    id: "1972-sugar-bowl",
    title: "Sugar Bowl Domination",
    nickname: "National Championship",
    date: "January 1, 1972",
    opponent: "Auburn",
    location: "Tulane Stadium, New Orleans, LA",
    result: "W",
    score: "OU 40, Auburn 22",
    era: "1970s Wishbone Dynasty",
    tags: ["National Title", "Bowl", "Greg Pruitt"],
    description:
      "Greg Pruitt's 222 rushing yards powered OU to its second national title in Chuck Fairbanks' wishbone system. The Sooners avenged a regular-season loss and closed the season as undisputed champions with a dominant New Year's performance.",
    stats: [
      { label: "Pruitt Rush Yds", value: "222" },
      { label: "Pruitt Rush TD", value: "3" },
      { label: "OU Total Rush", value: "439" },
      { label: "Final Record", value: "11-1" },
    ],
    image: "/legend-games/1972-sugar-bowl.webp",
  },
  {
    id: "2017-bedlam",
    title: "Flag Plant in Stillwater",
    nickname: "Bedlam 2017",
    date: "November 4, 2017",
    opponent: "Oklahoma State",
    location: "Boone Pickens Stadium, Stillwater, OK",
    result: "W",
    score: "OU 45, Oklahoma State 7",
    era: "Mayfield Era",
    tags: ["Rivalry", "Bedlam", "Iconic Moment"],
    description:
      "Baker Mayfield threw for 386 yards and three touchdowns, then planted the OU flag at midfield in Stillwater — an image that instantly entered Sooner lore. The rout clinched the Big 12 path and embodied Mayfield's competitive fire.",
    stats: [
      { label: "Mayfield Pass Yds", value: "386" },
      { label: "Mayfield TD", value: "3" },
      { label: "OU Total Yds", value: "606" },
      { label: "Margin", value: "+38" },
    ],
    image: "/legend-games/2017-bedlam.webp",
  },
  {
    id: "2007-fiesta-bowl",
    title: "Fiesta Bowl Heartbreak",
    nickname: "Statue of Liberty",
    date: "January 1, 2007",
    opponent: "Boise State",
    location: "University of Phoenix Stadium, Glendale, AZ",
    result: "L",
    score: "OU 42, Boise State 43 (OT)",
    era: "Stoops Mid-Dynasty",
    tags: ["Bowl", "Classic Finish", "Heartbreak"],
    description:
      "One of the greatest bowl games ever played — OU led 42-28 late before Boise State's hook-and-lateral, trick-play overtime, and Statue of Liberty two-point conversion stunned the Sooners. Painful for OU, but universally remembered as instant classic theater.",
    stats: [
      { label: "Combined Pts", value: "85" },
      { label: "OT Periods", value: "1" },
      { label: "Peterson Rush Yds", value: "124" },
      { label: "Lead Lost", value: "14 pts" },
    ],
    image: "/legend-games/2007-fiesta-bowl.webp",
  },
  {
    id: "2023-red-river",
    title: "Red River Revival",
    nickname: "SEC Era Statement",
    date: "October 7, 2023",
    opponent: "Texas",
    location: "Cotton Bowl, Dallas, TX",
    result: "W",
    score: "OU 34, Texas 30",
    era: "Venables / SEC Transition",
    tags: ["Rivalry", "Red River", "Comeback"],
    description:
      "In Brent Venables' second season, the Sooners rallied from a 21-point deficit to beat Texas in the Cotton Bowl classic. The win signaled OU could still win the rivalry during its SEC transition and kept Big 12 title hopes alive.",
    stats: [
      { label: "Largest Comeback", value: "21 pts" },
      { label: "Gabriel Pass Yds", value: "270" },
      { label: "Gabriel Rush TD", value: "2" },
      { label: "Venables Year", value: "Year 2" },
    ],
    image: "/legend-games/2023-red-river.webp",
  },
];

export const ICONIC_GAME_IMAGE_CREDIT = "Boomer Ball original artwork";

export function getIconicGameImageUrl(game: IconicGame): string {
  return game.image;
}
