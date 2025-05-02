import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function RecurrenceRelations() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Recurrence Relations</h2>
          <p className="text-lg mb-6">
            Recurrence relations are equations that define a sequence recursively, where each term is defined as a 
            function of previous terms. They are fundamental in analyzing the time and space complexity of recursive 
            algorithms.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Understanding Recurrence Relations</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">A recurrence relation has the following components:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Base Case(s):</strong> Explicit values for the smallest input(s), like T(1) = 1.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Recursive Case:</strong> Formula expressing larger instances in terms of smaller ones, 
                like T(n) = 2T(n/2) + n.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Types of Recurrence Relations</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Several patterns appear frequently in algorithm analysis:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Divide and Conquer:</strong> T(n) = aT(n/b) + f(n), where a ≥ 1, b &gt; 1, 
                and f(n) is the cost of dividing and combining.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Linear Recurrences:</strong> T(n) = T(n-1) + f(n), common in algorithms 
                that reduce the problem size by a constant amount.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Subtraction-Division Recurrences:</strong> T(n) = T(n-a) + T(n/b) + f(n), 
                combining both approaches.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Solving Recurrence Relations</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Several methods can be used to solve recurrence relations:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Substitution Method</h4>
                <p>Guess a solution and use induction to prove it correct. Requires intuition about the form of the solution.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Recursion Tree Method</h4>
                <p>Visualize the recurrence as a tree to sum the costs at each level and find the total cost.</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Master Theorem</h4>
                <p>A powerful tool for solving divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n).</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Characteristic Equation Method</h4>
                <p>For linear homogeneous recurrences, using techniques from differential equations.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                The choice of method depends on the recurrence form. The Master Theorem is particularly useful
                for many common algorithms but doesn't apply to all recurrences.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Examples in Algorithm Analysis</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Notable recurrence relations from common algorithms:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Binary Search:</strong> T(n) = T(n/2) + O(1) → O(log n)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Merge Sort:</strong> T(n) = 2T(n/2) + O(n) → O(n log n)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Strassen's Matrix Multiplication:</strong> T(n) = 7T(n/2) + O(n²) → O(n^log₂7)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Fibonacci Numbers:</strong> F(n) = F(n-1) + F(n-2) → O(φⁿ), where φ is the golden ratio
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}