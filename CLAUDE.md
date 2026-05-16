# NURDAI Website — Claude Code Talimatları

Bu dosya, NURDAI websitesi üzerinde çalışan Claude Code oturumları için
bağlayıcı kurallardır. Aşağıdaki tüm talimatlar varsayılan davranışları
**geçersiz kılar** — tam olarak uygulanmalıdır.

---

## 1. PROJE BAĞLAMI

**Marka:** NURDAI  
**Kategori:** Stratejik dijital görünürlük stüdyosu  
**Referans markalar:** Linear, Stripe, Vercel, Notion (ton ve positioning için)

### Ana Positioning

> "Markaların dijital görünürlüğünü arama motorları ve yeni nesil AI sistemleri
> için yapılandıran stratejik dijital görünürlük stüdyosu."

Site "hizmet satan biri" gibi değil, "yeni nesil dijital görünürlük altyapısı
kuran stratejik partner" gibi hissettirmelidir.

---

## 2. TON KURALLARI

### Kaçınılacak ton

- Aşırı satış odaklı dil
- Korku pazarlaması ("rakipleriniz sizi geçiyor", "seni buluyor mu?")
- Fazla samimi veya esnaf ağzı
- Öğretici blog dili
- "hazırlıyorum", "yardımcı oluyorum" gibi freelancer ifadeleri
- Klasik ajans klişeleri

### İstenen ton

- Sakin
- Premium
- Stratejik
- Modern
- Güven veren
- AI-native
- Minimal ama güçlü

### Konumlandırma

Site şu kategorilerde **görünmemeli:**

- Sosyal medya ajansı
- SEO ajansı
- Freelancer portfolyosu

---

## 3. MENÜ YAPISI

Navigasyonda tam olarak şu linkler yer almalıdır:

| Label                   | Path                    |
|-------------------------|-------------------------|
| Ana Sayfa               | `/`                     |
| Yapay Zeka Görünürlüğü  | `/yapay-zeka-gorunurlugu` |
| Hizmetler               | `/hizmetler`            |
| Portfolyo               | `/portfolyo`            |
| Hakkımda                | `/hakkimda`             |
| Medya                   | `/medya`                |
| İletişim                | `/iletisim`             |

"AI Visibility" adlı menü öğesi **kaldırılmalıdır**.

---

## 4. SAYFA BAZLI TALIMATLAR

### 4.1 Hero Section

Ana başlık **kesin ve değişmez:**

```
Markanı hem insanlar hem yapay zeka önersin.
```

Alt açıklama:

```
Markanızın dijital görünürlüğünü arama motorları, sosyal platformlar
ve yeni nesil yapay zeka sistemleri için yapılandırıyoruz.
```

CTA butonları:

- Birincil: **Hizmetleri İncele**
- İkincil: **Yapay Zeka Görünürlüğü**

Kuralllar:
- Hero daha premium ve landing-page hissinde olmalı
- Fazla açıklayıcı bloklar sadeleştirilmeli
- Daha az metin, daha güçlü statement

### 4.2 Ana Sayfa Genel Yapısı

Ana sayfanın amacı öğretmek değil, şunları aktarmaktır:

1. Positioning
2. Vizyon
3. Güven
4. Modern görünürlük dönüşümünü anlatmak

**Kural:** Daha az açıklama. Daha güçlü statement'lar.  
Fake case study veya uydurma başarı hikayesi **eklenmeyecek.**

Bunun yerine insight-driven bloklar:

- Zero-click behavior
- AI discovery systems
- Conversational search
- AI-generated recommendations
- Search evolution

### 4.3 Yapay Zeka Görünürlüğü Sayfası

Bu sayfa "AI Visibility nedir?" anlatan blog gibi **olmayacak.**

**Section 1**

```
Başlık: Search değişiyor. Görünürlük de değişiyor.

Açıklama: Arama artık yalnızca Google'dan ibaret değil.
ChatGPT, Perplexity ve AI sistemleri markaların keşfedildiği
yeni discovery katmanı haline geliyor.
```

**Section 2**

```
Başlık: Yeni nesil görünürlük modeli

Grid (4 kart):
- Google Search
- AI Overviews
- ChatGPT
- Perplexity

Stil: Minimal modern görünüm.
```

**Section 3**

```
Başlık: Visibility Signals

4 kart — kısa premium açıklamalar:

Structured Content
→ AI sistemlerinin markayı daha doğru anlamasını sağlayan içerik yapısı.

Semantic Authority
→ Belirli konularda dijital otorite ve anlam bütünlüğü oluşturma.

Entity Consistency
→ Platformlar arasında tutarlı marka sinyalleri oluşturma.

AI-Readable Architecture
→ AI sistemlerinin kolay okuyabildiği teknik görünürlük altyapısı.
```

**Section 4**

```
Başlık: Yapay Zeka Görünürlüğü yaklaşımı

Açıklama: SEO, içerik, GEO (Generative Engine Optimization),
semantic structure ve dijital otorite sinyallerini birlikte yapılandıran
yeni nesil görünürlük sistemi.
```

### 4.4 Hizmetler Sayfası

Klasik ajans hizmet listesi **olmayacak.** Her hizmet stratejik isimlendirilmeli.

```
Yapay Zeka Görünürlüğü
→ AI sistemlerinde marka görünürlüğü ve discoverability optimizasyonu.

SEO & GEO
→ Arama motorları ve generative AI sistemleri için optimize edilmiş
  görünürlük altyapısı.

İçerik & Semantic Structure
→ AI-readable içerik yapıları ve semantic authority sistemleri.

Sosyal Medya & Discovery
→ Sosyal platformlarda görünürlük, içerik stratejisi ve dijital sinyal güçlendirme.

Dijital Marka Altyapısı
→ Modern dijital görünürlük için teknik ve stratejik marka yapılanması.
```

---

## 5. SEO & TEKNİK GEREKSİNİMLER

Her sayfa için zorunlu:

- Unique `<title>` tag
- Unique `<meta name="description">`
- Semantic heading hierarchy (tek `<h1>`, hiyerarşik `<h2>`/`<h3>`)
- Schema.org markup (Organization, WebPage, BreadcrumbList)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Lazy loading (`loading="lazy"` veya Next.js `Image` component)
- Internal linking
- Structured semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`)

### Ana Keyword Yapıları

- yapay zeka görünürlüğü
- SEO & GEO
- dijital görünürlük
- AI discoverability
- semantic authority

---

## 6. TASARIM PRENSİPLERİ

### Korunacaklar

- Mevcut dark premium UI
- Renk paleti ve brand token'lar
- Mevcut component sistemi

### İyileştirilecekler

| Kural | Açıklama |
|-------|----------|
| Spacing | Daha fazla whitespace, section'lar arasında nefes |
| Text yoğunluğu | Daha az — her cümle zorunlu olmalı |
| Typography hierarchy | Daha güçlü — başlıklar baskın, body sakin |
| Section flow | Minimal — bloklar birbirini tekrar etmemeli |

### Yasak Değişiklikler

- Renk şemasını değiştirme
- Font sistemini değiştirme
- Temel layout/grid yapısını kırma
- Varolan component API'lerini bozma

---

## 7. GENEL YAZIM KURALLARI

- Türkçe içerik için resmi ama sıcak ton — "siz" hitabı
- Noktalama işaretlerinden sonra tek boşluk
- Başlıklarda büyük harf: yalnızca ilk kelime (Türkçe kuralı)
- İngilizce teknik terimler (SEO, GEO, AI) olduğu gibi korunur
- Hiçbir içerikte "biz" yerine marka adı veya pasif yapı tercih edilir
