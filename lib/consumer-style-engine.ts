import { consumerQuestions, consumerResultProfiles } from "@/data/consumer-style";
import type { ConsumerDomain, ConsumerDomainScores } from "@/lib/types";

const domains:ConsumerDomain[]=["planning","impulsivity","experience","future","quality"];
const weights:Record<string,Partial<Record<ConsumerDomain|"inversePlanning"|"inverseImpulsivity"|"inverseFuture",number>>>={
  "consumer-investment-ready":{planning:.30,inverseImpulsivity:.20,future:.45,quality:.05},
  "consumer-value-explorer":{planning:.45,inverseImpulsivity:.30,future:.10,quality:.15},
  "consumer-experience-first":{experience:.60,impulsivity:.15,planning:.10,quality:.15},
  "consumer-premium-seeker":{quality:.60,planning:.15,inverseImpulsivity:.15,future:.10},
  "consumer-flex":{impulsivity:.35,experience:.30,quality:.20,inversePlanning:.10,inverseFuture:.05},
  "consumer-impulsive":{impulsivity:.55,inversePlanning:.30,inverseFuture:.15},
};

export function parseConsumerAnswers(value?:string){if(!value||!/^([1-5]){17}$/.test(value))return null;return [...value].map(Number);}
export function serializeConsumerAnswers(answers:number[]){return answers.join("");}

export function calculateConsumerResult(answers:number[]){
  const grouped:Record<ConsumerDomain,number[]>={planning:[],impulsivity:[],experience:[],future:[],quality:[]};
  consumerQuestions.forEach((question,index)=>{const raw=answers[index]??3;const adjusted=question.reverse?6-raw:raw;grouped[question.domain].push(Math.round(((adjusted-1)/4)*100));});
  const areaScores=Object.fromEntries(domains.map((domain)=>[domain,Math.round(grouped[domain].reduce((sum,value)=>sum+value,0)/grouped[domain].length)])) as ConsumerDomainScores;
  const values={...areaScores,inversePlanning:100-areaScores.planning,inverseImpulsivity:100-areaScores.impulsivity,inverseFuture:100-areaScores.future};
  const ranked=consumerResultProfiles.map((profile)=>{
    const profileWeights=weights[profile.slug];
    const affinity=Math.round(Object.entries(profileWeights).reduce((score,[key,weight])=>score+values[key as keyof typeof values]*(weight??0),0));
    return {...profile,affinity};
  }).sort((a,b)=>b.affinity-a.affinity);
  return {profile:ranked[0],secondary:ranked[1],fitScore:Math.min(97,Math.max(68,ranked[0].affinity)),areaScores};
}
