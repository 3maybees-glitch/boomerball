/**
 * Parses soonersports.com roster markdown export into roster-2026.json
 * Run: node scripts/parse-roster.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const raw = readFileSync(
  process.argv[2] ?? "/home/ubuntu/.cursor/projects/workspace/agent-tools/594531e7-af37-409b-8d16-2fbdfa06258a.txt",
  "utf8"
);

const ESPN_IDS = {
  "John Mateer": 4915980,
  "Tory Blaylock": 5141386,
  "Isaiah Sategna III": 5080703,
  "Jer'Michael Carter": 5155000,
  "Jacob Jordan": 5218767,
  "Kip Lewis": 4711065,
  "Peyton Bowen": 4870625,
  "Eli Bowen": 5079337,
  "David Stone": 5079711,
  "Courtland Guillory": 5207928,
  "Taylor Wein": 5114314,
  "Xavier Robinson": 5122554,
  "Owen Heinecke": 5081928,
  "Adepoju Adebawore": 4899363,
  "Jacobe Johnson": 4870815,
  "Michael Boganowski": 5147138,
  "Whitt Newbauer": 5224237,
  "Jett Niu": 5224237,
  "Tate Sandell": 4900756,
  "Ivan Carreon": 5114593,
  "Gabe Sawchuk": 5079673,
  "Andy Bass": 5079673,
  "Nigel Smith II": 5079597,
  "Danny Okoye": 5110453,
  "Wyatt Gilmore": 5149215,
  "Trent Wilson": 5141720,
  "Jacob Henry": 5141720,
  "Alex Shieldnight": 5121586,
  "Reggie Powers III": 5143274,
  "Omarion Robinson": 5141654,
  "Trystan Haynes": 5293826,
  "Elijah Thomas": 5141719,
  "Kade McIntyre": 4873418,
  "John Locke Jr.": 4873418,
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function posGroup(pos) {
  const p = pos.toUpperCase();
  if (["QB", "RB", "WR", "TE"].includes(p)) return p;
  if (p === "OL") return "OL";
  if (["DL", "DE", "DT", "EDGE"].includes(p)) return "DL";
  if (p === "LB") return "LB";
  if (["DB", "S", "CB", "NICKEL"].includes(p)) return "DB";
  if (["K", "P", "LS", "K/P", "PK"].includes(p)) return "ST";
  return "DL";
}

function normalizeClass(c) {
  const map = {
    Fr: "Freshman",
    So: "Sophomore",
    Jr: "Junior",
    Sr: "Senior",
    "R-Fr": "Redshirt Freshman",
    "R-So": "Redshirt Sophomore",
    "R-Jr": "Redshirt Junior",
    "R-Sr": "Redshirt Senior",
  };
  return map[c.replace(/\.$/, "")] ?? c;
}

const coachStart = raw.indexOf("### Brent Venables");
const playerSection = coachStart > 0 ? raw.slice(0, coachStart) : raw;
const blocks = playerSection.split(/^### /m).slice(1);

const players = [];

for (const block of blocks) {
  const lines = block.trim().split("\n").map((l) => l.trim());
  const name = lines[0]?.trim();
  if (!name || name.includes("Coaching")) continue;

  const jerseyMatch = block.match(/jersey number (\d+)/i);
  const number = jerseyMatch ? parseInt(jerseyMatch[1], 10) : 0;

  const statLine = lines.find((l) =>
    /^[A-Z\/]{1,5}\s+(R-)?(Fr|So|Jr|Sr)\./.test(l)
  );
  if (!statLine) continue;

  const statMatch = statLine.match(
    /^([A-Z\/]+)\s+((?:R-)?(?:Fr|So|Jr|Sr)\.)\s+(\d+'\s*\d+''?)\s+(\d+)\s+lbs/
  );
  if (!statMatch) continue;

  const [, position, classRaw, height, weight] = statMatch;
  const hometownLine = lines[lines.indexOf(statLine) + 1] ?? "";
  const hometown = hometownLine.split(/\s{2,}/)[0] ?? hometownLine;

  const id = `${slugify(name)}-${number}`;
  players.push({
    id,
    name,
    number,
    position,
    positionGroup: posGroup(position),
    height: height.replace(/''/g, '"').replace(/\s+/g, ""),
    weight: parseInt(weight, 10),
    classYear: normalizeClass(classRaw),
    hometown,
    highSchool: hometownLine.includes("/")
      ? hometownLine.split("/").slice(1).join("/").trim()
      : hometownLine.replace(hometown, "").trim() || undefined,
    bio: `${name} is a ${normalizeClass(classRaw).toLowerCase()} ${position} from ${hometown.split(",")[0]?.trim() ?? hometown}. Listed at ${height.replace(/''/g, '"')} and ${weight} lbs on the 2026 Oklahoma roster per soonersports.com.`,
    espnId: ESPN_IDS[name],
    imageCredit: ESPN_IDS[name] ? "ESPN" : undefined,
  });
}

// Deduplicate by id (same number different players)
const seen = new Set();
const unique = players.filter((p) => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

unique.sort((a, b) => a.number - b.number || a.name.localeCompare(b.name));

writeFileSync(
  new URL("../src/data/roster-2026.json", import.meta.url),
  JSON.stringify(unique, null, 2)
);

console.log(`Wrote ${unique.length} players to roster-2026.json`);
