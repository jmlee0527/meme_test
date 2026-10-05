# 미미테스트

Next.js 15 App Router 기반의 확장형 테스트·콘텐츠 플랫폼입니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 콘텐츠 확장

- 테스트와 결과: `data/tests.ts`
- 읽을거리: `data/articles.ts`
- 카테고리 선택 가이드와 추천 순서: `data/test-discovery.ts`
- 광고 슬롯: `.env.local`의 `NEXT_PUBLIC_ADSENSE_SLOT_*`
- 카카오 공유: Kakao Developers 도메인 등록 후 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`

AdSense 공통 스크립트는 `app/layout.tsx`에서 한 번만 로드합니다. 광고 슬롯 환경 변수가 비어 있으면 광고 컴포넌트는 렌더링되지 않습니다.

## 구조 검증

`npm run validate:site`는 실제 테스트·읽을거리 데이터로 대표 URL, 내부 연결, 사이트맵, 색인 정책과 추천 정렬을 검증합니다. `npm run build`의 사전 검사에도 포함됩니다. 참여 수는 실제 집계가 없으므로 노출하거나 정렬에 사용하지 않습니다.

프로덕션 빌드를 로컬에서 실행한 뒤 실제 HTML과 내부 링크도 검사할 수 있습니다.

```powershell
npm run build
npm run start -- --port 3100
# 다른 터미널에서 실행
$env:SITE_CHECK_BASE_URL = "http://localhost:3100"
npm run validate:site
```

배포 후에는 운영 도메인의 메뉴·대표 페이지·robots.txt·sitemap.xml·ads.txt를 다시 확인하고 Search Console에서 대표 페이지와 검색 제외 페이지의 수집 결과를 점검합니다. 검색 색인 설정은 애드센스 승인 보장 수단이 아니며, 재신청 전 콘텐츠의 고유 가치와 정확성도 함께 검토해야 합니다.
