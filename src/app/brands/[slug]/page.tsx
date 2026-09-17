import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_BRANDS, getBrand } from '@/lib/brands-data';
import ModelCard from '@/components/ModelCard';
import { familiesForBrand } from '@/lib/catalog';
import { formatPKR } from '@/lib/utils';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { SITE_URL } from '@/lib/site';
import { ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  return ALL_BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: 'Brand Not Found' };

  const isBike = brand.kind === 'bike';
  const noun = isBike ? 'Bikes & Scooters' : 'Cars';
  const title = `${brand.name} ${noun} in Pakistan | Prices`;
  const description = `${brand.name} ${noun.toLowerCase()} prices in Pakistan — ${brand.models.length} models with variants, specifications and powertrain details.`;

  return {
    title,
    description,
    alternates: { canonical: `/brands/${slug}` },
    keywords: [
      `${brand.name} Pakistan`,
      `${brand.name} price in Pakistan`,
      `${brand.name} ${isBike ? 'bike' : 'car'} prices`,
      `new ${brand.name} models 2026`,
      `${brand.name} Lahore`,
      `${brand.name} Islamabad`,
      `${brand.name} Karachi`,
    ],
    openGraph: { title, description, url: `/brands/${slug}`, type: 'website' },
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const isBike = brand.kind === 'bike';
  const families = familiesForBrand(brand.slug);
  const priced = brand.models.filter((m) => m.price > 0);
  const lowest = priced.length ? Math.min(...priced.map((m) => m.price)) : 0;
  const highest = priced.length ? Math.max(...priced.map((m) => m.price)) : 0;

  const evCount = brand.models.filter((m) => ['EV', 'PHEV', 'REEV', 'Hybrid'].includes(m.pt)).length;
  const initials = brand.name.split(/[\s-]/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `${SITE_URL}/brands` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `${SITE_URL}/brands/${brand.slug}` },
    ],
  };

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand.name} models in Pakistan`,
    numberOfItems: brand.models.length,
    itemListElement: brand.models.slice(0, 20).map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${brand.name} ${m.name}`,
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SchemaJsonLd schema={breadcrumb} />
      <SchemaJsonLd schema={itemList} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
          <Link href="/brands" className="hover:text-slate-900">Brands</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
          <span className="font-semibold text-slate-900">{brand.name}</span>
        </nav>

        {/* Hero */}
        <header className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <span className="w-24 h-24 shrink-0 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
              {brand.logo ? (
                <img src={brand.logo} alt={`${brand.name} logo`} className="w-14 h-14 object-contain" width={56} height={56} />
              ) : (
                <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${brand.accent} text-white flex items-center justify-center font-black text-xl`} aria-hidden="true">
                  {initials}
                </span>
              )}
            </span>
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
                {brand.origin} · {isBike ? 'Bikes & Scooters' : 'Cars'}
                {brand.enteredPakistan ? ` · in Pakistan since ${brand.enteredPakistan}` : ''}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">
                {brand.name} {isBike ? 'Bikes' : 'Cars'} in Pakistan
              </h1>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{brand.tagline}</p>
            </div>
          </div>

          {/* Quick stats */}
          <dl className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Models Listed</dt>
              <dd className="text-lg font-black text-slate-900 mt-0.5">{brand.models.length}</dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Price From</dt>
              <dd className="text-lg font-black text-slate-900 mt-0.5">
                {lowest ? `PKR ${lowest.toLocaleString('en-PK')}` : '—'}
              </dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Price Up To</dt>
              <dd className="text-lg font-black text-slate-900 mt-0.5">
                {highest ? `PKR ${highest.toLocaleString('en-PK')}` : '—'}
              </dd>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Electrified</dt>
              <dd className="text-lg font-black text-teal-700 mt-0.5">{evCount} models</dd>
            </div>
          </dl>
        </header>

        {/* Models */}
        {/* Model family pages — primary internal links */}
        <section aria-labelledby="models-h" className="space-y-5">
          <div>
            <h2 id="models-h" className="text-2xl font-black tracking-tight text-slate-900">
              {brand.name} Models in Pakistan ({families.length})
            </h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Open any model for full pricing, variants, specifications and FAQs.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {families.map((f) => (
              <li key={f.url}>
                <Link
                  href={f.url}
                  className="group flex items-center gap-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all p-3 h-full"
                >
                  <img
                    src={f.image}
                    alt={`${brand.name} ${f.name} Pakistan`}
                    className={`w-20 h-14 rounded-lg shrink-0 ${f.image.endsWith('.svg') ? 'object-contain bg-slate-50' : 'object-cover'}`}
                    loading="lazy" width={80} height={56}
                  />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {brand.name} {f.name}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      {f.priceMin > 0 ? `From ${formatPKR(f.priceMin)}` : f.status}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {f.variants.length} variant{f.variants.length === 1 ? '' : 's'} · {f.powertrains.join('/')}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {brand.name} Variant Price List ({brand.models.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {brand.models.map((m, i) => (
              <ModelCard key={m.name} model={m} brandName={brand.name} index={i} />
            ))}
          </div>
        </section>

        {/* SEO copy */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            Buying a {brand.name} in Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {brand.name} is available through our showrooms in Lahore (Gulberg III, DHA Phase 5, Johar Town),
            Islamabad (Blue Area) and Karachi (Clifton &amp; DHA). We list {brand.models.length} {brand.name}{' '}
            {isBike ? 'bike and scooter' : 'car'} variants with indicative PKR pricing, and{' '}
            {evCount > 0
              ? `${evCount} of them are electrified (EV, hybrid, PHEV or REEV) as Pakistan shifts toward new-energy mobility.`
              : 'our team can advise on the best variant for your budget and usage.'}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Prices vary by city, dealer allocation, freight and registration. Contact the team on WhatsApp for a confirmed quotation,
            booking timeline and financing options.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Link href="/cars" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
              All cars
            </Link>
            <Link href="/electric-cars-pakistan" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
              Electric cars
            </Link>
            <Link href="/bikes" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
              Bikes &amp; scooters
            </Link>
            <Link href="/brands" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200">
              All brands
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold">Want the best {brand.name} price today?</h2>
            <p className="text-xs text-slate-400 mt-1">Our sales team responds on WhatsApp within minutes.</p>
          </div>
          <a
            href={`/contact?text=${encodeURIComponent(
              `Hello MOTOR Pakistan, please share current ${brand.name} prices and availability.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Get {brand.name} Prices
          </a>
        </div>
      </div>
    </div>
  );
}
