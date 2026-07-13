import { JOB_STRESS_QUESTION_COUNT, getJobStressLevel, jobStressFactors, jobStressQuestions } from "@/data/job-stress";
import type { JobStressFactor, JobStressFactorProfile, JobStressLevel } from "@/data/job-stress";

export type JobStressAnswer = 0|1|2|3;
export type JobStressResult = { overallScore:number; level:JobStressLevel; factorScores:Record<JobStressFactor,number>; primaryFactors:JobStressFactorProfile[]; stableFactor:JobStressFactorProfile };
const factorIds = jobStressFactors.map((factor)=>factor.id);
export const jobStressItemScore = (reverse:boolean, selected:JobStressAnswer) => reverse ? 3-selected : selected;

export function calculateJobStressResult(answers:JobStressAnswer[]):JobStressResult {
  if(answers.length!==JOB_STRESS_QUESTION_COUNT) throw new Error("32개 문항에 모두 답해야 결과를 계산할 수 있습니다.");
  const raw=Object.fromEntries(factorIds.map((id)=>[id,0])) as Record<JobStressFactor,number>;
  const count=Object.fromEntries(factorIds.map((id)=>[id,0])) as Record<JobStressFactor,number>;
  jobStressQuestions.forEach((question,index)=>{ const answer=answers[index]; if(answer<0||answer>3) throw new Error("답변은 0~3 사이여야 합니다."); raw[question.factor]+=jobStressItemScore(question.reverse,answer); count[question.factor]+=1; });
  const factorScores=Object.fromEntries(factorIds.map((id)=>[id,Math.round(raw[id]/(count[id]*3)*100)])) as Record<JobStressFactor,number>;
  const overallScore=Math.round(factorIds.reduce((sum,id)=>sum+factorScores[id],0)/factorIds.length);
  const ranked=[...factorIds].sort((a,b)=>factorScores[b]-factorScores[a] || factorIds.indexOf(a)-factorIds.indexOf(b));
  const primaryFactors=overallScore<20 ? [] : ranked.slice(0, factorScores[ranked[0]]-factorScores[ranked[1]]<=5 ? 2:1).map((id)=>jobStressFactors.find((factor)=>factor.id===id)!);
  const stableId=[...factorIds].sort((a,b)=>factorScores[a]-factorScores[b] || factorIds.indexOf(a)-factorIds.indexOf(b))[0];
  return {overallScore,level:getJobStressLevel(overallScore),factorScores,primaryFactors,stableFactor:jobStressFactors.find((factor)=>factor.id===stableId)!};
}
export const encodeJobStressAnswers=(answers:JobStressAnswer[])=>answers.join("");
export const parseJobStressAnswers=(raw?:string):JobStressAnswer[]|null=>!raw||!new RegExp(`^[0-3]{${JOB_STRESS_QUESTION_COUNT}}$`).test(raw)?null:[...raw].map(Number) as JobStressAnswer[];
export function firstUnansweredJobStress(answers:(JobStressAnswer|undefined)[]){ for(let i=0;i<JOB_STRESS_QUESTION_COUNT;i+=1) if(answers[i]===undefined)return i; return null; }
