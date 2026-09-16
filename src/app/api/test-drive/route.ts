import { NextResponse } from 'next/server';
import { db } from '@/db';
import { testDriveRequests, leads } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();
    const { vehicleId, vehicleName, customerName, customerEmail, customerPhone, preferredDate, preferredTime, location, notes } = body;

    if (!customerName || !customerPhone || !preferredDate || !vehicleName) {
      return NextResponse.json({ error: 'Please provide all required test drive fields.' }, { status: 400 });
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `DH-TD-${randomNum}`;

    const [testDrive] = await db.insert(testDriveRequests).values({
      reference,
      vehicleId: Number(vehicleId) || 0,
      vehicleName,
      customerName,
      customerEmail: customerEmail || '',
      customerPhone,
      preferredDate,
      preferredTime: preferredTime || '11:00 AM',
      location: location || 'Main Boulevard, Gulberg III, Lahore',
      status: 'Pending',
      salesperson: 'Hamza Farooq',
      notes: notes || '',
    }).returning();

    // Auto CRM entry
    try {
      await db.insert(leads).values({
        leadType: 'Test Drive',
        customerName,
        customerEmail: customerEmail || '',
        customerPhone,
        vehicleInterested: vehicleName,
        vehicleId: Number(vehicleId) || null,
        message: `Test Drive scheduled for ${preferredDate} at ${preferredTime || '11:00 AM'} (${location})`,
        source: 'Website',
        status: 'New',
        estimatedValue: 0,
        assignedSalesperson: 'Hamza Farooq',
        nextFollowUp: `${preferredDate} Confirmation Call`,
      });
    } catch (e) {
      console.warn('Lead insertion error:', e);
    }

    return NextResponse.json({ success: true, reference, testDrive });
  } catch (error: any) {
    console.error('Error booking test drive:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit test drive request' }, { status: 500 });
  }
}
