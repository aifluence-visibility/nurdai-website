#!/usr/bin/env node
/**
 * Generate TR + EN service pages from content/services.json
 * Usage: node scripts/build-service-pages.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const data = JSON.parse(readFileSync(join(root, 'content/services.json'), 'utf8'));

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function bodyToParagraphs(text) {
  return text.split('\n\n').filter(Boolean).map(p => `<p>${esc(p.trim())}</p>`).join('\n        ');
}

function buildPage(svc, lang) {
  const isEn = lang === 'en';
  const loc = svc[lang];
  const slug = svc.slug;
  const baseUrl = isEn ? `https://nurdai.com/en/${slug}` : `https://nurdai.com/${slug}`;
  const altUrl = isEn ? `https://nurdai.com/${slug}` : `https://nurdai.com/en/${slug}`;
  const asset = isEn ? '../assets' : 'assets';
  const ogImage = isEn
    ? 'https://nurdai.com/assets/images/og-social-en.jpg'
    : 'https://nurdai.com/assets/images/og-social-tr.jpg';
  const ogLocale = isEn ? 'en_US' : 'tr_TR';

  const nav = isEn ? `
      <li><a href="/en/">Home</a></li>
      <li><a href="/en/ai-visibility">AI Visibility</a></li>
      <li><a href="/en/services" class="active">Services</a></li>
      <li><a href="/en/portfolio">Portfolio</a></li>
      <li><a href="/en/about">About</a></li>
      <li><a href="/en/media">Media</a></li>
      <li><a href="/en/blog">Blog</a></li>` : `
      <li><a href="/">Ana Sayfa</a></li>
      <li><a href="yapay-zeka-gorunurlugu">Yapay Zeka Görünürlüğü</a></li>
      <li><a href="hizmetler" class="active">Hizmetler</a></li>
      <li><a href="portfolyo">Portfolyo</a></li>
      <li><a href="hakkimda">Hakkımda</a></li>
      <li><a href="medya">Medya</a></li>
      <li><a href="/blog">Blog</a></li>`;

  const mobNav = isEn ? `
  <a href="/en/" onclick="closeMenu()">Home</a>
  <a href="/en/ai-visibility" onclick="closeMenu()">AI Visibility</a>
  <a href="/en/services" onclick="closeMenu()">Services</a>
  <a href="/en/portfolio" onclick="closeMenu()">Portfolio</a>
  <a href="/en/about" onclick="closeMenu()">About</a>
  <a href="/en/media" onclick="closeMenu()">Media</a>
  <a href="/en/blog" onclick="closeMenu()">Blog</a>
  <a href="/en/contact" onclick="closeMenu()">Get in Touch</a>` : `
  <a href="/" onclick="closeMenu()">Ana Sayfa</a>
  <a href="yapay-zeka-gorunurlugu" onclick="closeMenu()">Yapay Zeka Görünürlüğü</a>
  <a href="hizmetler" onclick="closeMenu()">Hizmetler</a>
  <a href="portfolyo" onclick="closeMenu()">Portfolyo</a>
  <a href="hakkimda" onclick="closeMenu()">Hakkımda</a>
  <a href="medya" onclick="closeMenu()">Medya</a>
  <a href="/blog" onclick="closeMenu()">Blog</a>
  <a href="iletisim" onclick="closeMenu()">İletişime Geç</a>`;

  const langSw = isEn ? `<a href="/${slug}" class="lang-sw" aria-label="Türkçe">TR</a>` : `<a href="/en/${slug}" class="lang-sw" aria-label="English">EN</a>`;
  const contact = isEn ? '/en/contact' : 'iletisim';
  const contactLabel = isEn ? 'Get in Touch' : 'İletişime Geç';
  const servicesOverview = isEn ? '/en/services' : 'hizmetler';
  const backLabel = isEn ? '← All Services' : '← Tüm Hizmetler';
  const ctaTitle = isEn ? 'Ready to get started?' : 'Başlamaya hazır mısınız?';
  const ctaText = isEn ? "Let's discuss how this service fits your brand's visibility goals." : 'Bu hizmetin markanızın görünürlük hedeflerine nasıl uyduğunu konuşalım.';
  const ctaBtn = contactLabel;
  const featuresTitle = isEn ? "What's included" : 'Neler dahil';
  const home = isEn ? '/en/' : '/';
  const logoAria = isEn ? 'Nurdai Home' : 'Nurdai Ana Sayfa';

  const features = loc.features.map(f => `<div class="svc-feature">→ ${esc(f)}</div>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="${lang}" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<title>${esc(loc.metaTitle)}</title>
<meta name="description" content="${esc(loc.metaDesc)}">
<meta name="author" content="Nurdan — Nurdai">
<link rel="canonical" href="${baseUrl}">
<link rel="alternate" hreflang="tr" href="https://nurdai.com/${slug}">
<link rel="alternate" hreflang="en" href="https://nurdai.com/en/${slug}">
<link rel="alternate" hreflang="x-default" href="https://nurdai.com/">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(loc.title)} | Nurdai">
<meta property="og:description" content="${esc(loc.metaDesc)}">
<meta property="og:url" content="${baseUrl}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:site_name" content="Nurdai">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(loc.title)} | Nurdai">
<meta name="twitter:description" content="${esc(loc.metaDesc)}">
<meta name="twitter:image" content="${ogImage}">
<script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "${esc(loc.title)}",
  "description": "${esc(loc.metaDesc)}",
  "url": "${baseUrl}",
  "provider": { "@type": "Organization", "name": "Nurdai", "url": "https://nurdai.com" },
  "areaServed": "Worldwide",
  "serviceType": "${esc(loc.heroLabel)}"
}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<div class="cur" id="cur"></div>
<div class="curl" id="curl"></div>
<nav class="nav" id="main-nav">
  <div class="con nav-in">
    <a href="${home}" class="logo" aria-label="${logoAria}">NURD<span>AI</span></a>
    <ul class="nav-links" role="navigation">${nav}
    </ul>
    <div class="nav-r">
      ${langSw}
      <button class="tgl" onclick="toggleTheme()" aria-label="${isEn ? 'Toggle theme' : 'Tema değiştir'}"><span id="theme-icon">☀️</span></button>
      <a href="${contact}" class="nav-cta">${contactLabel}</a>
      <div class="ham" onclick="toggleMenu()" aria-label="${isEn ? 'Menu' : 'Menü'}" role="button"><span></span><span></span><span></span></div>
    </div>
  </div>
</nav>
<div class="mob-menu" id="mob-menu">${mobNav}
</div>
<main>
<section class="page-hero center rv">
  <div class="con">
    <div class="sec-label">${esc(loc.heroLabel)}</div>
    <h1 class="sec-title">${esc(loc.heroTitle)}</h1>
    <p class="sec-text">${esc(loc.heroText)}</p>
    <p style="margin-top:20px"><a href="${servicesOverview}" style="color:var(--a1);font-size:.85rem;text-decoration:none;font-weight:600">${backLabel}</a></p>
  </div>
</section>
<section>
  <div class="con" style="max-width:720px">
    <p class="sec-text rv" style="text-align:left;margin:0 0 24px">${esc(loc.intro)}</p>
    <div class="rv" style="color:var(--txt2);line-height:1.85;font-size:.92rem;font-weight:300">
        ${bodyToParagraphs(loc.body)}
    </div>
  </div>
</section>
<section style="background:var(--bg2);padding:64px 0">
  <div class="con">
    <div class="sec-label rv">${featuresTitle}</div>
    <div class="svc-detail rv" style="max-width:640px;margin-top:24px">
      <div class="svc-num">${svc.num}</div>
      <h3>${esc(loc.title)}</h3>
      <div class="svc-features" style="margin-top:16px">
          ${features}
      </div>
    </div>
  </div>
</section>
<section class="cta-sec">
  <div class="cta-bg" aria-hidden="true"></div>
  <div class="con rv">
    <h2 class="sec-title">${ctaTitle}</h2>
    <p>${ctaText}</p>
    <a href="${contact}" class="btn-p">${ctaBtn}</a>
  </div>
</section>
</main>
<footer role="contentinfo"></footer>
<script src="/assets/site-footer.js"></script>
<script src="/assets/main.js"></script>
</body>
</html>`;
}

let count = 0;
for (const svc of data.services) {
  const trPath = join(root, `${svc.slug}.html`);
  const enPath = join(root, 'en', `${svc.slug}.html`);
  writeFileSync(trPath, buildPage(svc, 'tr'));
  writeFileSync(enPath, buildPage(svc, 'en'));
  count += 2;
  console.log(`✓ ${svc.slug} (TR + EN)`);
}
console.log(`\nGenerated ${count} service pages.`);
