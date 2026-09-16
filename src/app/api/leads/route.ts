import { NextResponse } from 'next/server';
import { db } from '@/db';
import { leads } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();

    const {
      leadType = 'General',
      customerName,
      customerEmail,
      customerPhone,
      vehicleInterested,
      vehicleId,
      message,
      source = 'Website',
      estimatedValue = 0,
      valuationDetails,
    } = body;

    if (!customerName || !customerPhone) {
      return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 });
    }

    const [newLead] = await db.insert(leads).values({
      leadType,
      customerName,
      customerEmail: customerEmail || 'unprovided@domain.com',
      customerPhone,
      vehicleInterested: vehicleInterested || 'General Inquiry',
      vehicleId: vehicleId ? Number(vehicleId) : null,
      message: message || '',
      source,
      status: 'New',
      estimatedValue: Number(estimatedValue) || 0,
      assignedSalesperson: 'Hamza Farooq',
      nextFollowUp: 'Call within 15 minutes',
      valuationDetails: valuationDetails || null,
    }).returning();

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Error recording lead:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}
