#!/usr/bin/env node
/**
 * Sync blog post SEO: hreflang, BlogPosting schema, article-related script.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogDir = path.join(root, 'blog');

const posts = [
  {
    file: 'ai-visibility-seo-fark.html',
    slug: 'ai-visibility-seo-fark',
    headline: 'AI Visibility ile SEO Arasındaki Fark',
    description: 'Arama motorlarında sıralanmak ile yapay zeka sistemlerinde referans gösterilmek aynı şey değil. AI Visibility ile SEO arasındaki temel farklar ve neden ikisi birlikte gerekli.',
    date: '2026-05-08',
    category: 'AI Visibility',
  },
  {
    file: 'chatgpt-perplexity-marka-gorunurlugu.html',
    slug: 'chatgpt-perplexity-marka-gorunurlugu',
    headline: "ChatGPT ve Perplexity'de Marka Görünürlüğü Nasıl Sağlanır?",
    description: "AI arama motorları kaynak seçerken hangi kriterleri kullanıyor? 5 adımlı pratik strateji.",
    date: '2026-04-24',
    category: 'AI Visibility',
  },
  {
    file: 'geo-nedir-generative-engine-optimization.html',
    slug: 'geo-nedir-generative-engine-optimization',
    headline: 'GEO Nedir? Generative Engine Optimization Rehberi',
    description: 'Yapay zeka sistemlerinin içerikleri nasıl seçip sunduğunu anlayan yeni bir disiplin.',
    date: '2026-04-10',
    category: 'GEO',
  },
];

function buildSchema(p) {
  const url = `https://nurdai.com/blog/${p.slug}`;
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": ${JSON.stringify(p.headline)},
  "description": ${JSON.stringify(p.description)},
  "url": ${JSON.stringify(url)},
  "mainEntityOfPage": { "@type": "WebPage", "@id": ${JSON.stringify(url)} },
  "datePublished": ${JSON.stringify(p.date)},
  "dateModified": ${JSON.stringify(p.date)},
  "inLanguage": "tr-TR",
  "articleSection": ${JSON.stringify(p.category)},
  "image": "https://nurdai.com/assets/images/og-social-tr.jpg",
  "author": {
    "@type": "Person",
    "@id": "https://nurdai.com/#person",
    "name": "Nurdan Çetin",
    "url": "https://nurdai.com/hakkimda"
  },
  "publisher": {
    "@type": "Organization",
    "@id": "https://nurdai.com/#organization",
    "name": "Nurdai",
    "url": "https://nurdai.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nurdai.com/assets/images/nurdai-icon-512.png"
    }
  },
  "isPartOf": {
    "@type": "Blog",
    "name": "Nurdai Blog",
    "url": "https://nurdai.com/blog/"
  }
}
</script>`;
}

function syncPost(p) {
  const filePath = path.join(blogDir, p.file);
  let html = fs.readFileSync(filePath, 'utf8');
  const url = `https://nurdai.com/blog/${p.slug}`;

  html = html.replace(
    /<link rel="alternate" hreflang="tr" href="[^"]*">\s*\n<link rel="alternate" hreflang="en" href="[^"]*">\s*\n<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    `<link rel="alternate" hreflang="tr" href="${url}">\n<link rel="alternate" hreflang="en" href="${url}">\n<link rel="alternate" hreflang="x-default" href="${url}">`
  );

  html = html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "Article"[\s\S]*?<\/script>/,
    buildSchema(p)
  );

  if (!html.includes('article-related.js')) {
    html = html.replace(
      '<script src="/assets/main.js" defer></script>',
      '<script src="/assets/article-related.js" defer></script>\n<script src="/assets/main.js" defer></script>'
    );
  }

  fs.writeFileSync(filePath, html);
  console.log('Updated', p.file);
}

posts.forEach(syncPost);
console.log('Blog SEO sync complete.');
