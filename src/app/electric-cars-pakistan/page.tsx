import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import EvRunningCostCalculator from '@/components/EvRunningCostCalculator';
import EvChargingPakistan from '@/components/EvChargingPakistan';
import { Zap, BatteryCharging, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/electric-cars-pakistan' },
  title: 'Electric Cars in Pakistan | EV Prices | MOTOR',
  description: 'Electric cars in Pakistan with prices, battery capacity, range and charging times — Changan Lumin, BYD, MG ZS EV, ORA and more.',
  keywords: [
    'electric cars Pakistan',
    'EV cars Pakistan',
    'electric vehicles Pakistan',
    'EV price in Pakistan',
    'best electric cars in Pakistan 2026',
    'Changan Lumin Pakistan',
    'AVATR 11 Pakistan',
    'electric car charging Pakistan'
  ],
};

export default async function ElectricCarsPakistanPage() {
  const allVehicles = await getAllVehicles();
  const evCars = allVehicles.filter((v) => v.powertrain === 'EV');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Zap className="w-4 h-4" />
            <span>Pure Electric Vehicles (EV) • Pakistan 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Electric Cars in Pakistan: Pricing, Range & Charging
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            The electric vehicle revolution has arrived in Pakistan. Under current government EV policies, electric cars enjoy preferential customs duties and registration fee exemptions.
            Experience whisper-quiet torque, zero emissions, and running costs up to 75% cheaper than petrol.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-cyan-300">
            <span className="flex items-center">✓ 8-Year Dedicated Battery Warranties</span>
            <span className="flex items-center">✓ Fast DC Motorway Charging Compatibility</span>
            <span className="flex items-center">✓ Home 7kW Wallbox Installation Assistance</span>
          </div>
        </div>

        {/* EV Vehicles Stock Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Pure Electric Cars Available in Pakistan
              </h2>
              <p className="text-xs text-slate-500">
                Verified high-voltage battery diagnostics and certified charging equipment.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full">
              {evCars.length} Pure EVs in Stock
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evCars.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
            ))}
          </div>
        </div>

        {/* Running Cost Calculator */}
        <EvRunningCostCalculator />

        {/* Charging Infrastructure Guide */}
        <EvChargingPakistan />

        {/* Educational Content & FAQs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Frequently Asked Questions About Owning an EV in Pakistan</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">How much does it cost to charge an electric car at home in Pakistan?</h3>
              <p className="leading-relaxed">
                Charging a 20-30 kWh battery pack (like the Changan Lumin) costs approximately PKR 1,100 to PKR 1,650 on domestic LESCO/K-Electric off-peak rates, providing 200 km of driving. With rooftop solar, home charging can be virtually free.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">Can electric cars travel between Lahore and Islamabad?</h3>
              <p className="leading-relaxed">
                Yes. High-speed DC fast chargers (60 kW to 180 kW) are operational at the Bhera, Sukheki, and Kalar Kahar service areas on the M-2 motorway, allowing long-range EVs to recharge 30% to 80% in 20-35 minutes.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">What is the battery warranty standard for EVs in Pakistan?</h3>
              <p className="leading-relaxed">
                Most manufacturers offer official battery warranties of 8 Years or 160,000 km, covering cell degradation below 70% state of health.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <h3 className="font-bold text-slate-900">Are EVs exempted from token tax in Punjab?</h3>
              <p className="leading-relaxed">
                Under provincial electric vehicle policies, pure electric vehicles enjoy significant exemptions on annual motor vehicle token tax and registration duty in Punjab and federal territories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
