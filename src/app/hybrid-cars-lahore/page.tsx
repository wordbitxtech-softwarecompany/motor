import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import { Fuel, MapPin, Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/hybrid-cars-lahore' },
  title: 'Hybrid Cars in Lahore | Certified Toyota, Honda & MG Hybrids Gulberg & DHA',
  description: 'Explore certified hybrid and plug-in hybrid cars in Lahore. Toyota Corolla Cross Hybrid, Honda HR-V e:HEV and MG HS PHEV with 20+ km/L city fuel economy at MOTOR.',
  keywords: [
    'hybrid cars Lahore',
    'buy hybrid car Lahore',
    'Toyota Corolla Cross Hybrid Lahore',
    'MG HS Hybrid Lahore',
    'used hybrid cars Lahore',
    'best fuel average cars Lahore'
  ],
};

export default async function HybridCarsLahorePage() {
  const allVehicles = await getAllVehicles();
  const hybridCars = allVehicles.filter(
    (v) => v.powertrain === 'Hybrid' || v.powertrain === 'PHEV'
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <MapPin className="w-4 h-4" />
            <span>Lahore Hybrid Showrooms • Gulberg III & DHA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Hybrid Cars in Lahore: 22+ km/L in City Traffic
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Navigating Lahore&apos;s notorious traffic bottlenecks—from Canal Road during school rush hours to Jail Road and Mall Road—demands hybrid efficiency.
            Our certified hybrid and plug-in hybrid crossovers shut down the petrol engine at idle and low speeds, cutting fuel bills by up to half.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-300">
            <span>🌿 150-Point Computerized Hybrid Battery Health Scans</span>
            <span>🌿 Original Factory Invertor & Electric Motor Health Reports</span>
            <span>🌿 Biometric Registration Direct with Punjab Excise</span>
          </div>
        </div>

        {/* Lahore Hybrid Stock */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Certified Hybrid & PHEV Vehicles in Lahore
              </h2>
              <p className="text-xs text-slate-500">
                Self-charging and plug-in hybrid models ready for immediate inspection.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full">
              {hybridCars.length} Hybrid Vehicles Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hybridCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
