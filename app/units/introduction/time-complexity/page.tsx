import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { Techniques } from "./components/Techniques"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function TimeComplexityPage() {
  // FAQ questions
  const faqQuestions = [
    {
      id: "best-vs-worst",
      question: "What's the difference between best, average and worst case time complexity?",
    },
    {
      id: "amortized",
      question: "What is amortized time complexity and when is it used?",
    },
    {
      id: "space-vs-time",
      question: "How do we balance space complexity and time complexity?",
    },
    {
      id: "analyze-recursive",
      question: "How do you analyze the time complexity of recursive algorithms?",
    }
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
        <h1 className="text-3xl font-bold mb-2">Time-complexity Analysis</h1>
        <p className="text-muted-foreground">
          Understand how to analyze algorithms by counting operations rather than just lines of code
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="techniques">Analysis Techniques</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="techniques" className="w-full">
          <Techniques />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Time Complexity Analysis FAQ"
              algorithm="Time Complexity"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
