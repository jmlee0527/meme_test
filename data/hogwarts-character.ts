import type { TestDefinition } from "@/lib/types";

export const hogwartsSlugs = ["harry-potter", "hermione-granger", "ron-weasley", "draco-malfoy", "luna-lovegood", "neville-longbottom", "ginny-weasley", "sirius-black", "severus-snape", "albus-dumbledore", "rubeus-hagrid", "lord-voldemort"] as const;
export type HogwartsSlug = typeof hogwartsSlugs[number];
export type HogwartsProfile = {
  slug: HogwartsSlug; name: string; englishName: string; image: string; imageAlt: string;
  tagline: string; reasons: [string, string, string]; schoolLife: string;
  strength: string; caution: string; friends: [HogwartsSlug, HogwartsSlug]; adventure: string;
};

const portrait = (file: string) => `/tests/hogwarts-characters/${file}.webp`;
export const hogwartsProfiles: HogwartsProfile[] = [
  { slug: "harry-potter", name: "해리 포터", englishName: "Harry Potter", image: portrait("harry"), imageAlt: "해리 포터",
    tagline: "계획은 없었는데, 정신 차리니 내가 구하는 중",
    reasons: ["곤란한 친구를 보면 몸이 먼저 움직여요.", "인기보다 지켜야 할 사람이 중요해요.", "두려워도 필요한 순간에는 나서요."],
    schoolLife: "조용히 졸업하려 했는데 사건마다 현장에 있어요. 친구들은 당신의 옆자리가 가장 위험하면서도 가장 든든하다고 생각해요.",
    strength: "위기에서 행동으로 보여주는 용기", caution: "혼자 구하려 하지 말고 도움도 요청해요.", friends: ["hermione-granger", "ron-weasley"], adventure: "사라진 친구를 찾다가 학교의 숨겨진 방까지 발견해요." },
  { slug: "hermione-granger", name: "헤르미온느 그레인저", englishName: "Hermione Granger", image: portrait("hermione"), imageAlt: "헤르미온느 그레인저",
    tagline: "모험도 좋아, 일단 준비물 목록부터 펼쳐봐",
    reasons: ["막막하면 정보를 모아 순서를 정해요.", "준비는 함께하는 사람을 지키는 방법이에요.", "불합리한 일에는 근거를 갖고 말해요."],
    schoolLife: "친구들의 과제 마감일을 본인보다 잘 알아요. 도서관에서 찾은 작은 단서가 모험의 결정적 해결책이 돼요.",
    strength: "꼼꼼한 준비와 논리적인 해결력", caution: "모든 일을 완벽하게 통제하지 않아도 괜찮아요.", friends: ["harry-potter", "neville-longbottom"], adventure: "도서관의 잘못 꽂힌 책 한 권에서 비밀 통로의 힌트를 찾아요." },
  { slug: "ron-weasley", name: "론 위즐리", englishName: "Ron Weasley", image: portrait("ron"), imageAlt: "론 위즐리",
    tagline: "무서운 건 맞는데, 너 혼자 보낼 수는 없잖아",
    reasons: ["함께 웃을 수 있는 사람이 제일 좋아요.", "불평하면서도 친구 곁은 지켜요.", "긴장된 순간에 분위기를 풀어줘요."],
    schoolLife: "간식이 있는 자리에는 당신도 있어요. 친구들이 기운 빠진 날엔 대단한 조언 대신 옆에 앉아 같이 투덜거려줘요.",
    strength: "평범한 하루를 즐겁게 만드는 우정", caution: "친구와 비교하기보다 내 몫의 장점도 기억해요.", friends: ["harry-potter", "rubeus-hagrid"], adventure: "야식 원정대에 따라갔다가 마법 체스 한 판으로 모두를 구해요." },
  { slug: "draco-malfoy", name: "드레이코 말포이", englishName: "Draco Malfoy", image: portrait("malfoy"), imageAlt: "드레이코 말포이",
    tagline: "아무렇지 않은 척했지만 승부표는 이미 분석 완료",
    reasons: ["목표가 생기면 유리한 조건부터 찾아요.", "인정받고 싶은 마음이 노력으로 이어져요.", "내 사람에게는 은근히 신경을 많이 써요."],
    schoolLife: "경기 전에는 무심한 척, 뒤에서는 전략 회의를 열어요. 조별 과제의 발표와 협상에서 존재감이 드러나요.",
    strength: "기회를 읽고 판을 유리하게 만드는 감각", caution: "체면을 지키느라 솔직한 마음을 숨기지 마세요.", friends: ["severus-snape", "ginny-weasley"], adventure: "기숙사 대항전의 작전을 짜다가 뜻밖의 라이벌과 손잡아요." },
  { slug: "luna-lovegood", name: "루나 러브굿", englishName: "Luna Lovegood", image: portrait("luna"), imageAlt: "루나 러브굿",
    tagline: "다들 이상하다는데, 내 눈에는 꽤 멋진데?",
    reasons: ["남들이 지나치는 작은 단서를 발견해요.", "다수의 취향보다 내 호기심을 믿어요.", "다른 사람의 독특함을 편하게 받아들여요."],
    schoolLife: "처음에는 엉뚱해 보였던 관찰이 나중에는 정답이 돼요. 혼자 있는 시간을 즐기지만 소외된 친구의 옆자리는 비워둬요.",
    strength: "익숙한 문제를 새롭게 바라보는 상상력", caution: "좋은 아이디어에 작은 실행 계획도 붙여봐요.", friends: ["neville-longbottom", "rubeus-hagrid"], adventure: "아무도 믿지 않은 발자국을 따라가 잃어버린 마법 생물을 만나요." },
  { slug: "neville-longbottom", name: "네빌 롱바텀", englishName: "Neville Longbottom", image: portrait("neville"), imageAlt: "네빌 롱바텀",
    tagline: "처음엔 떨었지만, 마지막까지 남은 사람은 나",
    reasons: ["느려도 한 번 맡은 일은 놓지 않아요.", "작은 성장을 꾸준히 쌓아가요.", "소중한 가치 앞에서는 조용히 버텨요."],
    schoolLife: "첫 실습에서는 손이 떨려도 다음 수업까지 반복 연습해요. 어느 날 친구들이 가장 믿고 맡기는 사람이 되어 있어요.",
    strength: "끝까지 자라는 끈기와 조용한 용기", caution: "준비가 덜 됐다고 내 의견을 접어두지 마세요.", friends: ["luna-lovegood", "hermione-granger"], adventure: "정성껏 돌보던 식물이 위기의 친구들을 구할 열쇠가 돼요." },
  { slug: "ginny-weasley", name: "지니 위즐리", englishName: "Ginny Weasley", image: portrait("ginny"), imageAlt: "지니 위즐리",
    tagline: "눈치 볼 시간에 내가 하고 싶은 걸 해볼래",
    reasons: ["내가 원하는 것을 분명하게 말해요.", "실패해도 다시 시도하는 속도가 빨라요.", "친구를 챙기면서도 나의 경계는 지켜요."],
    schoolLife: "경기장에서는 승부를 즐기고 기숙사에서는 할 말을 해요. 누군가 정한 역할보다 직접 고른 도전을 더 좋아해요.",
    strength: "자신의 방향을 지키는 당당한 실행력", caution: "내 속도만큼 다른 사람의 속도도 살펴줘요.", friends: ["harry-potter", "draco-malfoy"], adventure: "취소될 뻔한 경기를 직접 다시 열어 팀의 분위기를 뒤집어요." },
  { slug: "sirius-black", name: "시리우스 블랙", englishName: "Sirius Black", image: portrait("sirius"), imageAlt: "시리우스 블랙",
    tagline: "규칙은 읽었고, 친구를 위해 예외를 만들었어",
    reasons: ["정해진 틀보다 스스로 고른 길을 믿어요.", "내 사람의 편이라는 걸 행동으로 보여줘요.", "답답한 상황에서는 과감하게 돌파해요."],
    schoolLife: "교칙 밖의 지름길을 가장 많이 알아요. 장난꾸러기처럼 보여도 친구가 억울한 일을 당하면 누구보다 진지해져요.",
    strength: "관습에 얽매이지 않는 자유와 의리", caution: "과감한 선택 전에 돌아올 방법도 생각해요.", friends: ["harry-potter", "ginny-weasley"], adventure: "금지된 지름길로 친구를 도우러 갔다가 예상 밖의 추격전을 벌여요." },
  { slug: "severus-snape", name: "세베루스 스네이프", englishName: "Severus Snape", image: portrait("snape"), imageAlt: "세베루스 스네이프",
    tagline: "말은 짧게, 뒷수습은 아무도 모르게",
    reasons: ["감정보다 정확한 판단을 먼저 해요.", "쉽게 드러내지 않아도 약속은 오래 기억해요.", "혼자 깊게 파고드는 일에 강해요."],
    schoolLife: "시끌벅적한 모임보다 조용한 실험실이 편해요. 말없이 고쳐둔 도구와 남겨둔 힌트에서 당신의 배려가 드러나요.",
    strength: "깊은 집중력과 흔들리지 않는 책임감", caution: "마음은 가끔 말로도 전해야 전달돼요.", friends: ["albus-dumbledore", "draco-malfoy"], adventure: "아무도 모르게 마법약을 완성해 위험한 실습 사고를 막아요." },
  { slug: "albus-dumbledore", name: "알버스 덤블도어", englishName: "Albus Dumbledore", image: portrait("dumbledore"), imageAlt: "알버스 덤블도어",
    tagline: "당장 한 수보다, 모두가 자랄 다음 장면을 봐",
    reasons: ["눈앞의 승리보다 긴 흐름을 살펴요.", "답을 주기보다 스스로 찾도록 도와요.", "서로 다른 의견에서 연결점을 찾아요."],
    schoolLife: "친구들의 상담 창구이자 모험의 큰 그림을 그리는 사람이에요. 모두가 자기 장점을 쓸 수 있도록 역할을 나눠줘요.",
    strength: "사람의 가능성을 보는 통찰과 조율", caution: "큰 계획도 함께할 사람에게 충분히 설명해요.", friends: ["severus-snape", "rubeus-hagrid"], adventure: "서로 다투던 팀을 연결해 혼자서는 풀 수 없는 수수께끼를 해결해요." },
  { slug: "rubeus-hagrid", name: "루베우스 해그리드", englishName: "Rubeus Hagrid", image: portrait("hagrid"), imageAlt: "루베우스 해그리드",
    tagline: "다들 무섭다는데, 밥은 먹었는지부터 궁금해",
    reasons: ["서툴거나 낯선 존재에게 먼저 다가가요.", "도움이 필요하면 손부터 내밀어요.", "함께하는 사람이 편안해야 나도 편해요."],
    schoolLife: "힘든 날 친구들이 찾아오는 쉼터 같은 사람이에요. 유난히 까다로운 마법 생물도 당신 곁에서는 조금씩 마음을 열어요.",
    strength: "경계 밖의 존재도 품는 따뜻한 행동력", caution: "다정함과 별개로 위험과 내 한계도 확인해요.", friends: ["luna-lovegood", "ron-weasley"], adventure: "다친 마법 생물을 돌보다가 모두의 든든한 조력자로 키워요." },
  { slug: "lord-voldemort", name: "볼드모트", englishName: "Lord Voldemort", image: portrait("voldemort"), imageAlt: "볼드모트",
    tagline: "조별 과제인 줄 알았는데 이미 장기 전략이 있어",
    reasons: ["목표가 정해지면 집중력이 크게 올라가요.", "변수와 자원을 빠르게 정리해요.", "남들이 포기한 수준까지 도전해요."],
    schoolLife: "대항전의 목표와 역할, 다음 작전까지 정해두는 전략가예요. 이 결과는 작품 속 선악이 아닌 목표 집중과 추진력을 비유해요.",
    strength: "큰 목표를 끝까지 밀어붙이는 전략성", caution: "사람의 마음과 동의도 성과만큼 중요하게 살펴요.", friends: ["draco-malfoy", "albus-dumbledore"], adventure: "불가능해 보인 학교 대항전 우승을 위해 뜻밖의 연합을 만들어요." },
];

