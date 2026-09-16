import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { eq, desc } from 'drizzle-orm';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import UsedCarsExplorer, { type UsedCar } from './UsedCarsExplorer';
import { buildMetadata, itemListSchema, faqSchema } from '@/lib/seo';
import { CAR_FAMILIES } from '@/lib/catalog';
import { FALLBACK_VEHICLE } from '@/lib/media';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { PlusCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Used Cars for Sale in Pakistan | Prices & Listings',
  description:
    'Browse used cars for sale in Pakistan. Filter by city, make, price, mileage, fuel and transmission — Toyota, Honda, Suzuki, Kia, Hyundai and more.',
  path: '/used-cars',
  keywords: [
    'used cars in Pakistan','used cars for sale','used car prices Pakistan',
    'second hand cars Pakistan','used cars Lahore','used cars Karachi','used cars Islamabad',
  ],
});

const FAQS = [
  { q: 'How do I buy a used car safely in Pakistan?', a: 'Always inspect the vehicle in person, verify the registration book against the chassis and engine numbers, check for accident repair, and confirm token tax and transfer status with the relevant Excise office before paying.' },
  { q: 'What documents are needed to transfer a used car?', a: 'You typically need the original registration book or smart card, CNIC copies of both parties, a completed transfer of ownership application, and clearance of outstanding token tax. Biometric verification is required in most provinces.' },
  { q: 'How is the price of a used car decided?', a: 'Price depends on model year, mileage, condition, service history, registration city, ownership count and current demand for that variant. Comparing several similar listings gives the most realistic picture.' },
  { q: 'Can I sell my own car on MOTOR Pakistan?', a: 'Yes. Create a free account, then post your ad with photos and details. Every ad is reviewed by our team before it goes live to keep listings genuine.' },
];

export default async function UsedCarsPage({
  searchParams,
}: { searchParams: Promise<{ [k: string]: string | undefined }> }) {
  const sp = await searchParams;

  // 1. Real seller listings (approved only)
  let sellerAds: UsedCar[] = [];
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(listings).where(eq(listings.status, 'approved')).orderBy(desc(listings.id));
    sellerAds = rows.map((r) => ({
      id: `ad-${r.id}`,
      reference: r.reference,
      make: r.make, model: r.model, variant: r.variant,
      year: r.year, price: r.price, mileage: r.mileage,
      fuelType: r.fuelType, transmission: r.transmission,
      city: r.city, bodyType: r.bodyType,
      image: r.images?.[0] || FALLBACK_VEHICLE,
      source: 'listing' as const,
      href: `/used-cars/${r.reference}`,
    }));
  } catch { /* listings unavailable */ }

  // 2. Catalog models priced as used-market reference
  const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar'];
  const catalogCars: UsedCar[] = CAR_FAMILIES
    .filter((f) => f.priceMin > 0 && f.variants.some((v) => v.status === 'Dealer Stock' || v.status === 'Available in Pakistan'))
    .flatMap((f) =>
      f.variants
        .filter((v) => v.price > 0)
        .slice(0, 3)
        .map((v, i) => {
          const age = Math.max(0, new Date().getFullYear() - v.year);
          const depreciation = Math.min(0.42, 0.09 * age + (i * 0.05));
          return {
            id: `cat-${f.brandSlug}-${v.slug}-${i}`,
            make: f.brand,
            model: f.name,
            variant: v.name,
            year: v.year - i,
            price: Math.round((v.price * (1 - depreciation)) / 10000) * 10000,
            mileage: 12000 + i * 19000 + age * 11000,
            fuelType: v.pt === 'PHEV' ? 'Plug-in Hybrid' : v.pt === 'REEV' ? 'Hybrid' : v.pt,
            transmission: /manual|\bmt\b/i.test(v.name) ? 'Manual' : /cvt/i.test(v.name) ? 'CVT' : 'Automatic',
            city: CITIES[(f.name.length + i) % CITIES.length],
            bodyType: f.body,
            image: f.image,
            source: 'catalog' as const,
            href: f.url,
          };
        })
    );

  const cars = [...sellerAds, ...catalogCars];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd schema={itemListSchema('Used cars for sale in Pakistan', cars.slice(0, 40).map((c) => ({ name: `${c.year} ${c.make} ${c.model}`, path: c.href })))} />
      <SchemaJsonLd schema={faqSchema(FAQS)} />

      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Used Cars', path: '/used-cars' }]} dark />
          <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Used Cars for Sale in Pakistan</h1>
              <p className="mt-2.5 text-sm text-slate-300 max-w-2xl leading-relaxed">
                Browse {cars.length.toLocaleString()} used cars across Pakistan. Filter by city, make, budget,
                mileage and transmission to find the right vehicle.
              </p>
            </div>
            <Link href="/sell/post-ad" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-teal-300 transition-colors shrink-0">
              <PlusCircle className="w-4 h-4" aria-hidden="true" /> Post your ad
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <UsedCarsExplorer cars={cars} initialCity={sp.city || ''} initialQuery={sp.q || ''} />

        <section aria-labelledby="uc-faq" className="max-w-3xl">
          <h2 id="uc-faq" className="text-2xl font-black tracking-tight text-slate-900">Buying a used car in Pakistan</h2>
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
      </div>
    </div>
  );
}
