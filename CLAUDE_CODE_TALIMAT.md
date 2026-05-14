# NURDAI — Claude Code Talimatları

Adımları SIRAYLA uygula.

---

## MEVCUT DURUM

```
nurdai/
├── index.html          ✅ Hazır
├── admin/index.html    ✅ Hazır (GitHub entegrasyonlu CMS)
├── assets/style.css    ✅ Hazır
├── assets/main.js      ✅ Hazır
├── content/data.json   ✅ İskelet hazır
├── sitemap.xml         ✅ Hazır
├── robots.txt          ✅ Hazır
└── Eksik sayfalar ↓
```

**Admin paneli nasıl çalışır:**
→ Admin panelde değişiklik yap → 🚀 Yayınla butonuna bas → GitHub'a otomatik commit → Vercel deploy → ~30 sn → canlı ✅
→ Dosya indirmek yok, terminal açmak yok.

---

## ADIM 1 — GÖRSELLERİ SEÇ

```bash
ls ~/Downloads/ | grep -iE "^port[0-9]" | sort -V
```

`~/Downloads/port1` — `port91` arasındaki görsel dosyaları (jpg/png) incele.

Her kategoriden en iyi **3-5 tanesini** seç, toplam 15-25 görsel:

| Kategori | data-cat |
|---|---|
| Sosyal Medya (Instagram post, story) | `sosyal` |
| Logo | `logo` |
| Branding (kartvizit, kimlik) | `branding` |
| Grafik Tasarım (afiş, banner) | `grafik` |
| Kampanya | `kampanya` |
| İçerik tasarımı | `icerik` |

```bash
mkdir -p assets/images
cp ~/Downloads/portXX.jpg assets/images/port01.jpg
# ... devam et, port01.jpg - port25.jpg şeklinde sırala
```

Nurdan'ın fotoğrafı varsa → `assets/images/nurdan.jpg`

---

## ADIM 2 — MOCKUP CSS EKLE

`assets/style.css` dosyasının SONUNA ekle:

```css
/* ── MOCKUPS ── */
.mkp-phone{display:flex;justify-content:center;padding:16px}
.mkp-phone-frame{width:160px;background:#10101e;border-radius:28px;padding:8px;box-shadow:0 16px 48px rgba(0,0,0,.55),inset 0 0 0 1px rgba(255,255,255,.08)}
.mkp-phone-screen{border-radius:22px;overflow:hidden;aspect-ratio:9/19.5;background:#000}
.mkp-phone-screen img{width:100%;height:100%;object-fit:cover;display:block}

.mkp-logo{display:grid;grid-template-columns:1fr 1fr;border-radius:14px;overflow:hidden}
.mkp-logo-dk,.mkp-logo-lt{padding:24px;display:flex;align-items:center;justify-content:center;min-height:110px}
.mkp-logo-dk{background:#08080f}
.mkp-logo-lt{background:#f4f4f0}
.mkp-logo-dk img,.mkp-logo-lt img{max-width:130px;max-height:70px;object-fit:contain}

.mkp-brand{border-radius:14px;overflow:hidden;box-shadow:0 20px 56px rgba(0,0,0,.38);transform:perspective(900px) rotateY(-3deg) rotateX(2deg);transition:transform .35s}
.mkp-brand:hover{transform:perspective(900px) rotateY(0deg) rotateX(0deg)}
.mkp-brand img{width:100%;display:block}

.mkp-frame{border-radius:14px;overflow:hidden;border:8px solid var(--bg2);box-shadow:var(--sh)}
.mkp-frame img{width:100%;display:block}

.port-ref{font-size:.66rem;color:rgba(255,255,255,.46);margin-bottom:3px;letter-spacing:.04em;text-transform:uppercase}
```

---

## ADIM 3 — DATA.JSON GÜNCELLE

`content/data.json` dosyasını gerçek proje verileriyle doldur.

**`client` (referans adı) ve `mockupType` ZORUNLU:**

