'use client';

import React, { useState } from 'react';
import { FALLBACK_VEHICLE } from '@/lib/media';

/**
 * Vehicle/photo <img> with a guaranteed fallback.
 *
 * Keeps the existing markup and styling exactly as-is — it only adds an
 * onError swap so a failed request can never render a broken-image icon.
 */
export default function VehicleImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  const [current, setCurrent] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => {
        if (current !== FALLBACK_VEHICLE) setCurrent(FALLBACK_VEHICLE);
      }}
    />
  );
}
