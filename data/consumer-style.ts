import type { ConsumerQuestion, ConsumerResultProfile, TestDefinition } from "@/lib/types";

// VALS의 질문이나 분류를 사용하지 않고, 소비 동기와 생활양식이라는 상위 개념만 참고해 자체 작성했습니다.
export const consumerQuestions:ConsumerQuestion[]=[
  {id:"p1",domain:"planning",text:"구매하기 전에 필요한 이유와 사용할 상황을 먼저 생각하는 편이다."},
  {id:"p2",domain:"planning",text:"같은 상품이라도 가격과 조건을 여러 곳에서 비교한 뒤 결제한다."},
  {id:"p3",domain:"planning",text:"월별로 소비 한도를 정하거나 지출 내역을 확인하는 습관이 있다."},
  {id:"p4",domain:"planning",reverse:true,text:"결제한 뒤에야 이번 달 예산을 넘겼다는 사실을 알아차릴 때가 많다."},
  {id:"i1",domain:"impulsivity",text:"예상하지 못한 할인 상품을 보면 계획에 없어도 구매하는 편이다."},
  {id:"i2",domain:"impulsivity",text:"기분이 좋지 않을 때 쇼핑이나 외식으로 나를 달래는 경우가 있다."},
  {id:"i3",domain:"impulsivity",text:"한정 수량이나 마감 임박 문구를 보면 결정을 서두르게 된다."},
  {id:"i4",domain:"impulsivity",text:"구매 직후 왜 샀는지 후회하는 물건이 종종 생긴다."},
  {id:"e1",domain:"experience",text:"물건을 소유하는 것보다 여행이나 새로운 경험에 돈을 쓰는 편이 더 만족스럽다."},
  {id:"e2",domain:"experience",text:"취미, 공연, 맛집처럼 기억에 남는 활동을 위해 별도 예산을 마련하고 싶다."},
  {id:"e3",domain:"experience",text:"익숙한 선택보다 처음 해보는 활동이나 공간에 비용을 쓰는 것이 즐겁다."},
  {id:"f1",domain:"future",text:"중요한 장기 목표가 있다면 현재의 소비를 기꺼이 줄일 수 있다."},
  {id:"f2",domain:"future",text:"수입이 생기면 소비하기 전에 저축이나 투자 몫을 먼저 떼어두는 편이다."},
  {id:"f3",domain:"future",text:"몇 년 뒤 필요한 큰돈을 예상하고 미리 준비하는 것이 중요하다고 생각한다."},
  {id:"q1",domain:"quality",text:"가격이 더 비싸더라도 오래 사용할 수 있다면 그 제품을 선택한다."},
  {id:"q2",domain:"quality",text:"자주 사용하는 물건은 저렴한 대안보다 성능과 완성도를 우선한다."},
  {id:"q3",domain:"quality",text:"신뢰할 만한 브랜드와 충분한 사후지원은 추가 비용을 지불할 가치가 있다."},
];

