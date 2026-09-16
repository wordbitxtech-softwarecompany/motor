import { NextResponse } from 'next/server';
import { db } from '@/db';
import { rentalBookings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(rentalBookings).orderBy(desc(rentalBookings.id));
    return NextResponse.json({ success: true, bookings: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const [updated] = await db.update(rentalBookings).set({
      status,
      ...(notes !== undefined ? { notes } : {}),
    }).where(eq(rentalBookings.id, Number(id))).returning();

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
