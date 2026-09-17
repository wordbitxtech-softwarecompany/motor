import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAllVehicles, getRentalBookings, getTestDriveRequests, getLeads, getOffers } from '@/lib/data';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Portal | MOTOR | Pak',
  description: 'MOTOR | Pak dealer operations — inventory, seller ads, rentals and CRM.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    redirect('/login?next=/admin');
  }

  const [vehicles, bookings, testDrives, leads, offers] = await Promise.all([
    getAllVehicles(),
    getRentalBookings(),
    getTestDriveRequests(),
    getLeads(),
    getOffers(),
  ]);

  let ads: unknown[] = [];
  try {
    await ensureDbInitialized();
    ads = await db.select().from(listings).orderBy(desc(listings.id));
  } catch {
    /* listings table unavailable */
  }

  return (
    <AdminDashboard
      initialVehicles={vehicles}
      initialBookings={bookings}
      initialTestDrives={testDrives}
      initialLeads={leads}
      initialOffers={offers}
      initialAds={JSON.parse(JSON.stringify(ads))}
    />
  );
}
