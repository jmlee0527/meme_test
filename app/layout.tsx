import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | 나를 알아보는 종합 테스트 플랫폼`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: `${siteConfig.name} 편집팀`, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "ko_KR", url: siteConfig.url, siteName: siteConfig.name,
    title: `${siteConfig.name} | 나를 알아보는 종합 테스트 플랫폼`, description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "business",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F8FAFC", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7299086820204972"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name,
          alternateName: siteConfig.englishName, url: siteConfig.url,
          description: siteConfig.description, inLanguage: "ko-KR",
        }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
