/**
 * Two Boomer Ball Locker Room defense infographics for X (smaller, poster-style).
 * 1) Advanced metrics — SP+, pressure, havoc, stops
 * 2) 2026 WAR MAP units — DL / LB / DB grades + identity
 * Output: 1080×1080 PNG (1:1 — clean multi-image X posts)
 */
import sharp from "sharp";
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = "/opt/cursor/artifacts";
const publicOut = join(root, "public/social");
mkdirSync(outDir, { recursive: true });
mkdirSync(publicOut, { recursive: true });

const S = 1080;
const logoPath = join(root, "public/logo/boomer-ball-icon.png");
const logoBuf = await sharp(logoPath).resize(64, 64).png().toBuffer();

/** Shared defs: field chalk + slash energy — not Mateer cream panels */
function defs(ids) {
  return `
  <defs>
    <linearGradient id="${ids.bg}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6e1012"/>
      <stop offset="35%" stop-color="#a01a1c"/>
      <stop offset="70%" stop-color="#4a0c0e"/>
      <stop offset="100%" stop-color="#120303"/>
    </linearGradient>
    <linearGradient id="${ids.slash}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f7e27a"/>
      <stop offset="100%" stop-color="#fdf9d8"/>
    </linearGradient>
    <linearGradient id="${ids.ink}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0d0404"/>
      <stop offset="100%" stop-color="#1f0808"/>
    </linearGradient>
    <pattern id="${ids.hash}" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)">
      <line x1="0" y1="0" x2="0" y2="48" stroke="#fdf9d8" stroke-width="1.5" opacity="0.07"/>
    </pattern>
    <pattern id="${ids.chev}" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M0 14 L14 0 L28 14 L14 28 Z" fill="#f7e27a" opacity="0.06"/>
    </pattern>
  </defs>`;
}

async function render(svg, filename) {
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  const out = await sharp(base)
    .composite([{ input: logoBuf, top: 28, left: 36 }])
    .png()
    .toBuffer();
  const artifactPath = join(outDir, filename);
  const publicPath = join(publicOut, filename);
  await sharp(out).toFile(artifactPath);
  await sharp(out).toFile(publicPath);
  console.log(`Wrote ${artifactPath}`);
  return artifactPath;
}

/* ─────────────────────────────────────────────
   1/2 — ADVANCED METRICS (the wall of numbers)
   ───────────────────────────────────────────── */
