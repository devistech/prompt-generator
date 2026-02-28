export interface OptimizedPrompt {
  role: string;
  objective: string;
  context: string;
  requirements: string[];
  outputFormat: string;
  constraints: string[];
}

export interface AnalysisResult {
  needsClarification: boolean;
  questions: string[];
  optimizedPrompt: OptimizedPrompt | null;
  explanation: string;
}

export type AppState = "IDLE" | "PROCESSING" | "CLARIFY" | "OUTPUT";
