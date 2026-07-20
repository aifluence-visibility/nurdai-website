(function initAiContentIdeasSeries() {
  const main = document.querySelector('main[data-series="ai-content-ideas"]');
  if (!main) return;

  const slug = main.dataset.slug;
  const lang = window.location.pathname.startsWith('/en') ? 'en' : 'tr';
  const prefix = lang === 'en' ? '/en' : '';

  function articleHref(s) {
    return `${prefix}/blog/${s}`;
  }

  async function run() {
    try {
      const res = await fetch('/content/ai-content-ideas-series.json');
      if (!res.ok) return;
      const data = await res.json();
      const articles = data.articles || [];
      const idx = articles.findIndex(a => a.slug === slug);
      if (idx === -1) return;

      const labels = {
        continue: data.continueReading[lang],
        prev: data.prev[lang],
        next: data.next[lang],
        sidebar: data.sidebarTitle[lang]
      };

      const continueEl = document.getElementById('continue-reading');
      if (continueEl) {
        const picks = [];
        for (let n = 1; n <= 4 && n < articles.length; n += 1) {
          picks.push(articles[(idx + n) % articles.length]);
        }
        continueEl.innerHTML = `
          <h2 class="continue-reading-title" id="continue-reading-title">${labels.continue}</h2>
          <ul class="continue-reading-list">
            ${picks.map(a => `<li><a href="${articleHref(a.slug)}">${a[lang].title}</a></li>`).join('')}
          </ul>`;
      }

      const navEl = document.getElementById('series-nav');
      if (navEl) {
        const prev = idx > 0 ? articles[idx - 1] : null;
        const next = idx < articles.length - 1 ? articles[idx + 1] : null;
        navEl.innerHTML = `
          ${prev ? `<a href="${articleHref(prev.slug)}"><span class="nav-label">${labels.prev}</span><span class="nav-title">${prev[lang].title}</span></a>` : '<span class="nav-empty"></span>'}
          ${next ? `<a href="${articleHref(next.slug)}"><span class="nav-label">${labels.next}</span><span class="nav-title">${next[lang].title}</span></a>` : '<span class="nav-empty"></span>'}`;
      }

      const sidebarEl = document.getElementById('series-sidebar');
      if (sidebarEl) {
        sidebarEl.innerHTML = `
          <div class="series-sidebar-title">${labels.sidebar}</div>
          <ul class="series-sidebar-list">
            ${articles.map(a => {
              const current = a.slug === slug ? ' is-current' : '';
              const aria = a.slug === slug ? ' aria-current="page"' : '';
              return `<li><a href="${articleHref(a.slug)}" class="${current.trim()}"${aria}>${a[lang].title}</a></li>`;
            }).join('')}
          </ul>`;
      }
    } catch (e) {
      console.warn('AI Content Ideas series unavailable', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
