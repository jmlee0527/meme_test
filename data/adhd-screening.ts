import type { TestDefinition, TestOption } from "@/lib/types";

export type AdhdDomain = "inattention" | "hyperactivity";
export type AdhdQuestion = {
  id: number;
  text: string;
  domain: AdhdDomain;
  weight: number;
  screener?: boolean;
  threshold?: number;
  options: TestOption[];
};
export type AdhdLevelProfile = {
  slug: string;
  level: number;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  description: string;
  strengths: string[];
  tips: string[];
};

const choices: TestOption[] = [
  { label: "1", text: "전혀 아니다", value: 0 },
  { label: "2", text: "거의 아니다", value: 1 },
  { label: "3", text: "가끔 그렇다", value: 2 },
  { label: "4", text: "자주 그렇다", value: 3 },
  { label: "5", text: "매우 자주 그렇다", value: 4 },
];

export const adhdQuestions: AdhdQuestion[] = [
  { id:1, domain:"inattention", weight:1.3, screener:true, threshold:2, text:"마감이 가까운 일에서 큰 부분은 끝냈지만, 마지막 확인과 정리를 남겨둔 채 다른 일로 넘어간 적이 있다.", options:choices },
  { id:2, domain:"inattention", weight:1.3, screener:true, threshold:2, text:"여러 단계가 필요한 일을 할 때 순서를 정하거나 필요한 자료를 한곳에 모으는 데 시간이 오래 걸렸다.", options:choices },
  { id:3, domain:"inattention", weight:1.25, screener:true, threshold:2, text:"캘린더나 알림을 확인했는데도 약속, 제출일 또는 해야 할 일을 뒤늦게 떠올린 적이 있다.", options:choices },
  { id:4, domain:"inattention", weight:1.35, screener:true, threshold:3, text:"집중해서 생각해야 하는 일을 알고 있으면서도 다른 작은 일부터 하며 시작을 계속 늦춘 적이 있다.", options:choices },
  { id:5, domain:"hyperactivity", weight:1.2, screener:true, threshold:3, text:"오래 앉아 있어야 하는 자리에서 손발을 움직이거나 자세를 자주 바꾸지 않으면 답답하게 느껴졌다.", options:choices },
  { id:6, domain:"hyperactivity", weight:1.25, screener:true, threshold:3, text:"쉴 수 있는 상황인데도 계속 무언가를 해야 할 것 같은 내부의 조급함을 느꼈다.", options:choices },
  { id:7, domain:"inattention", weight:1.0, text:"설명이나 문서를 읽을 때 중요한 조건을 지나쳐 나중에 다시 확인한 적이 있다.", options:choices },
  { id:8, domain:"inattention", weight:1.05, text:"반복적이거나 흥미가 적은 업무·수업에서 생각이 다른 곳으로 흐르는 것을 알아차렸다.", options:choices },
  { id:9, domain:"inattention", weight:1.0, text:"상대의 말을 듣고 있었지만 중간에 다른 생각에 빠져 방금 들은 내용을 다시 물은 적이 있다.", options:choices },
  { id:10, domain:"inattention", weight:1.0, text:"열쇠, 카드, 이어폰처럼 자주 쓰는 물건을 두었던 장소가 기억나지 않아 찾는 데 시간을 썼다.", options:choices },
  { id:11, domain:"inattention", weight:1.0, text:"한 가지 일을 하는 중 알림, 주변 소리 또는 떠오른 생각 때문에 원래 하던 흐름을 놓친 적이 있다.", options:choices },
  { id:12, domain:"hyperactivity", weight:1.0, text:"조용히 쉬거나 혼자 시간을 보낼 때 몸과 생각의 속도를 낮추기가 어려웠다.", options:choices },
  { id:13, domain:"hyperactivity", weight:1.0, text:"회의나 모임에서 자리에 머물러야 하지만 잠깐이라도 움직이고 싶다는 충동을 느꼈다.", options:choices },
  { id:14, domain:"hyperactivity", weight:1.0, text:"대화가 흥미로워지면 내가 말하는 시간이 길어졌다는 것을 뒤늦게 알아차린 적이 있다.", options:choices },
  { id:15, domain:"hyperactivity", weight:1.05, text:"질문이나 설명이 끝나기 전에 답이 떠올라 상대의 말을 마치기 전 반응한 적이 있다.", options:choices },
  { id:16, domain:"hyperactivity", weight:1.0, text:"줄을 서거나 순서를 기다릴 때 예상보다 강한 답답함이나 조급함을 느꼈다.", options:choices },
  { id:17, domain:"hyperactivity", weight:1.0, text:"다른 사람이 집중하고 있는 상황에서 생각난 말을 바로 전하거나 행동을 끼워 넣은 적이 있다.", options:choices },
  { id:18, domain:"inattention", weight:1.0, text:"해야 할 일이 여러 개 보이면 하나를 마치기 전에 다른 일을 시작해 미완성 상태가 늘어난 적이 있다.", options:choices },
];

