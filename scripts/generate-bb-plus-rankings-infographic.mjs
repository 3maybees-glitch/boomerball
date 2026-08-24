/**
 * Generate a Boomer Ball BB+ Rankings infographic for X/Twitter.
 * Soft-sells full Offense/Defense boards (Locker Room) + the 2026 WAR MAP.
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
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

/** Combined BB+ Top 12 — computed from src/lib/bb-plus.ts (2026 Press) */
const combined = [
  { rank: 1, school: "Ohio State", short: "OSU", rating: 21.9, conf: "B1G" },
  { rank: 2, school: "Georgia", short: "UGA", rating: 18.6, conf: "SEC" },
  { rank: 3, school: "Texas", short: "TEX", rating: 17.9, conf: "SEC" },
  { rank: 4, school: "Oregon", short: "ORE", rating: 15.5, conf: "B1G" },
  { rank: 5, school: "Penn State", short: "PSU", rating: 15.4, conf: "B1G" },
  { rank: 6, school: "Ole Miss", short: "MISS", rating: 13.5, conf: "SEC" },
  { rank: 7, school: "Alabama", short: "BAMA", rating: 12.4, conf: "SEC" },
  { rank: 8, school: "Notre Dame", short: "ND", rating: 12.2, conf: "IND" },
  { rank: 9, school: "Michigan", short: "MICH", rating: 11.2, conf: "B1G" },
  { rank: 10, school: "Miami", short: "MIA", rating: 10.4, conf: "ACC" },
  { rank: 11, school: "Oklahoma", short: "OU", rating: 9.0, conf: "SEC", highlight: true },
  { rank: 12, school: "Texas A&M", short: "A&M", rating: 8.3, conf: "SEC" },
];

const defenseTop4 = [
  { rank: 1, school: "Georgia", short: "UGA", rating: "+15.7" },
  { rank: 2, school: "Penn St", short: "PSU", rating: "+13.0" },
  { rank: 3, school: "Ohio St", short: "OSU", rating: "+12.6" },
  { rank: 4, school: "Oklahoma", short: "OU", rating: "+12.5", highlight: true },
];

const MAX_RATING = combined[0].rating;
const ROW_H = 46;
const LIST_X = 36;
const LIST_W = 1008;
const LIST_PANEL_Y = 218;
const LIST_HEADER_H = 34;
const LIST_TOP = LIST_PANEL_Y + LIST_HEADER_H;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatRating(n) {
  return `+${n.toFixed(1)}`;
}

function teamBadge(short, x, y, highlight) {
  const bg = highlight ? "#841617" : "#1a0a0a";
  const fg = "#fdf9d8";
  const size = short.length >= 4 ? 11 : 13;
  return `
  <circle cx="${x}" cy="${y}" r="18" fill="${bg}" opacity="${highlight ? 1 : 0.85}"/>
  <text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="900" fill="${fg}">${escapeXml(short)}</text>`;
}

function rankBadge(rank, x, y, highlight) {
  if (rank <= 3) {
    const fills = { 1: "#841617", 2: "#6b1213", 3: "#4a1a1a" };
    return `
  <circle cx="${x}" cy="${y}" r="19" fill="none" stroke="${fills[rank]}" stroke-width="3" opacity="0.35"/>
  <circle cx="${x}" cy="${y}" r="15" fill="${fills[rank]}"/>
  <text x="${x}" y="${y + 6}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" fill="#fdf9d8">${rank}</text>`;
  }
  if (highlight) {
    return `
  <circle cx="${x}" cy="${y}" r="17" fill="#841617"/>
  <circle cx="${x}" cy="${y}" r="17" fill="none" stroke="#fdf9d8" stroke-width="2.5"/>
  <text x="${x}" y="${y + 6}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="17" font-weight="900" fill="#fdf9d8">${rank}</text>`;
  }
  return `
  <circle cx="${x}" cy="${y}" r="16" fill="#841617"/>
  <text x="${x}" y="${y + 6}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" fill="#fdf9d8">${rank}</text>`;
}

function strengthBar(rating, x, y, highlight) {
  const maxW = 188;
  const w = Math.max(26, Math.round((rating / MAX_RATING) * maxW));
  return `
  <rect x="${x}" y="${y}" width="${maxW}" height="16" rx="8" fill="#841617" opacity="0.12"/>
  <rect x="${x}" y="${y}" width="${w}" height="16" rx="8" fill="#841617" opacity="${highlight ? 1 : 0.72}"/>
  <circle cx="${x + w - 2}" cy="${y + 8}" r="6" fill="#841617" opacity="${highlight ? 1 : 0.9}"/>`;
}

