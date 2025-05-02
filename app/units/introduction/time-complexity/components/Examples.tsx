import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Examples() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Examples of Time Complexity Analysis</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Linear Search</h3>
          <div className="bg-muted p-4 rounded-md my-6">
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function linearSearch(arr, target):
    for i = 0 to length(arr) - 1:
        if arr[i] == target:
            return i
    return -1`}
              </code>
            </pre>
            <div className="mt-4">
              <p className="font-semibold mb-2">Analysis:</p>
              <p className="mb-3">
                In the worst case, the target element is not in the array, so we need to
                check all n elements. Each check takes constant time, so the worst-case time complexity is O(n).
              </p>
              <ul className="pl-6 list-disc space-y-1">
                <li><strong>Best case:</strong> O(1) - The target is the first element.</li>
                <li><strong>Average case:</strong> O(n/2) = O(n) - On average, we need to check half the elements.</li>
                <li><strong>Worst case:</strong> O(n) - The target is the last element or not in the array.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Binary Search</h3>
          <div className="bg-muted p-4 rounded-md my-6">
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function binarySearch(arr, target):
    left = 0
    right = length(arr) - 1
    
    while left <= right:
        mid = floor((left + right) / 2)
        
        if arr[mid] == target:
            return mid
        else if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`}
              </code>
            </pre>
            <div className="mt-4">
              <p className="font-semibold mb-2">Analysis:</p>
              <p className="mb-3">
                In each iteration, we eliminate half of the remaining elements. The number of iterations
                needed to reduce n elements to 1 is log₂(n). Each iteration takes constant time, so the
                time complexity is O(log n).
              </p>
              <ul className="pl-6 list-disc space-y-1">
                <li><strong>Best case:</strong> O(1) - The target is the middle element.</li>
                <li><strong>Average and worst case:</strong> O(log n) - We need to perform multiple halvings.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Bubble Sort</h3>
          <div className="bg-muted p-4 rounded-md my-6">
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function bubbleSort(arr):
    n = length(arr)
    for i = 0 to n - 1:
        for j = 0 to n - i - 1:
            if arr[j] > arr[j + 1]:
                swap arr[j] and arr[j + 1]`}
              </code>
            </pre>
            <div className="mt-4">
              <p className="font-semibold mb-2">Analysis:</p>
              <p className="mb-3">
                The outer loop runs n times. For each i, the inner loop runs (n-i) times.
                This gives us a total of n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 comparisons, which is O(n²).
              </p>
              <ul className="pl-6 list-disc space-y-1">
                <li><strong>Best case:</strong> O(n) - With an optimization to detect if the array is already sorted.</li>
                <li><strong>Average and worst case:</strong> O(n²) - We need to perform all comparisons.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Merge Sort</h3>
          <div className="bg-muted p-4 rounded-md my-6">
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function mergeSort(arr, left, right):
    if left < right:
        mid = floor((left + right) / 2)
        mergeSort(arr, left, mid)
        mergeSort(arr, mid + 1, right)
        merge(arr, left, mid, right)`}
              </code>
            </pre>
            <div className="mt-4">
              <p className="font-semibold mb-2">Analysis:</p>
              <p className="mb-3">
                We can set up a recurrence relation: T(n) = 2T(n/2) + O(n), where O(n) is
                the time to merge two sorted subarrays of size n/2. Using the Master Theorem, we can solve this to
                get T(n) = O(n log n).
              </p>
              <ul className="pl-6 list-disc space-y-1">
                <li><strong>Best, average, and worst case:</strong> O(n log n) - The algorithm always divides the array
                in half and performs a linear-time merge.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Comparing Different Approaches: Fibonacci</h3>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Recursive Fibonacci</h4>
            <div className="bg-muted p-4 rounded-md mb-6">
              <pre className="bg-muted/70 p-3 rounded">
                <code>
{`function fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`}
                </code>
              </pre>
              <div className="mt-4">
                <p className="font-semibold mb-1">Analysis:</p>
                <p>
                  This algorithm makes two recursive calls for each non-base case. The
                  recurrence relation is T(n) = T(n-1) + T(n-2) + O(1). This results in an exponential number of
                  function calls, specifically O(2^n).
                </p>
                <p className="mt-2"><strong>Time complexity:</strong> O(2^n) - Exponential time, very inefficient for large n.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Dynamic Programming Fibonacci</h4>
            <div className="bg-muted p-4 rounded-md">
              <pre className="bg-muted/70 p-3 rounded">
                <code>
{`function fibonacciDP(n):
    if n <= 1:
        return n
        
    fib = new array of size (n + 1)
    fib[0] = 0
    fib[1] = 1
    
    for i = 2 to n:
        fib[i] = fib[i - 1] + fib[i - 2]
        
    return fib[n]`}
                </code>
              </pre>
              <div className="mt-4">
                <p className="font-semibold mb-1">Analysis:</p>
                <p>
                  We compute each Fibonacci number exactly once and store it in an array.
                  The loop runs (n-1) times, and each iteration takes constant time.
                </p>
                <ul className="pl-6 list-disc space-y-1 mt-2">
                  <li><strong>Time complexity:</strong> O(n) - Linear time, much more efficient than the recursive version.</li>
                  <li><strong>Space complexity:</strong> O(n) - We use an array of size (n+1).</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
            <h4 className="font-semibold mb-2">Key Insight</h4>
            <p className="italic">
              These examples demonstrate how different algorithm designs can drastically affect time complexity.
              When solving problems, it's important to consider multiple approaches and analyze their time
              complexities to choose the most efficient solution for your specific requirements.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}