const profile = (
  slug:string, level:number, name:string, icon:string, minScore:number, maxScore:number,
  summary:string, description:string, strengths:string[], tips:string[],
):AdhdLevelProfile => ({
  slug, level, name, icon, minScore, maxScore, summary,
  description:`${description} 이 결과는 최근 6개월의 응답 빈도를 바탕으로 한 참고용 자가 체크이며 ADHD를 확정하거나 배제하지 않습니다. 수면 부족, 불안과 우울, 스트레스, 신체 상태, 업무 환경 등도 비슷한 집중·기억·조급함을 만들 수 있습니다. 실제 진단은 증상이 어린 시절부터 이어졌는지, 여러 생활 영역에서 반복되는지, 일상 기능에 어느 정도 어려움을 주는지를 정신건강의학과 전문의가 종합적으로 평가해야 합니다. 점수 자체보다 반복되는 상황과 생활 영향도를 기록해 보는 것이 더 중요합니다.`,
  strengths, tips,
});

export const adhdLevelProfiles:AdhdLevelProfile[] = [
  profile("adhd-minimal",1,"ADHD 관련 특성이 거의 보이지 않음","🟢",0,24,"최근 응답에서는 주의조절과 충동조절의 어려움이 두드러지지 않았습니다.","대부분의 상황에서 해야 할 일을 시작하고 마무리하거나 대화와 기다림의 속도를 조절하는 편으로 나타났습니다. 가끔 깜빡하거나 집중이 흐트러지는 경험은 누구에게나 생길 수 있으며, 현재 응답만으로는 특정한 패턴이 강하게 반복된다고 보기 어렵습니다.",["안정적인 일상 루틴","과제 마무리 능력","기다림과 반응 조절","주의 전환 관리","계획을 실행하는 힘"],["현재 사용하는 일정·정리 방식을 유지하기","피로할 때 집중 변화 기록하기","수면과 운동 리듬 지키기","중요한 일은 계속 외부 알림으로 보조하기","어려움이 생기면 점수와 무관하게 상담하기"]),
  profile("adhd-some",2,"일부 특성이 관찰됨","🟢",25,44,"특정 상황에서 집중이나 실행의 어려움이 간헐적으로 나타날 수 있습니다.","흥미가 적거나 여러 단계가 필요한 일, 피곤한 날처럼 특정 조건에서 미루기·깜빡함·산만함 또는 조급함이 나타날 가능성이 있습니다. 다만 현재 응답에서는 모든 생활 영역에 걸쳐 강한 패턴이 지속된다고 보기는 어렵습니다. 어떤 환경에서 어려움이 늘고 줄어드는지 살펴보면 생활 조정에 도움이 됩니다.",["새로운 자극에 대한 호기심","빠른 아이디어 전환","상황에 따른 적응력","관심 분야의 몰입 가능성","에너지를 행동으로 옮기는 힘"],["하루 핵심 과제 세 개만 적기","일을 15분 단위로 작게 시작하기","물건의 고정 위치 만들기","알림을 행동 시점에 맞춰 설정하기","집중을 방해하는 조건 기록하기"]),
  profile("adhd-caution",3,"주의가 필요한 단계","🟡",45,59,"ADHD 관련 특성이 여러 일상 상황에서 반복되는 경향이 보입니다.","주의를 오래 유지하거나 일을 체계적으로 시작·마무리하는 장면, 혹은 기다림과 즉각적인 반응을 조절하는 장면에서 어려움이 반복될 수 있습니다. 지금의 패턴이 학업·업무·관계에 실제 불편을 주고 있다면 단순한 의지 문제로 여기기보다 구체적인 상황과 빈도를 기록해 볼 필요가 있습니다.",["풍부한 아이디어","관심 분야의 강한 몰입","빠른 상황 반응","새로운 방식 탐색","높은 활동 에너지"],["업무를 시작 행동까지 구체화하기","체크리스트를 눈에 보이는 곳에 두기","집중 시간과 쉬는 시간을 타이머로 나누기","수면·카페인·운동 변화 기록하기","생활 영향이 지속되면 전문가와 상의하기"]),
  profile("adhd-consult",4,"전문가 상담을 고려해볼 수 있는 단계","🟠",60,74,"ADHD 관련 특성이 비교적 자주 나타난 선별 결과입니다.","실행을 시작하고 순서를 유지하는 과정, 기억과 물건 관리, 대화·기다림에서의 충동조절 중 하나 이상이 일상에 반복적인 부담을 줄 가능성이 있습니다. 노력해도 같은 문제가 되풀이되거나 업무·학업·관계에서 손실이 생긴다면 자책보다 전문적인 선별 면담을 고려하는 편이 도움이 될 수 있습니다.",["빠른 연상과 아이디어","변화에 반응하는 민첩성","새로운 과제에 대한 에너지","위기 상황의 빠른 행동","관심 분야에 깊게 파고드는 힘"],["정신건강의학과 또는 임상심리 전문가에게 상담하기","최근 2주간 어려움과 영향을 메모하기","해야 할 일을 한 화면·한 목록으로 통합하기","집중 공간에서 알림과 시야 자극 줄이기","주변 사람과 구체적인 지원 방식 합의하기"]),
  profile("adhd-evaluation",5,"전문 평가를 권장하는 단계","🔴",75,100,"여러 ADHD 관련 특성이 높은 빈도로 보고된 자가 체크 결과입니다.","주의력 부족과 과잉행동·충동성 관련 경험이 다양한 일상 장면에서 자주 반복되는 것으로 나타났습니다. 이 선별 결과만으로 ADHD라고 판단할 수는 없지만, 어려움이 6개월 이상 이어지고 학업·업무·관계·안전에 영향을 준다면 정신건강의학과 전문의의 평가를 받아 원인을 구분하고 적절한 지원을 찾는 것을 권장합니다.",["빠르고 폭넓은 아이디어 생성","높은 탐색 욕구","강한 활동 에너지","새로운 환경에서의 순발력","흥미 영역의 집중 잠재력"],["전문의 평가 일정을 알아보기","어린 시절부터의 유사 경험 정리하기","가족·동료가 관찰한 패턴을 함께 확인하기","수면·불안·우울 등 유사 원인도 함께 상담하기","즉각적인 안전 위험이 있다면 지체하지 말고 도움받기"]),
];

