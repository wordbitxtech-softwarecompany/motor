'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Phone, Mail, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function SellCarSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFlow, setTargetFlow] = useState<'/sell/post-ad' | '/sell/help-me-sell'>('/sell/post-ad');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (flow: '/sell/post-ad' | '/sell/help-me-sell') => {
    setTargetFlow(flow);
    setError('');
    setOtpSent(false);
    setOtpCode('');
    setDemoCode('');
    setModalOpen(true);
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 9) {
      setError('Please enter a valid Pakistani mobile number (e.g. 301 2345678)');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber.startsWith('0') ? phoneNumber : `0${phoneNumber}` }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not send OTP.');
        return;
      }
      setOtpSent(true);
      if (data.demoCode) setDemoCode(data.demoCode);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber.startsWith('0') ? phoneNumber : `0${phoneNumber}`,
          code: otpCode,
          name: name.trim() || undefined,
          city: 'Lahore',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.needsProfile) {
          setError('Enter your name below, then verify again.');
        } else {
          setError(data.error || 'Verification failed.');
        }
        return;
      }
      setModalOpen(false);
      router.push(targetFlow);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section aria-labelledby="sell-h" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sell-h" className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 text-center">
            {t('sell.heading', 'Sell Your Car on MOTOR | Pak and Get the Best Price')}
          </h2>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
            <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col bg-white hover:border-slate-300 hover:shadow-sm transition-all">
              <h3 className="text-xl font-black text-slate-900">{t('sell.myself', 'Sell It Myself!')}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {[
                  t('sell.bullet1', 'Post an ad in 2 minutes'),
                  t('sell.bullet2', 'Over 20 million buyers across Pakistan'),
                  t('sell.bullet3', 'Connect directly with verified buyers'),
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleOpenModal('/sell/post-ad')}
                className="mt-6 inline-flex items-center justify-center h-12 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                {t('sell.postAd', 'Post Your Ad')}
              </button>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <span className="text-sm font-black text-slate-400">{t('sell.or', 'OR')}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all">
              <h3 className="text-xl font-black text-slate-900">{t('sell.forMe', 'Sell It For Me')}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {[
                  t('sell.bullet4', 'We handle inspection and listing'),
                  t('sell.bullet5', 'Free featured ad boost'),
                  t('sell.bullet6', 'Our team aims for the best price'),
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleOpenModal('/sell/help-me-sell')}
                className="mt-6 inline-flex items-center justify-center h-12 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {t('sell.helpMe', 'Get Help Selling')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-slate-900 mb-1">
              <Phone className="w-5 h-5 text-teal-700" />
              <h3 className="text-lg font-black tracking-tight">Continue with phone</h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">We&apos;ll send a one-time code to verify your number.</p>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-800">{error}</div>
            )}

            {!otpSent ? (
              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ahmed Raza"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pakistani mobile</label>
                  <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-slate-900">
                    <span className="px-3.5 bg-slate-100 border-r border-slate-300 text-xs font-bold text-slate-700 flex items-center shrink-0">
                      +92
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="301 2345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm focus:outline-none text-slate-900"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-4">
                {demoCode && (
                  <p className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900">
                    SMS not configured yet. Code: <strong className="tracking-widest">{demoCode}</strong>
                  </p>
                )}
                {!name.trim() && (
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm"
                  />
                )}
                <input
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                  placeholder="6-digit OTP"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm tracking-widest"
                  inputMode="numeric"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-bold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify & continue
                </button>
              </form>
            )}

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-semibold">or</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => router.push(`/signup?next=${encodeURIComponent(targetFlow)}`)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                Continue with Email & Password
              </button>
              <button
                type="button"
                onClick={() => router.push(`/login?next=${encodeURIComponent(targetFlow)}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                Existing user? Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
