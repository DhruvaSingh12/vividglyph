import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Examples() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Recursion Tree Examples</h2>
            <h2 className='text-lg font-normal mb-4'>Recursion trees visually break down recursive calls into structured layers, 
                illustrating how a problem splits into progressively smaller subproblems, 
                continuing this breakdown until reaching simple base cases where direct 
                solutions are possible.</h2>
          <h3 className="text-xl font-semibold mt-10 mb-4">Example 1: Merge Sort Recurrence</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Let's analyze the recurrence relation for Merge Sort using a recursion tree:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Recurrence Relation:</h4>
              <p className="font-mono text-center mb-4">T(n) = 2T(n/2) + cn</p>
              <p className="mb-4">where c is a constant representing the work for dividing and merging.</p>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Tree Construction:</h5>
                <p>The recursion tree for this relation has the following structure:</p>
                <div className="bg-muted/70 p-3 rounded font-mono whitespace-pre text-sm">
{`                    cn             Level 0: 1 node, work = cn
                   /     \\
                c(n/2) c(n/2)      Level 1: 2 nodes, total work = cn
                /  \\    /  \\
               ...  ... ... ...     
                                  
               c(n/4) ... c(n/4)   Level 2: 4 nodes, total work = cn
                ...                 
                                  
                c(1) ... c(1)      Level log₂n: n nodes, total work = cn`}
                </div>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Analysis by Level:</h5>
                <ul className="list-disc list-inside">
                  <li>Level 0: 1 subproblem of size n, work = cn</li>
                  <li>Level 1: 2 subproblems of size n/2, work = 2 × c(n/2) = cn</li>
                  <li>Level 2: 4 subproblems of size n/4, work = 4 × c(n/4) = cn</li>
                  <li>Level i: 2ⁱ subproblems of size n/2ⁱ, work = 2ⁱ × c(n/2ⁱ) = cn</li>
                  <li>Last Level (log₂n): n subproblems of size 1, work = n × c = cn</li>
                </ul>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Total Work Calculation:</h5>
                <p>Total work = Sum of work at all levels</p>
                <p>= cn + cn + cn + ... + cn (log₂n + 1 terms)</p>
                <p>= cn × (log₂n + 1)</p>
                <p>= O(n log n)</p>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Insight:</h5>
                <p>The recursion tree shows that Merge Sort has:</p>
                <ul className="list-disc list-inside">
                  <li>A balanced tree with log₂n + 1 levels</li>
                  <li>Constant work cn at each level</li>
                  <li>Time complexity O(n log n)</li>
                </ul>
                <p className="mt-2">This is an example of a "constant work per level" pattern.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Example 2: Binary Search Recurrence</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Analyzing the recurrence relation for Binary Search:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Recurrence Relation:</h4>
              <p className="font-mono text-center mb-4">T(n) = T(n/2) + c</p>
              <p className="mb-4">where c is a constant representing the comparison work.</p>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Tree Construction:</h5>
                <p>The recursion tree has a single branch decreasing in size by half each time:</p>
                <div className="bg-muted/70 p-3 rounded font-mono whitespace-pre text-sm">
{`                    c         Level 0: 1 node, work = c
                    |
                    c         Level 1: 1 node, work = c
                    |
                    c         Level 2: 1 node, work = c
                    |
                   ...
                    |
                    c         Level log₂n: 1 node, work = c`}
                </div>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Analysis by Level:</h5>
                <ul className="list-disc list-inside">
                  <li>Level 0: 1 subproblem of size n, work = c</li>
                  <li>Level 1: 1 subproblem of size n/2, work = c</li>
                  <li>Level 2: 1 subproblem of size n/4, work = c</li>
                  <li>Level i: 1 subproblem of size n/2ⁱ, work = c</li>
                  <li>Last Level (log₂n): 1 subproblem of size 1, work = c</li>
                </ul>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Total Work Calculation:</h5>
                <p>Total work = Sum of work at all levels</p>
                <p>= c + c + c + ... + c (log₂n + 1 terms)</p>
                <p>= c × (log₂n + 1)</p>
                <p>= O(log n)</p>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Insight:</h5>
                <p>The recursion tree shows that Binary Search has:</p>
                <ul className="list-disc list-inside">
                  <li>A single branch with log₂n + 1 levels</li>
                  <li>Constant work c at each level</li>
                  <li>Time complexity O(log n)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Example 3: Uneven Subproblem Sizes</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              Analyzing a recurrence with uneven subproblem sizes:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Recurrence Relation:</h4>
              <p className="font-mono text-center mb-4">T(n) = T(n/3) + T(2n/3) + n</p>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Tree Construction:</h5>
                <p>This tree has uneven branches - one decreases faster than the other:</p>
                <div className="bg-muted/70 p-3 rounded font-mono whitespace-pre text-sm">
{`                           n                    Level 0: work = n
                         /   \\
                      n/3    2n/3              Level 1: work = n
                     /  \\    /   \\
                  n/9  2n/9 2n/9 4n/9          Level 2: work = n
                  / \\  ...  ...  ...
                ...  ...                       `}
                </div>
                <p className="mt-2">Note: The right branches (with 2n/3 size) grow deeper and dominate the analysis.</p>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Analysis Approach:</h5>
                <p>The uneven nature makes exact counting difficult, but we can bound it:</p>
                <ul className="list-disc list-inside">
                  <li>At each level, the total problem size remains n (all subproblems sum to n)</li>
                  <li>The depth is determined by how quickly we reach the base case</li>
                  <li>The longest path follows the 2n/3 branch each time</li>
                  <li>A problem of size n reaches size 1 after log<sub>3/2</sub>n steps along this path</li>
                </ul>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Total Work Calculation:</h5>
                <p>Each level does work proportional to n</p>
                <p>Total number of levels = O(log n)</p>
                <p>Total work = O(n log n)</p>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <h5 className="font-semibold mb-2">Verification:</h5>
                <p>This can be verified using the substitution method:</p>
                <p>Guess T(n) = O(n log n)</p>
                <p>Then: T(n) = T(n/3) + T(2n/3) + n</p>
                <p>≤ c(n/3)log(n/3) + c(2n/3)log(2n/3) + n</p>
                <p>≤ cn log n + n - c(n/3)log(3) - c(2n/3)log(3/2)</p>
                <p>For a sufficiently large c, this is ≤ cn log n</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}