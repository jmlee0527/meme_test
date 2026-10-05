import assert from "node:assert/strict";
import { loadSiteModule } from "./load-site-module.mjs";

const { tests } = loadSiteModule("data/tests.ts");
const { articles, articleCategories, getRecentArticles } = loadSiteModule("data/articles.ts");
const { categoryLandings, getDiscoveryMetadata } = loadSiteModule("data/test-discovery.ts");
const { getTestCanonicalPath } = loadSiteModule("lib/test-seo.ts");
const { createMetadata } = loadSiteModule("lib/site.ts");
const { isTestProgressQuery, hasNameInputs } = loadSiteModule("lib/page-indexing.ts");
const { getRecommendedTests, getRelatedTests } = loadSiteModule("lib/test-discovery.ts");
const { searchTests } = loadSiteModule("lib/test-search.ts");
const sitemap = loadSiteModule("app/sitemap.ts").default();
const robots = loadSiteModule("app/robots.ts").default();
const testSlugs = new Set(tests.map((test) => test.slug));
const articleSlugs = new Set(articles.map((article) => article.slug));
assert.equal(testSlugs.size, tests.length, "Duplicate test slug");
assert.equal(articleSlugs.size, articles.length, "Duplicate article slug");
assert.equal(new Set(sitemap.map(({ url }) => url)).size, sitemap.length, "Duplicate sitemap URL");
assert(!robots.rules.disallow.includes("/search"), "Search noindex must be crawlable");

for (const entry of sitemap) {
  const url = new URL(entry.url);
  assert.equal(url.origin, "https://www.memetest.co.kr");
  assert(!url.search && !/\/result\/|^\/search$/.test(url.pathname), `Non-canonical sitemap URL: ${entry.url}`);
}
for (const test of tests) {
  assert(sitemap.some(({ url }) => new URL(url).pathname === getTestCanonicalPath(test)), `Missing test: ${test.slug}`);
  assert(test.seoContent?.paragraphs.length || test.slug === "name-couple-compatibility", `Missing introduction: ${test.slug}`);
  for (const slug of getDiscoveryMetadata(test).relatedArticles ?? []) assert(articleSlugs.has(slug), `Missing related article: ${slug}`);
  for (const slug of getDiscoveryMetadata(test).relatedTests ?? []) assert(testSlugs.has(slug), `Missing related test: ${slug}`);
}
for (const landing of Object.values(categoryLandings)) {
  assert(landing.selectionGuide.length >= 2);
  assert(articleCategories.some(({ slug }) => slug === landing.articleCategory));
  for (const slug of landing.featuredArticles) assert(articleSlugs.has(slug), `Missing featured article: ${slug}`);
}
for (const article of articles) {
  for (const slug of article.relatedTests) assert(testSlugs.has(slug), `Missing article test: ${slug}`);
  for (const slug of article.relatedArticles) assert(articleSlugs.has(slug), `Missing article link: ${slug}`);
  assert(articleCategories.some(({ slug }) => slug === article.category));
  for (const block of article.content) if (block.type === "cta" && block.href.startsWith("/")) {
    assert(sitemap.some(({ url }) => new URL(url).pathname === block.href), `Invalid article CTA: ${block.href}`);
  }
}
for (const query of [{ start: "1" }, { play: "1", seed: "123" }, { age: "30" }, { seed: "42" }, { start: ["0", "1"] }]) assert(isTestProgressQuery(query));
for (const query of [{}, { utm_source: "newsletter" }, { start: "0" }]) assert(!isTestProgressQuery(query));
assert(hasNameInputs({ man: "" }));
assert(hasNameInputs({ woman: "example" }));
assert(!hasNameInputs({ utm_source: "newsletter" }));
for (const pathname of ["/result/example", "/tests/mbti/result/infj", "/enneagram/type-1", "/color-personality-test/blue"]) {
  const metadata = createMetadata({ title: "Result", description: "Result", path: pathname });
  assert.equal(metadata.robots.index, false);
  assert.equal(metadata.robots.googleBot.index, false);
}
const excluded = createMetadata({ title: "Search", description: "Search", path: "/search", index: false });
assert.equal(excluded.robots.index, false);
assert.equal(excluded.robots.googleBot.index, false);

