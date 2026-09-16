import React from 'react';
import { Metadata } from 'next';
import { getRentalVehicles } from '@/lib/data';
import RentalExplorer from './RentalExplorer';
import { KeyRound, ShieldCheck, MapPin, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/rent' },
  title: 'Car Rental in Lahore | Rent a Car Gulberg, DHA & Airport LHE',
  description: 'Rent luxury cars, SUVs and sedans in Lahore with MOTOR. Daily, weekly and monthly rental packages with doorstep delivery in Gulberg, DHA Lahore & Allama Iqbal Airport.',
  keywords: [
    'car rental Lahore',
    'rent a car Lahore',
    'car rental service Lahore',
    'luxury car rental Lahore',
    'SUV rental Lahore',
    'monthly car rental Lahore',
    'airport car rental Lahore',
    'rent Fortuner Lahore',
    'rent Civic Lahore'
  ],
};

export default async function RentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const rentalCars = await getRentalVehicles();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Rental Hero */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/10638645/pexels-photo-10638645.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
            alt="Car rental fleet Lahore"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <KeyRound className="w-3.5 h-3.5 mr-1" />
              MOTOR Premium Fleet Rental
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Rent the Right Car for Every Journey.
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore Lahore, travel the motorway to Islamabad, or embark on a northern expedition in our certified fleet.
              Transparent daily rates, comprehensive CDW insurance, and guaranteed punctual handover.
            </p>
          </div>
        </div>
      </section>

      {/* Main Rental Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RentalExplorer
          initialRentalCars={rentalCars}
          initialCategory={params.category}
        />
      </div>
    </div>
  );
}
