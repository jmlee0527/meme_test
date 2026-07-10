import type {
  CoffeeBrandProfile,
  CoffeeBrandQuestion,
  CoffeeBrandScores,
  TestDefinition,
} from "@/lib/types";

export const coffeeBrandTraits = [
  { key: "trendy", label: "트렌디함", color: "from-fuchsia-500 to-pink-400" },
  { key: "emotion", label: "감성", color: "from-rose-500 to-orange-300" },
  { key: "practicality", label: "현실성", color: "from-slate-600 to-slate-400" },
  { key: "rationality", label: "합리성", color: "from-blue-600 to-cyan-400" },
  { key: "leisure", label: "여유", color: "from-emerald-500 to-teal-300" },
  { key: "activity", label: "활동성", color: "from-orange-500 to-amber-400" },
  { key: "independence", label: "독립성", color: "from-indigo-600 to-violet-400" },
  { key: "sociability", label: "친화력", color: "from-sky-500 to-blue-400" },
  { key: "challenge", label: "도전성", color: "from-red-500 to-orange-400" },
  { key: "stability", label: "안정성", color: "from-green-600 to-emerald-400" },
  { key: "creativity", label: "창의성", color: "from-purple-600 to-fuchsia-400" },
  { key: "premium", label: "프리미엄 지향", color: "from-amber-600 to-yellow-400" },
] as const;

