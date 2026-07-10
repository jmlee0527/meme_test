import type {
  SelfEsteemDomainScores,
  SelfEsteemLevelProfile,
  SelfEsteemQuestion,
  TestDefinition,
} from "@/lib/types";

export const selfEsteemDomains = [
  { key: "selfAcceptance", label: "자기수용", positive: true, color: "from-emerald-500 to-teal-400" },
  { key: "selfEfficacy", label: "자기효능감", positive: true, color: "from-blue-600 to-sky-400" },
  { key: "socialComparison", label: "사회적 비교", positive: false, color: "from-amber-500 to-orange-400" },
  { key: "resilience", label: "실패 회복력", positive: true, color: "from-green-600 to-lime-400" },
  { key: "evaluationSensitivity", label: "타인 평가 민감도", positive: false, color: "from-rose-500 to-pink-400" },
  { key: "selfConfidence", label: "자기신뢰", positive: true, color: "from-indigo-600 to-violet-400" },
  { key: "emotionalStability", label: "감정 안정성", positive: true, color: "from-cyan-600 to-blue-400" },
  { key: "selfCompassion", label: "자기연민", positive: true, color: "from-fuchsia-500 to-purple-400" },
] as const;

export const selfEsteemQuestions: SelfEsteemQuestion[] = [
  {
    id: 1,
    text: "오랫동안 준비한 일이 기대한 만큼 잘되지 않았다. 그날 저녁 나는?",
    options: [
      { label: "A", text: "아쉬운 지점을 적어보고 다음에 바꿀 한 가지를 정한다", value: 0, weights: { resilience: 3, selfEfficacy: 2, emotionalStability: 1 } },
      { label: "B", text: "기분이 가라앉아도 오늘만큼은 쉬어가기로 한다", value: 1, weights: { selfCompassion: 3, selfAcceptance: 2, resilience: 1 } },
      { label: "C", text: "다른 사람이라면 더 잘했을 것 같다는 생각이 이어진다", value: 2, weights: { socialComparison: 3, selfConfidence: -2, emotionalStability: -1 } },
      { label: "D", text: "누가 내 결과를 봤을지 신경 쓰여 관련 대화를 피한다", value: 3, weights: { evaluationSensitivity: 3, selfAcceptance: -2, selfConfidence: -1 } },
    ],
  },
  {
    id: 2,
    text: "친구가 내 능력을 구체적으로 칭찬해 주었다. 가장 가까운 반응은?",
    options: [
      { label: "A", text: "고맙다고 말하면서 어떤 점이 좋았는지 더 들어본다", value: 0, weights: { selfAcceptance: 3, selfConfidence: 2, emotionalStability: 1 } },
      { label: "B", text: "기분은 좋지만 우연히 잘된 부분도 컸다고 덧붙인다", value: 1, weights: { evaluationSensitivity: 1, selfAcceptance: 1, selfConfidence: -1 } },
      { label: "C", text: "부담스러워서 농담으로 빠르게 화제를 바꾼다", value: 2, weights: { evaluationSensitivity: 2, selfAcceptance: -2, selfCompassion: -1 } },
      { label: "D", text: "내가 들인 노력을 알아준 것 같아 자연스럽게 받아들인다", value: 3, weights: { selfEfficacy: 3, selfAcceptance: 2, selfConfidence: 2 } },
    ],
  },
  {
    id: 3,
    text: "조금 어렵지만 흥미로운 역할을 맡아보겠냐는 제안을 받았다. 나는?",
    options: [
      { label: "A", text: "필요한 지원을 확인한 뒤 배우면서 해보겠다고 한다", value: 0, weights: { selfEfficacy: 3, selfConfidence: 2, resilience: 2 } },
      { label: "B", text: "준비할 시간을 충분히 확보할 수 있을 때만 수락한다", value: 1, weights: { emotionalStability: 2, selfEfficacy: 1, evaluationSensitivity: 1 } },
      { label: "C", text: "나보다 더 적합해 보이는 사람이 떠올라 한발 물러선다", value: 2, weights: { socialComparison: 3, selfConfidence: -2, selfEfficacy: -1 } },
      { label: "D", text: "실수했을 때 남을 실망시킬 것 같아 이유를 만들어 거절한다", value: 3, weights: { evaluationSensitivity: 3, selfEfficacy: -2, emotionalStability: -1 } },
    ],
  },
  {
    id: 4,
    text: "SNS에서 또래가 큰 성과를 냈다는 소식을 보았다. 이후의 생각은?",
    options: [
      { label: "A", text: "부럽지만 그 사람의 과정과 내 속도는 다르다고 생각한다", value: 0, weights: { socialComparison: -3, selfAcceptance: 2, emotionalStability: 2 } },
      { label: "B", text: "자극을 받아 내가 지금 할 수 있는 작은 일을 시작한다", value: 1, weights: { selfEfficacy: 3, resilience: 2, socialComparison: 1 } },
      { label: "C", text: "내가 뒤처진 이유를 찾느라 다른 사람의 소식까지 계속 본다", value: 2, weights: { socialComparison: 3, emotionalStability: -2, selfCompassion: -1 } },
      { label: "D", text: "괜찮은 척하지만 내 성과를 보여줄 방법이 신경 쓰인다", value: 3, weights: { evaluationSensitivity: 3, socialComparison: 2, selfAcceptance: -1 } },
    ],
  },
  {
    id: 5,
    text: "회의에서 내가 낸 의견이 채택되지 않았다. 회의가 끝난 뒤 나는?",
    options: [
      { label: "A", text: "선택된 안의 이유를 듣고 내 의견에서 쓸 부분을 찾는다", value: 0, weights: { resilience: 3, emotionalStability: 2, selfEfficacy: 1 } },
      { label: "B", text: "아쉽지만 의견과 내 능력은 별개의 일이라고 정리한다", value: 1, weights: { selfAcceptance: 3, selfConfidence: 2, emotionalStability: 2 } },
      { label: "C", text: "발언할 때 사람들이 보인 표정을 계속 떠올린다", value: 2, weights: { evaluationSensitivity: 3, emotionalStability: -2, selfConfidence: -1 } },
      { label: "D", text: "다음부터는 확실할 때만 의견을 내야겠다고 생각한다", value: 3, weights: { selfConfidence: -3, selfEfficacy: -2, evaluationSensitivity: 2 } },
    ],
  },
  {
    id: 6,
    text: "사소하지만 눈에 띄는 실수를 발견했다. 가장 먼저 하는 행동은?",
    options: [
      { label: "A", text: "영향 범위를 확인하고 필요한 사람에게 바로 알린다", value: 0, weights: { selfConfidence: 3, selfEfficacy: 2, emotionalStability: 2 } },
      { label: "B", text: "고친 뒤 같은 실수를 막을 간단한 장치를 만든다", value: 1, weights: { resilience: 3, selfEfficacy: 3, selfCompassion: 1 } },
      { label: "C", text: "누가 알아차렸는지부터 확인하며 한동안 긴장한다", value: 2, weights: { evaluationSensitivity: 3, emotionalStability: -2, selfAcceptance: -1 } },
      { label: "D", text: "왜 이것도 제대로 못 했는지 스스로를 오래 몰아붙인다", value: 3, weights: { selfCompassion: -3, selfAcceptance: -2, resilience: -1 } },
    ],
  },
  {
    id: 7,
    text: "낯선 사람들과 하루 동안 함께 일해야 한다. 시작할 때 나는?",
    options: [
      { label: "A", text: "먼저 역할을 파악하고 필요한 질문부터 해본다", value: 0, weights: { selfEfficacy: 3, selfConfidence: 2, emotionalStability: 1 } },
      { label: "B", text: "분위기를 조금 관찰한 뒤 편한 사람부터 대화를 시작한다", value: 1, weights: { emotionalStability: 2, selfAcceptance: 1, selfConfidence: 1 } },
      { label: "C", text: "내가 어색해 보이지 않는지 신경 쓰느라 말수가 줄어든다", value: 2, weights: { evaluationSensitivity: 3, selfConfidence: -2, emotionalStability: -1 } },
      { label: "D", text: "다른 사람들이 훨씬 능숙해 보여 시키는 일만 기다린다", value: 3, weights: { socialComparison: 3, selfEfficacy: -2, selfConfidence: -2 } },
    ],
  },
  {
    id: 8,
    text: "가까운 사람이 내 의도를 다르게 이해하고 서운해한다. 나는?",
    options: [
      { label: "A", text: "상대가 느낀 점을 듣고 내가 전하려던 뜻도 차분히 말한다", value: 0, weights: { emotionalStability: 3, selfConfidence: 2, selfAcceptance: 1 } },
      { label: "B", text: "미안한 부분은 인정하되 모든 책임을 내 몫으로 보지는 않는다", value: 1, weights: { selfAcceptance: 3, selfCompassion: 2, emotionalStability: 2 } },
      { label: "C", text: "관계가 나빠질까 걱정돼 내 입장은 말하지 않고 맞춰준다", value: 2, weights: { evaluationSensitivity: 3, selfConfidence: -2, selfAcceptance: -1 } },
      { label: "D", text: "내가 원래 사람을 불편하게 만드는 편인지 되짚어본다", value: 3, weights: { selfAcceptance: -2, socialComparison: 2, selfCompassion: -2 } },
    ],
  },
  {
    id: 9,
    text: "여러 선택지 중 중요한 결정을 혼자 내려야 한다. 나의 방식은?",
    options: [
      { label: "A", text: "기준을 몇 가지 정하고 충분한 정보 안에서 선택한다", value: 0, weights: { selfConfidence: 3, selfEfficacy: 2, emotionalStability: 2 } },
      { label: "B", text: "믿는 사람의 의견을 듣되 마지막 결정은 내가 내린다", value: 1, weights: { selfConfidence: 2, selfAcceptance: 2, selfEfficacy: 1 } },
      { label: "C", text: "잘못 고를까 불안해 여러 사람에게 같은 질문을 반복한다", value: 2, weights: { evaluationSensitivity: 3, emotionalStability: -2, selfConfidence: -1 } },
      { label: "D", text: "나보다 경험 많은 사람의 선택을 그대로 따르는 편이 편하다", value: 3, weights: { socialComparison: 2, selfConfidence: -3, selfEfficacy: -1 } },
    ],
  },
  {
    id: 10,
    text: "처음 만난 사람이 내 경력이나 취미를 물었다. 나는?",
    options: [
      { label: "A", text: "대단하지 않아도 요즘 흥미를 느끼는 부분을 이야기한다", value: 0, weights: { selfAcceptance: 3, selfConfidence: 2, emotionalStability: 1 } },
      { label: "B", text: "상대와 공통점이 생길 만한 경험을 골라 편하게 답한다", value: 1, weights: { selfEfficacy: 2, emotionalStability: 2, evaluationSensitivity: -1 } },
      { label: "C", text: "상대의 이력과 비교해 초라해 보일 내용은 빼고 말한다", value: 2, weights: { socialComparison: 3, evaluationSensitivity: 2, selfAcceptance: -1 } },
      { label: "D", text: "어떻게 평가할지 신경 쓰여 짧게 답하고 질문을 돌린다", value: 3, weights: { evaluationSensitivity: 3, selfConfidence: -2, emotionalStability: -1 } },
    ],
  },
  {
    id: 11,
    text: "컨디션이 좋지 않아 계획한 일을 절반밖에 하지 못했다. 나는?",
    options: [
      { label: "A", text: "오늘 가능한 만큼 했다고 보고 남은 일정을 다시 나눈다", value: 0, weights: { selfCompassion: 3, selfEfficacy: 2, resilience: 2 } },
      { label: "B", text: "쉬는 것도 일정의 일부라 생각하고 회복을 우선한다", value: 1, weights: { selfCompassion: 3, selfAcceptance: 2, emotionalStability: 2 } },
      { label: "C", text: "다른 사람들은 이런 날에도 해낼 것 같아 마음이 급해진다", value: 2, weights: { socialComparison: 3, emotionalStability: -2, selfCompassion: -1 } },
      { label: "D", text: "계획을 지키지 못한 나에게 실망해 다음 일도 손에 잡히지 않는다", value: 3, weights: { selfAcceptance: -3, resilience: -2, selfEfficacy: -1 } },
    ],
  },
  {
    id: 12,
    text: "새로운 기술을 배우는데 생각보다 진도가 느리다. 그다음 선택은?",
    options: [
      { label: "A", text: "처음보다 나아진 부분을 확인하고 연습 단위를 줄인다", value: 0, weights: { selfEfficacy: 3, resilience: 3, selfCompassion: 1 } },
      { label: "B", text: "나와 맞는 학습 방식이 무엇인지 다른 방법을 시험한다", value: 1, weights: { selfConfidence: 2, selfEfficacy: 2, selfAcceptance: 1 } },
      { label: "C", text: "비슷한 시기에 시작한 사람의 속도를 자주 확인한다", value: 2, weights: { socialComparison: 3, selfEfficacy: -2, emotionalStability: -1 } },
      { label: "D", text: "재능이 없는 것 같아 더 늦기 전에 그만둘 이유를 찾는다", value: 3, weights: { selfEfficacy: -3, resilience: -2, selfConfidence: -1 } },
    ],
  },
  {
    id: 13,
    text: "내가 준비한 결과물에 예상보다 날카로운 피드백이 달렸다. 나는?",
    options: [
      { label: "A", text: "내용과 말투를 구분해 쓸 수 있는 의견만 골라본다", value: 0, weights: { emotionalStability: 3, selfConfidence: 2, resilience: 2 } },
      { label: "B", text: "바로 답하지 않고 감정이 가라앉은 뒤 다시 읽어본다", value: 1, weights: { selfCompassion: 2, emotionalStability: 3, selfAcceptance: 1 } },
      { label: "C", text: "좋았던 반응보다 그 한마디가 더 오래 머릿속에 남는다", value: 2, weights: { evaluationSensitivity: 3, emotionalStability: -2, selfAcceptance: -1 } },
      { label: "D", text: "다음 결과물은 눈에 띄지 않게 안전한 방식으로 만들고 싶어진다", value: 3, weights: { evaluationSensitivity: 2, selfConfidence: -2, selfEfficacy: -2 } },
    ],
  },
  {
    id: 14,
    text: "친한 사람과 의견이 다르지만 내게 중요한 문제다. 나는?",
    options: [
      { label: "A", text: "관계를 지키면서도 왜 중요한지 내 기준을 설명한다", value: 0, weights: { selfConfidence: 3, emotionalStability: 2, selfAcceptance: 2 } },
      { label: "B", text: "서로 다를 수 있다고 보고 합의할 부분과 남길 부분을 나눈다", value: 1, weights: { selfAcceptance: 3, selfCompassion: 2, emotionalStability: 2 } },
      { label: "C", text: "상대가 나를 불편하게 볼까 봐 적당히 동의하고 넘어간다", value: 2, weights: { evaluationSensitivity: 3, selfConfidence: -2, selfAcceptance: -1 } },
      { label: "D", text: "내 생각이 틀렸을 가능성부터 떠올라 말을 아낀다", value: 3, weights: { selfConfidence: -2, socialComparison: 2, selfEfficacy: -1 } },
    ],
  },
];

