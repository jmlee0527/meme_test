import type { BigFiveDomain, BigFiveQuestion, BigFiveResultProfile, TestDefinition, TestOption } from "@/lib/types";

const likertOptions: TestOption[] = [
  { label: "A", text: "전혀 아니다", value: 1 },
  { label: "B", text: "아니다", value: 2 },
  { label: "C", text: "보통이다", value: 3 },
  { label: "D", text: "그렇다", value: 4 },
  { label: "E", text: "매우 그렇다", value: 5 },
];

export const bigFiveDomainOrder: BigFiveDomain[] = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"];

export const bigFiveDomainLabels: Record<BigFiveDomain, string> = {
  openness: "개방성",
  conscientiousness: "성실성",
  extraversion: "외향성",
  agreeableness: "친화성",
  neuroticism: "정서 민감성",
};

export const bigFiveDomainShortLabels: Record<BigFiveDomain, string> = {
  openness: "O",
  conscientiousness: "C",
  extraversion: "E",
  agreeableness: "A",
  neuroticism: "N",
};

export const bigFiveDomainDescriptions: Record<BigFiveDomain, { high: string; low: string; neutral: string }> = {
  openness: {
    high: "창의적이고 호기심이 많으며 새로운 경험과 관점을 즐기는 편입니다.",
    low: "익숙하고 검증된 방식, 현실적인 기준과 안정적인 선택을 중요하게 여깁니다.",
    neutral: "새로운 시도와 현실적인 안정 사이에서 상황에 맞게 균형을 잡는 편입니다.",
  },
  conscientiousness: {
    high: "계획적이고 책임감이 강하며 약속과 마감, 실행의 완성도를 중요하게 봅니다.",
    low: "계획보다 유연함과 즉흥성을 선호하고 상황 변화에 맞춰 움직이는 힘이 있습니다.",
    neutral: "필요한 순간에는 계획적으로 움직이지만, 과도한 통제보다는 여지를 남기는 편입니다.",
  },
  extraversion: {
    high: "사람들과 교류하며 에너지를 얻고, 대화와 활동 속에서 존재감이 잘 드러납니다.",
    low: "혼자만의 시간과 깊은 집중을 통해 에너지를 충전하는 내향적 강점이 있습니다.",
    neutral: "사람들과의 시간과 혼자 있는 시간 모두 필요하며, 환경에 따라 에너지 방향이 달라집니다.",
  },
  agreeableness: {
    high: "공감력과 협력성이 높고, 관계의 분위기와 상대의 감정을 섬세하게 고려합니다.",
    low: "상대에게 맞추기보다 사실과 기준을 우선하며 독립적이고 논리적인 판단을 선호합니다.",
    neutral: "배려와 자기 기준 사이에서 균형을 잡으려 하며, 관계와 현실을 함께 살피는 편입니다.",
  },
  neuroticism: {
    high: "감정을 섬세하게 감지하고 변화에 민감하게 반응하는 편이라 스트레스 신호를 빨리 알아차립니다.",
    low: "압박 상황에서도 비교적 차분하고 안정적으로 반응하며 감정 기복이 크지 않은 편입니다.",
    neutral: "평소에는 안정적이지만 중요한 일이나 관계 문제에서는 감정 반응이 또렷해질 수 있습니다.",
  },
};

