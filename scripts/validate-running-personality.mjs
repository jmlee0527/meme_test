import assert from "node:assert/strict";
import { loadSiteModule } from "./load-site-module.mjs";

const { runningQuestions, runningProfiles, runningScorePairs, runningTypeKeys, runningTest, runningResultPath, RUNNING_TEST_PATH } = loadSiteModule("data/running-personality.ts");
const { calculateRunningResult, parseRunningAnswers, encodeRunningAnswers } = loadSiteModule("lib/running-personality-engine.ts");
const { tests } = loadSiteModule("data/tests.ts");
const { searchTests } = loadSiteModule("lib/test-search.ts");

assert.equal(runningQuestions.length, 12);
assert.equal(runningScorePairs.length, 12);
assert.equal(new Set(runningQuestions.map(({ id }) => id)).size, 12);
assert.equal(runningProfiles.length, 4);
assert.equal(runningTest.participants, 0);
assert(tests.some(({ slug }) => slug === runningTest.slug));
assert(searchTests(tests, "러닝").some(({ slug }) => slug === runningTest.slug));
for (const [index, question] of runningQuestions.entries()) {
  assert.equal(question.options.length, 4);
  assert.deepEqual(question.options.map(({ value }) => value), [0, 1, 2, 3]);
  assert.equal(runningScorePairs[index].length, 4);
  assert.deepEqual(runningScorePairs[index].map(([primary]) => primary).sort(), [...runningTypeKeys].sort());
  for (const [primary, secondary] of runningScorePairs[index]) {
    assert(runningTypeKeys.includes(secondary));
    assert.notEqual(primary, secondary);
  }
}

const typeExamples = Object.fromEntries(runningTypeKeys.map((type) => {
  const answers = runningScorePairs.map((pairs) => pairs.findIndex(([primary]) => primary === type));
  const result = calculateRunningResult(answers);
  assert.equal(result.profile.slug, type, `Unreachable result: ${type}`);
  assert.equal(result.scores[type], 24);
  assert.notEqual(result.profile.slug, result.secondary.slug);
  assert.deepEqual(parseRunningAnswers(encodeRunningAnswers(answers)), answers);
  assert.deepEqual(calculateRunningResult(answers), result);
  return [type, encodeRunningAnswers(answers)];
}));

// Frozen, independently checked examples cover both tie-breaking stages.
const fixtures = [
  { raw: "000000000000", scores: { record: 9, crew: 7, scenery: 9, explorer: 11 }, primary: "explorer", secondary: "record" },
  { raw: "100000000000", scores: { record: 8, crew: 9, scenery: 8, explorer: 11 }, primary: "explorer", secondary: "crew" },
  // Scenery and explorer tie on 11; scenery has five primary choices vs three.
  { raw: "313302301301", scores: { record: 10, crew: 4, scenery: 11, explorer: 11 }, primary: "scenery", secondary: "explorer" },
  // Crew and scenery tie on 13 and five primary choices; Q12 favors crew.
  { raw: "212010322103", scores: { record: 4, crew: 13, scenery: 13, explorer: 6 }, primary: "crew", secondary: "scenery" },
];
for (const fixture of fixtures) {
  const answers = Object.freeze(parseRunningAnswers(fixture.raw));
  const result = calculateRunningResult(answers);
  assert.deepEqual(result.scores, fixture.scores);
  assert.equal(result.profile.slug, fixture.primary);
  assert.equal(result.secondary.slug, fixture.secondary);
  assert.equal(Object.values(result.scores).reduce((sum, score) => sum + score, 0), 36);
}

for (const raw of [undefined, null, [], ["000000000000"], 0, "", "00000000000", "0000000000000", "400000000000", "00000000000x", "000000000000\n", " 000000000000"]) {
  assert.equal(parseRunningAnswers(raw), null, `Should reject ${JSON.stringify(raw)}`);
}
for (const answers of [[], Array(11).fill(0), Array(13).fill(0), Array(12), [...Array(11).fill(0), -1], [...Array(11).fill(0), 4], [...Array(11).fill(0), 0.5], [...Array(11).fill(0), NaN]]) {
  assert.throws(() => calculateRunningResult(answers));
  assert.throws(() => encodeRunningAnswers(answers));
}

console.log("Running personality passed: 12 questions, 48 options, four reachable types, scoring, ties, answer parsing and discovery.");

// Optional real-page checks against `npm run start` / `npm run dev`.
if (process.env.SITE_CHECK_BASE_URL) {
  const base = new URL(process.env.SITE_CHECK_BASE_URL).origin;
  const fetchPage = async (path) => {
    const response = await fetch(`${base}${path}`, {
      redirect: "manual", headers: { "User-Agent": "Googlebot" }, signal: AbortSignal.timeout(60000),
    });
    return { response, html: await response.text() };
  };
  const checkPage = async (path, { noindex = false, title, secondary = false } = {}) => {
    const { response, html } = await fetchPage(path);
    assert.equal(response.status, 200, path);
    if (title) assert(html.includes(title), `Missing title: ${path}`);
    assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `Main landmark: ${path}`);
    assert.equal(html.includes('id="running-secondary"'), secondary, `Secondary result: ${path}`);
    assert.match(html, noindex ? /name="robots" content="noindex/ : /name="robots" content="index/);
    assert(!/\d[\d,]*명 참여/.test(html), `Unverified participants: ${path}`);
    return html;
  };
  const intro = await checkPage(RUNNING_TEST_PATH, { title: runningTest.title });
  assert(intro.includes(`${RUNNING_TEST_PATH}?start=1`));
  assert(intro.includes("가볍게 시작해볼까?"));
  const runner = await checkPage(`${RUNNING_TEST_PATH}?start=1`, { noindex: true, title: runningQuestions[0].text });
  for (const option of runningQuestions[0].options) assert(runner.includes(option.text));
  assert(runner.includes('role="progressbar"'));
  for (const profile of runningProfiles) {
    const path = runningResultPath(profile.slug);
    await checkPage(path, { noindex: true, title: profile.name });
    const html = await checkPage(`${path}?a=${typeExamples[profile.slug]}`, { noindex: true, title: profile.name, secondary: true });
    assert(html.includes('id="share-card"'));
    assert(html.includes(`${RUNNING_TEST_PATH}?start=1`));
  }
  await checkPage(`${runningResultPath("record")}?a=invalid`, { noindex: true, title: runningProfiles[0].name });
  await checkPage(`${runningResultPath("record")}?a=${typeExamples.record}&a=${typeExamples.crew}`, { noindex: true, title: runningProfiles[0].name });
  const wrongType = await fetchPage(`${runningResultPath("record")}?a=${typeExamples.crew}`);
  assert.equal(wrongType.response.status, 307);
  assert.equal(wrongType.response.headers.get("location"), `${runningResultPath("crew")}?a=${typeExamples.crew}`);
  const missing = await fetchPage("/running-personality-test/result/not-a-type");
  assert.equal(missing.response.status, 404);
  for (const path of ["/tests", "/category/" + encodeURIComponent("직업.일상"), "/search?q=" + encodeURIComponent("러닝")]) {
    const { response, html } = await fetchPage(path);
    assert.equal(response.status, 200);
    assert(html.includes(RUNNING_TEST_PATH), `Missing discovery link: ${path}`);
  }
  console.log("Running pages passed: landing, runner, all results, shared answers, invalid links, redirects, 404, metadata and discovery.");
}
