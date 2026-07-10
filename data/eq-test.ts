import type { EqDomain, EqQuestion, EqResultProfile, TestDefinition, TestOption } from "@/lib/types";

const likertOptions: TestOption[] = [
  { label: "A", text: "그렇지 않다", value: 1 },
  { label: "B", text: "보통이다", value: 2 },
  { label: "C", text: "그렇다", value: 3 },
  { label: "D", text: "매우 그렇다", value: 4 },
];

export const eqDomainLabels: Record<EqDomain, string> = {
  selfAwareness: "자기인식",
  selfRegulation: "자기조절",
  empathy: "공감능력",
  socialSkills: "사회성",
  resilience: "감정회복력",
};

export const eqDomainDescriptions: Record<EqDomain, string> = {
  selfAwareness: "내 감정의 원인과 상태를 알아차리는 능력",
  selfRegulation: "감정을 충동적으로 터뜨리지 않고 조절하는 능력",
  empathy: "상대의 감정과 입장을 이해하는 능력",
  socialSkills: "대화와 협력 속에서 관계를 부드럽게 만드는 능력",
  resilience: "실패나 스트레스 이후 다시 회복하는 능력",
};

export const eqQuestions: EqQuestion[] = [
  { id: 1, domain: "selfAwareness", text: "누군가의 말에 기분이 상했을 때, 왜 그런 감정이 들었는지 비교적 빨리 알아차린다.", options: likertOptions },
  { id: 2, domain: "selfRegulation", text: "화가 나더라도 바로 반응하기보다 잠깐 멈추고 말하려고 한다.", options: likertOptions },
  { id: 3, domain: "empathy", text: "친구의 표정이나 말투만 봐도 기분이 어떤지 어느 정도 짐작할 수 있다.", options: likertOptions },
  { id: 4, domain: "socialSkills", text: "처음 만난 사람과도 어색함을 줄이는 대화를 비교적 잘 시작한다.", options: likertOptions },
  { id: 5, domain: "resilience", text: "실패하거나 실망스러운 일이 있어도 시간이 지나면 다시 시도할 힘을 찾는 편이다.", options: likertOptions },
  { id: 6, domain: "selfAwareness", text: "내가 스트레스를 받는 이유를 스스로 말로 설명할 수 있다.", options: likertOptions },
  { id: 7, domain: "selfRegulation", text: "감정적으로 힘든 날에도 충동적인 선택을 하지 않으려고 조절한다.", options: likertOptions },
  { id: 8, domain: "empathy", text: "의견이 다르더라도 상대가 왜 그렇게 느끼는지 먼저 생각해보려 한다.", options: likertOptions },
  { id: 9, domain: "socialSkills", text: "대화 중 상대가 불편해 보이면 말의 톤이나 방향을 자연스럽게 조정한다.", options: likertOptions },
  { id: 10, domain: "resilience", text: "예상치 못한 일이 생겨도 비교적 빨리 현실을 받아들이고 다음 방법을 찾는다.", options: likertOptions },
  { id: 11, domain: "selfAwareness", text: "감정을 억누르기만 하기보다 지금 어떤 상태인지 건강하게 표현하려고 한다.", options: likertOptions },
  { id: 12, domain: "empathy", text: "다른 사람의 고민을 들을 때 해결보다 공감이 먼저 필요한 순간을 구분할 수 있다.", options: likertOptions },
  { id: 13, domain: "socialSkills", text: "여러 사람과 협력하는 상황에서 각자의 감정과 역할을 함께 살피는 편이다.", options: likertOptions },
  { id: 14, domain: "resilience", text: "비판을 받아도 무너지기보다 내가 배울 점을 찾아보려 한다.", options: likertOptions },
  { id: 15, domain: "selfRegulation", text: "긴장되거나 불안할 때 나를 진정시키는 나만의 방법이 있다.", options: likertOptions },
];

