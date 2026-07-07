export type ResultSlug =
  | "blog"
  | "smart-store"
  | "affiliate-marketing"
  | "airbnb"
  | "unmanned-store"
  | "emoticon-creator"
  | "youtube"
  | "tiktok"
  | "app-development"
  | "web-development"
  | "delivery-rider"
  | "ebook"
  | "online-class"
  | "talent-market"
  | "sns-monetization"
  | "secondhand-trading"
  | "reselling"
  | "data-labeling"
  | "part-time-job"
  | "digital-template";

export type TestOption = { label: string; text: string; value: number };
export type TestQuestion = { id: number; text: string; options?: TestOption[] };

export type ResultProfile = {
  slug: ResultSlug;
  name: string;
  icon: string;
  tagline: string;
  reason: string;
  analysis: string;
  difficulty: "쉬움" | "보통" | "어려움";
  initialCost: string;
  monetizationSpeed: string;
  pros: string[];
  cons: string[];
  firstSteps: string[];
  platforms: string[];
  vector: number[];
};

export type TestDefinition = {
  type?: "quiz" | "worldcup" | "adaptive" | "likert" | "fortune";
  slug: string;
  href?: string;
  title: string;
  shortTitle: string;
  cardTitle?: string;
  description: string;
  category: string;
  duration: string;
  icon: string;
  questions: TestQuestion[];
  resultSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  participants: number;
  accent: "blue" | "orange" | "pink" | "purple" | "green" | "indigo" | "teal";
  isNew?: boolean;
  itemCount?: number;
};

export type FortuneCardId =
  | "start"
  | "chance"
  | "rest"
  | "love"
  | "focus"
  | "luck"
  | "change"
  | "growth"
  | "balance"
  | "courage";

export type FortuneGrade = "매우 좋음" | "좋음" | "은은한 행운" | "차분한 상승";

export type FortuneCard = {
  id: FortuneCardId;
  name: string;
  description: string;
  icon: string;
  symbol: string;
};

export type FortuneResult = {
  id: string;
  cardId: FortuneCardId;
  grade: FortuneGrade;
  score: number;
  total: string;
  money: string;
  love: string;
  work: string;
  caution: string;
  luckyColor: string;
  luckyNumber: number;
  luckyItem: string;
  message: string;
};

export type ScoredResult = ResultProfile & { score: number; percentage: number };

export type AnimalSlug =
  | "office-rat" | "office-ox" | "office-tiger" | "office-rabbit"
  | "office-dragon" | "office-snake" | "office-horse" | "office-sheep"
  | "office-monkey" | "office-rooster" | "office-dog" | "office-pig";

export type AnimalProfile = {
  slug: AnimalSlug;
  animal: string;
  emoji: string;
  alias: string;
  summary: string;
  traits: string[];
  workplaceScene: string;
  bossRelation: string;
  colleagueRelation: string;
  workStyle: string;
  strengths: string[];
  weaknesses: string[];
  roles: string[];
  famousCharacter: string;
};

export type ScoredAnimal = AnimalProfile & { score: number; percentage: number };

export type MarriageTendency =
  | "marriageIntent" | "relationshipReady" | "financialReady"
  | "careerPriority" | "independence" | "familyPressure"
  | "stability" | "romanticImpulse" | "cautiousness";

export type MarriageResultSlug =
  | "marriage-fast" | "marriage-stable-prep" | "marriage-career-first"
  | "marriage-free-romance" | "marriage-careful-decision" | "marriage-independent-life";

export type MarriageResultProfile = {
  slug: MarriageResultSlug;
  name: string;
  icon: string;
  summary: string;
  ageOffset?: [number, number];
  analysis: string;
  accelerators: string[];
  delays: string[];
  partnerType: string;
  preparations: string[];
};

export type MarriageScores = Record<MarriageTendency, number>;

export type KkondaeResultSlug = "kkondae-clean-zone" | "kkondae-signal" | "kkondae-latte" | "kkondae-pro-latte" | "kkondae-master";
export type KkondaeResultProfile = {
  slug: KkondaeResultSlug;
  name: string;
  icon: string;
  minScore: number;
  maxScore: number;
  summary: string;
  analysis: string;
  traits: string[];
  caution: string;
  phrases: string[];
  methods: string[];
  shareText: string;
};

export type FoodWorldcupItem = {
  slug: string;
  resultSlug: string;
  name: string;
  emoji: string;
  image: string;
  description: string;
  recommendation: string;
  deliveryTip: string;
  sides: string[];
  reasons: string[];
};

