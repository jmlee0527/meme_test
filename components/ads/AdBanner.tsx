import { AdUnit } from "./AdUnit";
export function AdBanner() { return <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER} className="min-h-[90px]" />; }
