import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function TheoremExplanation() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">The Master Theorem Explained</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Statement of the Theorem</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              For a recurrence relation of the form T(n) = aT(n/b) + f(n) where a ≥ 1 and b &gt; 1, the Master Theorem
              provides three cases to determine the asymptotic time complexity:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="mb-4">Let's define n<sup>log<sub>b</sub>a</sup> as the critical exponent.</p>
              <p className="text-center mb-2 font-medium">Compare f(n) with n<sup>log<sub>b</sub>a</sup></p>
            </div>
            
            <p className="mb-4">The theorem has three cases:</p>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Case 1: f(n) is polynomially smaller than n<sup>log<sub>b</sub>a</sup></h4>
                <p className="mb-2">If f(n) = O(n<sup>log<sub>b</sub>a-ε</sup>) for some constant ε &gt; 0, then:</p>
                <p className="font-mono mb-2">T(n) = Θ(n<sup>log<sub>b</sub>a</sup>)</p>
                <p className="italic text-sm">This case applies when the cost of dividing and combining (f(n)) is dominated by the subproblems.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Case 2: f(n) is comparable to n<sup>log<sub>b</sub>a</sup></h4>
                <p className="mb-2">If f(n) = Θ(n<sup>log<sub>b</sub>a</sup> log<sup>k</sup> n) for some k ≥ 0, then:</p>
                <p className="font-mono mb-2">T(n) = Θ(n<sup>log<sub>b</sub>a</sup> log<sup>k+1</sup> n)</p>
                <p className="italic text-sm">This case applies when the cost of dividing and combining is comparable to the cost of the subproblems.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Case 3: f(n) is polynomially larger than n<sup>log<sub>b</sub>a</sup></h4>
                <p className="mb-2">If f(n) = Ω(n<sup>log<sub>b</sub>a+ε</sup>) for some constant ε &gt; 0, and if af(n/b) ≤ cf(n) for some c &lt; 1 and all sufficiently large n, then:</p>
                <p className="font-mono mb-2">T(n) = Θ(f(n))</p>
                <p className="italic text-sm">This case applies when the cost of dividing and combining dominates the cost of the subproblems.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Intuitive Understanding</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              To understand the Master Theorem intuitively:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">n<sup>log<sub>b</sub>a</sup> represents:</strong> The work done by all the recursive subproblems at the leaves of the recursion tree.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">f(n) represents:</strong> The work done at the root of the recursion tree (dividing the problem and combining results).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Case 1:</strong> The leaf-level work dominates, so the total time is determined by the number of subproblems.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Case 2:</strong> The work is evenly distributed across levels of the recursion tree, adding a logarithmic factor.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Case 3:</strong> The root-level work dominates, so the total time is determined by the cost of dividing and combining.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Calculating the Critical Exponent</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              The critical exponent n<sup>log<sub>b</sub>a</sup> is a key value in applying the Master Theorem. To calculate it:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Steps to calculate log<sub>b</sub>a:</h4>
              <ol className="list-decimal list-inside">
                <li className="mb-2">Identify the values of a (number of subproblems) and b (size reduction factor)</li>
                <li className="mb-2">Apply the formula: log<sub>b</sub>a = log(a) / log(b)</li>
                <li>The critical exponent is n<sup>log<sub>b</sub>a</sup></li>
              </ol>
            </div>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">For merge sort with T(n) = 2T(n/2) + O(n):</p>
              <ul className="list-disc list-inside">
                <li className="mb-2">a = 2, b = 2</li>
                <li className="mb-2">log<sub>b</sub>a = log<sub>2</sub>2 = log(2) / log(2) = 1</li>
                <li className="mb-2">Critical exponent = n<sup>1</sup> = n</li>
                <li className="mb-2">f(n) = O(n) = Θ(n<sup>log<sub>2</sub>2</sup>) = Θ(n)</li>
                <li>Since f(n) = Θ(n<sup>log<sub>b</sub>a</sup>), we apply Case 2 with k = 0</li>
                <li>Therefore, T(n) = Θ(n log n)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Regularity Condition in Case 3</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Case 3 includes an additional "regularity condition" that must be satisfied:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center mb-2">af(n/b) ≤ cf(n) for some constant c &lt; 1 and all sufficiently large n</p>
              <p>This condition ensures that the cost at each level of recursion decreases by at least a constant factor, 
                 allowing us to apply a geometric series sum to bound the total cost.</p>
            </div>
            <p className="mb-4">
              Most polynomial functions naturally satisfy this condition. For example, if f(n) = n<sup>d</sup> where d &gt; log<sub>b</sub>a, 
              then af(n/b) = a(n/b)<sup>d</sup> = a·n<sup>d</sup>/b<sup>d</sup>.
            </p>
            <p className="mb-4">
              The regularity condition holds if a/b<sup>d</sup> &lt; 1, which is true when d &gt; log<sub>b</sub>a.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Limitations of the Master Theorem</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">The Master Theorem can't be applied in all situations:</p>
            
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Form Mismatch:</strong> Recurrences not in the form T(n) = aT(n/b) + f(n)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Unequal Subproblems:</strong> When subproblems have different sizes (e.g., T(n) = T(n/3) + T(2n/3) + O(n))
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Gap Cases:</strong> When f(n) falls in the gap between cases (e.g., f(n) = n<sup>log<sub>b</sub>a</sup> / log n)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Regularity Violation:</strong> When the regularity condition in Case 3 isn't satisfied
              </li>
            </ul>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                For recurrences that don't fit the Master Theorem, alternative methods like the recursion tree method
                or the substitution method can be used.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}