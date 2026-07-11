import rawQuestionPool from "@/data/young-old/verified-meme-question-pool.json";
import type { TestDefinition } from "@/lib/types";

export type MemeQuestionType = "relatedPerson" | "relatedGroup" | "originContent" | "originContext" | "meaning" | "usageContext" | "songOrMedia" | "connection" | "trendDetail";
export type TrendDifficulty = "easy" | "medium" | "hard";
export type Freshness = "hot" | "current" | "steady" | "legacy";
export const trendDimensions = [["memeSource", "밈 출처력"], ["memeContext", "밈 맥락력"], ["memeUsage", "밈 활용력"], ["contentConnection", "콘텐츠 연결력"], ["trendDetection", "최신 유행 감지력"]] as const;
export type TrendDimension = (typeof trendDimensions)[number][0];
export type TrendDimensionScores = Record<TrendDimension, number>;
export type TrendCategory = "meme" | "slang" | "socialMedia" | "shortForm" | "digitalLife";

type SourceRecord = { sourceName: string; sourceTitle?: string; sourceUrl?: string; sourceType: string; checkedAt: string };
export type TrendSenseQuestion = { id: string; memeId: string; subjectIds: string[]; type: MemeQuestionType; category: TrendCategory; difficulty: TrendDifficulty; freshness: Freshness; prompt: string; options: { id: string; text: string; isCorrect: boolean }[]; correctOptionId: string; explanation: string; sourceRecords: SourceRecord[]; verifiedAt: string; reviewAt: string; tags: string[] };

const categoryByType: Record<MemeQuestionType, TrendCategory> = { relatedPerson: "meme", relatedGroup: "meme", originContent: "meme", originContext: "slang", meaning: "slang", usageContext: "socialMedia", songOrMedia: "shortForm", connection: "shortForm", trendDetail: "digitalLife" };
type RawQuestion = Omit<TrendSenseQuestion, "prompt" | "subjectIds" | "category"> & { question: string };
const raw = rawQuestionPool as { metadata: { title: string; version: string; questionCount: number; uniqueMemeCount: number; sessionQuestionCount: number }; questions: RawQuestion[] };

// 첨부 JSON의 표현·정답·해설은 변형하지 않습니다. subjectIds는 원본 JSON에 없어 memeId를 단일 핵심 소재 ID로 사용합니다.
export const allTrendQuestions: TrendSenseQuestion[] = raw.questions.map((question) => ({ ...question, prompt: question.question, subjectIds: [question.memeId], category: categoryByType[question.type] }));
export const trendPoolMetadata = raw.metadata;
export const latestTrendVerifiedAt = [...allTrendQuestions].map((question) => question.verifiedAt).sort().at(-1) ?? raw.metadata.version;
export const getExpiredTrendQuestions = (today = new Date().toISOString().slice(0, 10)) => allTrendQuestions.filter((question) => question.reviewAt < today);
export const getActiveTrendQuestions = (today = new Date().toISOString().slice(0, 10)) => allTrendQuestions.filter((question) => question.reviewAt >= today);

export type TrendResultType = "young" | "old";
export type TrendResult = { type: TrendResultType; title: string; subtitle: string; shortDescription: string; fullDescription: string; strengths: string[]; cautions: string[]; recommendation: string; shareTextTemplates: string[]; imageAlt: string };
export const trendResults: Record<TrendResultType, TrendResult> = {
  young: { type: "young", title: "영크크", subtitle: "최신 밈의 출처와 쓰임을 함께 읽는 감각", shortDescription: "밈의 이름뿐 아니라 배경과 사용 맥락을 비교적 정확히 연결했어요.", fullDescription: "최신 유행을 단순히 많이 접한 것을 넘어, 어떤 콘텐츠에서 시작됐고 어떤 상황에서 쓰이는지까지 함께 파악하는 경향이 나타났습니다.", strengths: ["밈의 원본과 관련 인물을 연결하는 힘", "표현이 쓰이는 분위기를 읽는 감각", "노래·방송·챌린지의 연결 고리를 찾는 능력", "새로운 유행을 구분해 보는 관심"], cautions: ["모두가 같은 밈을 알고 있다고 가정하지 않기", "빠르게 바뀌는 유행 때문에 피로를 쌓지 않기", "모르는 사람에게는 맥락부터 친절하게 설명하기"], recommendation: "흥미로운 밈을 발견하면 원본 콘텐츠와 현재 쓰임을 함께 확인해 보세요.", shareTextTemplates: ["나는 영크크! 요즘력 지수 {score}점 나왔어. 너는 영크크일까, 늙크크일까?", "내 결과는 영크크 · {score}점! 최신 밈 퀴즈에 도전해 봐."], imageAlt: "영크크 결과를 표현한 밝은 밈 퀴즈 일러스트" },
  old: { type: "old", title: "늙크크", subtitle: "유행보다 나만의 취향과 익숙한 콘텐츠를 중시하는 감각", shortDescription: "최신 밈을 모두 외우기보다 관심 있는 콘텐츠를 선택해 즐기는 편일 수 있어요.", fullDescription: "이번 문제 세트에서는 최신 밈의 원본·확산 맥락보다 익숙한 콘텐츠와 명확한 소통 방식을 더 자주 선택했을 가능성이 있습니다. 이는 지식이나 능력의 우열이 아니라 관심 분야와 온라인 환경의 차이에 가깝습니다.", strengths: ["유행에 쉽게 휩쓸리지 않는 기준", "익숙한 콘텐츠를 깊이 즐기는 집중력", "필요한 정보만 가려 보는 태도", "나만의 취향을 분명히 아는 감각"], cautions: ["새 표현이 많은 대화에서는 원본 맥락을 한 번 확인하기", "관심 밖의 유행도 가끔은 가볍게 살펴보기", "낯선 밈을 모른다고 부담 느끼지 않기"], recommendation: "관심 있는 분야의 새 밈 하나를 골라 원본과 사용 예시를 함께 확인해 보세요.", shareTextTemplates: ["나는 늙크크! 요즘력 지수 {score}점. 유행보다 내 취향이 더 중요하대. 너도 테스트해 봐!", "내 결과는 늙크크 · {score}점! 최신 밈 퀴즈에서 몇 점 나오는지 확인해 봐."], imageAlt: "늙크크 결과를 표현한 편안하고 긍정적인 밈 퀴즈 일러스트" },
};

