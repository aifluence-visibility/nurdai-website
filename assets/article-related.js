/* Related internal links for blog, research, and service pages */
(function initArticleRelated() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  function detectContext() {
    const blogMatch = path.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) return { type: 'blog', slug: blogMatch[1] };

    const researchTr = path.match(/^\/insights\/research\/([^/]+)$/);
    if (researchTr) return { type: 'research', slug: researchTr[1] };

    const researchEn = path.match(/^\/en\/insights\/research\/([^/]+)$/);
    if (researchEn) return { type: 'research', slug: researchEn[1] };

    if (path === '/ai-visibility-audit' || path === '/en/ai-visibility-audit') {
      return { type: 'service', slug: 'ai-visibility-audit' };
    }
    return null;
  }

  function lang() {
    return path.startsWith('/en') ? 'en' : 'tr';
  }

  function heading(l) {
    return l === 'en' ? 'Related resources' : 'İlgili kaynaklar';
  }

  async function run() {
    const ctx = detectContext();
    if (!ctx) return;

    const l = lang();
    try {
      const res = await fetch('/content/related-links.json');
      if (!res.ok) return;
      const data = await res.json();
      const group = data[ctx.type];
      if (!group || !group[ctx.slug]) return;
      const links = group[ctx.slug][l] || group[ctx.slug].tr;
      if (!links || !links.length) return;

      const mount = document.createElement('aside');
      mount.id = 'article-related';
      mount.className = 'article-related rv';
      mount.setAttribute('aria-label', heading(l));
      mount.innerHTML = `
        <div class="article-related-inner">
          <div class="article-related-label">${heading(l)}</div>
          <ul class="article-related-list">
            ${links.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
          </ul>
        </div>`;

      const cta = document.querySelector('.article-cta');
      const content = document.querySelector('.article-content');
      const ctaSec = document.querySelector('main .cta-sec');
      if (cta && cta.parentNode) {
        cta.parentNode.insertBefore(mount, cta);
      } else if (content) {
        content.appendChild(mount);
      } else if (ctaSec) {
        ctaSec.parentNode.insertBefore(mount, ctaSec);
      } else {
        const main = document.querySelector('main');
        if (main) main.appendChild(mount);
      }

      if (typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vs'); });
        }, { threshold: 0.07 }).observe(mount);
      }
    } catch (e) {
      console.warn('Related links unavailable', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
