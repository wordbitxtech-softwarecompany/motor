/**
 * One photo per model family. Never reuse another model's photograph.
 *
 * Priority:
 *   1. Pakistan-spec generated / catalog JPEG for that exact model
 *   2. Wikimedia Honda CD 70 / CG 125 (the bikes that actually run here)
 *   3. Named studio card — brand + model on a premium plate (honest fallback)
 */

import { WIKI } from './media';

const PHOTOS: Record<string, string> = {
  'toyota corolla cross': '/images/vehicles/toyota-corolla-cross.jpg',
  'toyota corolla': '/images/vehicles/toyota-corolla.jpg',
  'toyota hilux': '/images/vehicles/toyota-hilux.jpg',
  'toyota rush': '/images/vehicles/toyota-rush.jpg',
  'toyota fortuner': '/images/vehicles/toyota-fortuner.jpg',
  'toyota yaris': '/images/vehicles/toyota-yaris.jpg',
  'honda civic': '/images/vehicles/honda-civic.jpg',
  'honda city': '/images/vehicles/honda-city.jpg',
  'honda hr-v': '/images/vehicles/honda-hr-v.jpg',
  'honda br-v': '/images/vehicles/honda-br-v.jpg',
  'suzuki alto': '/images/vehicles/suzuki-alto.jpg',
  'suzuki cultus': '/images/vehicles/suzuki-cultus.jpg',
  'suzuki swift': '/images/vehicles/suzuki-swift.jpg',
  'kia sportage': '/images/vehicles/kia-sportage.jpg',
  'hyundai tucson': '/images/vehicles/hyundai-tucson.jpg',
  'mg hs': '/images/vehicles/mg-hs.jpg',
  'changan lumin': '/images/vehicles/changan-lumin.jpg',
  'haval h6': '/images/vehicles/haval-h6.jpg',
  'haval jolion': '/images/vehicles/haval-jolion.jpg',
  'jaecoo j5': '/images/vehicles/jaecoo-j5.jpg',
  'jaecoo j6': '/images/vehicles/jaecoo-j6.jpg',
  'jaecoo j7': '/images/vehicles/jaecoo-j7.jpg',
  'jetour t3': '/images/vehicles/jetour-t3.jpg',
  'jetour t2': '/images/vehicles/jetour-t2.jpg',
  'jetour t1': '/images/vehicles/jetour-t1.jpg',
  'jetour dashing': '/images/vehicles/jetour-dashing.jpg',
  'jetour x70': '/images/vehicles/jetour-x70-plus.jpg',
  'deepal s05': '/images/vehicles/deepal-s05.jpg',
  'zeekr x': '/images/vehicles/zeekr-x.jpg',
  'byd atto 2': '/images/vehicles/byd-atto-2.jpg',
  'byd atto 3': '/images/vehicles/byd-atto-3.jpg',
  'byd sealion 7': '/images/vehicles/byd-sealion-7.jpg',
  'omoda 7': '/images/vehicles/omoda-7.jpg',
  'omoda e5': '/images/vehicles/omoda-e5.jpg',
  'nevo hunter': '/images/vehicles/nevo-hunter.jpg',
  'honda cd 70 dream': WIKI.hondaCd70Classic,
  'honda cd 70': WIKI.hondaCd70,
  'honda pridor': '/images/vehicles/honda-pridor.jpg',
  'honda cg 125': WIKI.hondaCg125,
  'honda cb 125f': '/images/vehicles/honda-cb-125f.jpg',
  'honda cb 150f': '/images/vehicles/honda-cb-150f.jpg',
  'honda pcx': '/images/vehicles/honda-pcx-160.jpg',
  'yamaha ybr 125': '/images/vehicles/yamaha-ybr-125.jpg',
  'yamaha yb 125z': '/images/vehicles/yamaha-yb-125z.jpg',
  'suzuki gd 110s': '/images/vehicles/suzuki-gd-110s.jpg',
  'suzuki gs 150': '/images/vehicles/suzuki-gs-150.jpg',
  'united us 70': '/images/vehicles/united-us-70.jpg',
  'road prince rp 70': '/images/vehicles/road-prince-rp-70.jpg',
  'yadea c1s': '/images/vehicles/yadea-c1s.jpg',
  'jolta electric je 70': '/images/vehicles/jolta-je-70.jpg',
  'vlektra bolt': '/images/vehicles/vlektra-bolt.jpg',
  'benelli tnt 150i': '/images/vehicles/benelli-tnt-150i.jpg',
  'metro mr 70': '/images/vehicles/metro-mr-70.jpg',
  'kawasaki ninja 400': '/images/vehicles/kawasaki-ninja-400.jpg',
};

const PHOTO_KEYS = Object.keys(PHOTOS).sort((a, b) => b.length - a.length);

function matchesPhotoKey(haystack: string, key: string): boolean {
  if (haystack === key || haystack.startsWith(`${key} `) || haystack.startsWith(`${key}-`)) return true;
  // "Yadea Yadea C1S" / "Metro Metro MR 70" — brand repeated in the model name
  if (haystack.includes(` ${key} `) || haystack.endsWith(` ${key}`)) return true;
  // JE 70L should still use the JE 70 photograph
  if (haystack.startsWith(key) && /[a-z]/i.test(haystack.charAt(key.length))) return true;
  return false;
}

export function studioCardUrl(brand: string, model: string, body = 'Vehicle'): string {
  return `/media/vehicle-card/${encodeURIComponent(brand)}/${encodeURIComponent(model)}.svg?body=${encodeURIComponent(body)}`;
}

export function isStudioPhoto(src?: string | null): boolean {
  return Boolean(src && src.includes('/media/vehicle-card'));
}

/** Resolve the photograph that belongs to this brand + model only. */
export function photoForModel(
  brand?: string,
  model?: string,
  body = 'Vehicle',
  _pt?: string
): string {
  const b = (brand || '').trim();
  const m = (model || '').trim();
  if (b && m) {
    const full = `${b} ${m}`.toLowerCase();
    const modelOnly = m.toLowerCase();
    for (const key of PHOTO_KEYS) {
      if (matchesPhotoKey(full, key) || matchesPhotoKey(modelOnly, key)) {
        return PHOTOS[key];
      }
    }
  }
  return studioCardUrl(b || 'MOTOR', m || 'Pakistan market', body);
}

export function imageForModel(
  body: string,
  _index = 0,
  brand?: string,
  model?: string,
  pt?: string
): string {
  return photoForModel(brand, model, body, pt);
}
