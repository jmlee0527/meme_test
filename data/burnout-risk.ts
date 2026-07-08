import type { BurnoutBranch, BurnoutQuestion, BurnoutResultProfile, TestDefinition } from "@/lib/types";

// CBI의 개인·업무·대인 소진 영역과 OLBI의 고갈·거리두기 구조만 참고해 새로 작성한 자체 문항입니다.
export const burnoutCommonQuestions: BurnoutQuestion[] = [
  { id:"c1", domain:"energy", text:"최근에는 하루를 시작하기 전부터 이미 에너지가 부족하다고 느낀다." },
  { id:"c2", domain:"disengagement", text:"해야 할 일에서 예전만큼 의미나 흥미를 느끼기 어렵다." },
  { id:"c3", domain:"interpersonal", text:"사람들과 대화하고 반응하는 일이 평소보다 버겁게 느껴진다." },
];

export const burnoutBranchQuestions: Record<BurnoutBranch, BurnoutQuestion[]> = {
  energy:[
    { id:"e1", domain:"recovery", reverse:true, text:"짧게라도 쉬고 나면 몸과 머리의 피로가 눈에 띄게 줄어든다." },
    { id:"e2", domain:"energy", text:"충분히 잤다고 생각해도 다음 날 피로가 그대로 남아 있다." },
    { id:"e3", domain:"energy", text:"평소 하던 간단한 일도 몸이 무거워 시작하기 어렵다." },
  ],
  disengagement:[
    { id:"d1", domain:"disengagement", text:"현재 하는 일이나 공부가 왜 중요한지 잘 모르겠다는 생각이 든다." },
    { id:"d2", domain:"disengagement", text:"가능하면 꼭 필요한 만큼만 하고 빨리 벗어나고 싶다." },
    { id:"d3", domain:"energy", text:"해야 할 일에 집중하려 해도 생각이 자주 흐려지거나 멈춘다." },
  ],
  interpersonal:[
    { id:"p1", domain:"interpersonal", text:"사람을 만나거나 연락에 답하는 것 자체가 부담스럽다." },
    { id:"p2", domain:"emotional", text:"평소라면 넘길 말이나 행동에도 감정이 쉽게 날카로워진다." },
    { id:"p3", domain:"interpersonal", text:"누구와도 이야기하지 않고 혼자 있고 싶은 욕구가 자주 든다." },
  ],
  recovery:[
    { id:"r1", domain:"recovery", reverse:true, text:"피로가 쌓일 때 나에게 효과적인 휴식 방법을 알고 실천한다." },
    { id:"r2", domain:"recovery", reverse:true, text:"스트레스가 커지면 일정이나 업무량을 현실적으로 조절할 수 있다." },
    { id:"r3", domain:"recovery", reverse:true, text:"힘든 상태를 알아차리면 주변에 도움을 요청할 수 있다." },
  ],
};

export const burnoutSharedQuestions: BurnoutQuestion[] = [
  { id:"s1", domain:"emotional", text:"작은 문제에도 감정이 빠르게 소모되고 여유를 되찾기 어렵다." },
  { id:"s2", domain:"energy", text:"일이나 공부를 마치고 나면 일상생활에 쓸 힘이 거의 남지 않는다." },
  { id:"s3", domain:"disengagement", text:"중요한 일도 완성도보다 최소한 끝내는 것에만 집중하게 된다." },
  { id:"s4", domain:"interpersonal", text:"다른 사람의 요청이나 감정에 공감할 여유가 줄었다고 느낀다." },
  { id:"s5", domain:"recovery", reverse:true, text:"잠깐 멈추고 쉬면 긴장이 가라앉고 다시 시작할 힘이 생긴다." },
  { id:"s6", domain:"recovery", reverse:true, text:"최근에도 수면, 운동, 취미 중 적어도 하나를 비교적 꾸준히 유지하고 있다." },
];

