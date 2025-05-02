import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function NotationTypes() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Types of Asymptotic Notations</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Big O Notation (O)</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Big O notation represents the upper bound of the growth rate of a function. It's the most commonly
              used asymptotic notation in algorithm analysis.
            </p>
            <p className="mb-4">
              Formally, f(n) = O(g(n)) if there exist positive constants c and n₀ such that:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀</p>
            </div>
            <p className="mb-4">
              This means that f(n) grows no faster than g(n), ignoring constant factors and lower-order terms.
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">If f(n) = 3n² + 2n + 1, then f(n) = O(n²).</p>
              <p>Because for c = 4 and n₀ = 1, we can show that 3n² + 2n + 1 ≤ 4n² for all n ≥ 1.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Big Omega Notation (Ω)</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Big Omega notation represents the lower bound of the growth rate of a function.
            </p>
            <p className="mb-4">
              Formally, f(n) = Ω(g(n)) if there exist positive constants c and n₀ such that:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">0 ≤ c·g(n) ≤ f(n) for all n ≥ n₀</p>
            </div>
            <p className="mb-4">
              This means that f(n) grows at least as fast as g(n), ignoring constant factors and lower-order terms.
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">If f(n) = 3n² + 2n + 1, then f(n) = Ω(n²).</p>
              <p>Because for c = 3 and n₀ = 1, we can show that 3n² ≤ 3n² + 2n + 1 for all n ≥ 1.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Big Theta Notation (Θ)</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Big Theta notation represents both the upper and lower bounds of the growth rate of a function, providing
              a tight bound.
            </p>
            <p className="mb-4">
              Formally, f(n) = Θ(g(n)) if there exist positive constants c₁, c₂, and n₀ such that:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">0 ≤ c₁·g(n) ≤ f(n) ≤ c₂·g(n) for all n ≥ n₀</p>
            </div>
            <p className="mb-4">
              This means that f(n) grows at exactly the same rate as g(n), ignoring constant factors and lower-order terms.
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">If f(n) = 3n² + 2n + 1, then f(n) = Θ(n²).</p>
              <p>Because f(n) = O(n²) and f(n) = Ω(n²), therefore f(n) = Θ(n²).</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Little o Notation (o)</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Little o notation represents a strict upper bound that is not tight.
            </p>
            <p className="mb-4">
              Formally, f(n) = o(g(n)) if for every positive constant c, there exists a constant n₀ such that:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">0 ≤ f(n) &lt; c·g(n) for all n ≥ n₀</p>
            </div>
            <p className="mb-4">
              This means that f(n) grows strictly slower than g(n).
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">If f(n) = n, then f(n) = o(n²).</p>
              <p>For any c &gt; 0, we can find n₀ such that n &lt; c·n² for all n ≥ n₀ (specifically, n₀ &gt; 1/c).</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Little omega Notation (ω)</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Little omega notation represents a strict lower bound that is not tight.
            </p>
            <p className="mb-4">
              Formally, f(n) = ω(g(n)) if for every positive constant c, there exists a constant n₀ such that:
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="font-mono text-center">0 ≤ c·g(n) &lt; f(n) for all n ≥ n₀</p>
            </div>
            <p className="mb-4">
              This means that f(n) grows strictly faster than g(n).
            </p>
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example:</h4>
              <p className="mb-2">If f(n) = n², then f(n) = ω(n).</p>
              <p>For any c &gt; 0, we can find n₀ such that c·n &lt; n² for all n ≥ n₀ (specifically, n₀ &gt; c).</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Relationships Between Notations</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">The following relationships exist between the different asymptotic notations:</p>
            
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n))</strong>
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">f(n) = o(g(n)) implies f(n) = O(g(n))</strong>
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">f(n) = ω(g(n)) implies f(n) = Ω(g(n))</strong>
              </li>
            </ul>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                In practice, Big O notation is most commonly used in algorithm analysis because we are typically
                interested in establishing upper bounds on an algorithm's running time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}