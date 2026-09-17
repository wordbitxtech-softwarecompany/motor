'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

type Flow = '/sell/post-ad' | '/sell/help-me-sell';

export default function SellCarSection() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFlow, setTargetFlow] = useState<Flow>('/sell/post-ad');

  const openChoice = (flow: Flow) => {
    setTargetFlow(flow);
    setModalOpen(true);
  };

  return (
    <>
      <section aria-labelledby="sell-h" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sell-h" className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 text-center">
            {t('sell.heading', 'Sell Your Car on MOTOR | Pak and Get the Best Price')}
          </h2>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
            <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col bg-white hover:border-slate-300 hover:shadow-sm transition-all">
              <h3 className="text-xl font-black text-slate-900">{t('sell.myself', 'Sell It Myself!')}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {[
                  t('sell.bullet1', 'Post an ad in 2 minutes'),
                  t('sell.bullet2', 'Over 20 million buyers across Pakistan'),
                  t('sell.bullet3', 'Connect directly with verified buyers'),
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openChoice('/sell/post-ad')}
                className="mt-6 inline-flex items-center justify-center h-12 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                {t('sell.postAd', 'Post Your Ad')}
              </button>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <span className="text-sm font-black text-slate-400">{t('sell.or', 'OR')}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all">
              <h3 className="text-xl font-black text-slate-900">{t('sell.forMe', 'Sell It For Me')}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {[
                  t('sell.bullet4', 'We handle inspection and listing'),
                  t('sell.bullet5', 'Free featured ad boost'),
                  t('sell.bullet6', 'Our team aims for the best price'),
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openChoice('/sell/help-me-sell')}
                className="mt-6 inline-flex items-center justify-center h-12 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {t('sell.helpMe', 'Get Help Selling')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black tracking-tight text-slate-900 pr-8">How do you want to continue?</h3>
            <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
              Account is optional. You can post now — our team reviews every ad before it goes live.
            </p>

            <div className="mt-5 space-y-2.5">
              <Link
                href={targetFlow}
                onClick={() => setModalOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold inline-flex items-center justify-center gap-2"
              >
                Continue without account
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/signup?next=${encodeURIComponent(targetFlow)}`}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-bold inline-flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" aria-hidden="true" />
                Sign up
              </Link>
              <Link
                href={`/login?next=${encodeURIComponent(targetFlow)}`}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold inline-flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
