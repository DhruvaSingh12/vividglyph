"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface Item {
  id: number
  weight: number
  value: number
  valuePerWeight: number
}

interface Node {
  level: number
  profit: number
  weight: number
  bound: number
  included: boolean[]
}

export function BranchBoundKnapsackVisualizer() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, weight: 10, value: 60, valuePerWeight: 6 },
    { id: 2, weight: 20, value: 100, valuePerWeight: 5 },
    { id: 3, weight: 30, value: 120, valuePerWeight: 4 },
  ])
  const [capacity, setCapacity] = useState<number>(50)
  const [newItem, setNewItem] = useState<{ weight: string; value: string }>({ weight: "", value: "" })
  const [solution, setSolution] = useState<{ maxValue: number; selectedItems: boolean[] } | null>(null)
  const [steps, setSteps] = useState<Node[]>([])
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [speed, setSpeed] = useState<number>(500)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)

  const addItem = () => {
    if (newItem.weight && newItem.value) {
      const weight = Number.parseFloat(newItem.weight)
      const value = Number.parseFloat(newItem.value)
      if (!isNaN(weight) && !isNaN(value) && weight > 0 && value > 0) {
        const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1
        setItems([
          ...items,
          {
            id: newId,
            weight,
            value,
            valuePerWeight: value / weight,
          },
        ])
        setNewItem({ weight: "", value: "" })
      }
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setCapacity(value)
    }
  }

  const bound = (node: Node, n: number, W: number, items: Item[]): number => {
    // If weight exceeds capacity, return 0 as bound
    if (node.weight >= W) return 0

    // Initialize bound as current profit
    let profitBound = node.profit
    let j = node.level + 1
    let totalWeight = node.weight

    // Keep adding items while weight constraint is not violated
    while (j < n && totalWeight + items[j].weight <= W) {
      totalWeight += items[j].weight
      profitBound += items[j].value
      j++
    }

    // Add fraction of the next item if possible
    if (j < n) {
      profitBound += (W - totalWeight) * items[j].valuePerWeight
    }

    return profitBound
  }

  const knapsackBranchAndBound = () => {
    // Sort items by value/weight ratio in non-increasing order
    const sortedItems = [...items].sort((a, b) => b.valuePerWeight - a.valuePerWeight)
    const n = sortedItems.length
    const W = capacity

    // Initialize the queue and steps
    const queue: Node[] = []
    const allSteps: Node[] = []

    // Create a dummy node at level -1
    const u: Node = { level: -1, profit: 0, weight: 0, bound: 0, included: Array(n).fill(false) }
    u.bound = bound(u, n, W, sortedItems)
    queue.push(u)
    allSteps.push({ ...u })

    // Initialize maximum profit
    let maxProfit = 0
    let bestSolution = Array(n).fill(false)

    // Loop until queue is empty
    while (queue.length > 0) {
      // Extract the node with the highest bound
      const node = queue.shift()!
      allSteps.push({ ...node })

      // If it's a promising node
      if (node.bound > maxProfit) {
        // Consider the next level
        const level = node.level + 1

        // Create a child that includes the next item if possible
        if (level < n) {
          if (node.weight + sortedItems[level].weight <= W) {
            const includeNode: Node = {
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
            includeNode.bound = bound(includeNode, n, W, sortedItems)
            if (includeNode.bound > maxProfit) {
              queue.push(includeNode)
              allSteps.push({ ...includeNode })
            }
          }

          // Create a child that excludes the next item
          const excludeNode: Node = {
            level,
            profit: node.profit,
            weight: node.weight,
            bound: 0,
            included: [...node.included],
          }

          // Calculate bound and add to queue if promising
          excludeNode.bound = bound(excludeNode, n, W, sortedItems)
          if (excludeNode.bound > maxProfit) {
            queue.push(excludeNode)
            allSteps.push({ ...excludeNode })
          }
        }
      }
    }

    // Map the solution back to original item indices
    const originalSolution = Array(n).fill(false)
    for (let i = 0; i < n; i++) {
      if (bestSolution[i]) {
        const originalIndex = items.findIndex((item) => item.id === sortedItems[i].id)
        if (originalIndex !== -1) {
          originalSolution[originalIndex] = true
        }
      }
    }

    return {
      maxValue: maxProfit,
      selectedItems: originalSolution,
      steps: allSteps,
    }
  }

  const runAlgorithm = () => {
    setIsRunning(true)
    setIsComplete(false)
    setCurrentStep(-1)

    const result = knapsackBranchAndBound()
    setSolution({
      maxValue: result.maxValue,
      selectedItems: result.selectedItems,
    })
    setSteps(result.steps)
  }

  const resetVisualization = () => {
    setIsRunning(false)
    setIsComplete(false)
    setCurrentStep(-1)
    setSolution(null)
    setSteps([])
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isRunning && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, speed)
    } else if (isRunning && currentStep >= steps.length - 1) {
      setIsRunning(false)
      setIsComplete(true)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isRunning, currentStep, steps.length, speed])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="capacity">Knapsack Capacity</Label>
              <Input id="capacity" type="number" value={capacity} onChange={updateCapacity} className="mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newItem.weight}
                  onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
                  placeholder="Weight"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={newItem.value}
                  onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                  placeholder="Value"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Items</h3>
          {items.length === 0 ? (
            <p className="text-muted-foreground">No items added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-left py-2">Weight</th>
                    <th className="text-left py-2">Value</th>
                    <th className="text-left py-2">Value/Weight</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.id}</td>
                      <td className="py-2">{item.weight}</td>
                      <td className="py-2">{item.value}</td>
                      <td className="py-2">{item.valuePerWeight.toFixed(2)}</td>
                      <td className="py-2">
                        <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button onClick={runAlgorithm} disabled={items.length === 0 || isRunning}>
          Run Algorithm
        </Button>
        <Button onClick={resetVisualization} variant="outline" disabled={!steps.length}>
          Reset
        </Button>
      </div>

      {steps.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label>Animation Speed</Label>
                <div className="flex items-center gap-4">
                  <span>Fast</span>
                  <Slider
                    value={[speed]}
                    min={100}
                    max={1000}
                    step={100}
                    onValueChange={(value) => setSpeed(value[0])}
                    disabled={isRunning}
                    className="flex-1"
                  />
                  <span>Slow</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Visualization</h3>
                <div className="border rounded-md p-4 min-h-[200px]">
                  {currentStep >= 0 && currentStep < steps.length ? (
                    <div className="space-y-4">
                      <p>
                        Step {currentStep + 1} of {steps.length}
                      </p>
                      <div>
                        <p>Level: {steps[currentStep].level}</p>
                        <p>Current Profit: {steps[currentStep].profit}</p>
                        <p>Current Weight: {steps[currentStep].weight}</p>
                        <p>Upper Bound: {steps[currentStep].bound.toFixed(2)}</p>
                      </div>
                      <div>
                        <p>Items included:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {steps[currentStep].included.map((included, idx) => (
                            <div
                              key={idx}
                              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                included ? "bg-green-500 text-white" : "bg-gray-200"
                              }`}
                            >
                              {idx + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">
                        {isComplete ? "Visualization complete" : 'Click "Run Algorithm" to start visualization'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {solution && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Solution</h3>
            <div className="space-y-2">
              <p>Maximum Value: {solution.maxValue}</p>
              <p>
                Selected Items:{" "}
                {solution.selectedItems
                  .map((selected, idx) => (selected ? items[idx].id : null))
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Items in Knapsack:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {solution.selectedItems.map(
                    (selected, idx) =>
                      selected && (
                        <div key={idx} className="border rounded-md p-3 bg-green-50">
                          <p>Item {items[idx].id}</p>
                          <p>Weight: {items[idx].weight}</p>
                          <p>Value: {items[idx].value}</p>
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
