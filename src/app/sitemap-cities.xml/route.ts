import { urlSet } from '@/lib/sitemap-utils';
import { LOCATIONS_DATA } from '@/lib/locations-data';
export const dynamic = 'force-static';
export function GET() {
  const locs = Object.keys(LOCATIONS_DATA).map((slug) => ({
    path: `/locations/${slug}`, priority: 0.7, changefreq: 'weekly' as const,
  }));
  return urlSet([
    ...locs,
    { path: '/cars-in-lahore', priority: 0.8 },
    { path: '/cars-in-islamabad', priority: 0.8 },
    { path: '/cars-in-karachi', priority: 0.8 },
    { path: '/electric-cars-lahore', priority: 0.7 },
    { path: '/hybrid-cars-lahore', priority: 0.7 },
    { path: '/car-rental-lahore', priority: 0.7 },
  ]);
}
