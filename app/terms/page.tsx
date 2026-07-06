import { PolicyLayout } from "@/components/content/PolicyLayout";
import { createMetadata, siteConfig } from "@/lib/site";

export const metadata = createMetadata({ title: "이용약관", description: `${siteConfig.name} 서비스 이용 조건과 이용자 및 운영자의 권리와 책임을 안내합니다.`, path: "/terms", keywords: ["미미테스트 이용약관"] });
export default function TermsPage() {
  return <PolicyLayout title="이용약관" description={`본 약관은 ${siteConfig.name}가 제공하는 테스트와 정보 서비스의 이용 조건을 정합니다.`} updatedAt="2026년 7월 3일" sections={[
    { title:"1. 목적과 적용", content:<p>이 약관은 이용자가 {siteConfig.name} 웹사이트와 관련 서비스를 이용할 때 필요한 권리, 의무 및 책임 사항에 적용됩니다. 서비스를 이용하면 본 약관에 동의한 것으로 봅니다.</p> },
    { title:"2. 서비스의 내용", content:<p>{siteConfig.name}는 성향·직장·연애·결혼·부업 등 다양한 테스트와 정보 가이드, 결과 공유 기능을 제공합니다. 운영상 필요한 경우 서비스의 일부를 변경하거나 중단할 수 있으며 중요한 변경은 합리적인 방법으로 알립니다.</p> },
    { title:"3. 정보의 한계", content:<p>테스트 결과와 콘텐츠는 일반적인 참고 정보입니다. 특정 수익, 취업, 투자 성과를 보장하지 않으며 법률·세무·투자 등 전문가의 판단을 대신하지 않습니다. 이용자는 자신의 상황을 검토해 최종 결정을 내려야 합니다.</p> },
    { title:"4. 금지 행위", content:<><p>이용자는 다음 행위를 해서는 안 됩니다.</p><ul><li>서비스를 방해하거나 비정상적인 방식으로 접근하는 행위</li><li>콘텐츠를 허가 없이 대량 복제·배포·판매하는 행위</li><li>타인의 권리를 침해하거나 위법한 목적으로 이용하는 행위</li></ul></> },
    { title:"5. 지식재산권", content:<p>서비스의 디자인, 문구, 테스트 구성 및 콘텐츠에 관한 권리는 운영자 또는 정당한 권리자에게 있습니다. 개인적인 결과 공유를 제외한 상업적 이용에는 사전 허가가 필요합니다.</p> },
    { title:"6. 책임과 문의", content:<p>운영자는 고의 또는 중대한 과실이 없는 한 이용자의 판단과 외부 플랫폼 이용으로 발생한 손해에 책임을 지지 않습니다. 약관 관련 문의는 support@crev.kr로 접수할 수 있습니다.</p> },
  ]} />;
}
