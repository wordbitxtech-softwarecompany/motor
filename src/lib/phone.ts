/** Accepts 03XXXXXXXXX, 3XXXXXXXXX, 92… or +92… and normalises to +92 3XX XXXXXXX. */
export function normalisePhone(raw: string): string | null {
  const d = raw.replace(/[^\d+]/g, '');
  let core = '';
  if (/^\+92\d{10}$/.test(d)) core = d.slice(3);
  else if (/^92\d{10}$/.test(d)) core = d.slice(2);
  else if (/^0\d{10}$/.test(d)) core = d.slice(1);
  else if (/^3\d{9}$/.test(d)) core = d;
  else return null;
  if (!core.startsWith('3') || core.length !== 10) return null;
  return `+92 ${core.slice(0, 3)} ${core.slice(3)}`;
}

/** E.164 for SMS gateways: +923XXXXXXXXX */
export function phoneE164(displayOrRaw: string): string | null {
  const n = normalisePhone(displayOrRaw);
  if (!n) return null;
  const digits = n.replace(/\D/g, '');
  return `+${digits}`;
}
