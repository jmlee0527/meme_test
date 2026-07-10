import type {
  TestDefinition,
  WizardCharacterProfile,
  WizardCharacterQuestion,
  WizardCharacterScores,
} from "@/lib/types";

export const wizardCharacterTraits = [
  { key: "courage", label: "용기", color: "from-red-500 to-orange-400" },
  { key: "wisdom", label: "지혜", color: "from-indigo-500 to-violet-400" },
  { key: "leadership", label: "리더십", color: "from-amber-500 to-yellow-400" },
  { key: "friendship", label: "우정", color: "from-sky-500 to-cyan-400" },
  { key: "loyalty", label: "충성심", color: "from-blue-600 to-indigo-400" },
  { key: "creativity", label: "창의성", color: "from-fuchsia-500 to-pink-400" },
  { key: "independence", label: "독립성", color: "from-teal-500 to-emerald-400" },
  { key: "ambition", label: "야망", color: "from-purple-600 to-fuchsia-500" },
  { key: "responsibility", label: "책임감", color: "from-slate-600 to-slate-400" },
  { key: "empathy", label: "공감력", color: "from-rose-500 to-pink-400" },
  { key: "action", label: "행동력", color: "from-orange-500 to-amber-400" },
  { key: "analysis", label: "분석력", color: "from-cyan-600 to-blue-500" },
] as const;

