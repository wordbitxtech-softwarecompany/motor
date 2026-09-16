'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  Send,
  Building,
  Sparkles
} from 'lucide-react';
import { enquiryLink } from '@/lib/contact';

export default function ContactView({ vehicles }: { vehicles: any[] }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interestedIn: 'Buying a Vehicle',
    vehicleId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedCar = vehicles.find((v) => v.id === Number(formData.vehicleId));
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadType: formData.interestedIn,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          vehicleInterested: selectedCar ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}` : 'General Inquiry',
          vehicleId: selectedCar ? selectedCar.id : null,
          message: formData.message,
          source: 'Website Contact Page',
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
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Our Concierge</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Contact MOTOR Lahore
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Visit our physical showrooms in Gulberg and DHA, reserve a rental fleet dispatch, or schedule an executive consultation with our automotive team.
          </p>
        </div>
      </div>

      {/* Main Grid: Branches on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Branch Offices Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Gulberg Flagship */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Flagship Showroom
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Open Now</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Gulberg III Hub</h3>
            <p className="text-xs text-slate-500 flex items-start">
              <MapPin className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>42-B Main Boulevard, Gulberg III, Lahore</span>
            </p>
            <p className="text-xs text-slate-600 flex items-center">
              <Phone className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
              <span></span>
            </p>
            <p className="text-xs text-slate-500 flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
              <span>Mon – Sat: 9:30 AM – 9:00 PM</span>
            </p>
          </div>

          {/* DHA Branch */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                SUV & Rental Center
              </span>
              <span className="text-xs text-emerald-600 font-semibold">Open Now</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">DHA Phase 5 Branch</h3>
            <p className="text-xs text-slate-500 flex items-start">
              <MapPin className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0 mt-0.5" />
              <span>Sector C Commercial, DHA Phase 5 (Near Ring Road), Lahore</span>
            </p>
            <p className="text-xs text-slate-600 flex items-center">
              <Phone className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
              <span>+92 300 8472910</span>
            </p>
            <p className="text-xs text-slate-500 flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-indigo-500 shrink-0" />
              <span>Mon – Sat: 10:00 AM – 9:00 PM</span>
            </p>
          </div>

          {/* Quick WhatsApp Card */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-800 space-y-3">
            <h3 className="text-sm font-bold flex items-center space-x-2 text-white">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Need Immediate Assistance?</span>
            </h3>
            <p className="text-xs text-emerald-200 leading-relaxed">
              Our digital concierge team responds on WhatsApp within minutes for vehicle specifications, pricing, and rental dispatch status.
            </p>
            <a
              href={enquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition space-x-1.5"
            >
              <span>Chat on WhatsApp ()</span>
            </a>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Message Received</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A dedicated MOTOR consultant has received your message and will contact you via phone or WhatsApp promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Send Us a Message</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and our Lahore team will respond within 30 minutes during showroom hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ullah"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Interested In</label>
                  <select
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Buying a Vehicle">Buying a Vehicle</option>
                    <option value="Car Rental">Car Rental Service</option>
                    <option value="Selling / Trade-In">Selling / Trade-In</option>
                    <option value="Financing Consultation">Financing Consultation</option>
                    <option value="Corporate Fleet">Corporate Fleet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Vehicle (Optional)</label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="">General Inquiry</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.year} {v.make} {v.model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you are looking for..."
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
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message to Showroom Team'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
