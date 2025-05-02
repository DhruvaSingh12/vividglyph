import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Understanding Time Complexity</h2>
          <p className="text-lg mb-6">
            Time complexity is a measure of the amount of time an algorithm takes to complete as a function of the
            length of the input. Rather than measuring actual time in seconds (which would vary based on hardware,
            implementation details, and other factors), we count the number of elementary operations performed by
            the algorithm.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Why Analyze Time Complexity?</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Time complexity analysis helps us:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Predict scaling:</strong> Understand how an algorithm's performance will scale with larger inputs
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Compare algorithms:</strong> Evaluate different algorithms that solve the same problem
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Identify bottlenecks:</strong> Find performance issues in our code
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Make decisions:</strong> Choose algorithms based on expected input sizes
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Types of Time Complexity Analysis</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">We typically analyze algorithms in three contexts:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Best-case</h4>
                <p>The minimum time required for an algorithm to complete with any valid input of size n.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Average-case</h4>
                <p>The expected time for an algorithm to complete with a random input of size n.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Worst-case</h4>
                <p>The maximum time required for an algorithm to complete with any valid input of size n.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                In practice, we often focus on worst-case complexity as it provides an upper bound on the algorithm's
                running time and ensures that the algorithm will never perform worse than this bound.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Asymptotic Analysis</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              When analyzing time complexity, we're primarily interested in how the running time grows as the input
              size increases, especially for large inputs. This is known as asymptotic analysis, and it uses
              notations like Big O, Theta, and Omega to describe the growth rate of functions.
            </p>
            <p className="mb-4">
              The most common notation is Big O, which provides an upper bound on the growth rate. For example, an
              algorithm with O(n²) time complexity means that its running time grows no faster than a quadratic
              function of the input size.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Common Time Complexities</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Algorithms are often classified by their time complexity. Here are some common time complexities, from
              most efficient to least efficient:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(1) - Constant time:</strong> The algorithm takes the same amount of time regardless of the
                input size. Examples: Accessing an array element by index, pushing to a stack.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(log n) - Logarithmic time:</strong> The running time grows logarithmically with the input
                size. Examples: Binary search, balanced binary search tree operations.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(n) - Linear time:</strong> The running time grows linearly with the input size. Examples:
                Linear search, traversing an array.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(n log n) - Linearithmic time:</strong> Examples: Efficient sorting algorithms like merge
                sort and heap sort.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(n²) - Quadratic time:</strong> Examples: Simple sorting algorithms like bubble sort and
                insertion sort, nested loops iterating over an array.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(2^n) - Exponential time:</strong> Examples: Recursive calculation of Fibonacci numbers,
                generating all subsets of a set.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">O(n!) - Factorial time:</strong> Examples: Generating all permutations of a set, brute force
                solution to the traveling salesman problem.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}