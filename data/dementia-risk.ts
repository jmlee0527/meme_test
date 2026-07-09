import type { TestDefinition, TestOption } from "@/lib/types";

export type DementiaDomain =
  | "memory"
  | "dailyFunction"
  | "planningJudgment"
  | "language"
  | "orientationAttention"
  | "moodSocial"
  | "healthLifestyle"
  | "cognitiveProtection";

export type DementiaQuestion = {
  id: number;
  text: string;
  domain: DementiaDomain;
  weight: 1.2 | 0.8;
  options: TestOption[];
};

export type DementiaLevelProfile = {
  slug: string;
  level: number;
  name: string;
  icon: string;
  color: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
};

export const dementiaDomainLabels: Record<DementiaDomain, string> = {
  memory: "기억력 변화",
  dailyFunction: "일상 수행 능력",
  planningJudgment: "판단·계획 능력",
  language: "언어·소통 변화",
  orientationAttention: "시간·공간 감각",
  moodSocial: "감정·사회활동 변화",
  healthLifestyle: "건강·생활습관 위험요인",
  cognitiveProtection: "인지 자극·보호요인",
};

const choices: TestOption[] = [
  { label: "1", text: "전혀 아니다", value: 0 },
  { label: "2", text: "거의 아니다", value: 1 },
  { label: "3", text: "가끔 그렇다", value: 2 },
  { label: "4", text: "자주 그렇다", value: 3 },
  { label: "5", text: "매우 자주 그렇다", value: 4 },
];

export const dementiaQuestions: DementiaQuestion[] = [
  { id: 1, domain: "memory", weight: 1.2, text: "최근 6개월~1년 사이, 알림을 확인했는데도 약속이나 해야 할 일을 잊는 일이 예전보다 늘었다.", options: choices },
  { id: 2, domain: "dailyFunction", weight: 1.2, text: "익숙하게 해오던 집안일이나 기기 사용에서 순서가 순간적으로 헷갈려 다시 확인한 적이 늘었다.", options: choices },
  { id: 3, domain: "planningJudgment", weight: 1.2, text: "일정, 비용, 요리 순서처럼 여러 단계를 계획하는 일이 예전보다 오래 걸리거나 부담스럽게 느껴진다.", options: choices },
  { id: 4, domain: "orientationAttention", weight: 1.2, text: "날짜나 요일을 착각하거나 익숙한 이동 경로에서 방향을 잠시 헷갈린 적이 예전보다 늘었다.", options: choices },
  { id: 5, domain: "language", weight: 1.2, text: "대화 중 평소 알던 단어가 잘 떠오르지 않거나 같은 이야기를 반복한다는 말을 들은 적이 늘었다.", options: choices },
  { id: 6, domain: "memory", weight: 1.2, text: "자주 쓰는 물건을 예상하기 어려운 곳에 두고, 지나온 과정을 되짚어도 찾기 어려웠던 일이 늘었다.", options: choices },
  { id: 7, domain: "planningJudgment", weight: 1.2, text: "구매나 계약처럼 판단이 필요한 상황에서 예전과 다른 선택을 해 주변의 걱정을 들은 적이 있다.", options: choices },
  { id: 8, domain: "orientationAttention", weight: 1.2, text: "거리나 위치를 가늠하거나 화면·문서의 여러 정보를 동시에 살피는 일이 전보다 어려워졌다.", options: choices },
  { id: 9, domain: "moodSocial", weight: 1.2, text: "사람을 만나거나 즐기던 취미에 참여하는 일이 예전보다 번거롭고 부담스럽게 느껴진다.", options: choices },
  { id: 10, domain: "moodSocial", weight: 1.2, text: "별다른 이유 없이 예민함, 의심, 불안 또는 의욕 저하가 늘었다고 본인이나 가까운 사람이 느낀다.", options: choices },
  { id: 11, domain: "healthLifestyle", weight: 0.8, text: "잠이 불규칙하거나 충분히 잤다고 생각해도 낮 시간 졸림과 피로가 반복된다.", options: choices },
  { id: 12, domain: "healthLifestyle", weight: 0.8, text: "걷기나 가벼운 운동을 포함해 몸을 움직이는 날이 일주일에 3일보다 적다.", options: choices },
  { id: 13, domain: "healthLifestyle", weight: 0.8, text: "혈압·혈당·콜레스테롤·체중 중 관리가 필요한 항목을 알고도 점검이나 관리를 미루고 있다.", options: choices },
  { id: 14, domain: "healthLifestyle", weight: 0.8, text: "흡연을 지속하거나, 음주량과 빈도를 스스로 줄이기 어렵다고 느끼는 때가 있다.", options: choices },
  { id: 15, domain: "cognitiveProtection", weight: 0.8, text: "독서, 학습, 새로운 활동이나 사람들과의 대화처럼 머리를 쓰고 교류하는 시간이 예전보다 줄었다.", options: choices },
];

