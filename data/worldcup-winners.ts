import type { TestDefinition, WorldCupWinnerGradeProfile, WorldCupWinnerQuestion } from "@/lib/types";

export const WORLD_CUP_WINNER_QUIZ_SIZE = 10;

export const worldCupWinnerQuestions: WorldCupWinnerQuestion[] = [
  { id: "wc-1930", year: 1930, host: "우루과이", winner: "우루과이", semifinalists: ["우루과이", "아르헨티나", "미국", "유고슬라비아"], answerIndex: 0, final: "우루과이 4-2 아르헨티나", note: "초대 대회는 3·4위전이 열리지 않았지만 FIFA 기록상 미국과 유고슬라비아가 4강권으로 분류됩니다." },
  { id: "wc-1934", year: 1934, host: "이탈리아", winner: "이탈리아", semifinalists: ["이탈리아", "체코슬로바키아", "독일", "오스트리아"], answerIndex: 0, final: "이탈리아 2-1 체코슬로바키아" },
  { id: "wc-1938", year: 1938, host: "프랑스", winner: "이탈리아", semifinalists: ["이탈리아", "헝가리", "브라질", "스웨덴"], answerIndex: 0, final: "이탈리아 4-2 헝가리" },
  { id: "wc-1950", year: 1950, host: "브라질", winner: "우루과이", semifinalists: ["우루과이", "브라질", "스웨덴", "스페인"], answerIndex: 0, final: "우루과이 2-1 브라질", note: "1950년 대회는 결승전 대신 최종 결승 리그 방식으로 진행됐고, 우루과이가 최종 1위를 차지했습니다." },
  { id: "wc-1954", year: 1954, host: "스위스", winner: "서독", semifinalists: ["서독", "헝가리", "오스트리아", "우루과이"], answerIndex: 0, final: "서독 3-2 헝가리" },
  { id: "wc-1958", year: 1958, host: "스웨덴", winner: "브라질", semifinalists: ["브라질", "스웨덴", "프랑스", "서독"], answerIndex: 0, final: "브라질 5-2 스웨덴" },
  { id: "wc-1962", year: 1962, host: "칠레", winner: "브라질", semifinalists: ["브라질", "체코슬로바키아", "칠레", "유고슬라비아"], answerIndex: 0, final: "브라질 3-1 체코슬로바키아" },
  { id: "wc-1966", year: 1966, host: "잉글랜드", winner: "잉글랜드", semifinalists: ["잉글랜드", "서독", "포르투갈", "소련"], answerIndex: 0, final: "잉글랜드 4-2 서독" },
  { id: "wc-1970", year: 1970, host: "멕시코", winner: "브라질", semifinalists: ["브라질", "이탈리아", "서독", "우루과이"], answerIndex: 0, final: "브라질 4-1 이탈리아" },
  { id: "wc-1974", year: 1974, host: "서독", winner: "서독", semifinalists: ["서독", "네덜란드", "폴란드", "브라질"], answerIndex: 0, final: "서독 2-1 네덜란드", note: "1974년 대회는 2차 조별리그 후 결승·3위 결정전을 치르는 방식이었습니다." },
  { id: "wc-1978", year: 1978, host: "아르헨티나", winner: "아르헨티나", semifinalists: ["아르헨티나", "네덜란드", "브라질", "이탈리아"], answerIndex: 0, final: "아르헨티나 3-1 네덜란드", note: "1978년 대회도 2차 조별리그 후 결승·3위 결정전을 치르는 방식이었습니다." },
  { id: "wc-1982", year: 1982, host: "스페인", winner: "이탈리아", semifinalists: ["이탈리아", "서독", "폴란드", "프랑스"], answerIndex: 0, final: "이탈리아 3-1 서독" },
  { id: "wc-1986", year: 1986, host: "멕시코", winner: "아르헨티나", semifinalists: ["아르헨티나", "서독", "프랑스", "벨기에"], answerIndex: 0, final: "아르헨티나 3-2 서독" },
  { id: "wc-1990", year: 1990, host: "이탈리아", winner: "서독", semifinalists: ["서독", "아르헨티나", "이탈리아", "잉글랜드"], answerIndex: 0, final: "서독 1-0 아르헨티나" },
  { id: "wc-1994", year: 1994, host: "미국", winner: "브라질", semifinalists: ["브라질", "이탈리아", "스웨덴", "불가리아"], answerIndex: 0, final: "브라질 0-0 이탈리아, 승부차기 3-2" },
  { id: "wc-1998", year: 1998, host: "프랑스", winner: "프랑스", semifinalists: ["프랑스", "브라질", "크로아티아", "네덜란드"], answerIndex: 0, final: "프랑스 3-0 브라질" },
  { id: "wc-2002", year: 2002, host: "대한민국·일본", winner: "브라질", semifinalists: ["브라질", "독일", "튀르키예", "대한민국"], answerIndex: 0, final: "브라질 2-0 독일" },
  { id: "wc-2006", year: 2006, host: "독일", winner: "이탈리아", semifinalists: ["이탈리아", "프랑스", "독일", "포르투갈"], answerIndex: 0, final: "이탈리아 1-1 프랑스, 승부차기 5-3" },
  { id: "wc-2010", year: 2010, host: "남아공", winner: "스페인", semifinalists: ["스페인", "네덜란드", "독일", "우루과이"], answerIndex: 0, final: "스페인 1-0 네덜란드" },
  { id: "wc-2014", year: 2014, host: "브라질", winner: "독일", semifinalists: ["독일", "아르헨티나", "네덜란드", "브라질"], answerIndex: 0, final: "독일 1-0 아르헨티나" },
  { id: "wc-2018", year: 2018, host: "러시아", winner: "프랑스", semifinalists: ["프랑스", "크로아티아", "벨기에", "잉글랜드"], answerIndex: 0, final: "프랑스 4-2 크로아티아" },
  { id: "wc-2022", year: 2022, host: "카타르", winner: "아르헨티나", semifinalists: ["아르헨티나", "프랑스", "크로아티아", "모로코"], answerIndex: 0, final: "아르헨티나 3-3 프랑스, 승부차기 4-2" },
];

