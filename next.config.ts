import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: [
    "@genkit-ai/googleai",
    "genkit",
    "@genkit-ai/core",
    "@genkit-ai/next",
  ],

  // 👇 Add this
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        tls: false,
        net: false,
        http2: false,
        dns: false,
        async_hooks: false,
        dgram: false,
      };
    }
    return config;
  },
};

export default nextConfig;
