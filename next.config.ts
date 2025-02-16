import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cagatayucer.com',
      },
    ],
  },
};

export default nextConfig;
