import { QuestionConfig } from '../types';

export const QUESTIONS: QuestionConfig[] = [
  {
    id: 1,
    title: '想到TA的时候，你脑子里最常弹出的弹幕是？',
    options: [
      { id: 'A', label: 'A', text: '稳，TA在我心里像固定资产', scores: { stability: 3, certainty: 2, intimacy: 1 } },
      { id: 'B', label: 'B', text: '完了，我又开始想TA是什么意思了', scores: { obsession: 3, certainty: -2, drain: 1 } },
      { id: 'C', label: 'C', text: '这人怎么又让我操心，我是关系保姆吗', scores: { care: 3, initiativeGap: 2, drain: 2 } },
      { id: 'D', label: 'D', text: '我也说不清，反正又近又累又放不下', scores: { intimacy: 1, obsession: 2, drain: 2, certainty: -1 } }
    ]
  },
  {
    id: 2,
    title: '你们现在的关系最像哪种离谱状态？',
    options: [
      { id: 'A', label: 'A', text: '熟到自动驾驶，连废话都懒得更新', scores: { stability: 3, chemistry: 1, sweetness: -1 } },
      { id: 'B', label: 'B', text: '很近，但关键话题一出现就全员装死', scores: { intimacy: 2, expression: -2, certainty: -1 } },
      { id: 'C', label: 'C', text: '有互动，但总差一口气，像恋爱模块没安装', scores: { progress: -2, chemistry: -1, projectSense: 1 } },
      { id: 'D', label: 'D', text: '每天开盲盒，今天心动，明天心梗', scores: { stability: -3, obsession: 2, drain: 2 } }
    ]
  },
  {
    id: 3,
    title: '如果用一个词形容你们的关系气质，你选？',
    options: [
      { id: 'A', label: 'A', text: '稳如老狗', scores: { stability: 3, certainty: 2 } },
      { id: 'B', label: 'B', text: '黏到拉丝', scores: { intimacy: 2, sweetness: 2, obsession: 1 } },
      { id: 'C', label: 'C', text: '累到想静音', scores: { drain: 3, care: 1 } },
      { id: 'D', label: 'D', text: '迷到像在解谜', scores: { obsession: 2, certainty: -2, stability: -1 } }
    ]
  },
  {
    id: 4,
    title: '你们最近联系频率更像？',
    options: [
      { id: 'A', label: 'A', text: '高频互动，消息像乒乓球一样来回打', scores: { intimacy: 2, progress: 2, sweetness: 1 } },
      { id: 'B', label: 'B', text: '还行，但明显没有以前那么上头', scores: { stability: 1, obsession: -1, progress: -1 } },
      { id: 'C', label: 'C', text: '有事才联系，没事像两个离线网友', scores: { projectSense: 2, intimacy: -1, sweetness: -1 } },
      { id: 'D', label: 'D', text: '一阵热一阵冷，像信号被外星人劫持', scores: { stability: -3, obsession: 1, drain: 2 } }
    ]
  },
  {
    id: 5,
    title: 'TA超过5小时没回消息，后来解释“刚才肚子不舒服”，你第一反应是？',
    options: [
      { id: 'A', label: 'A', text: '行吧，人有三急，我还算淡定', scores: { certainty: 2, stability: 1, obsession: -1 } },
      { id: 'B', label: 'B', text: '有点不爽，但我假装大度', scores: { toughMouth: 1, obsession: 1, drain: 1 } },
      { id: 'C', label: 'C', text: '开始复盘：这是真窜稀，还是感情在窜稀', scores: { obsession: 2, certainty: -1, drain: 2 } },
      { id: 'D', label: 'D', text: '我已经脑补到TA是不是不想理我了', scores: { obsession: 3, certainty: -3, drain: 2 } }
    ]
  },
  {
    id: 6,
    title: '你们聊天时，最常见的状态是？',
    options: [
      { id: 'A', label: 'A', text: '有来有回，像两个人在打配合', scores: { chemistry: 2, expression: 1, stability: 1 } },
      { id: 'B', label: 'B', text: '我热情输出，TA像客服下班', scores: { initiativeGap: 3, drain: 2, progress: -1 } },
      { id: 'C', label: 'C', text: 'TA很能聊，但我经常只想回“嗯嗯哈哈”', scores: { initiativeGap: -1, expression: -1, sweetness: -1 } },
      { id: 'D', label: 'D', text: '表面聊天，实际双方都在试探谁先上头', scores: { obsession: 2, certainty: -2, expression: -1 } },
      { id: 'E', label: 'E', text: '聊着聊着突然断电，像有人拔了网线', scores: { stability: -2, drain: 2, certainty: -1 } }
    ]
  },
  {
    id: 7,
    title: '你们有没有那种“秒懂”的瞬间？',
    options: [
      { id: 'A', label: 'A', text: '有，一个眼神/一句话就能懂', scores: { chemistry: 3, intimacy: 1, stability: 1 } },
      { id: 'B', label: 'B', text: '偶尔有，但不是每次都灵', scores: { chemistry: 1, stability: 1 } },
      { id: 'C', label: 'C', text: '我以为TA懂，结果TA像刚通网', scores: { chemistry: -1, expression: -1, drain: 1 } },
      { id: 'D', label: 'D', text: '别说秒懂了，能正常对话就已经谢天谢地', scores: { chemistry: -2, stability: -1, drain: 2 } }
    ]
  },
  {
    id: 8,
    title: '你们会分享生活小事吗？',
    options: [
      { id: 'A', label: 'A', text: '会，连今天吃了什么都能聊出连续剧', scores: { intimacy: 3, sweetness: 1 } },
      { id: 'B', label: 'B', text: '会，但最近从连续剧变成了短视频', scores: { intimacy: 1, progress: -1 } },
      { id: 'C', label: 'C', text: '很少，主要交流事项，不交流灵魂', scores: { projectSense: 2, intimacy: -1, sweetness: -1 } },
      { id: 'D', label: 'D', text: '基本我在分享，TA负责“哈哈”“嗯嗯”“然后呢”', scores: { initiativeGap: 2, drain: 1, expression: -1 } },
      { id: 'E', label: 'E', text: 'TA很爱分享，但我有时候真的只想安静一会儿', scores: { initiativeGap: -1, drain: 1, expression: -1 } }
    ]
  },
  {
    id: 9,
    title: '你觉得TA对你的在意程度像什么？',
    options: [
      { id: 'A', label: 'A', text: '明显在线，我能感受到', scores: { intimacy: 2, sweetness: 2, certainty: 2 } },
      { id: 'B', label: 'B', text: '有，但TA表达起来像省电模式', scores: { intimacy: 1, expression: -1, certainty: 0 } },
      { id: 'C', label: 'C', text: '忽高忽低，像股票K线', scores: { stability: -2, obsession: 1, drain: 1 } },
      { id: 'D', label: 'D', text: '我不确定，全靠我自己破案', scores: { certainty: -3, obsession: 2, drain: 1 } }
    ]
  },
  {
    id: 10,
    title: '这段关系给你的主要体感是？',
    options: [
      { id: 'A', label: 'A', text: '放松，像回到自己家', scores: { stability: 2, intimacy: 2, drain: -1 } },
      { id: 'B', label: 'B', text: '甜，但偶尔甜到齁也敏感到炸', scores: { sweetness: 2, obsession: 1, drain: 1 } },
      { id: 'C', label: 'C', text: '稳，但有点像温水煮关系', scores: { stability: 2, sweetness: -1, projectSense: 1 } },
      { id: 'D', label: 'D', text: '累，但一想到放下又舍不得', scores: { drain: 3, obsession: 2, certainty: -1 } }
    ]
  },
  {
    id: 11,
    title: '你在这段关系里更像什么角色？',
    options: [
      { id: 'A', label: 'A', text: '被接住的人，至少不用一直硬撑', scores: { intimacy: 2, stability: 1 } },
      { id: 'B', label: 'B', text: '关系保姆，操心TA吃喝拉撒和情绪天气', scores: { care: 3, initiativeGap: 1, drain: 1 } },
      { id: 'C', label: 'C', text: '关系运营，负责主动、维护、补bug', scores: { initiativeGap: 3, progress: 1, drain: 1 } },
      { id: 'D', label: 'D', text: '关系侦探，天天分析TA每个字到底什么意思', scores: { obsession: 2, certainty: -2, drain: 1 } }
    ]
  },
  {
    id: 12,
    title: '你们现在的甜度余额大概是？',
    options: [
      { id: 'A', label: 'A', text: '余额充足，偶尔还有心动返现', scores: { sweetness: 3, obsession: 1 } },
      { id: 'B', label: 'B', text: '还有一点，但需要省着用', scores: { sweetness: 1 } },
      { id: 'C', label: 'C', text: '甜度欠费，主要靠熟人优惠撑着', scores: { sweetness: -2, stability: 1, chemistry: 1 } },
      { id: 'D', label: 'D', text: '甜不甜不知道，刺激是真刺激', scores: { obsession: 2, stability: -1, drain: 1 } }
    ]
  },
  {
    id: 13,
    title: '你们出现矛盾时，通常怎么发展？',
    options: [
      { id: 'A', label: 'A', text: '能说开，吵完还能继续做人', scores: { resilience: 2, stability: 2, expression: 1 } },
      { id: 'B', label: 'B', text: '先嘴硬互怼，之后偷偷缓和', scores: { toughMouth: 2, resilience: 1 } },
      { id: 'C', label: 'C', text: '一个追着问，一个启动逃跑模式', scores: { initiativeGap: 2, drain: 2, certainty: -1 } },
      { id: 'D', label: 'D', text: '表面过去了，心里小本本已经写满', scores: { drain: 2, resilience: -1, expression: -2 } },
      { id: 'E', label: 'E', text: '情绪上头时手比嘴快，事后又后悔到想重启', scores: { drain: 3, resilience: -2, toughMouth: 1 } }
    ]
  },
  {
    id: 14,
    title: '你们吵起来最像哪种场面？',
    options: [
      { id: 'A', label: 'A', text: '两个人在解决问题', scores: { resilience: 2, projectSense: 1, stability: 1 } },
      { id: 'B', label: 'B', text: '两只嘴硬鸭子互相嘎嘎', scores: { toughMouth: 3, obsession: 1 } },
      { id: 'C', label: 'C', text: '一个开庭审问，一个拒不配合', scores: { initiativeGap: 2, drain: 2, expression: -1 } },
      { id: 'D', label: 'D', text: '一场大型项目复盘会', scores: { projectSense: 3, sweetness: -1 } },
      { id: 'E', label: 'E', text: '家庭副本Boss战，谁都不想输', scores: { drain: 2, toughMouth: 2, resilience: -1 } }
    ]
  },
  {
    id: 15,
    title: '如果你不主动，TA会主动靠近你吗？',
    options: [
      { id: 'A', label: 'A', text: '会，而且不是装样子', scores: { progress: 2, certainty: 2, initiativeGap: -2 } },
      { id: 'B', label: 'B', text: '会，但频率像抽盲盒', scores: { progress: 1, initiativeGap: 1, stability: -1 } },
      { id: 'C', label: 'C', text: '不一定，看TA当天电量', scores: { stability: -1, certainty: -1, initiativeGap: 1 } },
      { id: 'D', label: 'D', text: '很少，基本靠我一个人续命', scores: { initiativeGap: 3, drain: 1, progress: -1 } },
      { id: 'E', label: 'E', text: 'TA倒是会靠近，但我经常想装死', scores: { initiativeGap: -1, expression: -1, drain: 1 } }
    ]
  },
  {
    id: 16,
    title: '你们最近有没有“关系更进一步”的迹象？',
    options: [
      { id: 'A', label: 'A', text: '有，明显更亲近了', scores: { progress: 3, intimacy: 2, sweetness: 1 } },
      { id: 'B', label: 'B', text: '有一点，但进度条卡在60%', scores: { progress: 1, intimacy: 1, certainty: -1 } },
      { id: 'C', label: 'C', text: '没什么变化，像原地转圈', scores: { progress: -2, projectSense: 1 } },
      { id: 'D', label: 'D', text: '反而有点变冷，像被系统降温', scores: { progress: -3, stability: -2, drain: 1 } },
      { id: 'E', label: 'E', text: '我们好像都在等对方先动', scores: { initiativeGap: 2, progress: -1, certainty: -1 } }
    ]
  },
  {
    id: 17,
    title: '你有没有一种“我不管就没人管”的感觉？',
    options: [
      { id: 'A', label: 'A', text: '没有，大家都挺自觉', scores: { initiativeGap: -1, stability: 1 } },
      { id: 'B', label: 'B', text: '偶尔有，但还能接受', scores: { initiativeGap: 1, care: 1 } },
      { id: 'C', label: 'C', text: '经常有，我像关系里的值班经理', scores: { care: 2, initiativeGap: 2, drain: 1 } },
      { id: 'D', label: 'D', text: '这句话就是我的人生BGM', scores: { care: 3, initiativeGap: 3, drain: 2 } },
      { id: 'E', label: 'E', text: '刚好相反，TA管太多，我想申请静音', scores: { care: -1, initiativeGap: -1, drain: 1, expression: -1 } }
    ]
  },
  {
    id: 18,
    title: '你觉得这段关系现在最缺什么？',
    options: [
      { id: 'A', label: 'A', text: '不缺什么，整体挺安心', scores: { certainty: 2, stability: 2 } },
      { id: 'B', label: 'B', text: '缺一点浪漫和新鲜感', scores: { sweetness: -1, projectSense: 1 } },
      { id: 'C', label: 'C', text: '缺一个明确答案', scores: { certainty: -3, obsession: 1 } },
      { id: 'D', label: 'D', text: '缺对方多主动一点', scores: { initiativeGap: 2, progress: -1, drain: 1 } },
      { id: 'E', label: 'E', text: '缺一点边界感，别什么都黏在一起', scores: { intimacy: 1, drain: 1, expression: -1 } }
    ]
  },
  {
    id: 19,
    title: '如果把这段关系比成一个系统，它现在是？',
    options: [
      { id: 'A', label: 'A', text: '稳定运行，偶尔小更新', scores: { stability: 3, resilience: 1 } },
      { id: 'B', label: 'B', text: '功能齐全，但甜度插件过期', scores: { projectSense: 1, sweetness: -1, stability: 1 } },
      { id: 'C', label: 'C', text: '后台过热，管理员快冒烟', scores: { drain: 3, care: 2, projectSense: 1 } },
      { id: 'D', label: 'D', text: '信号不稳定，时不时断联重启', scores: { stability: -3, drain: 2, certainty: -1 } },
      { id: 'E', label: 'E', text: '弹窗太多，我只想点“稍后处理”', scores: { drain: 2, progress: -1, obsession: 1 } }
    ]
  },
  {
    id: 20,
    title: '最后问一句，TA更接近你的谁？',
    options: [
      { id: 'A', label: 'A', text: '喜欢的人 / 暧昧对象', scores: { obsession: 1, intimacy: 1 } },
      { id: 'B', label: 'B', text: '对象 / 伴侣', scores: { stability: 1, intimacy: 1 } },
      { id: 'C', label: 'C', text: '老公 / 老婆', scores: { stability: 1, projectSense: 1 } },
      { id: 'D', label: 'D', text: '孩子', scores: { care: 2, initiativeGap: 1 } },
      { id: 'E', label: 'E', text: '前任 / 说不清的人', scores: { obsession: 1, certainty: -1, drain: 1 } },
      { id: 'F', label: 'F', text: '朋友 / 其他重要的人', scores: { chemistry: 1, progress: -1 } }
    ]
  }
];
