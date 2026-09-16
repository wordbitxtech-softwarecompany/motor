import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from '../cars/CarsExplorer';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/cars-in-islamabad' },
  title: 'Cars in Islamabad & Rawalpindi | New, Used & Hybrid Listings',
  description: 'Browse cars available in Islamabad and Rawalpindi. New arrivals, hybrid crossovers and certified pre-owned vehicles with PKR pricing at the MOTOR Blue Area hub.',
  keywords: [
    'cars in Islamabad',
    'new cars Islamabad',
    'used cars Islamabad',
    'car dealer Islamabad',
    'car rental Islamabad',
    'hybrid cars Islamabad'
  ],
};

export default async function CarsInIslamabadPage() {
  const allVehicles = await getAllVehicles();
  const islamabadVehicles = allVehicles.filter(
    (v) => v.location.toLowerCase().includes('islamabad') || v.location.toLowerCase().includes('rawalpindi')
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-widest">
            <MapPin className="w-4 h-4" />
            <span>Twin Cities Hub — Blue Area & Sector F-7</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Cars in Islamabad & Rawalpindi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
            The Islamabad hub focuses on new arrivals like the KIA Sportage AWD, hybrid crossovers for
            daily commutes between the Twin Cities, and rental-ready SUVs for northern trips to Murree and
            beyond. Test drives and airport delivery are available from our Blue Area desk.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/locations/islamabad" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Islamabad hub details
            </Link>
            <Link href="/rent" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200">
              Rentals from Islamabad
            </Link>
          </div>
        </div>

        <CarsExplorer initialVehicles={islamabadVehicles} />
      </div>
    </div>
  );
}
