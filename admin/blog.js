/* NURDAI Studio — Blog admin module */
const BLOG_PATH = 'content/blog.json';
let blogData = { posts: [] };
let blogEditIdx = -1;
let blogLangTab = 'tr';

const BLOG_CATS = ['AI Visibility', 'GEO', 'AI Search', 'SEO', 'Digital Strategy'];

async function loadBlogData() {
  try {
    const r = await fetch('../' + BLOG_PATH + '?t=' + Date.now());
    if (r.ok) blogData = await r.json();
    if (!blogData.posts) blogData.posts = [];
    blogData.posts = blogData.posts.map(p => {
      if (p.tr) return p;
      return {
        slug: p.slug,
        category: p.category,
        date: p.date,
        published: p.published !== false,
        tr: { title: p.title || '', excerpt: p.excerpt || '', body: '' },
        en: { title: '', excerpt: '', body: '' }
      };
    });
  } catch (e) { console.warn('blog.json load failed', e); }
  renderBlogList();
  updateBlogStats();
}

function updateBlogStats() {
  const n = blogData.posts.filter(p => p.published !== false).length;
  const el = document.getElementById('blog-badge');
  const st = document.getElementById('stat-blog');
  if (el) el.textContent = blogData.posts.length;
  if (st) st.textContent = n;
}

function renderBlogList() {
  const list = document.getElementById('blog-list');
  if (!list) return;
  if (!blogData.posts.length) {
    list.innerHTML = '<div style="color:var(--text3);padding:24px;font-size:13px">Henüz blog yazısı yok. Yukarıdan ekleyin.</div>';
    return;
  }
  list.innerHTML = blogData.posts
    .slice()
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map(p => {
      const tr = p.tr || {};
      const en = p.en || {};
      const status = p.published
        ? '<span style="color:var(--success);font-size:11px">● Yayında</span>'
        : '<span style="color:var(--text3);font-size:11px">○ Taslak</span>';
      return `<div class="blog-row">
        <div class="blog-row-main">
          <div class="blog-row-cat">${p.category || 'Blog'}</div>
          <div class="blog-row-title">${tr.title || p.slug}</div>
          <div class="blog-row-sub">${en.title ? 'EN: ' + en.title : 'EN çevirisi yok'}</div>
        </div>
        <div class="blog-row-meta">${status}<span>${p.date || ''}</span></div>
        <div class="blog-row-actions">
          <button class="proj-act-btn edit" onclick="openBlogModalBySlug('${p.slug}')">✏</button>
          <button class="proj-act-btn del" onclick="deleteBlogPost('${p.slug}')">✕</button>
        </div>
      </div>`;
    }).join('');
}

function openBlogModalBySlug(slug) {
  const idx = blogData.posts.findIndex(p => p.slug === slug);
  openBlogModal(idx >= 0 ? idx : -1);
}

function openBlogModal(idx) {
  blogEditIdx = idx !== undefined ? idx : -1;
  blogLangTab = 'tr';
  document.getElementById('blog-modal-title').textContent =
    blogEditIdx >= 0 ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı';
  clearBlogModal();
  if (blogEditIdx >= 0) {
    const p = blogData.posts[blogEditIdx];
    document.getElementById('b-slug').value = p.slug || '';
    document.getElementById('b-category').value = p.category || 'AI Visibility';
    document.getElementById('b-date').value = p.date || '';
    document.getElementById('b-published').checked = !!p.published;
    fillBlogLangFields('tr', p.tr || {});
    fillBlogLangFields('en', p.en || {});
  } else {
    document.getElementById('b-date').value = new Date().toISOString().slice(0, 10);
    document.getElementById('b-published').checked = false;
  }
  switchBlogTab('tr');
  document.getElementById('blog-modal').classList.add('open');
}

function fillBlogLangFields(lang, loc) {
  document.getElementById('b-title-' + lang).value = loc.title || '';
  document.getElementById('b-excerpt-' + lang).value = loc.excerpt || '';
  document.getElementById('b-body-' + lang).value = loc.body || '';
}

function clearBlogModal() {
  ['b-slug', 'b-title-tr', 'b-excerpt-tr', 'b-body-tr', 'b-title-en', 'b-excerpt-en', 'b-body-en'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function closeBlogModal() {
  document.getElementById('blog-modal').classList.remove('open');
  blogEditIdx = -1;
}

function switchBlogTab(lang) {
  blogLangTab = lang;
  document.querySelectorAll('.blog-tab').forEach(t => t.classList.toggle('active', t.dataset.lang === lang));
  document.getElementById('blog-pane-tr').style.display = lang === 'tr' ? 'block' : 'none';
  document.getElementById('blog-pane-en').style.display = lang === 'en' ? 'block' : 'none';
}

function autoSlugFromTitle() {
  if (blogEditIdx >= 0) return;
  const title = document.getElementById('b-title-tr').value;
  const slugEl = document.getElementById('b-slug');
  if (slugEl && !slugEl.dataset.manual) {
    slugEl.value = BlogGenerator.slugify(title);
  }
}

function saveBlogPost() {
  const slug = document.getElementById('b-slug').value.trim() || BlogGenerator.slugify(document.getElementById('b-title-tr').value);
  if (!slug) { toast('Slug veya Türkçe başlık gerekli', 'error'); return; }
  const trTitle = document.getElementById('b-title-tr').value.trim();
  if (!trTitle) { toast('Türkçe başlık gerekli', 'error'); return; }

  const post = {
    slug,
    category: document.getElementById('b-category').value,
    date: document.getElementById('b-date').value || new Date().toISOString().slice(0, 10),
    published: document.getElementById('b-published').checked,
    tr: {
      title: trTitle,
      excerpt: document.getElementById('b-excerpt-tr').value.trim(),
      body: document.getElementById('b-body-tr').value.trim()
    },
    en: {
      title: document.getElementById('b-title-en').value.trim(),
      excerpt: document.getElementById('b-excerpt-en').value.trim(),
      body: document.getElementById('b-body-en').value.trim()
    }
  };

  if (blogEditIdx >= 0) blogData.posts[blogEditIdx] = post;
  else blogData.posts.unshift(post);

  renderBlogList();
  updateBlogStats();
  closeBlogModal();
  setDirty();
  toast('Blog yazısı kaydedildi — Yayınla ile siteye gönderin', 'success');
}

function deleteBlogPost(slug) {
  if (!confirm('Bu yazı silinsin mi?')) return;
  blogData.posts = blogData.posts.filter(p => p.slug !== slug);
  renderBlogList();
  updateBlogStats();
  setDirty();
}

async function publishBlogContent(pubLog) {
  pubLog('📝 blog.json güncelleniyor...');
  const json = JSON.stringify(blogData, null, 2);
  await ghPutText(BLOG_PATH, json, 'blog.json');

  const published = blogData.posts.filter(p => p.published);
  for (const post of published) {
    if (post.tr?.body) {
      pubLog('📄 TR: blog/' + post.slug);
      const htmlTr = BlogGenerator.buildBlogArticleHtml(post, 'tr');
      await ghPutText('blog/' + post.slug + '.html', htmlTr, 'blog TR ' + post.slug);
    }
    if (post.en?.body) {
      pubLog('📄 EN: en/blog/' + post.slug);
      const htmlEn = BlogGenerator.buildBlogArticleHtml(post, 'en');
      await ghPutText('en/blog/' + post.slug + '.html', htmlEn, 'blog EN ' + post.slug);
    }
  }
}

async function ghPutText(path, textContent, label) {
  const b64 = btoa(unescape(encodeURIComponent(textContent)));
  return ghPut(path, b64, label);
}
