import React from 'react';
import Link from 'next/link';
import {
  Gauge, Fuel, Zap, BatteryCharging, Users, Settings2, CheckCircle2,
  AlertCircle, ArrowRight, MessageSquare, CalendarDays, Info,
} from 'lucide-react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import SchemaJsonLd from './SchemaJsonLd';
import { formatPKR } from '@/lib/utils';
import { vehicleSchema, faqSchema } from '@/lib/seo';
import { relatedFamilies, PRICE_LAST_UPDATED, type ModelFamily } from '@/lib/catalog';
import { BLOG_POSTS } from '@/lib/blog-data';

/* ── Content generators (data-driven, never invented) ── */

function priceLine(f: ModelFamily): string {
  if (f.priceType === 'upcoming') return 'Price not officially announced';
  if (f.priceMin === 0) return 'Price on request';
  if (f.priceMin === f.priceMax) return formatPKR(f.priceMin);
  return `${formatPKR(f.priceMin)} – ${formatPKR(f.priceMax)}`;
}

function priceLabel(f: ModelFamily): string {
  if (f.priceType === 'upcoming') return 'Expected — not confirmed';
  if (f.priceMin === 0) return 'Contact for price';
  if (f.priceMin === f.priceMax) return 'Starting price';
  return 'Price range (all variants)';
}

function buildPros(f: ModelFamily): string[] {
  const out: string[] = [];
  const pts = f.powertrains;
  if (pts.includes('EV')) out.push('Zero fuel cost — charges at home on a standard socket');
  if (pts.includes('Hybrid')) out.push('Strong real-world fuel economy in city traffic');
  if (pts.includes('PHEV')) out.push('Runs on electricity daily, petrol for long trips');
  if (pts.includes('REEV')) out.push('Electric drive with no charging-station dependency');
  if (f.variants.length > 2) out.push(`${f.variants.length} variants — wide choice of trim and budget`);
  if (f.body === 'SUV' || f.body === 'Crossover') out.push('High ground clearance suits Pakistani road conditions');
  if (f.body === 'Hatchback') out.push('Compact footprint — easy city parking and manoeuvring');
  if (f.body === 'Pickup') out.push('Payload capacity for commercial and off-road use');
  if (f.body === 'Motorcycle') out.push('Low running cost and widely available spare parts');
  if (f.body === 'Scooter') out.push('Step-through design — easy for daily short commutes');
  if (f.priceMin > 0 && f.priceMin < 4000000) out.push('Positioned in an accessible price bracket');
  if (f.range) out.push(`Rated range: ${f.range}`);
  return out.slice(0, 5);
}

function buildCons(f: ModelFamily): string[] {
  const out: string[] = [];
  const pts = f.powertrains;
  if (pts.includes('EV')) out.push('Public fast-charging network is still limited outside major cities');
  if (pts.includes('PHEV') || pts.includes('REEV')) out.push('Higher purchase price than an equivalent petrol variant');
  if (['Coming Soon', 'Expected', 'Pre-Launch'].includes(f.status))
    out.push('Not yet on sale — final specification and price may change');
  if (f.status === 'Imported') out.push('Imported unit — parts and service availability vary by city');
  if (f.priceMin > 15000000) out.push('Premium pricing places it above the mainstream segment');
  if (f.body === 'Pickup' || f.body === 'SUV') out.push('Larger footprint is harder to park in dense urban areas');
  if (out.length === 0) out.push('Availability and delivery timelines vary by dealer and city');
  return out.slice(0, 4);
}

function buildFaqs(f: ModelFamily) {
  const full = `${f.brand} ${f.name}`;
  const faqs: { q: string; a: string }[] = [];

  faqs.push({
    q: `What is the price of ${full} in Pakistan?`,
    a: f.priceMin > 0
      ? `The ${full} ${f.priceMin === f.priceMax ? `is listed at ${formatPKR(f.priceMin)}` : `ranges from ${formatPKR(f.priceMin)} to ${formatPKR(f.priceMax)} across ${f.variants.length} variants`}. Prices were last reviewed on ${PRICE_LAST_UPDATED} and can change with duty, freight and dealer allocation.`
      : `An official Pakistan price for the ${full} has not been announced yet. It is currently listed as "${f.status}". Contact our team for the latest confirmed pricing.`,
  });

  faqs.push({
    q: `How many variants of ${full} are available?`,
    a: `We list ${f.variants.length} ${f.variants.length === 1 ? 'variant' : 'variants'} of the ${full}: ${f.variants.map((v) => v.name).join(', ')}.`,
  });

  faqs.push({
    q: `Is the ${full} petrol, hybrid or electric?`,
    a: `The ${full} is offered as ${f.powertrains.join(' / ')}${f.battery ? `, with a ${f.battery} battery pack` : ''}${f.range ? ` and a rated range of ${f.range}` : ''}.`,
  });

  if (f.body) {
    faqs.push({
      q: `What body type is the ${full}?`,
      a: `The ${full} is a ${f.body.toLowerCase()}${f.year ? `, latest model year listed is ${f.year}` : ''}. Its current market status is "${f.status}".`,
    });
  }

  return faqs;
}

