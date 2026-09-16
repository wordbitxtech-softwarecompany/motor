import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/data';
import TestDriveView from './TestDriveView';

export const metadata: Metadata = {
  alternates: { canonical: '/test-drive' },
  title: 'Book a Test Drive in Lahore | MOTOR',
  description: 'Schedule a certified test drive for Toyota, Honda, KIA, Hyundai, Mercedes-Benz, BMW and Audi in Gulberg or DHA Lahore.',
};

export default async function TestDrivePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const vehicles = await getAllVehicles();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestDriveView vehicles={vehicles} initialSlug={params.car} />
      </div>
    </div>
  );
}
