import type { TestDefinition, TestOption } from "@/lib/types";

export const runningTypeKeys = ["record", "crew", "scenery", "explorer"] as const;
export type RunningType = (typeof runningTypeKeys)[number];
export type RunningScores = Record<RunningType, number>;
export type RunningQuestion = {
  id: number;
  text: string;
  hint?: string;
  options: [TestOption, TestOption, TestOption, TestOption];
};
export type RunningProfile = {
  slug: RunningType;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  behaviors: [string, string, string];
  secondaryText: string;
  suggestion: string;
};

const options = (texts: [string, string, string, string]): RunningQuestion["options"] =>
  texts.map((text, value) => ({ label: "ABCD"[value], text, value })) as RunningQuestion["options"];

export const runningQuestions: RunningQuestion[] = [
  {
    id: 1,
    text: "러닝 약속까지 10분 남았는데, 기다리면서 뭐 할래?",
    options: options([
      "근처 한 바퀴만 슬쩍 돌고 올래.",
      "먼저 온 사람이랑 오늘 어디로 뛸지 얘기할래.",
      "앉을 데 찾아서 잠깐 주변 구경할래.",
      "좀 걸어보면서 신발 끈이랑 옷부터 편하게 맞출래.",
    ]),
  },
  {
    id: 2,
    text: "잘 달리고 있었는데 공사 중이라 길이 막혔네. 이럴 땐 무슨 생각부터 들어?",
    options: options([
      "“옆길은 처음 보는데, 이번에 가볼까?”",
      "“조금 돌아가면 원래 가려던 데까지 갈 수 있겠네.”",
      "“지도 보면 덜 돌아가는 길이 있을 것 같은데.”",
      "“같이 온 친구는 이 근처 좀 알려나?”",
    ]),
  },
  {
    id: 3,
    text: "잘 신던 운동화가 단종됐대. 다음 신발은 어떻게 고를래?",
    options: options([
      "전에 신던 게 왜 편했는지부터 생각해볼래.",
      "매장에서 이것저것 신어보고 마음에 드는 걸 고를래.",
      "비슷한 신발 신던 친구한테 요즘 뭐 신는지 물어볼래.",
      "같은 브랜드에서 새로 나온 모델부터 찾아볼래.",
    ]),
  },
  {
    id: 4,
    text: "오늘따라 달리기가 좀 잘되는 것 같은데, 이럴 땐 뭐 하고 싶어져?",
    options: options([
      "같이 뛰는 친구한테 “오늘 좀 괜찮지 않아?” 하고 말해.",
      "평소랑 뭐가 달랐는지 한번 생각해봐.",
      "저기 모퉁이까지만 조금 더 가보고 싶어.",
      "뭘 더 하기보단 그냥 이 기분을 즐기고 싶어.",
    ]),
  },
  {
    id: 5,
    text: "친구가 “야, 우리 언제 한번 같이 뛰자!” 하면 뭐라고 답할 것 같아?",
    options: options([
      "“좋아. 이번 주말 오전 어때?”",
      "“좋아. 얼마 전에 괜찮은 길 봐뒀어.”",
      "“좋아. 넌 평소에 어떻게 뛰는데?”",
      "“좋아. 끝나고 뭐 먹을지도 정하자.”",
    ]),
  },
  {
    id: 6,
    text: "분명 뛰었는데 앱에 기록이 하나도 안 남았으면 어떻게 할래?",
    options: options([
      "왜 안 남았는지 설정부터 한번 볼래.",
      "같이 뛴 친구한테 오늘 얼마나 뛰었는지 물어볼래.",
      "좀 아쉽지만 잘 뛰고 왔으니까 그냥 둘래.",
      "시간하고 경로라도 기억나는 대로 적어둘래.",
    ]),
  },
  {
    id: 7,
    text: "처음 나간 러닝 모임에서 아직 다들 서먹서먹하면, 어떻게 시간 보낼 것 같아?",
    options: options([
      "옆 사람한테 여기 자주 나오는지 물어볼 것 같아.",
      "안내된 코스랑 진행 순서를 다시 읽어볼 것 같아.",
      "오늘 어디까지 같이 뛸지 혼자 정해둘 것 같아.",
      "주변을 둘러보면서 천천히 분위기에 익숙해질 것 같아.",
    ]),
  },
  {
    id: 8,
    text: "뛰러 나왔는데 이어폰이 집에 있네. 오늘 러닝은 어떻게 할래?",
    options: options([
      "오늘은 주변 소리 들으면서 뛰어볼래.",
      "늘 뛰던 구간 따라 평소처럼 다녀올래.",
      "근처에 같이 나올 친구 있나 연락해볼래.",
      "음악 없이 뛰면 느낌이 얼마나 다른지 살펴볼래.",
    ]),
  },
  {
    id: 9,
    text: "친구가 “오늘 러닝 어땠어?” 하면 무슨 얘기부터 할 것 같아?",
    options: options([
      "“맨날 멀게 느껴지던 데까지 오늘은 갔다 왔어.”",
      "“계속 불편하던 게 있었는데, 이유를 좀 알 것 같아.”",
      "“별 얘기 아닌데 같이 뛰다가 엄청 웃었어.”",
      "“자주 가는 길인데 오늘은 분위기가 좀 다르더라.”",
    ]),
  },
  {
    id: 10,
    text: "친구가 강추한 코스를 뛰어봤는데 좀 애매했다면, 다음엔 어떻게 할래?",
    options: options([
      "추천한 친구랑 같이 한번 더 와볼래.",
      "내 취향에 맞는 다른 길을 찾아볼래.",
      "이번엔 정해둔 구간까지 다 가보고 판단할래.",
      "길이 별로였는지 시간대가 안 맞았는지 생각해볼래.",
    ]),
  },
  {
    id: 11,
    text: "뛰고 온 날을 떠올려보면, 은근히 오래 기억나는 건 어떤 순간이야?",
    hint: "아직 안 뛰어봤다면, 어떤 순간이 기억에 남을지 골라봐.",
    options: options([
      "우연히 들어간 골목에서 생각지도 못한 풍경을 봤을 때.",
      "다 뛰고 편의점 앞에서 한참 수다 떨었을 때.",
      "사소한 걸 바꿨는데 훨씬 편해졌을 때.",
      "나가기 그렇게 귀찮았는데 결국 다녀왔을 때.",
    ]),
  },
  {
    id: 12,
    text: "토요일에 뛰려고 했는데 다른 일정이 끼어들면, 계획을 어떻게 바꿀래?",
    options: options([
      "이번엔 준비하면서 번거로웠던 걸 정리해 다음번을 편하게 만들래.",
      "짧게라도 다녀올 수 있게 시간을 다시 나눠볼래.",
      "다른 볼일 보러 나가는 길에 잠깐 걷는 걸로 바꿀래.",
      "같이 뛰기로 한 친구랑 다른 날을 바로 잡을래.",
    ]),
  },
];

