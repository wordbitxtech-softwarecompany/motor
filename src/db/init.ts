import { pool } from './index';
import { seedDatabase } from './seed';

let isInitialized = false;

export async function ensureDbInitialized() {
  if (isInitialized) return;

  try {
    const client = await pool.connect();
    try {
      // Use Postgres advisory lock to avoid concurrent worker conflicts during build
      await client.query(`SELECT pg_advisory_lock(9823412)`);

      await client.query(`
        CREATE TABLE IF NOT EXISTS vehicles (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) NOT NULL UNIQUE,
          make VARCHAR(100) NOT NULL,
          model VARCHAR(150) NOT NULL,
          year INTEGER NOT NULL,
          price INTEGER NOT NULL,
          price_label VARCHAR(50) DEFAULT 'Ex-Factory' NOT NULL,
          monthly_estimate INTEGER NOT NULL,
          mileage INTEGER NOT NULL,
          powertrain VARCHAR(50) DEFAULT 'Petrol' NOT NULL,
          availability_status VARCHAR(80) DEFAULT 'Dealer Stock' NOT NULL,
          transmission VARCHAR(50) NOT NULL,
          fuel_type VARCHAR(50) NOT NULL,
          body_type VARCHAR(50) NOT NULL,
          engine_capacity VARCHAR(100) NOT NULL,
          drive_type VARCHAR(50) DEFAULT 'FWD' NOT NULL,
          condition VARCHAR(50) DEFAULT 'Certified Pre-Owned' NOT NULL,
          exterior_color VARCHAR(50) NOT NULL,
          interior_color VARCHAR(50) NOT NULL,
          doors INTEGER DEFAULT 4 NOT NULL,
          seats INTEGER DEFAULT 5 NOT NULL,
          location VARCHAR(150) DEFAULT 'Main Boulevard, Gulberg III, Lahore' NOT NULL,
          status VARCHAR(50) DEFAULT 'Available' NOT NULL,
          is_featured BOOLEAN DEFAULT false NOT NULL,
          is_rental BOOLEAN DEFAULT false NOT NULL,
          is_new_arrival BOOLEAN DEFAULT false NOT NULL,
          is_great_value BOOLEAN DEFAULT false NOT NULL,
          rental_daily_rate INTEGER,
          rental_weekly_rate INTEGER,
          rental_deposit INTEGER,
          rental_category VARCHAR(50),
          battery_capacity VARCHAR(50),
          electric_range VARCHAR(50),
          combined_range VARCHAR(50),
          motor_power VARCHAR(80),
          torque VARCHAR(50),
          charging_type VARCHAR(100),
          ac_charging VARCHAR(80),
          dc_fast_charging VARCHAR(80),
          v2l BOOLEAN DEFAULT false,
          battery_warranty VARCHAR(80),
          vehicle_warranty VARCHAR(80),
          main_image TEXT NOT NULL,
          gallery JSONB DEFAULT '[]' NOT NULL,
          features JSONB DEFAULT '[]' NOT NULL,
          description TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        -- Upgrade existing tables if columns missing
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS price_label VARCHAR(50) DEFAULT 'Ex-Factory';
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS powertrain VARCHAR(50) DEFAULT 'Petrol';
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS availability_status VARCHAR(80) DEFAULT 'Dealer Stock';
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS battery_capacity VARCHAR(50);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS electric_range VARCHAR(50);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS combined_range VARCHAR(50);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS motor_power VARCHAR(80);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS torque VARCHAR(50);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS charging_type VARCHAR(100);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS ac_charging VARCHAR(80);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS dc_fast_charging VARCHAR(80);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS v2l BOOLEAN DEFAULT false;
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS battery_warranty VARCHAR(80);
        ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS vehicle_warranty VARCHAR(80);

        CREATE TABLE IF NOT EXISTS rental_bookings (
          id SERIAL PRIMARY KEY,
          booking_reference VARCHAR(50) NOT NULL UNIQUE,
          vehicle_id INTEGER NOT NULL,
          vehicle_name VARCHAR(200) NOT NULL,
          customer_name VARCHAR(150) NOT NULL,
          customer_email VARCHAR(150) NOT NULL,
          customer_phone VARCHAR(50) NOT NULL,
          customer_cnic_placeholder VARCHAR(50),
          pickup_location VARCHAR(150) NOT NULL,
          dropoff_location VARCHAR(150) NOT NULL,
          pickup_date VARCHAR(50) NOT NULL,
          pickup_time VARCHAR(50) NOT NULL,
          return_date VARCHAR(50) NOT NULL,
          return_time VARCHAR(50) NOT NULL,
          rental_days INTEGER NOT NULL,
          daily_rate INTEGER NOT NULL,
          extras JSONB DEFAULT '[]' NOT NULL,
          extras_total INTEGER DEFAULT 0 NOT NULL,
          security_deposit INTEGER NOT NULL,
          total_amount INTEGER NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending' NOT NULL,
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS test_drive_requests (
          id SERIAL PRIMARY KEY,
          reference VARCHAR(50) NOT NULL UNIQUE,
          vehicle_id INTEGER NOT NULL,
          vehicle_name VARCHAR(200) NOT NULL,
          customer_name VARCHAR(150) NOT NULL,
          customer_email VARCHAR(150) NOT NULL,
          customer_phone VARCHAR(50) NOT NULL,
          preferred_date VARCHAR(50) NOT NULL,
          preferred_time VARCHAR(50) NOT NULL,
          location VARCHAR(150) NOT NULL,
          status VARCHAR(50) DEFAULT 'Pending' NOT NULL,
          salesperson VARCHAR(100) DEFAULT 'Unassigned',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          lead_type VARCHAR(50) DEFAULT 'General' NOT NULL,
          customer_name VARCHAR(150) NOT NULL,
          customer_email VARCHAR(150) NOT NULL,
          customer_phone VARCHAR(50) NOT NULL,
          vehicle_interested VARCHAR(200),
          vehicle_id INTEGER,
          message TEXT,
          source VARCHAR(50) DEFAULT 'Website' NOT NULL,
          status VARCHAR(50) DEFAULT 'New' NOT NULL,
          estimated_value INTEGER DEFAULT 0 NOT NULL,
          assigned_salesperson VARCHAR(100) DEFAULT 'Hamza Farooq',
          next_follow_up VARCHAR(50),
          valuation_details JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS offers (
          id SERIAL PRIMARY KEY,
          title VARCHAR(200) NOT NULL,
          slug VARCHAR(150) NOT NULL UNIQUE,
          badge VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          discount_details VARCHAR(150) NOT NULL,
          valid_until VARCHAR(50) NOT NULL,
          image_url TEXT NOT NULL,
          category VARCHAR(50) DEFAULT 'Rental' NOT NULL,
          is_active BOOLEAN DEFAULT true NOT NULL,
          cta_text VARCHAR(100) DEFAULT 'Claim Offer' NOT NULL,
          cta_link VARCHAR(255) DEFAULT '/rent' NOT NULL
        );

        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(150) NOT NULL,
          email VARCHAR(190) NOT NULL UNIQUE,
          phone VARCHAR(40) NOT NULL,
          city VARCHAR(80) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'user' NOT NULL,
          status VARCHAR(20) DEFAULT 'active' NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
          id SERIAL PRIMARY KEY,
          token VARCHAR(80) NOT NULL UNIQUE,
          user_id INTEGER NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE TABLE IF NOT EXISTS listings (
          id SERIAL PRIMARY KEY,
          reference VARCHAR(40) NOT NULL UNIQUE,
          user_id INTEGER NOT NULL,
          listing_type VARCHAR(20) DEFAULT 'self' NOT NULL,
          vehicle_kind VARCHAR(20) DEFAULT 'car' NOT NULL,
          make VARCHAR(80) NOT NULL,
          model VARCHAR(120) NOT NULL,
          variant VARCHAR(120),
          year INTEGER NOT NULL,
          price INTEGER NOT NULL,
          mileage INTEGER NOT NULL,
          fuel_type VARCHAR(40) NOT NULL,
          transmission VARCHAR(40) NOT NULL,
          engine_capacity VARCHAR(60),
          body_type VARCHAR(50),
          exterior_color VARCHAR(50),
          registered_in VARCHAR(80),
          city VARCHAR(80) NOT NULL,
          description TEXT,
          features JSONB DEFAULT '[]' NOT NULL,
          images JSONB DEFAULT '[]' NOT NULL,
          seller_name VARCHAR(150) NOT NULL,
          seller_phone VARCHAR(40) NOT NULL,
          seller_email VARCHAR(190) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending' NOT NULL,
          admin_note TEXT,
          reviewed_by VARCHAR(120),
          reviewed_at TIMESTAMP,
          is_featured BOOLEAN DEFAULT false NOT NULL,
          views INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );

        CREATE INDEX IF NOT EXISTS listings_status_idx ON listings(status);
        CREATE INDEX IF NOT EXISTS listings_city_idx ON listings(city);
        CREATE INDEX IF NOT EXISTS listings_make_idx ON listings(make);
        CREATE INDEX IF NOT EXISTS sessions_token_idx ON sessions(token);

        CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          customer_name VARCHAR(150) NOT NULL,
          customer_role VARCHAR(150) NOT NULL,
          location VARCHAR(100) NOT NULL,
          vehicle VARCHAR(150) NOT NULL,
          rating INTEGER DEFAULT 5 NOT NULL,
          review_text TEXT NOT NULL,
          date VARCHAR(50) NOT NULL,
          is_verified BOOLEAN DEFAULT true NOT NULL
        );
      `);

      await seedDatabase();

      await client.query(`SELECT pg_advisory_unlock(9823412)`);
      isInitialized = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to initialize database tables:', err);
  }
}
