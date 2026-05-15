# NurdAI Site Geliştirme Görevi

## Önce yap
1. Dosya yapısını tara ve hangi framework kullanıldığını belirle
2. Mevcut içerikleri oku, sonra aşağıdaki değişiklikleri uygula

---

## DEĞİŞİKLİK 1 — Teknik SEO Altyapısı

### `<html>` tagine ekle:
```html
<html lang="tr">
```

### Her sayfa için unique `<title>` ve `<meta description>`:

**Ana Sayfa:**
```html
<title>AI Visibility & Dijital Strateji Danışmanı | NurdAI</title>
<meta name="description" content="Markanızı hem Google'da hem ChatGPT'de görünür yapıyorum. Sosyal medya yönetimi, SEO ve AI Visibility danışmanlığı — hepsi bir arada." />
```

**AI Visibility sayfası:**
```html
<title>AI Visibility Nedir? ChatGPT'de Markanız Görünür mü? | NurdAI</title>
<meta name="description" content="Müşterileriniz artık ChatGPT ve Perplexity'de arama yapıyor. AI Visibility ile markanızı yapay zeka sistemlerine tanıtıyorum." />
```

**Hizmetler:**
```html
<title>Hizmetler: Sosyal Medya, SEO, Branding & AI Visibility | NurdAI</title>
<meta name="description" content="Sosyal medya yönetimi, grafik tasarım, SEO içerik planı ve AI görünürlük analizini tek çatı altında sunuyorum." />
```

**Portfolyo:**
```html
<title>Projeler & Referanslar | NurdAI Portfolyo</title>
<meta name="description" content="Sosyal medya, branding ve dijital strateji alanında gerçekleştirdiğim projeler ve müşteri çalışmaları." />
```

**Hakkımda:**
```html
<title>Nurdan Kimdir? Grafik Tasarım & AI Visibility Uzmanı | NurdAI</title>
<meta name="description" content="Grafik tasarımdan AI Visibility danışmanlığına uzanan kariyer yolculuğum. Markaların dijital çağda görünür olmasını sağlıyorum." />
```

**İletişim:**
```html
<title>İletişim — AI Visibility Yolculuğuna Başla | NurdAI</title>
<meta name="description" content="Markanız için en uygun dijital strateji paketini birlikte belirleyelim. 24 saat içinde yanıt veriyorum." />
```

### Open Graph taglerini tüm sayfalara ekle:
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="NurdAI" />
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

### Schema Markup — `</body>` kapanmadan önce ana sayfaya ekle:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nurdan",
  "url": "https://nurdai.com",
  "jobTitle": "AI Visibility Danışmanı & Dijital Strateji Uzmanı",
  "description": "Markaların dijital çağda AI sistemlerinde görünür olmasını sağlayan bağımsız strateji danışmanı.",
  "sameAs": [
    "https://instagram.com/nurdai",
    "https://linkedin.com/in/nurdai"
  ],
  "knowsAbout": ["AI Visibility", "SEO", "Sosyal Medya Yönetimi", "Grafik Tasarım", "İçerik Stratejisi"],
  "offers": {
    "@type": "Offer",
    "name": "AI Visibility Danışmanlığı",
    "url": "https://nurdai.com/hizmetler"
  }
}
</script>
```

### Canonical tag — her sayfaya kendi URL'siyle:
```html
<link rel="canonical" href="https://nurdai.com/[sayfa-slug]" />
```

---

## DEĞİŞİKLİK 2 — Ana Sayfa Hero Section

**Mevcut başlığı bul ve şununla değiştir:**

```html
<!-- HERO BAŞLIK -->
<h1>
  Markanı hem insanlar<br />
  hem <span class="highlight-ai">yapay zeka</span> bulsun.
</h1>

<!-- ALT BAŞLIK -->
<p class="hero-subtitle">
  Müşterilerin artık ChatGPT'ye şirket soruyor. Sosyal medyayı yönetiyorum,
  SEO'nu kuruyorum ve markanı AI sistemlerine tanıtıyorum — hepsi bir arada.
</p>

