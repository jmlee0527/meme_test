const HIDDEN_PREFIXES = ["/admin", "/auth", "/login", "/maintenance"];
const HIDDEN_TESTS = ["/tests/reaction-time-test", "/tests/weekend-food-worldcup"];
export function shouldHideFeedback(pathname: string) {
  return pathname === "/_not-found" || HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || HIDDEN_TESTS.includes(pathname);
}
