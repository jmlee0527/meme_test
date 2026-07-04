import { AdUnit } from "./AdUnit";
export function AdSidebar() { return <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR} className="min-h-[280px]" label="사이드바 광고" />; }
