import { ImageResponse } from "next/og";

import { getSbtiTypeProfile } from "@/data/sbti";
import { siteConfig } from "@/lib/site";

export const alt = "SBTI 테스트 결과";
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
  const profile = getSbtiTypeProfile(slug);
  const title = profile ? `${profile.code} · ${profile.name}` : siteConfig.name;
  const summary = profile?.summary ?? siteConfig.tagline;
  const fontText = `${siteConfig.name}${title}${summary}나의밈유형은SBTI테스트mi`;

  let fontData: ArrayBuffer | undefined;
  try {
    fontData = await loadNotoSansKr(fontText);
  } catch {
    fontData = undefined;
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F43F5E 0%, #EC4899 60%, #A855F7 100%)", fontFamily: fontData ? "Noto Sans KR" : "sans-serif", position: "relative", color: "white" }}>
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "rgba(255,255,255,0.1)", top: -170, right: -80, display: "flex" }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: 999, background: "rgba(255,255,255,0.1)", bottom: -140, left: -100, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", zIndex: 1, padding: "0 80px" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 6, color: "rgba(255,255,255,0.8)" }}>나의 SBTI는</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 110, lineHeight: 1 }}>{profile?.icon ?? "🤪"}</div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.15, justifyContent: "center" }}>{title}</div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 27, color: "rgba(255,255,255,0.85)", maxWidth: 900 }}>{summary}</div>
          <div style={{ display: "flex", marginTop: 42, fontSize: 26, fontWeight: 700 }}>미미테스트 · SBTI 테스트</div>
        </div>
      </div>
    ),
    { ...size, ...(fontData ? { fonts: [{ name: "Noto Sans KR", data: fontData, style: "normal" as const, weight: 700 as const }] } : {}) },
  );
}
