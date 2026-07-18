import fs from "node:fs";

const source = fs.readFileSync(new URL("../data/relationship-satisfaction.ts", import.meta.url), "utf8");
const ok = (condition, message) => {
  if (!condition) throw new Error(message);
};

const questionsBlock = source.match(/export const relationshipQuestions: RelationshipQuestion\[] = \[([\s\S]*?)\];/);
ok(questionsBlock, "문항 배열을 찾을 수 없음");

const questions = [...questionsBlock[1].matchAll(/\{ id: (\d+), text: "([^"]+)", dimension: "([^"]+)", reverseScored: (true|false), options \}/g)].map((match) => ({
  id: Number(match[1]),
  text: match[2],
  dimension: match[3],
  reverseScored: match[4] === "true",
}));

const dimensions = [
  "emotional_intimacy",
  "communication_conflict",
  "trust_respect",
  "reciprocity_daily_fit",
  "support_future_satisfaction",
];
const ranges = [[0, 20], [21, 40], [41, 60], [61, 80], [81, 100]];
const reverseIds = [3, 5, 8, 11, 14];

ok(questions.length === 15, "15문항 아님");
ok(new Set(questions.map((question) => question.id)).size === 15, "문항 ID 중복");
for (const dimension of dimensions) {
  ok(questions.filter((question) => question.dimension === dimension).length === 3, `${dimension} 3문항 아님`);
}
ok(JSON.stringify(questions.filter((question) => question.reverseScored).map((question) => question.id)) === JSON.stringify(reverseIds), "역채점 문항 오류");
ok(questions.every((question) => !/남자친구|여자친구|남친|여친/.test(question.text)), "성별 고정 표현 포함");

const rawScore = (answers) => questions.reduce((sum, question, index) => {
  const answer = answers[index];
  return sum + (question.reverseScored ? 3 - answer : answer);
}, 0);
const score = (answers) => Math.min(100, Math.max(0, Math.round((rawScore(answers) / 45) * 100)));
const dimensionScore = (dimension, answers) => {
  const raw = questions.reduce((sum, question, index) => {
    if (question.dimension !== dimension) return sum;
    const answer = answers[index];
    return sum + (question.reverseScored ? 3 - answer : answer);
  }, 0);
  return Math.min(100, Math.max(0, Math.round((raw / 9) * 100)));
};

ok(rawScore(questions.map((question) => question.reverseScored ? 3 : 0)) === 0, "최저 원점수 오류");
ok(score(questions.map((question) => question.reverseScored ? 3 : 0)) === 0, "최저 환산점 오류");
ok(rawScore(questions.map((question) => question.reverseScored ? 0 : 3)) === 45, "최고 원점수 오류");
ok(score(questions.map((question) => question.reverseScored ? 0 : 3)) === 100, "최고 환산점 오류");
for (const dimension of dimensions) {
  ok(dimensionScore(dimension, questions.map((question) => question.reverseScored ? 3 : 0)) === 0, `${dimension} 최저 영역점수 오류`);
  ok(dimensionScore(dimension, questions.map((question) => question.reverseScored ? 0 : 3)) === 100, `${dimension} 최고 영역점수 오류`);
}
for (const boundary of [0, 20, 21, 40, 41, 60, 61, 80, 81, 100]) {
  ok(ranges.some(([min, max]) => boundary >= min && boundary <= max), `점수 경계 ${boundary} 누락`);
}

console.log(JSON.stringify({
  questions: questions.length,
  dimensions: Object.fromEntries(dimensions.map((dimension) => [dimension, questions.filter((question) => question.dimension === dimension).map((question) => question.id)])),
  reverseIds,
  scoreRange: "PASS",
  boundaries: "PASS",
  status: "PASS",
}, null, 2));
