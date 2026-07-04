import type { MarriageResultProfile, MarriageResultSlug, MarriageTendency, TestDefinition } from "@/lib/types";

export const marriageQuestions = [
  "나는 결혼을 언젠가는 꼭 하고 싶다고 생각한다.",
  "현재 연애 중이거나, 결혼을 생각할 만한 상대가 있다.",
  "경제적으로 안정된 후에 결혼해야 한다고 생각한다.",
  "혼자 사는 생활도 꽤 만족스럽다.",
  "가족이나 주변 사람들의 결혼 압박을 자주 느낀다.",
  "나는 연애할 때 미래 계획을 비교적 빨리 이야기하는 편이다.",
  "결혼보다 커리어와 자기계발이 더 우선이라고 느낀다.",
  "아이를 낳거나 가정을 꾸리는 것에 관심이 있다.",
  "결혼은 현실적인 조건보다 감정과 확신이 더 중요하다고 생각한다.",
  "아직은 결혼보다 다양한 경험을 더 해보고 싶다.",
  "나는 안정적인 관계를 오래 유지하는 편이다.",
  "집, 돈, 직장 등 현실적인 준비가 어느 정도 되어 있다고 느낀다.",
].map((text, index) => ({ id: index + 1, text }));

export const marriageResultProfiles: MarriageResultProfile[] = [
  {
    slug: "marriage-fast", name: "빠른 결혼형", icon: "💍", ageOffset: [1, 3],
    summary: "마음과 현실이 같은 방향을 바라보기 시작한 타입",
    analysis: "결혼에 대한 의지가 분명하고 관계를 미래의 관점에서 바라보는 편입니다. 지금 패턴이 유지된다면 먼 훗날보다 가까운 몇 년 안에 구체적인 이야기가 자연스럽게 오갈 가능성이 높습니다.",
    accelerators: ["현재 관계에서 생활 방식과 가치관을 솔직하게 확인하기", "주거·재정 계획을 숫자로 함께 정리하기", "양가와 결혼 방식에 대한 기대치를 일찍 나누기"],
    delays: ["감정적인 확신만으로 현실 대화를 미루는 것", "상대가 준비될 시간을 충분히 확인하지 않는 것"],
    partnerType: "미래 계획을 피하지 않고 현실적인 대화를 함께 실행으로 옮기는 안정적인 상대",
    preparations: ["월별 공동 재정 시뮬레이션", "가사와 커리어 역할에 대한 대화", "갈등 해결 방식 확인"],
  },
  {
    slug: "marriage-stable-prep", name: "안정 준비형", icon: "🏡", ageOffset: [3, 5],
    summary: "좋은 관계에 현실적인 기반까지 갖춰야 안심하는 타입",
    analysis: "결혼 의지는 있지만 감정만으로 서두르기보다 경제, 주거, 직장 같은 생활 기반을 중요하게 생각합니다. 준비가 눈에 보이는 수준에 이르면 오히려 결정은 빠르고 안정적일 가능성이 큽니다.",
    accelerators: ["완벽한 준비 대신 필요한 최소 기준을 정하기", "연인과 저축·주거 목표를 일정으로 만들기", "결혼 후 생활비와 커리어 변화를 미리 계산하기"],
    delays: ["모든 조건이 완벽해질 때까지 결정을 미루는 것", "혼자만의 준비 기준을 상대와 공유하지 않는 것"],
    partnerType: "약속을 지키고 장기 계획을 차분하게 함께 세울 수 있는 현실적인 상대",
    preparations: ["비상금과 부채 현황 정리", "희망 주거 형태 합의", "결혼 비용의 상한선 설정"],
  },
  {
    slug: "marriage-career-first", name: "커리어 우선형", icon: "🚀", ageOffset: [5, 7],
    summary: "지금은 관계보다 나의 성장 궤도를 먼저 완성하는 타입",
    analysis: "결혼을 부정하기보다 현재의 시간과 에너지를 커리어, 학업, 자기계발에 더 많이 쓰고 싶어 합니다. 중요한 성장 구간을 통과한 뒤 관계를 삶의 중심 계획에 넣는 흐름이 자연스럽습니다.",
    accelerators: ["커리어와 관계를 양자택일로 보지 않는 상대 만나기", "성장 목표가 끝나는 시점을 구체적으로 정하기", "바쁜 시기에도 관계를 돌보는 작은 루틴 만들기"],
    delays: ["다음 목표가 생길 때마다 결혼 논의를 무기한 미루는 것", "일정과 우선순위를 상대에게 설명하지 않는 것"],
    partnerType: "서로의 목표와 독립적인 시간을 존중하면서도 중요한 순간에는 함께하는 상대",
    preparations: ["5년 커리어 계획에 관계 계획도 포함하기", "시간 사용 우선순위 점검", "이직·유학 가능성 미리 공유"],
  },
  {
    slug: "marriage-free-romance", name: "자유 연애형", icon: "🌿", ageOffset: [4, 8],
    summary: "정해진 순서보다 충분한 경험과 자연스러운 확신을 원하는 타입",
    analysis: "현재는 결혼이라는 제도보다 좋은 연애와 다양한 삶의 경험을 중요하게 생각합니다. 자유를 제한하지 않으면서도 함께할 이유가 분명한 관계를 만날 때 결혼이 현실적인 선택으로 바뀔 수 있습니다.",
    accelerators: ["독립성을 존중하는 관계의 규칙 만들기", "결혼 후에도 유지하고 싶은 개인 생활을 말하기", "여행·동거 등 실제 생활 호흡을 확인하기"],
    delays: ["진지한 대화를 자유의 상실로 받아들이는 것", "즐거운 현재만 보고 장기적인 가치관 차이를 넘기는 것"],
    partnerType: "통제하지 않고 각자의 취향과 경험을 응원하는 유연하고 솔직한 상대",
    preparations: ["결혼 후에도 필요한 개인 공간 정의", "서로의 자유와 책임 범위 합의", "장기 관계에서 원하는 모습 적어보기"],
  },
  {
    slug: "marriage-careful-decision", name: "신중 결정형", icon: "🔎", ageOffset: [6, 10],
    summary: "확신과 조건을 오래 검증한 뒤 깊게 약속하는 타입",
    analysis: "관계를 가볍게 판단하지 않고 성격, 생활 습관, 경제관과 가족관까지 충분히 확인하려 합니다. 결정까지는 시간이 걸리지만 한번 선택한 관계에는 책임감 있게 임하는 경향이 강합니다.",
    accelerators: ["막연한 불안과 실제 위험 조건을 구분하기", "결정에 필요한 핵심 기준을 세 가지로 줄이기", "갈등을 피하지 않고 회복 과정을 경험하기"],
    delays: ["확신을 얻기 위해 끝없이 새로운 조건을 추가하는 것", "실수 없는 상대를 찾으려는 완벽주의"],
    partnerType: "재촉하지 않으면서 말과 행동이 일치해 오랫동안 신뢰를 보여주는 상대",
    preparations: ["비타협 조건과 조정 가능한 조건 구분", "가족관·돈·자녀 계획 대화", "불안이 커질 때의 소통 방식 연습"],
  },
  {
    slug: "marriage-independent-life", name: "비혼 가능성 탐색형", icon: "🧭",
    summary: "결혼 시기보다 나다운 삶의 방향을 먼저 정하는 타입",
    analysis: "현재의 당신에게 결혼은 반드시 거쳐야 하는 단계라기보다 여러 삶의 선택지 중 하나에 가깝습니다. 결혼 여부를 서둘러 정하기보다 어떤 관계와 생활이 나를 편안하게 하는지 탐색하는 시간이 더 중요합니다.",
    accelerators: ["결혼 자체보다 원하는 관계의 모습을 구체화하기", "독립성과 동반자 관계가 공존할 방법 찾기", "주변 기대와 내 욕구를 분리해 생각하기"],
    delays: ["사회적 압박 때문에 원하지 않는 결정을 하는 것", "비혼과 관계 회피를 같은 것으로 단정하는 것"],
    partnerType: "결혼을 목표로 압박하지 않고 다양한 관계와 삶의 방식을 존중하는 상대",
    preparations: ["혼자서도 지속 가능한 재정 계획", "노후 돌봄과 관계망 설계", "내가 원하는 동반자 관계 정의"],
  },
];

