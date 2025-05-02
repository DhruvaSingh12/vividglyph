import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Introduction to Asymptotic Notations</h2>
          <p className="text-lg mb-6">
            Asymptotic notation is a mathematical tool used to describe the limiting behavior of a function when the argument tends towards a particular value or infinity. In algorithm analysis, it helps us classify algorithms according to their efficiency and provides a high-level understanding of algorithm behavior as the size of the input grows.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Why Use Asymptotic Notation?</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Asymptotic notation offers several advantages when analyzing algorithms:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Simplicity:</strong> It allows us to focus on the growth rate of an algorithm's running time rather than getting lost in the details of exact step counts.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Hardware Independence:</strong> The analysis is independent of specific hardware, programming languages, or implementation details.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Scalability Insights:</strong> It helps predict how an algorithm will perform with very large input sizes.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Comparative Analysis:</strong> It provides a clear framework for comparing the efficiency of different algorithms.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Types of Asymptotic Notations</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              There are several types of asymptotic notations, each serving a different purpose in algorithm analysis:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Big O Notation (O):</strong> Represents the upper bound of an algorithm's running time.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Big Omega Notation (Ω):</strong> Represents the lower bound of an algorithm's running time.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Big Theta Notation (Θ):</strong> Represents both upper and lower bounds, giving a tight bound on the growth rate.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Little o Notation (o):</strong> Represents a strict upper bound that is not tight.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Little omega Notation (ω):</strong> Represents a strict lower bound that is not tight.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Asymptotic Complexities</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">These are the most frequently encountered time complexities in algorithm analysis:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(1) - Constant Time</h4>
                <p>The algorithm takes the same amount of time regardless of input size.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(log n) - Logarithmic Time</h4>
                <p>Running time increases logarithmically as input size grows.</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n) - Linear Time</h4>
                <p>Running time increases linearly with input size.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n log n) - Linearithmic Time</h4>
                <p>Common in efficient sorting algorithms like merge sort and heap sort.</p>
              </div>

              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(n²) - Quadratic Time</h4>
                <p>Running time is proportional to the square of the input size.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">O(2ⁿ) - Exponential Time</h4>
                <p>Running time doubles with each additional element in the input.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                When analyzing algorithms, we typically focus on the worst-case scenario to provide a guaranteed upper bound on the running time, regardless of the specific input.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}