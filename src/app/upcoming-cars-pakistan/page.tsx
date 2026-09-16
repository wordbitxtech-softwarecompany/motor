import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { UPCOMING_MODELS } from '@/lib/upcoming-models';
import { Clock, Tag, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/upcoming-cars-pakistan' },
  title: 'Upcoming Cars in Pakistan 2026 | Expected Launches & EV Previews',
  description: 'Track upcoming car launches in Pakistan for 2026. Previews of BYD Atto 2, Omoda 7, Jetour T2, MG4 EV, Aion V and XPeng L03 with expected launch windows.',
  keywords: [
    'upcoming cars Pakistan',
    'upcoming cars Pakistan 2026',
    'new car launches Pakistan 2026',
    'upcoming EVs in Pakistan',
    'expected cars Pakistan',
    'BYD Atto 2 Pakistan launch'
  ],
};

export default function UpcomingCarsPakistanPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px] font-bold uppercase tracking-[0.18em]">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Launch Radar
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Upcoming Cars in Pakistan: 2026 Launch Watch
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A running watchlist of models expected to enter the Pakistani market through local assembly or
            import channels. Launch windows are indicative and may change based on distributor announcements.
          </p>
          <div className="pt-2 p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start space-x-2 max-w-2xl">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Please note:</strong> launch windows and pricing for unreleased models are not officially confirmed. Always verify with authorised local distributors before booking.
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {UPCOMING_MODELS.map((m, idx) => (
            <div
              key={m.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 ${
                idx > 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm font-bold text-slate-900">{m.name}</h2>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                      {m.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{m.note}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {m.status}
                </span>
                <span className="text-xs text-slate-400">{m.window}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Want early access when a launch is confirmed?</h2>
            <p className="text-xs text-slate-500 mt-1">Register your interest and the team will notify you before public booking opens.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors shrink-0"
          >
            Notify Me
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
