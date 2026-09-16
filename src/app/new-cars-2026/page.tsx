import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LaunchGrid, { LaunchDisclaimer } from '@/components/LaunchGrid';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { launchesFor, PRICE_LAST_UPDATED } from '@/lib/catalog';
import { buildMetadata, itemListSchema, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'New Cars in Pakistan 2026 | Prices',
  description:
    'New cars launching in Pakistan in 2026 from Toyota, Honda, Kia, MG, BYD, Changan, Haval and Jetour — with prices, fuel types and launch status.',
  path: '/new-cars-2026',
  keywords: [
    'new cars 2026 Pakistan',
    'new cars in Pakistan',
    'latest car launches Pakistan',
    'upcoming cars Pakistan 2026',
    'new car prices Pakistan',
  ],
});

const FAQS = [
  {
    q: 'Which new cars launched in Pakistan in 2026?',
    a: 'The 2026 line-up includes new arrivals such as the Kia Sportage AWD and Sportage L, MG HS Hybrid+, Haval Jolion HEV, Jetour X70 Plus, BAIC X55 II and Peugeot 2008 GT, alongside newly introduced electrified models from BYD, Deepal and ORA.',
  },
  {
    q: 'Which 2026 cars are electric or hybrid?',
    a: 'Electrified 2026 entries include the BYD Sealion 7 and Sealion 6 DM-i, Deepal S07 Pure Electric, MG4 EV, ORA 5, Changan Lumin 301km, Kia Sorento Hybrid and Suzuki Fronx Hybrid. Availability differs — some are confirmed while others are expected.',
  },
  {
    q: 'Are 2026 prices on this page final?',
    a: `Prices shown are the latest listed figures reviewed on ${PRICE_LAST_UPDATED}. Models marked Coming Soon, Expected or Pre-Launch do not have officially confirmed pricing yet and are labelled accordingly.`,
  },
  {
    q: 'What is the cheapest new car in Pakistan in 2026?',
    a: 'Among currently listed models, entry-level hatchbacks such as the Suzuki Alto sit at the most accessible end of the market, while the Changan Lumin is the most affordable battery-electric option.',
  },
];

export default function NewCars2026Page() {
  const launches = launchesFor(2026, 'car');
  const confirmed = launches.filter((f) => f.priceMin > 0);
  const upcoming = launches.filter((f) => f.priceMin === 0);

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd
        schema={itemListSchema(
          'New cars in Pakistan 2026',
          launches.map((f) => ({ name: `${f.brand} ${f.name}`, path: f.url }))
        )}
      />
      <SchemaJsonLd schema={faqSchema(FAQS)} />

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Cars', path: '/cars' }, { name: 'New Cars 2026', path: '/new-cars-2026' }]} dark />
          <h1 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            New Cars in Pakistan 2026
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {launches.length} cars are newly launched, confirmed or expected for the Pakistani market in 2026 —
            spanning petrol, hybrid, plug-in hybrid, range-extended and fully electric powertrains.
          </p>
          <dl className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2.5">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">On sale now</dt>
              <dd className="text-xl font-black">{confirmed.length}</dd>
            </div>
            <div className="rounded-xl bg-white/[0.06] border border-white/10 px-4 py-2.5">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Expected</dt>
              <dd className="text-xl font-black">{upcoming.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <LaunchDisclaimer />

        <section aria-labelledby="onsale-h">
          <h2 id="onsale-h" className="text-2xl font-black tracking-tight text-slate-900">
            2026 Cars On Sale in Pakistan
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-5">
            Models with listed pricing, available through dealers now.
          </p>
          <LaunchGrid families={confirmed} />
        </section>

        <section aria-labelledby="expected-h">
          <h2 id="expected-h" className="text-2xl font-black tracking-tight text-slate-900">
            Expected &amp; Upcoming 2026 Cars
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-5">
            Confirmed for launch or widely expected — pricing not yet official.
          </p>
          <LaunchGrid families={upcoming} />
        </section>

        <section aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-2xl font-black tracking-tight text-slate-900">
            New Cars 2026 — FAQs
          </h2>
          <div className="mt-5 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white border border-slate-200 p-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-900">{f.q}</h3>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg leading-none" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label="Related pages" className="flex flex-wrap gap-2">
          {[
            { l: 'All cars', h: '/cars' },
            { l: 'New bikes 2026', h: '/new-bikes-2026' },
            { l: 'Electric cars', h: '/electric-cars-pakistan' },
            { l: 'Hybrid cars', h: '/hybrid-cars-pakistan' },
            { l: 'Toyota', h: '/brands/toyota' },
            { l: 'All brands', h: '/brands' },
          ].map((x) => (
            <Link key={x.h} href={x.h} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors">
              {x.l}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
