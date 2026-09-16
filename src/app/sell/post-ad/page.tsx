import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import PostAdForm from '@/components/PostAdForm';
import { buildMetadata } from '@/lib/seo';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = buildMetadata({
  title: 'Post Your Car Ad Free',
  description: 'Post your car or bike ad on MOTOR Pakistan. Add photos, price and details, then connect directly with buyers.',
  path: '/sell/post-ad',
  noindex: true,
});

export default async function PostAdPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/signup?next=%2Fsell%2Fpost-ad');

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Sell', path: '/sell' }, { name: 'Post Your Ad', path: '/sell/post-ad' }]} />
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">Post your ad</h1>
        <p className="text-sm text-slate-500 mt-1.5 mb-7">
          Signed in as <strong className="text-slate-700">{user.name}</strong> ({user.phone}). Buyers will contact you on this number.
        </p>
        <PostAdForm listingType="self" userCity={user.city} />
      </div>
    </div>
  );
}
