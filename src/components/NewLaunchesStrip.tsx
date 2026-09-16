import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NEW_LAUNCH_BRANDS } from '@/lib/brands-data';

export default function NewLaunchesStrip() {
  return (
    <section className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-[0.18em]">
              <Sparkles className="w-3 h-3" />
              2026 Launches
            </span>
            <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              New Brands in Pakistan
            </h2>
          </div>
          <Link href="/upcoming-cars-pakistan" className="text-[13px] font-bold text-slate-900 hover:text-teal-700 inline-flex items-center">
            Launch calendar
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
          {NEW_LAUNCH_BRANDS.map((b) => {
            const evCount = b.models.filter((m) => ['EV', 'PHEV', 'REEV', 'Hybrid'].includes(m.pt)).length;
            return (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="group snap-start shrink-0 w-[168px] rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all p-4 flex flex-col items-center text-center"
              >
                <span className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden mb-3">
                  <img src={b.logo} alt={`${b.name} logo`} className="w-10 h-10 object-contain" loading="lazy" width={40} height={40} />
                </span>
                <span className="text-[13px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{b.name}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  {b.models.length} models{evCount ? ` · ${evCount} electrified` : ''}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
