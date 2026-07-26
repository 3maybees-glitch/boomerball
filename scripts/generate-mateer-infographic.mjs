/**
 * Generate a Boomer Ball Locker Room infographic for John Mateer (X/Twitter).
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

  <!-- Top brand bar -->
  <text x="540" y="78" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="800" letter-spacing="6" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="112" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="4" fill="#f0e9c4" opacity="0.85">THE LOCKER ROOM</text>
  <rect x="340" y="128" width="400" height="2" fill="url(#accent)"/>

  <!-- Jersey number watermark -->
  <text x="540" y="430" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="320" font-weight="900" fill="#fdf9d8" opacity="0.06">10</text>

  <!-- Player identity -->
  <text x="540" y="210" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="5" fill="#f0e9c4">QB · #10 · OKLAHOMA</text>
  <text x="540" y="290" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="78" font-weight="900" fill="#fdf9d8">JOHN</text>
  <text x="540" y="365" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="78" font-weight="900" fill="#fdf9d8">MATEER</text>
  <text x="540" y="410" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#f0e9c4" opacity="0.9">6'1" · 218 lbs · RS Senior · WSU transfer</text>

  <!-- Stats panel -->
  <rect x="56" y="450" width="968" height="280" rx="20" fill="url(#panel)"/>
  <text x="88" y="495" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="2" fill="#841617">2025 SEASON</text>
  <text x="992" y="495" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#3d2a2a">10–3 Sooners · SEC</text>

  <!-- Pass stats row -->
  <g font-family="Arial Black, Helvetica, Arial, sans-serif" fill="#1a0a0a" text-anchor="middle">
    <text x="175" y="575" font-size="42" font-weight="900">2,885</text>
    <text x="175" y="605" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">PASS YDS</text>

    <text x="360" y="575" font-size="42" font-weight="900">14</text>
    <text x="360" y="605" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">PASS TD</text>

    <text x="520" y="575" font-size="42" font-weight="900">62.2%</text>
    <text x="520" y="605" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">COMP%</text>

    <text x="700" y="575" font-size="42" font-weight="900">129.4</text>
    <text x="700" y="605" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">RATING</text>

    <text x="880" y="575" font-size="42" font-weight="900">8</text>
    <text x="880" y="605" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#841617">RUSH TD</text>
  </g>

  <rect x="88" y="635" width="904" height="1" fill="#841617" opacity="0.15"/>

  <g font-family="Helvetica, Arial, sans-serif" fill="#3d2a2a" font-size="17" font-weight="600">
    <text x="88" y="680">247–397 · 11 INT · 431 rush yds · 51-yd long</text>
    <text x="88" y="708" fill="#841617" font-weight="700">Dual-threat engine of Ben Arbuckle’s offense</text>
  </g>

  <!-- Grades + comps row -->
  <rect x="56" y="760" width="300" height="280" rx="20" fill="url(#panel)"/>
  <rect x="390" y="760" width="634" height="280" rx="20" fill="url(#panel)"/>

  <!-- Grade card -->
  <text x="206" y="805" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">PFF-STYLE GRADE</text>
  <circle cx="206" cy="910" r="72" fill="none" stroke="#841617" stroke-width="10" opacity="0.15"/>
  <circle cx="206" cy="910" r="72" fill="none" stroke="#841617" stroke-width="10" stroke-dasharray="340 452" stroke-linecap="round" transform="rotate(-90 206 910)"/>
  <text x="206" y="925" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="#1a0a0a">77</text>
  <text x="206" y="1010" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">From rating · YPA · TD/INT</text>

  <!-- NFL Comp Machine -->
  <text x="422" y="805" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#841617">NFL COMP MACHINE</text>
  <text x="422" y="835" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#3d2a2a">Closest NFL twins · Locker Room scouting</text>

  <!-- Comp 1 -->
  <text x="422" y="890" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#1a0a0a">C.J. Stroud</text>
  <text x="780" y="890" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#841617">91.7</text>
  <text x="980" y="890" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d2a2a">A · Strong</text>
  <rect x="422" y="905" width="558" height="8" rx="4" fill="#841617" opacity="0.12"/>
  <rect x="422" y="905" width="512" height="8" rx="4" fill="#841617"/>

  <!-- Comp 2 -->
  <text x="422" y="955" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" fill="#1a0a0a">Jalen Hurts</text>
  <text x="780" y="955" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" fill="#841617">86.9</text>
  <text x="980" y="955" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#3d2a2a">A · Strong</text>
  <rect x="422" y="968" width="558" height="7" rx="3.5" fill="#841617" opacity="0.12"/>
  <rect x="422" y="968" width="485" height="7" rx="3.5" fill="#841617"/>

  <!-- Comp 3 -->
  <text x="422" y="1015" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" fill="#1a0a0a">Jayden Daniels</text>
  <text x="780" y="1015" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="24" font-weight="900" fill="#841617">86.7</text>
  <text x="980" y="1015" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="700" fill="#3d2a2a">A · Strong</text>
  <rect x="422" y="1028" width="558" height="7" rx="3.5" fill="#841617" opacity="0.12"/>
  <rect x="422" y="1028" width="483" height="7" rx="3.5" fill="#841617"/>

  <!-- Scout note -->
  <rect x="56" y="1070" width="968" height="120" rx="20" fill="#1a0a0a" opacity="0.35"/>
  <text x="88" y="1115" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="2" fill="#fdf9d8">SCOUTING NOTE</text>
  <text x="88" y="1155" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#fdf9d8">Heisman-caliber dual-threat. Fearless runner with a live arm</text>
  <text x="88" y="1185" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#fdf9d8">and elite competitive toughness — early-round NFL profile.</text>

  <!-- Footer CTA -->
  <text x="540" y="1265" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="26" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/nfl-comps</text>
  <text x="540" y="1300" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#f0e9c4" opacity="0.9">Unlock The Locker Room · $9.99 lifetime</text>
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

const filename = "john-mateer-locker-room-infographic.png";
const artifactPath = join(outDir, filename);
const publicPath = join(publicOut, filename);

await sharp(withLogo).toFile(artifactPath);
await sharp(withLogo).toFile(publicPath);

console.log(`Wrote ${artifactPath}`);
console.log(`Wrote ${publicPath}`);
