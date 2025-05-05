export interface NQueensStep {
  board: number[];
  currentRow: number;
  message: string;
  type: "initial" | "exploring" | "trying" | "placed" | "invalid" | "backtrack" | "backtrack-row" | "solution" | "final";
}

export interface NQueensResult {
  steps: NQueensStep[];
  solutions: number[][];
  totalCount: number; 
}