import { burnoutBranchQuestions, burnoutCommonQuestions, burnoutResultProfiles, burnoutSharedQuestions } from "@/data/burnout-risk";
import type { BurnoutBranch, BurnoutDomain, BurnoutDomainScores, BurnoutQuestion } from "@/lib/types";

const domains:BurnoutDomain[]=["energy","emotional","disengagement","interpersonal","recovery"];

export function determineBurnoutBranch(commonAnswers:number[]):BurnoutBranch {
  const [energy=3, disengagement=3, interpersonal=3]=commonAnswers;
  const highest=Math.max(energy,disengagement,interpersonal);
  if(highest<4)return "recovery";
  if(energy===highest)return "energy";
  if(disengagement===highest)return "disengagement";
  return "interpersonal";
}

export function buildBurnoutQuestions(commonAnswers:number[]):BurnoutQuestion[] {
  const branch=determineBurnoutBranch(commonAnswers);
  return [...burnoutCommonQuestions,...burnoutBranchQuestions[branch],...burnoutSharedQuestions];
}

export function parseBurnoutAnswers(value?:string):number[]|null {
  if(!value||!/^([1-5]){12}$/.test(value))return null;
  return [...value].map(Number);
}

export function serializeBurnoutAnswers(answers:number[]){return answers.join("");}

export function calculateBurnoutResult(answers:number[]) {
  const questions=buildBurnoutQuestions(answers.slice(0,3));
  const values:Record<BurnoutDomain,number[]>={energy:[],emotional:[],disengagement:[],interpersonal:[],recovery:[]};
  questions.forEach((question,index)=>{ const answer=answers[index]??3; const normalized=Math.round(((answer-1)/4)*100); values[question.domain].push(normalized); });
  const areaScores=Object.fromEntries(domains.map((domain)=>[domain,values[domain].length?Math.round(values[domain].reduce((a,b)=>a+b,0)/values[domain].length):50])) as BurnoutDomainScores;
  // 회복 가능성은 높을수록 보호 요인이므로 최종 위험도에서는 역산합니다.
  const riskScore=Math.round((areaScores.energy+areaScores.emotional+areaScores.disengagement+areaScores.interpersonal+(100-areaScores.recovery))/5);
  const profile=burnoutResultProfiles.find((item)=>riskScore>=item.minScore&&riskScore<=item.maxScore)??burnoutResultProfiles[0];
  return {profile,riskScore,areaScores,branch:determineBurnoutBranch(answers.slice(0,3))};
}

export function burnoutGuides(areaScores:BurnoutDomainScores, base:string[]) {
  const candidates:[number,string][]=[
    [areaScores.energy,"수면 시간을 늘리는 것보다 기상 시간을 일정하게 맞추고, 낮 동안 짧은 회복 구간을 확보해 보세요."],
    [areaScores.emotional,"감정이 올라오는 순간 바로 해결하려 하지 말고, 반응을 10분 늦추는 완충 시간을 만들어 보세요."],
    [areaScores.disengagement,"해야 할 일을 가장 작은 완료 단위로 나누고, 오늘 하지 않아도 되는 일은 명확히 내려놓으세요."],
    [areaScores.interpersonal,"연락과 만남의 밀도를 잠시 낮추고, 설명 없이 편안히 쉴 수 있는 관계를 먼저 선택하세요."],
    [100-areaScores.recovery,"회복을 의지에 맡기지 말고 달력에 실제 휴식 시간을 먼저 예약해 두세요."],
  ];
  return [...candidates.sort((a,b)=>b[0]-a[0]).slice(0,2).map((item)=>item[1]),base[0]];
}
