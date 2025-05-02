import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

export default function DivideAndConquerUnit() {
  const topics = [
    {
      title: "Binary Search",
      description:
        "Learn how to efficiently find an element in a sorted array by repeatedly dividing the search space in half.",
      path: "/units/divide-and-conquer/binary-search",
    },
    {
      title: "Insertion Sort",
      description: "Understand this simple sorting algorithm that builds the final sorted array one item at a time.",
      path: "/units/divide-and-conquer/insertion-sort",
    },
    {
      title: "Merge Sort",
      description:
        "Explore a divide-and-conquer sorting algorithm that divides the array, sorts the subarrays, and merges them.",
      path: "/units/divide-and-conquer/merge-sort",
    },
    {
      title: "Quick Sort",
      description: "Study this efficient sorting algorithm that uses a pivot element to partition the array.",
      path: "/units/divide-and-conquer/quick-sort",
    },
    {
      title: "Strassen's Matrix Multiplication",
      description: "Learn an algorithm for multiplying matrices more efficiently than the standard method.",
      path: "/units/divide-and-conquer/strassen-matrix",
    },
    {
      title: "Maximum Subarray",
      description: "Discover how to find the contiguous subarray with the largest sum using divide-and-conquer.",
      path: "/units/divide-and-conquer/maximum-subarray",
    },
    {
      title: "Finding Min & Max",
      description: "Learn how to find both the minimum and maximum elements in an array with fewer comparisons.",
      path: "/units/divide-and-conquer/min-max",
    },
    {
      title: "Closest-pair & Convex Hull",
      description: "Explore geometric algorithms that use divide-and-conquer techniques to solve spatial problems.",
      path: "/units/divide-and-conquer/closest-pair",
    },
  ]

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Divide & Conquer</h1>
        <div className="flex items-center text-muted-foreground mb-4">
          <Clock className="mr-2 h-4 w-4" />
          <span>15 hours • 8 topics</span>
        </div>
        <p className="text-lg">
          This unit explores the divide-and-conquer paradigm, where problems are broken down into smaller subproblems,
          solved independently, and then combined to form the solution to the original problem. You'll learn classic
          algorithms like Binary Search, Merge Sort, and Quick Sort, as well as more advanced applications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((topic) => (
          <Card key={topic.title} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={topic.path}>
                  Explore Topic <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