type QuestionSeed = [string, string, [string, string, string, string]];
const questionSeeds: QuestionSeed[] = [
  ["입학 편지", "부엉이가 입학 편지를 두고 갔다. 가장 먼저 하는 일은?", ["일단 가보자! 가방부터 꺼낸다", "준비물과 수업 안내를 꼼꼼히 읽는다", "함께 갈 친구가 있는지 연락한다", "편지에 숨은 무늬와 낯선 주소를 살핀다"]],
  ["열차 동행", "호그와트행 열차, 한 칸에만 자리가 남았다. 나는?", ["내가 먼저 인사하고 자리를 만든다", "조용한 창가에 앉아 사람들을 관찰한다", "간식을 나누며 어색한 친구를 챙긴다", "재미있는 이야기를 하는 무리에 합류한다"]],
  ["기숙사 첫날", "첫날 밤, 룸메이트들이 공동 공간을 두고 의견이 갈렸다.", ["오래 편하게 지낼 수 있는 원칙을 함께 정한다", "내가 원하는 공간을 분명히 말하고 협상한다", "뒤에서 정리를 도우며 분위기가 풀리길 기다린다", "가구 배치를 아예 바꾸는 색다른 방법을 제안한다"]],
  ["마법 수업", "첫 주문이 실패해 깃털 대신 내 소매가 둥둥 뜬다!", ["웃고 다시 해본다. 이번엔 될 것 같다", "발음과 손동작을 하나씩 점검한다", "나도 실패했다며 옆 친구와 같이 연습한다", "이 실수로 다른 마법을 만들 수 없을까 생각한다"]],
  ["조별 과제", "움직이는 성 모형을 만드는 과제, 내가 맡고 싶은 역할은?", ["발표와 시연을 이끌며 현장에서 해결하기", "설계와 검증을 맡아 완성도 높이기", "팀원들 돕기와 필요한 재료 챙기기", "눈에 띄는 콘셉트와 승리 전략 세우기"]],
  ["친구의 실수", "친구가 실수로 망가뜨린 도구 때문에 혼날 위기다.", ["같이 해결하겠다며 친구 옆에 선다", "원인을 확인하고 조용히 도구를 고친다", "많이 놀랐을 친구의 마음부터 진정시킨다", "책임을 인정하면서 피해를 줄일 조건을 협의한다"]],
  ["수상한 지도", "빈 종이에 학교 지도와 낯선 발자국이 나타났다.", ["내 발로 확인하러 간다. 친구에게 위치는 남긴다", "지도와 실제 복도를 비교해 규칙을 찾는다", "누군가 길을 잃었는지 먼저 알아본다", "남들이 모르는 길이라니! 새로운 탐험을 상상한다"]],
  ["규칙 위반", "통금 직전, 복도 끝에서 친구가 도움을 청한다.", ["친구에게 달려간다. 설명은 돌아와서 한다", "상황을 확인하고 안전한 해결책을 찾는다", "함께 도울 친구와 담당 어른을 부른다", "들키지 않고 도울 다른 통로를 찾는다"]],
  ["경기 패배", "열심히 준비한 기숙사 대항전에서 졌다. 경기 후 나는?", ["몸부터 다시 움직인다. 다음 경기가 있다", "실수한 장면을 복기하며 전략을 수정한다", "속상한 팀원들과 간식을 먹으며 풀어낸다", "승패보다 이번에 발견한 새로운 가능성을 이야기한다"]],
  ["비밀 발견", "오래된 방에서 특별한 힘이 담긴 물건을 찾았다.", ["위험한지 확인하고 지켜야 할 사람을 떠올린다", "기록을 읽으며 원리와 대가를 조사한다", "혼자 결정하지 않고 믿는 사람과 의논한다", "어떤 목표에 쓸 수 있을지 가능성을 따져본다"]],
  ["위기 해결", "축제의 장식 마법이 폭주했다! 내가 할 일은?", ["현장으로 가서 친구들이 빠져나올 길을 연다", "마법의 원인을 찾아 작동을 멈춘다", "놀란 사람을 챙기고 역할을 나누어 돕는다", "도구와 인원을 모아 상황을 한 번에 뒤집을 작전을 짠다"]],
  ["학기 마지막 선택", "학기가 끝났다. 친구들에게 어떤 사람으로 기억되고 싶을까?", ["필요한 순간 먼저 나서준 사람", "어려운 문제를 끝내 해결해준 사람", "함께 있으면 나답게 편안했던 사람", "자기만의 길을 만들어낸 사람"]],
];