export const bigFiveQuestions: BigFiveQuestion[] = [
  { id: 1, domain: "openness", text: "새로운 경험이나 낯선 주제를 접하면 먼저 흥미가 생긴다.", options: likertOptions },
  { id: 2, domain: "conscientiousness", text: "해야 할 일을 정리하고 우선순위를 세워 처리하는 편이다.", options: likertOptions },
  { id: 3, domain: "extraversion", text: "사람들과 함께 있을 때 기분이 살아나고 에너지가 생긴다.", options: likertOptions },
  { id: 4, domain: "agreeableness", text: "의견이 달라도 상대의 입장과 감정을 먼저 이해하려고 한다.", options: likertOptions },
  { id: 5, domain: "neuroticism", text: "작은 실수나 애매한 반응도 오래 신경 쓰이는 편이다.", options: likertOptions },
  { id: 6, domain: "openness", text: "익숙한 방식보다 새로운 아이디어나 다른 관점을 시도해보고 싶다.", options: likertOptions },
  { id: 7, domain: "conscientiousness", text: "마감이나 약속 시간을 지키는 것을 중요하게 생각한다.", options: likertOptions },
  { id: 8, domain: "extraversion", text: "처음 만난 사람과도 대화를 시작하는 것이 크게 어렵지 않다.", options: likertOptions },
  { id: 9, domain: "agreeableness", text: "갈등이 생기면 이기는 것보다 서로 납득할 수 있는 방향을 찾고 싶다.", options: likertOptions },
  { id: 10, domain: "neuroticism", text: "스트레스를 받으면 생각이 많아지고 마음이 쉽게 흔들린다.", options: likertOptions },
  { id: 11, domain: "openness", text: "예술, 창작, 철학, 문화처럼 상상력을 자극하는 분야에 끌린다.", options: likertOptions },
  { id: 12, domain: "conscientiousness", text: "주변이나 작업 공간이 정돈되어 있을 때 더 잘 집중한다.", options: likertOptions },
  { id: 13, domain: "extraversion", text: "모임에서 조용히 있기보다 분위기에 참여하는 일이 많다.", options: likertOptions },
  { id: 14, domain: "agreeableness", text: "다른 사람이 힘들어 보이면 그냥 지나치기보다 도와주고 싶어진다.", options: likertOptions },
  { id: 15, domain: "neuroticism", text: "중요한 일을 앞두면 최악의 상황까지 미리 걱정하는 편이다.", options: likertOptions },
  { id: 16, domain: "openness", text: "한 가지 답보다 여러 가능성을 탐색하는 과정이 재미있다.", options: likertOptions },
  { id: 17, domain: "conscientiousness", text: "맡은 일은 끝까지 책임지고 완성하려는 마음이 강하다.", options: likertOptions },
  { id: 18, domain: "extraversion", text: "새로운 모임이나 활동에 참여하면 기대감이 더 큰 편이다.", options: likertOptions },
  { id: 19, domain: "agreeableness", text: "상대가 실수했을 때 바로 비판하기보다 사정을 먼저 들어보려 한다.", options: likertOptions },
  { id: 20, domain: "neuroticism", text: "감정 기복이 비교적 또렷하고 그날의 기분이 행동에 영향을 준다.", options: likertOptions },
  { id: 21, domain: "openness", text: "새로운 취미나 배움거리를 발견하면 직접 해보고 싶어진다.", options: likertOptions },
  { id: 22, domain: "conscientiousness", text: "미루면 마음이 불편해서 가능한 한 빨리 처리하려고 한다.", options: likertOptions },
  { id: 23, domain: "extraversion", text: "발표나 주목받는 상황에서도 내 생각을 표현하는 편이다.", options: likertOptions },
  { id: 24, domain: "agreeableness", text: "사람들의 감정 변화나 분위기를 비교적 잘 알아차린다.", options: likertOptions },
  { id: 25, domain: "neuroticism", text: "사소한 문제도 마음에 걸리면 쉽게 내려놓기 어렵다.", options: likertOptions },
];