export const coffeeBrandQuestions: CoffeeBrandQuestion[] = [
  {
    id: 1,
    text: "예고 없이 하루의 여유가 생겼다. 가장 끌리는 계획은?",
    options: [
      { label: "A", text: "새로 생긴 공간과 전시를 찾아 도심을 돌아다닌다", value: 0, weights: { trendy: 4, activity: 3, challenge: 2, creativity: 2 } },
      { label: "B", text: "좋아하는 음악과 책을 챙겨 조용히 혼자 쉰다", value: 1, weights: { emotion: 4, leisure: 4, independence: 3 } },
      { label: "C", text: "미뤄둔 일들을 처리하고 편안한 루틴으로 돌아온다", value: 2, weights: { practicality: 4, stability: 4, rationality: 2 } },
      { label: "D", text: "친구들에게 연락해 맛있는 것을 먹으며 수다를 떤다", value: 3, weights: { sociability: 5, activity: 3, emotion: 2 } },
    ],
  },
  {
    id: 2,
    text: "처음 가는 카페를 고를 때 가장 먼저 확인하는 것은?",
    options: [
      { label: "A", text: "공간의 분위기와 사진으로 남기고 싶은 디테일", value: 0, weights: { trendy: 4, emotion: 3, creativity: 3 } },
      { label: "B", text: "가격과 양, 자주 방문해도 부담 없는 구성", value: 1, weights: { rationality: 5, practicality: 4, stability: 2 } },
      { label: "C", text: "원두와 추출 방식처럼 음료 자체의 완성도", value: 2, weights: { premium: 5, independence: 3, creativity: 2 } },
      { label: "D", text: "편한 좌석과 접근성, 오래 머물기 좋은 환경", value: 3, weights: { leisure: 4, practicality: 3, stability: 3 } },
    ],
  },
  {
    id: 3,
    text: "흥미로운 신메뉴가 출시됐다는 소식을 들었다. 나는?",
    options: [
      { label: "A", text: "궁금하면 바로 마셔보고 내 취향인지 판단한다", value: 0, weights: { trendy: 4, challenge: 4, activity: 2 } },
      { label: "B", text: "후기와 가격을 비교해 만족도가 높아 보이면 고른다", value: 1, weights: { rationality: 4, practicality: 3, stability: 2 } },
      { label: "C", text: "새로움보다 늘 만족했던 익숙한 메뉴를 선택한다", value: 2, weights: { stability: 5, practicality: 3, leisure: 2 } },
      { label: "D", text: "친구와 다른 메뉴를 하나씩 골라 함께 맛본다", value: 3, weights: { sociability: 4, creativity: 3, challenge: 2 } },
    ],
  },
  {
    id: 4,
    text: "친구들이 자주 말하는 나의 이미지에 가장 가까운 것은?",
    options: [
      { label: "A", text: "새로운 소식과 좋은 장소를 빠르게 알아오는 사람", value: 0, weights: { trendy: 5, activity: 3, sociability: 2 } },
      { label: "B", text: "약속과 기준이 분명해 믿고 맡길 수 있는 사람", value: 1, weights: { stability: 4, practicality: 3, rationality: 3 } },
      { label: "C", text: "사소한 분위기까지 잘 느끼고 취향이 뚜렷한 사람", value: 2, weights: { emotion: 4, creativity: 4, independence: 2 } },
      { label: "D", text: "복잡한 일을 빠르고 간단하게 정리하는 사람", value: 3, weights: { practicality: 5, rationality: 4, activity: 2 } },
    ],
  },
  {
    id: 5,
    text: "여행을 떠난다면 가장 선호하는 방식은?",
    options: [
      { label: "A", text: "핫한 장소를 중심으로 하루를 알차게 채운다", value: 0, weights: { trendy: 4, activity: 4, challenge: 2 } },
      { label: "B", text: "한 동네에 머물며 풍경과 시간을 천천히 즐긴다", value: 1, weights: { leisure: 5, emotion: 4, independence: 2 } },
      { label: "C", text: "예산과 동선을 미리 계산해 효율적으로 움직인다", value: 2, weights: { rationality: 5, practicality: 4, stability: 2 } },
      { label: "D", text: "큰 계획 없이 동행의 제안과 현지 분위기를 따른다", value: 3, weights: { sociability: 4, challenge: 3, creativity: 2 } },
    ],
  },
  {
    id: 6,
    text: "소중한 사람을 위한 선물을 고를 때 가장 중요한 기준은?",
    options: [
      { label: "A", text: "요즘 감각이 느껴지고 받는 순간 설레는 것", value: 0, weights: { trendy: 4, emotion: 3, creativity: 3 } },
      { label: "B", text: "일상에서 자주 쓰이며 실제로 도움이 되는 것", value: 1, weights: { practicality: 5, rationality: 3, stability: 2 } },
      { label: "C", text: "가격보다 소재와 완성도가 확실히 좋은 것", value: 2, weights: { premium: 5, stability: 2, independence: 2 } },
      { label: "D", text: "우리만 아는 이야기와 추억이 담긴 것", value: 3, weights: { emotion: 5, sociability: 3, creativity: 2 } },
    ],
  },
  {
    id: 7,
    text: "해야 할 일이 많을 때 나의 처리 방식은?",
    options: [
      { label: "A", text: "우선순위와 시간을 정해 계획대로 하나씩 끝낸다", value: 0, weights: { stability: 4, rationality: 4, practicality: 3 } },
      { label: "B", text: "가장 급한 것부터 빠르게 시작해 흐름을 만든다", value: 1, weights: { activity: 5, challenge: 3, practicality: 2 } },
      { label: "C", text: "기존 방식보다 더 재미있고 새로운 해법을 찾는다", value: 2, weights: { creativity: 5, independence: 3, challenge: 2 } },
      { label: "D", text: "주변과 역할을 나누고 서로 진행 상황을 맞춘다", value: 3, weights: { sociability: 4, stability: 3, rationality: 2 } },
    ],
  },
  {
    id: 8,
    text: "여러 사람과 함께 있을 때 자연스럽게 맡는 포지션은?",
    options: [
      { label: "A", text: "먼저 제안하고 분위기에 에너지를 더하는 역할", value: 0, weights: { activity: 4, sociability: 4, challenge: 2 } },
      { label: "B", text: "말을 잘 들어주고 모두가 편하도록 챙기는 역할", value: 1, weights: { emotion: 4, sociability: 4, stability: 2 } },
      { label: "C", text: "필요할 때 참여하되 내 리듬과 공간을 지키는 역할", value: 2, weights: { independence: 5, leisure: 3, creativity: 2 } },
      { label: "D", text: "일정과 비용처럼 현실적인 부분을 정리하는 역할", value: 3, weights: { practicality: 5, rationality: 4, stability: 2 } },
    ],
  },
  {
    id: 9,
    text: "바쁜 하루에 마시는 커피 한 잔은 나에게 어떤 의미인가?",
    options: [
      { label: "A", text: "다음 일을 빠르게 시작하게 해주는 에너지 충전", value: 0, weights: { activity: 5, practicality: 3, challenge: 2 } },
      { label: "B", text: "잠시 속도를 늦추고 나를 돌보는 작은 의식", value: 1, weights: { leisure: 5, emotion: 4, stability: 2 } },
      { label: "C", text: "사람과 대화를 이어주는 편안한 매개", value: 2, weights: { sociability: 5, emotion: 3, stability: 2 } },
      { label: "D", text: "향과 질감의 차이를 발견하는 취향 탐험", value: 3, weights: { premium: 4, creativity: 4, independence: 2 } },
    ],
  },
  {
    id: 10,
    text: "요즘 삶에서 가장 중요하게 생각하는 가치에 가까운 것은?",
    options: [
      { label: "A", text: "새로운 목표를 세우고 계속 성장하는 것", value: 0, weights: { challenge: 5, activity: 3, trendy: 2 } },
      { label: "B", text: "일과 휴식의 균형을 지키며 편안하게 사는 것", value: 1, weights: { leisure: 5, stability: 4, emotion: 2 } },
      { label: "C", text: "필요한 것에 현명하게 쓰고 생활을 단단히 만드는 것", value: 2, weights: { rationality: 5, practicality: 4, stability: 2 } },
      { label: "D", text: "남의 기준보다 내가 좋아하는 것을 깊게 알아가는 것", value: 3, weights: { independence: 5, creativity: 4, premium: 2 } },
    ],
  },
];

