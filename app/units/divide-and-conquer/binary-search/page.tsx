"use client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { BinarySearch } from "./components/BinarySearch"
import { Overview } from "./components/Overview"
import { Explainer } from "./components/Explainer"

export default function BinarySearchPage() {
  const faqQuestions = [
    {
      id: "requirement",
      question: "Why does binary search require a sorted array?",
    },
    {
      id: "time-complexity",
      question: "What is the time complexity of binary search and why?",
    },
    {
      id: "iterative-vs-recursive",
      question: "What are the differences between iterative and recursive binary search?",
    },
    {
      id: "real-world-applications",
      question: "What are some real-world applications of binary search?",
    },
    {
      id: "variations",
      question: "What are some variations of the binary search algorithm?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Link href="/units/divide-and-conquer">
            <Button variant="ghost" size="sm" className="h-8 pl-0">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Divide and Conquer
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Binary Search</h1>
        <p className="text-muted-foreground mb-2">
          Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly 
          dividing the search interval in half. If the target value is less than the middle element of the interval, the 
          search continues in the lower half; if greater, in the upper half.
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="explainer">How It Works</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Demo</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="explainer" className="w-full">
          <Explainer />
        </TabsContent>

        <TabsContent value="interactive" className="w-full">
          <BinarySearch />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Binary Search FAQ"
              algorithm="Binary Search"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