export const eqResultProfiles: EqResultProfile[] = [
  {
    slug: "eq-master",
    name: "감정 마스터",
    icon: "🌟",
    minPercent: 90,
    maxPercent: 100,
    summary: "감정을 이해하고 다루는 능력이 매우 뛰어난 사람",
    description: "자신의 감정을 빠르게 알아차리고, 상대의 감정까지 세심하게 고려할 수 있는 높은 EQ 유형입니다. 갈등 상황에서도 감정에 휩쓸리기보다 상황을 조율하려는 힘이 있고, 회복탄력성도 좋은 편입니다.",
    traits: ["감정 인식 우수", "공감능력 높음", "갈등 관리 능력 우수", "회복탄력성 높음"],
    strengths: ["관계 속 긴장을 빠르게 낮출 수 있음", "상대의 감정을 존중하면서도 내 감정을 표현함", "실패 후 회복 속도가 빠름"],
    growthTips: ["모든 사람의 감정을 책임지려 하지 않기", "내 감정 소모도 주기적으로 확인하기", "잘하는 만큼 쉬는 시간도 의식적으로 확보하기"],
    recommendedActions: ["하루 감정 로그 1줄 쓰기", "중요한 대화 후 내 감정도 점검하기", "도움이 필요한 관계와 거리 조절하기"],
  },
  {
    slug: "eq-empathy-leader",
    name: "공감 리더",
    icon: "💛",
    minPercent: 75,
    maxPercent: 89,
    summary: "사람들의 감정을 잘 이해하는 따뜻한 사람",
    description: "상대의 마음을 살피고 관계의 온도를 맞추는 능력이 좋은 유형입니다. 팀이나 친구 사이에서 자연스럽게 분위기를 부드럽게 만들며, 감정적 신뢰를 쌓는 데 강점이 있습니다.",
    traits: ["높은 공감력", "좋은 인간관계", "팀워크 우수"],
    strengths: ["상대가 말하지 않은 감정도 잘 알아차림", "대화에서 안정감과 따뜻함을 줌", "협력 상황에서 분위기를 좋게 만듦"],
    growthTips: ["상대의 감정과 내 감정을 구분하기", "불편한 감정도 부드럽게 표현하기", "공감 후에는 현실적인 경계도 세우기"],
    recommendedActions: ["거절 문장 미리 연습하기", "고민 상담 후 나의 에너지 확인하기", "칭찬뿐 아니라 요청도 표현하기"],
  },
  {
    slug: "eq-balanced-realist",
    name: "균형 잡힌 현실가",
    icon: "⚖️",
    minPercent: 60,
    maxPercent: 74,
    summary: "감정과 이성을 적절히 조절하는 균형형",
    description: "감정을 완벽히 다루는 단계는 아니지만, 대부분의 상황에서 감정과 현실을 함께 보려는 균형감이 있습니다. 자기이해와 대인관계 역량이 평균 이상이며, 특정 영역을 훈련하면 EQ가 더 안정적으로 올라갈 수 있습니다.",
    traits: ["평균 이상 EQ", "안정적 대인관계", "성장 가능성 높음"],
    strengths: ["감정에 휩쓸려도 다시 정리하려고 함", "관계와 현실의 균형을 고려함", "필요한 순간에는 도움을 요청할 수 있음"],
    growthTips: ["감정이 올라오는 초기 신호 알아차리기", "대화 중 상대 감정을 한 번 더 확인하기", "스트레스 후 회복 루틴 만들기"],
    recommendedActions: ["감정 단어 3개로 하루 정리하기", "중요한 대화 전 원하는 결과 적기", "비판을 들은 뒤 바로 반응하지 않고 10분 쉬기"],
  },
  {
    slug: "eq-growth",
    name: "감정 성장형",
    icon: "🌱",
    minPercent: 40,
    maxPercent: 59,
    summary: "감정 이해 능력을 더 키울 수 있는 단계",
    description: "상황에 따라 감정 기복이 크게 느껴지거나, 내 감정과 상대의 감정을 구분하기 어려운 순간이 있을 수 있습니다. 다만 EQ는 연습으로 충분히 좋아질 수 있는 영역이며, 자기인식과 감정조절 루틴부터 시작하면 변화가 빠르게 느껴질 수 있습니다.",
    traits: ["상황에 따라 감정 기복 존재", "스트레스 관리 훈련 추천", "감정 표현 연습 필요"],
    strengths: ["성장 여지가 큼", "경험을 통해 빠르게 배울 수 있음", "감정을 이해하려는 시도가 이미 시작됨"],
    growthTips: ["감정이 커질 때 즉시 결론 내리지 않기", "내 감정의 이름을 붙이는 연습하기", "상대의 반응을 추측보다 질문으로 확인하기"],
    recommendedActions: ["화가 날 때 3번 숨 쉬고 말하기", "감정 일기 주 3회 쓰기", "힘든 대화 후 회복 시간 확보하기"],
  },
  {
    slug: "eq-potential",
    name: "잠재력 발견형",
    icon: "🔎",
    minPercent: 0,
    maxPercent: 39,
    summary: "감정 인식과 표현 연습이 필요한 단계",
    description: "감정이 올라와도 이유를 파악하기 어렵거나, 스트레스 상황에서 바로 반응해 후회하는 일이 있을 수 있습니다. 이는 부족함을 뜻하기보다 아직 감정을 다루는 방법을 충분히 연습하지 않았다는 신호에 가깝습니다.",
    traits: ["감정 이해 능력 향상 여지 큼", "자기인식 훈련 추천", "표현 방식 연습 필요"],
    strengths: ["작은 루틴만으로 변화가 잘 보일 수 있음", "자기이해를 시작할 좋은 타이밍", "감정 패턴을 알면 관계 개선 가능성이 큼"],
    growthTips: ["감정을 참거나 터뜨리는 것 외의 표현 방식 배우기", "몸의 긴장 신호를 먼저 알아차리기", "내가 원하는 것을 짧은 문장으로 말해보기"],
    recommendedActions: ["오늘의 감정 하나 고르기", "불편한 상황에서 바로 답하지 않기", "믿을 수 있는 사람에게 감정 표현 연습하기"],
  },
];

