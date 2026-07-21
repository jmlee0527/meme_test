import type { FootballGradeProfile, FootballQuizQuestion, TestDefinition } from "@/lib/types";

// 문제은행: 난이도별 20문항 이상을 유지하며, 새 문제는 이 배열에 추가만 하면 됩니다.
// correctAnswer는 choices의 0-based 인덱스이며, 정답 위치는 문항마다 고르게 분산되어 있습니다.
export const footballQuizQuestions: FootballQuizQuestion[] = [
  // ─── 쉬움 (easy) : 1점 ───
  { id: "e01", difficulty: "easy", category: "worldcup", question: "2002 한일 월드컵에서 대한민국이 기록한 최종 성적은?", choices: ["조별리그 탈락", "16강", "4강", "준우승"], correctAnswer: 2, explanation: "대한민국은 2002년 홈에서 이탈리아, 스페인을 연파하며 아시아 최초의 월드컵 4강 신화를 썼습니다." },
  { id: "e02", difficulty: "easy", category: "player", question: "2022 카타르 월드컵에서 아르헨티나의 우승을 이끌며 '라스트 댄스'를 완성한 선수는?", choices: ["리오넬 메시", "크리스티아누 호날두", "네이마르", "루이스 수아레스"], correctAnswer: 0, explanation: "메시는 결승 프랑스전에서 2골을 넣으며 대회 MVP(골든볼)와 함께 커리어의 마지막 퍼즐이던 월드컵을 들어올렸습니다." },
  { id: "e03", difficulty: "easy", category: "player", question: "'CR7'이라는 별명으로 불리는 포르투갈의 슈퍼스타는?", choices: ["루이스 피구", "페르난도 산토스", "크리스티아누 호날두", "브루누 페르난드스"], correctAnswer: 2, explanation: "호날두의 이니셜 CR과 등번호 7번을 합친 별명입니다. 유벤투스·레알·맨유를 거치며 세계적인 아이콘이 됐습니다." },
  { id: "e04", difficulty: "easy", category: "premierleague", question: "손흥민이 2015년부터 주장까지 맡으며 활약한 프리미어리그 클럽은?", choices: ["첼시", "토트넘 홋스퍼", "아스널", "리버풀"], correctAnswer: 1, explanation: "손흥민은 2015년 레버쿠젠에서 토트넘으로 이적해 2021-22 시즌 EPL 득점왕에 올랐고, 2023년부터 주장을 맡았습니다." },
  { id: "e05", difficulty: "easy", category: "worldcup", question: "2022 카타르 월드컵의 우승국은?", choices: ["프랑스", "브라질", "크로아티아", "아르헨티나"], correctAnswer: 3, explanation: "아르헨티나는 결승에서 프랑스와 3-3 혈전 끝에 승부차기로 승리하며 36년 만에 통산 3번째 우승을 차지했습니다." },
  { id: "e06", difficulty: "easy", category: "worldcup", question: "월드컵 최다 우승(5회) 기록을 보유한 나라는?", choices: ["독일", "브라질", "이탈리아", "아르헨티나"], correctAnswer: 1, explanation: "브라질은 1958, 1962, 1970, 1994, 2002년까지 총 5번 우승한 유일한 나라입니다. 독일과 이탈리아는 각 4회입니다." },
  { id: "e07", difficulty: "easy", category: "coach", question: "2002 월드컵 4강 신화를 이끈 대한민국 대표팀 감독은?", choices: ["거스 히딩크", "딕 아드보카트", "울리 슈틸리케", "파울루 벤투"], correctAnswer: 0, explanation: "네덜란드 출신 거스 히딩크 감독은 체력과 조직력을 앞세워 한국 축구 역사상 최고의 성적을 만들어냈습니다." },
  { id: "e08", difficulty: "easy", category: "premierleague", question: "맨체스터 유나이티드와 '맨체스터 더비'를 치르는 같은 도시의 라이벌은?", choices: ["리버풀", "뉴캐슬 유나이티드", "맨체스터 시티", "리즈 유나이티드"], correctAnswer: 2, explanation: "맨유와 맨시티는 맨체스터를 연고로 하는 더비 라이벌입니다. 리버풀과의 경기는 '노스웨스트 더비'로 따로 불립니다." },
  { id: "e09", difficulty: "easy", category: "laliga", question: "리오넬 메시가 유소년 시절부터 2021년까지 몸담았던 스페인 클럽은?", choices: ["레알 마드리드", "아틀레티코 마드리드", "세비야", "FC 바르셀로나"], correctAnswer: 3, explanation: "메시는 13세에 바르셀로나 유소년팀 라 마시아에 입단해 1군에서만 공식 672골을 넣은 원클럽 레전드였습니다." },
  { id: "e10", difficulty: "easy", category: "championsleague", question: "챔피언스리그(유러피언컵 포함) 최다 우승 기록을 가진 클럽은?", choices: ["레알 마드리드", "AC 밀란", "바이에른 뮌헨", "리버풀"], correctAnswer: 0, explanation: "레알 마드리드는 2024년 도르트문트를 꺾고 통산 15번째 빅이어를 들어올린 압도적 최다 우승팀입니다." },
  { id: "e11", difficulty: "easy", category: "worldcup", question: "2018 러시아 월드컵의 우승국은?", choices: ["크로아티아", "프랑스", "벨기에", "잉글랜드"], correctAnswer: 1, explanation: "프랑스는 음바페, 그리즈만을 앞세워 결승에서 크로아티아를 4-2로 꺾고 20년 만에 두 번째 우승을 달성했습니다." },
  { id: "e12", difficulty: "easy", category: "bundesliga", question: "김민재가 2023년 나폴리를 떠나 이적한 독일 분데스리가 클럽은?", choices: ["보루시아 도르트문트", "RB 라이프치히", "바이에른 뮌헨", "레버쿠젠"], correctAnswer: 2, explanation: "김민재는 나폴리에서 세리에A 우승을 이끈 뒤 2023년 여름 독일 최강 바이에른 뮌헨으로 이적했습니다." },
  { id: "e13", difficulty: "easy", category: "history", question: "'축구 황제'라 불리며 월드컵을 3번 들어올린 브라질의 전설은?", choices: ["펠레", "호나우지뉴", "카카", "지쿠"], correctAnswer: 0, explanation: "펠레는 1958, 1962, 1970 월드컵을 제패한 유일한 선수로, 17세에 첫 우승을 차지한 기록도 갖고 있습니다." },
  { id: "e14", difficulty: "easy", category: "premierleague", question: "박지성이 2005년부터 7시즌 동안 뛰며 리그 우승 4회를 함께한 클럽은?", choices: ["아스널", "맨체스터 유나이티드", "에버턴", "퀸즈 파크 레인저스"], correctAnswer: 1, explanation: "박지성은 맨유에서 아시아 선수 최초로 챔피언스리그 결승에 출전했고 EPL 우승 4회를 경험했습니다." },
  { id: "e15", difficulty: "easy", category: "laliga", question: "'엘 클라시코'는 레알 마드리드와 어느 클럽의 맞대결을 부르는 말일까?", choices: ["아틀레티코 마드리드", "발렌시아", "FC 바르셀로나", "레알 소시에다드"], correctAnswer: 2, explanation: "엘 클라시코는 스페인 양대 명문 레알 마드리드와 바르셀로나의 라이벌전으로, 세계에서 가장 주목받는 경기 중 하나입니다." },
  { id: "e16", difficulty: "easy", category: "player", question: "2018 월드컵 우승 주역으로, 2024년 PSG를 떠나 레알 마드리드에 입단한 프랑스 공격수는?", choices: ["앙투안 그리즈만", "우스만 뎀벨레", "올리비에 지루", "킬리안 음바페"], correctAnswer: 3, explanation: "음바페는 19세였던 2018 월드컵에서 결승골 포함 4골을 넣었고, 2024년 여름 꿈의 무대였던 레알 마드리드로 이적했습니다." },
  { id: "e17", difficulty: "easy", category: "worldcup", question: "대한민국이 원정 월드컵에서 처음으로 16강에 진출한 대회는?", choices: ["2006 독일", "2010 남아공", "2014 브라질", "2018 러시아"], correctAnswer: 1, explanation: "허정무호는 2010 남아공 월드컵에서 그리스전 승리 등으로 조별리그를 통과하며 사상 첫 원정 16강을 이뤘습니다." },
  { id: "e18", difficulty: "easy", category: "bundesliga", question: "분데스리가에서 압도적인 최다 우승 기록을 보유한 클럽은?", choices: ["바이에른 뮌헨", "보루시아 도르트문트", "함부르크 SV", "샬케 04"], correctAnswer: 0, explanation: "바이에른 뮌헨은 2012-13부터 11연패를 포함해 30회가 넘는 리그 우승을 차지한 독일 축구의 절대 강자입니다." },
  { id: "e19", difficulty: "easy", category: "player", question: "이강인이 2023년 마요르카를 떠나 이적한 프랑스 클럽은?", choices: ["AS 모나코", "올랭피크 리옹", "파리 생제르맹", "마르세유"], correctAnswer: 2, explanation: "이강인은 2023년 여름 PSG로 이적해 음바페, 뎀벨레 등과 함께 뛰며 리그앙 우승을 경험했습니다." },
  { id: "e20", difficulty: "easy", category: "history", question: "1986 월드컵에서 '신의 손' 사건과 세기의 드리블 골을 같은 경기에서 만든 전설은?", choices: ["요한 크루이프", "디에고 마라도나", "프란츠 베켄바워", "게르트 뮐러"], correctAnswer: 1, explanation: "마라도나는 잉글랜드와의 8강에서 손으로 넣은 '신의 손' 골과 5명을 제친 '세기의 골'을 모두 터뜨렸습니다." },

  // ─── 보통 (medium) : 2점 ───
  { id: "m01", difficulty: "medium", category: "worldcup", question: "2014 브라질 월드컵 결승전, 연장 후반 독일의 우승을 결정지은 결승골의 주인공은?", choices: ["토마스 뮐러", "미로슬라프 클로제", "마리오 괴체", "메수트 외질"], correctAnswer: 2, explanation: "교체 투입된 괴체는 연장 113분 쉬를레의 크로스를 가슴으로 트래핑한 뒤 왼발 발리로 아르헨티나의 골망을 흔들었습니다." },
  { id: "m02", difficulty: "medium", category: "record", question: "월드컵 통산 최다 득점(16골) 기록을 보유한 선수는?", choices: ["호나우두", "미로슬라프 클로제", "리오넬 메시", "게르트 뮐러"], correctAnswer: 1, explanation: "독일의 클로제는 4개 대회에서 16골을 넣어 호나우두(15골)를 제치고 역대 1위에 올랐습니다." },
  { id: "m03", difficulty: "medium", category: "championsleague", question: "2005년 '이스탄불의 기적'에서 리버풀이 0-3으로 뒤지다 뒤집은 결승 상대는?", choices: ["유벤투스", "인터 밀란", "AC 밀란", "바이에른 뮌헨"], correctAnswer: 2, explanation: "리버풀은 전반에만 3골을 내줬지만 후반 6분 만에 3골을 몰아넣었고, 승부차기 끝에 AC 밀란을 꺾었습니다." },
  { id: "m04", difficulty: "medium", category: "premierleague", question: "2015-16 시즌, 우승 확률 5000분의 1을 뚫고 EPL 정상에 오른 클럽은?", choices: ["웨스트햄", "레스터 시티", "사우샘프턴", "에버턴"], correctAnswer: 1, explanation: "라니에리 감독의 레스터 시티는 바디, 마레즈를 앞세워 창단 첫 리그 우승이라는 동화를 완성했습니다." },
  { id: "m05", difficulty: "medium", category: "player", question: "발롱도르를 역대 최다인 8회 수상한 선수는?", choices: ["크리스티아누 호날두", "미셸 플라티니", "요한 크루이프", "리오넬 메시"], correctAnswer: 3, explanation: "메시는 2009년 첫 수상 이후 2023년까지 8차례 발롱도르를 받았습니다. 호날두는 5회로 2위입니다." },
  { id: "m06", difficulty: "medium", category: "transfer", question: "2017년 이적료 2억 2,200만 유로로 역대 최고 이적 기록을 세운 선수는?", choices: ["네이마르", "킬리안 음바페", "필리페 쿠티뉴", "폴 포그바"], correctAnswer: 0, explanation: "PSG가 네이마르의 바르셀로나 바이아웃을 전액 지불한 이 이적은 지금까지도 깨지지 않은 세계 최고 이적료 기록입니다." },
  { id: "m07", difficulty: "medium", category: "laliga", question: "라리가 역대 최다 우승 기록을 보유한 클럽은?", choices: ["FC 바르셀로나", "아틀레티코 마드리드", "레알 마드리드", "아틀레틱 빌바오"], correctAnswer: 2, explanation: "레알 마드리드는 통산 36회 우승으로 바르셀로나(27회)를 앞서는 라리가 최다 우승팀입니다." },
  { id: "m08", difficulty: "medium", category: "coach", question: "맨체스터 유나이티드를 26년간 이끌며 '퍼기 타임'이라는 유행어를 남긴 감독은?", choices: ["조제 무리뉴", "알렉스 퍼거슨", "아르센 벵거", "위르겐 클롭"], correctAnswer: 1, explanation: "퍼거슨은 1986년부터 2013년까지 맨유에서 EPL 13회, 챔스 2회 우승을 이끈 최장수 명장입니다." },
  { id: "m09", difficulty: "medium", category: "worldcup", question: "2010 남아공 월드컵 결승 연장전에서 스페인의 첫 우승을 결정지은 선수는?", choices: ["다비드 비야", "페르난도 토레스", "사비 에르난데스", "안드레스 이니에스타"], correctAnswer: 3, explanation: "이니에스타는 연장 116분 네덜란드의 골망을 가르며 스페인 축구 역사상 첫 월드컵 우승을 완성했습니다." },
  { id: "m10", difficulty: "medium", category: "seriea", question: "'올드 레이디'라는 애칭으로 불리는 세리에A 최다 우승 클럽은?", choices: ["AC 밀란", "인터 밀란", "유벤투스", "AS 로마"], correctAnswer: 2, explanation: "유벤투스는 세리에A에서 36회 우승한 이탈리아 최다 우승팀으로, 2011-12부터 9연패를 달성하기도 했습니다." },
  { id: "m11", difficulty: "medium", category: "championsleague", question: "손흥민의 토트넘이 2018-19 챔피언스리그 결승에서 만난 상대는?", choices: ["리버풀", "맨체스터 시티", "레알 마드리드", "바이에른 뮌헨"], correctAnswer: 0, explanation: "토트넘은 아약스전 기적의 역전으로 결승에 올랐지만, 마드리드에서 열린 결승에서 리버풀에 0-2로 패했습니다." },
  { id: "m12", difficulty: "medium", category: "record", question: "EPL 역대 최다 득점(260골) 기록을 지금도 보유 중인 선수는?", choices: ["웨인 루니", "티에리 앙리", "해리 케인", "앨런 시어러"], correctAnswer: 3, explanation: "시어러는 블랙번과 뉴캐슬에서 260골을 기록했습니다. 해리 케인은 213골로 2위인 채 2023년 EPL을 떠났습니다." },
  { id: "m13", difficulty: "medium", category: "history", question: "1954년 '베른의 기적'에서 무적함대 헝가리를 꺾고 우승한 나라는?", choices: ["브라질", "서독", "이탈리아", "우루과이"], correctAnswer: 1, explanation: "서독은 조별리그에서 3-8로 대패했던 푸스카스의 헝가리를 결승에서 3-2로 꺾는 대이변을 연출했습니다." },
  { id: "m14", difficulty: "medium", category: "bundesliga", question: "손흥민이 2010년 유럽 무대에 데뷔한 분데스리가 클럽은?", choices: ["바이어 레버쿠젠", "보루시아 도르트문트", "함부르크 SV", "베르더 브레멘"], correctAnswer: 2, explanation: "손흥민은 함부르크 유소년팀을 거쳐 2010년 1군에 데뷔했고, 이후 레버쿠젠을 거쳐 토트넘으로 이적했습니다." },
  { id: "m15", difficulty: "medium", category: "coach", question: "바르셀로나의 '티키타카' 전성기를 열고 현재 맨체스터 시티를 이끄는 감독은?", choices: ["카를로 안첼로티", "펩 과르디올라", "루이스 엔리케", "미켈 아르테타"], correctAnswer: 1, explanation: "과르디올라는 바르사에서 6관왕, 맨시티에서 트레블(2022-23)을 달성하며 현대 축구 전술의 흐름을 바꿨습니다." },
  { id: "m16", difficulty: "medium", category: "worldcup", question: "2006 독일 월드컵 결승에서 지단의 박치기를 유도해 퇴장시킨 이탈리아 수비수는?", choices: ["파비오 칸나바로", "잔루카 잠브로타", "알레산드로 네스타", "마르코 마테라치"], correctAnswer: 3, explanation: "마테라치는 지단을 도발해 퇴장을 이끌어냈고, 승부차기에서도 성공하며 이탈리아 우승의 숨은 주역이 됐습니다." },
  { id: "m17", difficulty: "medium", category: "player", question: "2018 러시아 월드컵 '카잔의 기적' 독일전에서 대한민국의 첫 골을 넣은 선수는?", choices: ["김영권", "손흥민", "황희찬", "이재성"], correctAnswer: 0, explanation: "후반 추가시간 김영권이 첫 골을 넣고 손흥민이 쐐기골을 더하며 디펜딩 챔피언 독일을 2-0으로 탈락시켰습니다." },
  { id: "m18", difficulty: "medium", category: "championsleague", question: "챔피언스리그 통산 최다 득점(140골) 기록의 주인공은?", choices: ["리오넬 메시", "크리스티아누 호날두", "로베르트 레반도프스키", "카림 벤제마"], correctAnswer: 1, explanation: "호날두는 챔스 140골로 메시(129골)를 앞선 역대 1위이며, 한 시즌 17골이라는 단일 시즌 기록도 갖고 있습니다." },
  { id: "m19", difficulty: "medium", category: "transfer", question: "2021년 여름, 메시가 21년 만에 바르셀로나를 떠나 입단한 클럽은?", choices: ["맨체스터 시티", "인터 마이애미", "파리 생제르맹", "첼시"], correctAnswer: 2, explanation: "바르사의 재정 문제로 재계약이 무산되며 메시는 눈물의 기자회견 후 PSG로 이적했고, 2023년 인터 마이애미로 떠났습니다." },
  { id: "m20", difficulty: "medium", category: "seriea", question: "김민재가 주전 센터백으로 활약하며 2022-23 세리에A 우승을 차지한 클럽은?", choices: ["AC 밀란", "나폴리", "라치오", "아탈란타"], correctAnswer: 1, explanation: "나폴리는 마라도나 시절 이후 33년 만에 스쿠데토를 차지했고, 김민재는 그해 세리에A 최우수 수비수로 선정됐습니다." },

  // ─── 어려움 (hard) : 3점 ───
  { id: "h01", difficulty: "hard", category: "worldcup", question: "1958 스웨덴 월드컵에서 단일 대회 최다인 13골을 몰아친 선수는?", choices: ["쥐스트 퐁텐", "펠레", "게르트 뮐러", "산드로 마촐라"], correctAnswer: 0, explanation: "프랑스의 퐁텐은 단 6경기에서 13골을 넣었습니다. 이 단일 대회 최다 득점 기록은 60년 넘게 깨지지 않고 있습니다." },
  { id: "h02", difficulty: "hard", category: "history", question: "1930년 초대 월드컵을 개최하고 우승까지 차지한 나라는?", choices: ["브라질", "이탈리아", "아르헨티나", "우루과이"], correctAnswer: 3, explanation: "우루과이는 자국에서 열린 초대 대회 결승에서 아르헨티나를 4-2로 꺾고 첫 월드컵 챔피언이 됐습니다." },
  { id: "h03", difficulty: "hard", category: "record", question: "발롱도르를 3년 연속(1983~1985) 수상한 프랑스의 레전드는?", choices: ["지네딘 지단", "미셸 플라티니", "레몽 코파", "장피에르 파팽"], correctAnswer: 1, explanation: "유벤투스의 플라티니는 1983년부터 3년 연속 발롱도르를 받았습니다. 3연속 수상은 이후 메시(2009~2011)만 해냈습니다." },
  { id: "h04", difficulty: "hard", category: "championsleague", question: "1999년 '캄프누의 기적' 챔스 결승, 추가시간 맨유의 역전 결승골을 넣은 선수는?", choices: ["테디 셰링엄", "드와이트 요크", "올레 군나르 솔샤르", "라이언 긱스"], correctAnswer: 2, explanation: "0-1로 뒤지던 맨유는 추가시간 셰링엄의 동점골에 이어 솔샤르의 결승골로 바이에른을 무너뜨리고 트레블을 완성했습니다." },
  { id: "h05", difficulty: "hard", category: "coach", question: "2003-04 시즌 아스널의 무패 우승 '인빈시블스'를 지휘한 감독은?", choices: ["아르센 벵거", "조지 그레이엄", "클라우디오 라니에리", "라파엘 베니테스"], correctAnswer: 0, explanation: "벵거의 아스널은 38경기 26승 12무로 EPL 역사상 유일한 한 시즌 무패 우승을 달성했습니다." },
  { id: "h06", difficulty: "hard", category: "transfer", question: "2001년 레알 마드리드가 당시 세계 최고 이적료로 유벤투스에서 영입한 선수는?", choices: ["루이스 피구", "호나우두", "데이비드 베컴", "지네딘 지단"], correctAnswer: 3, explanation: "레알은 약 7,750만 유로에 지단을 데려왔고, 지단은 2002년 챔스 결승에서 전설적인 왼발 발리 결승골로 보답했습니다." },
  { id: "h07", difficulty: "hard", category: "worldcup", question: "1966 잉글랜드 월드컵에서 이탈리아를 꺾은 북한의 결승골 주인공은?", choices: ["박두익", "박승진", "리동운", "양성국"], correctAnswer: 0, explanation: "박두익의 결승골로 북한은 이탈리아를 1-0으로 잡고 아시아 팀 최초로 월드컵 8강에 진출하는 파란을 일으켰습니다." },
  { id: "h08", difficulty: "hard", category: "seriea", question: "1980년대 말 AC 밀란 전성기를 이끈 '네덜란드 삼총사'에 속한 선수는?", choices: ["데니스 베르캄프", "마르코 판바스턴", "파트리크 클루이베르트", "마르크 오베르마스"], correctAnswer: 1, explanation: "판바스턴은 굴리트, 레이카르트와 함께 밀란의 유러피언컵 2연패(1989, 1990)를 이끌었습니다. 나머지 보기는 아약스·아스널 출신입니다." },
  { id: "h09", difficulty: "hard", category: "bundesliga", question: "분데스리가 통산 최다 득점(365골) 기록을 가진 '폭격기'는?", choices: ["로베르트 레반도프스키", "카를하인츠 루메니게", "게르트 뮐러", "미로슬라프 클로제"], correctAnswer: 2, explanation: "'데어 봄버' 게르트 뮐러는 바이에른에서만 365골을 넣었습니다. 레반도프스키(312골)도 이 기록에는 미치지 못했습니다." },
  { id: "h10", difficulty: "hard", category: "championsleague", question: "1992년 '챔피언스리그'로 개편된 후 첫 우승 트로피를 가져간 클럽은?", choices: ["AC 밀란", "마르세유", "바르셀로나", "아약스"], correctAnswer: 1, explanation: "마르세유는 1993년 결승에서 AC 밀란을 1-0으로 꺾고 개편 후 첫 우승팀이자 여전히 유일한 프랑스 우승팀이 됐습니다." },
  { id: "h11", difficulty: "hard", category: "history", question: "1950년 '마라카낭의 비극'에서 개최국 브라질을 침묵시키고 우승한 나라는?", choices: ["아르헨티나", "이탈리아", "스웨덴", "우루과이"], correctAnswer: 3, explanation: "20만 관중 앞에서 우루과이가 2-1 역전승을 거두자 브라질 전체가 충격에 빠졌고, 이후 브라질은 유니폼 색까지 바꿨습니다." },
  { id: "h12", difficulty: "hard", category: "worldcup", question: "2002 한일 월드컵에서 8골로 득점왕에 오른 선수는?", choices: ["히바우두", "호나우두", "미하엘 발락", "티에리 앙리"], correctAnswer: 1, explanation: "'괴물' 호나우두는 무릎 부상을 딛고 8골을 폭발시켰으며, 결승 독일전에서도 2골을 넣어 브라질의 5번째 우승을 이끌었습니다." },
  { id: "h13", difficulty: "hard", category: "coach", question: "2010년 인터 밀란의 트레블(리그·컵·챔스)을 완성한 감독은?", choices: ["카를로 안첼로티", "안토니오 콘테", "조제 무리뉴", "마시밀리아노 알레그리"], correctAnswer: 2, explanation: "무리뉴의 인터는 과르디올라의 바르사를 4강에서 잡고 우승하며 이탈리아 클럽 최초의 트레블을 달성했습니다." },
  { id: "h14", difficulty: "hard", category: "premierleague", question: "1992-93 프리미어리그 출범 첫 시즌의 우승 클럽은?", choices: ["맨체스터 유나이티드", "블랙번 로버스", "아스널", "리버풀"], correctAnswer: 0, explanation: "퍼거슨의 맨유는 EPL 원년 우승으로 26년 만의 리그 정상에 복귀했고, 이후 왕조 시대를 열었습니다." },
  { id: "h15", difficulty: "hard", category: "record", question: "A매치(국가대표 경기) 남자 최다 득점 세계 기록을 보유한 선수는?", choices: ["리오넬 메시", "알리 다에이", "크리스티아누 호날두", "페렌츠 푸스카스"], correctAnswer: 2, explanation: "호날두는 이란의 알리 다에이(108골)를 넘어 A매치 130골 이상을 기록하며 남자 국가대표 최다 득점자가 됐습니다." },
  { id: "h16", difficulty: "hard", category: "laliga", question: "아틀레티코 마드리드를 이끌고 2013-14, 2020-21 라리가 우승을 차지한 감독은?", choices: ["디에고 시메오네", "우나이 에메리", "마르셀리노", "키케 산체스 플로레스"], correctAnswer: 0, explanation: "시메오네는 레알·바르사 양강 체제를 두 번이나 깨뜨렸고, 10년 넘게 아틀레티코를 이끌며 리그 최장수 감독이 됐습니다." },
  { id: "h17", difficulty: "hard", category: "history", question: "1956년 초대 발롱도르의 주인공은?", choices: ["알프레도 디 스테파노", "레몽 코파", "스탠리 매슈스", "레프 야신"], correctAnswer: 2, explanation: "잉글랜드의 윙어 스탠리 매슈스가 41세에 초대 발롱도르를 수상했습니다. 디 스테파노는 2회(1957, 1959) 수상자입니다." },
  { id: "h18", difficulty: "hard", category: "championsleague", question: "유러피언컵 출범(1956) 직후 5연패라는 전무후무한 기록을 세운 클럽은?", choices: ["벤피카", "AC 밀란", "아약스", "레알 마드리드"], correctAnswer: 3, explanation: "디 스테파노와 푸스카스의 레알 마드리드는 1956년부터 1960년까지 초대 대회 5연패를 달성했습니다." },
  { id: "h19", difficulty: "hard", category: "worldcup", question: "1994 미국 월드컵 결승 승부차기에서 마지막 키커로 실축한 이탈리아의 에이스는?", choices: ["로베르토 바조", "프랑코 바레시", "파올로 말디니", "잔프랑코 졸라"], correctAnswer: 0, explanation: "대회 내내 이탈리아를 결승까지 끌고 온 바조가 마지막 킥을 하늘로 날리며 브라질이 우승했습니다. 축구사에서 가장 유명한 실축입니다." },
  { id: "h20", difficulty: "hard", category: "coach", question: "2010 남아공 월드컵에서 아르헨티나 대표팀 감독을 맡았던 인물은?", choices: ["세르히오 바티스타", "디에고 마라도나", "알레한드로 사베야", "마르셀로 비엘사"], correctAnswer: 1, explanation: "선수 시절 전설이었던 마라도나가 감독으로 팀을 이끌었지만, 8강에서 독일에 0-4로 대패하며 물러났습니다." },
];

