#!/usr/bin/env node
/** Quick OG meta check for TR vs EN homepages. Run: node scripts/check-og.mjs */
const URLS = [
  { label: 'TR Ana Sayfa', url: 'https://nurdai.com/' },
  { label: 'EN Homepage', url: 'https://nurdai.com/en/' },
];

function pick(html, prop) {
  const re = new RegExp(`<meta[^>]+property="${prop}"[^>]+content="([^"]*)"`, 'i');
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${prop}"`, 'i');
  return html.match(re2)?.[1] || '—';
}

async function checkImage(url) {
  const r = await fetch(url, { method: 'HEAD' });
  const len = r.headers.get('content-length');
  return { status: r.status, len };
}

for (const { label, url } of URLS) {
  const r = await fetch(url);
  const html = await r.text();
  const title = pick(html, 'og:title');
  const desc = pick(html, 'og:description');
  const image = pick(html, 'og:image');
  const locale = pick(html, 'og:locale');
  const img = await checkImage(image);
  console.log(`\n=== ${label} ===`);
  console.log('og:locale     ', locale);
  console.log('og:title      ', title);
  console.log('og:description', desc.slice(0, 80) + (desc.length > 80 ? '…' : ''));
  console.log('og:image      ', image, `(${img.status}, ${img.len} bytes)`);
}
