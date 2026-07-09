import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {AdhdScreeningResult} from "@/components/test/AdhdScreeningResult";
import {adhdLevelProfiles,getAdhdLevelProfile} from "@/data/adhd-screening";
import {calculateAdhdResult,parseAdhdAnswers} from "@/lib/adhd-screening-engine";
import {createMetadata} from "@/lib/site";

type Props={params:Promise<{slug:string}>;searchParams:Promise<{answers?:string}>};
export function generateStaticParams(){return adhdLevelProfiles.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const profile=getAdhdLevelProfile(slug);if(!profile)return{};return createMetadata({title:`ADHD 자가 체크 결과 | ${profile.name}`,description:`최근 6개월의 주의력 부족과 과잉행동·충동성 관련 특성을 분석한 참고용 선별 결과입니다. ${profile.summary}`,path:`/adhd-self-check/result/${slug}`,keywords:["ADHD 테스트","ADHD 자가진단","성인 ADHD 테스트","ADHD 자가 체크"]});}
export default async function Page({params,searchParams}:Props){const {slug}=await params;const {answers:raw}=await searchParams;const profile=getAdhdLevelProfile(slug);if(!profile)notFound();const answers=parseAdhdAnswers(raw);const calculated=answers?calculateAdhdResult(answers):null;if(calculated&&calculated.profile.slug!==slug)redirect(`/adhd-self-check/result/${calculated.profile.slug}?answers=${raw}`);return <AdhdScreeningResult profile={calculated?.profile??profile} scores={calculated?.scores??{overall:Math.round((profile.minScore+profile.maxScore)/2),inattention:50,hyperactivity:50,screenerSignals:2}}/>;}