const profile = (
  slug: string,
  level: number,
  name: string,
  icon: string,
  color: string,
  minScore: number,
  maxScore: number,
  summary: string,
  description: string,
): DementiaLevelProfile => ({
  slug, level, name, icon, color, minScore, maxScore, summary,
  description: `${description} 이번 결과는 최근 6개월~1년의 변화를 스스로 돌아본 응답과 생활습관 위험요인을 함께 계산한 참고용 자가 체크입니다. 점수가 낮다고 인지 건강을 보장하거나 점수가 높다고 치매 또는 알츠하이머병을 의미하지 않습니다. 수면 부족, 스트레스, 우울과 불안, 약물, 청력·시력 변화, 갑상선이나 영양 상태 등도 기억과 집중에 영향을 줄 수 있습니다. 점수보다 중요한 것은 예전과 다른 변화가 반복되는지, 가까운 사람도 변화를 알아차리는지, 익숙한 일상 수행에 실제 불편이 생기는지입니다.`,
});

export const dementiaLevelProfiles: DementiaLevelProfile[] = [
  profile("dementia-very-low", 1, "매우 낮음", "🟢", "#16a34a", 0, 20, "현재 응답에서는 치매 관련 위험 신호가 낮게 나타납니다.", "기억, 대화, 계획과 익숙한 일상 수행에서 최근의 뚜렷한 변화가 많이 보고되지 않았습니다. 현재의 수면, 운동, 건강관리와 사회적 교류 습관 가운데 잘 유지되는 부분을 확인하고 꾸준히 이어가는 것이 좋습니다."),
  profile("dementia-low", 2, "낮음", "🟩", "#65a30d", 21, 40, "일부 생활습관 위험요인은 있을 수 있으나 뚜렷한 인지 변화 신호는 크지 않습니다.", "몇몇 상황에서 깜빡함이나 집중 저하, 생활 리듬의 부담을 경험할 수 있지만 현재 응답만으로는 인지 변화 신호가 여러 일상 영역에 걸쳐 강하게 반복된다고 보기 어렵습니다. 피로하거나 스트레스가 큰 시기와 평소의 차이를 관찰해 보세요."),
  profile("dementia-caution", 3, "주의 필요", "🟡", "#ca8a04", 41, 60, "기억력이나 생활 패턴에서 변화가 느껴질 수 있어 추적 관찰과 생활습관 점검이 필요합니다.", "기억, 계획, 대화 또는 사회활동 가운데 일부 변화와 생활습관 위험요인이 함께 보고되었습니다. 바로 질환을 뜻하지는 않지만 언제, 얼마나 자주, 어떤 일상 불편으로 이어지는지 기록하면 변화의 원인을 살피는 데 도움이 됩니다. 가까운 사람의 관찰도 함께 확인해 보세요."),
  profile("dementia-consult", 4, "상담 권장", "🟠", "#ea580c", 61, 80, "인지 변화와 생활습관 위험요인이 함께 나타날 가능성이 있어 전문기관 상담을 고려할 수 있습니다.", "최근 변화가 여러 항목에서 반복되고 익숙한 일을 처리하는 과정에도 부담을 줄 가능성이 나타났습니다. 이 결과만으로 원인을 판단할 수는 없으므로 자책하거나 미리 단정하지 마세요. 변화가 시작된 시점과 구체적인 사례, 복용 중인 약, 수면과 건강 상태를 정리해 치매안심센터 또는 의료기관에 상담하면 원인을 구분하는 데 도움이 됩니다."),
  profile("dementia-evaluation", 5, "전문 평가 권장", "🔴", "#dc2626", 81, 100, "최근 변화가 반복되거나 일상생활에 영향을 줄 수 있는 수준으로 보고되어 전문 평가를 권장합니다.", "인지 변화 관련 문항과 생활습관 위험요인에서 높은 빈도의 응답이 반복되었습니다. 이것은 진단 결과가 아니지만, 기억이나 판단의 변화가 실제 일상에 영향을 주고 있다면 미루지 말고 치매안심센터, 신경과 또는 정신건강의학과에 상담하는 편이 좋습니다. 가족이나 가까운 사람과 함께 방문해 관찰한 변화를 설명하면 평가에 도움이 될 수 있습니다."),
];

