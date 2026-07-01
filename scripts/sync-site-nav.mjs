#!/usr/bin/env node
/** Replace inline nav with injectable placeholders + site-nav.js on all public pages */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const NAV_PLACEHOLDER = `<!-- NAV -->
<nav class="nav" id="main-nav"></nav>
<div class="mob-menu" id="mob-menu"></div>
<script src="/assets/site-nav.js"></script>`;

const NAV_PATTERNS = [
  /<!-- NAV -->[\s\S]*?<div class="mob-menu" id="mob-menu">[\s\S]*?<\/div>/,
  /<nav class="nav" id="main-nav">[\s\S]*?<\/nav>\s*\n*<div class="mob-menu" id="mob-menu">[\s\S]*?<\/div>/
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
  if (!html.includes('id="main-nav"')) continue;
  if (html.includes('site-nav.js') && html.includes('<nav class="nav" id="main-nav"></nav>')) continue;

  let updated = html;
  for (const re of NAV_PATTERNS) {
    if (re.test(updated)) {
      updated = updated.replace(re, NAV_PLACEHOLDER);
      break;
    }
  }
  if (updated === html) continue;
  writeFileSync(file, updated);
  count++;
  console.log('✓', file.replace(root + '/', ''));
}
console.log(`\nSynced nav on ${count} pages.`);
