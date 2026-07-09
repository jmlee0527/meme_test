import Link from "next/link";
import { ShareButtons } from "@/components/share/ShareButtons";
import { MobileShareDock } from "@/components/share/MobileShareDock";
import {
  dementiaDomainLabels,
  dementiaQuestions,
  type DementiaDomain,
  type DementiaLevelProfile,
} from "@/data/dementia-risk";
import type { DementiaRiskScores } from "@/lib/dementia-risk-engine";

const domainColors: Record<DementiaDomain, string> = {
  memory: "from-violet-500 to-purple-400",
  dailyFunction: "from-blue-600 to-cyan-400",
  planningJudgment: "from-indigo-600 to-blue-400",
  language: "from-fuchsia-500 to-pink-400",
  orientationAttention: "from-amber-500 to-yellow-400",
  moodSocial: "from-rose-500 to-orange-400",
  healthLifestyle: "from-orange-500 to-amber-400",
  cognitiveProtection: "from-emerald-600 to-teal-400",
};

const domainGuidance: Record<DementiaDomain, string> = {
  memory: "약속·해야 할 일의 누락이나 물건을 찾기 어려운 변화",
  dailyFunction: "익숙한 일의 순서와 도구 사용에서 느낀 변화",
  planningJudgment: "여러 단계의 계획과 판단 과정에서 느낀 부담",
  language: "단어 찾기와 같은 이야기 반복 등 대화의 변화",
  orientationAttention: "날짜·경로·거리 판단과 여러 정보 처리의 변화",
  moodSocial: "취미·만남 참여와 감정 또는 성격에서 느낀 변화",
  healthLifestyle: "수면·운동·만성질환 관리·음주와 흡연 관련 요인",
  cognitiveProtection: "학습·대화·새로운 활동처럼 뇌를 자극하는 시간의 감소",
};