function ouMark(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <circle cx="0" cy="0" r="15" fill="#841617"/>
    <text x="0" y="5.5" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#fdf9d8" letter-spacing="-1">OU</text>
  </g>`;
}

function footballIcon(x, y, scale = 1, opacity = 0.9) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})" opacity="${opacity}">
    <ellipse cx="0" cy="0" rx="16" ry="10" fill="#fdf9d8"/>
    <path d="M-9,-2.5 Q0,-6 9,-2.5 M-9,2.5 Q0,6 9,2.5" fill="none" stroke="#841617" stroke-width="1.5"/>
    <line x1="0" y1="-7" x2="0" y2="7" stroke="#841617" stroke-width="1.4"/>
  </g>`;
}

function shieldIcon(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <path d="M0,-18 L15,-11 L15,5 Q15,16 0,22 Q-15,16 -15,5 L-15,-11 Z" fill="#fdf9d8"/>
    <path d="M0,-12 L9,-8 L9,3 Q9,11 0,15 Q-9,11 -9,3 L-9,-8 Z" fill="#841617"/>
  </g>`;
}

function boltIcon(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <path d="M3,-16 L-8,1 L0,1 L-3,16 L10,-1 L2,-1 Z" fill="#fdf9d8"/>
  </g>`;
}

function lockIcon(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <rect x="-13" y="-1" width="26" height="20" rx="4" fill="#fdf9d8"/>
    <path d="M-7,-1 V-10 A7,7 0 0 1 7,-10 V-1" fill="none" stroke="#fdf9d8" stroke-width="3.5"/>
    <circle cx="0" cy="9" r="2.6" fill="#841617"/>
  </g>`;
}

function mapPinIcon(x, y, scale = 1) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})">
    <path d="M0,-17 C9,-17 14,-11 14,-3 C14,6 0,19 0,19 C0,19 -14,6 -14,-3 C-14,-11 -9,-17 0,-17 Z" fill="#fdf9d8"/>
    <circle cx="0" cy="-4" r="5" fill="#841617"/>
  </g>`;
}

function fieldHashMarks() {
  let marks = "";
  for (let i = 0; i < 14; i++) {
    const y = 120 + i * 85;
    marks += `<line x1="0" y1="${y}" x2="34" y2="${y}" stroke="#fdf9d8" stroke-width="2.5" opacity="0.07"/>`;
    marks += `<line x1="0" y1="${y + 14}" x2="18" y2="${y + 14}" stroke="#fdf9d8" stroke-width="2" opacity="0.05"/>`;
    marks += `<line x1="${W - 34}" y1="${y}" x2="${W}" y2="${y}" stroke="#fdf9d8" stroke-width="2.5" opacity="0.07"/>`;
    marks += `<line x1="${W - 18}" y1="${y + 14}" x2="${W}" y2="${y + 14}" stroke="#fdf9d8" stroke-width="2" opacity="0.05"/>`;
  }
  return marks;
}

function listRows() {
  return combined
    .map((t, i) => {
      const y = LIST_TOP + i * ROW_H;
      const midY = y + ROW_H / 2;
      const rowBg = t.highlight
        ? `<rect x="${LIST_X + 8}" y="${y + 1}" width="${LIST_W - 16}" height="${ROW_H - 2}" rx="10" fill="#841617" opacity="0.14"/>
           <rect x="${LIST_X + 8}" y="${y + 1}" width="8" height="${ROW_H - 2}" rx="4" fill="#841617"/>`
        : i % 2 === 0
          ? `<rect x="${LIST_X + 8}" y="${y + 1}" width="${LIST_W - 16}" height="${ROW_H - 2}" rx="10" fill="#841617" opacity="0.05"/>`
          : "";

      const schoolFill = t.highlight ? "#841617" : "#1a0a0a";
      const schoolSize = 32;
      const ratingLabel = formatRating(t.rating);

      return `
  ${rowBg}
  ${rankBadge(t.rank, LIST_X + 38, midY, t.highlight)}
  ${teamBadge(t.short, LIST_X + 78, midY, t.highlight)}
  <text x="${LIST_X + 108}" y="${midY + 11}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="${schoolSize}" font-weight="900" fill="${schoolFill}">${escapeXml(t.school)}</text>
  <text x="${LIST_X + 430}" y="${midY + 10}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="1" fill="#3d2a2a" opacity="0.7">${escapeXml(t.conf)}</text>
  ${strengthBar(t.rating, LIST_X + 490, midY - 8, t.highlight)}
  <text x="${LIST_X + LIST_W - 16}" y="${midY + 12}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="32" font-weight="900" fill="#841617">${escapeXml(ratingLabel)}</text>`;
    })
    .join("\n");
}