const scores = (
  trendy: number, emotion: number, practicality: number, rationality: number,
  leisure: number, activity: number, independence: number, sociability: number,
  challenge: number, stability: number, creativity: number, premium: number,
): CoffeeBrandScores => ({ trendy, emotion, practicality, rationality, leisure, activity, independence, sociability, challenge, stability, creativity, premium });

const profile = (
  slug: string, name: string, symbol: string, palette: [string, string], summary: string,
  description: string, matchReason: string, strengths: string[], cautions: string[], menus: string[],
  goodMatches: string[], oppositeMatch: string, coreTraits: CoffeeBrandProfile["coreTraits"],
  targetScores: CoffeeBrandScores,
): CoffeeBrandProfile => ({
  slug, name, symbol, palette, summary,
  description: `${description} 이 결과는 특정 메뉴 하나가 아니라 선택에서 반복된 생활 리듬, 지출 기준, 관계 방식과 공간 취향을 함께 반영합니다. 같은 사람도 상황에 따라 다른 카페를 찾을 수 있지만, 별다른 약속 없이 자연스럽게 선택할 때는 이 브랜드가 가진 분위기와 가장 비슷한 결을 보입니다. 중요한 것은 브랜드의 우열이 아니라 지금의 나에게 편안함과 만족을 주는 방식입니다.`,
  matchReason, strengths, cautions, menus, goodMatches, oppositeMatch, coreTraits, targetScores,
  shareText: `나와 어울리는 커피 브랜드는 ${name}! 당신의 카페 취향은 어디에 가까울까요?`,
});

