import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

export default function IntroductionUnit() {
  const topics = [
    {
      title: "Correctness & Proof Techniques",
      description: "Learn how to prove that an algorithm correctly solves a problem using mathematical techniques.",
      path: "/units/introduction/correctness-proof",
    },
    {
      title: "Time-complexity Analysis",
      description: "Understand how to analyze algorithms by counting operations rather than just lines of code.",
      path: "/units/introduction/time-complexity",
    },
    {
      title: "Asymptotic Notations",
      description: "Master the mathematical notations used to describe algorithm efficiency: Big O, Theta, Omega.",
      path: "/units/introduction/asymptotic-notations",
    },
    {
      title: "Mathematical Tools",
      description:
        "Learn essential mathematical concepts like induction and recurrence relations for algorithm analysis.",
      path: "/units/introduction/mathematical-tools",
    },
    {
      title: "Substitution Method",
      description:
        "Study a technique for solving recurrence relations by guessing a solution and proving it by induction.",
      path: "/units/introduction/substitution-method",
    },
    {
      title: "Recursion Trees",
      description: "Visualize and analyze recursive algorithms using tree diagrams to understand their complexity.",
      path: "/units/introduction/recursion-trees",
    },
    {
      title: "Master Theorem",
      description:
        "Learn a powerful tool for solving recurrence relations that arise in divide-and-conquer algorithms.",
      path: "/units/introduction/master-theorem",
    },
  ]

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Introduction to Algorithm Design</h1>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>15 hours • 7 topics</span>
          </div>
          <p className="max-w-3xl text-lg">
            This unit covers the fundamental concepts and techniques needed to analyze, design, and reason about algorithms. You'll learn how to prove algorithm correctness, analyze time and space complexity, and use mathematical tools to understand algorithm behavior.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topics.map((topic) => (
            <Card key={topic.title} className="transition-all hover:-translate-y-1 hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2">{topic.title}</CardTitle>
                <CardDescription className="line-clamp-3">{topic.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full group">
                  <Link href={topic.path} className="flex items-center justify-center">
                    <span>Explore Topic</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