export const eqTest: TestDefinition = {
  type: "quiz",
  slug: "eq-test",
  title: "EQ 공감능력 테스트",
  shortTitle: "EQ 공감능력 테스트",
  cardTitle: "나의 EQ와 공감 능력은?",
  description: "EQ 테스트와 공감지수 테스트로 감정지능, 자기인식, 공감능력, 감정조절, 사회성, 회복력을 확인해보세요.",
  category: "성격.심리",
  duration: "약 2분",
  icon: "💗",
  thumbnail: "/tests/eq-test.jpg",
  participants:6129,
  accent: "pink",
  isNew: true,
  itemCount: eqQuestions.length,
  questions: eqQuestions.map(({ id, text, options }) => ({ id, text, options })),
  resultSlugs: [],
  seoTitle: "EQ 테스트 | 나의 감정지능과 공감 능력은 몇 점일까?",
  seoDescription: "EQ 테스트와 공감지수 테스트를 통해 나의 감정지능 수준을 확인해보세요. 자기인식, 공감능력, 감정조절, 사회성까지 분석하는 무료 심리테스트입니다.",
  keywords: ["EQ 테스트", "공감지수 테스트", "감정지능 테스트", "EQ 검사", "감성지능 테스트", "감정지능 진단", "공감 능력 테스트", "무료 EQ 테스트", "심리테스트"],
  seoContent: {
    heading: "EQ 테스트란?",
    paragraphs: [
      "EQ 테스트는 감정지능(EQ)을 측정하는 심리테스트입니다. 공감지수 테스트와 함께 자신의 감정을 이해하고 타인의 감정에 반응하는 방식을 살펴볼 수 있습니다.",
      "감정지능은 자신의 감정을 이해하고 조절하는 능력뿐 아니라 타인의 감정을 공감하고 원활한 인간관계를 형성하는 능력을 의미합니다. 이 테스트는 자기인식, 자기조절, 공감능력, 사회성, 감정회복력 5개 영역을 나누어 현재의 감정 패턴을 확인합니다.",
      "공감지수 테스트, 감정지능 테스트, EQ 검사 등으로도 많이 알려져 있으며 최근에는 IQ보다 중요한 역량으로 주목받고 있습니다. 결과는 의학적 진단이 아니라 재미와 자기이해를 위한 참고용 콘텐츠입니다.",
    ],
    faqs: [
      ["EQ는 IQ와 어떻게 다른가요?", "IQ가 논리·추론 같은 인지 능력을 다룬다면, EQ는 감정을 인식하고 조절하며 타인과 관계 맺는 능력을 다룹니다. 직장 생활과 인간관계에서는 EQ의 영향이 크다고 알려져 있습니다."],
      ["EQ는 노력으로 높일 수 있나요?", "네. 감정 일기 쓰기, 감정에 이름 붙이기, 경청 연습처럼 반복 가능한 훈련으로 감정지능은 충분히 발달시킬 수 있습니다. 결과 페이지에서 영역별 성장 팁을 안내합니다."],
      ["결과 점수는 어떻게 나오나요?", "15개 문항의 응답을 5개 영역별로 계산해 EQ 점수와 공감지수 점수, 강점 영역과 보완 영역을 함께 보여드립니다."],
    ],
    assesses: "감정지능과 공감 능력",
  },
};

export const getEqResultProfile = (slug: string) => eqResultProfiles.find((profile) => profile.slug === slug);
