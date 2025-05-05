"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { BranchBoundKnapsackVisualizer } from "./components/knapsack-visualizer"

export default function KnapsackPage() {
  const [activeTab, setActiveTab] = useState("algorithm")
  const [input, setInput] = useState(`{
  "capacity": 50,
  "items": [
    {"weight": 10, "value": 60},
    {"weight": 20, "value": 100},
    {"weight": 30, "value": 120}
  ]
}`)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleRunAlgorithm = () => {
    try {
      const parsedInput = JSON.parse(input)

      if (!parsedInput.capacity || typeof parsedInput.capacity !== "number") {
        throw new Error("Capacity must be a number")
      }

      if (!parsedInput.items || !Array.isArray(parsedInput.items)) {
        throw new Error("Items must be an array")
      }

      for (const item of parsedInput.items) {
        if (typeof item.weight !== "number" || typeof item.value !== "number") {
          throw new Error("Each item must have a numeric weight and value")
        }
      }

      // Run the algorithm
      const result = knapsackBranchAndBound(parsedInput.items, parsedInput.capacity)
      setResult(result)
      setError(null)
    } catch (err: any) {
      setError(err.message || "Invalid input format")
      setResult(null)
    }
  }

  // Branch and Bound Knapsack algorithm
  function knapsackBranchAndBound(items: any[], capacity: number) {
    // Sort items by value/weight ratio in non-increasing order
    const sortedItems = [...items]
      .map((item, index) => ({
        ...item,
        id: index,
        ratio: item.value / item.weight,
      }))
      .sort((a, b) => b.ratio - a.ratio)

    const n = sortedItems.length

    // Initialize variables
    let maxProfit = 0
    let bestSolution = Array(n).fill(false)

    // Create a queue for branch and bound
    const queue: any[] = []

    // Create a dummy node
    const u = {
      level: -1,
      profit: 0,
      weight: 0,
      bound: 0,
      included: Array(n).fill(false),
    }

    // Calculate bound for dummy node
    u.bound = getBound(u, n, capacity, sortedItems)
    queue.push(u)

    // Process nodes in the queue
    while (queue.length > 0) {
      // Extract the node with the highest bound
      const node = queue.shift()!

      // If it's a promising node
      if (node.bound > maxProfit) {
        // Consider the next level
        const level = node.level + 1

        if (level < n) {
          // Create a child that includes the next item if possible
          if (node.weight + sortedItems[level].weight <= capacity) {
            const includeNode = {
              level,
              profit: node.profit + sortedItems[level].value,
              weight: node.weight + sortedItems[level].weight,
              bound: 0,
              included: [...node.included],
            }
            includeNode.included[level] = true

            // Update maxProfit if needed
            if (includeNode.profit > maxProfit) {
              maxProfit = includeNode.profit
              bestSolution = [...includeNode.included]
            }

            // Calculate bound and add to queue if promising
            includeNode.bound = getBound(includeNode, n, capacity, sortedItems)
            if (includeNode.bound > maxProfit) {
              queue.push(includeNode)
            }
          }

          // Create a child that excludes the next item
          const excludeNode = {
            level,
            profit: node.profit,
            weight: node.weight,
            bound: 0,
            included: [...node.included],
          }

          // Calculate bound and add to queue if promising
          excludeNode.bound = getBound(excludeNode, n, capacity, sortedItems)
          if (excludeNode.bound > maxProfit) {
            queue.push(excludeNode)
          }
        }
      }
    }

    // Map the solution back to original item indices
    const selectedItems = sortedItems
      .filter((_, index) => bestSolution[index])
      .map((item) => ({ id: item.id, weight: item.weight, value: item.value }))

    return {
      maxProfit,
      selectedItems,
      totalWeight: selectedItems.reduce((sum, item) => sum + item.weight, 0),
    }
  }

  // Calculate the bound for a node
  function getBound(node: any, n: number, capacity: number, items: any[]) {
    // If weight exceeds capacity, return 0 as bound
    if (node.weight >= capacity) return 0

    // Initialize bound as current profit
    let profitBound = node.profit
    let j = node.level + 1
    let totalWeight = node.weight

    // Keep adding items while weight constraint is not violated
    while (j < n && totalWeight + items[j].weight <= capacity) {
      totalWeight += items[j].weight
      profitBound += items[j].value
      j++
    }

    // Add fraction of the next item if possible
    if (j < n) {
      profitBound += (capacity - totalWeight) * items[j].ratio
    }

    return profitBound
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">0/1 Knapsack Problem (Branch and Bound)</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code">Code Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithm" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">The 0/1 Knapsack Problem</h2>

              <div className="space-y-4">
                <p>
                  The 0/1 Knapsack problem is a classic optimization problem: given a set of items, each with a weight
                  and a value, determine which items to include in a collection so that the total weight is less than or
                  equal to a given limit and the total value is as large as possible.
                </p>

                <h3 className="text-xl font-semibold mt-6">Problem Statement</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We have n items, each with a weight w[i] and a value v[i]</li>
                  <li>We have a knapsack with capacity W</li>
                  <li>We want to maximize the total value while keeping the total weight ≤ W</li>
                  <li>Each item can either be taken (1) or not taken (0)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Branch and Bound Approach</h3>
                <p>
                  Branch and Bound is a systematic method for solving optimization problems. It explores the solution
                  space by building a tree of possible solutions and pruning branches that cannot lead to an optimal
                  solution.
                </p>

                <h4 className="text-lg font-semibold mt-4">Key Steps:</h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Sort items</strong> by value-to-weight ratio in non-increasing order. This helps in
                    computing tighter bounds.
                  </li>
                  <li>
                    <strong>Create a state space tree</strong> where each level represents a decision about an item
                    (include or exclude).
                  </li>
                  <li>
                    <strong>Compute bounds</strong> for each node to determine if it's worth exploring further.
                  </li>
                  <li>
                    <strong>Prune branches</strong> that cannot lead to a better solution than the current best.
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-6">Bounding Function</h3>
                <p>
                  The key to an efficient Branch and Bound algorithm is a good bounding function. For the 0/1 Knapsack
                  problem, we compute an upper bound on the maximum profit as follows:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Include all items that fit completely</li>
                  <li>For the first item that doesn't fit completely, include a fraction of it</li>
                  <li>The resulting value is an upper bound on the maximum possible value</li>
                </ol>
                <p className="mt-2">
                  This works because the fractional knapsack solution is always an upper bound on the 0/1 knapsack
                  solution.
                </p>

                <h3 className="text-xl font-semibold mt-6">Time Complexity</h3>
                <p>
                  The worst-case time complexity is O(2^n), where n is the number of items. However, with effective
                  bounding, many branches are pruned, making it much faster in practice. The space complexity is O(n)
                  for storing the current best solution and the queue of nodes.
                </p>

                <h3 className="text-xl font-semibold mt-6">Applications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Resource allocation problems</li>
                  <li>Portfolio optimization</li>
                  <li>Cutting stock problems</li>
                  <li>Budget-constrained project selection</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Interactive Visualization</h2>
              <p className="mb-4">
                Use the visualizer below to see how the Branch and Bound algorithm solves the 0/1 Knapsack problem. You
                can add your own items, set the knapsack capacity, and watch the algorithm in action.
              </p>

              <BranchBoundKnapsackVisualizer />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Run Your Own Example</h2>
              <p className="mb-4">Enter your own knapsack problem in JSON format and see the result.</p>

              <div className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your knapsack problem in JSON format"
                  className="font-mono h-40"
                />

                <Button onClick={handleRunAlgorithm}>Run Algorithm</Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {result && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-xl font-semibold">Result</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p>
                        <strong>Maximum Value:</strong> {result.maxProfit}
                      </p>
                      <p>
                        <strong>Total Weight:</strong> {result.totalWeight}
                      </p>
                      <p>
                        <strong>Selected Items:</strong>
                      </p>
                      <ul className="list-disc pl-6 mt-2">
                        {result.selectedItems.map((item: any, index: number) => (
                          <li key={index}>
                            Item {item.id}: Weight = {item.weight}, Value = {item.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Code Implementation</h2>
              <p className="mb-4">
                Below is the JavaScript implementation of the 0/1 Knapsack problem using the Branch and Bound approach.
              </p>

              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
                  {`function knapsackBranchAndBound(items, capacity) {
  // Sort items by value/weight ratio in non-increasing order
  const sortedItems = [...items].map((item, index) => ({
    ...item,
    id: index,
    ratio: item.value / item.weight
  })).sort((a, b) => b.ratio - a.ratio);
  
  const n = sortedItems.length;
  
  // Initialize variables
  let maxProfit = 0;
  let bestSolution = Array(n).fill(false);
  
  // Create a queue for branch and bound
  const queue = [];
  
  // Create a dummy node
  const u = {
    level: -1,
    profit: 0,
    weight: 0,
    bound: 0,
    included: Array(n).fill(false)
  };
  
  // Calculate bound for dummy node
  u.bound = getBound(u, n, capacity, sortedItems);
  queue.push(u);
  
  // Process nodes in the queue
  while (queue.length > 0) {
    // Extract the node with the highest bound
    const node = queue.shift();
    
    // If it's a promising node
    if (node.bound > maxProfit) {
      // Consider the next level
      const level = node.level + 1;
      
      if (level < n) {
        // Create a child that includes the next item if possible
        if (node.weight + sortedItems[level].weight <= capacity) {
          const includeNode = {
            level,
            profit: node.profit + sortedItems[level].value,
            weight: node.weight + sortedItems[level].weight,
            bound: 0,
            included: [...node.included]
          };
          includeNode.included[level] = true;
          
          // Update maxProfit if needed
          if (includeNode.profit > maxProfit) {
            maxProfit = includeNode.profit;
            bestSolution = [...includeNode.included];
          }
          
          // Calculate bound and add to queue if promising
          includeNode.bound = getBound(includeNode, n, capacity, sortedItems);
          if (includeNode.bound > maxProfit) {
            queue.push(includeNode);
          }
        }
        
        // Create a child that excludes the next item
        const excludeNode = {
          level,
          profit: node.profit,
          weight: node.weight,
          bound: 0,
          included: [...node.included]
        };
        
        // Calculate bound and add to queue if promising
        excludeNode.bound = getBound(excludeNode, n, capacity, sortedItems);
        if (excludeNode.bound > maxProfit) {
          queue.push(excludeNode);
        }
      }
    }
  }
  
  // Map the solution back to original item indices
  const selectedItems = sortedItems
    .filter((_, index) => bestSolution[index])
    .map(item => ({ id: item.id, weight: item.weight, value: item.value }));
  
  return {
    maxProfit,
    selectedItems,
    totalWeight: selectedItems.reduce((sum, item) => sum + item.weight, 0)
  };
}

// Calculate the bound for a node
function getBound(node, n, capacity, items) {
  // If weight exceeds capacity, return 0 as bound
  if (node.weight >= capacity) return 0;
  
  // Initialize bound as current profit
  let profitBound = node.profit;
  let j = node.level + 1;
  let totalWeight = node.weight;
  
  // Keep adding items while weight constraint is not violated
  while (j < n && totalWeight + items[j].weight <= capacity) {
    totalWeight += items[j].weight;
    profitBound += items[j].value;
    j++;
  }
  
  // Add fraction of the next item if possible
  if (j < n) {
    profitBound += (capacity - totalWeight) * items[j].ratio;
  }
  
  return profitBound;
}`}
                </code>
              </pre>

              <h3 className="text-xl font-semibold mt-6">Usage Example</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
                  {`const items = [
  { weight: 10, value: 60 },
  { weight: 20, value: 100 },
  { weight: 30, value: 120 }
];

const capacity = 50;
const result = knapsackBranchAndBound(items, capacity);

console.log("Maximum value:", result.maxProfit);
console.log("Selected items:", result.selectedItems);
console.log("Total weight:", result.totalWeight);`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
