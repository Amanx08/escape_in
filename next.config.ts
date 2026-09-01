import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     unoptimized: true, 
     qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.indiaescapes.in",
      },
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