export const burnoutResultProfiles: BurnoutResultProfile[] = [
  { slug:"burnout-stable", name:"안정 상태", icon:"🌿", minScore:0, maxScore:19, summary:"현재 번아웃 위험은 낮은 편입니다.", description:"에너지와 일상 회복력이 비교적 균형을 이루고 있습니다. 지금의 생활 리듬과 회복 습관을 유지하되, 바쁜 시기에는 피로 신호를 무시하지 않는 것이 좋습니다.", baseGuides:["현재 유지 중인 수면·운동 루틴 지키기","주 1회 에너지 상태를 짧게 기록하기","바쁜 주간 뒤에는 회복 시간을 미리 확보하기"] },
  { slug:"burnout-fatigue", name:"초기 피로 누적형", icon:"🌤️", minScore:20, maxScore:39, summary:"심각한 단계는 아니지만 피로가 조금씩 쌓이고 있습니다.", description:"아직 일상을 유지할 힘은 있지만 회복 속도가 예전보다 느려질 수 있습니다. 일정이 더 바빠지기 전에 수면, 휴식과 업무량을 조절하면 비교적 빠르게 균형을 되찾을 가능성이 높습니다.", baseGuides:["이번 주 불필요한 일정 하나 줄이기","취침 전 30분을 화면 없는 시간으로 만들기","집중 업무 사이에 5분 회복 시간을 넣기"] },
  { slug:"burnout-caution", name:"번아웃 주의형", icon:"🟠", minScore:40, maxScore:59, summary:"에너지 고갈과 동기 저하가 함께 나타나는 단계입니다.", description:"단순히 며칠 피곤한 상태를 넘어 일이나 관계에서 심리적 거리를 두려는 경향이 나타날 수 있습니다. 의지만으로 버티기보다 실제 업무량과 일상 구조를 조정하는 계획이 필요합니다.", baseGuides:["회복을 방해하는 일정을 구체적으로 구분하기","상사·교수·가족과 현재 부담을 공유하기","최소 반나절의 완전한 비업무 시간을 확보하기"] },
  { slug:"burnout-high-risk", name:"고위험 번아웃형", icon:"🔴", minScore:60, maxScore:79, summary:"정서적 소진과 무기력, 거리두기 경향이 강하게 나타납니다.", description:"현재의 부담이 일상 회복 능력을 넘어섰을 가능성이 있습니다. 장기간 혼자 버티기보다 업무나 학업 조정 가능성을 확인하고, 믿을 수 있는 사람 또는 전문가와 상태를 나누는 것이 좋습니다.", baseGuides:["가능한 업무·학업 조정안을 문서로 정리하기","가까운 사람에게 현재 상태를 구체적으로 알리기","상담센터나 정신건강 전문가와 이야기할 일정 잡기"] },
  { slug:"burnout-intensive-recovery", name:"회복 필요 집중관리형", icon:"🆘", minScore:80, maxScore:100, summary:"일상 회복력이 크게 떨어져 적극적인 대응이 필요한 상태입니다.", description:"에너지 고갈과 정서적 부담이 여러 생활 영역에 영향을 주고 있을 가능성이 큽니다. 휴식만 미루며 버티지 말고 업무 조정, 주변 지원, 전문가 상담 등 실제 도움을 빠르게 연결하는 것을 권장합니다.", baseGuides:["오늘 안에 신뢰하는 사람 한 명에게 상태 알리기","업무·학업 중단 또는 조정 가능성을 담당자와 논의하기","지속되는 수면·불안·우울 문제는 전문가에게 상담받기"] },
];

export function getBurnoutResultProfile(slug:string) {
  return burnoutResultProfiles.find((profile)=>profile.slug===slug);
}

export const burnoutRiskTest: TestDefinition = {
  type:"adaptive", slug:"burnout-risk-test", title:"번아웃 위험도 테스트", shortTitle:"번아웃 자가 점검", cardTitle:"지금 나는 얼마나 지쳐 있을까?",
  description:"에너지 고갈과 정서적 소진, 관계 피로를 12개 질문으로 점검해보세요.", category:"심리", duration:"약 3분", icon:"🪫",
  participants:4674, accent:"green", isNew:true, itemCount:12, questions:[], resultSlugs:burnoutResultProfiles.map((profile)=>profile.slug),
  seoTitle:"번아웃 위험도 테스트 | 나의 번아웃 상태 자가진단", seoDescription:"에너지 고갈, 정서적 소진, 업무 스트레스, 대인관계 피로를 바탕으로 나의 번아웃 위험도를 확인해보세요.",
  keywords:["번아웃 테스트","번아웃 자가진단","직장인 번아웃","번아웃 증상","스트레스 테스트"],
  seoContent: {
    heading: "번아웃 테스트란?",
    paragraphs: [
      "번아웃 테스트는 에너지 고갈, 정서적 소진, 업무·학업 거리두기, 대인관계 피로, 회복 가능성 5개 영역으로 현재의 소진 상태를 살펴보는 번아웃 자가진단 테스트입니다. 번아웃은 단순한 피로와 달리 충분히 쉬어도 회복감이 잘 들지 않고, 일에 대한 냉소와 효능감 저하가 함께 나타나는 것이 특징입니다.",
      "아침에 일어나는 것이 유난히 힘들거나, 예전에는 즐겁던 일이 무의미하게 느껴지거나, 사람을 만나는 일 자체가 버겁게 느껴진다면 번아웃 증상을 의심해볼 수 있습니다. 이 테스트는 초반 응답에 따라 후속 질문이 달라지는 적응형 구성으로, 나의 상태에 더 가까운 질문을 통해 정확도를 높였습니다.",
      "결과에서는 안정 단계부터 집중 회복이 필요한 단계까지 위험도 점수와 영역별 상태, 지금 시도해볼 수 있는 회복 가이드를 안내합니다. 이 테스트는 의료적 진단이 아닌 자가 점검용 정보이며, 무기력과 소진이 오래 지속된다면 전문가 상담을 받아보는 것을 권장합니다.",
    ],
    faqs: [
      ["번아웃과 우울증은 다른가요?", "번아웃은 주로 일과 역할에서 오는 소진 상태를 말하고, 우울증은 삶 전반의 기분과 기능에 영향을 주는 의학적 상태입니다. 증상이 겹칠 수 있으므로 심하거나 오래 지속되면 전문가의 도움을 받는 것이 좋습니다."],
      ["결과가 높게 나오면 어떻게 해야 하나요?", "결과 페이지의 회복 가이드를 참고해 수면, 업무 경계 설정, 회복 활동부터 시작해보세요. 고위험 상태가 지속되면 상담이나 진료를 권장합니다."],
      ["직장인이 아니어도 할 수 있나요?", "네. 학업, 육아, 취업 준비 등 반복되는 역할에서 오는 소진도 같은 방식으로 점검할 수 있습니다."],
    ],
    assesses: "번아웃 위험도와 정서적 소진 수준",
  },
};
