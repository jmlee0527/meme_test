import Image from "next/image";
import Link from "next/link";
import { getHogwartsProfile, hogwartsTest, type HogwartsProfile } from "@/data/hogwarts-character";
import { ShareButtons } from "@/components/share/ShareButtons";
import { ShareImageCard } from "@/components/share/ShareImageCard";
import styles from "./HogwartsCharacter.module.css";

export function HogwartsCharacterResult({ profile, personalized }: { profile: HogwartsProfile; personalized: boolean }) {
  return (
    <div className={styles.world}>
      <section className={styles.paper}>
        <p className={styles.kicker}>HOGWARTS · MY CHARACTER</p>
        <p className={styles.note}>{personalized ? "12가지 선택이 들려준 나의 이야기" : "이 캐릭터는 어떤 사람일까요?"}</p>
        <div className={styles.heroPortrait}><div className={styles.portrait}>
          <Image src={profile.image} alt={profile.imageAlt} fill sizes="(max-width: 380px) 75vw, 285px" priority />
        </div></div>
        <p className={styles.englishName}>{profile.englishName}</p>
        <h1 className={`${styles.title} ${styles.resultTitle}`}>{profile.name}</h1>
        <p className={styles.subtitle}>{profile.tagline}</p>
      </section>
      <div className={styles.body}>
        <section className={styles.section}>
          <h2>{personalized ? "이 캐릭터와 닮은 이유" : "이 캐릭터의 세 가지 특징"}</h2>
          <ul className={styles.reasons}>{profile.reasons.map((reason, index) => <li key={reason}><span aria-hidden="true">0{index + 1}</span><p>{reason}</p></li>)}</ul>
        </section>
        <section className={styles.section}><h2>호그와트에서의 학교생활</h2><p>{profile.schoolLife}</p></section>
        <div className={styles.twoColumns}>
          <section className={styles.section}><h2>나만의 마법 같은 강점</h2><p>{profile.strength}</p></section>
          <section className={styles.section}><h2>기억해두면 좋은 한 가지</h2><p>{profile.caution}</p></section>
        </div>
        <section className={styles.section}>
          <h2>함께하면 좋은 친구</h2>
          <div className={styles.friendGrid}>{profile.friends.map((slug) => {
            const friend = getHogwartsProfile(slug)!;
            return <Link key={slug} href={`/hogwarts-character-test/result/${slug}`} className={styles.friend}>
              <div className={styles.portrait}><Image src={friend.image} alt={friend.imageAlt} fill sizes="(max-width: 540px) 35vw, 190px" /></div>
              <strong>{friend.name}</strong><p>{friend.strength}</p>
            </Link>;
          })}</div>
        </section>
        <section className={styles.section}><h2>함께 벌일 것 같은 사건</h2><p>{profile.adventure}</p></section>
        <section className={styles.section}>
          <h2>내 캐릭터 카드 보내기</h2>
          <div className={styles.share}>
            <ShareImageCard eyebrow="나의 호그와트 캐릭터" title={profile.name} subtitle={profile.tagline} accent="parchment" imageSrc={profile.image} imageAlt={profile.imageAlt} imageFit="contain" />
            <div className="mt-5"><ShareButtons title={`나의 호그와트 캐릭터: ${profile.name}`} description={profile.tagline} path={`/hogwarts-character-test/result/${profile.slug}`} imagePath={profile.image} /></div>
          </div>
        </section>
        <Link href="/tests/hogwarts-character-test?start=1" className={styles.button}>{personalized ? "새로운 선택으로 다시 입학하기" : "나의 캐릭터도 알아보기"}</Link>
        <p className={styles.note}>{hogwartsTest.disclaimer}</p>
      </div>
    </div>
  );
}