export const wizardCharacterQuestions: WizardCharacterQuestion[] = [
  {
    id: 1,
    text: "친구가 단체 대화방에서 억울하게 오해를 받고 있다. 나는?",
    options: [
      { label: "A", text: "상황을 더 알아본 뒤 사실관계를 차분히 정리한다", value: 0, weights: { analysis: 4, wisdom: 3, responsibility: 2 } },
      { label: "B", text: "바로 나서서 친구의 입장을 분명하게 대신 말한다", value: 1, weights: { courage: 4, loyalty: 4, action: 3 } },
      { label: "C", text: "친구에게 먼저 연락해 마음을 듣고 원하는 도움을 묻는다", value: 2, weights: { empathy: 4, friendship: 4, loyalty: 2 } },
      { label: "D", text: "분위기를 바꿀 수 있는 새로운 관점을 조심스럽게 던진다", value: 3, weights: { creativity: 4, independence: 3, wisdom: 2 } },
    ],
  },
  {
    id: 2,
    text: "처음 가는 모임에 도착했는데 아는 사람이 한 명도 없다. 가장 자연스러운 행동은?",
    options: [
      { label: "A", text: "먼저 인사하고 대화를 시작하며 분위기를 살핀다", value: 0, weights: { leadership: 3, courage: 3, action: 3, friendship: 2 } },
      { label: "B", text: "주변을 관찰하다 공통 관심사가 보이는 사람에게 다가간다", value: 1, weights: { analysis: 4, wisdom: 2, empathy: 2 } },
      { label: "C", text: "혼자 있어도 편하게 둘러보며 내 방식대로 적응한다", value: 2, weights: { independence: 4, creativity: 2, courage: 2 } },
      { label: "D", text: "어색해 보이는 사람에게 먼저 말을 걸어 함께 움직인다", value: 3, weights: { empathy: 4, friendship: 3, loyalty: 2 } },
    ],
  },
  {
    id: 3,
    text: "중요한 발표를 일주일 앞둔 시점, 준비 방식에 가장 가까운 것은?",
    options: [
      { label: "A", text: "자료와 근거를 빠짐없이 확인하고 예상 질문까지 적어둔다", value: 0, weights: { analysis: 4, responsibility: 4, wisdom: 3 } },
      { label: "B", text: "핵심 메시지를 정한 뒤 반복 연습하며 자신감을 끌어올린다", value: 1, weights: { ambition: 3, leadership: 3, responsibility: 3, action: 2 } },
      { label: "C", text: "팀원들과 역할을 나누고 서로 부족한 부분을 채워준다", value: 2, weights: { friendship: 4, loyalty: 3, empathy: 2, responsibility: 2 } },
      { label: "D", text: "남들이 예상하지 못한 구성이나 표현법을 실험한다", value: 3, weights: { creativity: 5, independence: 3, courage: 2 } },
    ],
  },
  {
    id: 4,
    text: "팀 프로젝트의 방향이 계속 흔들릴 때 나는 보통?",
    options: [
      { label: "A", text: "목표와 우선순위를 다시 정하고 역할을 명확히 나눈다", value: 0, weights: { leadership: 4, responsibility: 4, analysis: 2 } },
      { label: "B", text: "말이 적은 사람들의 의견까지 듣고 합의점을 찾는다", value: 1, weights: { empathy: 4, friendship: 3, wisdom: 3 } },
      { label: "C", text: "시간을 더 쓰기보다 실행 가능한 안을 골라 바로 움직인다", value: 2, weights: { action: 5, courage: 3, leadership: 2 } },
      { label: "D", text: "기존 전제를 의심하고 완전히 다른 해결책을 제안한다", value: 3, weights: { creativity: 4, independence: 4, analysis: 2 } },
    ],
  },
  {
    id: 5,
    text: "예상하지 못한 좋은 기회가 왔지만 준비가 완벽하지 않다. 나는?",
    options: [
      { label: "A", text: "일단 잡고 부족한 부분은 진행하면서 채운다", value: 0, weights: { courage: 4, action: 5, ambition: 2 } },
      { label: "B", text: "얻는 것과 잃는 것을 적어본 뒤 조건을 조율한다", value: 1, weights: { analysis: 4, wisdom: 3, ambition: 2 } },
      { label: "C", text: "믿는 사람들과 상의하고 함께할 방법을 찾는다", value: 2, weights: { friendship: 3, loyalty: 3, empathy: 3 } },
      { label: "D", text: "내가 진짜 원하는 방향인지부터 생각하고 결정한다", value: 3, weights: { independence: 4, wisdom: 3, responsibility: 2 } },
    ],
  },
  {
    id: 6,
    text: "공들인 일이 기대만큼 잘되지 않았을 때 첫 반응은?",
    options: [
      { label: "A", text: "아쉬워도 원인을 기록하고 다음 시도를 설계한다", value: 0, weights: { analysis: 4, responsibility: 3, wisdom: 3 } },
      { label: "B", text: "잠깐 속상해한 뒤 다시 몸을 움직이며 분위기를 바꾼다", value: 1, weights: { courage: 3, action: 4, independence: 2 } },
      { label: "C", text: "함께한 사람들을 먼저 챙기고 서로를 격려한다", value: 2, weights: { empathy: 4, friendship: 4, loyalty: 3 } },
      { label: "D", text: "목표를 더 높여 이번 실패를 다음 승부의 동력으로 삼는다", value: 3, weights: { ambition: 5, leadership: 2, courage: 2 } },
    ],
  },
  {
    id: 7,
    text: "친구들과 여행 계획을 세울 때 가장 맡고 싶은 역할은?",
    options: [
      { label: "A", text: "교통과 숙소를 비교해 가장 효율적인 일정을 만든다", value: 0, weights: { analysis: 4, responsibility: 4, wisdom: 2 } },
      { label: "B", text: "모두가 하고 싶은 것을 듣고 만족할 균형점을 찾는다", value: 1, weights: { empathy: 4, friendship: 4, leadership: 2 } },
      { label: "C", text: "현지에서 끌리는 곳으로 움직일 여백을 넉넉히 남긴다", value: 2, weights: { independence: 4, creativity: 3, courage: 2 } },
      { label: "D", text: "평범한 코스 대신 오래 기억될 특별한 경험을 찾아낸다", value: 3, weights: { creativity: 4, ambition: 2, action: 3 } },
    ],
  },
  {
    id: 8,
    text: "규칙이 현실과 맞지 않아 사람들을 불편하게 만든다면?",
    options: [
      { label: "A", text: "일단 규칙을 지키되 정식 절차로 개선안을 낸다", value: 0, weights: { responsibility: 4, wisdom: 3, analysis: 3 } },
      { label: "B", text: "누군가 피해를 본다면 먼저 행동하고 책임도 감수한다", value: 1, weights: { courage: 5, action: 4, leadership: 2 } },
      { label: "C", text: "왜 만들어졌는지 파악하고 더 효과적인 우회로를 찾는다", value: 2, weights: { analysis: 4, ambition: 3, independence: 2 } },
      { label: "D", text: "불편을 겪는 사람들의 이야기를 모아 함께 바꾸려 한다", value: 3, weights: { empathy: 4, friendship: 3, leadership: 3 } },
    ],
  },
  {
    id: 9,
    text: "경쟁에서 나보다 앞선 사람이 생겼을 때 나는?",
    options: [
      { label: "A", text: "그 사람이 잘한 방식을 분석해 내 전략을 더 정교하게 만든다", value: 0, weights: { ambition: 4, analysis: 4, wisdom: 2 } },
      { label: "B", text: "축하해 주고 서로 배울 수 있는 동료 관계를 만든다", value: 1, weights: { friendship: 4, empathy: 3, loyalty: 2 } },
      { label: "C", text: "비교를 멈추고 내가 중요하게 여기는 속도로 계속 간다", value: 2, weights: { independence: 5, wisdom: 2, creativity: 2 } },
      { label: "D", text: "다음에는 내가 앞서겠다는 마음으로 훈련량을 늘린다", value: 3, weights: { ambition: 5, action: 3, responsibility: 2 } },
    ],
  },
  {
    id: 10,
    text: "오래 기억되고 싶은 나의 모습에 가장 가까운 것은?",
    options: [
      { label: "A", text: "어려울 때 믿고 의지할 수 있었던 사람", value: 0, weights: { loyalty: 5, friendship: 4, empathy: 3 } },
      { label: "B", text: "복잡한 문제의 본질을 꿰뚫어 본 사람", value: 1, weights: { wisdom: 5, analysis: 4, responsibility: 2 } },
      { label: "C", text: "두려움 속에서도 필요한 일을 먼저 한 사람", value: 2, weights: { courage: 5, action: 4, leadership: 3 } },
      { label: "D", text: "자기만의 방식으로 새로운 가능성을 보여준 사람", value: 3, weights: { creativity: 5, independence: 4, ambition: 2 } },
    ],
  },
];

