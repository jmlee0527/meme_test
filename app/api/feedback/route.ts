import { NextRequest, NextResponse } from "next/server";
import { FEEDBACK_LIMITS } from "@/lib/feedback";
import { checkFeedbackRateLimit } from "@/lib/feedback-rate-limit";
import { buildDiscordFeedback, feedbackFingerprint, validateFeedback } from "@/lib/feedback-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (body: Record<string, unknown>, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > FEEDBACK_LIMITS.maximumBodyBytes) return json({ ok: false, message: "요청 내용이 너무 큽니다." }, 413);
  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > FEEDBACK_LIMITS.maximumBodyBytes) return json({ ok: false, message: "요청 내용이 너무 큽니다." }, 413);
    raw = JSON.parse(body);
  } catch { return json({ ok: false, message: "올바른 요청이 아닙니다." }, 400); }
  const validated = validateFeedback(raw);
  if (!validated.ok) return json({ ok: false, message: validated.message }, 400);
  // 봇에게 유효성 규칙을 알려주지 않으면서 실제 Discord 접수는 하지 않습니다.
  if (validated.data.website) return json({ ok: true, message: "소중한 의견이 접수되었습니다. 확인 후 서비스 개선에 반영하겠습니다." });

  const ip = (request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown").split(",")[0].trim();
  const limited = checkFeedbackRateLimit(ip, feedbackFingerprint(validated.data));
  if (!limited.allowed) return json({ ok: false, message: "잠시 후 다시 시도해 주세요." }, 429, { "Retry-After": String(limited.retryAfter) });
  const environment = process.env.VERCEL_ENV ?? (process.env.NODE_ENV === "production" ? "production" : "development");
  const webhook = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;
  if (!webhook) {
    if (environment === "development") {
      console.info("[feedback:development]", { type: validated.data.type, pageUrl: validated.data.pageUrl, testId: validated.data.testId, contentLength: validated.data.content.length, hasContact: Boolean(validated.data.contact) });
      return json({ ok: true, message: "소중한 의견이 접수되었습니다. 확인 후 서비스 개선에 반영하겠습니다.", development: true });
    }
    console.error("[feedback] Discord webhook is not configured");
    return json({ ok: false, message: "현재 신고 접수가 원활하지 않습니다. 잠시 후 다시 시도해 주세요." }, 503);
  }
  try {
    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(buildDiscordFeedback(validated.data, environment)), cache: "no-store", signal: AbortSignal.timeout(8_000) });
    if (!response.ok) {
      console.error("[feedback] Discord delivery failed", { status: response.status });
      return json({ ok: false, message: "신고를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." }, 502);
    }
    return json({ ok: true, message: "소중한 의견이 접수되었습니다. 확인 후 서비스 개선에 반영하겠습니다." });
  } catch (error) {
    console.error("[feedback] Discord delivery error", { name: error instanceof Error ? error.name : "UnknownError" });
    return json({ ok: false, message: "신고를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." }, 502);
  }
}
