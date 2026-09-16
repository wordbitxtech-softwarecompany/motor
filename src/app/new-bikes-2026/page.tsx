import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LaunchGrid, { LaunchDisclaimer } from '@/components/LaunchGrid';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { launchesFor, PRICE_LAST_UPDATED } from '@/lib/catalog';
import { buildMetadata, itemListSchema, faqSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'New Bikes in Pakistan 2026 | Prices',
  description:
    'New motorcycles and electric scooties launching in Pakistan in 2026 from Honda, Yamaha, Suzuki, Jolta, Vlektra and Yadea, with prices.',
  path: '/new-bikes-2026',
  keywords: [
    'new bikes 2026 Pakistan',
    'new motorcycles Pakistan',
    'electric scooty Pakistan 2026',
    'new bike launches Pakistan',
    'bike prices Pakistan 2026',
  ],
});

const FAQS = [
  {
    q: 'Which new bikes are launching in Pakistan in 2026?',
    a: 'The 2026 two-wheeler list includes the Honda CB 150F Gold Edition, Yamaha YBR 125 Café Racer and Suzuki GSX 125, along with electric models such as the Jolta JE 125, Vlektra 125E and Yadea T9.',
  },
  {
    q: 'What is the price of an electric scooty in Pakistan in 2026?',
    a: 'Listed electric scooties start around PKR 189,900 for entry models and reach roughly PKR 330,000 for higher-capacity options with 3 kWh batteries and 120 km of rated range.',
  },
  {
    q: 'Are electric bikes cheaper to run than petrol bikes in Pakistan?',
    a: 'Yes. A 2 kWh electric bike battery costs roughly PKR 110–130 for a full home charge and delivers around 80 km, which is significantly less than the petrol cost for the same distance.',
  },
  {
    q: 'Are these 2026 bike prices confirmed?',
    a: `Listed prices were reviewed on ${PRICE_LAST_UPDATED}. Models labelled Coming Soon or Expected do not have officially confirmed pricing yet.`,
  },
];

export default function NewBikes2026Page() {
  const launches = launchesFor(2026, 'bike');
  const confirmed = launches.filter((f) => f.priceMin > 0);
  const upcoming = launches.filter((f) => f.priceMin === 0);
  const electric = launches.filter((f) => f.powertrains.includes('EV'));

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd
        schema={itemListSchema(
          'New bikes in Pakistan 2026',
          launches.map((f) => ({ name: `${f.brand} ${f.name}`, path: f.url }))
        )}
      />
      <SchemaJsonLd schema={faqSchema(FAQS)} />

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Bikes', path: '/bikes' }, { name: 'New Bikes 2026', path: '/new-bikes-2026' }]} dark />
          <h1 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            New Bikes in Pakistan 2026
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {launches.length} motorcycles and scooties are new, confirmed or expected for 2026 —
            including {electric.length} electric models as Pakistan&apos;s two-wheeler market shifts toward EVs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <LaunchDisclaimer />

        <section aria-labelledby="onsale-h">
          <h2 id="onsale-h" className="text-2xl font-black tracking-tight text-slate-900">
            2026 Bikes On Sale in Pakistan
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 mb-5">Models with listed retail pricing.</p>
          <LaunchGrid families={confirmed} />
        </section>

        {upcoming.length > 0 && (
          <section aria-labelledby="expected-h">
            <h2 id="expected-h" className="text-2xl font-black tracking-tight text-slate-900">
              Expected &amp; Upcoming 2026 Bikes
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 mb-5">Pricing not yet officially confirmed.</p>
            <LaunchGrid families={upcoming} />
          </section>
        )}

        <section aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-2xl font-black tracking-tight text-slate-900">
            New Bikes 2026 — FAQs
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
            { l: 'All bikes', h: '/bikes' },
            { l: 'New cars 2026', h: '/new-cars-2026' },
            { l: 'Honda bikes', h: '/brands/honda-bikes' },
            { l: 'Yamaha bikes', h: '/brands/yamaha' },
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
