import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Why Prove Algorithm Correctness?</h2>
          <p className="text-lg mb-6">
            Proving that an algorithm is correct is a fundamental aspect of algorithm design. Without a proof of
            correctness, we cannot be certain that an algorithm will produce the correct output for all valid
            inputs. Even if an algorithm appears to work correctly on test cases, hidden bugs or edge cases may
            exist that could cause the algorithm to fail in certain scenarios.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Components of Algorithm Correctness</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">A complete proof of correctness typically addresses the following aspects:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Termination:</strong> The algorithm must eventually stop for all valid inputs (i.e., it
                doesn't run forever).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Partial Correctness:</strong> If the algorithm terminates, it produces the correct output.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Total Correctness:</strong> The combination of termination and partial correctness.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Approaches to Proving Correctness</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Several mathematical techniques can be used to prove algorithm correctness. The most common approaches
              include:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Direct Proof:</strong> Directly show that the algorithm produces the correct result by
                tracing through its execution.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Mathematical Induction:</strong> Prove a base case and then show that if the algorithm works
                for some input size n, it also works for input size n+1.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Loop Invariants:</strong> Identify properties that remain true before, during, and after
                each iteration of a loop.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Contradiction:</strong> Assume the algorithm is incorrect and derive a contradiction.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">The Importance of Preconditions and Postconditions</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">When proving algorithm correctness, it's essential to clearly define:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Preconditions</h4>
                <p>Conditions that must be true before the algorithm executes.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Postconditions</h4>
                <p>Conditions that must be true after the algorithm completes.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                The proof of correctness demonstrates that if the preconditions are satisfied, the algorithm will
                terminate with the postconditions satisfied.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}