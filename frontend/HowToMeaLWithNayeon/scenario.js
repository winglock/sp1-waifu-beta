const textGame = new TextGame();

const branch_1 = new Branch("branch_1", null)
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/home.jpg"),
    TextBarEvent.text(null, "[집 안]"),
    DelayEvent.delay(2000),
    SoundEvent.sfx("audio/HeartShaker.mp3"),
    TextBarEvent.text(
      null,
      "[알람소리](이상하게 생각해도 어쩔 수 없어, 반했으니까~)"
    )
  ])
  .addEventsAsPage([
    SoundEvent.background("audio/background/Ohayou.mp3"),
    TextBarEvent.text("동희", "으으음...")
  ])
  .addTextPage(
    null,
    "오늘도 감미로운 나연눈나의 목소리 알람, 상쾌한 하루의 시작이다."
  )
  .addTextPage(
    null,
    "따뜻한 한낮의 햇살까지 비쳐 기분이 좋게 하루를 시작할 수 있을 듯 한 기분이 든다."
  )
  .addTextPage("...", "잠깐... 뭔가 잊은게 있는 것 같은데..?")
  .addTextPage("동희", "맞다! 오늘 팬싸인회 날이지!")
  .addTextPage(
    "...",
    "시계를 보니 시간은 벌써 팬싸인회 10분 전. 바로 준비해둔 가방과 토스트를 챙겨 밖으로 달려나간다."
  )
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/street.jpg"),
    DelayEvent.delay(500),
    TextBarEvent.text(null, "[집 앞]")
  ])
  .addTextPage(
    "동희",
    "지고쿠 지고쿠! 이대로라면 나연눈나와의 팬싸인회에 늦어버렷!!"
  )
  .addTextPage(
    "...",
    "나연눈나를 만나기 위해서라면 토스트를 물고 전력질주하는 것 쯤이야..!"
  )
  .addTextPage(
    "...",
    "그 순간, 골목길에서 달려오는 트럭이 보였다. 그리고 그 트럭에 타고 있는건..."
  )
  .addEventsAsPage([
    SoundEvent.stopbackground(),
    SoundEvent.sfx("audio/Brake.mp3"),
    CanvasEvent.changeBackGround("images/backgrounds/NayeonTruck.png"),
    DelayEvent.delay(500),
    TextBarEvent.text(null, "[달려오는 트럭과 거기에 탄 나연]")
  ])
  .addTextPage("동희", "나연눈나?")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/street.jpg"),
    DelayEvent.delay(500),
    TextBarEvent.text(null, "(-끼이익)")
  ])
  .addTextPage(
    "...",
    "아아ㅡ 이제 끝인가. 나연눈나랑 같이 밥.. 먹어보고.. 싶었는데..."
  )
  .addTextPage("...", "새하얀 빛이 내 몸을 감쌌다. 시간이 얼마나 지났을까.")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/home.jpg")
  ])
  .addEventsAsPage([
    TextBarEvent.text(
      "...",
      "느껴지지 않는 고통에 뜬 눈에 비친건.. 내 방 침대다."
    ),
    SoundEvent.sfx("audio/Bird.mp3")
  ])
  .addTextPage("동희", "...방금 그건 뭐였지? 꿈이라기엔 너무 생생했는데...")
  .addTextPage(
    "...",
    "분명히 팬싸인회 날이라고 적혀있었을 달력은 적힌 것 없이 깨끗했다. "
  )
  .addTextPage("동희", "후... 모르겠다. 빨리 학교나 가야지, 진짜 지각하겠어")
  .addTextPage(null, "---")
  .addEventsAsPage([
    SoundEvent.background("audio/background/Ohayou.mp3"),
    CanvasEvent.changeBackGround("images/backgrounds/school.jpg"),
    DelayEvent.delay(500),
    TextBarEvent.text(null, "[학교]")
  ])
  .addTextPage(
    "...",
    "저 아이는...? 분명히 빈 자리였을 자리에 어쩐지 익숙한 사람이 있는것 같다."
  )
  .addEventsAsPage([
    CanvasEvent.addImage(
      "shadow",
      "images/characters/Shadow.png",
      modelPosition.center,
      imageShowType.FadeIn
    ),
    TextBarEvent.text("친구1", "야, 뭘 그렇게 뚫어지게 쳐다봐? 무슨 일 있어?")
  ])
  .addTextPage("친구1", "야, 뭘 그렇게 뚫어지게 쳐다봐? 무슨 일 있어?")
  .addTextPage("동희", "아.. 아무것도 아냐.")
  .addTextPage(
    "...",
    "착각이였나... 오늘 좀 이상하네, 자꾸 이상한 기분이 들고, 스트레스 떄문인가"
  )
  .addEventsAsPage([
    CanvasEvent.removeObject("shadow", imageHideType.Disappear),
    TextBarEvent.text(null, "[학교(방과후)]"),
    CanvasEvent.changeBackGround("images/backgrounds/school.jpg"),
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/Confession.mp3")
  ])
  .addTextPage("선생님", "자 오늘 청소당번은.. 어디보자...")
  .addTextPage("선생님", "임나연, 김동희!")
  .addTextPage(
    "...",
    "임나연..? 우리반에 나연누나와 같은 이름은 없었을 텐데..."
  )
  .addEventsAsPage([
    TextBarEvent.text(
      null,
      "그렇게 생각하던 중, 창가에 앉아 창밖을 바라보고 있는 한 여자아이가 눈에 보였다."
    ),
    CanvasEvent.addImage(
      "nayeon",
      "images/characters/NayeonBlack.png",
      modelPosition.center,
      imageShowType.FadeIn
    )
  ])
  .addTextPage(
    null,
    "바람이 불자 커튼이 날리고, 노을빛이 그녀의 머릿결을 황금빛으로 물들였다."
  )
  .addTextPage("???", "...")
  .addTextPage(
    null,
    "나는 잠시 넋을 잃고 그녀를 쳐다봤다. 나연눈나를 본 이후로 이런 기분을 느낀건 처음, 너무나도 아름다운 모습이였다."
  )
  .addTextPage("동희", "저기...")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "nayeon",
      "images/characters/Nayeon.png",
      modelPosition.center,
      imageShowType.FadeIn
    )
  ])
  .addTextPage("???", "응?")
  .addTextPage(
    "...",
    "돌아본 그녀의 모습은 나에겐 너무나도 익숙한, 절대 잘못볼리 없는 나연누나의 모습 그대로였다."
  )
  .addTextPage("동희", "나연...눈나...?")
  .addTextPage("나연", "누나라니. 갑자기 무슨 소리야?")
  .addTextPage("...", "세계가... 바뀌었다?")
  .addTextPage("나연", "왜 그래? 어디 아파?")
  .addTextPage("동희", "아, 아무것도 아니야!")
  .addTextPage("...", "나연누나가 어째서 우리 반에? 대체 무슨일이지?!")
  .addEventsAsPage([
    CanvasEvent.removeObject("nayeon", imageHideType.Disappear)
  ])
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/street.jpg"),
    DelayEvent.delay(500),
    SoundEvent.sfx("audio/Walk.mp3"),
    TextBarEvent.text(
      null,
      "놀란 표정을 숨길 수 없었던 나는 바로 학교를 뛰쳐나갔다."
    )
  ])
  .addTextPage(null, "---")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/home.jpg"),
    DelayEvent.delay(500),
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/Maintheme.mp3"),
    TextBarEvent.text(null, "[집]")
  ])
  .addTextPage("동희", "헉...헉...")
  .addTextPage(null, "거친 숨을 고르고서, 생각을 정리하기로 했다.")
  .addTextPage(
    "...",
    "그러니까... 정리하자면, 나는 트럭에 치여서 평행세계로 왔고, 여기서는 나연눈나가 나랑 동급생에 클래스메이트인건가..."
  )
  .addTextPage(
    "...",
    "이건 인생에 둘도 없을 기회야! 지금이라면 나연누나와 뭐든 할 수 있어!"
  )
  .addTextPage(
    "동희",
    "바뀌어버린 세상이라면, 디시 나연갤 호감고닉 『나연누나밥먹나연』 으로서,"
  )
  .addTextPage("...", "나연누나와 『밥』을 먹고야 말겠어!")
  .addEventsAsPage([
    SoundEvent.sfx("audio/katalk.mp3"),
    TextBarEvent.text(null, "(카톡!)")
  ])
  .addTextPage(null, "굳은 결심을 다지던 중, 카톡 소리가 내 집중을 깨뜨렸다.")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "phone",
      "images/characters/phoneBlack.png",
      modelPosition.center,
      imageShowType.FadeIn
    ),
    TextBarEvent.text(null, "[휴대폰 화면]")
  ])
  .addEventsAsPage([
    CanvasEvent.addImage(
      "phone",
      "images/characters/phoneTalk.png",
      modelPosition.center,
      imageShowType.FadeIn
    ),
    TextBarEvent.text("나연", "- 너 청소 째고 도망가면 어떡해!")
  ])
  .addTextPage(
    null,
    "남녀 칠세 부동석이라 하였던가. 여자와 말 한번 나누어 본 적 없는 나에게 거대한 시련이 다가왔다."
  )
  .addEventsAsPage([
    TextBarEvent.text(
      "...",
      "나연누나에게 좋은 인상을 사야 하는데, 대체 무슨 말을 해야 하지?"
    ),
    TextBarEvent.branch([
      new BranchPair("죄송합니다!", "branch_1_1"),
      new BranchPair("밥 한 번 사줄게", "branch_1_2"),
      new BranchPair("어쩌라고", "branch_1_3")
    ])
  ]);
