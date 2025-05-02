import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, BookOpen, Code, Lightbulb, Play, GraduationCap, Brain, ChevronRight, Star, Clock, Puzzle, BookOpenCheck, Shuffle } from "lucide-react"

export default function Home() {
  const units = [
    {
      id: "introduction",
      title: "Introduction to Algorithm Design",
      description: "Learn about algorithm correctness, complexity analysis, and mathematical foundations.",
      topics: 7,
      hours: 15,
      path: "/units/introduction",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      id: "divide-and-conquer",
      title: "Divide & Conquer",
      description: "Explore algorithms that break problems into smaller subproblems.",
      topics: 8,
      hours: 15,
      path: "/units/divide-and-conquer",
      icon: <Puzzle className="h-5 w-5" />,
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      id: "greedy-dynamic-programming",
      title: "Greedy & Dynamic Programming",
      description: "Study optimization techniques for solving complex problems.",
      topics: 6,
      hours: 15,
      path: "/units/greedy-dynamic-programming",
      icon: <Brain className="h-5 w-5" />,
      color: "from-purple-600 to-violet-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      id: "backtracking-branch-bound",
      title: "Backtracking & Branch-and-Bound",
      description: "Learn systematic search techniques for solving constraint satisfaction problems.",
      topics: 7,
      hours: 15,
      path: "/units/backtracking-branch-bound",
      icon: <BookOpenCheck className="h-5 w-5" />,
      color: "from-amber-600 to-orange-600",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
      id: "randomized-approximation",
      title: "Randomized & Approximation Algorithms",
      description: "Discover probabilistic approaches and solutions for hard problems.",
      topics: 5,
      hours: 15,
      path: "/units/randomized-approximation",
      icon: <Shuffle className="h-5 w-5" />,
      color: "from-rose-600 to-pink-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
    },
  ]

  return (
    <main className="min-h-[calc(100vh-4rem)] my-2 mr-2 shadow-lg ml-2 md:ml-0 bg-transparent rounded-lg flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 rounded-lg shadow-lg border border-separate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 -z-10"></div>
        <div className="absolute inset-0 -z-10">
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Interactive Algorithm Learning
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  Master Algorithms
                </span>
                <span> with Visual Learning</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                An interactive platform for learning, visualizing, and testing algorithms through animated visualizations and live code execution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild className="rounded-full shadow-lg shadow-primary/20">
                  <Link href="/units/introduction">
                    Start Learning<ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="shadow shadow-primary/10 rounded-full">
                  <Link href="#tracks">
                    Explore Learning Tracks<ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background" style={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}></div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Several</span> students already learning
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
              <div className="relative">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-xl">
                  <div className="h-full w-full rounded-lg bg-card p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-1 mb-3">
                      <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <div className="ml-2 text-xs font-medium">Algorithm Visualization</div>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 mb-4">
                      {Array(10).fill(0).map((_, i) => (
                        <div key={i} className="aspect-square rounded bg-primary/10 flex items-center justify-center text-xs font-mono text-primary">
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      {[30, 50, 80, 40, 60].map((width, i) => (
                        <div key={i} className="h-3 rounded bg-primary/20" style={{ width: `${width}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn With VividGlyph ??</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines visual learning with practical application to make algorithm concepts stick.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Interactive Visualizations</CardTitle>
                <CardDescription className="text-base">
                  Watch algorithms in action with step-by-step animations that bring abstract concepts to life.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Comprehensive Explanations</CardTitle>
                <CardDescription className="text-base">
                  Understand the theory, complexity, and real-world applications of each algorithm in detail.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-2 border-transparent transition-all hover:border-primary/20 hover:shadow-lg">
              <CardHeader className="p-6">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Live Algorithm Runner</CardTitle>
                <CardDescription className="text-base">
                  Test algorithms with your own custom inputs and see the results in real-time with interactive controls.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Units Section */}
      <section id="tracks" className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Learning Tracks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {units.map((unit) => (
              <Card key={unit.id} className="overflow-hidden border-0 bg-transparent shadow-none transition-all hover:-translate-y-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className={`md:col-span-3 ${unit.bgColor} rounded-xl p-4 flex items-center justify-center`}>
                    <div className={`h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${unit.color} text-white shadow-lg`}>
                      {unit.icon}
                    </div>
                  </div>

                  <div className="md:col-span-9">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-xl group">
                        <Link href={unit.path} className="inline-flex items-center gap-2 hover:underline decoration-primary/50 underline-offset-4">
                          {unit.title}
                          <ChevronRight className={`h-4 w-4 ${unit.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base">{unit.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="p-0 pb-4">
                      <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1.5">
                          <div className={`rounded-full ${unit.bgColor} p-1`}>
                            <Lightbulb className={`h-3.5 w-3.5 ${unit.textColor}`} />
                          </div>
                          <span>{unit.topics} topics</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`rounded-full ${unit.bgColor} p-1`}>
                            <Clock className={`h-3.5 w-3.5 ${unit.textColor}`} />
                          </div>
                          <span>{unit.hours} hours</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`rounded-full ${unit.bgColor} p-1`}>
                            <Star className={`h-3.5 w-3.5 ${unit.textColor}`} />
                          </div>
                          <span>Top-rated</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-0">
                      <Button asChild variant="outline" className={`group border-${unit.textColor}/20 hover:bg-${unit.textColor}/10`}>
                        <Link href={unit.path} className="gap-1">
                          <span>Explore Unit</span>
                          <ArrowRight className={`ml-1 h-4 w-4 ${unit.textColor} transition-transform group-hover:translate-x-1`} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
