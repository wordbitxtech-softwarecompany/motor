'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trash2, Pencil, Save, X, Clock, Loader2 } from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export interface AdminListing {
  id: number;
  reference: string;
  listingType: string;
  vehicleKind: string;
  make: string; model: string; variant: string | null;
  year: number; price: number; mileage: number;
  fuelType: string; transmission: string; city: string;
  description: string | null;
  images: string[];
  sellerName: string; sellerPhone: string; sellerEmail: string;
  status: string; adminNote: string | null;
  reviewedBy: string | null;
  createdAt: string | Date;
}

const TABS = ['pending', 'approved', 'rejected', 'sold', 'all'] as const;
type Tab = (typeof TABS)[number];

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  sold: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function AdminListings({ initial }: { initial: AdminListing[] }) {
  const [rows, setRows] = useState(initial);
  const [tab, setTab] = useState<Tab>('pending');
  const [busy, setBusy] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<AdminListing>>({});
  const [note, setNote] = useState<Record<number, string>>({});

  const shown = tab === 'all' ? rows : rows.filter((r) => r.status === tab);
  const counts = TABS.reduce((a, t) => ({ ...a, [t]: t === 'all' ? rows.length : rows.filter((r) => r.status === t).length }), {} as Record<Tab, number>);

  async function act(id: number, action: string, extra: Record<string, unknown> = {}) {
    setBusy(id);
    try {
      const res = await fetch('/api/admin/listings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, adminNote: note[id], ...extra }),
      });
      const data = await res.json();
      if (data.listing) setRows((p) => p.map((r) => (r.id === id ? { ...r, ...data.listing } : r)));
    } finally {
      setBusy(null);
      setEditing(null);
    }
  }

  async function remove(id: number) {
    if (!confirm('Permanently delete this listing?')) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/listings?id=${id}`, { method: 'DELETE' });
      if (res.ok) setRows((p) => p.filter((r) => r.id !== id));
    } finally { setBusy(null); }
  }

  const inp = 'w-full h-9 px-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white';

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Seller Ads Moderation</h1>
        <p className="text-xs text-slate-400 mt-1">Review, edit, approve or reject vehicle ads submitted by users.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t} type="button" onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
              tab === t ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {t} <span className="ml-1 opacity-70">({counts[t]})</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="rounded-2xl bg-slate-800/70 border border-slate-700 p-10 text-center text-sm text-slate-400">
          No {tab === 'all' ? '' : tab} listings.
        </p>
      ) : (
        <ul className="space-y-4">
          {shown.map((r) => {
            const isEdit = editing === r.id;
            return (
              <li key={r.id} className="rounded-2xl bg-slate-800/80 border border-slate-700 p-5">
                <div className="flex flex-col lg:flex-row gap-5">
                  {/* Photos */}
                  <div className="lg:w-48 shrink-0">
                    {r.images?.length ? (
                      <div className="grid grid-cols-2 gap-1.5">
                        {r.images.slice(0, 4).map((src, i) => (
                          <img key={i} src={src} alt={`${r.make} ${r.model} photo ${i + 1}`} className="w-full aspect-[4/3] object-cover rounded-lg border border-slate-700" />
                        ))}
                      </div>
                    ) : (
                      <div className="aspect-[4/3] rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                        No photos
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${STATUS_STYLE[r.status] || ''}`}>
                        {r.status}
                      </span>
                      {r.listingType === 'assisted' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Assisted sale
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-mono">{r.reference}</span>
                    </div>

                    {isEdit ? (
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['make','model','year','price','mileage','city','fuelType','transmission'] as const).map((k) => (
                          <label key={k} className="block">
                            <span className="block text-[10px] uppercase text-slate-500 mb-1">{k}</span>
                            <input
                              className={inp}
                              defaultValue={String(r[k] ?? '')}
                              onChange={(e) => setDraft((p) => ({ ...p, [k]: e.target.value }))}
                            />
                          </label>
                        ))}
                      </div>
                    ) : (
                      <>
                        <h3 className="text-base font-bold text-white mt-1.5">
                          {r.year} {r.make} {r.model}{r.variant ? ` ${r.variant}` : ''}
                        </h3>
                        <p className="text-lg font-black text-emerald-400 mt-0.5">{formatPKR(r.price)}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {r.city} · {r.mileage.toLocaleString()} km · {r.fuelType} · {r.transmission} · {r.vehicleKind}
                        </p>
                        {r.description && <p className="text-xs text-slate-400 mt-2 line-clamp-2">{r.description}</p>}
                      </>
                    )}

                    {/* Seller */}
                    <div className="mt-3 rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-xs">
                      <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Seller details</p>
                      <p className="text-slate-200 font-semibold">{r.sellerName}</p>
                      <p className="text-slate-400">{r.sellerPhone} · {r.sellerEmail}</p>
                    </div>

                    {r.status === 'pending' && (
                      <label className="block mt-3">
                        <span className="block text-[10px] uppercase text-slate-500 mb-1">Reviewer note (shown to seller if rejected)</span>
                        <input
                          className={inp}
                          placeholder="e.g. Photos are unclear, please re-upload"
                          value={note[r.id] ?? ''}
                          onChange={(e) => setNote((p) => ({ ...p, [r.id]: e.target.value }))}
                        />
                      </label>
                    )}
                    {r.adminNote && r.status === 'rejected' && (
                      <p className="mt-2 text-xs text-red-300">Note: {r.adminNote}</p>
                    )}
                    {r.reviewedBy && <p className="mt-1.5 text-[10px] text-slate-500">Reviewed by {r.reviewedBy}</p>}
                  </div>

                  {/* Actions */}
                  <div className="lg:w-40 shrink-0 flex flex-row lg:flex-col flex-wrap gap-2">
                    {busy === r.id && <Loader2 className="w-4 h-4 animate-spin text-slate-400" aria-hidden="true" />}

                    {isEdit ? (
                      <>
                        <button onClick={() => act(r.id, 'edit', draft)} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5">
                          <Save className="w-3.5 h-3.5" aria-hidden="true" /> Save
                        </button>
                        <button onClick={() => { setEditing(null); setDraft({}); }} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-slate-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5">
                          <X className="w-3.5 h-3.5" aria-hidden="true" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {r.status !== 'approved' && (
                          <button onClick={() => act(r.id, 'approve')} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Approve
                          </button>
                        )}
                        {r.status !== 'rejected' && (
                          <button onClick={() => act(r.id, 'reject')} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-bold inline-flex items-center justify-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5" aria-hidden="true" /> Reject
                          </button>
                        )}
                        {r.status === 'approved' && (
                          <button onClick={() => act(r.id, 'sold')} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Mark sold
                          </button>
                        )}
                        <button onClick={() => { setEditing(r.id); setDraft({}); }} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5">
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                        </button>
                        <button onClick={() => remove(r.id)} className="flex-1 lg:flex-none px-3 py-2 rounded-lg bg-slate-900 hover:bg-red-950 text-red-400 text-xs font-bold inline-flex items-center justify-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
