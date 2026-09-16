'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar','Quetta','Sialkot','Hyderabad','Other'];

export default function AuthForm({ mode }: { mode: 'signup' | 'login' }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/account';

  const [f, setF] = useState({ name: '', email: '', phone: '', city: 'Lahore', password: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const body = mode === 'signup' ? f : { email: f.email, password: f.password };
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || 'Something went wrong.'); return; }
      router.push(next);
      router.refresh();
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const input = 'w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent';

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {err && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          {err}
        </p>
      )}

      {mode === 'signup' && (
        <div>
          <label htmlFor="au-name" className="block text-xs font-bold text-slate-700 mb-1.5">Full name</label>
          <input id="au-name" required value={f.name} onChange={set('name')} className={input} placeholder="e.g. Ahmed Raza" autoComplete="name" />
        </div>
      )}

      <div>
        <label htmlFor="au-email" className="block text-xs font-bold text-slate-700 mb-1.5">Email address</label>
        <input id="au-email" type="email" required value={f.email} onChange={set('email')} className={input} placeholder="you@email.com" autoComplete="email" />
      </div>

      {mode === 'signup' && (
        <>
          <div>
            <label htmlFor="au-phone" className="block text-xs font-bold text-slate-700 mb-1.5">Mobile number</label>
            <input id="au-phone" required value={f.phone} onChange={set('phone')} className={input} placeholder="0301 2345678" autoComplete="tel" inputMode="tel" />
            <p className="text-[11px] text-slate-500 mt-1">Buyers will use this number to contact you about your ad.</p>
          </div>
          <div>
            <label htmlFor="au-city" className="block text-xs font-bold text-slate-700 mb-1.5">City</label>
            <select id="au-city" value={f.city} onChange={set('city')} className={input}>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </>
      )}

      <div>
        <label htmlFor="au-pass" className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
        <input
          id="au-pass" type="password" required value={f.password} onChange={set('password')}
          className={input} placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8}
        />
      </div>

      <button
        type="submit" disabled={busy}
        className="w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-2"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {mode === 'signup' ? 'Create account' : 'Sign in'}
      </button>

      <p className="text-xs text-slate-600 text-center pt-1">
        {mode === 'signup' ? (
          <>Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-bold text-teal-700 hover:underline">Sign in</Link></>
        ) : (
          <>New to MOTOR Pakistan? <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-teal-700 hover:underline">Create an account</Link></>
        )}
      </p>
    </form>
  );
}
