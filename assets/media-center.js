/* NURDAI — Media Center loader */
async function loadMediaCenter(lang) {
  lang = lang || (document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr');
  const labels = {
    tr: {
      featured: 'Featured In',
      featuredSub: 'Uluslararası platformlarda yayınlanan makaleler ve röportajlar.',
      guest: 'Guest Articles',
      guestSub: 'Uzman yazarların NURDAI için kaleme aldığı konuk makaleler.',
      comingSoon: 'Yakında',
      comingSoonDesc: 'Konuk yazar makaleleri çok yakında burada.',
      social: 'Sosyal Kanallar',
      socialSub: 'AI visibility ve dijital strateji içeriklerini takip edin.',
      published: 'Yayın',
      readArticle: 'Makaleyi Oku →',
      readGuest: 'Konuk Yazısını Oku →',
      upcoming: 'Yaklaşan Yayınlar',
      upcomingText: 'Yeni uluslararası yayınlar yakında.'
    },
    en: {
      featured: 'Featured In',
      featuredSub: 'International articles, interviews and publications.',
      guest: 'Guest Articles',
      guestSub: 'Articles written by experts for NURDAI.',
      comingSoon: 'Coming Soon',
      comingSoonDesc: 'Guest author articles will appear here soon.',
      social: 'Social Channels',
      socialSub: 'Follow AI visibility and digital strategy content.',
      published: 'Published',
      readArticle: 'Read Article →',
      readGuest: 'Read Guest Article →',
      upcoming: 'Upcoming Publications',
      upcomingText: 'More international publications coming soon.'
    }
  };
  const L = labels[lang];

  try {
    const res = await fetch('/content/media.json');
    if (!res.ok) throw new Error('media.json');
    const data = await res.json();

    const guestEl = document.getElementById('media-guest-list');
    const guestComingEl = document.getElementById('media-guest-coming');
    if (guestEl && data.guestArticles && data.guestArticles.length) {
      if (guestComingEl) guestComingEl.hidden = true;
      guestEl.innerHTML = data.guestArticles.map(item => {
        const excerpt = item.excerpt[lang] || item.excerpt.en;
        const dateLabel = item.dateLabel[lang] || item.dateLabel.en;
        const category = item.categories && item.categories[0] ? item.categories[0] : 'Guest Article';
        return `
        <a href="${item.url}" class="media-guest-card rv">
          <div class="mgc-glow" aria-hidden="true"></div>
          <div class="mgc-inner">
            <div class="mgc-author">
              <img class="mgc-photo" src="${item.authorPhoto}" alt="${item.author}" width="56" height="56" loading="lazy">
              <div>
                <span class="mgc-author-name">${item.author}</span>
                <span class="mgc-author-title">${item.authorTitle}</span>
              </div>
            </div>
            <div class="mgc-body">
              <span class="mgc-cat">${category}</span>
              <h3 class="mgc-title">${item.title}</h3>
              <p class="mgc-date">${L.published}: ${dateLabel}</p>
              <p class="mgc-excerpt">${excerpt}</p>
            </div>
            <div class="mgc-action">
              <span class="btn-p mgc-btn">${L.readGuest}</span>
            </div>
          </div>
        </a>`;
      }).join('');
    }

    const featuredEl = document.getElementById('media-featured-list');
    if (featuredEl && data.featured) {
      featuredEl.innerHTML = data.featured.map(item => {
        const title = lang === 'tr' && item.titleTr ? item.titleTr : item.title;
        const excerpt = item.excerpt[lang] || item.excerpt.en;
        const dateLabel = item.dateLabel[lang] || item.dateLabel.en;
        return `
        <a href="${item.url}" target="_blank" rel="noopener" class="media-featured-card rv">
          <div class="mfc-glow" aria-hidden="true"></div>
          <div class="mfc-inner">
            <div class="mfc-pub">
              <img class="mfc-logo" src="${item.logo}" alt="${item.publisher}" width="56" height="56" loading="lazy">
              <span class="mfc-pub-name">${item.publisher}</span>
            </div>
            <div class="mfc-body">
              <h3 class="mfc-title">${title}</h3>
              <p class="mfc-date">${L.published}: ${dateLabel}</p>
              <p class="mfc-excerpt">"${excerpt}"</p>
            </div>
            <div class="mfc-action">
              <span class="btn-p mfc-btn">${L.readArticle}</span>
            </div>
          </div>
        </a>`;
      }).join('');
    }

    const socialEl = document.getElementById('media-social-grid');
    if (socialEl && data.social) {
      socialEl.innerHTML = data.social.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener" class="media-card media-card--social rv" style="--brand:${s.color || '#6D28D9'}">
          <div class="media-ico">${s.icon}</div>
          <div class="media-name">${s.name}</div>
          <div class="media-handle">${s.handle[lang] || s.handle.en}</div>
        </a>`).join('');
    }

    if (typeof revealElements === 'function') {
      [featuredEl, guestEl, socialEl].forEach(el => { if (el) revealElements(el); });
    }
  } catch (e) {
    console.warn('Media center yüklenemedi', e);
  }

  document.querySelectorAll('[data-media-label]').forEach(el => {
    const key = el.dataset.mediaLabel;
    if (L[key]) el.textContent = L[key];
  });
}

window.loadMediaCenter = loadMediaCenter;

(function autoInitMedia() {
  if (document.getElementById('media-featured-list') || document.getElementById('media-social-grid') || document.getElementById('media-guest-list')) {
    const lang = document.documentElement.lang === 'en' || location.pathname.startsWith('/en') ? 'en' : 'tr';
    loadMediaCenter(lang);
  }
})();