<!-- HERO SORU KARTI — mevcut CTA butonlarının üstüne ekle -->
<div class="hero-question-card">
  <span class="hero-q-icon">💬</span>
  <p>
    Birisi şu an ChatGPT'ye "sektörünüz için en iyi firma" diye sordu.<br />
    <strong>Cevap listesinde siz var mısınız?</strong>
  </p>
</div>
```

---

## DEĞİŞİKLİK 3 — Ana Sayfa İstatistik Bölümü

**Mevcut %60 / Zero-click / 2025 kartlarını şununla değiştir:**

```html
<div class="stats-grid">
  <div class="stat-card">
    <span class="stat-number">%40</span>
    <p>Z kuşağı arama motorları yerine AI'a soruyor</p>
  </div>
  <div class="stat-card">
    <span class="stat-number">Zero-click</span>
    <p>Kullanıcılar AI'dan yanıt alıp siteye gitmiyor — görünür olmak yetmiyor, ilk tercih olman lazım</p>
  </div>
  <div class="stat-card">
    <span class="stat-number">2025</span>
    <p>AI görünürlüğü bugün erken davrananların oyunu — yarın herkes yapıyor olacak</p>
  </div>
</div>
```

---

## DEĞİŞİKLİK 4 — "Markanız AI'da Var mı?" Bölümü

**Mevcut bölümü tamamen şununla değiştir:**

```html
<section class="ai-explainer-section">
  <p class="section-label">BİLİYOR MUSUN?</p>
  <h2>Müşterilerin seni Google'da değil, ChatGPT'de arıyor.</h2>
  
  <p class="explainer-lead">
    Şu an birisi ChatGPT'ye <em>"İzmir'de güvenilir sosyal medya ajansı"</em> diye sordu.
    ChatGPT bir liste verdi. Listede sen var mısın?
  </p>

  <div class="explainer-steps">
    <div class="step">
      <span class="step-num">1</span>
      <div>
        <strong>AI sistemleri markaları tarar</strong>
        <p>ChatGPT, Claude, Perplexity — hepsi sosyal medyandan, sitenden, bloglarından seni öğreniyor.</p>
      </div>
    </div>
    <div class="step">
      <span class="step-num">2</span>
      <div>
        <strong>Doğru içerik yoksa listede yer yok</strong>
        <p>Sadece güzel görünmek yetmiyor. AI'ın seni "güvenilir kaynak" olarak tanıması için doğru formatta içerik üretmen lazım.</p>
      </div>
    </div>
    <div class="step">
      <span class="step-num">3</span>
      <div>
        <strong>Ben tam bunu yapıyorum</strong>
        <p>Sosyal medyanı yönetirken, SEO içeriklerini yazarken — aynı zamanda AI'ın seni bulmasını sağlayacak şekilde kuruyorum.</p>
      </div>
    </div>
  </div>

  <a href="/iletisim" class="btn-primary">Markanın AI'daki durumunu öğren →</a>
</section>
```

---

## DEĞİŞİKLİK 5 — Hizmetler Sayfası: AI Köprüsü

**Her hizmet kartının altına şu etiketi ekle:**

Sosyal Medya Yönetimi kartına:
```html
<div class="ai-badge">🤖 AI görünürlüğüne katkı sağlar</div>
```

Grafik Tasarım kartına:
```html
<div class="ai-badge">🤖 Marka kimliği AI'da tanınırlığı artırır</div>
```

SEO Uyumlu İçerik Planı kartına:
```html
<div class="ai-badge aibadge-highlight">⚡ Doğrudan AI Visibility'e katkı sağlar</div>
```

Yapay Zeka Görünürlük Analizi kartına:
```html
<div class="ai-badge aibadge-highlight">⚡ Bu hizmet AI Visibility'nin temelidir</div>
```

---

## DEĞİŞİKLİK 6 — AI Visibility Sayfası Tam Yeniden Yazım

**Mevcut içeriği tamamen şununla değiştir:**

```html
<section class="page-hero">
  <p class="page-label">YAPAY ZEKA & DİJİTAL GÖRÜNÜRLÜK</p>
  <h1>AI Visibility Nedir ve Senin İşin İçin Neden Önemli?</h1>
  <p class="page-subtitle">
    Müşterilerin Google'dan önce ChatGPT'ye soruyor. Peki seni buluyor mu?
  </p>
</section>

