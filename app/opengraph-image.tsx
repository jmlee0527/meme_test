import { ImageResponse } from "next/og";

import { getHeroCopyVariant, heroSharedCopy } from "@/lib/hero-copy";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - 나를 알아보는 종합 테스트 플랫폼`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const copy = getHeroCopyVariant();

  return new ImageResponse(
    <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:"#F8FAFC", fontFamily:"sans-serif", position:"relative" }}>
      <div style={{ position:"absolute", width:420, height:420, borderRadius:999, background:"#DBEAFE", top:-170, right:-80 }} />
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <div style={{ display:"flex", width:78, height:78, alignItems:"center", justifyContent:"center", borderRadius:22, background:"linear-gradient(135deg, #7C3AED 0%, #6366F1 50%, #38BDF8 100%)", color:"white", fontSize:36, fontWeight:900, letterSpacing:-1, position:"relative" }}>
            <span style={{ position:"relative" }}>m<span style={{ position:"relative" }}><span style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", width:7, height:7, borderRadius:999, background:"#F472B6" }} />i</span></span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", textAlign:"left" }}>
            <div style={{ fontSize:44, fontWeight:900, letterSpacing:-1, lineHeight:1.1 }}>
              <span style={{ color:"#1E293B" }}>미미</span>
              <span style={{ color:"#7C3AED" }}>테스트</span>
            </div>
            <div style={{ marginTop:8, color:"#8B7EC8", fontSize:18, fontWeight:500, letterSpacing:"0.14em" }}>{siteConfig.tagline}</div>
          </div>
        </div>
        <div style={{ marginTop:36, color:"#0F172A", fontSize:48, fontWeight:900, letterSpacing:-2, lineHeight:1.15 }}>{copy.headline}<br />{copy.accent}</div>
        <div style={{ marginTop:20, color:"#475569", fontSize:26, lineHeight:1.4 }}>{heroSharedCopy.description.replace(/\n/g, " · ")}</div>
      </div>
    </div>, size,
  );
}