textGame.addBranch(branch_1);

const branch_1_1 = new Branch("branch_1_1", "branch_2")
  .addTextPage("동희", "-죄송합니다 죽을 죄를 지었습니다!")
  .addTextPage("나연", "- 잘못한건 아는구나? 그럼 어떻게 벌을 줄까...")
  .addTextPage("나연", "- 아 그래! 너가 밥 한번 사주면 이번엔 눈감아줄게")
  .addTextPage(
    "동희",
    "- 넵! 당연히 사야죠. 암요. 같이 드셔주셔서 제가 감사합니다."
  );
textGame.addBranch(branch_1_1);

const branch_1_2 = new Branch("branch_1_2", "branch_2")
  .addTextPage(
    "동희",
    "-미안해 바쁜 일이 있어서.. 내가 나중에 밥이라도 한번 살게"
  )
  .addTextPage("나연", "-그래, 처음이니까 이번 한번만 밥 한끼로 봐줄게.")
  .addTextPage("나연", "-대신 다음번엔 밥 한끼로 안 끝날거야! (삐진 이모티콘)");
textGame.addBranch(branch_1_2);

const branch_1_3 = new Branch("branch_1_3", null)
  .addEventsAsPage([
    TextBarEvent.text("동희", "-어쩌라고"),
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/JustMonika")
  ])
  .addTextPage("...", "무심코 평소처럼 말해버렸다...")
  .addEventsAsPage([
    TextBarEvent.text("나연", "-너 내일 학교에서 보자"),
    DelayEvent.delay(2000),
    CanvasEvent.showEnding(
      "BAD END - 다음날 학교에서 나연누나에게 맞아 죽었다."
    )
  ]);
