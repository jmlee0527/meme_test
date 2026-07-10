import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);

function compile(file, customRequire = require) {
  const source = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(`(function(exports,module,require){${output}})(module.exports,module,require)`, {
    module,
    require: customRequire,
    console,
    Set,
    Map,
    Number,
    Error,
    Math,
    Uint32Array,
    crypto: globalThis.crypto,
  });
  return module.exports;
}

const data = compile("data/limyoungwoong-fan.ts");
const engine = compile("lib/limyoungwoong-fan-engine.ts", (id) => {
  if (id === "@/data/limyoungwoong-fan") return data;
  if (id === "@/lib/types") return {};
  throw new Error(`Unexpected validation import: ${id}`);
});

const frequency = new Map();
let minCategoryCount = Infinity;
let maxCategoryCount = 0;

for (let run = 0; run < 1_000; run += 1) {
  const questions = engine.selectLimYoungWoongQuestions();
  const difficulties = { easy: 0, medium: 0, hard: 0, expert: 0 };
  const ids = new Set();
  const categories = new Map();
  let score = 0;

  for (const [index, question] of questions.entries()) {
    difficulties[question.difficulty] += 1;
    score += data.limYoungWoongDifficultyScores[question.difficulty];
    ids.add(question.originalId);
    categories.set(question.category, (categories.get(question.category) ?? 0) + 1);
    frequency.set(question.originalId, (frequency.get(question.originalId) ?? 0) + 1);

    const original = data.getLimYoungWoongQuestion(question.originalId);
    if (question.options[question.correctAnswer] !== original.options[original.correctAnswer]) throw new Error(`Option shuffle mismatch: ${question.id}`);
    if (index < 3 && (question.difficulty === "hard" || question.difficulty === "expert")) throw new Error(`Opening difficulty violation: ${question.id}`);
    if (question.difficulty === "expert" && index < 8) throw new Error(`Expert placement violation: ${question.id}`);
  }

  if (questions.length !== 15 || ids.size !== 15) throw new Error("Each run must contain 15 unique questions.");
  if (JSON.stringify(difficulties) !== JSON.stringify({ easy: 4, medium: 6, hard: 4, expert: 1 })) throw new Error(`Difficulty mix violation: ${JSON.stringify(difficulties)}`);
  if (score !== 100) throw new Error(`Run score must be 100. Current: ${score}`);
  if (!['medium', 'hard'].includes(questions.at(-1).difficulty)) throw new Error("The last question must be medium or hard.");
  minCategoryCount = Math.min(minCategoryCount, categories.size);
  maxCategoryCount = Math.max(maxCategoryCount, ...categories.values());
  if (categories.size < 9) throw new Error(`Category diversity violation: ${categories.size}`);
  if (Math.max(...categories.values()) > 2) throw new Error("Category cap exceeded.");
}

if (frequency.size !== 60) throw new Error(`All 60 questions must appear in simulation. Current: ${frequency.size}`);
const frequencies = [...frequency.values()];
console.log({
  bank: data.validateLimYoungWoongQuestionBank(),
  simulations: 1_000,
  minCategoryCount,
  maxCategoryCount,
  frequencyMin: Math.min(...frequencies),
  frequencyMax: Math.max(...frequencies),
});
