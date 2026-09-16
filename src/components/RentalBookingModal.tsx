'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  ShieldCheck,
  Clock,
  MapPin,
  Car,
  User,
  Phone,
  Mail,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Info,
  CreditCard
} from 'lucide-react';
import { formatPKR } from '@/lib/utils';

export default function RentalBookingModal({
  vehicle,
  isOpen,
  onClose,
  initialPickupDate = '',
  initialReturnDate = '',
  initialPickupLocation = 'Main Boulevard, Gulberg III, Lahore',
  initialDropoffLocation = 'Main Boulevard, Gulberg III, Lahore',
}: {
  vehicle: any;
  isOpen: boolean;
  onClose: () => void;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialPickupLocation?: string;
  initialDropoffLocation?: string;
}) {
  const [step, setStep] = useState(1);

  // Form State
  const [pickupLocation, setPickupLocation] = useState(initialPickupLocation);
  const [dropoffLocation, setDropoffLocation] = useState(initialDropoffLocation);
  const [pickupDate, setPickupDate] = useState(initialPickupDate || '2026-03-28');
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [returnDate, setReturnDate] = useState(initialReturnDate || '2026-03-31');
  const [returnTime, setReturnTime] = useState('10:00 AM');

  // Extras
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['insurance']);

  // Customer Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCnic, setCustomerCnic] = useState('');
  const [notes, setNotes] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const extraOptions = [
    { id: 'insurance', name: 'Comprehensive Collision Damage Waiver (CDW)', price: 3000, desc: 'Zero financial liability for body damage' },
    { id: 'gps', name: 'Preloaded GPS Navigation & Wi-Fi Hotspot', price: 1200, desc: 'Reliable route guidance across Punjab' },
    { id: 'childSeat', name: 'ISOFIX Premium Child Safety Seat', price: 1500, desc: 'Certified comfort for infants and toddlers' },
    { id: 'addDriver', name: 'Additional Registered Driver Permission', price: 2000, desc: 'Co-driver authorization with insurance coverage' },
  ];

  // Calculate Days
  const pDate = new Date(pickupDate);
  const rDate = new Date(returnDate);
  const diffTime = Math.abs(rDate.getTime() - pDate.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 3;

  const dailyRate = vehicle.rentalDailyRate || 12000;
  const baseRentalTotal = dailyRate * diffDays;

  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const item = extraOptions.find((e) => e.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const securityDeposit = vehicle.rentalDeposit || 35000;
  const grandTotal = baseRentalTotal + extrasTotal;

  const toggleExtra = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((e) => e !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleConfirm = async () => {
    if (!customerName || !customerPhone) {
      setErrorMsg('Please enter your full name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        vehicleId: vehicle.id,
        vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        customerName,
        customerEmail,
        customerPhone,
        customerCnicPlaceholder: customerCnic || 'To be presented upon collection',
        pickupLocation,
        dropoffLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        rentalDays: diffDays,
        dailyRate,
        extras: extraOptions.filter((e) => selectedExtras.includes(e.id)).map((e) => ({ name: e.name, price: e.price })),
        extrasTotal,
        securityDeposit,
        totalAmount: grandTotal,
        notes,
      };

      const res = await fetch('/api/rental-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Booking submission failed');
      }

      setConfirmedBooking(data);
      setStep(7);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4" />
              <span>MOTOR Rental Reservation</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {step === 7 ? 'Booking Confirmed!' : `Reserve: ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators (Steps 1 to 6) */}
        {step < 7 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 sm:space-x-2 text-slate-500 font-medium">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span className="hidden sm:inline">Schedule</span>
              <span className="text-slate-300">›</span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span className="hidden sm:inline">Add-ons</span>
              <span className="text-slate-300">›</span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>3</span>
              <span className="hidden sm:inline">Customer</span>
              <span className="text-slate-300">›</span>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 4 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>4</span>
              <span className="hidden sm:inline">Review</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">
              {formatPKR(dailyRate)} / day
            </span>
          </div>
        )}

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Dates & Locations */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Step 1: Rental Duration & Locations</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pick-up Location</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Main Boulevard, Gulberg III, Lahore">Gulberg III Flagship Showroom</option>
                    <option value="DHA Phase 5 Commercial, Lahore">DHA Phase 5 Hub</option>
                    <option value="Johar Town Expo Centre Road, Lahore">Johar Town Branch</option>
                    <option value="Allama Iqbal International Airport (LHE)">Allama Iqbal Airport Terminal (LHE)</option>
                    <option value="Doorstep Delivery in Lahore (Residential / Hotel)">Doorstep Delivery (Lahore)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Drop-off Location</label>
                  <select
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Main Boulevard, Gulberg III, Lahore">Gulberg III Flagship Showroom</option>
                    <option value="DHA Phase 5 Commercial, Lahore">DHA Phase 5 Hub</option>
                    <option value="Johar Town Expo Centre Road, Lahore">Johar Town Branch</option>
                    <option value="Allama Iqbal International Airport (LHE)">Allama Iqbal Airport Terminal (LHE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pick-up Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pick-up Time</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Return Time</label>
                  <select
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-center justify-between">
                <span>Calculated Rental Period:</span>
                <span className="font-bold">{diffDays} Days ({formatPKR(baseRentalTotal)})</span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Optional Extras */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Step 2: Protection Packages & Extras</h4>
              <div className="space-y-2.5">
                {extraOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedExtras.includes(opt.id)
                        ? 'border-indigo-600 bg-indigo-50/40'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.includes(opt.id)}
                        onChange={() => toggleExtra(opt.id)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{opt.name}</p>
                        <p className="text-[11px] text-slate-500">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 shrink-0">
                      +{formatPKR(opt.price)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                >
                  <span>Customer Info</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Step 3: Driver & Contact Information</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mansoor"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
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
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="tariq@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CNIC / Passport (Placeholder for Demo)
                  </label>
                  <input
                    type="text"
                    placeholder="35202-*******-1 (Physical verified at collection)"
                    value={customerCnic}
                    onChange={(e) => setCustomerCnic(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Notes / Flight Arrival Number</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Flight PK-302 arriving at 9:30 AM, need airport curb delivery"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!customerName || !customerPhone) {
                      setErrorMsg('Name and phone are required.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(4);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
                >
                  <span>Review Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Step 4: Rental Summary & Final Confirmation</h4>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-900">Vehicle</span>
                  <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Duration</span>
                  <span>{diffDays} Days ({pickupDate} to {returnDate})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Pick-up</span>
                  <span className="text-right truncate max-w-[240px]">{pickupLocation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Base Rental ({diffDays}d × {formatPKR(dailyRate)})</span>
                  <span className="font-semibold">{formatPKR(baseRentalTotal)}</span>
                </div>
                {extrasTotal > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Selected Protection & Extras</span>
                    <span className="font-semibold">{formatPKR(extrasTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                  <span>Refundable Security Deposit:</span>
                  <span className="font-bold">{formatPKR(securityDeposit)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                  <span>Estimated Total (Rental + Extras):</span>
                  <span className="text-indigo-600 text-base">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center space-x-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming...' : 'Confirm Rental Booking'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Professional Confirmation Screen */}
          {step === 7 && confirmedBooking && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Reservation Confirmed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Booking Reference: {confirmedBooking.bookingReference}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{customerName}</strong>! Your rental reservation for the{' '}
                  <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong> has been logged into the MOTOR dispatch system.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pick-up:</span>
                  <span className="font-semibold">{pickupDate} at {pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Return:</span>
                  <span className="font-semibold">{returnDate} at {returnTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold truncate">{pickupLocation}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold">
                  <span>Payable at Handover:</span>
                  <span className="text-indigo-600">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`/contact?text=${encodeURIComponent(
                    `Hello MOTOR, I just booked rental vehicle ${vehicle.year} ${vehicle.make} ${vehicle.model} with Booking Reference ${confirmedBooking.bookingReference}. Please verify dispatch.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5"
                >
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
