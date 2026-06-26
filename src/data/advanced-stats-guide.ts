export interface StatGuideEntry {
  id: string;
  name: string;
  /** Matches AdvancedMetric.label where applicable */
  metricLabel?: string;
  category: "overview" | "offense" | "defense" | "efficiency" | "special" | "grades";
  whatItIs: string;
  whyItMatters: string;
  howToRead: string;
  /** Plain-language example or analogy */
  example?: string;
}

export const advancedStatsGuide: StatGuideEntry[] = [
  {
    id: "sp-plus-overview",
    name: "SP+ Ratings (Overview)",
    category: "overview",
    whatItIs:
      "SP+ is a team efficiency rating popularized by ESPN's Bill Connelly. It asks: \"How many points better (or worse) is this team than an average FBS team, on a per-play basis?\" Boomer Ball computes SP+-inspired ratings from OU's official stats compared to SEC averages — not ESPN's exact formula.",
    whyItMatters:
      "Raw stats like total yards can lie — a team that runs up the score in blowouts but struggles in close games might look better than they are. Efficiency ratings adjust for opponent quality and how consistently you move the ball or get stops.",
    howToRead:
      "Positive numbers are good. +10 offense means OU scores roughly 10 points more per game than an average team would with the same opportunities. +8 defense means the defense is allowing about 8 fewer points than average. Zero is perfectly average.",
    example:
      "Think of it like a golf handicap for your team — it tells you how much better or worse than par you play, not just your final score.",
  },
  {
    id: "sp-plus-offense",
    name: "SP+ Offense",
    metricLabel: "SP+ Offense",
    category: "offense",
    whatItIs:
      "A single number summarizing how efficient OU's offense was in 2025 — scoring, yards per play, third-down conversions, and red-zone touchdowns all feed in.",
    whyItMatters:
      "It separates \"we threw for 400 yards but settled for field goals\" from \"we scored touchdowns when we needed them.\" Great offenses sustain drives and finish in the end zone.",
    howToRead:
      "+15 or higher = elite nationally. +5 to +14 = solid SEC contender. Below 0 = below average. Compare to defense: you want both sides positive for playoff teams.",
  },
  {
    id: "sp-plus-defense",
    name: "SP+ Defense",
    metricLabel: "SP+ Defense",
    category: "defense",
    whatItIs:
      "The defensive mirror of SP+ offense — how many fewer points OU allows compared to an average team, weighted by sacks, interceptions, third-down stops, and points allowed.",
    whyItMatters:
      "Venables defenses live on disruption. This number captures whether OU gets off the field on third down and creates negative plays, not just whether opponents move the ball between the 20s.",
    howToRead:
      "+10 or higher = elite. +5 to +9 = very good. Negative = defense is a liability. OU's 2025 defense was a strength — look for this to stay positive in 2026.",
  },
  {
    id: "sp-plus-overall",
    name: "SP+ Overall",
    metricLabel: "SP+ Overall",
    category: "efficiency",
    whatItIs:
      "The average of offensive and defensive SP+ — a quick \"whole team\" efficiency snapshot.",
    whyItMatters:
      "Championship teams rarely have one side carrying the other for a full season. Overall SP+ shows whether OU is balanced or leaning on one phase.",
    howToRead:
      "Add offense + defense mentally: a +12 offense and +8 defense = strong top-10 profile. If one side is negative, the other needs to be elite to compensate.",
  },
  {
    id: "epa-play",
    name: "EPA / Play (Expected Points Added)",
    metricLabel: "EPA/Play (Offense)",
    category: "offense",
    whatItIs:
      "EPA measures how much each play increased (or decreased) OU's expected final score. A 5-yard gain on 3rd-and-4 is huge; the same 5 yards on 1st-and-10 is fine but not special. EPA accounts for down, distance, and field position.",
    whyItMatters:
      "Yards don't tell the whole story. A 2-yard run on 3rd-and-1 is a win; a 2-yard run on 3rd-and-8 is a loss. EPA captures that context on every snap.",
    howToRead:
      "Positive EPA/play = offense is helping win the game snap by snap. +0.20 or higher is excellent. Near zero is average. Negative means you're digging a hole play after play.",
    example:
      "Imagine each play adds or subtracts points from a running scoreboard before the drive ends. EPA totals those tiny wins and losses.",
  },
  {
    id: "success-rate",
    name: "Success Rate",
    metricLabel: "Success Rate",
    category: "offense",
    whatItIs:
      "The percentage of plays that keep the offense \"on schedule\" — gaining at least 50% of yards needed on 1st down, 70% on 2nd down, or 100% on 3rd/4th down.",
    whyItMatters:
      "Sustainable offenses don't always need explosive plays — they stay ahead of the chains. High success rate = manageable third downs and fewer punts.",
    howToRead:
      "45%+ is strong at the college level. Below 40% = too many long third downs. Pair with explosive rate: some teams succeed with boom-or-bust; OU ideally wants both.",
  },
  {
    id: "explosive-rate",
    name: "Explosive Play Rate",
    metricLabel: "Explosive Play Rate",
    category: "offense",
    whatItIs:
      "Share of plays that gain 20+ yards passing or 10+ yards rushing — the \"chunk\" plays that flip field position fast.",
    whyItMatters:
      "Big plays are the fastest way to score and demoralize defenses. Air Raid offenses like Arbuckle's live on creating one-on-one matchups that turn into home runs.",
    howToRead:
      "10%+ is good. 12%+ is elite. Low explosive rate with high success rate = methodical but may struggle to score quickly. High explosive rate with low success rate = boom-or-bust.",
  },
  {
    id: "pressure-rate",
    name: "Pressure Rate",
    metricLabel: "Pressure Rate",
    category: "defense",
    whatItIs:
      "Estimated percentage of opponent dropbacks where OU's pass rush bothered the quarterback — sack, hit, or hurry — even if the ball was still thrown.",
    whyItMatters:
      "Pressure collapses pockets faster than coverage alone. QBs under pressure throw worse, take sacks, and force checkdowns. Venables' fronts are built to generate this.",
    howToRead:
      "20%+ is strong. 25%+ is elite. Sacks are the visible stat; pressure rate captures the full pass-rush impact including hurries that don't show on the box score.",
  },
  {
    id: "havoc-rate",
    name: "Havoc Rate",
    metricLabel: "Havoc Rate",
    category: "defense",
    whatItIs:
      "Combined defensive disruption — tackles for loss, sacks, forced turnovers, and pass breakups — as a share of opponent plays. \"Havoc\" = plays where the defense wrecked the offense's plan.",
    whyItMatters:
      "Venables' identity is chaos. High havoc means OU lives in the backfield, creates negative yardage, and generates short fields for the offense.",
    howToRead:
      "15%+ is good. 18%+ is elite (top-25 nationally). If havoc is high but points allowed are too, big plays are beating the defense — check explosive plays allowed separately.",
  },
  {
    id: "third-down-stop",
    name: "3rd Down Stop Rate",
    metricLabel: "3rd Down Stop Rate",
    category: "defense",
    whatItIs:
      "How often OU's defense gets off the field on third down — shown here as the opponent's third-down conversion rate allowed (lower is better for OU).",
    whyItMatters:
      "Third down is the money down. Stop the drive here and you get the ball back; give up a conversion and the drive extends. Elite defenses win this battle consistently.",
    howToRead:
      "If opponents convert 35% of third downs, OU stops them 65% of the time — that's excellent. Under 40% opponent conversion = top-tier defense. Over 45% = leaky.",
  },
  {
    id: "red-zone-offense",
    name: "Red Zone Offense TD%",
    metricLabel: "Red Zone Offense TD%",
    category: "efficiency",
    whatItIs:
      "When OU reaches the opponent's 20-yard line, how often the drive ends in a touchdown (not a field goal or turnover).",
    whyItMatters:
      "Moving the ball means nothing if you settle for three. Red zone TD% separates contenders from teams that stall inside the 10.",
    howToRead:
      "60%+ is good. 70%+ is elite. If yards are high but red zone TD% is low, the offense is leaving points on the table — often an O-line or play-calling issue.",
  },
  {
    id: "red-zone-defense",
    name: "Red Zone Defense TD%",
    metricLabel: "Red Zone Defense TD%",
    category: "defense",
    whatItIs:
      "When opponents enter OU's red zone, how often they score touchdowns instead of field goals.",
    whyItMatters:
      "Bend-but-don't-break defenses force field goals. Elite red zone defense turns 7-point threats into 3-point outcomes — that swing wins close games.",
    howToRead:
      "Under 50% allowed is solid. Under 45% is elite. If opponents score TDs 60%+ inside your 20, you're giving up too many seven-point punches.",
  },
  {
    id: "special-teams-epa",
    name: "Special Teams EPA",
    metricLabel: "Special Teams EPA",
    category: "special",
    whatItIs:
      "Net expected points from kicking, punting, and returns — did special teams help or hurt OU's expected score compared to average?",
    whyItMatters:
      "Hidden yardage wins games: a 50-yard punt inside the 5, a missed field goal, a kick return to midfield. Special teams EPA rolls all of that into one number.",
    howToRead:
      "Positive = special teams are a net plus. +2 to +4 over a season is meaningful. Negative = fix the unit before close SEC games bite you.",
  },
  {
    id: "pff-grades",
    name: "PFF-Style Player Grades",
    category: "grades",
    whatItIs:
      "Pro Football Focus grades every player on every snap — not just box score stats. Boomer Ball estimates similar 0–100 grades from OU's 2025 production data. These are NOT official PFF grades.",
    whyItMatters:
      "A corner might allow 3 catches but all contested and in tight coverage — box score looks bad, grade looks good. Grades attempt to capture process, not just results.",
    howToRead:
      "80+ = excellent / All-SEC caliber. 70–79 = solid starter. 60–69 = average. Below 60 = struggled. Compare within position groups, not across positions (QB grading differs from DT).",
    example:
      "Think of it like a teacher grading every homework assignment, not just the final exam. Consistency across snaps matters.",
  },
];

export const guideCategoryLabels: Record<StatGuideEntry["category"], string> = {
  overview: "Start Here",
  offense: "Offense Metrics",
  defense: "Defense Metrics",
  efficiency: "Efficiency & Red Zone",
  special: "Special Teams",
  grades: "Player Grades",
};

export const guideCategoryOrder: StatGuideEntry["category"][] = [
  "overview",
  "offense",
  "defense",
  "efficiency",
  "special",
  "grades",
];
