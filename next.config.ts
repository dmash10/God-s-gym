import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jsjccnqzmplqacenmhew.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
    // Next.js will auto-serve WebP/AVIF to supported browsers
    formats: ['image/avif', 'image/webp'],
    // Generate responsive sizes for hero-class images
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048, 2560],
  },
  reactStrictMode: true,
};

export default nextConfig;