export const coffeeBrandProfiles: CoffeeBrandProfile[] = [
  profile("starbucks", "스타벅스", "✦", ["#064e3b", "#34d399"], "도시의 흐름과 나만의 루틴을 함께 즐기는 트렌드 밸런서", "당신은 새로운 흐름을 빠르게 읽지만 무조건 유행만 따르지는 않습니다. 익숙한 품질과 편리한 시스템 안에서 내 취향대로 선택지를 조합하는 것을 좋아합니다. 바쁜 일정 속에서도 작은 자기관리 루틴을 만들며, 공간과 서비스가 주는 전체 경험을 중요하게 봅니다. 사람들과 자연스럽게 어울리면서도 혼자 집중하는 시간을 능숙하게 확보하는 편입니다.", "트렌디함과 안정성, 프리미엄 경험과 일상적 접근성을 동시에 원하는 성향이 브랜드가 가진 도시적 균형감과 잘 맞습니다.", ["새로운 흐름을 읽는 감각", "꾸준한 자기관리", "상황에 맞는 선택력", "도시적인 친화력", "익숙함을 세련되게 활용함"], ["브랜드 경험에 익숙해져 지출이 커질 수 있음", "선택지가 많으면 결정이 길어질 수 있음", "유행을 내 취향으로 착각하지 않기"], ["카페 아메리카노", "콜드 브루", "카페 라테"], ["twosome-place", "coffee-bean", "paul-bassett"], "ediya-coffee", ["trendy", "stability", "premium"], scores(91, 70, 63, 62, 68, 72, 69, 77, 68, 80, 74, 82)),
  profile("ediya-coffee", "이디야커피", "⌂", ["#1e3a8a", "#60a5fa"], "부담 없는 편안함을 오래 지키는 생활 밀착 안정형", "당신은 화려한 첫인상보다 꾸준히 만족할 수 있는 선택을 신뢰합니다. 일상 동선과 예산을 현실적으로 고려하고, 익숙한 공간에서 편안하게 시간을 보내는 것을 좋아합니다. 관계에서도 과한 표현보다 자주 곁을 지키는 방식으로 마음을 보여줍니다. 새로운 것을 거부하지는 않지만 검증된 안정감을 포기하면서까지 모험할 필요는 없다고 생각하는 편입니다.", "친근한 접근성, 현실적인 가격 감각과 반복 방문의 편안함이 안정성과 꾸준함을 중시하는 당신의 생활 방식과 닮았습니다.", ["꾸준하고 안정적인 선택", "현실적인 소비 감각", "친근한 관계 형성", "생활 루틴 유지", "과하지 않은 균형감"], ["익숙함 때문에 새로운 경험을 놓칠 수 있음", "내 취향을 뒤로 미루기 쉬움", "안전한 선택만 반복하지 않기"], ["아메리카노", "토피넛 라테", "복숭아 아이스티"], ["hollys", "angel-in-us", "compose-coffee"], "blue-bottle", ["stability", "practicality", "sociability"], scores(48, 64, 91, 84, 73, 52, 46, 81, 39, 96, 51, 45)),
  profile("mega-mgc-coffee", "메가MGC커피", "⚡", ["#facc15", "#f97316"], "크게 즐기고 빠르게 충전하는 에너지 실속파", "당신은 고민에 오래 머무르기보다 필요한 것을 빠르게 선택하고 행동으로 옮깁니다. 만족감이 분명하다면 형식이나 허세보다 양과 효율을 우선하며, 활기찬 분위기에서 에너지를 얻습니다. 친구들과 편하게 웃고 떠드는 시간을 좋아하고, 작은 비용으로 기분을 크게 전환하는 방법을 잘 압니다. 일에서도 완벽한 준비보다 실행하면서 답을 찾는 편에 가깝습니다.", "넉넉한 만족감과 빠른 에너지, 합리적인 가격을 동시에 추구하는 성향이 활동적인 대용량 카페 이미지와 자연스럽게 이어집니다.", ["빠른 실행력", "높은 생활 에너지", "분명한 가성비 감각", "유쾌한 친화력", "복잡하지 않은 결정"], ["속도를 내다 디테일을 놓칠 수 있음", "양과 즉각적 만족에 치우칠 수 있음", "휴식이 필요할 때도 계속 달리지 않기"], ["아이스 아메리카노", "큐브 라테", "딸기 라테"], ["the-venti", "paiks-coffee", "mammoth-coffee"], "paul-bassett", ["activity", "rationality", "practicality"], scores(70, 55, 94, 96, 44, 98, 49, 81, 82, 60, 55, 35)),
  profile("compose-coffee", "컴포즈커피", "▦", ["#f59e0b", "#fde047"], "필요한 만족을 정확히 챙기는 스마트 효율형", "당신은 소비에서 가격표만 보는 사람이 아니라 비용 대비 얻는 경험을 빠르게 계산하는 사람입니다. 불필요한 장식보다 본질적인 기능과 만족을 중요하게 여기며, 일상에서 반복 가능한 선택을 선호합니다. 업무도 복잡한 절차를 줄이고 핵심부터 처리하는 편입니다. 주변 유행에 휩쓸리기보다 내가 납득할 수 있는 기준을 세워 꾸준히 실천합니다.", "부담 없는 가격, 효율적인 이용 경험과 일관된 실속이 합리성과 현실성을 강하게 가진 당신의 소비 기준에 잘 맞습니다.", ["뛰어난 비용 판단", "효율적인 시간 관리", "명확한 우선순위", "꾸준한 생활 운영", "유행에 흔들리지 않는 기준"], ["효율만 보다가 감성적 만족을 놓칠 수 있음", "새로운 경험에 인색해질 수 있음", "나를 위한 작은 사치를 죄책감 없이 허용하기"], ["아메리카노", "카페 라테", "와플"], ["ediya-coffee", "mammoth-coffee", "mega-mgc-coffee"], "pascucci", ["rationality", "practicality", "stability"], scores(43, 42, 98, 100, 53, 66, 62, 58, 55, 89, 43, 31)),
  profile("paiks-coffee", "빽다방", "☺", ["#1d4ed8", "#facc15"], "복잡한 분위기를 유쾌하게 바꾸는 친근한 현실파", "당신은 사람 사이의 벽을 빠르게 낮추고 어려운 상황도 지나치게 무겁게 만들지 않는 재주가 있습니다. 익숙하고 대중적인 선택의 장점을 잘 알며, 누구나 편하게 참여할 수 있는 분위기를 중요하게 봅니다. 소비에서는 이름값보다 실제 만족을 따지고, 맛과 양이 분명한 선택을 좋아합니다. 솔직하고 털털한 태도 덕분에 주변에서 함께 있으면 편한 사람으로 기억됩니다.", "유쾌한 대중성, 친근한 메뉴와 확실한 만족감이 현실적이면서 사람 좋아하는 당신의 분위기와 잘 어울립니다.", ["편안한 친화력", "유머와 분위기 전환", "현실적인 만족 추구", "솔직한 의사표현", "누구와도 어울리는 적응력"], ["가벼운 농담으로 진심을 넘길 수 있음", "섬세한 품질 차이를 놓칠 수 있음", "모두에게 맞추느라 내 취향을 잊지 않기"], ["원조커피", "아이스 아메리카노", "완전초코"], ["mega-mgc-coffee", "the-venti", "tom-n-toms"], "blue-bottle", ["sociability", "practicality", "activity"], scores(64, 62, 90, 86, 58, 86, 47, 98, 67, 68, 53, 30)),
  profile("twosome-place", "투썸플레이스", "◆", ["#7f1d1d", "#fb7185"], "분위기와 디저트까지 하나의 장면으로 즐기는 감성 큐레이터", "당신은 무엇을 먹고 마시는지만큼 그 시간이 어떤 분위기로 기억되는지를 중요하게 생각합니다. 사람을 만날 때도 공간과 대화의 결을 세심하게 살피며, 작은 디테일로 특별한 순간을 만드는 편입니다. 세련된 취향을 즐기지만 과하게 낯선 실험보다는 누구나 공감할 만한 완성도를 선호합니다. 바쁜 날에도 달콤한 보상과 여유를 의식적으로 챙깁니다.", "감각적인 공간, 디저트와 음료가 만드는 완성된 경험이 감성과 세련됨, 관계의 분위기를 중시하는 당신에게 잘 맞습니다.", ["분위기를 만드는 감각", "섬세한 관계 배려", "높은 미적 기준", "보상의 순간을 잘 챙김", "대중성과 취향의 균형"], ["분위기를 위해 지출이 커질 수 있음", "선택의 완성도를 지나치게 고민함", "겉모습보다 지금 필요한 휴식 확인하기"], ["아메리카노", "카페 라테", "티라미수"], ["starbucks", "pascucci", "coffee-bean"], "mammoth-coffee", ["emotion", "trendy", "leisure"], scores(82, 96, 53, 50, 88, 55, 61, 78, 50, 69, 86, 79)),
  profile("hollys", "할리스", "▤", ["#991b1b", "#ef4444"], "차분한 공간에서 집중과 휴식을 함께 만드는 루틴형", "당신은 외부의 자극을 적당히 차단하고 내 할 일에 몰입할 수 있는 환경을 중요하게 봅니다. 계획과 루틴이 잡혀 있을 때 마음이 편하며, 익숙한 자리에서 꾸준히 성과를 쌓는 편입니다. 혼자 있는 시간을 좋아하지만 필요할 때는 안정적으로 사람들과 협력합니다. 카페도 짧은 유행보다 오래 머물 수 있는 편안함과 예측 가능한 품질을 선호합니다.", "집중하기 좋은 안정된 공간과 오래 머물 수 있는 편안함이 계획성, 차분함과 자기 리듬을 중시하는 성향에 어울립니다.", ["높은 집중력", "안정적인 업무 루틴", "꾸준한 책임감", "차분한 문제 해결", "혼자와 함께의 균형"], ["루틴이 깨지면 스트레스를 받을 수 있음", "휴식 중에도 일을 붙잡기 쉬움", "새로운 환경을 미리 거절하지 않기"], ["바닐라 딜라이트", "아메리카노", "콜드 브루"], ["ediya-coffee", "coffee-bean", "angel-in-us"], "mega-mgc-coffee", ["stability", "practicality", "leisure"], scores(45, 61, 82, 78, 85, 41, 72, 55, 38, 97, 52, 56)),
  profile("angel-in-us", "엔제리너스", "♡", ["#7c2d12", "#fdba74"], "사람의 온도와 편안한 시간을 먼저 살피는 따뜻한 배려형", "당신은 공간을 고를 때 화려한 화제성보다 함께 있는 사람이 편안한지를 먼저 생각합니다. 대화의 분위기와 상대의 표정을 잘 읽고, 소소하지만 다정한 방식으로 관계를 돌봅니다. 익숙한 메뉴와 부드러운 공간에서 마음이 안정되며, 혼자 있을 때도 감정을 천천히 정리하는 편입니다. 경쟁보다 협력을 선호하고 주변의 긴장을 낮추는 역할을 자연스럽게 맡습니다.", "따뜻하고 편안한 카페 이미지와 부드러운 메뉴 구성이 공감과 친근함, 관계의 안정감을 중시하는 당신과 닮았습니다.", ["섬세한 공감력", "따뜻한 관계 유지", "편안한 분위기 조성", "꾸준한 배려", "감정을 돌보는 여유"], ["타인의 기분을 과하게 책임질 수 있음", "새로운 도전을 미루기 쉬움", "내 필요도 상대만큼 분명히 표현하기"], ["카페 라테", "바닐라 라테", "아메리치노"], ["ediya-coffee", "hollys", "pascucci"], "mammoth-coffee", ["emotion", "sociability", "stability"], scores(42, 95, 68, 60, 84, 43, 50, 92, 35, 91, 62, 46)),
  profile("the-venti", "더벤티", "↗", ["#4c1d95", "#a78bfa"], "시원시원한 선택과 긍정 에너지로 움직이는 활력형", "당신은 선택을 지나치게 복잡하게 만들지 않고 지금 필요한 만족을 크게 누리는 편입니다. 활동량이 많고 반응이 빠르며, 친구들과 있을 때 밝고 솔직한 에너지를 보여줍니다. 실용적인 소비를 중시하지만 재미와 기분 전환도 놓치지 않습니다. 계획이 조금 달라져도 금방 적응하며, 넉넉한 선택에서 오는 여유와 자유로움을 좋아합니다.", "큰 만족감, 경쾌한 분위기와 합리적 소비 이미지가 활동적이고 긍정적이며 시원시원한 당신의 리듬과 맞습니다.", ["밝고 빠른 에너지", "변화에 대한 적응력", "솔직한 친화력", "가성비와 재미의 균형", "과감한 실행"], ["세부 계획을 건너뛸 수 있음", "기분에 따라 선택이 커질 수 있음", "속도가 느린 사람도 기다려주기"], ["아이스 아메리카노", "벤티 라테", "과일 에이드"], ["mega-mgc-coffee", "paiks-coffee", "tom-n-toms"], "coffee-bean", ["activity", "sociability", "rationality"], scores(72, 59, 88, 92, 54, 99, 56, 90, 83, 59, 60, 34)),
  profile("mammoth-coffee", "매머드커피", "»", ["#312e81", "#818cf8"], "바쁜 동선 안에서 최적의 선택을 찾는 직장인 효율형", "당신은 시간과 에너지를 어디에 써야 할지 빠르게 판단합니다. 긴 설명이나 과한 장식보다 필요한 기능이 정확히 제공되는 것을 좋아하며, 일의 흐름을 끊지 않는 선택에 높은 가치를 둡니다. 감정보다 우선순위가 분명하고, 작은 비용과 시간을 반복해서 절약하는 능력이 뛰어납니다. 바쁜 상황에서도 맡은 일은 현실적으로 끝내는 믿음직한 실행가입니다.", "빠른 이용, 실용적인 구성과 직장인 생활에 맞춘 효율성이 속도와 현실성을 중시하는 당신의 하루에 자연스럽게 맞물립니다.", ["빠른 우선순위 판단", "시간 효율 극대화", "현실적인 실행력", "군더더기 없는 소비", "바쁜 상황의 적응력"], ["휴식을 비효율로 여길 수 있음", "관계의 감정적 신호를 놓칠 수 있음", "속도보다 품질이 필요한 순간 구분하기"], ["아메리카노", "꿀커피", "카페 라테"], ["compose-coffee", "mega-mgc-coffee", "the-venti"], "pascucci", ["practicality", "rationality", "activity"], scores(44, 35, 100, 97, 31, 94, 68, 51, 71, 76, 38, 28)),
  profile("coffee-bean", "커피빈", "●", ["#4c1d95", "#c084fc"], "유행보다 신뢰할 수 있는 품질을 고르는 클래식 취향형", "당신은 눈에 띄는 새로움보다 시간이 지나도 만족할 수 있는 완성도와 신뢰를 중요하게 봅니다. 차분하게 취향을 쌓고, 좋은 재료와 안정적인 서비스에는 합리적인 비용을 지불할 의향이 있습니다. 관계에서도 넓고 얕은 연결보다 오래 이어지는 신뢰를 선호합니다. 여유를 즐기되 지나치게 장식적인 분위기보다 정돈된 클래식함에서 편안함을 느낍니다.", "클래식한 분위기, 품질에 대한 일관된 기대와 차분한 여유가 신뢰와 완성도를 중시하는 당신의 취향과 잘 맞습니다.", ["일관된 품질 기준", "신뢰를 쌓는 관계", "차분한 자기 취향", "합리적인 프리미엄 소비", "유행에 흔들리지 않음"], ["검증되지 않은 변화에 보수적일 수 있음", "기준이 높아 선택 폭이 좁아질 수 있음", "가벼운 실험도 즐겨보기"], ["아메리카노", "헤이즐넛 아메리카노", "바닐라 라테"], ["paul-bassett", "starbucks", "hollys"], "the-venti", ["premium", "stability", "leisure"], scores(58, 72, 63, 66, 86, 38, 78, 55, 40, 91, 68, 92)),
  profile("paul-bassett", "폴바셋", "◉", ["#7f1d1d", "#d97706"], "작은 차이까지 알아보는 완성도 중심 커피 애호가", "당신은 많이 소비하기보다 제대로 만족하는 한 번을 중요하게 생각합니다. 재료와 과정의 차이를 알아가는 일을 즐기며, 가격이 조금 높아도 품질의 이유를 납득하면 기꺼이 선택합니다. 취향에 대한 기준이 분명하지만 과시보다는 실제 감각과 완성도를 중시합니다. 일에서도 평균적인 결과보다 디테일까지 다듬어진 결과물을 만들 때 가장 큰 만족을 느낍니다.", "원두와 추출, 질감의 완성도를 세심하게 즐기는 브랜드 경험이 품질과 전문성, 정제된 취향을 중시하는 당신과 어울립니다.", ["높은 품질 감식안", "디테일을 완성하는 집중력", "분명한 취향 기준", "전문성을 알아보는 눈", "양보다 질을 택하는 소비"], ["기준이 높아 쉽게 만족하지 못할 수 있음", "일상적인 선택에도 에너지를 많이 씀", "완벽하지 않아도 편하게 즐기는 연습"], ["룽고", "플랫 화이트", "아이스크림 라테"], ["coffee-bean", "blue-bottle", "starbucks"], "mega-mgc-coffee", ["premium", "stability", "independence"], scores(70, 74, 58, 63, 79, 46, 84, 42, 52, 86, 72, 100)),
  profile("blue-bottle", "블루보틀", "□", ["#0e7490", "#67e8f9"], "불필요한 것을 덜어내고 취향의 본질을 찾는 미니멀 감각형", "당신은 남들이 모두 좋아하는 것보다 내가 왜 좋아하는지 설명할 수 있는 선택을 중요하게 여깁니다. 공간과 물건의 작은 디테일을 섬세하게 보고, 군더더기 없는 디자인과 명확한 콘셉트에 끌립니다. 혼자 관찰하고 생각하는 시간을 즐기며, 유행을 참고하되 그대로 복제하지 않습니다. 느리더라도 과정과 감각을 충분히 경험할 때 만족도가 높습니다.", "미니멀한 공간과 세심한 커피 경험, 취향을 존중하는 분위기가 독립성·창의성·감각적 디테일이 강한 당신과 맞습니다.", ["독립적인 취향", "미니멀한 판단력", "디테일 관찰", "높은 감각적 집중", "본질을 찾는 태도"], ["취향의 기준이 벽처럼 보일 수 있음", "실용성보다 경험을 우선할 수 있음", "다른 사람의 대중적 선택도 존중하기"], ["드립 커피", "놀라 플로트", "카페 라테"], ["paul-bassett", "pascucci", "coffee-bean"], "paiks-coffee", ["independence", "creativity", "premium"], scores(88, 84, 40, 48, 82, 38, 100, 39, 60, 54, 99, 94)),
  profile("tom-n-toms", "탐앤탐스", "✺", ["#92400e", "#f59e0b"], "자유로운 대화와 밝은 에너지로 공간을 채우는 캐주얼 소셜형", "당신은 정해진 형식보다 그날의 사람과 분위기에 따라 유연하게 움직입니다. 편안한 공간에서 오래 이야기하거나 즉흥적으로 계획을 바꾸는 일을 즐기며, 낯선 사람과도 공통점을 빠르게 찾습니다. 진지함과 장난기를 자연스럽게 오가고, 혼자 결정하기보다 함께 경험할 때 만족이 커집니다. 완벽한 준비보다 현장에서 생기는 재미를 믿는 편입니다.", "캐주얼하게 머물며 대화를 나누기 좋은 분위기와 자유로운 메뉴 선택이 사교성과 즉흥성이 높은 당신에게 잘 어울립니다.", ["빠른 관계 형성", "자유로운 적응력", "분위기를 살리는 에너지", "즉흥적 재미 발견", "편견 없는 대화"], ["계획과 마무리가 느슨해질 수 있음", "혼자 정리할 시간을 놓칠 수 있음", "즐거움 뒤의 현실 일정도 확인하기"], ["아메리카노", "프레즐", "요거트 스무디"], ["paiks-coffee", "the-venti", "angel-in-us"], "paul-bassett", ["sociability", "activity", "leisure"], scores(69, 71, 65, 58, 79, 88, 67, 100, 76, 53, 77, 38)),
  profile("pascucci", "파스쿠찌", "❦", ["#991b1b", "#fda4af"], "시간의 분위기와 낭만을 음미하는 예술적 여유형", "당신은 효율만으로 설명되지 않는 경험의 가치를 잘 압니다. 여행지의 골목, 음악과 대화, 천천히 흐르는 오후처럼 기억에 남는 장면을 소중히 여깁니다. 취향을 표현할 때 과시하기보다 자연스러운 분위기와 이야기를 담고 싶어 합니다. 사람들과 정서적으로 교감하는 것을 좋아하지만, 혼자 감각을 정리하는 여유도 반드시 필요합니다. 삶의 속도보다 깊이를 택하는 편입니다.", "유럽 카페를 연상시키는 낭만적 분위기와 천천히 즐기는 커피 시간이 감성·여유·예술적 취향이 강한 당신과 어울립니다.", ["풍부한 감수성", "삶의 장면을 즐기는 여유", "예술적 취향", "깊은 정서적 교감", "경험의 의미 발견"], ["현실적인 비용과 시간을 놓칠 수 있음", "분위기에 따라 결정이 달라질 수 있음", "감성적 만족과 일상 책임의 균형"], ["카푸치노", "에스프레소", "아포가토"], ["twosome-place", "blue-bottle", "angel-in-us"], "compose-coffee", ["emotion", "leisure", "creativity"], scores(70, 100, 42, 43, 99, 39, 77, 72, 49, 60, 96, 76)),
];

