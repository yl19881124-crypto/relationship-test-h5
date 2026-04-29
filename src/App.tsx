import { useEffect, useMemo, useRef, useState } from 'react';
import { QUESTIONS } from './data/questions';
import { RELATION_RESULTS } from './data/results';
import { evaluateAnswers, getRelationshipIndexes } from './utils/evaluator';
import IndexBar from './components/IndexBar';
import { AppShell, ChoiceCard, GradientButton, PosterCard, ProgressBar, ResultBadge, SectionCard, SoftCard, StickerLabel } from './components/DesignSystem';

type Stage = 'home' | 'quiz' | 'loading' | 'preview' | 'full' | 'poster';
const loadingSteps = ['正在扫描你们的隐藏关系信号...', '分析上头浓度...', '检测嘴硬含量...', '生成关系真名...'];
const optionStickers = ['🫧', '💘', '🎀', '🪄'];
const previewFlavorLabels = ['上头值', '操心值', '甜度值', '默契值'];
const AUTO_NEXT_DELAY = 280;

const parseDuoRoles = (duoRoles: string) => {
  const parts = duoRoles.split(/[｜|]/).map((part) => part.trim()).filter(Boolean);
  const youRoleRaw = parts.find((part) => part.startsWith('你：')) ?? parts[0] ?? duoRoles;
  const taRoleRaw = parts.find((part) => part.startsWith('TA：')) ?? parts[1] ?? duoRoles;
  return {
    youRole: youRoleRaw.replace(/^你：/, '').trim(),
    taRole: taRoleRaw.replace(/^TA：/, '').trim()
  };
};

function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const autoNextTimerRef = useRef<number | null>(null);
  const evaluation = useMemo(() => evaluateAnswers(answers), [answers]);
  const result = RELATION_RESULTS[evaluation.resultId];
  const indexes = getRelationshipIndexes(evaluation.snapshot.normalized);
  const currentQuestionId = QUESTIONS[currentQuestion].id;
  const selectedOptionId = answers[currentQuestionId] ?? null;
  const { youRole, taRole } = parseDuoRoles(result.duoRoles);
  const clear = () => { if (autoNextTimerRef.current) window.clearTimeout(autoNextTimerRef.current); autoNextTimerRef.current = null; setIsAutoAdvancing(false); };
  useEffect(() => () => clear(), []);
  useEffect(() => { if (stage !== 'loading') return; const s = setInterval(() => setLoadingTextIndex((p) => (p + 1) % loadingSteps.length), 800); const d = setTimeout(() => { setStage('preview'); setLoadingTextIndex(0); }, 3200); return () => { clearInterval(s); clearTimeout(d); }; }, [stage]);
  const restart = () => { clear(); setAnswers({}); setCurrentQuestion(0); setStage('home'); };
  const onAnswer = (optionId: string) => { if (isAutoAdvancing) return; setAnswers((prev) => ({ ...prev, [currentQuestionId]: optionId })); setIsAutoAdvancing(true); autoNextTimerRef.current = window.setTimeout(() => { if (currentQuestion >= QUESTIONS.length - 1) { setStage('loading'); setIsAutoAdvancing(false); return; } setCurrentQuestion((p) => p + 1); setIsAutoAdvancing(false); }, AUTO_NEXT_DELAY); };

  return <AppShell>{stage === 'home' && <div className="animate-enter-up relative flex min-h-[calc(100vh-4rem)] flex-col justify-between py-5"><div className='space-y-4 text-center'><StickerLabel>恋爱观察室 · 今日关系雷达扫描中</StickerLabel><h1 className='title-pop text-5xl font-black leading-[1.1] text-slate-800'>测测你和TA<br/>到底是什么关系</h1><SoftCard className='text-left'><div className='hero-chat'><span>你们到底啥关系？</span><span>暧昧雷达已开机 💗❓</span></div><p className='mt-3 text-sm text-slate-600'>20道轻松小题，测完就有“关系真名 + 双人海报”，专治嘴硬和暧昧。</p></SoftCard></div><div className='space-y-2'><GradientButton onClick={() => setStage('quiz')}>开始测试</GradientButton><p className='text-center text-xs text-slate-400'>答题免费，完整结果可1元解锁。</p></div></div>}

