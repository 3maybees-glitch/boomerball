import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/advanced",
        destination: "/locker-room",
        permanent: true,
      },
    ];
  },
  images: {
    // Keep optimization only for a small set of assets (e.g. SiteLogo).
    // Most static/remote images use `unoptimized` to avoid Vercel
    // Image Optimization transformation overages on Hobby.
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
        pathname: "/i/headshots/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
    ],
  },
};

export default nextConfig;