const scores = (
  courage: number, wisdom: number, leadership: number, friendship: number,
  loyalty: number, creativity: number, independence: number, ambition: number,
  responsibility: number, empathy: number, action: number, analysis: number,
): WizardCharacterScores => ({ courage, wisdom, leadership, friendship, loyalty, creativity, independence, ambition, responsibility, empathy, action, analysis });

const profile = (
  slug: string,
  name: string,
  koreanName: string,
  symbol: string,
  palette: [string, string],
  summary: string,
  description: string,
  strengths: string[],
  cautions: string[],
  goodMatches: string[],
  difficultMatch: string,
  coreTraits: WizardCharacterProfile["coreTraits"],
  targetScores: WizardCharacterScores,
): WizardCharacterProfile => ({
  slug, name, koreanName, symbol, palette, summary,
  description: `${description} 이 결과는 어느 한 번의 선택보다 반복해서 드러난 판단 기준을 바탕으로 합니다. 상황에 따라 다른 모습도 보일 수 있지만, 압박이 있거나 중요한 결정을 내려야 할 때 이 성향이 특히 선명하게 나타나는 편입니다.`,
  strengths, cautions,
  goodMatches, difficultMatch, coreTraits, targetScores,
  shareText: `내가 해리포터 주인공이라면 ${koreanName}! 당신과 가장 닮은 캐릭터는 누구인가요?`,
});

