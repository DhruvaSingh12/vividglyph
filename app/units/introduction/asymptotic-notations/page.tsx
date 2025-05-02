import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { NotationTypes } from "./components/NotationTypes"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function AsymptoticNotationsPage() {
  const faqQuestions = [
    {
      id: "big-o-vs-theta",
      question: "What's the difference between Big O and Big Theta notation?",
    },
    {
      id: "tightest-bound",
      question: "How do I determine the tightest asymptotic bound for an algorithm?",
    },
    {
      id: "little-notations",
      question: "When should I use little o and little omega notations?",
    },
    {
      id: "space-complexity",
      question: "How does asymptotic notation apply to space complexity?",
    },
    {
      id: "amortized-analysis",
      question: "What is amortized analysis and when is it useful?",
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
        <h1 className="text-3xl font-bold mb-2">Asymptotic Notations</h1>
        <p className="text-muted-foreground">
          Understanding the mathematical tools used to analyze algorithm efficiency and compare algorithm performance
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notation-types">Notation Types</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="notation-types" className="w-full">
          <NotationTypes />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Asymptotic Notations FAQ"
              algorithm="Algorithm Analysis"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
