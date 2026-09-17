import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Gauge } from 'lucide-react';
import type { PublicListing } from '@/lib/listings';
import { formatPKR, formatNumber } from '@/lib/utils';

export default function RecentSellerAds({ ads }: { ads: PublicListing[] }) {
  if (!ads.length) return null;

  return (
    <section aria-labelledby="recent-ads-h" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Just listed
            </span>
            <h2 id="recent-ads-h" className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
              Recent seller ads
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Fresh posts approved by our team — contact sellers directly.
            </p>
          </div>
          <Link
            href="/used-cars"
            className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors"
          >
            View all used cars
            <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ads.map((ad) => (
            <Link
              key={ad.reference}
              href={ad.href}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-400 hover:shadow-md transition-all"
            >
              <span className="block aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={ad.image}
                  alt={`${ad.year} ${ad.make} ${ad.model}`}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </span>
              <span className="block p-4">
                <span className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-black text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {ad.year} {ad.make} {ad.model}
                  </h3>
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live
                  </span>
                </span>
                {ad.variant && <p className="text-xs text-slate-500 mt-0.5 truncate">{ad.variant}</p>}
                <p className="mt-2 text-base font-black text-slate-900">{formatPKR(ad.price)}</p>
                <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {ad.city}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Gauge className="w-3 h-3" aria-hidden="true" />
                    {formatNumber(ad.mileage)} km
                  </span>
                  <span>{ad.fuelType}</span>
                  <span>{ad.transmission}</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
