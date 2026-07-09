"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { normalizeKoreanName } from "@/lib/name-compatibility-engine";

export function NameCompatibilityForm({ initialMan = "", initialWoman = "" }: { initialMan?: string; initialWoman?: string }) {
  const router = useRouter();
  const [man, setMan] = useState(initialMan);
  const [woman, setWoman] = useState(initialWoman);
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalizedMan = normalizeKoreanName(man);
    const normalizedWoman = normalizeKoreanName(woman);
    if (!/^[가-힣]{2,6}$/.test(normalizedMan) || !/^[가-힣]{2,6}$/.test(normalizedWoman)) {
      setError("각 이름을 한글 2~6자로 입력해 주세요.");
      return;
    }
    setError("");
    router.push(`/couple-name-compatibility?man=${encodeURIComponent(normalizedMan)}&woman=${encodeURIComponent(normalizedWoman)}#result`);
  };

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-rose-100 bg-white p-6 shadow-xl shadow-rose-100/60 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block"><span className="text-sm font-black text-slate-800">남성 이름</span><input value={man} onChange={(e) => setMan(e.target.value)} inputMode="text" autoComplete="off" maxLength={8} placeholder="예: 김민준" className="mt-2 min-h-14 w-full rounded-2xl border-2 border-slate-200 px-4 text-lg font-bold outline-none transition focus:border-rose-400" /></label>
        <label className="block"><span className="text-sm font-black text-slate-800">여성 이름</span><input value={woman} onChange={(e) => setWoman(e.target.value)} inputMode="text" autoComplete="off" maxLength={8} placeholder="예: 이서연" className="mt-2 min-h-14 w-full rounded-2xl border-2 border-slate-200 px-4 text-lg font-bold outline-none transition focus:border-rose-400" /></label>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-400">공백은 자동으로 제거되며 이름은 서버에 저장하지 않습니다.</p>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
      <button type="submit" className="mt-6 min-h-14 w-full rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 text-base font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5">두 이름 궁합 분석하기</button>
    </form>
  );
}