export function DementiaRiskResult({
  profile,
  scores,
}: {
  profile: DementiaLevelProfile;
  scores: DementiaRiskScores;
}) {
  const sortedDomains = (Object.keys(scores.domains) as DementiaDomain[])
    .sort((a, b) => scores.domains[b] - scores.domains[a]);
  const topDomains = sortedDomains.slice(0, 3);
  const highQuestionSignals = dementiaQuestions
    .filter((question) => question.id <= 10 && scores.answers[question.id - 1] >= 3)
    .slice(0, 5);
  const attentionSignals = highQuestionSignals.length
    ? highQuestionSignals.map(({ text }) => text.replace(/\.$/, ""))
    : topDomains.map((domain) => `${domainGuidance[domain]}를 앞으로도 관찰하기`);
  const analysis = `${profile.description} 인지 변화 문항 점수는 ${scores.cognitiveChange}점, 생활습관 위험요인 점수는 ${scores.lifestyleRisk}점으로 계산되었습니다. 인지 변화 문항 가운데 ‘자주 그렇다’ 이상으로 응답한 항목은 ${scores.highCognitiveSignals}개입니다. 8개 지표 중 상대적으로 높은 영역은 ${topDomains.map((domain) => dementiaDomainLabels[domain]).join(", ")} 순이었습니다. 이 순위는 질환의 종류나 원인을 뜻하지 않으며, 상담할 때 최근 변화를 구체적으로 설명하기 위한 참고 정보입니다. 예를 들어 변화가 피곤한 날에만 나타나는지, 점차 잦아지는지, 혼자 생활하거나 약속·금전·약 복용을 관리하는 데 영향을 주는지를 기록해 보세요. 생활습관 영역은 위험을 확정하는 점수가 아니라 수정 가능한 건강 요인을 돌아보는 값입니다. 규칙적인 신체활동, 혈압·혈당 등 건강관리, 충분한 수면, 절주·금연, 학습과 사회적 교류는 전반적인 뇌 건강에 도움이 될 수 있지만 치매 예방을 보장하지는 않습니다.`;
  const tips = [
    "걷기 등 가능한 신체활동을 꾸준히 하고, 새로운 운동은 건강 상태에 맞춰 시작하기",
    "혈압·혈당·콜레스테롤·체중을 정기적으로 확인하고 의료진의 관리 계획 따르기",
    "일정한 취침·기상 시간을 만들고 코골이, 불면, 낮 졸림이 지속되면 상담하기",
    "흡연은 중단을 지원받고 음주는 줄이되, 갑작스러운 금주가 위험할 상황은 의료진과 상의하기",
    "독서·학습·취미와 가족·친구 대화를 일상에 넣어 인지 자극과 사회적 연결 유지하기",
  ];
  const consultItems = [
    "기억이나 판단의 변화가 점점 잦아지거나 가까운 사람도 알아차린다",
    "약 복용, 금전 관리, 요리, 이동처럼 익숙한 일에 실제 어려움이 생긴다",
    "날짜·장소를 자주 혼동하거나 익숙한 길에서 방향을 잃는다",
    "단어 찾기, 같은 말 반복, 성격·판단의 변화가 지속된다",
    "우울감, 불안, 수면 문제와 함께 기억·집중의 어려움이 이어진다",
    "갑작스러운 혼란, 말하기 어려움, 한쪽 힘 빠짐이 생긴다 — 즉시 응급 평가가 필요합니다",
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfce7_0,#f8fafc_42%,#f8fafc_100%)] py-10 pb-24 sm:py-14">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <section className="overflow-hidden rounded-[2.25rem] bg-slate-950 p-7 text-center text-white shadow-2xl sm:p-12">
            <p className="text-xs font-black tracking-[.2em] text-emerald-300">기억력·생활습관 자가 체크 결과</p>
            <div className="mx-auto mt-6 grid size-28 place-items-center rounded-[2rem] bg-white/10 text-6xl">{profile.icon}</div>
            <p className="mt-6 text-sm font-black text-emerald-300">LEVEL {profile.level}</p>
            <h1 className="mt-2 text-3xl font-black sm:text-5xl">{profile.name}</h1>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-200">{profile.summary}</p>
            <div className="mx-auto mt-7 grid size-40 place-items-center rounded-full p-2" style={{ background: `conic-gradient(${profile.color} ${scores.overall}%,#334155 0)` }}>
              <div className="grid size-full place-items-center rounded-full bg-slate-950">
                <span><strong className="block text-4xl">{scores.overall}점</strong><small className="text-slate-400">치매 위험 지수</small></span>
              </div>
            </div>
          </section>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-7 text-amber-950">
            <strong>의료 진단이 아닌 참고용 자가 체크입니다.</strong><br />
            이 결과는 치매 또는 알츠하이머병을 진단하거나 배제하지 않습니다. 결과가 높거나 최근 변화가 반복되고 일상생활에 불편이 있다면 치매안심센터, 신경과 또는 정신건강의학과 등 전문기관 상담을 권장합니다.
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2">
            <SummaryCard label="인지 변화 영역" value={scores.cognitiveChange} note="1~10번 · 가중치 1.2" color="text-violet-700" />
            <SummaryCard label="생활습관 영역" value={scores.lifestyleRisk} note="11~15번 · 가중치 0.8" color="text-emerald-700" />
          </section>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black">8개 지표 분석</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">모든 막대는 높을수록 해당 변화 또는 위험요인을 더 자주 보고했다는 뜻입니다.</p>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {(Object.keys(dementiaDomainLabels) as DementiaDomain[]).map((domain) => (
                <ScoreBar key={domain} label={dementiaDomainLabels[domain]} value={scores.domains[domain]} color={domainColors[domain]} />
              ))}
            </div>
          </section>

          <section className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9">
            <h2 className="text-2xl font-black">상세 분석</h2>
            <p className="mt-5 leading-8 text-slate-700">{analysis}</p>
          </section>

          <section className="mt-7 grid gap-5 md:grid-cols-2">
            <ListCard title="현재 주의해서 볼 신호" items={attentionSignals} tone="amber" />
            <ListCard title="뇌 건강을 위한 생활 팁" items={tips} tone="emerald" />
          </section>

          <section className="mt-7 rounded-[2rem] border border-orange-100 bg-orange-50 p-6 sm:p-9">
            <h2 className="text-2xl font-black text-orange-950">언제 전문가 상담이 필요할까요?</h2>
            <p className="mt-2 text-sm leading-6 text-orange-800">아래 변화가 반복되거나 일상에 영향을 주면 점수와 관계없이 상담하세요.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {consultItems.map((item) => <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6"><span aria-hidden="true">□</span>{item}</li>)}
            </ul>
            <p className="mt-5 rounded-2xl bg-orange-100 p-4 text-sm font-bold leading-6 text-orange-950">가까운 치매안심센터, 신경과 또는 정신건강의학과에서 상담할 수 있습니다. 급성 증상은 119 또는 응급의료기관의 도움을 받으세요.</p>
          </section>

          <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-9">
            <h2 className="text-xl font-black">결과 공유하기</h2>
            <p className="mt-2 text-sm text-slate-300">나의 치매 위험 신호 자가 체크 결과는 {scores.overall}점, ‘{profile.name}’ 단계였습니다.</p>
            <div className="mt-5"><ShareButtons title={`나의 치매 위험 신호 자가 체크 결과는 ${scores.overall}점이었습니다. 당신도 기억력과 생활습관을 점검해보세요.`} description={profile.summary} path={`/dementia-risk-test/result/${profile.slug}`} /></div>
          </section>

          <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center text-xs leading-6 text-slate-500">
            이 테스트는 치매를 진단하는 의료검사가 아닌 참고용 자가 체크입니다. 정확한 평가는 전문기관 상담이 필요하며, 결과를 본인이나 타인의 진단명으로 사용하지 마세요.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/tests/dementia-risk-test?start=1" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold">다시 테스트하기</Link>
            <Link href="/tests" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white">다른 테스트 보기</Link>
          </div>
        </div>
      </div>
      <MobileShareDock />
    </div>
  );
}

function SummaryCard({ label, value, note, color }: { label: string; value: number; note: string; color: string }) {
  return <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card"><p className="text-sm font-bold text-slate-500">{label}</p><strong className={`mt-2 block text-4xl font-black ${color}`}>{value}점</strong><p className="mt-2 text-xs text-slate-400">{note}</p></div>;
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return <div><div className="flex justify-between text-sm font-black"><span>{label}</span><span>{value}%</span></div><div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value}%` }} /></div></div>;
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: "amber" | "emerald" }) {
  return <div className={`rounded-[2rem] p-6 sm:p-8 ${tone === "amber" ? "bg-amber-50" : "bg-emerald-50"}`}><h2 className="text-xl font-black">{title}</h2><ul className="mt-5 space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm font-semibold leading-6"><span>{tone === "amber" ? "•" : "✓"}</span>{item}</li>)}</ul></div>;
}
