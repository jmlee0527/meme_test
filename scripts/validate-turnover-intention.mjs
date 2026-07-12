import assert from "node:assert/strict";
import fs from "node:fs";

// 이직 의향 테스트 문항·채점 로직 검증 (prebuild에서 실행)
// lib/turnover-intention-engine.ts와 동일한 규칙을 JSON 원본 기준으로 재검증합니다.
const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/turnover-intention.json", import.meta.url), "utf8"));
const questions = bank.questions;
const levels = bank.resultLevels;
const factors = ["direct_intention", "attachment", "growth", "compensation", "culture", "workload"];
const causeFactors = factors.slice(1);

// ── 문항 검수 ──
assert.equal(questions.length, 28, "총 28문항");
assert.equal(new Set(questions.map((q) => q.id)).size, 28, "id 중복 없음");
assert.equal(new Set(questions.map((q) => q.text)).size, 28, "동일 문항 없음");
const counts = Object.fromEntries(factors.map((f) => [f, questions.filter((q) => q.factor === f).length]));
assert.deepEqual(counts, { direct_intention: 8, attachment: 4, growth: 4, compensation: 4, culture: 4, workload: 4 }, "영역별 문항 수");
const reverseIds = questions.filter((q) => q.reverse).map((q) => q.id);
assert.ok(reverseIds.length >= 6 && reverseIds.length <= 8, `역채점 6~8문항 (현재 ${reverseIds.length})`);
for (const q of questions) {
  assert.ok(!/않지 않|없지 않|안 .*않/.test(q.text), `${q.id}: 이중 부정 의심 표현`);
  assert.ok(q.text.length >= 10 && q.text.length <= 60, `${q.id}: 문장 길이`);
}

// ── 채점 로직 (엔진과 동일 규칙) ──
const itemScore = (q, v) => (q.reverse ? 3 - v : v);
function calculate(answers) {
  assert.equal(answers.length, 28, "미응답 상태에서는 계산하지 않음");
  const raw = Object.fromEntries(factors.map((f) => [f, 0]));
  const max = Object.fromEntries(factors.map((f) => [f, 0]));
  questions.forEach((q, i) => { raw[q.factor] += itemScore(q, answers[i]); max[q.factor] += 3; });
  const norm = Object.fromEntries(factors.map((f) => [f, (raw[f] / max[f]) * 100]));
  const risk = Object.fromEntries(factors.map((f) => [f, f === "attachment" ? 100 - norm[f] : norm[f]]));
  const causeAvg = causeFactors.reduce((s, f) => s + risk[f], 0) / causeFactors.length;
  const overall = Math.round(risk.direct_intention * 0.5 + causeAvg * 0.5);
  const ranked = [...causeFactors].sort((a, b) => risk[b] - risk[a]);
  const top = Math.round(risk[ranked[0]]);
  const primary = ranked.filter((f) => Math.round(risk[f]) === top).slice(0, 2);
  return { overall, risk, primary };
}
const level = (score) => levels.find((l) => score >= l.minScore && score <= l.maxScore);

// 역채점 계산 확인
assert.equal(itemScore({ reverse: true }, 0), 3);
assert.equal(itemScore({ reverse: true }, 3), 0);
assert.equal(itemScore({ reverse: false }, 2), 2);

// 극단값: 전부 0점 / 전부 3점 선택
const all0 = calculate(Array(28).fill(0));
const all3 = calculate(Array(28).fill(3));
assert.ok(all0.overall >= 0 && all0.overall <= 100 && all3.overall >= 0 && all3.overall <= 100, "0~100 범위");
// 위험 방향 응답 헬퍼: attachment는 긍정 척도(위험 = 100 - 점수)이므로 방향이 반대입니다.
const riskAnswer = (q, wantMaxRisk) => {
  const highRisk = q.factor === "attachment" ? (q.reverse ? 3 : 0) : q.reverse ? 0 : 3;
  return wantMaxRisk ? highRisk : 3 - highRisk;
};
const maxRisk = questions.map((q) => riskAnswer(q, true));
const minRisk = questions.map((q) => riskAnswer(q, false));
assert.equal(calculate(maxRisk).overall, 100, "위험 최대 응답 = 100점");
assert.equal(calculate(minRisk).overall, 0, "위험 최소 응답 = 0점");
assert.equal(level(100).id, "high_readiness");
assert.equal(level(0).id, "stable");

// 결과 단계 경계 확인
assert.equal(level(19).id, "stable");
assert.equal(level(20).id, "light_exploration");
assert.equal(level(39).id, "light_exploration");
assert.equal(level(40).id, "considering");
assert.equal(level(59).id, "considering");
assert.equal(level(60).id, "active_consideration");
assert.equal(level(79).id, "active_consideration");
assert.equal(level(80).id, "high_readiness");
for (let s = 0; s <= 100; s++) assert.equal(levels.filter((l) => s >= l.minScore && s <= l.maxScore).length, 1, `${s}점 단일 단계`);

// 주요 원인 선정: growth만 위험 최대 → growth 단독 1위
const growthOnly = questions.map((q) => riskAnswer(q, q.factor === "growth"));
assert.deepEqual(calculate(growthOnly).primary, ["growth"], "growth 단독 1위");
// 동점 처리: growth와 compensation 동시 최대 → 상위 2개
const tie = questions.map((q) => riskAnswer(q, q.factor === "growth" || q.factor === "compensation"));
const tied = calculate(tie).primary;
assert.equal(tied.length, 2, "동점 2개 표시");
assert.deepEqual([...tied].sort(), ["compensation", "growth"], "동점 원인 조합");
// 3개 동점이어도 최대 2개까지만
const tie3 = questions.map((q) => riskAnswer(q, ["growth", "compensation", "culture"].includes(q.factor)));
assert.equal(calculate(tie3).primary.length, 2, "동점 최대 2개 제한");

// 가중치 확인: 직접 의향만 100, 원인 전부 0 → 50점
const directOnly = questions.map((q) => riskAnswer(q, q.factor === "direct_intention"));
assert.equal(calculate(directOnly).overall, 50, "직접 의향 50% 가중치");

// 미응답 시 계산 거부
assert.throws(() => calculate(Array(27).fill(1)), "미응답 계산 거부");

// 결과 데이터 필수 필드
for (const l of levels) assert.ok(l.title && l.summary && l.description && l.stayAdvice.length >= 3 && l.moveAdvice.length >= 3, `${l.id} 결과 필드`);
assert.equal(bank.resultFactors.length, 5, "원인 유형 5개");
for (const f of bank.resultFactors) assert.ok(causeFactors.includes(f.factor) && f.typeName && f.guide.length >= 3, `${f.factor} 원인 유형 필드`);

console.log(`validate-turnover-intention: 28문항(8/4/4/4/4/4)·역채점 ${reverseIds.length}개(${reverseIds.join(",")})·경계·동점·가중치 검증 통과`);
