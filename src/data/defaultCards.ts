import { LyricCard } from "../types";

/**
 * =========================================================================
 * ✦ 在这里自定义您的专属歌词卡牌！ ✦
 * =========================================================================
 * 您可以直接在下方 `CUSTOM_USER_CARDS` 数组中添加、删除或修改您自己的歌词内容。
 * 格式与默认卡牌完全一致。
 */
export const CUSTOM_USER_CARDS: LyricCard[] = [
  // 💡 您可以在下面添加您的自定义歌词：
  /*
  {
    id: "custom-1",
    cardName: "X · 命运 (My Custom Destiny)",
    songTitle: "歌曲名称",
    lyrics: "这是我最心仪的、刻骨铭心的歌词，它会出现在答案之书中...",
    songLink: ""
  },
  */
];

export const DEFAULT_CARDS: LyricCard[] = [
  ...CUSTOM_USER_CARDS, // 优先载入您的自定义卡牌
  {
    id: "default-1",
    cardName: "01 · 自信 (The Confidence)",
    songTitle: "美力场",
    lyrics: "明天的色彩\n我自己主宰",
    songLink: "https://music.163.com/song?id=3370067531&uct2=U2FsdGVkX199X98Z5/k4eSD6dYSnByg5p5J6UWm+Lac="
  },
  {
    id: "default-2",
    cardName: "02 · 绽放 (The Bloom)",
    songTitle: "岩中花述",
    lyrics: "岩石上的花\n自深处绽放",
    songLink: "https://music.163.com/song?id=2726548731&uct2=U2FsdGVkX1889Z/tftIffZLaB3akRWnhN/hvITu9dL8="
  },
  {
    id: "default-3",
    cardName: "03 · 新界 (The Realm)",
    songTitle: "她不再幻想",
    lyrics: "无忧无惧纵情欢畅\n新世界多宽广",
    songLink: "https://music.163.com/song?id=2649317273&uct2=U2FsdGVkX1/aIzKPsO9T4hqRnpw0+Iw6FN+Xq3jXqJ4="
  },
  {
    id: "default-4",
    cardName: "04 · 倔强 (The Unyielding)",
    songTitle: "她不再幻想",
    lyrics: "愿妳把不安都松绑\n目光永远倔强",
    songLink: "https://music.163.com/song?id=2649317273&uct2=U2FsdGVkX1+1rppF9CDYorXiFDt5NuvCdeFNnMjJZdw="
  },
  {
    id: "default-5",
    cardName: "05 · 邪恶 (The Evilness)",
    songTitle: "红霞剧场",
    lyrics: "载上一些必要的邪恶\n飞驰过生活",
    songLink: "https://music.163.com/song?id=2655897467&uct2=U2FsdGVkX183G26QVQFJMNikdbpJ+wIdtCftnkJLxI4="
  },
  {
    id: "default-6",
    cardName: "06 · 纵情 (The Passion)",
    songTitle: "红霞剧场",
    lyrics: "繁花都盛开\n阳光下纵情恋和爱",
    songLink: "https://music.163.com/song?id=2655897467&uct2=U2FsdGVkX183G26QVQFJMNikdbpJ+wIdtCftnkJLxI4="
  },
  {
    id: "default-7",
    cardName: "07 · 纪元 (The Era)",
    songTitle: "红霞剧场",
    lyrics: "我们的时代\n终于要到来",
    songLink: "https://music.163.com/song?id=2655897467&uct2=U2FsdGVkX183G26QVQFJMNikdbpJ+wIdtCftnkJLxI4="
  },
  {
    id: "default-8",
    cardName: "08 · 探问 (The Inquiry)",
    songTitle: "北海",
    lyrics: "此刻妳是否\n过着渴望的人生",
    songLink: "https://music.163.com/song?id=2655897468&uct2=U2FsdGVkX1+8wVCfNdOnFowR0wLDKibFcE9zeNypQeQ="
  },
  {
    id: "default-9",
    cardName: "09 · 喜悦 (The Joyfulness)",
    songTitle: "北海",
    lyrics: "喜悦都耗在\n奔向喜悦的路上",
    songLink: "https://music.163.com/song?id=2655897468&uct2=U2FsdGVkX1+8wVCfNdOnFowR0wLDKibFcE9zeNypQeQ="
  },
  {
    id: "default-10",
    cardName: "10 · 昨日 (The Yesterday)",
    songTitle: "北海",
    lyrics: "绝美的光\n早在昨日绽放",
    songLink: "https://music.163.com/song?id=2655897468&uct2=U2FsdGVkX1+8wVCfNdOnFowR0wLDKibFcE9zeNypQeQ="
  },
  {
    id: "default-11",
    cardName: "11 · 洒脱 (The Freedom)",
    songTitle: "沙漠一枝花",
    lyrics: "让快乐继续\n没什么是必须",
    songLink: "https://music.163.com/song?id=2655897469&uct2=U2FsdGVkX1+pio4Px77mrsrxbL9bmuJHIekU+pO7bN4="
  },
  {
    id: "default-12",
    cardName: "12 · 惬意 (The Ease)",
    songTitle: "沙漠一枝花",
    lyrics: "社会的情趣\n留给别人在意",
    songLink: "https://music.163.com/song?id=2655897469&uct2=U2FsdGVkX1+pio4Px77mrsrxbL9bmuJHIekU+pO7bN4="
  },
  {
    id: "default-13",
    cardName: "13 · 坦途 (The Highroad)",
    songTitle: "春宵苦短少女快前进",
    lyrics: "When you with me\neverything‘ll be easy",
    songLink: "https://music.163.com/song?id=2655896777&uct2=U2FsdGVkX181/FKfenqVV7XsS7UMeh6N42uHb07ZSCA="
  },
  {
    id: "default-14",
    cardName: "14 · 坠落 (The Fall)",
    songTitle: "禁色宝丽来",
    lyrics: "要惊心动魄\n尽情坠落",
    songLink: "https://music.163.com/song?id=2655897470&uct2=U2FsdGVkX1/aD4GZii8ZUvbF7WRsjLzNY/CnRx/vEMs="
  },
  {
    id: "default-15",
    cardName: "15 · 浮生 (The Drama)",
    songTitle: "演！演！演！",
    lyrics: "爱与恨 得与失\n都是生活",
    songLink: "https://music.163.com/song?id=2655897471&uct2=U2FsdGVkX1/dcuRL+p4u9EXmXvvMUpcD0P6FMvhhe3Q="
  },
  {
    id: "default-16",
    cardName: "16 · 因果 (The Karma)",
    songTitle: "演！演！演！",
    lyrics: "每一颗种下的因都结成果",
    songLink: "https://music.163.com/song?id=2655897471&uct2=U2FsdGVkX1/dcuRL+p4u9EXmXvvMUpcD0P6FMvhhe3Q="
  },
  {
    id: "default-17",
    cardName: "17 · 宿命 (The Destiny)",
    songTitle: "诸多夏日后天鹅之死",
    lyrics: "我闯入自己的命运\n如同跌进万丈深渊",
    songLink: "https://music.163.com/song?id=2655897472&uct2=U2FsdGVkX1/fFaLCuhlxPgL3BytvSdqPLtEFUbZJhL0="
  },
  {
    id: "default-18",
    cardName: "18 · 阴影 (The Darkness)",
    songTitle: "诸多夏日后天鹅之死",
    lyrics: "上升的烟火有多美丽\n可有光就有阴影",
    songLink: "https://music.163.com/song?id=2655897472&uct2=U2FsdGVkX1/fFaLCuhlxPgL3BytvSdqPLtEFUbZJhL0="
  },
  {
    id: "default-57",
    cardName: "57 · 幽梦 (The Dream)",
    songTitle: "妳是我最爱的褪色幻想",
    lyrics: "请让我沉睡在\n紫罗兰色的梦里",
    songLink: "https://music.163.com/song?id=2655896778&uct2=U2FsdGVkX1+YllL1cLm5z1iB9zXceCEw/5FiHfqJWpc="
  },
  {
    id: "default-20",
    cardName: "20 · 完整 (The Completion)",
    songTitle: "自恋咒",
    lyrics: "这一半的我\n完整另一半我",
    songLink: "https://music.163.com/song?id=2655897473&uct2=U2FsdGVkX19qIhGjmiyjcCNbHJOcGQK5ejPuT2DiISQ="
  },
  {
    id: "default-21",
    cardName: "21 · 源泉 (The Source)",
    songTitle: "自恋咒",
    lyrics: "I am the power\nI am the source",
    songLink: "https://music.163.com/song?id=2655897473&uct2=U2FsdGVkX19PP/jG7kN+mGIhIuAkKid4mD9/mJ+Ythk="
  },
  {
    id: "default-22",
    cardName: "22 · 光荣 (The Glory)",
    songTitle: "猩红",
    lyrics: "歌颂肉体的光荣\n湮没了平庸",
    songLink: "https://music.163.com/song?id=2655896779&uct2=U2FsdGVkX19bi01TPE7AWDXtq3E7Jbu+hUQfFE9bXWI="
  },
  {
    id: "default-23",
    cardName: "23 · 解放 (The Liberation)",
    songTitle: "光芒",
    lyrics: "羞耻都解放\n恐惧丢一旁\n别去阻挡这波浪",
    songLink: "https://music.163.com/song?id=2096094335&uct2=U2FsdGVkX18NtNxw7BEwPiUFajtSL5NpHg7px6sPA98="
  },
  {
    id: "default-24",
    cardName: "24 · 沉醉 (The Revelry)",
    songTitle: "她ELLE",
    lyrics: "潇洒或狼狈\n我为自己陶醉",
    songLink: "https://music.163.com/song?id=2011564739&uct2=U2FsdGVkX1/CT3lmCFaEbjmW6JkUrIK0GktWiAwIAe8="
  },
  {
    id: "default-25",
    cardName: "25 · 当下 (The Present)",
    songTitle: "如梦",
    lyrics: "甩开时间框架\n不再加鞭快马\n享受无尽的当下",
    songLink: "https://music.163.com/song?id=2000358817&uct2=U2FsdGVkX18+TcYbxNPot2ZsFYHMRIkfL7uyxG6ggyk="
  },
  {
    id: "default-26",
    cardName: "26 · 显化 (The Manifestation)",
    songTitle: "如梦",
    lyrics: "关于生活的真相\n不过是妳显化的愿望",
    songLink: "https://music.163.com/song?id=2000358817&uct2=U2FsdGVkX18+TcYbxNPot2ZsFYHMRIkfL7uyxG6ggyk="
  },
  {
    id: "default-27",
    cardName: "27 · 错过 (The Lost)",
    songTitle: "芍药信",
    lyrics: "春风吹散的蒲公英\n我错过哪一朵",
    songLink: "https://music.163.com/song?id=1967771291&uct2=U2FsdGVkX19eJjNNQ6AFN4t4LqVlqCWvKHraaRjwNcs="
  },
  {
    id: "default-28",
    cardName: "28 · 自然 (The Nature)",
    songTitle: "逝去的海",
    lyrics: "飞鸟不追问意义\n云朵不自知美丽",
    songLink: "https://music.163.com/song?id=1853551277&uct2=U2FsdGVkX19c3j2+TbGrnkmE8+nJebGC5BM1BnB7QyY="
  },
  {
    id: "default-29",
    cardName: "29 · 孤独 (The Loneliness)",
    songTitle: "Lonely",
    lyrics: "当炙热的都归于平淡\n当特别的都变得平凡",
    songLink: "https://music.163.com/song?id=1811675531&uct2=U2FsdGVkX1+6MdHSjONwu4Q1jbEgNCDeoQSHy9Cps3E="
  },
  {
    id: "default-30",
    cardName: "30 · 复活 (The Revival)",
    songTitle: "我的孤独认出妳的孤独",
    lyrics: "Hey原来春天这么美\n幸好没有腐烂在冬天",
    songLink: "https://music.163.com/song?id=1806516122&uct2=U2FsdGVkX18PHmAm8ZTFhqi0TPkS09nkzaQiRftzOcw="
  },
  {
    id: "default-31",
    cardName: "31 · 幽暗 (The Darkness)",
    songTitle: "夏宫",
    lyrics: "身在黑暗\n享受黑暗",
    songLink: "https://music.163.com/song?id=1501201632&uct2=U2FsdGVkX1+5M9U8saefbT4JqHKwZiF36QGKqwkCwTw="
  },
  {
    id: "default-32",
    cardName: "32 · 诱惑 (The Temptation)",
    songTitle: "消亡史",
    lyrics: "除了诱惑\n我什么都能抵挡",
    songLink: "https://music.163.com/song?id=1804329295&uct2=U2FsdGVkX1+9SefmaMJv40FiZtqctr4i0Q0Ui5KMFLU="
  },
  {
    id: "default-33",
    cardName: "33 · 疯狂 (The Madness)",
    songTitle: "消亡史",
    lyrics: "预见了疯狂\n却欣然前往",
    songLink: "https://music.163.com/song?id=1804329295&uct2=U2FsdGVkX19g2Aui4J2lGY7hcpU1R4bDC6Y+dTHKs5c="
  },
  {
    id: "default-34",
    cardName: "34 · 仓皇 (The Fleeing)",
    songTitle: "消亡史",
    lyrics: "美梦太仓皇\n等不到天亮",
    songLink: "https://music.163.com/song?id=1804329295&uct2=U2FsdGVkX19g2Aui4J2lGY7hcpU1R4bDC6Y+dTHKs5c="
  },
  {
    id: "default-35",
    cardName: "35 · 燃烧 (The Burning)",
    songTitle: "消亡史",
    lyrics: "大海到日落的中央\n纵情燃烧这一场",
    songLink: "https://music.163.com/song?id=1804329295&uct2=U2FsdGVkX19g2Aui4J2lGY7hcpU1R4bDC6Y+dTHKs5c="
  },
  {
    id: "default-36",
    cardName: "36 · 永恒 (The Eternity)",
    songTitle: "晕船记",
    lyrics: "朝着彼岸驶去寻找新诗意",
    songLink: "https://music.163.com/song?id=1806516125&uct2=U2FsdGVkX1/RfYdfhugblh7x+Fkh3wJobo7NTcfl4uc="
  },
  {
    id: "default-37",
    cardName: "37 · 庇护 (The Safety)",
    songTitle: "今晚",
    lyrics: "穿过这城市的表面\n妳的笑容才最安全",
    songLink: "https://music.163.com/song?id=1499310652&uct2=U2FsdGVkX1+LES3DkJlHE2NnpafxMg2nYwbCGZnvb+k="
  },
  {
    id: "default-38",
    cardName: "38 · 欲望 (The Desire)",
    songTitle: "深蓝",
    lyrics: "越过自由奢侈的高墙\n去永恒的爱与欲望",
    songLink: ""
  },
  {
    id: "default-39",
    cardName: "39 · 微光 (The Beam)",
    songTitle: "深蓝",
    lyrics: "要一束光只为我照亮",
    songLink: "https://music.163.com/song?id=1806516957&uct2=U2FsdGVkX19ye+Hud5ezVWO7XdpOscn7HW+WAa349zY="
  },
  {
    id: "default-40",
    cardName: "40 · 闪耀 (The Shine)",
    songTitle: "In  Bloom",
    lyrics: "Is it safe for us\nto shine",
    songLink: "https://music.163.com/song?id=1806516142&uct2=U2FsdGVkX1/CWioe1Stdu+fAF72PeyvvRNFeQd1qGDg="
  },
  {
    id: "default-41",
    cardName: "41 · 贪玩 (The Playful)",
    songTitle: "舞！舞！舞！",
    lyrics: "我不怕孤单\n只是有点贪玩",
    songLink: "https://music.163.com/song?id=1806516961&uct2=U2FsdGVkX18/DU/nwEXaZCIRp9UgCYeVv1T2DUxSkSE="
  },
  {
    id: "default-42",
    cardName: "42 · 性感 (The Sexiness)",
    songTitle: "舞！舞！舞！",
    lyrics: "跳得多灿烂\n纯粹就是性感",
    songLink: "https://music.163.com/song?id=1806516961&uct2=U2FsdGVkX18/DU/nwEXaZCIRp9UgCYeVv1T2DUxSkSE="
  },
  {
    id: "default-43",
    cardName: "43 · 荒诞 (The Absurd)",
    songTitle: "人间指南",
    lyrics: "保持忙碌 保持盲目\n多荒诞",
    songLink: "https://music.163.com/song?id=1806516145&uct2=U2FsdGVkX1953Zh/2rau0V7/x+22Ol2LX5EbTodfJdc="
  },
  {
    id: "default-44",
    cardName: "44 · 孤旅 (The Solitude)",
    songTitle: "人间指南",
    lyrics: "谁躲得过 这一路的\n孤独和暗淡",
    songLink: "https://music.163.com/song?id=1806516145&uct2=U2FsdGVkX1953Zh/2rau0V7/x+22Ol2LX5EbTodfJdc="
  },
  {
    id: "default-45",
    cardName: "45 · 别处 (The Elsewhere)",
    songTitle: "生活在别处",
    lyrics: "自由的回声\n藏在某个角落",
    songLink: "https://music.163.com/song?id=1806516962&uct2=U2FsdGVkX1+BxSeya27hcR5nS2YIxF45NToqmNgtRuw="
  },
  {
    id: "default-46",
    cardName: "46 · 召唤 (The Beacon)",
    songTitle: "生活在别处",
    lyrics: "别处的烟火\n不停召唤我",
    songLink: "https://music.163.com/song?id=1806516962&uct2=U2FsdGVkX1+BxSeya27hcR5nS2YIxF45NToqmNgtRuw="
  },
  {
    id: "default-47",
    cardName: "47 · 韶华 (The Torrent)",
    songTitle: "生活在别处",
    lyrics: "赤着脚淌过 春天的河\n就像是淌过 从前的我",
    songLink: "https://music.163.com/song?id=1806516962&uct2=U2FsdGVkX1+BxSeya27hcR5nS2YIxF45NToqmNgtRuw="
  },
  {
    id: "default-48",
    cardName: "48 · 冷漠 (The Coldness)",
    songTitle: "至暗时刻",
    lyrics: "最危险不过\n妳心底的冷漠",
    songLink: "https://music.163.com/song?id=1482859807&uct2=U2FsdGVkX19K/I33Ebr2H7t+aIUxS60a6/eX8h5rDQU="
  },
  {
    id: "default-49",
    cardName: "49 · 救赎 (The Redemption)",
    songTitle: "至暗时刻",
    lyrics: "拨乱模糊的善恶\n拯救灵魂的饥渴",
    songLink: "https://music.163.com/song?id=1482859807&uct2=U2FsdGVkX19K/I33Ebr2H7t+aIUxS60a6/eX8h5rDQU="
  },
  {
    id: "default-50",
    cardName: "50 · 终章 (The Epilogue)",
    songTitle: "至暗时刻",
    lyrics: "做梦的人被梦见的人惊醒了\n喜剧替悲剧笑到最后了",
    songLink: "https://music.163.com/song?id=1482859807&uct2=U2FsdGVkX19K/I33Ebr2H7t+aIUxS60a6/eX8h5rDQU="
  },
  {
    id: "default-51",
    cardName: "51 · 纯真 (The Innocence)",
    songTitle: "积极向下",
    lyrics: "我要的不过是别浪费这盛夏\n留下了纯真再长大",
    songLink: ""
  },
  {
    id: "default-52",
    cardName: "52 · 青春 (The Youth)",
    songTitle: "积极向下",
    lyrics: "Ei！明天不会比今天年轻啊\n畅饮了宿醉再回家",
    songLink: "https://music.163.com/song?id=1387183465&uct2=U2FsdGVkX185rx/tMlEV4YDOYsAAPIcXKOnoi4LC+WA="
  },
  {
    id: "default-53",
    cardName: "53 · 飘零 (The Wither)",
    songTitle: "积极向下",
    lyrics: "不凋零的花 谁会珍惜吗\n不如趁最美 时刻落下",
    songLink: "https://music.163.com/song?id=1387183465&uct2=U2FsdGVkX185rx/tMlEV4YDOYsAAPIcXKOnoi4LC+WA="
  },
  {
    id: "default-54",
    cardName: "54 · 生命 (The Vigor)",
    songTitle: "积极向下",
    lyrics: "执着悲观垫底\n无妨眷恋生命",
    songLink: "https://music.163.com/song?id=1387183465&uct2=U2FsdGVkX185rx/tMlEV4YDOYsAAPIcXKOnoi4LC+WA="
  },
  {
    id: "default-55",
    cardName: "55 · 释怀 (The Release)",
    songTitle: "积极向下",
    lyrics: "我要的不过是别浪费这盛夏\n吞下了遗憾再长大",
    songLink: "https://music.163.com/song?id=1387183465&uct2=U2FsdGVkX185rx/tMlEV4YDOYsAAPIcXKOnoi4LC+WA="
  },
  {
    id: "default-56",
    cardName: "56 · 面纱 (The Veil)",
    songTitle: "手",
    lyrics: "没什么像 我的手一样\n用想象 欲盖爱的弥彰",
    songLink: "https://music.163.com/song?id=554530716&uct2=U2FsdGVkX19xY1PvbFiMSJhEZercYhr15TXI89KXGs8="
  },
  {
    id: "default-58",
    cardName: "58 · 依靠 (The Reliance)",
    songTitle: "春色悠悠不及妳荡漾",
    lyrics: "倚在妳肩膀\n就能实现梦想",
    songLink: "https://music.163.com/song?id=2137016894&uct2=U2FsdGVkX1/rUco1zeeoFHv13G4Sq+oYGZXJqlXtSDo="
  },
  {
    id: "default-59",
    cardName: "59 · 夕阳 (The Sunset)",
    songTitle: "别处的夕阳",
    lyrics: "就算错过一整片夕阳\n妳的目光燃烧四方",
    songLink: "https://music.163.com/song?id=523756204&uct2=U2FsdGVkX18OhuofRhthxkLaT60h223C17dvANReO/0="
  },
  {
    id: "default-60",
    cardName: "60 · 飞翔 (The Flight)",
    songTitle: "September Lies",
    lyrics: "Your love makes me certain\nthat I can fly",
    songLink: "https://music.163.com/song?id=526434593&uct2=U2FsdGVkX1+pZWdcjfhbpulHzwynPSEslmGY8t5OPAk="
  },
  {
    id: "default-19",
    cardName: "19 · 剧本 (The Script)",
    songTitle: "隐藏",
    lyrics: "You can change the script\nanytime you want",
    songLink: ""
  }
];
