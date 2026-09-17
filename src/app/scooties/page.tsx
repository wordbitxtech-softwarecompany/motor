import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BIKE_BRANDS } from '@/lib/brands-data';
import ModelCard from '@/components/ModelCard';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { Zap, ArrowRight, BatteryCharging } from 'lucide-react';
import { HERO, mediaUrl } from '@/lib/media';
import { photoForModel, isStudioPhoto } from '@/lib/vehicle-photos';

export const metadata: Metadata = {
  title: 'Scooties in Pakistan | Electric & Petrol Prices 2026',
  description:
    'Electric and petrol scooties in Pakistan — Evee, Yadea, United, Vlektra, Jolta, Road Prince Wego and Honda PCX with PKR prices and photos.',
  alternates: { canonical: '/scooties' },
  keywords: [
    'scooty Pakistan',
    'electric scooty Pakistan',
    'Evee scooty price',
    'Yadea scooty Pakistan',
    'United US-1',
    'Vlektra Retro',
    'Road Prince Wego',
    'best electric scooty Pakistan 2026',
  ],
};

export default async function ScootiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const q = (params.q || '').trim().toLowerCase();

  const scooties = BIKE_BRANDS.flatMap((b) =>
    b.models
      .filter((m) => m.body === 'Scooter')
      .map((m) => ({ ...m, brand: b.name, brandSlug: b.slug }))
      .filter((m) => !isStudioPhoto(photoForModel(m.brand, m.name, m.body, m.pt)))
  );

  const shown = q
    ? scooties.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.brand.toLowerCase().includes(q) ||
          `${m.brand} ${m.name}`.toLowerCase().includes(q)
      )
    : scooties;

  const electric = scooties.filter((m) => m.pt === 'EV');

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which electric scooties are popular in Pakistan right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evee Gen-Z and S1, Yadea M3 / C1S / G5, United US-1, Vlektra Retro and Jolta Scooty E are among the most commonly sold electric scooties in Pakistani cities.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the price of an Evee scooty in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Evee Gen-Z is listed around PKR 177,900 and Evee S1 around PKR 206,000, depending on battery pack and city dealer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are petrol scooties still available in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Road Prince Wego 150, United Scooty 100 and Honda PCX 160 remain popular petrol automatic options alongside the newer electric range.',
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
            alt="Electric and petrol scooties in Pakistan"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-slate-950/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-slate-800 text-[11px] font-bold uppercase tracking-[0.18em]">
            Scooties
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-3xl drop-shadow">
            Scooties in Pakistan
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
            Evee, Yadea, United, Vlektra, Jolta and petrol classics like Wego and Scooty 100 —
            {shown.length} models with real photos and PKR prices.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-white/80">
            <span className="flex items-center">
              <Zap className="w-4 h-4 mr-1.5 text-teal-300" aria-hidden="true" />
              {electric.length} electric scooties
            </span>
            <span className="flex items-center">
              <BatteryCharging className="w-4 h-4 mr-1.5 text-teal-300" aria-hidden="true" />
              Home charging friendly
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
          <h2 className="text-xl font-black tracking-tight text-slate-900">
            {q ? `Results for “${params.q}”` : 'Popular scooties on Pakistani roads'}
          </h2>
          <span className="text-xs font-semibold text-slate-500">{shown.length} models</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {shown.map((m, i) => (
            <ModelCard
              key={`${m.brandSlug}-${m.name}`}
              model={m}
              brandName={m.brand}
              brandSlug={m.brandSlug}
              index={i}
            />
          ))}
        </div>

        {!shown.length && (
          <p className="text-sm text-slate-500">No scooty matched that search. Try Evee, Yadea or Wego.</p>
        )}
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-5">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Frequently Asked Questions</h2>
          {faq.mainEntity.map((item) => (
            <div key={item.name} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
          <Link href="/bikes" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700">
            Browse motorcycles too
            <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
