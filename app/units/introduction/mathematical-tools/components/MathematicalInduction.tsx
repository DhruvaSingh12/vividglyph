import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function MathematicalInduction() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Mathematical Induction</h2>
          <p className="text-lg mb-6">
            Mathematical induction is a powerful proof technique that allows us to prove that a statement holds for all 
            natural numbers. It's particularly useful in algorithm analysis for proving correctness and establishing 
            time complexity bounds.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">The Principle of Mathematical Induction</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Mathematical induction consists of two key steps:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Base Case:</strong> Prove that the statement holds for the smallest value 
                (usually n = 0 or n = 1).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Inductive Step:</strong> Assume the statement holds for some k ≥ base case, 
                then prove it must also hold for k+1.
              </li>
            </ul>
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                If both steps are proven, then the statement is true for all natural numbers greater than or equal to 
                the base case.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Strong Induction</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Strong induction is a variant where:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Base Case:</strong> Same as in standard induction.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Inductive Step:</strong> Assume the statement holds for <em>all</em> values 
                from the base case up to some k, then prove it holds for k+1.
              </li>
            </ul>
            <p className="mt-4">
              Strong induction is particularly useful for analyzing algorithms where the solution to a problem 
              of size n depends on solutions to problems of multiple smaller sizes.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications in Algorithm Analysis</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Mathematical induction is commonly used in algorithms for:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Correctness Proofs</h4>
                <p>Proving that an algorithm produces the correct output for all valid inputs regardless of size.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Time Complexity Analysis</h4>
                <p>Establishing upper and lower bounds on the time complexity of recursive algorithms.</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Recursive Algorithm Verification</h4>
                <p>Verifying that recursive algorithms terminate and produce correct results.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Loop Invariant Proofs</h4>
                <p>Establishing and proving loop invariants that hold throughout algorithm execution.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                When analyzing recursive algorithms, induction provides a natural framework for reasoning about
                the algorithm's behavior for inputs of all sizes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}