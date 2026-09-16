import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthForm from '@/components/AuthForm';
import { buildMetadata } from '@/lib/seo';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = buildMetadata({
  title: 'Create an Account',
  description: 'Create a free MOTOR Pakistan account to post your car or bike ad, manage listings and track enquiries.',
  path: '/signup',
  noindex: true,
});

export default async function SignupPage() {
  if (await getCurrentUser()) redirect('/account');
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Create Account', path: '/signup' }]} />
        <h1 className="mt-5 text-2xl font-black tracking-tight text-slate-900">Create your account</h1>
        <p className="text-sm text-slate-500 mt-1.5 mb-6">
          You need an account to post a vehicle ad. It takes less than a minute.
        </p>
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <Suspense fallback={null}><AuthForm mode="signup" /></Suspense>
        </div>
      </div>
    </div>
  );
}
