import { urlSet } from '@/lib/sitemap-utils';
import { BIKE_FAMILIES } from '@/lib/catalog';
export const dynamic = 'force-static';
export function GET() {
  return urlSet(
    BIKE_FAMILIES.map((f) => ({
      path: f.url,
      priority: f.priceMin > 0 ? 0.8 : 0.6,
      changefreq: 'weekly' as const,
    }))
  );
}
