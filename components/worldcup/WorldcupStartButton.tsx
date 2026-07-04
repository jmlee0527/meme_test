"use client";

import { useRouter } from "next/navigation";

export function WorldcupStartButton() {
  const router = useRouter();
  return <button type="button" onClick={() => router.push(`/tests/weekend-food-worldcup?play=1&seed=${Math.floor(Math.random()*2147483646)+1}`)} className="min-h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-7 text-base font-black text-white shadow-xl shadow-orange-200 transition hover:-translate-y-1 hover:shadow-2xl active:scale-[.99]">32강 시작하기 <span aria-hidden="true">→</span></button>;
}
