#!/usr/bin/env node
/**
 * MOTOR Pakistan — automated SEO regression check.
 *
 * Usage:  node scripts/seo-audit.mjs [baseUrl]
 * Exits 1 when any blocking check fails, so it can gate a deploy.
 */

const BASE = (process.argv[2] || process.env.AUDIT_URL || 'http://localhost:3000').replace(/\/$/, '');
const PROD_DOMAIN = 'https://motor.wordbitxtech.com';

let pass = 0;
const failures = [];
const warnings = [];

const ok = (m) => { pass++; };
const bad = (m) => { failures.push(m); };
const warn = (m) => { warnings.push(m); };

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  const body = res.status < 400 ? await res.text() : '';
  return { status: res.status, body, headers: res.headers };
}

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim();
const titleOf = (h) => pick(h, /<title>([^<]*)<\/title>/i);
const descOf = (h) => pick(h, /<meta name="description" content="([^"]*)"/i);
const canonOf = (h) => pick(h, /<link rel="canonical" href="([^"]*)"/i);
const h1sOf = (h) => [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1].replace(/<[^>]*>/g, '').trim());
const isNoindex = (h) => /<meta name="robots"[^>]*content="[^"]*noindex/i.test(h);

/* Pages that must be indexable and complete. */
const CORE = [
  '/', '/cars', '/bikes', '/brands', '/compare', '/blog', '/reviews',
  '/new-cars-2026', '/new-bikes-2026',
  '/electric-cars-pakistan', '/hybrid-cars-pakistan', '/used-cars-lahore',
  '/brands/toyota', '/brands/honda', '/brands/suzuki',
  '/cars/toyota/corolla', '/cars/toyota/fortuner', '/cars/toyota/yaris',
  '/cars/honda/civic', '/cars/suzuki/alto',
  '/bikes/honda-bikes/cd-70', '/bikes/yamaha/ybr-125',
  '/about', '/contact', '/editorial-policy', '/disclaimer', '/privacy', '/terms',
];

const SITEMAPS = ['pages', 'brands', 'cars', 'bikes', 'news', 'cities'];

