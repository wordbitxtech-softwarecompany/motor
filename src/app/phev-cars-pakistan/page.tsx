import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import { Sparkles, Zap, Fuel, ArrowRight, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/phev-cars-pakistan' },
  title: 'Plug-in Hybrid (PHEV) Cars in Pakistan | MOTOR',
  description: 'Explore Plug-in Hybrid Electric Vehicles (PHEV) in Pakistan. Drive 50-120 km pure electric in the city and road-trip over 1,000 km without range anxiety. MG HS PHEV, OMODA C7, Jaecoo J8.',
  keywords: [
    'PHEV Pakistan',
    'plug-in hybrid Pakistan',
    'MG HS Super Hybrid Pakistan',
    'OMODA C7 PHEV Pakistan',
    'Jaecoo J8 PHEV Pakistan',
    'PHEV cars price in Pakistan'
  ],
};

export default async function PhevCarsPakistanPage() {
  const allVehicles = await getAllVehicles();
  const phevCars = allVehicles.filter((v) => v.powertrain === 'PHEV');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-4 h-4" />
            <span>Dual-Power Synergy • Plug-in Hybrid (PHEV)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            PHEV (Plug-in Hybrid) Cars in Pakistan: Best of Both Worlds
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Plug-in Hybrid Electric Vehicles (PHEV) bridge the gap between traditional combustion and full electric mobility.
            Equipped with 15 to 35 kWh batteries, they provide 50 to 120 km of 100% silent electric driving for daily office commutes, with a turbocharged petrol engine ready for 1,000+ km motorway journeys.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-purple-300">
            <span className="flex items-center">✓ 50 to 120 km Pure Electric Daily Commute</span>
            <span className="flex items-center">✓ 1,000+ km Combined Road Trip Range</span>
            <span className="flex items-center">✓ Recharges from Standard 220V Household Socket</span>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Plug-in Hybrid (PHEV) Lineup in Pakistan
              </h2>
              <p className="text-xs text-slate-500">
                Models available for immediate booking, pre-order, and certified showroom demonstration.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full">
              {phevCars.length} PHEV Models Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phevCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>

        {/* Informational Guidance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">How a Plug-in Hybrid (PHEV) Works in Pakistan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">1. Weekday Pure EV Commute</h3>
              <p>Plug into your home AC socket at night. During the week, you can travel from DHA or Gulberg to the office, run errands, and return without burning a single drop of petrol.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">2. Weekend Inter-City Grand Tour</h3>
              <p>Heading to Murree, Islamabad, or Multan? The vehicle automatically toggles to hybrid mode once the battery depletes, providing high-speed overtaking and effortless refueling at any petrol pump.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">3. V2L External Power Station</h3>
              <p>Advanced PHEVs support Vehicle-to-Load (V2L) power discharge, allowing you to run camping appliances, outdoor lights, or home emergency essentials (3.3 kW output).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