export const coffeeBrandPatterns: Record<string, number[]> = {
  "starbucks": [0, 0, 0, 0, 0, 0, 3, 0, 1, 0],
  "ediya-coffee": [2, 3, 2, 1, 2, 1, 0, 1, 2, 2],
  "mega-mgc-coffee": [3, 1, 0, 3, 0, 1, 1, 0, 0, 2],
  "compose-coffee": [2, 1, 1, 3, 2, 1, 0, 3, 0, 2],
  "paiks-coffee": [3, 1, 3, 3, 3, 1, 1, 0, 2, 2],
  "twosome-place": [1, 0, 3, 2, 1, 0, 2, 1, 1, 1],
  "hollys": [1, 3, 2, 1, 2, 1, 0, 2, 1, 1],
  "angel-in-us": [1, 3, 2, 1, 1, 3, 3, 1, 2, 1],
  "the-venti": [3, 1, 0, 0, 3, 1, 1, 0, 0, 0],
  "mammoth-coffee": [2, 1, 1, 3, 2, 1, 1, 3, 0, 2],
  "coffee-bean": [1, 2, 2, 1, 1, 2, 0, 2, 1, 1],
  "paul-bassett": [1, 2, 1, 1, 1, 2, 2, 2, 3, 3],
  "blue-bottle": [1, 2, 0, 2, 1, 2, 2, 2, 3, 3],
  "tom-n-toms": [3, 3, 3, 0, 3, 3, 3, 0, 2, 0],
  "pascucci": [1, 0, 3, 2, 1, 3, 2, 1, 1, 3],
};

