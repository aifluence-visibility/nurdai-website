#!/usr/bin/env node
/**
 * Generate 1200×630 OG images for nurdai.com (TR + EN).
 * Run: npm run generate-og
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const hero = join(root, 'assets/images/og-hero-bg.jpg');

const W = 1200;
const H = 630;
const TEXT_W = 640;
const IMG_W = W - TEXT_W;

const VARIANTS = {
  tr: {
    out: join(root, 'assets/images/og-home.jpg'),
    badgeW: 318,
    headline: { lines: ["Markanız AI'da", 'görünür mü?'], size: 40, y: 168, dy: 48 },
    desc: [
      'AI sistemleri markanızı tanımıyorsa,',
      'görünmüyorsunuz demektir.',
      'Yeni nesil dijital görünürlük altyapısı — NURDAI.',
    ],
    cta: 'nurdai.com →',
    ctaW: 200,
  },
  en: {
    out: join(root, 'assets/images/og-home-en.jpg'),
    badgeW: 318,
    headline: { lines: ['Is your brand', 'visible in AI?'], size: 40, y: 168, dy: 48 },
    desc: [
      "If AI systems don't know your brand,",
      "you're invisible.",
      'Digital discoverability for the generative AI era — NURDAI.',
    ],
    cta: 'nurdai.com →',
    ctaW: 200,
  },
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSvg(v) {
  const h = v.headline;
  const headlineSvg = h.lines
    .map((line, i) => `<tspan x="56" dy="${i === 0 ? 0 : h.dy}">${esc(line)}</tspan>`)
    .join('\n    ');
  const descSvg = v.desc
    .map((line, i) => `<tspan x="56" dy="${i === 0 ? 0 : 26}">${esc(line)}</tspan>`)
    .join('\n    ');

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f17"/>
      <stop offset="100%" stop-color="#141428"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7c5cfc"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>
    <radialGradient id="glow" cx="25%" cy="75%" r="45%">
      <stop offset="0%" stop-color="#7c5cfc" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#7c5cfc" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f0f17" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0f0f17" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="4" fill="url(#accent)"/>
  <circle cx="160" cy="540" r="200" fill="url(#glow)"/>

  <!-- Text panel background -->
  <rect x="0" y="0" width="${TEXT_W + 24}" height="${H}" fill="url(#bg)"/>

  <!-- Logo -->
  <text x="56" y="64" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" fill="#ffffff" letter-spacing="3">NURD<tspan fill="#38bdf8">AI</tspan></text>

  <!-- Badge -->
  <rect x="56" y="82" width="${v.badgeW}" height="32" rx="16" fill="rgba(124,92,252,0.18)" stroke="rgba(124,92,252,0.45)" stroke-width="1"/>
  <text x="72" y="103" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#a78bfa" letter-spacing="0.5">AI Visibility • GEO • SEO</text>

  <!-- Headline -->
  <text x="56" y="${h.y}" font-family="Arial, Helvetica, sans-serif" font-size="${h.size}" font-weight="800" fill="#ffffff">${headlineSvg}</text>

  <!-- OG description -->
  <text x="56" y="280" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#b0b0c0" font-weight="400">${descSvg}</text>

  <!-- CTA -->
  <rect x="56" y="520" width="${v.ctaW}" height="46" rx="23" fill="url(#accent)"/>
  <text x="${56 + v.ctaW / 2}" y="550" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(v.cta)}</text>

  <!-- Fade into image panel -->
  <rect x="${TEXT_W - 60}" y="0" width="84" height="${H}" fill="url(#fadeGrad)"/>

  <!-- Image panel subtle bg -->
  <rect x="${TEXT_W}" y="0" width="${IMG_W}" height="${H}" fill="#0a0a12"/>
</svg>`;
}

async function renderVariant(key, v) {
  const heroBuf = readFileSync(hero);
  // contain = full logo visible, no crop
  const heroResized = await sharp(heroBuf)
    .resize(IMG_W - 48, H - 48, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 18, alpha: 1 },
    })
    .toBuffer();

  const heroMeta = await sharp(heroResized).metadata();
  const left = TEXT_W + Math.round((IMG_W - heroMeta.width) / 2);
  const top = Math.round((H - heroMeta.height) / 2);

  const tmp = v.out + '.tmp';
  await sharp(Buffer.from(buildSvg(v)))
    .composite([{ input: heroResized, left, top }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(tmp);

  const { renameSync } = await import('fs');
  renameSync(tmp, v.out);
  const meta = await sharp(v.out).metadata();
  console.log(`✓ ${key}: ${meta.width}×${meta.height} → ${v.out.split('/').pop()}`);
}

async function main() {
  for (const [key, v] of Object.entries(VARIANTS)) {
    await renderVariant(key, v);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
