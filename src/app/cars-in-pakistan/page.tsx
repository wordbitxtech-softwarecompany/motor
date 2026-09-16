import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from '../cars/CarsExplorer';
import { Car, Zap, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/cars-in-pakistan' },
  title: 'Cars in Pakistan (2026 Prices, Specs & Verified Showrooms) | MOTOR',
  description: 'Complete guide to new, certified used, electric, hybrid, and REEV cars in Pakistan. Explore latest prices, ex-factory rates, specifications and showroom availability across Lahore, Islamabad and Karachi.',
  keywords: [
    'cars in Pakistan',
    'new cars Pakistan',
    'used cars Pakistan',
    'car prices in Pakistan',
    'electric cars Pakistan',
    'hybrid cars Pakistan',
    'best cars to buy in Pakistan 2026',
    'MOTOR Pakistan'
  ],
};

export default async function CarsInPakistanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const vehicles = await getAllVehicles();

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Car className="w-4 h-4" />
            <span>Pakistan Automotive Marketplace 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Cars in Pakistan: Latest Prices, Specs & Verified Stock
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Browse Pakistan&apos;s most comprehensive digital automotive catalog. From trusted local staples like the Toyota Corolla, Fortuner and Honda Civic, to breakthrough new-energy electric, hybrid, PHEV and range-extended models entering the Pakistani market.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href="/electric-cars-pakistan"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-600/50 transition font-semibold"
            >
              ⚡ Electric Cars (EV)
            </Link>
            <Link
              href="/hybrid-cars-pakistan"
              className="px-3.5 py-1.5 rounded-xl bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 transition font-semibold"
            >
              🌿 Hybrid Cars (HEV)
            </Link>
            <Link
              href="/reev-cars-pakistan"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 transition font-semibold"
            >
              🔋 Range Extended (REEV)
            </Link>
            <Link
              href="/upcoming-cars-pakistan"
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 transition font-semibold"
            >
              🚀 2026 Launches
            </Link>
          </div>
        </div>

        {/* Explorer Component */}
        <CarsExplorer
          initialVehicles={vehicles}
          initialFilters={{
            make: params.make,
            powertrain: params.powertrain,
            bodyType: params.bodyType,
            priceMax: params.priceMax,
            location: params.location,
          }}
        />
      </div>
    </div>
  );
}
