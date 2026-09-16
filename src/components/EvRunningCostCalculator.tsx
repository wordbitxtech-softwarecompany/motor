'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  Fuel,
  TrendingDown,
  Calculator,
  Sparkles,
  Info,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function EvRunningCostCalculator() {
  const [monthlyKm, setMonthlyKm] = useState(1500); // km/month (approx 50 km/day)
  const [petrolPrice, setPetrolPrice] = useState(280); // PKR / L
  const [electricityTariff, setElectricityTariff] = useState(55); // PKR / kWh (Off-peak / protected peak blend)
  const [petrolAverage, setPetrolAverage] = useState(11); // km / L
  const [evConsumption, setEvConsumption] = useState(15); // kWh / 100 km

  // Calculations
  const litersPerMonth = monthlyKm / (petrolAverage || 1);
  const monthlyPetrolCost = Math.round(litersPerMonth * petrolPrice);

  const kwhPerMonth = (monthlyKm / 100) * evConsumption;
  const monthlyEvCost = Math.round(kwhPerMonth * electricityTariff);

  const monthlySavings = Math.max(0, monthlyPetrolCost - monthlyEvCost);
  const annualSavings = monthlySavings * 12;
  const percentageSavings = monthlyPetrolCost > 0 ? Math.round((monthlySavings / monthlyPetrolCost) * 100) : 0;

  return (
    <div id="ev-cost-calculator" className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 mb-2">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Ownership Cost Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            EV vs Petrol Running Cost Calculator (Pakistan)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Compare monthly operational expenses between conventional fuel vehicles and electric/PHEV vehicles using live Pakistani fuel and NEPRA residential power rates.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase">Est. Fuel Reduction</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600">
            Save up to {percentageSavings}%
          </span>
        </div>
      </div>

      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders and Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Distance */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
              <span>Monthly Driving Distance:</span>
              <span className="text-indigo-600 font-extrabold">{monthlyKm.toLocaleString()} km / month ({Math.round(monthlyKm / 30)} km/day)</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={monthlyKm}
              onChange={(e) => setMonthlyKm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>500 km (City weekend)</span>
              <span>2,000 km (Work commute)</span>
              <span>5,000 km (Commercial travel)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Petrol Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Petrol Price (PKR / Litre)
              </label>
              <input
                type="number"
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Current OGRA regulated benchmark</span>
            </div>

            {/* Electricity Tariff */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Electricity Tariff (PKR / kWh)
              </label>
              <input
                type="number"
                value={electricityTariff}
                onChange={(e) => setElectricityTariff(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">LESCO / K-Electric domestic slab</span>
            </div>

            {/* Petrol Vehicle Mileage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Petrol Car Mileage (km / Litre)
              </label>
              <input
                type="number"
                step="0.5"
                value={petrolAverage}
                onChange={(e) => setPetrolAverage(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Typical 1.5L - 1.8L sedan in city traffic</span>
            </div>

            {/* EV Efficiency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                EV Energy Rate (kWh / 100km)
              </label>
              <input
                type="number"
                step="0.5"
                value={evConsumption}
                onChange={(e) => setEvConsumption(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Avg EV rating (Lumin, Deepal, AVATR)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong>Note on estimates:</strong> Actual calculations vary based on seasonal air-conditioner usage, regenerative braking efficiency, rooftop solar net-metering, and peak electricity charging hours.
            </span>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
              Estimated Monthly Cost Comparison
            </span>
            <div className="mt-4 space-y-3">
              {/* Petrol Card */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                    <Fuel className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Petrol Monthly Cost</span>
                    <span className="font-bold text-white text-sm">{formatPKR(monthlyPetrolCost)}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{Math.round(litersPerMonth)} Litres</span>
              </div>

              {/* EV Card */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">EV Home Charging Cost</span>
                    <span className="font-bold text-cyan-300 text-sm">{formatPKR(monthlyEvCost)}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{Math.round(kwhPerMonth)} Units</span>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="p-4 bg-emerald-950/80 rounded-2xl border border-emerald-500/50 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
              Net Monthly Savings in Pakistan
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {formatPKR(monthlySavings)}
              <span className="text-xs font-normal text-emerald-200"> / month</span>
            </div>
            <div className="text-xs text-emerald-200/90 pt-1 border-t border-emerald-800/80 flex justify-between">
              <span>Projected Annual Savings:</span>
              <strong className="text-white">{formatPKR(annualSavings)} / year</strong>
            </div>
          </div>

          <Link
            href="/electric-cars-pakistan"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md"
          >
            <span>Explore Electric Cars in Stock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
