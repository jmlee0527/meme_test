"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AgeStartForm({ testSlug }: { testSlug: string }) {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\d+$/.test(age)) { setError("현재 나이를 숫자로 입력해 주세요."); return; }
    const parsed = Number(age);
    if (parsed < 15 || parsed > 70) { setError("15세부터 70세 사이로 입력해 주세요."); return; }
    setError("");
    router.push(`/tests/${testSlug}?start=1&age=${parsed}`);
  };

  return (
    <form onSubmit={submit} className="mt-8 rounded-2xl border border-rose-100 bg-rose-50/70 p-5 text-left sm:p-6" noValidate>
      <label htmlFor="current-age" className="block text-sm font-extrabold text-ink">현재 나이를 알려주세요</label>
      <p className="mt-1 text-xs leading-5 text-slate-500">입력한 나이는 결과 계산에만 사용되며 저장되지 않습니다.</p>
      <div className="mt-4 flex items-stretch gap-2">
        <div className="relative min-w-0 flex-1"><input id="current-age" name="age" type="text" inputMode="numeric" pattern="[0-9]*" value={age} onChange={(event) => { setAge(event.target.value.replace(/\D/g, "").slice(0, 2)); setError(""); }} placeholder="예: 29" aria-describedby={error ? "age-error" : "age-help"} aria-invalid={Boolean(error)} className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 pr-10 text-lg font-black text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100" /><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">세</span></div>
        <button type="submit" disabled={!age} className="shrink-0 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none">테스트 시작</button>
      </div>
      <p id={error ? "age-error" : "age-help"} className={`mt-2 text-xs ${error ? "font-bold text-red-600" : "text-slate-400"}`}>{error || "15세 이상 70세 이하만 입력할 수 있어요."}</p>
    </form>
  );
}
