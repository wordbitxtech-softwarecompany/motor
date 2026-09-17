'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Bike } from 'lucide-react';
import ModelCard from '@/components/ModelCard';
import { BIKE_BRANDS } from '@/lib/brands-data';

type Filter = 'all' | 'electric' | 'petrol' | string; // string = brand slug

export default function BikeBrandExplorer() {
  const [active, setActive] = useState<Filter>('all');

  const allModels = useMemo(
    () =>
      BIKE_BRANDS.flatMap((b) =>
        b.models.map((m) => ({ ...m, brand: b.name, brandSlug: b.slug }))
      ),
    []
  );

  const shown = useMemo(() => {
    if (active === 'all') return allModels;
    if (active === 'electric') return allModels.filter((m) => m.pt === 'EV');
    if (active === 'petrol') return allModels.filter((m) => m.pt !== 'EV');
    return allModels.filter((m) => m.brandSlug === active);
  }, [allModels, active]);

  const activeBrand = BIKE_BRANDS.find((b) => b.slug === active);

  return (
    <div className="space-y-8">
      {/* Brand slider */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Shop by Bike Brand</h2>
          <Link href="/brands" className="text-[13px] font-bold text-slate-900 hover:text-teal-700 inline-flex items-center">
            All brands <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x scroll-smooth">
          {/* Quick filters */}
          <button
            type="button"
            onClick={() => setActive('all')}
            className={`snap-start shrink-0 w-[112px] rounded-2xl border p-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
              active === 'all'
                ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-md'
            }`}
          >
            <span className={`w-14 h-14 rounded-full flex items-center justify-center ${active === 'all' ? 'bg-white/15' : 'bg-slate-100'}`}>
              <Bike className={`w-6 h-6 ${active === 'all' ? 'text-white' : 'text-slate-700'}`} />
            </span>
            <span className="text-[12px] font-bold">All</span>
          </button>

          <button
            type="button"
            onClick={() => setActive('electric')}
            className={`snap-start shrink-0 w-[112px] rounded-2xl border p-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
              active === 'electric'
                ? 'border-teal-500 bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                : 'border-slate-200 bg-white hover:border-teal-400 hover:shadow-md'
            }`}
          >
            <span className={`w-14 h-14 rounded-full flex items-center justify-center ${active === 'electric' ? 'bg-white/20' : 'bg-teal-50'}`}>
              <Zap className={`w-6 h-6 ${active === 'electric' ? 'text-white' : 'text-teal-600'}`} />
            </span>
            <span className="text-[12px] font-bold">Electric</span>
          </button>

          {/* Brand tiles */}
          {BIKE_BRANDS.map((b) => {
            const on = active === b.slug;
            return (
              <button
                key={b.slug}
                type="button"
                onClick={() => setActive(b.slug)}
                className={`group snap-start shrink-0 w-[112px] rounded-2xl border p-3 flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1 ${
                  on
                    ? 'border-slate-900 bg-slate-900 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-md'
                }`}
                aria-pressed={on}
              >
                <span className="relative">
                  <span
                    className={`absolute -inset-1 rounded-full bg-gradient-to-br ${b.accent} opacity-0 group-hover:opacity-90 blur-[6px] transition-opacity`}
                    aria-hidden="true"
                  />
                  <span className="relative w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={b.logo} alt={`${b.name} logo`} className="w-9 h-9 object-contain" loading="lazy" />
                  </span>
                  {b.isNew && (
                    <span className="absolute -top-1 -right-1 px-1 py-0.5 rounded-full bg-teal-500 text-white text-[7px] font-black uppercase ring-2 ring-white">
                      New
                    </span>
                  )}
                </span>
                <span className={`text-[11px] font-bold text-center leading-tight ${on ? 'text-white' : 'text-slate-800'}`}>
                  {b.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
        <h3 className="text-lg font-black tracking-tight text-slate-900">
          {active === 'all' && 'All Bikes & Scooties'}
          {active === 'electric' && 'Electric Bikes & Scooties'}
          {active === 'petrol' && 'Petrol Motorcycles'}
          {activeBrand && `${activeBrand.name} Bikes`}
        </h3>
        <span className="text-xs font-semibold text-slate-500">{shown.length} models</span>
      </div>

      {activeBrand && (
        <p className="text-sm text-slate-500 -mt-4">{activeBrand.tagline}</p>
      )}

      {/* Models */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {shown.map((m, i) => (
          <ModelCard key={`${m.brandSlug}-${m.name}`} model={m} brandName={m.brand} brandSlug={m.brandSlug} index={i} />
        ))}
      </div>
    </div>
  );
}
