import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Examples() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Asymptotic Notation Examples</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Algorithm Time Complexities</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Here are examples of algorithms with different time complexities:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(1) - Constant Time</h4>
                <ul className="list-disc list-inside">
                  <li>Array element access by index</li>
                  <li>Stack push and pop operations</li>
                  <li>HashMap insertion and lookup (amortized)</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(log n) - Logarithmic Time</h4>
                <ul className="list-disc list-inside">
                  <li>Binary search</li>
                  <li>Binary search tree operations</li>
                  <li>Heap insert and extract operations</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n) - Linear Time</h4>
                <ul className="list-disc list-inside">
                  <li>Linear search</li>
                  <li>Traversing an array or linked list</li>
                  <li>Finding the maximum/minimum in an unsorted array</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n log n) - Linearithmic Time</h4>
                <ul className="list-disc list-inside">
                  <li>Merge sort</li>
                  <li>Heap sort</li>
                  <li>Quick sort (average case)</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n²) - Quadratic Time</h4>
                <ul className="list-disc list-inside">
                  <li>Bubble sort</li>
                  <li>Insertion sort</li>
                  <li>Selection sort</li>
                </ul>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(2ⁿ) - Exponential Time</h4>
                <ul className="list-disc list-inside">
                  <li>Recursive Fibonacci algorithm</li>
                  <li>Tower of Hanoi</li>
                  <li>Generating all subsets of a set</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Algorithm Analysis Examples</h3>

          <div className="bg-muted p-4 rounded-md my-6">
            <h4 className="font-semibold mb-2">Example 1: Linear Search</h4>
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function linearSearch(arr, target):
    for i = 0 to n-1:
        if arr[i] === target:
            return i
    return -1`}
              </code>
            </pre>
            <p className="mt-3">Time Complexity Analysis:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Best case: O(1) - target is the first element</li>
              <li>Worst case: O(n) - target is the last element or not present</li>
              <li>Average case: O(n) - on average, we'll check half the elements</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-md my-6">
            <h4 className="font-semibold mb-2">Example 2: Binary Search</h4>
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function binarySearch(arr, target):
    left = 0
    right = n - 1
    
    while left <= right:
        mid = floor((left + right) / 2)
        
        if arr[mid] === target:
            return mid
        else if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`}
              </code>
            </pre>
            <p className="mt-3">Time Complexity Analysis:</p>
            <p className="mt-2">
              With each comparison, the search interval is halved. This leads to a time complexity of O(log n).
              This is because the maximum number of iterations required to find the target (or determine it's not present)
              is approximately log₂n.
            </p>
          </div>

          <div className="bg-muted p-4 rounded-md my-6">
            <h4 className="font-semibold mb-2">Example 3: Bubble Sort</h4>
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function bubbleSort(arr):
    for i = 0 to n-1:
        for j = 0 to n-i-1:
            if arr[j] > arr[j+1]:
                swap arr[j] and arr[j+1]`}
              </code>
            </pre>
            <p className="mt-3">Time Complexity Analysis:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Outer loop runs n times</li>
              <li>Inner loop runs (n-i-1) times for each i</li>
              <li>Total comparisons: n-1 + n-2 + ... + 1 = n(n-1)/2</li>
              <li>Therefore, the time complexity is O(n²)</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-md my-6">
            <h4 className="font-semibold mb-2">Example 4: Merge Sort</h4>
            <pre className="bg-muted/70 p-3 rounded">
              <code>
{`function mergeSort(arr):
    if length of arr <= 1:
        return arr
        
    mid = floor(length of arr / 2)
    left = mergeSort(arr[0...mid-1])
    right = mergeSort(arr[mid...n-1])
    
    return merge(left, right)`}
              </code>
            </pre>
            <p className="mt-3">Time Complexity Analysis:</p>
            <p className="mt-2">
              The recurrence relation for merge sort is T(n) = 2T(n/2) + O(n), where:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>2T(n/2) represents the time to sort the two halves</li>
              <li>O(n) represents the time to merge the sorted halves</li>
            </ul>
            <p className="mt-2">
              Using the Master Theorem, we can solve this recurrence to get T(n) = O(n log n).
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Growth Rate Comparisons</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              The following is the order of common time complexities from fastest to slowest growth:
            </p>
            
            <div className="bg-muted p-4 rounded-md my-6">
              <p className="text-center font-medium">
                O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ) &lt; O(n!)
              </p>
            </div>
            
            <p className="mb-4">
              To visualize how these functions grow, consider their values when n = 10:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-muted-foreground/20">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-muted-foreground/20 p-2">n</th>
                    <th className="border border-muted-foreground/20 p-2">O(1)</th>
                    <th className="border border-muted-foreground/20 p-2">O(log n)</th>
                    <th className="border border-muted-foreground/20 p-2">O(n)</th>
                    <th className="border border-muted-foreground/20 p-2">O(n log n)</th>
                    <th className="border border-muted-foreground/20 p-2">O(n²)</th>
                    <th className="border border-muted-foreground/20 p-2">O(2ⁿ)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-muted-foreground/20 p-2">10</td>
                    <td className="border border-muted-foreground/20 p-2">1</td>
                    <td className="border border-muted-foreground/20 p-2">~3.32</td>
                    <td className="border border-muted-foreground/20 p-2">10</td>
                    <td className="border border-muted-foreground/20 p-2">~33.2</td>
                    <td className="border border-muted-foreground/20 p-2">100</td>
                    <td className="border border-muted-foreground/20 p-2">1,024</td>
                  </tr>
                  <tr>
                    <td className="border border-muted-foreground/20 p-2">100</td>
                    <td className="border border-muted-foreground/20 p-2">1</td>
                    <td className="border border-muted-foreground/20 p-2">~6.64</td>
                    <td className="border border-muted-foreground/20 p-2">100</td>
                    <td className="border border-muted-foreground/20 p-2">~664</td>
                    <td className="border border-muted-foreground/20 p-2">10,000</td>
                    <td className="border border-muted-foreground/20 p-2">~10^30</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                As n grows larger, the differences between these complexity classes become more pronounced.
                For large inputs, algorithms with lower complexity classes (such as O(n log n)) vastly outperform
                those with higher complexity classes (such as O(n²)).
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}