export const footballDifficultyPoints = { easy: 1, medium: 2, hard: 3 } as const;

export const footballGradeProfiles: FootballGradeProfile[] = [
  {
    slug: "football-beginner", name: "축구 입문자", icon: "👟", minScore: 0, maxScore: 19,
    summary: "이제 막 축구의 세계에 발을 들인 단계예요.",
    description: "아직 축구 상식보다는 분위기로 경기를 즐기는 단계입니다. 하지만 모든 축잘알도 처음엔 입문자였다는 사실! 월드컵이나 챔피언스리그 결승 같은 빅매치부터 챙겨 보면 축구의 재미가 빠르게 붙기 시작합니다. 하이라이트 영상과 함께 이 테스트를 다시 도전해보세요.",
    comment: "괜찮아요, 메시도 처음엔 공이 뭔지 몰랐을... 리는 없지만 아무튼 시작이 반입니다!",
    shareTemplate: "내 축잘알 지수는 {score}점, 축구 입문자 👟 과연 너는 나보다 축구를 더 잘 알까?",
  },
  {
    slug: "football-casual", name: "축구 관심러", icon: "📺", minScore: 20, maxScore: 39,
    summary: "빅매치는 챙겨 보는 라이트 축구 팬이에요.",
    description: "월드컵과 국가대표 경기는 꼬박꼬박 챙겨 보고, 손흥민의 골 소식 정도는 알고 있는 단계입니다. 유명한 장면과 스타 선수는 익숙하지만 세부 기록에서 아쉽게 점수를 놓쳤어요. 주말 해외 축구 한 경기씩만 챙겨 봐도 축잘알 새싹으로 금방 성장할 수 있습니다.",
    comment: "축구 보는 눈은 있는데 디테일이 아쉽다! 하이라이트 말고 풀경기에 도전해보세요.",
    shareTemplate: "내 축잘알 지수는 {score}점, 축구 관심러 📺 과연 너는 나보다 축구를 더 잘 알까?",
  },
  {
    slug: "football-sprout", name: "축잘알 새싹", icon: "🌱", minScore: 40, maxScore: 59,
    summary: "친구들 사이에서 축구 좀 본다는 소리를 듣는 단계예요.",
    description: "리그 순위와 이적 소식을 검색해보고, 경기 후 커뮤니티 반응까지 챙겨 보는 진짜 팬의 초입입니다. 유명 선수와 대회 상식은 탄탄하지만 축구 역사와 레전드 기록에서 아깝게 점수를 흘렸어요. 옛날 명경기 다시보기가 다음 등급으로 가는 지름길입니다.",
    comment: "새싹이라고 무시하면 안 됩니다. 물만 주면 순식간에 진성 축잘알로 자랍니다.",
    shareTemplate: "내 축잘알 지수는 {score}점, 축잘알 새싹 🌱 과연 너는 나보다 축구를 더 잘 알까?",
  },
  {
    slug: "football-expert", name: "진성 축잘알", icon: "🔥", minScore: 60, maxScore: 79,
    summary: "단톡방에서 축구 얘기가 나오면 마이크를 잡는 사람이에요.",
    description: "현재 축구는 물론 레전드와 역사 문제까지 넘나드는 확실한 축잘알입니다. 경기를 보며 전술 얘기를 꺼내고, 친구들의 축구 궁금증을 해결해주는 역할일 가능성이 높아요. 어려움 난이도 문제 몇 개만 더 잡으면 축구 신의 영역입니다.",
    comment: "이 정도면 해설위원 뺨치는 수준. 주변에서 '축구 그거 어떻게 됐어?'라고 물어보는 사람이 당신입니다.",
    shareTemplate: "내 축잘알 지수는 {score}점, 진성 축잘알 🔥 과연 너는 나보다 축구를 더 잘 알까?",
  },
  {
    slug: "football-god", name: "축구 신", icon: "👑", minScore: 80, maxScore: 100,
    summary: "걸어 다니는 축구 백과사전, 축잘알의 정점이에요.",
    description: "월드컵 역사부터 리그 기록, 이적 시장까지 모르는 게 없는 축구 지식의 최상위 1%입니다. 1950년대 발롱도르 수상자와 최신 이적 소식을 같은 온도로 이야기할 수 있는 수준이에요. 축구 퀴즈로는 더 이상 증명할 것이 없으니, 이제 친구들에게 이 테스트를 공유해서 격차를 확인시켜줄 차례입니다.",
    comment: "당신이 바로 축구 그 자체. 펠레와 마라도나가 누가 더 위대한지 당신의 의견이 궁금합니다.",
    shareTemplate: "내 축잘알 지수는 {score}점, 축구 신 👑 나를 이길 수 있으면 이겨봐!",
  },
];

