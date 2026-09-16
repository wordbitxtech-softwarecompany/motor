import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PostAdForm from '@/components/PostAdForm';
import { buildMetadata } from '@/lib/seo';
import { getCurrentUser } from '@/lib/auth';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Help Me Sell My Car',
  description: 'Let the MOTOR Pakistan team handle your sale — inspection, listing and buyer coordination.',
  path: '/sell/help-me-sell',
  noindex: true,
});

export default async function HelpMeSellPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signup?next=%2Fsell%2Fhelp-me-sell');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Sell', path: '/sell' }, { name: 'Help Me Sell', path: '/sell/help-me-sell' }]} />
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">Help me sell my car</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Share your vehicle details and our team will take it from there.
        </p>

        <ul className="mt-5 mb-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {['A team member contacts you to confirm details','We arrange inspection and photography','We handle buyer enquiries on your behalf'].map((s) => (
            <li key={s} className="flex items-start gap-2 rounded-xl bg-white border border-slate-200 p-3.5 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />{s}
            </li>
          ))}
        </ul>

        <PostAdForm listingType="assisted" userCity={user.city} />
      </div>
    </div>
  );
}
