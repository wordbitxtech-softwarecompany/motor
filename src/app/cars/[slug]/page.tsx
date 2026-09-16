import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getVehicleBySlug, getAllVehicles } from '@/lib/data';
import CarDetailView from './CarDetailView';
import SchemaJsonLd from '@/components/SchemaJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found | MOTOR',
    };
  }

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} for Sale in Lahore | MOTOR`;
  const description = `Certified ${vehicle.year} ${vehicle.make} ${vehicle.model} available at MOTOR Lahore. ${vehicle.engineCapacity}, ${vehicle.transmission}, ${vehicle.mileage} km. 150-point certified inspection & instant biometric transfer.`;

  return {
    title,
    description,
    alternates: { canonical: `/cars/${slug}` },
    openGraph: {
      title,
      description,
      url: `/cars/${slug}`,
      type: 'website',
      images: [
        {
          url: vehicle.mainImage,
          width: 1200,
          height: 630,
          alt: `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale in Pakistan`,
        },
      ],
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const allVehicles = await getAllVehicles();
  const similarVehicles = allVehicles.filter(
    (v) => v.id !== vehicle.id && (v.bodyType === vehicle.bodyType || v.make === vehicle.make)
  );

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    "brand": {
      "@type": "Brand",
      "name": vehicle.make
    },
    "model": vehicle.model,
    "modelDate": vehicle.year.toString(),
    "vehicleIdentificationNumber": `DH-${vehicle.id}882`,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileage,
      "unitCode": "KMT"
    },
    "vehicleTransmission": vehicle.transmission,
    "fuelType": vehicle.fuelType,
    "bodyType": vehicle.bodyType,
    "numberOfDoors": vehicle.doors,
    "seatingCapacity": vehicle.seats,
    "color": vehicle.exteriorColor,
    "image": vehicle.mainImage,
    "description": vehicle.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "PKR",
      "price": vehicle.price,
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "MOTOR Lahore",
        "url": "https://motor.wordbitxtech.com"
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SchemaJsonLd schema={vehicleSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CarDetailView vehicle={vehicle} similarVehicles={similarVehicles} />
      </div>
    </div>
  );
}
