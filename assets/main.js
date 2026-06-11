/* NURDAI — main.js */

// ── THEME ──
let isDark = true;
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('nurdai-theme', isDark ? 'dark' : 'light');
}
(function initTheme() {
  const saved = localStorage.getItem('nurdai-theme');
  if (saved === 'light') { isDark = false; document.documentElement.setAttribute('data-theme', 'light'); }
  window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  });
})();

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('sc', window.scrollY > 18);
});

// ── MOBILE MENU ──
function toggleMenu() {
  const mm = document.getElementById('mob-menu');
  if (mm) mm.classList.toggle('open');
}
function closeMenu() {
  const mm = document.getElementById('mob-menu');
  if (mm) mm.classList.remove('open');
}

// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === page || (page === 'index.html' && href === '/') || href.includes(page.replace('.html','')))) {
      a.classList.add('active');
    }
  });
})();

// ── SCROLL REVEAL ──
(function initReveal() {
  function run() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('vs'), i * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });
    document.querySelectorAll('.rv:not(.vs)').forEach(el => obs.observe(el));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

// ── CUSTOM CURSOR ──
(function initCursor() {
  const cur = document.getElementById('cur');
  const curl = document.getElementById('curl');
  if (!cur || !curl || !window.matchMedia('(pointer: fine)').matches) return;

  let mx = 0, my = 0, lx = 0, ly = 0;
  const hoverSel = 'a, button, .port-card, .svc-group, .media-card, .blog-card, .blog-cat-btn, .pf-btn, .btn-p, .btn-s';

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
  });
  (function animate() {
    lx += (mx - lx) * 0.12;
    ly += (my - ly) * 0.12;
    const size = curl.classList.contains('hover') ? 18 : 14;
    curl.style.transform = `translate(${lx - size}px, ${ly - size}px)`;
    requestAnimationFrame(animate);
  })();

  document.addEventListener('pointerover', e => {
    if (e.target.closest(hoverSel)) curl.classList.add('hover');
  });
  document.addEventListener('pointerout', e => {
    const rel = e.relatedTarget;
    if (!rel || !rel.closest(hoverSel)) curl.classList.remove('hover');
  });
})();

// ── PARALLAX ORBS ──
(function initParallax() {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.orb').forEach((orb, i) => {
      const f = (i + 1) * 0.4;
      orb.style.transform = `translate(${x * f}px, ${y * f}px)`;
    });
  });
})();

// ── PORTFOLIO FILTER ──
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.port-card[data-cat]').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── BLOG FILTER ──
const BLOG_CAT_SLUGS = {
  'AI Visibility': 'ai-visibility',
  'GEO': 'geo',
  'AI Search': 'ai-search',
  'SEO': 'seo',
  'Digital Strategy': 'digital-strategy'
};

const BLOG_CAT_LIST = [
  { slug: 'all', tr: 'Tümü', en: 'All' },
  { slug: 'ai-visibility', tr: 'AI Visibility', en: 'AI Visibility' },
  { slug: 'geo', tr: 'GEO', en: 'GEO' },
  { slug: 'ai-search', tr: 'AI Search', en: 'AI Search' },
  { slug: 'seo', tr: 'SEO', en: 'SEO' },
  { slug: 'digital-strategy', tr: 'Digital Strategy', en: 'Digital Strategy' }
];

function blogCatSlug(cat) {
  return BLOG_CAT_SLUGS[cat] || String(cat || '').toLowerCase().replace(/\s+/g, '-');
}

function blogLang() {
  return window.location.pathname.startsWith('/en') ? 'en' : 'tr';
}

function renderBlogCategories(posts, lang) {
  const nav = document.getElementById('blog-cat-nav');
  if (!nav) return;
  const counts = { all: posts.length };
  posts.forEach(p => {
    const slug = blogCatSlug(p.category);
    counts[slug] = (counts[slug] || 0) + 1;
  });
  nav.innerHTML = BLOG_CAT_LIST.map(c => {
    const n = counts[c.slug] || 0;
    const label = lang === 'en' ? c.en : c.tr;
    const active = c.slug === 'all' ? ' active' : '';
    return `<button type="button" class="blog-cat-btn${active}" data-cat="${c.slug}" onclick="filterBlog('${c.slug}', this)">
      <span class="blog-cat-label">${label}</span>
      <span class="blog-cat-count">${n}</span>
    </button>`;
  }).join('');
}

