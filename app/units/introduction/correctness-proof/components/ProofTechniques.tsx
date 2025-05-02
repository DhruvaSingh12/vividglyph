import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function ProofTechniques() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Proof Techniques for Algorithms</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Loop Invariants</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              A loop invariant is a property that holds true before and after each iteration of a loop. To prove
              correctness using loop invariants, you need to establish three things:
            </p>
            <ol className="space-y-3 mt-6">
              <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">
                <strong className="font-bold text-primary">Initialization:</strong> The loop invariant is true before the first iteration.
              </li>
              <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">
                <strong className="font-bold text-primary">Maintenance:</strong> If the loop invariant is true before an iteration, it remains true
                after the iteration.
              </li>
              <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">
                <strong className="font-bold text-primary">Termination:</strong> When the loop terminates, the invariant, combined with the reason for
                termination, gives us the correct result.
              </li>
            </ol>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Example: Insertion Sort Loop Invariant</h4>
              <div className="space-y-3">
                <p>
                  <strong className="font-medium">Invariant:</strong> At the start of each iteration of the outer loop, the subarray A[0..i-1]
                  consists of the elements originally in A[0..i-1] but in sorted order.
                </p>
                <p>
                  <strong className="font-medium">Initialization:</strong> Before the first iteration (i=1), the subarray A[0..0] consists of
                  just one element, which is trivially sorted.
                </p>
                <p>
                  <strong className="font-medium">Maintenance:</strong> In each iteration, we insert A[i] into its correct position in the
                  sorted subarray A[0..i-1], resulting in a sorted subarray A[0..i].
                </p>
                <p>
                  <strong className="font-medium">Termination:</strong> When the loop terminates (i=n), the entire array A[0..n-1] is sorted.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Mathematical Induction</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              Mathematical induction is a powerful technique for proving that a property holds for all natural
              numbers. In algorithm proofs, it's often used to show that an algorithm works correctly for inputs of
              any size. The proof consists of two steps:
            </p>
            <ol className="space-y-3 mt-6">
              <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">
                <strong className="font-bold text-primary">Base Case:</strong> Prove that the property holds for the smallest input size (often n=0 or
                n=1).
              </li>
              <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">
                <strong className="font-bold text-primary">Inductive Step:</strong> Assume the property holds for some arbitrary input size k (the
                inductive hypothesis), then prove it holds for input size k+1.
              </li>
            </ol>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Example: Proving the Correctness of Merge Sort</h4>
              <div className="space-y-3">
                <p>
                  <strong className="font-medium">Property:</strong> Merge Sort correctly sorts an array of size n.
                </p>
                <p>
                  <strong className="font-medium">Base Case:</strong> For n=1, an array with a single element is already sorted.
                </p>
                <p>
                  <strong className="font-medium">Inductive Hypothesis:</strong> Assume Merge Sort correctly sorts arrays of size k, where k
                  &lt; n.
                </p>
                <p>
                  <strong className="font-medium">Inductive Step:</strong> For an array of size n, Merge Sort divides it into two subarrays of
                  size n/2 (approximately). By the inductive hypothesis, these subarrays are correctly sorted by
                  recursive calls. The merge operation correctly combines these sorted subarrays into a single sorted
                  array. Therefore, Merge Sort correctly sorts an array of size n.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Contradiction</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              In a proof by contradiction, we assume the opposite of what we want to prove and show that this
              assumption leads to a logical contradiction. This establishes that our original statement must be
              true.
            </p>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Example: Proving the Optimality of a Greedy Algorithm</h4>
              <p>
                To prove that a greedy algorithm produces an optimal solution, we might assume there exists a better
                solution than the one produced by the greedy algorithm. We then derive a contradiction by showing
                that this supposedly better solution can be improved by applying the greedy choice, which
                contradicts its optimality.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Invariant Relationships</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              Beyond loop invariants, we can establish invariant relationships between variables or data structures
              that hold throughout the execution of an algorithm. These invariants help reason about the algorithm's
              behavior and correctness.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Formal Verification</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              For critical systems, formal verification methods can be used to mathematically prove program
              correctness. These methods include:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <li className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Hoare Logic</h4>
                <p>A formal system for reasoning about program correctness using preconditions and postconditions.</p>
              </li>
              <li className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Model Checking</h4>
                <p>Systematically checking whether a model of a system meets a given specification.</p>
              </li>
              <li className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Automated Theorem Proving</h4>
                <p>Using software to prove mathematical theorems about program behavior.</p>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}