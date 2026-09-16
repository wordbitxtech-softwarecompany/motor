'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  ShieldCheck,
  MapPin,
  Clock,
  Gauge,
  Fuel,
  GitFork,
  Users,
  KeyRound,
  MessageSquare,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';
import RentalBookingModal from '@/components/RentalBookingModal';
import { enquiryLink } from '@/lib/contact';

export default function RentalExplorer({
  initialRentalCars,
  initialCategory = ''
}: {
  initialRentalCars: any[];
  initialCategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [pickupLocation, setPickupLocation] = useState('Main Boulevard, Gulberg III, Lahore');
  const [dropoffLocation, setDropoffLocation] = useState('Main Boulevard, Gulberg III, Lahore');
  const [pickupDate, setPickupDate] = useState('2026-03-28');
  const [returnDate, setReturnDate] = useState('2026-03-31');
  const [searchFilter, setSearchFilter] = useState('');

  // Active modal car
  const [modalCar, setModalCar] = useState<any | null>(null);

  const categories = [
    { label: 'All Fleet', value: '' },
    { label: 'Economy', value: 'Economy' },
    { label: 'Sedans', value: 'Sedan' },
    { label: 'SUVs & 4x4', value: 'SUV' },
    { label: 'Luxury & VIP', value: 'Luxury' },
    { label: 'Executive', value: 'Executive' },
  ];

  const filteredCars = useMemo(() => {
    return initialRentalCars.filter((car) => {
      if (selectedCategory && car.rentalCategory !== selectedCategory && car.bodyType !== selectedCategory) {
        return false;
      }
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const match = `${car.make} ${car.model} ${car.rentalCategory}`.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [initialRentalCars, selectedCategory, searchFilter]);

  return (
    <div className="space-y-12">
      {/* 1. RENTAL SEARCH BAR CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl -mt-16 relative z-20">
        <div className="mb-4">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Instant Fleet Availability
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Select Your Rental Dates & Pick-up Hub in Lahore
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Pick-up Location
            </label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
            >
              <option value="Main Boulevard, Gulberg III, Lahore">Gulberg III Flagship Hub</option>
              <option value="DHA Phase 5 Commercial, Lahore">DHA Phase 5 Branch</option>
              <option value="Johar Town Expo Centre Road, Lahore">Johar Town Branch</option>
              <option value="Allama Iqbal International Airport (LHE)">Allama Iqbal Airport Terminal (LHE)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Drop-off Location
            </label>
            <select
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
            >
              <option value="Main Boulevard, Gulberg III, Lahore">Gulberg III Flagship Hub</option>
              <option value="DHA Phase 5 Commercial, Lahore">DHA Phase 5 Branch</option>
              <option value="Johar Town Expo Centre Road, Lahore">Johar Town Branch</option>
              <option value="Allama Iqbal International Airport (LHE)">Allama Iqbal Airport Terminal (LHE)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Pick-up Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full h-11 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-800"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('fleet-results');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Rental Cars</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS & SEARCH */}
      <div id="fleet-results" className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                selectedCategory === cat.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Text Filter */}
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Quick search vehicle..."
            className="w-full h-10 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* 3. RENTAL FLEET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => {
          const dailyRate = car.rentalDailyRate || 12000;
          const weeklyRate = car.rentalWeeklyRate || Math.round(dailyRate * 6.2);
          const deposit = car.rentalDeposit || 35000;
          const whatsappRentMsg = encodeURIComponent(
            `Hello MOTOR, I would like to reserve the rental car: ${car.year} ${car.make} ${car.model} (Daily: ${formatPKR(dailyRate)}). Please confirm availability.`
          );

          return (
            <div
              key={car.id}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={car.mainImage}
                  alt={`${car.year} ${car.make} ${car.model} rental Lahore`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-slate-900/90 backdrop-blur-sm text-cyan-300 rounded-md">
                    {car.rentalCategory || car.bodyType}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-600 text-white rounded-md">
                    Available
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="text-[11px] text-white/95 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                    Fully Sanitized & Inspected
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                        {car.make}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        <Link href={`/rent/${car.slug}`}>
                          {car.year} {car.make} {car.model}
                        </Link>
                      </h3>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span className="truncate">{car.location}</span>
                  </div>

                  {/* Rental Rates Highlight */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Daily Rate</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        {formatPKR(dailyRate)} <span className="text-xs font-normal text-slate-500">/ day</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Weekly Deal</span>
                      <div className="text-xs font-bold text-indigo-600">
                        {formatPKR(weeklyRate)} <span className="text-[10px] text-slate-400 font-normal">/ wk</span>
                      </div>
                    </div>
                  </div>

                  {/* Specifications Matrix */}
                  <div className="mt-4 grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-[11px] text-slate-600">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.seats || 5} Seats</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{car.transmission.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="w-3.5 h-3.5 text-slate-400" />
                      <span>{car.fuelType}</span>
                    </div>
                  </div>

                  {/* Policy Tag */}
                  <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Deposit: <strong>{formatPKR(deposit)}</strong></span>
                    <span className="text-emerald-700 font-medium">Free 200 km / day</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
                  <Link
                    href={`/rent/${car.slug}`}
                    className="text-center py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    View Fleet
                  </Link>
                  <button
                    type="button"
                    onClick={() => setModalCar(car)}
                    className="text-center py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition flex items-center justify-center space-x-1"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Rent Now</span>
                  </button>
                  <a
                    href={enquiryLink(whatsappRentMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition flex items-center justify-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {modalCar && (
        <RentalBookingModal
          vehicle={modalCar}
          isOpen={Boolean(modalCar)}
          onClose={() => setModalCar(null)}
          initialPickupDate={pickupDate}
          initialReturnDate={returnDate}
          initialPickupLocation={pickupLocation}
          initialDropoffLocation={dropoffLocation}
        />
      )}
    </div>
  );
}
