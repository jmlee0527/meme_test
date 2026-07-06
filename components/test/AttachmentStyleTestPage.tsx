"use client";

import { useRouter } from "next/navigation";
import { LikertQuestionRunner } from "@/components/test/LikertQuestionRunner";
import { attachmentQuestions } from "@/data/attachment-style";
import { calculateAttachmentResult, serializeAttachmentAnswers } from "@/lib/attachment-style-engine";

export function AttachmentStyleTestPage() {
  const router = useRouter();

  return (
    <LikertQuestionRunner
      title="애착유형 테스트"
      eyebrow="ADULT ATTACHMENT STYLE"
      tone="pink"
      questions={attachmentQuestions}
      footer="정답은 없습니다. 가까운 관계에서 반복되는 나의 패턴을 기준으로 답해주세요."
      onComplete={(answers) => {
        const { profile } = calculateAttachmentResult(answers);
        router.push(`/result/${profile.slug}?answers=${serializeAttachmentAnswers(answers)}`);
      }}
    />
  );
}
