import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/contact';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Cars',
    links: [
      { label: 'New Cars', href: '/new-cars-pakistan' },
      { label: 'Used Cars', href: '/used-cars-lahore' },
      { label: 'Cars for Sale', href: '/cars' },
      { label: 'Electric Cars', href: '/electric-cars-pakistan' },
      { label: 'Hybrid Cars', href: '/hybrid-cars-pakistan' },
      { label: 'New Cars 2026', href: '/new-cars-2026' },
    ],
  },
  {
    title: 'Bikes',
    links: [
      { label: 'Bikes', href: '/bikes' },
      { label: 'Scooties', href: '/scooties' },
      { label: 'Electric Scooties', href: '/scooties' },
      { label: 'New Bikes 2026', href: '/new-bikes-2026' },
      { label: 'Honda Bikes', href: '/brands/honda-bikes' },
      { label: 'Yamaha Bikes', href: '/brands/yamaha' },
    ],
  },
  {
    title: 'Brands',
    links: [
      { label: 'Toyota', href: '/brands/toyota' },
      { label: 'Honda', href: '/brands/honda' },
      { label: 'Suzuki', href: '/brands/suzuki' },
      { label: 'Kia', href: '/brands/kia' },
      { label: 'Hyundai', href: '/brands/hyundai' },
      { label: 'MG', href: '/brands/mg' },
      { label: 'BYD', href: '/brands/byd' },
      { label: 'Changan', href: '/brands/changan' },
      { label: 'Haval', href: '/brands/haval' },
      { label: 'View All Brands', href: '/brands' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Compare Cars', href: '/compare' },
      { label: 'Vehicle Search', href: '/cars' },
      { label: 'Finance Calculator', href: '/financing' },
      { label: 'Book a Test Drive', href: '/test-drive' },
      { label: 'Sell Your Car', href: '/sell' },
      { label: 'Car Rental', href: '/rent' },
    ],
  },
  {
    title: 'News & Guides',
    links: [
      { label: 'Automotive News', href: '/blog' },
      { label: 'Car Reviews', href: '/blog' },
      { label: 'Buying Guides', href: '/blog' },
      { label: 'EV Guides', href: '/electric-cars-pakistan' },
      { label: 'Upcoming Cars', href: '/upcoming-cars-pakistan' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  },
];

const CITIES = [
  { label: 'Cars in Lahore', href: '/cars-in-lahore' },
  { label: 'Cars in Islamabad', href: '/cars-in-islamabad' },
  { label: 'Cars in Karachi', href: '/cars-in-karachi' },
  { label: 'Electric Cars Lahore', href: '/electric-cars-lahore' },
  { label: 'Hybrid Cars Lahore', href: '/hybrid-cars-lahore' },
  { label: 'Car Rental Lahore', href: '/car-rental-lahore' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t-4 border-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="MOTOR | Pak — Home">
              <span className="w-9 h-9 rounded-lg bg-white text-slate-950 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="font-black text-lg tracking-tighter leading-none">M</span>
              </span>
              <span className="leading-none">
                <span className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black tracking-[-0.02em] text-white">MOTOR</span>
                  <span className="text-[11px] font-semibold text-slate-400">| Pak</span>
                </span>
                <span className="block text-[9px] font-semibold tracking-[0.12em] text-slate-500 mt-1">
                  WordbitX group of companies
                </span>
              </span>
            </Link>

            <p className="text-xs leading-relaxed max-w-xs">
              Pakistan&apos;s automotive platform for cars, bikes, SUVs, EVs and hybrids — prices,
              specifications, brands, models and comparisons in one place.
            </p>

            <address className="not-italic space-y-2 text-xs pt-1">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-slate-500 shrink-0" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">{CONTACT_EMAIL}</a>
              </p>
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-slate-500 shrink-0" aria-hidden="true" />
                <span>Lahore, Pakistan</span>
              </p>
            </address>

            <Link
              href="/contact"
              className="inline-flex items-center px-3.5 py-2 rounded-lg bg-white text-slate-950 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Contact Us
            </Link>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-labelledby={`f-${col.title}`}>
                <h2 id={`f-${col.title}`} className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
                  {col.title}
                </h2>
                <ul className="space-y-2.5 text-xs">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* WordbitX branding — above city navigation */}
        <aside className="mt-10 pt-8 border-t border-slate-800/70">
          <a
            href="https://www.wordbitxtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-900 ring-1 ring-white/10 px-5 py-5 hover:ring-emerald-400/40 transition-colors"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">WordbitX group of companies</p>
              <p className="text-2xl font-black text-white tracking-tight mt-1">WordbitX</p>
              <p className="text-xs text-slate-400 mt-1.5 max-w-md">
                Product, engineering and digital infrastructure behind MOTOR | Pak.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white shrink-0">
              wordbitxtech.com
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </a>
        </aside>

        {/* Cities */}
        <nav aria-label="Cities" className="mt-10 pt-8 border-t border-slate-800/70">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-3">Browse by City</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {CITIES.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-slate-800/70 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {year} MOTOR | Pak · WordbitX group of companies. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Technology by
            <a
              href="https://www.wordbitxtech.com/"
              target="_blank" rel="noopener noreferrer"
              className="text-slate-300 hover:text-white font-semibold inline-flex items-center gap-1 transition-colors"
            >
              WordbitX <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
