import Link from 'next/link';
import { SCENE, mediaUrl } from '@/lib/media';

const CATEGORIES = [
  { label: 'Used Cars', href: '/used-cars', image: SCENE.usedCars, caption: 'Certified pre-owned' },
  { label: 'New Cars', href: '/new-cars-pakistan', image: SCENE.newCars, caption: '2026 prices & specs' },
  { label: 'Bikes', href: '/bikes', image: SCENE.bikes, caption: 'Honda, Yamaha & more' },
  { label: 'EV & Hybrid', href: '/electric-cars-pakistan', image: SCENE.ev, caption: 'Electric & PHEV' },
  { label: 'Car Rental', href: '/rent', image: SCENE.rent, caption: 'Daily & monthly' },
  { label: 'Sell Your Car', href: '/sell', image: SCENE.sell, caption: 'Get the best price' },
];

export default function CategoryStrip() {
  return (
    <section aria-label="Browse categories" className="relative z-10 -mt-8 sm:-mt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 hover:ring-teal-500/40 hover:shadow-[0_12px_36px_rgba(15,23,42,0.14)] transition-all"
              >
                <span className="block aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={mediaUrl(c.image)}
                    alt={c.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={320}
                    height={200}
                  />
                </span>
                <span className="block px-3 py-2.5">
                  <span className="block text-[13px] font-black text-slate-900 group-hover:text-teal-700">
                    {c.label}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-0.5">{c.caption}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
