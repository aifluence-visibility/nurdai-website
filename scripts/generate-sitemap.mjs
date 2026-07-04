#!/usr/bin/env node
/**
 * Regenerates sitemap.xml from static pages + published blog posts + guest articles.
 *
 * Usage: node scripts/generate-sitemap.mjs
 *        npm run sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function toLoc(baseUrl, urlPath) {
  if (urlPath === '/') return `${baseUrl}/`;
  const normalized = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  return `${baseUrl}${normalized}`;
}

function maxDate(...dates) {
  return dates.filter(Boolean).sort().pop();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
    `    <changefreq>${escapeXml(changefreq)}</changefreq>`,
    `    <priority>${escapeXml(priority)}</priority>`,
    '  </url>'
  ].join('\n');
}

export function generateSitemap({ write = true, log = true } = {}) {
  const staticConfig = readJson('content/sitemap-static.json');
  const blogData = readJson('content/blog.json');
  const mediaData = readJson('content/media.json');
  const baseUrl = staticConfig.baseUrl.replace(/\/$/, '');

  const publishedPosts = (blogData.posts || []).filter(post => post.published !== false);
  const latestBlogDate = maxDate(...publishedPosts.map(post => post.date)) || new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const entries = [];

  for (const page of staticConfig.pages) {
    const lastmod = page.dynamicLastmod === 'blog'
      ? maxDate(page.lastmod, latestBlogDate, today)
      : page.lastmod;

    entries.push({
      loc: toLoc(baseUrl, page.path),
      lastmod,
      changefreq: page.changefreq,
      priority: page.priority
    });
  }

  for (const post of publishedPosts) {
    const postPath = path.join(root, 'blog', `${post.slug}.html`);
    if (!fs.existsSync(postPath)) {
      console.warn(`⚠ blog/${post.slug}.html bulunamadı — yine de sitemap'e eklendi`);
    }

    entries.push({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.date || today,
      changefreq: 'weekly',
      priority: '0.8'
    });
  }

  for (const guest of mediaData.guestArticles || []) {
    const guestPath = guest.url.startsWith('http')
      ? guest.url
      : toLoc(baseUrl, guest.url);

    if (!guest.url.startsWith('http')) {
      const rel = guest.url.replace(/^\//, '');
      const htmlPath = path.join(root, rel.endsWith('.html') ? rel : `${rel}.html`);
      if (!fs.existsSync(htmlPath)) {
        console.warn(`⚠ ${guest.url} HTML bulunamadı — yine de sitemap'e eklendi`);
      }
    }

    entries.push({
      loc: guestPath,
      lastmod: guest.date || today,
      changefreq: 'monthly',
      priority: '0.75'
    });
  }

  const unique = new Map();
  for (const entry of entries) {
    unique.set(entry.loc, entry);
  }

  const sorted = [...unique.values()].sort((a, b) => a.loc.localeCompare(b.loc));
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    ...sorted.map(entry => urlEntry(entry)),
    '',
    '</urlset>',
    ''
  ].join('\n');

  if (write) {
    fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
  }

  if (log) {
    console.log(`✓ sitemap.xml — ${sorted.length} URL`);
    console.log(`  • ${staticConfig.pages.length} statik sayfa`);
    console.log(`  • ${publishedPosts.length} blog yazısı`);
    console.log(`  • ${(mediaData.guestArticles || []).length} konuk yazısı`);
  }

  return { xml, count: sorted.length };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  generateSitemap();
}
