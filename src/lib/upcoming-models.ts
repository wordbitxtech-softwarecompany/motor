export interface UpcomingModel {
  name: string;
  category: string;
  status: string;
  window: string;
  note: string;
}

export const UPCOMING_MODELS: UpcomingModel[] = [
  { name: 'BYD Atto 2', category: 'EV', status: 'Expected', window: 'H2 2026', note: 'Compact electric SUV expected to enter local CKD assembly.' },
  { name: 'Omoda 7 PHEV', category: 'PHEV', status: 'Expected', window: '2026', note: 'Fastback plug-in hybrid previewed at Lahore auto shows.' },
  { name: 'Jetour T2', category: 'Petrol / PHEV', status: 'Coming Soon', window: '2026', note: 'Rugged lifestyle SUV with optional plug-in hybrid powertrain.' },
  { name: 'Aion V', category: 'EV', status: 'Expected', window: '2026', note: 'Long-range electric crossover with fast-charging platform.' },
  { name: 'MG4 EV', category: 'EV', status: 'Coming Soon', window: '2026', note: 'Global electric hatchback positioned for urban markets.' },
  { name: 'XPeng L03', category: 'EV', status: 'Pre-Launch', window: '2026', note: 'Smart electric sedan with advanced driver assistance.' },
  { name: 'Nevo Hunter REEV', category: 'REEV', status: 'Expected', window: '2026', note: 'Electric 4x4 pickup with range-extending generator.' }
];