function defenseStrip(y) {
  const tileW = 236;
  const gap = 10;
  const startX = 40;
  const tiles = defenseTop4
    .map((t, i) => {
      const x = startX + i * (tileW + gap);
      const bg = t.highlight ? "#841617" : "#fdf9d8";
      const rankFill = t.highlight ? "#fdf9d8" : "#841617";
      const nameFill = t.highlight ? "#fdf9d8" : "#1a0a0a";
      const ratingFill = t.highlight ? "#f0e9c4" : "#841617";
      const badgeBg = t.highlight ? "#fdf9d8" : "#841617";
      const badgeFg = t.highlight ? "#841617" : "#fdf9d8";
      return `
  <rect x="${x}" y="${y}" width="${tileW}" height="84" rx="14" fill="${bg}"/>
  <circle cx="${x + 32}" cy="${y + 42}" r="20" fill="${badgeBg}"/>
  <text x="${x + 32}" y="${y + 48}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="12" font-weight="900" fill="${badgeFg}">${escapeXml(t.short)}</text>
  <text x="${x + 62}" y="${y + 34}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="${rankFill}">#${t.rank}</text>
  <text x="${x + 108}" y="${y + 34}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="900" fill="${nameFill}">${escapeXml(t.school)}</text>
  <text x="${x + 62}" y="${y + 62}" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" fill="${ratingFill}">${escapeXml(t.rating)} DEF</text>`;
    })
    .join("\n");

  return `
  ${shieldIcon(28, y - 20, 0.55)}
  <text x="56" y="${y - 14}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="2" fill="#fdf9d8">DEFENSE BB+ TOP 4</text>
  <text x="1040" y="${y - 14}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#f0e9c4" opacity="0.9">Full O/D boards → Locker Room</text>
  ${tiles}`;
}

function offenseTeaser(y) {
  return `
  <rect x="36" y="${y}" width="1008" height="70" rx="16" fill="#1a0a0a" opacity="0.35"/>
  ${boltIcon(74, y + 35, 0.75)}
  <text x="108" y="${y + 28}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="15" font-weight="900" letter-spacing="2" fill="#fdf9d8">OFFENSE BB+</text>
  <text x="108" y="${y + 52}" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="500" fill="#fdf9d8">OU #12 · EPA, explosives &amp; RZ board unlock in The Locker Room</text>
  <rect x="820" y="${y + 13}" width="200" height="44" rx="22" fill="#fdf9d8"/>
  <text x="920" y="${y + 41}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" fill="#841617">SEE FULL O/D →</text>`;
}

function scoutNote(y) {
  return `
  <rect x="36" y="${y}" width="1008" height="64" rx="14" fill="#fdf9d8" opacity="0.12"/>
  <text x="60" y="${y + 26}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" letter-spacing="2" fill="#fdf9d8">SCOUT NOTE</text>
  <text x="60" y="${y + 50}" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="500" fill="#fdf9d8">Venables Yr 5 havoc ceiling puts OU defense in the national Top 4 — Mateer encore still the offense lever.</text>`;
}

function softSellCards(y) {
  return `
  <rect x="36" y="${y}" width="492" height="112" rx="18" fill="#1a0a0a" opacity="0.45"/>
  <rect x="36" y="${y}" width="8" height="112" rx="4" fill="#fdf9d8" opacity="0.9"/>
  ${lockIcon(86, y + 50, 1.05)}
  <text x="126" y="${y + 38}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="17" font-weight="900" letter-spacing="1.5" fill="#fdf9d8">THE LOCKER ROOM</text>
  <text x="126" y="${y + 64}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="500" fill="#fdf9d8">Full Offense &amp; Defense BB+</text>
  <text x="126" y="${y + 88}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#f0e9c4">$24.99 · 2026 season access</text>

  <rect x="552" y="${y}" width="492" height="112" rx="18" fill="#1a0a0a" opacity="0.45"/>
  <rect x="552" y="${y}" width="8" height="112" rx="4" fill="#fdf9d8" opacity="0.9"/>
  ${mapPinIcon(602, y + 50, 1.05)}
  <text x="642" y="${y + 38}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="17" font-weight="900" letter-spacing="1.5" fill="#fdf9d8">2026 WAR MAP</text>
  <text x="642" y="${y + 64}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="500" fill="#fdf9d8">$1 Sooner season sheet</text>
  <text x="642" y="${y + 88}" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#f0e9c4">Included with Locker Room</text>`;
}

