import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [{ source: "/sitemaps.xml", destination: "/sitemap.xml", permanent: true }];
  },
  async headers() {
    return [{
      source: "/ads.txt",
      headers: [
        { key: "Content-Type", value: "text/plain; charset=utf-8" },
        { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
      ],
    }];
  },
};

export default nextConfig;