export const youngOldTest: TestDefinition = { type: "quiz", slug: "young-old", title: "나는 영크크? 늙크크?", shortTitle: "영크크 늙크크 테스트", description: "검증된 최신 밈 12문제로 나의 요즘력 지수를 확인해 보세요.", category: "성격.심리", duration: "약 3분", icon: "📱", thumbnail: "/tests/young-old.svg", participants: 2016, accent: "pink", isNew: true, itemCount: 12, questions: [], resultSlugs: [], seoTitle: "영크크 늙크크 테스트｜나는 영크크일까 늙크크일까? - 미미테스트", seoDescription: "검증된 최신 밈 12문제로 영크크와 늙크크를 확인해 보세요. 최종 판정과 함께 요즘력 지수, 밈 출처력과 맥락력을 확인할 수 있습니다.", keywords: ["영크크", "늙크크", "영크크 늙크크 테스트", "영크크 늙크크 기준", "요즘력 테스트", "트렌드 테스트", "밈 테스트", "신조어 테스트", "최신 밈 퀴즈"], seoContent: { heading: "영크크 늙크크 테스트란?", assesses: "최신 밈의 원본·맥락·활용 방식에 대한 친숙도", paragraphs: ["영크크 늙크크 테스트는 실제 나이나 세대를 판정하는 검사가 아닙니다. 검증된 최신 밈의 원본 콘텐츠, 관련 인물·그룹, 확산 맥락과 활용 방식을 12문제로 확인하는 재미형 퀴즈입니다.", "결과는 영크크 또는 늙크크 중 하나로 표시되지만, 두 결과 모두 우열을 뜻하지 않습니다. 최신 밈을 접하는 빈도와 관심 분야, 콘텐츠 이용 환경의 차이를 재미있게 표현합니다. 문항은 난이도와 문제 유형을 균형 있게 추출하며, 재검토 기한이 지난 문항은 출제하지 않습니다."], faqs: [["영크크와 늙크크는 실제 나이를 의미하나요?", "아니요. 최신 밈의 원본과 사용 맥락에 대한 현재의 친숙도를 재미있게 표현한 결과입니다."], ["늙크크가 나오면 시대에 뒤처졌다는 뜻인가요?", "아니요. 최신 밈보다 자신의 관심 콘텐츠를 더 우선해서 즐기는 유형일 수 있습니다."], ["영크크가 더 좋은 결과인가요?", "아니요. 두 결과는 우열이 아니라 밈과 콘텐츠를 접하는 환경의 차이를 나타냅니다."], ["문제는 어떤 기준으로 선정하나요?", "원본·공식 또는 보조 트렌드 출처를 함께 기록한 검증형 문제만 사용합니다."], ["테스트할 때마다 문제가 달라지나요?", "48개 문제 풀에서 난이도와 유형을 균형 있게 추출하므로 다시 참여하면 일부 문제가 달라집니다."], ["결과를 능력 평가나 심리검사로 활용할 수 있나요?", "아니요. 재미와 자기 탐색을 위한 콘텐츠이며 공식적인 심리검사나 능력 평가가 아닙니다."]], } };

export function validateTrendQuestions(today = new Date().toISOString().slice(0, 10)) {
  const ids = new Set<string>(); const memes = new Set<string>(); const active = getActiveTrendQuestions(today);
  for (const question of allTrendQuestions) {
    if (ids.has(question.id) || question.options.length !== 4 || new Set(question.options.map((option) => option.id)).size !== 4 || question.options.filter((option) => option.isCorrect).length !== 1 || question.options.find((option) => option.isCorrect)?.id !== question.correctOptionId || !question.explanation.trim() || question.sourceRecords.length < 2 || !question.verifiedAt || !question.reviewAt) throw new Error(`트렌드 문항 검증 실패: ${question.id}`);
    ids.add(question.id); memes.add(question.memeId);
  }
  if (allTrendQuestions.length !== 48 || memes.size !== 48 || Object.keys(trendResults).length !== 2) throw new Error("트렌드 문제 풀 크기 또는 결과 유형이 올바르지 않습니다.");
  if (active.filter((question) => question.difficulty === "easy").length < 4 || active.filter((question) => question.difficulty === "medium").length < 5 || active.filter((question) => question.difficulty === "hard").length < 3) throw new Error("활성 문항의 난이도별 수가 부족합니다.");
  return { total: allTrendQuestions.length, uniqueMemes: memes.size, active: active.length, expired: getExpiredTrendQuestions(today).map((question) => question.id) };
}
validateTrendQuestions();
