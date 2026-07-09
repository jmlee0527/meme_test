export type FiveElement = "wood" | "fire" | "earth" | "metal" | "water";
export type YinYang = "yin" | "yang" | "neutral";
export type ElementScores = Record<FiveElement, number>;

export type NameSyllableAnalysis = {
  char: string;
  initial: string;
  vowel: string;
  final: string | null;
  initialElement: FiveElement;
  vowelElement: FiveElement;
  yinYang: YinYang;
};

export type NameAnalysis = {
  name: string;
  syllables: NameSyllableAnalysis[];
  elements: ElementScores;
  yinRatio: number;
  yangRatio: number;
  primaryElement: FiveElement;
  lackingElements: FiveElement[];
  internalFlow: number;
  stability: number;
};

export type CompatibilityResult = {
  man: NameAnalysis;
  woman: NameAnalysis;
  score: number;
  level: string;
  stars: string;
  summary: string;
  components: {
    elementHarmony: number;
    complement: number;
    yinYangBalance: number;
    pronunciation: number;
    energyFlow: number;
    stability: number;
  };
  combinedElements: ElementScores;
  strengths: string[];
  cautions: string[];
  loveStyle: string;
  conflictReason: string;
  tips: string[];
  analysis: string;
};

const INITIALS = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const VOWELS = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const FINALS = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
export const ELEMENT_LABELS: Record<FiveElement, string> = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" };
const ELEMENTS: FiveElement[] = ["wood", "fire", "earth", "metal", "water"];

// 훈민정음 오음의 조음 위치를 현대 초성에 확장한 발음오행 표.
const INITIAL_ELEMENT: Record<string, FiveElement> = {
  "ㄱ":"wood","ㄲ":"wood","ㅋ":"wood",
  "ㄴ":"fire","ㄷ":"fire","ㄸ":"fire","ㄹ":"fire","ㅌ":"fire",
  "ㅇ":"earth","ㅎ":"earth",
  "ㅅ":"metal","ㅆ":"metal","ㅈ":"metal","ㅉ":"metal","ㅊ":"metal",
  "ㅁ":"water","ㅂ":"water","ㅃ":"water","ㅍ":"water",
};

// 모음 배속은 학파별 차이가 있어 천지인·양성/음성 계열을 바탕으로 한 보조 분류로만 사용합니다.
const VOWEL_ELEMENT: Record<string, FiveElement> = {
  "ㅏ":"wood","ㅐ":"wood","ㅑ":"wood","ㅒ":"wood","ㅘ":"wood",
  "ㅗ":"fire","ㅛ":"fire","ㅚ":"fire","ㅙ":"fire",
  "ㅡ":"earth","ㅢ":"earth",
  "ㅓ":"metal","ㅔ":"metal","ㅕ":"metal","ㅖ":"metal","ㅝ":"metal",
  "ㅜ":"water","ㅠ":"water","ㅟ":"water","ㅞ":"water","ㅣ":"water",
};
const YANG_VOWELS = new Set(["ㅏ","ㅐ","ㅑ","ㅒ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ"]);
const YIN_VOWELS = new Set(["ㅓ","ㅔ","ㅕ","ㅖ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ"]);

