import { NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
  await ensureDbInitialized();
  const rows = await db.select().from(listings).orderBy(desc(listings.id));
  return NextResponse.json({ success: true, listings: rows });
}

/** Approve / reject / edit / mark sold. */
export async function PUT(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });

  try {
    await ensureDbInitialized();
    const { id, action, adminNote, ...edits } = await req.json();
    if (!id) return NextResponse.json({ error: 'Listing id required' }, { status: 400 });

    const patch: Record<string, unknown> = { updatedAt: new Date() };

    if (action === 'approve' || action === 'reject' || action === 'sold' || action === 'pending') {
      patch.status = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : action;
      patch.reviewedBy = admin.name;
      patch.reviewedAt = new Date();
      if (adminNote !== undefined) patch.adminNote = adminNote;
    }

    // Editable fields only
    for (const k of ['make','model','variant','price','mileage','year','city','fuelType','transmission','description','bodyType','exteriorColor','registeredIn','engineCapacity','isFeatured'] as const) {
      if (edits[k] !== undefined) {
        patch[k] = ['price','mileage','year'].includes(k) ? Number(edits[k]) : edits[k];
      }
    }

    const [row] = await db.update(listings).set(patch).where(eq(listings.id, Number(id))).returning();
    return NextResponse.json({ success: true, listing: row });
  } catch (e) {
    console.error('listing update error', e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Listing id required' }, { status: 400 });
  await db.delete(listings).where(eq(listings.id, Number(id)));
  return NextResponse.json({ success: true });
}
