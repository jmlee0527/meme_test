import assert from "node:assert/strict";
import fs from "node:fs";

const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/lionel-messi-true-fan.json", import.meta.url), "utf8"));
const questions = bank.questions.filter((question) => question.verificationStatus === "verified");
const quota = bank.sampling.difficultyQuota;
const areaMatchers = {
  barcelona: ["바르셀로나", "라리가", "챔피언스리그", "헤타페", "엘클라시코", "500골", "600골"],
  argentina: ["아르헨티나", "U20", "대표팀", "월드컵", "올림픽", "코파아메리카", "피날리시마"],
  psg: ["PSG"],
  interMiami: ["인터마이애미", "현재소속"],
};

function hash(seed) {
  let value = 2166136261;
  for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return value >>> 0;
}

function rng(seed) {
  let state = hash(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, seed) {
  const random = rng(seed);
  const array = [...items];
  for (let index = array.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [array[index], array[swapIndex]] = [array[swapIndex], array[index]];
  }
  return array;
}

function hasArea(question, area) {
  return question.tags.some((tag) => areaMatchers[area].includes(tag));
}

function hasAny(items, area) {
  return items.some((question) => hasArea(question, area));
}

function valid(items, relaxed = false) {
  const numericRecordCount = items.filter((question) => question.tags.some((tag) => ["기록", "득점", "시즌기록", "수상", "개인수상"].includes(tag))).length;
  return items.length === 12 &&
    new Set(items.map((question) => question.factGroup)).size === items.length &&
    hasAny(items, "barcelona") &&
    hasAny(items, "argentina") &&
    hasAny(items, "psg") &&
    hasAny(items, "interMiami") &&
    (relaxed || numericRecordCount <= 4);
}

function session(seed) {
  for (let attempt = 0; attempt < 1500; attempt++) {
    const picked = [];
    for (const [difficulty, count] of Object.entries(quota)) {
      for (const question of shuffle(questions.filter((item) => item.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`)) {
        if (picked.some((item) => item.factGroup === question.factGroup)) continue;
        picked.push(question);
        if (picked.filter((item) => item.difficulty === difficulty).length === count) break;
      }
    }
    if (!valid(picked, attempt >= 1000)) continue;
    return shuffle(picked, `${seed}:questions`).map((question) => {
      const order = shuffle([0, 1, 2, 3], `${seed}:${question.id}:options`);
      return { ...question, order, shuffled: order.map((index) => question.options[index]), shuffledAnswer: order.indexOf(question.answerIndex) };
    });
  }
  throw new Error(`Messi session failed: ${seed}`);
}

assert.equal(bank.questions.length, 60);
assert.equal(questions.length, 60);
assert.equal(new Set(questions.map((question) => question.id)).size, 60);
assert.deepEqual(Object.fromEntries(Object.keys(quota).map((difficulty) => [difficulty, questions.filter((question) => question.difficulty === difficulty).length])), { easy: 19, medium: 26, hard: 15 });
assert.deepEqual(quota, { easy: 4, medium: 5, hard: 3 });

for (const question of questions) {
  assert.equal(question.options.length, 4, `${question.id}: 4 options`);
  assert.equal(new Set(question.options).size, 4, `${question.id}: unique options`);
  assert.equal(question.options[question.answerIndex], question.answer, `${question.id}: answer index`);
  assert.ok(question.explanation, `${question.id}: explanation`);
  assert.ok(question.tags.length, `${question.id}: tags`);
  assert.ok(question.sourceIds.length, `${question.id}: sources`);
  for (const sourceId of question.sourceIds) assert.ok(bank.sources[sourceId]?.url, `${question.id}: ${sourceId}`);
}

assert.deepEqual([0, 1, 2, 3].map((index) => questions.filter((question) => question.answerIndex === index).length), [15, 15, 15, 15]);
for (let score = 0; score <= 12; score++) assert.equal(bank.scoring.resultTiers.filter((tier) => score >= tier.min && score <= tier.max).length, 1, `${score}: tier`);

const positions = [0, 0, 0, 0];
for (let index = 0; index < 1000; index++) {
  const picked = session(`validate-${index}`);
  assert.equal(picked.length, 12);
  assert.equal(new Set(picked.map((question) => question.id)).size, 12);
  assert.equal(new Set(picked.map((question) => question.factGroup)).size, 12);
  assert.deepEqual(Object.fromEntries(Object.keys(quota).map((difficulty) => [difficulty, picked.filter((question) => question.difficulty === difficulty).length])), quota);
  assert.ok(hasAny(picked, "barcelona"));
  assert.ok(hasAny(picked, "argentina"));
  assert.ok(hasAny(picked, "psg"));
  assert.ok(hasAny(picked, "interMiami"));
  for (const question of picked) {
    assert.equal(question.shuffled[question.shuffledAnswer], question.answer);
    positions[question.shuffledAnswer]++;
  }
}

for (const count of positions) assert.ok(Math.abs(count - 3000) < 420);
console.log(JSON.stringify({ questions: questions.length, quota, answerPositions: positions, status: "PASS" }, null, 2));
