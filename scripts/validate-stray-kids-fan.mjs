import assert from "node:assert/strict";
import fs from "node:fs";
const bank = JSON.parse(fs.readFileSync(new URL("../data/question-banks/stray-kids-true-fan.json", import.meta.url), "utf8"));
const questions = bank.questions.filter((q) => q.status === "verified_primary_source");
const quota = { easy: 5, medium: 6, hard: 4 }, weights = { easy: 1, medium: 2, hard: 3 };
function hash(seed) { let value = 2166136261; for (const char of seed) value = Math.imul(value ^ char.charCodeAt(0), 16777619); return value >>> 0; }
function rng(seed) { let state = hash(seed) || 1; return () => { state += 0x6d2b79f5; let v = state; v = Math.imul(v ^ v >>> 15, v | 1); v ^= v + Math.imul(v ^ v >>> 7, v | 61); return ((v ^ v >>> 14) >>> 0) / 4294967296; }; }
function shuffle(items, seed) { const random = rng(seed), next = [...items]; for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; } return next; }
function album(q) { return q.source.url.includes("DiscographyView") ? new URL(q.source.url).searchParams.get("AamSeq") : null; }
function recent(q) { return /\b202[56]\b/.test([q.question, q.answer, q.explanation, ...q.seoKeywords].join(" ")); }
function domains(q) { const text = `${q.category} ${q.question}`; return { profile: /멤버|프로필|그룹 기본/.test(text), chronology: /발매 순서|연대기|발매 연도/.test(text), track: /트랙|수록곡|앨범 구성/.test(text), credit: /유닛|피처링|크레딧|참여/.test(text) }; }
function valid(items) { const categories = new Map(), albums = new Map(), answers = new Map(); for (const q of items) { categories.set(q.category, (categories.get(q.category) ?? 0) + 1); answers.set(q.answer, (answers.get(q.answer) ?? 0) + 1); const key = album(q); if (key) albums.set(key, (albums.get(key) ?? 0) + 1); } const mapped = items.map(domains); return Math.max(...categories.values()) <= 4 && Math.max(...answers.values()) <= 2 && [...albums.values()].every((n) => n <= 2) && items.filter(recent).length <= 2 && ["profile","chronology","track","credit"].every((key) => mapped.some((d) => d[key])); }
function session(seed) { for (let attempt = 0; attempt < 500; attempt++) { const picked = Object.entries(quota).flatMap(([difficulty, count]) => shuffle(questions.filter((q) => q.difficulty === difficulty), `${seed}:${attempt}:${difficulty}`).slice(0, count)); if (!valid(picked)) continue; return shuffle(picked, `${seed}:${attempt}:questions`).map((q) => { const order = shuffle([0,1,2,3], `${seed}:${q.id}:options`); return { ...q, order, shuffled: order.map((i) => q.options[i]), shuffledAnswer: order.indexOf(q.answerIndex) }; }); } throw new Error(`세션 생성 실패: ${seed}`); }
function grade(score) { return bank.test.resultTiers.filter((tier) => score >= tier.minScore && score <= tier.maxScore); }

assert.equal(questions.length, 180); assert.equal(new Set(questions.map((q) => q.id)).size, 180); assert.equal(new Set(questions.map((q) => q.question)).size, 180);
for (const difficulty of Object.keys(quota)) assert.equal(questions.filter((q) => q.difficulty === difficulty).length, 60);
for (const q of questions) { assert.equal(q.options.length, 4, q.id); assert.equal(new Set(q.options).size, 4, q.id); assert.ok(q.answerIndex >= 0 && q.answerIndex <= 3, q.id); assert.equal(q.options[q.answerIndex], q.answer, q.id); assert.ok(q.explanation, q.id); assert.ok(/^https?:\/\//.test(q.source.url), q.id); }
assert.ok(Object.values(bank.validationReport.checks).every(Boolean)); assert.equal(bank.validationReport.structuralIssues.length, 0);
assert.equal(Object.entries(quota).reduce((sum, [difficulty, count]) => sum + weights[difficulty] * count, 0), 29);
for (let score = 0; score <= 29; score++) assert.equal(grade(score).length, 1, `${score}점 등급`);
const boundaries = [0,5,6,10,11,15,16,20,21,24,25,27,28,29]; for (const score of boundaries) assert.equal(grade(score).length, 1);

const answerPositions = [0,0,0,0], fingerprints = new Set();
for (let run = 0; run < 1000; run++) { const selected = session(`skz-${run}`); fingerprints.add(selected.map((q) => q.id).join(",")); assert.equal(selected.length, 15); assert.equal(new Set(selected.map((q) => q.id)).size, 15); assert.equal(new Set(selected.map((q) => q.question)).size, 15); for (const [difficulty, count] of Object.entries(quota)) assert.equal(selected.filter((q) => q.difficulty === difficulty).length, count); assert.ok(valid(selected)); for (const q of selected) { assert.equal(q.shuffled[q.shuffledAnswer], q.answer); answerPositions[q.shuffledAnswer]++; } }
assert.deepEqual(session("stable-seed").map((q) => [q.id,q.order]), session("stable-seed").map((q) => [q.id,q.order]));
assert.notDeepEqual(session("seed-a").map((q) => q.id), session("seed-b").map((q) => q.id));
assert.ok(Math.max(...answerPositions) / Math.min(...answerPositions) < 1.15);
console.log(JSON.stringify({ questions: 180, difficulty: { easy: 60, medium: 60, hard: 60 }, simulations: 1000, uniqueSessions: fingerprints.size, answerPositions, maximumWeightedScore: 29, validationReport: "PASS", status: "PASS" }, null, 2));
