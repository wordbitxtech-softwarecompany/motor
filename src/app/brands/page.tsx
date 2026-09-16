import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BRANDS, BIKE_BRANDS, totalModelCount } from '@/lib/brands-data';
import { Car, Bike, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car & Bike Brands in Pakistan | Prices',
  description:
    'Every car and bike brand in Pakistan — Toyota, Honda, Suzuki, Kia, Hyundai, MG, BYD, Changan, Haval and more with model prices and specs.',
  alternates: { canonical: '/brands' },
  keywords: [
    'car brands in Pakistan',
    'all car companies Pakistan',
    'bike brands Pakistan',
    'car prices Pakistan 2026',
    'electric car brands Pakistan',
    'electric scooty Pakistan',
    'new car models Pakistan',
  ],
};

function BrandRow({ brands, kind }: { brands: typeof BRANDS; kind: 'car' | 'bike' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {brands.map((b) => {
        const initials = b.name.split(/[\s-]/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
        return (
          <Link
            key={b.slug}
            href={`/brands/${b.slug}`}
            className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all"
          >
            <span className="w-16 h-16 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
              {b.logo ? (
                <img src={b.logo} alt={`${b.name} logo`} className="w-10 h-10 object-contain" loading="lazy" width={40} height={40} />
              ) : (
                <span className={`w-10 h-10 rounded-full bg-gradient-to-br ${b.accent} text-white flex items-center justify-center font-black text-sm`} aria-hidden="true">
                  {initials}
                </span>
              )}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[15px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {b.name}
                {b.isNew && <span className="px-1.5 py-0.5 rounded bg-teal-600 text-white text-[9px] font-black uppercase tracking-wide">New</span>}
              </span>
              <span className="block text-[11px] text-slate-400 font-medium mb-1">
                {b.origin} · {b.models.length} models
              </span>
              <span className="block text-xs text-slate-500 leading-relaxed line-clamp-2">{b.tagline}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function BrandsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <header className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-400">
            Brand Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            All Car &amp; Bike Brands in Pakistan
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Browse {BRANDS.length} car brands and {BIKE_BRANDS.length} bike &amp; electric scooter brands —
            {' '}{totalModelCount()}+ models with PKR pricing, powertrain details and availability across Pakistan.
          </p>
        </header>

        {/* Cars */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h2 className="text-2xl font-black tracking-tight text-slate-900">Car Brands</h2>
            <span className="text-xs font-semibold text-slate-400">({BRANDS.length})</span>
          </div>
          <BrandRow brands={BRANDS} kind="car" />
        </section>

        {/* Bikes */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Bike className="w-5 h-5 text-teal-700" aria-hidden="true" />
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Bike &amp; Electric Scooter Brands
            </h2>
            <span className="text-xs font-semibold text-slate-400">({BIKE_BRANDS.length})</span>
          </div>
          <BrandRow brands={BIKE_BRANDS} kind="bike" />
        </section>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Can&apos;t find the brand you&apos;re looking for?</h2>
            <p className="text-xs text-slate-500 mt-1">
              Tell our team what you need and we&apos;ll source it through our import and dealer network.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors shrink-0"
          >
            Request a Vehicle
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
