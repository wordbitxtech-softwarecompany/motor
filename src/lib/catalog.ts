/**
 * MOTOR Pakistan — Catalog layer.
 *
 * Builds SEO model-family pages, variant grouping, price metadata and a
 * fast in-memory search index on top of `brands-data.ts`.
 *
 * A "model family" (e.g. Toyota Corolla) is the SEO landing page.
 * Its "variants" (Altis Grande X 1.8, Altis 1.6, GLi 1.3) live on that page.
 */

import { BRANDS, BIKE_BRANDS, ALL_BRANDS, imageForModel, type Brand, type CatalogModel } from './brands-data';

/** Date the pricing data set was last reviewed. Update when prices change. */
export const PRICE_LAST_UPDATED = '2026-02-01';

export type PriceType = 'starting' | 'range' | 'estimated' | 'upcoming' | 'unavailable';

export interface Variant extends CatalogModel {
  slug: string;
  priceType: PriceType;
}

export interface ModelFamily {
  /** e.g. "Corolla" */
  name: string;
  /** e.g. "corolla" */
  slug: string;
  brand: string;
  brandSlug: string;
  brandLogo: string;
  /** 'car' | 'bike' */
  kind: 'car' | 'bike';
  /** '/cars/toyota/corolla' */
  url: string;
  variants: Variant[];
  /** Cheapest verified price across variants (0 when none verified) */
  priceMin: number;
  priceMax: number;
  priceType: PriceType;
  /** Latest model year across variants */
  year: number;
  /** Dominant body style, e.g. "Sedan" */
  body: string;
  /** Distinct powertrains, e.g. ['Petrol','Hybrid'] */
  powertrains: string[];
  status: string;
  image: string;
  battery?: string;
  range?: string;
  launchedAt?: string;
  enteredPakistan?: number;
  searchKeywords: string[];
}

/* ── Slug helper ─────────────────────────────────────── */

export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\+/g, ' plus ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* ── Model family rules ──────────────────────────────────
   Longest match wins. Any model name starting with one of
   these becomes part of that family page.                */