/* ── Component ───────────────────────────────────────── */

export default function ModelPageView({ family }: { family: ModelFamily }) {
  const f = family;
  const isBike = f.kind === 'bike';
  const full = `${f.brand} ${f.name}`;
  const sectionRoot = isBike ? '/bikes' : '/cars';

  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: isBike ? 'Bikes' : 'Cars', path: sectionRoot },
    { name: f.brand, path: `/brands/${f.brandSlug}` },
    { name: f.name, path: f.url },
  ];

  const pros = buildPros(f);
  const cons = buildCons(f);
  const faqs = buildFaqs(f);
  const related = relatedFamilies(f, 4);

  const relatedArticles = BLOG_POSTS.filter((p) => {
    const hay = `${p.title} ${p.summary} ${p.category}`.toLowerCase();
    return hay.includes(f.brand.toLowerCase()) || hay.includes(f.name.toLowerCase()) ||
      (f.powertrains.includes('EV') && hay.includes('electric')) ||
      (f.powertrains.includes('Hybrid') && hay.includes('hybrid'));
  }).slice(0, 3);

  const desc = `${full} ${f.year} in Pakistan — ${f.body.toLowerCase()}, ${f.powertrains.join('/')}, ${f.variants.length} variant${f.variants.length === 1 ? '' : 's'}. ${f.priceMin > 0 ? `Priced from ${formatPKR(f.priceMin)}.` : 'Pricing to be confirmed.'}`;

  return (
    <div className="bg-slate-50 min-h-screen">
      <SchemaJsonLd
        schema={vehicleSchema({
          name: `${full} ${f.year}`,
          description: desc,
          brand: f.brand,
          image: f.image,
          path: f.url,
          bodyType: f.body,
          fuelType: f.powertrains.join(', '),
          modelYear: f.year,
          price: f.priceMin > 0 ? f.priceMin : undefined,
        })}
      />
      <SchemaJsonLd schema={faqSchema(faqs)} />

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={crumbs} dark />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                  <img src={f.brandLogo} alt={`${f.brand} logo`} className="w-7 h-7 object-contain" width={28} height={28} />
                </span>
                <Link href={`/brands/${f.brandSlug}`} className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300 hover:text-teal-200">
                  {f.brand}
                </Link>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.08]">
                {full} Price in Pakistan {f.year}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {full} is a {f.body.toLowerCase()} offered in Pakistan with {f.powertrains.join(' and ').toLowerCase()} {f.powertrains.length > 1 ? 'powertrains' : 'power'}.
                {' '}This page lists current pricing, all {f.variants.length} variant{f.variants.length === 1 ? '' : 's'}, specifications, pros and cons, and similar {isBike ? 'bikes' : 'cars'}.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-bold">{f.body}</span>
                {f.powertrains.map((p) => (
                  <span key={p} className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-[11px] font-bold">{p}</span>
                ))}
                <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-bold">{f.status}</span>
              </div>
            </div>

            {/* Price card */}
            <aside className="lg:col-span-5 w-full">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/[0.04]">
                <img
                  src={f.image}
                  alt={`${full} ${f.year} Pakistan`}
                  className={`w-full aspect-[16/10] ${f.image.endsWith('.svg') ? 'object-contain bg-slate-900' : 'object-cover'}`}
                  width={640} height={400}
                />
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{priceLabel(f)}</p>
                  <p className="text-2xl font-black text-white mt-1">{priceLine(f)}</p>
                  <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                    Last updated: {PRICE_LAST_UPDATED}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link href="/compare" className="text-center py-2.5 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-200 transition-colors">
                      Compare
                    </Link>
                    <a
                      href={`/contact?text=${encodeURIComponent(`Hello MOTOR Pakistan, please share the latest price and availability for the ${full}.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="text-center py-2.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" /> Enquire
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Variants + price table */}
        <section aria-labelledby="variants-h">
          <h2 id="variants-h" className="text-2xl font-black tracking-tight text-slate-900">
            {full} Variants &amp; Prices
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            {f.variants.length} variant{f.variants.length === 1 ? '' : 's'} listed. Prices reviewed {PRICE_LAST_UPDATED}.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{full} variant price and specification list</caption>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-500">
                  <th scope="col" className="px-4 py-3 font-bold">Variant</th>
                  <th scope="col" className="px-4 py-3 font-bold">Fuel</th>
                  <th scope="col" className="px-4 py-3 font-bold">Year</th>
                  <th scope="col" className="px-4 py-3 font-bold">Status</th>
                  <th scope="col" className="px-4 py-3 font-bold text-right">Price (PKR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {f.variants.map((v) => (
                  <tr key={v.slug} className="hover:bg-slate-50/70">
                    <th scope="row" className="px-4 py-3 font-semibold text-slate-900 text-[13px]">{v.name}</th>
                    <td className="px-4 py-3 text-slate-600 text-[13px]">{v.pt}</td>
                    <td className="px-4 py-3 text-slate-600 text-[13px]">{v.year}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-700">{v.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-black text-slate-900 text-[13px]">
                      {v.price > 0 ? formatPKR(v.price) : <span className="font-semibold text-slate-400">Not announced</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {f.priceType === 'upcoming' && (
            <p className="mt-3 flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
              <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              This model is not yet on sale in Pakistan. Specification and pricing are expected and not officially confirmed.
            </p>
          )}
        </section>

        {/* Specifications */}
        <section aria-labelledby="specs-h">
          <h2 id="specs-h" className="text-2xl font-black tracking-tight text-slate-900">
            {full} Specifications
          </h2>
          <dl className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Settings2, k: 'Body type', v: f.body },
              { icon: Fuel, k: 'Powertrain', v: f.powertrains.join(', ') },
              { icon: CalendarDays, k: 'Model year', v: String(f.year) },
              { icon: Users, k: 'Variants', v: `${f.variants.length}` },
              ...(f.battery ? [{ icon: BatteryCharging, k: 'Battery', v: f.battery }] : []),
              ...(f.range ? [{ icon: Zap, k: 'Range', v: f.range }] : []),
              { icon: Gauge, k: 'Market status', v: f.status },
              { icon: Info, k: 'Brand', v: f.brand },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="rounded-xl bg-white border border-slate-200 p-4">
                <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {k}
                </dt>
                <dd className="text-sm font-bold text-slate-900 mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Pros & cons */}
        <section aria-labelledby="proscons-h" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <h2 id="proscons-h" className="sr-only">{full} pros and cons</h2>
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" /> Pros
            </h3>
            <ul className="mt-3 space-y-2">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" aria-hidden="true" /> Things to consider
            </h3>
            <ul className="mt-3 space-y-2">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />{c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Similar models */}
        {related.length > 0 && (
          <section aria-labelledby="similar-h">
            <h2 id="similar-h" className="text-2xl font-black tracking-tight text-slate-900">
              Similar {isBike ? 'Bikes' : 'Cars'} to {full}
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <Link
                  key={r.url}
                  href={r.url}
                  className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all overflow-hidden"
                >
                  <img
                    src={r.image}
                    alt={`${r.brand} ${r.name} Pakistan`}
                    className={`w-full aspect-[16/10] ${r.image.endsWith('.svg') ? 'object-contain bg-slate-50' : 'object-cover'}`}
                    loading="lazy" width={320} height={200}
                  />
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">{r.brand}</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{r.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {r.priceMin > 0 ? `From ${formatPKR(r.priceMin)}` : 'Price on request'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section aria-labelledby="faq-h">
          <h2 id="faq-h" className="text-2xl font-black tracking-tight text-slate-900">
            {full} — Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-3">
            {faqs.map((f2) => (
              <details key={f2.q} className="group rounded-2xl bg-white border border-slate-200 p-5 open:shadow-sm">
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 flex items-start justify-between gap-3">
                  <h3 className="font-bold">{f2.q}</h3>
                  <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg leading-none shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{f2.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related reading + brand link */}
        <section aria-labelledby="more-h" className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <h2 id="more-h" className="sr-only">More about {f.brand}</h2>

          <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-base font-black text-slate-900">Related reading</h3>
            <ul className="mt-3 space-y-2.5">
              {(relatedArticles.length ? relatedArticles : BLOG_POSTS.slice(0, 3)).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors inline-flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 mt-0.5 text-slate-300 shrink-0" aria-hidden="true" />
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-950 text-white p-6">
            <h3 className="text-base font-black">More from {f.brand}</h3>
            <p className="text-xs text-slate-400 mt-1.5">
              Browse the full {f.brand} line-up with prices and specifications.
            </p>
            <Link
              href={`/brands/${f.brandSlug}`}
              className="mt-4 inline-flex items-center px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-teal-300 transition-colors"
            >
              All {f.brand} models
              <ArrowRight className="w-4 h-4 ml-1.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
