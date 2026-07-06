import adsenseConfig from "@/config/adsense.json";

const configuredClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

// 사용자가 제공한 AdSense 계정 ID입니다. Vercel 환경변수로 언제든 교체할 수 있습니다.
export const adsenseClientId = /^ca-pub-\d{16}$/.test(configuredClientId ?? "")
  ? configuredClientId!
  : adsenseConfig.clientId;

export const adsensePublisherId = adsenseClientId.replace(/^ca-/, "");
