export type HomeBanner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  href?: string;
};

export const homeBanners: HomeBanner[] = [
  {
    id: "home-brand-01",
    title: "오늘의 나를 가볍게 발견해 보세요",
    subtitle: "팬 퀴즈, 연애.성격 테스트는 바로 시작",
    image: "/banners/home/mimi-home-banner-01.png",
    alt: "미미테스트 홈 광고 배너",
    href: "#test-explorer",
  },
].slice(0, 3);
