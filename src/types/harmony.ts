export interface Area {
  id: string;
  letter: string;
  emoji: string;
  name: string;
  mainQuestion: string;
  helpQuestions: string[];
  tools: Array<{
    name: string;
    description: string;
  }>;
  metrics: string[];
  score: number;
  notes: string;
  order: number;
}