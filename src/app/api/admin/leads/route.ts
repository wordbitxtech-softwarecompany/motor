import { NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    await ensureDbInitialized();
    const rows = await db.select().from(leads).orderBy(desc(leads.id));
    return NextResponse.json({ success: true, leads: rows });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();
    const { id, status, assignedSalesperson, nextFollowUp, message } = body;

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = {};
    if (status !== undefined) updates.status = status;
    if (assignedSalesperson !== undefined) updates.assignedSalesperson = assignedSalesperson;
    if (nextFollowUp !== undefined) updates.nextFollowUp = nextFollowUp;
    if (message !== undefined) updates.message = message;

    const [updated] = await db.update(leads).set(updates).where(eq(leads.id, Number(id))).returning();
    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
