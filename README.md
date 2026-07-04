# '나' 테스트 부스 (Na Test Booth)

Next.js 15 App Router 기반의 확장형 테스트·콘텐츠 플랫폼입니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 콘텐츠 확장

- 테스트와 결과: `data/tests.ts`
- 블로그 글: `data/blog.ts`
- 광고 슬롯: `.env.local`의 `NEXT_PUBLIC_ADSENSE_SLOT_*`
- 카카오 공유: Kakao Developers 도메인 등록 후 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`

AdSense 공통 스크립트는 `app/layout.tsx`에서 한 번만 로드합니다. 광고 슬롯 환경 변수가 비어 있으면 광고 컴포넌트는 렌더링되지 않습니다.
