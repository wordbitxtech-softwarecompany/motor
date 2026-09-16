import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from './CarsExplorer';
import { Car, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/cars' },
  title: 'Cars in Pakistan | Prices & Specs',
  description: 'Browse new and used cars for sale across Pakistan. Filter by make, model, city, price, powertrain and condition with transparent PKR pricing at MOTOR.',
  keywords: [
    'cars for sale Pakistan',
    'new cars Pakistan',
    'used cars Pakistan',
    'cars for sale Lahore',
    'car dealer Pakistan',
    'EV cars Pakistan',
    'hybrid cars Pakistan'
  ],
};

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const vehicles = await getAllVehicles();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
              <Car className="w-4 h-4" />
              <span>Marketplace Inventory</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              New &amp; Used Cars for Sale in Pakistan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Filter by make, model, city, budget and powertrain — petrol, diesel, hybrid, PHEV, EV and REEV.
              Prices are reviewed regularly and shown in PKR.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">100% Inspected & Verified</p>
              <p className="text-[11px] text-slate-500">Excise & computerized book clearance</p>
            </div>
          </div>
        </div>

        {/* Explorer UI */}
        <CarsExplorer
          initialVehicles={vehicles}
          initialFilters={{
            make: params.make,
            bodyType: params.bodyType,
            priceMax: params.priceMax,
            location: params.location,
            fuelType: params.fuelType,
            powertrain: params.powertrain,
            q: params.q,
          }}
        />
      </div>
    </div>
  );
}
