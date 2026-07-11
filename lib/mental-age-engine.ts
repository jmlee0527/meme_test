import { mentalAgeDomains, mentalAgeQuestions, mentalAgeResults, type MentalAgeCategory, type MentalAgeDomain, type MentalAgeQuestion, type MentalAgeScores } from "@/data/mental-age";

const domains = mentalAgeDomains.map(([key]) => key) as MentalAgeDomain[];
const quotas: Record<MentalAgeCategory, number> = { emotion: 2, planning: 2, curiosity: 2, social: 2, lifestyle: 2, change: 2, selfControl: 3 };

function seeded(seed: number) {
  let state = Math.abs(seed) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

export type MentalAgeSessionQuestion = MentalAgeQuestion & { optionOrder: string[] };

/** 7개 영역의 출제 수를 고정해 특정 성향 문항이 한 번에 몰리지 않게 합니다. */
export function selectMentalAgeQuestions(seed: number): MentalAgeSessionQuestion[] {
  const random = seeded(seed);
  const usedTags = new Set<string>();
  const selected: MentalAgeQuestion[] = [];
  (Object.keys(quotas) as MentalAgeCategory[]).forEach((category) => {
    const candidates = shuffle(mentalAgeQuestions.filter((question) => question.category === category), random);
    const count = quotas[category];
    for (const question of candidates) {
      if (selected.filter((item) => item.category === category).length >= count) break;
      if (question.tags.some((tag) => usedTags.has(tag))) continue;
      selected.push(question);
      question.tags.forEach((tag) => usedTags.add(tag));
    }
    // 태그 중복을 피할 수 없는 경우에도 카테고리 균형은 우선 보장합니다.
    for (const question of candidates) {
      if (selected.filter((item) => item.category === category).length >= count) break;
      if (!selected.some((item) => item.id === question.id)) selected.push(question);
    }
  });
  return shuffle(selected, random).map((question) => ({ ...question, optionOrder: shuffle(question.options.map((option) => option.id), random) }));
}

export function calculateMentalAgeScores(questions: MentalAgeSessionQuestion[], answers: Record<string, string>): MentalAgeScores {
  const raw = Object.fromEntries(domains.map((domain) => [domain, 0])) as MentalAgeScores;
  const min = Object.fromEntries(domains.map((domain) => [domain, 0])) as MentalAgeScores;
  const max = Object.fromEntries(domains.map((domain) => [domain, 0])) as MentalAgeScores;
  questions.forEach((question) => {
    const answer = question.options.find((option) => option.id === answers[question.id]);
    domains.forEach((domain) => {
      const values = question.options.map((option) => option.scores[domain] ?? 0);
      min[domain] += Math.min(...values);
      max[domain] += Math.max(...values);
      raw[domain] += answer?.scores[domain] ?? 0;
    });
  });
  return Object.fromEntries(domains.map((domain) => {
    const range = max[domain] - min[domain];
    return [domain, Math.round(range === 0 ? 50 : ((raw[domain] - min[domain]) / range) * 100)];
  })) as MentalAgeScores;
}

export function calculateMentalAge(scores: MentalAgeScores) {
  const stable = (scores.emotionalRegulation + scores.responsibility + scores.planning + scores.selfControl + scores.practicalThinking) / 5;
  const vital = (scores.curiosity + scores.spontaneity + scores.flexibility + scores.socialOpenness + scores.optimismPlayfulness) / 5;
  const age = Math.round(Math.max(12, Math.min(65, 38 + (stable - 50) * 0.34 - (vital - 50) * 0.25 + (scores.practicalThinking - 50) * 0.08)));
  const result = mentalAgeResults.find((item) => age >= item.minAge && (item.maxAge === null || age <= item.maxAge)) ?? mentalAgeResults[8];
  return { age, stable: Math.round(stable), vital: Math.round(vital), result };
}

const domainAdjectives: Record<MentalAgeDomain, string> = {
  emotionalRegulation: "감정을 가다듬는 힘", responsibility: "맡은 일을 챙기는 책임감", planning: "다음을 준비하는 계획성", selfControl: "순간을 조절하는 힘", practicalThinking: "상황을 현실적으로 보는 감각",
  curiosity: "새로움을 탐색하는 호기심", spontaneity: "순간을 즐기는 즉흥성", flexibility: "관점을 바꾸는 유연성", socialOpenness: "사람과 연결되는 개방성", optimismPlayfulness: "일상에 재미를 더하는 놀이성",
};

export function createMentalAgeInsight(scores: MentalAgeScores, stable: number, vital: number) {
  const ordered = [...domains].sort((left, right) => scores[right] - scores[left]);
  const top = ordered.slice(0, 2).map((domain) => domainAdjectives[domain]);
  const support = domainAdjectives[ordered.at(-1)!];
  const balance = Math.abs(stable - vital) <= 10
    ? "안정·숙고 성향과 활력·탐색 성향이 비슷하게 나타나, 상황에 따라 차분한 판단과 새로운 시도를 모두 꺼낼 수 있습니다."
    : stable > vital
      ? "현실적인 기준과 준비를 먼저 두는 편이지만, 새로운 경험을 완전히 닫아두기보다 작은 변화로 리듬을 넓혀갈 수 있습니다."
      : "새로운 자극과 유연한 선택에서 에너지를 얻는 편이지만, 필요한 순간에는 나만의 기준을 세워 경험을 더 오래 이어갈 수 있습니다.";
  return { top, support, text: `이번 응답에서는 ${top.join("과 ")} 특히 두드러졌습니다. ${balance} 조금 더 의식적으로 돌보면 좋은 영역은 ${support}입니다.` };
}

export function formatAgeDifference(actualAge: number | null, mentalAge: number) {
  if (!actualAge) return null;
  const difference = mentalAge - actualAge;
  if (Math.abs(difference) <= 2) return "실제 나이와 비슷한 리듬의 사고방식이 나타났어요.";
  return difference < 0
    ? `실제 나이보다 ${Math.abs(difference)}살 젊은 사고방식 이미지가 나타났어요.`
    : `실제 나이보다 ${difference}살 더 신중한 사고방식 이미지가 나타났어요.`;
}
