import assert from "node:assert/strict";
import fs from "node:fs";
import sharp from "sharp";
import { loadSiteModule } from "./load-site-module.mjs";

const { hogwartsQuestions, hogwartsProfiles, hogwartsPatterns, hogwartsTest } = loadSiteModule("data/hogwarts-character.ts");
const { calculateHogwartsResult, parseHogwartsAnswers } = loadSiteModule("lib/hogwarts-character-engine.ts");
assert.equal(hogwartsQuestions.length, 12);
assert.equal(hogwartsProfiles.length, 12);
assert.equal(new Set(hogwartsProfiles.map(p => p.slug)).size, 12);
assert.equal(hogwartsTest.participants, 0);
for (const question of hogwartsQuestions) {
  assert.equal(question.options.length, 4);
  assert.equal(new Set(question.options.map(o => o.text)).size, 4);
  question.options.forEach((option, i) => {
    assert.equal(option.value, i);
    for (const profile of hogwartsProfiles) assert([0, 1, 2, 3].includes(option.weights[profile.slug]));
  });
}
for (const profile of hogwartsProfiles) {
  assert.equal(calculateHogwartsResult(hogwartsPatterns[profile.slug]).profile.slug, profile.slug, `Unreachable: ${profile.slug}`);
  assert.equal(profile.reasons.length, 3);
  assert.equal(new Set(profile.friends).size, 2);
  assert(profile.friends.every(slug => slug !== profile.slug && hogwartsProfiles.some(p => p.slug === slug)));
  assert(fs.existsSync(`public${profile.image}`), `Missing image: ${profile.slug}`);
  const image = await sharp(`public${profile.image}`).metadata();
  assert.equal(image.format, "webp");
  assert(Math.max(image.width, image.height) <= 1200);
  // Only Malfoy's source contains non-opaque pixels; the other PNGs have opaque alpha channels.
  if (profile.slug === "draco-malfoy") assert(image.hasAlpha);
}
for (const bad of [undefined, null, "", "0".repeat(11), "0".repeat(13), "4".repeat(12), "0".repeat(12) + "\n", ["0".repeat(12)], 0]) assert.equal(parseHogwartsAnswers(bad), null);
assert.deepEqual(parseHogwartsAnswers("012301230123"), [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
for (const bad of [[], Array(12), Array(12).fill(-1), Array(12).fill(4), Array(12).fill(NaN), Array(12).fill(1.5)]) assert.throws(() => calculateHogwartsResult(bad));

let seed = 20261011;
const counts = Object.fromEntries(hogwartsProfiles.map(p => [p.slug, 0]));
let tied = false;
for (let n = 0; n < 30000; n++) {
  const answers = Array.from({ length: 12 }, () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) % 4; });
  const result = calculateHogwartsResult(answers);
  counts[result.profile.slug]++;
  if (n < 100) assert.deepEqual(result, calculateHogwartsResult([...answers]));
  const [a, b] = result.ranked;
  if (a.score === b.score) {
    tied = true;
    assert(a.strongMatches > b.strongMatches || (a.strongMatches === b.strongMatches && a.order < b.order));
  }
}
assert(tied, "Tie case was not exercised");
for (const [slug, count] of Object.entries(counts)) assert(count > 150 && count < 9000, `Result skew: ${slug} ${count}/30000`);
console.log("Hogwarts validation passed: 12 profiles, images, answer validation, determinism and ties.");
console.table(Object.fromEntries(Object.entries(counts).map(([slug, count]) => [slug, `${(count / 300).toFixed(2)}%`])));
