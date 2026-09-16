import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVehicleBySlug } from '@/lib/data';
import RentalDetailView from './RentalDetailView';
import SchemaJsonLd from '@/components/SchemaJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle || !vehicle.isRental) {
    return {
      title: 'Rental Vehicle Not Found | MOTOR',
    };
  }

  const title = `Rent ${vehicle.year} ${vehicle.make} ${vehicle.model} in Lahore | Daily & Monthly Car Rental`;
  const description = `Rent the ${vehicle.year} ${vehicle.make} ${vehicle.model} in Lahore. Daily rate from Rs ${vehicle.rentalDailyRate?.toLocaleString()} / day. Chauffeur or self-drive in Gulberg, DHA Lahore & Allama Iqbal Airport.`;

  return {
    title,
    description,
    alternates: { canonical: `/rent/${slug}` },
    openGraph: {
      title,
      description,
      url: `/rent/${slug}`,
      type: 'website',
      images: [{ url: vehicle.mainImage, width: 1200, height: 630, alt: `Rent ${vehicle.make} ${vehicle.model} in Pakistan` }],
    },
  };
}

export default async function RentalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle || !vehicle.isRental) {
    notFound();
  }

  const rentalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${vehicle.year} ${vehicle.make} ${vehicle.model} Car Rental Lahore`,
    "image": vehicle.mainImage,
    "description": `Premium car rental service for ${vehicle.year} ${vehicle.make} ${vehicle.model} in Lahore, Pakistan.`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PKR",
      "price": vehicle.rentalDailyRate || 12000,
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "MOTOR Lahore"
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SchemaJsonLd schema={rentalServiceSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RentalDetailView vehicle={vehicle} />
      </div>
    </div>
  );
}
