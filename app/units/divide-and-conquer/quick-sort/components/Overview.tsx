"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Quick Sort Overview</h2>
          <p className="text-lg mb-6">
            Quick Sort is an efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot' element 
            and partitioning the array around it, with smaller elements placed before the pivot and larger ones after it.
            It's widely used due to its average-case performance advantage and cache efficiency.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Characteristics</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Divide and Conquer:</strong> Breaks the problem down by partitioning the array around a pivot element.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">In-place Sorting:</strong> Requires only O(log n) additional space, making it memory efficient.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Cache Efficiency:</strong> Works well with modern hardware due to good locality of reference.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Adaptive Performance:</strong> Average case O(n log n), but can degrade to O(n²) in worst scenarios.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When to Use Quick Sort</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Quick sort is ideal when:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need good average-case performance for large datasets</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Memory usage is a concern (due to its in-place nature)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">The data is likely to be randomly distributed</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You're working in a system with good cache performance</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Stability (preserving order of equal elements) is not required</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Standard Libraries:</strong> Implemented in many programming language sorting libraries
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Database Systems:</strong> For internal sorting operations where memory is limited
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Numerical Simulations:</strong> For quickly sorting large data sets in scientific applications
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">System Software:</strong> Operating systems and low-level applications
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Hybrid Algorithms:</strong> Used alongside other algorithms in sorting frameworks like Introsort
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}