type ScorePair = readonly [RunningType, RunningType];
// 문항/선택지 순서와 동일. 앞 유형 +2, 뒤 유형 +1. 화면 문구와 분리한다.
export const runningScorePairs: ReadonlyArray<readonly [ScorePair, ScorePair, ScorePair, ScorePair]> = [
  [["record", "scenery"], ["crew", "record"], ["scenery", "crew"], ["explorer", "record"]],
  [["scenery", "explorer"], ["record", "explorer"], ["explorer", "record"], ["crew", "explorer"]],
  [["explorer", "record"], ["scenery", "explorer"], ["crew", "explorer"], ["record", "explorer"]],
  [["crew", "scenery"], ["explorer", "record"], ["record", "scenery"], ["scenery", "crew"]],
  [["record", "crew"], ["scenery", "crew"], ["explorer", "crew"], ["crew", "scenery"]],
  [["explorer", "record"], ["crew", "record"], ["scenery", "crew"], ["record", "explorer"]],
  [["crew", "explorer"], ["explorer", "record"], ["record", "explorer"], ["scenery", "crew"]],
  [["scenery", "explorer"], ["record", "scenery"], ["crew", "scenery"], ["explorer", "scenery"]],
  [["record", "explorer"], ["explorer", "record"], ["crew", "scenery"], ["scenery", "explorer"]],
  [["crew", "scenery"], ["scenery", "explorer"], ["record", "explorer"], ["explorer", "scenery"]],
  [["scenery", "explorer"], ["crew", "scenery"], ["explorer", "record"], ["record", "explorer"]],
  [["explorer", "record"], ["record", "explorer"], ["scenery", "explorer"], ["crew", "record"]],
];

