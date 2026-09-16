'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import HeroSearch from './HeroSearch';
import { HERO } from '@/lib/media';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden isolate">
      {/* Showroom Backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO.showroom}
          alt="Premium luxury car showroom interior with polished reflections"
          className="w-full h-full object-cover object-center scale-105"
          fetchPriority="high"
        />
        {/* Cinematic gradient layers for deep rich showroom look */}
        <div className="absolute inset-0 bg-slate-950/78" />
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_50%_8%,rgba(255,255,255,0.18),transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-slate-950" />
        {/* Warm key light + cool ambient fill */}
        <div className="absolute -top-28 left-1/4 h-[440px] w-[440px] rounded-full bg-amber-300/10 blur-[130px]" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/5 h-[420px] w-[420px] rounded-full bg-teal-400/10 blur-[130px]" aria-hidden="true" />
        {/* Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(2,6,23,0.85)]" aria-hidden="true" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-sm text-[11px] font-bold uppercase tracking-[0.22em] text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
          {t('hero.platform', "Pakistan's Automotive Platform")}
        </p>

        <h1 className="mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.6rem] font-black tracking-[-0.03em] leading-[1.06] drop-shadow-[0_2px_24px_rgba(2,6,23,0.6)]">
          {t('hero.title', 'Find Used Cars in Pakistan')}
        </h1>
        <p className="mt-4 text-base sm:text-xl text-slate-300/95 max-w-2xl mx-auto">
          {t('hero.subtitle', 'With thousands of cars, we have just the right one for you')}
        </p>

        <div className="mt-10">
          <HeroSearch />
        </div>

        <nav aria-label="Popular searches" className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mr-1">
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
              className="px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/20 hover:border-white/30 transition-colors"
            >
              {l}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
