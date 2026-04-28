export type DimensionKey =
  | 'care'
  | 'intimacy'
  | 'stability'
  | 'obsession'
  | 'chemistry'
  | 'progress'
  | 'sweetness'
  | 'drain'
  | 'initiativeGap'
  | 'projectSense'
  | 'certainty'
  | 'expression'
  | 'resilience'
  | 'toughMouth';

export interface OptionConfig {
  id: string;
  label: string;
  text: string;
  scores: Partial<Record<DimensionKey, number>>;
}

export interface QuestionConfig {
  id: number;
  title: string;
  options: OptionConfig[];
}

export interface ResultContent {
  id: string;
  name: string;
  subtitle: string;
  freePreview: string;
  teaser: string;
  duoRoles: string;
  oneLineHit: string;
  fullExplanation: string;
  hiddenIssue: string;
  actionAdvice: string;
  posterCopy: string;
  posterVisual: string;
}

export interface ScoreSnapshot {
  normalized: Record<DimensionKey, number>;
  raw: Record<DimensionKey, number>;
}

export interface EvaluationResult {
  resultId: string;
  snapshot: ScoreSnapshot;
}
