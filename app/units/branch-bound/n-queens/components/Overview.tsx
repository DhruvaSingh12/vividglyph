"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">N-Queens Problem Overview</h2>
          <p className="text-lg mb-6">
            The N-Queens problem is a classic combinatorial problem that requires placing N chess queens on an N×N chessboard 
            so that no two queens threaten each other. This means no two queens can share the same row, column, or diagonal.
            It's often solved using backtracking, a form of the branch and bound algorithm paradigm.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Characteristics</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Combinatorial Problem:</strong> Requires finding an arrangement that meets specific constraints.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">NP-Complete:</strong> No known polynomial-time solution exists for the general case.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Backtracking Solution:</strong> Uses recursive exploration with pruning to efficiently search the solution space.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Multiple Valid Solutions:</strong> For N &gt; 1, there are typically multiple valid arrangements.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Theoretical Background</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              The N-Queens problem has a rich mathematical history:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">First proposed as the 8-Queens puzzle by chess player Max Bezzel in 1848</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Franz Nauck published the first solutions in 1850</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">The number of distinct solutions for N=8 is 92</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">The problem has no solutions for N=2 and N=3</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">For N=1, there is trivially one solution</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Applications</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Constraint Satisfaction:</strong> Models for real-world constraint satisfaction problems
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Parallel Computing:</strong> Used to study workload distribution in parallel systems
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Algorithm Testing:</strong> Benchmark for testing search and optimization algorithms
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Artificial Intelligence:</strong> Teaching and evaluating AI search strategies
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Computer Science Education:</strong> Classic problem for teaching backtracking and recursion
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Solution Approach</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              The most common approach to solving the N-Queens problem is backtracking:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Start by placing queens row by row</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">For each row, try placing a queen in each column</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">Check if the placement is valid (doesn't conflict with previously placed queens)</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">If valid, recursively place queens in subsequent rows</li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">If we reach a point where we can't place a queen, backtrack and try a different column in the previous row</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Variations and Extensions</h3>
          <div className="pl-4 mb-8">
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Non-attacking Pieces Problem:</strong> Using different chess pieces besides queens
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">N-Queens Completion Problem:</strong> Find a solution with some queens already placed
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">3D N-Queens Problem:</strong> Extension to three-dimensional board
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Modular N-Queens:</strong> Where the board wraps around like a torus
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}