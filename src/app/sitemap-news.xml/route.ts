import { urlSet } from '@/lib/sitemap-utils';
import { BLOG_POSTS } from '@/lib/blog-data';
export const dynamic = 'force-static';
export function GET() {
  return urlSet(
    BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: 0.7, changefreq: 'monthly' as const }))
  );
}