export const coffeeBrandCalibration: Record<string, number> = {
  "starbucks": 200,
  "ediya-coffee": 50,
  "mega-mgc-coffee": -250,
  "compose-coffee": 250,
  "paiks-coffee": 0,
  "twosome-place": 0,
  "hollys": 150,
  "angel-in-us": 50,
  "the-venti": -300,
  "mammoth-coffee": -100,
  "coffee-bean": -50,
  "paul-bassett": 75,
  "blue-bottle": -100,
  "tom-n-toms": 0,
  "pascucci": -200,
};

export const coffeeBrandTest: TestDefinition = {
  type: "quiz",
  slug: "coffee-brand-test",
  title: "나와 어울리는 커피 브랜드는?",
  shortTitle: "커피 브랜드 테스트",
  cardTitle: "나와 어울리는 커피 브랜드는?",
  description: "성격과 라이프스타일, 소비 기준으로 나와 가장 잘 어울리는 커피 브랜드를 찾아보세요.",
  category: "직업.일상",
  duration: "약 2분",
  icon: "☕",
  thumbnail: "/tests/coffee-brand.jpg",
  participants: 1326,
  accent: "orange",
  isNew: true,
  itemCount: coffeeBrandQuestions.length,
  questions: coffeeBrandQuestions.map(({ id, text, options }) => ({ id, text, options: options.map(({ label, text, value }) => ({ label, text, value })) })),
  resultSlugs: [],
  seoTitle: "커피 브랜드 테스트 | 나와 어울리는 커피는?",
  seoDescription: "커피 브랜드 테스트로 성격, 소비 성향과 라이프스타일을 분석해 나와 어울리는 커피 브랜드를 찾아보세요. 무료 커피 취향 테스트입니다.",
  keywords: ["커피 브랜드 테스트", "나와 어울리는 커피", "커피 취향 테스트", "카페 취향 테스트", "커피 심리테스트", "브랜드 성향 테스트"],
  seoContent: {
    heading: "커피 브랜드 테스트란?",
    paragraphs: [
      "커피 브랜드 테스트는 단순히 아메리카노와 라테 중 무엇을 좋아하는지 묻는 테스트가 아닙니다. 휴일을 보내는 방식, 공간을 고르는 기준, 새로운 경험을 받아들이는 태도, 선물과 소비를 결정하는 방식 등 일상 속 선택을 통해 나와 어울리는 커피 브랜드의 분위기를 찾아봅니다.",
      "각 답변은 트렌디함, 감성, 현실성, 합리성, 여유, 활동성, 독립성, 친화력, 도전성, 안정성, 창의성과 프리미엄 지향 등 12가지 성향에 동시에 반영됩니다. 계산된 전체 성향 조합을 15개 커피 브랜드의 라이프스타일 이미지와 비교하므로 특정 답 하나만으로 결과가 결정되지 않습니다.",
      "결과는 브랜드의 실제 품질이나 우열을 평가하는 것이 아니라 현재 나의 생활 리듬과 소비 기준을 친숙한 카페 이미지에 빗대어 보여주는 비공식 성향 콘텐츠입니다. 공식 로고나 매장 사진을 사용하지 않고 각 분위기를 재해석한 오리지널 그래픽으로 구성했습니다.",
    ],
    faqs: [
      ["결과는 어떻게 계산되나요?", "10개 선택에서 12가지 성향 점수를 계산한 뒤 브랜드별 목표 성향과 대표 행동 패턴을 함께 비교합니다."],
      ["실제로 가장 좋아하는 브랜드가 나오나요?", "현재 선호 브랜드를 맞히는 테스트가 아니라 성격과 생활 방식에 어울리는 브랜드 이미지를 찾는 테스트라 결과가 다를 수 있습니다."],
      ["브랜드의 공식 테스트인가요?", "아닙니다. 각 브랜드와 제휴되지 않은 비공식 라이프스타일 성향 콘텐츠입니다."],
      ["결과가 브랜드의 품질 순위를 의미하나요?", "아닙니다. 모든 브랜드에는 서로 다른 장점이 있으며 결과는 사용자의 취향과 리듬에 가까운 이미지만 안내합니다."],
    ],
    assesses: "커피 소비와 공간 선택에서 나타나는 생활·소비 성향",
  },
};

export const getCoffeeBrandProfile = (slug: string) => coffeeBrandProfiles.find((item) => item.slug === slug);
