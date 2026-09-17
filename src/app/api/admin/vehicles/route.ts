import { NextResponse } from 'next/server';
import { db } from '@/db';
import { vehicles } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { eq, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(vehicles).orderBy(desc(vehicles.id));
    return NextResponse.json({ success: true, vehicles: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });

  try {
    await ensureDbInitialized();
    const body = await req.json();

    const slug =
      body.slug ||
      `${body.make}-${body.model}-${body.year}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const [newVehicle] = await db
      .insert(vehicles)
      .values({
        slug,
        make: body.make,
        model: body.model,
        year: Number(body.year),
        price: Number(body.price) || 0,
        priceLabel: body.priceLabel || 'Ex-Factory',
        monthlyEstimate: Number(body.monthlyEstimate) || Math.round((Number(body.price) || 0) * 0.019),
        mileage: Number(body.mileage) || 0,
        powertrain: body.powertrain || 'Petrol',
        availabilityStatus: body.availabilityStatus || 'Dealer Stock',
        transmission: body.transmission || 'Automatic',
        fuelType: body.fuelType || body.powertrain || 'Petrol',
        bodyType: body.bodyType || 'Sedan',
        engineCapacity: body.engineCapacity || '1.8L',
        driveType: body.driveType || 'FWD',
        condition: body.condition || 'Certified Pre-Owned',
        exteriorColor: body.exteriorColor || 'Pearl White',
        interiorColor: body.interiorColor || 'Black',
        doors: Number(body.doors) || 4,
        seats: Number(body.seats) || 5,
        location: body.location || 'Main Boulevard, Gulberg III, Lahore',
        status: body.status || 'Available',
        isFeatured: Boolean(body.isFeatured),
        isRental: Boolean(body.isRental),
        isNewArrival: Boolean(body.isNewArrival),
        isGreatValue: Boolean(body.isGreatValue),
        rentalDailyRate: body.rentalDailyRate ? Number(body.rentalDailyRate) : null,
        rentalWeeklyRate: body.rentalWeeklyRate ? Number(body.rentalWeeklyRate) : null,
        rentalDeposit: body.rentalDeposit ? Number(body.rentalDeposit) : null,
        rentalCategory: body.rentalCategory || 'Sedan',
        batteryCapacity: body.batteryCapacity || null,
        electricRange: body.electricRange || null,
        combinedRange: body.combinedRange || null,
        motorPower: body.motorPower || null,
        torque: body.torque || null,
        chargingType: body.chargingType || null,
        acCharging: body.acCharging || null,
        dcFastCharging: body.dcFastCharging || null,
        v2l: Boolean(body.v2l),
        batteryWarranty: body.batteryWarranty || null,
        vehicleWarranty: body.vehicleWarranty || '3 Years / 100,000 km',
        mainImage:
          body.mainImage ||
          'https://images.pexels.com/photos/34453317/pexels-photo-34453317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=750&w=1200',
        gallery:
          body.gallery && Array.isArray(body.gallery)
            ? body.gallery
            : [
                body.mainImage ||
                  'https://images.pexels.com/photos/34453317/pexels-photo-34453317.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=750&w=1200',
              ],
        features:
          body.features && Array.isArray(body.features)
            ? body.features
            : ['Airbags', 'ABS', 'Reverse Camera', 'Smart Key'],
        description: body.description || 'Premium inspected vehicle available at MOTOR | Pak.',
      })
      .returning();

    return NextResponse.json({ success: true, vehicle: newVehicle });
  } catch (error: any) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });

  try {
    await ensureDbInitialized();
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const [updated] = await db
      .update(vehicles)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(vehicles.id, Number(id)))
      .returning();

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (error: any) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });

  try {
    await ensureDbInitialized();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    await db.delete(vehicles).where(eq(vehicles.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
