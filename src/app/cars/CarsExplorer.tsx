'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Gauge,
  Fuel,
  GitFork,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  KeyRound,
  CheckCircle2,
  X,
  Zap,
  BatteryCharging
} from 'lucide-react';
import { VehicleProps } from '@/components/VehicleCard';
import { formatPKR, formatNumber } from '@/lib/utils';

export default function CarsExplorer({
  initialVehicles,
  initialFilters = {}
}: {
  initialVehicles: VehicleProps[];
  initialFilters?: {
    make?: string;
    powertrain?: string;
    bodyType?: string;
    priceMax?: string;
    location?: string;
    fuelType?: string;
    q?: string;
  };
}) {
  const [searchQuery, setSearchQuery] = useState(initialFilters.q || '');
  const [selectedPowertrain, setSelectedPowertrain] = useState(initialFilters.powertrain || '');
  const [selectedMake, setSelectedMake] = useState(initialFilters.make || '');
  const [selectedBodyType, setSelectedBodyType] = useState(initialFilters.bodyType || '');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.location || '');
  const [priceMax, setPriceMax] = useState(initialFilters.priceMax || '');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'mileage-asc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique makes
  const makes = useMemo(() => {
    return Array.from(new Set(initialVehicles.map(v => v.make))).sort();
  }, [initialVehicles]);

  const powertrains = [
    { label: 'All Powertrains', value: '' },
    { label: 'Electric (EV)', value: 'EV' },
    { label: 'Range Extended (REEV)', value: 'REEV' },
    { label: 'Plug-in Hybrid (PHEV)', value: 'PHEV' },
    { label: 'Hybrid (HEV)', value: 'Hybrid' },
    { label: 'Petrol', value: 'Petrol' },
  ];

  const bodyTypes = ['Sedan', 'SUV', 'Luxury', 'Hatchback', 'Crossover'];

  // Filtered & Sorted
  const filteredVehicles = useMemo(() => {
    return initialVehicles
      .filter((v) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = `${v.make} ${v.model} ${v.year} ${v.powertrain}`.toLowerCase().includes(q);
          const matchLocation = v.location.toLowerCase().includes(q);
          const matchBody = v.bodyType.toLowerCase().includes(q);
          if (!matchName && !matchLocation && !matchBody) return false;
        }

        if (selectedPowertrain && v.powertrain !== selectedPowertrain) return false;
        if (selectedMake && v.make !== selectedMake) return false;
        if (selectedBodyType && v.bodyType !== selectedBodyType) return false;
        if (selectedTransmission && !v.transmission.toLowerCase().includes(selectedTransmission.toLowerCase())) return false;
        if (selectedLocation && !v.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
        if (priceMax && v.price > 0 && v.price > Number(priceMax)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return b.year - a.year;
        if (sortBy === 'price-asc') return (a.price || 999999999) - (b.price || 999999999);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'mileage-asc') return a.mileage - b.mileage;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    initialVehicles,
    searchQuery,
    selectedPowertrain,
    selectedMake,
    selectedBodyType,
    selectedTransmission,
    selectedLocation,
    priceMax,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPowertrain('');
    setSelectedMake('');
    setSelectedBodyType('');
    setSelectedTransmission('');
    setSelectedLocation('');
    setPriceMax('');
    setSortBy('featured');
  };

  const activeFiltersCount = [
    selectedPowertrain,
    selectedMake,
    selectedBodyType,
    selectedTransmission,
    selectedLocation,
    priceMax,
    searchQuery,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Search and Controls Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by make, model, EV, Hybrid..."
            className="w-full h-10 pl-10 pr-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 text-slate-800 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center space-x-1 px-3 py-2 text-xs font-semibold bg-slate-100 rounded-xl text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <span className="hidden sm:inline font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Year</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="mileage-asc">Lowest Mileage</option>
            </select>
          </div>

          <div className="hidden sm:inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Powertrain Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span>Powertrain</span>
                <Zap className="w-3.5 h-3.5 text-cyan-600" />
              </label>
              <div className="space-y-1">
                {powertrains.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setSelectedPowertrain(p.value)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-xl transition flex items-center justify-between ${
                      selectedPowertrain === p.value
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{p.label}</span>
                    {selectedPowertrain === p.value && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Make */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Make / Brand</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
              >
                <option value="">All Brands</option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Body Type</label>
              <div className="flex flex-wrap gap-1.5">
                {bodyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedBodyType(selectedBodyType === type ? '' : type)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition ${
                      selectedBodyType === type
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Budget (Max PKR)</label>
              <select
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
              >
                <option value="">Any Budget</option>
                <option value="6000000">Up to 60 Lacs (PKR 6.0M)</option>
                <option value="10000000">Up to 1.0 Crore (PKR 10M)</option>
                <option value="15000000">Up to 1.5 Crore (PKR 15M)</option>
                <option value="25000000">Up to 2.5 Crore (PKR 25M)</option>
                <option value="40000000">Up to 4.0 Crore (PKR 40M)</option>
              </select>
            </div>

            {/* City Hub */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Pakistan Hub / Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800"
              >
                <option value="">All Locations</option>
                <option value="Gulberg">Lahore - Gulberg III Hub</option>
                <option value="DHA">Lahore - DHA Phase 5</option>
                <option value="Johar Town">Lahore - Johar Town</option>
                <option value="Islamabad">Islamabad & Twin Cities</option>
                <option value="Karachi">Karachi Hub</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200">
            <div>
              Showing <span className="font-bold text-slate-900">{filteredVehicles.length}</span> vehicles
            </div>
            {activeFiltersCount > 0 && (
              <div className="text-slate-400">
                Filtered from {initialVehicles.length} total Pakistan stock
              </div>
            )}
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No vehicles match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your powertrain filter, price budget, or reset filters to browse the complete Pakistani inventory.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((car) => {
                const isReev = car.powertrain === 'REEV';
                const isNev = ['EV', 'Hybrid', 'PHEV', 'REEV'].includes(car.powertrain || '');

                return (
                  <div
                    key={car.id}
                    className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Image Box */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={car.mainImage}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          {isNev && (
                            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-cyan-600 text-white rounded">
                              {car.powertrain}
                            </span>
                          )}
                          {car.availabilityStatus && (
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-900/90 text-white rounded border border-slate-700">
                              {car.availabilityStatus}
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-10">
                          {car.electricRange ? (
                            <span className="text-[10px] font-bold text-cyan-300 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-700">
                              <Zap className="w-3 h-3 mr-1 inline" />
                              {car.electricRange}
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-white/95 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                              <ShieldCheck className="w-3 h-3 mr-1 inline text-emerald-400" />
                              {car.condition}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 uppercase">
                            <span>{car.make} • {car.bodyType}</span>
                            <span className="text-slate-400 font-normal">{car.location.split(',')[0]}</span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                            <Link href={`/cars/${car.slug}`}>
                              {car.year} {car.make} {car.model}
                            </Link>
                          </h3>

                          {isReev && (
                            <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                              Electric drive with a range-extending petrol engine.
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-1 py-2 border-y border-slate-100 text-[11px] text-slate-600">
                          <div>{formatNumber(car.mileage)} km</div>
                          <div>{car.powertrain || car.fuelType}</div>
                          <div className="truncate">{car.transmission.split(' ')[0]}</div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                            {car.priceLabel || 'Ex-Factory'}
                          </span>
                          <span className="text-lg font-black text-slate-900">
                            {car.price > 0 ? formatPKR(car.price) : 'Price Coming Soon'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 pt-0 grid grid-cols-3 gap-1.5">
                      <Link
                        href={`/cars/${car.slug}`}
                        className="text-center py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/test-drive?car=${car.slug}`}
                        className="text-center py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                      >
                        Test Drive
                      </Link>
                      <a
                        href={`/contact?text=${encodeURIComponent(
                          `Hello MOTOR Pakistan, I am inquiring about ${car.year} ${car.make} ${car.model}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center justify-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-0.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredVehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col sm:flex-row gap-5 hover:shadow-md transition"
                >
                  <div className="sm:w-64 h-44 rounded-2xl overflow-hidden shrink-0 bg-slate-100 relative">
                    <img
                      src={car.mainImage}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-indigo-600 text-white rounded">
                        {car.powertrain || 'Petrol'}
                      </span>
                      {car.availabilityStatus && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-900 text-white rounded">
                          {car.availabilityStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold text-indigo-600">{car.make} • {car.bodyType}</p>
                          <h3 className="text-base font-bold text-slate-900">
                            <Link href={`/cars/${car.slug}`} className="hover:text-indigo-600">
                              {car.year} {car.make} {car.model}
                            </Link>
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-semibold">{car.priceLabel || 'Ex-Factory'}</span>
                          <span className="text-lg font-black text-slate-900">
                            {car.price > 0 ? formatPKR(car.price) : 'Price Coming Soon'}
                          </span>
                        </div>
                      </div>

                      {car.powertrain === 'REEV' && (
                        <p className="text-xs text-emerald-700 font-semibold mt-1">
                          Electric drive with a range-extending petrol engine.
                        </p>
                      )}

                      <div className="mt-2 text-xs text-slate-500 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        <span>{car.location}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-600 py-2 border-y border-slate-100">
                        <span>Mileage: <strong>{formatNumber(car.mileage)} km</strong></span>
                        <span>Powertrain: <strong>{car.powertrain || car.fuelType}</strong></span>
                        {car.electricRange && (
                          <span className="text-cyan-700 font-bold">EV Range: {car.electricRange}</span>
                        )}
                        <span>Transmission: <strong>{car.transmission}</strong></span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end space-x-3">
                      <a
                        href={`/contact?text=${encodeURIComponent(
                          `Hello MOTOR Pakistan, I am inquiring about ${car.year} ${car.make} ${car.model}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        WhatsApp
                      </a>
                      <Link
                        href={`/test-drive?car=${car.slug}`}
                        className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                      >
                        Test Drive
                      </Link>
                      <Link
                        href={`/cars/${car.slug}`}
                        className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                      >
                        View Vehicle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
