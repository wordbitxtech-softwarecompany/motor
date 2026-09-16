import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { PRICE_LAST_UPDATED } from '@/lib/catalog';
import { CONTACT_EMAIL } from '@/lib/contact';

export const metadata: Metadata = buildMetadata({
  title: 'Editorial Policy',
  description:
    'How MOTOR Pakistan researches vehicle specifications, handles pricing, labels estimates, updates data and processes correction requests.',
  path: '/editorial-policy',
});

const SECTIONS = [
  {
    h: 'How we research vehicle information',
    p: [
      'Vehicle specifications, variant names and body styles are compiled from manufacturer and authorised-distributor material for the Pakistani market, official launch announcements, and publicly available product documentation.',
      'We do not republish text, images or listings from other automotive websites. Competitor sites may be reviewed to understand which models and categories Pakistani buyers search for, but all published content on this site is written independently.',
    ],
  },
  {
    h: 'How we handle prices',
    p: [
      'Prices are shown in Pakistani Rupees (PKR) and always carry a label describing what the figure represents — for example Ex-Factory, Starting Price, Price Range or Estimated Price.',
      'Where a manufacturer has not announced an official Pakistani price, we display "Price not announced" or "Not officially confirmed" rather than publishing an invented figure.',
      `Every price on this site carries a review date. The current dataset was last reviewed on ${PRICE_LAST_UPDATED}.`,
    ],
  },
  {
    h: 'Prices change — and this matters',
    p: [
      'Vehicle pricing in Pakistan is affected by import duty, freight costs, exchange-rate movement, taxation changes and dealer allocation. A price that was accurate at the time of publication can change without notice.',
      'Always confirm the final on-road figure with an authorised dealer before making a purchase decision. Prices on this site are for research and comparison purposes.',
    ],
  },
  {
    h: 'Unreleased and expected models',
    p: [
      'Models that have not launched in Pakistan are clearly labelled as Coming Soon, Expected or Pre-Launch. Their specifications and prices are provisional and may change at launch.',
      'We do not describe a vehicle as launched or available until it is genuinely on sale through an authorised channel in Pakistan.',
    ],
  },
  {
    h: 'What we do not publish',
    p: [
      'We do not publish fabricated dealer inventory, invented stock levels, fake customer reviews, fake star ratings or unverifiable "verified" badges.',
      'Where information is genuinely unavailable, the page will say so rather than filling the gap with a placeholder value.',
    ],
  },
  {
    h: 'Corrections and updates',
    p: [
      'Vehicle data is reviewed on an ongoing basis, and pages are updated when a manufacturer changes pricing, adds a variant or launches a new model.',
      `If you spot an inaccuracy — a wrong price, an incorrect specification or an outdated variant — please report it to ${CONTACT_EMAIL} and include the page URL. Verified corrections are applied and the review date is updated.`,
    ],
  },
  {
    h: 'Independence',
    p: [
      'Editorial content is produced independently of any commercial arrangement. Where a page contains sponsored or promotional material, it will be identified as such.',
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Editorial Policy', path: '/editorial-policy' }]} dark />
          <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight">Editorial Policy</h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
            How MOTOR Pakistan researches vehicle information, presents pricing, labels estimates and handles corrections.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.h} className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7">
            <h2 className="text-lg font-black text-slate-900">{s.h}</h2>
            <div className="mt-3 space-y-3">
              {s.p.map((para, i) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">{para}</p>
              ))}
            </div>
          </section>
        ))}

        <nav aria-label="Related" className="flex flex-wrap gap-2">
          {[
            { l: 'Disclaimer', h: '/disclaimer' },
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