```json
{
  "site": {
    "name": "Nurdai",
    "email": "hello@nurdai.com",
    "social": {
      "instagram": "https://instagram.com/nurdai",
      "linkedin": "https://linkedin.com/in/nurdai",
      "youtube": "https://youtube.com/@nurdai",
      "tiktok": "https://tiktok.com/@nurdai",
      "podcast": "#",
      "twitter": "https://x.com/nurdai"
    }
  },
  "hero": {
    "badge": "AI Çağında Dijital Görünürlük",
    "title": "AI sistemleri markanızı tanımıyorsa, görünmüyorsunuz demektir.",
    "subtitle": "AI Visibility danışmanlığı, içerik stratejisi ve SEO ile markanızın dijital her noktada güçlü görünmesini sağlıyorum."
  },
  "about": {
    "photo": "assets/images/nurdan.jpg",
    "bio": "Dijital dünyaya sosyal medya, grafik tasarım ve içerik üretimiyle başladım...",
    "short": "AI Visibility danışmanı. Markaların dijital çağda görünür olmasına yardımcı oluyorum."
  },
  "portfolio": [
    {
      "id": 1,
      "title": "Proje Başlığı",
      "client": "Café Luna",
      "category": "sosyal",
      "categoryLabel": "Sosyal Medya",
      "image": "assets/images/port01.jpg",
      "mockupType": "phone",
      "description": "Kısa açıklama"
    }
  ]
}
```

**`mockupType` değerleri:** `phone` / `logo` / `brand` / `frame`

**`client` (referans adı):**
- Gerçek isim: "Café Luna", "Eczane Kartal"
- Gizliyse: "Restoran Projesi", "Güzellik Markası"
- Portfolyo hover'ında "REFERANS: Café Luna" şeklinde çıkar

---

## ADIM 4 — EKSİK SAYFALAR

Her sayfa için `index.html`'deki nav ve footer'ı kullan.
`assets/style.css` + `assets/main.js` tüm sayfalarda paylaşımlı.

### Ortak Head Şablonu

```html
<!DOCTYPE html>
<html lang="tr" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BAŞLIK — Nurdai</title>
<meta name="description" content="AÇIKLAMA">
<meta name="author" content="Nurdan — Nurdai">
<link rel="canonical" href="https://nurdai.com/SAYFA.html">
<meta property="og:title" content="BAŞLIK — Nurdai">
<meta property="og:description" content="AÇIKLAMA">
<meta property="og:url" content="https://nurdai.com/SAYFA.html">
<meta property="og:image" content="https://nurdai.com/assets/images/og-home.jpg">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Nurdai">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@nurdai">
<script type="application/ld+json">{ SCHEMA }</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="cur" id="cur"></div>
<div class="curl" id="curl"></div>
<!-- NAV (index.html'den kopyala, bu sayfanın linkine active ekle) -->
<main><!-- İÇERİK --></main>
<!-- FOOTER (index.html'den kopyala) -->
<script src="assets/main.js"></script>
</body>
```

---

### ai-visibility.html

Title: `AI Visibility Nedir? — Nurdai`
Desc: `ChatGPT, Google AI ve Perplexity'de markanızın nasıl göründüğünü anlayın. AI Visibility ile yeni nesil dijital görünürlük.`

Bölümler:
1. Hero (`.ai-hero-wrap`) → "AI sistemi markanızı biliyor mu?" + `.ai-rings` animasyonu
2. `.ai-block` — AI Visibility nedir? + araçlar grid: ChatGPT, Perplexity, Google AI, Gemini
3. `.ai-block` (bg2) — Zero-click nedir?
4. `.ai-block` — Sosyal medya & SEO neden önemli? (`.platform-list`)
5. `.ai-block` (bg2) — Nasıl yardımcı oluyorum? (4 `.svc-group` kart)
6. CTA → iletisim.html

---

### hizmetler.html

