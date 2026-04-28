import { QUESTIONS } from '../data/questions';
import { RESULT_ORDER } from '../data/results';
import { DimensionKey, EvaluationResult } from '../types';

const DIMENSIONS: DimensionKey[] = [
  'care',
  'intimacy',
  'stability',
  'obsession',
  'chemistry',
  'progress',
  'sweetness',
  'drain',
  'initiativeGap',
  'projectSense',
  'certainty',
  'expression',
  'resilience',
  'toughMouth'
];

const maxAbsScore = QUESTIONS.length * 3;

type Answers = Record<number, string>;
type Norm = Record<DimensionKey, number>;

const between = (value: number, min: number, max: number) => value >= min && value <= max;

const pickByFallback = (norm: Norm): string => {
  const candidates = [
    { id: 'sticky-love', score: norm.intimacy + norm.sweetness + norm.obsession },
    { id: 'iron-bros', score: norm.stability + norm.chemistry - norm.sweetness * 0.3 },
    { id: 'blind-box', score: norm.drain + (100 - norm.stability) + (100 - norm.certainty) },
    { id: 'project-squad', score: norm.projectSense + norm.stability },
    { id: 'auto-drive', score: norm.chemistry + norm.stability + (100 - norm.expression) }
  ];

  return candidates.sort((a, b) => b.score - a.score)[0]?.id ?? RESULT_ORDER[0];
};

const matchRules = (n: Norm): string | null => {
  if (n.care >= 72 && n.drain >= 66) return 'motherboard-overheat';
  if (n.care >= 72 && n.initiativeGap >= 62) return 'little-ancestor-coo';
  if (n.stability >= 72 && n.chemistry >= 68 && n.sweetness <= 46) return 'iron-bros';
  if (n.intimacy >= 72 && n.sweetness >= 72 && n.obsession >= 58) return 'sticky-love';
  if (n.stability >= 62 && n.projectSense >= 60) return 'project-squad';
  if (n.stability <= 42 && n.obsession >= 66 && n.drain >= 62) return 'human-ac';
  if (n.obsession >= 70 && between(n.progress, 45, 62) && n.certainty <= 48) return 'tai-chi';
  if (n.obsession >= 68 && n.progress <= 40 && n.initiativeGap >= 60) return 'one-hot-one-dead';
  if (n.obsession >= 70 && n.certainty <= 42) return 'schrodinger-lover';
  if (n.intimacy >= 60 && n.progress <= 44) return 'almost-install';
  if (n.stability >= 65 && n.projectSense >= 55 && n.sweetness <= 44) return 'life-partner-inc';
  if (between(n.stability, 48, 66) && n.intimacy <= 44 && n.sweetness <= 42) return 'roommate-mode';
  if (n.stability >= 70 && n.resilience >= 68) return 'battle-bond';
  if (n.chemistry >= 70 && n.stability >= 68 && n.expression <= 44) return 'auto-drive';
  if (n.toughMouth >= 68 && n.intimacy + n.obsession >= 132) return 'tough-love';
  if (n.stability <= 44 && n.drain >= 64 && n.certainty <= 42) return 'blind-box';
  return null;
};

export const evaluateAnswers = (answers: Answers): EvaluationResult => {
  const raw = Object.fromEntries(DIMENSIONS.map((d) => [d, 0])) as Record<DimensionKey, number>;

  for (const [qidText, optionId] of Object.entries(answers)) {
    const qid = Number(qidText);
    const question = QUESTIONS.find((item) => item.id === qid);
    const option = question?.options.find((item) => item.id === optionId);
    if (!option) continue;
    for (const [dim, value] of Object.entries(option.scores)) {
      raw[dim as DimensionKey] += value;
    }
  }

  const normalized = Object.fromEntries(
    DIMENSIONS.map((dim) => {
      const score = raw[dim];
      const normalizedScore = Math.round(((score + maxAbsScore) / (2 * maxAbsScore)) * 100);
      return [dim, Math.min(100, Math.max(0, normalizedScore))];
    })
  ) as Norm;

  const matched = matchRules(normalized);

  return {
    resultId: matched ?? pickByFallback(normalized),
    snapshot: {
      raw,
      normalized
    }
  };
};

export const getRelationshipIndexes = (n: Norm) => [
  { key: '亲密指数', value: n.intimacy },
  { key: '稳定指数', value: n.stability },
  { key: '甜度指数', value: n.sweetness },
  { key: '上头指数', value: n.obsession }
];
