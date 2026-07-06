"use client";

import { useRouter } from "next/navigation";
import { consumerQuestions } from "@/data/consumer-style";
import { calculateConsumerResult, serializeConsumerAnswers } from "@/lib/consumer-style-engine";
import { LikertQuestionRunner } from "@/components/test/LikertQuestionRunner";

export function ConsumerStyleTestPage(){
  const router=useRouter();
  return <LikertQuestionRunner title="소비성향 테스트" eyebrow="CONSUMER STYLE ANALYSIS" questions={consumerQuestions} onComplete={(answers)=>{const {profile}=calculateConsumerResult(answers);router.push(`/result/${profile.slug}?answers=${serializeConsumerAnswers(answers)}`);}} footer="정답은 없습니다. 평소 행동을 기준으로 답해주세요." />;
}
