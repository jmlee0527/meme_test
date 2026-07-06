"use client";

import { useRouter } from "next/navigation";
import { loveQuestions } from "@/data/love-mbti";
import { calculateLoveResult, serializeLoveAnswers } from "@/lib/love-mbti-engine";
import { LikertQuestionRunner } from "@/components/test/LikertQuestionRunner";

export function LoveMbtiTestPage(){
  const router=useRouter();
  return <LikertQuestionRunner title="연애 MBTI 테스트" eyebrow="LOVE STYLE ANALYSIS" questions={loveQuestions} tone="pink" onComplete={(answers)=>{const {profile}=calculateLoveResult(answers);router.push(`/result/${profile.slug}?answers=${serializeLoveAnswers(answers)}`);}} footer="정답은 없습니다. 실제 연애에서의 내 모습에 가깝게 답해주세요." />;
}
