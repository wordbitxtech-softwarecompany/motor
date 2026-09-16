import { db } from '@/db';
import { vehicles, rentalBookings, testDriveRequests, leads, offers, reviews } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { eq, desc, asc, and, gte, lte, or, like, sql } from 'drizzle-orm';
import { SEED_VEHICLES, SEED_OFFERS, SEED_REVIEWS, SEED_BOOKINGS, SEED_TEST_DRIVES, SEED_LEADS } from '@/db/seed-data';
import { resolveImage, resolveGallery } from './media';

/** Normalise stored image paths so legacy rows always render. */
function fixVehicle<T extends { mainImage?: string | null; gallery?: string[] | null }>(v: T): T {
  return { ...v, mainImage: resolveImage(v.mainImage), gallery: resolveGallery(v.gallery) };
}
function fixOffer<T extends { imageUrl?: string | null }>(o: T): T {
  return { ...o, imageUrl: resolveImage(o.imageUrl) };
}

export async function getAllVehicles() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(vehicles).orderBy(desc(vehicles.id));
    if (rows && rows.length > 0) return rows.map(fixVehicle);
  } catch (err) {
    console.error('Error fetching all vehicles:', err);
  }
  return SEED_VEHICLES.map((v, idx) => fixVehicle({ ...v, id: idx + 1, createdAt: new Date(), updatedAt: new Date() }));
}

export async function getVehicleBySlug(slug: string) {
  try {
    await ensureDbInitialized();
    const [row] = await db.select().from(vehicles).where(eq(vehicles.slug, slug)).limit(1);
    if (row) return fixVehicle(row);
  } catch (err) {
    console.error(`Error fetching vehicle by slug (${slug}):`, err);
  }
  const fallback = SEED_VEHICLES.find(v => v.slug === slug);
  if (fallback) {
    return fixVehicle({ ...fallback, id: 1, createdAt: new Date(), updatedAt: new Date() });
  }
  return null;
}

export async function getRentalVehicles() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(vehicles).where(eq(vehicles.isRental, true)).orderBy(asc(vehicles.rentalDailyRate));
    if (rows && rows.length > 0) return rows.map(fixVehicle);
  } catch (err) {
    console.error('Error fetching rental vehicles:', err);
  }
  return SEED_VEHICLES.filter(v => v.isRental).map((v, idx) => fixVehicle({ ...v, id: idx + 1, createdAt: new Date(), updatedAt: new Date() }));
}

export async function getFeaturedVehicles() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(vehicles).where(eq(vehicles.isFeatured, true)).limit(6);
    if (rows && rows.length > 0) return rows.map(fixVehicle);
  } catch (err) {
    console.error('Error fetching featured vehicles:', err);
  }
  return SEED_VEHICLES.filter(v => v.isFeatured).slice(0, 6).map((v, idx) => fixVehicle({ ...v, id: idx + 1, createdAt: new Date(), updatedAt: new Date() }));
}

export async function getOffers() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(offers).where(eq(offers.isActive, true));
    if (rows && rows.length > 0) return rows.map(fixOffer);
  } catch (err) {
    console.error('Error fetching offers:', err);
  }
  return SEED_OFFERS.map((o, idx) => fixOffer({ ...o, id: idx + 1 }));
}

export async function getReviews() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(reviews).orderBy(desc(reviews.id));
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    console.error('Error fetching reviews:', err);
  }
  return SEED_REVIEWS.map((r, idx) => ({ ...r, id: idx + 1 }));
}

export async function getRentalBookings() {
  try {
    await ensureDbInitialized();
    return await db.select().from(rentalBookings).orderBy(desc(rentalBookings.id));
  } catch (err) {
    console.error('Error fetching rental bookings:', err);
    return SEED_BOOKINGS.map((b, idx) => ({ ...b, id: idx + 1, createdAt: new Date() }));
  }
}

export async function getTestDriveRequests() {
  try {
    await ensureDbInitialized();
    return await db.select().from(testDriveRequests).orderBy(desc(testDriveRequests.id));
  } catch (err) {
    console.error('Error fetching test drive requests:', err);
    return SEED_TEST_DRIVES.map((t, idx) => ({ ...t, id: idx + 1, createdAt: new Date() }));
  }
}

export async function getLeads() {
  try {
    await ensureDbInitialized();
    return await db.select().from(leads).orderBy(desc(leads.id));
  } catch (err) {
    console.error('Error fetching leads:', err);
    return SEED_LEADS.map((l, idx) => ({ ...l, id: idx + 1, valuationDetails: null, createdAt: new Date() }));
  }
}
