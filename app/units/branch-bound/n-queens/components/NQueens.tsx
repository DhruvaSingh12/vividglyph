"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNQueens } from "./useNQueens"
import { NQueensVisualizer } from "./n-queens-visualizer"
import { NQueensSolutionsView } from "./NQueensSolutionsView"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

// Code sample to display in the code block
const nQueensCode = `function solveNQueens(n) {
  const solutions = [];
  const board = Array(n).fill(-1);
  
  // Place queens row by row
  solveBacktrack(board, 0, solutions);
  return solutions;
}

function solveBacktrack(board, row, solutions) {
  const n = board.length;
  
  // Base case: If all queens are placed, we found a solution
  if (row === n) {
    solutions.push([...board]);
    return;
  }
  
  // Try placing a queen in each column of the current row
  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      // Place the queen
      board[row] = col;
      
      // Recursively place rest of the queens
      solveBacktrack(board, row + 1, solutions);
      
      // Backtrack: remove the queen to try other positions
      board[row] = -1;
    }
  }
}

function isSafe(board, row, col) {
  for (let i = 0; i < row; i++) {
    // Check if same column or diagonal
    if (
      board[i] === col ||             // Same column
      board[i] - i === col - row ||   // Same diagonal (/)
      board[i] + i === col + row      // Same diagonal (\\)
    ) {
      return false;
    }
  }
  return true;
}`

export function NQueens() {
    const nQueens = useNQueens(6);
    const currentStep = nQueens.steps[nQueens.currentStep];

    // Update to use 8 solutions per page
    const solutionsPerPage = 8;
    const startIdx = (nQueens.currentPage - 1) * solutionsPerPage;

    return (
        <div className="space-y-6">
            <Card className="w-full">
                <CardContent className="pt-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-medium mb-2">Interactive N-Queens Problem</h3>
                        <p className="text-muted-foreground">
                            Set the board size and visualize how the backtracking algorithm solves the N-Queens problem step by step.
                        </p>
                    </div>

                    {nQueens.steps.length > 0 && (
                        <div className="space-y-6 mt-4">
                            <Tabs defaultValue="visualization">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="visualization">Step-by-Step Visualization</TabsTrigger>
                                    <TabsTrigger value="solutions">All Solutions ({nQueens.totalSolutions})</TabsTrigger>
                                </TabsList>
                                {/* Inline board size selector and Visualize button */}
                                <div className="flex justify-center items-center gap-4 mb-3">
                                    <Select
                                        value={nQueens.inputSize}
                                        onValueChange={nQueens.handleInputChange}
                                    >
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[4, 5, 6, 7, 8, 9, 10].map(size => (
                                                <SelectItem key={size} value={size.toString()}>
                                                    {size}×{size}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={nQueens.handleVisualize}>Visualize</Button>
                                </div>
                                <TabsContent value="visualization">
                                    <div className="mb-2">

                                        <div className="flex justify-center w-full">
                                            <div className="w-full max-w-lg">
                                                <NQueensVisualizer
                                                    size={nQueens.boardSize}
                                                    queens={currentStep?.board || Array(nQueens.boardSize).fill(-1)}
                                                    currentRow={currentStep?.currentRow || -1}
                                                    message={currentStep?.message || ""}
                                                />
                                            </div>
                                        </div>
                                        {/* Inlined step & navigation controls below visualization */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="text-sm text-muted-foreground">
                                                Step {nQueens.currentStep + 1} of {nQueens.steps.length}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm mr-2">Speed:</div>
                                                <Slider
                                                    value={[nQueens.speed]}
                                                    min={0.5}
                                                    max={5}
                                                    step={0.5}
                                                    onValueChange={nQueens.handleSpeedChange}
                                                    className="w-32"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-2 mt-6">
                                            <Button variant="outline" onClick={nQueens.handleReset} disabled={nQueens.currentStep === 0}>
                                                Reset
                                            </Button>
                                            <Button variant="outline" onClick={nQueens.handlePrevious} disabled={nQueens.currentStep === 0}>
                                                Previous
                                            </Button>
                                            <Button onClick={nQueens.handleAutoPlay}>
                                                {nQueens.isPlaying ? "Pause" : "Auto Play"}
                                            </Button>
                                            <Button variant="outline" onClick={nQueens.handleNext} disabled={nQueens.currentStep === nQueens.steps.length - 1}>
                                                Next
                                            </Button>
                                        </div>
                                        {nQueens.solutions.length > 1 && currentStep?.type === "final" && (
                                            <div className="flex justify-center mt-4">
                                                <Button onClick={nQueens.handleNextSolution}>
                                                    Show Next Solution ({nQueens.currentSolution + 1}/{nQueens.solutions.length})
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="solutions">
                                    <NQueensSolutionsView
                                        boardSize={nQueens.boardSize}
                                        isGenerating={nQueens.isGeneratingAllSolutions}
                                        totalSolutions={nQueens.totalSolutions}
                                        currentPage={nQueens.currentPage}
                                        totalPages={nQueens.totalPages}
                                        solutions={nQueens.currentPageSolutions}
                                        handlePrevPage={nQueens.handlePrevPage}
                                        handleNextPage={nQueens.handleNextPage}
                                        startIndex={startIdx}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                    )}
                </CardContent>
            </Card>

            <DynamicCodeBlock
                code={nQueensCode}
                language="javascript"
                title="N-Queens Algorithm"
                timeComplexity="O(N!) - Factorial time complexity in worst case"
                spaceComplexity="O(N) - For storing the board state"
            />
        </div>
    )
}