<section class="explainer-block">
  <h2>Önce şunu düşün</h2>
  <div class="scenario-card">
    <p>
      Bir girişimci "İstanbul'da iyi bir marka danışmanı var mı?" diye ChatGPT'ye soruyor.<br/><br/>
      ChatGPT birkaç isim sıralıyor. Bu isimler kimler? <strong>Hakkında yeterli, doğru ve tutarlı içerik olan markalar.</strong><br/><br/>
      Hakkında içerik yoksa, yokmuşsun gibi davranıyor.
    </p>
  </div>
</section>

<section class="explainer-block">
  <h2>AI sistemleri bilgiyi nereden öğreniyor?</h2>
  <p>
    ChatGPT, Claude, Perplexity gibi yapay zeka sistemleri sana bir şey sormadı —
    zaten web sitelerinden, sosyal medyadan, bloglardan öğrendiler.
    Eğer markan bu kaynaklarda doğru şekilde yer almıyorsa, AI seni ya hiç bilmiyor ya da yanlış tanıtıyor.
  </p>
  <div class="platform-grid">
    <div class="platform-card"><strong>ChatGPT</strong><p>GPT-4 ile gelişmiş arama entegrasyonu</p></div>
    <div class="platform-card"><strong>Perplexity</strong><p>Real-time web araması + AI yanıtı</p></div>
    <div class="platform-card"><strong>Claude</strong><p>Anthropic'in AI asistanı</p></div>
    <div class="platform-card"><strong>Google AI</strong><p>AI Overviews ile arama sonuçları değişiyor</p></div>
  </div>
</section>

<section class="explainer-block">
  <h2>Zero-click nedir? Neden önemli?</h2>
  <p>
    Artık kullanıcılar arama yapıp sitelere girmiyor.
    AI direkt yanıt veriyor, kullanıcı tıklamıyor.
    Bu yüzden site trafiği yetmez — <strong>AI'ın yanıtında yer almak</strong> gerekiyor.
  </p>
</section>

<section class="explainer-block">
  <h2>Sosyal Medya, SEO ve İçerik hâlâ neden önemli?</h2>
  <p>
    Çünkü AI bu kaynakları kullanıyor. Instagram paylaşımların,
    LinkedIn yazıların, blog içeriklerin — bunlar AI'ın seni tanımasının ham maddesi.
    Bu yüzden sıradan sosyal medya değil, <strong>AI'a da konuşan içerik</strong> üretmek gerekiyor.
  </p>
  <div class="channel-list">
    <div class="channel-item">
      <strong>Google & Arama</strong>
      <span>SEO ve organik görünürlük hâlâ kritik temel</span>
    </div>
    <div class="channel-item">
      <strong>Instagram & Sosyal</strong>
      <span>Güçlü marka kimliği ve sosyal kanıt</span>
    </div>
    <div class="channel-item">
      <strong>Blog & İçerik</strong>
      <span>AI'ın en çok besleneceği kaynak</span>
    </div>
  </div>
</section>

<section class="explainer-block">
  <h2>Şimdiden hazırlanmak neden önemli?</h2>
  <p>
    AI araması bugün erken davrananların oyunu.
    Rakiplerin henüz bu alanda yok. Şimdi başlayan markalar
    AI sistemlerinde yer edinip önde başlıyor.
    Bir yıl sonra herkes yapıyor olacak.
  </p>
</section>

<section class="how-i-help">
  <h2>Ben nasıl yardımcı oluyorum?</h2>
  <div class="help-cards">
    <div class="help-card">
      <span class="help-icon">🔍</span>
      <h3>Ön Analiz</h3>
      <p>Markanın Google ve yapay zeka sistemlerindeki mevcut görünümünü ve eksiklerini tespit ediyorum.</p>
      <div class="tags"><span>Durum Tespiti</span><span>Boşluk Analizi</span></div>
    </div>
    <div class="help-card">
      <span class="help-icon">📋</span>
      <h3>Strateji</h3>
      <p>Sosyal medya ve içerik planın üzerine yapay zeka dostu bir strateji geliştiriyorum.</p>
      <div class="tags"><span>İçerik Planı</span><span>Yayın Takvimi</span></div>
    </div>
    <div class="help-card">
      <span class="help-icon">🚀</span>
      <h3>Uygulama</h3>
      <p>İçerik üretimi, sosyal medya yönetimi ve SEO optimizasyonunu yürütüyorum.</p>
      <div class="tags"><span>Yönetim</span><span>Optimizasyon</span></div>
    </div>
  </div>
