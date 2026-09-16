import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { PRICE_LAST_UPDATED } from '@/lib/catalog';
import { CONTACT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = buildMetadata({
  title: 'Disclaimer',
  description:
    'Important information about the accuracy of vehicle prices, specifications and availability published on MOTOR Pakistan.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Disclaimer', path: '/disclaimer' }]} dark />
          <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight">Disclaimer</h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Please read this before relying on any pricing, specification or availability information on this website.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <h2 className="text-lg font-black text-amber-900">Prices are indicative, not offers</h2>
          <p className="mt-2 text-sm text-amber-900/90 leading-relaxed">
            Vehicle prices published on MOTOR Pakistan are for research and comparison only. They do not constitute
            an offer to sell. Final on-road pricing is set by authorised dealers and varies with duty, freight,
            taxation, registration and city. The current dataset was last reviewed on <strong>{PRICE_LAST_UPDATED}</strong>.
          </p>
        </section>

        {[
          {
            h: 'Information accuracy',
            p: 'We take reasonable care to publish accurate vehicle specifications and pricing sourced from manufacturer and authorised-distributor material. However, information can become outdated between updates, and manufacturers may revise specifications without notice. Always verify details with an authorised dealer before purchasing.',
          },
          {
            h: 'Unreleased vehicles',
            p: 'Models labelled Coming Soon, Expected or Pre-Launch are not yet on sale in Pakistan. Their listed specifications and prices are provisional, are not confirmed by the manufacturer, and may change or be withdrawn before launch.',
          },
          {
            h: 'No dealer inventory guarantee',
            p: 'MOTOR Pakistan is an automotive information platform. Unless a page explicitly states that a specific unit is in stock, listings should not be read as a guarantee of physical availability, allocation or delivery timeline.',
          },
          {
            h: 'Fuel economy and range figures',
            p: 'Quoted fuel-average, battery-capacity and electric-range figures are manufacturer-rated. Real-world results in Pakistan vary significantly with traffic conditions, air-conditioning use, load, tyre pressure, terrain and driving style.',
          },
          {
            h: 'Third-party trademarks',
            p: 'Vehicle brand names, model names and logos are the trademarks of their respective owners and are used here for identification and editorial reference only. Their use does not imply affiliation with, or endorsement by, those manufacturers.',
          },
          {
            h: 'External links',
            p: 'Where we link to third-party websites, we are not responsible for their content, accuracy, availability or privacy practices.',
          },
          {
            h: 'Limitation of liability',
            p: 'To the extent permitted by law, MOTOR Pakistan accepts no liability for any loss arising from reliance on information published on this website. Purchase decisions remain the responsibility of the buyer.',
          },
          {
            h: 'Report an inaccuracy',
            p: `If you believe any price, specification or availability status on this site is incorrect, email ${CONTACT_EMAIL} with the page URL. Verified corrections are applied promptly and the page review date is updated.`,
          },
        ].map((s) => (
          <section key={s.h} className="rounded-2xl bg-white border border-slate-200 p-6">
            <h2 className="text-base font-black text-slate-900">{s.h}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.p}</p>
          </section>
        ))}

        <nav aria-label="Related" className="flex flex-wrap gap-2">
          {[
            { l: 'Editorial Policy', h: '/editorial-policy' },
            { l: 'Privacy Policy', h: '/privacy' },
            { l: 'Terms', h: '/terms' },
            { l: 'Contact', h: '/contact' },
          ].map((x) => (
            <Link key={x.h} href={x.h} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-900 transition-colors">
              {x.l}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
