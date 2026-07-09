import { adhdLevelProfiles, adhdQuestions, type AdhdDomain } from "@/data/adhd-screening";

export type AdhdScreeningScores = {
  overall: number;
  inattention: number;
  hyperactivity: number;
  screenerSignals: number;
};

export function parseAdhdAnswers(value?:string):number[]|null {
  if(!value||!new RegExp(`^[0-4]{${adhdQuestions.length}}$`).test(value))return null;
  return [...value].map(Number);
}
export function serializeAdhdAnswers(answers:number[]){return answers.join("");}

function domainScore(answers:number[],domain:AdhdDomain){
  const questions=adhdQuestions.filter((question)=>question.domain===domain);
  const weighted=questions.reduce((sum,question)=>sum+(answers[question.id-1]??0)*question.weight,0);
  const maximum=questions.reduce((sum,question)=>sum+4*question.weight,0);
  return Math.round(weighted/maximum*100);
}

export function calculateAdhdResult(answers:number[]){
  const inattention=domainScore(answers,"inattention");
  const hyperactivity=domainScore(answers,"hyperactivity");
  const screenerQuestions=adhdQuestions.filter((question)=>question.screener);
  const screenerSignals=screenerQuestions.filter((question)=>(answers[question.id-1]??0)>=(question.threshold??3)).length;
  const continuous=inattention*.56+hyperactivity*.44;
  const screenerPercent=screenerSignals/screenerQuestions.length*100;
  const overall=Math.round(Math.min(100,Math.max(0,continuous*.78+screenerPercent*.22)));
  const profile=adhdLevelProfiles.find(({minScore,maxScore})=>overall>=minScore&&overall<=maxScore)??adhdLevelProfiles[2];
  return {profile,scores:{overall,inattention,hyperactivity,screenerSignals} satisfies AdhdScreeningScores};
}
