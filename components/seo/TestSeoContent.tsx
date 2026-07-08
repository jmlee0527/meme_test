import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";
import type { TestDefinition } from "@/lib/types";

type Props = {
  test: TestDefinition;
  /** 문항 수·응답 방식이 있으면 공통 FAQ(소요 시간, 저장 여부)를 함께 노출합니다. */
  itemCount?: number;
  answerType?: string;
  /** 기본값은 /tests/{slug}. 운세처럼 별도 경로를 쓰는 페이지는 직접 지정합니다. */
  path?: string;
  /** 퀴즈 형식이 아닌 콘텐츠(운세 등)는 false로 지정해 WebPage/Quiz 스키마 중복을 방지합니다. */
  includeQuizSchema?: boolean;
};

export function TestSeoContent({ test, itemCount, answerType, path, includeQuizSchema = true }: Props) {
  const seo = test.seoContent;
  if (!seo) return null;
  const url = absoluteUrl(path ?? `/tests/${test.slug}`);
  const quizId = `${url}#quiz`;
  const commonFaqs: [string, string][] = itemCount && answerType ? [
    ["테스트에는 얼마나 걸리나요?", `${itemCount}개 ${answerType} 질문으로 구성되어 ${test.duration}이면 완료할 수 있습니다.`],
    ["내 답변이 저장되나요?", "아니요. 답변은 결과 계산에만 사용되며 별도 서버에 저장하지 않습니다."],
  ] : [];
  const faqs = [...seo.faqs, ...commonFaqs];
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-black text-ink">{seo.heading}</h2>
      <div className="mt-4 space-y-5 text-sm leading-8 text-slate-700">
        {seo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-8 rounded-2xl bg-slate-50 p-5">
        <h3 className="font-black text-ink">자주 묻는 질문</h3>
        <dl className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          {faqs.map(([question, answer]) => (
            <div key={question}><dt className="font-black text-ink">{question}</dt><dd className="mt-1">{answer}</dd></div>
          ))}
        </dl>
      </div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
      {includeQuizSchema && <>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: test.seoTitle ?? test.title, description: test.seoDescription ?? test.description, url, inLanguage: "ko-KR", mainEntity: { "@type": "Quiz", "@id": quizId } }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Quiz", "@id": quizId, name: test.title, description: test.seoDescription ?? test.description, url, inLanguage: "ko-KR", ...(seo.assesses ? { assesses: seo.assesses } : {}), educationalUse: "assessment", interactivityType: "active", isAccessibleForFree: true }} />
      </>}
    </section>
  );
}
