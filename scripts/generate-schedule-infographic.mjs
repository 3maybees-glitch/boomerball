/**
 * Generate a Boomer Ball 2026 schedule strength-board infographic (X/Twitter).
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
 *
 * Full 12-game slate with 0–100 strength scores + Hot Take names.
 * Michigan, Georgia, and Texas are highlighted as the season's key games.
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = "/opt/cursor/artifacts";
const publicOut = join(root, "public/social");
mkdirSync(outDir, { recursive: true });
mkdirSync(publicOut, { recursive: true });

const W = 1080;
const H = 1350;

const TIER_COLOR = {
  cupcake: "#1f7a3a",
  warmup: "#2d8a4e",
  workable: "#b45309",
  grinder: "#c2410c",
  beast: "#9b1b1b",
  nightmare: "#841617",
};

const games = [
  {
    date: "SEP 5",
    loc: "vs",
    city: "Norman",
    opponent: "UTEP",
    score: 14,
    take: "Powder Puff",
    tier: "cupcake",
  },
  {
    date: "SEP 12",
    loc: "at",
    city: "Ann Arbor",
    opponent: "Michigan",
    score: 88,
    take: "Big House Blues",
    tier: "beast",
    highlight: true,
  },
  {
    date: "SEP 19",
    loc: "vs",
    city: "Norman",
    opponent: "New Mexico",
    score: 18,
    take: "Lobo Lob",
    tier: "cupcake",
  },
  {
    date: "SEP 26",
    loc: "at",
    city: "Athens",
    opponent: "Georgia",
    score: 98,
    take: "Nightmare Fuel",
    tier: "nightmare",
    highlight: true,
  },
  {
    date: "OCT 10",
    loc: "vs",
    city: "Dallas",
    opponent: "Texas",
    score: 95,
    take: "Red River Rumble",
    tier: "nightmare",
    highlight: true,
  },
  {
    date: "OCT 17",
    loc: "vs",
    city: "Norman",
    opponent: "Kentucky",
    score: 44,
    take: "Bluegrass Breeze",
    tier: "workable",
  },
  {
    date: "OCT 24",
    loc: "at",
    city: "Starkville",
    opponent: "Miss. State",
    score: 52,
    take: "Cowbell Chaos",
    tier: "grinder",
  },
  {
    date: "OCT 31",
    loc: "vs",
    city: "Norman",
    opponent: "South Carolina",
    score: 56,
    take: "Gamecock Gauntlet",
    tier: "grinder",
  },
  {
    date: "NOV 7",
    loc: "at",
    city: "Gainesville",
    opponent: "Florida",
    score: 74,
    take: "Swamp Stomp",
    tier: "beast",
  },
  {
    date: "NOV 14",
    loc: "vs",
    city: "Norman",
    opponent: "Ole Miss",
    score: 79,
    take: "Rebel Yell",
    tier: "beast",
  },
  {
    date: "NOV 21",
    loc: "vs",
    city: "Norman",
    opponent: "Texas A&M",
    score: 83,
    take: "Aggie Aggro",
    tier: "beast",
  },
  {
    date: "NOV 28",
    loc: "at",
    city: "Columbia",
    opponent: "Missouri",
    score: 61,
    take: "Tiger Trap",
    tier: "grinder",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function flameIcon(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <path d="M0,-16 C6,-10 8,-4 6,2 C10,-2 10,-8 6,-14 C14,-6 14,4 8,10 C4,16 -4,16 -8,10 C-14,4 -14,-6 -6,-14 C-10,-8 -10,-2 -6,2 C-8,-4 -6,-10 0,-16 Z" fill="#841617"/>
  </g>`;
}

function fieldHashMarks() {
  let marks = "";
  for (let i = 0; i < 14; i++) {
    const y = 110 + i * 85;
    marks += `<line x1="0" y1="${y}" x2="30" y2="${y}" stroke="#fdf9d8" stroke-width="2.5" opacity="0.07"/>`;
    marks += `<line x1="${W - 30}" y1="${y}" x2="${W}" y2="${y}" stroke="#fdf9d8" stroke-width="2.5" opacity="0.07"/>`;
  }
  return marks;
}

const ROW_X = 36;
const ROW_W = 1008;
const HI_H = 88;
const REG_H = 64;
const GAP = 6;
const LIST_Y = 376;

function rowY(index) {
  let y = LIST_Y;
  for (let i = 0; i < index; i++) {
    y += (games[i].highlight ? HI_H : REG_H) + GAP;
  }
  return y;
}

function gameRow(game, index) {
  const y = rowY(index);
  const h = game.highlight ? HI_H : REG_H;
  const mid = y + h / 2;
  const color = TIER_COLOR[game.tier];
  const barW = Math.max(18, Math.round((game.score / 100) * 132));

  if (game.highlight) {
    const hiBarW = Math.max(22, Math.round((game.score / 100) * 118));
    const nameEnd = ROW_X + 140 + Math.round(game.opponent.length * 20.5);
    const badgeX = Math.min(nameEnd + 14, ROW_X + 520);
    return `
  <rect x="${ROW_X}" y="${y}" width="${ROW_W}" height="${h}" rx="16" fill="url(#panel)"/>
  <rect x="${ROW_X}" y="${y}" width="12" height="${h}" rx="6" fill="#841617"/>
  <rect x="${ROW_X + 12}" y="${y}" width="6" height="${h}" fill="#d4af37" opacity="0.9"/>
  <rect x="${ROW_X + 28}" y="${y + 16}" width="96" height="26" rx="8" fill="#841617"/>
  <text x="${ROW_X + 76}" y="${y + 35}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#fdf9d8">${escapeXml(game.date)}</text>
  <text x="${ROW_X + 28}" y="${y + 68}" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" fill="#841617">${escapeXml(game.loc.toUpperCase())} · ${escapeXml(game.city)}</text>
  <text x="${ROW_X + 140}" y="${y + 40}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="32" font-weight="900" fill="#1a0a0a">${escapeXml(game.opponent)}</text>
  <text x="${ROW_X + 140}" y="${y + 70}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" fill="#841617">${escapeXml(game.take)}</text>
  <rect x="${badgeX}" y="${y + 18}" width="92" height="22" rx="11" fill="#841617"/>
  <text x="${badgeX + 46}" y="${y + 34}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" letter-spacing="1" fill="#fdf9d8">KEY GAME</text>
  <text x="${ROW_X + ROW_W - 28}" y="${y + 48}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="42" font-weight="900" fill="#841617">${game.score}</text>
  <rect x="${ROW_X + 854}" y="${y + 60}" width="118" height="10" rx="5" fill="#841617" opacity="0.14"/>
  <rect x="${ROW_X + 854}" y="${y + 60}" width="${hiBarW}" height="10" rx="5" fill="${color}"/>`;
  }

  return `
  <rect x="${ROW_X}" y="${y}" width="${ROW_W}" height="${h}" rx="14" fill="url(#panel)" opacity="0.94"/>
  <rect x="${ROW_X}" y="${y}" width="8" height="${h}" rx="4" fill="${color}"/>
  <text x="${ROW_X + 24}" y="${mid + 6}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="13" font-weight="900" fill="#841617">${escapeXml(game.date)}</text>
  <text x="${ROW_X + 118}" y="${mid + 6}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="800" fill="#841617">${escapeXml(game.loc)}</text>
  <text x="${ROW_X + 152}" y="${mid + 7}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#1a0a0a">${escapeXml(game.opponent)}</text>
  <text x="${ROW_X + 448}" y="${mid + 6}" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d2a2a">${escapeXml(game.take)}</text>
  <rect x="${ROW_X + 768}" y="${mid - 5}" width="118" height="10" rx="5" fill="#841617" opacity="0.12"/>
  <rect x="${ROW_X + 768}" y="${mid - 5}" width="${Math.max(16, Math.round((game.score / 100) * 118))}" height="10" rx="5" fill="${color}"/>
  <text x="${ROW_X + ROW_W - 22}" y="${mid + 8}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" fill="${color}">${game.score}</text>`;
}

const lastY = rowY(games.length);
const footerY = H - 28;

const rowsSvg = games.map((g, i) => gameRow(g, i)).join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5c0f10"/>
      <stop offset="45%" stop-color="#841617"/>
      <stop offset="100%" stop-color="#2a0808"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdf9d8"/>
      <stop offset="100%" stop-color="#f0e9c4"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fdf9d8" stop-opacity="0"/>
      <stop offset="50%" stop-color="#fdf9d8" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#fdf9d8" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grain" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="12" r="1" fill="#fdf9d8" opacity="0.04"/>
      <circle cx="42" cy="28" r="1" fill="#fdf9d8" opacity="0.03"/>
      <circle cx="64" cy="56" r="1" fill="#fdf9d8" opacity="0.045"/>
      <circle cx="22" cy="68" r="1" fill="#fdf9d8" opacity="0.03"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <circle cx="1000" cy="40" r="230" fill="#fdf9d8" opacity="0.04"/>
  <circle cx="40" cy="1280" r="250" fill="#000" opacity="0.2"/>
  ${fieldHashMarks()}

  <text x="540" y="48" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="72" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3.5" fill="#f0e9c4" opacity="0.9">2026 STRENGTH BOARD</text>
  <rect x="340" y="84" width="400" height="2" fill="url(#accent)"/>

  <text x="540" y="122" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="30" font-weight="900" fill="#fdf9d8">EVERY GAME. A SCORE. A HOT TAKE.</text>
  <text x="540" y="148" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#f0e9c4" opacity="0.92">How we rank the Sooners’ 2026 slate</text>

  <rect x="36" y="162" width="492" height="86" rx="16" fill="url(#panel)"/>
  <text x="56" y="188" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="12" font-weight="900" letter-spacing="2" fill="#841617">STRENGTH</text>
  <text x="56" y="218" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#1a0a0a">0–100</text>
  <text x="56" y="240" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">How hard the opponent is</text>

  <rect x="552" y="162" width="492" height="86" rx="16" fill="url(#panel)"/>
  <text x="572" y="188" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="12" font-weight="900" letter-spacing="2" fill="#841617">HOT TAKE</text>
  ${flameIcon(1008, 205, 0.85)}
  <text x="572" y="218" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" fill="#1a0a0a">THE NICKNAME</text>
  <text x="572" y="240" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">What we call that fight</text>

  <rect x="36" y="260" width="324" height="58" rx="14" fill="#1a0a0a" opacity="0.38"/>
  <text x="198" y="284" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" fill="#fdf9d8">#2</text>
  <text x="198" y="306" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1" fill="#f0e9c4">NATIONAL SOS</text>

  <rect x="372" y="260" width="336" height="58" rx="14" fill="#1a0a0a" opacity="0.38"/>
  <text x="540" y="284" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" fill="#fdf9d8">64/100</text>
  <text x="540" y="306" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1" fill="#f0e9c4">AVG STRENGTH</text>

  <rect x="720" y="260" width="324" height="58" rx="14" fill="#fdf9d8"/>
  <text x="882" y="284" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" fill="#841617">7</text>
  <text x="882" y="306" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1" fill="#5c0f10">RANKED-LEVEL FOES</text>

  <rect x="36" y="326" width="188" height="22" rx="11" fill="#1f7a3a"/>
  <text x="130" y="342" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" fill="#fdf9d8">CUPCAKE</text>
  <rect x="232" y="326" width="188" height="22" rx="11" fill="#b45309"/>
  <text x="326" y="342" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" fill="#fdf9d8">WORKABLE</text>
  <rect x="428" y="326" width="188" height="22" rx="11" fill="#c2410c"/>
  <text x="522" y="342" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" fill="#fdf9d8">GRINDER</text>
  <rect x="624" y="326" width="188" height="22" rx="11" fill="#9b1b1b"/>
  <text x="718" y="342" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" fill="#fdf9d8">BEAST</text>
  <rect x="820" y="326" width="224" height="22" rx="11" fill="#5c0f10"/>
  <text x="932" y="342" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="11" font-weight="900" fill="#fdf9d8">NIGHTMARE</text>

  <text x="36" y="368" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="2" fill="#fdf9d8">THE FULL SLATE</text>
  <text x="1044" y="368" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#f0e9c4" opacity="0.9">Hot Take  ·  Strength</text>

  ${rowsSvg}

  <text x="540" y="${footerY}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/schedule</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(52, 52).png().toBuffer(),
      top: 16,
      left: 36,
    },
  ])
  .png()
  .toBuffer();

const filename = "2026-schedule-strength-board.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const blurb = `OU’s 2026 slate is a gauntlet — College Football News has it the No. 2 toughest in FBS.

We grade every game two ways:

STRENGTH — 0–100 how hard the opponent is
HOT TAKE — the nickname we slap on that fight

Tiers run Cupcake → Workable → Grinder → Beast → Nightmare.

The three that decide the season:

at Michigan (Sep 12) — 88 · Big House Blues
at Georgia (Sep 26) — 98 · Nightmare Fuel
vs Texas (Oct 10, Dallas) — 95 · Red River Rumble

UTEP is a 14 Powder Puff. Georgia is a 98 Nightmare Fuel. That’s the range.

Full board, every Hot Take, every score → https://boomerball.app/schedule

#BoomerSooner #Sooners #OUFootball #SEC #RedRiver`;

writeFileSync(join(publicOut, "2026-schedule-strength-board-blurb.txt"), `${blurb}\n`);
writeFileSync(join(outDir, "2026-schedule-strength-board-blurb.txt"), `${blurb}\n`);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
console.log("--- X BLURB ---");
console.log(blurb);
console.log(`chars: ${blurb.length}`);
console.log({ lastY, footerY, leftover: H - lastY });