export const bigFiveResultProfiles: BigFiveResultProfile[] = [
  {
    slug: "big-five-open-explorer",
    domain: "openness",
    name: "호기심 많은 탐험가",
    icon: "🧭",
    summary: "새로운 관점과 가능성을 발견하는 데 강한 OCEAN 프로필",
    description: "당신의 성격 지도에서 개방성이 가장 두드러집니다. 낯선 아이디어를 두려워하기보다 먼저 들여다보고, 익숙한 답보다 더 나은 가능성을 찾으려는 힘이 있습니다.",
    strengths: ["창의적인 문제 해결", "새로운 환경 적응", "다양한 관점 수용"],
    cautions: ["흥미가 식으면 지속력이 떨어질 수 있음", "현실적인 마감과 자원 계산을 놓치기 쉬움"],
    workStyle: "기획, 콘텐츠, 연구, 브랜딩처럼 새로운 답을 찾는 일에서 강점이 살아납니다.",
    relationshipStyle: "대화 주제가 풍부하고 상대의 다름을 비교적 잘 받아들이는 편입니다.",
    loveStyle: "연애에서도 함께 성장하고 새로운 경험을 나누는 관계에 끌립니다.",
    stressStyle: "반복적이고 변화 없는 환경에서는 답답함을 크게 느낄 수 있습니다.",
    growthPoints: ["아이디어를 실행 가능한 일정으로 쪼개기", "새로운 시도와 마무리 루틴 함께 만들기", "현실적인 제약을 창의성의 재료로 보기"],
  },
  {
    slug: "big-five-steady-planner",
    domain: "conscientiousness",
    name: "믿음직한 설계자",
    icon: "📌",
    summary: "계획과 책임감으로 결과를 만들어내는 OCEAN 프로필",
    description: "당신은 성실성과 실행 안정성이 강하게 드러나는 편입니다. 말보다 행동으로 신뢰를 쌓고, 맡은 일을 흐지부지 넘기기보다 끝까지 완성하려는 태도가 결과를 만듭니다.",
    strengths: ["높은 책임감", "일정과 목표 관리", "꾸준한 실행력"],
    cautions: ["완벽 기준이 높아 스스로를 압박할 수 있음", "예상 밖 변화에 피로를 느끼기 쉬움"],
    workStyle: "운영, 관리, 품질, 프로젝트 진행처럼 정확성과 지속성이 필요한 일에 잘 맞습니다.",
    relationshipStyle: "약속을 지키고 안정감을 주며, 오래 신뢰를 쌓는 관계에 강합니다.",
    loveStyle: "말뿐인 설렘보다 책임 있는 행동과 꾸준한 배려를 중요하게 여깁니다.",
    stressStyle: "계획이 흔들리거나 기준이 불명확할 때 스트레스가 커질 수 있습니다.",
    growthPoints: ["80% 완성도에서 먼저 공유해보기", "예외 상황을 위한 완충 시간 확보", "성과뿐 아니라 회복도 계획에 넣기"],
  },
  {
    slug: "big-five-social-spark",
    domain: "extraversion",
    name: "에너지 커넥터",
    icon: "✨",
    summary: "사람과 활동 속에서 에너지를 키우는 OCEAN 프로필",
    description: "외향성이 가장 두드러지는 당신은 대화와 교류 속에서 생각이 더 선명해지는 편입니다. 사람들 사이에서 자연스럽게 분위기를 만들고, 아이디어를 밖으로 꺼내며 추진력을 얻습니다.",
    strengths: ["관계 형성", "빠른 표현력", "분위기 전환과 추진력"],
    cautions: ["혼자 정리할 시간이 부족하면 결정이 성급해질 수 있음", "자극이 적은 환경에서 집중력이 떨어질 수 있음"],
    workStyle: "영업, 마케팅, 커뮤니티, 발표, 협업 중심 프로젝트에서 존재감이 살아납니다.",
    relationshipStyle: "먼저 다가가고 분위기를 이끄는 편이라 관계의 시작이 자연스럽습니다.",
    loveStyle: "표현이 분명하고 함께하는 시간을 통해 애정을 확인하는 스타일입니다.",
    stressStyle: "고립되거나 소통이 막힌 상황에서 에너지가 빠르게 떨어질 수 있습니다.",
    growthPoints: ["말하기 전 핵심을 짧게 정리하기", "혼자 충전하는 시간을 일정에 넣기", "상대의 속도도 함께 확인하기"],
  },
  {
    slug: "big-five-warm-harmonizer",
    domain: "agreeableness",
    name: "따뜻한 조율자",
    icon: "🤝",
    summary: "공감과 협력으로 관계의 온도를 맞추는 OCEAN 프로필",
    description: "친화성이 강한 당신은 사람 사이의 감정과 분위기를 섬세하게 읽습니다. 협력적인 방식으로 문제를 풀고, 상대가 편안하게 말할 수 있는 공기를 만드는 능력이 좋습니다.",
    strengths: ["높은 공감력", "갈등 완화", "팀워크와 신뢰 형성"],
    cautions: ["거절이 늦어져 부담을 떠안을 수 있음", "내 의견보다 관계 분위기를 우선할 수 있음"],
    workStyle: "HR, 교육, 상담, 고객 경험, 협업 조율처럼 사람을 이해하는 일이 잘 맞습니다.",
    relationshipStyle: "상대의 마음을 살피며 안정적인 관계를 만들지만, 내 욕구 표현도 필요합니다.",
    loveStyle: "따뜻한 배려와 정서적 안정감을 중요하게 여기며 헌신적인 면이 있습니다.",
    stressStyle: "갈등이나 차가운 반응을 오래 마음에 담아둘 수 있습니다.",
    growthPoints: ["부드럽지만 명확하게 거절하기", "상대 감정과 내 책임을 구분하기", "나의 기준도 관계의 일부로 인정하기"],
  },
  {
    slug: "big-five-sensitive-insight",
    domain: "neuroticism",
    name: "섬세한 감정 레이더",
    icon: "🌙",
    summary: "감정 신호와 위험 요소를 민감하게 감지하는 OCEAN 프로필",
    description: "정서 민감성이 가장 눈에 띄는 당신은 상황의 작은 변화와 감정의 미묘한 흔들림을 빠르게 알아차립니다. 때로는 걱정이 많아 피로할 수 있지만, 그만큼 위험 신호와 관계의 결을 세심하게 포착합니다.",
    strengths: ["섬세한 감정 인식", "위험 신호 조기 포착", "깊은 자기 성찰"],
    cautions: ["걱정이 행동을 늦출 수 있음", "작은 신호를 크게 해석해 지칠 수 있음"],
    workStyle: "세밀한 검토, 리스크 관리, 사용자 관찰, 감성 콘텐츠처럼 민감한 감지가 필요한 일에 강점이 있습니다.",
    relationshipStyle: "상대의 말투와 분위기에 민감해 세심하지만, 확인되지 않은 추측은 줄이는 것이 좋습니다.",
    loveStyle: "안정감과 확신을 중요하게 여기며, 진심 어린 표현에 크게 안심합니다.",
    stressStyle: "불확실성이 커질수록 생각이 많아지므로 몸을 진정시키는 루틴이 중요합니다.",
    growthPoints: ["걱정을 사실과 해석으로 나누기", "불안할 때 바로 결론 내리지 않기", "수면·운동·호흡처럼 몸 기반 회복 루틴 만들기"],
  },
];

