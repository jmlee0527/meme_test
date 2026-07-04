import { kkondaePointLabels, kkondaeResultProfiles } from "@/data/kkondae-power";

export function parseKkondaeAnswers(value?:string): number[] | null {
  if (!value || !/^[0-3]{10}$/.test(value)) return null;
  return [...value].map(Number);
}

export function serializeKkondaeAnswers(answers:number[]) { return answers.join(""); }
export function calculateKkondaeScore(answers:number[]) { return answers.length === 10 ? answers.reduce((sum, value) => sum + value, 0) : 0; }
export function calculateKkondaeResult(answers:number[]) {
  const score = calculateKkondaeScore(answers);
  const profile = kkondaeResultProfiles.find((item) => score >= item.minScore && score <= item.maxScore) ?? kkondaeResultProfiles[0];
  return { profile, score, percentage:Math.round((score / 30) * 100), points:getKkondaePoints(answers) };
}

export function getKkondaePoints(answers:number[]) {
  return answers.map((score,index)=>({ label:kkondaePointLabels[index], score })).filter((item)=>item.score >= 2).sort((a,b)=>b.score-a.score).slice(0,3);
}
