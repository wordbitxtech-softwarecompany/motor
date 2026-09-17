import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Photographic assets are served from a CDN so they always deploy with the
    // source. Declared here so next/image can optimise them in production.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
  },

  // Canonical URL consolidation — one indexable URL per topic.
  async redirects() {
    return [
      // Short marketing URLs → canonical SEO landing pages
      { source: "/new-cars", destination: "/new-cars-2026", permanent: true },
      { source: "/new-bikes", destination: "/new-bikes-2026", permanent: true },
      { source: "/electric-cars", destination: "/electric-cars-pakistan", permanent: true },
      { source: "/hybrid-cars", destination: "/hybrid-cars-pakistan", permanent: true },
      { source: "/plug-in-hybrid-cars", destination: "/phev-cars-pakistan", permanent: true },
      { source: "/electric-bikes", destination: "/bikes", permanent: true },

      // Editorial
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/guides", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },

      // Legal aliases
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },

      // City aliases → existing city landing pages
      { source: "/cars/lahore", destination: "/cars-in-lahore", permanent: true },
      { source: "/used-cars-pakistan", destination: "/used-cars", permanent: true },
      { source: "/cars/karachi", destination: "/cars-in-karachi", permanent: true },
      { source: "/cars/islamabad", destination: "/cars-in-islamabad", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=2592000" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
