'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, X, Phone, Mail } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function SellCarSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFlow, setTargetFlow] = useState<'/sell/post-ad' | '/sell/help-me-sell'>('/sell/post-ad');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (flow: '/sell/post-ad' | '/sell/help-me-sell') => {
    setTargetFlow(flow);
    setError('');
    setModalOpen(true);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 9) {
      setError('Please enter a valid Pakistani mobile number (e.g. 301 2345678)');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Auto-signup/login with phone
      const cleanPhone = phoneNumber.replace(/\s+/g, '');
      const autoEmail = `user${cleanPhone.slice(-7)}@motor.pk`;
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || `User ${cleanPhone.slice(-4)}`,
          email: autoEmail,
          phone: `0${cleanPhone.replace(/^(\+92|92|0)/, '')}`,
          city: city,
          password: `PakMotor@${cleanPhone.slice(-4)}`,
        }),
      });
      const data = await res.json();
      if (!res.ok && data.error && !data.error.includes('already exists')) {
        setError(data.error);
        setLoading(false);
        return;
      }
      if (data.error && data.error.includes('already exists')) {
        // Try to login directly with standard credentials
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: autoEmail,
            password: `PakMotor@${cleanPhone.slice(-4)}`,
          }),
        });
        if (!loginRes.ok) {
          // Redirect to full signup page with this prefilled
          router.push(`/signup?phone=${encodeURIComponent(phoneNumber)}&next=${encodeURIComponent(targetFlow)}`);
          return;
        }
      }
      setModalOpen(false);
      router.push(targetFlow);
      router.refresh();
    } catch {
      router.push(`/signup?phone=${encodeURIComponent(phoneNumber)}&next=${encodeURIComponent(targetFlow)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section aria-labelledby="sell-h" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="sell-h" className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 text-center">
            {t('sell.heading', 'Sell Your Car on MOTOR Pakistan and Get the Best Price')}
          </h2>

          <div className="mt-9 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
            {/* Sell it myself */}
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

            {/* Sell it for me */}
            <div className="rounded-2xl border border-slate-200 p-6 h-full flex flex-col bg-white hover:border-slate-300 hover:shadow-sm transition-all">
              <h3 className="text-xl font-black text-slate-900">{t('sell.forMe', 'Sell It For Me')}</h3>
              <ul className="mt-4 space-y-2.5 flex-1">
                {[
                  t('sell.bullet4', 'Sell your car without hassle'),
                  t('sell.bullet5', 'Free Inspection & Featured Ad placement'),
                  t('sell.bullet6', 'Maximize offers with dedicated sales team'),
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
                className="mt-6 inline-flex items-center justify-center h-12 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                {t('sell.helpMe', 'Help Me Sell My Car!')}
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            {t('sell.footnote', 'Every ad is reviewed by our administration before being published to protect buyers and sellers.')}
          </p>
        </div>
      </section>

      {/* PakWheels-Style Sign Up / Quick Alerts Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon + Illustration */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {targetFlow === '/sell/post-ad' ? 'Sign In / Register to Post Ad' : 'Get Help Selling Your Car'}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Create alerts quickly and get notified when buyers contact you.
              </p>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {error}
              </div>
            )}

            {/* Mobile Number Form */}
            {authMethod === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pakistani Mobile Number
                  </label>
                  <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                    <span className="px-3.5 bg-slate-100 border-r border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
                      <span>🇵🇰</span>
                      <span>+92</span>
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="301 2345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm focus:outline-none text-slate-900 placeholder-slate-400 font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? 'Verifying...' : 'Continue with Mobile Number'}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
                >
                  Continue with Email
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

            {/* Social / Email alternatives */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => router.push(`/signup?next=${encodeURIComponent(targetFlow)}`)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Continue with Email & Password</span>
              </button>
              <button
                type="button"
                onClick={() => router.push(`/login?next=${encodeURIComponent(targetFlow)}`)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Existing User? Sign In Here</span>
              </button>
            </div>

            <p className="mt-5 text-center text-[11px] text-slate-400 leading-relaxed">
              By continuing you agree to MOTOR Pakistan&apos;s{' '}
              <a href="/terms" className="underline hover:text-slate-600">Terms of Service</a> &amp;{' '}
              <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