export function validateWorldCupWinnerQuizData() {
  const expectedYears = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022];
  const years = worldCupWinnerQuestions.map((question) => question.year);
  const yearSet = new Set(years);
  if (worldCupWinnerQuestions.length !== expectedYears.length) throw new Error(`World Cup winner quiz data must include ${expectedYears.length} tournaments.`);
  for (const year of expectedYears) {
    if (!yearSet.has(year)) throw new Error(`Missing World Cup winner quiz question for ${year}.`);
  }
  for (const question of worldCupWinnerQuestions) {
    const choices = question.semifinalists;
    if (choices.length !== 4) throw new Error(`${question.id} must have exactly four semifinalists.`);
    if (new Set(choices).size !== 4) throw new Error(`${question.id} has duplicated choices.`);
    if (!choices.includes(question.winner)) throw new Error(`${question.id} winner must be included in semifinalists.`);
    if (choices[question.answerIndex] !== question.winner) throw new Error(`${question.id} answerIndex does not match winner.`);
  }
  return true;
}

validateWorldCupWinnerQuizData();

export const worldCupWinnerGradeProfiles: WorldCupWinnerGradeProfile[] = [
  {
    slug: "worldcup-legend",
    name: "월드컵 역사 박사",
    icon: "🏆",
    minScore: 90,
    maxScore: 100,
    summary: "역대 우승국 흐름을 거의 완벽하게 기억하는 레전드급 팬입니다.",
    description: "초대 우루과이부터 메시의 2022년 아르헨티나까지, 월드컵 역사 타임라인이 머릿속에 꽤 선명하게 들어 있습니다. 결승 상대와 시대별 강팀까지 연결해서 기억하는 수준이라 친구들과 퀴즈를 하면 자연스럽게 해설자 역할을 맡게 될 가능성이 높습니다.",
    comment: "이 정도면 월드컵 박물관 오디오 가이드로 취업 가능할지도요.",
    shareTemplate: "나는 역대 월드컵 우승국 퀴즈 {score}점! 월드컵 역사 박사 🏆 너도 도전해봐.",
  },
  {
    slug: "worldcup-historian",
    name: "월드컵 기록 수집가",
    icon: "📚",
    minScore: 70,
    maxScore: 89,
    summary: "주요 대회 우승국은 안정적으로 맞히는 탄탄한 축구 팬입니다.",
    description: "최근 대회와 유명한 결승전은 대부분 기억하고 있고, 오래된 대회에서도 꽤 좋은 감각을 보여줬습니다. 몇몇 헷갈리는 시대만 정리하면 우승국 타임라인을 거의 완성할 수 있는 단계입니다.",
    comment: "이미 축구 단톡방에서는 신뢰받는 편. 이제 1950년 마라카낭만 확실히 챙기면 됩니다.",
    shareTemplate: "나는 역대 월드컵 우승국 퀴즈 {score}점! 월드컵 기록 수집가 📚 너는 몇 점?",
  },
  {
    slug: "worldcup-fan",
    name: "월드컵 본방 사수러",
    icon: "⚽",
    minScore: 50,
    maxScore: 69,
    summary: "현대 월드컵은 강하지만 초창기 기록에서 조금 흔들리는 타입입니다.",
    description: "2000년대 이후 대회나 유명 스타가 활약한 대회는 잘 기억하지만, 1930~1980년대 우승국은 헷갈릴 수 있습니다. 그래도 기본 흐름은 잡혀 있어 결과 복습만 해도 점수가 빠르게 올라갈 수 있습니다.",
    comment: "브라질·독일·이탈리아·아르헨티나만 잘 정리해도 다음엔 확 올라갑니다.",
    shareTemplate: "나는 역대 월드컵 우승국 퀴즈 {score}점! 월드컵 본방 사수러 ⚽ 너는?",
  },
  {
    slug: "worldcup-casual",
    name: "월드컵 하이라이트 팬",
    icon: "📺",
    minScore: 30,
    maxScore: 49,
    summary: "유명 장면은 기억하지만 우승국 매칭은 아직 헷갈리는 단계입니다.",
    description: "결승 명장면이나 스타 선수는 익숙하지만, 대회 연도와 개최국, 우승국을 정확히 연결하는 데는 아직 빈칸이 있습니다. 틀린 문제의 결승 스코어와 4강 국가를 같이 보면 기억이 훨씬 오래갑니다.",
    comment: "괜찮아요. 월드컵은 4년에 한 번인데, 헷갈리는 게 정상입니다.",
    shareTemplate: "나는 역대 월드컵 우승국 퀴즈 {score}점! 월드컵 하이라이트 팬 📺 다시 도전한다.",
  },
  {
    slug: "worldcup-rookie",
    name: "월드컵 새싹",
    icon: "🌱",
    minScore: 0,
    maxScore: 29,
    summary: "이제 월드컵 역사 여행을 막 시작한 단계입니다.",
    description: "아직 우승국 타임라인이 익숙하지 않지만, 이 퀴즈는 틀리면서 외우기 좋은 구조입니다. 4강 국가 안에서 우승국을 고르는 방식이라 강팀의 흐름을 자연스럽게 익힐 수 있습니다.",
    comment: "오늘부터 시작입니다. 다음 월드컵 전에 역사 버프를 장착해봅시다.",
    shareTemplate: "나는 역대 월드컵 우승국 퀴즈 {score}점! 월드컵 새싹 🌱 너는 나보다 잘할까?",
  },
];

