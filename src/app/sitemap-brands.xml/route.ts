import { urlSet } from '@/lib/sitemap-utils';
import { ALL_BRANDS } from '@/lib/brands-data';
export const dynamic = 'force-static';
export function GET() {
  return urlSet(
    ALL_BRANDS.map((b) => ({ path: `/brands/${b.slug}`, priority: 0.85, changefreq: 'weekly' as const }))
  );
}
