import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Introduction to Recursion Trees</h2>
          <p className="text-lg mb-6">
            Recursion trees are visual tools used to analyze the time complexity of recursive algorithms. They provide
            an intuitive way to understand how the work is distributed across different recursive calls, making them
            invaluable for solving recurrence relations and gaining insight into an algorithm's behavior.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Why Use Recursion Trees?</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Recursion trees offer several advantages when analyzing algorithms:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Visualization:</strong> They provide a visual representation of 
                recursive calls, making abstract concepts more concrete and easier to understand.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Intuition:</strong> They help develop an intuition for how work 
                is distributed across different levels of recursion.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Flexibility:</strong> They can be applied to a wide range of recursive 
                algorithms, including those that don't fit the standard form required by the Master Theorem.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Guidance:</strong> They can guide the initial guess when using 
                the substitution method to solve recurrence relations.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">What is a Recursion Tree?</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              A recursion tree is a tree where:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Each node</strong> represents a subproblem in the recursive algorithm.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">The value inside a node</strong> represents the amount of work done at that level, 
                excluding recursive calls.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Edges</strong> connect a problem to its subproblems.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">The root</strong> represents the original problem.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Leaf nodes</strong> represent base cases where recursion stops.
              </li>
            </ul>
            <p className="mt-4">
              To analyze a recurrence relation using a recursion tree, we:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>Draw the tree structure based on the recurrence relation</li>
              <li>Calculate the cost at each level of the tree</li>
              <li>Sum up the costs across all levels to get the total time complexity</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When to Use Recursion Trees</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              Recursion trees are particularly useful in the following scenarios:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Complex Recurrences</h4>
                <p>When analyzing recurrences that don't fit the standard form required by the Master Theorem.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Uneven Subproblems</h4>
                <p>When subproblems have different sizes, like T(n) = T(n/3) + T(2n/3) + O(n).</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Educational Purposes</h4>
                <p>To help visualize and understand the behavior of recursive algorithms.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Initial Analysis</h4>
                <p>To get an initial insight before using more formal methods like substitution.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                Recursion trees provide valuable insight into algorithm behavior, but for formal proofs, the results often 
                need to be verified using the substitution method or other formal techniques.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Types of Recurrence Relations</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Recursion trees can help analyze various types of recurrence relations:</p>
            
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Divide-and-Conquer:</strong> T(n) = aT(n/b) + f(n), such as merge sort or binary search.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Variable-Size Subproblems:</strong> T(n) = T(n-a) + T(n-b) + f(n), such as some dynamic programming algorithms.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Uneven Division:</strong> T(n) = T(αn) + T((1-α)n) + f(n), such as quicksort's average case.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Multiple Recursive Calls:</strong> T(n) = T(n-1) + T(n-2) + ... + T(1) + f(n), such as exhaustive search algorithms.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}