Title: `Hizmetler — Nurdai | AI Visibility, SEO, Sosyal Medya`
Desc: `AI Visibility danışmanlığından SEO'ya, sosyal medya yönetiminden branding'e — tam kapsamlı dijital görünürlük.`

Bölümler:
1. `.page-hero.center` → "Markanız için tam kapsamlı dijital çözümler."
2. `.svc-detail-grid` → 7 kart (01-07), ilki `featured` class + mor border
3. CTA → iletisim.html

---

### portfolyo.html

Title: `Portfolyo — Nurdai | Sosyal Medya, Logo, Branding Projeleri`
Desc: `Gerçek markalar için üretilmiş sosyal medya, logo, branding ve grafik tasarım projeleri.`

Bölümler:
1. `.page-hero` → "Projeler" + filtre butonları
2. Masonry grid → **data.json'dan JS ile yükle**, mockupType'a göre render

`assets/main.js` içindeki `loadPortfolio` fonksiyonunu güncelle:

```javascript
function renderCard(p) {
  const mockups = {
    phone: `<div class="mkp-phone"><div class="mkp-phone-frame"><div class="mkp-phone-screen"><img src="${p.image}" alt="${p.title}" loading="lazy"></div></div></div>`,
    logo:  `<div class="mkp-logo"><div class="mkp-logo-dk"><img src="${p.image}" alt="${p.title}" loading="lazy"></div><div class="mkp-logo-lt"><img src="${p.image}" alt="${p.title}" loading="lazy"></div></div>`,
    brand: `<div class="mkp-brand"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`,
    frame: `<div class="mkp-frame"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>`
  };
  const visual = p.image
    ? (mockups[p.mockupType] || mockups.frame)
    : `<div class="port-ph"><div style="font-size:2rem">${p.emoji||'🖼️'}</div><div>${p.title}</div></div>`;
  return `
    <div class="port-card rv" data-cat="${p.category}" style="break-inside:avoid;margin-bottom:16px">
      ${visual}
      <div class="port-overlay">
        <div class="port-ref">REFERANS: ${p.client || '—'}</div>
        <div class="port-title">${p.title}</div>
        <div class="port-cat">${p.categoryLabel}</div>
      </div>
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
```

---

### hakkimda.html

Title: `Hakkımda — Nurdan | Nurdai AI Visibility Danışmanı`
Desc: `Grafik tasarımdan AI çağının dijital görünürlüğüne — Nurdan'ın hikayesi.`

JSON-LD:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nurdan",
  "alternateName": "Nurdai",
  "url": "https://nurdai.com",
  "image": "https://nurdai.com/assets/images/nurdan.jpg",
  "jobTitle": "AI Visibility Danışmanı",
  "sameAs": ["https://instagram.com/nurdai","https://linkedin.com/in/nurdai","https://youtube.com/@nurdai","https://x.com/nurdai"]
}
```

Bölümler:
1. `.about-grid` → Sol: `.about-photo` (nurdan.jpg), Sağ: başlık + biyografi
2. `.timeline` → 4 adım (Başlangıç / Gelişim / Derinlik / Bugün ✦)
3. CTA → iletisim.html

---

### medya.html

Title: `Medya — Nurdai | Instagram, YouTube, Podcast`
Desc: `AI visibility ve dijital strateji içerikleri. Tüm kanallardan takip et.`

6 büyük platform kartı (`.mpc` sınıfı, style.css'te mevcut).
Linkleri `data.json > site.social` dan fetch ile oku.

---

### iletisim.html

Title: `İletişim — Nurdai | AI Visibility Danışmanlığı`
Desc: `AI Visibility ve dijital görünürlük danışmanlığı için iletişime geç.`

Form — **Formspree entegrasyonu:**
```html
<form action="https://formspree.io/f/FORMSPREE_ID" method="POST" onsubmit="submitForm(event)">
```

Kurulum:
1. formspree.io → ücretsiz hesap aç
2. New Form → isim: "Nurdai İletişim"
3. Form ID'yi kopyala → action URL'e yaz

Form alanları: Ad Soyad + Marka (yan yana) | E-posta | Hizmet checkbox grid | Mesaj
Hizmet seçenekleri: AI Visibility / Sosyal Medya / Grafik Tasarım / SEO / İçerik / Danışmanlık

---

## ADIM 5 — ADMİN ŞİFRESİNİ GÜNCELLE

`admin/index.html` içinde:
```javascript
const PASS = 'nurdai2025'; // ← Bunu değiştir!
```
Güçlü bir şifreyle değiştir.

---

## ADIM 6 — LOCAL TEST

```bash
npx serve . -p 3000
# veya:
python3 -m http.server 3000
```

Kontrol listesi:
- [ ] 7 sayfa açılıyor
- [ ] Portfolio görselleri mockuplu görünüyor
- [ ] Referans adları hover'da görünüyor
- [ ] Dark/Light toggle çalışıyor
- [ ] Admin paneli açılıyor (localhost:3000/admin/)
- [ ] Admin şifre ile giriş yapılıyor
- [ ] GitHub token/kullanıcı/repo giriliyor
- [ ] Admin'den portfolyo eklenebiliyor
- [ ] 🚀 Yayınla butonu GitHub'a commit atıyor
- [ ] Mobil görünüm düzgün (DevTools)

---

## ADIM 7 — GITHUB + VERCEL DEPLOY

### GitHub'a Push

```bash
git init
git add .
git commit -m "Nurdai website v1 - ilk commit"

