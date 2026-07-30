/**
 * Generate a Boomer Ball Locker Room infographic for Sooners defense strengths (X/Twitter).
 * Stats from Locker Room advanced metrics + 2026 WAR MAP unit grades.
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

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a0a0b"/>
      <stop offset="40%" stop-color="#841617"/>
      <stop offset="100%" stop-color="#1a0505"/>
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
    <linearGradient id="meter" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#841617"/>
      <stop offset="100%" stop-color="#b81f21"/>
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
  <circle cx="960" cy="160" r="240" fill="#fdf9d8" opacity="0.035"/>
  <circle cx="100" cy="1220" r="300" fill="#000" opacity="0.2"/>

  <!-- Top brand bar -->
  <text x="540" y="78" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="112" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="4" fill="#f0e9c4" opacity="0.85">THE LOCKER ROOM</text>
  <rect x="340" y="128" width="400" height="2" fill="url(#accent)"/>

  <!-- Watermark -->
  <text x="540" y="390" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="220" font-weight="900" fill="#fdf9d8" opacity="0.055">D</text>

  <!-- Hero identity -->
  <text x="540" y="180" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="5" fill="#f0e9c4">VENABLES · YEAR 5 · 2026 PREVIEW</text>
  <text x="540" y="250" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="64" font-weight="900" fill="#fdf9d8">SOONERS</text>
  <text x="540" y="318" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="64" font-weight="900" fill="#fdf9d8">DEFENSE</text>
  <text x="540" y="358" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="500" fill="#f0e9c4" opacity="0.92">Built on DL havoc · Secondary star power · Third-down stops</text>

  <!-- Box-score foundation strip -->
  <rect x="56" y="385" width="968" height="118" rx="18" fill="#1a0a0a" opacity="0.38"/>
  <g font-family="Arial Black, Helvetica, Arial, sans-serif" fill="#fdf9d8" text-anchor="middle">
    <text x="200" y="445" font-size="44" font-weight="900">15.5</text>
    <text x="200" y="475" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#f0e9c4">PPG ALLOWED · 2025</text>

    <text x="430" y="445" font-size="44" font-weight="900">45</text>
    <text x="430" y="475" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#f0e9c4">SACKS</text>

    <text x="640" y="445" font-size="44" font-weight="900">9</text>
    <text x="640" y="475" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#f0e9c4">INTS</text>

    <text x="870" y="445" font-size="44" font-weight="900">10–3</text>
    <text x="870" y="475" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="#f0e9c4">CFP SEASON</text>
  </g>

  <!-- Advanced metrics panel -->
  <rect x="56" y="525" width="968" height="340" rx="20" fill="url(#panel)"/>
  <text x="88" y="570" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="2" fill="#841617">LOCKER ROOM ADVANCED</text>
  <text x="992" y="570" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">Fan estimates · not official SP+/PFF</text>

  <!-- Metric grid: 2 rows × 3 -->
  <g text-anchor="middle">
    <!-- SP+ Defense -->
    <text x="216" y="640" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">+11</text>
    <text x="216" y="670" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">SP+ DEFENSE</text>
    <text x="216" y="694" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">SEC Top 6</text>

    <!-- Pressure -->
    <text x="540" y="640" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">28.0%</text>
    <text x="540" y="670" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">PRESSURE RATE</text>
    <text x="540" y="694" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">#3 SEC</text>

    <!-- Havoc -->
    <text x="864" y="640" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">18.4%</text>
    <text x="864" y="670" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">HAVOC RATE</text>
    <text x="864" y="694" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">#5 SEC</text>

    <!-- 3rd down -->
    <text x="216" y="780" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">72.0%</text>
    <text x="216" y="810" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">3RD DOWN STOPS</text>
    <text x="216" y="834" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">#2 SEC</text>

    <!-- Red zone -->
    <text x="540" y="780" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">41.9%</text>
    <text x="540" y="810" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">RZ TD% ALLOWED</text>
    <text x="540" y="834" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">#4 SEC · lower better</text>

    <!-- WAR MAP grade -->
    <text x="864" y="780" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="48" font-weight="900" fill="#1a0a0a">A−</text>
    <text x="864" y="810" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#841617">2026 WAR MAP</text>
    <text x="864" y="834" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#3d2a2a">Defense 86/100</text>
  </g>

  <!-- Unit grades + identity -->
  <rect x="56" y="888" width="600" height="232" rx="20" fill="url(#panel)"/>
  <rect x="680" y="888" width="344" height="232" rx="20" fill="url(#panel)"/>

  <text x="88" y="930" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">2026 UNIT GRADES</text>

  <!-- DL -->
  <text x="88" y="975" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#1a0a0a">DL</text>
  <text x="150" y="975" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d2a2a">Stone · Wein · Adebawore</text>
  <text x="620" y="975" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#841617">88</text>
  <rect x="88" y="988" width="532" height="8" rx="4" fill="#841617" opacity="0.12"/>
  <rect x="88" y="988" width="468" height="8" rx="4" fill="url(#meter)"/>

  <!-- LB -->
  <text x="88" y="1035" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#1a0a0a">LB</text>
  <text x="150" y="1035" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d2a2a">Lewis · Heinecke · Sullivan</text>
  <text x="620" y="1035" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#841617">84</text>
  <rect x="88" y="1048" width="532" height="8" rx="4" fill="#841617" opacity="0.12"/>
  <rect x="88" y="1048" width="447" height="8" rx="4" fill="url(#meter)"/>

  <!-- DB -->
  <text x="88" y="1095" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#1a0a0a">DB</text>
  <text x="150" y="1095" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d2a2a">Bowens · Guillory · Johnson</text>
  <text x="620" y="1095" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#841617">87</text>
  <rect x="88" y="1108" width="532" height="8" rx="4" fill="#841617" opacity="0.12"/>
  <rect x="88" y="1108" width="463" height="8" rx="4" fill="url(#meter)"/>

  <!-- Identity callout -->
  <text x="852" y="930" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">IDENTITY</text>
  <text x="852" y="985" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" fill="#1a0a0a">DL HAVOC</text>
  <text x="852" y="1030" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#3d2a2a">Sim pressures</text>
  <text x="852" y="1058" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#3d2a2a">Cheetah hybrid</text>
  <text x="852" y="1086" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#3d2a2a">Front-seven depth</text>

  <!-- Footer CTA -->
  <text x="540" y="1175" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="17" font-weight="600" fill="#f0e9c4" opacity="0.9">Coming into 2026 as the Sooners’ clearest strength</text>
  <text x="540" y="1265" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/locker-room</text>
  <text x="540" y="1300" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#f0e9c4" opacity="0.9">Unlock The Locker Room · $24.99 season access</text>
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

const filename = "sooners-defense-locker-room-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

const post = `Oklahoma’s defense is the strength heading into 2026 — and The Locker Room numbers back it up.

From the 2025 foundation into Venables Year 5:

• SP+ Defense: +11 (SEC Top 6)
• Pressure Rate: 28.0% (#3 SEC)
• Havoc Rate: 18.4% (#5 SEC)
• 3rd Down Stop Rate: 72.0% (#2 SEC)
• Red Zone TD% Allowed: 41.9% (#4 SEC)

Plus the 2026 WAR MAP grades it an A− (86) — DL 88, DB 87, LB 84.

Stone wrecking the interior. Lewis as the heartbeat. The Bowen brothers locking down the back end.

Full advanced breakdown in The Locker Room → boomerball.app/locker-room

#Sooners #BoomerSoomer #OUFootball`;

const postPath = join(outDir, "sooners-defense-infographic-x-post.txt");
writeFileSync(postPath, post);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
console.log(`Wrote ${postPath}`);