// Arbitrary legacy counts must never affect discovery or search order.
const altered = tests.map((test, i) => ({ ...test, participants: i * 1000000 }));
const slugs = (items) => items.map(({ slug }) => slug);
assert.deepEqual(slugs(getRecommendedTests(tests, { limit: tests.length })), slugs(getRecommendedTests(altered, { limit: tests.length })));
assert.deepEqual(slugs(getRelatedTests(tests[0], tests, tests.length)), slugs(getRelatedTests(tests[0], altered, tests.length)));
assert.deepEqual(slugs(searchTests(tests, "테스트")), slugs(searchTests(altered, "테스트")));
assert.deepEqual(getRecentArticles([{ slug: "older", publishedAt: "2025-01-01", updatedAt: "2025-01-01" }, { slug: "updated", publishedAt: "2024-01-01", updatedAt: "2026-01-01" }]).map(({ slug }) => slug), ["updated", "older"]);
console.log(`Site structure passed: ${tests.length} tests, ${articles.length} articles, ${sitemap.length} canonical URLs.`);

// Optional integration check against a running production build. It validates
// actual HTML, response codes and links, including streamed Next.js metadata.
if (process.env.SITE_CHECK_BASE_URL) {
  const origin = new URL(process.env.SITE_CHECK_BASE_URL).origin;
  const internalLinks = new Set();
  const failures = [];
  async function check(url, expectNoindex = false, canonicalPath) {
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `${url}: ${response.status}`);
    const html = await response.text();
    const meta = [...html.matchAll(/<meta\s+[^>]*name="(?:robots|googlebot)"[^>]*>/g)].map(([tag]) => tag);
    assert(meta.some((tag) => tag.includes(expectNoindex ? "noindex" : 'content="index')), `Wrong indexing: ${url}`);
    if (expectNoindex) assert(!meta.some((tag) => /content="index/.test(tag)), `Conflicting indexing: ${url}`);
    assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, `Main landmark: ${url}`);
    assert(html.includes("<h1"), `Missing heading: ${url}`);
    assert(!/\d[\d,]*명 참여/.test(html), `Unverified participant count: ${url}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert(canonical, `Missing canonical: ${url}`);
    assert.equal(new URL(canonical[1]).pathname, canonicalPath ?? new URL(url).pathname, `Canonical mismatch: ${url}`);
    for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
      const target = new URL(href.replaceAll("&amp;", "&"), url);
      if (target.origin === origin && !target.search) internalLinks.add(target.pathname);
    }
  }
  const paths = sitemap.map(({ url }) => new URL(url).pathname);
  for (let i = 0; i < paths.length; i += 4) {
    await Promise.all(paths.slice(i, i + 4).map(async (p) => { try { await check(origin + p); } catch (error) { failures.push(error.message); } }));
  }
  for (const p of ["/search?q=mbti", "/tests/mbti?start=1", "/tests/weekend-food-worldcup?play=1&seed=42", "/couple-name-compatibility?man=sample&woman=name"]) {
    try { await check(origin + p, true, new URL(origin + p).pathname); } catch (error) { failures.push(error.message); }
  }
  await check(origin + "/tests/mbti?utm_source=verification", false, "/tests/mbti");
  for (const p of internalLinks) {
    if (paths.includes(p)) continue;
    const response = await fetch(origin + p, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) failures.push(`Broken internal link ${p}: ${response.status}`);
  }
  for (const p of ["/tests/not-a-real-test", "/articles/not-a-real-article", "/category/not-a-real-category"]) {
    const response = await fetch(origin + p, { headers: { "User-Agent": "Googlebot" }, signal: AbortSignal.timeout(30000) });
    if (response.status !== 404) failures.push(`Expected 404: ${p}, received ${response.status}`);
  }
  assert.deepEqual(failures, [], "Rendered site checks failed");
  console.log(`Rendered site passed: ${paths.length} pages and ${internalLinks.size} internal link targets.`);
}
