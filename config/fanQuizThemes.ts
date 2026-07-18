import type { FanQuizThemeId, TestDefinition } from "@/lib/types";

export type FanQuizDecorationStyle = "starlight" | "ticket" | "sticker" | "spotlight" | "badge" | "music";
export type FanQuizIconType = "lightstick" | "ticket" | "microphone" | "headphones" | "badge" | "sports";

export type FanQuizTheme = {
  id: FanQuizThemeId;
  name: string;
  primary: string;
  primaryStrong: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  progressBackground: string;
  shadow: string;
  decorationStyle: FanQuizDecorationStyle;
  iconType: FanQuizIconType;
  label: string;
  ctaLabel: string;
};

export const fanQuizThemes: Record<FanQuizThemeId, FanQuizTheme> = {
  "purple-night": {
    id: "purple-night",
    name: "Purple Night",
    primary: "#7c3aed",
    primaryStrong: "#4c1d95",
    secondary: "#c4b5fd",
    accent: "#facc15",
    background: "#f5f3ff",
    surface: "#fffdf7",
    text: "#24143d",
    mutedText: "#6b5f7f",
    border: "#ddd6fe",
    progressBackground: "#ede9fe",
    shadow: "rgba(76,29,149,.18)",
    decorationStyle: "starlight",
    iconType: "lightstick",
    label: "MIMI FAN QUIZ",
    ctaLabel: "팬 퀴즈 시작하기",
  },
  "mint-stage": {
    id: "mint-stage",
    name: "Mint Stage",
    primary: "#059669",
    primaryStrong: "#064e3b",
    secondary: "#67e8f9",
    accent: "#8b5cf6",
    background: "#ecfeff",
    surface: "#fbfffb",
    text: "#12312b",
    mutedText: "#4f6b66",
    border: "#a7f3d0",
    progressBackground: "#d1fae5",
    shadow: "rgba(5,150,105,.18)",
    decorationStyle: "spotlight",
    iconType: "headphones",
    label: "MIMI FAN QUIZ",
    ctaLabel: "팬심 확인하기",
  },
  "pink-ticket": {
    id: "pink-ticket",
    name: "Pink Ticket",
    primary: "#db2777",
    primaryStrong: "#831843",
    secondary: "#fecdd3",
    accent: "#f59e0b",
    background: "#fff1f2",
    surface: "#fffaf4",
    text: "#3f172c",
    mutedText: "#79515f",
    border: "#fbcfe8",
    progressBackground: "#ffe4e6",
    shadow: "rgba(219,39,119,.17)",
    decorationStyle: "ticket",
    iconType: "ticket",
    label: "MIMI FAN QUIZ",
    ctaLabel: "나의 팬 등급 알아보기",
  },
  "blue-spotlight": {
    id: "blue-spotlight",
    name: "Blue Spotlight",
    primary: "#2563eb",
    primaryStrong: "#1e3a8a",
    secondary: "#bae6fd",
    accent: "#c0c0c0",
    background: "#eff6ff",
    surface: "#ffffff",
    text: "#10203f",
    mutedText: "#52627a",
    border: "#bfdbfe",
    progressBackground: "#dbeafe",
    shadow: "rgba(37,99,235,.16)",
    decorationStyle: "spotlight",
    iconType: "microphone",
    label: "MIMI FAN QUIZ",
    ctaLabel: "퀴즈 시작하기",
  },
  "yellow-pop": {
    id: "yellow-pop",
    name: "Yellow Pop",
    primary: "#d97706",
    primaryStrong: "#78350f",
    secondary: "#fde68a",
    accent: "#ef4444",
    background: "#fffbeb",
    surface: "#fffef5",
    text: "#34210f",
    mutedText: "#715b3d",
    border: "#fcd34d",
    progressBackground: "#fef3c7",
    shadow: "rgba(217,119,6,.17)",
    decorationStyle: "sticker",
    iconType: "microphone",
    label: "MIMI FAN QUIZ",
    ctaLabel: "팬심 확인하기",
  },
  "red-backstage": {
    id: "red-backstage",
    name: "Red Backstage",
    primary: "#dc2626",
    primaryStrong: "#450a0a",
    secondary: "#fecaca",
    accent: "#111827",
    background: "#fff7ed",
    surface: "#fffaf0",
    text: "#2f1715",
    mutedText: "#725753",
    border: "#fecaca",
    progressBackground: "#fee2e2",
    shadow: "rgba(220,38,38,.16)",
    decorationStyle: "badge",
    iconType: "badge",
    label: "MIMI FAN QUIZ",
    ctaLabel: "팬 퀴즈 시작하기",
  },
};

export const defaultFanQuizTheme = fanQuizThemes["purple-night"];

export function getFanQuizTheme(themeId?: FanQuizThemeId) {
  return themeId ? fanQuizThemes[themeId] ?? defaultFanQuizTheme : defaultFanQuizTheme;
}

export function getTestFanQuizTheme(test: Pick<TestDefinition, "fanTheme">) {
  return getFanQuizTheme(test.fanTheme);
}

export function getFanQuizLevel(score: number, maxScore: number) {
  if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0) return 1;
  return Math.max(1, Math.min(10, Math.ceil((Math.max(0, score) / maxScore) * 10)));
}

export function formatFanQuizLevel(level: number) {
  return `LEVEL ${level}`;
}
