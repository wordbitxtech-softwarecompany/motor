'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  Banknote,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MapPin,
  Car
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function SellCarPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: 'Toyota',
    model: '',
    year: '2022',
    mileage: '',
    condition: 'Excellent',
    expectedPrice: '',
    location: 'Gulberg III, Lahore',
    message: '',
  });

  const [filesCount, setFilesCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [estimatedQuote, setEstimatedQuote] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const expNum = Number(formData.expectedPrice) || 5000000;
      const quoteEst = Math.round(expNum * 0.96);

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: 'Sell Car',
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          vehicleInterested: `${formData.year} ${formData.make} ${formData.model}`,
          message: `Car Sale Valuation: ${formData.year} ${formData.make} ${formData.model} (${formData.mileage} km, ${formData.condition}). Expected: PKR ${formData.expectedPrice}. Location: ${formData.location}. Notes: ${formData.message}`,
          estimatedValue: expNum,
          source: 'Website',
          valuationDetails: {
            ...formData,
            photosUploadedCount: filesCount,
            estimatedQuote: quoteEst,
          },
        }),
      });

      if (res.ok) {
        setEstimatedQuote(quoteEst);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>MOTOR Direct Vehicle Purchase</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Thinking About Selling Your Car in Lahore?
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Get an instant fair-market valuation from our automotive evaluation team. Free doorstep physical inspection anywhere in Lahore and immediate same-day bank settlement.
            </p>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Submit Vehicle Details</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Enter your make, model, year, and condition in 60 seconds.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Free Physical Inspection</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Our certified evaluator visits your doorstep in Gulberg, DHA, Johar Town or Model Town.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black shrink-0">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Instant Bank Disbursement</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Immediate fund transfer into your account with legal biometric transfer guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Valuation Request Received!</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our Lahore procurement team has received your details for the{' '}
                <strong>{formData.year} {formData.make} {formData.model}</strong>.
              </p>

              {estimatedQuote && (
                <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 max-w-sm mx-auto text-center space-y-1">
                  <span className="text-xs text-indigo-800 font-semibold uppercase">Preliminary Offer Range</span>
                  <div className="text-2xl font-black text-indigo-900">
                    {formatPKR(estimatedQuote)} - {formatPKR(Number(formData.expectedPrice) || estimatedQuote * 1.05)}
                  </div>
                  <p className="text-[11px] text-slate-500">Subject to physical 150-point inspection</p>
                </div>
              )}

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/cars"
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
                >
                  Browse Trade-In Inventory
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition"
                >
                  Submit Another Vehicle
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Request Free Car Valuation</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Get a fast valuation from our automotive team with zero obligation.
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Usman Riaz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder=""
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Vehicle Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Make</label>
                  <select
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="KIA">KIA</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="BMW">BMW</option>
                    <option value="Audi">Audi</option>
                    <option value="Other">Other Make</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Model & Variant <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Corolla Altis Grande 1.8"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    placeholder="e.g. 35000"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Price & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Condition</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Pristine / Bumper to Bumper Original">Pristine / Original Paint</option>
                    <option value="Excellent (Minor touchups)">Excellent (Minor touchups)</option>
                    <option value="Good Condition">Good Condition</option>
                    <option value="Fair / Needs Work">Fair / Needs Work</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Price (PKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 7500000"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location in Lahore</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Gulberg III, Lahore">Gulberg, Lahore</option>
                    <option value="DHA Phase 1-8, Lahore">DHA Lahore</option>
                    <option value="Johar Town, Lahore">Johar Town</option>
                    <option value="Model Town, Lahore">Model Town</option>
                    <option value="Bahria Town, Lahore">Bahria Town</option>
                    <option value="Cantt / Mall Road, Lahore">Cantt / Mall Road</option>
                    <option value="Other Lahore Area">Other Lahore Area</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload UI Placeholder */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Vehicle Photos (Front, Rear, Odometer, Interior)
                </label>
                <div
                  onClick={() => setFilesCount((prev) => (prev < 4 ? prev + 1 : 4))}
                  className="border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition"
                >
                  <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    {filesCount > 0 ? `${filesCount} Photos Selected` : 'Click to simulate photo upload'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG up to 10MB each</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  rows={2}
                  placeholder="Mention token taxes paid, first owner status, or any modifications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{isSubmitting ? 'Evaluating Vehicle...' : 'Request Valuation from Automotive Team'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
