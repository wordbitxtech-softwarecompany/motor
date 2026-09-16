import React from 'react';
import { Metadata } from 'next';
import FinancingView from './FinancingView';

export const metadata: Metadata = {
  alternates: { canonical: '/financing' },
  title: 'Car Financing & Monthly Installment Calculator Lahore | MOTOR',
  description: 'Calculate car loan monthly installments in Pakistan with MOTOR. Explore Islamic Car Ijarah with Meezan Bank, Bank Alfalah and Standard Chartered.',
};

export default async function FinancingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const initialPrice = params.price ? Number(params.price) : 8500000;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FinancingView initialCar={params.car} initialPrice={initialPrice} />
      </div>
    </div>
  );
}
