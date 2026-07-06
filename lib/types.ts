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
