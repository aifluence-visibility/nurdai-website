/* NURDAI — unified site footer (TR + EN) */
(function () {
  const GENESSA = `<a href="https://genessa.io/score?url=www.nurdai.com" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;margin-bottom:12px;text-decoration:none;">
        <span style="display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:99px;background:#0B0B11;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:500;color:#fff;white-space:nowrap;">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs><linearGradient id="bgg-footer" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4B7BFF"/><stop offset="1" stop-color="#A77BFF"/></linearGradient></defs>
            <g stroke="url(#bgg-footer)" stroke-width="1" stroke-linecap="round"><line x1="8" y1="8" x2="3" y2="3"/><line x1="8" y1="8" x2="13" y2="3"/><line x1="8" y1="8" x2="3" y2="13"/><line x1="8" y1="8" x2="13" y2="13"/></g>
            <g fill="url(#bgg-footer)"><circle cx="3" cy="3" r="1.2"/><circle cx="13" cy="3" r="1.2"/><circle cx="3" cy="13" r="1.2"/><circle cx="13" cy="13" r="1.2"/></g>
            <circle cx="8" cy="8" r="2.4" fill="url(#bgg-footer)"/>
          </svg>
          AI Trusted · Genessa
        </span>
      </a>`;

  const FOOTERS = {
    tr: `<div class="con">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">NURD<span>AI</span></a>
        <p>Markaların dijital görünürlüğünü arama motorları ve yapay zeka sistemleri için yapılandıran stratejik stüdyo.</p>
        <div class="footer-tagline">Exploring digital visibility in the AI era.</div>
        <div class="footer-social" aria-label="Sosyal medya bağlantıları">
          <a href="https://linkedin.com/company/nurdai" target="_blank" rel="noopener" aria-label="LinkedIn" style="font-size:.68rem;font-weight:700">in</a>
          <a href="https://youtube.com/@Hellonurdai" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
          <a href="https://www.instagram.com/hellonurdai" target="_blank" rel="noopener" aria-label="Instagram">📸</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Sayfalar</h4>
        <ul>
          <li><a href="/">Ana Sayfa</a></li>
          <li><a href="/yapay-zeka-gorunurlugu">Yapay Zeka Görünürlüğü</a></li>
          <li><a href="/hizmetler">Hizmetler</a></li>
          <li><a href="/portfolyo">Portfolyo</a></li>
          <li><a href="/hakkimda">Hakkımda</a></li>
          <li><a href="/medya">Medya</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Hizmetler</h4>
        <ul>
          <li><a href="/ai-visibility-audit">AI Visibility Audit</a></li>
          <li><a href="/generative-engine-optimization">GEO</a></li>
          <li><a href="/ai-search-optimization">AI Search Optimization</a></li>
          <li><a href="/semantic-seo">Semantic SEO</a></li>
          <li><a href="/entity-seo">Entity SEO</a></li>
          <li><a href="/digital-authority">Digital Authority</a></li>
          <li><a href="/iletisim">İletişim</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bot">
      ${GENESSA}
      <span>© 2026 Nurdai. Tüm hakları saklıdır.</span>
      <div class="footer-legal">
        <a href="/gizlilik-politikasi">Gizlilik Politikası</a>
        <a href="/kullanim-kosullari">Kullanım Koşulları</a>
      </div>
    </div>
  </div>`,
    en: `<div class="con">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/en/" class="logo">NURD<span>AI</span></a>
        <p>Strategic studio structuring brands' digital visibility for search engines and AI systems.</p>
        <div class="footer-tagline">Exploring digital visibility in the AI era.</div>
        <div class="footer-social" aria-label="Social media links">
          <a href="https://linkedin.com/company/nurdai" target="_blank" rel="noopener" aria-label="LinkedIn" style="font-size:.68rem;font-weight:700">in</a>
          <a href="https://youtube.com/@Hellonurdai" target="_blank" rel="noopener" aria-label="YouTube">▶</a>
          <a href="https://www.instagram.com/hellonurdai" target="_blank" rel="noopener" aria-label="Instagram">📸</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        <ul>
          <li><a href="/en/">Home</a></li>
          <li><a href="/en/ai-visibility">AI Visibility</a></li>
          <li><a href="/en/services">Services</a></li>
          <li><a href="/en/portfolio">Portfolio</a></li>
          <li><a href="/en/about">About</a></li>
          <li><a href="/en/media">Media</a></li>
          <li><a href="/en/blog">Blog</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="/en/ai-visibility-audit">AI Visibility Audit</a></li>
          <li><a href="/en/generative-engine-optimization">GEO</a></li>
          <li><a href="/en/ai-search-optimization">AI Search Optimization</a></li>
          <li><a href="/en/semantic-seo">Semantic SEO</a></li>
          <li><a href="/en/entity-seo">Entity SEO</a></li>
          <li><a href="/en/digital-authority">Digital Authority</a></li>
          <li><a href="/en/contact">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bot">
      ${GENESSA}
      <span>© 2026 Nurdai. All rights reserved.</span>
      <div class="footer-legal">
        <a href="/gizlilik-politikasi">Privacy Policy</a>
        <a href="/kullanim-kosullari">Terms of Use</a>
      </div>
    </div>
  </div>`
  };

  function footerLang() {
    const lang = document.documentElement.getAttribute('lang');
    if (lang === 'en') return 'en';
    if (location.pathname.startsWith('/en')) return 'en';
    return 'tr';
  }

  function initSiteFooter() {
    const footer = document.querySelector('footer[role="contentinfo"]');
    if (!footer || footer.dataset.noInject === 'true') return;
    footer.innerHTML = FOOTERS[footerLang()];
  }

  window.initSiteFooter = initSiteFooter;
  document.addEventListener('DOMContentLoaded', initSiteFooter);
})();
