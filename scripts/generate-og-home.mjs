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
const IMG_W = 520;

const VARIANTS = {
  tr: {
    out: join(root, 'assets/images/og-home.jpg'),
    badgeW: 318,
    headline: [
      { x: 64, lines: ["Markanız AI'da", 'görünür mü?'], size: 46, y: 200, dy: 54 },
    ],
    desc: [
      'ChatGPT, Perplexity ve Google AI için',
      'dijital görünürlük danışmanlığı.',
    ],
    cta: 'nurdai.com →',
    ctaW: 200,
  },
  en: {
    out: join(root, 'assets/images/og-home-en.jpg'),
    badgeW: 318,
    headline: [
      { x: 64, lines: ['Is your brand', 'visible in AI?'], size: 46, y: 200, dy: 54 },
    ],
    desc: [
      'Digital discoverability for ChatGPT,',
      'Perplexity and Google AI.',
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
  const h = v.headline[0];
  const headlineSvg = h.lines
    .map((line, i) => `<tspan x="${h.x}" dy="${i === 0 ? 0 : h.dy}">${esc(line)}</tspan>`)
    .join('\n    ');
  const descSvg = v.desc
    .map((line, i) => `<tspan x="64" dy="${i === 0 ? 0 : 32}">${esc(line)}</tspan>`)
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
    <radialGradient id="glow" cx="30%" cy="70%" r="50%">
      <stop offset="0%" stop-color="#7c5cfc" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#7c5cfc" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f0f17" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0f0f17" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="4" fill="url(#accent)"/>
  <circle cx="180" cy="520" r="220" fill="url(#glow)"/>
  <text x="64" y="72" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="3">NURD<tspan fill="#38bdf8">AI</tspan></text>
  <rect x="64" y="92" width="${v.badgeW}" height="34" rx="17" fill="rgba(124,92,252,0.18)" stroke="rgba(124,92,252,0.45)" stroke-width="1"/>
  <text x="82" y="114" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#a78bfa" letter-spacing="0.5">AI Visibility • GEO • SEO</text>
  <text x="64" y="${h.y}" font-family="Arial, Helvetica, sans-serif" font-size="${h.size}" font-weight="800" fill="#ffffff">${headlineSvg}</text>
  <text x="64" y="340" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#b8b8c8">${descSvg}</text>
  <rect x="64" y="430" width="${v.ctaW}" height="48" rx="24" fill="url(#accent)"/>
  <text x="${64 + v.ctaW / 2}" y="461" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#ffffff" text-anchor="middle">${esc(v.cta)}</text>
  <rect x="${W - IMG_W - 100}" y="0" width="100" height="${H}" fill="url(#fadeGrad)"/>
</svg>`;
}

async function renderVariant(key, v) {
  const heroBuf = readFileSync(hero);
  const heroResized = await sharp(heroBuf)
    .resize(IMG_W, H, { fit: 'cover', position: 'center' })
    .toBuffer();

  const tmp = v.out + '.tmp';
  await sharp(Buffer.from(buildSvg(v)))
    .composite([{ input: heroResized, left: W - IMG_W, top: 0 }])
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
