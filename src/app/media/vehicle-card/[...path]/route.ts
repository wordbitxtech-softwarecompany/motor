import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 2592000;

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hue(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 360;
}

function silhouette(body: string): string {
  const b = body.toLowerCase();
  if (b.includes('scooter')) {
    return 'M210 430 h90 a40 40 0 1 0 80 0 h220 a40 40 0 1 0 80 0 h40 v-28 h-50 l-30-70 h-160 l-40 70 h-90 z';
  }
  if (b.includes('motorcycle') || b.includes('bike')) {
    return 'M240 430 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0 m210 0 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0 M280 390 l80-70 h90 l50 70 h-40 l-30-40 h-70 l-40 40 z';
  }
  if (b.includes('pickup')) {
    return 'M180 430 h720 v-70 h-210 l-40-90 h-250 l-80 90 h-140 z';
  }
  if (b.includes('mpv') || b.includes('van')) {
    return 'M170 430 h760 v-120 l-70-80 h-430 l-110 80 h-150 z';
  }
  if (b.includes('hatch')) {
    return 'M190 430 h720 v-70 l-90-110 h-320 l-140 90 h-170 z';
  }
  if (b.includes('suv') || b.includes('cross')) {
    return 'M160 430 h780 v-90 l-80-100 h-420 l-120 80 h-160 z';
  }
  return 'M170 430 h760 v-70 l-110-90 h-380 l-120 70 h-150 z';
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  if (!path?.length) {
    return new NextResponse('Not found', { status: 404 });
  }

  const brand = decodeURIComponent(path[0] || 'MOTOR').slice(0, 48);
  const model = decodeURIComponent(path.slice(1).join('/').replace(/\.svg$/i, '') || 'Catalog').slice(0, 72);
  const body = new URL(request.url).searchParams.get('body') || 'Vehicle';
  const accent = hue(`${brand} ${model}`);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-label="${esc(brand)} ${esc(model)} Pakistan">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="30%" r="55%">
      <stop offset="0%" stop-color="hsl(${accent} 70% 45% / 0.28)"/>
      <stop offset="100%" stop-color="hsl(${accent} 70% 45% / 0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#g)"/>
  <rect width="1200" height="750" fill="url(#glow)"/>
  <text x="72" y="88" fill="#94a3b8" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="5">MOTOR PAKISTAN · CATALOG</text>
  <text x="72" y="168" fill="#e2e8f0" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" font-weight="800" letter-spacing="4">${esc(brand.toUpperCase())}</text>
  <text x="72" y="248" fill="#ffffff" font-family="ui-sans-serif, system-ui, sans-serif" font-size="56" font-weight="900">${esc(model)}</text>
  <path d="${silhouette(body)}" fill="hsl(${accent} 35% 72% / 0.18)" stroke="hsl(${accent} 60% 70% / 0.55)" stroke-width="3"/>
  <line x1="160" y1="470" x2="1040" y2="470" stroke="#1e293b" stroke-width="2"/>
  <text x="72" y="680" fill="#64748b" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" font-weight="600">${esc(body)} · Pakistan market</text>
  <text x="1128" y="680" text-anchor="end" fill="#334155" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700">Official listing plate</text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=2592000, immutable',
    },
  });
}
