import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ComplexityInfo {
  time: {
    best: string
    average: string
    worst: string
  }
  space: string
}

interface ExplainerProps {
  title: string
  description: string
  approach: string
  phases: {
    title: string
    description: string
  }[]
  complexity: ComplexityInfo
  pseudocode?: string
}

export function AlgorithmExplainer({ title, description, approach, phases, complexity, pseudocode }: ExplainerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="approach">
          <TabsList className="mb-4">
            <TabsTrigger value="approach">Approach</TabsTrigger>
            <TabsTrigger value="phases">Phases</TabsTrigger>
            <TabsTrigger value="complexity">Complexity</TabsTrigger>
            {pseudocode && <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>}
          </TabsList>

          <TabsContent value="approach" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <p>{approach}</p>
            </div>
          </TabsContent>

          <TabsContent value="phases" className="space-y-4">
            {phases.map((phase, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="complexity" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Time Complexity</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Best Case</p>
                    <Badge variant="outline" className="text-green-500 bg-green-500/10">
                      {complexity.time.best}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Average Case</p>
                    <Badge variant="outline" className="text-blue-500 bg-blue-500/10">
                      {complexity.time.average}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Worst Case</p>
                    <Badge variant="outline" className="text-red-500 bg-red-500/10">
                      {complexity.time.worst}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Space Complexity</h3>
                <Badge variant="outline" className="text-purple-500 bg-purple-500/10">
                  {complexity.space}
                </Badge>
              </div>
            </div>
          </TabsContent>

          {pseudocode && (
            <TabsContent value="pseudocode" className="space-y-4">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{pseudocode}</code>
              </pre>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
