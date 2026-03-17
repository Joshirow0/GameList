import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /* cache check */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
