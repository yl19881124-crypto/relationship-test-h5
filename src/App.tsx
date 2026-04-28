import { useEffect, useMemo, useState } from 'react';
import MobileFrame from './components/MobileFrame';
import { QUESTIONS } from './data/questions';
import { RELATION_RESULTS } from './data/results';
import { evaluateAnswers, getRelationshipIndexes } from './utils/evaluator';
import IndexBar from './components/IndexBar';

type Stage = 'home' | 'quiz' | 'loading' | 'preview' | 'full' | 'poster';

const loadingSteps = ['检测聊天依赖度...', '分析关系稳定性...', '识别隐藏相处模式...', '生成你们的关系真名...'];

function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const evaluation = useMemo(() => evaluateAnswers(answers), [answers]);
  const result = RELATION_RESULTS[evaluation.resultId];
  const indexes = getRelationshipIndexes(evaluation.snapshot.normalized);

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
    setAnswers({});
    setCurrentQuestion(0);
    setSelectedOptionId(null);
    setStage('home');
  };

  const onAnswer = (optionId: string) => {
    if (selectedOptionId) return;

    setSelectedOptionId(optionId);
    window.setTimeout(() => {
      const questionId = QUESTIONS[currentQuestion].id;
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

      if (currentQuestion >= QUESTIONS.length - 1) {
        setStage('loading');
        setSelectedOptionId(null);
        return;
      }

      setCurrentQuestion((prev) => prev + 1);
      setSelectedOptionId(null);
    }, 180);
  };

  return (
    <MobileFrame>
      {stage === 'home' && (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between py-6">
          <div className="space-y-5 text-center">
            <p className="mx-auto inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-medium text-violet-500 shadow-sm">
              <span>✨</span> 关系实验室 H5
            </p>
            <div className="animate-float-up mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/80 bg-white/70 text-3xl shadow-[0_10px_30px_rgba(168,85,247,0.2)]">
              💞
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-black leading-tight text-slate-800">测测你和TA<br />到底是什么关系</h1>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-500">
                恋人、队友、灵魂拍档，还是你一个人的心动连续剧？20题看清你们的关系真相。
              </p>
            </div>
            <div className="rounded-3xl border border-white/80 bg-white/75 p-4 text-left text-sm leading-relaxed text-slate-600 shadow-[0_12px_35px_rgba(139,92,246,0.12)] backdrop-blur">
              <p className="font-semibold text-violet-500">测试说明</p>
              <p className="mt-1">请在脑海里锁定一个你在意的人，按直觉作答。结果仅供娱乐，但往往会有点戳心。</p>
            </div>
          </div>

          <div className="space-y-3 pt-8">
            <button
              onClick={() => setStage('quiz')}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-5 py-4 text-lg font-bold text-white shadow-[0_14px_28px_rgba(139,92,246,0.35)] transition hover:brightness-105 active:scale-[0.98]"
            >
              开始测试
            </button>
            <p className="text-center text-xs text-slate-400">用时约 2 分钟 · 不需要登录</p>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="space-y-6 py-4">
          <div className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold text-violet-500">
              <span>第 {currentQuestion + 1} 题</span>
              <span>共 {QUESTIONS.length} 题</span>
            </div>
            <div className="h-2.5 rounded-full bg-violet-100">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-blue-400 transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/80 p-5 shadow-[0_10px_35px_rgba(30,41,59,0.08)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Question</p>
            <h2 className="text-[1.35rem] font-bold leading-snug text-slate-800">{QUESTIONS[currentQuestion].title}</h2>
          </div>

          <div className="space-y-3 pb-4">
            {QUESTIONS[currentQuestion].options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onAnswer(option.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left text-sm leading-relaxed transition duration-200 active:scale-[0.99] ${
                    isSelected
                      ? 'scale-[1.01] border-violet-400 bg-violet-50 shadow-[0_10px_24px_rgba(139,92,246,0.25)]'
                      : 'border-white/80 bg-white/80 shadow-[0_8px_22px_rgba(148,163,184,0.14)] hover:border-violet-200'
                  }`}
                >
                  <span className={`mr-2 font-semibold ${isSelected ? 'text-violet-600' : 'text-violet-500'}`}>{option.label}.</span>
                  <span className={isSelected ? 'text-slate-700' : 'text-slate-600'}>{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
          <div className="w-full max-w-sm rounded-3xl border border-white/80 bg-white/75 p-8 shadow-[0_14px_34px_rgba(124,58,237,0.14)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
              <div className="animate-pulse-soft h-12 w-12 rounded-full border-[6px] border-violet-400 border-t-transparent" />
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-800">正在生成你们的关系画像...</h2>
            <p className="mt-3 text-sm text-slate-500 transition-all duration-300">{loadingSteps[loadingTextIndex]}</p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-violet-100">
              <div className="h-1.5 w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-fuchsia-400 to-blue-400" />
            </div>
          </div>
        </div>
      )}

      {stage === 'preview' && (
        <div className="space-y-5 py-4">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">免费初判</p>
          <div className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(124,58,237,0.12)]">
            <h2 className="text-2xl font-black text-slate-800">关系初判：{result.subtitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{result.freePreview}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {indexes.map((item) => (
              <IndexBar key={item.key} label={item.key} value={item.value} />
            ))}
          </div>

          <p className="rounded-2xl border border-dashed border-violet-300 bg-violet-50/70 p-3 text-sm text-violet-600">🔍 模糊提示：{result.teaser}</p>

          <div className="space-y-2 rounded-3xl border border-violet-200 bg-gradient-to-r from-fuchsia-100/80 via-violet-100/70 to-sky-100/80 p-4 shadow-[0_14px_28px_rgba(139,92,246,0.18)]">
            <button
              onClick={() => setStage('full')}
              className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-5 py-4 text-base font-bold text-white shadow-[0_8px_20px_rgba(124,58,237,0.35)] active:scale-[0.99]"
            >
              1元解锁关系真名 + 双人关系海报
            </button>
            <p className="text-center text-xs text-violet-500">限时解锁 · 立即查看完整报告</p>
          </div>
        </div>
      )}

      {stage === 'full' && (
        <div className="space-y-4 py-4">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">完整结果</p>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">1. 关系真名</p>
            <h2 className="mt-2 text-2xl font-black text-slate-800">{result.name}</h2>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">2. 双人角色</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{result.duoRoles}</p>
          </section>

          <section className="rounded-3xl border border-violet-200 bg-violet-50/70 p-5 shadow-sm">
            <p className="text-xs font-semibold text-violet-500">3. 一句话暴击</p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-violet-700">{result.oneLineHit}</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">4. 完整解释</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.fullExplanation}</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">5. 隐藏问题</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.hiddenIssue}</p>
          </section>

          <section className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-400">6. 行动建议</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.actionAdvice}</p>
          </section>

          <button
            onClick={() => setStage('poster')}
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-4 py-3 text-sm font-bold text-white"
          >
            查看关系海报
          </button>
          <button onClick={restart} className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-xs text-slate-500">
            重新测试
          </button>
        </div>
      )}

      {stage === 'poster' && (
        <div className="space-y-4 py-4">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-600">关系海报</p>

          <div className="rounded-[28px] border border-white/70 bg-gradient-to-b from-[#3f2b7f] via-[#5f42b5] to-[#7f78ff] p-5 text-white shadow-[0_22px_44px_rgba(79,70,229,0.32)]">
            <p className="text-center text-[11px] uppercase tracking-[0.26em] text-white/80">Relationship Test</p>
            <h3 className="mt-3 text-center text-3xl font-black leading-tight">{result.name}</h3>
            <p className="mt-3 rounded-2xl bg-white/15 px-4 py-2 text-center text-sm text-white/90">{result.duoRoles}</p>
            <p className="mt-3 rounded-2xl bg-white/20 p-3 text-sm leading-relaxed text-white">“{result.oneLineHit}”</p>

            <div className="mt-4 grid gap-2">
              {indexes.map((item) => (
                <IndexBar key={item.key} label={item.key} value={item.value} />
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/95">{result.posterCopy}</p>
            <p className="mt-2 text-xs text-white/75">视觉建议：{result.posterVisual}</p>
          </div>

          <button
            onClick={() => window.alert('请长按截图保存海报～')}
            className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-blue-500 px-4 py-3 text-base font-bold text-white shadow-[0_12px_24px_rgba(124,58,237,0.35)]"
          >
            保存海报
          </button>
          <button onClick={restart} className="w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-xs text-slate-500">
            再测一次
          </button>
        </div>
      )}
    </MobileFrame>
  );
}

export default App;
