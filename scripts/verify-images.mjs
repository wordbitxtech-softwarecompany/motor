#!/usr/bin/env node
/**
 * MOTOR Pakistan — image integrity check.
 *
 * Guards against the production failure where images 404 on the deployed site
 * even though the build succeeded. It verifies:
 *
 *   1. Every local `/images/...` path referenced in source exists in `public/`.
 *   2. Case-sensitive filename matches (Linux/Vercel is case sensitive).
 *   3. Binary photos may only live in `public/images/vehicles/` (catalog JPEGs).
 *      Other binaries in `public/` fail the check.
 *   4. Every remote image host is declared in next.config.ts remotePatterns.
 *
 * Exit code 1 on any failure so it can gate a deploy.
 *   node scripts/verify-images.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, extname } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');

const fail = [];
const warn = [];
let checked = 0;

/* ── helpers ─────────────────────────────────────────── */

function walk(dir, exts, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (!exts || exts.includes(extname(entry))) out.push(full);
  }
  return out;
}

const isBinary = (file) => {
  const buf = readFileSync(file).subarray(0, 4);
  return (
    (buf[0] === 0x89 && buf[1] === 0x50) || // PNG
    (buf[0] === 0xff && buf[1] === 0xd8) || // JPEG
    (buf[0] === 0x52 && buf[1] === 0x49) || // WEBP/RIFF
    (buf[0] === 0x47 && buf[1] === 0x49)    // GIF
  );
};

/* ── 1. collect every public asset (case-exact) ──────── */

const publicFiles = new Set(
  walk(PUBLIC, null).map((f) => '/' + relative(PUBLIC, f).split(/[\\/]/).join('/'))
);

/* ── 2. scan source for image references ─────────────── */

const sourceFiles = walk(SRC, ['.ts', '.tsx', '.js', '.jsx', '.css', '.json']);
const LOCAL_RE = /["'`](\/(?:images|img|assets|media)\/[^"'`\s)]+\.(?:svg|png|jpe?g|webp|avif|gif))["'`]/gi;
const REMOTE_RE = /https?:\/\/([a-z0-9.-]+)\/[^"'`\s)]*\.(?:png|jpe?g|webp|avif|gif|svg)/gi;

const localRefs = new Map();   // path -> [files]
const referencedDynamic = new Set();
const remoteHosts = new Map(); // host -> count

for (const file of sourceFiles) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);

  for (const m of text.matchAll(LOCAL_RE)) {
    const p = m[1];
    if (p.includes('${')) continue; // dynamic path — resolved separately below
    if (p.startsWith('/media/')) continue; // same-origin CDN proxy, not a public file

    // Skip object KEYS (legacy-path lookup tables map these away, they are not
    // live references). A key is followed by a colon: '/old/path.jpg': NEW
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 2);
    if (/^\s*:/.test(after)) continue;

    if (!localRefs.has(p)) localRefs.set(p, []);
    localRefs.get(p).push(rel);
  }
  for (const m of text.matchAll(REMOTE_RE)) {
    remoteHosts.set(m[1], (remoteHosts.get(m[1]) || 0) + 1);
  }
}

/* ── 3. verify local refs resolve ────────────────────── */

for (const [p, files] of localRefs) {
  checked++;
  if (publicFiles.has(p)) continue;

  const ciMatch = [...publicFiles].find((f) => f.toLowerCase() === p.toLowerCase());
  if (ciMatch) {
    fail.push(`CASE MISMATCH  ${p}\n     on disk: ${ciMatch}\n     used in: ${files.join(', ')}`);
  } else {
    fail.push(`MISSING FILE   ${p}\n     used in: ${files.join(', ')}`);
  }
}

/* ── 3b. resolve dynamically-built brand logo paths ──── */

const brandsFile = join(SRC, 'lib', 'brands-data.ts');
if (existsSync(brandsFile)) {
  const brandsSrc = readFileSync(brandsFile, 'utf8');
  const slugs = [...brandsSrc.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);
  const tmplMatch = brandsSrc.match(/const L = \(slug: string\) =>\s*`([^`]+)`/);
  if (tmplMatch && slugs.length) {
    const tmpl = tmplMatch[1];
    for (const slug of new Set(slugs)) {
      const resolved = tmpl.replace('${slug}', slug);
      checked++;
      if (!publicFiles.has(resolved)) {
        const ci = [...publicFiles].find((f) => f.toLowerCase() === resolved.toLowerCase());
        fail.push(
          ci
            ? `CASE MISMATCH  ${resolved}\n     on disk: ${ci}\n     brand: ${slug}`
            : `MISSING LOGO   ${resolved}\n     brand: ${slug} (src/lib/brands-data.ts)`
        );
      } else {
        referencedDynamic.add(resolved);
      }
    }
  }
}

/* ── 4. binaries in public/ ──────────────────────────── */

const BINARY_OK = /^images\/vehicles\/.+\.(jpe?g|webp)$/i;

for (const f of walk(PUBLIC, null)) {
  if (!isBinary(f)) continue;
  const rel = relative(PUBLIC, f).split(/[\\/]/).join('/');
  if (BINARY_OK.test(rel)) continue;
  fail.push(
    `BINARY ASSET   /${rel}\n     Binary files outside public/images/vehicles/ were dropped by older deploys. ` +
      `Keep photos in public/images/vehicles/ or serve them from the CDN registry in src/lib/media.ts.`
  );
}

/* ── 5. remote hosts must be allowlisted ─────────────── */

const cfgPath = ['next.config.ts', 'next.config.js', 'next.config.mjs']
  .map((f) => join(ROOT, f))
  .find(existsSync);
const cfg = cfgPath ? readFileSync(cfgPath, 'utf8') : '';

for (const host of remoteHosts.keys()) {
  if (!cfg.includes(host)) {
    warn.push(`Remote host "${host}" is not in next.config.ts remotePatterns (needed for next/image).`);
  }
}

/* ── 6. orphan check ─────────────────────────────────── */

const referenced = new Set([...localRefs.keys(), ...referencedDynamic]);
const orphans = [...publicFiles].filter(
  (f) => !referenced.has(f) && !/^\/(favicon|robots|sitemap|manifest)/.test(f)
);

/* ── report ──────────────────────────────────────────── */

console.log('\nImage integrity check');
console.log('─'.repeat(58));
console.log(`  public assets      : ${publicFiles.size}`);
console.log(`  local refs checked : ${checked}`);
console.log(`  remote hosts       : ${[...remoteHosts.keys()].join(', ') || 'none'}`);
if (orphans.length) console.log(`  unreferenced assets: ${orphans.length}`);

if (warn.length) {
  console.log(`\n⚠  ${warn.length} warning(s):`);
  warn.forEach((w) => console.log(`   • ${w}`));
}

if (fail.length) {
  console.log(`\n✗  ${fail.length} broken image reference(s):\n`);
  fail.forEach((f) => console.log(`   • ${f}\n`));
  process.exit(1);
}

console.log('\n✓ No broken image references. All assets deploy-safe.\n');
