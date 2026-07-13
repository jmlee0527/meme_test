"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FEEDBACK_LIMITS, REPORT_TYPES } from "@/lib/feedback";
import type { ReportType } from "@/lib/feedback";

type Notice = { kind: "idle" | "error" | "success"; message: string };
const IDLE: Notice = { kind: "idle", message: "" };
function collectPageContext() {
  const text = document.querySelector("main")?.textContent ?? "";
  const progress = text.match(/(\d{1,3})\s*\/\s*(\d{1,3})/);
  const segments = location.pathname.split("/").filter(Boolean), testIndex = segments.indexOf("tests");
  const testId = testIndex >= 0 ? segments[testIndex + 1] : segments[0]?.includes("test") ? segments[0] : "";
  return { pageUrl: location.href, pageTitle: document.title, testName: document.querySelector("main h1")?.textContent?.trim() ?? "", testId, questionNumber: progress ? Number(progress[1]) : undefined, totalQuestions: progress ? Number(progress[2]) : undefined, userAgent: navigator.userAgent, screenSize: `${window.innerWidth}×${window.innerHeight}`, referrer: document.referrer, submittedAt: new Date().toISOString() };
}

export function FeedbackReportForm({ onSuccess }: { onSuccess: () => void }) {
  const [type, setType] = useState<ReportType>(REPORT_TYPES[0]), [content, setContent] = useState(""), [contact, setContact] = useState(""), [website, setWebsite] = useState(""), [submitting, setSubmitting] = useState(false), [notice, setNotice] = useState<Notice>(IDLE);
  const closeTimer = useRef<number | null>(null);
  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault(); const trimmed = content.trim();
    if (trimmed.length < FEEDBACK_LIMITS.minimumContent) return setNotice({ kind: "error", message: `신고 내용을 ${FEEDBACK_LIMITS.minimumContent}자 이상 입력해 주세요.` });
    if (trimmed.length > FEEDBACK_LIMITS.maximumContent) return setNotice({ kind: "error", message: "신고 내용은 1,000자 이하여야 합니다." });
    if (contact.trim().length > FEEDBACK_LIMITS.maximumContact) return setNotice({ kind: "error", message: "연락처는 120자 이하여야 합니다." });
    const last = Number(localStorage.getItem("mimi-feedback-last-success") ?? 0);
    if (Date.now() - last < 30_000) return setNotice({ kind: "error", message: "방금 의견을 접수했습니다. 30초 후 다시 시도해 주세요." });
    setSubmitting(true); setNotice(IDLE);
    try {
      const response = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, content: trimmed, contact: contact.trim(), website, ...collectPageContext() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.message === "string" ? result.message : "신고를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      if (result.development === true) throw new Error("로컬 개발 환경에 Discord 웹훅이 설정되지 않았습니다. .env.local을 확인한 뒤 개발 서버를 다시 시작해 주세요.");
      localStorage.setItem("mimi-feedback-last-success", String(Date.now())); setContent(""); setContact(""); setWebsite("");
      setNotice({ kind: "success", message: "소중한 의견이 접수되었습니다. 확인 후 서비스 개선에 반영하겠습니다." });
      closeTimer.current = window.setTimeout(onSuccess, 1800);
    } catch (error) { setNotice({ kind: "error", message: error instanceof Error ? error.message : "신고를 전송하지 못했습니다. 잠시 후 다시 시도해 주세요." }); }
    finally { setSubmitting(false); }
  };
  return <form onSubmit={submit} className="space-y-5 p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-7">
    <div><label htmlFor="feedback-type" className="text-sm font-black text-ink">신고 유형 <span className="text-rose-500">*</span></label><select data-feedback-initial id="feedback-type" value={type} onChange={(event) => setType(event.target.value as ReportType)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-blue-500">{REPORT_TYPES.map((item) => <option key={item}>{item}</option>)}</select></div>
    <div><div className="flex items-center justify-between gap-3"><label htmlFor="feedback-content" className="text-sm font-black text-ink">신고 내용 <span className="text-rose-500">*</span></label><span className="text-xs font-bold text-slate-400">{content.length}/1,000</span></div><textarea id="feedback-content" aria-required="true" maxLength={FEEDBACK_LIMITS.maximumContent} value={content} onChange={(event) => setContent(event.target.value)} placeholder="발견한 오류나 개선이 필요한 내용을 자세히 입력해 주세요." rows={6} className="mt-2 min-h-36 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 leading-6 text-ink focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
    <div><label htmlFor="feedback-contact" className="text-sm font-black text-ink">이메일 또는 연락처 <span className="font-medium text-slate-400">(선택)</span></label><input id="feedback-contact" type="text" maxLength={FEEDBACK_LIMITS.maximumContact} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="example@email.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 px-4 text-ink focus:outline-none focus:ring-2 focus:ring-blue-500" /><p className="mt-2 text-xs leading-5 text-slate-500">답변이 필요한 경우에만 이메일 또는 연락처를 입력해 주세요. 입력한 정보는 신고 처리를 위해 Discord로 전달될 수 있습니다.</p></div>
    <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true"><label htmlFor="feedback-website">웹사이트</label><input id="feedback-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
    <p className="rounded-xl bg-amber-50 p-4 text-xs font-semibold leading-5 text-amber-900">신고 처리에 필요한 페이지 정보와 브라우저 정보가 함께 전송될 수 있습니다. 비밀번호, 주민등록번호, 카드번호 등 민감한 개인정보는 입력하지 마세요.</p>
    {notice.message && <p role={notice.kind === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl p-4 text-sm font-bold ${notice.kind === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"}`}>{notice.message}</p>}
    <button type="submit" disabled={submitting} className="min-h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 font-black text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "전송 중..." : "신고 제출하기"}</button>
  </form>;
}
