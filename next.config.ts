import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  ignoreDuringBuilds: true,
};

export default nextConfig;
