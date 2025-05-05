import { NQueensStep, NQueensResult } from "./NQueensTypes";

// Check if a queen placement is valid
export function isSafe(board: number[], row: number, col: number): boolean {
  for (let i = 0; i < row; i++) {
    // Check if queens are in same column or diagonal
    if (
      board[i] === col || // Same column
      board[i] - i === col - row || // Same diagonal
      board[i] + i === col + row // Same diagonal
    ) {
      return false;
    }
  }
  return true;
}

// Recursive function to solve N-Queens with step tracking
export function solveNQueensWithSteps(
  board: number[],
  row: number,
  steps: NQueensStep[],
  solutions: number[][],
  maxStepSolutions: number = 4
): boolean {
  const n = board.length;

  // If all queens are placed, we've found a solution
  if (row === n) {
    solutions.push([...board]);
    steps.push({
      board: [...board],
      currentRow: -1,
      message: `Solution found! All ${n} queens have been placed without conflicts.`,
      type: "solution"
    });
    return true;
  }

  // Try placing queen in each column of the current row
  steps.push({
    board: [...board],
    currentRow: row,
    message: `Trying to place a queen in row ${row + 1}`,
    type: "exploring"
  });

  for (let col = 0; col < n; col++) {
    // Show trying a column
    steps.push({
      board: [...board.slice(0, row), col, ...Array(n - row - 1).fill(-1)],
      currentRow: row,
      message: `Trying queen at position (${row + 1}, ${col + 1})`,
      type: "trying"
    });

    // Check if this position is safe
    if (isSafe(board, row, col)) {
      // Place the queen
      board[row] = col;
      
      steps.push({
        board: [...board],
        currentRow: row,
        message: `Placed queen at (${row + 1}, ${col + 1})`,
        type: "placed"
      });

      // Recursively place rest of the queens
      if (solveNQueensWithSteps(board, row + 1, steps, solutions, maxStepSolutions)) {
        // For visualization, we'll find a limited number of solutions to keep step count manageable
        if (solutions.length >= maxStepSolutions) {
          return true;
        }
      }

      // If placing queen doesn't lead to a solution, backtrack
      board[row] = -1;
      
      steps.push({
        board: [...board],
        currentRow: row,
        message: `Backtracking from (${row + 1}, ${col + 1}) as it doesn't lead to a solution`,
        type: "backtrack"
      });
    } else {
      steps.push({
        board: [...board],
        currentRow: row,
        message: `Position (${row + 1}, ${col + 1}) is under attack, cannot place queen here`,
        type: "invalid"
      });
    }
  }

  // If no column worked in this row
  steps.push({
    board: [...board],
    currentRow: row - 1,
    message: `No safe position found in row ${row + 1}, backtracking to row ${row}`,
    type: "backtrack-row"
  });

  return false;
}

// Function to generate N-Queens steps for visualization
export function generateNQueensSteps(n: number): NQueensResult {
  const steps: NQueensStep[] = [];
  const board = Array(n).fill(-1); // Initialize board with all -1 (no queens)
  const solutions: number[][] = [];

  // Add initial state
  steps.push({
    board: [...board],
    currentRow: -1,
    message: `Starting N-Queens problem with ${n}×${n} board`,
    type: "initial"
  });

  // Solve N-Queens and track steps
  solveNQueensWithSteps(board, 0, steps, solutions);

  // Get the total count
  const totalCount = QUEEN_SOLUTION_COUNTS[n] || 0;

  // If we found solutions, add a final step showing the first solution
  if (solutions.length > 0) {
    steps.push({
      board: [...solutions[0]],
      currentRow: -1,
      message: `Found ${totalCount} solution(s) to the ${n}-Queens problem! Displaying ${solutions.length} for visualization.`,
      type: "final"
    });
  } else {
    steps.push({
      board: [...board],
      currentRow: -1,
      message: `No solution found for ${n}-Queens problem.`,
      type: "final"
    });
  }

  return { steps, solutions, totalCount };
}

// Pre-computed solution counts for N-Queens problems (1 to 10)
export const QUEEN_SOLUTION_COUNTS: Record<number, number> = {
  1: 1,
  2: 0,
  3: 0,
  4: 2,
  5: 10,
  6: 4,
  7: 40,
  8: 92,
  9: 352,
  10: 724
};

// Function to find all N-Queens solutions without tracking steps
export function solveNQueens(board: number[], row: number, solutions: number[][]): void {
  const n = board.length;

  // Base case: If all queens are placed, we found a solution
  if (row === n) {
    solutions.push([...board]);
    return;
  }

  // Try placing queen in each column of the current row
  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      // Place the queen
      board[row] = col;
      
      // Recursively place rest of the queens
      solveNQueens(board, row + 1, solutions);
      
      // Backtrack: remove the queen to try other positions
      board[row] = -1;
    }
  }
}

// Function to generate all solutions for a given board size
export function generateAllSolutions(n: number): { solutions: number[][], total: number } {
  const board = Array(n).fill(-1);
  const solutions: number[][] = [];
  
  // Generate all solutions
  solveNQueens(board, 0, solutions);
  
  return {
    solutions,
    total: QUEEN_SOLUTION_COUNTS[n] || solutions.length
  };
}