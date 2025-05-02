import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { TheoremExplanation } from "./components/TheoremExplanation"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function MasterTheoremPage() {
  const faqQuestions = [
    {
      id: "master-theorem-limitations",
      question: "What are the limitations of the Master Theorem?",
    },
    {
      id: "compare-analysis-methods",
      question: "How does the Master Theorem compare to other recurrence solving methods?",
    },
    {
      id: "apply-case-2",
      question: "When should I apply Case 2 of the Master Theorem?",
    },
    {
      id: "regularity-condition",
      question: "What is the regularity condition in Case 3 and why is it needed?",
    },
    {
      id: "recursive-algorithms",
      question: "What common recursive algorithms can be analyzed with the Master Theorem?",
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
        <h1 className="text-3xl font-bold mb-2">The Master Theorem</h1>
        <p className="text-muted-foreground">
          Learn how to analyze the time complexity of divide-and-conquer algorithms using the Master Theorem
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="theorem-explanation">Theorem Explanation</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="theorem-explanation" className="w-full">
          <TheoremExplanation />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Master Theorem FAQ"
              algorithm="Algorithm Analysis"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