// 긍정·민감 반응이 특정 알파벳 위치에 반복되지 않도록 질문마다 선택지 순서를 섞습니다.
// 화면에 전달되는 value도 재부여하므로 사용자는 A~D 위치만으로 점수 방향을 추론할 수 없습니다.
const optionPermutations = [
  [2, 0, 3, 1], [0, 2, 1, 3], [3, 1, 0, 2], [1, 3, 2, 0],
  [2, 1, 0, 3], [1, 3, 0, 2], [3, 0, 2, 1], [0, 2, 3, 1],
  [2, 0, 1, 3], [1, 3, 0, 2], [3, 1, 2, 0], [0, 2, 1, 3],
  [2, 0, 3, 1], [1, 3, 0, 2],
] as const;
const optionLabels = ["A", "B", "C", "D"];
selfEsteemQuestions.forEach((question, questionIndex) => {
  const original = [...question.options];
  question.options = optionPermutations[questionIndex].map((sourceIndex, value) => ({
    ...original[sourceIndex],
    label: optionLabels[value],
    value,
  }));
});

const level = (
  slug: SelfEsteemLevelProfile["slug"], levelNumber: number, name: string, icon: string,
  palette: [string, string], minScore: number, maxScore: number, summary: string,
  description: string, strengths: string[], cautions: string[], tips: string[],
): SelfEsteemLevelProfile => ({
  slug, level: levelNumber, name, icon, palette, minScore, maxScore, summary,
  description: `${description} 이 결과는 사람의 고정된 가치나 성격을 판정하는 것이 아니라 최근의 경험과 반응 패턴에서 드러난 현재 경향을 설명합니다. 자존감은 늘 같은 높이에 머무는 특성이 아니며, 관계와 환경, 피로도와 성공·실패 경험에 따라 충분히 흔들리고 다시 회복될 수 있습니다. 점수 하나보다 어떤 영역에서 에너지가 빠지고 어떤 영역이 이미 나를 지지하는지 살펴보는 것이 더 중요합니다. 지금의 반응을 좋고 나쁜 성격으로 나누기보다, 그동안 자신을 보호하기 위해 익힌 방식으로 이해해 보세요. 작은 성공을 알아차리고 회복 가능한 환경을 만드는 경험이 반복되면 자기평가의 기준도 더 안정적으로 바뀔 수 있습니다.`,
  strengths, cautions, tips,
});

