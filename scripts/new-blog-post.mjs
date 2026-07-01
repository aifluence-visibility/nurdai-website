#!/usr/bin/env node
/**
 * Yeni blog yazısı oluşturur.
 * Kullanım:
 *   node scripts/new-blog-post.mjs "Başlık" slug-kategorisi "AI Visibility" "2026-06-10"
 *
 * Örnek:
 *   node scripts/new-blog-post.mjs "Zero-click arama nedir?" zero-click-arama "AI Visibility"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const title = process.argv[2];
const slug = process.argv[3];
const category = process.argv[4] || 'AI Visibility';
const date = process.argv[5] || new Date().toISOString().slice(0, 10);

if (!title || !slug) {
  console.error('Kullanım: node scripts/new-blog-post.mjs "Başlık" slug [kategori] [YYYY-MM-DD]');
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug yalnızca küçük harf, rakam ve tire içermeli.');
  process.exit(1);
}

const postPath = path.join(root, 'blog', `${slug}.html`);
if (fs.existsSync(postPath)) {
  console.error(`Dosya zaten var: blog/${slug}.html`);
  process.exit(1);
}

const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const [y, m, d] = date.split('-').map(Number);
const dateLabel = `${d} ${months[m - 1]} ${y}`;

const excerpt = `Bu yazıda ${title.toLowerCase()} konusunu AI visibility ve dijital görünürlük perspektifinden ele alıyoruz.`;

const html = `<!DOCTYPE html>
<html lang="tr" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>${title} — Nurdai</title>
<meta name="description" content="${excerpt}">
<meta name="author" content="Nurdan — Nurdai">
<link rel="canonical" href="https://nurdai.com/blog/${slug}">
<link rel="alternate" hreflang="tr" href="https://nurdai.com/blog/${slug}">
<link rel="alternate" hreflang="en" href="https://nurdai.com/en/">
<meta property="og:type" content="article">
<meta property="og:title" content="${title} — Nurdai">
<meta property="og:description" content="${excerpt}">
<meta property="og:url" content="https://nurdai.com/blog/${slug}">
<meta property="og:image" content="https://nurdai.com/assets/images/og-social-tr.jpg">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Nurdai">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title} — Nurdai">
<meta name="twitter:description" content="${excerpt}">
<meta name="twitter:image" content="https://nurdai.com/assets/images/og-social-tr.jpg">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(title)},
  "description": ${JSON.stringify(excerpt)},
  "url": "https://nurdai.com/blog/${slug}",
  "datePublished": "${date}",
  "dateModified": "${date}",
  "author": { "@type": "Person", "name": "Nurdan Çetin", "url": "https://nurdai.com/hakkimda" },
  "publisher": { "@type": "Organization", "name": "Nurdai", "url": "https://nurdai.com" }
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap"></noscript>
<link rel="stylesheet" href="../assets/style.css">
<style>
  .article-content{max-width:760px;margin:0 auto}
  .article-content h2{font-size:1.3rem;font-weight:700;margin:44px 0 14px;color:var(--txt)}
  .article-content p{font-size:.93rem;color:var(--txt2);line-height:1.85;margin-bottom:16px}
  .article-meta{display:flex;align-items:center;gap:12px;font-size:.78rem;color:var(--txt3);margin-top:12px;padding-bottom:28px;border-bottom:1px solid var(--brd)}
  .article-meta .cat{background:var(--bg2);padding:3px 12px;border-radius:99px;color:var(--a1);font-weight:600;text-transform:uppercase;letter-spacing:.06em}
  .article-back{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;color:var(--txt3);text-decoration:none;margin-bottom:24px}
  .article-back:hover{color:var(--a1)}
</style>
</head>
<body>
<div class="cur" id="cur"></div>
<div class="curl" id="curl"></div>
<!-- NAV -->
<nav class="nav" id="main-nav"></nav>
<div class="mob-menu" id="mob-menu"></div>
<script src="/assets/site-nav.js"></script>
<main>
<section class="page-hero rv">
  <div class="con">
    <a href="/blog" class="article-back">← Blog'a Dön</a>
    <div class="sec-label">${category}</div>
    <h1 class="sec-title">${title}</h1>
    <div class="article-meta">
      <span class="cat">${category}</span>
      <span>${dateLabel}</span>
      <span>Nurdan Çetin — NURDAI</span>
    </div>
  </div>
</section>
<section>
  <div class="con">
    <div class="article-content rv">
      <p><strong>Özet:</strong> ${excerpt}</p>
      <h2>Giriş</h2>
      <p>Buraya yazınızın ana içeriğini ekleyin. İlk paragrafta konuyu doğrudan yanıtlayın (answer-first).</p>
      <h2>Devam</h2>
      <p>Alt başlıklar, listeler ve somut örneklerle devam edin.</p>
    </div>
  </div>
</section>
</main>
<footer role="contentinfo"><div class="con"><div class="footer-bot"><span>© 2026 Nurdai</span></div></div></footer>
<script src="../assets/main.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(postPath, html, 'utf8');

const blogJsonPath = path.join(root, 'content', 'blog.json');
const blogData = JSON.parse(fs.readFileSync(blogJsonPath, 'utf8'));
blogData.posts.unshift({
  slug,
  title,
  excerpt,
  category,
  date,
  dateLabel,
  published: false
});
fs.writeFileSync(blogJsonPath, JSON.stringify(blogData, null, 2) + '\n', 'utf8');

console.log(`✓ blog/${slug}.html oluşturuldu`);
console.log(`✓ content/blog.json güncellendi (published: false)`);
console.log('');
console.log('Sonraki adımlar:');
console.log('1. blog/' + slug + '.html içeriğini düzenle');
console.log('2. content/blog.json içinde "published": true yap');
console.log('3. sitemap.xml\'e URL ekle: https://nurdai.com/blog/' + slug);
console.log('4. git commit + push');