export const consumerResultProfiles:ConsumerResultProfile[]=[
  {slug:"consumer-value-explorer",name:"가성비 탐색형",icon:"🔎",summary:"가격과 효용의 균형을 꼼꼼히 찾는 합리적 소비자",description:"구매 전 비교와 검토를 통해 같은 비용으로 더 나은 효용을 얻으려 합니다. 단순히 가장 싼 상품보다 실제 사용 가치와 조건을 따져 선택하는 경향이 강합니다.",strengths:["가격과 조건을 비교해 불필요한 지출을 줄임","할인과 혜택을 목적에 맞게 활용함","소비 결정을 논리적으로 설명할 수 있음"],cautions:["비교에 너무 많은 시간과 에너지를 쓸 수 있음","할인율 자체가 구매 이유가 되지 않도록 주의"],recommendations:["가격 비교 기준 3개만 정하기","구매 전 24시간 보류 규칙","월간 절약액을 장기 목표로 이동"],typicalScores:{planning:88,impulsivity:27,experience:42,future:66,quality:68}},
  {slug:"consumer-investment-ready",name:"투자 준비형",icon:"📈",summary:"오늘의 선택을 미래의 자산과 연결하는 장기 설계자",description:"현재 만족도 중요하지만 장기 목표와 재무 안정성을 먼저 고려합니다. 소비를 통제하는 데서 끝나지 않고 남은 자원을 저축과 투자로 연결할 가능성이 높은 유형입니다.",strengths:["장기 목표에 맞춰 소비 우선순위를 조정함","저축과 투자 재원을 꾸준히 확보함","감정이나 할인에 흔들림이 비교적 적음"],cautions:["현재의 작은 만족까지 과도하게 미룰 수 있음","투자는 소비 절약과 별개의 위험 관리가 필요함"],recommendations:["비상자금과 투자금 분리","목표별 자동이체 설정","즐거움 예산도 정식 항목으로 배정"],typicalScores:{planning:84,impulsivity:22,experience:45,future:92,quality:62}},
  {slug:"consumer-experience-first",name:"경험 중시형",icon:"🧳",summary:"소유보다 기억과 성장을 선택하는 경험 투자자",description:"여행, 취미, 배움과 새로운 공간처럼 삶의 기억을 확장하는 소비에서 큰 만족을 얻습니다. 경험을 통해 나를 표현하고 관계를 풍성하게 만드는 경향이 있습니다.",strengths:["경험을 통해 만족과 동기를 얻음","새로운 문화와 활동에 개방적임","자기계발 소비를 성장으로 연결하기 쉬움"],cautions:["반복되는 외식과 여행이 고정비처럼 커질 수 있음","경험의 질보다 인증이나 횟수에 치우치지 않기"],recommendations:["연간 경험 예산을 먼저 설정","여행·취미 만족도 기록","무료 또는 저비용 경험과 조합"],typicalScores:{planning:56,impulsivity:52,experience:94,future:48,quality:58}},
  {slug:"consumer-premium-seeker",name:"프리미엄 추구형",icon:"💎",summary:"가격보다 완성도와 오래 쓰는 가치를 중시하는 선택가",description:"자주 사용하는 제품일수록 품질, 브랜드 신뢰와 사후지원을 중요하게 봅니다. 충분히 검토한 뒤 만족도가 높은 하나를 오래 사용하는 소비에 가깝습니다.",strengths:["제품의 수명과 총사용비용을 고려함","핵심 품목의 만족도가 높음","품질 기준이 분명해 중복 구매가 적을 수 있음"],cautions:["브랜드 이미지와 실제 품질을 구분할 필요가 있음","모든 품목에 같은 프리미엄 기준을 적용하면 부담이 커짐"],recommendations:["프리미엄 허용 품목 지정","사용 1회당 비용 계산","보증·수리 조건까지 비교"],typicalScores:{planning:68,impulsivity:35,experience:54,future:61,quality:95}},
  {slug:"consumer-flex",name:"FLEX 소비형",icon:"✨",summary:"현재의 만족과 자기보상에 아낌없이 투자하는 소비자",description:"소비를 단순한 지출보다 성취를 축하하고 나를 표현하는 수단으로 여깁니다. 경험과 품질 모두에서 만족을 추구하며, 마음에 드는 대상에는 과감한 결정을 내립니다.",strengths:["돈을 삶의 만족과 동기 부여에 적극 활용함","취향과 선호가 분명함","좋은 경험을 주변과 나누는 데 익숙함"],cautions:["보상 소비가 반복되면 기준 금액이 계속 높아질 수 있음","미래 목표와 현재 만족의 비율 점검이 필요함"],recommendations:["FLEX 전용 한도 만들기","큰 소비는 48시간 뒤 확정","보상 기준을 소비 외 활동과 분산"],typicalScores:{planning:38,impulsivity:76,experience:78,future:32,quality:80}},
  {slug:"consumer-impulsive",name:"충동 소비형",icon:"⚡",summary:"계획보다 순간의 감정과 자극에 빠르게 반응하는 유형",description:"새로운 상품, 할인과 감정 변화가 구매 결정으로 빠르게 이어질 수 있습니다. 만족을 얻는 속도는 빠르지만 사용하지 않는 물건이나 예상 밖 지출이 쌓이기 쉬운 패턴입니다.",strengths:["새로운 제품과 트렌드를 빠르게 발견함","선택과 실행이 빠름","작은 소비에서 즉각적인 즐거움을 잘 찾음"],cautions:["후회성 구매와 소액 지출 누적 가능성이 큼","감정 상태와 구매 필요성을 구분하는 연습이 필요함"],recommendations:["장바구니 24시간 대기","결제 알림과 주간 소비 합계 확인","감정 소비 대체 행동 3개 정하기"],typicalScores:{planning:22,impulsivity:94,experience:61,future:24,quality:48}},
];

export function getConsumerResultProfile(slug:string){return consumerResultProfiles.find((profile)=>profile.slug===slug);}

export const consumerStyleTest:TestDefinition={
  type:"likert",slug:"consumer-style-test",title:"소비성향 테스트",shortTitle:"소비성향 테스트",cardTitle:"당신은 돈을 어떻게 사용하고 있을까요?",
  description:"평소 소비 습관과 가치관을 바탕으로 당신의 소비 성향을 분석합니다.",category:"돈",duration:"약 2~3분",icon:"💳",participants:3586,accent:"indigo",isNew:true,itemCount:consumerQuestions.length,questions:[],resultSlugs:consumerResultProfiles.map(({slug})=>slug),
  seoTitle:"소비성향 테스트 | 나는 어떤 소비 유형일까?",seoDescription:"돈을 쓰는 방식에는 패턴이 있습니다. 소비 습관과 가치관을 바탕으로 당신의 소비 성향을 분석해보세요.",keywords:["소비성향 테스트","소비 습관 테스트","돈 쓰는 성향 테스트","소비 유형 테스트","재테크 성향 테스트"],
};
