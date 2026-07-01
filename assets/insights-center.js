/* NURDAI — Insights / Future of AI Search loader */
async function loadFutureOfAiSearch(lang) {
  lang = lang || (document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr');
  const labels = {
    tr: {
      recent: 'Son yazılar',
      readMore: 'Oku →',
      linkedin: "LinkedIn'de Abone Ol",
      empty: 'Yeni baskılar yakında.'
    },
    en: {
      recent: 'Recent editions',
      readMore: 'Read →',
      linkedin: 'Subscribe on LinkedIn',
      empty: 'New editions coming soon.'
    }
  };
  const L = labels[lang];

  try {
    const res = await fetch('/content/insights.json');
    if (!res.ok) throw new Error('insights.json');
    const data = await res.json();
    const pub = data.publications.futureOfAiSearch;
    const articles = (data.futureOfAiSearchArticles || [])
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const btn = document.getElementById('foas-subscribe');
    if (btn && pub) {
      btn.href = pub.linkedinNewsletterUrl;
      btn.textContent = L.linkedin;
    }

    const list = document.getElementById('foas-articles');
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
    console.warn('Insights load failed', e);
  }
}

window.loadFutureOfAiSearch = loadFutureOfAiSearch;

(function autoInitInsights() {
  if (document.getElementById('foas-articles')) {
    const lang = document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr';
    loadFutureOfAiSearch(lang);
  }
})();
