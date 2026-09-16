/**
 * Central site configuration.
 * Change SITE_URL here and every canonical URL, sitemap entry,
 * robots directive and JSON-LD @id updates automatically.
 */
export const SITE_URL = 'https://motor.wordbitxtech.com';

export const SITE_NAME = 'MOTOR Pakistan';
export const SITE_TAGLINE = 'Find Your Drive.';

export const CONTACT_EMAIL = 'info@motor.wordbitxtech.com';
export const PRIVACY_EMAIL = 'info@motor.wordbitxtech.com';
export const CONTACT_PHONE = '';
export const CONTACT_PHONE_RAW = '+';

/** Build an absolute URL for a given path. */
export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
