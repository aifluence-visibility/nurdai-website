/* NURDAI — blog HTML generator (admin publish) */
(function (global) {
  const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i')
      .replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }

  function formatDateLabel(date, lang) {
    if (!date) return '';
    const [y, m, d] = date.split('-').map(Number);
    const months = lang === 'en' ? MONTHS_EN : MONTHS_TR;
    return `${d} ${months[m - 1]} ${y}`;
  }

  function bodyToHtml(body) {
    if (!body || !body.trim()) return '<p>İçerik yakında eklenecek.</p>';
    const lines = body.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let buf = [];
    function flushP() {
      if (!buf.length) return;
      html += `<p>${esc(buf.join(' '))}</p>\n`;
      buf = [];
    }
    lines.forEach(line => {
      const t = line.trim();
      if (!t) { flushP(); return; }
      if (t.startsWith('### ')) { flushP(); html += `<h3>${esc(t.slice(4))}</h3>\n`; return; }
      if (t.startsWith('## ')) { flushP(); html += `<h2>${esc(t.slice(3))}</h2>\n`; return; }
      if (t.startsWith('- ')) { flushP(); html += `<ul><li>${esc(t.slice(2))}</li></ul>\n`; return; }
      buf.push(t);
    });
    flushP();
    return html;
  }

  function buildBlogArticleHtml(post, lang) {
    const isEn = lang === 'en';
    const ogImage = isEn
      ? 'https://nurdai.com/assets/images/og-social-en.jpg'
      : 'https://nurdai.com/assets/images/og-social-tr.jpg';
    const ogImageAlt = isEn
      ? 'Nurdai — AI Visibility & Digital Discoverability'
      : 'Nurdai — AI Visibility & Dijital Görünürlük Danışmanlığı';
    const loc = post[lang] || post.tr || {};
    const other = isEn ? 'tr' : 'en';
    const slug = post.slug;
    const title = loc.title || post.tr?.title || 'Blog';
    const excerpt = loc.excerpt || '';
    const body = bodyToHtml(loc.body || '');
    const category = post.category || 'AI Visibility';
    const date = post.date || new Date().toISOString().slice(0, 10);
    const dateLabel = post.dateLabel || formatDateLabel(date, lang);
    const base = isEn ? 'https://nurdai.com/en/blog/' : 'https://nurdai.com/blog/';
    const canon = base + slug;
    const altCanon = (isEn ? 'https://nurdai.com/blog/' : 'https://nurdai.com/en/blog/') + slug;
    const assetPrefix = isEn ? '../../' : '../';
    const blogHome = isEn ? '/en/blog' : '/blog';
    const contact = isEn ? '/en/contact' : '/iletisim';
    const ctaTitle = isEn ? "Let's talk about your brand's visibility" : 'Markanızın görünürlüğünü konuşalım';
    const ctaText = isEn ? 'Get in touch for AI visibility and digital strategy.' : 'AI görünürlüğü ve dijital strateji için iletişime geçin.';
    const ctaBtn = isEn ? 'Get in Touch' : 'İletişime Geç';
    const backLabel = isEn ? '← Back to Blog' : '← Blog\'a Dön';
    const htmlLang = isEn ? 'en' : 'tr';
    const ogLocale = isEn ? 'en_US' : 'tr_TR';

    return `<!DOCTYPE html>
<html lang="${htmlLang}" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>${esc(title)} — Nurdai</title>
<meta name="description" content="${esc(excerpt)}">
<meta name="author" content="Nurdan — Nurdai">
<link rel="canonical" href="${canon}">
<link rel="alternate" hreflang="${isEn ? 'en' : 'tr'}" href="${canon}">
<link rel="alternate" hreflang="${isEn ? 'tr' : 'en'}" href="${altCanon}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)} — Nurdai">
<meta property="og:description" content="${esc(excerpt)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ogImageAlt)}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:site_name" content="Nurdai">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)} — Nurdai">
<meta name="twitter:description" content="${esc(excerpt)}">
<meta name="twitter:image" content="${ogImage}">
<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: excerpt,
      url: canon,
      datePublished: date,
      dateModified: date,
      inLanguage: isEn ? 'en-US' : 'tr-TR',
      author: { '@type': 'Person', name: 'Nurdan Çetin', url: 'https://nurdai.com/hakkimda' },
      publisher: { '@type': 'Organization', name: 'Nurdai', url: 'https://nurdai.com' }
    })}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap"></noscript>
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<div class="cur" id="cur"></div>
<div class="curl" id="curl"></div>
<!-- NAV -->
<nav class="nav" id="main-nav"></nav>
<div class="mob-menu" id="mob-menu"></div>
<script src="/assets/site-nav.js"></script>
<main>
<section class="blog-article-hero rv">
  <div class="con">
    <a href="${blogHome}" class="blog-back">${backLabel}</a>
    <div class="blog-card-cat">${esc(category)}</div>
    <h1 class="blog-article-title">${esc(title)}</h1>
    <div class="blog-article-meta">
      <time datetime="${date}">${esc(dateLabel)}</time>
      <span>Nurdan Çetin — NURDAI</span>
    </div>
  </div>
</section>
<section class="blog-article-body">
  <div class="con">
    <article class="article-content rv">${body}
      <div class="article-cta">
        <h3>${esc(ctaTitle)}</h3>
        <p>${esc(ctaText)}</p>
        <a href="${contact}" class="btn-p">${ctaBtn}</a>
      </div>
    </article>
  </div>
</section>
</main>
<footer role="contentinfo"></footer>
<script src="/assets/site-footer.js" defer></script>
<script src="/assets/main.js" defer></script>
</body>
</html>`;
  }

  global.BlogGenerator = { slugify, formatDateLabel, bodyToHtml, buildBlogArticleHtml };
})(typeof window !== 'undefined' ? window : globalThis);
