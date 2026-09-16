'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bike, Car } from 'lucide-react';
import { BRANDS, BIKE_BRANDS, type Brand } from '@/lib/brands-data';
import { useLanguage } from './LanguageContext';

function BrandTile({ brand, dark = false }: { brand: Brand; dark?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const initials = brand.name.split(/[\s-]/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group relative flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
      aria-label={`${brand.name} — prices and models in Pakistan`}
    >
      {/* Accent glow on hover */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${brand.accent} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`}
        aria-hidden="true"
      />

      <span className="relative">
        {/* Glow halo */}
        <span
          className={`absolute -inset-1.5 rounded-full bg-gradient-to-br ${brand.accent} opacity-0 group-hover:opacity-100 blur-[8px] transition-opacity duration-300`}
          aria-hidden="true"
        />

        {/* White circular container for the emblem */}
        <span
          className={`relative w-[82px] h-[82px] rounded-full flex items-center justify-center p-3 overflow-hidden transition-all duration-300 bg-white border ${
            dark
              ? 'border-white/20 group-hover:border-white/60'
              : 'border-slate-200 group-hover:border-slate-900 group-hover:ring-4 group-hover:ring-slate-100'
          } shadow-[0_2px_8px_rgba(15,23,42,0.06)] group-hover:shadow-xl`}
        >
          {!imgError && brand.logo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={brand.logo}
              alt={`${brand.name} official emblem`}
              className="w-12 h-12 max-h-12 max-w-12 object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              width={48}
              height={48}
              onError={() => setImgError(true)}
            />
          ) : (
            <span
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${brand.accent} text-white flex items-center justify-center font-black text-sm shadow-sm`}
            >
              {initials}
            </span>
          )}
        </span>

        {brand.isNew && (
          <span className="absolute -top-0.5 -right-0.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[8px] font-black uppercase tracking-wide shadow-md ring-2 ring-white">
            New
          </span>
        )}
      </span>

      <span className="relative text-center">
        <span
          className={`block text-[13px] font-bold leading-tight transition-colors ${
            dark ? 'text-slate-200 group-hover:text-white' : 'text-slate-900 group-hover:text-teal-700'
          }`}
        >
          {brand.name}
        </span>
        <span
          className={`block text-[11px] font-medium mt-0.5 transition-colors ${
            dark ? 'text-slate-500 group-hover:text-teal-300' : 'text-slate-500 group-hover:text-teal-700'
          }`}
        >
          {brand.models.length} models
        </span>
      </span>
    </Link>
  );
}

export default function BrandGrid({
  defaultTab = 'cars',
  showHeading = true,
  heading = 'Browse by Make',
  dark = false,
  showTabs = true,
}: {
  defaultTab?: 'cars' | 'bikes';
  showHeading?: boolean;
  heading?: string;
  dark?: boolean;
  showTabs?: boolean;
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'cars' | 'bikes'>(defaultTab);
  const [showAll, setShowAll] = useState(false);

  const list = tab === 'cars' ? BRANDS : BIKE_BRANDS;
  const limit = tab === 'cars' ? 24 : 12;
  const visible = showAll ? list : list.slice(0, limit);

  return (
    <section className={`py-16 border-y ${dark ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600">
                {BRANDS.length + BIKE_BRANDS.length} Brands in Pakistan
              </span>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mt-1 ${dark ? 'text-white' : 'text-slate-900'}`}>
                {tab === 'cars' ? t('section.browseByMake', heading) : t('nav.bikes', 'Bikes & Scooties by Make')}
              </h2>
              <p className={`text-sm mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tab === 'cars'
                  ? 'Official emblems of car manufacturers and new EV/hybrid brands entering Pakistan'
                  : 'Motorcycles and electric scooties from verified Pakistani & global manufacturers'}
              </p>
            </div>

            {showTabs && (
              <div className={`inline-flex p-1 rounded-xl shrink-0 ${dark ? 'bg-white/10' : 'bg-slate-100'}`}>
                <button
                  type="button"
                  onClick={() => { setTab('cars'); setShowAll(false); }}
                  className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    tab === 'cars'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : dark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Car className="w-4 h-4" /> Cars
                </button>
                <button
                  type="button"
                  onClick={() => { setTab('bikes'); setShowAll(false); }}
                  className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    tab === 'bikes'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : dark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bike className="w-4 h-4" /> Bikes
                </button>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-3">
          {visible.map((b) => (
            <BrandTile key={b.slug} brand={b} dark={dark} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {list.length > visible.length && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-[13px] font-bold transition-colors shadow-sm hover:shadow-md cursor-pointer"
            >
              Show All {list.length} Brands
            </button>
          )}
          <Link
            href="/brands"
            className={`group inline-flex items-center px-6 py-2.5 rounded-xl border text-[13px] font-bold transition-colors ${
              dark
                ? 'border-white/25 text-white hover:bg-white/10'
                : 'border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            All Brands &amp; Models Directory
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
