import type { SbtiLabelProfile, SbtiQuestion, TestDefinition } from "@/lib/types";

// 6개 스탯: gwichanism(귀찮음) · nunchi(눈치) · tension(텐션) · jireum(지름신) · plan(계획력) · insider(인싸력)
export const sbtiStatLabels: Record<string, string> = {
  gwichanism: "귀찮음",
  nunchi: "눈치",
  tension: "텐션",
  jireum: "지름신",
  plan: "계획력",
  insider: "인싸력",
};

// 28문항 자체 창작 (한국 일상 밈 소재). 각 보기는 스탯에 가중치를 더합니다.
export const sbtiQuestions: SbtiQuestion[] = [
  { id: 1, text: "배달 최소주문금액이 2,000원 모자랄 때 나는?", options: [
    { text: "안 먹어도 되는 사이드를 추가한다 (이게 다 큰 그림)", weights: { jireum: 3, tension: 1 } },
    { text: "장바구니를 갈아엎고 다른 가게를 찾는다", weights: { plan: 3, gwichanism: 1 } },
  ] },
  { id: 2, text: "단톡방에 \"주말에 다들 뭐해?\"가 올라오면?", options: [
    { text: "일단 잠수. 누가 먼저 대답하는지 지켜본다", weights: { nunchi: 3, gwichanism: 2 } },
    { text: "\"왜? 뭐 재밌는 거 있어?\" 1초 만에 답장", weights: { insider: 3, tension: 2 } },
  ] },
  { id: 3, text: "택배 문 앞에 도착! 지금 나는 침대에 누워 있다.", options: [
    { text: "내일의 나에게 맡긴다. 택배는 도망가지 않아", weights: { gwichanism: 3 } },
    { text: "벌떡 일어난다. 언박싱은 못 참지", weights: { tension: 3, jireum: 1 } },
  ] },
  { id: 4, text: "회의에서 아무도 대답을 안 하는 정적의 순간, 나는?", options: [
    { text: "정적을 못 참고 결국 내가 입을 연다", weights: { insider: 2, nunchi: 2 } },
    { text: "노트에 뭔가 쓰는 척하며 시선을 피한다", weights: { gwichanism: 2, nunchi: 2 } },
  ] },
  { id: 5, text: "\"우리 이번 주에 밥 한번 먹자!\"라는 말을 들으면?", options: [
    { text: "그 자리에서 날짜와 식당까지 정해버린다", weights: { plan: 3, insider: 1 } },
    { text: "\"그래 좋아~\" (마음속: 성사되지 않을 것을 안다)", weights: { nunchi: 2, gwichanism: 2 } },
  ] },
  { id: 6, text: "새벽 2시, 알고리즘이 이끈 영상을 보다가 문득 나는?", options: [
    { text: "\"딱 하나만 더\"를 12번째 외치는 중", weights: { tension: 2, gwichanism: 2 } },
    { text: "내일 일정을 떠올리고 강제 종료한다", weights: { plan: 3 } },
  ] },
  { id: 7, text: "친구가 부른 노래방, 내 차례가 되면?", options: [
    { text: "예약해둔 3곡을 연속으로 부른다 (탬버린 소환)", weights: { tension: 3, insider: 2 } },
    { text: "\"난 됐어~\" 하며 분위기 감상 담당", weights: { nunchi: 2, gwichanism: 1 } },
  ] },
  { id: 8, text: "장바구니에 담아둔 물건이 '품절 임박'이 되면?", options: [
    { text: "이건 사라는 계시다. 바로 결제", weights: { jireum: 3, tension: 1 } },
    { text: "품절되면 안 사도 되니까 오히려 좋아", weights: { gwichanism: 2, plan: 1 } },
  ] },
  { id: 9, text: "약속 장소에 30분 일찍 도착했다. 나는?", options: [
    { text: "애초에 이런 일이 없다. 나는 딱 맞춰 간다", weights: { gwichanism: 2, tension: 1 } },
    { text: "근처 카페 리서치까지 이미 끝내뒀다", weights: { plan: 3, nunchi: 1 } },
  ] },
  { id: 10, text: "회사(학교)에서 \"자유롭게 의견 주세요\"라고 하면?", options: [
    { text: "자유롭게 말하면 안 된다는 뜻임을 안다", weights: { nunchi: 3 } },
    { text: "진짜 자유롭게 말해버린다", weights: { tension: 2, insider: 2 } },
  ] },
  { id: 11, text: "냉장고에 유통기한 하루 지난 우유가 있다.", options: [
    { text: "냄새 맡아보고 마신다. 나는 강하다", weights: { gwichanism: 2, tension: 1 } },
    { text: "미련 없이 버린다. 건강은 소중하니까", weights: { plan: 2 } },
  ] },
  { id: 12, text: "모임에서 나온 단체사진, 확인해보니 나만 눈 감았다.", options: [
    { text: "\"한 장만 다시 찍자!\"를 외친다", weights: { insider: 2, tension: 2 } },
    { text: "그냥 둔다. 어차피 아무도 나를 자세히 안 본다", weights: { gwichanism: 2, nunchi: 2 } },
  ] },
  { id: 13, text: "월급(용돈)이 들어온 날, 나의 통장은?", options: [
    { text: "위시리스트 결제로 순삭. 통장은 스쳐 지나갈 뿐", weights: { jireum: 3, tension: 1 } },
    { text: "저축·공과금·생활비 자동 분배 완료", weights: { plan: 3 } },
  ] },
  { id: 14, text: "친구가 갑자기 \"나 고민 있어\"라고 하면?", options: [
    { text: "표정·말투·타이핑 속도로 이미 심각도를 파악했다", weights: { nunchi: 3 } },
    { text: "\"뭔데뭔데!! 말해봐!!\" 텐션부터 올라간다", weights: { tension: 2, insider: 2 } },
  ] },
  { id: 15, text: "집에서 쉬는 날, 초인종이 울리면?", options: [
    { text: "숨을 죽인다. 나는 지금 이 집에 없다", weights: { gwichanism: 3, nunchi: 1 } },
    { text: "누구지? 하고 바로 나가본다", weights: { tension: 2, insider: 1 } },
  ] },
  { id: 16, text: "\"오늘부터 갓생 산다\"고 다짐한 다음 날 아침, 나는?", options: [
    { text: "알람 5개를 모두 끄고 재다짐한다 (내일부터)", weights: { gwichanism: 3 } },
    { text: "일단 일어난다. 미라클모닝 3일 차 가보자고", weights: { plan: 2, tension: 2 } },
  ] },
  { id: 17, text: "SNS에 올릴 사진을 고를 때 나는?", options: [
    { text: "보정하고 순서 고민하다 결국 안 올린다", weights: { nunchi: 2, gwichanism: 2 } },
    { text: "찍자마자 바로 올린다. 스토리는 신선도가 생명", weights: { insider: 3, tension: 1 } },
  ] },
  { id: 18, text: "여행 전날 밤, 나의 캐리어 상태는?", options: [
    { text: "체크리스트 기반으로 3일 전에 이미 완성", weights: { plan: 3 } },
    { text: "텅 비어 있다. 짐은 당일 아침의 내가 싼다", weights: { gwichanism: 2, tension: 1 } },
  ] },
  { id: 19, text: "회식(모임) 자리에서 상석 옆자리가 비어 있다면?", options: [
    { text: "센스 있게 다른 사람을 그쪽으로 유도한다", weights: { nunchi: 3, insider: 1 } },
    { text: "아무 생각 없이 앉았다가 뒤늦게 깨닫는다", weights: { tension: 1, gwichanism: 2 } },
  ] },
  { id: 20, text: "\"1+1 행사\" 문구를 보면?", options: [
    { text: "필요 없어도 일단 담는다. 이건 이득이니까", weights: { jireum: 3 } },
    { text: "1개도 필요 없으면 0개가 이득이라는 걸 안다", weights: { plan: 2, nunchi: 1 } },
  ] },
  { id: 21, text: "운동을 결심한 나의 최근 기록은?", options: [
    { text: "운동복과 장비부터 풀세트로 샀다 (장비빨 국룰)", weights: { jireum: 2, tension: 2 } },
    { text: "홈트 영상 재생까지는 성공했다 (시청 완료)", weights: { gwichanism: 3 } },
  ] },
  { id: 22, text: "모두가 침묵하는 엘리베이터, 아는 사람이 탔다!", options: [
    { text: "\"오~ 안녕하세요!\" 스몰토크 시전", weights: { insider: 3, tension: 1 } },
    { text: "핸드폰을 꺼내 바쁜 사람이 된다", weights: { gwichanism: 2, nunchi: 2 } },
  ] },
  { id: 23, text: "드라마 정주행 중 새벽 3시, 다음 화 예고가 궁금하다.", options: [
    { text: "\"이미 새벽 3시면 5시까지 봐도 똑같아\"", weights: { tension: 3, gwichanism: 1 } },
    { text: "궁금함을 저장하고 잔다. 수면은 계획의 일부", weights: { plan: 3 } },
  ] },
  { id: 24, text: "친구들과 여행 계획을 짤 때 나의 역할은?", options: [
    { text: "엑셀 일정표와 예산안을 만드는 총무", weights: { plan: 3, nunchi: 1 } },
    { text: "\"난 다 좋아~\" 하고 몸만 가는 승객", weights: { gwichanism: 3 } },
  ] },
  { id: 25, text: "낯선 모임에서 3시간을 보낸 뒤 집에 오면?", options: [
    { text: "충전 완료! 오늘 만난 사람들 연락처를 정리한다", weights: { insider: 3, tension: 1 } },
    { text: "방전 완료. 침대와 물아일체가 된다", weights: { gwichanism: 2, nunchi: 1 } },
  ] },
  { id: 26, text: "인터넷에서 웃긴 밈을 발견하면?", options: [
    { text: "단톡방 3곳에 즉시 배포한다 (밈 유통업자)", weights: { insider: 2, tension: 2 } },
    { text: "저장만 3,000장째. 나만 보는 밈 박물관 운영", weights: { nunchi: 1, gwichanism: 2 } },
  ] },
  { id: 27, text: "세일 마지막 날이라는 알림을 받으면?", options: [
    { text: "세일은 언제나 다시 온다. 흔들리지 않는다", weights: { plan: 2, gwichanism: 1 } },
    { text: "지금 안 사면 손해라는 계산이 이미 끝났다", weights: { jireum: 3 } },
  ] },
  { id: 28, text: "나의 카카오톡 안 읽은 메시지 개수는?", options: [
    { text: "0개. 알림 배지를 견딜 수 없다", weights: { plan: 2, nunchi: 2 } },
    { text: "999+. 숫자는 이미 의미를 잃었다", weights: { gwichanism: 3 } },
  ] },
];