export const runningProfiles: RunningProfile[] = [
  {
    slug: "record", name: "작은 완주를 쌓는 러너", icon: "🏁",
    tagline: "거창한 기록보다, 오늘 해냈다는 게 중요해.",
    description: "너는 작은 약속을 하나씩 지켜갈 때 달리는 재미가 커지는 편이야. 멀리, 빠르게 뛰는 것만 목표는 아니야. 귀찮아도 한번 나가본 날, 지난번에 멀게 느껴졌던 곳에 도착한 날처럼 나만 아는 변화가 뿌듯한 거지. 그렇게 쌓인 작은 완주가 다음번에도 신발을 신게 만들어.",
    behaviors: ["‘언제 한번’보다는 날짜부터 잡는 편이야.", "다녀온 날은 달력에 표시라도 하나 남기고 싶어.", "남의 기록보다 지난번의 내가 더 신경 쓰여."],
    secondaryText: "마음이 내킬 때뿐 아니라, 작게라도 약속을 지켜내는 재미도 알고 있어.",
    suggestion: "다음번엔 숫자 말고 ‘오늘 만족한 점’도 한 줄 남겨봐. 의외의 완주가 보일지도 몰라.",
  },
  {
    slug: "crew", name: "함께할 때 더 즐거운 러너", icon: "🙌",
    tagline: "뛰고 나서 나누는 수다까지 러닝이지.",
    description: "너에게 러닝은 좋은 사람들과 시간을 나누는 방법이기도 해. 누군가와 약속하면 나가는 발걸음이 가벼워지고, 같이 웃었던 순간이 다음 러닝을 기다리게 하지. 꼭 큰 모임일 필요도 없어. 잘 맞는 친구 한 명만 있어도 평범한 코스가 꽤 재미있어지는 편이야.",
    behaviors: ["코스 얘기를 하다가 끝나고 먹을 것까지 정해.", "몇 km 뛰었는지보다 누구랑 웃었는지가 기억나.", "괜찮은 곳을 발견하면 같이 올 사람부터 떠올라."],
    secondaryText: "혼자만의 재미에 더해, 누군가와 나누는 시간에서도 힘을 얻는 편이야.",
    suggestion: "다음 약속엔 서로 원하는 시간과 코스를 먼저 얘기해봐. 같이 즐길 구간을 찾는 것도 재미니까.",
  },
  {
    slug: "scenery", name: "자기만의 리듬으로 달리는 러너", icon: "🌿",
    tagline: "오늘도 마음에 드는 장면 하나 챙겼다.",
    description: "너는 달리는 동안 만나는 분위기와 순간에 마음이 움직이는 편이야. 늘 가던 길도 빛이나 소리가 달라지면 새로운 코스처럼 느껴지지. 계획이 조금 바뀌어도 그 안에서 재미를 찾고, 숫자로 남기지 못한 날도 충분히 좋은 러닝이었다고 생각할 수 있어.",
    behaviors: ["괜찮아 보이는 옆길에 자연스럽게 눈이 가.", "같은 코스에서도 그날만의 분위기를 발견해.", "기록을 놓쳐도 기분 좋게 다녀왔으면 괜찮아."],
    secondaryText: "정해진 계획 속에서도 그날의 분위기를 즐길 여유를 챙기는 편이야.",
    suggestion: "다녀온 뒤 오늘 가장 좋았던 장면에 제목을 붙여봐. 나만의 러닝 일기가 될 거야.",
  },
  {
    slug: "explorer", name: "나에게 맞는 방법을 찾는 러너", icon: "🔎",
    tagline: "조금 바꿨을 뿐인데, 이거 꽤 괜찮네?",
    description: "너는 작은 차이를 발견하고 직접 확인하는 과정이 재미있는 편이야. 오늘은 왜 편했는지, 평소와 무엇이 달랐는지 한번 더 생각해보지. 새 장비를 많이 사야 하는 건 아니야. 이미 가진 것의 설정이나 사용법을 조금 바꾸며 나한테 맞는 방법을 찾아가는 것도 충분히 즐거워.",
    behaviors: ["‘그냥 좋다’에서 끝나지 않고 이유가 궁금해.", "불편한 게 생기면 작은 것부터 바꿔보는 편이야.", "직접 써보고 알게 된 차이를 은근히 잘 기억해."],
    secondaryText: "즐기는 와중에도 작은 차이를 알아채고, 나에게 맞게 조정하는 재미가 있어.",
    suggestion: "다음번엔 지금 쓰는 물건 하나의 좋은 점과 아쉬운 점을 적어봐. 새로 사지 않아도 발견할 게 있어.",
  },
];

