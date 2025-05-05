"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Explainer() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">How the N-Queens Algorithm Works</h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Walkthrough</h3>

          <p>
            The N-Queens problem is solved using backtracking, a type of branch and bound algorithm that systematically 
            explores all potential solutions by building candidates incrementally and abandoning a candidate as soon 
            as it determines the candidate cannot lead to a valid solution.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Process</h3>
          
          <div className="pl-4 mb-8">
            <ol className="space-y-6 list-decimal">
              <li>
                <strong className="text-primary">Setup:</strong>
                <p>
                  Start with an empty N×N chessboard. We'll represent our solution using an array where 
                  each index represents a row, and the value at that index represents the column where a queen is placed.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-48">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}></div>
                    ))}
                  </div>
                  <div className="mt-1 text-sm">Empty 4×4 chessboard</div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Row-by-Row Placement:</strong>
                <p>
                  We place queens row by row, starting from the first row (row 0). For each row, we try to place a queen in each column.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-48">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                        {i === 0 && <span className="text-2xl">♛</span>}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 text-sm">First queen placed at row 0, column 0</div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Checking Validity:</strong>
                <p>
                  For each placement, we check if it's safe to place a queen by ensuring it doesn't conflict with any previously placed queens.
                  A queen conflicts if it shares the same row, column, or diagonal with another queen.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2">
                  <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-48">
                    {[...Array(16)].map((_, i) => {
                      const row = Math.floor(i / 4);
                      const col = i % 4;
                      // Mark threatened positions for a queen at (0,0)
                      const isThreatenedByQueen = 
                        row === 0 || // same row
                        col === 0 || // same column
                        row === col || // diagonal
                        row + col === 0; // other diagonal
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            flex items-center justify-center 
                            ${(row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} 
                            ${isThreatenedByQueen && i !== 0 ? 'bg-red-500/40' : ''}
                            w-full h-full
                          `}
                        >
                          {i === 0 && <span className="text-2xl">♛</span>}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-1 text-sm">Red cells show positions threatened by the queen at (0,0)</div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Recursive Placement:</strong>
                <p>
                  If a safe position is found in the current row, we place a queen there and recursively try to place queens in the next row.
                  If no safe position exists in a row, we backtrack to the previous row and try a different column.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="flex flex-wrap justify-center gap-4">
                    <div>
                      <div className="grid grid-cols-4 gap-0.5 mx-auto w-32 h-32">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                            {i === 0 && <span className="text-xl">♛</span>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-sm">Step 1: Queen at (0,0)</div>
                    </div>
                    
                    <div>
                      <div className="grid grid-cols-4 gap-0.5 mx-auto w-32 h-32">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                            {i === 0 && <span className="text-xl">♛</span>}
                            {i === 6 && <span className="text-xl">♛</span>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-sm">Step 2: Queen at (1,2)</div>
                    </div>
                    
                    <div>
                      <div className="grid grid-cols-4 gap-0.5 mx-auto w-32 h-32">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full bg-yellow-300/40`}>
                            {i === 0 && <span className="text-xl">♛</span>}
                            {i === 6 && <span className="text-xl">♛</span>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-sm">Step 3: No safe position in row 2!</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <div>
                      <div className="grid grid-cols-4 gap-0.5 mx-auto w-32 h-32">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                            {i === 0 && <span className="text-xl">♛</span>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-sm">Step 4: Backtrack to row 1</div>
                    </div>
                    
                    <div>
                      <div className="grid grid-cols-4 gap-0.5 mx-auto w-32 h-32">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`flex items-center justify-center ${(Math.floor(i / 4) + i % 4) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                            {i === 0 && <span className="text-xl">♛</span>}
                            {i === 7 && <span className="text-xl">♛</span>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 text-sm">Step 5: Try queen at (1,3)</div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Backtracking:</strong>
                <p>
                  When we can't place a queen in a row, we backtrack to the previous row and try the next possible position.
                  This process continues until we either find a solution or exhaust all possibilities.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-red-500/50 rounded-md flex items-center justify-center mb-2">X</div>
                    <div className="text-sm">No valid position found</div>
                    <div className="h-8 flex items-center">
                      <svg className="w-6 h-6 rotate-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="w-8 h-8 border border-dashed rounded-md flex items-center justify-center mb-2">
                      <span className="text-sm">Row-1</span>
                    </div>
                    <div className="text-sm">Backtrack to previous row</div>
                    <div className="h-8 flex items-center">
                      <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="w-8 h-8 bg-green-500/50 rounded-md flex items-center justify-center mb-2">✓</div>
                    <div className="text-sm">Try next position</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Solution Found:</strong>
                <p>
                  Once we successfully place queens in all N rows without conflicts, we've found a valid solution to the N-Queens problem.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-48">
                    {[...Array(16)].map((_, i) => {
                      const row = Math.floor(i / 4);
                      const col = i % 4;
                      // A valid solution for 4-Queens
                      const hasQueen = 
                        (row === 0 && col === 1) || 
                        (row === 1 && col === 3) || 
                        (row === 2 && col === 0) || 
                        (row === 3 && col === 2);
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            flex items-center justify-center 
                            ${(row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} 
                            w-full h-full
                          `}
                        >
                          {hasQueen && <span className="text-2xl">♛</span>}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-1 text-sm">A valid solution for the 4-Queens problem</div>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">The Backtracking Process</h3>
          <p className="mb-4">
            Backtracking is the key to solving the N-Queens problem efficiently. Let's look at how it works in detail:
          </p>
          
          <div className="bg-muted/30 p-4 rounded-md mt-4 mb-6">
            <h4 className="font-medium mb-2">Backtracking Example for 4-Queens</h4>
            
            <div className="space-y-3 mt-4">
              <div>
                <div className="text-sm mb-1">1. Place a queen in the first position of the first row (0,0)</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                      {i === 0 && <span className="text-xl">♛</span>}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Try to place a queen in row 1 (current state: [0, ?, ?, ?])</div>
              </div>
              
              <div>
                <div className="text-sm mb-1">2. Column 0 and 1 are threatened in row 1, try column 2 (0,2)</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 1 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                      {i === 2 && <span className="text-xl">♛</span>}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Current state: [0, 2, ?, ?]</div>
              </div>

              <div>
                <div className="text-sm mb-1">3. Try to place a queen in row 2, but all positions are threatened!</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full bg-red-300/30`}>
                      <span className="text-xl text-red-500">✗</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Backtrack to row 1 and try a different position</div>
              </div>
              
              <div>
                <div className="text-sm mb-1">4. Try column 3 in row 1 (1,3)</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 1 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                      {i === 3 && <span className="text-xl">♛</span>}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Current state: [0, 3, ?, ?]</div>
              </div>

              <div>
                <div className="text-sm mb-1">5. Try to place a queen in row 2, valid position at (2,1)</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full`}>
                      {i === 1 && <span className="text-xl">♛</span>}
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Current state: [0, 3, 1, ?]</div>
              </div>

              <div>
                <div className="text-sm mb-1">6. No safe position in row 3, backtrack to row 2</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-12">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`flex items-center justify-center ${i % 2 === 1 ? 'bg-amber-100' : 'bg-amber-800'} w-full h-full bg-red-300/30`}>
                      <span className="text-xl text-red-500">✗</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm mt-1">Backtrack...</div>
              </div>

              <div>
                <div className="text-sm mb-1">7. After multiple backtracks and attempts, find valid solution [1,3,0,2]</div>
                <div className="grid grid-cols-4 gap-0.5 mx-auto w-48 h-48">
                  {[...Array(16)].map((_, i) => {
                    const row = Math.floor(i / 4);
                    const col = i % 4;
                    // Final solution
                    const hasQueen = 
                      (row === 0 && col === 1) || 
                      (row === 1 && col === 3) || 
                      (row === 2 && col === 0) || 
                      (row === 3 && col === 2);
                    
                    return (
                      <div 
                        key={i} 
                        className={`
                          flex items-center justify-center 
                          ${(row + col) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'} 
                          w-full h-full
                        `}
                      >
                        {hasQueen && <span className="text-xl">♛</span>}
                      </div>
                    )
                  })}
                </div>
                <div className="text-sm mt-1">Final solution: [1,3,0,2]</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Analysis</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Time Complexity</h4>
              <ul className="space-y-2">
                <li><strong>Worst Case:</strong> O(N!) - In the worst case, we would try all possible combinations</li>
                <li><strong>Average Case:</strong> O(N!) - But with optimized constraints, it performs much better in practice</li>
                <li><strong>Best Case:</strong> O(N) - If we get lucky with our first placement attempts</li>
              </ul>
              <p className="mt-3 text-sm">
                The backtracking approach significantly reduces the search space compared to trying all permutations.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Space Complexity</h4>
              <ul className="space-y-2">
                <li><strong>O(N)</strong> - We use an array of length N to store the queen positions</li>
                <li><strong>O(N)</strong> - Additional space for the recursion call stack</li>
                <li>Efficient compared to storing the full N×N board</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Advantages and Disadvantages</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium mb-2 text-green-500">Advantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Memory efficient - only stores queen positions</li>
                <li>Early pruning of invalid paths reduces search space</li>
                <li>Can find all possible solutions by continuing the search</li>
                <li>Simple to implement compared to other approaches</li>
                <li>Can be extended to solve similar constraint problems</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2 text-red-500">Disadvantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Exponential time complexity in worst case</li>
                <li>Performance degrades rapidly as N increases</li>
                <li>Not parallelizable in its basic form</li>
                <li>Difficult to predict runtime for specific cases</li>
                <li>May exhaust stack space for very large N due to recursion</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Optimizations</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Symmetry breaking</strong>: Reduce search space by exploiting board symmetries</li>
            <li><strong>Bit manipulation</strong>: Use bitwise operations to track attacked squares efficiently</li>
            <li><strong>Iterative deepening</strong>: Combine with breadth-first search for better performance</li>
            <li><strong>Constraint propagation</strong>: Pre-compute invalid positions to avoid unnecessary checks</li>
            <li><strong>Heuristic ordering</strong>: Try more promising columns first for potential early solutions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}