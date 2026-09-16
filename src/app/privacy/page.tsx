import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy | MOTOR Lahore',
  description: 'MOTOR customer data privacy policy, vehicle booking data handling and confidentiality commitments.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: January 1, 2026 • MOTOR (Lahore, Pakistan)</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">1. Information We Collect</h2>
        <p>MOTOR collects customer information provided during test drive scheduling, car rental reservations, online vehicle valuation requests, and dealership inquiries. This includes full name, telephone/WhatsApp contact details, email address, preferred showroom location, and relevant vehicle trade-in specifications.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">2. Purpose of Processing</h2>
        <p>Collected details are strictly used to fulfill automotive sales coordination, rental fleet reservations, vehicle dispatch, biometric excise transfer filings, and bank financing pre-screening. We do not sell or monetize personal customer records to third-party commercial marketing aggregators.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">3. Identity Documentation & Biometrics</h2>
        <p>Identification documents (such as Pakistani CNIC or Passport) requested for vehicle rentals and ownership title transfers are verified physically in compliance with provincial government excise requirements. Physical copies are kept in secure digital records accessible solely by certified compliance officers.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">4. Technology by WordbitX</h2>
        <p>Our platform’s digital booking architecture, CRM pipeline, and web infrastructure are engineered and maintained in partnership with WordbitX (https://www.wordbitxtech.com/), adhering to industry-standard data encryption and secure transmission protocols.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">5. Contact Our Privacy Officer</h2>
        <p>For data inquiries or record updates, contact our compliance desk at 42-B Main Boulevard, Gulberg III, Lahore or email info@motor.wordbitxtech.com.</p>
      </div>
    </div>
  );
}
