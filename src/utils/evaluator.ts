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

const byPriority = (rules: Array<[boolean, string]>): string | null => {
  const matched = rules.find(([ok]) => ok);
  return matched?.[1] ?? null;
};

const pickByFallback = (n: Norm): string => {
  const candidates = [
    { id: 'life-partner-inc', score: n.stability + n.projectSense + n.care - n.sweetness * 0.2 },
    { id: 'sticky-love', score: n.intimacy + n.sweetness + n.obsession - n.drain * 0.5 },
    { id: 'battle-bond', score: n.stability + n.resilience + n.care },
    { id: 'iron-bros', score: n.stability + n.chemistry + n.resilience - n.sweetness * 0.3 },
    { id: 'auto-drive', score: n.chemistry + n.stability + (100 - n.expression) },
    { id: 'project-squad', score: n.projectSense + n.stability + n.care },
    { id: 'blind-box', score: n.drain + (100 - n.stability) + (100 - n.certainty) }
  ];

  return candidates.sort((a, b) => b.score - a.score)[0]?.id ?? RESULT_ORDER[0];
};

const matchRules = (n: Norm): string | null => {
  const lowSweetFunctional = n.sweetness <= 46 && n.intimacy <= 48 && n.expression <= 46;
  const stableLongTerm = n.stability >= 68 && n.projectSense >= 56;
  const intenseUnstable = n.stability <= 44 && n.drain >= 64 && n.certainty <= 44;

  const strongTrigger = byPriority([
    [n.care >= 84 && n.drain >= 72 && n.projectSense >= 54, 'motherboard-overheat'],
    [n.care >= 78 && n.initiativeGap >= 68 && n.progress <= 56, 'little-ancestor-coo'],
    [n.initiativeGap >= 74 && n.obsession >= 68 && n.progress <= 42 && n.certainty <= 54, 'one-hot-one-dead'],
    [n.stability >= 74 && n.resilience >= 72 && n.care >= 62, 'battle-bond'],
    [n.stability >= 74 && n.chemistry >= 72 && n.sweetness <= 52 && n.resilience >= 66, 'iron-bros'],
    [stableLongTerm && n.care >= 66 && n.progress >= 62, 'life-partner-inc'],
    [n.stability >= 66 && n.projectSense >= 68 && n.progress >= 62 && n.expression <= 56, 'project-squad'],
    [n.stability >= 66 && n.chemistry >= 72 && n.expression <= 42 && n.sweetness <= 58, 'auto-drive'],
    [n.toughMouth >= 70 && n.intimacy >= 62 && n.obsession >= 62 && n.stability >= 52, 'tough-love'],
    [n.intimacy >= 76 && n.sweetness >= 76 && n.obsession >= 62 && n.progress >= 58 && n.drain <= 58, 'sticky-love'],
    [n.intimacy >= 64 && n.progress <= 46 && n.certainty <= 58 && n.sweetness >= 52, 'almost-install'],
    [intenseUnstable && n.obsession >= 66, 'blind-box'],
    [n.stability <= 46 && n.obsession >= 68 && n.drain >= 66 && n.expression <= 52, 'human-ac'],
    [n.obsession >= 68 && between(n.progress, 46, 64) && n.certainty <= 50 && n.initiativeGap <= 64, 'tai-chi'],
    [n.obsession >= 70 && n.certainty <= 42 && n.progress <= 60, 'schrodinger-lover'],
    [between(n.stability, 52, 72) && n.intimacy <= 46 && n.sweetness <= 44 && n.projectSense <= 60, 'roommate-mode']
  ]);

  if (strongTrigger === 'sticky-love' && lowSweetFunctional) return null;
  if (strongTrigger === 'blind-box' && stableLongTerm) return null;

  return strongTrigger;
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
