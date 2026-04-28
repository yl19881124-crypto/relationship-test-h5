import { useEffect, useMemo, useState } from 'react';
import MobileFrame from './components/MobileFrame';
import { QUESTIONS } from './data/questions';
import { RELATION_RESULTS } from './data/results';
import { evaluateAnswers, getRelationshipIndexes } from './utils/evaluator';
import IndexBar from './components/IndexBar';

type Stage = 'home' | 'quiz' | 'loading' | 'preview' | 'full' | 'poster';

const loadingSteps = [
  '检测聊天依赖度...',
  '分析关系稳定性...',
  '识别隐藏相处模式...',
  '生成你们的关系真名...'
];

function App() {
  const [stage, setStage] = useState<Stage>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const evaluation = useMemo(() => evaluateAnswers(answers), [answers]);
  const result = RELATION_RESULTS[evaluation.resultId];
  const indexes = getRelationshipIndexes(evaluation.snapshot.normalized);

  useEffect(() => {
    if (stage !== 'loading') return;

    const stepTimer = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 750);

    const doneTimer = setTimeout(() => {
      setStage('preview');
      setLoadingTextIndex(0);
    }, 3000);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [stage]);

  const restart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setStage('home');
  };

  const onAnswer = (optionId: string) => {
    const questionId = QUESTIONS[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));

    if (currentQuestion >= QUESTIONS.length - 1) {
      setStage('loading');
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <MobileFrame>
      {stage === 'home' && (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-between py-10">
          <div className="space-y-5">
            <p className="inline-block rounded-full bg-brand/20 px-3 py-1 text-xs text-brand">关系实验室 H5</p>
            <h1 className="text-3xl font-black leading-tight">测测你和TA到底是什么关系</h1>
            <p className="text-sm text-slate-300">有些关系叫恋人，有些叫队友，有些叫铁哥们，还有些叫你一个人的连续剧。</p>
            <p className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4 text-sm text-slate-200">
              想一个你在意的人，回答20道题。系统会测出你们的隐藏关系类型。
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setStage('quiz')}
              className="w-full rounded-2xl bg-gradient-to-r from-brand to-accent px-5 py-3 text-lg font-bold text-white"
            >
              开始测试
            </button>
            <p className="text-center text-xs text-slate-400">测试仅供娱乐，但可能有点准。</p>
          </div>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="space-y-5 py-4">
          <p className="text-sm text-accent">
            {currentQuestion + 1} / {QUESTIONS.length}
          </p>
          <div className="h-2 rounded-full bg-slate-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brand to-accent"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <h2 className="pt-2 text-xl font-bold leading-snug">{QUESTIONS[currentQuestion].title}</h2>
          <div className="space-y-3">
            {QUESTIONS[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => onAnswer(option.id)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-left text-sm hover:border-brand"
              >
                <span className="mr-2 font-semibold text-brand">{option.label}.</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center space-y-6 text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-brand border-t-transparent" />
          <h2 className="text-xl font-bold">正在分析你们的关系信号...</h2>
          <p className="text-sm text-slate-300">{loadingSteps[loadingTextIndex]}</p>
        </div>
      )}

      {stage === 'preview' && (
        <div className="space-y-5 py-4">
          <p className="text-xs text-accent">免费初判</p>
          <h2 className="text-2xl font-black">关系初判：{result.subtitle}</h2>
          <p className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-200">{result.freePreview}</p>

          <div className="grid grid-cols-1 gap-3">
            {indexes.map((item) => (
              <IndexBar key={item.key} label={item.key} value={item.value} />
            ))}
          </div>

          <p className="rounded-2xl border border-dashed border-brand/60 p-3 text-sm text-slate-300">模糊提示：{result.teaser}</p>

          <button
            onClick={() => setStage('full')}
            className="w-full rounded-2xl bg-gradient-to-r from-brand to-accent px-5 py-3 text-base font-bold"
          >
            1元解锁关系真名 + 双人关系海报
          </button>
          <p className="text-center text-xs text-slate-400">支付后立即查看，可保存海报。</p>
        </div>
      )}

      {stage === 'full' && (
        <div className="space-y-4 py-4">
          <p className="text-xs text-accent">完整结果</p>
          <h2 className="text-2xl font-black">你和TA的隐藏关系是：{result.name}</h2>
          <div className="space-y-3 rounded-2xl bg-slate-800 p-4 text-sm">
            <p>
              <span className="text-slate-400">双人角色：</span>
              {result.duoRoles}
            </p>
            <p>
              <span className="text-slate-400">一句话暴击：</span>
              {result.oneLineHit}
            </p>
            <p>
              <span className="text-slate-400">完整关系解释：</span>
              {result.fullExplanation}
            </p>
            <p>
              <span className="text-slate-400">隐藏问题：</span>
              {result.hiddenIssue}
            </p>
            <p>
              <span className="text-slate-400">行动建议：</span>
              {result.actionAdvice}
            </p>
          </div>
          <button onClick={() => setStage('poster')} className="w-full rounded-2xl border border-brand px-4 py-3 text-sm font-bold">
            查看关系海报
          </button>
          <button onClick={restart} className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-xs text-slate-300">
            重新测试
          </button>
        </div>
      )}

      {stage === 'poster' && (
        <div className="space-y-4 py-4">
          <p className="text-xs text-accent">关系海报</p>
          <div className="rounded-[28px] bg-gradient-to-b from-fuchsia-500/30 via-violet-500/20 to-cyan-400/20 p-5 shadow-glow">
            <p className="text-xs uppercase tracking-widest text-slate-200">测测你和TA到底是什么关系</p>
            <h3 className="mt-3 text-2xl font-black">{result.name}</h3>
            <p className="mt-2 text-sm text-slate-200">{result.duoRoles}</p>
            <p className="mt-3 rounded-xl bg-black/25 p-3 text-sm">{result.oneLineHit}</p>
            <div className="mt-4 grid gap-2">
              {indexes.map((item) => (
                <IndexBar key={item.key} label={item.key} value={item.value} />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-100">{result.posterCopy}</p>
            <p className="mt-2 text-xs text-slate-300">视觉建议：{result.posterVisual}</p>
          </div>
          <button onClick={() => window.alert('请长按截图保存海报～')} className="w-full rounded-2xl bg-gradient-to-r from-brand to-accent px-4 py-3 font-bold">
            保存海报
          </button>
          <button onClick={restart} className="w-full rounded-2xl bg-slate-800 px-4 py-3 text-xs text-slate-300">
            再测一次
          </button>
        </div>
      )}
    </MobileFrame>
  );
}

export default App;