export type BurnoutDomain = "energy" | "emotional" | "disengagement" | "interpersonal" | "recovery";
export type BurnoutBranch = "energy" | "disengagement" | "interpersonal" | "recovery";
export type BurnoutQuestion = { id:string; text:string; domain:BurnoutDomain; reverse?:boolean };
export type BurnoutResultSlug = "burnout-stable" | "burnout-fatigue" | "burnout-caution" | "burnout-high-risk" | "burnout-intensive-recovery";
export type BurnoutResultProfile = {
  slug:BurnoutResultSlug;
  name:string;
  icon:string;
  minScore:number;
  maxScore:number;
  summary:string;
  description:string;
  baseGuides:string[];
};
export type BurnoutDomainScores = Record<BurnoutDomain, number>;

export type ConsumerDomain = "planning" | "impulsivity" | "experience" | "future" | "quality";
export type ConsumerQuestion = { id:string; text:string; domain:ConsumerDomain; reverse?:boolean };
export type ConsumerResultSlug = "consumer-investment-ready" | "consumer-value-explorer" | "consumer-experience-first" | "consumer-premium-seeker" | "consumer-flex" | "consumer-impulsive";
export type ConsumerDomainScores = Record<ConsumerDomain,number>;
export type ConsumerResultProfile = {
  slug:ConsumerResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  recommendations:string[];
  typicalScores:ConsumerDomainScores;
};

export type LoveDomain = "stability" | "expression" | "leadership" | "independence" | "loveLanguage";
export type LoveLanguage = "words" | "time" | "gifts" | "acts" | "touch";
export type LoveQuestion = { id:string; text:string; domain:LoveDomain; reverse?:boolean; loveLanguage?:LoveLanguage };
export type LoveResultSlug = "love-gentle-secure" | "love-passionate-direct" | "love-devoted-carer" | "love-free-independent" | "love-thrill-seeker" | "love-careful-observer" | "love-emotional-immersive" | "love-tsundere-avoidant";
export type LoveDomainScores = Record<LoveDomain,number>;
export type LoveLanguageScores = Record<LoveLanguage,number>;
export type LoveResultProfile = {
  slug:LoveResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  relationshipStyle:string;
  traits:string[];
  strengths:string[];
  cautions:string[];
  idealPartner:string;
  relationshipNeed:string;
  relationshipGift:string;
  conflictPattern:string;
  typicalScores:LoveDomainScores;
  typicalLanguage:LoveLanguage;
};

export type AttachmentDomain = "anxiety" | "avoidance";
export type AttachmentQuestion = { id:string; text:string; domain:AttachmentDomain; reverse?:boolean };
export type AttachmentResultSlug = "attachment-secure" | "attachment-anxious" | "attachment-avoidant" | "attachment-fearful";
export type AttachmentAxisScores = Record<AttachmentDomain,number>;
export type AttachmentResultProfile = {
  slug:AttachmentResultSlug;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  tips:string[];
  goodFit:string;
  watchPattern:string;
  matrixLabel:string;
  shareText:string;
};

export type JoseonTrait = "leadership" | "intelligence" | "creativity" | "adventure" | "empathy" | "practicality";
export type JoseonScores = Record<JoseonTrait, number>;
export type JoseonQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<JoseonScores>, Partial<JoseonScores>] };
export type JoseonResultProfile = {
  slug:string;
  name:string;
  icon:string;
  summary:string;
  personality:string;
  joseonLife:string;
  modernJobs:string[];
  famousComparison:string;
  shareText:string;
  targetScores:JoseonScores;
};

export type CountryTrait = "openness" | "structure" | "socialEnergy" | "independence" | "nature" | "ambition" | "culture" | "safety";
export type CountryScores = Record<CountryTrait, number>;
export type CountryQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<CountryScores>, Partial<CountryScores>] };
export type CountryResultProfile = {
  slug:string;
  country:string;
  flag:string;
  summary:string;
  personality:string;
  matchReason:string;
  lifestyle:string;
  keywords:string[];
  similarCountries:string[];
  shareText:string;
  targetScores:CountryScores;
};

export type LoverTrait =
  | "care"        // 배려심
  | "responsibility" // 책임감
  | "expression"  // 표현력
  | "stability"   // 안정감
  | "conflict"    // 갈등해결력
  | "independence"// 독립성
  | "humor"       // 유머감각
  | "trust";      // 신뢰도

