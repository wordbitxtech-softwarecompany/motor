import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from './site';

import { HERO } from './media';

export const DEFAULT_OG_IMAGE = HERO.showroom;

interface SeoInput {
  title: string;
  description: string;
  path: string;               // e.g. '/cars/toyota/corolla'
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/** Single source of truth for page metadata (canonical + OG + Twitter). */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  noindex = false,
  publishedTime,
  modifiedTime,
}: SeoInput): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path === '/' ? '/' : path },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'en_PK',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/* ── Schema helpers ──────────────────────────────────── */

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: HERO.showroom },
    description:
      'MOTOR Pakistan is an automotive platform covering cars, bikes, SUVs, EVs and hybrid vehicles with prices, specifications, brands, models and comparisons.',
    areaServed: { '@type': 'Country', name: 'Pakistan' },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'en-PK',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.path === '/' ? SITE_URL : `${SITE_URL}${it.path}`,
    })),
  };
}

export function itemListSchema(name: string, urls: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: urls.length,
    itemListElement: urls.slice(0, 50).map((u, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: u.name,
      url: `${SITE_URL}${u.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * Vehicle schema. Only emits `offers` when a verified price is displayed
 * on the page — never invents price/availability.
 */
export function vehicleSchema(opts: {
  name: string;
  description: string;
  brand: string;
  image: string;
  path: string;
  bodyType?: string;
  fuelType?: string;
  modelYear?: number;
  price?: number;          // 0/undefined => no offers block
  priceValidUntil?: string;
}) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.price && opts.price > 0 ? ['Product', 'Car'] : 'Car',
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    image: opts.image.startsWith('http') ? opts.image : `${SITE_URL}${opts.image}`,
    brand: { '@type': 'Brand', name: opts.brand },
  };

  if (opts.bodyType) base.bodyType = opts.bodyType;
  if (opts.fuelType) base.fuelType = opts.fuelType;
  if (opts.modelYear) base.modelDate = String(opts.modelYear);

  if (opts.price && opts.price > 0) {
    base.offers = {
      '@type': 'Offer',
      url: `${SITE_URL}${opts.path}`,
      priceCurrency: 'PKR',
      price: opts.price,
      availability: 'https://schema.org/InStock',
      ...(opts.priceValidUntil ? { priceValidUntil: opts.priceValidUntil } : {}),
    };
  }

  return base;
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  image: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    image: opts.image.startsWith('http') ? opts.image : `${SITE_URL}${opts.image}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${opts.path}` },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    author: { '@type': 'Person', name: opts.authorName },
    publisher: { '@id': ORG_ID },
  };
}
