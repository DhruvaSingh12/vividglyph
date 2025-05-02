"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MiniFAQ } from "@/components/mini-faq"
import { Explainer } from "./components/Explainer"
import { ClosestPair } from "./components/ClosestPair"
import { ConvexHull } from "./components/ConvexHull"
import { Runner } from "./components/Runner"

export default function ClosestPairPage() {
  // FAQ questions
  const faqQuestions = [
    {
      id: "time-complexity",
      question: "What is the time complexity of the closest pair algorithm?",
    },
    {
      id: "strip-property",
      question: "Why do we only need to check 7 points ahead in the strip?",
    },
    {
      id: "applications",
      question: "What are real-world applications of the closest pair problem?",
    },
    {
      id: "higher-dimensions",
      question: "Can this algorithm be extended to higher dimensions?",
    },
    {
      id: "optimizations",
      question: "Are there any optimizations for the closest pair algorithm?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Closest-pair & Convex Hull</h1>
        <p className="text-muted-foreground">
          Explore geometric algorithms that use divide-and-conquer techniques to solve spatial problems
        </p>
      </div>

      <Tabs defaultValue="explainer" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="explainer">Explainer</TabsTrigger>
          <TabsTrigger value="closest-pair">Closest Pair</TabsTrigger>
          <TabsTrigger value="convex-hull">Convex Hull</TabsTrigger>
          <TabsTrigger value="runner">Point Runner</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="explainer">
          <Explainer />
        </TabsContent>

        <TabsContent value="closest-pair">
          <ClosestPair />
        </TabsContent>

        <TabsContent value="convex-hull">
          <ConvexHull />
        </TabsContent>

        <TabsContent value="runner">
          <Runner />
        </TabsContent>

        <TabsContent value="faq">
          <MiniFAQ
            title="Geometric Algorithms FAQ"
            algorithm="Geometric Divide-and-Conquer"
            questions={faqQuestions}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
