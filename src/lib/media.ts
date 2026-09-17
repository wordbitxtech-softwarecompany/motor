/**
 * MOTOR Pakistan — central media registry.
 *
 * Photographic assets:
 *   - Pakistan-spec catalog JPEGs in `public/images/vehicles/`
 *   - Pexels CDN (hero / city tiles) via `/media/pexels`
 *   - Wikimedia Commons Honda CD 70 / CG 125 via `/media/wiki`
 * We do not scrape PakWheels listing photos.
 */

const PX = 'https://images.pexels.com/photos';

/** Build a sized, compressed Pexels URL. */
function px(id: number, w = 1200, h = 750): string {
  return `${PX}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

/** Neutral fallback used if any image fails to load at runtime. */
export const FALLBACK_VEHICLE = '/images/vehicles/placeholder.svg';

/** Same-origin proxy so remote photos load reliably in Pakistan. */
export function mediaUrl(src?: string | null): string {
  const raw = src || FALLBACK_VEHICLE;
  if (raw.startsWith('https://images.pexels.com')) {
    return raw.replace('https://images.pexels.com', '/media/pexels');
  }
  return raw;
}

/* ── Hero / showroom ─────────────────────────────────── */

export const HERO = {
  /** Original dark indoor showroom — overlay is applied in HeroSection. */
  showroom: px(29566879, 2000, 1100),
  /** Secondary outdoor angle — Pakistan Corolla, not exotic supercars. */
  showroomAlt: '/images/vehicles/scene-new-cars.jpg',
  /** Daylight road scene used by some landing pages. */
  cityscape: px(33359730, 1800, 1000),
  /** Motorcycle hero — street commuter, not a superbike. */
  bikes: px(2393816, 1800, 1000),
} as const;

/* ── Pakistan-common vehicle photography ─────────────── */

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

export const EV = {
  compact: px(116675),
  hatch: px(12310882),
  suv: '/images/vehicles/scene-ev-hybrid.jpg',
  sedan: px(210019),
  urban: px(1402787),
  crossover: px(20667627),
} as const;

/* ── Wikimedia Commons — Pakistan Honda commuters ───── */

export const WIKI = {
  hondaCd70: '/media/wiki/Honda_70_2025.jpg',
  hondaCd70Classic: '/media/wiki/Honda_cd_70.jpg',
  hondaCg125: '/media/wiki/Honda_CG125_01.jpg',
  hondaCg125Alt: '/media/wiki/CG125_1.jpg',
} as const;

/* ── Two-wheeler photography ─────────────────────────── */

export const BIKE = {
  commuter70: WIKI.hondaCd70,
  commuter70Alt: WIKI.hondaCd70Classic,
  commuter125: WIKI.hondaCg125,
  commuter125Alt: WIKI.hondaCg125Alt,
  commuter: WIKI.hondaCd70,
  sport: px(595807),
  scooterEv: px(1413412),
  scooter: px(2116475),
  cruiser: px(258092),
  adventure: px(2519374),
  naked: px(595807),
  city: px(2116475),
  classic: WIKI.hondaCg125,
  touring: px(1715193),
  cafe: px(1715193),
  street: px(2393816),
  closeup: px(1413412),
  parked: px(258092),
} as const;

export const SCENE = {
  usedCars: px(33359730, 800, 520),
  newCars: '/images/vehicles/scene-new-cars.jpg',
  bikes: px(2393816, 800, 520),
  ev: '/images/vehicles/scene-ev-hybrid.jpg',
  rent: '/images/vehicles/toyota-fortuner.jpg',
  sell: px(1592384, 800, 520),
  lahore: px(18108314, 900, 600),
  islamabad: px(1402787, 900, 600),
  karachi: px(1592384, 900, 600),
} as const;

/** Remote hosts that must be allowed in next.config.ts remotePatterns. */
export const REMOTE_IMAGE_HOSTS = ['images.pexels.com'] as const;

/* ── Legacy path normalisation ───────────────────────── */

/**
 * Maps legacy local binary paths (stored in the database before photos moved
 * to the CDN) onto their current source. Applied at read time so existing rows
 * in any environment keep rendering without a data migration.
 */
const LEGACY: Record<string, string> = {
  '/images/vehicles/mg-hs-phev.jpg': '/images/vehicles/mg-hs.jpg',
  '/images/vehicles/showroom-hero.jpg': HERO.showroom,
  '/images/vehicles/showroom-alt.jpg': HERO.showroomAlt,
  '/images/showroom-hero.jpg': HERO.showroom,
  '/images/showroom-hero-alt.jpg': HERO.showroomAlt,
  '/images/hero-lahore.jpg': HERO.cityscape,
  '/images/vehicles/bike-commuter.svg': BIKE.commuter70,
  '/images/vehicles/bike-sport.svg': BIKE.sport,
  '/images/vehicles/scooter-electric.svg': BIKE.scooterEv,
};

/**
 * Resolve any stored image reference to a URL that is guaranteed to serve.
 * Accepts CDN URLs, user-uploaded data URIs, local SVGs and legacy paths.
 */
export function resolveImage(src?: string | null): string {
  if (!src) return mediaUrl(FALLBACK_VEHICLE);
  if (LEGACY[src]) return mediaUrl(LEGACY[src]);
  // Catalog JPEGs / studio cards in /images/vehicles ship with the build.
  if (/^\/images\/vehicles\/.+\.(jpe?g|png|webp|svg)$/i.test(src)) return src;
  // Any other legacy raster path in /images/ no longer ships — use fallback.
  if (/^\/images\/.+\.(jpe?g|png|webp|avif)$/i.test(src)) return mediaUrl(FALLBACK_VEHICLE);
  return mediaUrl(src);
}

/** Resolve an array of stored images (gallery fields). */
export function resolveGallery(list?: string[] | null): string[] {
  if (!list?.length) return [mediaUrl(FALLBACK_VEHICLE)];
  return list.map(resolveImage);
}
