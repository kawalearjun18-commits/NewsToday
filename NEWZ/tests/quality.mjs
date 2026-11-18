import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
assert.ok(fs.existsSync(dist), 'dist/ is missing; run npm run build first');

const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
}
walk(dist);
assert.ok(files.length > 0, 'built output has no HTML pages');

const read = (file) => fs.readFileSync(file, 'utf8');
const attr = (html, pattern) => html.match(pattern)?.[1] ?? '';
const text = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const localized = files.filter((file) => /[\\/]dist[\\/](en|hi)[\\/]/.test(file));
const articleFiles = localized.filter((file) => file.includes(`${path.sep}article${path.sep}`));
const titles = new Set();
const descriptions = new Set();
const articleBodies = new Map();
const allowedHindiLatin = new Set(['News', 'Today', 'Bhagalpur', 'BHAGALPUR', 'Bihar', 'English', 'EN', 'HI', 'TODO_VERIFY', 'URL']);

for (const file of files) {
  const html = read(file);
  const lang = html.match(/<html[^>]+lang="([^"]+)"/)?.[1];
  assert.ok(lang === 'en' || lang === 'hi', `${file}: missing supported html lang`);

  const visible = text(html);
  if (visible.includes('TODO_VERIFY')) {
    assert.match(html, /<meta\s+name="robots"\s+content="noindex,follow"/i, `${file}: TODO_VERIFY page must be noindex`);
  }
  if (localized.includes(file) && lang === 'en') {
    assert.doesNotMatch(visible, /[\u0900-\u097F]/, `${file}: English page contains Devanagari`);
  } else if (localized.includes(file) && lang === 'hi') {
    for (const token of visible.match(/[A-Za-z][A-Za-z_&.'-]*/g) ?? []) {
      assert.ok(allowedHindiLatin.has(token), `${file}: Hindi page contains non-allowlisted Latin token "${token}"`);
    }
  }

  const title = attr(html, /<title>([\s\S]*?)<\/title>/i);
  const description = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  assert.ok(title && title.length <= 60, `${file}: title missing or over 60 characters`);
  assert.ok(description && description.length <= 155, `${file}: description missing or over 155 characters`);
  assert.ok(!titles.has(title), `${file}: duplicate title "${title}"`);
  assert.ok(!descriptions.has(description), `${file}: duplicate meta description`);
  titles.add(title); descriptions.add(description);
  assert.ok(/<link\s+rel="canonical"\s+href="[^"]+"/i.test(html), `${file}: canonical missing`);
  for (const hreflang of ['en', 'hi', 'x-default']) {
    assert.ok(new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${hreflang}"`, 'i').test(html), `${file}: ${hreflang} hreflang missing`);
  }

  const titleVariants = [
    title,
    attr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i),
    attr(html, /<meta\s+name="twitter:title"\s+content="([^"]*)"/i)
  ];
  for (const variant of titleVariants) {
    assert.ok(variant.split(/\s+/).filter(Boolean).length >= 4, `${file}: title has fewer than 4 words`);
    assert.doesNotMatch(variant, /\b(?:a|an|the|of|to|for|and|in|on|with|from|के|का|की|और|में|से|पर)\s*[.!?]?$/i, `${file}: title ends with a dangling preposition`);
  }

  const schemas = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
  const types = new Set(schemas.map((schema) => schema['@type']));
  for (const required of ['Organization', 'LocalBusiness', 'BreadcrumbList']) assert.ok(types.has(required), `${file}: ${required} JSON-LD missing`);
  const organization = schemas.find((schema) => schema['@type'] === 'Organization');
  assert.ok(organization.name && organization.url && organization.logo, `${file}: Organization fields missing`);
  const localBusiness = schemas.find((schema) => schema['@type'] === 'LocalBusiness');
  assert.ok(localBusiness.name && localBusiness.url && localBusiness.areaServed && localBusiness.address, `${file}: LocalBusiness fields missing`);
  const breadcrumbs = schemas.find((schema) => schema['@type'] === 'BreadcrumbList');
  assert.ok(Array.isArray(breadcrumbs.itemListElement) && breadcrumbs.itemListElement.length > 0, `${file}: BreadcrumbList fields missing`);
  for (const item of breadcrumbs.itemListElement) assert.ok(item['@type'] === 'ListItem' && item.position && item.name && item.item, `${file}: invalid breadcrumb item`);

  if (articleFiles.includes(file)) {
    assert.match(html, /<meta\s+name="robots"\s+content="noindex,follow"/i, `${file}: TODO_VERIFY article must be noindex`);
    const articleSchema = schemas.find((schema) => schema['@type'] === 'NewsArticle');
    assert.ok(articleSchema, `${file}: NewsArticle JSON-LD missing`);
    for (const field of ['headline', 'description', 'datePublished', 'dateModified', 'author', 'publisher', 'image', 'mainEntityOfPage']) assert.ok(articleSchema[field], `${file}: NewsArticle ${field} missing`);
    const paragraphs = html.match(/<div class="article-body">([\s\S]*?)<\/div>/i)?.[1].match(/<p>([\s\S]*?)<\/p>/gi) ?? [];
    const normalized = paragraphs.map((paragraph) => paragraph.replace(/<[^>]+>/g, '').trim());
    assert.equal(new Set(normalized).size, normalized.length, `${file}: duplicate paragraphs within article`);
    articleBodies.set(file, normalized.join('\n'));
  }
}

const bodies = [...articleBodies.entries()];
for (let index = 0; index < bodies.length; index += 1) {
  for (let other = index + 1; other < bodies.length; other += 1) assert.notEqual(bodies[index][1], bodies[other][1], `identical article bodies: ${bodies[index][0]} and ${bodies[other][0]}`);
}

for (const file of files) {
  const html = read(file);
  for (const href of [...html.matchAll(/href="([^"]+)"/gi)].map((match) => match[1])) {
    if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/api/')) continue;
    const target = href.split(/[?#]/)[0].replace(/\/$/, '');
    const candidate = path.extname(target) ? path.join(dist, target.slice(1)) : target ? path.join(dist, target.slice(1), 'index.html') : path.join(dist, 'index.html');
    assert.ok(fs.existsSync(candidate), `${file}: broken internal link ${href}`);
  }
  for (const src of [...html.matchAll(/(?:src|srcset)="([^"]+)"/gi)].map((match) => match[1].split(',')[0].trim().split(' ')[0])) {
    if (!src.startsWith('/')) continue;
    assert.ok(fs.existsSync(path.join(dist, src.slice(1))), `${file}: broken image reference ${src}`);
  }
}

const newsSitemap = read(path.join(dist, 'google-news-sitemap.xml'));
assert.doesNotMatch(newsSitemap, /\/article\//, 'TODO_VERIFY articles must be excluded from news sitemap');
console.log(`Built-output quality checks passed: ${files.length} HTML pages, language purity, unique metadata, JSON-LD, links/images, article bodies, title safety, and news-sitemap exclusion.`);
