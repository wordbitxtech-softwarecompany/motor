/**
 * MOTOR Pakistan — Brand & Model Catalog (2026)
 * Demonstration data covering cars, SUVs, EVs, bikes and electric scooters
 * available or expected in the Pakistani market. Prices are indicative PKR.
 */

export { imageForModel } from './vehicle-photos';

export type VehicleKind = 'car' | 'bike';

export interface CatalogModel {
  name: string;
  body: string;          // Sedan, Hatchback, SUV, Crossover, MPV, Pickup, Motorcycle, Scooter
  pt: string;            // Petrol, Diesel, Hybrid (HEV), PHEV, EV (BEV), REEV
  price: number;         // PKR, 0 = Price Coming Soon
  year: number;
  status: string;        // Dealer Stock, Available in Pakistan, New Arrival, Coming Soon, Expected, Pre-Launch, Imported
  range?: string;
  battery?: string;
  /** Pakistan model launch / listing date (YYYY-MM-DD). Independent of brand entry year. */
  launchedAt?: string;
}

export interface Brand {
  name: string;
  slug: string;
  origin: string;
  kind: VehicleKind;
  logo: string;          // /images/brands/<slug>.svg
  accent: string;        // gradient for monogram fallback
  tagline: string;
  isNew?: boolean;       // 2025–26 Pakistan launch activity (models, not necessarily first brand entry)
  /** First year the brand itself was in the Pakistani market. */
  enteredPakistan?: number;
  models: CatalogModel[];
}

/** Every brand mark is a text-based SVG so it always deploys. */
const L = (slug: string) => `/images/brands/${slug}.svg`;

/* ══════════════════════════════════════════════════════
   CAR BRANDS — new launches first, then established
   ══════════════════════════════════════════════════════ */