textGame.addBranch(branch_1_3);

const branch_2 = new Branch("branch_2", "branch_3")
  .addEventsAsPage([
    CanvasEvent.removeObject("phone", imageHideType.Disappear),
    TextBarEvent.text("동희", "휴우...")
  ])
  .addTextPage(
    "...",
    "다행히 위기를 넘기고, 게다가 같이 밥 먹을 기회까지 생겼다."
  )
  .addTextPage(
    null,
    "위기를 기회로, 인생사 새옹지마,... 역시 옛말 틀린거 하나 없다!"
  )
  .addTextPage(
    null,
    "이걸 기회로 나연눈나랑 친해질 수 있으면 좋겠는데.. 내일 만나서 말이라도 걸어봐야겠다."
  );
textGame.addBranch(branch_2);

const branch_3 = new Branch("branch_3", null)
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/school.jpg"),
    DelayEvent.delay(500),
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/Ohayou.mp3"),
    TextBarEvent.text(null, "[다음날 학교]")
  ])
  .addTextPage(
    "...",
    "어제를 교훈삼아 오늘은 일찍 출발해서 학교에 제일 먼저 도착했다. 오늘은 단축수업이라 급식이 없으니, 운이 좋다면 나연누나와 같이 밥을 먹을 수 있을지도 모른다."
  )
  .addTextPage(
    "...",
    "같이 밥 먹자는 말을 대체 어떻게 꺼내야 할까.. 다짜고짜 같이 밥 먹자고 부를수도 없고.. 우연을 가장해서 이야기를 터야 하려나..."
  )
  .addTextPage(
    null,
    "나연누나에게 할 말을 생각하며 머리를 쥐어뜯던 중, 누군가 교실에 들어왔다."
  )
  .addTextPage(null, "(덜컥)")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "nayeon",
      "images/characters/Nayeon.png",
      modelPosition.center,
      imageShowType.FadeIn
    ),
    SoundEvent.sfx("audio/Walk.mp3")
  ])
  .addTextPage("나연", "어? 너 오늘 웬일로 일찍 나왔네? 좋은아침이야!")
  .addTextPage("동희", "아, 그냥 일찍 일어나서.")
  .addTextPage("나연", "그보다, 너 어제 말한건 잊지 않았겠지?")
  .addEventsAsPage([
    TextBarEvent.branch([
      new BranchPair("어제 말한거?", "branch_3_1"),
      new BranchPair("당연하지!", "branch_3_2")
    ])
  ]);
