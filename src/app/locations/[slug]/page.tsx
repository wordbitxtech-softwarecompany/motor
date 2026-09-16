import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCATIONS_DATA } from '@/lib/locations-data';
import { getAllVehicles, getRentalVehicles } from '@/lib/data';
import VehicleCard from '@/components/VehicleCard';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Car,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

export async function generateStaticParams() {
  return [
    { slug: 'lahore' },
    { slug: 'gulberg' },
    { slug: 'dha-lahore' },
    { slug: 'johar-town' },
    { slug: 'islamabad' },
    { slug: 'karachi' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS_DATA[slug];

  if (!loc) {
    return { title: 'Location Not Found | MOTOR' };
  }

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `/locations/${slug}`,
      type: 'website',
      images: [{ url: loc.heroImage, width: 1200, height: 630, alt: `${loc.name} — MOTOR Pakistan` }],
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = LOCATIONS_DATA[slug];

  if (!loc) {
    notFound();
  }

  const allVehicles = await getAllVehicles();
  const rentalVehicles = await getRentalVehicles();

  // Match vehicles for this location
  const localCars = allVehicles.filter(
    (v) => slug === 'lahore' || v.location.toLowerCase().includes(slug.replace('-', ' '))
  );

  const localRentals = rentalVehicles.filter(
    (v) => slug === 'lahore' || v.location.toLowerCase().includes(slug.replace('-', ' '))
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": `MOTOR - ${loc.name}`,
    "image": loc.heroImage,
    "telephone": loc.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": loc.address,
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": loc.coords.lat,
      "longitude": loc.coords.lng
    },
    "openingHours": loc.hours,
    "url": `https://motor.wordbitxtech.com/locations/${loc.slug}`,
    "priceRange": "$$",
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-16">
      <SchemaJsonLd schema={localBusinessSchema} />

      {/* 1. LOCAL HERO */}
      <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={loc.heroImage}
            alt={`${loc.name} car dealership Lahore`}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>{loc.name}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {loc.headline}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {loc.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/cars"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center space-x-2"
              >
                <Car className="w-4 h-4" />
                <span>View Inventory</span>
              </Link>
              <Link
                href="/rent"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm border border-white/20 transition flex items-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Rent a Car</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOCAL INTRODUCTION & BRANCH INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Detailed text */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              About MOTOR in {loc.name}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {loc.localIntro}
            </p>

            <div className="p-5 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                Specialty Fleet & Inventory Focus
              </h3>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {loc.specialtyInventory}
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Rental Operations & Logistics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {loc.rentalHighlights}
              </p>
            </div>

            {/* Showroom perks */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Facility Amenities & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {loc.showroomPerks.map((perk, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick info card */}
          <div className="lg:col-span-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-28">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Showroom Contact Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium">Physical Address:</p>
                  <p className="text-white font-semibold mt-0.5">{loc.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium">Operating Hours:</p>
                  <p className="text-white font-semibold mt-0.5">{loc.hours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 font-medium">Direct Line:</p>
                  <p className="text-white font-semibold mt-0.5">{loc.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <a
                href={`/contact?text=${encodeURIComponent(
                  `Hello MOTOR ${loc.name}, I would like to visit the showroom or inquire about vehicles.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Branch WhatsApp</span>
              </a>

              <Link
                href="/test-drive"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2"
              >
                <Clock className="w-4 h-4" />
                <span>Book Test Drive Here</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARS AT THIS HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Vehicles Available in {loc.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Physical inventory on display and available for immediate test drives.
            </p>
          </div>
          <Link href="/cars" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">
            View all inventory →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(localCars.length > 0 ? localCars : allVehicles).slice(0, 3).map((car) => (
            <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
          ))}
        </div>
      </section>

      {/* 4. NEARBY DISTRICTS SERVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Key Localities & Communities Served Around {loc.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {loc.nearbyAreas.map((area, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCAL TESTIMONIAL & FAQS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FAQs */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>Frequently Asked Questions - {loc.name}</span>
          </h2>

          <div className="space-y-4">
            {loc.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">{faq.question}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Testimonial */}
        <div className="lg:col-span-4 bg-indigo-900 text-white rounded-3xl p-8 shadow-md space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Local Customer Feedback
          </span>
          <p className="text-xs italic text-indigo-100 leading-relaxed">
            "{loc.localReview.text}"
          </p>
          <div className="pt-2 border-t border-indigo-800 text-xs">
            <p className="font-bold text-white">{loc.localReview.customer}</p>
            <p className="text-[11px] text-indigo-300">
              {loc.localReview.vehicle} • {loc.localReview.location}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
