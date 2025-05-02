import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Overview } from "./components/Overview"
import { ProofTechniques } from "./components/ProofTechniques"
import { Examples } from "./components/Examples"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CorrectnessProofPage() {
  const faqQuestions = [
    {
      id: "loop-invariant",
      question: "What is a loop invariant and how is it used in algorithm proofs?",
    },
    {
      id: "induction-vs-invariant",
      question: "How does mathematical induction differ from loop invariants?",
    },
    {
      id: "common-mistakes",
      question: "What are common mistakes when proving algorithm correctness?",
    },
    {
      id: "partial-correctness",
      question: "What's the difference between partial and total correctness?",
    },
    {
      id: "formal-verification",
      question: "How is formal verification used in software development?",
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
        <h1 className="text-3xl font-bold mb-2">Correctness & Proof Techniques</h1>
        <p className="text-muted-foreground">
          Learn how to prove that an algorithm correctly solves a problem using mathematical techniques
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-8 w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="techniques">Proof Techniques</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="w-full">
          <Overview />
        </TabsContent>

        <TabsContent value="techniques" className="w-full">
          <ProofTechniques />
        </TabsContent>

        <TabsContent value="examples" className="w-full">
          <Examples />
        </TabsContent>

        <TabsContent value="faq" className="w-full">
          <div className="w-full">
            <MiniFAQ
              title="Correctness & Proof Techniques FAQ"
              algorithm="Algorithm Correctness"
              questions={faqQuestions}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