const svgMetrics = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  ${defs({ bg: "bg1", slash: "sl1", ink: "ink1", hash: "h1", chev: "c1" })}

  <rect width="${S}" height="${S}" fill="url(#bg1)"/>
  <rect width="${S}" height="${S}" fill="url(#h1)"/>

  <!-- Hard geometric cuts -->
  <polygon points="0,0 420,0 280,1080 0,1080" fill="#0a0202" opacity="0.45"/>
  <polygon points="780,0 1080,0 1080,1080 640,1080" fill="#f7e27a" opacity="0.08"/>
  <polygon points="0,820 1080,620 1080,1080 0,1080" fill="url(#ink1)"/>

  <!-- Hazard slash accent -->
  <polygon points="0,190 1080,70 1080,118 0,238" fill="url(#sl1)" opacity="0.92"/>
  <polygon points="0,248 1080,128 1080,142 0,262" fill="#0a0202" opacity="0.55"/>

  <!-- Brand -->
  <text x="540" y="58" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="7" fill="#fdf9d8">BOOMER BALL</text>
  <text x="540" y="88" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="5" fill="#f7e27a">THE LOCKER ROOM · 1/2</text>

  <!-- Title locked into slash -->
  <text x="56" y="175" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="42" font-weight="900" letter-spacing="2" fill="#1a0505">THE NUMBERS</text>
  <text x="56" y="320" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="72" font-weight="900" fill="#fdf9d8">DEFENSE</text>
  <text x="56" y="372" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="3" fill="#f7e27a">2025 FOUNDATION → 2026 EDGE</text>

  <!-- Giant hero stat -->
  <text x="56" y="520" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="148" font-weight="900" fill="#fdf9d8">+11</text>
  <text x="56" y="565" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="4" fill="#f7e27a">SP+ DEFENSE · SEC TOP 6</text>

  <!-- Side stack of vivid metrics -->
  <g font-family="Arial Black, Helvetica, Arial, sans-serif" fill="#fdf9d8" text-anchor="end">
    <text x="1024" y="420" font-size="56" font-weight="900">28.0%</text>
    <text x="1024" y="448" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#f7e27a">PRESSURE · #3 SEC</text>

    <text x="1024" y="530" font-size="56" font-weight="900">18.4%</text>
    <text x="1024" y="558" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#f7e27a">HAVOC · #5 SEC</text>

    <text x="1024" y="640" font-size="56" font-weight="900">72%</text>
    <text x="1024" y="668" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#f7e27a">3RD DOWN STOPS · #2</text>
  </g>

  <!-- Bottom ink band stats -->
  <g fill="#fdf9d8" font-family="Arial Black, Helvetica, Arial, sans-serif" text-anchor="middle">
    <text x="180" y="920" font-size="54" font-weight="900">15.5</text>
    <text x="180" y="952" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#f7e27a">PPG ALLOWED</text>

    <text x="420" y="920" font-size="54" font-weight="900">45</text>
    <text x="420" y="952" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#f7e27a">SACKS</text>

    <text x="640" y="920" font-size="54" font-weight="900">41.9%</text>
    <text x="640" y="952" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#f7e27a">RZ TD% ALLOWED</text>

    <text x="900" y="920" font-size="54" font-weight="900">#4</text>
    <text x="900" y="952" font-family="Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2" fill="#f7e27a">SEC RED ZONE</text>
  </g>

  <text x="540" y="1025" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#fdf9d8" opacity="0.75">boomerball.app/locker-room · fan estimates, not official SP+/PFF</text>