function updateBlogResults(cat, lang) {
  const cards = document.querySelectorAll('.blog-card[data-cat]');
  let visible = 0;
  cards.forEach(c => {
    const show = cat === 'all' || c.dataset.cat === cat;
    c.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const meta = document.getElementById('blog-results-meta');
  const empty = document.getElementById('blog-empty');
  if (meta) {
    if (cat === 'all') {
      meta.textContent = lang === 'en' ? `${visible} articles` : `${visible} yazı`;
    } else {
      const catLabel = BLOG_CAT_LIST.find(c => c.slug === cat);
      const name = catLabel ? (lang === 'en' ? catLabel.en : catLabel.tr) : cat;
      meta.textContent = lang === 'en'
        ? `${visible} in ${name}`
        : `${name} · ${visible} yazı`;
    }
  }
  if (empty) empty.hidden = visible > 0;
}

function filterBlog(cat, btn) {
  document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    const match = document.querySelector(`.blog-cat-btn[data-cat="${cat}"]`);
    if (match) match.classList.add('active');
  }
  const lang = blogLang();
  updateBlogResults(cat, lang);
  if (history.replaceState) {
    const url = new URL(location.href);
    if (cat === 'all') url.searchParams.delete('cat');
    else url.searchParams.set('cat', cat);
    history.replaceState(null, '', url);
  }
}

// ── CONTACT FORM ──
function submitForm(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');
  const form = document.getElementById('contact-form');

  if (btn) { btn.textContent = 'Gönderiliyor…'; btn.disabled = true; }
  if (errorMsg) errorMsg.style.display = 'none';

  const data = {
    name: form.querySelector('[name="name"]')?.value || '',
    company: form.querySelector('[name="company"]')?.value || '',
    email: form.querySelector('[name="email"]')?.value || '',
    subject: form.querySelector('[name="subject"]')?.value || '',
    message: form.querySelector('[name="message"]')?.value || '',
  };

  fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
    .then(async r => {
      if (r.ok) {
        if (form) form.reset();
        if (btn) btn.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        const body = await r.json().catch(() => ({}));
        if (btn) { btn.textContent = 'Gönder'; btn.disabled = false; }
        if (errorMsg) {
          errorMsg.textContent = body.error || 'Bir hata oluştu. Lütfen hello@nurdai.com adresine yazın.';
          errorMsg.style.display = 'block';
        }
      }
    })
    .catch(() => {
      if (btn) { btn.textContent = 'Gönder'; btn.disabled = false; }
      if (errorMsg) {
        errorMsg.textContent = 'Bağlantı hatası. Lütfen hello@nurdai.com adresine yazın.';
        errorMsg.style.display = 'block';
      }
    });
}

// ── DATA LOAD (portfolio + blog) ──
function resolveAssetUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path) || path.startsWith('/')) return path;
  return '/' + path.replace(/^\.\//, '');
}

function revealElements(root) {
  (root || document).querySelectorAll('.rv:not(.vs)').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vs'); } });
    }, { threshold: 0.07 }).observe(el);
  });
}

function renderCard(p) {
  const isCaseStudy = p.mockupType === 'casestudy';
  const img = resolveAssetUrl(p.image);
  const mockups = {
    phone: `<div class="mkp-phone"><div class="mkp-phone-frame"><div class="mkp-phone-screen"><img src="${img}" alt="${p.title}" loading="lazy"></div></div></div>`,
    logo:  `<div class="mkp-logo"><div class="mkp-logo-dk"><img src="${img}" alt="${p.title}" loading="lazy"></div><div class="mkp-logo-lt"><img src="${img}" alt="${p.title}" loading="lazy"></div></div>`,
    brand: `<div class="mkp-brand"><img src="${img}" alt="${p.title}" loading="lazy"></div>`,
    frame: `<div class="mkp-frame"><img src="${img}" alt="${p.title}" loading="lazy"></div>`,
    casestudy: `<div class="mkp-casestudy"><img src="${img}" alt="${p.title}" loading="lazy"></div>`
  };
  const visual = p.image
    ? (mockups[p.mockupType] || mockups.frame)
    : `<div class="port-ph"><div style="font-size:2rem">${p.emoji||'🖼️'}</div><div>${p.title}</div></div>`;
  const overlay = isCaseStudy ? '' : `
      <div class="port-overlay">
        <div class="port-ref">REFERANS: ${p.client || '—'}</div>
        <div class="port-title">${p.title}</div>
        <div class="port-cat">${p.categoryLabel}</div>
      </div>`;
  return `
    <div class="port-card${isCaseStudy ? ' cs-card' : ''} rv" data-cat="${p.category}" style="break-inside:avoid;margin-bottom:20px">
      ${visual}${overlay}
    </div>`;
}

async function loadPortfolio(containerId, limit) {
  try {
    const res = await fetch('/content/data.json');
    if (!res.ok) throw new Error('data.json');
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container || !data.portfolio) return;
    const items = limit ? data.portfolio.slice(0, limit) : data.portfolio;
    container.innerHTML = items.map(p => renderCard(p)).join('');
    revealElements(container);
  } catch (e) { console.warn('Portfolio yüklenemedi', e); }
}

async function loadBlog(containerId, lang) {
  lang = lang || blogLang();
  try {
    const res = await fetch('/content/blog.json');
    if (!res.ok) throw new Error('blog.json');
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container || !data.posts) return;
    const readLabel = lang === 'en' ? 'Read article →' : 'Yazıyı Oku →';
    const posts = data.posts
      .filter(p => p.published !== false)
      .map(p => {
        const loc = p[lang] || p.tr || {};
        return { ...p, title: loc.title || p.title, excerpt: loc.excerpt || p.excerpt, dateLabel: p.dateLabel || p.date };
      })
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    if (!posts.length) {
      container.innerHTML = `<p class="blog-empty-inline">${lang === 'en' ? 'No posts yet.' : 'Henüz yayınlanmış yazı yok.'}</p>`;
      return;
    }
    renderBlogCategories(posts, lang);
    const prefix = lang === 'en' ? '/en/blog/' : '/blog/';
    container.innerHTML = posts.map((p, i) => {
      const slug = blogCatSlug(p.category);
      const featured = i === 0 ? ' featured' : '';
      return `
      <a href="${prefix}${p.slug}" class="blog-card rv cat-${slug}${featured}" data-cat="${slug}">
        <div class="blog-card-top">
          <span class="blog-card-cat">${p.category || 'Blog'}</span>
          <time datetime="${p.date || ''}">${p.dateLabel || ''}</time>
        </div>
        <h2>${p.title}</h2>
        <p>${p.excerpt || ''}</p>
        <span class="blog-read">${readLabel}</span>
      </a>`;
    }).join('');
    revealElements(container);
    const initialCat = new URLSearchParams(location.search).get('cat') || 'all';
    filterBlog(initialCat, null);
  } catch (e) { console.warn('Blog yüklenemedi', e); }
}
