import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.gabrielmihali.com', // Es. 'assets.tuodominio.com' oppure 'pub-xyz.r2.dev'
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;