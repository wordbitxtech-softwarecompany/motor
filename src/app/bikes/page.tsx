import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BIKE_BRANDS } from '@/lib/brands-data';
import BikeBrandExplorer from '@/components/BikeBrandExplorer';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { Bike, Zap, ArrowRight, BatteryCharging } from 'lucide-react';
import { HERO, mediaUrl } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Bikes in Pakistan | Prices & Models 2026',
  description:
    'Motorcycle and electric scooty prices in Pakistan — Honda, Yamaha, Suzuki, United, Jolta, Vlektra and Yadea with specs and variants.',
  alternates: { canonical: '/bikes' },
  keywords: [
    'bikes in Pakistan',
    'bike prices in Pakistan 2026',
    'electric scooty Pakistan',
    'electric bike Pakistan price',
    'Honda CD 70 price',
    'Yamaha YBR 125 price',
    'Jolta electric bike',
    'Yadea scooter Pakistan',
    'best electric scooty Pakistan',
  ],
};

export default function BikesPage() {
  const allModels = BIKE_BRANDS.flatMap((b) => b.models);
  const electric = allModels.filter((m) => m.pt === 'EV');

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the price of an electric scooty in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Electric scooties in Pakistan typically start around PKR 189,000 and go up to roughly PKR 330,000 depending on battery capacity and range. Models with 2–3 kWh batteries deliver about 75–120 km per charge.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to charge an electric bike in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 2 kWh electric bike battery costs roughly PKR 110–130 for a full home charge at typical domestic tariffs, giving around 80 km of range — far cheaper than petrol for the same distance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which is the best-selling motorcycle in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Honda CD 70 remains Pakistan’s highest-volume motorcycle, followed by the Honda CG 125 and Yamaha YBR 125 in the higher-displacement commuter segment.',
        },
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd schema={faq} />

      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={mediaUrl(HERO.bikes)}
            alt="Motorcycles and electric scooters in Pakistan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/30 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-slate-800 text-[11px] font-bold uppercase tracking-[0.18em]">
            <Bike className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
            Two Wheelers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl drop-shadow">
            Bikes &amp; Electric Scooties{' '}
            <span className="block text-white">in Pakistan</span>
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            From Pakistan&apos;s best-selling commuters to the new generation of electric bikes and
            scooties — compare {allModels.length} models with PKR prices, battery capacity and range.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-white/80">
            <span className="flex items-center"><Zap className="w-4 h-4 mr-1.5 text-teal-300" aria-hidden="true" /> {electric.length} electric models</span>
            <span className="flex items-center"><Bike className="w-4 h-4 mr-1.5 text-teal-300" aria-hidden="true" /> {BIKE_BRANDS.length} brands</span>
            <span className="flex items-center"><BatteryCharging className="w-4 h-4 mr-1.5 text-teal-300" aria-hidden="true" /> Home charging friendly</span>
          </div>
        </div>
      </section>

      {/* Brand slider + filtered models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <BikeBrandExplorer />
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          {faq.mainEntity.map((q) => (
            <div key={q.name} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900">{q.name}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{q.acceptedAnswer.text}</p>
            </div>
          ))}
          <div className="pt-2">
            <Link href="/brands" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700">
              Browse all bike brands
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
