"use client"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { NQueens } from "./components/NQueens"
import { Overview } from "./components/Overview"
import { Explainer } from "./components/Explainer"

export default function NQueensPage() {
  const faqQuestions = [
    {
      id: "complexity",
      question: "What's the time and space complexity of the N-Queens problem?",
    },
    {
      id: "practical",
      question: "Why does the 6-Queens problem only hvae 4 solutions in comparison to 10 solutions for 5-Queens?",
    },
    {
      id: "alternatives",
      question: "Are there alternative algorithms to solve the N-Queens problem?",
    },
    {
      id: "optimizations",
      question: "What optimizations can be made to the backtracking approach?",
    },
    {
      id: "constraint",
      question: "How does N-Queens relate to constraint satisfaction problems?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Link href="/units/branch-bound">
            <Button variant="ghost" size="sm" className="h-8 pl-0">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Branch and Bound
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">N-Queens Problem</h1>
        <p className="text-muted-foreground mb-2">
          A classic combinatorial problem that involves placing N chess queens on an N×N chessboard 
          so that no two queens threaten each other, solved using backtracking.
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
          <NQueens />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="N-Queens Problem FAQ"
              algorithm="N-Queens"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
