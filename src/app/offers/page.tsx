import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getOffers } from '@/lib/data';
import {
  BadgePercent,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/offers' },
  title: 'Automotive Offers & Rental Promotions Lahore | MOTOR',
  description: 'Special car rental offers, trade-in bonus vouchers, and seasonal automotive discounts in Lahore at MOTOR.',
};

export default async function OffersPage() {
  const offersList = await getOffers();

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Promotions & Incentives</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Exclusive MOTOR Offers & Specials
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Take advantage of limited-time savings across weekend rental escapes, subsidized bank financing tiers, and certified trade-in valuation bonuses.
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offersList.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img
                  src={offer.imageUrl}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-lg shadow-sm">
                    {offer.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-[11px] text-white/95 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                    {offer.validUntil}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {offer.title}
                  </h3>
                  <div className="mt-2 inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200/60">
                    {offer.discountDetails}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Category: {offer.category}</span>
                  <Link
                    href={offer.ctaLink}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>{offer.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
