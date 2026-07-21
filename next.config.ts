import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/sitemaps.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category/%EA%B2%B0%ED%98%BC", destination: "/category/%EC%97%B0%EC%95%A0.%EA%B4%80%EA%B3%84", permanent: true },
      { source: "/category/%EB%8F%88", destination: "/category/%EC%A7%81%EC%97%85.%EC%9D%BC%EC%83%81", permanent: true },
      { source: "/category/%EB%B6%80%EC%97%85", destination: "/category/%EC%A7%81%EC%97%85.%EC%9D%BC%EC%83%81", permanent: true },
      { source: "/category/%EC%A7%81%EC%9E%A5", destination: "/category/%EC%A7%81%EC%97%85.%EC%9D%BC%EC%83%81", permanent: true },
      { source: "/category/%EC%84%B1%EA%B2%A9", destination: "/category/%EC%84%B1%EA%B2%A9.%EC%8B%AC%EB%A6%AC", permanent: true },
      { source: "/category/%EC%9A%B4%EC%84%B8", destination: "/category/%EA%B1%B4%EA%B0%95.%EC%9A%B4%EC%84%B8", permanent: true },
      { source: "/category/%EC%9D%8C%EC%8B%9D", destination: "/tests/weekend-food-worldcup", permanent: true },
    ];
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
