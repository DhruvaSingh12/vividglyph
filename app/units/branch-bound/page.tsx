import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Branch and Bound Algorithms",
  description: "Learn about branch and bound algorithms and their applications",
}

export default function BranchAndBoundPage() {
  const algorithms = [
    {
      title: "Introduction",
      description: "Introduction to branch and bound algorithms",
      href: "/units/branch-and-bound/introduction",
    },
    {
      title: "N-Queens Problem",
      description: "Solving the N-Queens problem using branch and bound",
      href: "/units/branch-and-bound/n-queens",
    },
    {
      title: "Subset Sum Problem",
      description: "Solving the Subset Sum problem using branch and bound",
      href: "/units/branch-and-bound/subset-sum",
    },
    {
      title: "Hamilton Circuit Problem",
      description: "Finding Hamilton circuits using branch and bound",
      href: "/units/branch-and-bound/hamilton-circuit",
    },
    {
      title: "Knapsack Problem",
      description: "Solving the 0/1 Knapsack problem using branch and bound",
      href: "/units/branch-and-bound/knapsack",
    },
    {
      title: "Traveling Salesman Problem",
      description: "Solving the TSP using branch and bound",
      href: "/units/branch-and-bound/tsp",
    },
    {
      title: "Depth-First Search",
      description: "Understanding DFS algorithm and its applications",
      href: "/units/branch-and-bound/dfs",
    },
    {
      title: "Breadth-First Search",
      description: "Understanding BFS algorithm and its applications",
      href: "/units/branch-and-bound/bfs",
    },
    {
      title: "Floyd-Warshall Algorithm",
      description: "Finding shortest paths in a weighted graph",
      href: "/units/branch-and-bound/floyd-warshall",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Branch and Bound Algorithms</h1>
        <p className="text-muted-foreground">
          Branch and bound is an algorithm design paradigm for discrete and combinatorial optimization problems. It
          consists of a systematic enumeration of candidate solutions by means of state space search: the set of
          candidate solutions is thought of as forming a rooted tree with the full set at the root.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {algorithms.map((algorithm) => (
          <Link key={algorithm.href} href={algorithm.href}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{algorithm.title}</CardTitle>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
