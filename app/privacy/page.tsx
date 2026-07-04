import { PolicyLayout } from "@/components/content/PolicyLayout";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "개인정보처리방침", description: `${siteConfig.name}의 개인정보 수집, 이용, 보관 및 이용자 권리에 관한 정책입니다.`, path: "/privacy", keywords: ["개인정보처리방침"] });
export default function PrivacyPage() {
  return <PolicyLayout title="개인정보처리방침" description={`${siteConfig.name}는 이용자의 개인정보를 중요하게 여기며 관련 법령을 준수합니다.`} updatedAt="2026년 7월 3일" sections={[
    { title:"1. 수집하는 정보", content:<p>서비스는 테스트 답변을 서버에 저장하지 않습니다. 문의 시 이용자가 직접 제공한 이메일 주소와 문의 내용이 처리될 수 있으며, 접속 과정에서 IP 주소, 브라우저 종류, 방문 기록 등 최소한의 기술 정보가 자동 생성될 수 있습니다.</p> },
    { title:"2. 이용 목적과 보유 기간", content:<><p>문의 정보는 답변과 분쟁 대응을 위해 사용하며 목적 달성 후 지체 없이 삭제합니다. 관계 법령에 별도 보존 의무가 있는 경우 해당 기간 동안 보관합니다.</p><ul><li>문의 응대 및 서비스 품질 개선</li><li>부정 이용 방지와 서비스 보안</li><li>법적 의무 준수</li></ul></> },
    { title:"3. 쿠키와 광고", content:<p>Google AdSense 등 제3자 광고 사업자가 광고 제공과 성과 측정을 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정 또는 Google 광고 설정에서 맞춤 광고를 관리할 수 있습니다.</p> },
    { title:"4. 제3자 제공 및 처리 위탁", content:<p>법령에 근거가 있거나 이용자 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다. 서비스 운영을 위해 Vercel의 호스팅 인프라와 Google의 광고 서비스가 사용될 수 있으며, 각 사업자의 정책이 적용됩니다.</p> },
    { title:"5. 이용자의 권리", content:<p>이용자는 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 문의 페이지를 통해 접수할 수 있으며 본인 확인 후 지체 없이 처리합니다.</p> },
    { title:"6. 개인정보 보호 문의", content:<p>개인정보 관련 문의는 hello@buupstory.kr로 보내주세요. 정책 변경 시 시행 전에 서비스 내에서 알립니다.</p> },
  ]} />;
}
