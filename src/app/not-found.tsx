import React from 'react';
import Link from 'next/link';
import { Car, Bike, Home, ArrowRight } from 'lucide-react';
import ModelAutocomplete from '@/components/ModelAutocomplete';
import { CAR_FAMILIES, BIKE_FAMILIES } from '@/lib/catalog';
import { BRANDS } from '@/lib/brands-data';
import { formatPKR } from '@/lib/utils';

export const metadata = {
  title: 'Page Not Found (404)',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const popularCars = CAR_FAMILIES.filter((f) => f.priceMin > 0)
    .sort((a, b) => b.variants.length - a.variants.length)
    .slice(0, 6);
  const popularBikes = BIKE_FAMILIES.filter((f) => f.priceMin > 0).slice(0, 4);
  const topBrands = BRANDS.slice(0, 8);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-400">Error 404</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            The page may have moved, or the model you&apos;re looking for might be listed under a
            different name. Try searching below.
          </p>

          <div className="mt-7 max-w-2xl mx-auto text-left">
            <ModelAutocomplete size="lg" placeholder="Search any model — try “Corolla”, “Civic”, “CD 70”…" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { l: 'Home', h: '/', I: Home },
              { l: 'All Cars', h: '/cars', I: Car },
              { l: 'All Bikes', h: '/bikes', I: Bike },
            ].map(({ l, h, I }) => (
              <Link key={h} href={h} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-colors">
                <I className="w-4 h-4" aria-hidden="true" /> {l}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <section aria-labelledby="pc-h">
          <h2 id="pc-h" className="text-xl font-black tracking-tight text-slate-900">Popular Cars</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularCars.map((f) => (
              <li key={f.url}>
                <Link href={f.url} className="group block rounded-xl bg-white border border-slate-200 hover:border-slate-900 transition-colors p-3 h-full">
                  <span className="block text-[12px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {f.brand} {f.name}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">From {formatPKR(f.priceMin)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pb-h">
          <h2 id="pb-h" className="text-xl font-black tracking-tight text-slate-900">Popular Bikes</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularBikes.map((f) => (
              <li key={f.url}>
                <Link href={f.url} className="group block rounded-xl bg-white border border-slate-200 hover:border-slate-900 transition-colors p-3 h-full">
                  <span className="block text-[12px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {f.brand} {f.name}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">From {formatPKR(f.priceMin)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pbr-h">
          <h2 id="pbr-h" className="text-xl font-black tracking-tight text-slate-900">Popular Brands</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {topBrands.map((b) => (
              <li key={b.slug}>
                <Link href={`/brands/${b.slug}`} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors">
                  <img src={b.logo} alt="" aria-hidden="true" className="w-5 h-5 object-contain" width={20} height={20} />
                  {b.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/brands" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">
                All brands <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
