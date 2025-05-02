import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Examples() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Example Proofs of Correctness</h2>

          <h3 className="text-xl font-semibold mt-10 mb-4">Example 1: Binary Search Correctness</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">
              Let's prove the correctness of the binary search algorithm, which finds the position of a target value
              within a sorted array.
            </p>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Binary Search Algorithm</h4>
              <pre className="bg-muted-foreground/10 p-4 rounded-md overflow-x-auto">
                <code>
                  {`function binarySearch(A, target):
    left = 0
    right = length(A) - 1
    
    while left <= right:
        mid = floor((left + right) / 2)
        
        if A[mid] == target:
            return mid
        else if A[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  // Target not found`}
                </code>
              </pre>
            </div>

            <h4 className="text-lg font-semibold mb-3 mt-8 border-l-4 border-primary pl-3">Loop Invariant Proof</h4>
            
            <div className="space-y-4 pl-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Invariant:</strong> If target is in the array, then it is in the subarray A[left..right].
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Initialization:</strong> Before the first iteration, left=0 and right=n-1, so the subarray is
                  the entire array. If target is in the array, it must be in this subarray.
                </p>
              </div>

              <p className="font-medium mt-4">
                <strong className="text-primary">Maintenance:</strong> In each iteration, we compare target with A[mid]:
              </p>
              <ul className="space-y-2 mt-2 pl-4">
                <li className="pl-2 border-l-2 border-primary">If A[mid] = target, we return mid and the algorithm terminates correctly.</li>
                <li className="pl-2 border-l-2 border-primary">
                  If A[mid] &lt; target, then target must be in A[mid+1..right] if it exists in the array. We update
                  left = mid+1, maintaining the invariant.
                </li>
                <li className="pl-2 border-l-2 border-primary">
                  If A[mid] &gt; target, then target must be in A[left..mid-1] if it exists in the array. We update
                  right = mid-1, maintaining the invariant.
                </li>
              </ul>

              <p className="font-medium mt-4">
                <strong className="text-primary">Termination:</strong> The algorithm terminates in two cases:
              </p>
              <ol className="space-y-2 mt-2 pl-4">
                <li className="pl-2 border-l-2 border-primary">We find target at A[mid] and return mid. This is correct by the comparison.</li>
                <li className="pl-2 border-l-2 border-primary">
                  The condition left &lt;= right becomes false (i.e., left &gt; right). By the invariant, if target
                  were in the array, it would be in the subarray A[left..right]. But this subarray is now empty, so
                  target is not in the array, and returning -1 is correct.
                </li>
              </ol>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Example 2: Insertion Sort Correctness</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">Now let's prove the correctness of the insertion sort algorithm.</p>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Insertion Sort Algorithm</h4>
              <pre className="bg-muted-foreground/10 p-4 rounded-md overflow-x-auto">
                <code>
                  {`function insertionSort(A):
    for i = 1 to length(A) - 1:
        key = A[i]
        j = i - 1
        
        while j >= 0 and A[j] > key:
            A[j + 1] = A[j]
            j = j - 1
            
        A[j + 1] = key`}
                </code>
              </pre>
            </div>

            <h4 className="text-lg font-semibold mb-3 mt-8 border-l-4 border-primary pl-3">Loop Invariant Proof</h4>
            
            <div className="space-y-4 pl-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Invariant:</strong> At the start of each iteration of the outer for loop, the subarray
                  A[0..i-1] consists of the elements originally in A[0..i-1] but in sorted order.
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Initialization:</strong> Before the first iteration (i=1), the subarray A[0..0] consists of
                  just one element, which is trivially sorted.
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Maintenance:</strong> In each iteration, we take the element A[i] and insert it into its
                  correct position in the sorted subarray A[0..i-1]. After this insertion, the subarray A[0..i] is
                  sorted, maintaining the invariant for the next iteration.
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Termination:</strong> When the loop terminates (i=n), the invariant tells us that the subarray
                  A[0..n-1], which is the entire array, is sorted. Therefore, the algorithm correctly sorts the array.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Example 3: Proving Correctness of a Recursive Algorithm</h3>
          <div className="pl-4 mb-8">
            <p className="text-lg mb-4">Let's prove the correctness of a recursive algorithm for computing factorial.</p>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Factorial Algorithm</h4>
              <pre className="bg-muted-foreground/10 p-4 rounded-md overflow-x-auto">
                <code>
                  {`function factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)`}
                </code>
              </pre>
            </div>

            <h4 className="text-lg font-semibold mb-3 mt-8 border-l-4 border-primary pl-3">Proof by Induction</h4>
            
            <div className="space-y-4 pl-4">
              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Property:</strong> factorial(n) correctly computes n! for all non-negative integers n.
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Base Case:</strong> For n=0, factorial(0) returns 1, which is correct since 0! = 1 by
                  definition.
                </p>
              </div>

              <div className="p-3 bg-muted/30 rounded-md">
                <p>
                  <strong className="font-bold text-primary">Inductive Hypothesis:</strong> Assume factorial(k) correctly computes k! for some non-negative
                  integer k.
                </p>
              </div>

              <div className="mt-4">
                <p className="font-medium">
                  <strong className="text-primary">Inductive Step:</strong> We need to show that factorial(k+1) correctly computes (k+1)!.
                </p>
                <div className="bg-muted/20 p-4 mt-2 rounded-md border-l-4 border-primary">
                  <p>
                    factorial(k+1) = (k+1) * factorial(k) <span className="text-muted-foreground">(by the algorithm)</span>
                    <br />= (k+1) * k! <span className="text-muted-foreground">(by the inductive hypothesis)</span>
                    <br />= (k+1)! <span className="text-muted-foreground">(by the definition of factorial)</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-md border-l-4 border-primary">
                <p>
                  Therefore, factorial(k+1) correctly computes (k+1)!, completing the induction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}