// 밈 라벨 10종 — 전부 자체 창작 네이밍. targetStats(0~100)와 가장 가까운 프로필이 결과가 됩니다.
export const sbtiLabelProfiles: SbtiLabelProfile[] = [
  {
    slug: "gwichanist", name: "만렙 귀차니스트", icon: "🛋️",
    summary: "귀찮음이 이미 인간의 경지를 넘어섰습니다.",
    description: "당신에게 세상 모든 일은 '해야 하는 일'과 '더 귀찮은 일'로 나뉩니다. 침대에서 리모컨까지의 거리가 인생 최대의 시련이고, 배달 어플의 '재주문' 버튼은 당신을 위해 만들어졌어요. 하지만 놀랍게도 정말 중요한 순간에는 누구보다 빠르게 움직이는 반전 에너지를 숨기고 있습니다. 에너지를 아끼는 게 아니라 '선택과 집중'을 하는 것뿐이라고 오늘도 스스로를 설득해봅니다.",
    traits: ["침대 밖은 위험해", "재주문 버튼 헤비유저", "결정적 순간의 반전 스피드"],
    shareText: "내 SBTI는 🛋️ 만렙 귀차니스트래ㅋㅋㅋ 너도 해봐",
    targetStats: { gwichanism: 92, nunchi: 55, tension: 30, jireum: 45, plan: 25, insider: 30 },
  },
  {
    slug: "nunchi-master", name: "프로 눈치백단", icon: "🕵️",
    summary: "말하지 않아도 이미 다 알고 있습니다.",
    description: "단톡방의 미묘한 기류 변화, 상사의 한숨 길이, 친구의 '나 괜찮아'에 숨은 진짜 의미까지. 당신의 눈치 레이더는 국가에서 관리해야 할 수준입니다. 덕분에 분위기를 망치는 일이 없지만, 남의 감정을 너무 잘 읽어서 정작 내 감정은 뒷전이 되곤 해요. 가끔은 레이더를 끄고 '눈치 없는 사람'이 되어보는 것도 필요합니다. 아무도 당신을 미워하지 않아요.",
    traits: ["단톡방 기류 분석가", "분위기 지킴이", "정작 내 마음은 미개봉"],
    shareText: "내 SBTI는 🕵️ 프로 눈치백단… 소름 돋게 맞음. 너도 해봐",
    targetStats: { gwichanism: 45, nunchi: 95, tension: 35, jireum: 30, plan: 55, insider: 40 },
  },
  {
    slug: "tension-rollercoaster", name: "텐션 롤러코스터", icon: "🎢",
    summary: "궤도는 없지만 탑승감은 확실합니다.",
    description: "새벽 2시에 갑자기 방 청소를 시작하고, 낮 2시에는 세상 무기력해지는 사람. 당신의 텐션 그래프는 어떤 애널리스트도 예측할 수 없습니다. 꽂히면 밤새는 열정과 식으면 쳐다도 안 보는 냉정함이 공존하죠. 주변 사람들은 오늘의 당신이 '풀텐션 모드'인지 '절전 모드'인지 확인하고 말을 건다는 소문이 있어요. 하지만 그 예측 불가함이 당신의 최대 매력입니다.",
    traits: ["새벽 2시 대청소 유경험자", "꽂히면 밤샘, 식으면 쌩", "예측 불가가 매력"],
    shareText: "내 SBTI는 🎢 텐션 롤러코스터ㅋㅋ 부정할 수 없다. 너도 해봐",
    targetStats: { gwichanism: 50, nunchi: 35, tension: 92, jireum: 60, plan: 20, insider: 55 },
  },
  {
    slug: "godsaeng-wannabe", name: "갓생 지망생", icon: "📝",
    summary: "계획은 이미 갓생, 실행은 아직 준비 중.",
    description: "새 다이어리, 미라클모닝 알람, 한 달 운동 계획표까지 준비는 언제나 완벽합니다. 문제는 그 완벽한 계획이 3일마다 리셋된다는 것뿐. 하지만 당신은 압니다. 계획을 세우는 그 순간이 제일 행복하다는 걸요. 포기하지 않고 계속 다시 시작하는 것 자체가 사실 대단한 재능입니다. 남들은 계획조차 안 세우거든요. 이번 주 월요일의 당신을 응원합니다.",
    traits: ["다이어리 수집가", "3일마다 리부팅", "계획 세울 때가 제일 행복"],
    shareText: "내 SBTI는 📝 갓생 지망생… 찔린다ㅋㅋ 너도 해봐",
    targetStats: { gwichanism: 70, nunchi: 50, tension: 55, jireum: 55, plan: 80, insider: 40 },
  },
  {
    slug: "shy-attention-seeker", name: "소심한 관종", icon: "🎭",
    summary: "주목받고 싶지만 들키기는 싫습니다.",
    description: "스토리를 올리고 누가 봤는지 1분마다 확인하지만, 정작 누가 물어보면 '아 그냥 올린 건데?'라고 답하는 사람. 관심은 고프지만 나서는 건 부끄러운, 인류의 가장 복잡한 유형입니다. 모임에서 웃긴 말이 떠올라도 속으로 삼키다가, 집에 와서 '아까 말할걸' 하고 이불킥을 하죠. 용기 내서 던진 한 마디가 빵 터졌던 기억을 잊지 마세요. 세상은 당신의 드립을 기다리고 있습니다.",
    traits: ["스토리 조회수 1분 단위 확인", "이불킥 장인", "숨겨둔 드립 부자"],
    shareText: "내 SBTI는 🎭 소심한 관종이래… 어떻게 알았지. 너도 해봐",
    targetStats: { gwichanism: 50, nunchi: 75, tension: 70, jireum: 45, plan: 35, insider: 35 },
  },
  {
    slug: "flex-machine", name: "통장 앞 대범러", icon: "💸",
    summary: "평소엔 소심해도 결제 버튼 앞에선 대범해집니다.",
    description: "점심 메뉴는 30분을 고민하면서 10만 원짜리 '나를 위한 선물'은 3초 만에 결제하는 사람. 당신의 대범함은 오직 소비의 순간에만 발동됩니다. '이건 소비가 아니라 투자', '스트레스 받았으니 이 정도는 괜찮아'라는 명언 제조기이기도 하죠. 하지만 그렇게 산 물건들이 당신의 일상을 실제로 행복하게 만들고 있다면, 그게 바로 성공한 소비 아닐까요? 통장 잔고만 눈을 감아준다면요.",
    traits: ["나를 위한 선물 전문가", "소비 합리화 명언 제조기", "택배 상자가 곧 행복"],
    shareText: "내 SBTI는 💸 통장 앞 대범러ㅋㅋㅋ 반박 불가. 너도 해봐",
    targetStats: { gwichanism: 45, nunchi: 40, tension: 60, jireum: 92, plan: 25, insider: 50 },
  },
  {
    slug: "human-alarm", name: "인간 알람시계", icon: "⏰",
    summary: "당신의 인생에는 오차라는 것이 없습니다.",
    description: "약속 10분 전 도착은 기본, 여행 계획은 엑셀로, 월급은 자동 분배로. 당신의 하루는 스위스 시계처럼 정확하게 돌아갑니다. 친구들이 여행 총무를 항상 당신에게 맡기는 건 다 이유가 있어요. 다만 계획이 틀어지면 세상이 무너지는 기분이 드는 게 유일한 약점. 가끔은 계획 없는 하루가 주는 뜻밖의 재미도 있다는 걸 경험해보세요. 물론 그 '계획 없는 하루'도 계획하겠지만요.",
    traits: ["10분 전 도착이 국룰", "여행 총무 종신직", "엑셀이 곧 취미"],
    shareText: "내 SBTI는 ⏰ 인간 알람시계래ㅋㅋ 맞는 것 같아서 무섭다. 너도 해봐",
    targetStats: { gwichanism: 15, nunchi: 60, tension: 40, jireum: 25, plan: 95, insider: 45 },
  },
  {
    slug: "home-keeper", name: "프로 집콕러", icon: "🏠",
    summary: "집이 최고라는 진리를 온몸으로 증명 중입니다.",
    description: "당신에게 집은 단순한 주거 공간이 아니라 하나의 완성된 세계입니다. 배달 어플, OTT, 폭신한 이불만 있으면 한 달도 버틸 수 있죠. 약속이 취소되면 아쉬운 표정을 짓지만 속으로는 축제가 열립니다. 하지만 막상 나가면 누구보다 잘 노는 것도 당신의 특징. 에너지가 집에서만 충전되는 충전기 내장형 인간일 뿐, 사회성이 없는 게 아니에요. 오늘도 집에서 최고의 하루를 보내세요.",
    traits: ["약속 취소 = 내적 축제", "이불 밖 위험 감지 센서", "막상 나가면 잘 놈"],
    shareText: "내 SBTI는 🏠 프로 집콕러ㅋㅋ 이건 나잖아? 너도 해봐",
    targetStats: { gwichanism: 80, nunchi: 55, tension: 25, jireum: 40, plan: 45, insider: 15 },
  },
  {
    slug: "ojirap-rich", name: "오지랖 부자", icon: "🤝",
    summary: "온 동네 사람들의 안부를 책임지고 있습니다.",
    description: "친구의 친구의 고민까지 함께 걱정해주고, 맛집을 발견하면 온 단톡방에 전파해야 직성이 풀리는 사람. 당신의 오지랖은 사실 애정의 다른 이름입니다. 덕분에 주변 사람들은 당신 곁에서 늘 챙김을 받죠. 모임을 만들고, 사람을 연결하고, 경조사를 챙기는 것도 언제나 당신 몫. 다만 남 걱정하느라 내 걱정할 시간이 없다는 게 함정입니다. 이번 주말은 오지랖을 자신에게 발휘해보세요.",
    traits: ["맛집 전파 의무감", "인간 네트워크 허브", "경조사 챙김이 특기"],
    shareText: "내 SBTI는 🤝 오지랖 부자래ㅋㅋ 인정한다. 너도 해봐",
    targetStats: { gwichanism: 25, nunchi: 70, tension: 65, jireum: 50, plan: 55, insider: 90 },
  },
  {
    slug: "harmless-citizen", name: "무해한 소시민", icon: "🌱",
    summary: "누구에게도 해를 끼치지 않는 평화 그 자체입니다.",
    description: "화내는 모습을 본 사람이 없고, 뭘 먹을지 물어보면 '아무거나 좋아'가 자동 재생되는 사람. 당신은 존재 자체로 주변을 편안하게 만드는 무해력의 소유자입니다. 커피 하나, 산책 한 번에 행복해지는 소소한 행복 수집가이기도 하죠. 큰 욕심 없이 잔잔하게 사는 것이 당신의 힘이지만, 가끔은 '아무거나' 대신 진짜 원하는 것을 말해보세요. 세상은 무해한 당신이 원하는 건 다 들어주고 싶어 하니까요.",
    traits: ["화내는 모습 목격담 없음", "'아무거나' 자동 재생", "소소한 행복 수집가"],
    shareText: "내 SBTI는 🌱 무해한 소시민이래ㅎㅎ 너도 해봐",
    targetStats: { gwichanism: 50, nunchi: 65, tension: 35, jireum: 30, plan: 50, insider: 40 },
  },
  {
    slug: "meme-curator", name: "밈 박물관장", icon: "🖼️",
    summary: "당신의 갤러리는 이미 국립밈물관입니다.",
    description: "사진첩 저장 밈 3,000장, 상황별 짤 즉시 검색 가능, 유행어는 남들보다 2주 빠르게 습득. 당신은 인터넷 문화의 최전선에서 활동하는 밈 큐레이터입니다. 친구가 어떤 말을 해도 0.5초 만에 완벽한 짤로 응답하는 능력은 가히 예술의 경지죠. 대화의 절반이 짤이지만 그게 당신의 언어입니다. 이 테스트 결과도 아마 짤로 만들어서 공유하겠죠? 기대하겠습니다.",
    traits: ["짤 3,000장 보유", "상황별 밈 0.5초 검색", "유행어 얼리어답터"],
    shareText: "내 SBTI는 🖼️ 밈 박물관장ㅋㅋㅋ 부정 못 함. 너도 해봐",
    targetStats: { gwichanism: 60, nunchi: 60, tension: 75, jireum: 55, plan: 30, insider: 70 },
  },
];

