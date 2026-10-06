import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import { RUNNING_TEST_PATH, runningResultPath, runningTest, type RunningProfile } from "@/data/running-personality";

type Props = { profile: RunningProfile; secondary: RunningProfile | null; encodedAnswers: string | null };

export function RunningPersonalityResult({ profile, secondary, encodedAnswers }: Props) {
  const sharePath = `${runningResultPath(profile.slug)}${encodedAnswers ? `?a=${encodedAnswers}` : ""}`;
  return (
    <div className="container-page pb-8 pt-8 sm:pt-12">
      <Breadcrumbs items={[{ name: "테스트", href: "/tests" }, { name: "러닝 성향 테스트", href: RUNNING_TEST_PATH }, { name: profile.name }]} />
      <div className="mx-auto max-w-3xl">
        <section className="paper-card overflow-hidden">
          <div className="border-b border-emerald-900/15 bg-[#CDEFE1] px-6 py-9 text-center sm:px-10">
            <p className="text-sm font-bold text-emerald-900">{encodedAnswers ? "네가 달리기를 즐기는 방법은" : "이런 러너도 있어"}</p>
            <span className="mt-5 block text-7xl" aria-hidden="true">{profile.icon}</span>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">{profile.name}</h1>
            <p className="mt-4 text-base font-bold leading-7 text-emerald-950">“{profile.tagline}”</p>
          </div>
          <p className="px-6 py-7 leading-8 text-slate-700 sm:px-10">{profile.description}</p>
        </section>
        <section className="paper-card mt-6 p-6 sm:p-8">
          <h2 className="text-xl font-black text-ink">이런 모습, 좀 너 같아?</h2>
          <ul className="mt-5 space-y-3">{profile.behaviors.map((behavior) => <li key={behavior} className="flex gap-3 rounded-md bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><span aria-hidden="true" className="font-black">✓</span><span>{behavior}</span></li>)}</ul>
        </section>
        {secondary && <section className="paper-card mt-6 p-6 sm:p-8" aria-labelledby="running-secondary">
          <h2 id="running-secondary" className="text-lg font-black text-ink">너한테는 이런 면도 있어</h2>
          <p className="mt-4 font-bold text-emerald-900"><span aria-hidden="true">{secondary.icon} </span>{secondary.name}</p>
          <p className="mt-2 text-sm leading-7 text-slate-600">{secondary.secondaryText}</p>
        </section>}
        <section className="paper-card mt-6 bg-[#f4f1df] p-6 sm:p-8">
          <h2 className="text-lg font-black text-ink">다음번엔 이것도 해볼래?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{profile.suggestion}</p>
        </section>
        <section id="share-card" className="paper-card mt-8 scroll-mt-24 p-6 sm:p-8">
          <h2 className="text-xl font-black text-ink">결과 공유하기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">친구는 무슨 재미로 뛸까? 같이 비교해봐.</p>
          <div className="mx-auto mt-6 max-w-sm"><ShareImageCard emoji={profile.icon} eyebrow="나는 이런 러너!" title={profile.name} subtitle={profile.tagline} badge="나는 어떤 러너? · 미미테스트" accent="green" /></div>
          <div className="mt-6"><ShareButtons title={`나는 ${profile.name}!`} description={profile.tagline} path={sharePath} /></div>
        </section>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href={`${RUNNING_TEST_PATH}?start=1`} className="paper-button flex min-h-14 items-center justify-center bg-emerald-800 px-5 py-4 text-center font-black text-white hover:bg-emerald-900">{encodedAnswers ? "한 번 더 해볼래?" : "내 유형도 알아볼래?"}</Link>
          <Link href="/tests" className="paper-button flex min-h-14 items-center justify-center bg-[#fffdf6] px-5 py-4 text-center font-bold text-slate-700">다른 테스트도 구경해봐</Link>
        </div>
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">{runningTest.disclaimer}</p>
      </div>
    </div>
  );
}
