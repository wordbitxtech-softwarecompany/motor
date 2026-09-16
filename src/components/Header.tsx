'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  Phone,
  ChevronRight,
  KeyRound,
  MessageSquare,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const NAV_ITEMS = [
  { key: 'nav.newCars', label: 'New Cars', href: '/new-cars-pakistan' },
  { key: 'nav.usedCars', label: 'Used Cars', href: '/used-cars' },
  { key: 'nav.evHybrid', label: 'EV & Hybrid', href: '/electric-cars-pakistan', highlight: true },
  { key: 'nav.bikes', label: 'Bikes', href: '/bikes' },
  { key: 'nav.brands', label: 'Brands', href: '/brands' },
  { key: 'nav.sell', label: 'Sell Your Car', href: '/sell' },
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
      {/* ── Top utility bar ─────────────────────────────── */}
      <div className="bg-slate-950 text-slate-300 text-[11px] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* City links (left) */}
          <nav className="flex items-center space-x-1" aria-label="Cities">
            {CITY_LINKS.map((city, idx) => (
              <React.Fragment key={city.href}>
                {idx > 0 && <span className="text-slate-700 mx-0.5">•</span>}
                <Link
                  href={city.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {city.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="text-slate-600 ml-2 hidden sm:inline">• Serving 8+ cities across Pakistan</span>
          </nav>

          {/* Actions (right) */}
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
            <Link href="/sell/post-ad" className="hidden sm:inline text-slate-400 hover:text-white transition-colors">
              {t('action.postAd', 'Post an Ad')}
            </Link>
            <span className="text-slate-700" aria-hidden="true">|</span>
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
              {t('action.signIn', 'Sign In')}
            </Link>

            {/* Language switch */}
            <div className="inline-flex items-center bg-slate-900 border border-slate-800 rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                  language === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ur')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition font-urdu ${
                  language === 'ur' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'
                }`}
                title="اردو میں دیکھیں" lang="ur"
              >
                اردو
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main header ─────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="MOTOR Pakistan — Home">
              <span className="w-9 h-9 rounded-lg bg-white text-slate-950 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="font-black text-lg tracking-tighter leading-none">M</span>
              </span>
              <span className="leading-none">
                <span className="block text-xl font-black tracking-[-0.02em] text-white">MOTOR</span>
                <span className="block text-[9px] font-bold tracking-[0.3em] text-slate-400 mt-0.5">PAKISTAN</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 mx-2" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 py-2 rounded-lg text-[12.5px] whitespace-nowrap font-medium transition-colors ${
                    pathname.startsWith(item.href)
                      ? 'text-white font-semibold bg-white/10'
                      : item.highlight
                      ? 'text-teal-300 hover:text-teal-200 hover:bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.highlight && <Zap className="w-3 h-3 inline mr-1 -mt-0.5 text-teal-400" />}
                  {t(item.key, item.label)}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-2">
              <Link
                href="/cars"
                aria-label="Search cars"
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>

              <Link
                href="/used-cars"
                className="hidden md:inline-flex items-center px-3.5 py-2 rounded-lg border border-white/25 text-[13px] font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 mr-1.5 text-slate-300" aria-hidden="true" />
                {t('action.buyNow', 'Buy a Car')}
              </Link>

              <Link
                href="/test-drive"
                className="hidden xl:inline-flex items-center px-3.5 py-2 rounded-lg border border-white/25 text-[13px] font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 mr-1.5 text-slate-300" aria-hidden="true" />
                {t('action.bookTestDrive', 'Book Test Drive')}
              </Link>

              <Link
                href="/sell/post-ad"
                className="hidden sm:inline-flex items-center px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[13px] font-bold shadow-sm transition-colors"
              >
                {t('action.postAd', 'Post an Ad')}
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-950 px-4 pt-2 pb-6 shadow-xl">
            <nav className="space-y-0.5 pt-2" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium ${
                    item.highlight ? 'text-teal-300 bg-white/5' : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>
                    {item.highlight && <Zap className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
                    {t(item.key, item.label)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
              <Link
                href="/test-drive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/25 text-sm font-semibold text-white"
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
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl border border-white/25 text-sm font-semibold text-white">
                  {t('action.signIn', 'Sign In')}
                </Link>
                <Link href="/sell/post-ad" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl bg-white text-slate-900 text-sm font-bold">
                  {t('action.postAd', 'Post an Ad')}
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-1 text-xs text-slate-400">
                {CITY_LINKS.map((city) => (
                  <Link key={city.href} href={city.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                    {city.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
