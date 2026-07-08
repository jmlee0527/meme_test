import { ImageResponse } from "next/og";

import { getMbtiTypeProfile } from "@/data/mbti";
import { siteConfig } from "@/lib/site";

export const alt = "16가지 성격 유형 테스트 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadNotoSansKr(text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(cssUrl)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match?.[1]) throw new Error("Failed to load Noto Sans KR");
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Image({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const profile = getMbtiTypeProfile(type);
  const title = profile ? profile.name : siteConfig.name;
  const code = profile?.code ?? "";
  const tagline = profile?.tagline ?? siteConfig.tagline;
  const fontText = `${siteConfig.name}${title}${code}${tagline}나의성격유형은mi`;

  let fontData: ArrayBuffer | undefined;
  try {
    fontData = await loadNotoSansKr(fontText);
  } catch {
    fontData = undefined;
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 60%, #4F46E5 100%)", fontFamily: fontData ? "Noto Sans KR" : "sans-serif", position: "relative", color: "white" }}>
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "rgba(255,255,255,0.08)", top: -170, right: -80, display: "flex" }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: 999, background: "rgba(255,255,255,0.08)", bottom: -140, left: -100, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 1, padding: "0 80px" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 6, color: "rgba(255,255,255,0.75)" }}>나의 성격 유형은</div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 96, lineHeight: 1 }}>{profile?.icon ?? "🧩"}</div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 34, fontWeight: 700, letterSpacing: 16, color: "rgba(255,255,255,0.85)" }}>{code}</div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.15, justifyContent: "center" }}>{title}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "rgba(255,255,255,0.8)" }}>{tagline}</div>
          <div style={{ display: "flex", marginTop: 42, fontSize: 26, fontWeight: 700 }}>미미테스트 · 16가지 성격 유형 테스트</div>
        </div>
      </div>
    ),
    { ...size, ...(fontData ? { fonts: [{ name: "Noto Sans KR", data: fontData, style: "normal" as const, weight: 700 as const }] } : {}) },
  );
}
