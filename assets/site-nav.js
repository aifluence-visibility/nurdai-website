/* NURDAI — unified site navigation (TR + EN) with Insights dropdown */
(function () {
  const INSIGHTS = {
    tr: [
      { label: 'Medya', href: '/medya' },
      { label: 'Future of AI Search', href: '/insights/future-of-ai-search' },
      { label: 'AI Search Lab', href: '/insights/ai-search-lab', soon: true },
      { label: 'Research', href: '/insights/research' },
      { divider: 'Newsletter' },
      { label: 'Future of AI Search', href: '/insights/future-of-ai-search', sub: true },
      { label: 'Substack', href: 'https://hellonurdai.substack.com', external: true }
    ],
    en: [
      { label: 'Media', href: '/en/media' },
      { label: 'Future of AI Search', href: '/en/insights/future-of-ai-search' },
      { label: 'AI Search Lab', href: '/en/insights/ai-search-lab', soon: true },
      { label: 'Research', href: '/en/insights/research' },
      { divider: 'Newsletter' },
      { label: 'Future of AI Search', href: '/en/insights/future-of-ai-search', sub: true },
      { label: 'Substack', href: 'https://hellonurdai.substack.com', external: true }
    ]
  };

  const NAV = {
    tr: {
      logoHref: '/',
      logoAria: 'Nurdai Ana Sayfa',
      langHref: '/en/',
      langLabel: 'EN',
      langAria: 'English',
      ctaHref: '/iletisim',
      ctaLabel: 'İletişime Geç',
      themeAria: 'Tema değiştir',
      menuAria: 'Menü',
      navAria: 'Ana navigasyon',
      mobCta: 'İletişime Geç',
      links: [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Yapay Zeka Görünürlüğü', href: '/yapay-zeka-gorunurlugu' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Portfolyo', href: '/portfolyo' },
        { label: 'Hakkımda', href: '/hakkimda' },
        { label: 'Blog', href: '/blog' }
      ],
      mobLinks: [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Yapay Zeka Görünürlüğü', href: '/yapay-zeka-gorunurlugu' },
        { label: 'Hizmetler', href: '/hizmetler' },
        { label: 'Portfolyo', href: '/portfolyo' },
        { label: 'Hakkımda', href: '/hakkimda' },
        { label: 'Blog', href: '/blog' },
        { label: 'Medya', href: '/medya' },
        { label: 'Future of AI Search', href: '/insights/future-of-ai-search' },
        { label: 'AI Search Lab', href: '/insights/ai-search-lab' },
        { label: 'Research', href: '/insights/research' }
      ]
    },
    en: {
      logoHref: '/en/',
      logoAria: 'Nurdai Home',
      langHref: '/',
      langLabel: 'TR',
      langAria: 'Türkçe',
      ctaHref: '/en/contact',
      ctaLabel: 'Get in Touch',
      themeAria: 'Toggle theme',
      menuAria: 'Menu',
      navAria: 'Main navigation',
      mobCta: 'Get in Touch',
      links: [
        { label: 'Home', href: '/en/' },
        { label: 'AI Visibility', href: '/en/ai-visibility' },
        { label: 'Services', href: '/en/services' },
        { label: 'Portfolio', href: '/en/portfolio' },
        { label: 'About', href: '/en/about' },
        { label: 'Blog', href: '/en/blog' }
      ],
      mobLinks: [
        { label: 'Home', href: '/en/' },
        { label: 'AI Visibility', href: '/en/ai-visibility' },
        { label: 'Services', href: '/en/services' },
        { label: 'Portfolio', href: '/en/portfolio' },
        { label: 'About', href: '/en/about' },
        { label: 'Blog', href: '/en/blog' },
        { label: 'Media', href: '/en/media' },
        { label: 'Future of AI Search', href: '/en/insights/future-of-ai-search' },
        { label: 'AI Search Lab', href: '/en/insights/ai-search-lab' },
        { label: 'Research', href: '/en/insights/research' }
      ]
    }
  };

  function navLang() {
    const lang = document.documentElement.getAttribute('lang');
    if (lang === 'en') return 'en';
    if (location.pathname.startsWith('/en')) return 'en';
    return 'tr';
  }

  function isBlogIndexPath(href) {
    const normalized = normalizePath(href);
    return normalized === '/blog' || normalized === '/en/blog';
  }

  function withBlogCategory(href) {
    const cat = new URLSearchParams(location.search).get('cat');
    if (!cat || !isBlogIndexPath(href)) return href;
    const base = href.endsWith('/') ? href : `${href}/`;
    return `${base}?cat=${encodeURIComponent(cat)}`;
  }

  function resolveLangHref(lang) {
    const path = location.pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '') || '/';
    const targetLang = lang === 'tr' ? 'en' : 'tr';
    const alt = document.querySelector(`link[rel="alternate"][hreflang="${targetLang}"]`);
    if (alt) {
      try {
        const url = new URL(alt.getAttribute('href'), location.origin);
        const altPath = url.pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
        const isGenericHome = altPath === '/' || altPath === '/en';
        if (!isGenericHome) {
          const resolved = altPath === '/' ? '/' : altPath;
          return withBlogCategory(resolved);
        }
      } catch (_) {}
    }
    if (lang === 'tr') {
      if (path.startsWith('/insights/')) return '/en' + path;
      if (path === '/medya') return '/en/media';
      if (path === '/blog' || path.startsWith('/blog/')) return withBlogCategory('/en/blog' + path.slice(5));
      return NAV.tr.langHref;
    }
    if (path.startsWith('/en/insights/')) return path.replace(/^\/en/, '') || '/';
    if (path === '/en/media') return '/medya';
    if (path === '/en/blog' || path.startsWith('/en/blog/')) return withBlogCategory('/blog' + path.slice(8));
    return NAV.en.langHref;
  }

  function normalizePath(path) {
    if (!path || path === '/') return '/';
    return path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  }

  function isActive(href) {
    const current = normalizePath(location.pathname);
    const target = normalizePath(href);
    if (target === '/') return current === '/' || current === '';
    if (current === target) return true;
    if (target.includes('/insights/') && current.startsWith(target)) return true;
    if (target === '/medya' && (current === '/medya' || current === 'medya')) return true;
    if (target === '/en/media' && (current === '/en/media' || current.startsWith('/en/media'))) return true;
    if (target === '/blog' && current.startsWith('/blog')) return true;
    if (target === '/en/blog' && current.startsWith('/en/blog')) return true;
    return false;
  }

  function insightsActive() {
    const p = location.pathname;
    return p.includes('/insights/') || p === '/medya' || p.endsWith('/medya') || p.startsWith('/en/media');
  }

  function renderInsightsMenu(lang) {
    return INSIGHTS[lang].map(item => {
      if (item.divider) {
        return `<li class="nav-drop-divider" role="presentation"><span>${item.divider}</span></li>`;
      }
      const cls = item.sub ? ' class="nav-drop-sub"' : '';
      const soon = item.soon ? ' <em class="nav-drop-soon">Soon</em>' : '';
      const ext = item.external ? ' target="_blank" rel="noopener"' : '';
      const active = !item.external && isActive(item.href) ? ' aria-current="page"' : '';
      return `<li${cls}><a href="${item.href}"${ext}${active}>${item.label}${soon}</a></li>`;
    }).join('');
  }

  function renderNav(lang) {
    const L = NAV[lang];
    const links = L.links.map(l =>
      `<li><a href="${l.href}"${isActive(l.href) ? ' class="active"' : ''}>${l.label}</a></li>`
    ).join('');
    const insightsOpen = insightsActive();
    return `<div class="con nav-in">
    <a href="${L.logoHref}" class="logo logo-img-link" aria-label="${L.logoAria}"><img src="/assets/images/nurdai-logo-nav.png" alt="Nurdai" class="logo-img" width="1024" height="798"></a>
    <ul class="nav-links" aria-label="${L.navAria}">
      ${links}
      <li class="nav-drop${insightsOpen ? ' is-open' : ''}">
        <button type="button" class="nav-drop-toggle${insightsActive() ? ' active' : ''}" aria-expanded="${insightsOpen ? 'true' : 'false'}" aria-haspopup="true">Insights</button>
        <ul class="nav-drop-menu">${renderInsightsMenu(lang)}</ul>
      </li>
    </ul>
    <div class="nav-r">
      <a href="${resolveLangHref(lang)}" class="lang-sw" aria-label="${L.langAria}">${L.langLabel}</a>
      <button class="tgl" type="button" onclick="toggleTheme()" aria-label="${L.themeAria}"><span id="theme-icon">☀️</span></button>
      <a href="${L.ctaHref}" class="nav-cta">${L.ctaLabel}</a>
      <div class="ham" onclick="toggleMenu()" aria-label="${L.menuAria}" role="button"><span></span><span></span><span></span></div>
    </div>
  </div>`;
  }

  function renderMob(lang) {
    const L = NAV[lang];
    return L.mobLinks.map(l =>
      `<a href="${l.href}" onclick="closeMenu()">${l.label}</a>`
    ).join('') + `<a href="${L.ctaHref}" onclick="closeMenu()">${L.mobCta}</a>`;
  }

  function bindDropdown() {
    document.querySelectorAll('.nav-drop-toggle').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const drop = btn.closest('.nav-drop');
        const open = drop.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-drop.is-open').forEach(d => {
        d.classList.remove('is-open');
        const btn = d.querySelector('.nav-drop-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initSiteNav() {
    const nav = document.getElementById('main-nav');
    const mob = document.getElementById('mob-menu');
    if (!nav || nav.dataset.noInject === 'true') return;
    const lang = navLang();
    nav.innerHTML = renderNav(lang);
    if (mob && mob.dataset.noInject !== 'true') mob.innerHTML = renderMob(lang);
    bindDropdown();
  }

  window.initSiteNav = initSiteNav;
  document.addEventListener('DOMContentLoaded', initSiteNav);
})();
