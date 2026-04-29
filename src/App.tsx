import { useEffect, useMemo, useRef, useState } from 'react';
import { QUESTIONS } from './data/questions';
import { RELATION_RESULTS } from './data/results';
import { evaluateAnswers, getRelationshipIndexes } from './utils/evaluator';
import IndexBar from './components/IndexBar';
import {
  AppShell,
  ChoiceCard,
  GradientButton,
  PosterCard,
  ProgressBar,
  ResultBadge,
  SectionCard,
  SoftCard,
  StickerLabel
} from './components/DesignSystem';

type Stage = 'home' | 'quiz' | 'loading' | 'preview' | 'checkout' | 'result';
type PaymentMethod = 'wechat' | 'alipay';

type PersistedState = {
  stage: Stage;
  currentQuestion: number;
  answers: Record<number, string>;
  paid: boolean;
  paymentMethod: PaymentMethod;
};

const STORAGE_KEY = 'relationship-test-state-v1';
const loadingSteps = ['正在扫描你们的隐藏关系信号...', '分析上头浓度...', '检测嘴硬含量...', '生成关系真名...'];
const optionStickers = ['🫧', '💘', '🎀', '🪄'];
const previewFlavorLabels = ['上头值', '操心值', '甜度值', '默契值'];
const AUTO_NEXT_DELAY = 280;
const PAYMENT_DELAY = 1000;

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const autoNextTimerRef = useRef<number | null>(null);
  const paymentTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed.answers) setAnswers(parsed.answers);
      if (typeof parsed.currentQuestion === 'number') setCurrentQuestion(parsed.currentQuestion);
      if (parsed.stage) setStage(parsed.stage);
      if (parsed.paymentMethod === 'wechat' || parsed.paymentMethod === 'alipay') setPaymentMethod(parsed.paymentMethod);
      if (parsed.paid) setIsPaid(true);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const state: PersistedState = {
      stage,
      currentQuestion,
      answers,
      paid: isPaid,
      paymentMethod
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [stage, currentQuestion, answers, isPaid, paymentMethod]);

  const clearTimers = () => {
    if (autoNextTimerRef.current) window.clearTimeout(autoNextTimerRef.current);
    if (paymentTimerRef.current) window.clearTimeout(paymentTimerRef.current);
    autoNextTimerRef.current = null;
    paymentTimerRef.current = null;
    setIsAutoAdvancing(false);
    setIsPaying(false);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (stage !== 'loading') return;

    const switchText = setInterval(() => setLoadingTextIndex((prev) => (prev + 1) % loadingSteps.length), 800);
    const done = setTimeout(() => {
      setStage('preview');
      setLoadingTextIndex(0);
    }, 3200);

    return () => {
      clearInterval(switchText);
      clearTimeout(done);
    };
  }, [stage]);

  const evaluation = useMemo(() => evaluateAnswers(answers), [answers]);
  const result = RELATION_RESULTS[evaluation.resultId];
  const indexes = getRelationshipIndexes(evaluation.snapshot.normalized);
  const currentQuestionId = QUESTIONS[currentQuestion].id;
  const selectedOptionId = answers[currentQuestionId] ?? null;
  const { youRole, taRole } = parseDuoRoles(result.duoRoles);

  const restart = () => {
    clearTimers();
    setAnswers({});
    setCurrentQuestion(0);
    setPaymentMethod('wechat');
    setIsPaid(false);
    setStage('home');
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const onAnswer = (optionId: string) => {
    if (isAutoAdvancing) return;

    setAnswers((prev) => ({ ...prev, [currentQuestionId]: optionId }));
    setIsAutoAdvancing(true);

    autoNextTimerRef.current = window.setTimeout(() => {
      if (currentQuestion >= QUESTIONS.length - 1) {
        setStage('loading');
        setIsAutoAdvancing(false);
        return;
      }

      setCurrentQuestion((prev) => prev + 1);
      setIsAutoAdvancing(false);
    }, AUTO_NEXT_DELAY);
  };

  const onConfirmPayment = () => {
    if (isPaying) return;
    setIsPaying(true);

    paymentTimerRef.current = window.setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      setStage('result');
    }, PAYMENT_DELAY);
  };

  return (
    <AppShell>
      {stage === 'home' && (
        <div className="animate-enter-up relative flex min-h-[calc(100vh-4rem)] flex-col justify-between py-5">
          <div className="space-y-4 text-center">
            <StickerLabel>恋爱观察室 · 今日关系雷达扫描中</StickerLabel>
            <h1 className="title-pop text-5xl font-black leading-[1.1] text-slate-800">
              测测你和TA
              <br />
              到底是什么关系
            </h1>
            <SoftCard className="text-left">
              <div className="hero-chat">
                <span>你们到底啥关系？</span>
                <span>暧昧雷达已开机 💗？</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">20道轻松小题，测完就有“关系真名 + 双人海报”，专治嘴硬和暧昧。</p>
            </SoftCard>
          </div>
          <div className="space-y-2">
            <GradientButton onClick={() => setStage('quiz')}>开始测试</GradientButton>
            <p className="text-center text-xs text-slate-400">答题免费，完整结果可1元解锁。</p>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="animate-enter-up space-y-4 py-4">
          <SoftCard>
            <ProgressBar current={currentQuestion + 1} total={QUESTIONS.length} />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] text-slate-400">别想太久，第一反应最容易暴露关系真相。</p>
              <button
                onClick={() => currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1)}
                disabled={currentQuestion === 0}
                className="rounded-xl border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-500 disabled:opacity-40"
              >
                上一题
              </button>
            </div>
          </SoftCard>
          <SoftCard className="animate-enter-up">
            <p className="text-xs font-semibold text-slate-400">关系雷达提问</p>
            <h2 className="mt-1 text-[1.4rem] font-black text-slate-800">{QUESTIONS[currentQuestion].title}</h2>
          </SoftCard>
          <div className="space-y-3">
            {QUESTIONS[currentQuestion].options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <ChoiceCard key={option.id} selected={isSelected} onClick={() => onAnswer(option.id)}>
                  <div className="flex items-center gap-2">
                    <span>{optionStickers[idx % 4]}</span>
                    <span className="font-semibold text-violet-600">{option.label}.</span>
                    {isSelected && (
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-600">已锁定</span>
                    )}
                  </div>
                  <p className="mt-1 pl-6 text-sm text-slate-600">{option.text}</p>
                </ChoiceCard>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex min-h-[calc(100vh-5rem)] items-center">
          <SoftCard className="w-full text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">关系扫描仪</p>
            <div className="scanner mt-4 mx-auto" />
            <h2 className="mt-5 text-xl font-black text-slate-800">关系扫描仪启动中</h2>
            <p className="mt-2 text-sm text-slate-500">{loadingSteps[loadingTextIndex]}</p>
          </SoftCard>
        </div>
      )}

      {stage === 'preview' && (
        <div className="animate-enter-up space-y-4 py-4">
          <ResultBadge>你的隐藏关系已经生成</ResultBadge>
          <SoftCard>
            <h2 className="text-2xl font-black">你的隐藏关系已经生成</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
              系统已经识别出你和TA的关系真名。{`\n`}这不是普通关系，而是一种很典型的隐藏相处模式。
            </p>
            <div className="mt-3 blur-[2px] select-none space-y-1 text-sm">
              <p>你和TA的隐藏关系：？？？？？？型</p>
              <p>双人角色：已生成</p>
              <p>一句话暴击：已生成</p>
              <p>专属关系海报：已生成</p>
            </div>
          </SoftCard>
          <GradientButton onClick={() => setStage('checkout')}>1元解锁关系真名 + 双人关系海报</GradientButton>
          <p className="text-center text-xs text-violet-500">支付后立即查看，可保存海报。</p>
        </div>
      )}

      {stage === 'checkout' && (
        <div className="animate-enter-up space-y-4 py-4">
          <ResultBadge>确认解锁</ResultBadge>
          <SoftCard>
            <h2 className="text-2xl font-black text-slate-800">确认解锁</h2>
            <p className="mt-2 text-sm text-slate-600">你的关系真名和双人海报已经准备好了。</p>
          </SoftCard>
          <SoftCard className="space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold">商品名称：</span>关系真名 + 双人关系海报</p>
            <div>
              <p className="font-semibold">解锁内容：</p>
              <ol className="ml-5 mt-1 list-decimal space-y-1">
                <li>隐藏关系称号</li>
                <li>双人角色设定</li>
                <li>一句话暴击</li>
                <li>专属关系海报</li>
                <li>完整关系解析</li>
              </ol>
            </div>
            <p className="text-base"><span className="font-semibold">支付金额：</span>¥1.00</p>
          </SoftCard>
          <SoftCard>
            <p className="text-sm font-semibold text-slate-700">支付方式</p>
            <div className="mt-2 grid gap-2">
              {[{ key: 'wechat', label: '微信支付' }, { key: 'alipay', label: '支付宝' }].map((method) => (
                <button
                  key={method.key}
                  onClick={() => setPaymentMethod(method.key as PaymentMethod)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    paymentMethod === method.key
                      ? 'border-violet-400 bg-violet-50 text-violet-700'
                      : 'border-violet-200 bg-white text-slate-600'
                  }`}
                >
                  {paymentMethod === method.key ? '✅ ' : ''}
                  {method.label}
                </button>
              ))}
            </div>
          </SoftCard>
          <GradientButton onClick={onConfirmPayment} disabled={isPaying}>
            {isPaying ? '解锁中...' : '确认支付 ¥1.00'}
          </GradientButton>
          <p className="text-center text-xs text-violet-500">内测体验中，不会真实扣费。</p>
        </div>
      )}

      {stage === 'result' && (
        <div className="animate-enter-up space-y-4 py-4">
          <ResultBadge>你和TA的隐藏关系</ResultBadge>
          <PosterCard>
            <p className="text-center text-[11px] uppercase tracking-[0.25em] text-white/85">你和TA的隐藏关系</p>
            <h3 className="mt-2 text-center text-3xl font-black">{result.name}</h3>
            <p className="mt-3 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold">你：{youRole}</p>
            <p className="mt-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold">TA：{taRole}</p>
            <p className="mt-3 rounded-2xl bg-white/20 p-3 text-sm">“{result.oneLineHit}”</p>
            <div className="mt-4 grid gap-2">
              {indexes.map((item, idx) => (
                <IndexBar key={item.key} label={previewFlavorLabels[idx] ?? item.key} value={item.value} dark />
              ))}
            </div>
            <p className="mt-4 text-sm">{result.posterCopy}</p>
          </PosterCard>
          <GradientButton onClick={() => window.alert('请长按截图保存海报～')}>长按截图保存海报</GradientButton>

          <ResultBadge>完整关系解析</ResultBadge>
          <SectionCard title="关系真名" icon="💘">
            <h2 className="text-3xl font-black text-slate-800">{result.name}</h2>
          </SectionCard>
          <SectionCard title="双人角色" icon="🎭">
            <p>你：{youRole}</p>
            <p>TA：{taRole}</p>
          </SectionCard>
          <SectionCard title="一句话暴击" icon="💥">“{result.oneLineHit}”</SectionCard>
          <SectionCard title="完整关系解释" icon="🧠">{result.fullExplanation}</SectionCard>
          <SectionCard title="隐藏问题" icon="🕳️">{result.hiddenIssue}</SectionCard>
          <SectionCard title="行动建议" icon="🧭">{result.actionAdvice}</SectionCard>
          <button onClick={restart} className="w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-xs text-slate-500">
            再测一次
          </button>
        </div>
      )}
    </AppShell>
  );
}

export default App;