async function run() {
  console.log(`\nSEO audit → ${BASE}\n${'─'.repeat(60)}`);

  /* 1. robots.txt */
  const robots = await get('/robots.txt');
  robots.status === 200 ? ok() : bad('robots.txt not reachable');
  if (robots.body.includes('Sitemap:')) ok(); else bad('robots.txt missing Sitemap directive');
  if (/Disallow:\s*\/(cars|bikes|brands)\b/.test(robots.body)) bad('robots.txt blocks public sections'); else ok();

  /* 2. Sitemaps */
  const index = await get('/sitemap.xml');
  index.status === 200 && index.body.includes('sitemapindex') ? ok() : bad('sitemap.xml is not a valid index');

  const allUrls = new Set();
  for (const name of SITEMAPS) {
    const sm = await get(`/sitemap-${name}.xml`);
    if (sm.status !== 200) { bad(`sitemap-${name}.xml unreachable`); continue; }
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!locs.length) { bad(`sitemap-${name}.xml is empty`); continue; }
    locs.forEach((l) => allUrls.add(l));
    if (locs.every((l) => l.startsWith(PROD_DOMAIN))) ok();
    else bad(`sitemap-${name}.xml contains non-production URLs`);
  }
  console.log(`  sitemap URLs: ${allUrls.size}`);

  /* 3. No dev/preview domain leakage */
  const home = await get('/');
  if (/e2b\.app|localhost:3000/.test(home.body.replace(/"__next[^"]*"/g, ''))) {
    warn('preview/localhost URL appears in homepage HTML');
  } else ok();

  /* 4. Per-page checks */
  const titles = new Map();
  const descs = new Map();

  for (const path of CORE) {
    const r = await get(path);
    if (r.status !== 200) { bad(`${path} → HTTP ${r.status}`); continue; }
    ok();

    const t = titleOf(r.body);
    const d = descOf(r.body);
    const c = canonOf(r.body);
    const h1 = h1sOf(r.body);

    if (!t) bad(`${path} missing <title>`); else {
      ok();
      if (titles.has(t)) bad(`duplicate title: "${t}" on ${path} and ${titles.get(t)}`);
      else titles.set(t, path);
      if (t.length > 65) warn(`${path} title is ${t.length} chars (>65)`);
    }

    if (!d) bad(`${path} missing meta description`); else {
      ok();
      if (descs.has(d)) bad(`duplicate meta description on ${path} and ${descs.get(d)}`);
      else descs.set(d, path);
      if (d.length > 165) warn(`${path} meta description is ${d.length} chars (>165)`);
    }

    if (!c) bad(`${path} missing canonical`);
    else if (!c.startsWith(PROD_DOMAIN)) bad(`${path} canonical not on production domain (${c})`);
    else ok();

    if (h1.length === 0) bad(`${path} has no H1`);
    else if (h1.length > 1) bad(`${path} has ${h1.length} H1 tags`);
    else ok();

    if (isNoindex(r.body)) bad(`${path} is NOINDEX but should be indexable`); else ok();

    if (!/property="og:title"/.test(r.body)) warn(`${path} missing og:title`);
    if (/<img(?![^>]*\balt=)/i.test(r.body)) warn(`${path} has image(s) without alt`);
  }

  /* 5. Structured data */
  const sd = (h, type) => h.includes(`"${type}"`);
  if (sd(home.body, 'WebSite') && sd(home.body, 'Organization')) ok(); else bad('homepage missing WebSite/Organization schema');
  if (home.body.includes('SearchAction')) ok(); else warn('homepage missing SearchAction');
  if (sd(home.body, 'FAQPage')) ok(); else warn('homepage missing FAQPage schema');

  const model = await get('/cars/toyota/corolla');
  ['Car', 'BreadcrumbList', 'FAQPage'].forEach((t) =>
    sd(model.body, t) ? ok() : bad(`model page missing ${t} schema`)
  );

  /* 6. Placeholder / fake-data scan */
  const BANNED = [
    'demonstration platform', 'sample listing', 'for presentation purposes',
    'lorem ipsum', 'Lorem Ipsum', '+92 300 1234567', 'example.com',
  ];
  for (const path of ['/', '/cars', '/bikes', '/brands/toyota', '/cars/toyota/corolla']) {
    const r = await get(path);
    const hit = BANNED.filter((b) => r.body.includes(b));
    hit.length ? bad(`${path} contains placeholder text: ${hit.join(', ')}`) : ok();
  }

  /* 7. 404 */
  const nf = await get('/cars/toyota/definitely-not-a-model');
  nf.status === 404 ? ok() : bad(`missing model page returned ${nf.status}, expected 404`);

  /* 8. Redirects resolve to canonical targets */
  for (const [from, to] of [
    ['/new-cars', '/new-cars-2026'],
    ['/electric-cars', '/electric-cars-pakistan'],
    ['/news', '/blog'],
    ['/privacy-policy', '/privacy'],
  ]) {
    const r = await get(from);
    const loc = r.headers.get('location') || '';
    if ([301, 308].includes(r.status) && loc.includes(to)) ok();
    else bad(`${from} should 301 → ${to} (got ${r.status} ${loc})`);
  }

  /* Report */
  console.log(`${'─'.repeat(60)}`);
  if (warnings.length) {
    console.log(`\n⚠  ${warnings.length} warning(s):`);
    warnings.slice(0, 15).forEach((w) => console.log(`   • ${w}`));
  }
  if (failures.length) {
    console.log(`\n✗  ${failures.length} failure(s):`);
    failures.forEach((f) => console.log(`   • ${f}`));
    console.log(`\nPASS ${pass}  FAIL ${failures.length}\n`);
    process.exit(1);
  }
  console.log(`\n✓ All checks passed — PASS ${pass}, WARN ${warnings.length}\n`);
}

run().catch((e) => { console.error(e); process.exit(1); });
