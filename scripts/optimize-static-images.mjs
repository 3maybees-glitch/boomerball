/**
 * Pre-compress public raster assets to WebP so pages can serve them with
 * next/image `unoptimized` (avoids Vercel Image Optimization usage).
 *
 * Usage: node scripts/optimize-static-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

async function convert(file, { maxWidth, quality }) {
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const meta = await sharp(file).metadata();
  let pipeline = sharp(file).rotate();
  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  await pipeline.webp({ quality, effort: 5 }).toFile(out);
  const before = fs.statSync(file).size;
  const after = fs.statSync(out).size;
  console.log(
    `${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${path.relative(root, out)}`,
  );
}

function list(dir, re) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((name) => re.test(name))
    .map((name) => path.join(abs, name));
}

const jobs = [
  ...list("public/backgrounds", /\.(jpe?g)$/i).map((file) => ({
    file,
    maxWidth: 1920,
    quality: 72,
  })),
  ...list("public/legend-games", /\.png$/i).map((file) => ({
    file,
    maxWidth: 1200,
    quality: 78,
  })),
  ...list("public/legends", /\.png$/i).map((file) => ({
    file,
    maxWidth: 400,
    quality: 80,
  })),
  ...list("public/podcasts", /\.(jpe?g)$/i).map((file) => ({
    file,
    maxWidth: 160,
    quality: 80,
  })),
];

for (const job of jobs) {
  await convert(job.file, job);
}

console.log(`Optimized ${jobs.length} images.`);
