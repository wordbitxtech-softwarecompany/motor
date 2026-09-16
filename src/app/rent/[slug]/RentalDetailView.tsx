'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  ShieldCheck,
  CalendarCheck,
  MapPin,
  Clock,
  Gauge,
  Fuel,
  GitFork,
  Users,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ArrowRight,
  FileText
} from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';
import RentalBookingModal from '@/components/RentalBookingModal';
import { enquiryLink } from '@/lib/contact';

export default function RentalDetailView({ vehicle }: { vehicle: any }) {
  const [modalOpen, setModalOpen] = useState(false);

  const dailyRate = vehicle.rentalDailyRate || 12000;
  const weeklyRate = vehicle.rentalWeeklyRate || Math.round(dailyRate * 6.2);
  const deposit = vehicle.rentalDeposit || 35000;

  const images = (vehicle.gallery && vehicle.gallery.length > 0) ? vehicle.gallery : [vehicle.mainImage];
  const [activeImg, setActiveImg] = useState(0);

  const whatsappMessage = encodeURIComponent(
    `Hello MOTOR, I would like to book the rental vehicle ${vehicle.year} ${vehicle.make} ${vehicle.model} (Daily: ${formatPKR(dailyRate)}). Please confirm availability.`
  );

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/rent" className="hover:text-slate-900 transition">Car Rental</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 truncate">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src={images[activeImg]}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} rental`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-lg shadow-sm">
                {vehicle.rentalCategory || vehicle.bodyType}
              </span>
              <span className="px-3 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-lg shadow-sm">
                Ready for Dispatch
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {images.map((img: string, idx: number) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImg(idx)}
                className={`aspect-[16/10] rounded-xl overflow-hidden border-2 transition ${
                  activeImg === idx ? 'border-indigo-600 ring-2 ring-indigo-600/30' : 'opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Detailed Features */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Vehicle Highlights & Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {vehicle.features && vehicle.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rental Requirements */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-3 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Rental Requirements in Lahore</span>
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600">
              <li>Valid Pakistani CNIC / NICOP or International Passport (Original to be shown at handover)</li>
              <li>Valid Driving License (Pakistani or International)</li>
              <li>Refundable security deposit ({formatPKR(deposit)}) paid via Cash, Card or Bank Transfer</li>
              <li>Fuel policy: Delivered full tank, return full tank</li>
              <li>Standard mileage allowance: 200 km per day included</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Rate Card & Booking Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                MOTOR Fleet • Lahore Hub
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center text-xs text-slate-500 mt-1">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                <span>Available at Gulberg, DHA & Airport</span>
              </div>
            </div>

            {/* Rates Box */}
            <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-600 font-medium">Daily Rental Rate:</span>
                <span className="text-2xl font-black text-indigo-900">
                  {formatPKR(dailyRate)} <span className="text-xs font-normal text-slate-500">/ day</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600 pt-2 border-t border-indigo-100">
                <span>Weekly Rate (7 Days):</span>
                <span className="font-bold text-slate-900">{formatPKR(weeklyRate)}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Refundable Security Deposit:</span>
                <span className="font-bold text-slate-900">{formatPKR(deposit)}</span>
              </div>
            </div>

            {/* Specs Quick Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Transmission</span>
                <p className="font-bold text-slate-800 mt-0.5">{vehicle.transmission.split(' ')[0]}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Seating</span>
                <p className="font-bold text-slate-800 mt-0.5">{vehicle.seats || 5} Passengers</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Fuel</span>
                <p className="font-bold text-slate-800 mt-0.5">{vehicle.fuelType}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Engine</span>
                <p className="font-bold text-slate-800 mt-0.5">{vehicle.engineCapacity.split(' ')[0]}</p>
              </div>
            </div>

            {/* Primary Booking Trigger */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Reserve this Vehicle Online</span>
              </button>

              <a
                href={enquiryLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              <Link
                href={`/cars/${vehicle.slug}`}
                className="w-full py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center justify-center space-x-1"
              >
                <span>Interested in buying this car instead?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Sanitized & Full Tank
              </span>
              <span>Airport Meet & Greet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <RentalBookingModal
        vehicle={vehicle}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
