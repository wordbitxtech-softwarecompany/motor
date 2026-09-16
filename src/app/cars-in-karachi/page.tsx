import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from '../cars/CarsExplorer';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/cars-in-karachi' },
  title: 'Cars in Karachi | New, Used & Imported Listings with PKR Prices',
  description: 'Browse cars available in Karachi. Certified pre-owned sedans, imports and corporate rentals with transparent PKR pricing at the MOTOR Clifton & DHA hub.',
  keywords: [
    'cars in Karachi',
    'used cars Karachi',
    'car dealer Karachi',
    'car rental Karachi',
    'cars for sale Karachi',
    'imported cars Karachi'
  ],
};

export default async function CarsInKarachiPage() {
  const allVehicles = await getAllVehicles();
  const karachiVehicles = allVehicles.filter((v) => v.location.toLowerCase().includes('karachi'));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Karachi Hub — Block 4 Clifton & DHA Phase 6</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Cars in Karachi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
            The Karachi hub serves the city&apos;s commercial district with certified pre-owned sedans,
            coastal-corrosion-checked SUVs, and corporate rental fleets for financial institutions and
            trading houses. Handovers are available from our Clifton desk or at Jinnah International Airport (KHI).
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/locations/karachi" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Karachi hub details
            </Link>
            <Link href="/rent" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Rentals from Karachi
            </Link>
          </div>
        </div>

        <CarsExplorer initialVehicles={karachiVehicles} />
      </div>
    </div>
  );
}
