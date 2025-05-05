"use client"

import { Button } from "@/components/ui/button"
import { NQueensVisualizer } from "./n-queens-visualizer"
import { useState, useEffect, useRef } from "react"

interface NQueensSolutionsViewProps {
  boardSize: number;
  isGenerating: boolean;
  totalSolutions: number;
  currentPage: number;
  totalPages: number;
  solutions: number[][];
  handlePrevPage: () => void;
  handleNextPage: () => void;
  startIndex: number;
}

export function NQueensSolutionsView({
  boardSize,
  isGenerating,
  totalSolutions,
  currentPage,
  totalPages,
  solutions,
  handlePrevPage,
  handleNextPage,
  startIndex
}: NQueensSolutionsViewProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(4); 
  
  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCols(2); // Mobile - 2 column
      } else if (width < 768) {
        setCols(2); // Small tablet - 2 columns
      } else if (width < 1024) {
        setCols(3); // Tablet - 3 columns
      } else {
        setCols(4); // Desktop - 4 columns for 8 solutions (2 rows)
      }
    };
    
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">All Solutions for {boardSize}-Queens</h3>
      {isGenerating ? (
        <div className="text-center py-8">
          <p className="mb-2">Generating solutions...</p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <>
          {solutions.length > 0 ? (
            <div>
              <div 
                ref={gridRef}
                className="grid gap-2 sm:gap-3"
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`
                }}
              >
                {solutions.map((solution, idx) => (
                  <div key={idx} className="border rounded-md p-2 flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">Solution {startIndex + idx + 1}</p>
                    <div className="w-full">
                      <NQueensVisualizer
                        size={boardSize}
                        queens={solution}
                        currentRow={-1}
                        message=""
                        compact={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center mt-6 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="px-3 py-1 h-auto"
                  >
                    Previous Page
                  </Button>
                  <span className="flex items-center px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 h-auto"
                  >
                    Next Page
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No solutions available.</p>
          )}
        </>
      )}
    </div>
  )
}