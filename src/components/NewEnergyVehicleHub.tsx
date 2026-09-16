'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Zap, BatteryCharging, ArrowRight, Fuel, Info, Sparkles } from 'lucide-react';
import { formatPKR } from '@/lib/utils';
import { BRANDS, imageForModel } from '@/lib/brands-data';

type TabKey = 'EV' | 'HEV' | 'PHEV' | 'REEV';

const TAB_META: { key: TabKey; label: string; desc: string; accent: string }[] = [
  { key: 'EV', label: 'EV', desc: 'Pure electric', accent: 'bg-cyan-400 text-slate-950' },
  { key: 'HEV', label: 'HEV', desc: 'Self-charging', accent: 'bg-amber-400 text-slate-950' },
  { key: 'PHEV', label: 'PHEV', desc: 'Plug-in hybrid', accent: 'bg-violet-400 text-slate-950' },
  { key: 'REEV', label: 'REEV', desc: 'Range extended', accent: 'bg-emerald-400 text-slate-950' },
];

interface Row {
  brand: string; brandSlug: string; logo: string;
  name: string; body: string; pt: string; price: number;
  year: number; status: string; range?: string; battery?: string;
  img: string;
}

export default function NewEnergyVehicleHub() {
  const [tab, setTab] = useState<TabKey>('EV');

  const all: Row[] = useMemo(
    () =>
      BRANDS.flatMap((b) =>
        b.models.map((m, i) => ({
          brand: b.name, brandSlug: b.slug, logo: b.logo,
          name: m.name, body: m.body, pt: m.pt, price: m.price,
          year: m.year, status: m.status, range: m.range, battery: m.battery,
          img: imageForModel(m.body, i, b.name, m.name, m.pt),
        }))
      ),
    []
  );

  const counts = useMemo(
    () => ({
      EV: all.filter((m) => m.pt === 'EV').length,
      HEV: all.filter((m) => m.pt === 'Hybrid').length,
      PHEV: all.filter((m) => m.pt === 'PHEV').length,
      REEV: all.filter((m) => m.pt === 'REEV').length,
    }),
    [all]
  );

  const filtered = useMemo(() => {
    const want = tab === 'HEV' ? 'Hybrid' : tab;
    const list = all.filter((m) => m.pt === want);
    // Priced/available first, then by price
    return list
      .sort((a, b) => {
        const av = a.price > 0 ? 0 : 1;
        const bv = b.price > 0 ? 0 : 1;
        if (av !== bv) return av - bv;
        return (a.price || 9e9) - (b.price || 9e9);
      })
      .slice(0, 12);
  }, [all, tab]);

  return (
    <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
      {/* Ambient luxury glow */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-[420px] h-[420px] rounded-full bg-indigo-500/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '56px 56px' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px] font-bold uppercase tracking-[0.18em]">
              <BatteryCharging className="w-3.5 h-3.5 mr-1.5" />
              New Energy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Pakistan&apos;s New Energy Drive
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Discover electric, hybrid, plug-in hybrid and range-extended vehicles shaping the next
              generation of mobility in Pakistan —{' '}
              <span className="text-white font-semibold">
                {counts.EV + counts.HEV + counts.PHEV + counts.REEV} electrified models
              </span>{' '}
              across {BRANDS.length} brands.
            </p>
          </div>

          <Link
            href="/electric-cars-pakistan"
            className="group inline-flex items-center px-5 py-3 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-teal-300 transition-colors shrink-0"
          >
            Explore Electric &amp; Hybrid Cars
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {TAB_META.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                tab === t.key
                  ? `${t.accent} shadow-lg shadow-black/30 scale-[1.03]`
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-[11px] font-medium ${tab === t.key ? 'opacity-70' : 'text-slate-500'}`}>
                {t.desc} · {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {tab === 'REEV' && (
          <div className="p-4 bg-white/5 border border-emerald-500/30 rounded-2xl flex items-start gap-3 text-xs text-slate-300">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Range Extended EVs</strong> are driven 100% by an electric motor.
              The onboard petrol engine only charges the battery on long trips — it never drives the wheels.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((m) => (
            <article
              key={`${m.brandSlug}-${m.name}`}
              className="group relative rounded-2xl bg-white/[0.04] border border-white/10 hover:border-teal-400/60 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={m.img}
                  alt={`${m.brand} ${m.name} ${m.year} — ${m.pt} in Pakistan`}
                  className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                    m.img.endsWith('.svg') ? 'object-contain' : 'object-cover'
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wide rounded bg-teal-400 text-slate-950">
                    {m.pt}
                  </span>
                  {['Coming Soon', 'Expected', 'Pre-Launch', 'New Arrival'].includes(m.status) && (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide rounded bg-slate-950/85 text-amber-300 border border-amber-400/30">
                      {m.status}
                    </span>
                  )}
                </div>
                {/* Brand logo chip */}
                <span className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
                  <img src={m.logo} alt={`${m.brand} logo`} className="w-6 h-6 object-contain" loading="lazy" />
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-400">{m.brand}</p>
                <h3 className="text-[14px] font-bold text-white leading-snug mt-0.5">
                  <Link href={`/brands/${m.brandSlug}`} className="hover:text-teal-300 transition-colors">
                    {m.name}
                  </Link>
                </h3>

                <dl className="mt-3 space-y-1 text-[11px] text-slate-400 flex-1">
                  {m.range && (
                    <div className="flex justify-between gap-2">
                      <dt>Range</dt>
                      <dd className="font-semibold text-slate-200 text-right">{m.range}</dd>
                    </div>
                  )}
                  {m.battery && (
                    <div className="flex justify-between gap-2">
                      <dt>Battery</dt>
                      <dd className="font-semibold text-slate-200 text-right">{m.battery}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <span className="text-[14px] font-black text-white">
                    {m.price > 0 ? formatPKR(m.price) : 'Price Coming Soon'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/electric-cars-pakistan" className="text-[13px] font-bold text-teal-300 hover:text-teal-200 inline-flex items-center">
            All EVs <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <span className="text-white/20">·</span>
          <Link href="/hybrid-cars-pakistan" className="text-[13px] font-bold text-teal-300 hover:text-teal-200">Hybrids</Link>
          <span className="text-white/20">·</span>
          <Link href="/phev-cars-pakistan" className="text-[13px] font-bold text-teal-300 hover:text-teal-200">PHEV</Link>
          <span className="text-white/20">·</span>
          <Link href="/reev-cars-pakistan" className="text-[13px] font-bold text-teal-300 hover:text-teal-200">REEV</Link>
        </div>
      </div>
    </section>
  );
}