</svg>`;

/* ─────────────────────────────────────────────
   2/2 — WAR MAP UNITS (grades + identity)
   ───────────────────────────────────────────── */
const svgUnits = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  ${defs({ bg: "bg2", slash: "sl2", ink: "ink2", hash: "h2", chev: "c2" })}

  <!-- Hot crimson field + hash chalk -->
  <rect width="${S}" height="${S}" fill="url(#bg2)"/>
  <rect width="${S}" height="${S}" fill="url(#h2)"/>
  <polygon points="720,0 1080,0 1080,1080 480,1080" fill="#0a0202" opacity="0.35"/>

  <!-- Cream / gold header blade -->
  <polygon points="0,0 1080,0 1080,168 0,248" fill="#fdf9d8"/>
  <polygon points="0,248 1080,168 1080,188 0,268" fill="#f7e27a"/>

  <text x="540" y="52" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="7" fill="#841617">BOOMER BALL</text>
  <text x="540" y="82" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="5" fill="#5c1011">THE LOCKER ROOM · 2/2</text>
  <text x="56" y="165" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="40" font-weight="900" letter-spacing="2" fill="#1a0505">THE UNITS</text>

  <text x="56" y="320" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" fill="#fdf9d8">2026 WAR MAP</text>
  <text x="56" y="360" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3" fill="#f7e27a">DEFENSE A− · 86 OVERALL</text>

  <!-- Oversized composite grade watermark -->
  <text x="1020" y="420" text-anchor="end" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="140" font-weight="900" fill="#fdf9d8" opacity="0.08">A−</text>

  <!-- Staggered grade columns (height = strength) — clear of identity band -->
  <!-- DL 88 — tallest -->
  <polygon points="48,390 330,370 330,760 48,760" fill="#fdf9d8"/>
  <polygon points="48,390 330,370 330,390 48,410" fill="#f7e27a"/>
  <text x="189" y="450" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="6" fill="#841617">DL</text>
  <text x="189" y="555" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="112" font-weight="900" fill="#1a0505">88</text>
  <text x="189" y="598" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="30" font-weight="900" fill="#841617">A−</text>
  <text x="189" y="655" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">STONE</text>
  <text x="189" y="682" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">WEIN</text>
  <text x="189" y="709" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">ADEBAWORE</text>
  <text x="189" y="742" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#841617">Wrecking ball</text>

  <!-- DB 87 — mid -->
  <polygon points="375,420 657,400 657,760 375,760" fill="#0a0202"/>
  <polygon points="375,420 657,400 657,420 375,440" fill="#f7e27a"/>
  <text x="516" y="480" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="6" fill="#f7e27a">DB</text>
  <text x="516" y="575" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="112" font-weight="900" fill="#fdf9d8">87</text>
  <text x="516" y="618" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="30" font-weight="900" fill="#f7e27a">A−</text>
  <text x="516" y="675" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#fdf9d8">BOWENS</text>
  <text x="516" y="702" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#fdf9d8">GUILLORY</text>
  <text x="516" y="729" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#fdf9d8">JOHNSON</text>
  <text x="516" y="748" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#f7e27a">Lockdown</text>

  <!-- LB 84 — shortest -->
  <polygon points="702,455 1032,430 1032,760 702,760" fill="#fdf9d8"/>
  <polygon points="702,455 1032,430 1032,450 702,475" fill="#841617"/>
  <text x="867" y="510" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="6" fill="#841617">LB</text>
  <text x="867" y="600" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="100" font-weight="900" fill="#1a0505">84</text>
  <text x="867" y="642" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="30" font-weight="900" fill="#841617">B</text>
  <text x="867" y="695" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">LEWIS</text>
  <text x="867" y="722" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">HEINECKE</text>
  <text x="867" y="749" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="800" fill="#1a0505">SULLIVAN</text>

  <!-- Identity slash — below columns -->
  <polygon points="0,790 1080,770 1080,910 0,930" fill="#f7e27a"/>
  <text x="56" y="850" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="30" font-weight="900" fill="#1a0505">IDENTITY: DL HAVOC</text>
  <text x="56" y="888" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="700" fill="#3d1515">Sim pressures · Cheetah hybrid · Front-seven depth · Venables Yr 5</text>

  <text x="540" y="1000" text-anchor="middle" font-family="Arial Black, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" letter-spacing="1" fill="#fdf9d8">boomerball.app/locker-room</text>
  <text x="540" y="1035" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#f7e27a">Unlock The Locker Room · $24.99 season</text>
</svg>`;

// Remove the old combined 4:5 graphic
const oldCombined = "sooners-defense-locker-room-infographic.png";
for (const dir of [publicOut, outDir]) {
  const p = join(dir, oldCombined);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log(`Removed ${p}`);
  }
}

await render(svgMetrics, "sooners-defense-numbers-infographic.png");
await render(svgUnits, "sooners-defense-units-infographic.png");

const post = `OU’s defense is the strength of the 2026 roster — two Locker Room cards:

1/2 THE NUMBERS
SP+ Defense +11 · Pressure 28% · Havoc 18.4% · 72% third-down stops

2/2 THE UNITS
WAR MAP grades the D an A− (86) — DL 88 · DB 87 · LB 84

Stone. Lewis. The Bowens. Venables Year 5 is built to create chaos.

Full advanced breakdown → boomerball.app/locker-room

#Sooners #BoomerSoomer #OUFootball`;

const postThread = `THREAD — Sooners defense strengths (Locker Room advance stats)

1/2 THE NUMBERS
Coming off 15.5 PPG allowed and 45 sacks, OU’s D grades out as an SP+ +11 unit (SEC Top 6) with 28% pressure, 18.4% havoc, and 72% third-down stops.

boomerball.app/locker-room

———

2/2 THE UNITS
2026 WAR MAP: Defense A− (86).
DL 88 · LB 84 · DB 87

Identity = DL havoc — Stone, Wein, Adebawore up front; Lewis at the heartbeat; Bowen brothers + Guillory in the back end.

Unlock The Locker Room → boomerball.app/locker-room · $24.99 season`;

writeFileSync(join(outDir, "sooners-defense-infographic-x-post.txt"), post);
writeFileSync(join(outDir, "sooners-defense-infographic-x-thread.txt"), postThread);
console.log("Wrote X post + thread copy");