export const dementiaRiskTest: TestDefinition = {
  type: "quiz",
  slug: "dementia-risk-test",
  title: "치매 위험 지수 테스트",
  shortTitle: "치매 위험 자가 체크",
  cardTitle: "치매 위험 지수 테스트",
  description: "기억력·생활습관·인지 변화로 현재 치매 관련 위험 신호를 확인하는 참고용 자가 체크입니다.",
  category: "건강",
  duration: "약 3분",
  icon: "🧠",
  participants: 1247,
  accent: "green",
  isNew: true,
  itemCount: dementiaQuestions.length,
  questions: dementiaQuestions.map(({ id, text, options }) => ({ id, text, options })),
  resultSlugs: [],
  seoTitle: "치매 위험 지수 테스트 | 기억력·인지 변화 자가 체크",
  seoDescription: "치매 테스트와 기억력 자가 체크로 최근 인지 변화와 생활습관 위험요인을 살펴보세요. 진단이 아닌 참고용 치매 위험 지수 테스트입니다.",
  keywords: ["치매 테스트", "치매 자가진단", "치매 위험 지수 테스트", "기억력 테스트", "알츠하이머 테스트", "치매 초기증상", "치매 예방 테스트"],
  seoContent: {
    heading: "치매 위험 지수 테스트란?",
    paragraphs: [
      "치매 위험 지수 테스트는 최근 6개월~1년 사이의 기억력, 익숙한 일상 수행, 계획과 판단, 언어, 시간·공간 감각의 변화와 수면·운동·건강관리·사회적 연결 같은 생활습관을 함께 살펴보는 참고용 자가 체크입니다. 치매나 알츠하이머병을 진단하는 검사가 아니며, 결과는 현재 느끼는 변화의 패턴을 정리하는 출발점으로 활용할 수 있습니다.",
      "문항은 WHO의 인지저하·치매 위험 감소 가이드라인, Alzheimer’s Association과 CDC가 안내하는 변화 신호, AD8과 Mini-Cog가 다루는 인지·일상 기능 평가 개념을 참고했습니다. 다만 기존 검사 문항이나 수행 과제를 번역·복제하지 않고 한국어 일상 상황에 맞게 새롭게 작성했습니다. 의료기관의 면담, 인지검사 또는 신체검사를 대신하지 않습니다.",
      "나이가 들며 가끔 이름이나 약속이 바로 떠오르지 않는 경험만으로 치매를 의미하지는 않습니다. 이전과 다른 변화가 반복되거나, 익숙한 일을 수행하기 어려워졌거나, 가족과 가까운 사람이 함께 변화를 알아차리고 있다면 점수와 관계없이 치매안심센터·신경과·정신건강의학과 등 전문기관에 상담해 보세요. 갑작스러운 혼란, 말하기 어려움, 한쪽 힘 빠짐처럼 급성 변화가 생기면 즉시 응급 평가를 받아야 합니다.",
    ],
    faqs: [
      ["이 테스트로 치매를 진단할 수 있나요?", "아니요. 최근 변화와 생활습관 위험요인을 확인하는 참고용 자가 체크이며, 정확한 평가는 전문기관의 면담과 인지·신체 평가가 필요합니다."],
      ["점수가 높으면 알츠하이머병인가요?", "아닙니다. 수면, 스트레스, 우울, 약물, 청력·시력과 다른 건강 상태도 기억과 집중에 영향을 줄 수 있어 원인 감별이 필요합니다."],
      ["정상적인 깜빡함과 위험 신호는 어떻게 다른가요?", "한 번의 실수보다 이전과 다른 변화가 반복되고 익숙한 일상 수행에 영향을 주거나 주변 사람도 변화를 알아차리는지가 중요합니다."],
      ["언제 전문기관에 상담해야 하나요?", "변화가 반복되거나 일상생활에 불편을 주면 점수와 관계없이 상담하세요. 갑작스러운 혼란이나 신경학적 증상은 즉시 응급 평가가 필요합니다."],
      ["생활습관을 바꾸면 치매를 막을 수 있나요?", "건강한 생활습관은 전반적인 뇌 건강과 위험요인 관리에 도움이 될 수 있지만 예방을 보장하지는 않습니다. 개인 건강 상태는 의료진과 상의하세요."],
    ],
    assesses: "최근 인지·일상 기능 변화와 수정 가능한 생활습관 위험요인",
  },
};

export const getDementiaLevelProfile = (slug: string) =>
  dementiaLevelProfiles.find((profile) => profile.slug === slug);
