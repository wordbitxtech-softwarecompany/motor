'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BadgePercent,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Landmark,
  FileCheck,
  Calculator
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function FinancingView({
  initialCar = '',
  initialPrice = 8000000,
}: {
  initialCar?: string;
  initialPrice?: number;
}) {
  const [vehiclePrice, setVehiclePrice] = useState(initialPrice);
  const [downPercent, setDownPercent] = useState(30);
  const [years, setYears] = useState(3);
  const [interestRate, setInterestRate] = useState(13.5);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [bankPreference, setBankPreference] = useState('Meezan Bank (Islamic Car Ijarah)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Math
  const downPayment = Math.round((vehiclePrice * downPercent) / 100);
  const principal = vehiclePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = years * 12;
  const monthlyInstallment = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'Financing',
          customerName: applicantName,
          customerPhone: applicantPhone,
          customerEmail: applicantEmail,
          vehicleInterested: initialCar || `Financing for Rs ${vehiclePrice.toLocaleString()} Vehicle`,
          message: `Bank Financing Request: Preferred Bank: ${bankPreference}. Monthly Income: ${monthlyIncome}. Down Payment: ${downPercent}% (${formatPKR(downPayment)}). Tenure: ${years} Years. Calculated Installment: ${formatPKR(monthlyInstallment)}/mo.`,
          estimatedValue: vehiclePrice,
          source: 'Website',
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <BadgePercent className="w-4 h-4" />
            <span>Islamic & Conventional Car Financing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Make Your Next Car More Affordable.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Calculate your estimated monthly installment with leading partner banks in Lahore.
            Enjoy subsidized documentation fees, expedited 48-hour approvals, and clear amortizations.
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <span>Installment Payment Calculator</span>
            </h2>
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Live Math</span>
          </div>

          {/* Vehicle Price Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vehicle Price (PKR): <strong className="text-indigo-600">{formatPKR(vehiclePrice)}</strong>
            </label>
            <input
              type="range"
              min="2500000"
              max="45000000"
              step="250000"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Rs 25 Lacs</span>
              <span>Rs 2.0 Crore</span>
              <span>Rs 4.5 Crore</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Down Payment ({downPercent}%): <strong className="text-indigo-600">{formatPKR(downPayment)}</strong>
            </label>
            <input
              type="range"
              min="15"
              max="70"
              step="5"
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>15% (Minimum)</span>
              <span>30% (Recommended)</span>
              <span>70% (Reduced EMI)</span>
            </div>
          </div>

          {/* Loan Duration / Tenure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Tenure</label>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value={1}>1 Year (12 Installments)</option>
                <option value={2}>2 Years (24 Installments)</option>
                <option value={3}>3 Years (36 Installments)</option>
                <option value={4}>4 Years (48 Installments)</option>
                <option value={5}>5 Years (60 Installments)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Profit / Interest Rate</label>
              <select
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value={11.5}>11.5% (Special Corporate Rate)</option>
                <option value={13.5}>13.5% (Standard Islamic Rate - Meezan / Dubai Islamic)</option>
                <option value={15.0}>15.0% (Commercial Banking Benchmark)</option>
              </select>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/60 rounded-xl text-amber-900 text-xs leading-relaxed">
            <strong>Notice:</strong> Estimated calculation only. Actual bank approval, markup, insurance tracker charges, and processing fees are determined by individual commercial and Islamic banks upon financial underwriting.
          </div>
        </div>

        {/* Right: Payment Card & Application Lead Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Estimated Monthly Installment
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {formatPKR(monthlyInstallment)}
              <span className="text-xs font-normal text-slate-400"> / month</span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Vehicle Value:</span>
                <span className="font-semibold text-white">{formatPKR(vehiclePrice)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Down Payment ({downPercent}%):</span>
                <span className="font-semibold text-white">{formatPKR(downPayment)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Financing Principal:</span>
                <span className="font-semibold text-white">{formatPKR(principal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tenure Duration:</span>
                <span className="font-semibold text-white">{years} Years ({years * 12} Months)</span>
              </div>
            </div>

            {/* Application Lead Capture Form */}
            {submitted ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Application Logged</h4>
                <p className="text-xs text-slate-300">
                  Our financing coordinator will contact you with authorized bank schedule options within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Request Bank Pre-Screening
                </h4>

                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400"
                />

                <input
                  type="tel"
                  required
                  placeholder="Phone Number / WhatsApp *"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400"
                />

                <select
                  value={bankPreference}
                  onChange={(e) => setBankPreference(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                >
                  <option value="Meezan Bank (Islamic Car Ijarah)">Meezan Bank (Car Ijarah)</option>
                  <option value="Bank Alfalah (Auto Loan)">Bank Alfalah Auto Loan</option>
                  <option value="Standard Chartered (Saadiq Islamic)">Standard Chartered Saadiq</option>
                  <option value="Faysal Bank (Islami Auto)">Faysal Islamic Auto Finance</option>
                </select>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Financing Consultation'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
