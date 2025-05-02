import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { TreeConstruction } from "./components/TreeConstruction"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function RecursionTreesPage() {
  const faqQuestions = [
    {
      id: "vs-master-theorem",
      question: "When should I use recursion trees instead of the Master Theorem?",
    },
    {
      id: "basic-patterns",
      question: "What are the common patterns in recursion trees?",
    },
    {
      id: "uneven-branches",
      question: "How do I handle recursion trees with uneven branches?",
    },
    {
      id: "substitution-relation",
      question: "How do recursion trees relate to the substitution method?",
    },
    {
      id: "worst-case",
      question: "How can I analyze worst-case scenarios using recursion trees?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Link href="/units/introduction">
            <Button variant="ghost" size="sm" className="h-8 pl-0">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Introduction to Algorithm Design
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Recursion Trees</h1>
        <p className="text-muted-foreground">
          Learn how to visualize and analyze recursive algorithms using tree diagrams
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="construction">Tree Construction</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="construction" className="w-full">
          <TreeConstruction />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Recursion Trees FAQ"
              algorithm="Recurrence Analysis"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
