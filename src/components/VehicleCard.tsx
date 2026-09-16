'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, MessageSquare, GitCompareArrows, KeyRound, Zap } from 'lucide-react';
import { formatPKR, formatNumber } from '@/lib/utils';
import { enquiryLink } from '@/lib/contact';

export interface VehicleProps {
  id: number;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  priceLabel?: string | null;
  monthlyEstimate?: number | null;
  mileage: number;
  powertrain?: string | null;
  availabilityStatus?: string | null;
  transmission: string;
  fuelType: string;
  bodyType: string;
  engineCapacity: string;
  condition: string;
  location: string;
  status: string;
  isFeatured?: boolean;
  isRental?: boolean;
  isNewArrival?: boolean;
  isGreatValue?: boolean;
  rentalDailyRate?: number | null;
  rentalWeeklyRate?: number | null;
  batteryCapacity?: string | null;
  electricRange?: string | null;
  combinedRange?: string | null;
  mainImage: string;
}

function conditionBadge(vehicle: VehicleProps) {
  if (vehicle.condition === 'Brand New') {
    return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-slate-900 text-white rounded">NEW</span>;
  }
  if (vehicle.condition === 'Certified Pre-Owned') {
    return <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-white text-slate-900 rounded border border-slate-300">USED</span>;
  }
  return null;
}

function powertrainBadge(powertrain?: string | null) {
  if (!powertrain) return null;
  const map: Record<string, string> = {
    EV: 'bg-cyan-100 text-cyan-800',
    Hybrid: 'bg-amber-100 text-amber-800',
    PHEV: 'bg-violet-100 text-violet-800',
    REEV: 'bg-emerald-100 text-emerald-800',
  };
  const cls = map[powertrain] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${cls}`}>
      {powertrain === 'Hybrid' ? 'HEV' : powertrain}
    </span>
  );
}

export default function VehicleCard({
  vehicle,
  viewMode = 'sale'
}: {
  vehicle: VehicleProps;
  viewMode?: 'sale' | 'rental';
}) {
  const isRentalMode = viewMode === 'rental';
  const whatsappMsg = encodeURIComponent(
    `Hello MOTOR Pakistan, I would like to ask about the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.slug}).`
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={vehicle.mainImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.condition} vehicle in ${vehicle.location.split(',')[0] || 'Pakistan'}`}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {conditionBadge(vehicle)}
          {powertrainBadge(vehicle.powertrain)}
          {vehicle.availabilityStatus && !['Available in Pakistan', 'Dealer Stock'].includes(vehicle.availabilityStatus) && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 rounded">
              {vehicle.availabilityStatus}
            </span>
          )}
        </div>
        {vehicle.electricRange && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center text-[10px] font-bold text-white bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded">
              <Zap className="w-3 h-3 mr-1 text-teal-400" />
              {vehicle.electricRange}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                <Link
                  href={isRentalMode ? `/rent/${vehicle.slug}` : `/cars/${vehicle.slug}`}
                  className="hover:text-teal-700 transition-colors"
                >
                  {vehicle.make} {vehicle.model}
                </Link>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{vehicle.engineCapacity}</p>
            </div>
            {vehicle.isFeatured && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded shrink-0">
                Popular
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-3">
            {isRentalMode ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-slate-900">{formatPKR(vehicle.rentalDailyRate || 10000)}</span>
                <span className="text-xs text-slate-500">/ day</span>
                {vehicle.rentalWeeklyRate && (
                  <span className="text-[11px] text-slate-400 ml-auto">{formatPKR(vehicle.rentalWeeklyRate)} / week</span>
                )}
              </div>
            ) : (
              <div>
                {vehicle.priceLabel && (
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">{vehicle.priceLabel}</span>
                )}
                <span className="text-lg font-black text-slate-900">
                  {vehicle.price > 0 ? formatPKR(vehicle.price) : 'Price Coming Soon'}
                </span>
              </div>
            )}
          </div>

          {/* Specs row */}
          <div className="mt-3 grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-[11px] text-slate-600">
            <div>
              <span className="block text-slate-400 text-[9px] font-semibold uppercase">Year</span>
              <span className="font-semibold">{vehicle.year}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[9px] font-semibold uppercase">Mileage</span>
              <span className="font-semibold">{formatNumber(vehicle.mileage)} km</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[9px] font-semibold uppercase">Trans.</span>
              <span className="font-semibold truncate">{vehicle.transmission.split(' ')[0]}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mt-2.5 flex items-center text-[11px] text-slate-500">
            <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
            <span className="truncate">{vehicle.location.split(',')[0] || 'Pakistan'}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Link
            href={isRentalMode ? `/rent/${vehicle.slug}` : `/cars/${vehicle.slug}`}
            className="col-span-1 text-center py-2 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isRentalMode ? 'Rent Now' : 'View Details'}
          </Link>
          {!isRentalMode ? (
            <Link
              href={`/compare?car=${vehicle.slug}`}
              className="col-span-1 text-center py-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
              <span>Compare</span>
            </Link>
          ) : (
            <Link
              href={`/test-drive?car=${vehicle.slug}`}
              className="col-span-1 text-center py-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Test Drive</span>
            </Link>
          )}
          <a
            href={enquiryLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 text-center py-2 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
