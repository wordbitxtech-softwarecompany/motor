import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/data';
import CompareView from './CompareView';

export const metadata: Metadata = {
  alternates: { canonical: '/compare' },
  title: 'Compare Cars in Pakistan | Specs & Prices',
  description: 'Compare car specifications, monthly installments, fuel economy and safety features side-by-side at MOTOR Pakistan.',
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const allVehicles = await getAllVehicles();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompareView allVehicles={allVehicles} initialSlug={params.car || ''} />
      </div>
    </div>
  );
}
