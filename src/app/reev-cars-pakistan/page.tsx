import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import { BatteryCharging, Zap, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/reev-cars-pakistan' },
  title: 'Range Extended EV (REEV) Cars in Pakistan | MOTOR',
  description: 'Understand Range Extended Electric Vehicles (REEV) in Pakistan. 100% electric motor drive with an onboard petrol generator for 1,100+ km travel without charging stops. Deepal S07, Deepal Hunter.',
  keywords: [
    'REEV Pakistan',
    'range extended EV Pakistan',
    'Deepal S07 Pakistan',
    'Deepal Hunter REEV Pakistan',
    'range extender car Pakistan',
    'electric car with petrol generator'
  ],
};

export default async function ReevCarsPakistanPage() {
  const allVehicles = await getAllVehicles();
  const reevCars = allVehicles.filter((v) => v.powertrain === 'REEV');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <BatteryCharging className="w-4 h-4" />
            <span>Range Extended Electric Vehicles (REEV)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            REEV Cars in Pakistan: Pure Electric Drive, Infinite Freedom
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Electric drive with a range-extending petrol engine. Unlike conventional hybrids, an REEV&apos;s wheels are driven 100% by high-torque electric motors at all times.
            The onboard petrol engine never physically turns the wheels; its only job is to act as an ultra-efficient generator to recharge the battery when traveling outside charging coverage.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
            <span className="flex items-center">✓ 100% Electric Motor Propulsion</span>
            <span className="flex items-center">✓ 180 to 200 km Pure Electric Range on Battery</span>
            <span className="flex items-center">✓ 1,120 km Total Travel Range with Petrol Generator</span>
            <span className="flex items-center">✓ AC Wallbox + DC Fast Charging Supported</span>
          </div>
        </div>

        {/* Clear Explainer Callout */}
        <div className="p-6 bg-emerald-950/80 border border-emerald-500/50 rounded-3xl text-emerald-200 text-xs sm:text-sm space-y-2">
          <div className="flex items-center space-x-2 text-white font-black text-base">
            <Info className="w-5 h-5 text-emerald-400" />
            <span>Important: Why REEV is NOT a Conventional Hybrid</span>
          </div>
          <p className="leading-relaxed">
            In a traditional hybrid (HEV) or plug-in hybrid (PHEV), the petrol engine is mechanically connected to the wheels through a complex gearbox and revs loudly under acceleration.
            In an <strong>REEV (Range Extended EV)</strong>, you enjoy 100% smooth, instant electric torque and silent luxury acceleration. The petrol engine runs quietly at a constant optimal RPM in the background only when required to produce electricity.
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Range Extended (REEV) Models in Pakistan
              </h2>
              <p className="text-xs text-slate-500">
                Explore the Deepal S07 SUV and Deepal Hunter 4x4 REEV pickup truck.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
              {reevCars.length} REEV Vehicles in Showcase
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reevCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>

        {/* Informational Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Why REEV is the Ideal Architecture for Pakistan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Zero Charger Queues</h3>
              <p>You can recharge at home every day and drive 200 km purely on electric. But if you take a spontaneous trip to Naran, Skardu or Gwadar where DC chargers don&apos;t exist yet, simply fill ordinary petrol and continue driving silently.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Supercar-Like EV Responsiveness</h3>
              <p>Because the wheels are powered directly by high-voltage electric motors (up to 238 hp and 320 Nm torque), acceleration is instant and linear with zero turbo lag or jerky downshifts.</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Mobile Power Plant (V2L)</h3>
              <p>REEVs like the Deepal S07 and Hunter feature standard 3.3 kW Vehicle-to-Load discharge outlets. During load shedding or outdoor camping, your vehicle functions as a massive ultra-quiet generator for your home.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
