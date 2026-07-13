import rawBank from "@/data/question-banks/job-stress.json";
import type { TestDefinition } from "@/lib/types";

export type JobStressFactor = "work_environment" | "job_demand" | "job_control" | "relationship" | "job_security" | "organization" | "reward" | "workplace_culture";
export type JobStressQuestion = { id: number; text: string; factor: JobStressFactor; reverse: boolean };
export type JobStressLevel = { id: string; minScore: number; maxScore: number; title: string; icon: string; summary: string; description: string };
export type JobStressFactorProfile = { id: JobStressFactor; title: string; resultTitle: string; description: string; stableDescription: string; personalActions: string[]; organizationalActions: string[] };

const bank = rawBank as { measurementGuide: string; answerLabels: string[]; questions: JobStressQuestion[] };
export const JOB_STRESS_QUESTION_COUNT = 32;
export const jobStressQuestions = bank.questions;
export const jobStressAnswerLabels = bank.answerLabels;
export const jobStressMeasurementGuide = bank.measurementGuide;
export const jobStressDisclaimer = "이 테스트는 최근 직장생활에서 체감하는 스트레스 요인을 돌아보기 위한 자기이해용 콘텐츠입니다. 표준화된 심리검사, 의학적 진단, 산업안전보건 평가 또는 회사의 공식 인사평가 도구가 아닙니다. 미미테스트의 자체 문항과 계산 기준으로 제작되었으며, 특정 검사기관이나 공공기관이 검증하거나 제휴한 테스트가 아닙니다.";

export const jobStressFactors: JobStressFactorProfile[] = [
  { id:"work_environment", title:"업무·물리적 환경", resultTitle:"업무환경 부담형", description:"업무 공간, 도구 또는 작업 방식이 불필요한 피로와 집중 방해를 만들고 있을 수 있어요.", stableDescription:"업무 환경과 도구는 현재 비교적 안정적으로 기능하고 있어요.", personalActions:["피로가 커지는 장소·시간·작업 방식을 기록하기","가능한 범위에서 자세와 집중 환경을 주기적으로 바꾸기"], organizationalActions:["불편한 장비나 작업환경의 구체적인 개선 요청하기","안전·공간·도구 관련 담당 채널 확인하기"] },
  { id:"job_demand", title:"직무 요구·업무량", resultTitle:"업무 과부하형", description:"시간 압박과 동시 업무, 추가 요청이 현재 부담의 핵심일 수 있어요.", stableDescription:"업무량과 회복 시간의 균형이 비교적 잘 유지되고 있어요.", personalActions:["업무 요청과 마감일을 한곳에 기록하기","긴급도와 중요도로 우선순위를 다시 나누기"], organizationalActions:["마감 일정과 동시 과제 수를 관리자와 재협의하기","불필요한 회의·보고·반복 업무의 축소 제안하기"] },
  { id:"job_control", title:"직무 자율성", resultTitle:"업무 통제권 부족형", description:"책임은 있지만 일의 방식과 기준을 결정할 재량이 부족하다고 느낄 수 있어요.", stableDescription:"업무 방법과 판단 범위에서 필요한 자율성이 비교적 확보되어 있어요.", personalActions:["내가 결정할 수 있는 범위와 확인이 필요한 범위 구분하기","모호한 목표는 완료 기준부터 질문하기"], organizationalActions:["역할·권한·승인 범위를 문서로 명확히 협의하기","변경 사항의 배경과 우선순위를 함께 공유해 달라고 요청하기"] },
  { id:"relationship", title:"관계·지원", resultTitle:"관계와 지원 부족형", description:"업무상 소통과 도움을 요청할 수 있는 관계가 충분하지 않을 수 있어요.", stableDescription:"동료와 상사 사이의 소통과 지원이 비교적 긍정적으로 유지되고 있어요.", personalActions:["사실·요청·기한을 구분해 업무 대화 기록하기","개인적 호불호와 업무상 쟁점을 분리해 정리하기"], organizationalActions:["정기적인 업무 피드백 또는 중립적 조율 요청하기","필요하면 인사·고충처리 등 공식 지원 채널 확인하기"] },
  { id:"job_security", title:"고용 안정성", resultTitle:"고용·직무 불안형", description:"계약, 역할 변화나 조직의 미래에 대한 불확실성이 부담을 키울 수 있어요.", stableDescription:"고용과 역할 변화에 관한 예측 가능성이 비교적 안정적으로 느껴져요.", personalActions:["확인된 정보와 추측을 구분해 적기","경력 자료와 비상 재정을 현실적으로 점검하기"], organizationalActions:["계약·역할 변경 기준과 일정을 공식 채널로 확인하기","조직 변화 시 사전 안내와 질의 시간을 요청하기"] },
  { id:"organization", title:"조직 체계", resultTitle:"조직 운영 혼선형", description:"책임 구조, 절차와 정보 공유의 혼선이 재작업과 불확실성을 만들 수 있어요.", stableDescription:"업무 절차와 정보 공유 체계가 비교적 명확하게 작동하고 있어요.", personalActions:["요청·결정·담당자·기한을 짧게 문서화하기","반복되는 재작업의 원인을 과정별로 정리하기"], organizationalActions:["책임자와 의사결정 절차를 명확히 해 달라고 요청하기","필요 인력·정보·도구의 우선 지원을 제안하기"] },
  { id:"reward", title:"보상·인정", resultTitle:"보상과 인정 불균형형", description:"노력과 책임에 비해 급여, 평가, 성장 기회 또는 존중이 부족하다고 느낄 수 있어요.", stableDescription:"기여에 대한 인정과 성장의 기회가 비교적 균형 있게 느껴져요.", personalActions:["성과와 추가 책임을 구체적인 사례로 정리하기","나에게 중요한 보상 조건을 금전·성장·존중으로 나누기"], organizationalActions:["평가·승진·보상 기준에 대한 구체적 피드백 요청하기","역할과 시장 수준을 바탕으로 처우 또는 성장 기회 협의하기"] },
  { id:"workplace_culture", title:"직장 문화", resultTitle:"직장 문화 부적합형", description:"조직의 소통 방식과 일·생활 경계가 내가 중요하게 여기는 기준과 다를 수 있어요.", stableDescription:"의견과 개인 시간을 존중하는 일하는 문화가 비교적 유지되고 있어요.", personalActions:["반복되는 문화적 부담과 일회성 갈등을 구분하기","근무시간 이후 응답 가능한 범위를 분명히 정하기"], organizationalActions:["연락 시간·회의·회식 등 팀 운영 원칙을 제안하기","의견 차이와 실수를 다루는 방식에 대한 팀 합의 요청하기"] }
];

