import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/brisk-admin",
  images: { unoptimized: true },
};

export default nextConfig;