export const getRunningProfile = (slug: string) => runningProfiles.find((profile) => profile.slug === slug);
export const RUNNING_TEST_PATH = "/tests/running-personality-test";
export const runningResultPath = (slug: RunningType) => `/running-personality-test/result/${slug}`;

export const runningTest: TestDefinition = {
  slug: "running-personality-test",
  title: "나는 어떤 러너?",
  shortTitle: "러닝 성향 테스트",
  description: "넌 무슨 재미로 뛰는 편이야? 12개만 골라봐. 아직 안 뛰어봤어도 괜찮아. ‘나라면 이럴 듯?’ 싶은 걸 고르면 돼!",
  category: "직업.일상",
  duration: "약 2분",
  icon: "🏃",
  accent: "green",
  questions: runningQuestions,
  resultSlugs: runningProfiles.map(({ slug }) => slug),
  participants: 0,
  isNew: true,
  createdAt: "2026-10-06",
  itemCount: 12,
  tags: ["러닝", "달리기", "취미", "성향", "운동"],
  relatedTests: ["sns-type-test", "coffee-brand-test", "personality-country-test"],
  disclaimer: "러닝 취향을 가볍게 알아보는 재미용 테스트야.",
  seoTitle: "러닝 성향 테스트 | 나는 어떤 러너?",
  seoDescription: "러닝 전후의 자연스러운 상황 12개로 알아보는 나의 러닝 성향. 입문자도 상상하며 고를 수 있는 4지선다 테스트로 나만의 달리는 재미를 찾아봐!",
  keywords: ["러닝 성향 테스트", "러닝 테스트", "러너 유형", "달리기 테스트", "러닝 취향", "러닝 입문"],
  seoContent: {
    heading: "러닝에도 각자의 재미가 있어",
    paragraphs: [
      "같은 길을 뛰어도 기억에 남는 건 다를 수 있어. 작은 목표를 해낸 순간, 친구와 나눈 대화, 우연히 만난 풍경, 나한테 맞는 방법을 찾은 순간까지. 이 테스트는 네가 어떤 재미에 끌리는지 가볍게 돌아보는 시간이야.",
      "러닝 전후에 생길 법한 12가지 상황에서 가장 가까운 답을 하나씩 골라봐. 달리기를 얼마나 잘하는지 묻지 않으니까, 경험이 없어도 ‘나라면 어떨까?’ 하고 상상하면 돼.",
      "결과에서는 네 러닝 유형과 함께 나타난 성향을 볼 수 있어. 실력이나 체력을 평가하는 점수는 아니야. 친구와 결과를 나누며 다음 러닝 이야기를 시작해봐.",
    ],
    faqs: [
      ["러닝을 안 해봤어도 할 수 있어?", "물론이지! 처음 겪는 상황은 내가 어떻게 할지 상상하며 골라봐. 기록이나 전문 지식은 필요 없어."],
      ["결과는 몇 가지야?", "작은 완주를 쌓는 러너, 함께할 때 더 즐거운 러너, 자기만의 리듬으로 달리는 러너, 나에게 맞는 방법을 찾는 러너까지 네 가지야."],
      ["결과로 러닝 실력도 알 수 있어?", "이건 취향을 가볍게 알아보는 재미용 테스트야. 운동 능력이나 체력, 건강 상태를 평가하는 건 아니야."],
    ],
    assesses: "러닝을 즐기는 동기와 취향",
  },
};
