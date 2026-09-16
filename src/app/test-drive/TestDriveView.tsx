'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  ShieldCheck,
  CalendarCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function TestDriveView({
  vehicles,
  initialSlug = '',
}: {
  vehicles: any[];
  initialSlug?: string;
}) {
  const defaultCar = vehicles.find((v) => v.slug === initialSlug) || vehicles[0];

  const [selectedVehicleId, setSelectedVehicleId] = useState(defaultCar?.id || 1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('2026-03-29');
  const [time, setTime] = useState('11:00 AM');
  const [location, setLocation] = useState('Main Boulevard, Gulberg III, Lahore');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const activeVehicle = vehicles.find((v) => v.id === Number(selectedVehicleId)) || defaultCar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      setErrorMsg('Please complete required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/test-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: activeVehicle.id,
          vehicleName: `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model}`,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          preferredDate: date,
          preferredTime: time,
          location,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit test drive request');

      setConfirmation(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-xl">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <KeyRound className="w-3.5 h-3.5" />
            <span>MOTOR Test Drive Experience</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Experience the Road Before You Decide.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Schedule a certified test drive at our Gulberg or DHA showrooms, or request an executive doorstep demonstration at your residence in Lahore.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Selected Vehicle Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Selected Test Drive Vehicle
          </h3>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={activeVehicle?.mainImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-indigo-600 uppercase">{activeVehicle?.make}</p>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeVehicle?.year} {activeVehicle?.make} {activeVehicle?.model}
            </h2>
            <div className="mt-2 flex items-center text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>{activeVehicle?.location}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div>Transmission: <strong>{activeVehicle?.transmission}</strong></div>
            <div>Fuel: <strong>{activeVehicle?.fuelType}</strong></div>
            <div>Engine: <strong>{activeVehicle?.engineCapacity}</strong></div>
            <div>Status: <strong className="text-emerald-700">{activeVehicle?.status}</strong></div>
          </div>

          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 space-y-1">
            <p className="font-bold flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-indigo-600" />
              What to bring:
            </p>
            <p className="text-[11px] text-slate-600">
              Please present your original valid driving license before taking the wheel. A MOTOR product specialist will accompany your route.
            </p>
          </div>
        </div>

        {/* Right: Booking Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          {confirmation ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Test Drive Scheduled!</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your test drive request has been received. Reference ID:{' '}
                <strong>{confirmation.reference}</strong>.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div>Vehicle: <strong>{activeVehicle?.year} {activeVehicle?.make} {activeVehicle?.model}</strong></div>
                <div>Date & Time: <strong>{date} at {time}</strong></div>
                <div>Location: <strong>{location}</strong></div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/cars"
                  className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
                >
                  Explore More Cars
                </Link>
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition"
                >
                  Book Another Slot
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Book Your Test Drive Slot
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose your vehicle, convenient date, time slot, and preferred Lahore showroom.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Select Car */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Vehicle <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.make} {v.model} ({formatPKR(v.price)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Driver Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Waleed Zafar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Schedule Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="10:00 AM">10:00 AM - Morning</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM - Afternoon</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM - Evening</option>
                    <option value="06:30 PM">06:30 PM - Twilight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Main Boulevard, Gulberg III, Lahore">Gulberg III Flagship Showroom</option>
                    <option value="DHA Phase 5 Commercial, Lahore">DHA Phase 5 Hub</option>
                    <option value="Johar Town Expo Centre Road, Lahore">Johar Town Branch</option>
                    <option value="Doorstep Test Drive (Lahore Only)">Doorstep Demo (Lahore)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specific inquiries / route preferences
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Would like to test highway acceleration on Ring Road..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{isSubmitting ? 'Reserving Slot...' : 'Confirm Test Drive Appointment'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
