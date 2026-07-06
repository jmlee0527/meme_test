import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { LoverResultProfile, LoverScores } from "@/lib/types";

const traitLabels: { key: keyof LoverScores; label: string; hint: string }[] = [
  { key: "care", label: "배려심", hint: "상대의 기분과 필요를 얼마나 세심하게 살피는지" },
  { key: "responsibility", label: "책임감", hint: "말과 약속, 관계를 얼마나 꾸준히 지키는지" },
  { key: "expression", label: "표현력", hint: "좋아하는 마음과 서운함을 얼마나 잘 나누는지" },
  { key: "stability", label: "안정감", hint: "감정 기복에 덜 휘둘리고 관계를 안정적으로 만드는 정도" },
  { key: "conflict", label: "갈등해결력", hint: "다툼이나 오해를 어떻게 풀어가는지" },
  { key: "independence", label: "독립성", hint: "연애 속에서도 각자의 삶과 시간을 지키는 정도" },
  { key: "humor", label: "유머감각", hint: "분위기를 부드럽게 만들고 함께 웃을 수 있는 힘" },
  { key: "trust", label: "신뢰도", hint: "상대가 내 옆에 있을 때 느끼는 믿음과 의지감" },
];

export function LoverScoreResult({
  profile,
  scores,
  overallScore,
  gender,
}: {
  profile: LoverResultProfile;
  scores: LoverScores;
  overallScore: number;
  gender: "male" | "female" | "none";
}) {
  const titleByGender =
    gender === "male" ? "나는 몇 점짜리 남친감일까?" : gender === "female" ? "나는 몇 점짜리 여친감일까?" : "나는 몇 점짜리 애인감일까?";

  const shareTitle = titleByGender;
  const shareDescription = `${profile.name} (${overallScore}점) — ${profile.summary}`;
  const sharePath = `/lover-score-test/result/${profile.slug}`;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0,#fdf2f8_34%,#f8fafc_100%)] pb-24 pt-8 sm:py-14">
      <div className="container-page">
        <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "애인 점수 결과" }]} />
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <section className="overflow-hidden rounded-[2rem] border border-rose-100 bg-white text-center shadow-2xl shadow-rose-100/70">
              <div className="bg-gradient-to-b from-rose-50 via-pink-50/70 to-white px-6 pb-8 pt-10 sm:pt-14">
                <p className="text-xs font-black tracking-[.16em] text-rose-500">
                  LOVER SCORE
                </p>
                <div className="mt-5 text-7xl" aria-hidden="true">
                  {profile.icon}
                </div>
                <p className="mt-3 text-sm font-black text-rose-500">
                  {titleByGender}
                </p>
                <h1 className="mt-1 text-3xl font-black tracking-tight text-ink sm:text-5xl">
                  {profile.name}
                </h1>
                <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">
                  {profile.summary}
                </p>
                <div
                  className="mx-auto mt-7 grid size-36 place-items-center rounded-full p-2.5 shadow-xl"
                  style={{
                    background: `conic-gradient(#e11d48 ${overallScore}%, #fee2e2 0)`,
                  }}
                >
                  <div className="grid size-full place-items-center rounded-full bg-white">
                    <span>
                      <strong className="block text-4xl font-black text-rose-600">
                        {overallScore}
                      </strong>
                      <span className="text-xs font-bold text-slate-400">
                        애인 점수
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-9 sm:px-12">
                <p className="mx-auto max-w-2xl text-left leading-8 text-slate-700 sm:text-center">
                  {profile.description}
                </p>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-500">
              WHY THIS RESULT
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              왜 이런 점수가 나왔을까요?
            </h2>
            <p className="mt-5 leading-8 text-slate-700">
              {profile.reason}
            </p>
          </SectionReveal>

          <SectionReveal className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-500">
              LOVER STATS
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              애인 능력치 8가지
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              숫자가 높을수록 더 좋다는 뜻은 아닙니다. 지금의 나는 어떤 방식으로 사랑을 주고받는지, 균형을 살펴보는 지표에 가깝습니다.
            </p>
            <div className="mt-7 space-y-5">
              {traitLabels.map(({ key, label, hint }) => (
                <div key={key}>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <strong className="text-sm text-slate-800">{label}</strong>
                      <p className="mt-1 text-[11px] text-slate-400">{hint}</p>
                    </div>
                    <strong className="text-rose-600">{scores[key]}점</strong>
                  </div>
                  <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                      style={{ width: `${scores[key]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <section className="mt-7 grid gap-5 sm:grid-cols-2">
            <SectionReveal className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
              <h2 className="text-xl font-black text-emerald-950">
                연애에서 빛나는 강점
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-emerald-950">
                {profile.strengths.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </SectionReveal>
            <SectionReveal className="rounded-[2rem] border border-amber-100 bg-amber-50/70 p-6 sm:p-8">
              <h2 className="text-xl font-black text-amber-950">
                조심하면 좋은 포인트
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-amber-950">
                {profile.cautions.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </SectionReveal>
          </section>

          <SectionReveal className="mt-7 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-9">
            <p className="text-xs font-black tracking-[.16em] text-rose-300">
              IDEAL PARTNER
            </p>
            <h2 className="mt-2 text-2xl font-black">
              잘 맞는 상대 유형
            </h2>
            <p className="mt-4 leading-8 text-slate-200">
              {profile.idealPartner}
            </p>
            {profile.goodMatchTypes.length > 0 && (
              <p className="mt-4 text-xs text-slate-400">
                잘 어울리는 유형 예시 ·{" "}
                {profile.goodMatchTypes.join(" / ")}
              </p>
            )}
          </SectionReveal>

          <section
            id="share-card"
            className="scroll-mt-24 mt-10 grid gap-6 rounded-[2rem] bg-gradient-to-br from-rose-600 to-pink-700 p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"
          >
            <ShareImageCard
              emoji={profile.icon}
              eyebrow={titleByGender}
              title={profile.name}
              subtitle={profile.summary}
              badge={`애인 점수 ${overallScore}점`}
              accent="pink"
            />
            <div>
              <h2 className="text-xl font-black">
                친구의 애인 점수도 궁금하다면?
              </h2>
              <p className="mt-2 text-sm leading-6 text-rose-50">
                내 결과를 공유하고 서로의 연애 성향과 애인감을 가볍게 비교해 보세요.
              </p>
              <div className="mt-5 rounded-2xl bg-white/10 p-2">
                <ShareButtons
                  title={shareTitle}
                  description={shareDescription}
                  path={sharePath}
                />
              </div>
            </div>
          </section>

          <div className="mt-8 text-center">
            <Link
              href="/lover-score-test"
              className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-600 hover:bg-slate-50"
            >
              다시하기
            </Link>
          </div>
          <div className="mt-6 text-center text-[11px] leading-5 text-slate-400">
            <p>
              이 테스트는 나의 연애 성향을 돌아보기 위한 참고용 콘텐츠이며,
              실제 연애의 성공 여부나 가치를 평가하는 검사가 아닙니다.
            </p>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}

