'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Zap, Tag } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import { UPCOMING_MODELS } from '@/lib/upcoming-models';

type TabKey = 'launched' | 'upcoming' | 'ev' | 'hybrid' | 'popular';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'launched', label: 'Newly Launched' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ev', label: 'EV' },
  { key: 'hybrid', label: 'Hybrid' },
  { key: 'popular', label: 'Popular' },
];

export default function LatestCarsSection({ vehicles }: { vehicles: any[] }) {
  const [tab, setTab] = useState<TabKey>('launched');

  const launched = vehicles.filter((v) => v.condition === 'Brand New' && v.availabilityStatus === 'Available in Pakistan');
  const evs = vehicles.filter((v) => v.powertrain === 'EV');
  const hybrids = vehicles.filter((v) => v.powertrain === 'Hybrid' || v.powertrain === 'PHEV');
  const popular = vehicles.filter((v) => v.isFeatured);

  const showCars = (list: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((car) => (
        <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
      ))}
    </div>
  );

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Market Watch 2026</span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
            What&apos;s New in Pakistan
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-xl">
            Explore the latest cars, new launches and next-generation vehicles entering the Pakistani market.
          </p>
        </div>
        <Link
          href="/cars"
          className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors"
        >
          View all cars
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
              tab === t.key
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'launched' && showCars(launched)}
      {tab === 'upcoming' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {UPCOMING_MODELS.map((m, idx) => (
            <div
              key={m.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 ${
                idx > 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                      {m.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{m.note}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 pl-13 sm:pl-0">
                <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {m.status}
                </span>
                <span className="text-xs text-slate-400">{m.window}</span>
              </div>
            </div>
          ))}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
            Market availability varies by city. Launch windows are indicative and subject to change.
          </div>
        </div>
      )}
      {tab === 'ev' && showCars(evs)}
      {tab === 'hybrid' && showCars(hybrids)}
      {tab === 'popular' && showCars(popular)}

      {tab === 'ev' && (
        <div className="mt-8">
          <Link
            href="/electric-cars-pakistan"
            className="inline-flex items-center text-[13px] font-bold text-teal-700 hover:text-teal-800"
          >
            Explore all electric cars in Pakistan
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      )}
      {tab === 'hybrid' && (
        <div className="mt-8">
          <Link
            href="/hybrid-cars-pakistan"
            className="inline-flex items-center text-[13px] font-bold text-teal-700 hover:text-teal-800"
          >
            Explore all hybrid & PHEV cars in Pakistan
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
