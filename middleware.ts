import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "memetest.co.kr";
const REDIRECT_HOSTS = new Set(["buupstory.kr", "www.buupstory.kr", "www.memetest.co.kr"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  if (!host || !REDIRECT_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.hostname = CANONICAL_HOST;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.webmanifest).*)"],
};
