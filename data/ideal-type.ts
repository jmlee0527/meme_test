import type { TestDefinition } from "@/lib/types";

export type UserGender = "male" | "female";
export type IdealCategory = "emotionalSecurity" | "communication" | "lifestyleRhythm" | "growthAndStability" | "relationshipDistance" | "visualStyle";
export const idealDimensions = [["warmth", "따뜻함"], ["affectionExpression", "애정 표현"], ["communicationDirectness", "대화의 직접성"], ["conflictRecovery", "갈등 회복력"], ["socialEnergy", "사회적 에너지"], ["spontaneity", "활동성과 즉흥성"], ["achievementOrientation", "성취 지향성"], ["lifestyleStability", "생활 안정성"], ["intimacyNeed", "친밀감"], ["independenceNeed", "독립성"], ["softStrongAura", "선명한 분위기"], ["styleExpressiveness", "스타일 표현력"]] as const;
export type IdealDimension = (typeof idealDimensions)[number][0];
export type IdealScores = Record<IdealDimension, number>;
export type IdealQuestion = { id: string; branch: UserGender; category: IdealCategory; prompt: string; options: { id: string; text: string; scores: Partial<IdealScores> }[]; tags: string[] };

const contexts: Record<IdealCategory, string[]> = {
  emotionalSecurity: ["친한 사람이 속상한 일을 이야기할 때", "뜻밖의 좋은 소식을 들었을 때", "누군가 지쳐 보일 때", "친구가 실수했을 때", "고마운 마음을 전하고 싶을 때", "긴 하루가 끝난 저녁", "오랜만에 안부를 묻고 싶을 때", "기대했던 일이 잘되지 않았을 때", "작은 기념일이 다가올 때", "누군가 도움을 요청할 때", "마음이 복잡한 날", "친한 사람과 오해가 생겼을 때"],
  communication: ["친한 사람과 의견이 다를 때", "약속 시간이 바뀌었을 때", "팀에서 역할이 겹쳤을 때", "상대가 내 말을 오해한 것 같을 때", "기대와 다른 피드백을 들었을 때", "결정해야 할 일이 생겼을 때", "대화가 잠시 어색해졌을 때", "사과해야 할 일이 생겼을 때", "함께 계획을 세울 때", "내 의견을 말할 차례가 왔을 때", "상대의 연락이 뜸해졌을 때", "서로 다른 선택지 앞에 섰을 때"],
  lifestyleRhythm: ["아무 일정 없는 주말이 생겼을 때", "여행 첫날 아침", "새로운 취미를 발견했을 때", "친구들이 갑자기 모이자고 할 때", "비가 오는 휴일", "새 동네를 걷게 됐을 때", "오랜만에 운동할 시간이 생겼을 때", "주말 저녁 메뉴를 정할 때", "낯선 모임에 초대받았을 때", "휴가 계획을 세울 때", "새로운 전시를 발견했을 때", "갑자기 계획이 비었을 때"],
  growthAndStability: ["새로운 목표를 세울 때", "긴 과제를 시작할 때", "월초에 생활비를 정리할 때", "처음 해 보는 일을 맡았을 때", "중요한 선택을 앞두었을 때", "일정이 여러 개 겹쳤을 때", "배우고 싶은 것이 생겼을 때", "오래 쓸 물건을 고를 때", "내일을 준비하는 저녁", "성공 가능성이 불확실한 기회가 왔을 때", "새로운 업무 방식을 만났을 때", "한 달을 돌아볼 때"],
  relationshipDistance: ["혼자만의 시간이 필요할 때", "친한 사람과 긴 시간을 보낸 뒤", "주말 계획을 정할 때", "기분이 가라앉았을 때", "함께 해 보고 싶은 일이 생겼을 때", "바쁜 시기가 시작됐을 때", "새로운 관심사가 생겼을 때", "중요한 고민이 있을 때", "친구가 약속을 제안했을 때", "하루를 마무리할 때", "서로 다른 취미가 있을 때", "가까운 사람에게 도움을 받고 싶을 때"],
  visualStyle: ["자꾸 저장하게 되는 사진의 분위기는", "방을 꾸밀 때 가장 먼저 보는 것은", "선물을 고를 때 눈길이 가는 것은", "외출 전 옷을 고를 때", "카페를 고를 때", "여행지에서 찍고 싶은 장면은", "새 물건을 고를 때", "영화 속 인물에게 시선이 갈 때", "자주 듣는 음악의 분위기는", "주말에 입고 싶은 옷은", "프로필 사진을 고를 때", "처음 보는 공간에서 편안한 지점은"],
};
const optionsByCategory: Record<IdealCategory, [string, string, string, string]> = {
  emotionalSecurity: ["현실적으로 도울 방법을 먼저 정리한다", "충분히 말할 수 있도록 차분히 들어준다", "기분이 나아질 만한 새로운 활동을 제안한다", "내 마음을 솔직하게 표현하며 곁에 있는다"],
  communication: ["핵심을 정리해 분명하게 이야기한다", "서로의 감정을 먼저 확인하며 대화한다", "다른 방법을 찾아 유연하게 풀어본다", "잠시 시간을 두고 편한 때에 다시 이야기한다"],
  lifestyleRhythm: ["미뤄둔 일과 휴식을 균형 있게 보낸다", "가까운 사람과 함께할 일을 찾아본다", "처음 가보는 곳이나 활동을 시도한다", "그날 기분과 에너지에 따라 천천히 정한다"],
  growthAndStability: ["우선순위와 준비할 일을 먼저 정리한다", "함께할 사람과 방향을 나누며 시작한다", "새로운 방식과 가능성을 탐색한다", "일단 움직이며 내게 맞는 방식을 찾는다"],
  relationshipDistance: ["혼자 정리할 시간을 확보한 뒤 나눈다", "가까운 사람과 충분히 시간을 보내고 싶다", "각자의 관심사를 존중하며 새로운 것을 해본다", "필요한 순간에는 자연스럽게 도움을 요청한다"],
  visualStyle: ["차분하고 정돈된 분위기", "부드럽고 편안한 일상적 분위기", "강렬한 색감과 개성 있는 표현", "활기찬 야외와 자연스러운 에너지"],
};
const scoreStyles: Partial<IdealScores>[] = [
  { communicationDirectness: 3, conflictRecovery: 2, achievementOrientation: 2, lifestyleStability: 2, softStrongAura: 2 },
  { warmth: 3, affectionExpression: 2, intimacyNeed: 3, conflictRecovery: 2, softStrongAura: 1 },
  { socialEnergy: 2, spontaneity: 3, independenceNeed: 2, styleExpressiveness: 3, softStrongAura: 3 },
  { lifestyleStability: 2, independenceNeed: 3, affectionExpression: 2, socialEnergy: 1, spontaneity: 2 },
];
export const idealQuestions: IdealQuestion[] = (["male", "female"] as UserGender[]).flatMap((branch) => (Object.entries(contexts) as [IdealCategory, string[]][]).flatMap(([category, prompts]) => prompts.map((suffix, index) => {
  const rotation = (index + category.length + (branch === "female" ? 1 : 0)) % 4;
  return { id: `${branch}-${category}-${index + 1}`, branch, category, prompt: `${suffix}, 나와 가장 가까운 반응은?`, tags: [category, `scene-${index + 1}`], options: optionsByCategory[category].map((text, optionIndex) => ({ id: `${branch}-${category}-${index + 1}-o${optionIndex + 1}`, text, scores: scoreStyles[(optionIndex + rotation) % 4] })) };
})));

