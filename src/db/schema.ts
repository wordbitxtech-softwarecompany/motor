import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  make: varchar('make', { length: 100 }).notNull(),
  model: varchar('model', { length: 150 }).notNull(),
  year: integer('year').notNull(),
  price: integer('price').notNull(), // in PKR (0 for Price Coming Soon)
  priceLabel: varchar('price_label', { length: 50 }).default('Ex-Factory').notNull(), // Starting From, Estimated Price, Ex-Factory, Estimated On-Road, Price Coming Soon
  monthlyEstimate: integer('monthly_estimate').notNull(), // in PKR
  mileage: integer('mileage').notNull(), // in KM
  powertrain: varchar('powertrain', { length: 50 }).default('Petrol').notNull(), // Petrol, Hybrid, PHEV, EV, REEV
  availabilityStatus: varchar('availability_status', { length: 80 }).default('Dealer Stock').notNull(), // Available in Pakistan, New Arrival, Coming Soon, Expected, Pre-Launch, Imported, Dealer Stock
  transmission: varchar('transmission', { length: 50 }).notNull(),
  fuelType: varchar('fuel_type', { length: 50 }).notNull(),
  bodyType: varchar('body_type', { length: 50 }).notNull(),
  engineCapacity: varchar('engine_capacity', { length: 100 }).notNull(),
  driveType: varchar('drive_type', { length: 50 }).default('FWD').notNull(),
  condition: varchar('condition', { length: 50 }).default('Certified Pre-Owned').notNull(),
  exteriorColor: varchar('exterior_color', { length: 50 }).notNull(),
  interiorColor: varchar('interior_color', { length: 50 }).notNull(),
  doors: integer('doors').default(4).notNull(),
  seats: integer('seats').default(5).notNull(),
  location: varchar('location', { length: 150 }).default('Main Boulevard, Gulberg III, Lahore').notNull(),
  status: varchar('status', { length: 50 }).default('Available').notNull(), // Available, Reserved, Sold, Rented, Maintenance
  isFeatured: boolean('is_featured').default(false).notNull(),
  isRental: boolean('is_rental').default(false).notNull(),
  isNewArrival: boolean('is_new_arrival').default(false).notNull(),
  isGreatValue: boolean('is_great_value').default(false).notNull(),
  rentalDailyRate: integer('rental_daily_rate'), // PKR / day
  rentalWeeklyRate: integer('rental_weekly_rate'), // PKR / week
  rentalDeposit: integer('rental_deposit'), // PKR deposit
  rentalCategory: varchar('rental_category', { length: 50 }), // Economy, Sedan, SUV, Luxury, 7-Seater, Executive
  // EV / Hybrid / PHEV / REEV Specific attributes
  batteryCapacity: varchar('battery_capacity', { length: 50 }), // e.g. "68.8 kWh"
  electricRange: varchar('electric_range', { length: 50 }), // e.g. "520 km (NEDC)"
  combinedRange: varchar('combined_range', { length: 50 }), // e.g. "1,050 km"
  motorPower: varchar('motor_power', { length: 80 }), // e.g. "231 hp (170 kW)"
  torque: varchar('torque', { length: 50 }), // e.g. "370 Nm"
  chargingType: varchar('charging_type', { length: 100 }), // e.g. "Type 2 AC & CCS2 DC Fast Charging"
  acCharging: varchar('ac_charging', { length: 80 }), // e.g. "7.4 kW (approx 8.5h)"
  dcFastCharging: varchar('dc_fast_charging', { length: 80 }), // e.g. "90 kW (30-80% in 35 mins)"
  v2l: boolean('v2l').default(false),
  batteryWarranty: varchar('battery_warranty', { length: 80 }), // e.g. "8 Years / 160,000 km"
  vehicleWarranty: varchar('vehicle_warranty', { length: 80 }), // e.g. "5 Years / 100,000 km"
  mainImage: text('main_image').notNull(),
  gallery: jsonb('gallery').$type<string[]>().default([]).notNull(),
  features: jsonb('features').$type<string[]>().default([]).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rentalBookings = pgTable('rental_bookings', {
  id: serial('id').primaryKey(),
  bookingReference: varchar('booking_reference', { length: 50 }).notNull().unique(),
  vehicleId: integer('vehicle_id').notNull(),
  vehicleName: varchar('vehicle_name', { length: 200 }).notNull(),
  customerName: varchar('customer_name', { length: 150 }).notNull(),
  customerEmail: varchar('customer_email', { length: 150 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  customerCnicPlaceholder: varchar('customer_cnic_placeholder', { length: 50 }),
  pickupLocation: varchar('pickup_location', { length: 150 }).notNull(),
  dropoffLocation: varchar('dropoff_location', { length: 150 }).notNull(),
  pickupDate: varchar('pickup_date', { length: 50 }).notNull(),
  pickupTime: varchar('pickup_time', { length: 50 }).notNull(),
  returnDate: varchar('return_date', { length: 50 }).notNull(),
  returnTime: varchar('return_time', { length: 50 }).notNull(),
  rentalDays: integer('rental_days').notNull(),
  dailyRate: integer('daily_rate').notNull(),
  extras: jsonb('extras').$type<{ name: string; price: number }[]>().default([]).notNull(),
  extrasTotal: integer('extras_total').default(0).notNull(),
  securityDeposit: integer('security_deposit').notNull(),
  totalAmount: integer('total_amount').notNull(),
  status: varchar('status', { length: 50 }).default('Pending').notNull(), // Pending, Approved, Active, Completed, Cancelled, Rejected
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const testDriveRequests = pgTable('test_drive_requests', {
  id: serial('id').primaryKey(),
  reference: varchar('reference', { length: 50 }).notNull().unique(),
  vehicleId: integer('vehicle_id').notNull(),
  vehicleName: varchar('vehicle_name', { length: 200 }).notNull(),
  customerName: varchar('customer_name', { length: 150 }).notNull(),
  customerEmail: varchar('customer_email', { length: 150 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  preferredDate: varchar('preferred_date', { length: 50 }).notNull(),
  preferredTime: varchar('preferred_time', { length: 50 }).notNull(),
  location: varchar('location', { length: 150 }).notNull(),
  status: varchar('status', { length: 50 }).default('Pending').notNull(), // Pending, Approved, Completed, Cancelled
  salesperson: varchar('salesperson', { length: 100 }).default('Unassigned'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  leadType: varchar('lead_type', { length: 50 }).default('General').notNull(), // General, Sell Car, Financing, Rental, Inquiry, EV Consultation
  customerName: varchar('customer_name', { length: 150 }).notNull(),
  customerEmail: varchar('customer_email', { length: 150 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }).notNull(),
  vehicleInterested: varchar('vehicle_interested', { length: 200 }),
  vehicleId: integer('vehicle_id'),
  message: text('message'),
  source: varchar('source', { length: 50 }).default('Website').notNull(),
  status: varchar('status', { length: 50 }).default('New').notNull(), // New, Contacted, Qualified, Negotiation, Booked, Won, Lost
  estimatedValue: integer('estimated_value').default(0).notNull(),
  assignedSalesperson: varchar('assigned_salesperson', { length: 100 }).default('Hamza Farooq'),
  nextFollowUp: varchar('next_follow_up', { length: 50 }),
  valuationDetails: jsonb('valuation_details').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const offers = pgTable('offers', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 200 }).notNull(),
  slug: varchar('slug', { length: 150 }).notNull().unique(),
  badge: varchar('badge', { length: 100 }).notNull(),
  description: text('description').notNull(),
  discountDetails: varchar('discount_details', { length: 150 }).notNull(),
  validUntil: varchar('valid_until', { length: 50 }).notNull(),
  imageUrl: text('image_url').notNull(),
  category: varchar('category', { length: 50 }).default('Rental').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  ctaText: varchar('cta_text', { length: 100 }).default('Claim Offer').notNull(),
  ctaLink: varchar('cta_link', { length: 255 }).default('/rent').notNull(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  customerName: varchar('customer_name', { length: 150 }).notNull(),
  customerRole: varchar('customer_role', { length: 150 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  vehicle: varchar('vehicle', { length: 150 }).notNull(),
  rating: integer('rating').default(5).notNull(),
  reviewText: text('review_text').notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  isVerified: boolean('is_verified').default(true).notNull(),
});

/* ── Marketplace: user accounts & classified listings ── */

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 190 }).notNull().unique(),
  phone: varchar('phone', { length: 40 }).notNull(),
  city: varchar('city', { length: 80 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).default('user').notNull(), // user | admin
  status: varchar('status', { length: 20 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 80 }).notNull().unique(),
  userId: integer('user_id').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/** One-time SMS codes for phone login / signup. */
export const phoneOtps = pgTable('phone_otps', {
  id: serial('id').primaryKey(),
  phone: varchar('phone', { length: 40 }).notNull(),
  codeHash: varchar('code_hash', { length: 128 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  attempts: integer('attempts').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const listings = pgTable('listings', {
  id: serial('id').primaryKey(),
  reference: varchar('reference', { length: 40 }).notNull().unique(),
  userId: integer('user_id').notNull(),

  // Listing route: 'self' = Sell It Myself, 'assisted' = Sell It For Me
  listingType: varchar('listing_type', { length: 20 }).default('self').notNull(),

  // Vehicle
  vehicleKind: varchar('vehicle_kind', { length: 20 }).default('car').notNull(), // car | bike
  make: varchar('make', { length: 80 }).notNull(),
  model: varchar('model', { length: 120 }).notNull(),
  variant: varchar('variant', { length: 120 }),
  year: integer('year').notNull(),
  price: integer('price').notNull(),
  mileage: integer('mileage').notNull(),
  fuelType: varchar('fuel_type', { length: 40 }).notNull(),
  transmission: varchar('transmission', { length: 40 }).notNull(),
  engineCapacity: varchar('engine_capacity', { length: 60 }),
  bodyType: varchar('body_type', { length: 50 }),
  exteriorColor: varchar('exterior_color', { length: 50 }),
  registeredIn: varchar('registered_in', { length: 80 }),
  city: varchar('city', { length: 80 }).notNull(),
  description: text('description'),
  features: jsonb('features').$type<string[]>().default([]).notNull(),
  images: jsonb('images').$type<string[]>().default([]).notNull(),

  // Seller snapshot (so admin sees contact even if account changes)
  sellerName: varchar('seller_name', { length: 150 }).notNull(),
  sellerPhone: varchar('seller_phone', { length: 40 }).notNull(),
  sellerEmail: varchar('seller_email', { length: 190 }).notNull(),

  // Moderation
  status: varchar('status', { length: 20 }).default('pending').notNull(), // pending | approved | rejected | sold
  adminNote: text('admin_note'),
  reviewedBy: varchar('reviewed_by', { length: 120 }),
  reviewedAt: timestamp('reviewed_at'),

  isFeatured: boolean('is_featured').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
