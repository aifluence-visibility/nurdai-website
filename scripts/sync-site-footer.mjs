#!/usr/bin/env node
/** Replace inline footers with injectable empty footer (site-footer.js injects content) */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FOOTER_EMPTY = '<footer role="contentinfo"></footer>';

const FOOTER_PATTERNS = [
  /<!-- FOOTER -->\s*<footer role="contentinfo">[\s\S]*?<\/footer>/,
  /<footer role="contentinfo">\s*<div class="con">[\s\S]*?<div class="footer-grid">[\s\S]*?<\/footer>/
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'admin' || name === 'node_modules') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith('.html')) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(root)) {
  if (file.includes('/admin/')) continue;
  let html = readFileSync(file, 'utf8');
  if (!html.includes('site-footer.js')) continue;
  if (html.includes('<footer role="contentinfo"></footer>') && !html.includes('footer-grid')) continue;

  let updated = html;
  for (const re of FOOTER_PATTERNS) {
    if (re.test(updated)) {
      updated = updated.replace(re, FOOTER_EMPTY);
      break;
    }
  }
  if (updated === html) continue;
  if (!updated.includes('site-footer.js')) {
    console.warn('skip (no site-footer.js):', file);
    continue;
  }
  writeFileSync(file, updated);
  count++;
  console.log('✓', file.replace(root + '/', ''));
}
console.log(`\nSynced footer on ${count} pages.`);