const FAMILY_RULES: string[] = [
  // Toyota — order matters (Corolla Cross before Corolla)
  'Corolla Cross', 'Corolla', 'Yaris', 'Fortuner', 'Hilux',
  'Land Cruiser Prado', 'Land Cruiser', 'Camry', 'Rush', 'Raize', 'bZ4X', 'Prado',
  // Honda cars
  'Civic', 'City', 'HR-V', 'BR-V', 'ZR-V', 'CR-V', 'Accord', 'e:NS1',
  // Suzuki
  'Alto', 'Cultus', 'Swift', 'Wagon R', 'Every', 'Bolan', 'Ravi', 'Fronx',
  'Jimny', 'Grand Vitara', 'eVX',
  // KIA
  'Sportage', 'Sorento', 'Stonic', 'Picanto', 'Carnival', 'Seltos', 'EV5', 'EV6', 'Niro',
  // Hyundai
  'Tucson', 'Elantra', 'Sonata', 'Santa Fe', 'Staria', 'Porter',
  'Ioniq 5', 'Ioniq 6', 'Kona', 'Creta',
  // MG
  'HS Super Hybrid', 'HS Hybrid', 'HS', 'ZS EV', 'ZS', 'MG4', 'MG5', 'MG6',
  'IM5', 'IM6', 'Marvel R', 'Gloster', 'Cyberster',
  // Changan
  'Lumin', 'Alsvin', 'Oshan X7', 'Karvaan', 'CS35', 'CS75', 'Eado', 'Hunter', 'UNI-T', 'UNI-K', 'M9',
  // Haval / GWM / Tank / ORA
  'H6 GT', 'H6', 'Jolion', 'H9', 'Dargo', 'Cannon Alpha', 'Cannon', 'Poer', 'Wingle',
  'Tank 300', 'Tank 500', 'Tank 700', 'ORA 03', 'ORA 5', 'ORA 07', 'ORA Lightning Cat',
  // Chery / Omoda / Jaecoo
  'Tiggo 8', 'Tiggo 4', 'Tiggo 7', 'Tiggo 9', 'Arrizo',
  'Omoda 5', 'Omoda 7', 'Omoda C7', 'Omoda 9', 'Omoda 3',
  'J6', 'J7', 'J8', 'J5',
  // BYD
  'Atto 3', 'Atto 2', 'Sealion 7', 'Sealion 6', 'Seal', 'Dolphin', 'Song Plus',
  'Han', 'Shark 6', 'Tang', 'Yuan Up',
  // Deepal / Seres / Avatr / Leapmotor / AION / Hyptec / XPENG / ZEEKR
  'S07', 'S05', 'L07', 'E07', 'S09', 'G318',
  'Seres 3', 'Seres 5', 'Seres 7', 'Aito M5',
  'Avatr 11', 'Avatr 12', 'Avatr 07', 'Avatr 06',
  'Leapmotor C10', 'Leapmotor T03', 'Leapmotor B10',
  'Aion V', 'Aion UT', 'Aion Y', 'Aion S', 'Aion ES',
  'Hyptec HT', 'HT Elite', 'HT Ultra', 'Hyptec GT',
  'L03 BEV', 'L03 REEV', 'L03', 'XPeng G6', 'XPeng G9', 'XPeng P7', 'XPeng X9',
  'Zeekr X', 'Zeekr 001', 'Zeekr 7X', 'Zeekr 009',
  // Jetour / Forthing / JMEV / Kaiyi / NEVO / Riddara / iCAUR / Denza
  'X70 Plus', 'X90 Plus', 'Dashing', 'T3', 'T2', 'T1', 'G700', 'Traveller', 'X50',
  'Friday', 'Elight', 'EV3', 'e-Qute', 'X3 Pro',
  'Hunter', 'A06', 'Q05', 'Q07', 'RD6', 'V27', 'V23',
  'Denza B5', 'Denza B8',
  'Omoda 5', 'Omoda 7', 'Omoda C7', 'Omoda 9', 'Omoda 3', 'Omoda E5', 'E5', '7 SHS-P',
  'ORA 03', 'ORA 5', 'ORA 07', 'ORA Lightning Cat',
  // Proton / BAIC / DFSK / Isuzu / others
  'Saga', 'X70', 'X90', 'e.MAS 7',
  'BJ40', 'BJ30', 'X55', 'X35', 'EU5',
  'Glory 580', 'Glory 500', 'Glory 330S', 'K01S', 'C31', 'C37',
  'D-Max', 'MU-X', '2008', 'e-2008', '3008', '408',
  'T8', 'T9', 'JS4', 'X200', 'E30X',
  'Box EV', 'Rich 6', 'Glory 560', 'Forthing T5', 'Nammi 01',
  'Coolray', 'Geometry C', 'Galaxy E5', 'Galaxy L7', 'Emgrand',
  'X-Trail', 'Patrol', 'Kicks', 'Leaf', 'Dayz', 'Note',
  'Mira', 'Move', 'Tanto', 'Rocky', 'Cast',
  'Outlander', 'Pajero', 'L200', 'Xpander', 'eK X',
  'Cooper', 'Countryman', 'Aceman',
  // German / luxury
  'C200', 'C300', 'E200', 'E350', 'S500', 'GLA', 'GLC', 'GLE', 'EQB', 'EQE', 'EQS', 'G63',
  '320i', '330e', '520i', '530e', '730Li', 'X1', 'X3', 'X5', 'iX1', 'i4', 'iX',
  'A3', 'A4', 'A6', 'Q2', 'Q3', 'Q5', 'Q7', 'Q4 e-tron', 'Q8 e-tron', 'e-tron GT',
  'ES 300h', 'NX 350h', 'RX 350h', 'LX 600', 'RZ 450e',
  'Macan', 'Cayenne', 'Taycan', '911', 'Panamera',
  'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Vogue',
  'Defender', 'Discovery',
  'Model 3', 'Model Y',
  // Bikes
  'CD 70 Dream', 'CD 70', 'CG 125', 'CB 125F', 'CB 150F', 'CB 250F', 'Pridor', 'PCX', 'CRF',
  'YBR 125', 'YB 125Z', 'YZF R15', 'MT-15',
  'GD 110S', 'GS 150', 'GR 150', 'Inazuma',
  'US 70', 'US 100', 'US 125', 'US 150', 'US-1', 'Scooty 100',
  'RP 70', 'RP 110', 'RP 125', 'Wego', 'Passion Plus', 'Robinson',
  'JE 70L', 'JE 70 Pro', 'Jolta Scooty',
  'Bolt', 'Retro',
  'Yadea C1S', 'Yadea G5', 'Yadea M3',
  'Evee Gen-Z', 'Evee C1', 'Evee S1',
  'Metro MR 70', 'Metro MR 110', 'Metro MR 125', 'Metro E-Bike',
  'Ninja ZX-6R', 'Ninja 400', 'Ninja 650', 'Z650',
  '200 Duke', '250 Duke', '390 Duke', '390 Adventure',
  'TNT 150i', 'TNT 25', 'Leoncino', 'TRK',
].sort((a, b) => b.length - a.length); // longest first

