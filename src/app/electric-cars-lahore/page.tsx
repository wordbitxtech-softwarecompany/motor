import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import EvRunningCostCalculator from '@/components/EvRunningCostCalculator';
import EvChargingPakistan from '@/components/EvChargingPakistan';
import { Zap, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/electric-cars-lahore' },
  title: 'Electric Cars in Lahore | Buy, Test Drive & Charge EVs in Gulberg & DHA',
  description: 'Certified electric vehicles in Lahore at MOTOR. Explore Changan Lumin, AVATR 11, Deepal REEV with public DC charging in Gulberg III, DHA Phase 5 and Lahore Ring Road.',
  keywords: [
    'electric cars Lahore',
    'EV cars in Lahore',
    'buy electric car Lahore',
    'electric vehicle showroom Lahore',
    'EV charging stations Lahore',
    'Changan Lumin Lahore price'
  ],
};

export default async function ElectricCarsLahorePage() {
  const allVehicles = await getAllVehicles();
  const evCars = allVehicles.filter((v) => v.powertrain === 'EV' || v.powertrain === 'REEV');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <MapPin className="w-4 h-4" />
            <span>Lahore Clean Mobility Hub • Gulberg III & DHA Phase 5</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Electric Cars in Lahore: The Smarter, Cleaner Commute
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            In a metropolis experiencing dense traffic corridors and seasonal winter smog, electric vehicles offer zero local emissions, instantaneous silent acceleration, and running costs under PKR 4 per kilometer.
            Experience our certified EV and REEV fleet on Main Boulevard Gulberg III.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-cyan-300">
            <span>⚡ Gulberg III & DHA Phase 5 Showroom Display</span>
            <span>⚡ Doorstep EV Test Drives in DHA & Model Town</span>
            <span>⚡ Certified LESCO Net-Metering Solar Integration</span>
          </div>
        </div>

        {/* Lahore EV Stock */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Electric & Range Extended Vehicles on Display in Lahore
              </h2>
              <p className="text-xs text-slate-500">
                Available for physical viewing, battery state-of-health verification, and test drives.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full">
              {evCars.length} Electric Vehicles in Lahore
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>

        {/* Cost Savings Calculator */}
        <EvRunningCostCalculator />

        {/* Lahore Charging Network */}
        <EvChargingPakistan />
      </div>
    </div>
  );
}