# GitHub.com → New Repository → nurdai-website
git remote add origin https://github.com/KULLANICI/nurdai-website.git
git branch -M main
git push -u origin main
```

### Vercel Deploy

```bash
npm install -g vercel
vercel
# Sorular: Y / kişisel hesap / N / nurdai / ./ / N
vercel --prod
```

### Domain Bağla (Namecheap → Vercel)

**Vercel:** Project → Settings → Domains → `nurdai.com` + `www.nurdai.com` ekle

**Namecheap:** Domain List → nurdai.com → Advanced DNS:

| Type | Host | Value |
|---|---|---|
| A Record | @ | 76.76.21.21 |
| CNAME Record | www | cname.vercel-dns.com |

Kaydet → 5-30 dk bekle → SSL otomatik ✅

### Sonraki güncellemeler

Admin panelinden yap → 🚀 Yayınla → otomatik. Kod değişikliği için:
```bash
git add . && git commit -m "güncelleme" && git push
```

---

## ADIM 8 — SEO TAMAMLAMA

**OG görseli:** 1200×630px → `assets/images/og-home.jpg`
(Koyu arka plan + NURDAI logosu + tagline)

**Favicon:** 32×32px → `favicon.ico` (root klasör)
```html
<!-- Tüm sayfa <head>'lerine ekle: -->
<link rel="icon" href="/favicon.ico">
```

**Google Search Console** (deploy sonrası):
1. search.google.com/search-console
2. Property: `https://nurdai.com`
3. Sitemap: `https://nurdai.com/sitemap.xml`

---

## ÖZET

- [x] index.html
- [x] admin/index.html (GitHub entegrasyonlu)
- [x] assets/style.css + main.js
- [x] content/data.json (iskelet)
- [x] sitemap.xml + robots.txt
- [ ] Mockup CSS → style.css sonuna ekle
- [ ] port1-91 → seç, kopyala
- [ ] data.json → gerçek veriler + referans adları
- [ ] ai-visibility.html
- [ ] hizmetler.html
- [ ] portfolyo.html (mockuplu + referanslı)
- [ ] hakkimda.html
- [ ] medya.html
- [ ] iletisim.html (Formspree)
- [ ] Admin şifre değiştir
- [ ] loadPortfolio fonksiyonunu güncelle (renderCard dahil)
- [ ] Local test
- [ ] GitHub push
- [ ] Vercel deploy
- [ ] Domain bağla
- [ ] Search Console + sitemap
- [ ] OG görseli + favicon
