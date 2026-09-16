import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ModelPageView from '@/components/ModelPageView';
import { BIKE_FAMILIES, getFamily } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { formatPKR } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return BIKE_FAMILIES.map((f) => ({ brand: f.brandSlug, model: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { brand, model } = await params;
  const f = getFamily('bike', brand, model);
  if (!f) return { title: 'Model not found' };

  const full = `${f.brand} ${f.name}`;
  const priceBit =
    f.priceMin > 0 ? `Price from ${formatPKR(f.priceMin)}.` : 'Pakistan pricing not yet announced.';

  return buildMetadata({
    title: `${full} Price in Pakistan ${f.year}`,
    description: `${full} ${f.year} in Pakistan. ${priceBit} ${f.variants.length} variant${f.variants.length === 1 ? '' : 's'}, engine and ${f.powertrains.join('/')} details, pros and cons.`,
    path: f.url,
    image: f.image,
    keywords: [
      `${full} price in Pakistan`,
      `${full} ${f.year}`,
      `${full} specifications`,
      `${f.brand} bikes in Pakistan`,
      `${f.name} price`,
      'bike prices in Pakistan',
    ],
  });
}

export default async function BikeModelPage({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand, model } = await params;
  const family = getFamily('bike', brand, model);
  if (!family) notFound();
  return <ModelPageView family={family} />;
}
