import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { MathematicalInduction } from "./components/MathematicalInduction"
import { RecurrenceRelations } from "./components/RecurrenceRelations"
import { Combinatorics } from "./components/Combinatorics"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function MathematicalToolsPage() {
  const faqQuestions = [
    {
      id: "induction-applications",
      question: "How is mathematical induction applied in algorithm analysis?",
    },
    {
      id: "recurrence-solving",
      question: "What are the different methods for solving recurrence relations?",
    },
    {
      id: "combinatorics-algorithms",
      question: "How are combinatorial principles used in algorithm design?",
    },
    {
      id: "probability-randomized",
      question: "How is probability theory applied in randomized algorithms?",
    },
    {
      id: "graph-theory",
      question: "What graph theory concepts are most important for algorithm design?",
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
        <h1 className="text-3xl font-bold mb-2">Mathematical Tools</h1>
        <p className="text-muted-foreground">
          Learn essential mathematical concepts like induction and recurrence relations for algorithm analysis
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="induction">Mathematical Induction</TabsTrigger>
          <TabsTrigger value="recurrence">Recurrence Relations</TabsTrigger>
          <TabsTrigger value="combinatorics">Combinatorics</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="induction" className="w-full">
          <MathematicalInduction />
        </TabsContent>

        <TabsContent value="recurrence" className="w-full">
          <RecurrenceRelations />
        </TabsContent>

        <TabsContent value="combinatorics" className="w-full">
          <Combinatorics />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Mathematical Tools FAQ"
              algorithm="Algorithm Analysis"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
