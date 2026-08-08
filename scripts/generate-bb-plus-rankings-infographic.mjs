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
  { rank: 1, school: "Ohio State", rating: "+21.9", conf: "Big Ten" },
  { rank: 2, school: "Georgia", rating: "+18.6", conf: "SEC" },
  { rank: 3, school: "Texas", rating: "+17.9", conf: "SEC" },
  { rank: 4, school: "Oregon", rating: "+15.5", conf: "Big Ten" },
  { rank: 5, school: "Penn State", rating: "+15.4", conf: "Big Ten" },
  { rank: 6, school: "Ole Miss", rating: "+13.5", conf: "SEC" },
  { rank: 7, school: "Alabama", rating: "+12.4", conf: "SEC" },
  { rank: 8, school: "Notre Dame", rating: "+12.2", conf: "IND" },
  { rank: 9, school: "Michigan", rating: "+11.2", conf: "Big Ten" },
  { rank: 10, school: "Miami", rating: "+10.4", conf: "ACC" },
  { rank: 11, school: "Oklahoma", rating: "+9.0", conf: "SEC", highlight: true },
  { rank: 12, school: "Texas A&M", rating: "+8.3", conf: "SEC" },
];

const ROW_H = 42;
const LIST_TOP = 448;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rankBadge(rank, x, y, highlight) {
  const fill = rank <= 4 || highlight ? "#841617" : "#1a0a0a";
  const opacity = rank <= 4 || highlight ? 1 : 0.12;
  const textFill = rank <= 4 || highlight ? "#fdf9d8" : "#1a0a0a";
  return `
  <circle cx="${x}" cy="${y}" r="15" fill="${fill}" opacity="${opacity}"/>
  <text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="14" font-weight="900" fill="${textFill}">${rank}</text>`;
}

function listRows() {
  return combined
    .map((t, i) => {
      const y = LIST_TOP + i * ROW_H;
      const midY = y + 28;
      const rowBg =
        t.highlight
          ? `<rect x="72" y="${y + 4}" width="936" height="${ROW_H - 4}" rx="10" fill="#841617" opacity="0.1"/>`
          : i % 2 === 0
            ? `<rect x="72" y="${y + 4}" width="936" height="${ROW_H - 4}" rx="10" fill="#841617" opacity="0.04"/>`
            : "";
      const schoolFill = t.highlight ? "#841617" : "#1a0a0a";
      const schoolWeight = t.highlight ? "900" : "800";
      return `
  ${rowBg}
  ${rankBadge(t.rank, 100, midY, t.highlight)}
  <text x="130" y="${midY + 5}" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="${schoolWeight}" fill="${schoolFill}">${escapeXml(t.school)}${t.highlight ? "  ·  SOONERS" : ""}</text>
  <text x="780" y="${midY + 5}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#3d2a2a" opacity="0.75">${escapeXml(t.conf)}</text>
  <text x="980" y="${midY + 5}" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="900" fill="#841617">${escapeXml(t.rating)}</text>`;
    })
    .join("\n");
}

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

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <circle cx="980" cy="120" r="220" fill="#fdf9d8" opacity="0.04"/>
  <circle cx="80" cy="1180" r="280" fill="#000" opacity="0.18"/>

  <!-- Watermark -->
  <text x="540" y="720" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="280" font-weight="900" fill="#fdf9d8" opacity="0.05">BB+</text>

  <!-- Top brand bar -->
  <text x="540" y="78" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="112" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="4" fill="#f0e9c4" opacity="0.85">BB+ RANKINGS · 2026 PRESS</text>
  <rect x="300" y="128" width="480" height="2" fill="url(#accent)"/>

  <!-- Headline -->
  <text x="540" y="178" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="42" font-weight="900" fill="#fdf9d8">COMBINED TOP 12</text>
  <text x="540" y="208" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#f0e9c4" opacity="0.9">48% offense · 52% defense · Updated Aug 4, 2026</text>

  <!-- Oklahoma spotlight -->
  <rect x="56" y="230" width="968" height="150" rx="20" fill="url(#panel)"/>
  <text x="88" y="268" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">OKLAHOMA SOONERS</text>
  <text x="992" y="268" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" fill="#3d2a2a">Venables Yr 5 · SEC</text>

  <g font-family="Arial Black, Helvetica, Arial, sans-serif" text-anchor="middle" fill="#1a0a0a">
    <text x="220" y="330" font-size="48" font-weight="900">#11</text>
    <text x="220" y="358" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">COMBINED  +9.0</text>

    <text x="540" y="330" font-size="48" font-weight="900" fill="#841617">#4</text>
    <text x="540" y="358" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">DEFENSE  +12.5</text>

    <text x="860" y="330" font-size="48" font-weight="900">#12</text>
    <text x="860" y="358" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">OFFENSE  +5.2</text>
  </g>

  <!-- Combined board panel -->
  <rect x="56" y="400" width="968" height="560" rx="20" fill="url(#panel)"/>
  <text x="88" y="438" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="2" fill="#841617">COMBINED BB+</text>
  <text x="992" y="438" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">Public board</text>

  ${listRows()}

  <!-- Soft-sell band -->
  <rect x="56" y="982" width="968" height="200" rx="20" fill="#1a0a0a" opacity="0.38"/>

  <text x="88" y="1024" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2" fill="#fdf9d8">THE LOCKER ROOM</text>
  <text x="88" y="1054" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#fdf9d8">Full Offense &amp; Defense BB+ boards — unit metrics,</text>
  <text x="88" y="1082" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#fdf9d8">EPA, havoc, pressure &amp; more · $24.99 season access</text>

  <rect x="88" y="1105" width="904" height="1" fill="#fdf9d8" opacity="0.18"/>

  <text x="88" y="1138" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2" fill="#fdf9d8">2026 WAR MAP</text>
  <text x="88" y="1168" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="500" fill="#fdf9d8">$1 Sooner season sheet — depth charts, unit grades,</text>
  <text x="88" y="1194" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="500" fill="#fdf9d8">projected scores &amp; bowl call. Included with Locker Room.</text>

  <!-- Footer -->
  <text x="540" y="1260" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/rankings</text>
  <text x="540" y="1295" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#f0e9c4" opacity="0.9">O/D boards in The Locker Room · WAR MAP at /war-map</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(72, 72).png().toBuffer(),
      top: 36,
      left: 56,
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