const generates: Record<FiveElement, FiveElement> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
const controls: Record<FiveElement, FiveElement> = { wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" };

export function normalizeKoreanName(value: string) {
  return value.normalize("NFC").replace(/\s+/g, "").replace(/[^가-힣]/g, "").slice(0, 6);
}

export function isValidKoreanName(value: string) {
  return /^[가-힣]{2,6}$/.test(normalizeKoreanName(value));
}

function decompose(char: string): NameSyllableAnalysis {
  const code = char.charCodeAt(0) - 0xac00;
  const initialIndex = Math.floor(code / 588);
  const vowelIndex = Math.floor((code % 588) / 28);
  const finalIndex = code % 28;
  const initial = INITIALS[initialIndex];
  const vowel = VOWELS[vowelIndex];
  const final = FINALS[finalIndex] || null;
  return {
    char, initial, vowel, final,
    initialElement: INITIAL_ELEMENT[initial] ?? "earth",
    vowelElement: VOWEL_ELEMENT[vowel] ?? "earth",
    yinYang: YANG_VOWELS.has(vowel) ? "yang" : YIN_VOWELS.has(vowel) ? "yin" : "neutral",
  };
}

function emptyElements(): ElementScores {
  return { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
}

function relationScore(a: FiveElement, b: FiveElement) {
  if (a === b) return 72;
  if (generates[a] === b || generates[b] === a) return 94;
  if (controls[a] === b || controls[b] === a) return 38;
  return 62;
}

function distributionStability(values: ElementScores) {
  const average = 20;
  const deviation = ELEMENTS.reduce((sum, key) => sum + Math.abs(values[key] - average), 0) / 2;
  return Math.round(Math.max(25, 100 - deviation * 1.5));
}

export function analyzeName(rawName: string): NameAnalysis {
  const name = normalizeKoreanName(rawName);
  if (!isValidKoreanName(name)) throw new Error("한글 이름을 2~6자로 입력해 주세요.");
  const syllables = [...name].map(decompose);
  const raw = emptyElements();
  syllables.forEach((syllable) => {
    raw[syllable.initialElement] += 1;
    raw[syllable.vowelElement] += 0.72;
    if (syllable.final) raw[INITIAL_ELEMENT[syllable.final[0]] ?? "earth"] += 0.32;
  });
  const total = ELEMENTS.reduce((sum, key) => sum + raw[key], 0);
  const elements = Object.fromEntries(ELEMENTS.map((key) => [key, Math.round(raw[key] / total * 100)])) as ElementScores;
  const polarity = syllables.reduce((acc, item) => {
    if (item.yinYang === "yin") acc.yin += 1;
    else if (item.yinYang === "yang") acc.yang += 1;
    else { acc.yin += .5; acc.yang += .5; }
    return acc;
  }, { yin: 0, yang: 0 });
  const transitions = syllables.slice(1).map((item, index) => relationScore(syllables[index].initialElement, item.initialElement));
  const internalFlow = transitions.length ? Math.round(transitions.reduce((a, b) => a + b, 0) / transitions.length) : 65;
  const primaryElement = [...ELEMENTS].sort((a, b) => elements[b] - elements[a])[0];
  const lackingElements = ELEMENTS.filter((key) => elements[key] < 8);
  return {
    name, syllables, elements,
    yinRatio: Math.round(polarity.yin / syllables.length * 100),
    yangRatio: Math.round(polarity.yang / syllables.length * 100),
    primaryElement, lackingElements, internalFlow,
    stability: distributionStability(elements),
  };
}

function crossElementHarmony(a: NameAnalysis, b: NameAnalysis) {
  const pairs = a.syllables.flatMap((left) => b.syllables.map((right) => relationScore(left.initialElement, right.initialElement)));
  return Math.round(pairs.reduce((sum, value) => sum + value, 0) / pairs.length);
}

function complementScore(a: NameAnalysis, b: NameAnalysis) {
  const combined = ELEMENTS.map((key) => (a.elements[key] + b.elements[key]) / 2);
  const balance = 100 - combined.reduce((sum, value) => sum + Math.abs(value - 20), 0) * 1.1;
  const filled = ELEMENTS.filter((key) => (a.elements[key] < 8 && b.elements[key] >= 18) || (b.elements[key] < 8 && a.elements[key] >= 18)).length;
  return Math.round(Math.min(100, Math.max(30, balance + filled * 7)));
}

function pronunciationScore(a: NameAnalysis, b: NameAnalysis) {
  const lengthFit = 100 - Math.abs(a.syllables.length - b.syllables.length) * 10;
  const finalRatioA = a.syllables.filter((s) => s.final).length / a.syllables.length;
  const finalRatioB = b.syllables.filter((s) => s.final).length / b.syllables.length;
  const rhythmFit = 100 - Math.abs(finalRatioA - finalRatioB) * 45;
  const lastA = a.syllables[a.syllables.length - 1];
  const firstB = b.syllables[0];
  const bridge = relationScore(lastA.initialElement, firstB.initialElement);
  return Math.round(lengthFit * .3 + rhythmFit * .35 + bridge * .35);
}

function scoreLevel(score: number) {
  if (score >= 95) return ["천생연분", "★★★★★"];
  if (score >= 90) return ["최고의 궁합", "★★★★★"];
  if (score >= 80) return ["서로 성장하는 궁합", "★★★★☆"];
  if (score >= 70) return ["좋은 궁합", "★★★★☆"];
  if (score >= 60) return ["노력이 필요한 궁합", "★★★☆☆"];
  if (score >= 50) return ["성향 차이가 있는 궁합", "★★☆☆☆"];
  if (score >= 40) return ["많은 이해가 필요한 궁합", "★★☆☆☆"];
  return ["매우 다른 성향의 궁합", "★☆☆☆☆"];
}

export function calculateNameCompatibility(manName: string, womanName: string): CompatibilityResult {
  const man = analyzeName(manName);
  const woman = analyzeName(womanName);
  const elementHarmony = crossElementHarmony(man, woman);
  const complement = complementScore(man, woman);
  const combinedYin = (man.yinRatio + woman.yinRatio) / 2;
  const yinYangBalance = Math.round(Math.max(35, 100 - Math.abs(combinedYin - 50) * 1.45));
  const pronunciation = pronunciationScore(man, woman);
  const energyFlow = Math.round((man.internalFlow + woman.internalFlow + relationScore(man.primaryElement, woman.primaryElement)) / 3);
  const stability = Math.round((man.stability + woman.stability) / 2);
  const components = { elementHarmony, complement, yinYangBalance, pronunciation, energyFlow, stability };
  const rawScore = elementHarmony * .28 + complement * .18 + yinYangBalance * .15 + pronunciation * .14 + energyFlow * .15 + stability * .10;
  // 음절 수가 짧은 한국 이름에서는 가중 평균이 중앙에 몰리므로 관계 차이를 보존한 채 70점을 중심으로 분산을 확장합니다.
  const score = Math.round(Math.min(98, Math.max(18, 70 + (rawScore - 70) * 2.1)));
  const [level, stars] = scoreLevel(score);
  const combinedElements = Object.fromEntries(ELEMENTS.map((key) => [key, Math.round((man.elements[key] + woman.elements[key]) / 2)])) as ElementScores;
  const generated = generates[man.primaryElement] === woman.primaryElement || generates[woman.primaryElement] === man.primaryElement;
  const controlled = controls[man.primaryElement] === woman.primaryElement || controls[woman.primaryElement] === man.primaryElement;
  const strengths = [
    generated ? "주된 오행 사이에 상생 흐름이 형성됩니다." : "서로 다른 기운이 관계에 다양한 관점을 더합니다.",
    complement >= 70 ? "한쪽에 부족한 오행을 상대 이름이 보완합니다." : "각자의 강한 기운이 역할을 분명하게 만듭니다.",
    yinYangBalance >= 70 ? "음양 에너지의 속도와 표현 방식이 비교적 균형적입니다." : "서로 다른 에너지 속도가 관계에 변화를 줍니다.",
    pronunciation >= 70 ? "이름의 음절 길이와 받침 리듬이 자연스럽게 이어집니다." : "서로 다른 발음 리듬이 각자의 개성을 살립니다.",
    energyFlow >= 70 ? "이름 내부와 이름 사이의 에너지 전환이 매끄러운 편입니다." : "관계를 통해 새로운 에너지 사용법을 배울 수 있습니다.",
  ];
  const cautions = [
    controlled ? "주된 오행에 상극 관계가 있어 결정 방식이 부딪힐 때 속도를 늦추는 것이 좋습니다." : "상대가 같은 방식으로 느낄 것이라 단정하지 않는 것이 좋습니다.",
    yinYangBalance < 65 ? "한쪽이 빠르게 표현할 때 다른 쪽은 생각할 시간을 필요로 할 수 있습니다." : "균형이 좋아도 감정을 알아서 이해해 줄 것이라 기대하지 마세요.",
    complement < 60 ? "두 이름에서 함께 약한 오행의 성향은 의식적으로 역할을 나누어 보완해 보세요." : "보완 관계가 의존 관계로 굳지 않도록 각자의 선택을 존중하세요.",
    pronunciation < 65 ? "대화의 말투와 결론을 내리는 리듬이 다르게 느껴질 수 있습니다." : "대화가 잘 통할수록 중요한 합의를 말로 확인하는 습관이 필요합니다.",
    "이름 분석은 실제 관계의 경험과 선택을 대신하지 않으므로 결과를 단정적으로 사용하지 마세요.",
  ];
  const summary = score >= 80 ? "서로의 기운을 살리며 함께 성장하기 좋은 이름 조합입니다." : score >= 60 ? "다른 점을 이해할수록 장점이 또렷해지는 이름 조합입니다." : "표현 속도와 기준이 달라 충분한 대화가 중요한 이름 조합입니다.";
  const loveStyle = yinYangBalance >= 72
    ? "두 사람은 관계에서 다가가는 힘과 기다리는 힘을 번갈아 쓰기 좋은 편입니다. 함께 계획을 세우되 각자의 시간을 남겨둘 때 편안함이 커집니다."
    : "한 사람은 반응과 실행을, 다른 사람은 관찰과 정리를 먼저 할 가능성이 있습니다. 애정 표현의 속도가 다르다는 점을 미리 인정하면 오해가 줄어듭니다.";
  const conflictReason = controlled
    ? "주요 오행 사이의 상극 흐름은 누가 옳은지보다 문제를 해결하는 순서에서 충돌하는 모습으로 나타날 수 있습니다. 즉답을 원하는 쪽과 충분히 생각하려는 쪽이 시간을 합의하는 것이 중요합니다."
    : "큰 충돌보다 기대를 말하지 않고도 알아주길 바랄 때 서운함이 쌓일 수 있습니다. 역할과 감정을 구체적인 문장으로 확인하면 갈등이 오래 남지 않습니다.";
  const tips = ["감정이 올라왔을 때 결론보다 현재 필요한 것을 먼저 말하기", "각자 잘하는 역할과 부담스러운 역할을 정기적으로 바꾸어 보기", "중요한 약속은 암묵적으로 넘기지 말고 문장으로 확인하기", "서로의 혼자 있는 시간과 관계 시간을 함께 일정에 넣기", "이름 궁합보다 실제 행동과 존중을 관계 판단의 중심에 두기"];
  const analysis = `${man.name} 이름은 ${ELEMENT_LABELS[man.primaryElement]} 기운이 중심이며, ${woman.name} 이름은 ${ELEMENT_LABELS[woman.primaryElement]} 기운이 중심으로 나타납니다. 두 이름의 초성은 훈민정음 오음의 조음 위치를 바탕으로 목·화·토·금·수에 배속했고, 모음은 양성·음성·중성 및 천지인 계열을 보조적으로 반영했습니다. ${generated ? "주요 기운 사이에 상생 관계가 있어 한 사람의 표현과 행동이 다른 사람의 성장을 북돋는 흐름이 보입니다." : controlled ? "주요 기운 사이에 상극 관계가 포함되어 있어 서로의 방식이 강하게 느껴질 수 있지만, 역할을 분명히 나누면 긴장감이 추진력으로 바뀔 수 있습니다." : "주요 기운은 직접적인 상생·상극보다 각자의 영역을 유지하며 연결되는 흐름에 가깝습니다."} 두 이름을 합친 오행 분포의 보완 점수는 ${complement}점, 음양 균형은 ${yinYangBalance}점입니다. ${man.name}의 내부 에너지 흐름은 ${man.internalFlow}점, ${woman.name}은 ${woman.internalFlow}점으로 계산되며, 두 이름을 이어 읽었을 때의 음절 길이·받침 비율·초성 연결을 반영한 발음 조화는 ${pronunciation}점입니다. ${summary} 오행이 고르게 분포한다고 늘 좋은 관계를 뜻하는 것은 아니며, 한쪽에 집중된 기운도 역할과 생활 리듬을 분명하게 만드는 장점이 있습니다. 반대로 부족한 기운을 상대가 채우는 조합은 자연스러운 보완이 될 수 있지만, 특정 역할을 한 사람에게만 맡기면 부담으로 바뀔 수 있습니다. 따라서 점수보다 두 이름이 어디에서 비슷하고 어디에서 다른지를 대화의 참고점으로 사용하는 것이 좋습니다. 다만 이 분석은 생년월일이나 한자를 사용하지 않으므로 사주, 자원오행, 획수 수리를 판단한 결과가 아닙니다. 이름의 소리 구조를 전통 오행 관점으로 해석한 엔터테인먼트형 참고 정보이며, 실제 궁합은 대화와 존중, 함께 쌓은 경험에 의해 달라집니다.`;
  return { man, woman, score, level, stars, summary, components, combinedElements, strengths, cautions, loveStyle, conflictReason, tips, analysis };
}