export const worldCupWinnerQuizTest: TestDefinition = {
  type: "quiz",
  slug: "worldcup-winner-quiz",
  title: "역대 월드컵 우승국은?",
  shortTitle: "월드컵 우승국 퀴즈",
  cardTitle: "역대 월드컵 우승국 맞히기",
  description: "1930년 우루과이 월드컵부터 2022년 카타르 월드컵까지, 랜덤 10문제로 역대 월드컵 우승국을 맞혀보세요.",
  category: "팬 퀴즈",
  duration: "약 2분",
  icon: "🏆",
  thumbnail: "/tests/worldcup-winner-quiz.jpg",
  participants: 216,
  accent: "green",
  fanTheme: "blue-spotlight",
  isNew: true,
  itemCount: WORLD_CUP_WINNER_QUIZ_SIZE,
  questions: [],
  resultSlugs: [],
  seoTitle: "역대 월드컵 우승국 퀴즈 | 1930년부터 2022년까지 월드컵 우승국 맞히기",
  seoDescription: "1930년 우루과이 월드컵부터 2022년 카타르 월드컵까지 역대 월드컵 우승국을 맞히는 무료 축구 퀴즈입니다. 4강 진출국 보기 중 우승국을 골라보세요.",
  keywords: ["역대 월드컵 우승국", "월드컵 우승국 퀴즈", "월드컵 퀴즈", "축구 퀴즈", "월드컵 우승국", "역대 월드컵", "축구 상식 테스트", "무료 축구 테스트"],
  seoContent: {
    heading: "역대 월드컵 우승국 퀴즈란?",
    paragraphs: [
      "역대 월드컵 우승국 퀴즈는 1930년 우루과이 월드컵부터 2022년 카타르 월드컵까지 모든 FIFA 월드컵 우승국을 맞히는 축구 상식 퀴즈입니다. 문제에는 “1930년 우루과이 월드컵”처럼 연도와 개최국이 함께 표시됩니다.",
      "각 문제의 보기는 우승국을 포함한 해당 대회의 4강권 국가 4개로 구성됩니다. 단순히 아무 나라를 섞는 방식이 아니라 실제 그 대회에서 우승 경쟁권에 있었던 국가들만 보기로 보여주기 때문에, 월드컵 역사 흐름을 자연스럽게 복습할 수 있습니다.",
      "전체 22개 대회 문제가 문제은행에 준비되어 있고, 테스트를 시작할 때마다 그중 10개가 랜덤으로 출제됩니다. 결과 화면에서는 점수뿐 아니라 틀린 문제의 정답, 결승 스코어, 특이한 대회 방식까지 함께 확인할 수 있습니다.",
    ],
    faqs: [
      ["몇 문제가 출제되나요?", "1930년부터 2022년까지 전체 22개 월드컵 문제 중 매번 랜덤으로 10문제가 출제됩니다."],
      ["보기는 어떻게 구성되나요?", "각 문제의 보기는 우승국을 포함한 해당 월드컵 4강권 국가 4개로 구성됩니다. 1950년은 결승 토너먼트가 아닌 최종 결승 리그 상위 4개국을 사용합니다."],
      ["정답 데이터는 검토되어 있나요?", "네. 코드에서 연도 누락, 보기 중복, 우승국 포함 여부, 정답 인덱스 일치 여부를 검증하도록 구성했습니다. 데이터가 잘못되면 빌드 단계에서 바로 오류가 납니다."],
    ],
    assesses: "역대 FIFA 월드컵 우승국 지식",
  },
};

export const getWorldCupWinnerQuestion = (id: string) => worldCupWinnerQuestions.find((question) => question.id === id);
export const getWorldCupWinnerGradeProfile = (slug: string) => worldCupWinnerGradeProfiles.find((profile) => profile.slug === slug);
