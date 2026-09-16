import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from '../cars/CarsExplorer';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/cars-in-lahore' },
  title: 'Cars in Lahore | New, Used, EV & Hybrid Listings with PKR Prices',
  description: 'Browse new, used, electric and hybrid cars available in Lahore. Filter by budget, make and powertrain with transparent PKR pricing at MOTOR Gulberg, DHA and Johar Town.',
  keywords: [
    'cars in Lahore',
    'new cars Lahore',
    'used cars Lahore',
    'cars for sale Lahore',
    'car dealer Lahore',
    'electric cars Lahore',
    'hybrid cars Lahore'
  ],
};

export default async function CarsInLahorePage() {
  const allVehicles = await getAllVehicles();
  const lahoreVehicles = allVehicles.filter((v) => v.location.toLowerCase().includes('lahore'));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Lahore Hub — Gulberg III, DHA Phase 5 & Johar Town</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Cars in Lahore
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
            Lahore carries the widest inventory on the platform — family sedans like the Corolla and Yaris,
            the Corolla Cross hybrid, the MG HS plug-in hybrid, the Changan Lumin EV and the Deepal S07 REEV,
            plus rental-ready Fortuners. Physical viewing is available at our Gulberg, DHA and Johar Town hubs.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/used-cars-lahore" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Used cars in Lahore
            </Link>
            <Link href="/electric-cars-lahore" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Electric cars in Lahore
            </Link>
            <Link href="/car-rental-lahore" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Car rental in Lahore
            </Link>
          </div>
        </div>

        <CarsExplorer initialVehicles={lahoreVehicles} />
      </div>
    </div>
  );
}
