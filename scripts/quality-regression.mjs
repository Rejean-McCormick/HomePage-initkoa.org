import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const read = (p) => fs.readFileSync(path.join(process.cwd(), p), 'utf8');
const json = (p) => JSON.parse(read(p));
const files = ['inventory.articles.catalog.json', 'inventory.audio.catalog.json', 'inventory.code-tech.catalog.json', 'inventory.youtube.catalog.json'];
const ids = new Set(); let resourceCount = 0;
for (const file of files) {
  const catalog = json(`public/${file}`);
  assert.ok(Array.isArray(catalog.items), `${file} has items`);
  for (const item of catalog.items) {
    assert.ok(item.id && item.title && item.url, `${file}: valid item`);
    if (!ids.has(item.id)) resourceCount++;
    ids.add(item.id);
  }
}
assert.ok(resourceCount > 0, 'SSR catalog can include actual items');
assert.ok(read('app/play/page.tsx').includes('initialParts'), 'play is server seeded');
assert.ok(read('lib/reading/queries.ts').includes('PUBLIC_READING_EXCLUDED_SLUGS'), 'test fixture excluded');
assert.ok(read('components/reading/ReadingToc.tsx').includes('<details'), 'TOC collapsible');
const packs = json('public/context-packs/index.json').packs;
assert.ok(packs.some(p => p.sha256 && p.sourceCommit && p.generatedAt), 'pack provenance present');
for (const theme of ['koa-mark.svg','koa-mark-dark.svg','koa-mark-neon.svg']) assert.ok(read(`public/${theme}`).startsWith('<svg'), `${theme} exists`);
for (const p of ['app/privacy/page.tsx', 'app/fr/page.tsx']) assert.ok(fs.existsSync(p), `${p} exists`);
console.log(`PASS: ${resourceCount} distinct catalog resources, test fixture hidden, headings/provenance/assets/pages checks.`);