{stage==='quiz'&&<div className='animate-enter-up space-y-4 py-4'><SoftCard><ProgressBar current={currentQuestion+1} total={QUESTIONS.length}/><div className='mt-3 flex items-center justify-between'><p className='text-[11px] text-slate-400'>别想太久，第一反应最容易暴露关系真相。</p><button onClick={()=>currentQuestion>0&&setCurrentQuestion((p)=>p-1)} disabled={currentQuestion===0} className='rounded-xl border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-500 disabled:opacity-40'>上一题</button></div></SoftCard><SoftCard className='animate-enter-up'><p className='text-xs font-semibold text-slate-400'>关系雷达提问</p><h2 className='mt-1 text-[1.4rem] font-black text-slate-800'>{QUESTIONS[currentQuestion].title}</h2></SoftCard><div className='space-y-3'>{QUESTIONS[currentQuestion].options.map((option,idx)=>{const isSelected=selectedOptionId===option.id;return <ChoiceCard key={option.id} selected={isSelected} onClick={()=>onAnswer(option.id)}><div className='flex items-center gap-2'><span>{optionStickers[idx%4]}</span><span className='font-semibold text-violet-600'>{option.label}.</span>{isSelected&&<span className='rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-600'>已锁定</span>}</div><p className='mt-1 pl-6 text-sm text-slate-600'>{option.text}</p></ChoiceCard>;})}</div></div>}

{stage==='loading'&&<div className='flex min-h-[calc(100vh-5rem)] items-center'><SoftCard className='w-full text-center'><p className='text-xs font-semibold uppercase tracking-[0.2em] text-violet-400'>关系扫描仪</p><div className='scanner mt-4 mx-auto' /><h2 className='mt-5 text-xl font-black text-slate-800'>关系扫描仪启动中</h2><p className='mt-2 text-sm text-slate-500'>{loadingSteps[loadingTextIndex]}</p></SoftCard></div>}

{stage==='preview'&&<div className='animate-enter-up space-y-4 py-4'><ResultBadge>你的隐藏关系已经生成</ResultBadge><SoftCard><h2 className='text-2xl font-black'>结果已锁定 🔒</h2><div className='mt-3 blur-[2px] select-none space-y-1 text-sm'><p>你和TA的隐藏关系：？？？？？？型</p><p>双人角色：已生成</p><p>一句话暴击：已生成</p><p>专属关系海报：已生成</p></div></SoftCard><GradientButton onClick={()=>setStage('poster')}>1元解锁关系真名 + 双人关系海报</GradientButton><p className='text-center text-xs text-violet-500'>支付后立即查看，可保存海报。</p></div>}

{stage==='poster'&&<div className='animate-enter-up space-y-4 py-4'><ResultBadge>你和TA的隐藏关系</ResultBadge><PosterCard><p className='text-center text-[11px] uppercase tracking-[0.25em] text-white/85'>你和TA的隐藏关系</p><h3 className='mt-2 text-center text-3xl font-black'>{result.name}</h3><p className='mt-3 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold'>你：{youRole}</p><p className='mt-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold'>TA：{taRole}</p><p className='mt-3 rounded-2xl bg-white/20 p-3 text-sm'>“{result.oneLineHit}”</p><div className='mt-4 grid gap-2'>{indexes.map((item,idx)=><IndexBar key={item.key} label={previewFlavorLabels[idx]??item.key} value={item.value} dark />)}</div><p className='mt-4 text-sm'>{result.posterCopy}</p></PosterCard><GradientButton onClick={()=>window.alert('请长按截图保存海报～')}>长按截图保存海报</GradientButton><button onClick={()=>setStage('full')} className='w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-600'>查看完整关系解析</button></div>}

{stage==='full'&&<div className='animate-enter-up space-y-4 py-4'><ResultBadge>完整关系解析</ResultBadge><SectionCard title='关系真名' icon='💘'><h2 className='text-3xl font-black text-slate-800'>{result.name}</h2></SectionCard><SectionCard title='双人角色' icon='🎭'>{result.duoRoles}</SectionCard><SectionCard title='一句话暴击' icon='💥'>“{result.oneLineHit}”</SectionCard><SectionCard title='完整关系解释' icon='🧠'>{result.fullExplanation}</SectionCard><SectionCard title='隐藏问题' icon='🕳️'>{result.hiddenIssue}</SectionCard><SectionCard title='行动建议' icon='🧭'>{result.actionAdvice}</SectionCard><button onClick={restart} className='w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-xs text-slate-500'>再测一次</button></div>}
</AppShell>;
}

export default App;
