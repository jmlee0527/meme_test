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
  type?: "quiz" | "worldcup";
  slug: string;
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
