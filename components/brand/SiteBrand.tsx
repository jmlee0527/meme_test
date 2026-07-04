import { siteConfig } from "@/lib/site";

type SiteBrandProps = {
  showTagline?: boolean;
  size?: "header" | "compact";
  className?: string;
};

export function SiteBrand({ showTagline = true, size = "header", className = "" }: SiteBrandProps) {
  const iconSize = size === "header" ? "size-11" : "size-9";
  const iconRadius = size === "header" ? "rounded-[14px]" : "rounded-xl";
  const miSize = size === "header" ? "text-[1.35rem]" : "text-lg";
  const titleSize = size === "header" ? "text-[1.15rem] sm:text-xl" : "text-base";
  const taglineSize = size === "header" ? "text-[0.68rem] sm:text-[11px]" : "text-[10px]";

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <span
        className={`relative grid shrink-0 ${iconSize} place-items-center ${iconRadius} bg-gradient-to-br from-[#7C3AED] via-[#6366F1] to-[#38BDF8] shadow-[0_4px_14px_-2px_rgba(99,102,241,0.45)]`}
        aria-hidden="true"
      >
        <span className={`relative font-black lowercase leading-none tracking-tighter text-white ${miSize}`}>
          m
          <span className="relative inline-block">
            <span className="absolute -top-[0.35em] left-1/2 size-[0.28em] min-h-[3px] min-w-[3px] -translate-x-1/2 rounded-full bg-[#F472B6]" />
            i
          </span>
        </span>
      </span>

      <span className="flex min-w-0 flex-col justify-center leading-none">
        <span className={`font-black tracking-tight ${titleSize}`}>
          <span className="text-[#1E293B]">미미</span>
          <span className="text-[#7C3AED]">테스트</span>
        </span>
        {showTagline && (
          <span className={`mt-1.5 font-medium tracking-[0.14em] text-[#8B7EC8] ${taglineSize}`}>
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
