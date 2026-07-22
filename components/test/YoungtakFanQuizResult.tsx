"use client";

import { CommonFanQuizResult, type CommonFanQuizWrongReview } from "@/components/fan-quiz/CommonFanQuizResult";
import { YOUNGTAK_FAN_MAX_SCORE, youngtakDifficultyScores, youngtakFanTest } from "@/data/youngtak-fan";
import type { YoungtakFanGradeProfile, YoungtakQuizQuestion } from "@/lib/types";

type Props = {
  grade: YoungtakFanGradeProfile;
  fanIndex: number | null;
  totalCorrect: number | null;
  total: number;
  weightedScore: number | null;
  maxScore: number;
  easyCorrect: number | null;
  mediumCorrect: number | null;
  hardCorrect: number | null;
  expertCorrect: number | null;
  wrong: { question: YoungtakQuizQuestion; choice: number }[];
  categoryRates: { label: string; correct: number; total: number; rate: number }[];
  encodedAnswers: string | null;
};

const YOUNGTAK_RESULT_IMAGE = "/tests/youngtak-fan-result.png";

function toWrongReviews(wrong: Props["wrong"]): CommonFanQuizWrongReview[] {
  return wrong.map(({ question, choice }) => ({
    id: question.id,
    question: question.question,
    choiceText: question.options[choice] ?? "선택 없음",
    correctText: question.options[question.correctAnswer] ?? "",
    explanation: question.explanation,
    point: youngtakDifficultyScores[question.difficulty],
    note: `검증 메모: ${question.factCheckNote} · 확인일 ${question.verifiedAt}`,
  }));
}

export function YoungtakFanQuizResult({ grade, fanIndex, totalCorrect, total, weightedScore, maxScore, wrong, encodedAnswers }: Props) {
  const hasResult = fanIndex !== null;
  const resultPath = `/youngtak-fan-test/result/${grade.slug}${encodedAnswers ? `?r=${encodedAnswers}` : ""}`;

  return (
    <CommonFanQuizResult
      test={youngtakFanTest}
      gradeTitle={grade.title}
      gradeSummary={grade.summary}
      gradeDescription={grade.description}
      hasResult={hasResult}
      correctCount={totalCorrect}
      totalCount={total}
      pointScore={weightedScore}
      pointMaxScore={maxScore}
      levelScore={fanIndex ?? grade.maxScore}
      levelMaxScore={YOUNGTAK_FAN_MAX_SCORE}
      wrongReviews={toWrongReviews(wrong)}
      resultPath={resultPath}
      imageSrc={YOUNGTAK_RESULT_IMAGE}
      imageAlt="무대에서 환하게 웃고 있는 영탁 이미지"
      imageObjectPosition="center 18%"
      shareDescription={grade.summary}
      disclaimer="본 테스트는 영탁 또는 소속사의 공식 서비스가 아닌 비공식 팬 퀴즈입니다. 결과 화면 이미지는 사용자가 제공한 이미지이며, 응답은 서버에 저장되지 않습니다."
    />
  );
}
