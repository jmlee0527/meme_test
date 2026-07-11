import Link from "next/link";

export const TEST_CATEGORY_TILES = [
  ["🧠", "성격.심리", "green"],
  ["💕", "연애.관계", "pink"],
  ["💼", "직업.일상", "blue"],
  ["🎯", "팬 퀴즈", "orange"],
  ["🔮", "건강.운세", "purple"],
] as const;

export function CategoryTiles({ activeCategory }: { activeCategory?: string }) {
  return (
    <nav aria-label="테스트 카테고리" className="grid grid-cols-3 gap-3 sm:grid-cols-5">
      {TEST_CATEGORY_TILES.map(([icon, label, tone]) => {
        const isActive = activeCategory === label;
        return (
          <Link
            key={label}
            href={`/category/${encodeURIComponent(label)}`}
            aria-current={isActive ? "page" : undefined}
            className={`category-tile category-${tone}${isActive ? " category-tile-active" : ""}`}
          >
            <span className="text-3xl" aria-hidden="true">{icon}</span>
            <strong className="mt-2 text-sm">{label}</strong>
          </Link>
        );
      })}
    </nav>
  );
}
