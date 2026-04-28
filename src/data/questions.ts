import { QuestionConfig } from '../types';

const base = {
  A: { stability: 2, intimacy: 2, chemistry: 2, certainty: 2, drain: 0, obsession: 0 },
  B: { obsession: 2, intimacy: 1, sweetness: 1, certainty: 0, drain: 1 },
  C: { care: 2, initiativeGap: 2, projectSense: 1, drain: 2, sweetness: -1 },
  D: { drain: 2, obsession: 1, certainty: -2, stability: -2 }
} as const;

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 1,
    title: '想到TA的时候，你第一反应更像哪种？',
    options: [
      { id: 'A', label: 'A', text: '安心，TA在我心里是稳定存在', scores: { ...base.A } },
      { id: 'B', label: 'B', text: '上头，TA一句话能让我想半天', scores: { ...base.B, obsession: 3 } },
      { id: 'C', label: 'C', text: '操心，总觉得有一堆事需要我管', scores: { ...base.C, care: 3 } },
      { id: 'D', label: 'D', text: '复杂，说不清是亲近还是累', scores: { ...base.D, chemistry: -1 } }
    ]
  },
  {
    id: 2,
    title: '你们现在最像哪种关系状态？',
    options: [
      { id: 'A', label: 'A', text: '很熟，熟到有点自动运行', scores: { stability: 3, chemistry: 2, expression: -1, sweetness: -1 } },
      { id: 'B', label: 'B', text: '很近，但有些话说不出口', scores: { intimacy: 2, expression: -2, obsession: 1 } },
      { id: 'C', label: 'C', text: '有互动，但总感觉差点意思', scores: { certainty: -1, progress: -1, projectSense: 1 } },
      { id: 'D', label: 'D', text: '时好时坏，像每天开盲盒', scores: { stability: -3, drain: 2, obsession: 2 } }
    ]
  },
  {
    id: 3,
    title: '如果用一个词形容你们，你会选？',
    options: [
      { id: 'A', label: 'A', text: '稳', scores: { stability: 3, certainty: 2 } },
      { id: 'B', label: 'B', text: '黏', scores: { intimacy: 2, obsession: 2, sweetness: 2 } },
      { id: 'C', label: 'C', text: '累', scores: { drain: 3, care: 1 } },
      { id: 'D', label: 'D', text: '迷', scores: { certainty: -2, obsession: 2, stability: -1 } }
    ]
  },
  {
    id: 4,
    title: '你们最近的联系频率怎么样？',
    options: [
      { id: 'A', label: 'A', text: '很频繁，基本每天都有互动', scores: { intimacy: 2, progress: 2, sweetness: 1 } },
      { id: 'B', label: 'B', text: '还可以，但比以前少了', scores: { stability: 1, sweetness: 0, progress: -1 } },
      { id: 'C', label: 'C', text: '有事才联系，没事各过各的', scores: { projectSense: 2, intimacy: -1, sweetness: -1 } },
      { id: 'D', label: 'D', text: '不稳定，有时热闹，有时消失', scores: { stability: -3, drain: 2, obsession: 1 } }
    ]
  },
  {
    id: 5,
    title: 'TA不回你消息时，你通常会怎么想？',
    options: [
      { id: 'A', label: 'A', text: '应该在忙，没什么', scores: { certainty: 2, stability: 1, obsession: -1 } },
      { id: 'B', label: 'B', text: '有点不爽，但还能忍', scores: { obsession: 1, toughMouth: 1 } },
      { id: 'C', label: 'C', text: '开始复盘我刚才是不是说错了', scores: { drain: 2, obsession: 2, initiativeGap: 1 } },
      { id: 'D', label: 'D', text: '已经脑补到关系是不是要完了', scores: { certainty: -3, drain: 2, obsession: 3 } }
    ]
  },
  {
    id: 6,
    title: '你们聊天最常见的状态是？',
    options: [
      { id: 'A', label: 'A', text: '有来有回，比较自然', scores: { chemistry: 2, stability: 1, expression: 1 } },
      { id: 'B', label: 'B', text: '能聊，但经常是我在找话题', scores: { initiativeGap: 2, drain: 1, progress: 1 } },
      { id: 'C', label: 'C', text: '像工作沟通，主打一个高效', scores: { projectSense: 3, sweetness: -2, intimacy: -1 } },
      { id: 'D', label: 'D', text: '表面聊天，实际互相试探', scores: { obsession: 2, certainty: -2, expression: -1 } }
    ]
  },
  {
    id: 7,
    title: '你们之间有没有“秒懂”的时刻？',
    options: [
      { id: 'A', label: 'A', text: '经常，一个眼神/一句话就懂', scores: { chemistry: 3, stability: 2 } },
      { id: 'B', label: 'B', text: '有，但不是每次都能懂', scores: { chemistry: 1, stability: 1 } },
      { id: 'C', label: 'C', text: '我以为TA懂，结果TA完全没懂', scores: { chemistry: -1, drain: 1, expression: -1 } },
      { id: 'D', label: 'D', text: '别说秒懂了，能正常沟通就不错了', scores: { chemistry: -2, drain: 2, stability: -1 } }
    ]
  },
  {
    id: 8,
    title: '你们会主动分享生活里的小事吗？',
    options: [
      { id: 'A', label: 'A', text: '会，鸡毛蒜皮都能聊', scores: { intimacy: 3, sweetness: 1 } },
      { id: 'B', label: 'B', text: '会，但最近少了', scores: { intimacy: 1, progress: -1 } },
      { id: 'C', label: 'C', text: '很少，主要聊正事', scores: { projectSense: 2, intimacy: -1, sweetness: -1 } },
      { id: 'D', label: 'D', text: '基本是我分享，TA接得一般', scores: { initiativeGap: 2, drain: 1 } }
    ]
  },
  {
    id: 9,
    title: '你觉得TA对你的在意程度是？',
    options: [
      { id: 'A', label: 'A', text: '很明显，我能感受到', scores: { intimacy: 2, sweetness: 2, certainty: 2 } },
      { id: 'B', label: 'B', text: '有，但TA不太表达', scores: { intimacy: 1, expression: -1 } },
      { id: 'C', label: 'C', text: '忽高忽低，时有时无', scores: { stability: -2, obsession: 1, drain: 1 } },
      { id: 'D', label: 'D', text: '我不确定，经常靠猜', scores: { certainty: -3, obsession: 2, drain: 1 } }
    ]
  },
  {
    id: 10,
    title: '这段关系给你的主要感受是？',
    options: [
      { id: 'A', label: 'A', text: '放松，可以做自己', scores: { stability: 2, intimacy: 2, drain: -1 } },
      { id: 'B', label: 'B', text: '甜，但偶尔敏感', scores: { sweetness: 2, obsession: 1, drain: 1 } },
      { id: 'C', label: 'C', text: '稳，但有点平淡', scores: { stability: 2, sweetness: -1, projectSense: 1 } },
      { id: 'D', label: 'D', text: '累，但又放不下', scores: { drain: 3, obsession: 2, certainty: -1 } }
    ]
  },
  {
    id: 11,
    title: '你在这段关系里更常扮演什么角色？',
    options: [
      { id: 'A', label: 'A', text: '被理解、被接住的人', scores: { intimacy: 2, stability: 1 } },
      { id: 'B', label: 'B', text: '照顾别人、操心别人的人', scores: { care: 3, initiativeGap: 1, drain: 1 } },
      { id: 'C', label: 'C', text: '负责主动、负责维持的人', scores: { initiativeGap: 3, progress: 1, drain: 1 } },
      { id: 'D', label: 'D', text: '猜谜的人，天天分析TA什么意思', scores: { obsession: 2, certainty: -2, drain: 1 } }
    ]
  },
  {
    id: 12,
    title: '你们之间的甜度现在大概是？',
    options: [
      { id: 'A', label: 'A', text: '还挺甜，偶尔会心动', scores: { sweetness: 3, obsession: 1 } },
      { id: 'B', label: 'B', text: '有一点，但不算多', scores: { sweetness: 1 } },
      { id: 'C', label: 'C', text: '甜度欠费，主要靠熟撑着', scores: { sweetness: -2, stability: 1, chemistry: 1 } },
      { id: 'D', label: 'D', text: '甜不甜不知道，刺激倒是挺刺激', scores: { obsession: 2, stability: -1, drain: 1 } }
    ]
  },
  {
    id: 13,
    title: '你们出现矛盾时，通常会怎样？',
    options: [
      { id: 'A', label: 'A', text: '很快说开，不太记仇', scores: { resilience: 2, stability: 2, expression: 1 } },
      { id: 'B', label: 'B', text: '先嘴硬，之后慢慢缓和', scores: { toughMouth: 2, resilience: 1 } },
      { id: 'C', label: 'C', text: '冷一阵，看谁先绷不住', scores: { initiativeGap: 1, stability: -1, drain: 1 } },
      { id: 'D', label: 'D', text: '表面过去了，心里小本本记满了', scores: { drain: 2, resilience: -1, expression: -2 } }
    ]
  },
  {
    id: 14,
    title: '你们吵架时最像什么？',
    options: [
      { id: 'A', label: 'A', text: '两个人在解决问题', scores: { resilience: 2, projectSense: 1, stability: 1 } },
      { id: 'B', label: 'B', text: '两个人互相嘴硬', scores: { toughMouth: 3, obsession: 1 } },
      { id: 'C', label: 'C', text: '一个追着问，一个想逃', scores: { initiativeGap: 2, drain: 2, certainty: -1 } },
      { id: 'D', label: 'D', text: '一场大型项目复盘会', scores: { projectSense: 3, sweetness: -1 } }
    ]
  },
  {
    id: 15,
    title: '如果你不主动，TA会主动靠近你吗？',
    options: [
      { id: 'A', label: 'A', text: '会，而且比较明显', scores: { progress: 2, certainty: 2, initiativeGap: -2 } },
      { id: 'B', label: 'B', text: '会，但频率不高', scores: { progress: 1, initiativeGap: 0 } },
      { id: 'C', label: 'C', text: '不一定，看TA心情', scores: { stability: -1, certainty: -1, initiativeGap: 1 } },
      { id: 'D', label: 'D', text: '很少，基本靠我主动', scores: { initiativeGap: 3, drain: 1, progress: -1 } }
    ]
  },
  {
    id: 16,
    title: '你们最近有没有“关系更进一步”的迹象？',
    options: [
      { id: 'A', label: 'A', text: '有，明显更亲近了', scores: { progress: 3, intimacy: 2, sweetness: 1 } },
      { id: 'B', label: 'B', text: '有一点，但不多', scores: { progress: 1, intimacy: 1 } },
      { id: 'C', label: 'C', text: '没什么变化，卡住了', scores: { progress: -2, projectSense: 1 } },
      { id: 'D', label: 'D', text: '反而有点变冷/变远', scores: { progress: -3, stability: -2, drain: 1 } }
    ]
  },
  {
    id: 17,
    title: '你有没有一种“我不管就没人管”的感觉？',
    options: [
      { id: 'A', label: 'A', text: '没有，我们比较平衡', scores: { initiativeGap: -1, stability: 1 } },
      { id: 'B', label: 'B', text: '偶尔有', scores: { initiativeGap: 1, care: 1 } },
      { id: 'C', label: 'C', text: '经常有', scores: { care: 2, initiativeGap: 2, drain: 1 } },
      { id: 'D', label: 'D', text: '这句话简直就是我的关系座右铭', scores: { care: 3, initiativeGap: 3, drain: 2 } }
    ]
  },
  {
    id: 18,
    title: '你觉得这段关系里最缺什么？',
    options: [
      { id: 'A', label: 'A', text: '不缺什么，整体挺安心', scores: { certainty: 2, stability: 2 } },
      { id: 'B', label: 'B', text: '缺一点浪漫和新鲜感', scores: { sweetness: -1, projectSense: 1 } },
      { id: 'C', label: 'C', text: '缺一个明确答案', scores: { certainty: -3, obsession: 1 } },
      { id: 'D', label: 'D', text: '缺对方多主动一点', scores: { initiativeGap: 2, progress: -1, drain: 1 } }
    ]
  },
  {
    id: 19,
    title: '如果把这段关系比成一个系统，它现在是？',
    options: [
      { id: 'A', label: 'A', text: '稳定运行，偶尔小更新', scores: { stability: 3, resilience: 1 } },
      { id: 'B', label: 'B', text: '功能齐全，但甜度插件有点过期', scores: { projectSense: 1, sweetness: -1, stability: 1 } },
      { id: 'C', label: 'C', text: '后台过热，管理员快累死了', scores: { drain: 3, care: 2, projectSense: 1 } },
      { id: 'D', label: 'D', text: '信号不稳定，时不时断联重启', scores: { stability: -3, drain: 2, certainty: -1 } }
    ]
  },
  {
    id: 20,
    title: '最后问一句，TA更接近你的谁？',
    options: [
      { id: 'A', label: 'A', text: '喜欢的人 / 暧昧对象', scores: { obsession: 2, progress: 1, certainty: -1 } },
      { id: 'B', label: 'B', text: '对象 / 伴侣', scores: { stability: 2, intimacy: 2, certainty: 2 } },
      { id: 'C', label: 'C', text: '老公 / 老婆', scores: { stability: 3, projectSense: 1, sweetness: 0 } },
      { id: 'D', label: 'D', text: '孩子', scores: { care: 3, initiativeGap: 2, drain: 2 } },
      { id: 'E', label: 'E', text: '前任 / 说不清的人', scores: { obsession: 2, certainty: -2, drain: 2 } },
      { id: 'F', label: 'F', text: '朋友 / 其他重要的人', scores: { chemistry: 1, sweetness: 0, progress: -1 } }
    ]
  }
];