export const bigFiveTest: TestDefinition = {
  type: "quiz",
  slug: "big-five",
  title: "Big Five 성격 테스트",
  shortTitle: "Big Five 테스트",
  cardTitle: "Big Five 성격 테스트",
  description: "Big Five 성격 테스트는 OCEAN 성격 테스트 기반으로 개방성, 성실성, 외향성, 친화성, 정서 민감성을 분석합니다.",
  category: "성격",
  duration: "약 3분",
  icon: "🌊",
  participants: 2847,
  accent: "indigo",
  isNew: true,
  itemCount: bigFiveQuestions.length,
  questions: bigFiveQuestions.map(({ id, text, options }) => ({ id, text, options })),
  resultSlugs: [],
  seoTitle: "Big Five 성격 테스트 | OCEAN 성격 분석으로 알아보는 진짜 나",
  seoDescription: "Big Five 성격 테스트를 통해 개방성, 성실성, 외향성, 친화성, 정서 민감성을 분석해보세요. OCEAN 성격 테스트 기반 무료 심리테스트.",
  keywords: ["Big Five 성격 테스트", "OCEAN 성격 테스트", "빅파이브 테스트", "성격유형 테스트", "성격 테스트", "성격 검사", "무료 성격 테스트", "OCEAN 테스트", "성격 분석 테스트", "심리테스트"],
};

export const getBigFiveResultProfile = (slug: string) => bigFiveResultProfiles.find((profile) => profile.slug === slug);
