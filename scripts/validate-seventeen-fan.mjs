import assert from "node:assert/strict";
import fs from "node:fs";

const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/seventeen-true-fan.json", import.meta.url), "utf8"));
const questions = bank.questions.filter((question) => question.verificationStatus === "검증 완료");
const quotas = { 초급: 5, 중급: 6, 고급: 4 };
const albumTokens = ["SEVENTEENTH HEAVEN", "YOU MADE MY DAWN", "YOU MAKE MY DAY", "SPILL THE FEELS", "HAPPY BURSTDAY", "Face the Sun", "LOVE&LETTER", "17 CARAT", "SECTOR 17", "Heng:garae", "Your Choice", "Attacca", "Semicolon", "BOYS BE", "FML", "Al1"];

function hash(seed) { let value = 2166136261; for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619); return value >>> 0; }
function randomFactory(seed) { let state = hash(seed) || 1; return () => { state += 0x6d2b79f5; let v = state; v = Math.imul(v ^ v >>> 15, v | 1); v ^= v + Math.imul(v ^ v >>> 7, v | 61); return ((v ^ v >>> 14) >>> 0) / 4294967296; }; }
function shuffle(items, seed) { const random = randomFactory(seed); const next = [...items]; for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; } return next; }
function birthday(q) { return q.type.includes("생일") || q.prompt.includes("생일"); }
function album(q) { const text = [q.prompt, q.explanation, ...q.seoKeywords].join(" ").toLowerCase(); return albumTokens.find((token) => text.includes(token.toLowerCase())) ?? null; }
function valid(items) { if (items.filter(birthday).length > 2) return false; const counts = new Map(); for (const q of items) { const key = album(q); if (!key) continue; const count = (counts.get(key) ?? 0) + 1; if (count > 2) return false; counts.set(key, count); } return true; }
function session(seed) { for (let attempt = 0; attempt < 200; attempt++) { const picked = Object.entries(quotas).flatMap(([difficulty, count]) => shuffle(questions.filter((q) => q.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`).slice(0, count)); if (!valid(picked)) continue; return shuffle(picked, `${seed}:${attempt}:questions`).map((q) => { const order = shuffle([0,1,2,3], `${seed}:${q.id}:options`); return { ...q, order, shuffledChoices: order.map((i) => q.choices[i]), shuffledAnswerIndex: order.indexOf(q.answerIndex) }; }); } throw new Error("session generation failed"); }
function grade(score) { return bank.scoring.tiers.find((tier) => score >= tier.min && score <= tier.max)?.name; }

assert.equal(bank.questions.length, 60);
assert.equal(questions.length, 60);
assert.equal(new Set(questions.map((q) => q.id)).size, 60);
for (const difficulty of Object.keys(quotas)) assert.equal(questions.filter((q) => q.difficulty === difficulty).length, 20);
for (const q of questions) {
  assert.equal(q.choices.length, 4, q.id);
  assert.equal(new Set(q.choices).size, 4, q.id);
  assert.equal(q.choices[q.answerIndex], q.answerText, q.id);
  assert.equal(q.answerKey, ["A","B","C","D"][q.answerIndex], q.id);
  assert.ok(q.explanation, q.id);
  assert.ok(q.verifiedAt, q.id);
  assert.ok(q.sources.length >= 2, q.id);
  assert.ok(q.sources.every((source) => /^https?:\/\//.test(source.url)), q.id);
}
for (const [score, expected] of [[0,"입덕 준비 중"],[3,"입덕 준비 중"],[4,"캐럿 새싹"],[6,"캐럿 새싹"],[7,"열공 캐럿"],[9,"열공 캐럿"],[10,"검증된 캐럿"],[11,"검증된 캐럿"],[12,"찐캐럿"],[13,"찐캐럿"],[14,"다이아몬드급 찐캐럿"],[15,"다이아몬드급 찐캐럿"]]) assert.equal(grade(score), expected);

const positionCounts = [0,0,0,0];
const questionCounts = new Map();
for (let run = 0; run < 1000; run++) {
  const selected = session(`simulation-${run}`);
  assert.equal(selected.length, 15);
  assert.equal(new Set(selected.map((q) => q.id)).size, 15);
  for (const [difficulty, count] of Object.entries(quotas)) assert.equal(selected.filter((q) => q.difficulty === difficulty).length, count);
  assert.ok(selected.filter(birthday).length <= 2);
  assert.ok(valid(selected));
  for (const q of selected) {
    assert.equal(q.shuffledChoices[q.shuffledAnswerIndex], q.answerText, q.id);
    positionCounts[q.shuffledAnswerIndex]++;
    questionCounts.set(q.id, (questionCounts.get(q.id) ?? 0) + 1);
  }
}
const minPosition = Math.min(...positionCounts), maxPosition = Math.max(...positionCounts);
assert.ok(maxPosition / minPosition < 1.15, `정답 위치 편향: ${positionCounts}`);
assert.equal(questionCounts.size, 60);
const frequencyByDifficulty = Object.fromEntries(Object.keys(quotas).map((difficulty) => {
  const values = questions.filter((q) => q.difficulty === difficulty).map((q) => questionCounts.get(q.id) ?? 0);
  assert.ok(Math.max(...values) / Math.min(...values) < 1.45, `${difficulty} 문항 출제 편향: ${Math.min(...values)}~${Math.max(...values)}`);
  return [difficulty, { min: Math.min(...values), max: Math.max(...values) }];
}));
console.log(JSON.stringify({ questions: questions.length, difficulty: { 초급: 20, 중급: 20, 고급: 20 }, simulations: 1000, answerPositions: positionCounts, questionFrequencyByDifficulty: frequencyByDifficulty, status: "PASS" }, null, 2));
