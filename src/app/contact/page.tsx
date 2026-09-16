import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles } from '@/lib/data';
import ContactView from './ContactView';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact MOTOR Pakistan',
  description: 'Contact MOTOR in Gulberg III and DHA Phase 5 Lahore. Phone, WhatsApp, showroom directions and online inquiry forms.',
};

export default async function ContactPage() {
  const vehicles = await getAllVehicles();

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactView vehicles={vehicles} />
      </div>
    </div>
  );
}
