"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Binary Search Overview</h2>
          <p className="text-lg mb-6">
            This divide-and-conquer approach allows binary search to achieve O(log n) time complexity, making it significantly 
            faster than linear search for large datasets.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Characteristics</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Input Requirement:</strong> The array must be sorted for binary search to work correctly.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Efficiency:</strong> Binary search has O(log n) time complexity, making it very efficient for large datasets.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Divide and Conquer:</strong> It follows the divide-and-conquer paradigm by reducing the search space by half in each step.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Comparison-Based:</strong> It uses comparisons to determine which half of the array to search next.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When to Use Binary Search</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Binary search is ideal when:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need to search through a large, sorted dataset</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">The data is organized in a way that allows for efficient access by index</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need to repeatedly search the same dataset multiple times</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Memory usage needs to be minimized (as it uses O(1) extra space)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Database Systems:</strong> For efficient lookups in indexed database columns
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Text Editors:</strong> For implementing "find" functionality
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Search Engines:</strong> As part of more complex search algorithms
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Computer Graphics:</strong> In ray tracing and spatial partitioning structures
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Machine Learning:</strong> For implementing decision trees and nearest neighbor search
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}