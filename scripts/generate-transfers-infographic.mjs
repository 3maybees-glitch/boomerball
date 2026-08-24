/**
 * Generate a Boomer Ball infographic for the 2026 transfer class (X/Twitter).
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
 *
 * Simple board: six impact arrivals — from, role, one strength. No box scores.
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

const players = [
  {
    name: "Parker Livingstone",
    pos: "WR",
    from: "Texas",
    role: "Starting X",
    strength: "Big outside target",
    stat: "516",
    statLabel: "YDS",
    statSub: "6 TD",
  },
  {
    name: "Trell Harris",
    pos: "WR",
    from: "Virginia",
    role: "Starting Z",
    strength: "Reliable hands",
    stat: "847",
    statLabel: "YDS",
    statSub: "5 TD",
  },
  {
    name: "Hayden Hansen",
    pos: "TE",
    from: "Florida",
    role: "Starting TE",
    strength: "Red-zone size",
    stat: "30",
    statLabel: "REC",
    statSub: "2 TD",
  },
  {
    name: "Rocky Beers",
    pos: "TE",
    from: "Colorado St.",
    role: "Starting TE",
    strength: "Mismatch weapon",
    stat: "7",
    statLabel: "TD",
    statSub: "CSU record",
  },
  {
    name: "Cole Sullivan",
    pos: "LB",
    from: "Michigan",
    role: "Starting MIKE",
    strength: "Range + blitz",
    stat: "3",
    statLabel: "INT",
    statSub: "2 sacks",
  },
  {
    name: "E'Marion Harris",
    pos: "OL",
    from: "Arkansas",
    role: "Starting RT",
    strength: "SEC starter",
    stat: "24",
    statLabel: "STARTS",
    statSub: "SEC RT",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(player, x, y, w, h) {
  const mid = y + h / 2;
  const statX = x + w - 40;
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="url(#panel)"/>
  <rect x="${x}" y="${y}" width="10" height="${h}" rx="5" fill="#841617"/>
  <rect x="${x + 36}" y="${mid - 24}" width="78" height="48" rx="12" fill="#841617"/>
  <text x="${x + 75}" y="${mid + 9}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="900" fill="#fdf9d8">${escapeXml(player.pos)}</text>
  <text x="${x + 136}" y="${y + 52}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="32" font-weight="900" fill="#1a0a0a">${escapeXml(player.name)}</text>
  <text x="${x + 136}" y="${y + 92}" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#841617">${escapeXml(player.from)}  →  ${escapeXml(player.role)}</text>
  <text x="${x + 136}" y="${y + 124}" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#3d2a2a">${escapeXml(player.strength)}</text>
  <text x="${statX}" y="${y + 62}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="36" font-weight="900" fill="#841617">${escapeXml(player.stat)}</text>
  <text x="${statX}" y="${y + 86}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="1.5" fill="#841617">${escapeXml(player.statLabel)}</text>
  <text x="${statX}" y="${y + 114}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#3d2a2a">${escapeXml(player.statSub)}</text>`;
}

const ROW_X = 40;
const ROW_W = 1000;
const ROW_H = 148;
const ROW_GAP = 16;
const ROW_Y0 = 200;

const rowsSvg = players
  .map((p, i) => row(p, ROW_X, ROW_Y0 + i * (ROW_H + ROW_GAP), ROW_W, ROW_H))
  .join("\n");

const lastRowBottom = ROW_Y0 + 6 * ROW_H + 5 * ROW_GAP;
const footerY = lastRowBottom + 56;

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

  <text x="540" y="52" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="80" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="3.5" fill="#f0e9c4" opacity="0.9">2026 PORTAL CLASS</text>
  <rect x="340" y="94" width="400" height="2" fill="url(#accent)"/>

  <text x="540" y="148" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="42" font-weight="900" fill="#fdf9d8">NEW SOONERS</text>
  <text x="540" y="184" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#f0e9c4" opacity="0.9">From  ·  Role  ·  Last year</text>

  ${rowsSvg}

  <text x="540" y="${footerY}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/roster</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(56, 56).png().toBuffer(),
      top: 18,
      left: 40,
    },
  ])
  .png()
  .toBuffer();

const filename = "2026-portal-class-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const blurb = `OU’s 2026 portal class isn’t a splash hunt — it’s a role hunt.

Six new starters:

WR Parker Livingstone (Texas) — Starting X. Big outside target. 516 yds, 6 TD last year.

WR Trell Harris (Virginia) — Starting Z. Reliable hands. 847 yds, 5 TD, All-ACC.

TE Hayden Hansen (Florida) — Starting TE. Red-zone size. 30 rec, 2 TD.

TE Rocky Beers (Colorado St.) — Starting TE. Mismatch weapon. 7 TD, CSU record.

LB Cole Sullivan (Michigan) — Starting MIKE next to Kip Lewis. Range + blitz. 3 INT, 2 sacks.

OL E’Marion Harris (Arkansas) — Starting RT. 24 SEC starts.

Full roster, CFB27 ratings, and the 2026 WAR MAP → https://boomerball.app/roster

#BoomerSooner #Sooners #OUFootball #TransferPortal #SEC`;

writeFileSync(join(publicOut, "2026-portal-class-blurb.txt"), `${blurb}\n`);
writeFileSync(join(outDir, "2026-portal-class-blurb.txt"), `${blurb}\n`);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
console.log("--- X BLURB ---");
console.log(blurb);
console.log(`chars: ${blurb.length}`);
console.log({ lastRowBottom, footerY });
