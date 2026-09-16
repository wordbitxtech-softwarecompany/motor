import { sitemapIndex } from '@/lib/sitemap-utils';
export const dynamic = 'force-static';
export function GET() {
  return sitemapIndex([
    'sitemap-pages.xml',
    'sitemap-brands.xml',
    'sitemap-cars.xml',
    'sitemap-bikes.xml',
    'sitemap-news.xml',
    'sitemap-cities.xml',
  ]);
}
