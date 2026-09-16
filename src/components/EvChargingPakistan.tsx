'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Zap,
  BatteryCharging,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function EvChargingPakistan() {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const demoStations = [
    {
      id: 1,
      name: 'MOTOR Hub EV Supercharger',
      city: 'Lahore',
      location: '42-B Main Boulevard, Gulberg III, Lahore',
      type: '120 kW Dual DC Fast Charger (CCS2)',
      acAvailable: '22 kW Type 2 AC (2 Ports)',
      speed: '30-80% in 24 mins',
      rate: 'PKR 85 / kWh',
      status: 'Online & Operational',
      access: 'Public / 24 Hours Open'
    },
    {
      id: 2,
      name: 'DHA Phase 5 Rapid EV Plaza',
      city: 'Lahore',
      location: 'Sector C Commercial, DHA Phase 5 (Ring Road Exit)',
      type: '90 kW DC Fast Charger (CCS2)',
      acAvailable: '7.4 kW Type 2 AC (4 Ports)',
      speed: '30-80% in 32 mins',
      rate: 'PKR 85 / kWh',
      status: 'Online & Operational',
      access: 'Public 24/7'
    },
    {
      id: 3,
      name: 'M-2 Motorway Bhera Rest Area Fast Charger',
      city: 'Motorway M-2',
      location: 'M-2 Motorway Northbound Service Area (Midpoint Lahore-Islamabad)',
      type: '180 kW Ultra-Fast DC Charger (Dual Gun)',
      acAvailable: 'None (High Speed Transit Hub)',
      speed: '10-80% in 18 mins',
      rate: 'PKR 95 / kWh',
      status: 'Online & Operational',
      access: 'Motorway Commuters 24/7'
    },
    {
      id: 4,
      name: 'Islamabad Serena Hotel & Diplomatic EV Station',
      city: 'Islamabad',
      location: 'Khayaban-e-Suhrawardy, G-5, Islamabad',
      type: '60 kW DC Fast Charger (CCS2 & GB/T)',
      acAvailable: '11 kW Type 2 AC (3 Ports)',
      speed: '30-80% in 40 mins',
      rate: 'PKR 90 / kWh',
      status: 'Online & Operational',
      access: 'Public / Hotel Guests'
    },
    {
      id: 5,
      name: 'Karachi Port Grand / Clifton EV Hub',
      city: 'Karachi',
      location: 'Block 4, Clifton, Near Marine Drive, Karachi',
      type: '120 kW DC Fast Charger (CCS2)',
      acAvailable: '22 kW Type 2 AC (2 Ports)',
      speed: '30-80% in 25 mins',
      rate: 'PKR 88 / kWh',
      status: 'Online & Operational',
      access: 'Public 24/7'
    },
    {
      id: 6,
      name: 'M-2 Motorway Sukheki Service Area',
      city: 'Motorway M-2',
      location: 'Sukheki Rest Stop, M-2 Motorway',
      type: '90 kW DC Fast Charger (CCS2)',
      acAvailable: '7 kW AC Port',
      speed: '30-80% in 35 mins',
      rate: 'PKR 95 / kWh',
      status: 'Online & Operational',
      access: 'Motorway Commuters 24/7'
    }
  ];

  const filteredStations = demoStations.filter((s) => {
    if (selectedCity !== 'All' && s.city !== selectedCity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q) || s.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section id="ev-charging" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <BatteryCharging className="w-4 h-4" />
            <span>Infrastructure & Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            EV Charging in Pakistan: How It Works
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Charging an electric vehicle in Pakistan is simpler than most drivers imagine.
            Over 85% of EV charging occurs quietly at home overnight on domestic AC power, with high-speed DC charging stations positioned along motorways and metropolitan hubs.
          </p>
        </div>

        {/* 3 Pillars of Charging */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Home Charging */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Home AC Charging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Plug into a standard 7.4 kW Level-2 Wallbox or 220V household socket overnight. Full charge while you sleep for as low as PKR 1,200 to PKR 2,500 total, especially when paired with residential solar net-metering.
            </p>
            <div className="text-[11px] text-cyan-300 font-semibold pt-2 border-t border-slate-700">
              Typical Speed: 6 to 8 hours (0 to 100%)
            </div>
          </div>

          {/* Pillar 2: Motorway DC Fast Charging */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Motorway DC Fast Charging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-power 60kW to 180kW DC chargers are strategically located at M-2 Motorway service areas (Bhera, Sukheki) and GT Road junctions. Recharge 200+ km of range while having tea or a meal.
            </p>
            <div className="text-[11px] text-indigo-300 font-semibold pt-2 border-t border-slate-700">
              Typical Speed: 20 to 35 mins (30% to 80%)
            </div>
          </div>

          {/* Pillar 3: Range Extended REEV Option */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Zero-Worry REEV Option</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              With a Range Extended EV (like Deepal S07), you don&apos;t even have to stop at public charging stations on long trips. The onboard petrol generator charges the battery automatically on the move.
            </p>
            <div className="text-[11px] text-emerald-300 font-semibold pt-2 border-t border-slate-700">
              Combined Range: 1,100+ km per tank & charge
            </div>
          </div>
        </div>

        {/* Interactive "Find Charging Station" UI */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                Charging Network Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Find Charging Stations in Pakistan
              </h3>
            </div>

            {/* City Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              {['All', 'Lahore', 'Islamabad', 'Karachi', 'Motorway M-2'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition ${
                    selectedCity === city
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by area, station name, or motorway rest stop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Stations Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map((station) => (
              <div
                key={station.id}
                className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-white text-sm">{station.name}</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                    {station.status}
                  </span>
                </div>

                <p className="text-slate-400 flex items-start text-[11px]">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{station.location}</span>
                </p>

                <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Fast Charger:</span>
                    <strong className="text-white">{station.type}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Speed (30-80%):</span>
                    <strong className="text-cyan-400">{station.speed}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Indicative Rate:</span>
                    <strong className="text-emerald-400">{station.rate}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-500">Access:</span>
                    <span className="text-slate-400">{station.access}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transparency note */}
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Before you travel:</strong> always verify station operational status, payment app support and connector availability directly with the charging network operator.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
