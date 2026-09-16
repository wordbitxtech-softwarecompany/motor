import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ModelPageView from '@/components/ModelPageView';
import { CAR_FAMILIES, getFamily } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { formatPKR } from '@/lib/utils';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAR_FAMILIES.map((f) => ({ slug: f.brandSlug, model: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; model: string }>;
}): Promise<Metadata> {
  const { slug, model } = await params;
  const f = getFamily('car', slug, model);
  if (!f) return { title: 'Model not found' };

  const full = `${f.brand} ${f.name}`;
  const priceBit =
    f.priceMin > 0
      ? `Price from ${formatPKR(f.priceMin)}.`
      : 'Pakistan pricing not yet officially announced.';

  return buildMetadata({
    title: `${full} Price in Pakistan ${f.year}`,
    description: `${full} ${f.year} in Pakistan. ${priceBit} ${f.variants.length} variant${f.variants.length === 1 ? '' : 's'}, ${f.powertrains.join('/')} specs, pros, cons and similar cars.`,
    path: f.url,
    image: f.image,
    keywords: [
      `${full} price in Pakistan`,
      `${full} ${f.year}`,
      `${full} specifications`,
      `${full} variants`,
      `${f.brand} cars in Pakistan`,
      `${f.name} price`,
    ],
  });
}

export default async function CarModelPage({
  params,
}: {
  params: Promise<{ slug: string; model: string }>;
}) {
  const { slug, model } = await params;
  const family = getFamily('car', slug, model);
  if (!family) notFound();
  return <ModelPageView family={family} />;
}
