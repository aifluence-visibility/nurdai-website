#!/usr/bin/env node
/**
 * Generate 1200×630 OG image for nurdai.com (Facebook/LinkedIn/X optimal size).
 * Run: node scripts/generate-og-home.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const out = join(root, 'assets/images/og-home.jpg');
const hero = join(root, 'assets/images/og-hero-bg.jpg');

const W = 1200;
const H = 630;
const IMG_W = 520;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f17"/>
      <stop offset="100%" stop-color="#141428"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c5cfc"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="70%" r="50%">
      <stop offset="0%" stop-color="#7c5cfc" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#7c5cfc" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="fade">
      <rect x="${W - IMG_W - 40}" y="0" width="${IMG_W + 40}" height="${H}"/>
    </clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="4" fill="url(#accent)"/>
  <circle cx="180" cy="520" r="220" fill="url(#glow)"/>

  <!-- Logo -->
  <text x="64" y="72" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="3">NURD<tspan fill="#38bdf8">AI</tspan></text>

  <!-- Badge -->
  <rect x="64" y="92" width="318" height="34" rx="17" fill="rgba(124,92,252,0.18)" stroke="rgba(124,92,252,0.45)" stroke-width="1"/>
  <text x="82" y="114" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#a78bfa" letter-spacing="0.5">AI Visibility • GEO • SEO</text>

  <!-- Headline -->
  <text x="64" y="200" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="#ffffff">
    <tspan x="64" dy="0">Markanız AI'da</tspan>
    <tspan x="64" dy="54">görünür mü?</tspan>
  </text>

  <!-- Description -->
  <text x="64" y="340" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#b8b8c8" font-weight="400">
    <tspan x="64" dy="0">ChatGPT, Perplexity ve Google AI için</tspan>
    <tspan x="64" dy="32">dijital görünürlük danışmanlığı.</tspan>
  </text>

  <!-- CTA -->
  <rect x="64" y="430" width="200" height="48" rx="24" fill="url(#accent)"/>
  <text x="164" y="461" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle">nurdai.com →</text>

  <!-- Divider fade into image -->
  <rect x="${W - IMG_W - 80}" y="0" width="80" height="${H}" fill="url(#bg)" opacity="0"/>
  <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#0f0f17" stop-opacity="1"/>
    <stop offset="100%" stop-color="#0f0f17" stop-opacity="0"/>
  </linearGradient>
  <rect x="${W - IMG_W - 100}" y="0" width="100" height="${H}" fill="url(#fadeGrad)"/>
</svg>`;

async function main() {
  const heroBuf = readFileSync(hero);
  const heroResized = await sharp(heroBuf)
    .resize(IMG_W, H, { fit: 'cover', position: 'center' })
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: heroResized, left: W - IMG_W, top: 0 }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(out + '.tmp');

  const { renameSync } = await import('fs');
  renameSync(out + '.tmp', out);
  const meta = await sharp(out).metadata();
  console.log(`✓ og-home.jpg → ${meta.width}×${meta.height}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