function familyOf(modelName: string): string {
  for (const rule of FAMILY_RULES) {
    if (modelName.toLowerCase().startsWith(rule.toLowerCase())) return rule;
  }
  // Fall back: first two words (keeps e.g. "Glory 580 Pro" -> "Glory 580")
  const words = modelName.split(' ');
  return words.length > 2 ? words.slice(0, 2).join(' ') : modelName;
}

function priceTypeFor(m: CatalogModel): PriceType {
  if (['Coming Soon', 'Expected', 'Pre-Launch'].includes(m.status)) return 'upcoming';
  if (!m.price || m.price === 0) return 'unavailable';
  return 'starting';
}

/* ── Build families ──────────────────────────────────── */

function buildFamilies(brands: Brand[], kind: 'car' | 'bike'): ModelFamily[] {
  const out: ModelFamily[] = [];

  for (const brand of brands) {
    const groups = new Map<string, CatalogModel[]>();
    for (const m of brand.models) {
      const fam = familyOf(m.name);
      if (!groups.has(fam)) groups.set(fam, []);
      groups.get(fam)!.push(m);
    }

    for (const [famName, models] of groups) {
      const slug = toSlug(famName);
      const priced = models.filter((m) => m.price > 0).map((m) => m.price);
      const priceMin = priced.length ? Math.min(...priced) : 0;
      const priceMax = priced.length ? Math.max(...priced) : 0;

      const variants: Variant[] = models.map((m) => ({
        ...m,
        slug: toSlug(m.name),
        priceType: priceTypeFor(m),
      }));

      const anyUpcoming = models.every((m) =>
        ['Coming Soon', 'Expected', 'Pre-Launch'].includes(m.status)
      );

      const powertrains = Array.from(new Set(models.map((m) => m.pt)));
      const withBattery = models.find((m) => m.battery);
      const withRange = models.find((m) => m.range);

      out.push({
        name: famName,
        slug,
        brand: brand.name,
        brandSlug: brand.slug,
        brandLogo: brand.logo,
        kind,
        url: `/${kind === 'car' ? 'cars' : 'bikes'}/${brand.slug}/${slug}`,
        variants,
        priceMin,
        priceMax,
        priceType: priceMin === 0 ? (anyUpcoming ? 'upcoming' : 'unavailable')
          : priceMin === priceMax ? 'starting' : 'range',
        year: Math.max(...models.map((m) => m.year)),
        body: models[0].body,
        powertrains,
        status: models[0].status,
        image: imageForModel(models[0].body, 0, brand.name, models[0].name, models[0].pt),
        battery: withBattery?.battery,
        range: withRange?.range,
        launchedAt: models.find((m) => m.launchedAt)?.launchedAt,
        enteredPakistan: brand.enteredPakistan,
        searchKeywords: Array.from(
          new Set([
            famName.toLowerCase(),
            `${brand.name} ${famName}`.toLowerCase(),
            brand.name.toLowerCase(),
            ...models.map((m) => m.name.toLowerCase()),
            ...models.map((m) => `${brand.name} ${m.name}`.toLowerCase()),
          ])
        ),
      });
    }
  }

  return out;
}

export const CAR_FAMILIES: ModelFamily[] = buildFamilies(BRANDS, 'car');
export const BIKE_FAMILIES: ModelFamily[] = buildFamilies(BIKE_BRANDS, 'bike');
export const ALL_FAMILIES: ModelFamily[] = [...CAR_FAMILIES, ...BIKE_FAMILIES];

/* ── Lookups ─────────────────────────────────────────── */

export function getFamily(kind: 'car' | 'bike', brandSlug: string, modelSlug: string) {
  const pool = kind === 'car' ? CAR_FAMILIES : BIKE_FAMILIES;
  return pool.find((f) => f.brandSlug === brandSlug && f.slug === modelSlug);
}

export function familiesForBrand(brandSlug: string) {
  return ALL_FAMILIES.filter((f) => f.brandSlug === brandSlug);
}

export function relatedFamilies(fam: ModelFamily, limit = 4) {
  const pool = fam.kind === 'car' ? CAR_FAMILIES : BIKE_FAMILIES;
  const sameBrand = pool.filter((f) => f.brandSlug === fam.brandSlug && f.slug !== fam.slug);
  const sameBody = pool.filter(
    (f) => f.brandSlug !== fam.brandSlug && f.body === fam.body && f.priceMin > 0
  );
  return [...sameBrand, ...sameBody].slice(0, limit);
}

