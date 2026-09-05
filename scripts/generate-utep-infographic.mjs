/**
 * Generate a Boomer Ball Week 1 UTEP recap infographic for X/Twitter.
 * Output: 1080×1350 PNG (4:5 — ideal for X feed posts)
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
  ${footballIcon(70, 980, 1.2, 0.08)}

  <text x="540" y="72" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="102" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="3.5" fill="#f0e9c4" opacity="0.9">MONDAY MORNING QUARTERBACK</text>
  <rect x="340" y="116" width="400" height="2" fill="url(#accent)"/>

  <text x="540" y="160" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="4" fill="#f0e9c4">WEEK 1 · 2026 · NORMAN</text>
  <text x="540" y="230" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="54" font-weight="900" fill="#fdf9d8">SOONERS 51</text>
  <text x="540" y="286" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="36" font-weight="900" fill="#f0e9c4">UTEP 0</text>

  <rect x="390" y="308" width="300" height="40" rx="20" fill="#fdf9d8"/>
  <text x="540" y="336" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="2" fill="#841617">SHUTOUT OPENER</text>

  <rect x="48" y="380" width="984" height="150" rx="20" fill="url(#panel)"/>
  <g font-family="Arial Black, Helvetica, Arial, sans-serif" fill="#1a0a0a" text-anchor="middle">
    <text x="180" y="448" font-size="42" font-weight="900">401</text>
    <text x="180" y="480" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">OU YARDS</text>

    <text x="400" y="448" font-size="42" font-weight="900">198</text>
    <text x="400" y="480" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">UTEP YARDS</text>

    <text x="640" y="448" font-size="42" font-weight="900">8</text>
    <text x="640" y="480" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">1ST 8 DRIVES</text>

    <text x="880" y="448" font-size="42" font-weight="900">0</text>
    <text x="880" y="480" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">PTS ALLOWED</text>
  </g>
  <text x="540" y="516" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">Scored on the first eight possessions</text>

  <rect x="48" y="554" width="480" height="250" rx="20" fill="url(#panel)"/>
  <text x="76" y="598" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">JOHN MATEER</text>
  <text x="76" y="626" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">QB · #10 · pulled late 3rd</text>
  <text x="76" y="688" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" fill="#1a0a0a">11–17</text>
  <text x="76" y="730" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="#841617">225 YDS · 3 TD · 0 INT</text>
  <text x="76" y="770" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#3d2a2a">13.2 YPA · 234.1 NCAA rating</text>

  <rect x="552" y="554" width="480" height="250" rx="20" fill="url(#panel)"/>
  <text x="580" y="598" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">ISAIAH SATEGNA III</text>
  <text x="580" y="626" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">WR · #5 · 215 all-purpose</text>
  <text x="580" y="688" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" fill="#1a0a0a">88</text>
  <text x="580" y="730" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="#841617">PUNT RETURN TD</text>
  <text x="580" y="770" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#3d2a2a">Plus 34-yd TD catch from Mateer</text>

  <rect x="48" y="828" width="984" height="196" rx="20" fill="#1a0a0a" opacity="0.38"/>
  <text x="80" y="872" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#fdf9d8">SCORING STRIKES</text>
  <text x="80" y="916" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#fdf9d8">Beers 40-yd TD  ·  Sategna 34-yd TD  ·  Harris 48-yd TD</text>
  <text x="80" y="954" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#fdf9d8">Avant 1-yd  ·  Newbauer 3-yd  ·  3 field goals</text>
  <text x="80" y="992" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#f0e9c4">Bowen forced fumble · Wein recovery · 170 rush yards</text>

  <rect x="48" y="1048" width="984" height="120" rx="20" fill="url(#panel)"/>
  <text x="80" y="1094" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">ADVANCED SNAPSHOT</text>
  <text x="80" y="1138" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="700" fill="#1a0a0a">EPA/Play +0.36  ·  Success 56%  ·  ~7.0 YPP  ·  QB 9.1</text>

  <text x="540" y="1234" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/mmqb</text>
  <text x="540" y="1272" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#f0e9c4" opacity="0.9">Next: No. 16 Michigan · Sat, Sep 12 · 11 a.m. CT</text>
  <text x="540" y="1310" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#f0e9c4" opacity="0.75">Fan analytics estimates · Sources: soonersports.com</text>
</svg>`;

const logoPath = join(root, "public/logo/boomer-ball-icon.png");

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const withLogo = await sharp(base)
  .composite([
    {
      input: await sharp(logoPath).resize(64, 64).png().toBuffer(),
      top: 24,
      left: 48,
    },
  ])
  .png()
  .toBuffer();

const filename = "2026-week-1-utep-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const blurb = `No. 10 Oklahoma opened 2026 with a 51-0 shutout of UTEP.

Scored on the first eight possessions.
401 yards to 198.
Mateer: 11-17, 225 yds, 3 TD, 0 INT.
Sategna: 88-yd punt return TD + 34-yd catch. 215 all-purpose.

Monday Morning Quarterback is live — box score, QB watch, and advanced EPA/success numbers → https://boomerball.app/mmqb

#BoomerSooner #Sooners #OUFootball #SEC
`;

writeFileSync(join(publicOut, "2026-week-1-utep-blurb.txt"), blurb);
writeFileSync(join(outDir, "2026-week-1-utep-blurb.txt"), blurb);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
