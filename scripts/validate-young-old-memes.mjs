import pool from "../data/young-old/verified-meme-question-pool.json" with { type: "json" };

const today = process.env.TREND_VALIDATION_DATE ?? new Date().toISOString().slice(0, 10);
const target = { easy: 4, medium: 5, hard: 3 };
const dimensionTypes = {
  memeSource: ["relatedPerson", "relatedGroup", "originContent"],
  memeContext: ["originContext", "meaning", "trendDetail"],
  memeUsage: ["usageContext", "meaning"],
  contentConnection: ["songOrMedia", "connection", "relatedPerson", "relatedGroup"],
  trendDetection: ["trendDetail", "meaning", "originContext"],
};
const contributes = (question, dimension) => dimensionTypes[dimension].includes(question.type) || (dimension === "memeContext" && question.tags.some((tag) => ["phrase", "origin", "context"].includes(tag))) || (dimension === "memeUsage" && question.tags.some((tag) => ["phrase", "challenge", "reaction"].includes(tag))) || (dimension === "contentConnection" && question.tags.some((tag) => ["creator", "group", "song", "movie", "broadcast"].includes(tag))) || (dimension === "trendDetection" && ["hot", "current"].includes(question.freshness));
let state = 1;
const next = () => { state = (state * 1664525 + 1013904223) % 4294967296; return state / 4294967296; };
const shuffle = (items) => { const copy = [...items]; for (let index = copy.length - 1; index > 0; index -= 1) { const targetIndex = Math.floor(next() * (index + 1)); [copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]]; } return copy; };
const fail = (message) => { throw new Error(`young-old validation: ${message}`); };

const ids = new Set(); const memes = new Set();
for (const question of pool.questions) {
  if (ids.has(question.id)) fail(`duplicate id ${question.id}`); ids.add(question.id);
  if (memes.has(question.memeId)) fail(`duplicate memeId ${question.memeId}`); memes.add(question.memeId);
  if (question.options.length !== 4 || new Set(question.options.map((option) => option.id)).size !== 4) fail(`invalid option count ${question.id}`);
  if (question.options.filter((option) => option.isCorrect).length !== 1 || !question.options.some((option) => option.id === question.correctOptionId && option.isCorrect)) fail(`invalid answer ${question.id}`);
  if (!question.explanation || question.sourceRecords.length < 2 || !question.verifiedAt || !question.reviewAt) fail(`missing verification ${question.id}`);
}
if (pool.questions.length !== 48 || memes.size !== 48) fail("expected 48 unique questions and meme IDs");
const active = pool.questions.filter((question) => question.reviewAt >= today);
const expired = pool.questions.filter((question) => question.reviewAt < today);
if (expired.length > 0) console.warn(`young-old warning: ${expired.length} review-expired questions excluded from random sessions: ${expired.map((question) => question.id).join(", ")}`);
for (const [difficulty, count] of Object.entries(target)) if (active.filter((question) => question.difficulty === difficulty).length < count) fail(`insufficient active ${difficulty} questions`);

const exposure = Object.fromEntries(pool.questions.map((question) => [question.id, 0])); const correctSlots = [0, 0, 0, 0];
for (let run = 1; run <= 1000; run += 1) {
  state = run; let selected = [];
  for (let attempt = 0; attempt < 48; attempt += 1) {
    const used = new Set(); const candidate = [];
    const pick = (candidates) => { const question = shuffle(candidates.filter((item) => !used.has(item.memeId)))[0]; if (!question) fail("unable to pick unique question"); used.add(question.memeId); candidate.push(question); };
    for (const [difficulty, count] of Object.entries(target)) for (let index = 0; index < count; index += 1) pick(active.filter((question) => question.difficulty === difficulty));
    if (Object.keys(dimensionTypes).every((dimension) => candidate.some((question) => contributes(question, dimension)))) { selected = candidate; break; }
  }
  if (selected.length !== 12) fail("a session omitted a required dimension");
  let ordered = shuffle(selected);
  const hasTriple = (items) => items.some((question, index) => index >= 2 && items[index - 1].type === question.type && items[index - 2].type === question.type);
  for (let attempt = 0; attempt < 24 && hasTriple(ordered); attempt += 1) ordered = shuffle(selected);
  if (hasTriple(ordered)) fail("three identical question types appeared consecutively");
  if (selected.length !== 12 || new Set(selected.map((question) => question.memeId)).size !== 12) fail("session uniqueness or count failed");
  for (const [difficulty, count] of Object.entries(target)) if (selected.filter((question) => question.difficulty === difficulty).length !== count) fail("difficulty balance failed");
  selected.forEach((question) => { exposure[question.id] += 1; const ordered = shuffle(question.options); correctSlots[ordered.findIndex((option) => option.isCorrect)] += 1; });
}
const expected = 12000 / pool.questions.length; const maxExposure = Math.max(...Object.values(exposure)); const minExposure = Math.min(...Object.values(exposure));
if (maxExposure > expected * 2.5 || minExposure < expected * 0.25) fail("question exposure is too biased");
if (Math.max(...correctSlots) - Math.min(...correctSlots) > 400) fail("answer position distribution is too biased");
const determineResult = (score) => score >= 50 ? "young" : "old";
if (determineResult(49) !== "old" || determineResult(50) !== "young" || determineResult(0) !== "old" || determineResult(100) !== "young") fail("result threshold logic failed");
console.log(`young-old validation passed: ${pool.questions.length} questions, ${memes.size} unique memes, ${active.length} active, 1000 sessions, exposure ${minExposure}-${maxExposure}, answer slots ${correctSlots.join("/")}`);
