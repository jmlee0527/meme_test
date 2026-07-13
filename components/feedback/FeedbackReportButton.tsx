"use client";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FeedbackReportModal } from "@/components/feedback/FeedbackReportModal";
import { shouldHideFeedback } from "@/components/feedback/feedback-visibility";

export function FeedbackReportButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (shouldHideFeedback(pathname)) return null;
  return <>
    <button ref={buttonRef} type="button" onClick={() => setOpen(true)} aria-label="피드백 및 오류 신고 열기" className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] right-4 z-40 grid size-12 place-items-center rounded-full border border-white/80 bg-gradient-to-br from-blue-600 to-violet-600 text-xl text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:bottom-8 lg:right-6 lg:flex lg:h-12 lg:w-auto lg:gap-2 lg:px-5 lg:text-sm lg:font-black">
      <span aria-hidden="true">💬</span><span className="hidden lg:inline">피드백 · 오류 신고</span>
    </button>
    {open && <FeedbackReportModal onClose={() => setOpen(false)} returnFocusRef={buttonRef} />}
  </>;
}
