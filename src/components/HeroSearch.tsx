'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Car, Bike } from 'lucide-react';
import { searchModels, type SearchHit } from '@/lib/catalog';
import { useLanguage } from './LanguageContext';

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar','Quetta','Sialkot','Hyderabad'];

const PRICE_BANDS = [
  { label: 'Under PKR 10 Lacs', v: '0-1000000' },
  { label: 'PKR 10 – 20 Lacs', v: '1000000-2000000' },
  { label: 'PKR 20 – 40 Lacs', v: '2000000-4000000' },
  { label: 'PKR 40 – 70 Lacs', v: '4000000-7000000' },
  { label: 'PKR 70 Lacs – 1 Crore', v: '7000000-10000000' },
  { label: 'Above PKR 1 Crore', v: '10000000-0' },
];

/** Hero search bar: model autocomplete + city + price, styled as one unified control. */
export default function HeroSearch() {
  const router = useRouter();
  const { t } = useLanguage();
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const hits = useMemo<SearchHit[]>(() => (q.trim() ? searchModels(q, 7) : []), [q]);
  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function runSearch() {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (city) p.set('city', city);
    if (price) p.set('price', price);
    router.push(`/used-cars?${p.toString()}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (open && hits.length) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % hits.length); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i - 1 + hits.length) % hits.length); return; }
      if (e.key === 'Enter' && hits[active]) { e.preventDefault(); router.push(hits[active].url); return; }
      if (e.key === 'Escape') { setOpen(false); return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); runSearch(); }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0 md:rounded-xl md:overflow-hidden md:shadow-2xl">
        {/* Model / make input */}
        <div ref={boxRef} className="relative flex-1 md:flex-[1.4]">
          <label htmlFor="hero-q" className="sr-only">{t('hero.makeOrModel', 'Car Make or Model')}</label>
          <input
            id="hero-q"
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={t('hero.makeOrModel', 'Car Make or Model')}
            autoComplete="off"
            role="combobox"
            aria-expanded={open && hits.length > 0}
            aria-controls="hero-suggestions"
            aria-autocomplete="list"
            className="w-full h-14 px-4 text-[15px] bg-white text-slate-900 placeholder:text-slate-400 rounded-xl md:rounded-none border border-slate-200 md:border-0 md:border-r focus:outline-none focus:ring-2 focus:ring-teal-500 md:focus:ring-inset"
          />

          {open && q.trim() && (
            <ul
              id="hero-suggestions" role="listbox"
              className="absolute z-50 left-0 right-0 mt-1 md:mt-2 rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden max-h-80 overflow-y-auto text-left"
            >
              {hits.length ? hits.map((h, i) => (
                <li key={h.url} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => router.push(h.url)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors ${i === active ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
                  >
                    <span className="w-8 h-8 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                      <img src={h.logo} alt="" aria-hidden="true" className="w-5 h-5 object-contain" width={20} height={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-bold truncate ${i === active ? 'text-white' : 'text-slate-900'}`}>
                        {h.brand} {h.model}
                      </span>
                      <span className={`block text-[11px] truncate ${i === active ? 'text-slate-300' : 'text-slate-500'}`}>
                        {h.brand} • {h.body}
                      </span>
                    </span>
                    <span className={i === active ? 'text-teal-300' : 'text-slate-300'} aria-hidden="true">
                      {h.type === 'Bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                    </span>
                  </button>
                </li>
              )) : (
                <li className="px-4 py-5 text-center text-xs text-slate-500">
                  No models match “{q}”. Press Enter to search all used cars.
                </li>
              )}
            </ul>
          )}
        </div>

        {/* City */}
        <div className="flex-1">
          <label htmlFor="hero-city" className="sr-only">{t('hero.allCities', 'All Cities')}</label>
          <select
            id="hero-city" value={city} onChange={(e) => setCity(e.target.value)}
            className="w-full h-14 px-4 text-[15px] bg-white text-slate-700 rounded-xl md:rounded-none border border-slate-200 md:border-0 md:border-r focus:outline-none focus:ring-2 focus:ring-teal-500 md:focus:ring-inset"
          >
            <option value="">{t('hero.allCities', 'All Cities')}</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price */}
        <div className="flex-1">
          <label htmlFor="hero-price" className="sr-only">{t('hero.priceRange', 'Price Range')}</label>
          <select
            id="hero-price" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full h-14 px-4 text-[15px] bg-white text-slate-700 rounded-xl md:rounded-none border border-slate-200 md:border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 md:focus:ring-inset"
          >
            <option value="">{t('hero.priceRange', 'Price Range')}</option>
            {PRICE_BANDS.map((p) => <option key={p.v} value={p.v}>{p.label}</option>)}
          </select>
        </div>

        {/* Submit */}
        <button
          type="button" onClick={runSearch} aria-label={t('hero.searchCars', 'Search Cars')}
          className="h-14 px-8 md:px-7 bg-teal-600 hover:bg-teal-500 text-white font-bold text-[15px] rounded-xl md:rounded-none transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          <span className="md:hidden">{t('hero.searchCars', 'Search Cars')}</span>
        </button>
      </div>

      {/* Find more button */}
      <div className="mt-6 text-center">
        <a
          href="/used-cars"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg border border-white/35 text-white text-[13px] font-semibold hover:bg-white/10 transition-colors shadow-sm"
        >
          {t('hero.findMore', 'Find More ›')}
        </a>
      </div>
    </div>
  );
}