const listPanelH = LIST_HEADER_H + combined.length * ROW_H + 8;
const defenseY = LIST_PANEL_Y + listPanelH + 34;
const offenseY = defenseY + 84 + 18;
const scoutY = offenseY + 70 + 14;
const softY = scoutY + 64 + 14;
const footerY = Math.min(H - 42, softY + 112 + 34);

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
    <linearGradient id="ouCard" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fdf9d8"/>
      <stop offset="100%" stop-color="#ebe3b0"/>
    </linearGradient>
    <pattern id="grain" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="8" cy="12" r="1" fill="#fdf9d8" opacity="0.04"/>
      <circle cx="42" cy="28" r="1" fill="#fdf9d8" opacity="0.03"/>
      <circle cx="64" cy="56" r="1" fill="#fdf9d8" opacity="0.045"/>
      <circle cx="22" cy="68" r="1" fill="#fdf9d8" opacity="0.03"/>
    </pattern>
    <pattern id="diamonds" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M14,3 L18,14 L14,25 L10,14 Z" fill="#fdf9d8" opacity="0.035"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <rect width="${W}" height="${H}" fill="url(#diamonds)"/>
  <circle cx="1020" cy="30" r="250" fill="#fdf9d8" opacity="0.045"/>
  <circle cx="10" cy="1300" r="260" fill="#000" opacity="0.22"/>
  ${fieldHashMarks()}

  <g opacity="0.14">
    <circle cx="1000" cy="145" r="44" fill="none" stroke="#fdf9d8" stroke-width="3" stroke-dasharray="5 4"/>
    <circle cx="1000" cy="145" r="30" fill="none" stroke="#fdf9d8" stroke-width="2"/>
    <text x="1000" y="152" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="17" font-weight="900" fill="#fdf9d8">BB+</text>
  </g>

  ${footballIcon(1015, 280, 1.3, 0.09)}
  ${footballIcon(50, 820, 1.1, 0.08)}

  <text x="540" y="50" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="74" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="3.5" fill="#f0e9c4" opacity="0.9">BB+ RANKINGS · 2026 PRESS</text>
  <rect x="340" y="86" width="400" height="2" fill="url(#accent)"/>

  <text x="540" y="120" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="32" font-weight="900" fill="#fdf9d8">COMBINED TOP 12</text>
  <text x="540" y="144" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#f0e9c4" opacity="0.9">48% offense · 52% defense · Updated Aug 4, 2026</text>

  <rect x="36" y="156" width="1008" height="48" rx="14" fill="url(#ouCard)"/>
  ${ouMark(70, 180, 1)}
  <text x="98" y="188" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="1" fill="#841617">OKLAHOMA</text>
  <text x="262" y="188" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#3d2a2a">Sooners · Venables Yr 5</text>

  <rect x="520" y="167" width="148" height="26" rx="13" fill="#841617"/>
  <text x="594" y="186" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#fdf9d8">#11 COMB +9.0</text>

  <rect x="678" y="167" width="156" height="26" rx="13" fill="#841617"/>
  <text x="756" y="186" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#fdf9d8">DEFENSE #4</text>

  <rect x="844" y="167" width="178" height="26" rx="13" fill="#5c0f10"/>
  <text x="933" y="186" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="#fdf9d8">OFFENSE #12</text>

  <rect x="${LIST_X}" y="${LIST_PANEL_Y}" width="${LIST_W}" height="${listPanelH}" rx="16" fill="url(#panel)"/>

  <polygon points="60,241 72,233 72,249" fill="#841617"/>
  <text x="84" y="245" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="2" fill="#841617">COMBINED BB+</text>
  <text x="${LIST_X + LIST_W - 14}" y="245" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#3d2a2a">Public board</text>

  ${listRows()}

  ${defenseStrip(defenseY)}
  ${offenseTeaser(offenseY)}
  ${scoutNote(scoutY)}
  ${softSellCards(softY)}

  <text x="540" y="${footerY}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/rankings</text>
  <text x="540" y="${footerY + 28}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#f0e9c4" opacity="0.9">O/D boards in The Locker Room · WAR MAP at /war-map</text>
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

const filename = "bb-plus-rankings-2026-press.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
console.log({ listPanelH, defenseY, offenseY, scoutY, softY, footerY, footerBottom: footerY + 28 });
