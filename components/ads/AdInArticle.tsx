import { AdUnit } from "./AdUnit";
export function AdInArticle() { return <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE} format="fluid" className="min-h-[120px]" label="본문 내 광고" />; }
