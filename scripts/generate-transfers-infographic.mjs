/**
 * Generate a Boomer Ball infographic for the 2026 transfer class (X/Twitter).
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
 *
 * X caption (copy/paste):
 *
 * 16 new Sooners. Where they came from, the 2026 role, and the strength that got them here.
 *
 * Livingstone (Texas) + Harris (Virginia) lock WR. Hansen (Florida) + Beers (CSU) rebuild TE. Sullivan (Michigan) starts next to Lewis.
 *
 * Full graphic ↓  boomerball.app/roster
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

const featured = [
  {
    name: "Parker Livingstone",
    pos: "WR",
    num: "3",
    from: "Texas",
    fromShort: "TEX",
    role: "Starting X",
    strength: "Vertical size · 516 yds, 6 TD",
  },
  {
    name: "Trell Harris",
    pos: "WR",
    num: "11",
    from: "Virginia",
    fromShort: "UVA",
    role: "Starting Z",
    strength: "All-ACC · 59–847–5",
  },
  {
    name: "Hayden Hansen",
    pos: "TE",
    num: "89",
    from: "Florida",
    fromShort: "FLA",
    role: "Starting Y",
    strength: "6'8\" mismatch · 30–254–2",
  },
  {
    name: "Rocky Beers",
    pos: "TE",
    num: "81",
    from: "Colorado St.",
    fromShort: "CSU",
    role: "Starting TE",
    strength: "CSU TE record · 31–388–7",
  },
  {
    name: "Cole Sullivan",
    pos: "LB",
    num: "18",
    from: "Michigan",
    fromShort: "MICH",
    role: "Starting MIKE",
    strength: "3 INT, 2 sacks · blitz juice",
  },
  {
    name: "E'Marion Harris",
    pos: "OL",
    num: "76",
    from: "Arkansas",
    fromShort: "ARK",
    role: "Starting RT",
    strength: "24 SEC starts · every-game RT",
  },
];

const rest = [
  {
    name: "Lloyd Avant",
    pos: "RB",
    from: "CSU",
    role: "3rd-down / KR",
    strength: "417 rush · 24 rec",
  },
  {
    name: "Dakoda Fields",
    pos: "CB",
    from: "Oregon",
    role: "CB rotation",
    strength: "Length · 3 yrs left",
  },
  {
    name: "Mackenzie Alleyne",
    pos: "WR",
    from: "WSU",
    role: "WR depth",
    strength: "Mateer chemistry",
  },
  {
    name: "Bishop Thomas",
    pos: "DT",
    from: "Ga. St.",
    role: "DT rotation",
    strength: "48 tackles · 3.5 TFL",
  },
  {
    name: "Jack Van Dorselaer",
    pos: "TE",
    from: "Tennessee",
    role: "Blocking TE",
    strength: "186 SEC snaps",
  },
  {
    name: "Kenny Ozowalu",
    pos: "DL",
    from: "UTSA",
    role: "DL depth",
    strength: "6 TFL · 3 sacks",
  },
  {
    name: "Caleb Nitta",
    pos: "OL",
    from: "WKU",
    role: "C / G depth",
    strength: "69.2 PFF center",
  },
  {
    name: "Peyton Joseph",
    pos: "OL",
    from: "Ga. Tech",
    role: "Interior depth",
    strength: "3 years left",
  },
  {
    name: "Prince Ijioma",
    pos: "DB",
    from: "MVSU",
    role: "DB depth",
    strength: "39 tackles · 4 PDs",
  },
  {
    name: "Fred Hinton",
    pos: "OL",
    from: "EKU",
    role: "OL depth",
    strength: "Every-game starter",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function featuredCard(player, x, y, w, h) {
  const cx = x + 22;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="url(#panel)"/>
  <rect x="${x}" y="${y}" width="8" height="${h}" rx="4" fill="#841617"/>
  <rect x="${x + 20}" y="${y + 16}" width="52" height="24" rx="6" fill="#841617"/>
  <text x="${x + 46}" y="${y + 34}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="13" font-weight="900" fill="#fdf9d8">${escapeXml(player.pos)}</text>
  <text x="${x + w - 20}" y="${y + 36}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" fill="#841617">#${escapeXml(player.num)}</text>
  <text x="${cx}" y="${y + 72}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="23" font-weight="900" fill="#1a0a0a">${escapeXml(player.name)}</text>
  <text x="${cx}" y="${y + 98}" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.6" fill="#841617">FROM ${escapeXml(player.from).toUpperCase()}</text>
  <text x="${cx}" y="${y + 126}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0a0a">${escapeXml(player.role)}</text>
  <text x="${cx}" y="${y + 152}" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">${escapeXml(player.strength)}</text>`;
}

function restRow(player, x, y, w, h) {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#panel)" opacity="0.95"/>
  <text x="${x + 14}" y="${y + 22}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#1a0a0a">${escapeXml(player.name)}</text>
  <text x="${x + w - 14}" y="${y + 22}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="800" fill="#841617">${escapeXml(player.pos)} · ${escapeXml(player.from)}</text>
  <text x="${x + 14}" y="${y + 42}" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="#3d2a2a">${escapeXml(player.role)}  ·  ${escapeXml(player.strength)}</text>`;
}

const CARD_W = 492;
const CARD_H = 176;
const CARD_GAP_X = 16;
const CARD_GAP_Y = 12;
const CARD_X0 = 36;
const CARD_Y0 = 186;

const featuredSvg = featured
  .map((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = CARD_X0 + col * (CARD_W + CARD_GAP_X);
    const y = CARD_Y0 + row * (CARD_H + CARD_GAP_Y);
    return featuredCard(p, x, y, CARD_W, CARD_H);
  })
  .join("\n");

const REST_Y0 = CARD_Y0 + 3 * (CARD_H + CARD_GAP_Y) + 40;
const REST_H = 52;
const REST_GAP = 7;

const restSvg = rest
  .map((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = CARD_X0 + col * (CARD_W + CARD_GAP_X);
    const y = REST_Y0 + row * (REST_H + REST_GAP);
    return restRow(p, x, y, CARD_W, REST_H);
  })
  .join("\n");

const restBlockH = 5 * REST_H + 4 * REST_GAP;
const scoutY = REST_Y0 + restBlockH + 16;
const footerY = 1286;

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
  <circle cx="980" cy="80" r="220" fill="#fdf9d8" opacity="0.04"/>
  <circle cx="80" cy="1260" r="260" fill="#000" opacity="0.18"/>
  <text x="540" y="430" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="280" font-weight="900" fill="#fdf9d8" opacity="0.05">16</text>

  <text x="540" y="48" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="72" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3.5" fill="#f0e9c4" opacity="0.9">2026 PORTAL CLASS · 16 ARRIVALS</text>
  <rect x="340" y="84" width="400" height="2" fill="url(#accent)"/>

  <text x="540" y="124" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="36" font-weight="900" fill="#fdf9d8">FROM · ROLE · STRENGTH</text>
  <text x="540" y="150" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#f0e9c4" opacity="0.9">Where they came from · what they do in Norman</text>

  <text x="36" y="178" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#fdf9d8">IMPACT SIX</text>
  <text x="1044" y="178" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="#f0e9c4" opacity="0.85">Projected 2026 starters</text>

  ${featuredSvg}

  <text x="36" y="${REST_Y0 - 14}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#fdf9d8">THE REST OF THE CLASS</text>
  <text x="1044" y="${REST_Y0 - 14}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="600" fill="#f0e9c4" opacity="0.85">Rotation + depth</text>

  ${restSvg}

  <rect x="36" y="${scoutY}" width="1008" height="88" rx="16" fill="#1a0a0a" opacity="0.35"/>
  <text x="56" y="${scoutY + 32}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="2" fill="#fdf9d8">BOOMER BALL TAKE</text>
  <text x="56" y="${scoutY + 58}" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#fdf9d8">Not a splash-for-splash class — a role-for-role class. Mateer gets size at WR,</text>
  <text x="56" y="${scoutY + 78}" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#fdf9d8">Venables gets a MIKE, and the TE room is rebuilt from scratch.</text>

  <text x="540" y="${footerY}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/roster</text>
  <text x="540" y="${footerY + 26}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#f0e9c4" opacity="0.9">Full bios · CFB27 ratings · 2026 WAR MAP</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(56, 56).png().toBuffer(),
      top: 16,
      left: 36,
    },
  ])
  .png()
  .toBuffer();

const filename = "2026-portal-class-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const blurb = `16 new Sooners. Where they came from, the 2026 role, and the strength that got them here.

Livingstone (Texas) + Harris (Virginia) lock WR. Hansen (Florida) + Beers (CSU) rebuild TE. Sullivan (Michigan) starts next to Lewis.

Full graphic ↓  boomerball.app/roster`;

const longBlurb = `OU didn’t chase a Mateer-sized splash this cycle. They signed 16 transfers to fill jobs.

FROM → ROLE → STRENGTH

The headliners:
• Parker Livingstone (Texas) — Starting X. Vertical size, 516 yards and 6 TDs.
• Trell Harris (Virginia) — Starting Z. All-ACC, 59-847-5.
• Hayden Hansen (Florida) — Starting Y. 6'8" mismatch.
• Rocky Beers (CSU) — Starting TE. 7 TDs, CSU TE record.
• Cole Sullivan (Michigan) — Starting MIKE next to Kip Lewis. 3 INT, 2 sacks.
• E'Marion Harris (Arkansas) — Starting RT. 24 SEC starts.

Plus 10 more for the rotation: Avant, Fields, Alleyne, Thomas, Van Dorselaer, Ozowalu, Nitta, Joseph, Ijioma, Hinton.

Not splash-for-splash. Role-for-role.

Full roster, CFB27 ratings, WAR MAP → boomerball.app/roster`;

const blurbFile = `SHORT (X caption, ${blurb.length} chars)
${blurb}

LONG (thread / Premium caption)
${longBlurb}
`;

writeFileSync(join(publicOut, "2026-portal-class-blurb.txt"), blurbFile);
writeFileSync(join(outDir, "2026-portal-class-blurb.txt"), blurbFile);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
console.log("--- X BLURB ---");
console.log(blurb);
console.log(`chars: ${blurb.length}`);
console.log({ REST_Y0, scoutY, footerY, scoutBottom: scoutY + 88 });