textGame.addBranch(branch_3);

const branch_3_1 = new Branch("branch_3_1", "branch_4")
  .addTextPage("동희", "어제 말한거라니? 무슨 소리야?")
  .addTextPage(
    "나연",
    "너 어제 나한테 밥 사주기로 했잖아, 하루만에 까먹으면 어떡해!"
  )
  .addTextPage(
    "동희",
    "아 맞다 그랬지. 어제 청소 안하고 간건 미안해 순간 깜빡했어"
  )
  .addTextPage("나연", "어물쩍 넘어가려 하면 가만 안둬!");
textGame.addBranch(branch_3_1);

const branch_3_2 = new Branch("branch_3_2", "branch_4")
  .addTextPage("동희", "다, 당연하지. 내가 밥 사주기로 했잖아?")
  .addTextPage("나연", "그래, 다행히 잘 기억하고 있구나?");
textGame.addBranch(branch_3_2);

const branch_4 = new Branch("branch_4", null)
  .addTextPage(
    "...",
    "나연누나 생각을 하던 중이라 겨우겨우 대답해낼 수 있었다. 나연누나도 기억해주고 있으니, 이제 같이 밥먹는건 시간문제다."
  )
  .addTextPage(
    "...",
    "나연누나와 더 이야기를 나누려던 중 다른 친구들이 순식간에 몰려오고, 얘기할 수 없는 분위기가 되어버렸다."
  )
  .addEventsAsPage([
    CanvasEvent.removeObject("nayeon", imageHideType.Disappear)
  ])
  .addTextPage("동희", "할 수 없지, 방과 후 시간을 노려야겠다.")

  .addEventsAsPage([
    TextBarEvent.text(null, "[5시간 후]"),
    CanvasEvent.changeBackGround("images/backgrounds/school.jpg")
  ])

  .addTextPage("선생님", "자 그러면 오늘은 여기까지 하겠습니다")
  .addTextPage("...", "이제 기회가 돌아왔다. 단축수업인 오늘이 최적의 기회다!")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "nayeon",
      "images/characters/Nayeon.png",
      modelPosition.center,
      imageShowType.FadeIn
    )
  ])
  .addTextPage("동희", "나연눈나!")
  .addTextPage("나연", "응?")
  .addEventsAsPage([
    TextBarEvent.branch([
      new BranchPair("저기...", "branch_5"),
      new BranchPair("나랑 밥 먹으러 갈래?", "branch_4_1")
    ])
  ]);
textGame.addBranch(branch_4);

const branch_4_1 = new Branch("branch_4_1", null)
  .addTextPage("동희", "나랑 같이 밥 먹으러 갈래?")
  .addTextPage(
    "나연",
    "그럴까? 어제 약속한것도 있고, 마침 배도 고팠는데 잘됐다."
  )
  .addTextPage("...", "성공이다 성공! 드디어 나연누나와 밥을 먹을 수 있다!")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "shadow",
      "images/characters/Shadow.png",
      modelPosition.right,
      imageShowType.FadeIn
    )
  ])
  .addTextPage(
    "반 친구1",
    "나연아 우리 같이 밥 먹으러 가자! 학교 앞에 새로 생긴 떡볶이집 진짜 맛있더라!"
  )
  .addTextPage(
    "...",
    "위험해 위험해 위험해. 나연누나와 밥 먹을 기회가 날아가게 생겼다! 제발 나연눈나가 나를 선택해주기를..."
  )
  .addTextPage(
    "나연",
    "미안, 오늘은 동희랑 같이 먹기로 해서. 다음에 같이 먹자."
  )
  .addEventsAsPage([
    CanvasEvent.removeObject("shadow", imageHideType.Disappear)
  ])
  .addTextPage("...", "감사합니다 신이시여.. 나연눈나시여....")
  .addEventsAsPage([
    CanvasEvent.removeObject("nayeon", imageHideType.Disappear)
  ])
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/mealWithNayoen.png"),
    DelayEvent.delay(2000)
  ])
  .addEndingAsPage("END - 밥먹기 성공");

