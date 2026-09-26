/**
 * Generate a Boomer Ball X infographic: OU rush defense into the Georgia game.
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
 *
 * Numbers through Sept. 19, 2026.
 * OU: soonersports.com game notes (Sept. 23) and cfbstats.com rushing defense splits.
 * Georgia: georgiadogs.com game notes (Sept. 21).
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

function footballIcon(x, y, scale = 1, opacity = 0.9) {
  return `
  <g transform="translate(${x},${y}) scale(${scale})" opacity="${opacity}">
    <ellipse cx="0" cy="0" rx="16" ry="10" fill="#fdf9d8"/>
    <path d="M-9,-2.5 Q0,-6 9,-2.5 M-9,2.5 Q0,6 9,2.5" fill="none" stroke="#841617" stroke-width="1.5"/>
    <line x1="0" y1="-7" x2="0" y2="7" stroke="#841617" stroke-width="1.4"/>
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
  <circle cx="980" cy="80" r="240" fill="#fdf9d8" opacity="0.045"/>
  <circle cx="40" cy="1280" r="260" fill="#000" opacity="0.22"/>
  ${fieldHashMarks()}
  ${footballIcon(1010, 250, 1.4, 0.08)}
  ${footballIcon(70, 1180, 1.2, 0.08)}

  <text x="540" y="78" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="108" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="3.2" fill="#f0e9c4" opacity="0.9">GEORGIA WEEK · OU RUSH DEFENSE</text>
  <rect x="300" y="122" width="480" height="2" fill="url(#accent)"/>

  <text x="540" y="158" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="2.4" fill="#f0e9c4">SAT SEP 26 · 2:30 PM CT · ATHENS · ESPN</text>
  <text x="540" y="228" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="92" font-weight="900" fill="#fdf9d8">2.85</text>
  <text x="540" y="268" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.2" fill="#f0e9c4">YARDS PER RUSH ALLOWED</text>

  <rect x="330" y="286" width="420" height="36" rx="18" fill="#fdf9d8"/>
  <text x="540" y="311" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" letter-spacing="1.2" fill="#841617">24th NCAA · 5th SEC</text>

  <rect x="48" y="346" width="984" height="132" rx="20" fill="url(#panel)"/>
  <g font-family="Arial Black, Helvetica, Arial, sans-serif" fill="#1a0a0a" text-anchor="middle">
    <text x="170" y="404" font-size="36" font-weight="900">111.0</text>
    <text x="170" y="436" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6" fill="#841617">RUSH YPG ALLOWED</text>

    <text x="410" y="404" font-size="36" font-weight="900">2</text>
    <text x="410" y="436" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6" fill="#841617">RUSH TDS · BOTH ROAD</text>

    <text x="660" y="404" font-size="36" font-weight="900">9.4%</text>
    <text x="660" y="436" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6" fill="#841617">RUNS OF 10+ YDS</text>

    <text x="900" y="404" font-size="36" font-weight="900">0.53</text>
    <text x="900" y="436" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.6" fill="#841617">YPC INSIDE THE 20</text>
  </g>

  <text x="48" y="518" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2" fill="#fdf9d8">THREE-GAME RUSH DEFENSE</text>

  <rect x="48" y="534" width="312" height="148" rx="18" fill="url(#panel)"/>
  <text x="204" y="572" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1.4" fill="#841617">UTEP</text>
  <text x="204" y="622" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" fill="#1a0a0a">2.95</text>
  <text x="204" y="654" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">112 yds · 0 TD</text>

  <rect x="384" y="534" width="312" height="148" rx="18" fill="#1a0a0a"/>
  <text x="540" y="572" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1.4" fill="#f0e9c4">AT MICHIGAN</text>
  <text x="540" y="622" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" fill="#fdf9d8">3.71</text>
  <text x="540" y="654" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#f0e9c4">152 yds · 2 TD</text>

  <rect x="720" y="534" width="312" height="148" rx="18" fill="url(#panel)"/>
  <text x="876" y="572" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1.4" fill="#841617">NEW MEXICO</text>
  <text x="876" y="622" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" fill="#1a0a0a">1.8</text>
  <text x="876" y="654" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">69 yds · 0 TD</text>

  <rect x="48" y="706" width="984" height="248" rx="20" fill="url(#panel)"/>
  <text x="76" y="748" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">ADVANCED BOARD</text>
  <text x="76" y="792" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#1a0a0a">Q1 5.33 YPC, then the front locks in</text>
  <text x="76" y="828" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#3d2a2a">Q2 1.53 YPC · Q3 1.87 YPC · 4 runs of 20+ all season</text>
  <text x="76" y="868" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#3d2a2a">Rushing first downs: 15 on 117 carries (12.8%)</text>
  <text x="76" y="912" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#841617">8.7 TFL/game, best in the SEC · 4.0 sacks/game, 4th NCAA</text>

  <rect x="48" y="978" width="984" height="196" rx="20" fill="#1a0a0a" opacity="0.42"/>
  <text x="76" y="1020" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#fdf9d8">THE GEORGIA TEST</text>
  <text x="76" y="1068" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#fdf9d8">7.3 YPC · 253.3 rush YPG · 11 rush TDs</text>
  <text x="76" y="1108" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#f0e9c4">18 explosive runs of 12+ yards in three games</text>
  <text x="76" y="1146" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#f0e9c4">Frazier 5 rush TD · Stockton 62-yd · Puglisi 70-yd TD</text>

  <text x="540" y="1236" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app</text>
  <text x="540" y="1274" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#f0e9c4" opacity="0.9">Through 3 games · OU rush defense vs. No. 2 Georgia</text>
  <text x="540" y="1312" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#f0e9c4" opacity="0.75">Sources: soonersports.com · cfbstats.com · georgiadogs.com</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");
const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(64, 64).png().toBuffer(),
      top: 28,
      left: 48,
    },
  ])
  .png()
  .toBuffer();

const filename = "2026-georgia-rush-defense-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const blurb = `Oklahoma’s rush defense is the Athens question.

2.85 yards per carry allowed — 24th nationally, 5th in the SEC.
111 rush yards a game. Two rush touchdowns, both at Michigan.
Inside the 20: 0.53 yards per carry.
First quarter is the leak (5.33 YPC). Then it locks: 1.53 in the second, 1.87 in the third.
Only 12.8% of opponent rushes have moved the chains. 8.7 tackles for loss a game, best in the SEC.

No. 2 Georgia is the stress test. 7.3 yards a rush. 253 rush yards a game. 18 runs of 12-plus. 11 rushing touchdowns.

2:30 p.m. CT · ESPN · Sanford Stadium
https://boomerball.app

#BoomerSooner #Sooners #OUFootball #SEC #Georgia
`;

writeFileSync(join(publicOut, "2026-georgia-rush-defense-blurb.txt"), blurb);
writeFileSync(join(outDir, "2026-georgia-rush-defense-blurb.txt"), blurb);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
