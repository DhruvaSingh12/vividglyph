import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Combinatorics() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Combinatorics in Algorithm Analysis</h2>
          <p className="text-lg mb-6">
            Combinatorics is the branch of mathematics that studies counting, arrangement, and combination of objects.
            It provides essential tools for analyzing algorithm complexity, especially when evaluating the number of 
            operations, possible inputs, or solution spaces.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Fundamental Counting Principles</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">The basic principles of combinatorial counting include:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Rule of Sum:</strong> If an event can occur in m ways, and another exclusive 
                event can occur in n ways, then one or the other event can occur in m + n ways.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Rule of Product:</strong> If one event can occur in m ways, and after that, a second 
                event can occur in n ways, then the sequence of events can occur in m × n ways.
              </li>
            </ul>
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                These fundamental principles are the building blocks for more complex combinatorial calculations 
                used in algorithm analysis.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Combinatorial Concepts</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Important combinatorial concepts that frequently appear in algorithm analysis:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Permutations:</strong> The number of ways to arrange n distinct objects in a specific 
                order. Formula: P(n, k) = n! / (n-k)! for arranging k objects from n distinct objects.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Combinations:</strong> The number of ways to select k objects from n distinct objects 
                where order doesn't matter. Formula: C(n, k) = n! / (k! × (n-k)!).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Binomial Coefficients:</strong> The coefficients in the expansion of (x + y)ⁿ, equivalent 
                to the combination formula C(n, k).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Pigeonhole Principle:</strong> If n + 1 or more objects are placed into n containers, then 
                at least one container must hold more than one object.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications in Algorithm Analysis</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Combinatorics is widely applied in algorithm analysis and design:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Worst-Case Analysis</h4>
                <p>Determining the maximum number of operations for inputs of a given size.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Average-Case Analysis</h4>
                <p>Computing the expected performance over all possible inputs, often requiring probabilistic combinatorics.</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Search Space Analysis</h4>
                <p>Evaluating the size of the solution space for optimization and search algorithms.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Randomized Algorithms</h4>
                <p>Analyzing the behavior of algorithms that make random choices during execution.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                Understanding combinatorial principles often leads to algorithmic insights that can dramatically 
                improve efficiency by reducing the search space or finding optimal arrangements.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Combinatorial Patterns in Algorithms</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">Several combinatorial patterns appear frequently in algorithms:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Counting Subproblems:</strong> Breaking down problems into smaller subproblems 
                and counting the number of ways to solve each (dynamic programming).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Inclusion-Exclusion Principle:</strong> Calculating the size of a union of sets 
                by alternating addition and subtraction of intersection sizes.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Recurrence Relations in Counting:</strong> Defining combinatorial sequences 
                where each term depends on previous terms.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Generating Functions:</strong> Powerful algebraic tools for solving combinatorial 
                problems by encoding sequences into functions.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}