textGame.addBranch(branch_4_1);

const branch_5 = new Branch("branch_5", null)
  .addTextPage("동희", "그 있잖아 오늘..")
  .addEventsAsPage([
    CanvasEvent.addImage(
      "shadow1",
      "images/characters/Shadow.png",
      modelPosition.left,
      imageShowType.FadeIn
    )
  ])
  .addTextPage(
    "반 친구1",
    "나연아 우리 같이 밥 먹으러 가자! 학교 앞에 새로 생긴 떡볶이집 진짜 맛있더라!"
  )
  .addEventsAsPage([
    CanvasEvent.addImage(
      "shadow2",
      "images/characters/Shadow.png",
      modelPosition.right,
      imageShowType.FadeIn
    )
  ])
  .addTextPage("반 친구2", "맞아! 어제 가봤는데 완전 장난 아니야.")
  .addTextPage(
    "...",
    "어떻게 말해야 할지 고민하던 중 다른 애들이 몰려와 말할 기회를 놓쳐버렸다."
  )
  .addTextPage("나연", "동희야 밥은 다음에 사줘, 오늘은 약속이 생겨서")
  .addTextPage("동희", "아.. 으응..")
  .addEventsAsPage([
    CanvasEvent.removeObject("nayeon", imageHideType.Disappear),
    CanvasEvent.removeObject("shadow1", imageHideType.Disappear),
    CanvasEvent.removeObject("shadow2", imageHideType.Disappear)
  ])
  .addTextPage("...", "어쩔 수 없나.. 다음을 기약해야겠다.")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/home.jpg"),
    TextBarEvent.text(null, "[다음날 집]")
  ])
  .addTextPage(
    "...",
    "어제는 실패했지만 오늘은 토요일! 오늘 점심이 두번째 기회다."
  )
  .addTextPage("...", "나연누나에게 먼저 연락해볼까?")
  .addEventsAsPage([
    TextBarEvent.branch([
      new BranchPair("지금은 연락할 때가 아니다", "branch_6"),
      new BranchPair("연락해보자", "branch_5_1")
    ])
  ]);
textGame.addBranch(branch_5);

const branch_5_1 = new Branch("branch_5_1", null)
  .addTextPage("동희", "오늘 같이 밥 먹으러 갈래?")
  .addTextPage("나연", "그럴까? 오늘 마침 시간이 남는데, 잘됐다.")
  .addTextPage("...", "성공이다 성공! 드디어 나연누나와 밥을 먹을 수 있다!")
  .addTextPage("...", "나는 바로 옷을 갖춰입고 학교로 향했다.")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/street.jpg"),
    DelayEvent.delay(500),
    TextBarEvent.text(null, "[학교 앞]")
  ])
  .addEventsAsPage([
    CanvasEvent.addImage(
      "nayeon",
      "images/characters/Nayeon.png",
      modelPosition.center,
      imageShowType.FadeIn
    )
  ])
  .addTextPage("나연", "어디로 먹으러 갈거야?")
  .addTextPage("동희", "내가 아는 맛집이 한곳 있는데...")
  .addEventsAsPage([
    CanvasEvent.removeObject("nayeon", imageHideType.Disappear)
  ])
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/mealWithNayoen.png"),
    DelayEvent.delay(3000)
  ])
  .addEndingAsPage("END - 밥먹기 성공2");

textGame.addBranch(branch_5_1);

