/* NURDAI — Research hub loader */
async function loadResearchHub(lang) {
  lang = lang || (document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr');
  const labels = {
    tr: {
      recent: 'Araştırmalar',
      readMore: 'Oku →',
      empty: 'Yeni araştırmalar yakında.'
    },
    en: {
      recent: 'Research reports',
      readMore: 'Read →',
      empty: 'New research reports coming soon.'
    }
  };
  const L = labels[lang];

  try {
    const res = await fetch('/content/insights.json');
    if (!res.ok) throw new Error('insights.json');
    const data = await res.json();
    const articles = (data.researchArticles || [])
      .filter(a => a.published !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    const list = document.getElementById('research-articles');
    if (list) {
      if (!articles.length) {
        list.innerHTML = `<p class="insights-empty">${L.empty}</p>`;
      } else {
        list.innerHTML = articles.map((a, i) => {
          const title = a.title[lang] || a.title.en;
          const excerpt = a.excerpt[lang] || a.excerpt.en;
          const url = a.url[lang] || a.url.en;
          const date = new Date(a.date).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          return `
          <article class="insights-article-card rv">
            <div class="insights-article-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="insights-article-body">
              <time datetime="${a.date}">${date}</time>
              <h3><a href="${url}">${title}</a></h3>
              <p>${excerpt}</p>
              <a href="${url}" class="insights-read-link">${L.readMore}</a>
            </div>
          </article>`;
        }).join('');
      }
    }

    if (typeof revealElements === 'function' && list) revealElements(list);
  } catch (e) {
    console.warn('Research hub load failed', e);
  }
}

window.loadResearchHub = loadResearchHub;

(function autoInitResearch() {
  if (document.getElementById('research-articles')) {
    const lang = document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr';
    loadResearchHub(lang);
  }
})();
