'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import HeroSearch from './HeroSearch';
import { HERO, mediaUrl } from '@/lib/media';

const TABS = [
  { id: 'used', label: 'Used Cars', dest: '/used-cars' },
  { id: 'new', label: 'New Cars', dest: '/new-cars-pakistan' },
  { id: 'bikes', label: 'Bikes', dest: '/bikes' },
] as const;

export default function HeroSection() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('used');
  const dest = TABS.find((x) => x.id === tab)?.dest || '/used-cars';

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden isolate">
      <div className="absolute inset-0 -z-10">
        <img
          src={mediaUrl(HERO.showroom)}
          alt="Premium cars for sale in Pakistan — MOTOR marketplace"
          className="w-full h-full object-cover object-[center_40%] scale-105"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
        <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-slate-800 text-[11px] font-bold uppercase tracking-[0.18em] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" aria-hidden="true" />
          {t('hero.platform', "Pakistan's Automotive Marketplace")}
        </p>

        <h1 className="mt-5 text-[2.15rem] sm:text-5xl lg:text-[3.4rem] font-black tracking-[-0.03em] leading-[1.08] drop-shadow-[0_2px_18px_rgba(2,6,23,0.45)]">
          {t('hero.title', 'Find Used Cars in Pakistan')}
        </h1>
        <p className="mt-3 text-base sm:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
          {t('hero.subtitle', 'With thousands of cars, bikes and EVs, we have just the right one for you')}
        </p>

        <div className="mt-8 w-full max-w-4xl mx-auto text-left">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-slate-100">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-1 sm:flex-none px-5 py-3 text-[13px] font-bold transition-colors ${
                    tab === item.id
                      ? 'text-[#c8102e] border-b-2 border-[#c8102e] bg-red-50/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <HeroSearch destination={dest} stacked />
          </div>
          <div className="mt-5 text-center">
            <a
              href={dest}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg border border-white/50 bg-white/15 text-white text-[13px] font-semibold hover:bg-white/25 transition-colors shadow-sm backdrop-blur-sm"
            >
              {t('hero.findMore', 'Find More ›')}
            </a>
          </div>
        </div>

        <nav aria-label="Popular searches" className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-white/80 mr-1">
            {t('hero.popular', 'Popular:')}
          </span>
          {[
            ['Toyota Corolla', '/cars/toyota/corolla'],
            ['Honda Civic', '/cars/honda/civic'],
            ['Suzuki Alto', '/cars/suzuki/alto'],
            ['Toyota Yaris', '/cars/toyota/yaris'],
            ['Honda CD 70', '/bikes/honda-bikes/cd-70'],
          ].map(([l, h]) => (
            <Link
              key={h}
              href={h}
              className="px-3.5 py-1.5 rounded-full bg-white/90 text-slate-800 text-xs font-semibold hover:bg-white transition-colors shadow-sm"
            >
              {l}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
