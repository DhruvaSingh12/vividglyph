"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HamiltonCircuitVisualizer } from "./components/hamilton-circuit-visualizer"

interface Node {
  id: number
  label: string
}

interface Edge {
  source: number
  target: number
  weight: number
}

interface Graph {
  nodes: Node[]
  edges: Edge[]
}

export default function HamiltonCircuitPage() {
  const [activeTab, setActiveTab] = useState("algorithm")
  const [input, setInput] = useState(
    JSON.stringify(
      {
        nodes: [
          { id: 0, label: "A" },
          { id: 1, label: "B" },
          { id: 2, label: "C" },
          { id: 3, label: "D" },
          { id: 4, label: "E" },
        ],
        edges: [
          { source: 0, target: 1, weight: 2 },
          { source: 0, target: 2, weight: 3 },
          { source: 0, target: 3, weight: 1 },
          { source: 0, target: 4, weight: 5 },
          { source: 1, target: 2, weight: 4 },
          { source: 1, target: 3, weight: 2 },
          { source: 1, target: 4, weight: 3 },
          { source: 2, target: 3, weight: 6 },
          { source: 2, target: 4, weight: 2 },
          { source: 3, target: 4, weight: 4 },
        ],
      },
      null,
      2,
    ),
  )
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    bestPath: number[]
    bestCost: number
    steps: Array<{ currentPath: number[]; bestPath: number[]; message: string }>
  } | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const parseInput = (input: string): Graph => {
    try {
      const parsed = JSON.parse(input)

      if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
        throw new Error("Input must have a 'nodes' array")
      }

      if (!parsed.edges || !Array.isArray(parsed.edges)) {
        throw new Error("Input must have an 'edges' array")
      }

      // Validate nodes
      parsed.nodes.forEach((node: any) => {
        if (typeof node.id !== "number") {
          throw new Error("Each node must have a numeric 'id'")
        }
        if (typeof node.label !== "string") {
          throw new Error("Each node must have a 'label' string")
        }
      })

      // Validate edges
      parsed.edges.forEach((edge: any) => {
        if (typeof edge.source !== "number") {
          throw new Error("Each edge must have a numeric 'source'")
        }
        if (typeof edge.target !== "number") {
          throw new Error("Each edge must have a numeric 'target'")
        }
        if (typeof edge.weight !== "number") {
          throw new Error("Each edge must have a numeric 'weight'")
        }
      })

      return parsed as Graph
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Invalid input: ${e.message}`)
      }
      throw new Error("Invalid input")
    }
  }

  const runAlgorithm = (graph: Graph) => {
    setIsRunning(true)
    setError(null)

    try {
      const steps: Array<{ currentPath: number[]; bestPath: number[]; message: string }> = []
      const n = graph.nodes.length

      // Create adjacency matrix
      const adjMatrix: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n).fill(Number.POSITIVE_INFINITY))

      // Fill adjacency matrix with edge weights
      graph.edges.forEach((edge) => {
        adjMatrix[edge.source][edge.target] = edge.weight
        adjMatrix[edge.target][edge.source] = edge.weight // Assuming undirected graph
      })

      // Initialize variables for branch and bound
      let bestPath: number[] = []
      let bestCost = Number.POSITIVE_INFINITY

      // Function to check if a vertex can be added to the current path
      const isSafe = (v: number, pos: number, path: number[]): boolean => {
        // Check if the vertex is already in the path
        if (path.includes(v)) {
          return false
        }

        // Check if there is an edge from the last vertex to this vertex
        if (pos > 0 && adjMatrix[path[pos - 1]][v] === Number.POSITIVE_INFINITY) {
          return false
        }

        return true
      }

      // Recursive function to find Hamilton Circuit using Branch and Bound
      const hamiltonCircuitUtil = (path: number[], pos: number, cost: number, bound: number) => {
        // If all vertices are included in the path
        if (pos === n) {
          // Check if there is an edge from the last vertex to the first vertex
          if (adjMatrix[path[pos - 1]][path[0]] !== Number.POSITIVE_INFINITY) {
            const totalCost = cost + adjMatrix[path[pos - 1]][path[0]]

            // Update best path if this path is better
            if (totalCost < bestCost) {
              bestCost = totalCost
              bestPath = [...path, path[0]] // Complete the circuit by adding the start vertex

              steps.push({
                currentPath: [...path],
                bestPath: [...bestPath],
                message: `Found new best circuit with cost ${bestCost}`,
              })
            }
          }
          return
        }

        // Try different vertices at the current position
        for (let v = 0; v < n; v++) {
          // Check if this vertex can be added to the path
          if (isSafe(v, pos, path)) {
            path[pos] = v

            // Calculate new cost
            const newCost = pos > 0 ? cost + adjMatrix[path[pos - 1]][v] : 0

            // Calculate bound for this branch
            let newBound = bound
            if (pos > 0) {
              newBound = bound - getMinOutgoing(path[pos - 1]) + adjMatrix[path[pos - 1]][v]
            }

            // Add step for visualization
            steps.push({
              currentPath: path.slice(0, pos + 1),
              bestPath: [...bestPath],
              message: `Exploring vertex ${graph.nodes[v].label} at position ${pos + 1}`,
            })

            // If the bound is less than the best cost, explore this branch
            if (newBound < bestCost) {
              hamiltonCircuitUtil(path, pos + 1, newCost, newBound)
            } else {
              steps.push({
                currentPath: path.slice(0, pos + 1),
                bestPath: [...bestPath],
                message: `Pruned branch with bound ${newBound} > best cost ${bestCost}`,
              })
            }

            // Remove current vertex to backtrack
            path[pos] = -1
          }
        }
      }

      // Function to get minimum outgoing edge weight for a vertex
      const getMinOutgoing = (v: number): number => {
        let min = Number.POSITIVE_INFINITY
        for (let i = 0; i < n; i++) {
          if (i !== v && adjMatrix[v][i] < min) {
            min = adjMatrix[v][i]
          }
        }
        return min === Number.POSITIVE_INFINITY ? 0 : min
      }

      // Calculate initial bound
      let initialBound = 0
      for (let i = 0; i < n; i++) {
        initialBound += getMinOutgoing(i)
      }

      // Start with vertex 0
      const path = Array(n).fill(-1)
      path[0] = 0

      steps.push({
        currentPath: [0],
        bestPath: [],
        message: "Starting with vertex A",
      })

      // Find Hamilton Circuit
      hamiltonCircuitUtil(path, 1, 0, initialBound)

      if (bestPath.length === 0) {
        steps.push({
          currentPath: [],
          bestPath: [],
          message: "No Hamilton Circuit found",
        })
      }

      setResult({
        bestPath,
        bestCost,
        steps,
      })

      setCurrentStepIndex(0)
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("An error occurred while running the algorithm")
      }
    } finally {
      setIsRunning(false)
    }
  }

  const handleRun = () => {
    try {
      const graph = parseInput(input)
      runAlgorithm(graph)
      setActiveTab("visualization")
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("An error occurred while parsing the input")
      }
    }
  }

  const handleNextStep = () => {
    if (result && currentStepIndex < result.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleReset = () => {
    setCurrentStepIndex(0)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Hamilton Circuit Problem</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code">Code Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithm" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Hamilton Circuit Problem</h2>

              <div className="prose dark:prose-invert max-w-none">
                <h3>Problem Statement</h3>
                <p>
                  The Hamilton Circuit problem is a classic graph problem: find a cycle in a graph that visits each
                  vertex exactly once and returns to the starting vertex.
                </p>

                <h3>Formal Definition</h3>
                <p>Given a graph G = (V, E), find a cycle that:</p>
                <ul>
                  <li>Visits each vertex in V exactly once</li>
                  <li>Returns to the starting vertex</li>
                  <li>In the weighted version, minimizes the total weight of the edges in the cycle</li>
                </ul>

                <h3>Branch and Bound Approach</h3>
                <p>The Branch and Bound approach for the Hamilton Circuit problem involves:</p>
                <ol>
                  <li>
                    <strong>State Space Tree:</strong> Each level represents adding a vertex to the path
                  </li>
                  <li>
                    <strong>Branching:</strong> For each unvisited vertex, try adding it to the path
                  </li>
                  <li>
                    <strong>Bounding:</strong> Prune branches that cannot lead to a valid Hamilton circuit
                  </li>
                  <li>
                    <strong>Solution:</strong> A path from the root to a leaf represents a Hamilton circuit
                  </li>
                </ol>

                <h3>Pruning Strategies</h3>
                <p>We can prune branches in several ways:</p>
                <ul>
                  <li>
                    <strong>Connectivity Check:</strong> Skip vertices that are not connected to the last vertex in the
                    path
                  </li>
                  <li>
                    <strong>Visited Check:</strong> Skip vertices that have already been visited
                  </li>
                  <li>
                    <strong>Lower Bound:</strong> Calculate a lower bound on the cost of completing the circuit and
                    prune if it exceeds the best solution found so far
                  </li>
                </ul>

                <h3>Time Complexity</h3>
                <p>
                  The worst-case time complexity is still O(n!), but with effective pruning, the average case can be
                  much better.
                </p>

                <h3>Applications</h3>
                <ul>
                  <li>Traveling Salesman Problem (TSP)</li>
                  <li>Circuit design in electronics</li>
                  <li>Network routing</li>
                  <li>DNA sequencing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Input</h2>

              <div className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter graph as JSON"
                  className="font-mono h-64"
                />

                <div className="flex justify-between">
                  <Button onClick={handleRun} disabled={isRunning}>
                    {isRunning ? "Running..." : "Run Algorithm"}
                  </Button>

                  {result && (
                    <div className="space-x-2">
                      <Button onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                        Previous Step
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        disabled={!result || currentStepIndex === result.steps.length - 1}
                      >
                        Next Step
                      </Button>
                      <Button onClick={handleReset} disabled={!result || currentStepIndex === 0}>
                        Reset
                      </Button>
                    </div>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {result && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Result</h2>

                  <div className="space-y-4">
                    <p>
                      <strong>Step:</strong> {currentStepIndex + 1} of {result.steps.length}
                    </p>

                    <p>
                      <strong>Best Circuit Cost:</strong>{" "}
                      {result.bestCost === Number.POSITIVE_INFINITY ? "None found" : result.bestCost}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <HamiltonCircuitVisualizer
                nodes={parseInput(input).nodes}
                edges={parseInput(input).edges}
                currentPath={result.steps[currentStepIndex].currentPath}
                bestPath={result.steps[currentStepIndex].bestPath}
                message={result.steps[currentStepIndex].message}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Code Implementation</h2>

              <div className="prose dark:prose-invert max-w-none">
                <pre className="bg-muted p-4 rounded-md overflow-auto">
                  <code className="language-javascript">{`function hamiltonCircuit(graph) {
  const n = graph.nodes.length;
  
  // Create adjacency matrix
  const adjMatrix = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  
  // Fill adjacency matrix with edge weights
  graph.edges.forEach(edge => {
    adjMatrix[edge.source][edge.target] = edge.weight;
    adjMatrix[edge.target][edge.source] = edge.weight; // Assuming undirected graph
  });
  
  // Initialize variables for branch and bound
  let bestPath = [];
  let bestCost = Infinity;
  const steps = [];
  
  // Function to check if a vertex can be added to the current path
  function isSafe(v, pos, path) {
    // Check if the vertex is already in the path
    if (path.includes(v)) {
      return false;
    }
    
    // Check if there is an edge from the last vertex to this vertex
    if (pos > 0 && adjMatrix[path[pos - 1]][v] === Infinity) {
      return false;
    }
    
    return true;
  }
  
  // Function to get minimum outgoing edge weight for a vertex
  function getMinOutgoing(v) {
    let min = Infinity;
    for (let i = 0; i < n; i++) {
      if (i !== v && adjMatrix[v][i] < min) {
        min = adjMatrix[v][i];
      }
    }
    return min === Infinity ? 0 : min;
  }
  
  // Calculate initial bound
  let initialBound = 0;
  for (let i = 0; i < n; i++) {
    initialBound += getMinOutgoing(i);
  }
  
  // Recursive function to find Hamilton Circuit using Branch and Bound
  function hamiltonCircuitUtil(path, pos, cost, bound) {
    // If all vertices are included in the path
    if (pos === n) {
      // Check if there is an edge from the last vertex to the first vertex
      if (adjMatrix[path[pos - 1]][path[0]] !== Infinity) {
        const totalCost = cost + adjMatrix[path[pos - 1]][path[0]];
        
        // Update best path if this path is better
        if (totalCost < bestCost) {
          bestCost = totalCost;
          bestPath = [...path, path[0]]; // Complete the circuit by adding the start vertex
          
          steps.push({
            currentPath: [...path],
            bestPath: [...bestPath],
            message: \`Found new best circuit with cost \${bestCost}\`
          });
        }
      }
      return;
    }
    
    // Try different vertices at the current position
    for (let v = 0; v < n; v++) {
      // Check if this vertex can be added to the path
      if (isSafe(v, pos, path)) {
        path[pos] = v;
        
        // Calculate new cost
        const newCost = pos > 0 ? cost + adjMatrix[path[pos - 1]][v] : 0;
        
        // Calculate bound for this branch
        let newBound = bound;
        if (pos > 0) {
          newBound = bound - getMinOutgoing(path[pos - 1]) + adjMatrix[path[pos - 1]][v];
        }
        
        // Add step for visualization
        steps.push({
          currentPath: path.slice(0, pos + 1),
          bestPath: [...bestPath],
          message: \`Exploring vertex \${graph.nodes[v].label} at position \${pos + 1}\`
        });
        
        // If the bound is less than the best cost, explore this branch
        if (newBound < bestCost) {
          hamiltonCircuitUtil(path, pos + 1, newCost, newBound);
        } else {
          steps.push({
            currentPath: path.slice(0, pos + 1),
            bestPath: [...bestPath],
            message: \`Pruned branch with bound \${newBound} > best cost \${bestCost}\`
          });
        }
        
        // Remove current vertex to backtrack
        path[pos] = -1;
      }
    }
  }
  
  // Start with vertex 0
  const path = Array(n).fill(-1);
  path[0] = 0;
  
  steps.push({
    currentPath: [0],
    bestPath: [],
    message: "Starting with vertex A"
  });
  
  // Find Hamilton Circuit
  hamiltonCircuitUtil(path, 1, 0, initialBound);
  
  if (bestPath.length === 0) {
    steps.push({
      currentPath: [],
      bestPath: [],
      message: "No Hamilton Circuit found"
    });
  }
  
  return {
    bestPath,
    bestCost,
    steps
  };
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