export const selfEsteemLevelProfiles: SelfEsteemLevelProfile[] = [
  level("self-esteem-recharge", 1, "자존감 충전이 필요한 단계", "🌱", ["#64748b", "#a7f3d0"], 0, 20, "최근에는 스스로를 지지할 에너지가 조금 부족할 수 있어요.", "실수나 타인의 반응이 마음에 오래 남고, 새로운 상황에서 자신의 판단보다 주변의 기준을 먼저 확인할 가능성이 있습니다. 이것은 능력이 부족하다는 뜻이 아니라 최근의 피로와 반복된 부담 때문에 내 안의 안전감이 약해진 상태에 가깝습니다. 작은 결과도 부족하게 느껴져 스스로를 몰아붙이거나, 상처받지 않기 위해 도전을 미리 줄이는 모습이 나타날 수 있습니다.", ["현재 상태를 알아차린 점", "관계를 중요하게 여기는 섬세함", "실수를 줄이려는 책임감", "다른 관점을 살피는 능력", "도움을 받아들일 수 있는 가능성"], ["자기비판이 사실처럼 굳어지는 것", "비교를 통해 하루를 평가하는 습관", "힘든 일을 혼자 숨기는 경향", "작은 성취를 무효화하는 태도"], ["오늘 해낸 일을 크기와 무관하게 한 줄 기록하기", "비교를 자극하는 SNS 계정을 잠시 멀리하기", "실수한 친구에게 할 말을 나에게도 적용하기", "혼자 감당하기 어려운 일은 믿는 사람에게 구체적으로 요청하기", "무기력이나 우울감이 지속되면 전문가와 상의하기"]),
  level("self-esteem-shaky", 2, "흔들리는 자존감", "🌿", ["#65a30d", "#bef264"], 21, 40, "내 기준이 있지만 상황과 평가에 따라 쉽게 흔들릴 수 있어요.", "익숙한 일에서는 자신의 역할을 해내지만 결과가 불확실하거나 평가받는 장면에서는 자신감이 빠르게 낮아질 수 있습니다. 칭찬을 받아도 충분히 받아들이기보다 부족한 부분을 먼저 찾고, 다른 사람의 속도와 내 과정을 비교하며 마음이 급해질 가능성이 있습니다. 그럼에도 문제를 돌아보고 더 나아지려는 힘은 분명히 남아 있어 적절한 지지와 회복 습관이 생기면 안정감이 빠르게 자랄 수 있습니다.", ["상황을 신중하게 살피는 힘", "개선점을 찾는 성찰", "타인의 감정을 배려함", "책임을 회피하지 않는 태도", "성장하려는 의지"], ["평가를 내 가치 전체로 받아들이기", "준비가 완벽할 때까지 시작을 미루기", "칭찬보다 비판 한마디를 오래 기억하기", "필요 이상으로 타인에게 맞추기"], ["결과와 나 자신을 분리해 문장으로 적기", "결정을 묻기 전에 내 의견부터 메모하기", "작은 도전을 주 1회 의도적으로 선택하기", "칭찬을 해명하지 않고 고맙다고 받아보기", "회복을 게으름이 아닌 일정으로 예약하기"]),
  level("self-esteem-growing", 3, "성장하는 자존감", "🌼", ["#ca8a04", "#fde047"], 41, 60, "흔들려도 다시 내 기준으로 돌아오는 힘이 자라고 있어요.", "타인의 평가와 비교에 영향을 받는 순간이 있지만, 그것이 언제나 행동을 결정하도록 두지는 않는 편입니다. 실패 뒤에 잠시 위축되어도 원인을 정리하거나 다른 방법을 찾으며 다시 움직일 수 있습니다. 익숙한 관계에서는 의견을 표현하지만 낯선 환경이나 중요한 평가 앞에서는 안전한 선택을 선호할 수 있습니다. 현재의 핵심은 자신감이 있느냐 없느냐보다, 흔들린 뒤 회복하는 경험을 얼마나 자주 쌓고 있는지에 있습니다.", ["경험에서 배우는 태도", "현실적인 자기점검", "실패 후 다시 시도하는 힘", "상대와 나를 함께 고려함", "변화를 받아들이는 유연성"], ["비교가 심해질 때 내 속도를 잊는 것", "확신이 없으면 의견을 줄이는 습관", "성과에 따라 자기평가가 크게 달라짐"], ["하루의 과정 성취를 결과와 따로 기록하기", "나의 기준 세 가지를 정해 결정에 활용하기", "실패 후 배운 점과 다음 행동을 한 쌍으로 쓰기", "불편한 의견을 작은 문장부터 표현하기", "회복에 도움 된 행동을 반복 가능한 루틴으로 만들기"]),
  level("self-esteem-healthy", 4, "건강한 자존감", "🌳", ["#15803d", "#4ade80"], 61, 75, "나의 장단점을 현실적으로 보며 관계 속에서도 중심을 지키는 편이에요.", "대부분의 상황에서 자신의 판단을 신뢰하고, 실수나 거절을 능력 전체에 대한 판정으로 확대하지 않는 편입니다. 타인의 조언을 들으면서도 마지막 결정은 자신의 기준으로 내릴 수 있고, 실패 후에는 감정을 정리한 뒤 다음 행동으로 이동합니다. 비교나 평가에 흔들리는 순간도 있지만 회복 시간이 비교적 짧습니다. 자신을 무조건 긍정하기보다 부족한 점과 잘하는 점을 함께 볼 수 있다는 것이 현재의 중요한 강점입니다.", ["현실적인 자기수용", "안정적인 의사결정", "피드백을 활용하는 능력", "실패 후 회복력", "건강한 관계 경계"], ["책임감 때문에 휴식을 뒤로 미루기", "괜찮다는 이유로 감정을 건너뛰기", "타인을 돕느라 내 필요를 늦게 확인하기"], ["현재의 회복 루틴을 의식적으로 유지하기", "잘한 일을 운이 아닌 과정과 연결하기", "도움이 필요할 때 구체적으로 요청하기", "성과 없는 시간도 가치 있게 보내기", "내 기준을 지키면서 다른 선택도 존중하기"]),
  level("self-esteem-very-healthy", 5, "매우 건강한 자존감", "⭐", ["#0f766e", "#2dd4bf"], 76, 90, "자신의 가치를 안정적으로 느끼며 도전과 관계를 유연하게 다뤄요.", "새로운 상황에서도 완벽해야 한다는 부담보다 배우고 적응할 가능성을 먼저 보는 편입니다. 칭찬은 자연스럽게 받아들이고 비판은 필요한 정보만 골라 활용하며, 타인의 성취를 자신의 부족함으로 해석하지 않습니다. 관계에서는 상대를 배려하면서도 중요한 기준과 한계를 분명히 표현할 수 있습니다. 실패하거나 컨디션이 떨어진 날에도 자신을 모욕하기보다 회복에 필요한 행동을 선택하는 경향이 뚜렷합니다.", ["높은 자기신뢰", "도전을 학습으로 보는 태도", "안정적인 감정 회복", "건강한 경계와 소통", "비교에서 자유로운 성장"], ["자기회복력을 과신해 과부하를 견디는 것", "도움이 필요한 사람의 속도를 재촉하기", "괜찮아 보이려 감정을 늦게 알아차리기"], ["강점뿐 아니라 취약함도 안전하게 공유하기", "성과와 무관한 정체성을 계속 돌보기", "타인의 다른 회복 속도를 존중하기", "휴식을 예방적 습관으로 유지하기", "자신감이 줄어드는 환경적 신호를 미리 기록하기"]),
  level("self-esteem-solid", 6, "단단한 자존감", "👑", ["#4f46e5", "#a78bfa"], 91, 100, "평가와 결과가 달라져도 나에 대한 기본 신뢰를 안정적으로 유지해요.", "자신의 강점과 한계를 비교적 정확하게 알고, 부족함을 발견해도 존재 가치와 연결하지 않는 경향이 매우 뚜렷합니다. 도전에서는 성공 가능성뿐 아니라 배울 가치까지 고려하고, 실패하면 책임질 부분과 통제할 수 없던 부분을 구분합니다. 타인의 인정은 기쁘게 받지만 그것이 없다고 방향을 잃지는 않습니다. 관계에서도 솔직한 의견, 사과, 도움 요청을 모두 자신의 약함으로 해석하지 않고 상황에 맞게 사용할 수 있습니다.", ["단단한 자기수용", "독립적인 판단력", "높은 자기효능감", "유연한 실패 해석", "관계 속 안정된 경계"], ["스스로 괜찮다는 이유로 피로 신호를 무시하기", "상대도 같은 수준으로 단단할 것이라 기대하기", "자신감이 확신 과잉으로 바뀌지 않는지 점검하기"], ["현재의 건강한 습관을 구체적으로 이름 붙이기", "중요한 관계에서 취약한 감정도 표현하기", "성장보다 유지가 필요한 시기도 허용하기", "내 기준과 타인의 피드백을 정기적으로 함께 점검하기", "안정감을 주변에 강요하지 않고 나누기"]),
];

