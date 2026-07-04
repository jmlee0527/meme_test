export type HeroCopyVariant = {
  id: string;
  /** A/B 테스트 식별용 설명 */
  label: string;
  headline: string;
  accent: string;
  /** h1 안 보조 문구 (선택) */
  tagline?: string;
};

export type HeroCtaKey = "discover" | "start";

/** Hero 공통 카피 — 배지·서브·신뢰 문구 */
export const heroSharedCopy = {
  badge: "✨ 수만 명이 참여한 인기 테스트",
  description:
    "부업, 직장, 연애, 결혼, 성격까지\n다양한 테스트로\n나를 더 깊이 알아보세요",
  secondaryCta: "전체 테스트 보기",
  trustSignals: ["✓ 회원가입 없음", "✓ 무료 결과", "✓ 평균 2분"] as const,
} as const;

/** CTA A/B — NEXT_PUBLIC_HERO_CTA=discover|start */
export const heroCtaVariants = {
  discover: { key: "discover" as const, label: "나 알아보기", href: "#popular-tests" },
  start: { key: "start" as const, label: "테스트 시작하기", href: "#popular-tests" },
} as const;

/**
 * Hero 메인 카피 A/B 후보
 * NEXT_PUBLIC_HERO_VARIANT 환경 변수로 id 지정 (기본: discovery-1)
 */
export const heroCopyVariants: HeroCopyVariant[] = [
  {
    id: "discovery-1",
    label: "1안 — 몰랐던 진짜 나 발견 (기본·추천)",
    headline: "당신도 몰랐던",
    accent: "진짜 나를 발견해보세요",
    tagline: "재미있는 질문으로 새로운 나를 알아가는 시간",
  },
  {
    id: "easy-path",
    label: "2안 — 가장 쉬운 방법",
    headline: "나를 알아보는",
    accent: "가장 쉬운 방법",
    tagline: "재미있는 테스트로 생각보다 정확한 결과를 확인해보세요",
  },
  {
    id: "curious-self",
    label: "3안 — 나는 어떤 사람일까",
    headline: "나는 어떤 사람일까?",
    accent: "궁금했다면 지금 바로 확인해보세요",
  },
  {
    id: "surprise-accuracy",
    label: "4안 — 심심해서 시작, 정확한 결과",
    headline: "심심해서 시작했는데",
    accent: "결과가 너무 정확했다",
    tagline: "수많은 사람들이 놀란 성향 테스트를 만나보세요",
  },
  {
    id: "unknown-self",
    label: "5안 — 알고 있다고 생각했던 나",
    headline: "알고 있다고 생각했던 나,",
    accent: "생각보다 모르는 부분이 많습니다",
  },
  {
    id: "new-me-tonight",
    label: "6안 — 오늘 새로운 나",
    headline: "오늘, 새로운 나를",
    accent: "만나볼 준비 됐나요?",
    tagline: "3분이면 충분해요. 지금의 나를 더 깊이 알아보세요",
  },
  {
    id: "friend-share",
    label: "7안 — 친구 추천 후 놀람",
    headline: "친구가 추천해서 했다가",
    accent: "결과에 놀랐어요",
    tagline: "나도 한번 해볼까? 싶은 순간, 바로 시작하세요",
  },
  {
    id: "explore-all",
    label: "8안 — 성향부터 직장·연애까지",
    headline: "성향부터 직장, 연애까지",
    accent: "한 번에 나를 탐색해보세요",
  },
  {
    id: "fun-start",
    label: "9안 — 재미로 시작",
    headline: "재미로 시작해서",
    accent: "나를 더 알게 되었어요",
    tagline: "짧은 질문, 생각보다 깊은 자기 이해",
  },
  {
    id: "mirror-test",
    label: "10안 — 거울보다 정확한 결과",
    headline: "거울보다 정확한",
    accent: "나만의 테스트 결과",
    tagline: "성향·직장·연애·부업까지, 나를 다각도로 알아보세요",
  },
  {
    id: "hidden-talent",
    label: "11안 — 숨은 나 발견",
    headline: "아직 이름 붙이지 못한",
    accent: "나의 모습을 찾아보세요",
    tagline: "재능, 성격, 관계까지 — 나를 알아가는 종합 테스트",
  },
  {
    id: "one-more-test",
    label: "12안 — 한 번만 더",
    headline: "나도 한번 해볼까?",
    accent: "그 생각, 지금 시작하세요",
    tagline: "결과가 궁금해지는 순간, 이미 반은 성공입니다",
  },
];

export const DEFAULT_HERO_VARIANT = "discovery-1";
export const DEFAULT_HERO_CTA: HeroCtaKey = "discover";

export function getHeroCopyVariant(variantId = process.env.NEXT_PUBLIC_HERO_VARIANT): HeroCopyVariant {
  const id = variantId ?? DEFAULT_HERO_VARIANT;
  return heroCopyVariants.find((variant) => variant.id === id) ?? heroCopyVariants[0];
}

export function getHeroCta(ctaKey = process.env.NEXT_PUBLIC_HERO_CTA): (typeof heroCtaVariants)[HeroCtaKey] {
  const key = (ctaKey ?? DEFAULT_HERO_CTA) as HeroCtaKey;
  return heroCtaVariants[key] ?? heroCtaVariants[DEFAULT_HERO_CTA];
}