</section>

<section class="cta-section">
  <h2>AI Visibility yolculuğunuza başlayın</h2>
  <p>Markanızın AI çağında görünür olmasını sağlayalım.</p>
  <a href="/iletisim" class="btn-primary">İletişime Geç</a>
</section>
```

---

## DEĞİŞİKLİK 7 — FAQ Bölümü (Ana Sayfa veya AI Visibility Sayfasına Ekle)

```html
<section class="faq-section">
  <p class="section-label">SIKÇA SORULANLAR</p>
  <h2>Aklındaki sorular</h2>

  <div class="faq-list">
    <details class="faq-item">
      <summary>Bu sadece SEO ile aynı şey mi?</summary>
      <p>
        SEO Google için optimize etmek demek. AI Visibility ise ChatGPT, Claude,
        Perplexity gibi yapay zeka sistemlerinin seni tanıması ve önermesi için
        içerik ve marka yapısını düzenlemek. İkisi birbirini tamamlıyor — biri olmadan
        diğeri eksik kalıyor.
      </p>
    </details>

    <details class="faq-item">
      <summary>Küçük işletmem için gerekli mi?</summary>
      <p>
        Özellikle küçük işletmeler için kritik. Büyük markalar zaten her yerde var —
        küçük işletmeler AI'da erken görünür olarak büyük rakiplerle eşit şansa sahip olabilir.
        Üstelik sosyal medya yönetiminizi de beraber yapıyoruz, yani iki işi tek yerden çözüyorsunuz.
      </p>
    </details>

    <details class="faq-item">
      <summary>Sonuçları ne zaman görürüm?</summary>
      <p>
        SEO ve AI görünürlüğü orta-uzun vadeli yatırımlar. İlk 2-3 ayda içerik altyapısı
        kurulur, 3-6 ay içinde AI sistemlerinde marka adı görünmeye başlar.
        Sosyal medya yönetimi sonuçları çok daha hızlı — ilk aydan itibaren etkileşim artışı görülür.
      </p>
    </details>

    <details class="faq-item">
      <summary>Sadece sosyal medya yönetimi alabilir miyim?</summary>
      <p>
        Evet, ama şunu söyleyeyim: tek başına sosyal medya yönetimi aldığında
        yine de AI görünürlüğüne katkı sağlayan içerikler üretiyorum.
        Çünkü "sıradan sosyal medya" değil, markanı hem insanlara hem AI'a anlatan içerik yapıyorum.
      </p>
    </details>
  </div>
</section>
```

---

## DEĞİŞİKLİK 8 — Performance & Core Web Vitals

1. Tüm `<img>` taglerini kontrol et, `loading="lazy"` ve `alt` attribute eksikse ekle
2. Hero'daki ana görsele `loading="eager"` ve `fetchpriority="high"` ekle
3. Fontlar için `<link rel="preconnect">` varsa koru, yoksa ekle
4. Görseller WebP formatında değilse dönüştür veya `<picture>` ile WebP versiyonu sun

---

## DEĞİŞİKLİK 9 — İç Linkleme

**Ana sayfadan şu iç linkleri kontrol et / ekle:**
- Hero CTA → `/iletisim`
- "AI Visibility Nedir?" butonu → `/ai-visibility`
- Hizmet kartları → `/hizmetler`
- Portfolyo kartları → `/portfolyo`

**Anchor text'ler şöyle olsun (keyword içermeli):**
- "AI visibility danışmanlığı hakkında bilgi al" (generic "tıkla" değil)
- "Tüm hizmetleri incele"
- "Portfolyoyu gör"

---

## NOTLAR
- Tüm değişiklikleri yaptıktan sonra `git diff` ile kontrol et
- Varsa Lighthouse ile Core Web Vitals skorunu test et
- Vercel'e deploy etmeden önce mobile görünümü kontrol et
- `sitemap.xml` yoksa oluştur ve tüm sayfaları ekle
- `robots.txt` yoksa oluştur: `User-agent: * / Allow: /`
