import { ImageResponse } from "next/og";

import { getTest } from "@/data/tests";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} 테스트`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadNotoSansKr(text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match?.[1]) throw new Error("Failed to load Noto Sans KR");
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = getTest(slug);
  const title = test?.title ?? siteConfig.name;
  const meta = test ? `${test.category} · ${test.duration} · 무료 테스트` : siteConfig.tagline;
  const fontText = `${siteConfig.name}${title}${meta}mi`;

  let fontData: ArrayBuffer | undefined;
  try {
    fontData = await loadNotoSansKr(fontText);
  } catch {
    fontData = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
          fontFamily: fontData ? "Noto Sans KR" : "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "#DBEAFE", top: -170, right: -80, display: "flex" }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: 999, background: "#EDE9FE", bottom: -140, left: -100, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 1, padding: "0 80px" }}>
          <div style={{ display: "flex", fontSize: 110, lineHeight: 1 }}>{test?.icon ?? "✨"}</div>
          <div style={{ display: "flex", marginTop: 34, color: "#0F172A", fontSize: 62, fontWeight: 900, letterSpacing: -2, lineHeight: 1.2, maxWidth: 1000, justifyContent: "center" }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 22, color: "#475569", fontSize: 28, fontWeight: 700 }}>{meta}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
            <div style={{ display: "flex", width: 52, height: 52, alignItems: "center", justifyContent: "center", borderRadius: 16, background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #38BDF8 100%)", color: "white", fontSize: 26, fontWeight: 900 }}>
              mi
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>
              <span style={{ color: "#1E293B" }}>미미</span>
              <span style={{ color: "#7C3AED" }}>테스트</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData ? { fonts: [{ name: "Noto Sans KR", data: fontData, style: "normal" as const, weight: 700 as const }] } : {}),
    },
  );
}
