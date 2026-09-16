'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Gauge, Fuel, Settings2, X } from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export interface UsedCar {
  id: string;
  reference?: string;
  make: string;
  model: string;
  variant?: string | null;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  city: string;
  image: string;
  bodyType?: string | null;
  source: 'listing' | 'catalog';
  href: string;
}

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar','Quetta','Sialkot','Hyderabad'];
const FUELS = ['Petrol','Diesel','Hybrid','Electric','CNG'];
const TRANS = ['Manual','Automatic','CVT','AGS / AMT'];

const PRICE_BANDS = [
  { l: 'Under 10 Lacs', max: 1_000_000 },
  { l: '10 – 20 Lacs', min: 1_000_000, max: 2_000_000 },
  { l: '20 – 40 Lacs', min: 2_000_000, max: 4_000_000 },
  { l: '40 – 70 Lacs', min: 4_000_000, max: 7_000_000 },
  { l: '70 Lacs – 1 Cr', min: 7_000_000, max: 10_000_000 },
  { l: 'Above 1 Crore', min: 10_000_000 },
];

export default function UsedCarsExplorer({
  cars,
  initialCity = '',
  initialQuery = '',
}: {
  cars: UsedCar[];
  initialCity?: string;
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [make, setMake] = useState('');
  const [fuel, setFuel] = useState('');
  const [trans, setTrans] = useState('');
  const [band, setBand] = useState(-1);
  const [yearMin, setYearMin] = useState('');
  const [sort, setSort] = useState<'recent' | 'price-asc' | 'price-desc' | 'mileage' | 'year'>('recent');
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(24);

  const makes = useMemo(() => Array.from(new Set(cars.map((c) => c.make))).sort(), [cars]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const pb = band >= 0 ? PRICE_BANDS[band] : null;

    const out = cars.filter((c) => {
      if (term && !`${c.make} ${c.model} ${c.variant ?? ''}`.toLowerCase().includes(term)) return false;
      if (city && c.city !== city) return false;
      if (make && c.make !== make) return false;
      if (fuel && c.fuelType !== fuel) return false;
      if (trans && c.transmission !== trans) return false;
      if (yearMin && c.year < Number(yearMin)) return false;
      if (pb) {
        if (pb.min && c.price < pb.min) return false;
        if (pb.max && c.price >= pb.max) return false;
      }
      return true;
    });

    out.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'mileage') return a.mileage - b.mileage;
      if (sort === 'year') return b.year - a.year;
      // recent: real seller listings first
      if (a.source !== b.source) return a.source === 'listing' ? -1 : 1;
      return b.year - a.year;
    });
    return out;
  }, [cars, q, city, make, fuel, trans, band, yearMin, sort]);

  const active = [q, city, make, fuel, trans, yearMin].filter(Boolean).length + (band >= 0 ? 1 : 0);
  const reset = () => { setQ(''); setCity(''); setMake(''); setFuel(''); setTrans(''); setBand(-1); setYearMin(''); };

  const sel = 'w-full h-10 px-3 text-[13px] bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900';

  const Filters = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" /> Filters
          {active > 0 && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px]">{active}</span>}
        </h2>
        {active > 0 && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline">
            <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
          </button>
        )}
      </div>

      <div>
        <label htmlFor="uc-city" className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">City</label>
        <select id="uc-city" value={city} onChange={(e) => setCity(e.target.value)} className={sel}>
          <option value="">All cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="uc-make" className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Make</label>
        <select id="uc-make" value={make} onChange={(e) => setMake(e.target.value)} className={sel}>
          <option value="">All makes</option>
          {makes.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <fieldset>
        <legend className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Price range</legend>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_BANDS.map((p, i) => (
            <button
              key={p.l} type="button" onClick={() => setBand(band === i ? -1 : i)} aria-pressed={band === i}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
                band === i ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
              }`}
            >{p.l}</button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="uc-fuel" className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Fuel</label>
          <select id="uc-fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className={sel}>
            <option value="">Any</option>
            {FUELS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="uc-trans" className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Transmission</label>
          <select id="uc-trans" value={trans} onChange={(e) => setTrans(e.target.value)} className={sel}>
            <option value="">Any</option>
            {TRANS.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="uc-year" className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">Model year from</label>
        <select id="uc-year" value={yearMin} onChange={(e) => setYearMin(e.target.value)} className={sel}>
          <option value="">Any year</option>
          {[2024, 2022, 2020, 2018, 2015, 2010].map((y) => <option key={y} value={y}>{y} or newer</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24 rounded-2xl bg-white border border-slate-200 p-5">{Filters}</div>
      </aside>

      {/* Results */}
      <div className="lg:col-span-3 space-y-5">
        {/* Search + sort */}
        <div className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
            <label htmlFor="uc-q" className="sr-only">Search used cars</label>
            <input
              id="uc-q" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search make or model — e.g. Corolla"
              className="w-full h-11 pl-10 pr-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center gap-1.5 px-4 h-11 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" /> Filters{active > 0 ? ` (${active})` : ''}
            </button>
            <label htmlFor="uc-sort" className="sr-only">Sort results</label>
            <select id="uc-sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-11 px-3 text-[13px] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="recent">Most recent</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="mileage">Lowest mileage</option>
              <option value="year">Newest year</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">{filtered.length}</strong> {filtered.length === 1 ? 'vehicle' : 'vehicles'} found
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-12 text-center">
            <p className="text-sm text-slate-600">No vehicles match these filters.</p>
            <button type="button" onClick={reset} className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.slice(0, shown).map((c) => (
                <li key={c.id}>
                  <Link href={c.href} className="group block h-full rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all overflow-hidden">
                    <span className="relative block aspect-[16/10] bg-slate-100 overflow-hidden">
                      <img
                        src={c.image}
                        alt={`${c.year} ${c.make} ${c.model} for sale in ${c.city}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy" width={400} height={250}
                      />
                      {c.source === 'listing' && (
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-black uppercase">
                          Seller ad
                        </span>
                      )}
                    </span>
                    <span className="block p-4">
                      <span className="block text-[15px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {c.year} {c.make} {c.model}
                      </span>
                      {c.variant && <span className="block text-xs text-slate-500 mt-0.5 truncate">{c.variant}</span>}
                      <span className="block text-lg font-black text-slate-900 mt-2">{formatPKR(c.price)}</span>
                      <span className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 truncate"><Gauge className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{(c.mileage / 1000).toFixed(0)}k km</span>
                        <span className="flex items-center gap-1 truncate"><Fuel className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{c.fuelType}</span>
                        <span className="flex items-center gap-1 truncate"><Settings2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{c.transmission.split(' ')[0]}</span>
                      </span>
                      <span className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />{c.city}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {shown < filtered.length && (
              <div className="text-center pt-2">
                <button type="button" onClick={() => setShown((s) => s + 24)} className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 transition-colors">
                  Show more ({filtered.length - shown} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile filter drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative ml-auto w-[88%] max-w-sm h-full bg-white overflow-y-auto p-5">
            <button type="button" onClick={() => setOpen(false)} aria-label="Close filters" className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="pt-6">{Filters}</div>
            <button type="button" onClick={() => setOpen(false)} className="mt-6 w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
