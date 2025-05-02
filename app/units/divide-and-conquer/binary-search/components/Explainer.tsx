"use client"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export function Explainer() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">How Binary Search Works</h2>
          <p className="text-lg mb-4">
            Binary search operates by repeatedly dividing the search interval in half. The algorithm works as follows:
          </p>
          <ol className="space-y-3 pl-4 mb-8">
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">Start with the entire sorted array.</li>
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">Find the middle element of the current interval.</li>
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">If the target equals the middle element, return the middle element's index.</li>
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">If the target is less than the middle element, narrow the interval to the lower half.</li>
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">If the target is greater than the middle element, narrow the interval to the upper half.</li>
            <li className="pl-4 border-l-4 border-primary p-3 bg-muted/50">Repeat steps 2-5 until the element is found or the interval is empty (indicating the element is not in the array).</li>
          </ol>

          <h3 className="text-xl font-semibold mt-10 mb-4">Complexity Analysis</h3>
          <div className="pl-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Time Complexity</h4>
                <ul className="space-y-2">
                  <li><strong>Best case:</strong> O(1) — Target is found at the middle of the array on the first attempt.</li>
                  <li><strong>Average case:</strong> O(log n) — The search space is halved in each step.</li>
                  <li><strong>Worst case:</strong> O(log n) — The target is not in the array or is found after several halvings.</li>
                </ul>
              </div>
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Space Complexity</h4>
                <ul className="space-y-2">
                  <li><strong>Iterative implementation:</strong> O(1) — Only a constant amount of extra space is needed.</li>
                  <li><strong>Recursive implementation:</strong> O(log n) — Due to the recursive call stack.</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Implementation Details</h3>
          <div className="pl-4 mb-8">
            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Mid-point Calculation</h4>
              <p>
                The formula <code>mid = (left + right) / 2</code> can cause integer overflow for very large arrays. 
                A safer alternative is <code>mid = left + Math.floor((right - left) / 2)</code>.
              </p>
            </div>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Boundary Conditions</h4>
              <p className="mb-3">
                Be careful with boundary conditions when implementing binary search:
              </p>
              <ul className="space-y-3">
                <li className="pl-2 border-l-2 border-primary">The loop condition is typically <code>left &lt;= right</code> (not <code>left &lt; right</code>).</li>
                <li className="pl-2 border-l-2 border-primary">When the target is not found, the loop terminates with <code>left &gt; right</code>.</li>
              </ul>
            </div>

            <div className="bg-muted p-5 rounded-lg my-6 border border-muted-foreground/20">
              <h4 className="text-lg font-semibold mb-3 text-primary">Array Bounds</h4>
              <p>
                Always ensure that array bounds are not exceeded during the search to avoid runtime errors.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
