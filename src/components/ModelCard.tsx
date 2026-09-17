'use client';

import React from 'react';
import Link from 'next/link';
import { MessageSquare, Zap, Bike, Battery, Gauge } from 'lucide-react';
import { formatPKR, formatPowertrain } from '@/lib/utils';
import { imageForModel, type CatalogModel } from '@/lib/brands-data';
import { isStudioPhoto } from '@/lib/vehicle-photos';
import { enquiryLink } from '@/lib/contact';
import { BIKE_FAMILIES, CAR_FAMILIES } from '@/lib/catalog';
import VehicleImage from '@/components/VehicleImage';

const PT_STYLE: Record<string, string> = {
  EV: 'bg-cyan-100 text-cyan-800',
  Hybrid: 'bg-amber-100 text-amber-800',
  PHEV: 'bg-violet-100 text-violet-800',
  REEV: 'bg-emerald-100 text-emerald-800',
  Diesel: 'bg-stone-100 text-stone-700',
  Petrol: 'bg-slate-100 text-slate-700',
};

const STATUS_STYLE: Record<string, string> = {
  'Coming Soon': 'bg-amber-50 text-amber-700 border-amber-200',
  Expected: 'bg-amber-50 text-amber-700 border-amber-200',
  'Pre-Launch': 'bg-violet-50 text-violet-700 border-violet-200',
  'New Arrival': 'bg-teal-50 text-teal-700 border-teal-200',
  Imported: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function ModelCard({
  model,
  brandName,
  brandSlug,
  index = 0,
}: {
  model: CatalogModel;
  brandName: string;
  brandSlug?: string;
  index?: number;
}) {
  const img = imageForModel(model.body, index, brandName, model.name, model.pt);
  const isTwoWheeler = model.body === 'Motorcycle' || model.body === 'Scooter';
  const fullName = `${brandName} ${model.name}`;
  const family = (isTwoWheeler ? BIKE_FAMILIES : CAR_FAMILIES).find(
    (f) => f.brand === brandName && model.name.toLowerCase().startsWith(f.name.toLowerCase())
  );
  const href = family?.url || (brandSlug
    ? `/${isTwoWheeler ? 'bikes' : 'cars'}/${brandSlug}`
    : undefined);

  const waMsg = encodeURIComponent(
    `Hello MOTOR Pakistan, I would like details and the best price for the ${model.year} ${fullName}.`
  );

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        {img ? (
          href ? (
            <Link href={href}>
              <VehicleImage
                src={img}
                alt={`${fullName} ${model.year} — ${model.pt} ${model.body} price in Pakistan`}
                className={`w-full h-full group-hover:scale-[1.04] transition-transform duration-500 ${
                  isStudioPhoto(img) ? 'object-contain bg-slate-950' : 'object-cover'
                }`}
              />
            </Link>
          ) : (
            <VehicleImage
              src={img}
              alt={`${fullName} ${model.year} — ${model.pt} ${model.body} price in Pakistan`}
              className={`w-full h-full group-hover:scale-[1.04] transition-transform duration-500 ${
                isStudioPhoto(img) ? 'object-contain bg-slate-950' : 'object-cover'
              }`}
            />
          )
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-white gap-2">
            <Bike className="w-9 h-9 opacity-80" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-widest opacity-70">
              {model.body}
            </span>
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${PT_STYLE[model.pt] || 'bg-slate-100 text-slate-700'}`}>
            {formatPowertrain(model.pt)}
          </span>
          {STATUS_STYLE[model.status] && (
            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${STATUS_STYLE[model.status]}`}>
              {model.status}
            </span>
          )}
        </div>

        {model.range && (
          <span className="absolute bottom-3 left-3 inline-flex items-center text-[10px] font-bold text-white bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded">
            <Zap className="w-3 h-3 mr-1 text-teal-400" aria-hidden="true" />
            {model.range}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
            {href ? (
              <Link href={href} className="hover:text-teal-700 transition-colors">{fullName}</Link>
            ) : fullName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {model.year} · {model.body}
            {model.battery ? ` · ${model.battery}` : ''}
            {model.launchedAt ? ` · PK launch ${model.launchedAt}` : ''}
          </p>

          <div className="mt-3">
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {model.price > 0 ? (isTwoWheeler ? 'Retail Price' : 'Starting From') : 'Price'}
            </span>
            <span className="text-xl font-black text-[#c8102e]">
              {model.price > 0 ? formatPKR(model.price) : 'Price Coming Soon'}
            </span>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="inline-flex items-center">
              {model.battery ? (
                <><Battery className="w-3.5 h-3.5 mr-1 text-slate-400" aria-hidden="true" />{model.battery}</>
              ) : (
                <><Gauge className="w-3.5 h-3.5 mr-1 text-slate-400" aria-hidden="true" />{formatPowertrain(model.pt)}</>
              )}
            </span>
            <span className="font-medium">{model.status}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={href || '/test-drive'}
            className="text-center py-2 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isTwoWheeler ? 'View Details' : 'Book Test Drive'}
          </Link>
          <a
            href={enquiryLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center py-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