export const marriageTimingTest: TestDefinition = {
  slug: "marriage-timing-test",
  title: "나는 언제 결혼할까?",
  shortTitle: "결혼 시기 테스트",
  description: "12개의 질문으로 나의 연애 성향과 현실 준비도를 분석해 예상 결혼 시기를 확인해보세요.",
  category: "결혼",
  duration: "약 3분",
  icon: "💌",
  participants: 2781,
  accent: "purple",
  isNew: true,
  questions: marriageQuestions,
  resultSlugs: marriageResultProfiles.map((profile) => profile.slug),
  seoTitle: "나는 언제 결혼할까? 결혼 시기 테스트",
  seoDescription: "12개의 질문으로 나의 연애 성향과 현실 준비도를 분석해 예상 결혼 시기를 확인해보세요.",
  keywords: ["결혼 테스트", "결혼 시기 테스트", "나는 언제 결혼할까", "연애 테스트", "심리테스트", "결혼운 테스트"],
};

export const getMarriageResultProfile = (slug: string) => marriageResultProfiles.find((profile) => profile.slug === slug);

type WeightRow = { O: Partial<Record<MarriageTendency, number>>; X: Partial<Record<MarriageTendency, number>> };
export const marriageWeights: WeightRow[] = [
  { O:{ marriageIntent:3 }, X:{ independence:2 } },
  { O:{ relationshipReady:4, stability:2 }, X:{ cautiousness:1 } },
  { O:{ financialReady:2, cautiousness:2 }, X:{ romanticImpulse:2 } },
  { O:{ independence:3 }, X:{ marriageIntent:1 } },
  { O:{ familyPressure:2, marriageIntent:1 }, X:{ independence:1 } },
  { O:{ relationshipReady:2, marriageIntent:2 }, X:{ cautiousness:2 } },
  { O:{ careerPriority:3 }, X:{ marriageIntent:1 } },
  { O:{ marriageIntent:2, stability:2 }, X:{ independence:1 } },
  { O:{ romanticImpulse:3 }, X:{ cautiousness:2, financialReady:1 } },
  { O:{ independence:2, careerPriority:2 }, X:{ stability:1, marriageIntent:1 } },
  { O:{ stability:3, relationshipReady:2 }, X:{ romanticImpulse:1 } },
  { O:{ financialReady:3, relationshipReady:1 }, X:{ financialReady:-1, cautiousness:2 } },
];

export const marriageResultSlugs = marriageResultProfiles.map((profile) => profile.slug as MarriageResultSlug);
