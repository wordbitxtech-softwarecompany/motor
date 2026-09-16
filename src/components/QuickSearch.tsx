'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, KeyRound, Car, Sparkles, MapPin, ArrowRight, Zap } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function QuickSearch() {
  const router = useRouter();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'buy' | 'rent'>('buy');
  const [make, setMake] = useState('');
  const [powertrain, setPowertrain] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set('make', make);
    if (powertrain) params.set('powertrain', powertrain);
    if (bodyType) params.set('bodyType', bodyType);
    if (priceMax) params.set('priceMax', priceMax);
    if (location) params.set('location', location);

    if (tab === 'buy') {
      router.push(`/cars?${params.toString()}`);
    } else {
      router.push(`/rent?${params.toString()}`);
    }
  };

  const quickPills = [
    { label: '⚡ Electric (EV)', powertrain: 'EV' },
    { label: '🔋 Range Extended (REEV)', powertrain: 'REEV' },
    { label: '🌿 Hybrids (HEV)', powertrain: 'Hybrid' },
    { label: '🔌 Plug-in Hybrid (PHEV)', powertrain: 'PHEV' },
    { label: '🚙 SUVs & 4x4', type: 'SUV' },
    { label: 'Family Sedans', type: 'Sedan' },
    { label: 'German Luxury', type: 'Luxury' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8 max-w-5xl mx-auto -mt-14 relative z-20">
      {/* Search Header & Tab Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-500" />
            Pakistan Automotive Marketplace
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Find Your Next Car in Pakistan
          </h2>
        </div>

        {/* Buy / Rent Switch */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setTab('buy')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
              tab === 'buy'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{t('buyCar')}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('rent')}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
              tab === 'rent'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{t('rentCar')}</span>
          </button>
        </div>
      </div>

      {/* Main Search Filter Form */}
      <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Powertrain Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Powertrain / Fuel
          </label>
          <select
            value={powertrain}
            onChange={(e) => setPowertrain(e.target.value)}
            className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition"
          >
            <option value="">All Powertrains</option>
            <option value="EV">Electric (EV)</option>
            <option value="REEV">Range Extended (REEV)</option>
            <option value="Hybrid">Hybrid (HEV)</option>
            <option value="PHEV">Plug-in Hybrid (PHEV)</option>
            <option value="Petrol">Petrol / Conventional</option>
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Make / Manufacturer
          </label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Deepal">Deepal (REEV/EV)</option>
            <option value="MG">MG (Hybrid/PHEV)</option>
            <option value="AVATR">AVATR (Luxury EV)</option>
            <option value="Changan">Changan</option>
            <option value="OMODA">OMODA (PHEV)</option>
            <option value="Jaecoo">Jaecoo (PHEV)</option>
            <option value="KIA">KIA</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="BMW">BMW</option>
          </select>
        </div>

        {/* Body Type */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Body Type
          </label>
          <select
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
            className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition"
          >
            <option value="">All Body Styles</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV / Crossover</option>
            <option value="Luxury">Executive / Luxury</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* Budget Max (PKR) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            {tab === 'buy' ? 'Max Budget (PKR)' : 'Max Daily Rate'}
          </label>
          <select
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition"
          >
            <option value="">Any Budget</option>
            {tab === 'buy' ? (
              <>
                <option value="6000000">Up to 60 Lacs (PKR 6.0M)</option>
                <option value="10000000">Up to 1.0 Crore (PKR 10M)</option>
                <option value="15000000">Up to 1.5 Crore (PKR 15M)</option>
                <option value="25000000">Up to 2.5 Crore (PKR 25M)</option>
                <option value="40000000">Up to 4.0 Crore (PKR 40M)</option>
              </>
            ) : (
              <>
                <option value="10000">Under PKR 10,000 / day</option>
                <option value="18000">Under PKR 18,000 / day</option>
                <option value="30000">Under PKR 30,000 / day</option>
                <option value="60000">Under PKR 60,000 / day</option>
              </>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{tab === 'buy' ? t('searchCars') : 'Find Rentals'}</span>
          </button>
        </div>
      </form>

      {/* Popular Quick Filter Chips */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-medium text-slate-400 mr-2">Quick filters:</span>
        {quickPills.map((pill, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (pill.powertrain) setPowertrain(pill.powertrain);
              if (pill.type) setBodyType(pill.type);
            }}
            className="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200/80 transition"
          >
            {pill.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setMake('');
            setPowertrain('');
            setBodyType('');
            setPriceMax('');
            setLocation('');
          }}
          className="text-xs text-slate-400 hover:text-slate-600 underline ml-auto"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
