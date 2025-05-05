"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function BranchAndBoundIntroductionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Introduction to Branch and Bound</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">What is Branch and Bound?</h2>
                <p>
                  Branch and Bound is an algorithm design paradigm for solving optimization problems. It's particularly
                  useful for combinatorial optimization problems where we need to find the best solution among a finite
                  set of possible solutions.
                </p>

                <p className="mt-4">
                  The name "Branch and Bound" comes from the two main operations used in the algorithm:
                </p>

                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Branching:</strong> Dividing a problem into smaller subproblems.
                  </li>
                  <li>
                    <strong>Bounding:</strong> Computing bounds for the solution of each subproblem to determine if it's
                    worth exploring.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">Applications</h3>
                <p>Branch and Bound is used to solve many important problems:</p>

                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <a href="/units/branch-and-bound/tsp" className="text-blue-600 hover:underline">
                      Traveling Salesman Problem
                    </a>
                  </li>
                  <li>
                    <a href="/units/branch-and-bound/knapsack" className="text-blue-600 hover:underline">
                      0/1 Knapsack Problem
                    </a>
                  </li>
                  <li>
                    <a href="/units/branch-and-bound/job-assignment" className="text-blue-600 hover:underline">
                      Job Assignment Problem
                    </a>
                  </li>
                  <li>
                    <a href="/units/branch-and-bound/n-queens" className="text-blue-600 hover:underline">
                      N-Queens Problem
                    </a>
                  </li>
                  <li>
                    <a href="/units/branch-and-bound/subset-sum" className="text-blue-600 hover:underline">
                      Subset Sum Problem
                    </a>
                  </li>
                  <li>
                    <a href="/units/branch-and-bound/hamilton-circuit" className="text-blue-600 hover:underline">
                      Hamilton Circuit Problem
                    </a>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="concepts" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Key Concepts in Branch and Bound</h2>

                <h3 className="text-xl font-semibold mt-4 mb-2">State Space Tree</h3>
                <p>
                  The algorithm represents all potential solutions in a tree structure called the state space tree. Each
                  node in the tree represents a partial solution or a state in the solution space.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Branching Strategy</h3>
                <p>
                  At each node, the algorithm creates child nodes by making different choices or decisions. The
                  branching strategy determines how the problem is divided into subproblems.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Bounding Function</h3>
                <p>
                  For each node, the algorithm computes bounds on the best possible solution that could be obtained by
                  exploring that node. The bounding function provides an estimate of the best possible solution that can
                  be achieved from the current state.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Pruning</h3>
                <p>
                  If a node's bound indicates it cannot lead to a better solution than the current best, the node is
                  pruned (not explored further). This is the key to the efficiency of Branch and Bound.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Search Strategies</h3>
                <p>Different strategies can be used to determine which node to explore next:</p>

                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Best-First Search:</strong> Always select the most promising node according to the bounding
                    function.
                  </li>
                  <li>
                    <strong>Depth-First Search:</strong> Explore as far as possible along each branch before
                    backtracking.
                  </li>
                  <li>
                    <strong>Breadth-First Search:</strong> Explore all nodes at the present depth before moving to nodes
                    at the next depth level.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">Comparison with Other Techniques</h3>

                <table className="min-w-full border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">Technique</th>
                      <th className="border border-gray-300 px-4 py-2">Advantages</th>
                      <th className="border border-gray-300 px-4 py-2">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Branch and Bound</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Can find optimal solutions, prunes unnecessary paths
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        May still explore exponential number of nodes in worst case
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Dynamic Programming</td>
                      <td className="border border-gray-300 px-4 py-2">Solves overlapping subproblems efficiently</td>
                      <td className="border border-gray-300 px-4 py-2">
                        Requires problem to have optimal substructure
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Greedy Algorithms</td>
                      <td className="border border-gray-300 px-4 py-2">Very fast, simple to implement</td>
                      <td className="border border-gray-300 px-4 py-2">May not find optimal solutions</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Brute Force</td>
                      <td className="border border-gray-300 px-4 py-2">Always finds optimal solution</td>
                      <td className="border border-gray-300 px-4 py-2">Exponential time complexity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">Branch and Bound Examples</h2>

                <h3 className="text-xl font-semibold mt-4 mb-2">0/1 Knapsack Problem</h3>
                <p>
                  In the 0/1 Knapsack problem, we have a set of items, each with a weight and a value. We need to
                  determine which items to include in a collection so that the total weight is less than or equal to a
                  given limit and the total value is as large as possible.
                </p>

                <p className="mt-2">
                  <strong>Branch and Bound Approach:</strong>
                </p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Sort items by value-to-weight ratio in descending order.</li>
                  <li>Create a root node with level = -1, profit = 0, weight = 0.</li>
                  <li>For each node, branch by either including or excluding the next item.</li>
                  <li>Use a bounding function based on the fractional knapsack solution.</li>
                  <li>Prune nodes that exceed the weight limit or have a bound less than the current best solution.</li>
                </ol>

                <div className="mt-4">
                  <Button asChild>
                    <a href="/units/branch-and-bound/knapsack">View Knapsack Implementation</a>
                  </Button>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-2">Traveling Salesman Problem</h3>
                <p>
                  In the Traveling Salesman Problem (TSP), a salesman needs to visit a set of cities and return to the
                  starting city, minimizing the total distance traveled.
                </p>

                <p className="mt-2">
                  <strong>Branch and Bound Approach:</strong>
                </p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Start with a root node representing the starting city.</li>
                  <li>Branch by adding unvisited cities to the current path.</li>
                  <li>Use a bounding function based on the minimum spanning tree of unvisited cities.</li>
                  <li>Prune nodes with a bound greater than the current best solution.</li>
                </ol>

                <div className="mt-4">
                  <Button asChild>
                    <a href="/units/branch-and-bound/tsp">View TSP Implementation</a>
                  </Button>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-2">N-Queens Problem</h3>
                <p>
                  In the N-Queens problem, we need to place N queens on an N×N chessboard so that no two queens threaten
                  each other.
                </p>

                <p className="mt-2">
                  <strong>Branch and Bound Approach:</strong>
                </p>
                <ol className="list-decimal pl-6 mt-2">
                  <li>Start with an empty board.</li>
                  <li>Branch by placing a queen in each valid position in the current row.</li>
                  <li>
                    Use a bounding function based on the number of queens that can be placed in the remaining rows.
                  </li>
                  <li>Prune nodes where it's impossible to place all N queens.</li>
                </ol>

                <div className="mt-4">
                  <Button asChild>
                    <a href="/units/branch-and-bound/n-queens">View N-Queens Implementation</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