export const wizardCharacterProfiles: WizardCharacterProfile[] = [
  profile("harry-potter", "Harry Potter", "해리 포터", "⚡", ["#7f1d1d", "#f59e0b"], "필요한 순간 가장 먼저 앞으로 나서는 선택형 리더", "당신은 평소 모든 관심을 독차지하려 하지는 않지만, 중요한 순간에는 책임을 피하지 않는 사람입니다. 완벽한 계획보다 지켜야 할 사람과 옳다고 느끼는 방향이 분명할 때 놀라운 행동력을 보여줍니다. 혼자 모든 것을 해결하려는 경향도 있지만, 결국 친구와의 신뢰 속에서 가장 큰 힘을 얻습니다. 실패나 두려움이 없어서 움직이는 것이 아니라, 두려워도 필요한 선택을 하는 편에 가깝습니다. 주변에서는 당신을 위기에서 믿을 수 있는 사람, 말보다 행동으로 마음을 보여주는 사람으로 기억할 가능성이 큽니다. 다만 책임을 혼자 떠안기 전에 도움을 요청하면 당신의 용기는 더 오래 지속될 수 있습니다.", ["위기에서 빠른 결단", "강한 정의감", "사람을 지키는 책임감", "진심 어린 리더십", "두려움을 넘어서는 실행력"], ["모든 책임을 혼자 지려는 습관", "감정이 앞설 때 성급한 판단", "도움을 요청하는 일을 미루는 경향"], ["hermione-granger", "ron-weasley", "ginny-weasley"], "draco-malfoy", ["courage", "leadership", "action"], scores(94, 68, 84, 76, 88, 48, 64, 57, 82, 74, 92, 58)),
  profile("hermione-granger", "Hermione Granger", "헤르미온느 그레인저", "📚", ["#78350f", "#fbbf24"], "준비와 논리로 불확실성을 실력으로 바꾸는 해결사", "당신은 문제가 생겼을 때 감정적으로 휩쓸리기보다 필요한 정보를 모으고 해결 순서를 세우는 사람입니다. 성실한 준비는 단순한 완벽주의가 아니라 주변을 안전하게 지키는 방식에 가깝습니다. 약속과 기준을 중요하게 여기며, 불합리한 상황에서는 근거를 갖고 목소리를 냅니다. 처음에는 다소 단호하거나 까다롭게 보일 수 있지만, 가까운 사람들은 당신의 잔소리 안에 깊은 책임감과 애정이 있다는 것을 압니다. 지식을 실제 행동으로 연결하는 능력이 뛰어나고, 위기일수록 머리가 더 선명해지는 편입니다. 모든 일을 완벽하게 해내야 한다는 부담을 조금 내려놓고 타인의 다른 방식도 허용하면 훨씬 유연한 리더가 될 수 있습니다.", ["정확한 정보 탐색", "철저한 준비성", "높은 책임감", "논리적인 문제 해결", "원칙을 지키는 용기"], ["완벽하지 않은 과정에 대한 조급함", "스스로에게 지나치게 높은 기준", "상대의 감정보다 해결책을 먼저 말할 수 있음"], ["harry-potter", "ron-weasley", "neville-longbottom"], "luna-lovegood", ["wisdom", "analysis", "responsibility"], scores(76, 96, 73, 72, 80, 57, 55, 68, 97, 74, 72, 98)),
  profile("ron-weasley", "Ron Weasley", "론 위즐리", "♟️", ["#9a3412", "#fb923c"], "곁을 지키는 진심과 유머가 가장 강한 팀플레이어", "당신은 화려하게 앞에 나서기보다 함께하는 사람들과 편안한 분위기를 만드는 데 강점이 있습니다. 긴장된 순간에 웃음을 되찾게 하고, 친구가 정말 필요로 할 때는 계산보다 의리를 선택합니다. 때때로 자신을 다른 사람과 비교하며 자신감을 잃을 수 있지만, 실제 상황에서는 예상보다 훨씬 영리하고 현실적인 판단을 내립니다. 당신의 가치는 혼자 빛날 때보다 팀 안에서 더 선명해집니다. 친한 사람에게는 솔직하고 인간적인 모습을 숨기지 않으며, 완벽하지 않아도 끝까지 곁을 지키는 신뢰를 줍니다. 질투나 서운함을 농담 뒤에 감추기보다 솔직하게 말한다면, 타고난 협동력과 따뜻함이 더욱 안정적인 힘이 됩니다.", ["끈끈한 우정", "위기를 누그러뜨리는 유머", "현실적인 판단력", "팀을 위한 희생", "꾸밈없는 진솔함"], ["비교에서 오는 자신감 저하", "서운함을 농담으로 넘기는 습관", "중요한 순간까지 결정을 미룰 수 있음"], ["harry-potter", "hermione-granger", "rubeus-hagrid"], "draco-malfoy", ["friendship", "loyalty", "empathy"], scores(69, 62, 52, 97, 96, 61, 51, 44, 70, 82, 68, 64)),
  profile("draco-malfoy", "Draco Malfoy", "드레이코 말포이", "◆", ["#14532d", "#94a3b8"], "판을 읽고 유리한 위치를 설계하는 경쟁형 전략가", "당신은 목표와 성과에 민감하고, 경쟁이 생기면 오히려 집중력이 높아지는 타입입니다. 사람과 상황의 힘의 구조를 빠르게 파악하며, 자신이 원하는 것을 얻기 위해 전략적으로 움직일 줄 압니다. 겉으로는 자신감 있고 단단해 보여도 평가와 기대에 예민한 면이 있어, 약한 모습을 쉽게 드러내지 않을 수 있습니다. 관계에서도 존중과 인정이 중요하며, 신뢰하는 사람에게는 생각보다 강한 소속감과 책임을 보입니다. 당신의 야망은 누군가를 이기기 위한 도구에 머물지 않고 스스로의 가능성을 확장할 때 가장 건강하게 빛납니다. 체면 때문에 진짜 마음을 숨기지 않고 실수를 인정하는 연습을 한다면, 날카로운 판단력은 사람을 밀어내는 힘이 아니라 이끄는 힘이 됩니다.", ["빠른 상황 판단", "강한 승부욕", "전략적인 목표 설계", "압박 속 자기관리", "기회를 포착하는 감각"], ["평가에 대한 과민함", "약점을 감추려는 방어적 태도", "관계를 경쟁으로 해석할 가능성"], ["severus-snape", "lord-voldemort", "albus-dumbledore"], "ron-weasley", ["ambition", "analysis", "leadership"], scores(57, 69, 78, 42, 61, 54, 72, 94, 69, 43, 67, 88)),
  profile("luna-lovegood", "Luna Lovegood", "루나 러브굿", "☾", ["#4338ca", "#c4b5fd"], "남들이 놓친 가능성을 발견하는 자유로운 관찰자", "당신은 다수가 당연하게 받아들이는 결론에도 자신만의 질문을 던지는 사람입니다. 새로운 관점과 상상력을 즐기며, 주변의 평가 때문에 취향이나 생각을 쉽게 바꾸지 않습니다. 말수가 많지 않아도 사람의 미묘한 감정을 알아차리고, 판단하기보다 있는 그대로 받아들이는 힘이 있습니다. 때로는 현실과 동떨어져 보이거나 설명이 생략되어 오해받을 수 있지만, 복잡한 상황에서 누구도 보지 못한 출구를 찾아내기도 합니다. 관계에서는 소유보다 자유로운 신뢰를 중요하게 여기며 혼자만의 시간에서 에너지를 회복합니다. 독특함을 지키면서도 생각을 상대가 이해할 수 있는 언어로 한 단계 더 설명한다면, 당신의 창의성은 개인적인 세계를 넘어 많은 사람에게 영감을 주게 됩니다.", ["독창적인 관점", "타인의 다름을 존중함", "높은 직관과 감수성", "평가에 흔들리지 않는 태도", "새로운 가능성 발견"], ["현실적인 세부사항을 놓칠 수 있음", "설명을 생략해 오해받기 쉬움", "불편한 문제를 혼자만의 세계로 피할 수 있음"], ["neville-longbottom", "rubeus-hagrid", "ginny-weasley"], "hermione-granger", ["creativity", "independence", "empathy"], scores(58, 79, 45, 72, 66, 98, 93, 43, 55, 87, 48, 70)),
  profile("neville-longbottom", "Neville Longbottom", "네빌 롱바텀", "🌿", ["#365314", "#84cc16"], "조용히 버티며 결정적인 순간에 성장하는 대기만성형", "당신은 처음부터 자신감이 넘치는 사람이라기보다 경험을 통해 단단해지는 성장형에 가깝습니다. 맡은 일은 눈에 띄지 않아도 꾸준히 이어가고, 익숙하지 않은 상황에서는 신중하게 움직입니다. 평소에는 부드럽고 양보하는 편이지만 중요한 가치가 침해될 때는 스스로도 놀랄 만큼 분명한 태도를 보입니다. 타인의 어려움을 잘 이해하기 때문에 강한 사람보다 곁이 필요한 사람에게 먼저 시선이 갑니다. 작은 실패를 오래 마음에 담을 수 있으나, 그 경험이 결국 인내와 실력으로 축적되는 사람입니다. 자신감이 생길 때까지 기다리기보다 작은 행동을 먼저 반복한다면, 숨겨진 용기와 책임감은 팀 전체를 지탱하는 매우 믿음직한 리더십으로 자라납니다.", ["꾸준한 성장력", "포기하지 않는 인내심", "조용한 책임감", "약자를 향한 공감", "결정적 순간의 용기"], ["자신의 능력을 과소평가함", "초기 실패를 오래 곱씹음", "필요한 주장도 늦게 꺼낼 수 있음"], ["luna-lovegood", "hermione-granger", "rubeus-hagrid"], "lord-voldemort", ["courage", "responsibility", "loyalty"], scores(78, 67, 54, 78, 88, 60, 55, 39, 91, 86, 62, 64)),
  profile("ginny-weasley", "Ginny Weasley", "지니 위즐리", "✦", ["#be123c", "#fb7185"], "자기 삶의 방향을 스스로 정하는 당당한 실행가", "당신은 관계를 소중히 여기면서도 타인의 기대에 자신을 맞추는 데 머물지 않습니다. 원하는 것이 분명하고, 기회가 오면 눈치를 보기보다 실력과 행동으로 자리를 만들어갑니다. 감정을 솔직하게 표현하지만 감정에만 끌려가지 않으며, 가까운 사람에게도 건강한 거리와 독립성을 유지합니다. 위기에서는 빠르게 판단하고 분위기를 전환하는 힘이 있어 주변에 자신감을 전염시킵니다. 당당함 때문에 가끔 강하게 보일 수 있지만, 그 안에는 소중한 사람을 지키려는 충성심과 따뜻함이 함께 있습니다. 혼자 해낼 수 있다는 사실과 혼자 해야 한다는 생각은 다르다는 점을 기억하고, 필요한 순간 협력을 허용하면 당신의 주도성과 매력은 더 넓은 무대에서 빛날 수 있습니다.", ["높은 독립성", "솔직한 자기표현", "빠른 실행력", "도전을 즐기는 자신감", "관계와 자아의 균형"], ["도움을 받는 일을 불편해함", "단호함이 차갑게 전달될 수 있음", "흥미가 떨어지면 빠르게 거리를 둘 수 있음"], ["harry-potter", "luna-lovegood", "sirius-black"], "severus-snape", ["independence", "courage", "action"], scores(87, 66, 76, 73, 78, 65, 94, 67, 74, 69, 91, 58)),
  profile("sirius-black", "Sirius Black", "시리우스 블랙", "★", ["#111827", "#60a5fa"], "자유와 의리를 위해 망설임 없이 움직이는 모험가", "당신은 통제받는 환경보다 스스로 선택할 수 있는 상황에서 최고의 에너지를 냅니다. 규칙의 권위보다 그 규칙이 누구를 위한 것인지 중요하게 보고, 부당하다고 느끼면 직접 부딪히는 편입니다. 친한 사람에게는 매우 뜨겁고 충성스럽지만, 답답한 상황에서는 충분한 설명 없이 먼저 행동할 수 있습니다. 당신의 대담함과 유머는 주변 사람에게 해방감과 용기를 주며, 낯선 도전도 살아 있다는 감각으로 받아들입니다. 다만 상처나 분노를 행동으로만 풀면 중요한 판단이 흐려질 수 있습니다. 잠시 멈추어 장기적인 결과를 점검하는 습관을 더한다면, 자유로운 추진력은 충동이 아니라 사람들을 낡은 틀 밖으로 이끄는 강력한 변화의 리더십이 됩니다.", ["거침없는 행동력", "강한 의리", "권위에 질문하는 용기", "모험을 즐기는 태도", "주변을 북돋는 에너지"], ["감정이 뜨거울 때의 충동", "장기 계획을 답답해할 수 있음", "제약을 모두 부당함으로 볼 가능성"], ["ginny-weasley", "harry-potter", "ron-weasley"], "albus-dumbledore", ["independence", "action", "loyalty"], scores(91, 57, 73, 80, 95, 63, 97, 58, 55, 68, 98, 45)),
  profile("severus-snape", "Severus Snape", "세베루스 스네이프", "⚗️", ["#18181b", "#71717a"], "감정보다 책임을 앞세우는 냉철한 장기전 전문가", "당신은 쉽게 속내를 드러내지 않지만, 한번 정한 책임과 약속은 긴 시간 동안 지켜내는 사람입니다. 상황을 감정보다 구조와 근거로 판단하며, 복잡한 문제를 깊게 파고드는 집중력이 뛰어납니다. 표현이 간결하고 기준이 높아 차갑거나 까다롭게 보일 수 있으나, 말보다 행동과 결과로 진심을 증명하는 편입니다. 타인의 인정 없이도 맡은 일을 수행하는 독립성이 강하고, 단기적인 인기보다 장기적인 목적을 택합니다. 다만 상처를 혼자 보관하면 현재의 관계까지 과거의 기준으로 판단할 수 있습니다. 필요한 감정을 조금 더 직접적으로 설명하고 타인에게 수정할 기회를 준다면, 당신의 헌신과 분석력은 두려움이 아닌 깊은 신뢰를 만드는 힘이 됩니다.", ["깊은 분석과 집중력", "흔들리지 않는 책임감", "장기적인 헌신", "감정에 휩쓸리지 않는 판단", "독립적인 문제 해결"], ["감정 표현을 지나치게 아낌", "높은 기준으로 타인을 압박할 수 있음", "과거의 상처를 오래 품는 경향"], ["draco-malfoy", "albus-dumbledore", "hermione-granger"], "ginny-weasley", ["analysis", "responsibility", "loyalty"], scores(68, 91, 56, 38, 90, 56, 84, 73, 96, 49, 54, 98)),
  profile("albus-dumbledore", "Albus Dumbledore", "알버스 덤블도어", "◇", ["#312e81", "#a78bfa"], "멀리 보고 사람의 가능성을 연결하는 통찰형 리더", "당신은 눈앞의 승패보다 긴 흐름과 사람의 성장 가능성을 함께 보는 사람입니다. 복잡한 의견이 부딪힐 때 한쪽을 빠르게 택하기보다, 각자의 동기와 결과를 살펴 더 큰 방향을 제시합니다. 지식을 과시하기보다 필요한 순간에 질문과 힌트로 건네며, 사람에게 스스로 선택할 여지를 남깁니다. 리더십은 통제보다 신뢰와 설계에 가깝고 위기에서도 감정의 균형을 유지합니다. 다만 큰 그림에 집중하다 보면 가까운 사람이 원하는 구체적인 설명이나 즉각적인 위로를 놓칠 수 있습니다. 모든 것을 혼자 알고 책임지려 하지 말고 판단의 근거를 더 투명하게 공유한다면, 당신의 지혜는 신비로운 권위가 아니라 함께 성장하는 안전한 리더십으로 완성됩니다.", ["넓은 시야와 통찰", "균형 잡힌 리더십", "사람의 잠재력 발견", "장기 전략 설계", "위기에서의 침착함"], ["의도를 충분히 설명하지 않을 수 있음", "큰 목표를 위해 현재 감정을 놓칠 수 있음", "책임을 혼자 감당하려는 경향"], ["hermione-granger", "harry-potter", "severus-snape"], "sirius-black", ["wisdom", "leadership", "analysis"], scores(78, 99, 94, 72, 77, 82, 71, 66, 91, 84, 64, 93)),
  profile("rubeus-hagrid", "Rubeus Hagrid", "루비우스 해그리드", "🪶", ["#713f12", "#a3e635"], "있는 그대로 품어주는 따뜻한 보호자", "당신은 사람의 능력이나 배경보다 마음을 먼저 보는 편입니다. 누군가 소외되어 있거나 도움이 필요해 보이면 지나치지 못하고, 실질적인 행동으로 편안함을 줍니다. 좋아하는 것과 사람에게는 애정을 숨기지 않으며, 계산보다 진심을 우선합니다. 때로는 믿음이 너무 커서 위험 신호나 현실적인 조건을 가볍게 볼 수 있지만, 당신 곁에서는 많은 사람이 평가받지 않고 받아들여진다는 안정감을 느낍니다. 힘든 순간에도 관계를 포기하지 않는 충성심과 보호 본능은 큰 자산입니다. 선한 의도만큼 경계와 확인도 중요하다는 점을 기억하고, 모든 사람의 문제를 대신 짊어지지 않는다면 당신의 따뜻함은 소진되지 않고 오래 지속되는 안전한 울타리가 됩니다.", ["높은 공감과 포용력", "조건 없는 우정", "강한 보호 본능", "솔직한 애정 표현", "어려운 사람을 돕는 실행력"], ["사람을 너무 쉽게 믿을 수 있음", "현실적인 위험을 낙관할 수 있음", "타인의 문제까지 떠안을 가능성"], ["ron-weasley", "luna-lovegood", "neville-longbottom"], "lord-voldemort", ["empathy", "friendship", "loyalty"], scores(72, 54, 57, 96, 97, 68, 48, 35, 78, 99, 73, 46)),
  profile("lord-voldemort", "Lord Voldemort", "볼드모트", "⬟", ["#064e3b", "#6b7280"], "목표를 향해 판 전체를 움직이는 초집중 전략가", "이 결과는 선악을 뜻하지 않습니다. 당신은 원하는 목표가 생기면 주변의 변수와 자원을 빠르게 파악하고, 가장 효과적인 경로를 설계하는 성향이 강합니다. 경쟁적인 상황에서도 주눅 들기보다 영향력을 키울 방법을 찾으며, 남들이 불가능하다고 여기는 수준까지 기준을 높일 수 있습니다. 감정보다 성과와 통제 가능성을 중시해 냉정한 결정을 내리지만, 사람의 마음을 효율만으로 보면 협력이 오래가지 못할 수 있습니다. 강한 추진력과 카리스마는 분명한 재능입니다. 목표를 이루는 방식이 관계와 가치에 어떤 흔적을 남기는지 함께 점검하고, 반대 의견을 위협이 아닌 정보로 받아들인다면 압도적인 야망은 파괴적 경쟁이 아니라 큰 변화를 만드는 리더십으로 전환됩니다.", ["강력한 목표 집중력", "대담한 야망", "전략적 자원 활용", "압박을 이기는 추진력", "영향력을 만드는 카리스마"], ["성과를 위해 관계를 도구화할 위험", "통제할 수 없는 상황에 대한 경직성", "반대 의견을 위협으로 느낄 수 있음", "과정의 감정적 비용을 놓칠 수 있음"], ["draco-malfoy", "severus-snape", "albus-dumbledore"], "rubeus-hagrid", ["ambition", "leadership", "analysis"], scores(69, 83, 96, 25, 47, 66, 89, 100, 72, 28, 91, 94)),
];

