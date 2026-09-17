'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  ChevronRight,
  MessageSquare,
  Zap,
  KeyRound,
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
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();

  const waLink =
    '/contact?text=' +
    encodeURIComponent('Hello MOTOR Pakistan, I would like to ask about a vehicle.');

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get('q') || '').trim();
    const bikeHint = /\b(bike|cd 70|cg 125|ybr|scooter|scooty)\b/i.test(q);
    router.push(`${bikeHint ? '/bikes' : '/cars'}${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <div className="bg-[#070b14] text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <nav className="flex items-center gap-1" aria-label="Cities">
            {CITY_LINKS.map((city, idx) => (
              <React.Fragment key={city.href}>
                {idx > 0 && <span className="text-white/15 mx-1">/</span>}
                <Link href={city.href} className="hover:text-white transition-colors tracking-wide">
                  {city.label}
                </Link>
              </React.Fragment>
            ))}
            <span className="hidden md:inline text-white/25 ml-3 tracking-[0.18em] uppercase text-[9px] font-semibold">
              Pakistan marketplace
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              WhatsApp
            </a>
            <Link href="/login" className="hidden sm:inline hover:text-white transition-colors">
              {t('action.signIn', 'Sign In')}
            </Link>
            <div className="inline-flex rounded-full border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  language === 'en' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ur')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-urdu ${
                  language === 'ur' ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-white'
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

      <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_10px_40px_rgba(15,23,42,0.06)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-amber-700 before:via-amber-400 before:to-teal-700 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-8 h-[72px]">
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="MOTOR Pakistan — Home">
              <span className="relative w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-[0_8px_24px_rgba(15,23,42,0.28)]">
                <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-400/40" aria-hidden="true" />
                <span className="font-black text-lg tracking-tighter leading-none">M</span>
              </span>
              <span className="leading-none">
                <span className="block text-[22px] font-black tracking-[-0.04em] text-slate-950">MOTOR</span>
                <span className="block text-[9px] font-bold tracking-[0.38em] text-amber-700 mt-1">PAKISTAN</span>
              </span>
            </Link>

            <form onSubmit={onSearch} action="/cars" method="get" className="hidden md:flex flex-1 max-w-xl">
              <label className="relative flex items-center w-full group">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400 group-focus-within:text-teal-700" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search Corolla, T2, CD 70, Civic…"
                  className="w-full h-11 pl-10 pr-24 rounded-full bg-slate-50 border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white focus:ring-4 focus:ring-slate-900/5 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 h-8 px-4 rounded-full bg-slate-950 text-white text-[11px] font-bold tracking-wide hover:bg-slate-800"
                >
                  Search
                </button>
              </label>
            </form>

            <div className="flex items-center gap-2 ml-auto">
              <Link
                href="/cars"
                aria-label="Search cars"
                className="md:hidden p-2.5 rounded-full text-slate-700 hover:bg-slate-100"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/test-drive"
                className="hidden xl:inline-flex items-center h-10 px-4 rounded-full border border-slate-200 text-[13px] font-semibold text-slate-800 hover:border-slate-900"
              >
                <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                {t('action.bookTestDrive', 'Book Test Drive')}
              </Link>
              <a
                href={waLink}
                className="hidden 2xl:inline-flex items-center h-10 px-4 rounded-full border border-slate-200 text-[13px] font-semibold text-slate-800 hover:border-slate-900"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Enquire
              </a>
              <Link
                href="/sell/post-ad"
                className="hidden sm:inline-flex items-center h-10 px-5 rounded-full bg-[#c8102e] hover:bg-[#a50d25] text-white text-[13px] font-bold shadow-[0_8px_20px_rgba(200,16,46,0.28)]"
              >
                {t('action.postAd', 'Post an Ad')}
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-slate-800 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-slate-100 bg-white/80" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 h-11 inline-flex items-center text-[12.5px] font-semibold tracking-wide transition-colors ${
                    active
                      ? 'text-slate-950'
                      : item.highlight
                      ? 'text-teal-700 hover:text-teal-800'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.highlight && <Zap className="w-3 h-3 mr-1 text-teal-600" />}
                  {t(item.key, item.label)}
                  <span
                    className={`absolute left-3 right-3 bottom-0 h-[2px] rounded-full ${
                      active ? 'bg-amber-500' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
            <form onSubmit={onSearch} action="/cars" method="get" className="mb-3">
              <label className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search cars and bikes"
                  className="w-full h-11 pl-10 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                />
              </label>
            </form>
            <nav className="space-y-0.5" aria-label="Mobile navigation">
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
            <div className="mt-3 space-y-2">
              <Link
                href="/test-drive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
              >
                {t('action.bookTestDrive', 'Book Test Drive')}
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold"
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
