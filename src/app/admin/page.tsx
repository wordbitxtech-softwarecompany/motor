import React from 'react';
import { Metadata } from 'next';
import { getAllVehicles, getRentalBookings, getTestDriveRequests, getLeads, getOffers } from '@/lib/data';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { desc } from 'drizzle-orm';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dealer Portal & CRM Admin | MOTOR',
  description: 'MOTOR dealer operations dashboard, inventory management, rental dispatch and sales lead CRM pipeline.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const [vehicles, bookings, testDrives, leads, offers] = await Promise.all([
    getAllVehicles(),
    getRentalBookings(),
    getTestDriveRequests(),
    getLeads(),
    getOffers(),
  ]);

  let ads: any[] = [];
  try {
    await ensureDbInitialized();
    ads = await db.select().from(listings).orderBy(desc(listings.id));
  } catch { /* listings table unavailable */ }

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
