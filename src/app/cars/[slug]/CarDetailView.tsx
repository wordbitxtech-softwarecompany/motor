'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  GitFork,
  Compass,
  Palette,
  DoorClosed,
  Users,
  KeyRound,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
  Share2,
  Printer,
  ChevronRight,
  Eye,
  Sparkles,
  ArrowRight,
  Zap,
  BatteryCharging,
  Clock,
  Info,
  Plug
} from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';
import VehicleCard from '@/components/VehicleCard';
import { enquiryLink } from '@/lib/contact';

export default function CarDetailView({
  vehicle,
  similarVehicles = []
}: {
  vehicle: any;
  similarVehicles: any[];
}) {
  const images = (vehicle.gallery && vehicle.gallery.length > 0)
    ? vehicle.gallery
    : [vehicle.mainImage];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [view360, setView360] = useState(false);
  const [tourAngle, setTourAngle] = useState(0);

  // Live Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [tenureYears, setTenureYears] = useState(3);
  const [interestRate, setInterestRate] = useState(13.5);

  const priceValue = vehicle.price || 0;
  const downPaymentAmount = Math.round((priceValue * downPaymentPercent) / 100);
  const loanPrincipal = priceValue - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;
  const monthlyPayment = priceValue > 0 ? Math.round(
    (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
  ) : 0;

  const isReev = vehicle.powertrain === 'REEV';
  const isEv = vehicle.powertrain === 'EV';
  const isPhev = vehicle.powertrain === 'PHEV';
  const isHybrid = vehicle.powertrain === 'Hybrid';
  const isNev = isEv || isReev || isPhev || isHybrid;

  const whatsappMessage = encodeURIComponent(
    `Hello MOTOR Pakistan, I am interested in purchasing the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.powertrain || 'Petrol'}, Ref: ${vehicle.slug}). Please provide official price quote and availability.`
  );

  return (
    <div className="space-y-12">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/cars" className="hover:text-slate-900 transition">Cars in Pakistan</Link>
        {isNev && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={
                isEv
                  ? '/electric-cars-pakistan'
                  : isReev
                  ? '/reev-cars-pakistan'
                  : isPhev
                  ? '/phev-cars-pakistan'
                  : '/hybrid-cars-pakistan'
              }
              className="hover:text-slate-900 transition"
            >
              {vehicle.powertrain}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </span>
      </nav>

      {/* REEV Explainer Alert if applicable */}
      {isReev && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-start space-x-3 text-xs text-emerald-900">
          <BatteryCharging className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-950 font-bold">Range Extended Electric Vehicle (REEV) Technology:</strong>
            <p className="mt-0.5 leading-relaxed">
              Electric drive with a range-extending petrol engine. 100% of the driving torque is delivered by electric motors for instant acceleration and silent travel. The onboard petrol engine acts solely as a high-efficiency power generator for long-distance motorway driving in Pakistan, eliminating charging station anxiety.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Gallery & Primary Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & 360 Tour (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            {view360 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-white relative select-none p-6">
                <img
                  src={images[activeImageIndex % images.length]}
                  alt="360 Tour view"
                  className="w-full h-full object-cover opacity-85"
                  style={{ transform: `scale(${1 + Math.sin(tourAngle / 20) * 0.05})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center gap-2">
                  <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-slate-700">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Virtual 360° Studio Showcase</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={tourAngle}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setTourAngle(val);
                      setActiveImageIndex(Math.floor(val / (360 / images.length)) % images.length);
                    }}
                    className="w-full max-w-md accent-indigo-500 cursor-ew-resize"
                  />
                  <span className="text-[10px] text-slate-400">Drag slider horizontally to rotate vehicle angle</span>
                </div>
              </div>
            ) : (
              <img
                src={images[activeImageIndex]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} exterior view`}
                className="w-full h-full object-cover"
              />
            )}

            {/* Badges on Gallery */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {isNev && (
                <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950 rounded-lg shadow-sm">
                  {vehicle.powertrain}
                </span>
              )}
              {vehicle.availabilityStatus && (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-950/90 text-white rounded-lg shadow-sm border border-slate-700">
                  {vehicle.availabilityStatus}
                </span>
              )}
            </div>

            {/* 360 Toggle Button */}
            <button
              type="button"
              onClick={() => setView360(!view360)}
              className="absolute top-4 right-4 bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl backdrop-blur-md border border-slate-700 flex items-center space-x-1.5 shadow-md transition"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>{view360 ? 'Standard Photos' : '360° Studio View'}</span>
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveImageIndex(idx);
                  setView360(false);
                }}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden border-2 transition ${
                  activeImageIndex === idx && !view360
                    ? 'border-indigo-600 ring-2 ring-indigo-600/30'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Inspection note */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex items-start space-x-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Multi-Point Inspection Completed
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                This listing has passed our demo inspection checklist: paint-meter scans, computerized
                diagnostics, on-ramp test drive and full documentation review.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Specs Highlights & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <span>{vehicle.make}</span>
                <span>•</span>
                <span>Stock Ref: DH-PK-{vehicle.id}88</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>

              <div className="mt-2 flex items-center text-xs text-slate-500">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                <span>{vehicle.location}</span>
              </div>
            </div>

            {/* Price Box with Label */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {vehicle.priceLabel || 'Ex-Factory'} Price (Pakistan)
              </div>
              <div className="text-3xl font-black text-slate-900 mt-0.5">
                {vehicle.price > 0 ? formatPKR(vehicle.price) : 'Price Coming Soon'}
              </div>
              {vehicle.price > 0 && vehicle.monthlyEstimate && (
                <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span>Est. Islamic Installment:</span>
                  <span className="font-bold text-indigo-600">
                    {formatPKR(monthlyPayment)} / month
                  </span>
                </div>
              )}
            </div>

            {/* Quick Specs 4-Box Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
                <Gauge className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Mileage</div>
                  <div className="text-xs font-bold text-slate-800">{formatNumber(vehicle.mileage)} km</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
                {isNev ? (
                  <Zap className="w-4 h-4 text-cyan-600 shrink-0" />
                ) : (
                  <Fuel className="w-4 h-4 text-indigo-600 shrink-0" />
                )}
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Powertrain</div>
                  <div className="text-xs font-bold text-slate-800">{vehicle.powertrain || vehicle.fuelType}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
                <GitFork className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Transmission</div>
                  <div className="text-xs font-bold text-slate-800 truncate">{vehicle.transmission.split(' ')[0]}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
                <Compass className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Drive Type</div>
                  <div className="text-xs font-bold text-slate-800">{vehicle.driveType}</div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/test-drive?car=${vehicle.slug}`}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Book a Test Drive in Lahore</span>
              </Link>

              <a
                href={enquiryLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Dealer</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`/contact?text=${encodeURIComponent(
                    `Hello MOTOR Pakistan, please send the best price for the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.slug}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <span>Ask for Price</span>
                </a>
                <Link
                  href={`/compare?car=${vehicle.slug}`}
                  className="w-full py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <span>Compare</span>
                </Link>
              </div>

              {vehicle.price > 0 && (
                <Link
                  href="#financing-calc"
                  className="w-full py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <BadgePercent className="w-4 h-4 text-indigo-600" />
                  <span>Apply for Bank Financing / Ijarah</span>
                </Link>
              )}
            </div>

            {/* Biometric Guarantee */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Biometric transfer ready
              </span>
              <span>Punjab & Federal Excise verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* EV / Hybrid / PHEV / REEV Technical Specifications Section */}
      {isNev && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold tracking-tight text-white">
                New Energy & Battery Specifications
              </h3>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full">
              {vehicle.powertrain} Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Battery & Range</span>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Battery Capacity</span>
                <span className="font-bold text-white">{vehicle.batteryCapacity || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Electric Range</span>
                <span className="font-bold text-cyan-300">{vehicle.electricRange || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Combined Range</span>
                <span className="font-bold text-emerald-300">{vehicle.combinedRange || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Electric Motors & Output</span>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Motor Power</span>
                <span className="font-bold text-white">{vehicle.motorPower || vehicle.engineCapacity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Instant Torque</span>
                <span className="font-bold text-white">{vehicle.torque || 'High Output'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Drive Configuration</span>
                <span className="font-bold text-white">{vehicle.driveType}</span>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Charging Protocols</span>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Connector Type</span>
                <span className="font-bold text-white">{vehicle.chargingType || 'Type 2 / CCS2'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Home AC Rate</span>
                <span className="font-bold text-white">{vehicle.acCharging || '7 kW Wallbox'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">DC Fast Charge</span>
                <span className="font-bold text-cyan-300">{vehicle.dcFastCharging || 'Supported'}</span>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/80">
              <span className="text-slate-400 uppercase font-semibold text-[10px]">Warranty & Features</span>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Battery Warranty</span>
                <span className="font-bold text-emerald-400">{vehicle.batteryWarranty || '8 Yrs / 160k km'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-400">Vehicle Warranty</span>
                <span className="font-bold text-white">{vehicle.vehicleWarranty || '5 Yrs / 100k km'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">V2L Power Discharge</span>
                <span className="font-bold text-cyan-300">{vehicle.v2l ? 'Yes (3.3 kW)' : 'Standard'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Specifications Detailed Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Vehicle Technical Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Make & Model</span>
              <span className="font-semibold text-slate-900">{vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Model Year</span>
              <span className="font-semibold text-slate-900">{vehicle.year}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Registered Market</span>
              <span className="font-semibold text-slate-900">Pakistan</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Powertrain / Fuel</span>
              <span className="font-semibold text-slate-900">{vehicle.powertrain || vehicle.fuelType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Transmission</span>
              <span className="font-semibold text-slate-900">{vehicle.transmission}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Drivetrain</span>
              <span className="font-semibold text-slate-900">{vehicle.driveType}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Body Style</span>
              <span className="font-semibold text-slate-900">{vehicle.bodyType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Exterior Color</span>
              <span className="font-semibold text-slate-900">{vehicle.exteriorColor}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Interior Color</span>
              <span className="font-semibold text-slate-900">{vehicle.interiorColor}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Seating Capacity</span>
              <span className="font-semibold text-slate-900">{vehicle.seats} Passengers</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Number of Doors</span>
              <span className="font-semibold text-slate-900">{vehicle.doors} Doors</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Availability</span>
              <span className="font-semibold text-indigo-600">{vehicle.availabilityStatus || 'Dealer Stock'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Factory Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Vehicle Overview & Pakistani Market Profile
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {vehicle.description}
          </p>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Key Features & Equipment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {vehicle.features && vehicle.features.map((feat: string, i: number) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financing Calculator */}
      {vehicle.price > 0 && (
        <div id="financing-calc" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <BadgePercent className="w-3.5 h-3.5" />
              <span>Islamic Car Ijarah & Conventional Auto Finance</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Estimated Monthly Installment for this Vehicle
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Calculate your estimated monthly installment with leading partner banks (Meezan Bank, Bank Alfalah, Standard Chartered).
              Estimated calculation only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Down Payment: {downPaymentPercent}%
                </label>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="text-xs font-bold text-indigo-400 mt-1">
                  {formatPKR(downPaymentAmount)}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Tenure: {tenureYears} Years ({tenureYears * 12} Mos)
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl text-xs p-2.5 text-white"
                >
                  <option value={1}>1 Year (12 Mos)</option>
                  <option value={2}>2 Years (24 Mos)</option>
                  <option value={3}>3 Years (36 Mos)</option>
                  <option value={4}>4 Years (48 Mos)</option>
                  <option value={5}>5 Years (60 Mos)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Est. Bank Rate: {interestRate}%
                </label>
                <select
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl text-xs p-2.5 text-white"
                >
                  <option value={11.5}>11.5% (Special Corporate)</option>
                  <option value={13.5}>13.5% (Meezan Car Ijarah)</option>
                  <option value={15.0}>15.0% (Standard Tier)</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 text-center space-y-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Estimated Monthly Payment</span>
              <div className="text-3xl sm:text-4xl font-black text-indigo-400">
                {formatPKR(monthlyPayment)}
                <span className="text-xs text-slate-400 font-normal"> / month</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Financing Principal: {formatPKR(loanPrincipal)}
              </p>
              <Link
                href={`/financing?car=${vehicle.slug}&price=${vehicle.price}`}
                className="inline-flex items-center justify-center w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
              >
                <span>Submit Financing Application</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Similar Vehicles Section */}
      {similarVehicles.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Similar Vehicles in Pakistan
            </h3>
            <Link href="/cars" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
              Browse all cars →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarVehicles.slice(0, 3).map((sim) => (
              <VehicleCard key={sim.id} vehicle={sim} viewMode="sale" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
