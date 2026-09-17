import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
  const user = await getCurrentUser().catch(() => null);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Sell', path: '/sell' }, { name: 'Post Your Ad', path: '/sell/post-ad' }]} />
        <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900">Post your ad</h1>
        {user ? (
          <p className="text-sm text-slate-500 mt-1.5 mb-7">
            Signed in as <strong className="text-slate-700">{user.name}</strong> ({user.phone}). Buyers will contact you on this number.
          </p>
        ) : (
          <p className="text-sm text-slate-500 mt-1.5 mb-7">
            No account needed — enter your contact details with the ad. Prefer an account?{' '}
            <Link href="/signup?next=%2Fsell%2Fpost-ad" className="font-bold text-teal-700 hover:underline">
              Sign up
            </Link>
            {' · '}
            <Link href="/login?next=%2Fsell%2Fpost-ad" className="font-bold text-teal-700 hover:underline">
              Sign in
            </Link>
          </p>
        )}
        <PostAdForm
          listingType="self"
          userCity={user?.city || 'Lahore'}
          signedIn={Boolean(user)}
          prefill={{ name: user?.name, phone: user?.phone, email: user?.email }}
        />
      </div>
    </div>
  );
}
