import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { Steps } from "./components/Steps"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function SubstitutionMethodPage() {
  const faqQuestions = [
    {
      id: "vs-master-theorem",
      question: "When should I use the substitution method instead of the Master Theorem?",
    },
    {
      id: "common-mistakes",
      question: "What are common mistakes when applying the substitution method?",
    },
    {
      id: "induction-strengthening",
      question: "Why do we sometimes need to strengthen the induction hypothesis?",
    },
    {
      id: "recursion-tree-relation",
      question: "How does the substitution method relate to recursion trees?",
    },
    {
      id: "lower-bounds",
      question: "How can we use the substitution method to prove lower bounds?",
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
        <h1 className="text-3xl font-bold mb-2">Substitution Method</h1>
        <p className="text-muted-foreground">
          Learn how to solve recurrence relations using mathematical induction to analyze algorithm complexity
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="steps">Step-by-Step Guide</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="steps" className="w-full">
          <Steps />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Substitution Method FAQ"
              algorithm="Recurrence Relation Analysis"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
