import { getLoveResultProfile } from "@/data/love-mbti";
import type { LoveResultSlug } from "@/lib/types";

type CompatibilitySet={best:[LoveResultSlug,LoveResultSlug];good:[LoveResultSlug,LoveResultSlug];caution:[LoveResultSlug,LoveResultSlug]};

export const loveCompatibility:Record<LoveResultSlug,CompatibilitySet>={
  "love-gentle-secure":{best:["love-devoted-carer","love-emotional-immersive"],good:["love-passionate-direct","love-tsundere-avoidant"],caution:["love-thrill-seeker","love-careful-observer"]},
  "love-passionate-direct":{best:["love-thrill-seeker","love-emotional-immersive"],good:["love-gentle-secure","love-devoted-carer"],caution:["love-tsundere-avoidant","love-free-independent"]},
  "love-devoted-carer":{best:["love-gentle-secure","love-careful-observer"],good:["love-passionate-direct","love-emotional-immersive"],caution:["love-free-independent","love-thrill-seeker"]},
  "love-free-independent":{best:["love-careful-observer","love-tsundere-avoidant"],good:["love-emotional-immersive","love-thrill-seeker"],caution:["love-passionate-direct","love-devoted-carer"]},
  "love-thrill-seeker":{best:["love-tsundere-avoidant","love-passionate-direct"],good:["love-free-independent","love-careful-observer"],caution:["love-devoted-carer","love-gentle-secure"]},
  "love-careful-observer":{best:["love-devoted-carer","love-free-independent"],good:["love-thrill-seeker","love-tsundere-avoidant"],caution:["love-gentle-secure","love-emotional-immersive"]},
  "love-emotional-immersive":{best:["love-passionate-direct","love-gentle-secure"],good:["love-devoted-carer","love-free-independent"],caution:["love-tsundere-avoidant","love-careful-observer"]},
  "love-tsundere-avoidant":{best:["love-free-independent","love-thrill-seeker"],good:["love-careful-observer","love-gentle-secure"],caution:["love-emotional-immersive","love-passionate-direct"]},
};

export type CompatibilityTier="best"|"good"|"caution";
const scores:Record<CompatibilityTier,[number,number]>={best:[92,89],good:[84,80],caution:[48,42]};

export function getLoveCompatibility(slug:LoveResultSlug){
  const base=getLoveResultProfile(slug)!;
  return (Object.keys(loveCompatibility[slug]) as CompatibilityTier[]).reduce((result,tier)=>{
    result[tier]=loveCompatibility[slug][tier].map((partnerSlug,index)=>{
      const partner=getLoveResultProfile(partnerSlug)!;
      const description=tier==="best"
        ? `${base.relationshipNeed}을 중요하게 여기는 ${base.name}에게 ${partner.name}의 ${partner.relationshipGift}은 큰 안정과 만족을 줄 수 있습니다. 서로의 장점을 자연스럽게 주고받되, 익숙함 속에서도 원하는 표현을 구체적으로 확인하면 강한 연결이 오래 유지됩니다.`
        : tier==="good"
          ? `${base.name}의 ${base.relationshipGift}과 ${partner.name}의 ${partner.relationshipGift}은 서로 다른 방식으로 관계를 보완합니다. 속도와 애정 표현 방식이 완전히 같지는 않아도 차이를 번역해 말할 수 있다면 각자의 세계를 넓혀주는 좋은 조합이 될 가능성이 높습니다.`
          : `${base.name}은 갈등에서 ${base.conflictPattern}, ${partner.name}은 ${partner.conflictPattern} 경향이 있어 같은 상황을 다르게 해석할 수 있습니다. 낮은 점수는 관계가 불가능하다는 뜻이 아니며, 필요한 거리·확인·대화 시점을 미리 합의할수록 반복되는 오해를 줄일 수 있습니다.`;
      return {partner,score:scores[tier][index],description};
    });
    return result;
  },{best:[],good:[],caution:[]} as Record<CompatibilityTier,{partner:ReturnType<typeof getLoveResultProfile> extends infer T?Exclude<T,undefined>:never;score:number;description:string}[]>);
}
