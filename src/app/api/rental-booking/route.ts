import { NextResponse } from 'next/server';
import { db } from '@/db';
import { rentalBookings, leads } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();
    const body = await req.json();

    const {
      vehicleId,
      vehicleName,
      customerName,
      customerEmail,
      customerPhone,
      customerCnicPlaceholder,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      rentalDays,
      dailyRate,
      extras = [],
      extrasTotal = 0,
      securityDeposit,
      totalAmount,
      notes,
    } = body;

    if (!vehicleId || !customerName || !customerPhone || !pickupDate || !returnDate) {
      return NextResponse.json({ error: 'Missing required rental details' }, { status: 400 });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingReference = `DH-RNT-${randomNum}`;

    const [newBooking] = await db.insert(rentalBookings).values({
      bookingReference,
      vehicleId: Number(vehicleId),
      vehicleName: vehicleName || 'MOTOR Rental Vehicle',
      customerName,
      customerEmail: customerEmail || 'unprovided@domain.com',
      customerPhone,
      customerCnicPlaceholder: customerCnicPlaceholder || 'Verified at Pickup',
      pickupLocation: pickupLocation || 'Main Boulevard, Gulberg III, Lahore',
      dropoffLocation: dropoffLocation || pickupLocation || 'Main Boulevard, Gulberg III, Lahore',
      pickupDate,
      pickupTime: pickupTime || '10:00 AM',
      returnDate,
      returnTime: returnTime || '10:00 AM',
      rentalDays: Number(rentalDays) || 1,
      dailyRate: Number(dailyRate) || 12000,
      extras,
      extrasTotal: Number(extrasTotal) || 0,
      securityDeposit: Number(securityDeposit) || 30000,
      totalAmount: Number(totalAmount) || 12000,
      status: 'Pending',
      notes: notes || '',
    }).returning();

    // Also register lead into CRM pipeline automatically
    try {
      await db.insert(leads).values({
        leadType: 'Rental',
        customerName,
        customerEmail: customerEmail || 'unprovided@domain.com',
        customerPhone,
        vehicleInterested: vehicleName,
        vehicleId: Number(vehicleId),
        message: `New Rental Booking Reference: ${bookingReference}. ${rentalDays} days (${pickupDate} to ${returnDate}). Pickup: ${pickupLocation}`,
        source: 'Website',
        status: 'Booked',
        estimatedValue: Number(totalAmount) || 12000,
        assignedSalesperson: 'Sarmad Javed',
        nextFollowUp: 'Immediate Contact',
      });
    } catch (leadErr) {
      console.warn('Could not mirror rental to leads:', leadErr);
    }

    return NextResponse.json({
      success: true,
      bookingReference,
      booking: newBooking,
    });
  } catch (error: any) {
    console.error('Error creating rental booking:', error);
    return NextResponse.json({ error: error.message || 'Failed to process rental booking' }, { status: 500 });
  }
}
