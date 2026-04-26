/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const ONE_YEAR = "public, max-age=31536000, immutable";
    const ONE_HOUR_SWR = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/_next/image/:path*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR }],
      },
      {
        source: "/:path((?!api/).*)",
        headers: [{ key: "Cache-Control", value: ONE_HOUR_SWR }],
      },
    ];
  },
};

export default nextConfig;