export type IdealProfile = { id: string; targetGender: UserGender; title: string; subtitle: string; vector: IdealScores; shortDescription: string; fullDescription: string; personalityTraits: string[]; relationshipRole: string; communicationStyle: string; conflictStyle: string; affectionStyle: string; lifestyle: string; occupationImages: string[]; appearanceMood: string; fashionStyle: string; attractionPoints: string[]; comfortReasons: string[]; cautions: string[]; recommendedDates: string[]; shareTextTemplates: string[]; imageAlt: string; palette: [string, string] };
const femaleTitles = ["따뜻한 공감가형", "밝은 에너지형", "차분한 지성형", "세련된 커리어형", "감성적인 예술가형", "활동적인 스포츠형", "자유로운 여행가형", "안정적인 생활설계자형", "유쾌한 친구형", "부드러운 로맨티스트형", "깔끔한 미니멀리스트형", "트렌디한 크리에이터형", "단단한 리더형", "섬세한 관찰자형", "소박한 홈라이프형", "사교적인 네트워커형", "호기심 많은 탐험가형", "현실적인 문제해결사형", "우아한 클래식형", "독립적인 자기세계형"];
const maleTitles = ["다정한 상담가형", "차분한 전문직형", "유쾌한 분위기메이커형", "든든한 리더형", "섬세한 예술가형", "지적인 연구자형", "활동적인 스포츠형", "자유로운 여행가형", "안정적인 생활설계자형", "야망 있는 커리어형", "소박한 홈라이프형", "사교적인 네트워커형", "감성적인 로맨티스트형", "묵직한 행동파형", "깔끔한 미니멀리스트형", "트렌디한 크리에이터형", "따뜻한 교육자형", "현실적인 문제해결사형", "장난기 많은 친구형", "독립적인 자기세계형"];
const keys = idealDimensions.map(([key]) => key) as IdealDimension[];
const vectorFor = (index: number) => Object.fromEntries(keys.map((key, keyIndex) => [key, 25 + ((index * 19 + keyIndex * 31 + (index % 3) * 11) % 66)])) as IdealScores;
const profile = (title: string, targetGender: UserGender, index: number): IdealProfile => { const vector = vectorFor(index); const palette: [string, string] = [["#fda4af", "#fb7185"], ["#93c5fd", "#6366f1"], ["#a7f3d0", "#14b8a6"], ["#ddd6fe", "#8b5cf6"], ["#fed7aa", "#f97316"]][index % 5] as [string, string]; return { id: `${targetGender}-${index + 1}`, targetGender, title, subtitle: `${title.replace("형", "")}의 편안함과 설렘`, vector, shortDescription: `당신은 ${title}처럼 자신만의 리듬을 지키면서 관계에는 진심을 보이는 사람에게 끌릴 가능성이 높아요.`, fullDescription: `답변에서 반복된 관계 취향을 보면, 과한 조건보다 일상에서 느끼는 신뢰와 대화의 결이 더 중요하게 나타났습니다. ${title}의 이미지는 성격·생활 방식·전체적인 분위기를 이해하기 위한 표현이며, 특정 직업이나 외모 조건을 뜻하지 않습니다.`, personalityTraits: ["자신의 기준을 지키는 태도", "관계에서의 배려와 책임감", "상황에 맞게 소통하는 유연함"], relationshipRole: "서로를 일방적으로 이끌기보다 필요한 순간에 기대고 응원하는 동반자", communicationStyle: "생각을 숨기기보다 존중하는 말투로 필요한 내용을 나누는 방식", conflictStyle: "감정을 오래 쌓아두기보다 시간을 갖고 해결점을 찾는 태도", affectionStyle: "말과 행동 중 한쪽에만 치우치지 않고 일상에서 꾸준히 마음을 보여주는 스타일", lifestyle: "일과 휴식, 관계와 개인 시간을 균형 있게 조절하는 생활 리듬", occupationImages: [index % 2 ? "연구·기술·전문성을 차분히 쌓는 업무" : "교육·상담·기획처럼 사람과 아이디어를 연결하는 업무", index % 3 ? "안정적인 조직에서 책임을 맡는 환경" : "창작·콘텐츠·독립 프로젝트를 병행하는 환경"], appearanceMood: index % 2 ? "차분하고 지적인 인상에 자연스러운 자신감이 더해진 분위기" : "부드럽고 편안한 표정에 생기 있는 에너지가 느껴지는 분위기", fashionStyle: index % 3 ? "깔끔한 기본 아이템을 자신만의 디테일로 정리하는 스타일" : "과하지 않지만 개성이 드러나는 감각적인 캐주얼 스타일", attractionPoints: ["약속을 행동으로 지키는 모습", "대화할수록 드러나는 자기만의 관심사", "편안함 속에 있는 분명한 기준"], comfortReasons: ["서로의 속도를 존중할 수 있어서", "일상의 작은 일도 함께 나누기 쉬워서", "갈등 뒤에도 대화를 이어갈 수 있어서"], cautions: ["첫인상만으로 관계의 속도를 서두르지 않기", "편안함을 표현 부족으로 오해하지 않기", "상대의 다른 생활 리듬도 존중하기"], recommendedDates: ["조용한 전시나 서점 산책", "각자의 취향을 나누는 동네 탐방", "가벼운 야외 활동 뒤 편하게 대화하는 데이트"], shareTextTemplates: [`내 이상형은 ${title}! 당신의 이상형도 확인해 보세요.`, `나도 몰랐던 이상형은 ${title}이래요.`], imageAlt: `${title}을 표현한 오리지널 성인 아바타 일러스트`, palette }; };
export const idealProfiles = [...femaleTitles.map((title, index) => profile(title, "female", index)), ...maleTitles.map((title, index) => profile(title, "male", index + 20))];

