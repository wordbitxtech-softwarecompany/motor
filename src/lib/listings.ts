import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { FALLBACK_VEHICLE } from '@/lib/media';

export type PublicListing = {
  id: number;
  reference: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  city: string;
  bodyType: string | null;
  exteriorColor: string | null;
  description: string | null;
  features: string[];
  images: string[];
  sellerName: string;
  sellerPhone: string;
  vehicleKind: string;
  createdAt: Date;
  image: string;
  href: string;
};

export async function getApprovedListings(limit = 24): Promise<PublicListing[]> {
  try {
    await ensureDbInitialized();
    const rows = await db
      .select()
      .from(listings)
      .where(eq(listings.status, 'approved'))
      .orderBy(desc(listings.id))
      .limit(limit);

    return rows.map((r) => ({
      id: r.id,
      reference: r.reference,
      make: r.make,
      model: r.model,
      variant: r.variant,
      year: r.year,
      price: r.price,
      mileage: r.mileage,
      fuelType: r.fuelType,
      transmission: r.transmission,
      city: r.city,
      bodyType: r.bodyType,
      exteriorColor: r.exteriorColor,
      description: r.description,
      features: r.features || [],
      images: r.images || [],
      sellerName: r.sellerName,
      sellerPhone: r.sellerPhone,
      vehicleKind: r.vehicleKind,
      createdAt: r.createdAt,
      image: r.images?.[0] || FALLBACK_VEHICLE,
      href: `/used-cars/${r.reference}`,
    }));
  } catch (e) {
    console.error('getApprovedListings failed', e);
    return [];
  }
}

export async function getListingByReference(reference: string) {
  try {
    await ensureDbInitialized();
    const [row] = await db
      .select()
      .from(listings)
      .where(eq(listings.reference, reference))
      .limit(1);
    if (!row || row.status !== 'approved') return null;
    return row;
  } catch {
    return null;
  }
}
