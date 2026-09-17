import React from 'react';
import Link from 'next/link';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  GitCompareArrows,
  MapPin,
  MessageSquare,
  Newspaper,
  KeyRound,
  Zap,
  TrendingUp
} from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import CategoryStrip from '@/components/CategoryStrip';
import SellCarSection from '@/components/SellCarSection';
import RecentSellerAds from '@/components/RecentSellerAds';
import LatestCarsSection from '@/components/LatestCarsSection';
import NewEnergyVehicleHub from '@/components/NewEnergyVehicleHub';
import VehicleCard from '@/components/VehicleCard';
import BrandGrid from '@/components/BrandGrid';
import ModelCard from '@/components/ModelCard';
import NewLaunchesStrip from '@/components/NewLaunchesStrip';
import { getAllVehicles, getRentalVehicles } from '@/lib/data';
import { getApprovedListings } from '@/lib/listings';
import { BLOG_POSTS } from '@/lib/blog-data';
import { BIKE_BRANDS, ALL_BRANDS, totalModelCount, BRANDS } from '@/lib/brands-data';
import { launchesFor, CATALOG_STATS, familiesForBrand } from '@/lib/catalog';
import LaunchGrid from '@/components/LaunchGrid';
import type { Metadata } from 'next';
import { buildMetadata, faqSchema } from '@/lib/seo';
import SchemaJsonLd from '@/components/SchemaJsonLd';
import { SCENE, mediaUrl } from '@/lib/media';
import { formatPKR } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'MOTOR Pakistan | Cars, Bikes, Prices, EVs & Hybrids 2026',
  description:
    'Explore cars, bikes, SUVs, EVs and hybrid vehicles in Pakistan. Check latest prices, specifications, brands, models, comparisons and new 2026 launches on MOTOR.',
  path: '/',
});

const HOME_FAQS = [
  {
    q: 'Which are the most popular cars in Pakistan?',
    a: 'The Toyota Corolla, Toyota Yaris, Honda Civic, Honda City, Suzuki Alto, Suzuki Cultus and Kia Sportage remain the highest-demand models in Pakistan, covering the entry hatchback, family sedan and compact SUV segments.',
  },
  {
    q: 'What is the price of a Toyota Corolla in Pakistan?',
    a: 'Toyota Corolla pricing depends on the variant — the range spans the GLi 1.3 through to the Altis Grande X 1.8. Current variant-by-variant pricing is listed on the Toyota Corolla model page along with the review date.',
  },
  {
    q: 'Which electric cars are available in Pakistan?',
    a: 'Battery-electric (BEV) options listed include the Changan Lumin, MG ZS EV, BYD Atto 3, ORA 03, OMODA E5, JAECOO J6, JMEV Elight, AION UT/V and ZEEKR X/7X/009, with further 2026 models such as XPENG L03 and Hyptec HT expected. Availability varies by city and dealer allocation.',
  },
  {
    q: 'What is the difference between a hybrid, PHEV and EV?',
    a: 'A hybrid (HEV) charges its own small battery from the engine and braking and never plugs in. A plug-in hybrid (PHEV) has a larger battery you charge at home for daily electric driving, with a petrol engine for long trips. An EV runs purely on battery power with no petrol engine at all.',
  },
  {
    q: 'What is the price of a Honda CD 70 in Pakistan?',
    a: 'The Honda CD 70 is Pakistan’s highest-volume motorcycle. Current retail pricing for the CD 70 and CD 70 Dream is listed on the Honda CD 70 model page, along with the date the price was last reviewed.',
  },
  {
    q: 'Are the prices on MOTOR Pakistan official?',
    a: 'Every price carries a label — Ex-Factory, Starting Price, Price Range or Estimated Price — plus a review date. Where a manufacturer has not announced an official Pakistani price, we show “Price not announced” rather than an invented figure.',
  },
];

