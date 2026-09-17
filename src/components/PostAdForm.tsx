'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Loader2, AlertCircle, CheckCircle2, Upload, X, Camera } from 'lucide-react';
import { BRANDS, BIKE_BRANDS } from '@/lib/brands-data';

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar','Quetta','Sialkot','Hyderabad','Other'];
const FUELS = ['Petrol','Diesel','Hybrid','Plug-in Hybrid','Electric','CNG','LPG'];
const TRANS = ['Manual','Automatic','CVT','AGS / AMT'];
const BODIES = ['Sedan','Hatchback','SUV','Crossover','MPV','Pickup','Van','Coupe'];
const FEATURES = ['Air Conditioning','Power Steering','Power Windows','ABS','Airbags','Alloy Rims','Rear Camera','Navigation','Sunroof','Cruise Control','Keyless Entry','Push Start','Leather Seats','Touchscreen'];

const MAX_IMAGES = 6;
const MAX_BYTES = 1_500_000;

export default function PostAdForm({
  listingType = 'self',
  userCity = 'Lahore',
  signedIn = false,
  prefill,
}: {
  listingType?: 'self' | 'assisted';
  userCity?: string;
  signedIn?: boolean;
  prefill?: { name?: string; phone?: string; email?: string };
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<'car' | 'bike'>('car');
  const [seller, setSeller] = useState({
    name: prefill?.name || '',
    phone: prefill?.phone || '',
    email: prefill?.email || '',
  });
  const [f, setF] = useState({
    make: '', model: '', variant: '', year: String(new Date().getFullYear() - 2),
    price: '', mileage: '', fuelType: 'Petrol', transmission: 'Manual',
    engineCapacity: '', bodyType: 'Sedan', exteriorColor: '', registeredIn: '',
    city: userCity, description: '',
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState<{ reference: string } | null>(null);

  const brandList = kind === 'car' ? BRANDS : BIKE_BRANDS;
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const setSellerField = (k: keyof typeof seller) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSeller((p) => ({ ...p, [k]: e.target.value }));

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, MAX_IMAGES - images.length);
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      if (file.size > MAX_BYTES) { setErr(`"${file.name}" is larger than 1.5 MB. Please choose a smaller photo.`); return; }
      const reader = new FileReader();
      reader.onload = () => setImages((p) => (p.length >= MAX_IMAGES ? p : [...p, String(reader.result)]));
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = '';
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          listingType,
          vehicleKind: kind,
          features,
          images,
          sellerName: seller.name,
          sellerPhone: seller.phone,
          sellerEmail: seller.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || 'Could not submit your ad.');
        return;
      }
      setDone({ reference: data.reference });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const input = 'w-full h-11 px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent';
  const label = 'block text-xs font-bold text-slate-700 mb-1.5';

  if (done) {
    return (
      <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center">
        <span className="inline-flex w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 items-center justify-center">
          <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-xl font-black text-slate-900">Ad submitted for review</h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your reference is <strong className="text-slate-900">{done.reference}</strong>. Save it — our team
          reviews every ad before it goes live (usually within a few hours).
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {signedIn ? (
            <Link href="/account" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">
              View my ads
            </Link>
          ) : (
            <Link href={`/signup?next=${encodeURIComponent('/account')}`} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">
              Create account (optional)
            </Link>
          )}
          <Link href="/used-cars" className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors">
            Browse used cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      {err && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" /> {err}
        </p>
      )}

      {/* Contact — required for guests; shown (editable) for signed-in too */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Your contact</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pa-sname" className={label}>Full name *</label>
            <input id="pa-sname" required value={seller.name} onChange={setSellerField('name')} className={input} placeholder="Ahmed Raza" autoComplete="name" />
          </div>
          <div>
            <label htmlFor="pa-sphone" className={label}>Mobile *</label>
            <input id="pa-sphone" required value={seller.phone} onChange={setSellerField('phone')} className={input} placeholder="0301 2345678" autoComplete="tel" inputMode="tel" />
          </div>
          <div>
            <label htmlFor="pa-semail" className={label}>Email</label>
            <input id="pa-semail" type="email" value={seller.email} onChange={setSellerField('email')} className={input} placeholder="optional" autoComplete="email" />
          </div>
        </div>
        {!signedIn && (
          <p className="text-[11px] text-slate-500">
            Buyers and our team will use this number. Posting does not require an account — you can sign up later from the header.
          </p>
        )}
      </fieldset>

      {/* Vehicle type */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Vehicle type</legend>
        <div className="flex gap-2 mt-1">
          {(['car', 'bike'] as const).map((k) => (
            <button
              key={k} type="button" onClick={() => { setKind(k); setF((p) => ({ ...p, make: '' })); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                kind === k ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {k === 'car' ? 'Car' : 'Bike'}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Vehicle details */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Vehicle details</legend>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pa-make" className={label}>Make *</label>
            <select id="pa-make" required value={f.make} onChange={set('make')} className={input}>
              <option value="">Select make</option>
              {brandList.map((b) => <option key={b.slug} value={b.name}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="pa-model" className={label}>Model *</label>
            <input id="pa-model" required value={f.model} onChange={set('model')} className={input} placeholder="e.g. Corolla" />
          </div>
          <div>
            <label htmlFor="pa-variant" className={label}>Variant</label>
            <input id="pa-variant" value={f.variant} onChange={set('variant')} className={input} placeholder="e.g. Altis Grande 1.8" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="pa-year" className={label}>Year *</label>
            <input id="pa-year" type="number" required value={f.year} onChange={set('year')} className={input} min={1980} max={new Date().getFullYear() + 1} />
          </div>
          <div>
            <label htmlFor="pa-price" className={label}>Price (PKR) *</label>
            <input id="pa-price" type="number" required value={f.price} onChange={set('price')} className={input} placeholder="4500000" min={10000} />
          </div>
          <div>
            <label htmlFor="pa-mileage" className={label}>Mileage (km) *</label>
            <input id="pa-mileage" type="number" required value={f.mileage} onChange={set('mileage')} className={input} placeholder="45000" min={0} />
          </div>
          <div>
            <label htmlFor="pa-city" className={label}>City *</label>
            <select id="pa-city" required value={f.city} onChange={set('city')} className={input}>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="pa-fuel" className={label}>Fuel type *</label>
            <select id="pa-fuel" required value={f.fuelType} onChange={set('fuelType')} className={input}>
              {FUELS.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="pa-trans" className={label}>Transmission *</label>
            <select id="pa-trans" required value={f.transmission} onChange={set('transmission')} className={input}>
              {TRANS.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          {kind === 'car' && (
            <div>
              <label htmlFor="pa-body" className={label}>Body type</label>
              <select id="pa-body" value={f.bodyType} onChange={set('bodyType')} className={input}>
                {BODIES.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="pa-engine" className={label}>Engine</label>
            <input id="pa-engine" value={f.engineCapacity} onChange={set('engineCapacity')} className={input} placeholder="1300 cc" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pa-colour" className={label}>Colour</label>
            <input id="pa-colour" value={f.exteriorColor} onChange={set('exteriorColor')} className={input} placeholder="White" />
          </div>
          <div>
            <label htmlFor="pa-reg" className={label}>Registered in</label>
            <input id="pa-reg" value={f.registeredIn} onChange={set('registeredIn')} className={input} placeholder="Lahore" />
          </div>
        </div>
      </fieldset>

      {/* Features */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Features</legend>
        <div className="flex flex-wrap gap-2 mt-1">
          {FEATURES.map((x) => {
            const on = features.includes(x);
            return (
              <button
                key={x} type="button"
                onClick={() => setFeatures((p) => (on ? p.filter((i) => i !== x) : [...p, x]))}
                aria-pressed={on}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  on ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                }`}
              >
                {x}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Photos */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Photos</legend>
        <p className="text-xs text-slate-500 mb-3">
          Add up to {MAX_IMAGES} clear photos of your own vehicle (max 1.5 MB each). Ads with photos get far more enquiries.
        </p>

        {images.length > 0 && (
          <ul className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            {images.map((src, i) => (
              <li key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200">
                <img src={src} alt={`Uploaded vehicle photo ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button" onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                  aria-label={`Remove photo ${i + 1}`}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-900/85 text-white flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {images.length < MAX_IMAGES && (
          <label className="flex flex-col items-center justify-center gap-2 h-28 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-500 cursor-pointer transition-colors">
            <Upload className="w-5 h-5 text-slate-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-600">Click to add photos</span>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} className="sr-only" />
          </label>
        )}
      </fieldset>

      {/* Description */}
      <fieldset className="rounded-2xl bg-white border border-slate-200 p-5">
        <legend className="px-2 text-xs font-black uppercase tracking-wide text-slate-500">Description</legend>
        <label htmlFor="pa-desc" className="sr-only">Description</label>
        <textarea
          id="pa-desc" rows={5} value={f.description} onChange={set('description')} maxLength={2000}
          className="w-full p-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Condition, service history, ownership, any known faults. Be honest — accurate ads sell faster."
        />
        <p className="text-[11px] text-slate-400 mt-1">{f.description.length}/2000</p>
      </fieldset>

      <p className="flex items-start gap-2 rounded-xl bg-slate-100 border border-slate-200 px-4 py-3 text-xs text-slate-600">
        <Camera className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" aria-hidden="true" />
        Only upload photos you have taken yourself. Every ad is reviewed by our team before it is published.
      </p>

      <button
        type="submit" disabled={busy}
        className="w-full h-12 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-700 disabled:opacity-60 transition-colors inline-flex items-center justify-center gap-2"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        Submit ad for review
      </button>
    </form>
  );
}
