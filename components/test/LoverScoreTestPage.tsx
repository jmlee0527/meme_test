"use client";

import { useRouter } from "next/navigation";
import { loverQuestions } from "@/data/lover-score";
import { calculateLoverResult, serializeLoverAnswers } from "@/lib/lover-score-engine";
import { LikertQuestionRunner } from "@/components/test/LikertQuestionRunner";

export function LoverScoreTestPage() {
  const router = useRouter();
  return (
    <LikertQuestionRunner
      title="나는 몇 점짜리 애인일까?"
      eyebrow="LOVER SCORE TEST"
      questions={loverQuestions}
      tone="pink"
      onComplete={(answers) => {
        const { profile, overallScore } = calculateLoverResult(answers);
        router.push(
          `/lover-score-test/result/${profile.slug}?score=${overallScore}&answers=${serializeLoverAnswers(
            answers,
          )}`,
        );
      }}
      footer="정답은 없습니다. 실제 연애에서의 내 모습에 가깝게 선택해 주세요."
    />
  );
}

