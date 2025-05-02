import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Examples() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Master Theorem: Worked Examples</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Case 1 Examples</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Case 1 applies when f(n) is polynomially smaller than n<sup>log<sub>b</sub>a</sup>.
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 1: Binary Search Tree Operations</h4>
              <p className="mb-2">Recurrence relation: T(n) = 2T(n/2) + O(1)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 2, b = 2, f(n) = O(1)</li>
                <li>log<sub>b</sub>a = log<sub>2</sub>2 = 1</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>1</sup> = n</li>
                <li>f(n) = O(1) = O(n<sup>0</sup>), which is O(n<sup>log<sub>b</sub>a-ε</sup>) with ε = 1</li>
                <li>Since f(n) = O(n<sup>log<sub>b</sub>a-ε</sup>), Case 1 applies</li>
                <li>Therefore, T(n) = Θ(n<sup>log<sub>b</sub>a</sup>) = Θ(n)</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 2: Karatsuba's Integer Multiplication</h4>
              <p className="mb-2">Recurrence relation: T(n) = 3T(n/2) + O(n)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 3, b = 2, f(n) = O(n)</li>
                <li>log<sub>b</sub>a = log<sub>2</sub>3 ≈ 1.585</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>1.585</sup></li>
                <li>f(n) = O(n) = O(n<sup>1</sup>), which is O(n<sup>log<sub>b</sub>a-ε</sup>) with ε = 0.585</li>
                <li>Since f(n) = O(n<sup>log<sub>b</sub>a-ε</sup>), Case 1 applies</li>
                <li>Therefore, T(n) = Θ(n<sup>log<sub>b</sub>a</sup>) = Θ(n<sup>log<sub>2</sub>3</sup>) ≈ Θ(n<sup>1.585</sup>)</li>
              </ul>
              <p className="mt-2 italic">This algorithm is faster than the standard O(n²) multiplication algorithm for large integers.</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Case 2 Examples</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Case 2 applies when f(n) is comparable to n<sup>log<sub>b</sub>a</sup>.
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 3: Merge Sort</h4>
              <p className="mb-2">Recurrence relation: T(n) = 2T(n/2) + O(n)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 2, b = 2, f(n) = O(n)</li>
                <li>log<sub>b</sub>a = log<sub>2</sub>2 = 1</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>1</sup> = n</li>
                <li>f(n) = O(n) = Θ(n<sup>log<sub>b</sub>a</sup>) = Θ(n<sup>1</sup>)</li>
                <li>Since f(n) = Θ(n<sup>log<sub>b</sub>a</sup>), Case 2 applies with k = 0</li>
                <li>Therefore, T(n) = Θ(n<sup>log<sub>b</sub>a</sup> log<sup>k+1</sup>n) = Θ(n log n)</li>
              </ul>
              <p className="mt-2">Conclusion: Merge sort has a time complexity of Θ(n log n).</p>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 4: Binary Search in a Sorted Array with Work</h4>
              <p className="mb-2">Recurrence relation: T(n) = T(n/2) + O(log n)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 1, b = 2, f(n) = O(log n)</li>
                <li>log<sub>b</sub>a = log<sub>2</sub>1 = 0</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>0</sup> = 1</li>
                <li>f(n) = O(log n) = Θ(1 · log<sup>1</sup>n)</li>
                <li>Since f(n) = Θ(n<sup>log<sub>b</sub>a</sup>log<sup>k</sup>n), Case 2 applies with k = 1</li>
                <li>Therefore, T(n) = Θ(n<sup>log<sub>b</sub>a</sup> log<sup>k+1</sup>n) = Θ(log<sup>2</sup>n)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Case 3 Examples</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Case 3 applies when f(n) is polynomially larger than n<sup>log<sub>b</sub>a</sup>, and the regularity condition holds.
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 5: Matrix Multiplication with Single Recursive Call</h4>
              <p className="mb-2">Recurrence relation: T(n) = T(n/2) + O(n²)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 1, b = 2, f(n) = O(n²)</li>
                <li>log<sub>b</sub>a = log<sub>2</sub>1 = 0</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>0</sup> = 1</li>
                <li>f(n) = O(n²), which is Ω(n<sup>log<sub>b</sub>a+ε</sup>) with ε = 2</li>
                <li>Check regularity: af(n/b) = 1·(n/2)² = n²/4, and c = 1/4 &lt; 1, so regularity holds</li>
                <li>Since f(n) = Ω(n<sup>log<sub>b</sub>a+ε</sup>) and regularity holds, Case 3 applies</li>
                <li>Therefore, T(n) = Θ(f(n)) = Θ(n²)</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <h4 className="font-semibold mb-2">Example 6: Quick Pick Algorithm</h4>
              <p className="mb-2">Recurrence relation: T(n) = 4T(n/6) + O(n²)</p>
              <p className="mb-2">Analysis:</p>
              <ul className="list-disc list-inside mt-2">
                <li>a = 4, b = 6, f(n) = O(n²)</li>
                <li>log<sub>b</sub>a = log<sub>6</sub>4 ≈ 0.774</li>
                <li>n<sup>log<sub>b</sub>a</sup> = n<sup>0.774</sup></li>
                <li>f(n) = O(n²), which is Ω(n<sup>log<sub>b</sub>a+ε</sup>) with ε = 1.226</li>
                <li>Check regularity: af(n/b) = 4·(n/6)² = 4n²/36 = n²/9, and c = 1/9 &lt; 1, so regularity holds</li>
                <li>Since f(n) = Ω(n<sup>log<sub>b</sub>a+ε</sup>) and regularity holds, Case 3 applies</li>
                <li>Therefore, T(n) = Θ(f(n)) = Θ(n²)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Practical Application in Algorithm Design</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              The Master Theorem can guide algorithm design decisions when choosing between different divide-and-conquer approaches:
            </p>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Optimizing Matrix Multiplication</h4>
                <p className="mb-2">Consider these different approaches:</p>
                <ul className="list-disc list-inside">
                  <li>Standard algorithm: O(n³)</li>
                  <li>Simple divide-and-conquer: T(n) = 8T(n/2) + O(n²) = O(n³)</li>
                  <li>Strassen's algorithm: T(n) = 7T(n/2) + O(n²) = O(n<sup>log₂7</sup>) ≈ O(n<sup>2.81</sup>)</li>
                  <li>Theoretical best known: O(n<sup>2.37</sup>)</li>
                </ul>
                <p className="mt-2">By reducing the number of recursive calls from 8 to 7, Strassen's algorithm achieves a significantly better asymptotic complexity.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                The Master Theorem helps us understand the relationship between the number of subproblems, the size reduction factor, and the combining cost. 
                This insight allows algorithm designers to make informed tradeoffs to optimize overall performance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}