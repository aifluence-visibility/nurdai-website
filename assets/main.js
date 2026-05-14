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
  if (!cur || !curl) return;
  let mx = 0, my = 0, lx = 0, ly = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
  });
  (function animate() {
    lx += (mx - lx) * 0.1;
    ly += (my - ly) * 0.1;
    curl.style.transform = `translate(${lx - 14}px, ${ly - 14}px)`;
    requestAnimationFrame(animate);
  })();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .port-card, .svc-group, .media-card')) {
      cur.style.transform += ' scale(3)';
      curl.style.width = '46px'; curl.style.height = '46px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .port-card, .svc-group, .media-card')) {
      curl.style.width = '28px'; curl.style.height = '28px';
    }
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
  document.querySelectorAll('[data-cat]').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── CONTACT FORM ──
function submitForm(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('submit-btn');
  if (btn) { btn.textContent = 'Gönderildi ✓'; btn.disabled = true; }
  // TODO: Connect to Formspree or email service
  // fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(e.target) })
  alert('Mesajınız alındı! En kısa sürede dönüş yapacağım. — Nurdan / Nurdai');
}

// ── DATA LOAD (for portfolio) ──
function renderCard(p) {
  const isCaseStudy = p.mockupType === 'casestudy';
  const mockups = {
    phone: `<div class="mkp-phone"><div class="mkp-phone-frame"><div class="mkp-phone-screen"><img src="${p.image}" alt="${p.title}" loading="lazy"></div></div></div>`,
    logo:  `<div class="mkp-logo"><div class="mkp-logo-dk"><img src="${p.image}" alt="${p.title}" loading="lazy"></div><div class="mkp-logo-lt"><img src="${p.image}" alt="${p.title}" loading="lazy"></div></div>`,
    brand: `<div class="mkp-brand"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`,
    frame: `<div class="mkp-frame"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`,
    casestudy: `<div class="mkp-casestudy"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`
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
    const base = window.location.pathname.includes('/') ? '' : './';
    const res = await fetch(base + 'content/data.json');
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container || !data.portfolio) return;
    const items = limit ? data.portfolio.slice(0, limit) : data.portfolio;
    container.innerHTML = items.map(p => renderCard(p)).join('');
    // Re-trigger reveal
    document.querySelectorAll('.rv:not(.vs)').forEach(el => {
      new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vs'); } });
      }, { threshold: 0.07 }).observe(el);
    });
  } catch(e) { console.log('data.json yüklenemedi'); }
}
