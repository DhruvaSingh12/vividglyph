import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function TreeConstruction() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Building and Analyzing Recursion Trees</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Step-by-Step Construction Process</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Building a recursion tree involves systematically breaking down the recurrence relation into a visual tree structure:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 1: Create the Root Node</h4>
              <p>Start with the original problem size n and the work done at this level, excluding recursive calls.</p>
              <p className="mt-2 italic">For example, for T(n) = 2T(n/2) + n, the root node represents work of size n.</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 2: Create Child Nodes</h4>
              <p>For each recursive call in the recurrence relation, create a child node:</p>
              <ul className="list-disc list-inside mt-2">
                <li>For T(n) = 2T(n/2) + n, create two child nodes, each with problem size n/2</li>
                <li>For T(n) = T(n-1) + n, create one child node with problem size n-1</li>
                <li>For T(n) = T(n/3) + T(2n/3) + n, create two child nodes with sizes n/3 and 2n/3</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 3: Repeat Until Base Cases</h4>
              <p>Continue the process for each child node, creating its children based on the recurrence relation.</p>
              <p className="mt-2">Stop when you reach the base cases of the recursion or when the pattern becomes clear.</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 4: Label Each Node</h4>
              <p>Label each node with:</p>
              <ul className="list-disc list-inside mt-2">
                <li>The problem size (e.g., n, n/2, n/4)</li>
                <li>The work done at that node, excluding recursive calls</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Analyzing the Completed Tree</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Once you've built the recursion tree, analyze it to determine the overall time complexity:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 1: Calculate Work at Each Level</h4>
              <p>Sum up the work done by all nodes at each level of the tree:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Level 0 (root): Work done at the root node</li>
                <li>Level 1: Sum of work done by all children of the root</li>
                <li>Level 2: Sum of work done by all grandchildren of the root</li>
                <li>And so on...</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 2: Identify the Pattern</h4>
              <p>Look for patterns in the amount of work done at each level:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Does the work increase, decrease, or stay constant across levels?</li>
                <li>Is there a geometric or arithmetic progression?</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 3: Determine Tree Height</h4>
              <p>Calculate the height of the tree (number of levels):</p>
              <ul className="list-disc list-inside mt-2">
                <li>For divide-and-conquer with n/b reduction: approximately log<sub>b</sub>n levels</li>
                <li>For subtraction with fixed k: approximately n/k levels</li>
                <li>For uneven division: often determined by the largest subproblem</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Step 4: Calculate Total Work</h4>
              <p>Sum up the work across all levels to get the total time complexity.</p>
              <p className="mt-2">Use the appropriate summation technique based on the pattern:</p>
              <ul className="list-disc list-inside mt-2">
                <li>For geometric series (r ≠ 1): Sum from i=0 to n-1 of ar<sup>i</sup> = a(1-r<sup>n</sup>)/(1-r)</li>
                <li>For constant work per level: Height of tree × Work per level</li>
                <li>For arithmetic series: Sum from i=1 to n of i = n(n+1)/2</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Tree Patterns and Time Complexity</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Different tree structures lead to different time complexity patterns:
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Decreasing Work at Each Level</h4>
                <p className="mb-2">When the total work decreases with each level:</p>
                <ul className="list-disc list-inside">
                  <li>Most work is done at the root</li>
                  <li>Time complexity is dominated by the work at the first level</li>
                  <li>Example: T(n) = T(n/2) + 1 → O(log n)</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Constant Work at Each Level</h4>
                <p className="mb-2">When the total work is the same at each level:</p>
                <ul className="list-disc list-inside">
                  <li>Time complexity is the height of the tree × work per level</li>
                  <li>Example: T(n) = 2T(n/2) + n → O(n log n)</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Increasing Work at Each Level</h4>
                <p className="mb-2">When the total work increases with each level:</p>
                <ul className="list-disc list-inside">
                  <li>Most work is done at the leaves</li>
                  <li>Time complexity is dominated by the work at the bottom level</li>
                  <li>Example: T(n) = 4T(n/2) + n → O(n²)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Handling Special Cases</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              Some recurrence relations require special handling when building recursion trees:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Non-Integer Subproblem Sizes</h4>
              <p>For recurrences like T(n) = T(n/2) + n where n might not be a power of 2:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Use floor or ceiling functions: T(n) = T(⌊n/2⌋) + n</li>
                <li>For asymptotic analysis, the floors/ceilings often don't affect the final complexity</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Variable Subproblem Counts</h4>
              <p>For recurrences like QuickSort's worst case T(n) = T(n-1) + T(0) + n:</p>
              <ul className="list-disc list-inside mt-2">
                <li>The tree becomes highly unbalanced</li>
                <li>One branch may extend much deeper than others</li>
                <li>Focus on the longest path in the tree for upper bounds</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                When the recursion tree becomes too complex for direct analysis, it often serves as a good starting point 
                to form a hypothesis about the time complexity, which can then be verified using the substitution method.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}