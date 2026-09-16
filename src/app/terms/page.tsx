import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  title: 'Terms & Conditions | MOTOR Lahore',
  description: 'Terms of vehicle sales, rental reservation policies, security deposits and legal title guarantees at MOTOR.',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Last Updated: March 2026 • MOTOR (Lahore, Pakistan)</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">1. Certified Vehicle Sales Agreement</h2>
        <p>All pre-owned automobiles offered for sale at MOTOR have undergone our verified 150-point diagnostic inspection. Pricing displayed represents full showroom vehicle purchase values in Pakistani Rupees (PKR) excluding government transfer taxes and registration fees, unless explicitly agreed in writing.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">2. Biometric & Ownership Transfer Guarantee</h2>
        <p>Both buyer and seller agree to participate in biometric registration transfer under Punjab Excise & Taxation mandates. MOTOR guarantees clear, unencumbered titles free of bank hypothecation disputes or unpaid traffic challans.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">3. Car Rental Terms & Security Deposit</h2>
        <p>Rental vehicles are leased to drivers aged 21 and older possessing a valid Pakistani or International Driving License. A refundable security deposit is held for the duration of the rental. Deposits are returned in full following post-rental vehicle inspection and fuel reconciliation.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">4. Fuel & Standard Mileage Allowance</h2>
        <p>Rental vehicles are dispatched with a 100% full fuel tank and must be returned full. Unless an unlimited mileage package has been explicitly purchased, daily rental contracts include a standard allowance of 200 kilometers per calendar day.</p>

        <h2 className="text-base font-bold text-slate-900 pt-4 border-t border-slate-100">5. Platform Disclaimer</h2>
        <p>MOTOR Pakistan is operated as an automotive information and enquiry platform. Vehicle availability, booking references and test-drive slots are confirmed by our team after you submit an enquiry.</p>
      </div>
    </div>
  );
}