export const BRANDS: Brand[] = [
  /* ── 2025–2026 NEW LAUNCHES (priority) ───────────── */
  {
    name: 'AION', slug: 'aion', origin: 'China', kind: 'car', logo: L('aion'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-violet-600 to-indigo-900',
    tagline: 'GAC AION battery-electric crossovers — market introduction Nov 2025, official pricing/booking from May 2026.',
    models: [
      { name: 'UT', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'New Arrival', battery: '44 kWh', range: '420 km', launchedAt: '2025-11-06' },
      { name: 'V', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'New Arrival', battery: '70 kWh', range: '520 km', launchedAt: '2025-11-06' },
      { name: 'ES', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '58.8 kWh', range: '510 km', launchedAt: '2026-12-01' },
    ],
  },
  {
    name: 'Alektra', slug: 'alektra', origin: 'Pakistan', kind: 'car', logo: L('alektra'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-cyan-500 to-slate-800',
    tagline: 'Small battery-electric quadricycle introduced in Pakistan in November 2025.',
    models: [
      { name: 'Metro', body: 'Hatchback', pt: 'EV', price: 0, year: 2025, status: 'New Arrival', battery: '10 kWh', range: '120 km', launchedAt: '2025-11-27' },
    ],
  },
  {
    name: 'AVATR', slug: 'avatr', origin: 'China', kind: 'car', logo: L('avatr'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-fuchsia-700 to-slate-900',
    tagline: 'Changan × Huawei × CATL luxury battery-electric flagships.',
    models: [
      { name: '11', body: 'SUV', pt: 'EV', price: 0, year: 2025, status: 'New Arrival', battery: '90.4 kWh', range: '555 km', launchedAt: '2025-12-20' },
      { name: '07', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '82 kWh', range: '610 km', launchedAt: '2026-12-01' },
    ],
  },
  {
    name: 'Deepal', slug: 'deepal', origin: 'China', kind: 'car', logo: L('deepal'), isNew: true,
    enteredPakistan: 2024,
    accent: 'from-emerald-600 to-teal-800',
    tagline: 'Changan’s premium EV brand — S05 is Pakistan’s first locally assembled REEV (Oct 2025). Brand was already in market before 2025.',
    models: [
      { name: 'S05', body: 'Crossover', pt: 'REEV', price: 0, year: 2025, status: 'New Arrival', battery: '28.4 kWh', range: '180 km EV', launchedAt: '2025-10-31' },
      { name: 'L07', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '66.8 kWh', range: '515 km', launchedAt: '2026-01-01' },
      { name: 'S07', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '66.8 kWh', range: '520 km', launchedAt: '2026-01-01' },
      { name: 'E07', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '80 kWh', range: '550 km', launchedAt: '2026-01-01' },
      { name: 'S09', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '80 kWh', range: '600 km', launchedAt: '2026-09-01' },
      { name: 'G318', body: 'SUV', pt: 'REEV', price: 0, year: 2026, status: 'Pre-Launch', battery: '35.4 kWh', range: '1,000 km total', launchedAt: '2026-10-01' },
    ],
  },
  {
    name: 'Forthing', slug: 'forthing', origin: 'China', kind: 'car', logo: L('forthing'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-sky-600 to-indigo-800',
    tagline: 'Dongfeng Forthing Friday — launched in Pakistan as both BEV and REEV on 14 Aug 2025.',
    models: [
      { name: 'Friday BEV', body: 'MPV', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '56 kWh', range: '420 km', launchedAt: '2025-08-14' },
      { name: 'Friday REEV', body: 'MPV', pt: 'REEV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '31 kWh', range: '1,000 km total', launchedAt: '2025-08-14' },
    ],
  },
  {
    name: 'Hyptec', slug: 'hyptec', origin: 'China', kind: 'car', logo: L('hyptec'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-violet-500 to-slate-900',
    tagline: 'GAC Hyptec luxury EVs — official pricing/booking phase May 2026.',
    models: [
      { name: 'HT Elite', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '80 kWh', range: '650 km', launchedAt: '2026-05-01' },
      { name: 'HT Ultra Gullwing', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '93 kWh', range: '700 km', launchedAt: '2026-05-01' },
    ],
  },
  {
    name: 'JAECOO', slug: 'jaecoo', origin: 'China', kind: 'car', logo: L('jaecoo'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-stone-600 to-stone-900',
    tagline: 'Chery premium SUVs — J6 BEV and J7 PHEV launched in 2025; J5 HEV followed in January 2026.',
    models: [
      { name: 'J6', body: 'SUV', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '65.7 kWh', range: '415 km', launchedAt: '2025-08-01' },
      { name: 'J7 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '18.3 kWh', range: '90 km EV', launchedAt: '2025-10-21' },
      { name: 'J5 HEV', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2026, status: 'New Arrival', battery: '1.8 kWh', launchedAt: '2026-01-12' },
      { name: 'J8', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '34.5 kWh', range: '160 km EV', launchedAt: '2026-10-01' },
    ],
  },
  {
    name: 'JMEV', slug: 'jmev', origin: 'China', kind: 'car', logo: L('jmev'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-lime-600 to-emerald-900',
    tagline: 'Jiangling JMEV battery-electric sedans — Elight launched 2 Sep 2025.',
    models: [
      { name: 'Elight', body: 'Sedan', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '51 kWh', range: '400 km', launchedAt: '2025-09-02' },
      { name: 'EV3', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '50 kWh', range: '380 km', launchedAt: '2026-01-01' },
    ],
  },
  {
    name: 'Jetour', slug: 'jetour', origin: 'China', kind: 'car', logo: L('jetour'), isNew: true,
    enteredPakistan: 2024,
    accent: 'from-orange-500 to-amber-700',
    tagline: 'Adventure SUVs — T2 i-DM PHEV (Jul 2026) and T1 petrol (Sep 2026) are the latest Pakistan additions.',
    models: [
      { name: 'T2 i-DM', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '34.5 kWh', range: '150 km EV', launchedAt: '2026-07-06' },
      { name: 'T1', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Coming Soon', launchedAt: '2026-09-01' },
      { name: 'G700', body: 'SUV', pt: 'PHEV', price: 0, year: 2027, status: 'Expected', battery: '40 kWh', range: '160 km EV', launchedAt: '2027-01-01' },
      { name: 'X70 Plus 1.5T', body: 'SUV', pt: 'Petrol', price: 8299000, year: 2026, status: 'New Arrival' },
      { name: 'X70 Plus 7-Seater', body: 'SUV', pt: 'Petrol', price: 8799000, year: 2026, status: 'New Arrival' },
    ],
  },
  {
    name: 'Kaiyi', slug: 'kaiyi', origin: 'China', kind: 'car', logo: L('kaiyi'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-rose-600 to-slate-900',
    tagline: 'Chery Kaiyi battery-electric city cars — e-Qute 04 and X3 Pro EV, May 2026.',
    models: [
      { name: 'e-Qute 04', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '31 kWh', range: '301 km', launchedAt: '2026-05-22' },
      { name: 'X3 Pro EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '51 kWh', range: '400 km', launchedAt: '2026-05-22' },
    ],
  },
  {
    name: 'NEVO', slug: 'nevo', origin: 'China', kind: 'car', logo: L('nevo'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-emerald-500 to-slate-900',
    tagline: 'Changan NEVO electrified 4x4s — Hunter REEV due August 2026.',
    models: [
      { name: 'Hunter', body: 'Pickup', pt: 'REEV', price: 0, year: 2026, status: 'Coming Soon', battery: '31.2 kWh', range: '180 km EV / 1,030 km total', launchedAt: '2026-08-01' },
      { name: 'A06', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '56 kWh', range: '450 km', launchedAt: '2026-10-01' },
      { name: 'Q05', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '51 kWh', range: '400 km', launchedAt: '2026-10-01' },
      { name: 'Q07', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '70 kWh', range: '520 km', launchedAt: '2026-12-01' },
    ],
  },
  {
    name: 'OMODA', slug: 'omoda', origin: 'China', kind: 'car', logo: L('omoda'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-slate-700 to-slate-900',
    tagline: 'Chery design-led crossovers — E5 BEV launched 1 Aug 2025; 7 SHS-P PHEV due Aug 2026.',
    models: [
      { name: 'E5', body: 'Crossover', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '61 kWh', range: '430 km', launchedAt: '2025-08-01' },
      { name: '7 SHS-P', body: 'Crossover', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '19.4 kWh', range: '95 km EV', launchedAt: '2026-08-01' },
    ],
  },
  {
    name: 'ORA', slug: 'ora', origin: 'China', kind: 'car', logo: L('ora'), isNew: true,
    enteredPakistan: 2024,
    accent: 'from-teal-600 to-cyan-800',
    tagline: 'GWM’s pure-electric hatchbacks — 03 already listed; ORA 5 is the August 2026 BEV addition. Brand was in Pakistan before 2025.',
    models: [
      { name: '03', body: 'Hatchback', pt: 'EV', price: 8999000, year: 2025, status: 'Available in Pakistan', battery: '47.8 kWh', range: '400 km', launchedAt: '2025-01-01' },
      { name: '5', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '63 kWh', range: '500 km', launchedAt: '2026-08-01' },
      { name: '07', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '83.5 kWh', range: '640 km', launchedAt: '2025-12-01' },
    ],
  },
  {
    name: 'Riddara', slug: 'riddara', origin: 'China', kind: 'car', logo: L('riddara'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-amber-600 to-stone-900',
    tagline: 'Geely Riddara electric pickup — RD6 listed for the 2025/26 Pakistan market.',
    models: [
      { name: 'RD6', body: 'Pickup', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '86 kWh', range: '400 km', launchedAt: '2026-01-01' },
    ],
  },
  {
    name: 'XPENG', slug: 'xpeng', origin: 'China', kind: 'car', logo: L('xpeng'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-slate-800 to-black',
    tagline: 'Smart EVs — L03 BEV and REEV listed for July 2026; G6 and X9 listed for 2026.',
    models: [
      { name: 'L03 BEV', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '62 kWh', range: '620 km', launchedAt: '2026-07-01' },
      { name: 'L03 REEV', body: 'Sedan', pt: 'REEV', price: 0, year: 2026, status: 'Coming Soon', battery: '28 kWh', range: '1,200 km total', launchedAt: '2026-07-01' },
      { name: 'G6', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '87.5 kWh', range: '755 km', launchedAt: '2026-01-01' },
      { name: 'X9', body: 'MPV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '101.5 kWh', range: '702 km', launchedAt: '2026-01-01' },
    ],
  },
  {
    name: 'ZEEKR', slug: 'zeekr', origin: 'China', kind: 'car', logo: L('zeekr'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-zinc-700 to-zinc-950',
    tagline: 'Geely premium performance EVs — X, 7X and 009 launched together on 29 Sep 2025.',
    models: [
      { name: 'X', body: 'Crossover', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '69 kWh', range: '512 km', launchedAt: '2025-09-29' },
      { name: '7X', body: 'SUV', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '100 kWh', range: '780 km', launchedAt: '2025-09-29' },
      { name: '009', body: 'MPV', pt: 'EV', price: 0, year: 2025, status: 'Available in Pakistan', battery: '116 kWh', range: '822 km', launchedAt: '2025-09-29' },
    ],
  },
  {
    name: 'BYD', slug: 'byd', origin: 'China', kind: 'car', logo: L('byd'), isNew: true,
    enteredPakistan: 2024,
    accent: 'from-blue-500 to-indigo-800',
    tagline: 'Blade-battery EVs and DM-i plug-in hybrids assembling in Pakistan — Sealion 6 listed among 2026 upcoming models.',
    models: [
      { name: 'Atto 3 Electric', body: 'Crossover', pt: 'EV', price: 12999000, year: 2025, status: 'Available in Pakistan', battery: '60.5 kWh', range: '480 km' },
      { name: 'Seal Performance AWD', body: 'Sedan', pt: 'EV', price: 15999000, year: 2025, status: 'Available in Pakistan', battery: '82.5 kWh', range: '520 km' },
      { name: 'Seal Dynamic', body: 'Sedan', pt: 'EV', price: 14499000, year: 2025, status: 'Dealer Stock', battery: '61.4 kWh', range: '460 km' },
      { name: 'Sealion 6 DM-i', body: 'Crossover', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '18.3 kWh', range: '92 km EV', launchedAt: '2026-01-01' },
      { name: 'Sealion 7 AWD', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '82.5 kWh', range: '502 km' },
      { name: 'Atto 2 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '45.1 kWh', range: '380 km' },
      { name: 'Dolphin Electric', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '44.9 kWh', range: '405 km' },
    ],
  },
  {
    name: 'iCAUR', slug: 'icaur', origin: 'China', kind: 'car', logo: L('icaur'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-indigo-500 to-slate-900',
    tagline: 'Upcoming 2026 listings — V27 and V23 on the current new-car watchlist.',
    models: [
      { name: 'V27', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '80 kWh', range: '550 km', launchedAt: '2026-12-01' },
      { name: 'V23', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '60 kWh', range: '450 km', launchedAt: '2026-12-01' },
    ],
  },
  {
    name: 'Denza', slug: 'denza', origin: 'China', kind: 'car', logo: L('denza'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-yellow-500 to-slate-900',
    tagline: 'BYD premium arm — B5 and B8 listed among upcoming 2026 Pakistan models.',
    models: [
      { name: 'B5', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '32 kWh', range: '100 km EV', launchedAt: '2026-12-01' },
      { name: 'B8', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '45 kWh', range: '120 km EV', launchedAt: '2026-12-01' },
    ],
  },
  {
    name: 'Tank', slug: 'tank', origin: 'China', kind: 'car', logo: L('tank'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-stone-700 to-stone-950',
    tagline: 'GWM’s luxury off-road 4x4 brand.',
    models: [
      { name: 'Tank 300 4x4', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Coming Soon' },
      { name: 'Tank 300 HEV', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.76 kWh' },
      { name: 'Tank 500 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '37.1 kWh', range: '110 km EV' },
      { name: 'Tank 500 HEV', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.76 kWh' },
      { name: 'Tank 700 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '37.1 kWh' },
    ],
  },
  {
    name: 'Seres', slug: 'seres', origin: 'China', kind: 'car', logo: L('seres'), isNew: true,
    enteredPakistan: 2025,
    accent: 'from-slate-600 to-slate-900',
    tagline: 'Electric and range-extended SUVs from DFSK’s premium arm.',
    models: [
      { name: 'Seres 3 EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '52.5 kWh', range: '405 km' },
      { name: 'Seres 5 REEV', body: 'SUV', pt: 'REEV', price: 0, year: 2026, status: 'Expected', battery: '40 kWh', range: '180 km EV' },
      { name: 'Seres 7 REEV', body: 'SUV', pt: 'REEV', price: 0, year: 2026, status: 'Imported', battery: '40 kWh', range: '1,100 km total' },
    ],
  },
  {
    name: 'Leapmotor', slug: 'leapmotor', origin: 'China', kind: 'car', logo: L('leapmotor'), isNew: true,
    enteredPakistan: 2026,
    accent: 'from-lime-600 to-green-900',
    tagline: 'Value-driven EVs and range-extended SUVs.',
    models: [
      { name: 'Leapmotor C10 EV', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '69.9 kWh', range: '530 km' },
      { name: 'Leapmotor C10 REEV', body: 'SUV', pt: 'REEV', price: 0, year: 2026, status: 'Expected', battery: '28.4 kWh', range: '1,190 km total' },
      { name: 'Leapmotor T03', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '37.3 kWh', range: '403 km' },
      { name: 'Leapmotor B10', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '67.1 kWh', range: '600 km' },
    ],
  },

  /* ── ESTABLISHED BRANDS ──────────────────────────── */
  {
    name: 'Toyota', slug: 'toyota', origin: 'Japan', kind: 'car', logo: L('toyota'),
    accent: 'from-red-500 to-red-700',
    tagline: 'Pakistan’s most trusted nameplate — sedans, hybrids and 4x4 SUVs.',
    models: [
      { name: 'Corolla Altis Grande X 1.8', body: 'Sedan', pt: 'Petrol', price: 6999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Corolla Altis 1.6', body: 'Sedan', pt: 'Petrol', price: 6249000, year: 2025, status: 'Dealer Stock' },
      { name: 'Corolla Altis X 1.6 Special', body: 'Sedan', pt: 'Petrol', price: 6549000, year: 2025, status: 'Dealer Stock' },
      { name: 'Corolla GLi 1.3', body: 'Sedan', pt: 'Petrol', price: 5599000, year: 2024, status: 'Dealer Stock' },
      { name: 'Yaris ATIV X 1.5', body: 'Sedan', pt: 'Petrol', price: 4999000, year: 2024, status: 'Dealer Stock' },
      { name: 'Yaris ATIV 1.3', body: 'Sedan', pt: 'Petrol', price: 4649000, year: 2024, status: 'Dealer Stock' },
      { name: 'Yaris GLi 1.3', body: 'Sedan', pt: 'Petrol', price: 4399000, year: 2024, status: 'Dealer Stock' },
      { name: 'Corolla Cross 1.8 HEV', body: 'Crossover', pt: 'Hybrid', price: 9299000, year: 2025, status: 'Available in Pakistan', battery: '1.3 kWh', range: '880 km combined' },
      { name: 'Corolla Cross 1.8 SMART', body: 'Crossover', pt: 'Petrol', price: 8199000, year: 2025, status: 'Available in Pakistan' },
      { name: 'Corolla Cross 1.8 Premium', body: 'Crossover', pt: 'Petrol', price: 8699000, year: 2025, status: 'Available in Pakistan' },
      { name: 'Fortuner Legender 2.8D 4x4', body: 'SUV', pt: 'Diesel', price: 19999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Fortuner Sigma 4 2.8D', body: 'SUV', pt: 'Diesel', price: 18499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Fortuner 2.7 G', body: 'SUV', pt: 'Petrol', price: 16299000, year: 2024, status: 'Dealer Stock' },
      { name: 'Hilux Revo V 2.8', body: 'Pickup', pt: 'Diesel', price: 15899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Hilux Rocco 2.8', body: 'Pickup', pt: 'Diesel', price: 17299000, year: 2025, status: 'Dealer Stock' },
      { name: 'Hilux Revo G 2.8', body: 'Pickup', pt: 'Diesel', price: 14299000, year: 2025, status: 'Dealer Stock' },
      { name: 'Land Cruiser ZX', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Prado TX 2.7', body: 'SUV', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Rush 1.5 G', body: 'SUV', pt: 'Petrol', price: 6899000, year: 2024, status: 'Dealer Stock' },
      { name: 'Raize 1.0 Turbo', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Camry Hybrid 2.5', body: 'Sedan', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '1.6 kWh' },
      { name: 'bZ4X Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '71.4 kWh', range: '500 km' },
    ],
  },
  {
    name: 'Honda', slug: 'honda', origin: 'Japan', kind: 'car', logo: L('honda'),
    accent: 'from-slate-700 to-slate-900',
    tagline: 'Sporty sedans, e:HEV hybrids and refined crossovers.',
    models: [
      { name: 'Civic RS 1.5 Turbo', body: 'Sedan', pt: 'Petrol', price: 9599000, year: 2025, status: 'Dealer Stock' },
      { name: 'Civic Oriel 1.5', body: 'Sedan', pt: 'Petrol', price: 8899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Civic Standard 1.5', body: 'Sedan', pt: 'Petrol', price: 8199000, year: 2024, status: 'Dealer Stock' },
      { name: 'City Aspire 1.5', body: 'Sedan', pt: 'Petrol', price: 5699000, year: 2025, status: 'Dealer Stock' },
      { name: 'City 1.5 CVT', body: 'Sedan', pt: 'Petrol', price: 5199000, year: 2025, status: 'Dealer Stock' },
      { name: 'City 1.2 CVT', body: 'Sedan', pt: 'Petrol', price: 4899000, year: 2024, status: 'Dealer Stock' },
      { name: 'HR-V VTi-S 1.5', body: 'Crossover', pt: 'Petrol', price: 7599000, year: 2025, status: 'Dealer Stock' },
      { name: 'HR-V e:HEV', body: 'Crossover', pt: 'Hybrid', price: 8999000, year: 2025, status: 'Available in Pakistan', battery: '1.1 kWh', range: '900 km combined' },
      { name: 'BR-V S 1.5', body: 'MPV', pt: 'Petrol', price: 6399000, year: 2024, status: 'Dealer Stock' },
      { name: 'BR-V Aspire', body: 'MPV', pt: 'Petrol', price: 6899000, year: 2025, status: 'Dealer Stock' },
      { name: 'ZR-V e:HEV', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.1 kWh' },
      { name: 'CR-V AWD 1.5T', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Accord e:HEV', body: 'Sedan', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported' },
      { name: 'e:NS1 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '68.8 kWh', range: '510 km' },
    ],
  },
  {
    name: 'Suzuki', slug: 'suzuki', origin: 'Japan', kind: 'car', logo: L('suzuki'),
    accent: 'from-blue-600 to-blue-800',
    tagline: 'Affordable hatchbacks, compact sedans and workhorse vans.',
    models: [
      { name: 'Alto VXL AGS', body: 'Hatchback', pt: 'Petrol', price: 3099000, year: 2025, status: 'Dealer Stock' },
      { name: 'Alto VXR AGS', body: 'Hatchback', pt: 'Petrol', price: 2949000, year: 2025, status: 'Dealer Stock' },
      { name: 'Alto VXR', body: 'Hatchback', pt: 'Petrol', price: 2799000, year: 2025, status: 'Dealer Stock' },
      { name: 'Alto VX', body: 'Hatchback', pt: 'Petrol', price: 2449000, year: 2024, status: 'Dealer Stock' },
      { name: 'Cultus VXL AGS', body: 'Hatchback', pt: 'Petrol', price: 4199000, year: 2024, status: 'Dealer Stock' },
      { name: 'Cultus VXR', body: 'Hatchback', pt: 'Petrol', price: 3849000, year: 2024, status: 'Dealer Stock' },
      { name: 'Swift GLX CVT 1.2', body: 'Hatchback', pt: 'Petrol', price: 4849000, year: 2025, status: 'Dealer Stock' },
      { name: 'Swift GL CVT', body: 'Hatchback', pt: 'Petrol', price: 4599000, year: 2025, status: 'Dealer Stock' },
      { name: 'Swift GL 1.2', body: 'Hatchback', pt: 'Petrol', price: 4399000, year: 2024, status: 'Dealer Stock' },
      { name: 'Wagon R VXL', body: 'Hatchback', pt: 'Petrol', price: 3599000, year: 2024, status: 'Dealer Stock' },
      { name: 'Wagon R AGS', body: 'Hatchback', pt: 'Petrol', price: 3799000, year: 2024, status: 'Dealer Stock' },
      { name: 'Every Wagon', body: 'MPV', pt: 'Petrol', price: 3899000, year: 2024, status: 'Dealer Stock' },
      { name: 'Bolan Cargo Van', body: 'MPV', pt: 'Petrol', price: 2199000, year: 2024, status: 'Dealer Stock' },
      { name: 'Ravi Pickup', body: 'Pickup', pt: 'Petrol', price: 2049000, year: 2024, status: 'Dealer Stock' },
      { name: 'Fronx Hybrid', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2026, status: 'Coming Soon', battery: '0.6 kWh' },
      { name: 'Jimny 4x4', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Grand Vitara Hybrid', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected' },
      { name: 'eVX Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '60 kWh', range: '550 km' },
    ],
  },
  {
    name: 'KIA', slug: 'kia', origin: 'South Korea', kind: 'car', logo: L('kia'),
    accent: 'from-slate-800 to-black',
    tagline: 'Design-led crossovers, MPVs and electric flagships.',
    models: [
      { name: 'Sportage AWD 2.0', body: 'SUV', pt: 'Petrol', price: 8499000, year: 2026, status: 'New Arrival' },
      { name: 'Sportage Alpha 2.0', body: 'SUV', pt: 'Petrol', price: 7699000, year: 2025, status: 'Dealer Stock' },
      { name: 'Sportage FWD 2.0', body: 'SUV', pt: 'Petrol', price: 7999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Sportage L FWD', body: 'SUV', pt: 'Petrol', price: 8299000, year: 2026, status: 'New Arrival' },
      { name: 'Sportage L HEV', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Coming Soon', battery: '1.49 kWh' },
      { name: 'Sorento 2.5 AWD', body: 'SUV', pt: 'Petrol', price: 12499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Sorento 3.5 FWD', body: 'SUV', pt: 'Petrol', price: 11999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Sorento Hybrid 1.6T', body: 'SUV', pt: 'Hybrid', price: 13999000, year: 2026, status: 'Coming Soon', battery: '1.5 kWh' },
      { name: 'Stonic EX+', body: 'Crossover', pt: 'Petrol', price: 5799000, year: 2025, status: 'Dealer Stock' },
      { name: 'Picanto AT 1.0', body: 'Hatchback', pt: 'Petrol', price: 3699000, year: 2024, status: 'Dealer Stock' },
      { name: 'Picanto MT 1.0', body: 'Hatchback', pt: 'Petrol', price: 3399000, year: 2024, status: 'Dealer Stock' },
      { name: 'Carnival 3.5 EX', body: 'MPV', pt: 'Petrol', price: 14999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Carnival Diesel 2.2', body: 'MPV', pt: 'Diesel', price: 15499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Seltos 1.5T', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'EV5 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '64.2 kWh', range: '530 km' },
      { name: 'EV6 GT-Line', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '77.4 kWh', range: '528 km' },
      { name: 'Niro Hybrid', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.32 kWh' },
    ],
  },
  {
    name: 'Hyundai', slug: 'hyundai', origin: 'South Korea', kind: 'car', logo: L('hyundai'),
    accent: 'from-sky-700 to-slate-800',
    tagline: 'Tucson, Elantra, Porter and a growing electric line-up.',
    models: [
      { name: 'Tucson AWD Ultimate 2.0', body: 'SUV', pt: 'Petrol', price: 8799000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tucson FWD GLS Sport', body: 'SUV', pt: 'Petrol', price: 7999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tucson Hybrid', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.49 kWh' },
      { name: 'Elantra GLS 1.6', body: 'Sedan', pt: 'Petrol', price: 6299000, year: 2024, status: 'Dealer Stock' },
      { name: 'Elantra 2.0', body: 'Sedan', pt: 'Petrol', price: 6899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Elantra Hybrid', body: 'Sedan', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.32 kWh' },
      { name: 'Sonata 2.5 FE', body: 'Sedan', pt: 'Petrol', price: 10499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Sonata 2.0 Smart', body: 'Sedan', pt: 'Petrol', price: 9799000, year: 2025, status: 'Dealer Stock' },
      { name: 'Santa Fe 2.5 AWD', body: 'SUV', pt: 'Petrol', price: 13999000, year: 2026, status: 'Coming Soon' },
      { name: 'Staria 3.5 Lounge', body: 'MPV', pt: 'Petrol', price: 14299000, year: 2025, status: 'Dealer Stock' },
      { name: 'Porter H-100', body: 'Pickup', pt: 'Diesel', price: 4699000, year: 2024, status: 'Dealer Stock' },
      { name: 'Ioniq 5 Long Range', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '77.4 kWh', range: '507 km' },
      { name: 'Ioniq 6', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '77.4 kWh', range: '614 km' },
      { name: 'Kona Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '65.4 kWh', range: '490 km' },
      { name: 'Creta 1.5', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'MG', slug: 'mg', origin: 'UK / China', kind: 'car', logo: L('mg'),
    accent: 'from-red-600 to-slate-900',
    tagline: 'Feature-packed crossovers, plug-in hybrids and pure EVs.',
    models: [
      { name: 'HS Super Hybrid PHEV', body: 'Crossover', pt: 'PHEV', price: 10199000, year: 2025, status: 'Available in Pakistan', battery: '16.6 kWh', range: '52 km EV' },
      { name: 'HS Hybrid+', body: 'Crossover', pt: 'Hybrid', price: 9499000, year: 2026, status: 'New Arrival', battery: '1.83 kWh' },
      { name: 'HS Essence 1.5T', body: 'Crossover', pt: 'Petrol', price: 8199000, year: 2025, status: 'Dealer Stock' },
      { name: 'HS Excite 1.5T', body: 'Crossover', pt: 'Petrol', price: 7699000, year: 2025, status: 'Dealer Stock' },
      { name: 'ZS 1.5 Comfort', body: 'Crossover', pt: 'Petrol', price: 6499000, year: 2025, status: 'Dealer Stock' },
      { name: 'ZS 1.5 Luxury', body: 'Crossover', pt: 'Petrol', price: 6899000, year: 2025, status: 'Dealer Stock' },
      { name: 'ZS EV Long Range', body: 'Crossover', pt: 'EV', price: 9999000, year: 2025, status: 'Available in Pakistan', battery: '51 kWh', range: '440 km' },
      { name: 'ZS EV Standard', body: 'Crossover', pt: 'EV', price: 8999000, year: 2025, status: 'Dealer Stock', battery: '44.5 kWh', range: '320 km' },
      { name: 'MG4 EV Long Range', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '64 kWh', range: '450 km' },
      { name: 'MG4 EV Standard', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '51 kWh', range: '350 km' },
      { name: 'MG5 1.5', body: 'Sedan', pt: 'Petrol', price: 5899000, year: 2025, status: 'Dealer Stock' },
      { name: 'MG6 Pro', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'IM5 Intelligent EV', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Pre-Launch', battery: '77 kWh', range: '580 km' },
      { name: 'IM6 Electric SUV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Pre-Launch', battery: '100 kWh', range: '650 km' },
      { name: 'Marvel R Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '70 kWh', range: '402 km' },
      { name: 'Gloster 4x4', body: 'SUV', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
      { name: 'Cyberster Roadster', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '77 kWh', range: '507 km' },
    ],
  },
  {
    name: 'Changan', slug: 'changan', origin: 'China', kind: 'car', logo: L('changan'),
    accent: 'from-cyan-600 to-blue-800',
    tagline: 'Alsvin, Oshan and Pakistan’s most accessible electric city car.',
    models: [
      { name: 'Lumin 205km EV', body: 'Hatchback', pt: 'EV', price: 4849000, year: 2025, status: 'Available in Pakistan', battery: '17.65 kWh', range: '205 km' },
      { name: 'Lumin 301km EV', body: 'Hatchback', pt: 'EV', price: 5499000, year: 2026, status: 'Coming Soon', battery: '28 kWh', range: '301 km' },
      { name: 'Alsvin Lumiere 1.5', body: 'Sedan', pt: 'Petrol', price: 4399000, year: 2025, status: 'Dealer Stock' },
      { name: 'Alsvin Comfort 1.5', body: 'Sedan', pt: 'Petrol', price: 4099000, year: 2025, status: 'Dealer Stock' },
      { name: 'Alsvin Comfort 1.3', body: 'Sedan', pt: 'Petrol', price: 3899000, year: 2024, status: 'Dealer Stock' },
      { name: 'Oshan X7 Comfort', body: 'SUV', pt: 'Petrol', price: 7299000, year: 2025, status: 'Dealer Stock' },
      { name: 'Oshan X7 Futuresense', body: 'SUV', pt: 'Petrol', price: 7899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Oshan X7 7-Seater', body: 'SUV', pt: 'Petrol', price: 8199000, year: 2025, status: 'Dealer Stock' },
      { name: 'Karvaan Plus', body: 'MPV', pt: 'Petrol', price: 2899000, year: 2024, status: 'Dealer Stock' },
      { name: 'M9 Pickup', body: 'Pickup', pt: 'Petrol', price: 3699000, year: 2024, status: 'Dealer Stock' },
      { name: 'CS35 Plus', body: 'Crossover', pt: 'Petrol', price: 6299000, year: 2025, status: 'Dealer Stock' },
      { name: 'CS75 Plus', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Eado Plus', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Hunter Pickup', body: 'Pickup', pt: 'Diesel', price: 8999000, year: 2026, status: 'Coming Soon' },
      { name: 'UNI-T', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'UNI-K', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'Haval', slug: 'haval', origin: 'China', kind: 'car', logo: L('haval'),
    accent: 'from-slate-600 to-slate-900',
    tagline: 'H6, Jolion and GWM’s hybrid SUV family.',
    models: [
      { name: 'H6 HEV 1.5T', body: 'SUV', pt: 'Hybrid', price: 9899000, year: 2025, status: 'Available in Pakistan', battery: '1.8 kWh' },
      { name: 'H6 AWD 2.0T', body: 'SUV', pt: 'Petrol', price: 9299000, year: 2025, status: 'Dealer Stock' },
      { name: 'H6 FWD 1.5T', body: 'SUV', pt: 'Petrol', price: 8399000, year: 2025, status: 'Dealer Stock' },
      { name: 'H6 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '19.9 kWh', range: '100 km EV' },
      { name: 'Jolion Ultra 1.5T', body: 'Crossover', pt: 'Petrol', price: 7099000, year: 2025, status: 'Dealer Stock' },
      { name: 'Jolion Premium 1.5T', body: 'Crossover', pt: 'Petrol', price: 6699000, year: 2025, status: 'Dealer Stock' },
      { name: 'Jolion HEV', body: 'Crossover', pt: 'Hybrid', price: 7999000, year: 2026, status: 'New Arrival', battery: '1.7 kWh' },
      { name: 'H6 GT 2.0T', body: 'Crossover', pt: 'Petrol', price: 10499000, year: 2025, status: 'Dealer Stock' },
      { name: 'H9 4x4 7-Seater', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Dargo 2.0T', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'Chery', slug: 'chery', origin: 'China', kind: 'car', logo: L('chery'),
    accent: 'from-indigo-600 to-slate-900',
    tagline: 'Tiggo family SUVs and Arrizo sedans.',
    models: [
      { name: 'Tiggo 8 Pro 1.6T', body: 'SUV', pt: 'Petrol', price: 9599000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tiggo 8 Pro Max', body: 'SUV', pt: 'Petrol', price: 10299000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tiggo 8 Pro e+ PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '19.3 kWh', range: '75 km EV' },
      { name: 'Tiggo 4 Pro 1.5', body: 'Crossover', pt: 'Petrol', price: 5999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tiggo 4 Pro Turbo', body: 'Crossover', pt: 'Petrol', price: 6499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tiggo 7 Pro 1.5T', body: 'SUV', pt: 'Petrol', price: 7499000, year: 2025, status: 'Dealer Stock' },
      { name: 'Tiggo 7 Pro PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '18.3 kWh', range: '90 km EV' },
      { name: 'Tiggo 9 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '34.5 kWh', range: '150 km EV' },
      { name: 'Arrizo 6 Pro', body: 'Sedan', pt: 'Petrol', price: 5299000, year: 2024, status: 'Dealer Stock' },
      { name: 'Arrizo 8', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'GWM', slug: 'gwm', origin: 'China', kind: 'car', logo: L('gwm'),
    accent: 'from-stone-600 to-stone-900',
    tagline: 'Great Wall pickups and Cannon PHEV.',
    models: [
      { name: 'Cannon 2.0 Diesel', body: 'Pickup', pt: 'Diesel', price: 8999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Cannon 4x4 Diesel', body: 'Pickup', pt: 'Diesel', price: 9899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Cannon Alpha PHEV', body: 'Pickup', pt: 'PHEV', price: 0, year: 2026, status: 'Coming Soon', battery: '37.1 kWh', range: '110 km EV' },
      { name: 'Poer Pickup 2.0T', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
      { name: 'Wingle 7 Diesel', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
      { name: 'Wingle 5', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'Proton', slug: 'proton', origin: 'Malaysia', kind: 'car', logo: L('proton'),
    accent: 'from-teal-600 to-slate-800',
    tagline: 'Saga, X70 and X50 with Geely engineering.',
    models: [
      { name: 'Saga 1.3 AT', body: 'Sedan', pt: 'Petrol', price: 3999000, year: 2025, status: 'Dealer Stock' },
      { name: 'Saga 1.3 MT', body: 'Sedan', pt: 'Petrol', price: 3599000, year: 2024, status: 'Dealer Stock' },
      { name: 'X70 Premium 1.8T', body: 'SUV', pt: 'Petrol', price: 8199000, year: 2025, status: 'Dealer Stock' },
      { name: 'X70 Executive AWD', body: 'SUV', pt: 'Petrol', price: 8899000, year: 2025, status: 'Dealer Stock' },
      { name: 'X70 Standard', body: 'SUV', pt: 'Petrol', price: 7699000, year: 2025, status: 'Dealer Stock' },
      { name: 'X50 Flagship 1.5T', body: 'Crossover', pt: 'Petrol', price: 6799000, year: 2025, status: 'Dealer Stock' },
      { name: 'X50 Executive', body: 'Crossover', pt: 'Petrol', price: 6199000, year: 2025, status: 'Dealer Stock' },
      { name: 'X90 7-Seater MHEV', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '48V MHEV' },
      { name: 'e.MAS 7 EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '60.2 kWh', range: '410 km' },
    ],
  },
  {
    name: 'BAIC', slug: 'baic', origin: 'China', kind: 'car', logo: L('baic'),
    accent: 'from-rose-600 to-slate-900',
    tagline: 'BJ series 4x4s and value crossovers.',
    models: [
      { name: 'BJ40 Plus 4x4', body: 'SUV', pt: 'Petrol', price: 9499000, year: 2025, status: 'Dealer Stock' },
      { name: 'BJ40 SE', body: 'SUV', pt: 'Petrol', price: 8899000, year: 2025, status: 'Dealer Stock' },
      { name: 'X55 Crossover', body: 'Crossover', pt: 'Petrol', price: 6499000, year: 2025, status: 'Dealer Stock' },
      { name: 'X55 II', body: 'Crossover', pt: 'Petrol', price: 6899000, year: 2026, status: 'New Arrival' },
      { name: 'X35 1.5', body: 'Crossover', pt: 'Petrol', price: 5299000, year: 2024, status: 'Dealer Stock' },
      { name: 'BJ30 Hybrid', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '1.8 kWh' },
      { name: 'EU5 Plus Electric', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '55.6 kWh', range: '450 km' },
    ],
  },
  {
    name: 'DFSK', slug: 'dfsk', origin: 'China', kind: 'car', logo: L('dfsk'),
    accent: 'from-amber-600 to-stone-800',
    tagline: 'Glory SUVs and commercial load carriers.',
    models: [
      { name: 'Glory 580 Pro', body: 'SUV', pt: 'Petrol', price: 6899000, year: 2025, status: 'Dealer Stock' },
      { name: 'Glory 580 1.5T', body: 'SUV', pt: 'Petrol', price: 6399000, year: 2025, status: 'Dealer Stock' },
      { name: 'Glory 500', body: 'SUV', pt: 'Petrol', price: 5799000, year: 2024, status: 'Dealer Stock' },
      { name: 'Glory 330S', body: 'MPV', pt: 'Petrol', price: 3299000, year: 2024, status: 'Dealer Stock' },
      { name: 'K01S Loader', body: 'Pickup', pt: 'Petrol', price: 2399000, year: 2024, status: 'Dealer Stock' },
      { name: 'C31 Pickup', body: 'Pickup', pt: 'Petrol', price: 2899000, year: 2024, status: 'Dealer Stock' },
      { name: 'C37 Van', body: 'MPV', pt: 'Petrol', price: 3099000, year: 2024, status: 'Dealer Stock' },
    ],
  },
  {
    name: 'Isuzu', slug: 'isuzu', origin: 'Japan', kind: 'car', logo: L('isuzu'),
    accent: 'from-red-700 to-slate-900',
    tagline: 'D-Max pickups and MU-X 7-seater SUVs.',
    models: [
      { name: 'D-Max V-Cross 3.0', body: 'Pickup', pt: 'Diesel', price: 13499000, year: 2025, status: 'Dealer Stock' },
      { name: 'D-Max Hi-Lander', body: 'Pickup', pt: 'Diesel', price: 11499000, year: 2025, status: 'Dealer Stock' },
      { name: 'D-Max 4x4 Standard', body: 'Pickup', pt: 'Diesel', price: 9999000, year: 2025, status: 'Dealer Stock' },
      { name: 'D-Max 4x2 Cab Chassis', body: 'Pickup', pt: 'Diesel', price: 7499000, year: 2025, status: 'Dealer Stock' },
      { name: 'MU-X 3.0 4x4', body: 'SUV', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'Peugeot', slug: 'peugeot', origin: 'France', kind: 'car', logo: L('peugeot'),
    accent: 'from-blue-800 to-slate-950',
    tagline: 'French design — 2008 crossover assembled locally.',
    models: [
      { name: '2008 Active 1.2T', body: 'Crossover', pt: 'Petrol', price: 6999000, year: 2025, status: 'Dealer Stock' },
      { name: '2008 Allure 1.2T', body: 'Crossover', pt: 'Petrol', price: 7699000, year: 2025, status: 'Dealer Stock' },
      { name: '2008 GT', body: 'Crossover', pt: 'Petrol', price: 8299000, year: 2026, status: 'New Arrival' },
      { name: 'e-2008 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '54 kWh', range: '406 km' },
      { name: '3008 Hybrid', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Expected', battery: '0.9 kWh' },
      { name: '408 Fastback', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'JAC', slug: 'jac', origin: 'China', kind: 'car', logo: L('jac'),
    accent: 'from-red-600 to-red-900',
    tagline: 'T8 pickups and JS crossovers.',
    models: [
      { name: 'T8 4x4 Diesel', body: 'Pickup', pt: 'Diesel', price: 8499000, year: 2025, status: 'Dealer Stock' },
      { name: 'T8 4x2 Diesel', body: 'Pickup', pt: 'Diesel', price: 7499000, year: 2025, status: 'Dealer Stock' },
      { name: 'T9 Hunter 4x4', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Coming Soon' },
      { name: 'JS4 1.5T', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'X200 Loader', body: 'Pickup', pt: 'Diesel', price: 3999000, year: 2024, status: 'Dealer Stock' },
      { name: 'JAC E30X EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '40 kWh', range: '400 km' },
    ],
  },
  {
    name: 'Dongfeng', slug: 'dongfeng', origin: 'China', kind: 'car', logo: L('dongfeng'),
    accent: 'from-red-700 to-slate-900',
    tagline: 'Commercial vans, pickups and Box EV.',
    models: [
      { name: 'Box EV', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '42.3 kWh', range: '430 km' },
      { name: 'Rich 6 Pickup', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Expected' },
      { name: 'Glory 560', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Forthing T5 EVO', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Nammi 01 EV', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '42 kWh', range: '430 km' },
    ],
  },
  {
    name: 'Geely', slug: 'geely', origin: 'China', kind: 'car', logo: L('geely'),
    accent: 'from-blue-700 to-slate-900',
    tagline: 'Coolray, Geometry EVs and Galaxy hybrids.',
    models: [
      { name: 'Coolray 1.5T', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'Geometry C EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '70 kWh', range: '550 km' },
      { name: 'Galaxy E5 EV', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '60.2 kWh', range: '440 km' },
      { name: 'Galaxy L7 PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Expected', battery: '18.7 kWh', range: '115 km EV' },
      { name: 'Emgrand 1.5', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
    ],
  },
  {
    name: 'Nissan', slug: 'nissan', origin: 'Japan', kind: 'car', logo: L('nissan'),
    accent: 'from-red-600 to-slate-900',
    tagline: 'Imported X-Trail, Patrol and the pioneering Leaf EV.',
    models: [
      { name: 'X-Trail e-Power', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '2.1 kWh' },
      { name: 'Patrol V8 Platinum', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Kicks e-Power', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '2.1 kWh' },
      { name: 'Leaf e+', body: 'Hatchback', pt: 'EV', price: 0, year: 2025, status: 'Imported', battery: '62 kWh', range: '385 km' },
      { name: 'Dayz Highway Star', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Note e-Power', body: 'Hatchback', pt: 'Hybrid', price: 0, year: 2025, status: 'Imported', battery: '1.5 kWh' },
    ],
  },
  {
    name: 'Daihatsu', slug: 'daihatsu', origin: 'Japan', kind: 'car', logo: L('daihatsu'),
    accent: 'from-red-600 to-red-900',
    tagline: 'Japan’s favourite kei cars — Mira, Move and Rocky.',
    models: [
      { name: 'Mira X SA III', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Mira e:S', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2024, status: 'Imported' },
      { name: 'Move Custom RS', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Tanto Custom', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Rocky Hybrid', body: 'Crossover', pt: 'Hybrid', price: 0, year: 2025, status: 'Imported', battery: '4.3 kWh' },
      { name: 'Cast Activa', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2024, status: 'Imported' },
    ],
  },
  {
    name: 'Mitsubishi', slug: 'mitsubishi', origin: 'Japan', kind: 'car', logo: L('mitsubishi'),
    accent: 'from-red-700 to-slate-900',
    tagline: 'Outlander PHEV, Pajero and L200 workhorses.',
    models: [
      { name: 'Outlander PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '20 kWh', range: '87 km EV' },
      { name: 'Pajero Sport 2.4D', body: 'SUV', pt: 'Diesel', price: 0, year: 2026, status: 'Imported' },
      { name: 'L200 Triton 4x4', body: 'Pickup', pt: 'Diesel', price: 0, year: 2026, status: 'Imported' },
      { name: 'Xpander Cross', body: 'MPV', pt: 'Petrol', price: 0, year: 2026, status: 'Expected' },
      { name: 'eK X EV', body: 'Hatchback', pt: 'EV', price: 0, year: 2025, status: 'Imported', battery: '20 kWh', range: '180 km' },
    ],
  },
  {
    name: 'MINI', slug: 'mini', origin: 'UK', kind: 'car', logo: L('mini'),
    accent: 'from-slate-800 to-black',
    tagline: 'Iconic go-kart handling, now electric.',
    models: [
      { name: 'Cooper S 3-Door', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Cooper SE Electric', body: 'Hatchback', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '54.2 kWh', range: '402 km' },
      { name: 'Countryman C', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Countryman SE ALL4', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '66.5 kWh', range: '462 km' },
      { name: 'Aceman E', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '42.5 kWh', range: '310 km' },
    ],
  },
  {
    name: 'Mercedes-Benz', slug: 'mercedes-benz', origin: 'Germany', kind: 'car', logo: L('mercedes-benz'),
    accent: 'from-zinc-500 to-zinc-800',
    tagline: 'Executive saloons, AMG performance and EQ electric.',
    models: [
      { name: 'C200 AMG Line', body: 'Sedan', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'C300 4MATIC', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'E200 Avantgarde', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'E350 Exclusive', body: 'Sedan', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'S500 Long', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'GLA 200', body: 'Crossover', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'GLC 300 4MATIC', body: 'SUV', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'GLE 450 4MATIC', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'EQB 350 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '66.5 kWh', range: '423 km' },
      { name: 'EQE 350+ Electric', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '90.6 kWh', range: '639 km' },
      { name: 'EQS 450+', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '108.4 kWh', range: '782 km' },
      { name: 'G63 AMG', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'BMW', slug: 'bmw', origin: 'Germany', kind: 'car', logo: L('bmw'),
    accent: 'from-sky-600 to-blue-900',
    tagline: 'The Ultimate Driving Machine — petrol, hybrid and i electric.',
    models: [
      { name: '320i M Sport', body: 'Sedan', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: '330e Plug-in Hybrid', body: 'Sedan', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '12 kWh', range: '60 km EV' },
      { name: '520i Luxury', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: '530e PHEV', body: 'Sedan', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '19.4 kWh', range: '90 km EV' },
      { name: '730Li', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'X1 sDrive18i', body: 'Crossover', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'X3 xDrive30i', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'X5 xDrive40i', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'X5 xDrive50e PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '29.5 kWh', range: '110 km EV' },
      { name: 'iX1 Electric', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '66.5 kWh', range: '440 km' },
      { name: 'i4 eDrive40', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '83.9 kWh', range: '590 km' },
      { name: 'iX xDrive50', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '111.5 kWh', range: '630 km' },
    ],
  },
  {
    name: 'Audi', slug: 'audi', origin: 'Germany', kind: 'car', logo: L('audi'),
    accent: 'from-neutral-600 to-neutral-900',
    tagline: 'Vorsprung durch Technik — quattro and e-tron.',
    models: [
      { name: 'A3 Sportback 35 TFSI', body: 'Hatchback', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'A4 40 TFSI', body: 'Sedan', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'A6 45 TFSI quattro', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Q2 35 TFSI', body: 'Crossover', pt: 'Petrol', price: 0, year: 2025, status: 'Imported' },
      { name: 'Q3 35 TFSI', body: 'Crossover', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Q5 45 TFSI quattro', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Q7 55 TFSI', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Q4 e-tron', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '82 kWh', range: '520 km' },
      { name: 'Q8 e-tron', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '114 kWh', range: '582 km' },
      { name: 'e-tron GT quattro', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '93.4 kWh', range: '488 km' },
    ],
  },
  {
    name: 'Lexus', slug: 'lexus', origin: 'Japan', kind: 'car', logo: L('lexus'),
    accent: 'from-slate-700 to-black',
    tagline: 'Toyota’s luxury arm — hybrids and the LX flagship.',
    models: [
      { name: 'ES 300h', body: 'Sedan', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '1.6 kWh' },
      { name: 'NX 350h', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '1.6 kWh' },
      { name: 'RX 350h', body: 'SUV', pt: 'Hybrid', price: 0, year: 2026, status: 'Imported', battery: '1.6 kWh' },
      { name: 'LX 600', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'RZ 450e Electric', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '71.4 kWh', range: '440 km' },
    ],
  },
  {
    name: 'Porsche', slug: 'porsche', origin: 'Germany', kind: 'car', logo: L('porsche'),
    accent: 'from-slate-900 to-black',
    tagline: 'Sports cars, Cayenne and the electric Taycan / Macan.',
    models: [
      { name: 'Macan Electric', body: 'SUV', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '100 kWh', range: '613 km' },
      { name: 'Cayenne E-Hybrid', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '25.9 kWh', range: '90 km EV' },
      { name: 'Taycan 4S', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '105 kWh', range: '590 km' },
      { name: '911 Carrera', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Panamera 4', body: 'Sedan', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'Land Rover', slug: 'land-rover', origin: 'UK', kind: 'car', logo: L('land-rover'),
    accent: 'from-emerald-800 to-slate-950',
    tagline: 'Range Rover, Defender and Discovery.',
    models: [
      { name: 'Range Rover Evoque', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Range Rover Velar', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Range Rover Sport PHEV', body: 'SUV', pt: 'PHEV', price: 0, year: 2026, status: 'Imported', battery: '38.2 kWh', range: '120 km EV' },
      { name: 'Range Rover Vogue', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Defender 110', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Discovery Sport', body: 'SUV', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'Tesla', slug: 'tesla', origin: 'USA', kind: 'car', logo: L('tesla'),
    accent: 'from-red-600 to-slate-950',
    tagline: 'Imported Model 3 and Model Y electric vehicles.',
    models: [
      { name: 'Model 3 RWD', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '60 kWh', range: '513 km' },
      { name: 'Model 3 Long Range', body: 'Sedan', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '82 kWh', range: '629 km' },
      { name: 'Model Y RWD', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '60 kWh', range: '455 km' },
      { name: 'Model Y Long Range', body: 'Crossover', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '82 kWh', range: '533 km' },
    ],
  },
];

/* ══════════════════════════════════════════════════════
   BIKE & ELECTRIC SCOOTER BRANDS
   ══════════════════════════════════════════════════════ */

export const BIKE_BRANDS: Brand[] = [
  {
    name: 'Honda', slug: 'honda-bikes', origin: 'Japan / Pakistan', kind: 'bike', logo: L('honda-bikes'),
    accent: 'from-red-600 to-red-800',
    tagline: 'Pakistan’s best-selling motorcycle range from Atlas Honda.',
    models: [
      { name: 'CD 70', body: 'Motorcycle', pt: 'Petrol', price: 164900, year: 2026, status: 'Dealer Stock' },
      { name: 'CD 70 Dream', body: 'Motorcycle', pt: 'Petrol', price: 179900, year: 2026, status: 'Dealer Stock' },
      { name: 'Pridor 100', body: 'Motorcycle', pt: 'Petrol', price: 209900, year: 2026, status: 'Dealer Stock' },
      { name: 'CG 125', body: 'Motorcycle', pt: 'Petrol', price: 249900, year: 2026, status: 'Dealer Stock' },
      { name: 'CG 125 Special Edition', body: 'Motorcycle', pt: 'Petrol', price: 279900, year: 2026, status: 'Dealer Stock' },
      { name: 'CG 125 Self Start', body: 'Motorcycle', pt: 'Petrol', price: 289900, year: 2026, status: 'Dealer Stock' },
      { name: 'CB 125F', body: 'Motorcycle', pt: 'Petrol', price: 359900, year: 2026, status: 'Dealer Stock' },
      { name: 'CB 150F', body: 'Motorcycle', pt: 'Petrol', price: 479900, year: 2026, status: 'Dealer Stock' },
      { name: 'CB 150F Gold Edition', body: 'Motorcycle', pt: 'Petrol', price: 499900, year: 2026, status: 'New Arrival' },
      { name: 'CB 250F', body: 'Motorcycle', pt: 'Petrol', price: 1149000, year: 2026, status: 'Dealer Stock' },
      { name: 'PCX 160 Scooter', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'CRF 250L', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'Yamaha', slug: 'yamaha', origin: 'Japan / Pakistan', kind: 'bike', logo: L('yamaha'),
    accent: 'from-blue-600 to-indigo-900',
    tagline: 'Fuel-injected performance commuters.',
    models: [
      { name: 'YBR 125', body: 'Motorcycle', pt: 'Petrol', price: 429900, year: 2026, status: 'Dealer Stock' },
      { name: 'YBR 125G', body: 'Motorcycle', pt: 'Petrol', price: 459900, year: 2026, status: 'Dealer Stock' },
      { name: 'YB 125Z', body: 'Motorcycle', pt: 'Petrol', price: 379900, year: 2026, status: 'Dealer Stock' },
      { name: 'YB 125Z DX', body: 'Motorcycle', pt: 'Petrol', price: 399900, year: 2026, status: 'Dealer Stock' },
      { name: 'YBR 125 Café Racer', body: 'Motorcycle', pt: 'Petrol', price: 479900, year: 2026, status: 'New Arrival' },
      { name: 'YZF R15 V4', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'MT-15', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'NMAX 155 Scooter', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'Suzuki', slug: 'suzuki-bikes', origin: 'Japan / Pakistan', kind: 'bike', logo: L('suzuki-bikes'),
    accent: 'from-sky-600 to-blue-800',
    tagline: 'GS, GD and GSX road bikes.',
    models: [
      { name: 'GD 110S', body: 'Motorcycle', pt: 'Petrol', price: 419900, year: 2026, status: 'Dealer Stock' },
      { name: 'GS 150', body: 'Motorcycle', pt: 'Petrol', price: 479900, year: 2026, status: 'Dealer Stock' },
      { name: 'GS 150SE', body: 'Motorcycle', pt: 'Petrol', price: 509900, year: 2026, status: 'Dealer Stock' },
      { name: 'GR 150', body: 'Motorcycle', pt: 'Petrol', price: 599900, year: 2026, status: 'Dealer Stock' },
      { name: 'GSX 125', body: 'Motorcycle', pt: 'Petrol', price: 549900, year: 2026, status: 'New Arrival' },
      { name: 'Inazuma 250', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Burgman 125 Scooter', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'United', slug: 'united', origin: 'Pakistan', kind: 'bike', logo: L('united'),
    accent: 'from-emerald-600 to-green-800',
    tagline: 'Value commuters and the US-1 electric scooter.',
    models: [
      { name: 'US 70', body: 'Motorcycle', pt: 'Petrol', price: 129900, year: 2026, status: 'Dealer Stock' },
      { name: 'US 100', body: 'Motorcycle', pt: 'Petrol', price: 154900, year: 2026, status: 'Dealer Stock' },
      { name: 'US 125', body: 'Motorcycle', pt: 'Petrol', price: 189900, year: 2026, status: 'Dealer Stock' },
      { name: 'US 150', body: 'Motorcycle', pt: 'Petrol', price: 274900, year: 2026, status: 'Dealer Stock' },
      { name: 'US-1 Electric Scooter', body: 'Scooter', pt: 'EV', price: 219900, year: 2026, status: 'Available in Pakistan', battery: '2.0 kWh', range: '75 km' },
      { name: 'Scooty 100', body: 'Scooter', pt: 'Petrol', price: 179900, year: 2026, status: 'Dealer Stock' },
    ],
  },
  {
    name: 'Road Prince', slug: 'road-prince', origin: 'Pakistan', kind: 'bike', logo: L('road-prince'),
    accent: 'from-orange-600 to-red-800',
    tagline: 'Robust commuters, loaders and Wego scooters.',
    models: [
      { name: 'RP 70', body: 'Motorcycle', pt: 'Petrol', price: 132900, year: 2026, status: 'Dealer Stock' },
      { name: 'RP 110', body: 'Motorcycle', pt: 'Petrol', price: 172900, year: 2026, status: 'Dealer Stock' },
      { name: 'RP 125', body: 'Motorcycle', pt: 'Petrol', price: 194900, year: 2026, status: 'Dealer Stock' },
      { name: 'Wego 150', body: 'Scooter', pt: 'Petrol', price: 289900, year: 2026, status: 'Dealer Stock' },
      { name: 'Passion Plus', body: 'Motorcycle', pt: 'Petrol', price: 159900, year: 2026, status: 'Dealer Stock' },
      { name: 'Robinson 150', body: 'Motorcycle', pt: 'Petrol', price: 289900, year: 2026, status: 'Dealer Stock' },
    ],
  },
  {
    name: 'Jolta Electric', slug: 'jolta-electric', origin: 'Pakistan', kind: 'bike', logo: L('jolta-electric'),
    accent: 'from-lime-500 to-emerald-800',
    tagline: 'Locally assembled electric motorcycles and scooters.',
    isNew: true,
    models: [
      { name: 'JE 70L Electric', body: 'Motorcycle', pt: 'EV', price: 174900, year: 2026, status: 'Available in Pakistan', battery: '1.6 kWh', range: '70 km' },
      { name: 'JE 70 Pro', body: 'Motorcycle', pt: 'EV', price: 199900, year: 2026, status: 'Available in Pakistan', battery: '2.0 kWh', range: '90 km' },
      { name: 'JE 125 Electric', body: 'Motorcycle', pt: 'EV', price: 249900, year: 2026, status: 'New Arrival', battery: '2.4 kWh', range: '110 km' },
      { name: 'Jolta Scooty E', body: 'Scooter', pt: 'EV', price: 189900, year: 2026, status: 'Available in Pakistan', battery: '1.8 kWh', range: '80 km' },
      { name: 'Jolta Cargo E-Loader', body: 'Scooter', pt: 'EV', price: 269900, year: 2026, status: 'Coming Soon', battery: '3.0 kWh', range: '100 km' },
    ],
  },
  {
    name: 'Vlektra', slug: 'vlektra', origin: 'Pakistan', kind: 'bike', logo: L('vlektra'),
    accent: 'from-cyan-500 to-teal-800',
    tagline: 'Smart electric bikes with swappable batteries.',
    isNew: true,
    models: [
      { name: 'Bolt Electric', body: 'Motorcycle', pt: 'EV', price: 229900, year: 2026, status: 'Available in Pakistan', battery: '2.3 kWh', range: '100 km' },
      { name: 'Retro Electric', body: 'Scooter', pt: 'EV', price: 209900, year: 2026, status: 'Available in Pakistan', battery: '2.0 kWh', range: '85 km' },
      { name: 'Vlektra 125E', body: 'Motorcycle', pt: 'EV', price: 259900, year: 2026, status: 'New Arrival', battery: '2.6 kWh', range: '120 km' },
      { name: 'Vlektra Swift Scooty', body: 'Scooter', pt: 'EV', price: 194900, year: 2026, status: 'Coming Soon', battery: '1.8 kWh', range: '75 km' },
    ],
  },
  {
    name: 'Yadea', slug: 'yadea', origin: 'China', kind: 'bike', logo: L('yadea'),
    accent: 'from-teal-500 to-cyan-800',
    tagline: 'World’s largest electric two-wheeler maker.',
    isNew: true,
    models: [
      { name: 'Yadea C1S Scooter', body: 'Scooter', pt: 'EV', price: 249900, year: 2026, status: 'Available in Pakistan', battery: '2.3 kWh', range: '95 km' },
      { name: 'Yadea G5 Electric', body: 'Scooter', pt: 'EV', price: 299900, year: 2026, status: 'Available in Pakistan', battery: '2.4 kWh', range: '100 km' },
      { name: 'Yadea T9 Electric', body: 'Scooter', pt: 'EV', price: 329900, year: 2026, status: 'New Arrival', battery: '3.0 kWh', range: '120 km' },
      { name: 'Yadea KS3 Pro', body: 'Scooter', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '3.2 kWh', range: '130 km' },
      { name: 'Yadea VFD Electric', body: 'Motorcycle', pt: 'EV', price: 0, year: 2026, status: 'Expected', battery: '4.0 kWh', range: '150 km' },
    ],
  },
  {
    name: 'Evee', slug: 'evee', origin: 'Pakistan', kind: 'bike', logo: L('evee'),
    accent: 'from-purple-500 to-indigo-800',
    tagline: 'Premium electric scooters for urban Pakistan.',
    isNew: true,
    models: [
      { name: 'Evee C1 Scooter', body: 'Scooter', pt: 'EV', price: 234900, year: 2026, status: 'Available in Pakistan', battery: '2.1 kWh', range: '85 km' },
      { name: 'Evee Cargo', body: 'Scooter', pt: 'EV', price: 279900, year: 2026, status: 'Available in Pakistan', battery: '2.9 kWh', range: '95 km' },
      { name: 'Evee Zenith', body: 'Scooter', pt: 'EV', price: 0, year: 2026, status: 'Coming Soon', battery: '3.2 kWh', range: '120 km' },
    ],
  },
  {
    name: 'Metro', slug: 'metro', origin: 'Pakistan', kind: 'bike', logo: L('metro'),
    accent: 'from-amber-500 to-orange-800',
    tagline: 'Economical commuters and loaders.',
    models: [
      { name: 'Metro MR 70', body: 'Motorcycle', pt: 'Petrol', price: 124900, year: 2026, status: 'Dealer Stock' },
      { name: 'Metro MR 110', body: 'Motorcycle', pt: 'Petrol', price: 159900, year: 2026, status: 'Dealer Stock' },
      { name: 'Metro MR 125', body: 'Motorcycle', pt: 'Petrol', price: 179900, year: 2026, status: 'Dealer Stock' },
      { name: 'Metro E-Bike', body: 'Motorcycle', pt: 'EV', price: 169900, year: 2026, status: 'Coming Soon', battery: '1.5 kWh', range: '65 km' },
    ],
  },
  {
    name: 'Kawasaki', slug: 'kawasaki', origin: 'Japan', kind: 'bike', logo: L('kawasaki'),
    accent: 'from-lime-600 to-green-900',
    tagline: 'Imported Ninja and Z series performance bikes.',
    models: [
      { name: 'Ninja 400', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Ninja 650', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Z650', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Ninja ZX-6R', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'KTM', slug: 'ktm', origin: 'Austria', kind: 'bike', logo: L('ktm'),
    accent: 'from-orange-500 to-orange-800',
    tagline: 'Ready to Race — Duke and Adventure series.',
    models: [
      { name: '200 Duke', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: '250 Duke', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: '390 Duke', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: '390 Adventure', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
  {
    name: 'Vespa', slug: 'vespa', origin: 'Italy', kind: 'bike', logo: L('vespa'),
    accent: 'from-teal-500 to-teal-800',
    tagline: 'Iconic Italian scooters.',
    models: [
      { name: 'Vespa Primavera 150', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Vespa Sprint 150', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Vespa GTS 300', body: 'Scooter', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Vespa Elettrica', body: 'Scooter', pt: 'EV', price: 0, year: 2026, status: 'Imported', battery: '4.2 kWh', range: '100 km' },
    ],
  },
  {
    name: 'Benelli', slug: 'benelli', origin: 'Italy / China', kind: 'bike', logo: L('benelli'),
    accent: 'from-green-700 to-slate-900',
    tagline: 'Italian-styled TNT and Leoncino bikes.',
    models: [
      { name: 'TNT 150i', body: 'Motorcycle', pt: 'Petrol', price: 599900, year: 2026, status: 'Dealer Stock' },
      { name: 'TNT 25', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'Leoncino 250', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
      { name: 'TRK 251', body: 'Motorcycle', pt: 'Petrol', price: 0, year: 2026, status: 'Imported' },
    ],
  },
];

/* ── Aggregations ────────────────────────────────────── */

export const ALL_BRANDS = [...BRANDS, ...BIKE_BRANDS];

export const NEW_LAUNCH_BRANDS = BRANDS.filter((b) => b.isNew);

export function getBrand(slug: string): Brand | undefined {
  return ALL_BRANDS.find((b) => b.slug === slug);
}

export function totalModelCount(): number {
  return ALL_BRANDS.reduce((sum, b) => sum + b.models.length, 0);
}

export function brandModelCount(slug: string): number {
  return getBrand(slug)?.models.length ?? 0;
}