export const jobStressLevels: JobStressLevel[] = [
  {id:"stable",minScore:0,maxScore:19,title:"안정적인 업무 적응형",icon:"🌿",summary:"업무 부담과 회복의 균형이 비교적 안정적으로 유지되고 있어요.",description:"최근 4주 동안 직장환경에서 체감한 부담은 비교적 낮은 편입니다. 스트레스가 전혀 없다는 뜻은 아니며, 현재 잘 유지되는 조건과 도움을 받을 수 있는 자원을 확인해 두면 바쁜 시기에도 균형을 지키는 데 도움이 됩니다."},
  {id:"light",minScore:20,maxScore:39,title:"가벼운 부담 감지형",icon:"🌤️",summary:"반복적으로 신경 쓰이는 직장 문제가 조금씩 감지되고 있어요.",description:"대부분의 상황은 감당하고 있지만 일부 환경에서 불편이나 피로가 나타날 수 있습니다. 일시적인 업무 증가인지 반복되는 구조적 문제인지 구분하고, 부담이 커지는 시간과 상황을 짧게 기록해 보세요."},
  {id:"accumulated",minScore:40,maxScore:59,title:"누적 스트레스 주의형",icon:"🟡",summary:"직장생활의 부담이 여러 영역에 걸쳐 쌓이고 있어요.",description:"최근 부담이 한 가지 사건보다 여러 업무 조건에서 누적되고 있을 가능성이 있습니다. 개인의 의지만으로 해결하기 어려운 요인도 있으므로, 점수가 높은 영역부터 우선순위·휴식·지원 가능성을 구체적으로 점검하는 것이 좋습니다."},
  {id:"high",minScore:60,maxScore:79,title:"높은 직무 부담형",icon:"🟠",summary:"현재의 일하는 방식이 장기간 지속되지 않도록 점검이 필요해요.",description:"업무환경에서 지속적으로 높은 부담을 경험하고 있을 가능성이 있습니다. 혼자 참는 것보다 업무량과 역할 조정, 관리자·인사 담당자와의 상담, 사내 고충처리 제도나 근로자 지원 프로그램 활용을 검토해 보세요."},
  {id:"active_review",minScore:80,maxScore:100,title:"적극적인 환경 점검 필요형",icon:"🔴",summary:"원인을 구분하고 구체적인 지원 방법을 찾을 시점이에요.",description:"직장생활의 여러 영역에서 높은 부담을 느끼고 있을 수 있습니다. 이는 능력이나 의지 부족을 뜻하지 않습니다. 휴식만으로 해결하기 어려운 구조가 있는지 확인하고 업무량, 역할, 근무환경과 지원 체계를 차례로 재협의해 보세요."}
];