export const footballQuizTest: TestDefinition = {
  type: "quiz",
  slug: "football-iq-test",
  title: "나의 축잘알 지수는?",
  shortTitle: "축잘알 테스트",
  cardTitle: "나는 축잘알일까?",
  description: "월드컵부터 챔피언스리그, 해외 축구 상식까지! 난이도별 15문제로 나의 축잘알 지수를 측정해보세요.",
  category: "팬 퀴즈",
  duration: "약 3분",
  icon: "⚽",
  thumbnail: "/tests/football-quiz.jpg",
  participants: 874,
  accent: "green",
  fanTheme: "yellow-pop",
  isNew: true,
  itemCount: 15,
  questions: [],
  resultSlugs: [],
  seoTitle: "축잘알 테스트 | 나의 축잘알 지수는 몇 점일까?",
  seoDescription: "축잘알 테스트로 나의 축구 지식 수준을 확인해보세요. 월드컵, 챔피언스리그, 해외 축구 상식 15문제로 축잘알 지수를 계산하는 무료 축구 퀴즈입니다.",
  keywords: ["축잘알 테스트", "축구 상식 테스트", "축구 퀴즈", "축잘알 지수", "축구 IQ 테스트", "축구 테스트", "해외축구 퀴즈", "축구 상식 퀴즈", "무료 축구 테스트"],
  seoContent: {
    heading: "축잘알 테스트란?",
    paragraphs: [
      "축잘알 테스트는 나의 축구 지식이 어느 정도인지 점수로 확인하는 축구 상식 테스트입니다. 월드컵, 챔피언스리그, 프리미어리그·라리가 같은 유럽 리그, 레전드 선수와 축구 역사까지 다양한 영역의 문제를 풀면 0점부터 100점까지의 축잘알 지수가 계산됩니다.",
      "문제는 쉬움·보통·어려움 세 난이도의 문제은행에서 각각 5문제씩, 총 15문제가 매번 랜덤으로 출제됩니다. 난이도가 높은 문제일수록 배점이 커서 단순히 많이 맞히는 것보다 어려운 문제를 맞힐수록 지수가 크게 오릅니다. 60문제가 넘는 문제은행에서 최근에 풀었던 문제는 제외하고 출제하므로, 다시 도전할 때마다 새로운 축구 퀴즈를 즐길 수 있습니다.",
      "골키퍼 규칙이나 경기 시간 같은 교과서식 문제는 없습니다. '2014 브라질 월드컵 결승골의 주인공은?'처럼 축구 팬이라면 무릎을 치게 되는 문제들로만 구성했고, 모든 문제에는 흥미로운 해설이 붙어 있어 틀린 문제도 결과 화면에서 정답과 함께 다시 확인할 수 있습니다.",
      "결과는 점수에 따라 축구 입문자부터 축구 신까지 5개 등급으로 나뉩니다. 친구, 단톡방, 축구 모임에 결과를 공유해서 누가 진짜 축잘알인지 겨뤄보세요. 축구 IQ 테스트처럼 가볍게 즐기되, 등급별 멘트가 승부욕을 자극할 겁니다.",
    ],
    faqs: [
      ["축잘알 테스트는 어떻게 진행되나요?", "쉬움·보통·어려움 문제은행에서 각 5문제씩 랜덤으로 뽑은 총 15개의 4지선다 문제를 풉니다. 난이도 순서도 섞여서 출제되며 약 3분이면 완료됩니다."],
      ["문제는 매번 같은가요?", "아니요. 60문제 이상의 문제은행에서 매번 랜덤으로 출제되고, 최근에 풀었던 문제는 우선 제외되기 때문에 다시 도전할 때마다 새로운 문제를 만나게 됩니다."],
      ["축잘알 지수는 어떻게 계산되나요?", "쉬움 1점, 보통 2점, 어려움 3점으로 배점된 총 30점 만점을 100점 기준으로 환산한 점수가 축잘알 지수입니다. 점수에 따라 5개 등급이 결정됩니다."],
      ["어떤 범위에서 문제가 나오나요?", "월드컵, 챔피언스리그, 프리미어리그·라리가·세리에A·분데스리가, 레전드 선수, 이적 기록, 축구 역사 등에서 고르게 출제됩니다. 규칙 암기형 문제는 출제하지 않습니다."],
      ["틀린 문제의 정답도 알 수 있나요?", "네. 결과 화면에서 틀린 문제의 정답과 함께 왜 그것이 정답인지 흥미로운 해설을 확인할 수 있습니다."],
    ],
    assesses: "축구 상식과 축구 지식 수준",
  },
};

export const getFootballGradeProfile = (slug: string) => footballGradeProfiles.find((profile) => profile.slug === slug);
export const getFootballQuizQuestion = (id: string) => footballQuizQuestions.find((question) => question.id === id);
