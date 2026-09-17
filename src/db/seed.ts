import { db } from './index';
import { vehicles, offers, reviews, leads, rentalBookings, testDriveRequests } from './schema';
import { SEED_VEHICLES, SEED_OFFERS, SEED_REVIEWS, SEED_LEADS, SEED_BOOKINGS, SEED_TEST_DRIVES } from './seed-data';
import { eq, sql } from 'drizzle-orm';

const LEGACY_SLUGS = [
  'toyota-corolla-altis-grande-2025',
  'honda-civic-rs-turbo-2025',
  'toyota-corolla-cross-hybrid-2025',
  'mg-hs-super-hybrid-phev-2025',
  'deepal-s07-reev-2025',
  'avatr-11-luxury-ev-2025',
  'changan-lumin-ev-2025',
  'omoda-c7-phev-2026',
  'jaecoo-j8-phev-2026',
  'deepal-hunter-reev-pickup-2026',
  'mg-im5-luxury-ev-2026',
  'toyota-fortuner-legender-2025'
];

export async function ensureAdminAccount() {
  const { users } = await import('./schema');
  const { hashPassword } = await import('@/lib/auth');
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@motor.pk').trim().toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD || 'MotorAdmin@2026';
  const adminHash = hashPassword(adminPass);
  const [adminRow] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);
  if (!adminRow) {
    await db.insert(users).values({
      name: 'MOTOR Admin',
      email: adminEmail,
      phone: '+92 300 0000001',
      city: 'Lahore',
      passwordHash: adminHash,
      role: 'admin',
      status: 'active',
    });
    console.log(`Admin account ready: ${adminEmail}`);
    return { email: adminEmail, created: true };
  }
  await db
    .update(users)
    .set({
      passwordHash: adminHash,
      role: 'admin',
      status: 'active',
    })
    .where(eq(users.id, adminRow.id));
  console.log(`Admin credentials synced: ${adminEmail}`);
  return { email: adminEmail, created: false };
}

export async function seedDatabase() {
  try {
    // Ensure a default admin exists for /admin (Seller Ads + Inventory)
    await ensureAdminAccount();

    const rows = await db.select({ slug: vehicles.slug }).from(vehicles);
    const existingSlugs = rows.map((r) => r.slug);

    const hasLegacyData = existingSlugs.some((s) => LEGACY_SLUGS.includes(s));
    const isFresh = existingSlugs.length === 0;
    const missingNew = !SEED_VEHICLES.every((v) => existingSlugs.includes(v.slug));

    if (hasLegacyData) {
      console.log('Refreshing fleet with 2026 Pakistan marketplace data...');
      // Wipe demo tables and reseed cleanly
      await db.delete(rentalBookings);
      await db.delete(testDriveRequests);
      await db.delete(leads);
      await db.delete(offers);
      await db.delete(reviews);
      await db.delete(vehicles);

      for (const v of SEED_VEHICLES) await db.insert(vehicles).values(v);
      for (const o of SEED_OFFERS) await db.insert(offers).values(o);
      for (const r of SEED_REVIEWS) await db.insert(reviews).values(r);
      for (const l of SEED_LEADS) await db.insert(leads).values(l);
      for (const b of SEED_BOOKINGS) await db.insert(rentalBookings).values(b);
      for (const t of SEED_TEST_DRIVES) await db.insert(testDriveRequests).values(t);
      console.log('Fleet refresh complete.');
      return;
    }

    if (isFresh) {
      console.log('Seeding initial Pakistan automotive fleet...');
      for (const v of SEED_VEHICLES) await db.insert(vehicles).values(v);
      for (const o of SEED_OFFERS) await db.insert(offers).values(o);
      for (const r of SEED_REVIEWS) await db.insert(reviews).values(r);
      for (const l of SEED_LEADS) await db.insert(leads).values(l);
      for (const b of SEED_BOOKINGS) await db.insert(rentalBookings).values(b);
      for (const t of SEED_TEST_DRIVES) await db.insert(testDriveRequests).values(t);
      console.log('Database seeded successfully.');
      return;
    }

    if (missingNew) {
      for (const v of SEED_VEHICLES) {
        const [existing] = await db.select().from(vehicles).where(eq(vehicles.slug, v.slug)).limit(1);
        if (!existing) await db.insert(vehicles).values(v);
      }
      const existingOffers = await db.select({ count: sql<number>`count(*)` }).from(offers);
      if (Number(existingOffers[0]?.count || 0) === 0) {
        for (const o of SEED_OFFERS) await db.insert(offers).values(o);
      }
    }
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}
