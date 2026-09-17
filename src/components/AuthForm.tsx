'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, Phone, Mail } from 'lucide-react';

const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Hyderabad',
  'Other',
];

type Tab = 'phone' | 'email';

export default function AuthForm({ mode }: { mode: 'signup' | 'login' }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';
  const prefillPhone = params.get('phone') || '';

  const [tab, setTab] = useState<Tab>(prefillPhone ? 'phone' : mode === 'login' ? 'email' : 'phone');
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: prefillPhone,
    city: 'Lahore',
    password: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [demoCode, setDemoCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function sendOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setErr('');
    setDemoCode('');
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: f.phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Could not send OTP.');
        return;
      }
      setOtpSent(true);
      if (data.demoCode) setDemoCode(data.demoCode);
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: f.phone,
          code: otpCode,
          name: f.name,
          city: f.city,
          email: f.email || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Verification failed.');
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const body = mode === 'signup' ? f : { email: f.email, password: f.password };
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Something went wrong.');
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const input =
    'w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100">
        <button
          type="button"
          onClick={() => {
            setTab('phone');
            setErr('');
          }}
          className={`h-10 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1.5 ${
            tab === 'phone' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Phone className="w-3.5 h-3.5" /> Phone OTP
        </button>
        <button
          type="button"
          onClick={() => {
            setTab('email');
            setErr('');
          }}
          className={`h-10 rounded-lg text-xs font-bold inline-flex items-center justify-center gap-1.5 ${
            tab === 'email' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </button>
      </div>

      {err && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-800"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          {err}
        </p>
      )}

      {tab === 'phone' ? (
        !otpSent ? (
          <form onSubmit={sendOtp} className="space-y-4" noValidate>
            {mode === 'signup' && (
              <div>
                <label htmlFor="au-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  id="au-name"
                  required
                  value={f.name}
                  onChange={set('name')}
                  className={input}
                  placeholder="e.g. Ahmed Raza"
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label htmlFor="au-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                Pakistani mobile
              </label>
              <input
                id="au-phone"
                required
                value={f.phone}
                onChange={set('phone')}
                className={input}
                placeholder="0301 2345678"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            {mode === 'signup' && (
              <div>
                <label htmlFor="au-city" className="block text-xs font-bold text-slate-700 mb-1.5">
                  City
                </label>
                <select id="au-city" value={f.city} onChange={set('city')} className={input}>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4" noValidate>
            {demoCode && (
              <p className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-xs text-amber-900">
                SMS gateway not linked yet. Your code is <strong className="tracking-widest">{demoCode}</strong>
                . Add Twilio keys on the server to deliver real SMS.
              </p>
            )}
            <div>
              <label htmlFor="au-otp" className="block text-xs font-bold text-slate-700 mb-1.5">
                Enter OTP sent to {f.phone}
              </label>
              <input
                id="au-otp"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                className={input}
                placeholder="6-digit code"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
              />
            </div>
            {mode === 'signup' && !f.name && (
              <div>
                <label htmlFor="au-name2" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full name
                </label>
                <input id="au-name2" required value={f.name} onChange={set('name')} className={input} />
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'signup' ? 'Verify & create account' : 'Verify & sign in'}
            </button>
            <button
              type="button"
              onClick={() => sendOtp()}
              disabled={busy}
              className="w-full text-xs font-semibold text-teal-700 hover:underline"
            >
              Resend OTP
            </button>
          </form>
        )
      ) : (
        <form onSubmit={submitEmail} className="space-y-4" noValidate>
          {mode === 'signup' && (
            <div>
              <label htmlFor="em-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                Full name
              </label>
              <input id="em-name" required value={f.name} onChange={set('name')} className={input} autoComplete="name" />
            </div>
          )}
          <div>
            <label htmlFor="em-email" className="block text-xs font-bold text-slate-700 mb-1.5">
              Email address
            </label>
            <input
              id="em-email"
              type="email"
              required
              value={f.email}
              onChange={set('email')}
              className={input}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="em-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile number
                </label>
                <input
                  id="em-phone"
                  required
                  value={f.phone}
                  onChange={set('phone')}
                  className={input}
                  placeholder="0301 2345678"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="em-city" className="block text-xs font-bold text-slate-700 mb-1.5">
                  City
                </label>
                <select id="em-city" value={f.city} onChange={set('city')} className={input}>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label htmlFor="em-pass" className="block text-xs font-bold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="em-pass"
              type="password"
              required
              value={f.password}
              onChange={set('password')}
              className={input}
              placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              minLength={8}
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>
      )}

      <p className="text-xs text-slate-600 text-center pt-1">
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-bold text-teal-700 hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to MOTOR | Pak?{' '}
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-teal-700 hover:underline">
              Create an account
            </Link>
          </>
        )}
      </p>

      {next.startsWith('/sell/') && (
        <p className="text-center">
          <Link
            href={next}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 hover:underline"
          >
            Skip — continue without account
          </Link>
        </p>
      )}
    </div>
  );
}
