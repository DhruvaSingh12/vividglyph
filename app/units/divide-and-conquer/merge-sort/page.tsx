"use client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { MergeSort } from "./components/MergeSort"
import { Overview } from "./components/Overview"
import { Explainer } from "./components/Explainer"

export default function MergeSortPage() {
  const faqQuestions = [
    {
      id: "complexity",
      question: "What's the time and space complexity of Merge Sort?",
    },
    {
      id: "stability",
      question: "Is Merge Sort a stable sorting algorithm?",
    },
    {
      id: "comparison",
      question: "How does Merge Sort compare to Quick Sort?",
    },
    {
      id: "applications",
      question: "What are practical applications of Merge Sort?",
    },
    {
      id: "optimization",
      question: "How can Merge Sort be optimized?",
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
        <h1 className="text-3xl font-bold mb-2">Merge Sort</h1>
        <p className="text-muted-foreground mb-2">
          A divide and conquer sorting algorithm that splits the array, sorts each part recursively, and then merges the sorted parts,
          guaranteeing O(n log n) performance in all cases.
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
          <MergeSort />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Merge Sort FAQ"
              algorithm="Merge Sort"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
