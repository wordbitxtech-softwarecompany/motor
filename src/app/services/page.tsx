import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Car,
  KeyRound,
  TrendingUp,
  BadgePercent,
  ShieldCheck,
  Plane,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/services' },
  title: 'Automotive Dealership & Rental Services Lahore | MOTOR',
  description: 'Explore MOTOR full suite of automotive services in Lahore: Pre-owned certified sales, luxury car rentals, trade-in valuations, Islamic bank financing and airport transfers.',
};

export default function ServicesPage() {
  const serviceCards = [
    {
      title: 'Certified Pre-Owned Car Sales',
      description: 'Handpicked, accident-free vehicles certified with 150-point physical and technical inspection. Transparent documentation with biometric ownership transfer.',
      icon: Car,
      ctaText: 'Browse Vehicles',
      ctaLink: '/cars',
      badge: 'Certified Sales'
    },
    {
      title: 'Car Rental & Self-Drive Fleet',
      description: 'Flexible daily, weekly, and monthly vehicle rentals across sedans, crossovers, and luxury SUVs. Clean, sanitized, and insured fleet.',
      icon: KeyRound,
      ctaText: 'Explore Rental Fleet',
      ctaLink: '/rent',
      badge: 'Fleet Rental'
    },
    {
      title: 'Sell Your Car / Instant Valuation',
      description: 'Skip the time-consuming online ads and unreliable marketplace buyers. Free doorstep evaluation in Lahore with same-day guaranteed bank wire transfer.',
      icon: TrendingUp,
      ctaText: 'Request Valuation',
      ctaLink: '/sell',
      badge: 'Fast Cash'
    },
    {
      title: 'Automotive Financing Assistance',
      description: 'Specialized arrangements with Meezan Bank Car Ijarah, Bank Alfalah, and Standard Chartered. Low markup tiers and fast 48-hour approvals.',
      icon: BadgePercent,
      ctaText: 'Calculate Installment',
      ctaLink: '/financing',
      badge: 'Bank Partners'
    },
    {
      title: '150-Point Technical Inspection',
      description: 'Comprehensive mechanical assessment including computerized engine scans, paint thickness meter checks, chassis verification, and road testing.',
      icon: ShieldCheck,
      ctaText: 'Learn About Checks',
      ctaLink: '/about',
      badge: 'Quality Standard'
    },
    {
      title: 'Airport VIP Transfers (LHE)',
      description: 'Reliable curbside airport collection and drop-off at Allama Iqbal International Airport Lahore. Clean sedans and SUVs with professional chauffeurs.',
      icon: Plane,
      ctaText: 'Book Airport Car',
      ctaLink: '/rent',
      badge: 'Chauffeur'
    },
    {
      title: 'Corporate Long-Term Fleet Leasing',
      description: 'Tailored monthly vehicle fleets for multinational corporations, foreign embassies, and local enterprises with 24/7 backup vehicle replacement.',
      icon: Building2,
      ctaText: 'Corporate Inquiry',
      ctaLink: '/contact',
      badge: 'B2B Fleets'
    },
    {
      title: 'Certified Trade-In Exchange',
      description: 'Exchange your current automobile for any MOTOR certified inventory vehicle. We evaluate your existing car and credit the value towards your upgrade.',
      icon: SlidersHorizontal,
      ctaText: 'Start Trade-In',
      ctaLink: '/sell',
      badge: 'Vehicle Exchange'
    },
    {
      title: 'Complimentary Showroom Test Drives',
      description: 'Experience engine responsiveness, cabin insulation, and suspension dynamics firsthand at our Gulberg III or DHA Phase 5 test-drive courses.',
      icon: CalendarCheck,
      ctaText: 'Schedule Test Drive',
      ctaLink: '/test-drive',
      badge: 'Test Drive'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Automotive Ecosystem</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Comprehensive Automotive Services in Lahore
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From acquiring your next certified luxury sedan to flexible corporate rental fleets and instant trade-ins,
              MOTOR delivers unmatched professionalism at every stage of automotive ownership.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <Link
                  href={srv.ctaLink}
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 space-x-1 pt-2 border-t border-slate-100"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* WordbitX Partnership Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              Technology by WordbitX
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Looking to Build a Custom Automotive Software Solution?
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              WordbitX develops custom dealership websites, rental booking engines, CRM pipelines, and vehicle inventory management platforms for forward-thinking businesses.
            </p>
          </div>

          <a
            href="https://www.wordbitxtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-md shrink-0 flex items-center space-x-2"
          >
            <span>Build with WordbitX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