export type LoverScores = Record<LoverTrait, number>;
export type LoverQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<LoverScores>, Partial<LoverScores>] };
export type LoverResultSlug =
  | "lover-perfect-partner"          // 98점 완벽한 애인감
  | "lover-marriage-material"        // 95점 결혼까지 생각나는 타입
  | "lover-reliable-partner"         // 92점 믿고 기대고 싶은 타입
  | "lover-exciting-heartflutter"    // 89점 설렘을 잘 주는 타입
  | "lover-warm-but-awkward"         // 86점 다정하지만 표현이 서툰 타입
  | "lover-comfy-friendlike"         // 83점 친구 같은 편안한 타입
  | "lover-free-relationship"        // 80점 자유로운 연애 타입
  | "lover-slow-to-open"             // 77점 천천히 가까워지는 타입
  | "lover-push-pull-charm"          // 74점 매력은 있지만 밀당이 있는 타입
  | "lover-solo-time-important"      // 71점 혼자만의 시간이 중요한 타입
  | "lover-needs-expression-practice"// 68점 감정 표현 연습이 필요한 타입
  | "lover-growing-potential";       // 65점 연애 성장 가능성이 큰 타입

export type LoverResultProfile = {
  slug:LoverResultSlug;
  name:string;
  scoreLabel:string;
  icon:string;
  summary:string;
  description:string;
  reason:string;
  strengths:string[];
  cautions:string[];
  idealPartner:string;
  goodMatchTypes:string[];
  shareTextTemplate:string;
  typicalScores:LoverScores;
};

export type ColorPersonalityTrait = "extraversion" | "planning" | "emotion" | "empathy" | "challenge" | "stability" | "creativity" | "independence" | "realism" | "intuition";
export type ColorPersonalityScores = Record<ColorPersonalityTrait, number>;
export type ColorPersonalitySlug = "red" | "blue" | "green" | "yellow" | "purple" | "pink" | "orange" | "black" | "white" | "brown" | "turquoise" | "navy" | "gold" | "silver" | "lavender" | "rainbow";
export type ColorPersonalityQuestion = { id:number; text:string; options:TestOption[]; weights:[Partial<Record<ColorPersonalitySlug, number>>, Partial<Record<ColorPersonalitySlug, number>>] };
export type ColorPersonalityProfile = {
  slug:ColorPersonalitySlug;
  colorName:string;
  englishName:string;
  typeName:string;
  emoji:string;
  hex:string;
  gradient:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  relationshipStyle:string;
  loveStyle:string;
  stressStyle:string;
  careerStyle:string;
  goodMatches:ColorPersonalitySlug[];
  difficultMatches:ColorPersonalitySlug[];
  shareText:string;
  traitScores:ColorPersonalityScores;
};

export type EnneagramTypeKey = "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7" | "type8" | "type9";
export type EnneagramScores = Record<EnneagramTypeKey, number>;
export type EnneagramResultSlug = "type-1" | "type-2" | "type-3" | "type-4" | "type-5" | "type-6" | "type-7" | "type-8" | "type-9";
export type EnneagramQuestion = { id:number; text:string; options:TestOption[]; weights:Partial<EnneagramScores>[] };
export type EnneagramProfile = {
  slug:EnneagramResultSlug;
  typeKey:EnneagramTypeKey;
  number:number;
  name:string;
  icon:string;
  keywords:string[];
  desire:string;
  fear:string;
  summary:string;
  description:string;
  strengths:string[];
  caution:string;
  relationshipStyle:string;
  goodMatches:EnneagramResultSlug[];
  growthTip:string;
  shareText:string;
};

export type EqDomain = "selfAwareness" | "selfRegulation" | "empathy" | "socialSkills" | "resilience";
export type EqDomainScores = Record<EqDomain, number>;
export type EqQuestion = { id:number; text:string; domain:EqDomain; options:TestOption[] };
export type EqResultSlug = "eq-master" | "eq-empathy-leader" | "eq-balanced-realist" | "eq-growth" | "eq-potential";
export type EqResultProfile = {
  slug:EqResultSlug;
  name:string;
  icon:string;
  minPercent:number;
  maxPercent:number;
  summary:string;
  description:string;
  traits:string[];
  strengths:string[];
  growthTips:string[];
  recommendedActions:string[];
};

export type BigFiveDomain = "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism";
export type BigFiveScores = Record<BigFiveDomain, number>;
export type BigFiveQuestion = { id:number; text:string; domain:BigFiveDomain; reverse?:boolean; options:TestOption[] };
export type BigFiveResultSlug = "big-five-open-explorer" | "big-five-steady-planner" | "big-five-social-spark" | "big-five-warm-harmonizer" | "big-five-sensitive-insight";
export type BigFiveResultProfile = {
  slug:BigFiveResultSlug;
  domain:BigFiveDomain;
  name:string;
  icon:string;
  summary:string;
  description:string;
  strengths:string[];
  cautions:string[];
  workStyle:string;
  relationshipStyle:string;
  loveStyle:string;
  stressStyle:string;
  growthPoints:string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};
