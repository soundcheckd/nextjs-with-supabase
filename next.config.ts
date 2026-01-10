import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Discogs CDN
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.discogs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'st.discogs.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's.discogs.com',
        pathname: '/**',
      },
      // Supabase Storage (for profile images)
      {
        protocol: 'https',
        hostname: 'safoofpdtltbuhcauzbe.supabase.co',
        pathname: '/storage/**',
      },
      // Generic Supabase storage pattern
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
