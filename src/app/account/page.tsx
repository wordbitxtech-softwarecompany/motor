import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { desc, eq } from 'drizzle-orm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { formatPKR } from '@/lib/utils';
import { PlusCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'My Account',
  description: 'Manage your MOTOR Pakistan vehicle ads and account details.',
  path: '/account',
  noindex: true,
});

const BADGE: Record<string, { c: string; I: typeof Clock; t: string }> = {
  pending:  { c: 'bg-amber-50 text-amber-700 border-amber-200',   I: Clock,        t: 'Awaiting review' },
  approved: { c: 'bg-emerald-50 text-emerald-700 border-emerald-200', I: CheckCircle2, t: 'Live' },
  rejected: { c: 'bg-red-50 text-red-700 border-red-200',         I: XCircle,      t: 'Not approved' },
  sold:     { c: 'bg-slate-100 text-slate-600 border-slate-200',  I: CheckCircle2, t: 'Sold' },
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login?next=%2Faccount');

  await ensureDbInitialized();
  const myAds = await db.select().from(listings).where(eq(listings.userId, user.id)).orderBy(desc(listings.id));

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'My Account', path: '/account' }]} />

        <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">My account</h1>
            <p className="text-sm text-slate-500 mt-1.5">
              {user.name} · {user.email} · {user.phone} · {user.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/sell/post-ad" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">
              <PlusCircle className="w-4 h-4" aria-hidden="true" /> Post an ad
            </Link>
            {user.role === 'admin' && (
              <Link href="/admin" className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-white transition-colors">
                Admin panel
              </Link>
            )}
            <form action="/api/auth/logout" method="post">
              <button formAction="/api/auth/logout" className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-white transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </div>

        <section aria-labelledby="ads-h" className="mt-9">
          <h2 id="ads-h" className="text-xl font-black tracking-tight text-slate-900">My ads ({myAds.length})</h2>

          {myAds.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-white border border-slate-200 p-10 text-center">
              <p className="text-sm text-slate-600">You haven&apos;t posted any ads yet.</p>
              <Link href="/sell/post-ad" className="mt-4 inline-flex px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">
                Post your first ad
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {myAds.map((a) => {
                const b = BADGE[a.status] || BADGE.pending;
                const Icon = b.I;
                return (
                  <li key={a.id} className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-full sm:w-32 aspect-[4/3] rounded-lg bg-slate-100 overflow-hidden shrink-0">
                      {a.images?.[0]
                        ? <img src={a.images[0]} alt={`${a.make} ${a.model}`} className="w-full h-full object-cover" />
                        : <span className="flex items-center justify-center h-full text-[10px] text-slate-400">No photo</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{a.year} {a.make} {a.model}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${b.c}`}>
                          <Icon className="w-3 h-3" aria-hidden="true" /> {b.t}
                        </span>
                        {a.listingType === 'assisted' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">Assisted</span>
                        )}
                      </div>
                      <p className="text-lg font-black text-slate-900 mt-1">{formatPKR(a.price)}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {a.city} · {a.mileage.toLocaleString()} km · {a.fuelType} · Ref {a.reference}
                      </p>
                      {a.status === 'rejected' && a.adminNote && (
                        <p className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                          <strong>Reviewer note:</strong> {a.adminNote}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
