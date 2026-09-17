export interface UpcomingModel {
  name: string;
  category: string;
  status: string;
  window: string;
  note: string;
}

export const UPCOMING_MODELS: UpcomingModel[] = [
  { name: 'Kaiyi e-Qute 04 + X3 Pro EV', category: 'BEV', status: 'Coming Soon', window: 'May 2026', note: 'Both battery-electric. Official Pakistan listing dated 22 May 2026.' },
  { name: 'Hyptec HT Elite / Ultra Gullwing', category: 'BEV', status: 'Coming Soon', window: 'May 2026', note: 'GAC Hyptec luxury EVs — official pricing/booking phase.' },
  { name: 'AION UT + V', category: 'BEV', status: 'New Arrival', window: 'May 2026 pricing', note: 'Market introduction 6 Nov 2025; factory-price/booking update in May 2026 — same cars, not two separate models.' },
  { name: 'XPENG L03 BEV / REEV', category: 'BEV / REEV', status: 'Coming Soon', window: 'Jul 2026', note: 'Smart sedan listed in both battery-electric and range-extended form.' },
  { name: 'Jetour T2 i-DM', category: 'PHEV', status: 'Coming Soon', window: '6 Jul 2026', note: 'Plug-in hybrid adventure SUV.' },
  { name: 'Jetour T1', category: 'Petrol', status: 'Coming Soon', window: 'Sep 2026', note: 'Pakistan-spec listing currently shows a petrol powertrain.' },
  { name: 'NEVO Hunter', category: 'REEV', status: 'Coming Soon', window: 'Aug 2026', note: 'Range-extended electric pickup — not a Deepal model.' },
  { name: 'OMODA 7 SHS-P', category: 'PHEV', status: 'Coming Soon', window: 'Aug 2026', note: 'Plug-in hybrid follow-up to the OMODA E5 BEV.' },
  { name: 'ORA 5', category: 'BEV', status: 'Coming Soon', window: 'Aug 2026', note: 'New ORA battery-electric model; the brand itself was already in Pakistan.' },
  { name: 'Deepal S09', category: 'BEV', status: 'Expected', window: 'Sep 2026', note: 'New Deepal model addition — Deepal as a brand entered Pakistan earlier than 2025.' },
  { name: 'Deepal G318', category: 'REEV', status: 'Pre-Launch', window: 'Oct 2026', note: 'Electrified off-road SUV with a range extender.' },
  { name: 'JAECOO J8', category: 'PHEV', status: 'Expected', window: 'Oct 2026', note: 'Upcoming JAECOO SUV; Pakistan spec may include petrol and PHEV.' },
  { name: 'NEVO A06 / Q05', category: 'BEV', status: 'Expected', window: 'Oct 2026', note: 'Electrified NEVO models on the current new-car watchlist.' },
  { name: 'AION ES', category: 'BEV', status: 'Expected', window: 'Dec 2026', note: 'Upcoming AION sedan after UT and V.' },
  { name: 'NEVO Q07', category: 'BEV', status: 'Expected', window: 'Dec 2026', note: 'Electrified NEVO SUV listed for late 2026.' },
  { name: 'iCAUR V27 / V23', category: 'BEV', status: 'Expected', window: '2026', note: 'Among the 22 upcoming 2026 models currently listed for Pakistan.' },
  { name: 'Denza B5 / B8', category: 'PHEV', status: 'Expected', window: '2026', note: 'BYD premium Denza SUVs on the 2026 watchlist.' },
  { name: 'BYD Sealion 6 DM-i', category: 'PHEV', status: 'Coming Soon', window: '2026', note: 'Plug-in hybrid SUV listed for the Pakistani market.' },
  { name: 'Jetour G700', category: 'PHEV', status: 'Expected', window: '2027', note: 'Upcoming Jetour flagship — not a 2025/26 completed launch.' },
];
