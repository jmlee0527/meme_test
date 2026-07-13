import fs from "node:fs";
const bank=JSON.parse(fs.readFileSync(new URL("../data/question-banks/job-stress.json",import.meta.url),"utf8"));
const factors=["work_environment","job_demand","job_control","relationship","job_security","organization","reward","workplace_culture"];
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
assert(bank.questions.length===32,"문항은 정확히 32개여야 합니다.");assert(new Set(bank.questions.map((q)=>q.id)).size===32,"문항 ID 중복");
for(const factor of factors){const items=bank.questions.filter((q)=>q.factor===factor);assert(items.length===4,`${factor}: 4문항 아님`);assert(items.filter((q)=>q.reverse).length===1,`${factor}: 역채점 1개 아님`)}assert(bank.questions.filter((q)=>q.reverse).length===8,"역채점은 8개여야 합니다.");
const score=(q,a)=>q.reverse?3-a:a;const calculate=(answers)=>{const values=Object.fromEntries(factors.map((f)=>[f,[]]));bank.questions.forEach((q,i)=>values[q.factor].push(score(q,answers[i])));const areas=factors.map((f)=>Math.round(values[f].reduce((a,b)=>a+b,0)/12*100));return Math.round(areas.reduce((a,b)=>a+b,0)/8)};
for(const answer of [0,1,2,3]){const value=calculate(Array(32).fill(answer));assert(value>=0&&value<=100,"점수 범위 오류")}const levels=[[0,19],[20,39],[40,59],[60,79],[80,100]];for(const point of [0,19,20,39,40,59,60,79,80,100])assert(levels.some(([min,max])=>point>=min&&point<=max),`${point} 경계 누락`);assert(calculate(bank.questions.map((q)=>q.reverse?3:0))===0,"최저점 오류");assert(calculate(bank.questions.map((q)=>q.reverse?0:3))===100,"최고점 오류");
console.log(JSON.stringify({questions:32,factors:Object.fromEntries(factors.map((f)=>[f,bank.questions.filter((q)=>q.factor===f).map((q)=>q.id)])),reverseIds:bank.questions.filter((q)=>q.reverse).map((q)=>q.id),boundaries:"PASS",scoreRange:"PASS",status:"PASS"},null,2));
