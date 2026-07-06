import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return { name: siteConfig.name, short_name: siteConfig.name, description: siteConfig.description, start_url:"/", display:"standalone", background_color:"#F8FAFC", theme_color:"#6366F1", lang:"ko", icons:[{src:"/icon.svg",sizes:"any",type:"image/svg+xml"}] };
}
