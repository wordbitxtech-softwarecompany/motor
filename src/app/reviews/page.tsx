import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { buildMetadata, itemListSchema } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog-data';
import { CAR_FAMILIES, BIKE_FAMILIES } from '@/lib/catalog';
import { formatPKR } from '@/lib/utils';
import { ArrowRight, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Car & Bike Reviews in Pakistan',
  description:
    'In-depth car and bike reviews for the Pakistani market — comparisons, buying analysis, EV and hybrid guides, and model breakdowns with prices and specifications.',
  path: '/reviews',
  keywords: ['car reviews Pakistan', 'bike reviews Pakistan', 'car comparison Pakistan', 'best cars Pakistan review'],
});

export default function ReviewsPage() {
  // Editorial pieces that are review/comparison in nature
  const reviewPosts = BLOG_POSTS.filter((p) =>
    /review|best|vs|compar|guide/i.test(`${p.title} ${p.category}`)
  );
  const posts = reviewPosts.length ? reviewPosts : BLOG_POSTS;

  // Model pages act as full spec-and-price breakdowns
  const topCars = CAR_FAMILIES.filter((f) => f.priceMin > 0).sort((a, b) => b.variants.length - a.variants.length).slice(0, 8);
  const topBikes = BIKE_FAMILIES.filter((f) => f.priceMin > 0).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd
        schema={itemListSchema('Car and bike reviews', posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))}
      />

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }]} dark />
          <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight">
            Car &amp; Bike Reviews in Pakistan
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Independent analysis written for Pakistani buyers — model breakdowns, powertrain comparisons
            and practical buying advice. We publish editorial reviews, not user-submitted ratings.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Editorial reviews */}
        <section aria-labelledby="editorial-h">
          <h2 id="editorial-h" className="text-2xl font-black tracking-tight text-slate-900">
            Latest Reviews &amp; Comparisons
          </h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <article key={p.slug} className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all overflow-hidden flex flex-col">
                <Link href={`/blog/${p.slug}`} className="block aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy" width={400} height={225}
                  />
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-teal-700">{p.category}</span>
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug mt-1">
                    <Link href={`/blog/${p.slug}`} className="hover:text-teal-700 transition-colors">{p.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 flex-1">{p.summary}</p>
                  <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {p.publishDate} · {p.readTime}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Model breakdowns */}
        <section aria-labelledby="models-h">
          <h2 id="models-h" className="text-2xl font-black tracking-tight text-slate-900">
            Full Model Breakdowns
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-5">
            Every model page includes variant pricing, specifications, pros, cons and similar vehicles.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...topCars, ...topBikes].map((f) => (
              <li key={f.url}>
                <Link href={f.url} className="group flex items-center gap-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all p-3 h-full">
                  <FileText className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {f.brand} {f.name}
                    </span>
                    <span className="block text-[11px] text-slate-500">From {formatPKR(f.priceMin)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="rounded-2xl bg-white border border-slate-200 p-5 text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Our approach:</strong> reviews on MOTOR Pakistan are editorial
          assessments based on published specifications and market context. We do not publish user-submitted
          star ratings or unverified testimonials. Read our{' '}
          <Link href="/editorial-policy" className="text-teal-700 font-semibold hover:underline">editorial policy</Link>.
        </p>
      </div>
    </div>
  );
}
