import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import { Fuel, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/hybrid-cars-pakistan' },
  title: 'Hybrid Cars in Pakistan | Prices | MOTOR',
  description: 'Hybrid cars in Pakistan with prices and real fuel averages — Toyota Corolla Cross, Honda HR-V e:HEV, MG HS Hybrid+ and Haval H6 HEV.',
  keywords: [
    'hybrid cars Pakistan',
    'best hybrid cars Pakistan',
    'hybrid car price Pakistan',
    'Toyota Corolla Cross Hybrid Pakistan',
    'Honda HR-V e:HEV Pakistan',
    'fuel efficient cars Pakistan 2026'
  ],
};

export default async function HybridCarsPakistanPage() {
  const allVehicles = await getAllVehicles();
  const hybridCars = allVehicles.filter((v) => v.powertrain === 'Hybrid');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Fuel className="w-4 h-4" />
            <span>Self-Charging Hybrid Electric Vehicles (HEV)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Hybrid Cars in Pakistan: Maximum Fuel Economy, Zero Charging Plugs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Self-charging hybrid vehicles seamlessly blend an efficient petrol engine with an electric motor and regenerative battery.
            Enjoy 20 to 25 km per litre in congested city traffic without ever having to plug in or wait for a charger.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-300">
            <span className="flex items-center">✓ 20–25 km/L Real City Fuel Average</span>
            <span className="flex items-center">✓ Automatically Recharges While Decelerating & Braking</span>
            <span className="flex items-center">✓ 100% Compatible with Standard Petrol Pumps Across Pakistan</span>
          </div>
        </div>

        {/* Hybrid Stock Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Self-Charging Hybrids in Stock & Available
              </h2>
              <p className="text-xs text-slate-500">
                Certified hybrid battery health testing and 150-point mechanical inspection.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full">
              {hybridCars.length} Hybrid Models Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hybridCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>

        {/* Informational Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Why Self-Charging Hybrids Are Dominating Pakistani Roads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Cut Monthly Fuel Bills by 50%</h3>
              <p>In traffic gridlocks along Lahore&apos;s Canal Road, Karachi&apos;s Sharea Faisal or Islamabad Expressway, hybrid engines automatically switch off the petrol engine and glide purely on battery power.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Zero Infrastructure Dependence</h3>
              <p>You never have to install an AC home wallbox or plan charging stopovers. The vehicle captures kinetic deceleration energy through regenerative braking and converts it into stored electricity automatically.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Resale & Liquid Market Demand</h3>
              <p>With petrol prices averaging near PKR 280/L, hybrid vehicles like the Corolla Cross maintain among the strongest resale values and lowest depreciation rates in Pakistan.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