const branch_6 = new Branch("branch_6", null)
  .addEventsAsPage([
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/Sayonara.mp3"),
    TextBarEvent.text(null, "[며칠 후]")
  ])
  .addTextPage(
    "...",
    "그렇게 며칠을 미루고 미뤘을까... 코로나 바이러스가 찾아와 더이상 나연눈나와 만날수 없게 되었다. 그떄를 아무리 후회하더라도 더이상 돌이킬 수 없다."
  )
  .addTextPage(
    "...",
    "끝없는 후회만을 반복하고 있는 내게 나연눈나가 연락해왔다."
  )
  .addEventsAsPage([
    SoundEvent.sfx("audio/katalk.mp3"),
    CanvasEvent.addImage(
      "phone2",
      "images/characters/phoneTalk.png",
      modelPosition.center,
      imageShowType.FadeIn
    )
  ])
  .addTextPage("나연", "-뭐해? 나는 지금 밥먹는데")
  .addTextPage("...", "밥을 먹고있어봤자 나는 가지도 못하고.. 의미없을 뿐이다.")
  .addEventsAsPage([
    CanvasEvent.removeObject("phone2", imageHideType.Disappear),
    SoundEvent.sfx("audio/PhoneRing.mp3")
  ])
  .addTextPage(null, "(따르르릉-)")
  .addTextPage(
    "...",
    "힘없이 늘어진 내게 갑자기 전화가 걸려왔다. 모르는 번호, 받아볼까?"
  )
  .addEventsAsPage([
    TextBarEvent.branch([
      new BranchPair("받는다", "branch_6_1"),
      new BranchPair("받지 않는다", "branch_6_2")
    ])
  ]);
textGame.addBranch(branch_6);

const branch_6_1 = new Branch("branch_6_1", null)
  .addEventsAsPage([
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/Confession.mp3"),
    TextBarEvent.text("...", "나는 전화를 받기로 했다.")
  ])
  .addTextPage("나연", "동희야 뭐해?")
  .addTextPage(
    "...",
    "무시하려 했던 모르는 번호는 나연눈나의 번호였다. 나연눈나의 다정한 목소리에, 어쩐지 눈물이 흘렀다."
  )
  .addTextPage("동희", "밥 먹으려고 준비하던 중이였어.")
  .addTextPage(
    "나연",
    "잘됐다. 나도 이제 먹으려는데, 혼자 먹으려니까 심심해서. 같이 통화하면서 먹을까?"
  )
  .addTextPage(
    "...",
    "온라인으로나마 같이 밥을 먹을 수 있게 된 건가. 기뻐해야 할지 슬퍼해야 할지, 혼란스럽다."
  )
  .addTextPage("나연", "왜 대답이 없어? 혹시 바빠?")
  .addTextPage("동희", "아.. 아냐... 좋아")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/NayeonScreen.png"),
    DelayEvent.delay(3000)
  ])
  .addEndingAsPage("END - 온라인으로 밥먹나연");

textGame.addBranch(branch_6_1);

const branch_6_2 = new Branch("branch_6_2", null)
  .addEventsAsPage([
    SoundEvent.stopbackground(),
    SoundEvent.background("audio/background/JustMonika.mp3"),
    TextBarEvent.text(
      "...",
      "나연누나와 밥을 먹지도 못하는데, 전화 따위가 눈에 들어올리 없다."
    )
  ])
  .addTextPage(
    "...",
    " 나연누나와 같은 반이 되었는데 같이 밥을 먹지도 못하고, 슬픔에 눈물만 하염없이 흐른다."
  )
  .addTextPage(
    "...",
    "문득 나를 이렇게 만든 세상에 대해 화가 났다. 미치도록 화가 나서 견딜 수가 없어 소리쳤다."
  )
  .addTextPage("동희", "나 다시 돌아갈래!!")
  .addTextPage("...", "소리치는 내게 어쩐지 시끄러운 소리가 머릿속에 울렸다.")
  .addEventsAsPage([
    SoundEvent.sfx("audio/HeartDeath.mp3"),
    TextBarEvent.text("...", "(삑- 삑- 삑- 삐————-)")
  ])
  .addTextPage(
    "...",
    "응급실에서나 들릴 법한 소리. 이해할 수 없는 상황. 그떄, 머릿속에 한가지 기억이 번뜩였다."
  )
  .addTextPage("동희", "아.. 그때 트럭...")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/NayeonTruck.png")
  ])
  .addTextPage("동희", "난.. 죽어버린건가")
  .addEventsAsPage([
    CanvasEvent.changeBackGround("images/backgrounds/death.png"),
    DelayEvent.delay(3000)
  ])
  .addEndingAsPage("TRUE END - 꿈");

textGame.addBranch(branch_6_2);
