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
const TEXT_W = 600;
const IMG_W = W - TEXT_W;

const VARIANTS = {
  tr: {
    out: join(root, 'assets/images/og-social-tr.jpg'),
    badgeW: 318,
    headline: {
      lines: ['AI Visibility &', 'Dijital Görünürlük'],
      size: 52,
      y: 158,
      dy: 58,
    },
    desc: [
      'AI sistemleri markanızı tanımıyorsa,',
      'görünmüyorsunuz demektir.',
    ],
    cta: 'Siteyi Ziyaret Et →',
    ctaW: 248,
  },
  en: {
    out: join(root, 'assets/images/og-social-en.jpg'),
    badgeW: 318,
    headline: {
      lines: ['AI Visibility &', 'Digital Visibility'],
      size: 50,
      y: 158,
      dy: 56,
    },
    desc: [
      "If AI systems don't know your brand,",
      "you're invisible.",
    ],
    cta: 'Visit Website →',
    ctaW: 248,
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
    .map((line, i) => `<tspan x="52" dy="${i === 0 ? 0 : h.dy}">${esc(line)}</tspan>`)
    .join('\n    ');
  const descSvg = v.desc
    .map((line, i) => `<tspan x="52" dy="${i === 0 ? 0 : 28}">${esc(line)}</tspan>`)
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
    <filter id="ctaShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#7c5cfc" flood-opacity="0.45"/>
    </filter>
    <radialGradient id="glow" cx="20%" cy="80%" r="50%">
      <stop offset="0%" stop-color="#7c5cfc" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#7c5cfc" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Right: hero image composited underneath -->
  <rect x="${TEXT_W}" y="0" width="${IMG_W}" height="${H}" fill="#0a0a14"/>

  <!-- Left panel (hard edge — no overlay on hero) -->
  <rect width="${TEXT_W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="5" fill="url(#accent)"/>
  <circle cx="140" cy="560" r="210" fill="url(#glow)"/>

  <!-- Brand -->
  <text x="52" y="58" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="4">NURD<tspan fill="#38bdf8">AI</tspan></text>

  <rect x="52" y="74" width="${v.badgeW}" height="32" rx="16" fill="rgba(124,92,252,0.2)" stroke="rgba(124,92,252,0.5)" stroke-width="1"/>
  <text x="68" y="95" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#c4b5fd" letter-spacing="0.6">AI Visibility • GEO • SEO</text>

  <!-- HEADLINE — large, high-contrast for OG scanners -->
  <text x="52" y="${h.y}" font-family="Arial, Helvetica, sans-serif" font-size="${h.size}" font-weight="800" fill="#ffffff">${headlineSvg}</text>

  <!-- Description -->
  <text x="52" y="310" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#b8b8c8">${descSvg}</text>

  <!-- CTA — prominent button for OG scanners -->
  <g filter="url(#ctaShadow)">
    <rect x="52" y="520" width="${v.ctaW}" height="54" rx="27" fill="url(#accent)"/>
    <rect x="52" y="520" width="${v.ctaW}" height="54" rx="27" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
  </g>
  <text x="${52 + v.ctaW / 2}" y="553" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">${esc(v.cta)}</text>
</svg>`;
}

async function renderVariant(key, v) {
  const heroBuf = readFileSync(hero);
  // Center crop — logo sits in the middle of the source art
  const heroResized = await sharp(heroBuf)
    .resize(IMG_W, H, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const tmp = v.out + '.tmp';
  await sharp(Buffer.from(buildSvg(v)))
    .composite([{ input: heroResized, left: TEXT_W, top: 0 }])
    .jpeg({ quality: 93, mozjpeg: true })
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
