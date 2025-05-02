"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Merge Sort Overview</h2>
          <p className="text-lg mb-6">
            Merge Sort is a classic divide-and-conquer sorting algorithm that works by dividing the input array into 
            two halves, recursively sorting each half, and then merging the sorted halves back together.
            It guarantees O(n log n) time complexity in all cases, making it highly reliable for sorting operations.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Characteristics</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Divide and Conquer:</strong> Breaks down the array into smaller subarrays until they contain only one element (which is inherently sorted).
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Stable Sorting:</strong> Preserves the relative order of equal elements in the sorted output.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Predictable Performance:</strong> Maintains O(n log n) time complexity regardless of input data distribution.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Not In-Place:</strong> Requires O(n) auxiliary space for the merging process.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When to Use Merge Sort</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Merge sort is ideal when:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need guaranteed O(n log n) performance, regardless of input data</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Stability is required (preserving the order of equal elements)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You're working with linked lists (merge sort is particularly efficient for linked data structures)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You have external sorting scenarios where data doesn't fit into memory</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need a parallelizable sorting algorithm</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">External Sorting:</strong> When data is too large to fit in memory, such as database operations
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Inversion Count Problems:</strong> Can be modified to count inversions in an array
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Custom Sort Orders:</strong> When complex sorting criteria must be applied with stability
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Parallel Processing:</strong> The independent subproblems make it suitable for parallel implementation
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Linked List Sorting:</strong> Often the algorithm of choice for sorting linked lists
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}