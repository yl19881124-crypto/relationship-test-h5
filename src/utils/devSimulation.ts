import { QUESTIONS } from '../data/questions';
import { evaluateAnswers } from './evaluator';

const optionPool = QUESTIONS.map((q) => q.options.map((o) => o.id));

const personas: Array<{ name: string; weights: Record<string, number> }> = [
  { name: 'high_sweet', weights: { A: 4, B: 3, C: 1, D: 1, E: 1, F: 1 } },
  { name: 'blind_box', weights: { D: 4, C: 2, B: 2, A: 1, E: 2, F: 1 } },
  { name: 'steady_partner', weights: { A: 3, B: 3, C: 2, D: 1, E: 1, F: 1 } },
  { name: 'caregiver', weights: { C: 3, D: 3, B: 2, A: 1, E: 1, F: 1 } }
];

const seededRandom = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const pickWeighted = (ids: string[], weights: Record<string, number>, rand: () => number) => {
  const weighted = ids.map((id) => ({ id, w: weights[id] ?? 1 }));
  const total = weighted.reduce((sum, item) => sum + item.w, 0);
  let cursor = rand() * total;
  for (const item of weighted) {
    cursor -= item.w;
    if (cursor <= 0) return item.id;
  }
  return weighted[weighted.length - 1].id;
};

export const runDevSimulation = (size = 20) => {
  const rand = seededRandom(20260429);
  const counts: Record<string, number> = {};

  for (let i = 0; i < size; i += 1) {
    const persona = personas[i % personas.length];
    const answers: Record<number, string> = {};
    QUESTIONS.forEach((q, idx) => {
      answers[q.id] = pickWeighted(optionPool[idx], persona.weights, rand);
    });
    const result = evaluateAnswers(answers).resultId;
    counts[result] = (counts[result] ?? 0) + 1;
  }

  return counts;
};

