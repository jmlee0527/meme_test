"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { hogwartsProfiles, hogwartsQuestions, hogwartsTest } from "@/data/hogwarts-character";
import { calculateHogwartsResult } from "@/lib/hogwarts-character-engine";
import styles from "./HogwartsCharacter.module.css";

export function HogwartsCharacterTestPage({ started = false }: { started?: boolean }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(hogwartsQuestions.length).fill(null));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = hogwartsQuestions[index];
  const selected = answers[index];

  useEffect(() => {
    if (started) headingRef.current?.focus({ preventScroll: true });
  }, [index, started]);

  function moveNext() {
    if (selected === null || submitting) return;
    if (index < hogwartsQuestions.length - 1) { setIndex(index + 1); return; }
    if (answers.some((answer) => answer === null)) return;
    setSubmitting(true);
    setError(false);
    try {
      const completeAnswers = answers as number[];
      const result = calculateHogwartsResult(completeAnswers);
      router.push(`/hogwarts-character-test/result/${result.profile.slug}?answers=${completeAnswers.join("")}`);
    } catch {
      setSubmitting(false);
      setError(true);
    }
  }

  if (!started) return (
    <div className={styles.world}>
      <section className={styles.paper}>
        <p className={styles.kicker}>HOGWARTS · A LETTER FOR YOU</p>
        <div className={styles.seal} aria-hidden="true">✦</div>
        <h1 className={styles.title}>{hogwartsTest.title}</h1>
        <p className={styles.subtitle}>{hogwartsTest.description}</p>
        <div className={styles.meta}><span>12개의 선택</span><span>약 3분</span><span>12명의 캐릭터</span></div>
        <div className={styles.portraits}>
          {hogwartsProfiles.slice(0, 3).map((profile, index) => <div key={profile.slug}>
            <div className={styles.portrait}><Image src={profile.image} alt={profile.imageAlt} fill sizes="(max-width: 540px) 26vw, 140px" priority={index === 0} /></div>
            <p className={styles.portraitName}>{profile.name}</p>
          </div>)}
        </div>
        <p className={styles.subtitle}>입학 편지가 도착했어요. 낯선 교실과 수상한 복도, 그리고 새로운 친구들. 당신이라면 어떤 선택을 할까요?</p>
        <Link href="/tests/hogwarts-character-test?start=1" className={`${styles.button} ${styles.start}`}>입학 편지 열기 <span aria-hidden="true">→</span></Link>
        <p className={styles.note}>정답은 없어요. 작품을 몰라도 가장 나다운 행동을 고르면 돼요.</p>
        <p className={styles.note}>{hogwartsTest.disclaimer}</p>
      </section>
    </div>
  );

  return (
    <div className={styles.world}>
      <section className={styles.paper} aria-label="호그와트 상황극 테스트">
        <div className={styles.toolbar}><span>나의 호그와트 이야기</span><span aria-label={`${index + 1} / 12`}>{String(index + 1).padStart(2, "0")} / 12</span></div>
        <div className={styles.track} role="progressbar" aria-label="답변 진행률" aria-valuemin={0} aria-valuemax={12} aria-valuenow={answers.filter((answer) => answer !== null).length}><span style={{ width: `${answers.filter((answer) => answer !== null).length / 12 * 100}%` }} /></div>
        <p className={styles.chapter}>CHAPTER {String(index + 1).padStart(2, "0")} · <span>{question.chapter}</span></p>
        <h1 id="hogwarts-question" tabIndex={-1} ref={headingRef} className={styles.question}>{question.text}</h1>
        <div className={styles.options} role="group" aria-labelledby="hogwarts-question">
          {question.options.map((option) => <button key={`${question.id}-${option.value}`} type="button" className={styles.option} aria-pressed={selected === option.value} disabled={submitting} onClick={() => setAnswers((current) => current.map((answer, position) => position === index ? option.value : answer))}>
            <span className={styles.letter} aria-hidden="true">{selected === option.value ? "✓" : option.label}</span><span>{option.text}</span>
          </button>)}
        </div>
        <div className={styles.navigation}>
          <button type="button" className={styles.back} disabled={index === 0 || submitting} onClick={() => setIndex(index - 1)}>이전</button>
          <button type="button" className={styles.button} disabled={selected === null || submitting} onClick={moveNext}>{submitting ? "결과 여는 중…" : index === 11 ? "나의 캐릭터 확인하기" : "다음 장으로"}</button>
        </div>
        {error && <p role="alert" className={styles.error}>결과를 열지 못했어요. 다시 눌러주세요.</p>}
        <p className={styles.note}>선택한 답은 이전 버튼으로 바꿀 수 있어요.</p>
      </section>
    </div>
  );
}