export const adhdScreeningTest:TestDefinition = {
  type:"quiz", slug:"adhd-self-check", title:"ADHD 자가진단 테스트", shortTitle:"ADHD 자가 체크",
  cardTitle:"성인 ADHD 자가 체크", description:"최근 6개월의 행동을 바탕으로 주의력 부족과 과잉행동·충동성 관련 특성을 확인해보세요.",
  category: "건강.운세", duration:"약 4분", icon:"🧠", thumbnail:"/tests/adhd-self-check.jpg", participants:2861, accent:"teal", isNew:true,
  itemCount:adhdQuestions.length, questions:adhdQuestions.map(({id,text,options})=>({id,text,options})), resultSlugs:[],
  seoTitle:"ADHD 테스트 | 성인 ADHD 자가진단·자가 체크",
  seoDescription:"최근 6개월의 집중, 계획, 기억, 충동조절 경험을 바탕으로 ADHD 관련 특성을 확인하는 성인 ADHD 자가 체크입니다.",
  keywords:["ADHD 테스트","ADHD 자가진단","성인 ADHD 테스트","ADHD 검사","ADHD 자가 체크","ADHD 증상 테스트"],
  seoContent:{
    heading:"성인 ADHD 자가 체크란?",
    paragraphs:[
      "ADHD 자가진단 테스트는 최근 6개월 동안 나타난 주의력 부족과 과잉행동·충동성 관련 경험을 돌아보는 참고용 선별 콘텐츠입니다. 세계적으로 사용되는 WHO 성인 ADHD 자기보고 척도 ASRS의 18개 증상 영역과 6개 핵심 선별 개념을 참고하되, 공식 문항을 번역하거나 복제하지 않고 일상적인 한국어 상황으로 새롭게 구성했습니다.",
      "이 테스트는 ADHD를 진단하는 의료검사가 아닙니다. 자가 체크와 선별검사는 전문의 진단을 대신할 수 없으며, ADHD 진단은 현재 증상의 빈도뿐 아니라 어린 시절부터의 지속 여부, 가정·학교·직장 등 여러 환경에서의 양상, 실제 기능 손상과 다른 원인의 가능성을 함께 평가해야 합니다.",
      "수면 문제, 불안, 우울, 높은 스트레스와 다른 건강 상태도 집중 저하, 기억의 어려움, 안절부절함과 비슷한 경험을 만들 수 있습니다. 결과가 높거나 낮더라도 일상생활에 반복적인 어려움이 있다면 정신건강의학과 전문의와 상담해 정확한 평가를 받아보는 것이 좋습니다.",
    ],
    faqs:[
      ["이 테스트로 ADHD를 진단할 수 있나요?","아니요. ADHD 관련 특성을 살펴보는 참고용 자가 체크이며 정확한 진단은 정신건강의학과 전문의의 종합 평가가 필요합니다."],
      ["공식 ASRS 검사와 같은 문항인가요?","아닙니다. ASRS의 평가 영역과 최근 6개월 빈도 구조만 참고했으며 모든 문항과 결과 문구는 새롭게 작성했습니다."],
      ["점수가 높으면 반드시 ADHD인가요?","아닙니다. 수면, 스트레스, 불안, 우울 등 다른 원인도 비슷한 경험을 만들 수 있으므로 전문적인 감별이 필요합니다."],
      ["언제 상담을 고려하면 좋나요?","관련 어려움이 6개월 이상 지속되거나 학업, 업무, 관계, 안전에 반복적인 영향을 준다면 점수와 관계없이 상담을 고려하세요."],
    ],
    assesses:"최근 6개월의 성인 ADHD 관련 주의력 부족 및 과잉행동·충동성 특성",
  },
};

export const getAdhdLevelProfile=(slug:string)=>adhdLevelProfiles.find((profile)=>profile.slug===slug);