export const getJobStressLevel = (score:number) => jobStressLevels.find((level)=>score>=level.minScore&&score<=level.maxScore) ?? jobStressLevels[0];
export const getJobStressLevelById = (id:string) => jobStressLevels.find((level)=>level.id===id);

export const jobStressTest: TestDefinition = {
  type:"likert", slug:"job-stress", title:"직무 스트레스 테스트", shortTitle:"직무 스트레스", cardTitle:"요즘 내 직장 스트레스는 어느 정도일까?", description:"업무량부터 인간관계, 보상, 조직문화까지 현재 나에게 가장 큰 직장 스트레스 원인을 확인해 보세요.", category:"직업.일상", duration:"약 4~5분", icon:"💼", thumbnail:"/tests/job-stress.jpg", participants:126, accent:"indigo", isNew:true, itemCount:32, questions:[], resultSlugs:[],
  seoTitle:"직무 스트레스 테스트 – 내 직장 스트레스 지수와 원인은? | 미미테스트",
  seoDescription:"32개의 직장생활 질문으로 현재 직무 스트레스 점수와 주요 원인을 확인해 보세요. 업무량, 관계, 조직문화, 보상, 고용 안정성 등 8개 영역별 결과를 제공합니다.",
  keywords:["직무 스트레스 테스트","직장 스트레스 테스트","직장인 스트레스 테스트","회사 스트레스 테스트","업무 스트레스 테스트","직장 스트레스 지수","직무 스트레스 원인","회사생활 심리 테스트","직장생활 테스트","직장 스트레스 자가진단"],
  seoContent:{ heading:"직무 스트레스 테스트란?", paragraphs:["직무 스트레스 테스트는 최근 4주 동안 직장생활에서 체감한 부담을 스스로 점검하는 자기이해형 테스트입니다. 업무·물리적 환경, 업무량, 자율성, 관계와 지원, 고용 안정성, 조직 체계, 보상과 인정, 직장 문화의 8개 영역을 각각 4문항으로 살펴봅니다.","결과에서는 0~100점의 자체 직무 스트레스 지수와 5단계 결과, 가장 부담이 큰 원인과 비교적 안정적인 업무 조건을 함께 보여드립니다. 개인이 점검할 행동과 조직에 요청하거나 협의할 내용을 나누어 안내하므로 모든 책임을 개인에게 돌리지 않습니다.","이 테스트는 표준화된 심리검사, 의료 진단, 산업안전보건 평가나 회사의 인사평가 도구가 아닙니다. 이름·회사명·직급 같은 개인정보를 받지 않으며 답변은 서버에 저장하지 않습니다."], faqs:[["어떤 기간을 기준으로 답하나요?","최근 4주 동안 반복적으로 경험한 직장생활을 기준으로 답해 주세요."],["점수는 어떻게 계산되나요?","8개 영역을 각각 0~100점으로 환산하고 동일한 비중으로 평균합니다. 긍정적인 환경을 묻는 문항은 역채점합니다."],["점수가 높으면 질환이나 번아웃을 의미하나요?","아닙니다. 직장환경에서 체감한 부담을 정리하는 참고용 점수이며 건강 상태를 진단하지 않습니다."],["답변이 회사나 서버에 저장되나요?","아니요. 진행 복구를 위해 현재 브라우저의 세션 저장소만 사용하며 완료 후 삭제합니다."]], assesses:"최근 4주간 직장환경의 8개 스트레스 요인과 체감 통제 가능성" }
};
