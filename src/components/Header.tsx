'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  ChevronRight,
  KeyRound,
  MessageSquare,
  Zap,
  ShoppingBag,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const NAV_ITEMS = [
  { key: 'nav.usedCars', label: 'Used Cars', href: '/used-cars' },
  { key: 'nav.newCars', label: 'New Cars', href: '/new-cars-pakistan' },
  { key: 'nav.bikes', label: 'Bikes', href: '/bikes' },
  { key: 'nav.evHybrid', label: 'EV & Hybrid', href: '/electric-cars-pakistan', highlight: true },
  { key: 'nav.brands', label: 'Brands', href: '/brands' },
  { key: 'nav.compare', label: 'Compare', href: '/compare' },
  { key: 'nav.news', label: 'News', href: '/blog' },
];

const CITY_LINKS = [
  { label: 'Lahore', href: '/locations/lahore' },
  { label: 'Islamabad', href: '/locations/islamabad' },
  { label: 'Karachi', href: '/locations/karachi' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const waLink =
    '/contact?text=' +
    encodeURIComponent('Hello MOTOR Pakistan, I would like to ask about a vehicle.');

  return (
    <>
      <div className="bg-slate-900 text-slate-300 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <nav className="flex items-center space-x-1" aria-label="Cities">
            {CITY_LINKS.map((city, idx) => (
              <React.Fragment key={city.href}>
                {idx > 0 && <span className="text-slate-600 mx-0.5">•</span>}
                <Link href={city.href} className="text-slate-300 hover:text-white transition-colors">
                  {city.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="text-slate-500 ml-2 hidden sm:inline">• Serving 8+ cities across Pakistan</span>
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              WhatsApp
            </a>
            <Link href="/sell/post-ad" className="hidden sm:inline text-slate-300 hover:text-white transition-colors">
              {t('action.postAd', 'Post an Ad')}
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link href="/login" className="text-white hover:text-teal-300 transition-colors font-semibold">
              {t('action.signIn', 'Sign In')}
            </Link>

            <div className="inline-flex items-center bg-slate-800 border border-slate-700 rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                  language === 'en' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ur')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition font-urdu ${
                  language === 'ur' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
                title="اردو میں دیکھیں"
                lang="ur"
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="MOTOR Pakistan — Home">
              <span className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                <span className="font-black text-lg tracking-tighter leading-none">M</span>
              </span>
              <span className="leading-none">
                <span className="block text-xl font-black tracking-[-0.03em] text-slate-900">MOTOR</span>
                <span className="block text-[9px] font-bold tracking-[0.28em] text-teal-700 mt-0.5">PAKISTAN</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 mx-2" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-2 rounded-lg text-[13px] whitespace-nowrap font-semibold transition-colors ${
                    pathname.startsWith(item.href)
                      ? 'text-teal-700 bg-teal-50'
                      : item.highlight
                      ? 'text-teal-700 hover:bg-teal-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.highlight && <Zap className="w-3 h-3 inline mr-1 -mt-0.5 text-teal-600" />}
                  {t(item.key, item.label)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <Link
                href="/cars"
                aria-label="Search cars"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>

              <Link
                href="/used-cars"
                className="hidden md:inline-flex items-center px-3.5 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-slate-500" aria-hidden="true" />
                {t('action.buyNow', 'Buy a Car')}
              </Link>

              <Link
                href="/test-drive"
                className="hidden xl:inline-flex items-center px-3.5 py-2 rounded-lg border border-slate-200 text-[13px] font-semibold text-slate-800 hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 mr-1.5 text-slate-500" aria-hidden="true" />
                {t('action.bookTestDrive', 'Book Test Drive')}
              </Link>

              <Link
                href="/sell/post-ad"
                className="hidden sm:inline-flex items-center px-4 py-2.5 rounded-lg bg-[#c8102e] hover:bg-[#a50d25] text-white text-[13px] font-bold shadow-sm transition-colors"
              >
                {t('action.postAd', 'Post an Ad')}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl">
            <nav className="space-y-0.5 pt-2" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold ${
                    item.highlight ? 'text-teal-700 bg-teal-50' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    {item.highlight && <Zap className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                    {t(item.key, item.label)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
              <Link
                href="/test-drive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
              >
                Book a Test Drive
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                >
                  {t('action.signIn', 'Sign In')}
                </Link>
                <Link
                  href="/sell/post-ad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl bg-[#c8102e] text-white text-sm font-bold"
                >
                  {t('action.postAd', 'Post an Ad')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
