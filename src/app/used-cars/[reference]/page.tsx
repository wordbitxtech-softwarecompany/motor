import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MapPin, Gauge, Fuel, Settings2, Phone, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getListingByReference } from '@/lib/listings';
import { formatPKR, formatNumber } from '@/lib/utils';
import { FALLBACK_VEHICLE } from '@/lib/media';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ reference: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reference } = await params;
  const ad = await getListingByReference(reference);
  if (!ad) return { title: 'Ad not found' };
  return buildMetadata({
    title: `${ad.year} ${ad.make} ${ad.model} for sale in ${ad.city}`,
    description: ad.description?.slice(0, 155) || `${ad.year} ${ad.make} ${ad.model} listed on MOTOR | Pak — ${formatPKR(ad.price)}.`,
    path: `/used-cars/${ad.reference}`,
    noindex: false,
  });
}

export default async function ListingDetailPage({ params }: Props) {
  const { reference } = await params;
  const ad = await getListingByReference(reference);
  if (!ad) notFound();

  const images = ad.images?.length ? ad.images : [FALLBACK_VEHICLE];
  const wa = ad.sellerPhone.replace(/\D/g, '').replace(/^0/, '92');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Used Cars', path: '/used-cars' },
            { name: `${ad.make} ${ad.model}`, path: `/used-cars/${ad.reference}` },
          ]}
        />

        <Link href="/used-cars" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to used cars
        </Link>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-[16/10]">
              <img src={images[0]} alt={`${ad.year} ${ad.make} ${ad.model}`} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <ul className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {images.slice(1, 7).map((src, i) => (
                  <li key={i} className="rounded-lg overflow-hidden border border-slate-200 aspect-[4/3] bg-white">
                    <img src={src} alt={`Photo ${i + 2}`} className="w-full h-full object-cover" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 h-fit">
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Seller ad · {ad.reference}</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              {ad.year} {ad.make} {ad.model}
            </h1>
            {ad.variant && <p className="text-sm text-slate-500 mt-1">{ad.variant}</p>}
            <p className="mt-4 text-2xl font-black text-slate-900">{formatPKR(ad.price)}</p>

            <ul className="mt-5 grid grid-cols-2 gap-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
                <MapPin className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" /> {ad.city}
              </li>
              <li className="flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
                <Gauge className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" /> {formatNumber(ad.mileage)} km
              </li>
              <li className="flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
                <Fuel className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" /> {ad.fuelType}
              </li>
              <li className="flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">
                <Settings2 className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" /> {ad.transmission}
              </li>
            </ul>

            {ad.description && (
              <div className="mt-5">
                <h2 className="text-xs font-black uppercase tracking-wide text-slate-500">Description</h2>
                <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{ad.description}</p>
              </div>
            )}

            {ad.features?.length > 0 && (
              <div className="mt-5">
                <h2 className="text-xs font-black uppercase tracking-wide text-slate-500">Features</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ad.features.map((f) => (
                    <span key={f} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs text-slate-500">Listed by <strong className="text-slate-800">{ad.sellerName}</strong></p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${ad.sellerPhone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call seller
                </a>
                <a
                  href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hi, I saw your ${ad.year} ${ad.make} ${ad.model} (${ad.reference}) on MOTOR | Pak.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
