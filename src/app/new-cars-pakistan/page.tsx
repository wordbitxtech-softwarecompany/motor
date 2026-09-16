import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import { Sparkles, Car, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/new-cars-pakistan' },
  title: 'New Cars in Pakistan (2026 Ex-Factory Prices & Official Specs) | MOTOR',
  description: 'Discover brand new cars in Pakistan for 2026. Explore ex-factory pricing, booking timelines, official brand warranties, and specs for Toyota, Honda, MG, Deepal, Changan and more.',
  keywords: [
    'new cars Pakistan',
    'new car prices in Pakistan 2026',
    'ex-factory car price Pakistan',
    'new car booking Pakistan',
    'latest cars in Pakistan'
  ],
};

export default async function NewCarsPakistanPage() {
  const allVehicles = await getAllVehicles();
  const newCars = allVehicles.filter(
    (v) => v.year >= 2025 && (v.availabilityStatus === 'Available in Pakistan' || v.availabilityStatus === 'New Arrival')
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-4 h-4" />
            <span>2026 Brand New Vehicle Showroom</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            New Cars in Pakistan: Ex-Factory Prices & Certified Stock
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Explore the latest 2025 and 2026 automotive generation in Pakistan. From locally assembled market benchmarks to cutting-edge imported new-energy crossovers, review transparent ex-factory pricing and official warranty packages.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-indigo-300">
            <span className="flex items-center">✓ Full Manufacturer & Battery Warranties</span>
            <span className="flex items-center">✓ Zero Hidden Dealer On-Money / Premiums</span>
            <span className="flex items-center">✓ Biometric Delivery Handovers in Lahore</span>
          </div>
        </div>

        {/* New Cars Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Brand New 2025/2026 Models in Pakistan
              </h2>
              <p className="text-xs text-slate-500">
                Fresh showroom inventory ready for test-drives and bank financing.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
              {newCars.length} New Models
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
