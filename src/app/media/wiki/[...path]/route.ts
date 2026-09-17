import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 2592000;

/**
 * Same-origin proxy for a small allowlist of Wikimedia Commons photos
 * (Honda CD 70 / CG 125 — the bikes that actually run in Pakistan).
 * Filenames must match the Commons file name exactly.
 */
const ALLOWED: Record<string, string> = {
  'Honda_70_2025.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Honda_70_2025.jpg',
  'Honda_cd_70.jpg': 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Honda_cd_70.jpg',
  'Honda_CG125_01.jpg': 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Honda_CG125_01.jpg',
  'CG125_1.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/aa/CG125_1.jpg',
};

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const file = path.join('/');
  const upstream = ALLOWED[file];
  if (!upstream) {
    return new NextResponse('Not found', { status: 404 });
  }

  const res = await fetch(upstream, {
    headers: {
      'User-Agent': 'MOTORPakistan/1.0 (https://motor.wordbitxtech.com/; marketplace demo)',
      Accept: 'image/jpeg,image/*,*/*;q=0.8',
    },
    next: { revalidate: 2592000 },
  });

  if (!res.ok || !res.body) {
    return new NextResponse('Not found', { status: 404 });
  }

  return new NextResponse(res.body, {
    status: 200,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=2592000, immutable',
    },
  });
}
