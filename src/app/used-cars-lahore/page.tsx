import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllVehicles } from '@/lib/data';
import CarsExplorer from '../cars/CarsExplorer';
import { ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/used-cars-lahore' },
  title: 'Used Cars in Lahore | Prices & Listings',
  description: 'Used cars in Lahore with inspection reports and verified ownership — Toyota Corolla, Honda Civic, Fortuner and Sportage with prices.',
  keywords: [
    'used cars Lahore',
    'used cars for sale Lahore',
    'buy used car Lahore',
    'car dealer in Lahore',
    'certified pre owned cars Lahore',
    'car showroom Lahore Gulberg DHA'
  ],
};

export default async function UsedCarsLahorePage() {
  const allVehicles = await getAllVehicles();
  const usedVehicles = allVehicles.filter((v) => v.condition === 'Certified Pre-Owned');

  return (
    <div className="bg-slate-50 min-h-screen py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified Pre-Owned Standard • Lahore, Punjab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Used Cars in Lahore: 150-Point Inspected & Verified
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Eliminating street-broker uncertainty in Lahore. Every pre-owned vehicle at MOTOR has passed electronic paint-depth gauge scans to confirm original paint, compression testing, and guaranteed biometric ownership transfer through the Punjab Excise & Taxation Department.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
            <span>✓ Genuine Document Smart Card & File Clearance</span>
            <span>✓ Zero Meter Tampering or Odometer Rollback Guarantee</span>
            <span>✓ Ramp Inspection Available at Gulberg III & DHA Phase 5</span>
          </div>
        </div>

        {/* Explorer UI */}
        <CarsExplorer initialVehicles={usedVehicles} />
      </div>
    </div>
  );
}