// 각 캐릭터가 10개 상황에서 보일 법한 대표 선택 패턴입니다.
// 실제 판정은 이 패턴과 12개 성향 벡터를 함께 비교해 단일 성향으로 결과가 고정되지 않게 합니다.
export const wizardCharacterPatterns: Record<string, number[]> = {
  "harry-potter": [1, 0, 1, 2, 0, 1, 1, 1, 1, 2],
  "hermione-granger": [0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  "ron-weasley": [2, 0, 2, 1, 2, 2, 1, 3, 1, 0],
  "draco-malfoy": [0, 1, 1, 0, 1, 3, 0, 2, 0, 1],
  "luna-lovegood": [3, 2, 3, 3, 3, 1, 2, 2, 2, 3],
  "neville-longbottom": [2, 1, 2, 1, 2, 0, 1, 0, 2, 0],
  "ginny-weasley": [1, 0, 1, 0, 0, 1, 2, 1, 2, 2],
  "sirius-black": [1, 0, 3, 2, 0, 1, 2, 1, 2, 2],
  "severus-snape": [0, 1, 1, 0, 3, 0, 0, 2, 0, 1],
  "albus-dumbledore": [0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
  "rubeus-hagrid": [2, 3, 2, 1, 2, 2, 1, 3, 1, 0],
  "lord-voldemort": [0, 0, 1, 0, 1, 3, 3, 2, 3, 1],
};

// 모든 응답 조합(4¹⁰)을 전수 점검해 캐릭터별 결과 영역을 보정한 상수입니다.
// 양수는 과다 노출을 줄이고 음수는 과소 노출을 보완합니다.
export const wizardCharacterCalibration: Record<string, number> = {
  "harry-potter": 0,
  "hermione-granger": -500,
  "ron-weasley": 200,
  "draco-malfoy": 600,
  "luna-lovegood": 1000,
  "neville-longbottom": 250,
  "ginny-weasley": -300,
  "sirius-black": -600,
  "severus-snape": -400,
  "albus-dumbledore": -1000,
  "rubeus-hagrid": 150,
  "lord-voldemort": -450,
};

export const wizardCharacterTest: TestDefinition = {
  type: "quiz",
  slug: "harry-potter-character-test",
  title: "내가 해리포터 주인공이라면?",
  shortTitle: "해리포터 성격 테스트",
  cardTitle: "내가 해리포터 주인공이라면?",
  description: "일상 속 10가지 선택으로 나와 가장 닮은 해리포터 핵심 캐릭터를 찾아보세요.",
  category: "성격.심리",
  duration: "약 2분",
  icon: "🪄",
  participants: 1847,
  accent: "purple",
  isNew: true,
  itemCount: wizardCharacterQuestions.length,
  questions: wizardCharacterQuestions.map(({ id, text, options }) => ({ id, text, options: options.map(({ label, text, value }) => ({ label, text, value })) })),
  resultSlugs: [],
  seoTitle: "해리포터 테스트 | 내가 해리포터 주인공이라면?",
  seoDescription: "해리포터 성격 테스트로 나와 가장 닮은 캐릭터를 찾아보세요. 10개의 일상 질문으로 성향을 분석하는 무료 해리포터 캐릭터 테스트입니다.",
  keywords: ["해리포터 테스트", "해리포터 성격 테스트", "내가 해리포터라면", "해리포터 캐릭터 테스트", "해리포터 심리테스트"],
  seoContent: {
    heading: "해리포터 성격 테스트란?",
    paragraphs: [
      "해리포터 테스트는 일상에서 나타나는 선택과 행동 패턴을 바탕으로 나와 가장 닮은 핵심 캐릭터를 찾아보는 성격 테스트입니다. 용기나 야망을 직접 묻는 대신 친구가 곤란할 때의 반응, 팀 프로젝트를 이끄는 방식, 실패와 경쟁을 받아들이는 태도처럼 자연스러운 상황을 통해 성향을 분석합니다.",
      "각 답변은 용기, 지혜, 리더십, 우정, 충성심, 창의성, 독립성, 야망, 책임감, 공감력, 행동력, 분석력 등 여러 성향에 동시에 영향을 줍니다. 단순히 한 점수가 가장 높다고 결과를 정하지 않고, 12가지 성향의 전체 조합을 캐릭터별 성향 프로필과 비교해 가장 가까운 결과를 찾습니다.",
      "결과는 공식 심리검사나 작품 제작사의 공식 테스트가 아닌 팬 콘텐츠입니다. 영화 스틸컷이나 배우 사진, 공식 일러스트를 사용하지 않으며, 캐릭터의 분위기를 현대적으로 재해석한 오리지널 심볼 비주얼로 구성했습니다. 친구와 결과를 비교하며 가볍게 즐겨보세요.",
    ],
    faqs: [
      ["결과는 어떻게 계산되나요?", "10개 답변으로 12가지 성향 점수를 계산한 뒤, 각 캐릭터의 목표 성향 벡터와 가장 가까운 조합을 결과로 선택합니다."],
      ["볼드모트가 나오면 나쁜 사람이라는 뜻인가요?", "아닙니다. 이 결과에서는 선악이 아니라 강한 목표 지향성, 전략성, 추진력과 영향력 같은 성향만 재미있게 해석합니다."],
      ["공식 해리포터 테스트인가요?", "아닙니다. 작품과 캐릭터에서 영감을 받은 비공식 팬 성격 콘텐츠이며, 공식 이미지나 문항을 복제하지 않았습니다."],
      ["같은 답을 고르면 같은 결과가 나오나요?", "네. 결과는 무작위가 아니라 선택한 답변의 성향 점수로 계산되므로 같은 응답에는 같은 결과가 나옵니다."],
    ],
    assesses: "일상 행동에서 나타나는 용기·지혜·관계·실행·분석 성향",
  },
};

export const getWizardCharacterProfile = (slug: string) => wizardCharacterProfiles.find((item) => item.slug === slug);
