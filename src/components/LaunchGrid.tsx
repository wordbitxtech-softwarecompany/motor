import React from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { formatPKR, formatPowertrain } from '@/lib/utils';
import type { ModelFamily } from '@/lib/catalog';

const STATUS_STYLE: Record<string, string> = {
  'New Arrival': 'bg-teal-50 text-teal-700 border-teal-200',
  'Available in Pakistan': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Coming Soon': 'bg-amber-50 text-amber-700 border-amber-200',
  Expected: 'bg-amber-50 text-amber-700 border-amber-200',
  'Pre-Launch': 'bg-violet-50 text-violet-700 border-violet-200',
};

function shortDesc(f: ModelFamily) {
  const pt = f.powertrains[0];
  const kind = f.kind === 'bike' ? 'two-wheeler' : f.body.toLowerCase();
  if (pt === 'EV') return `Battery-electric ${kind}${f.range ? ` with a rated range of ${f.range}` : ''}.`;
  if (pt === 'REEV') return `Electric-drive ${kind} with a petrol range extender${f.range ? ` — ${f.range}` : ''}.`;
  if (pt === 'PHEV') return `Plug-in hybrid ${kind}${f.range ? ` offering ${f.range}` : ''}.`;
  if (pt === 'Hybrid') return `Self-charging hybrid ${kind} focused on fuel economy.`;
  return `${pt} ${kind} listed for the Pakistani market.`;
}

export default function LaunchGrid({ families }: { families: ModelFamily[] }) {
  if (families.length === 0) {
    return (
      <p className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-sm text-slate-500">
        No launches listed for this category yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {families.map((f) => {
        const confirmed = f.priceMin > 0;
        return (
          <article
            key={f.url}
            className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            <Link href={f.url} className="relative block aspect-[16/10] bg-slate-100 overflow-hidden">
              <img
                src={f.image}
                alt={`${f.brand} ${f.name} ${f.year} Pakistan`}
                className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                  f.image.endsWith('.svg') ? 'object-contain' : 'object-cover'
                }`}
                loading="lazy" width={400} height={250}
              />
              <span className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wide rounded bg-slate-900 text-white">
                  {f.year}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${STATUS_STYLE[f.status] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                  {f.status}
                </span>
              </span>
              <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                <img src={f.brandLogo} alt="" aria-hidden="true" className="w-6 h-6 object-contain" width={24} height={24} />
              </span>
            </Link>

            <div className="p-4 flex-1 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">{f.brand}</p>
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug mt-0.5">
                <Link href={f.url} className="hover:text-teal-700 transition-colors">{f.name}</Link>
              </h3>

              <p className="text-xs text-slate-500 mt-2 leading-relaxed flex-1">{shortDesc(f)}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">{f.body}</span>
                {f.powertrains.slice(0, 2).map((p) => (
                  <span key={p} className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 text-teal-700">{formatPowertrain(p)}</span>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {confirmed ? 'Starting price' : 'Price'}
                </p>
                <p className="text-base font-black text-[#c8102e]">
                  {confirmed ? formatPKR(f.priceMin) : 'Not officially confirmed'}
                </p>
              </div>

              <Link
                href={f.url}
                className="mt-3 inline-flex items-center justify-center w-full py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function LaunchDisclaimer() {
  return (
    <p className="flex items-start gap-2 text-xs text-slate-600 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3">
      <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
      Models marked <strong className="mx-1">Coming Soon</strong>, <strong className="mx-1">Expected</strong> or
      <strong className="mx-1">Pre-Launch</strong> are not yet officially on sale. Their specifications and prices
      are not confirmed by the manufacturer and may change at launch.
    </p>
  );
}
