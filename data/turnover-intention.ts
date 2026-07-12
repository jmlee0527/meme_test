import rawBank from "@/data/question-banks/turnover-intention.json";
import type { TestDefinition } from "@/lib/types";

// 이직 의향 테스트 — 문항·결과 데이터는 JSON 문제은행을 단일 원본으로 사용합니다.
// 참고한 것은 공개된 이직의도검사의 측정 '개념'뿐이며, 모든 문항·결과 문구는 자체 제작 콘텐츠입니다.
export type TurnoverFactor = "direct_intention" | "attachment" | "growth" | "compensation" | "culture" | "workload";
export type TurnoverQuestion = {
  id: number;
  text: string;
  factor: TurnoverFactor;
  reverse: boolean;
};
export type TurnoverResultLevel = {
  id: string;
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  description: string;
  stayAdvice: string[];
  moveAdvice: string[];
};
export type TurnoverResultFactor = {
  factor: Exclude<TurnoverFactor, "direct_intention">;
  title: string;
  typeName: string;
  description: string;
  guide: string[];
};
type Bank = {
  measurementGuide: string;
  answerLabels: string[];
  factors: Record<TurnoverFactor, { label: string; count: number }>;
  questions: TurnoverQuestion[];
  resultLevels: TurnoverResultLevel[];
  resultFactors: TurnoverResultFactor[];
  disclaimer: string;
};

export const turnoverBank = rawBank as unknown as Bank;
export const TURNOVER_QUESTION_COUNT = 28;
export const turnoverQuestions = turnoverBank.questions;
export const turnoverAnswerLabels = turnoverBank.answerLabels;
export const turnoverFactorLabels = Object.fromEntries(
  Object.entries(turnoverBank.factors).map(([factor, meta]) => [factor, meta.label]),
) as Record<TurnoverFactor, string>;
export const turnoverResultLevels = turnoverBank.resultLevels;
export const turnoverResultFactors = turnoverBank.resultFactors;
export const turnoverDisclaimer = turnoverBank.disclaimer;
export const turnoverMeasurementGuide = turnoverBank.measurementGuide;

export const getTurnoverLevel = (score: number): TurnoverResultLevel =>
  turnoverResultLevels.find((level) => score >= level.minScore && score <= level.maxScore) ?? turnoverResultLevels[0];
export const getTurnoverLevelById = (id: string) => turnoverResultLevels.find((level) => level.id === id);

export const turnoverIntentionTest: TestDefinition = {
  type: "likert",
  slug: "turnover-intention",
  title: "이직 의향 테스트",
  shortTitle: "이직 의향 테스트",
  cardTitle: "지금 나는 회사를 떠나고 싶은 걸까?",
  description: "요즘 회사를 떠나고 싶은 마음, 단순한 기분일까요? 현재 이직 의향과 가장 큰 고민 원인을 확인해 보세요.",
  category: "직업.일상",
  duration: "약 4~5분",
  icon: "🧳",
  thumbnail: "/tests/turnover-intention.svg",
  participants: 512,
  accent: "indigo",
  isNew: true,
  itemCount: TURNOVER_QUESTION_COUNT,
  questions: [],
  resultSlugs: [],
  seoTitle: "이직 의향 테스트 – 지금 회사를 떠나고 싶은 마음은 몇 점일까?",
  seoDescription: "28개의 직장생활 질문으로 현재 이직 의향과 이직을 고민하게 만드는 주요 원인을 확인해 보세요. 성장, 보상, 조직문화, 업무 부담 등 영역별 결과를 제공합니다.",
  keywords: ["이직 의향 테스트", "이직 고민 테스트", "퇴사 고민 테스트", "직장인 심리 테스트", "이직할까 말까 테스트", "회사 그만두고 싶을 때", "직장 만족도 테스트", "이직 준비 체크", "퇴사하고 싶은 이유", "직장생활 테스트"],
  seoContent: {
    heading: "이직 의향 테스트란?",
    paragraphs: [
      "이직 의향 테스트는 최근 3개월의 직장생활을 기준으로, 회사를 떠나고 싶은 마음이 어느 정도인지와 그 마음을 만드는 주요 원인을 함께 살펴보는 자기이해형 직장 심리 테스트입니다. 직접적인 이직 의향과 함께 조직 애착·업무 의미, 성장 가능성, 보상·공정성, 인간관계·조직문화, 업무 부담·회복의 6개 영역을 28문항으로 확인합니다.",
      "결과에서는 0~100점의 이직 의향 점수와 5단계 결과 유형, 영역별 점수 그래프, 그리고 점수가 가장 높은 원인 유형(의미·몰입 저하, 성장 정체, 보상 불균형, 조직문화 피로, 업무 소진)을 알려드립니다. 회사에 남는 경우와 이직을 준비하는 경우 각각 확인해 볼 점도 함께 안내해, 감정적인 퇴사가 아니라 정리된 판단을 돕는 것을 목표로 합니다.",
      "이 테스트는 표준화된 심리검사나 인사평가 도구가 아닌 참고용 콘텐츠이며, 정규직·계약직·프리랜서 등 다양한 근무 형태에서 답할 수 있도록 만들었습니다. 이름, 회사명 같은 개인정보는 입력받지 않고 답변은 서버에 저장되지 않습니다.",
    ],
    faqs: [
      ["어떤 기준으로 답하면 되나요?", "최근 3개월 동안의 직장생활을 떠올리며 가장 가까운 답을 고르면 됩니다. 하나의 사건보다 반복되는 경험을 기준으로 답할수록 결과가 정확해집니다."],
      ["점수는 어떻게 계산되나요?", "28문항을 6개 영역으로 나누어 0~100점으로 환산합니다. 전체 점수는 직접적인 이직 의향 50%와 나머지 5개 원인 영역 평균 50%를 합산해 계산합니다."],
      ["결과가 높으면 퇴사해야 하나요?", "아니요. 이 테스트는 현재 상태를 비추는 참고 자료일 뿐 퇴사 여부를 결정하는 도구가 아닙니다. 결과 화면의 점검 가이드를 따라 원인을 정리한 뒤, 실제 결정은 경력·재정·근무조건을 종합해 판단해 주세요."],
      ["지금 무직이어도 할 수 있나요?", "최근 직장생활 경험이 있다면 그 시기를 떠올리며 답할 수 있습니다. 다만 결과는 현재 재직 중인 경우를 기준으로 작성되어 있습니다."],
    ],
    assesses: "최근 3개월 기준 이직 의향 수준과 이직 고민의 주요 원인 영역",
  },
};