// 문항 순서에 대응하는 대표 행동. 숫자는 보기 위치이며 크기나 우열을 뜻하지 않습니다.
export const hogwartsPatterns: Record<HogwartsSlug, number[]> = {
  "harry-potter":       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "hermione-granger":   [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  "ron-weasley":        [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2],
  "draco-malfoy":       [1, 3, 1, 1, 3, 3, 1, 3, 1, 3, 3, 3],
  "luna-lovegood":      [3, 1, 3, 3, 3, 2, 3, 3, 3, 1, 2, 3],
  "neville-longbottom": [1, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0],
  "ginny-weasley":      [0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 3],
  "sirius-black":       [0, 3, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3],
  "severus-snape":      [1, 1, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1],
  "albus-dumbledore":   [3, 1, 0, 3, 3, 3, 1, 1, 3, 2, 3, 1],
  "rubeus-hagrid":      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  "lord-voldemort":     [3, 0, 1, 1, 3, 3, 1, 3, 1, 3, 3, 3],
};

// 각 문항에서 의미가 가까운 보기 쌍. 인접한 보기 번호를 성격의 거리로 취급하지 않습니다.
const relatedChoices = [[0, 3], [0, 3], [0, 2], [1, 3], [0, 3], [0, 2], [1, 3], [1, 2], [0, 1], [1, 3], [0, 2], [0, 3]];
export const hogwartsQuestions = questionSeeds.map(([chapter, text, options], index) => ({
  id: index + 1, chapter, text,
  options: options.map((text, value) => ({
    label: String.fromCharCode(65 + value), text, value,
    weights: Object.fromEntries(hogwartsSlugs.map((slug) => {
      const preferred = hogwartsPatterns[slug][index];
      const related = relatedChoices[index];
      return [slug, preferred === value ? 3 : related.includes(preferred) && related.includes(value) ? 1 : 0];
    })) as Record<HogwartsSlug, number>,
  })),
}));

export const hogwartsTest: TestDefinition = {
  slug: "hogwarts-character-test", type: "quiz", title: "나랑 잘 맞는 해리포터 주인공은?",
  shortTitle: "호그와트 상황극 테스트", cardTitle: "나랑 잘 맞는 해리포터 주인공은?",
  description: "호그와트에서의 12가지 선택으로 찾는 나와 닮은 캐릭터",
  category: "성격.심리", duration: "약 3분", icon: "✉️", thumbnail: portrait("harry"),
  participants: 0, accent: "orange", isNew: true, createdAt: "2026-10-11", itemCount: 12,
  tags: ["해리포터", "호그와트", "상황극", "성격"], relatedTests: ["harry-potter-character-test", "mbti"],
  questions: hogwartsQuestions.map(({ id, text, options }) => ({ id, text, options: options.map(({ label, text, value }) => ({ label, text, value })) })),
  resultSlugs: [],
  seoTitle: "나랑 잘 맞는 해리포터 주인공은? | 호그와트 상황극 테스트",
  seoDescription: "입학 편지부터 학기 마지막 날까지, 12가지 상황 속 선택으로 나와 닮은 해리포터 캐릭터를 찾아보세요. 인물 사진과 학교생활 해석을 담은 무료 심리테스트입니다.",
  disclaimer: "재미로 즐기는 비공식 팬 테스트이며 전문 심리검사가 아닙니다.",
  seoContent: {
    heading: "호그와트에서 나는 어떤 사람일까?",
    paragraphs: ["입학 편지, 마법 수업, 친구와의 모험 속에서 나다운 행동을 골라보세요. 작품 지식을 묻는 퀴즈가 아니라 선택에 드러나는 성향을 캐릭터에 빗대어 보는 테스트입니다.", "해리, 헤르미온느, 론을 비롯한 12명의 캐릭터 중 나와 닮은 인물을 찾습니다. 결과에는 인물 사진, 닮은 이유, 호그와트 생활 모습과 함께하면 좋은 친구가 담깁니다."],
    faqs: [["연애 궁합 테스트인가요?", "아니요. 상황 속 내 선택으로 나와 닮은 캐릭터를 찾는 성격 테스트입니다."], ["해리포터를 잘 몰라도 할 수 있나요?", "네. 정답을 맞히는 퀴즈가 아니므로 가장 나다운 행동을 고르면 됩니다."], ["같은 답을 고르면 결과도 같나요?", "네. 선택별 가중치로 계산하며 무작위로 결과를 정하지 않습니다."], ["볼드모트 결과는 무슨 뜻인가요?", "선악이 아니라 목표 집중과 전략적인 판단 방식을 비유한 결과입니다."]],
    assesses: "상황 속 선택에 나타나는 행동과 관계 스타일",
  },
};

export const getHogwartsProfile = (slug: string) => hogwartsProfiles.find((profile) => profile.slug === slug);
