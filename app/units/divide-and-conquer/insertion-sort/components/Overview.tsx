"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Insertion Sort Overview</h2>
          <p className="text-lg mb-6">
            Insertion sort is a simple sorting algorithm that builds the final sorted array one element at a time. 
            It's efficient for small data sets and is often used as part of more sophisticated algorithms.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Characteristics</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Simplicity:</strong> Insertion sort is one of the simplest sorting algorithms to understand and implement.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Efficiency for Small Data:</strong> It performs efficiently on small data sets and nearly-sorted arrays.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Adaptive:</strong> The time complexity improves if the input is partially sorted.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Stable:</strong> It preserves the relative order of equal elements.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">In-place:</strong> It requires only O(1) additional memory space.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">When to Use Insertion Sort</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Insertion sort is ideal when:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You're working with small datasets (typically less than 50 elements)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">The array is already partially sorted</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Memory usage is a concern (as it uses O(1) extra space)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You need a simple, stable sorting algorithm</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">You're implementing a hybrid sorting algorithm</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Library Sort:</strong> Maintaining sorted books or records in libraries
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Online Algorithms:</strong> Scenarios where data arrives sequentially and needs to be sorted as it arrives
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Hybrid Sorting:</strong> As a component in more complex algorithms like TimSort (used in Python and Java)
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">System Software:</strong> In low-memory environments or embedded systems
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Educational Purposes:</strong> Teaching sorting concepts due to its simplicity
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}