export const idealTypeTest: TestDefinition = { type: "quiz", slug: "ideal-type", title: "나의 이상형은 어떤 사람일까?", shortTitle: "이상형 테스트", description: "12개의 자연스러운 질문으로 내가 끌리는 이상형의 성격과 분위기를 알아보세요.", category: "연애.관계", duration: "약 3분", icon: "💘", thumbnail: "/tests/ideal-type.jpg", participants: 1278, accent: "pink", isNew: true, itemCount: 12, questions: [], resultSlugs: [], seoTitle: "이상형 테스트｜나의 이상형은 어떤 사람일까? - 미미테스트", seoDescription: "12개의 자연스러운 질문으로 내가 끌리는 이상형을 알아보세요. 성격, 연애 방식, 직업 이미지, 외모 분위기와 생활 취향을 분석해 나의 진짜 이상형 유형을 알려드립니다.", keywords: ["이상형 테스트", "나의 이상형 테스트", "이상형 찾기", "남자 이상형 테스트", "여자 이상형 테스트", "연애 취향 테스트", "이상형 심리테스트"], seoContent: { heading: "이상형 테스트란?", assesses: "관계·생활 방식·이미지 취향", paragraphs: ["이상형 테스트는 외모나 직업을 직접 고르게 하지 않고, 일상 속 선택과 관계에서 중요하게 생각하는 가치를 바탕으로 끌릴 가능성이 높은 사람의 특징을 살펴보는 콘텐츠입니다.", "결과는 실제 연애 상대나 관계의 성공을 예측하지 않습니다. 성격, 대화 방식, 생활 리듬, 전체적인 이미지 취향을 함께 이해하기 위한 참고용 결과입니다."], faqs: [["이상형 테스트는 실제로 내가 좋아할 사람을 맞히나요?", "현재의 관계 취향을 바탕으로 끌릴 가능성이 높은 특징을 분석하며 미래의 연애를 예측하지는 않습니다."], ["왜 이상형을 직접 묻지 않나요?", "일상적인 선택을 통해 관계에서 중요하게 생각하는 요소를 간접적으로 살펴보기 위해서입니다."], ["결과의 직업은 정확한 직업인가요?", "직업은 선호할 가능성이 높은 생활 리듬과 업무 태도를 설명하는 이미지입니다."], ["외모 결과는 어떻게 계산하나요?", "신체 조건이 아닌 전체적인 분위기와 스타일 표현 취향을 분석합니다."], ["테스트할 때마다 결과가 달라질 수 있나요?", "영역별 질문이 달라질 수 있지만 모든 영역이 균형 있게 출제됩니다."]], } };

export function validateIdealTypeData() { if (idealQuestions.filter((question) => question.branch === "male").length < 72 || idealQuestions.filter((question) => question.branch === "female").length < 72 || idealProfiles.filter((profile) => profile.targetGender === "male").length !== 20 || idealProfiles.filter((profile) => profile.targetGender === "female").length !== 20) throw new Error("이상형 테스트 데이터 수가 올바르지 않습니다."); }
validateIdealTypeData();
