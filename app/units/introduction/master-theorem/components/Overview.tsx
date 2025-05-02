import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Introduction to the Master Theorem</h2>
          <p className="text-lg mb-6">
            The Master Theorem is a powerful tool for solving recurrence relations that arise in the analysis of
            divide-and-conquer algorithms. It provides a straightforward method to determine the asymptotic time
            complexity of many recursive algorithms without going through the complex process of solving the recurrence
            relation from first principles.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Why the Master Theorem is Important</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">The Master Theorem offers several advantages in algorithm analysis:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Simplicity:</strong> It provides a direct formula for solving
                certain types of recurrence relations without requiring complex mathematical manipulations.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Standardization:</strong> It creates a standardized approach to
                analyzing a wide range of divide-and-conquer algorithms.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Efficiency:</strong> It saves time by avoiding the need to solve
                recurrences from scratch for each new algorithm.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Pattern Recognition:</strong> It helps identify patterns in algorithmic
                behavior based on the structure of the recurrence relation.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">The General Form of Recurrences</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              The Master Theorem applies to recurrence relations of the form:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">T(n) = aT(n/b) + f(n)</p>
            </div>
            <p className="mb-4">Where:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">T(n):</strong> The time complexity function we're trying to determine
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">a:</strong> The number of subproblems in the recursion
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">b:</strong> The factor by which the subproblem size is reduced
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">f(n):</strong> The cost of dividing the problem and combining the results
              </li>
            </ul>
            <p className="mt-4">
              This form captures the essence of divide-and-conquer algorithms, where a problem of size n is divided into a subproblems
              of size n/b, and the cost of dividing and combining is described by f(n).
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When Can We Apply the Master Theorem?</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              The Master Theorem can be applied when the recurrence relation satisfies the following conditions:
            </p>
            
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Form Match:</strong> The recurrence must be in the form T(n) = aT(n/b) + f(n)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Regularity:</strong> The subproblems must be of equal size
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">a ≥ 1 and b &gt; 1:</strong> There must be at least one subproblem, and the size reduction must be meaningful
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Behavior of f(n):</strong> The function f(n) must be asymptotically positive and either polynomial, logarithmic, or a combination
              </li>
            </ul>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                While the Master Theorem is powerful, not all recurrence relations can be solved using it. Some recurrences
                fall outside its scope and require alternative methods such as the recursion tree method or substitution method.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Algorithms Analyzed with the Master Theorem</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Many classic algorithms can be analyzed using the Master Theorem:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Binary Search</h4>
                <p className="mb-2">T(n) = T(n/2) + O(1)</p>
                <p>Solution: T(n) = O(log n)</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Merge Sort</h4>
                <p className="mb-2">T(n) = 2T(n/2) + O(n)</p>
                <p>Solution: T(n) = O(n log n)</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Strassen's Matrix Multiplication</h4>
                <p className="mb-2">T(n) = 7T(n/2) + O(n²)</p>
                <p>Solution: T(n) = O(n^log₂7) ≈ O(n^2.81)</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Karatsuba's Integer Multiplication</h4>
                <p className="mb-2">T(n) = 3T(n/2) + O(n)</p>
                <p>Solution: T(n) = O(n^log₂3) ≈ O(n^1.58)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}