/** Genuinely new / recently launched families for a given year. */
export function launchesFor(year: number, kind?: 'car' | 'bike') {
  const pool = kind ? (kind === 'car' ? CAR_FAMILIES : BIKE_FAMILIES) : ALL_FAMILIES;
  return pool
    .filter((f) =>
      f.year >= year &&
      ['New Arrival', 'Coming Soon', 'Expected', 'Pre-Launch', 'Available in Pakistan'].includes(f.status)
    )
    .sort((a, b) => {
      const rank = (s: string) =>
        s === 'New Arrival' ? 0 : s === 'Available in Pakistan' ? 1 : s === 'Coming Soon' ? 2 : 3;
      return rank(a.status) - rank(b.status) || (b.priceMin || 0) - (a.priceMin || 0);
    });
}

/* ── Search index (autocomplete) ─────────────────────── */

export interface SearchEntry {
  brand: string;
  brandSlug: string;
  model: string;
  url: string;
  type: string;      // "Car" | "Bike"
  body: string;
  fuel: string;
  priceMin: number;
  logo: string;
  kw: string;        // pre-joined lowercase keyword blob
}

export const SEARCH_INDEX: SearchEntry[] = ALL_FAMILIES.map((f) => ({
  brand: f.brand,
  brandSlug: f.brandSlug,
  model: f.name,
  url: f.url,
  type: f.kind === 'car' ? 'Car' : 'Bike',
  body: f.body,
  fuel: f.powertrains[0],
  priceMin: f.priceMin,
  logo: f.brandLogo,
  kw: f.searchKeywords.join(' | '),
}));

/** Levenshtein distance capped at `max` for cheap typo tolerance. */
function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

export interface SearchHit extends SearchEntry {
  /** Character range of the match inside `model`, for highlighting. */
  match?: { start: number; length: number };
  /** True when matched via typo tolerance rather than an exact substring. */
  fuzzy?: boolean;
}

/**
 * Fast model-first search.
 * Model-only queries work ("cor", "civic", "cd", "ybr") — brand is never required.
 * Falls back to typo-tolerant matching when nothing matches literally.
 */
export function searchModels(query: string, limit = 8): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];

  const scored: { e: SearchHit; s: number }[] = [];

  for (const e of SEARCH_INDEX) {
    const model = e.model.toLowerCase();
    const brand = e.brand.toLowerCase();
    const brandModel = `${brand} ${model}`;
    let s = -1;
    let match: { start: number; length: number } | undefined;

    if (model === q) { s = 0; match = { start: 0, length: q.length }; }
    else if (model.startsWith(q)) { s = 1; match = { start: 0, length: q.length }; }
    else if (brandModel.startsWith(q)) {
      s = 2;
      const inModel = model.indexOf(q);
      if (inModel >= 0) match = { start: inModel, length: q.length };
    }
    else if (model.includes(q)) { s = 3; match = { start: model.indexOf(q), length: q.length }; }
    else if (brand.startsWith(q)) { s = 4; }
    else if (brandModel.includes(q)) { s = 5; }
    else if (e.kw.includes(q)) { s = 6; }

    if (s >= 0) scored.push({ e: { ...e, match }, s });
  }

  // Typo tolerance only when literal matching is thin and the query is long enough
  if (scored.length < 3 && q.length >= 4) {
    const seen = new Set(scored.map((x) => x.e.url));
    for (const e of SEARCH_INDEX) {
      if (seen.has(e.url)) continue;
      const model = e.model.toLowerCase();
      const head = model.slice(0, Math.max(q.length, 3));
      const d = Math.min(editDistance(q, head), editDistance(q, model));
      if (d <= (q.length >= 6 ? 2 : 1)) {
        scored.push({ e: { ...e, fuzzy: true }, s: 10 + d });
      }
    }
  }

  return scored
    .sort((a, b) => a.s - b.s || a.e.model.length - b.e.model.length)
    .slice(0, limit)
    .map((x) => x.e);
}

/* ── Stats ───────────────────────────────────────────── */

export const CATALOG_STATS = {
  brands: ALL_BRANDS.length,
  carBrands: BRANDS.length,
  bikeBrands: BIKE_BRANDS.length,
  carFamilies: CAR_FAMILIES.length,
  bikeFamilies: BIKE_FAMILIES.length,
  families: ALL_FAMILIES.length,
  variants: ALL_BRANDS.reduce((n, b) => n + b.models.length, 0),
  electrified: ALL_BRANDS.reduce(
    (n, b) => n + b.models.filter((m) => ['EV', 'PHEV', 'REEV', 'Hybrid'].includes(m.pt)).length,
    0
  ),
};
