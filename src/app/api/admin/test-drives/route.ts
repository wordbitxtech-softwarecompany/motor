import { NextResponse } from 'next/server';
import { db } from '@/db';
import { testDriveRequests } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(testDriveRequests).orderBy(desc(testDriveRequests.id));
    return NextResponse.json({ success: true, testDrives: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();
    const { id, status, salesperson, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Test Drive ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (status !== undefined) updates.status = status;
    if (salesperson !== undefined) updates.salesperson = salesperson;
    if (notes !== undefined) updates.notes = notes;

    const [updated] = await db.update(testDriveRequests).set(updates).where(eq(testDriveRequests.id, Number(id))).returning();
    return NextResponse.json({ success: true, testDrive: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
