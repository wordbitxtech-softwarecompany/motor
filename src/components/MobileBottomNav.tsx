'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, KeyRound, CalendarCheck, MessageSquare } from 'lucide-react';
import { enquiryLink } from '@/lib/contact';

export default function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-4 gap-1 text-center">
        <Link
          href="/cars"
          className={`flex flex-col items-center justify-center py-1 rounded-lg ${
            pathname.startsWith('/cars') || pathname === '/' ? 'text-teal-700 font-bold' : 'text-slate-600'
          }`}
          aria-label="Search cars"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold">Search</span>
        </Link>

        <Link
          href="/rent"
          className={`flex flex-col items-center justify-center py-1 rounded-lg ${
            pathname.startsWith('/rent') ? 'text-teal-700 font-bold' : 'text-slate-600'
          }`}
          aria-label="Rent a car"
        >
          <KeyRound className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold">Rent</span>
        </Link>

        <Link
          href="/test-drive"
          className={`flex flex-col items-center justify-center py-1 rounded-lg ${
            pathname === '/test-drive' ? 'text-teal-700 font-bold' : 'text-slate-600'
          }`}
          aria-label="Book a test drive"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold">Book</span>
        </Link>

        <a
          href={enquiryLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 rounded-lg text-emerald-600"
          aria-label="WhatsApp us"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
