import { loveQuestions, loveResultProfiles } from "@/data/love-mbti";
import type { LoveDomain, LoveDomainScores, LoveLanguage, LoveLanguageScores } from "@/lib/types";

const domains:LoveDomain[]=["stability","expression","leadership","independence","loveLanguage"];
const languageLabels:Record<LoveLanguage,string>={words:"인정의 말",time:"함께하는 시간",gifts:"마음을 담은 선물",acts:"도움과 행동",touch:"스킨십"};
const domainWeights:Record<LoveDomain,number>={stability:1.25,expression:1.05,leadership:.85,independence:1.1,loveLanguage:.55};

export function parseLoveAnswers(value?:string){if(!value||!/^([1-5]){18}$/.test(value))return null;return [...value].map(Number);}
export function serializeLoveAnswers(answers:number[]){return answers.join("");}
export function getLoveLanguageLabel(language:LoveLanguage){return languageLabels[language];}

export function calculateLoveResult(answers:number[]){
  const grouped:Record<LoveDomain,number[]>={stability:[],expression:[],leadership:[],independence:[],loveLanguage:[]};
  const languageScores={words:0,time:0,gifts:0,acts:0,touch:0} as LoveLanguageScores;
  loveQuestions.forEach((question,index)=>{
    const raw=answers[index]??3;
    const adjusted=question.reverse?6-raw:raw;
    const normalized=Math.round(((adjusted-1)/4)*100);
    grouped[question.domain].push(normalized);
    if(question.loveLanguage)languageScores[question.loveLanguage]=normalized;
  });
  const areaScores=Object.fromEntries(domains.map((domain)=>[domain,Math.round(grouped[domain].reduce((sum,value)=>sum+value,0)/grouped[domain].length)])) as LoveDomainScores;
  const ranked=loveResultProfiles.map((profile)=>{
    const weightedDistance=Math.sqrt(domains.reduce((sum,domain)=>sum+domainWeights[domain]*((areaScores[domain]-profile.typicalScores[domain])**2),0)/domains.reduce((sum,domain)=>sum+domainWeights[domain],0));
    return {...profile,distance:weightedDistance};
  }).sort((a,b)=>a.distance-b.distance);
  const primaryLoveLanguage=(Object.entries(languageScores) as [LoveLanguage,number][]).sort((a,b)=>b[1]-a[1])[0][0];
  const fitScore=Math.min(97,Math.max(68,Math.round(100-ranked[0].distance*.72)));
  return {profile:ranked[0],secondary:ranked[1],fitScore,areaScores,languageScores,primaryLoveLanguage};
}
