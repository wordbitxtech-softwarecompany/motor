/**
 * MOTOR Pakistan — central media registry.
 *
 * WHY THIS EXISTS
 * ---------------
 * Binary assets (.jpg/.png) placed in `public/` were not surviving the
 * deployment pipeline, so every photo 404'd in production while text assets
 * (.svg) served fine. Every photographic asset is therefore resolved from a
 * CDN URL declared here in code, which always deploys with the source.
 *
 * Local copies remain in `public/images/**` and are still valid; this module
 * is simply the single source of truth so one edit updates the whole site.
 */

const PX = 'https://images.pexels.com/photos';

/** Build a sized, compressed Pexels URL. */
function px(id: number, w = 1200, h = 750): string {
  return `${PX}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

/* ── Hero / showroom ─────────────────────────────────── */

export const HERO = {
  /** Primary homepage hero — premium showroom interior. */
  showroom: px(29566879, 2000, 1100),
  /** Secondary showroom angle. */
  showroomAlt: px(29566880, 2000, 1100),
  /** Urban dealership scene used by some landing pages. */
  cityscape: px(18108314, 1800, 1000),
} as const;

/* ── Vehicle photography pools ───────────────────────── */

export const SEDAN = {
  corolla: px(33359730),
  civic: px(14696345),
  yaris: px(19868900),
  dark: px(14696345),
  silverLux: px(19758551),
  silverPergola: px(33359730),
  whiteSunset: px(19868900),
  silverMotion: px(19868899),
} as const;

export const SUV = {
  fortuner: px(32340203),
  sportage: px(33018220),
  whiteSunset: px(16586234),
  whiteUrban: px(16646414),
  whiteToyota: px(32340203),
  whiteStreet: px(33018220),
  whiteMountain: px(19908577),
  whiteNature: px(15357561),
  darkRear: px(20667627),
  silverShowroom: px(20379445),
} as const;

export const CROSSOVER = {
  corollaCross: px(15357561),
  mgHs: px(16646414),
  deepalS07: px(20667627),
} as const;

export const HATCH = {
  lumin: px(20475010),
  silverMotion: px(14436192),
  whiteUrban: px(17209676),
  red: px(12310882),
  blue: px(37718608),
  blueRear: px(17078606),
  whiteDoors: px(20475010),
  green: px(3936980),
  redClassic: px(36569947),
} as const;

/* ── Two-wheeler illustrations (local SVG — text-safe) ─ */

export const BIKE = {
  commuter: '/images/vehicles/bike-commuter.svg',
  sport: '/images/vehicles/bike-sport.svg',
  scooterEv: '/images/vehicles/scooter-electric.svg',
} as const;

/** Neutral fallback used if any image fails to load at runtime. */
export const FALLBACK_VEHICLE = px(18108314);

/** Remote hosts that must be allowed in next.config.ts remotePatterns. */
export const REMOTE_IMAGE_HOSTS = ['images.pexels.com'] as const;

/* ── Legacy path normalisation ───────────────────────── */

/**
 * Maps legacy local binary paths (stored in the database before photos moved
 * to the CDN) onto their current source. Applied at read time so existing rows
 * in any environment keep rendering without a data migration.
 */
const LEGACY: Record<string, string> = {
  '/images/vehicles/toyota-corolla.jpg': SEDAN.corolla,
  '/images/vehicles/honda-civic.jpg': SEDAN.civic,
  '/images/vehicles/toyota-yaris.jpg': SEDAN.yaris,
  '/images/vehicles/kia-sportage.jpg': SUV.sportage,
  '/images/vehicles/toyota-fortuner.jpg': SUV.fortuner,
  '/images/vehicles/toyota-corolla-cross.jpg': CROSSOVER.corollaCross,
  '/images/vehicles/mg-hs-phev.jpg': CROSSOVER.mgHs,
  '/images/vehicles/deepal-s07.jpg': CROSSOVER.deepalS07,
  '/images/vehicles/changan-lumin.jpg': HATCH.lumin,
  '/images/vehicles/showroom-hero.jpg': HERO.showroom,
  '/images/vehicles/showroom-alt.jpg': HERO.showroomAlt,
  '/images/showroom-hero.jpg': HERO.showroom,
  '/images/showroom-hero-alt.jpg': HERO.showroomAlt,
  '/images/hero-lahore.jpg': HERO.cityscape,
};

/**
 * Resolve any stored image reference to a URL that is guaranteed to serve.
 * Accepts CDN URLs, user-uploaded data URIs, local SVGs and legacy paths.
 */
export function resolveImage(src?: string | null): string {
  if (!src) return FALLBACK_VEHICLE;
  if (LEGACY[src]) return LEGACY[src];
  // Any other legacy raster path in /images/ no longer ships — use fallback.
  if (/^\/images\/.+\.(jpe?g|png|webp|avif)$/i.test(src)) return FALLBACK_VEHICLE;
  return src;
}

/** Resolve an array of stored images (gallery fields). */
export function resolveGallery(list?: string[] | null): string[] {
  if (!list?.length) return [FALLBACK_VEHICLE];
  return list.map(resolveImage);
}
