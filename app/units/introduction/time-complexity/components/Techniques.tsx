import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Techniques() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Techniques for Analyzing Time Complexity</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Counting Elementary Operations</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              The most direct approach to analyzing time complexity is to count the number of elementary operations
              performed by the algorithm. Elementary operations include:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Arithmetic operations:</strong> Addition, subtraction, multiplication, division
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Comparisons:</strong> Equality and inequality checks
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Assignments:</strong> Setting variable values
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Array indexing:</strong> Accessing array elements
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Function calls:</strong> Invoking functions or methods
              </li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-md my-6">
            <h4 className="font-semibold mb-2">Example: Counting Operations in a Simple Loop</h4>
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function sum(arr):
    total = 0           // 1 operation
    for i = 0 to n-1:   // n+1 comparisons (including the final check)
        total += arr[i] // n operations (addition + assignment)
    return total        // 1 operation

Total operations: 1 + (n+1) + n + 1 = 2n + 3
Time complexity: O(n)`}
              </code>
            </pre>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Analyzing Loops</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Loops are a common source of time complexity in algorithms. The time complexity of a loop is generally
              the time complexity of the statements inside the loop multiplied by the number of iterations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
              <h4 className="text-lg font-medium mb-2 text-primary">Simple Loop</h4>
              <pre className="bg-muted/70 p-2 rounded text-sm">
                <code>
{`for i = 0 to n-1:
    // O(1) operations`}
                </code>
              </pre>
              <p className="mt-2">Time complexity: O(n)</p>
            </div>
            
            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
              <h4 className="text-lg font-medium mb-2 text-primary">Nested Loops</h4>
              <pre className="bg-muted/70 p-2 rounded text-sm">
                <code>
{`for i = 0 to n-1:
    for j = 0 to n-1:
        // O(1) operations`}
                </code>
              </pre>
              <p className="mt-2">Time complexity: O(n²)</p>
            </div>
            
            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
              <h4 className="text-lg font-medium mb-2 text-primary">Logarithmic Loops</h4>
              <pre className="bg-muted/70 p-2 rounded text-sm">
                <code>
{`i = n
while i > 0:
    // O(1) operations
    i = i / 2`}
                </code>
              </pre>
              <p className="mt-2">Time complexity: O(log n)</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Analyzing Recursive Algorithms</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              For recursive algorithms, we need to set up a recurrence relation that describes the time complexity
              in terms of smaller subproblems. We can then solve this recurrence relation using techniques like the
              Master Theorem, recursion trees, or the substitution method.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Binary Search</h4>
                <p className="mb-2">Recurrence Relation:</p>
                <p className="font-mono bg-muted/70 p-2 rounded">T(n) = T(n/2) + O(1)</p>
                <p className="mt-2">Solution: T(n) = O(log n)</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Merge Sort</h4>
                <p className="mb-2">Recurrence Relation:</p>
                <p className="font-mono bg-muted/70 p-2 rounded">T(n) = 2T(n/2) + O(n)</p>
                <p className="mt-2">Solution: T(n) = O(n log n)</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Amortized Analysis</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Sometimes, an operation might be expensive in some cases but cheap in most cases. Amortized analysis
              considers the average cost per operation over a sequence of operations, providing a more accurate
              measure of the algorithm's performance.
            </p>

            <p className="mb-4">Common techniques for amortized analysis include:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Aggregate analysis:</strong> Determine the total cost of a sequence of operations and divide
                by the number of operations.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Accounting method:</strong> Assign different charges to different operations, with some
                operations overcharged to pay for others.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Potential method:</strong> Define a potential function that maps the state of the data
                structure to a real number, and analyze how this potential changes with operations.
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
            <h4 className="font-semibold mb-2">Example: Dynamic Array Resizing</h4>
            <p className="mb-2">
              When a dynamic array (like ArrayList in Java or vector in C++) needs to resize, it typically doubles
              its capacity. This operation is O(n) because it needs to copy all elements to a new array. However,
              this happens infrequently, and most append operations are O(1).
            </p>
            <p className="italic">
              Using amortized analysis, we can show that the amortized cost of each append operation is O(1),
              making dynamic arrays efficient for most use cases.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Space Complexity</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              In addition to time complexity, we also analyze space complexity, which measures the amount of memory
              an algorithm uses as a function of the input size. This includes:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Auxiliary space</h4>
                <p>Extra space used by the algorithm (not including the input).</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Total space</h4>
                <p>Auxiliary space plus space used by the input.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                Space complexity is particularly important for algorithms that process large datasets or run on
                resource-constrained environments.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}