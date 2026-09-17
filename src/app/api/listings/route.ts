import { NextResponse } from 'next/server';
import { db } from '@/db';
import { listings } from '@/db/schema';
import { ensureDbInitialized } from '@/db/init';
import { getCurrentUser, validEmail } from '@/lib/auth';
import { normalisePhone } from '@/lib/phone';

const CITIES = ['Lahore','Karachi','Islamabad','Rawalpindi','Faisalabad','Multan','Gujranwala','Peshawar','Quetta','Sialkot','Hyderabad','Other'];

export async function POST(req: Request) {
  try {
    await ensureDbInitialized();

    const user = await getCurrentUser().catch(() => null);
    const b = await req.json();
    const listingType = b.listingType === 'assisted' ? 'assisted' : 'self';

    const errs: string[] = [];
    if (!b.make?.trim()) errs.push('Make is required');
    if (!b.model?.trim()) errs.push('Model is required');
    const year = Number(b.year);
    if (!year || year < 1980 || year > new Date().getFullYear() + 1) errs.push('Enter a valid year');
    const price = Number(b.price);
    if (!price || price < 10000) errs.push('Enter a valid asking price');
    const mileage = Number(b.mileage);
    if (Number.isNaN(mileage) || mileage < 0) errs.push('Enter valid mileage');
    if (!b.city || !CITIES.includes(b.city)) errs.push('Select a valid city');
    if (!b.fuelType?.trim()) errs.push('Select fuel type');
    if (!b.transmission?.trim()) errs.push('Select transmission');

    const sellerName = String(b.sellerName || user?.name || '').trim();
    const phoneRaw = String(b.sellerPhone || user?.phone || '').trim();
    const sellerPhone = normalisePhone(phoneRaw) || phoneRaw;
    const emailRaw = String(b.sellerEmail || user?.email || '').trim().toLowerCase();
    const sellerEmail = emailRaw && validEmail(emailRaw) ? emailRaw : emailRaw || (user?.email ?? '');

    if (sellerName.length < 2) errs.push('Enter your full name');
    if (!sellerPhone || sellerPhone.replace(/\D/g, '').length < 10) {
      errs.push('Enter a valid Pakistani mobile number');
    }

    if (errs.length) return NextResponse.json({ error: errs.join('. ') }, { status: 400 });

    const images: string[] = Array.isArray(b.images)
      ? b.images.filter((s: unknown) => typeof s === 'string' && s.startsWith('data:image/')).slice(0, 8)
      : [];

    const reference = `MP-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;

    const [row] = await db.insert(listings).values({
      reference,
      userId: user?.id ?? null,
      listingType,
      vehicleKind: b.vehicleKind === 'bike' ? 'bike' : 'car',
      make: b.make.trim(),
      model: b.model.trim(),
      variant: b.variant?.trim() || null,
      year,
      price,
      mileage,
      fuelType: b.fuelType,
      transmission: b.transmission,
      engineCapacity: b.engineCapacity?.trim() || null,
      bodyType: b.bodyType?.trim() || null,
      exteriorColor: b.exteriorColor?.trim() || null,
      registeredIn: b.registeredIn?.trim() || null,
      city: b.city,
      description: b.description?.trim()?.slice(0, 2000) || null,
      features: Array.isArray(b.features) ? b.features.slice(0, 30) : [],
      images,
      sellerName,
      sellerPhone,
      sellerEmail: sellerEmail || 'guest@motor.pk',
      status: 'pending',
    }).returning({ id: listings.id, reference: listings.reference });

    return NextResponse.json({
      success: true,
      reference: row.reference,
      message: 'Your ad has been submitted and is awaiting review by our team.',
    });
  } catch (e) {
    console.error('listing create error', e);
    return NextResponse.json({ error: 'Could not submit your ad. Please try again.' }, { status: 500 });
  }
}