export default async function HomePage() {
  const [allVehicles, rentalCars, recentAds] = await Promise.all([
    getAllVehicles(),
    getRentalVehicles(),
    getApprovedListings(6),
  ]);

  const featuredBikePicks = [
    { brand: 'Honda', name: 'CD 70' },
    { brand: 'Yamaha', name: 'YBR 125' },
    { brand: 'Honda', name: 'CB 150F' },
    { brand: 'Kawasaki', name: 'Ninja 400' },
    { brand: 'Yadea', name: 'Yadea C1S Scooter' },
    { brand: 'Jolta Electric', name: 'JE 70L Electric' },
    { brand: 'Evee', name: 'Evee C1 Scooter' },
    { brand: 'Vespa', name: 'Vespa Primavera 150' },
  ];
  const featuredBikes = featuredBikePicks
    .map((pick) => {
      const brand = BIKE_BRANDS.find((b) => b.name === pick.brand);
      const model = brand?.models.find((m) => m.name === pick.name);
      if (!brand || !model) return null;
      return { ...model, brand: brand.name, brandSlug: brand.slug };
    })
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const launches2026 = launchesFor(2026, 'car').slice(0, 8);
  const toyotaModels = familiesForBrand('toyota').filter((f) => f.priceMin > 0).slice(0, 6);
  const totalBrands = ALL_BRANDS.length;
  const totalModels = totalModelCount();
  const evModels = ALL_BRANDS.flatMap((b) => b.models).filter((m) =>
    ['EV', 'PHEV', 'REEV', 'Hybrid'].includes(m.pt)
  ).length;

  const usedCars = allVehicles.filter((v) => v.condition === 'Certified Pre-Owned');
  const popularCars = allVehicles.filter((v) => v.isFeatured);

  return (
    <div className="flex flex-col min-h-screen">
      <SchemaJsonLd schema={faqSchema(HOME_FAQS)} />
      {/* 01 — Hero: luxury showroom backdrop + unified search with live Urdu */}
      <HeroSection />
      <CategoryStrip />
      <SellCarSection />
      <RecentSellerAds ads={recentAds} />

      {/* 02b — New brand launches strip (priority for 2026 entrants) */}
      <NewLaunchesStrip />

      {/* 02c — 2026 LAUNCHES (high priority) */}
      <section aria-labelledby="launch2026-h" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-[0.18em]">
                2026
              </span>
              <h2 id="launch2026-h" className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-2.5">
                New Vehicles Launched in Pakistan — 2026
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                The newest cars arriving in the Pakistani market this year, across petrol, hybrid,
                plug-in hybrid and fully electric powertrains.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link href="/new-cars-2026" className="inline-flex items-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-700 transition-colors">
                All 2026 cars <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link href="/new-bikes-2026" className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-[13px] font-bold hover:bg-slate-50 transition-colors">
                2026 bikes
              </Link>
            </div>
          </div>

          <LaunchGrid families={launches2026} />
        </div>
      </section>

      {/* 02d — TOYOTA (highest demand brand in Pakistan) */}
      <section aria-labelledby="toyota-h" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-start gap-4">
              <span className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img src="/images/brands/toyota.svg" alt="Toyota logo" className="w-10 h-10 object-contain" width={40} height={40} />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Most Searched Brand</span>
                <h2 id="toyota-h" className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1">
                  Toyota Cars in Pakistan
                </h2>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                  Corolla, Yaris, Corolla Cross, Fortuner, Hilux and more — with current prices,
                  variants and full specifications.
                </p>
              </div>
            </div>
            <Link href="/brands/toyota" className="inline-flex items-center px-4 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-700 transition-colors shrink-0">
              All Toyota models <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {toyotaModels.map((m) => (
              <li key={m.url}>
                <Link href={m.url} className="group block rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all overflow-hidden h-full">
                  <img
                    src={m.image}
                    alt={`Toyota ${m.name} ${m.year} Pakistan`}
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy" width={280} height={175}
                  />
                  <span className="block p-3">
                    <span className="block text-[13px] font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      Toyota {m.name}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      From {formatPKR(m.priceMin)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <nav aria-label="Popular Toyota models" className="mt-6 flex flex-wrap gap-2">
            {[
              ['Toyota Corolla', '/cars/toyota/corolla'],
              ['Toyota Yaris', '/cars/toyota/yaris'],
              ['Toyota Corolla Cross', '/cars/toyota/corolla-cross'],
              ['Toyota Fortuner', '/cars/toyota/fortuner'],
              ['Toyota Hilux', '/cars/toyota/hilux'],
              ['Toyota Land Cruiser', '/cars/toyota/land-cruiser'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors">
                {label} price
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* 03 — Latest Cars in Pakistan */}
      <LatestCarsSection vehicles={allVehicles} />

      {/* 04 — EV & Hybrid */}
      <NewEnergyVehicleHub />

      {/* 05 — Popular Cars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Most Searched</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
              Popular Cars in Pakistan
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              The models Pakistani buyers search for most, with current listed prices and specifications.
            </p>
          </div>
          <Link href="/cars" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors">
            Browse full inventory
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCars.map((car) => (
            <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
          ))}
        </div>
      </section>

      {/* 06 — Used Cars / recent marketplace ads */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
                {recentAds.length ? 'Marketplace' : 'Certified Pre-Owned'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
                {recentAds.length ? 'Used Cars for Sale' : 'Used Cars Across Pakistan'}
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-xl">
                {recentAds.length
                  ? 'Approved seller listings — newest posts appear here first.'
                  : 'Multi-point inspected pre-owned vehicles with documented service history and verified ownership records.'}
              </p>
            </div>
            <Link href="/used-cars" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors">
              View used cars
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {recentAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAds.slice(0, 6).map((ad) => (
                <Link
                  key={ad.reference}
                  href={ad.href}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-slate-400 hover:shadow-md transition-all"
                >
                  <span className="block aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={ad.image}
                      alt={`${ad.year} ${ad.make} ${ad.model}`}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </span>
                  <span className="block p-4">
                    <h3 className="text-[15px] font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                      {ad.year} {ad.make} {ad.model}
                    </h3>
                    <p className="mt-1.5 text-base font-black text-slate-900">{formatPKR(ad.price)}</p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {ad.city} · {ad.mileage.toLocaleString()} km · {ad.fuelType}
                    </p>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {usedCars.slice(0, 3).map((car) => (
                <VehicleCard key={car.id} vehicle={car} viewMode="sale" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 07 — Car Rental */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-bold uppercase tracking-[0.18em]">
                <KeyRound className="w-3.5 h-3.5 mr-1.5" />
                Car Rental
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Rent a Car, Your Way.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Daily, weekly, monthly and corporate rentals in Lahore, Islamabad and Karachi.
                Airport delivery, free cancellation up to 24 hours, and clear pricing.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Daily', 'Weekly', 'Monthly', 'Corporate'].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/rent"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-200 transition-colors shrink-0"
            >
              Browse rental fleet
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalCars.slice(0, 3).map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="rental" />
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Compare Cars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
              <GitCompareArrows className="w-4 h-4 mr-1.5" />
              Side-by-Side
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              Compare Before You Buy.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Put up to three vehicles side by side. Compare price, mileage, engine, powertrain,
              battery and range before you talk to a dealer.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-700 transition-colors"
            >
              Start Comparing
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularCars.slice(0, 4).map((car) => (
              <div key={car.id} className="bg-white rounded-xl p-3 border border-slate-200">
                <img src={car.mainImage} alt={car.model} className="w-full h-20 object-cover rounded-lg mb-2" loading="lazy" />
                <p className="text-xs font-bold text-slate-900 truncate">{car.make} {car.model}</p>
                <p className="text-[11px] text-slate-500">{car.price > 0 ? formatPKR(car.price) : 'Price Coming Soon'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08b — All Brands (logos grid) */}
      <BrandGrid defaultTab="cars" />

      {/* 08c — Bikes & Electric Scooties */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Two Wheelers</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
              Bikes &amp; Electric Scooties
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Pakistan&apos;s best-selling commuters plus the new wave of electric bikes and scooties from
              Jolta, Vlektra, Yadea and Evee.
            </p>
          </div>
          <Link href="/bikes" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors">
            Browse all bikes
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Bike brand chips */}
        <div className="flex gap-3 overflow-x-auto pb-3 mb-6 -mx-1 px-1 snap-x">
          {BIKE_BRANDS.slice(0, 10).map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              className="group snap-start shrink-0 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all duration-300"
            >
              <span className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                <img src={b.logo} alt={`${b.name} logo`} className="w-6 h-6 object-contain" loading="lazy" />
              </span>
              <span className="text-[12px] font-bold text-slate-800 group-hover:text-teal-700 whitespace-nowrap transition-colors">
                {b.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredBikes.map((m, i) => (
            <ModelCard key={`${m.brand}-${m.name}`} model={m} brandName={m.brand} brandSlug={m.brandSlug} index={i} />
          ))}
        </div>
      </section>

      {/* 09 — Sell Your Car */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-bold uppercase tracking-[0.18em]">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                Vehicle Valuation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Thinking About Selling Your Car?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Tell us about your vehicle — make, model, year, mileage and city — and our team will
                get in touch with an evaluation.
              </p>
              <Link
                href="/sell"
                className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-200 transition-colors"
              >
                Request Valuation
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              {['Make & Model', 'Year & Mileage', 'Condition', 'Expected Price', 'City', 'Photos (optional)'].map((f) => (
                <div key={f} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 font-medium">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10 — Pakistan Auto Insider */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
              <Newspaper className="w-4 h-4 mr-1.5" />
              Pakistan Auto Insider
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
              News, Reviews & Buying Guides
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Practical advice on new cars, EV ownership, used car buying and rental tips for Pakistani roads.
            </p>
          </div>
          <Link href="/blog" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-teal-700 transition-colors">
            All articles
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-white text-slate-900 rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">{post.summary}</p>
                <p className="text-[11px] text-slate-400 mt-3">{post.publishDate} • {post.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10b — FAQs */}
      <section aria-labelledby="home-faq-h" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="home-faq-h" className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Common questions about car and bike prices, powertrains and availability in Pakistan.
          </p>

          <div className="mt-7 space-y-3">
            {HOME_FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-slate-50 border border-slate-200 p-5 open:bg-white open:shadow-sm transition-colors">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-slate-900">{f.q}</h3>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg leading-none shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — Browse by City */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">Nationwide Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-1.5">
              Browse by City
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Local inventory, rentals and test drives across Pakistan&apos;s major cities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/cars-in-lahore', city: 'Lahore', note: 'Gulberg, DHA & Johar Town hubs', img: SCENE.lahore },
              { href: '/cars-in-islamabad', city: 'Islamabad', note: 'Blue Area & F-7 hub', img: SCENE.islamabad },
              { href: '/cars-in-karachi', city: 'Karachi', note: 'Clifton & DHA hub', img: SCENE.karachi },
              { href: '/contact', city: 'More Cities', note: 'Rawalpindi, Faisalabad, Multan & more', img: SCENE.usedCars },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all">
                <span className="block aspect-[16/9] overflow-hidden bg-slate-100">
                  <img src={mediaUrl(c.img)} alt={`Cars in ${c.city}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </span>
                <span className="block p-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{c.city}</h3>
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{c.note}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — WordbitX technology section */}
      <section className="py-20 bg-[#0A1B33] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-[0.18em]">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Technology by WordbitX
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Built for Modern Automotive Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            From vehicle inventory and online bookings to customer management and lead generation,
            WordbitX builds complete digital solutions for modern businesses.
          </p>
          <a
            href="https://www.wordbitxtech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0A1B33] font-bold text-sm shadow-lg shadow-emerald-500/20 transition-colors"
          >
            Build Your Automotive Platform
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
