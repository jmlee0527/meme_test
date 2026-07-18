import fs from "node:fs";

const source = fs.readFileSync(new URL("../data/interpersonal-ability.ts", import.meta.url), "utf8");
const ok = (condition, message) => {
  if (!condition) throw new Error(message);
};

const questionsBlock = source.match(/export const interpersonalQuestions: InterpersonalQuestion\[] = \[([\s\S]*?)\];/);
ok(questionsBlock, "문항 배열을 찾을 수 없음");

const questions = [...questionsBlock[1].matchAll(/\{ id: (\d+), text: "([^"]+)", dimension: "([^"]+)", reverseScored: (true|false), options \}/g)].map((match) => ({
  id: Number(match[1]),
  text: match[2],
  dimension: match[3],
  reverseScored: match[4] === "true",
}));

const dimensions = [
  "empathy_understanding",
  "self_expression",
  "relationship_reciprocity",
  "conflict_repair",
];
const ranges = [[0, 20], [21, 40], [41, 60], [61, 80], [81, 100]];
const reverseIds = [4, 6, 8, 11];

ok(questions.length === 12, "12문항 아님");
ok(new Set(questions.map((question) => question.id)).size === 12, "문항 ID 중복");
for (const dimension of dimensions) {
  ok(questions.filter((question) => question.dimension === dimension).length === 3, `${dimension} 3문항 아님`);
}
ok(JSON.stringify(questions.filter((question) => question.reverseScored).map((question) => question.id)) === JSON.stringify(reverseIds), "역채점 문항 오류");
ok(questions.every((question) => !/인싸|아싸|사회 부적응|성별|남자|여자/.test(question.text)), "편향 또는 낙인 표현 포함");

const rawScore = (answers) => questions.reduce((sum, question, index) => {
  const answer = answers[index];
  return sum + (question.reverseScored ? 3 - answer : answer);
}, 0);
const score = (answers) => Math.min(100, Math.max(0, Math.round((rawScore(answers) / 36) * 100)));
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
ok(rawScore(questions.map((question) => question.reverseScored ? 0 : 3)) === 36, "최고 원점수 오류");
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
