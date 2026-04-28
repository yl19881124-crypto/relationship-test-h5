import { useEffect, useMemo, useRef, useState } from 'react';
import MobileFrame from './components/MobileFrame';
import { QUESTIONS } from './data/questions';
import { RELATION_RESULTS } from './data/results';
import { evaluateAnswers, getRelationshipIndexes } from './utils/evaluator';
import IndexBar from './components/IndexBar';

type Stage = 'home' | 'quiz' | 'loading' | 'preview' | 'full' | 'poster';

const loadingSteps = [
  '正在调取你们的聊天气氛值...💬',
  '正在捕捉暧昧小动作与嘴硬证据...🛰️',
  '正在比对你们的关系隐藏剧情线...🎬',
  '关系真名已进入揭晓倒计时...✨'
];

const optionStickers = ['🫧', '💘', '🎀', '🪄'];
const previewFlavorLabels = ['暧昧浓度', '稳稳安心值', '心动甜度', '上头值'];
const AUTO_NEXT_DELAY = 280;

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

  const clearAutoNextTimer = () => {
    if (autoNextTimerRef.current) {
      window.clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }
    setIsAutoAdvancing(false);
  };

  useEffect(() => {
    return () => clearAutoNextTimer();
  }, []);

  useEffect(() => {
    if (stage !== 'loading') return;

    const stepTimer = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 800);

    const doneTimer = setTimeout(() => {
      setStage('preview');
      setLoadingTextIndex(0);
    }, 3200);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [stage]);

  const restart = () => {
    clearAutoNextTimer();
    setAnswers({});
    setCurrentQuestion(0);
    setStage('home');
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

  const onPrevQuestion = () => {
    if (currentQuestion === 0) return;

    clearAutoNextTimer();
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  return (
    <MobileFrame>
      {stage === 'home' && (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between py-6">
          <div className="sticker sticker-left">🫶</div>
          <div className="sticker sticker-right">💌</div>
          <div className="space-y-5 text-center">
            <p className="mx-auto inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-violet-500 shadow-sm">
              <span>✨</span> 今日关系小剧场
            </p>
            <div className="animate-float-up mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/85 bg-white/80 text-4xl shadow-[0_14px_34px_rgba(168,85,247,0.24)]">
              💞
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-tight text-slate-800">
                测测你和TA<br />
                到底是哪种关系番
              </h1>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500">
                不是严肃问卷，是一场有点上头的关系剧情测试。20题后，你会拿到你们的关系真名＋暴击文案。
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/80 p-4 text-left text-sm leading-relaxed text-slate-600 shadow-[0_12px_35px_rgba(139,92,246,0.12)] backdrop-blur">
              <p className="font-semibold text-violet-500">进入测试前 · 小贴士</p>
              <p className="mt-1">心里先锁定一个人，按直觉选就行。越快越准，嘴硬会被系统看出来哦 👀</p>
            </div>
          </div>

          <div className="space-y-3 pt-8">
            <button
              onClick={() => setStage('quiz')}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-5 py-4 text-lg font-black text-white shadow-[0_14px_28px_rgba(139,92,246,0.35)] transition hover:brightness-105 active:scale-[0.98]"
            >
              🎉 开始玩，测关系
            </button>
            <p className="text-center text-xs text-slate-400">答题免费，完整结果可1元解锁。</p>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="space-y-6 py-4 animate-enter-up">
          <div className="rounded-3xl border border-white/85 bg-white/80 p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-violet-500">
              <span>剧情进度 · 第 {currentQuestion + 1} 题</span>
              <span>{QUESTIONS.length} 题中</span>
            </div>
            <div className="mb-3 h-3 rounded-full bg-violet-100/90 p-[2px]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-500 to-sky-400 transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-slate-400">别想太久，第一反应通常就是你们关系的真实弹幕。</p>
              <button
                onClick={onPrevQuestion}
                disabled={currentQuestion === 0}
                className="shrink-0 rounded-xl border border-violet-200 bg-white px-3 py-1.5 text-xs font-semibold text-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                上一题
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/85 bg-white/85 p-5 shadow-[0_10px_35px_rgba(30,41,59,0.08)] animate-enter-up">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Relationship Question</p>
            <h2 className="text-[1.35rem] font-black leading-snug text-slate-800">{QUESTIONS[currentQuestion].title}</h2>
          </div>

          <div className="space-y-3 pb-4">
            {QUESTIONS[currentQuestion].options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onAnswer(option.id)}
                  className={`group w-full rounded-3xl border px-4 py-4 text-left text-sm leading-relaxed transition duration-200 active:scale-[0.99] ${
                    isSelected
                      ? 'scale-[1.01] border-violet-400 bg-violet-50 shadow-[0_12px_26px_rgba(139,92,246,0.25)]'
                      : 'border-white/85 bg-white/85 shadow-[0_8px_22px_rgba(148,163,184,0.14)] hover:border-violet-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{optionStickers[idx % optionStickers.length]}</span>
                    <span className={`font-semibold ${isSelected ? 'text-violet-600' : 'text-violet-500'}`}>{option.label}.</span>
                    {isSelected && (
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-600">已锁定</span>
                    )}
                  </div>
                  <p className={`mt-1 pl-6 ${isSelected ? 'text-slate-700' : 'text-slate-600'}`}>{option.text}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
          <div className="w-full max-w-sm rounded-3xl border border-white/80 bg-white/80 p-8 shadow-[0_14px_34px_rgba(124,58,237,0.14)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">Relationship Scanner</p>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100">
              <div className="animate-pulse-soft flex h-14 w-14 items-center justify-center rounded-full border-[6px] border-violet-400 border-t-transparent text-xl">🔮</div>
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-800">正在偷偷分析你们的关系剧情...</h2>
            <p className="mt-3 text-sm text-slate-500 transition-all duration-300">{loadingSteps[loadingTextIndex]}</p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-violet-100">
              <div className="h-1.5 w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-fuchsia-400 to-blue-400" />
            </div>
          </div>
        </div>
      )}

      {stage === 'preview' && (
        <div className="space-y-5 py-4 animate-enter-up">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">结果已生成 · 待解锁</p>
          <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-[0_12px_30px_rgba(124,58,237,0.12)]">
            <h2 className="text-2xl font-black text-slate-800">你的隐藏关系已经生成</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              系统已经识别出你和TA的关系真名。<br />这不是普通关系，而是一种很典型的隐藏相处模式。
            </p>
          </div>

          <div className="rounded-3xl border border-violet-200 bg-violet-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold text-violet-500">模糊结果卡</p>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p>你和TA的隐藏关系：？？？？？？型</p>
              <p>你们的双人角色：已生成</p>
              <p>一句话暴击：已生成</p>
              <p>专属关系海报：已生成</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">已生成检测项</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>✅ 已识别关系真名</li>
              <li>✅ 已生成双人角色</li>
              <li>✅ 已生成一句话暴击</li>
              <li>✅ 已生成专属关系海报</li>
            </ul>
          </div>

          <div className="space-y-2 rounded-3xl border border-violet-200 bg-gradient-to-r from-fuchsia-100/80 via-violet-100/70 to-sky-100/80 p-4 shadow-[0_14px_28px_rgba(139,92,246,0.18)]">
            <button
              onClick={() => setStage('poster')}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-5 py-4 text-base font-black text-white shadow-[0_8px_20px_rgba(124,58,237,0.35)] active:scale-[0.99]"
            >
              1元解锁关系真名 + 双人关系海报
            </button>
            <p className="text-center text-xs text-violet-500">支付后立即查看，可保存海报。</p>
          </div>
        </div>
      )}

      {stage === 'full' && (
        <div className="space-y-4 py-4 animate-enter-up">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">完整结果 · 关系揭晓</p>

          <section className="rounded-3xl border border-violet-200 bg-gradient-to-br from-white/90 to-violet-50/90 p-5 shadow-sm">
            <p className="text-xs font-semibold text-violet-400">关系真名 · NOW SHOWING</p>
            <h2 className="mt-2 text-3xl font-black text-slate-800">{result.name}</h2>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">双人角色卡</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{result.duoRoles}</p>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold text-violet-500">一句话暴击</p>
            <p className="mt-2 text-lg font-bold leading-relaxed text-violet-700">“{result.oneLineHit}”</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">关系剧情解析</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.fullExplanation}</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">隐藏卡点提醒</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.hiddenIssue}</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">下一步建议</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.actionAdvice}</p>
          </section>

          <button onClick={restart} className="w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-xs text-slate-500">
            重新测试
          </button>
        </div>
      )}

      {stage === 'poster' && (
        <div className="space-y-4 py-4 animate-enter-up">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">关系海报 · 可分享</p>

          <div className="poster-shell rounded-[30px] border border-white/70 p-5 text-white shadow-[0_22px_44px_rgba(79,70,229,0.32)]">
            <p className="text-center text-[11px] uppercase tracking-[0.26em] text-white/85">Relationship Test Poster</p>
            <h3 className="mt-3 text-center text-3xl font-black leading-tight">{result.name}</h3>
            <p className="mt-3 rounded-2xl bg-white/15 px-4 py-2 text-center text-sm font-semibold text-white/95">{result.duoRoles}</p>
            <p className="mt-3 rounded-2xl bg-white/20 p-3 text-sm leading-relaxed text-white">“{result.oneLineHit}”</p>

            <div className="mt-4 grid gap-2">
              {indexes.map((item, idx) => (
                <IndexBar key={item.key} label={previewFlavorLabels[idx] ?? item.key} value={item.value} dark />
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/95">{result.posterCopy}</p>
            <p className="mt-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">视觉建议：{result.posterVisual}</p>
          </div>

          <button
            onClick={() => window.alert('请长按截图保存海报，发给TA看看你们的关系真名～')}
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-4 py-3 text-base font-black text-white shadow-[0_12px_24px_rgba(124,58,237,0.35)]"
          >
            📸 保存海报
          </button>
          <button
            onClick={() => setStage('full')}
            className="w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-600"
          >
            查看完整关系解析
          </button>
          <button onClick={restart} className="w-full rounded-2xl border border-white/80 bg-white/75 px-4 py-3 text-xs text-slate-500">
            再测一次
          </button>
        </div>
      )}
    </MobileFrame>
  );
}

export default App;
