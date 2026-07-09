import { ShareButtons } from "@/components/share/ShareButtons";
import { ELEMENT_LABELS, type CompatibilityResult, type FiveElement } from "@/lib/name-compatibility-engine";

const elements: FiveElement[] = ["wood", "fire", "earth", "metal", "water"];
const colors: Record<FiveElement, string> = { wood: "bg-emerald-500", fire: "bg-rose-500", earth: "bg-amber-500", metal: "bg-slate-500", water: "bg-blue-500" };

export function NameCompatibilityResult({ result }: { result: CompatibilityResult }) {
  const sharePath = `/couple-name-compatibility?man=${encodeURIComponent(result.man.name)}&woman=${encodeURIComponent(result.woman.name)}`;
  return (
    <section id="result" className="scroll-mt-8 pt-10">
      <div className="overflow-hidden rounded-[2.25rem] bg-slate-950 px-6 py-10 text-center text-white shadow-2xl sm:p-12">
        <p className="text-sm font-black text-rose-300">{result.man.name} × {result.woman.name}</p>
        <div className="mx-auto mt-6 grid size-32 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-violet-500 text-6xl shadow-xl">💞</div>
        <p className="mt-6 text-2xl tracking-widest text-amber-300">{result.stars}</p>
        <h1 className="mt-2 text-3xl font-black sm:text-5xl">{result.level}</h1>
        <div className="mx-auto mt-6 grid size-36 place-items-center rounded-full p-2" style={{ background: `conic-gradient(#fb7185 ${result.score}%,#334155 0)` }}><div className="grid size-full place-items-center rounded-full bg-slate-950"><strong className="text-4xl">{result.score}점</strong></div></div>
        <p className="mx-auto mt-5 max-w-xl font-semibold leading-7 text-slate-200">{result.summary}</p>
      </div>

      <div className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9"><h2 className="text-2xl font-black text-slate-950">전체 이름 궁합 분석</h2><p className="mt-5 leading-8 text-slate-700">{result.analysis}</p></div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {[result.man, result.woman].map((person) => <div key={person.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card"><h2 className="text-xl font-black">{person.name} 이름 구조</h2><p className="mt-2 text-sm text-slate-500">주요 오행 <strong className="text-slate-900">{ELEMENT_LABELS[person.primaryElement]}</strong> · 음 {person.yinRatio}% / 양 {person.yangRatio}%</p><div className="mt-5 flex flex-wrap gap-2">{person.syllables.map((s, index) => <span key={`${s.char}-${index}`} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold">{s.char} · {s.initial}/{s.vowel} · {ELEMENT_LABELS[s.initialElement]}{ELEMENT_LABELS[s.vowelElement]}</span>)}</div></div>)}
      </div>

      <div className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9"><h2 className="text-2xl font-black">두 이름의 오행 분포</h2><div className="mt-6 space-y-4">{elements.map((key) => <div key={key}><div className="flex justify-between text-sm font-bold"><span>{ELEMENT_LABELS[key]}</span><span>{result.combinedElements[key]}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${colors[key]}`} style={{ width: `${result.combinedElements[key]}%` }} /></div></div>)}</div></div>

      <div className="mt-7 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-9"><h2 className="text-2xl font-black">궁합 레이더 지표</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{Object.entries({ "오행 궁합": result.components.elementHarmony, "부족 오행 보완": result.components.complement, "음양 균형": result.components.yinYangBalance, "발음 조화": result.components.pronunciation, "에너지 흐름": result.components.energyFlow, "이름 안정감": result.components.stability }).map(([label,value]) => <div key={label} className="rounded-2xl bg-slate-50 p-4"><div className="flex justify-between text-sm font-black"><span>{label}</span><span>{value}%</span></div><div className="mt-3 h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-violet-500" style={{ width: `${value}%` }} /></div></div>)}</div></div>

      <div className="mt-7 grid gap-5 md:grid-cols-2"><ListCard title="잘 맞는 부분" items={result.strengths} tone="emerald" /><ListCard title="주의할 점" items={result.cautions} tone="amber" /></div>
      <div className="mt-7 grid gap-5 md:grid-cols-2"><TextCard title="연애 스타일 분석" text={result.loveStyle} /><TextCard title="갈등이 생기는 이유" text={result.conflictReason} /></div>
      <div className="mt-7 rounded-[2rem] bg-violet-50 p-6 sm:p-9"><h2 className="text-2xl font-black text-violet-950">오래가는 커플이 되는 5가지 팁</h2><ol className="mt-5 space-y-3">{result.tips.map((tip,index)=><li key={tip} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-black text-white">{index+1}</span>{tip}</li>)}</ol></div>

      <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white sm:p-9"><h2 className="text-xl font-black">우리 이름 궁합은 {result.score}점!</h2><p className="mt-2 text-sm text-slate-300">친구와 연인에게 공유하고 이름의 오행 흐름을 비교해 보세요.</p><div className="mt-5"><ShareButtons title={`우리 이름 궁합은 ${result.score}점! 당신도 한번 확인해보세요.`} description={result.summary} path={sharePath} /></div></div>
      <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-center text-xs leading-6 text-slate-500">이 결과는 생년월일이나 한자를 사용하지 않으며 사주·한자 획수·자원오행을 계산한 결과가 아닙니다. 훈민정음 오음과 전통 음양오행 관점을 현대적으로 재구성한 엔터테인먼트형 참고 콘텐츠입니다.</p>
    </section>
  );
}

function ListCard({ title, items, tone }: { title:string; items:string[]; tone:"emerald"|"amber" }) {
  return <div className={`rounded-[2rem] p-6 ${tone==="emerald"?"bg-emerald-50":"bg-amber-50"}`}><h2 className="text-xl font-black">{title}</h2><ul className="mt-5 space-y-3">{items.map(item=><li key={item} className="flex gap-2 text-sm font-semibold leading-6"><span>•</span>{item}</li>)}</ul></div>;
}
function TextCard({ title, text }: { title:string; text:string }) {
  return <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card"><h2 className="text-xl font-black">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{text}</p></div>;
}