export const sbtiTest: TestDefinition = {
  slug: "sbti",
  title: "SBTI 테스트 | 나의 밈 유형은?",
  shortTitle: "SBTI 밈 테스트",
  cardTitle: "재미로 보는 나의 밈 유형은?",
  description: "귀찮음, 눈치, 텐션, 지름신… 28개의 웃긴 상황으로 알아보는 나의 밈 유형! 재미로 보는 K-일상 성격 밈 테스트.",
  category: "심리",
  duration: "약 3분",
  icon: "🤪",
  participants: 2687,
  accent: "pink",
  isNew: true,
  itemCount: sbtiQuestions.length,
  questions: [],
  resultSlugs: [],
  seoTitle: "SBTI 테스트 | 나의 밈 유형은? 재미로 보는 성격 밈 테스트",
  seoDescription: "SBTI 테스트로 나의 밈 유형을 확인해보세요. 귀찮음, 눈치, 텐션, 지름신 등 6가지 스탯을 분석해 만렙 귀차니스트부터 밈 박물관장까지 웃기지만 공감되는 결과를 알려드립니다.",
  keywords: ["SBTI 테스트", "SBTI", "밈 테스트", "재미 테스트", "웃긴 심리테스트", "성격 밈 테스트", "유형 테스트", "심심할때 테스트"],
  seoContent: {
    heading: "SBTI 테스트란?",
    paragraphs: [
      "SBTI 테스트는 진지한 성격 검사에 지친 사람들을 위한 밈(meme)형 유머 테스트입니다. 배달 최소주문금액 앞에서의 갈등, 단톡방 잠수, 새벽 정주행처럼 한국인이라면 무조건 공감할 28가지 웃긴 상황에서 나의 선택을 고르면, 귀찮음·눈치·텐션·지름신·계획력·인싸력 6가지 스탯이 계산됩니다.",
      "결과는 만렙 귀차니스트, 프로 눈치백단, 통장 앞 대범러, 밈 박물관장까지 웃기지만 어딘가 뼈를 때리는 10가지 밈 유형 중 하나로 나옵니다. 스탯이 비슷하면 그날의 컨디션에 따라 결과가 살짝 달라질 수 있는 랜덤 요소도 숨어 있어, 다시 할 때마다 새로운 재미가 있어요.",
      "이 테스트는 심리학적 근거를 표방하지 않는 100% 재미용 콘텐츠입니다. 성격을 진단하는 검사가 아니라, 결과 짤을 단톡방에 던지고 \"이거 완전 너잖아ㅋㅋ\"라는 답장을 받기 위해 만들어졌습니다. 친구, 연인, 팀원들과 함께 하고 서로의 밈 유형을 비교해보세요.",
    ],
    faqs: [
      ["SBTI는 진짜 성격 검사인가요?", "아니요. 심리학적 근거를 표방하지 않는 100% 재미용 밈 테스트입니다. 결과는 웃고 공유하기 위한 콘텐츠로 즐겨주세요."],
      ["결과는 어떻게 정해지나요?", "28개 상황 선택으로 6가지 스탯(귀찮음·눈치·텐션·지름신·계획력·인싸력)을 계산하고, 스탯 조합과 가장 가까운 밈 유형이 결과로 나옵니다. 약간의 랜덤 요소도 있어요."],
      ["할 때마다 결과가 달라지는데 정상인가요?", "네, 의도된 재미 요소입니다. 스탯이 경계에 있으면 미세한 랜덤 가중치에 따라 결과가 달라질 수 있습니다."],
      ["MBTI 테스트와는 무엇이 다른가요?", "16가지 성격 유형 테스트가 성향을 진지하게 살펴보는 콘텐츠라면, SBTI는 유머와 공감이 목적인 밈 콘텐츠입니다. 둘 다 해보고 비교하는 것도 재미있어요."],
    ],
    assesses: "귀찮음·눈치·텐션 등 6가지 일상 밈 스탯",
  },
};

export const getSbtiLabelProfile = (slug: string) => sbtiLabelProfiles.find((profile) => profile.slug === slug);