export const selfEsteemTest: TestDefinition = {
  type: "quiz",
  slug: "self-esteem-test",
  title: "내 자존감 레벨은?",
  shortTitle: "자존감 테스트",
  cardTitle: "내 자존감 레벨은?",
  description: "14개의 일상 상황을 통해 현재의 자기수용, 자기신뢰와 회복 패턴을 살펴보세요.",
  category: "성격.심리",
  duration: "약 3분",
  icon: "🌱",
  participants: 2184,
  accent: "green",
  isNew: true,
  itemCount: selfEsteemQuestions.length,
  questions: selfEsteemQuestions.map(({ id, text, options }) => ({ id, text, options: options.map(({ label, text, value }) => ({ label, text, value })) })),
  resultSlugs: [],
  seoTitle: "자존감 테스트 | 내 자존감 지수와 레벨은?",
  seoDescription: "자존감 테스트로 자기수용, 자기효능감, 비교 성향, 실패 회복력과 타인 평가 민감도를 분석해 현재 자존감 지수를 확인해보세요.",
  keywords: ["자존감 테스트", "자존감 지수 테스트", "자존감 심리테스트", "자존감 검사", "자존감 레벨 테스트", "심리테스트"],
  seoContent: {
    heading: "자존감 테스트란?",
    paragraphs: [
      "자존감 테스트는 자신의 전반적인 가치와 능력을 어떻게 받아들이는지 돌아보는 자가점검 콘텐츠입니다. 이 테스트는 자존감을 직접 묻는 대신 실패, 칭찬, 비교, 피드백, 낯선 관계와 중요한 결정처럼 일상에서 흔히 겪는 상황에 대한 반응을 통해 현재의 경향을 살펴봅니다.",
      "Rosenberg 자존감 척도가 다루는 전반적 자기 가치감과 긍정·부정 방향을 함께 살피는 원리를 참고하되, 기존 문항을 번역하거나 복제하지 않았습니다. 자체 제작한 14개 상황형 질문으로 자기수용, 자기효능감, 사회적 비교, 실패 회복력, 타인 평가 민감도, 자기신뢰, 감정 안정성과 자기연민을 복합적으로 분석합니다.",
      "공식 RSES에는 모든 사람에게 동일하게 적용되는 절대적인 고·저 절단점이 없습니다. 이 페이지의 0~100점과 6개 레벨은 이해하기 쉬운 피드백을 위한 자체 환산 결과이며 의학적 진단이나 표준화 심리검사 점수가 아닙니다. 점수보다 영역별 패턴과 회복 팁을 중심으로 활용해 주세요.",
    ],
    faqs: [
      ["이 테스트는 로젠버그 자존감 척도와 같은 검사인가요?", "아닙니다. 전반적 자기 가치감을 살핀다는 개념만 참고하고 문항과 8요인 계산 방식은 미미테스트가 자체 제작했습니다."],
      ["점수가 낮으면 자존감이 낮다고 확정할 수 있나요?", "아닙니다. 현재 상황에서 나타난 반응 경향을 보여주는 참고 결과이며 피로, 관계와 최근 경험에 따라 달라질 수 있습니다."],
      ["결과는 어떻게 계산되나요?", "각 선택이 2~4개 심리요인에 서로 다른 방향으로 반영되고, 8개 영역을 0~100으로 환산한 뒤 보호요인과 민감요인을 함께 계산합니다."],
      ["결과가 걱정스러우면 어떻게 해야 하나요?", "일상 기능의 어려움, 우울감이나 불안이 지속된다면 결과에 의존하기보다 정신건강 전문가나 지역 상담기관과 상의하는 것이 좋습니다."],
    ],
    assesses: "현재의 자기수용·자기효능감·회복력과 평가 민감도 경향",
  },
};

export const getSelfEsteemLevelProfile = (slug: string) => selfEsteemLevelProfiles.find((item) => item.slug === slug);
