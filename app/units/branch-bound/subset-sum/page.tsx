"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { SubsetSumVisualizer } from "./components/subset-sum-visualizer"

export default function SubsetSumPage() {
  const [input, setInput] = useState("3, 34, 4, 12, 5, 2\n9")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [visualizationState, setVisualizationState] = useState({
    numbers: [3, 34, 4, 12, 5, 2],
    target: 9,
    currentSubset: [] as number[],
    bestSubset: [0, 0, 1, 0, 1, 0], // Represents [4, 5] from the example
    message: "Initial state",
  })

  const parseInput = (input: string) => {
    try {
      const lines = input.trim().split("\n")
      if (lines.length !== 2) {
        throw new Error("Input must contain two lines: numbers and target sum")
      }

      const numbers = lines[0].split(/[ ,]+/).map((num) => {
        const parsed = Number.parseInt(num.trim())
        if (isNaN(parsed) || parsed < 0) {
          throw new Error("All numbers must be non-negative integers")
        }
        return parsed
      })

      const target = Number.parseInt(lines[1].trim())
      if (isNaN(target) || target < 0) {
        throw new Error("Target sum must be a non-negative integer")
      }

      if (numbers.length > 10) {
        throw new Error("For visualization purposes, please provide at most 10 numbers")
      }

      return { numbers, target }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  const runAlgorithm = () => {
    setError(null)

    try {
      const { numbers, target } = parseInput(input)

      // Sort in descending order for better pruning
      const sortedNums = [...numbers].sort((a, b) => b - a)

      let bestSum = 0
      let bestSubset: number[] = []

      // Calculate the total sum of all elements
      const totalSum = sortedNums.reduce((sum, num) => sum + num, 0)

      // Branch and Bound function
      const search = (index: number, currentSum: number, currentSubset: number[], remainingSum: number): boolean => {
        // If we've found a sum equal to the target, return immediately
        if (currentSum === target) {
          bestSum = currentSum
          bestSubset = [...currentSubset]
          return true
        }

        // If we've reached the end of the array
        if (index === sortedNums.length) {
          // Update best solution if this is better
          if (currentSum > bestSum && currentSum <= target) {
            bestSum = currentSum
            bestSubset = [...currentSubset]
          }
          return false
        }

        // Bound: If adding all remaining elements won't reach the target
        // and we don't have a solution yet, there's no point continuing
        if (currentSum + remainingSum < target && bestSum < target) {
          return false
        }

        // Bound: If current sum already exceeds target, prune this branch
        if (currentSum > target) {
          return false
        }

        // Try including the current element
        currentSubset.push(1) // 1 means include

        const foundWithCurrent = search(
          index + 1,
          currentSum + sortedNums[index],
          currentSubset,
          remainingSum - sortedNums[index],
        )

        // If we found the exact target, we can return early
        if (foundWithCurrent) return true

        // Try excluding the current element
        currentSubset[currentSubset.length - 1] = 0 // 0 means exclude

        const foundWithoutCurrent = search(index + 1, currentSum, currentSubset, remainingSum - sortedNums[index])

        // Remove the last decision before returning
        currentSubset.pop()

        return foundWithCurrent || foundWithoutCurrent
      }

      // Start the search
      search(0, 0, [], totalSum)

      // Convert the subset representation to the actual numbers
      const resultSubset = bestSubset
        .map((included, index) => (included === 1 ? sortedNums[index] : null))
        .filter((num) => num !== null) as number[]

      // Set visualization state
      setVisualizationState({
        numbers: sortedNums,
        target,
        currentSubset: [],
        bestSubset,
        message: `Best sum: ${bestSum}, Subset: [${resultSubset.join(", ")}]`,
      })

      setResult({
        sum: bestSum,
        subset: resultSubset,
        binarySubset: bestSubset,
      })
    } catch (err) {
      setError((err as Error).message)
      setResult(null)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Subset Sum Problem</h1>
      <p className="text-muted-foreground">
        The Subset Sum problem is a classic computational problem: given a set of integers and a target sum, determine
        if there exists a subset of the given set with a sum equal to the target sum.
      </p>

      <Tabs defaultValue="algorithm">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="code">Code Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subset Sum Problem</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h2>Problem Statement</h2>
              <p>
                Given a set of non-negative integers and a target sum, find if there is a subset of the given set with
                sum equal to the target sum, or find the subset with sum closest to (but not exceeding) the target sum.
              </p>

              <h2>Branch and Bound Approach</h2>
              <p>The Branch and Bound approach for the Subset Sum problem involves:</p>
              <ol>
                <li>
                  <strong>State Space Tree</strong>: Each level represents a decision about including or excluding an
                  element
                </li>
                <li>
                  <strong>Branching</strong>: For each element, we have two choices - include it or exclude it
                </li>
                <li>
                  <strong>Bounding</strong>: Prune branches that cannot lead to a valid solution
                </li>
                <li>
                  <strong>Solution</strong>: A path from the root to a leaf represents a subset
                </li>
              </ol>

              <h2>Pruning Strategies</h2>
              <p>We can prune branches in several ways:</p>
              <ol>
                <li>
                  <strong>Sum exceeds target</strong>: If including an element makes the sum exceed the target, prune
                  that branch
                </li>
                <li>
                  <strong>Remaining elements too small</strong>: If the current sum plus all remaining elements is less
                  than the target, prune
                </li>
                <li>
                  <strong>Duplicate sums</strong>: If we've already seen a particular sum at this level, we can prune
                </li>
              </ol>

              <h2>Time Complexity</h2>
              <p>
                Without pruning: O(2^n) - trying all possible subsets
                <br />
                With pruning: Still exponential but much faster in practice
                <br />
                For small targets, can be solved in pseudo-polynomial time O(n*target)
              </p>

              <h2>Applications</h2>
              <p>The Subset Sum problem has applications in:</p>
              <ul>
                <li>Resource allocation</li>
                <li>Budget planning</li>
                <li>Cryptography</li>
                <li>Load balancing</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Textarea
                      placeholder="Enter numbers separated by commas, then target sum on next line"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[100px] font-mono"
                    />
                    <Button onClick={runAlgorithm} className="mt-2">
                      Run Algorithm
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Instructions</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter a list of non-negative integers separated by commas on the first line, and the target sum on
                      the second line. For example:
                    </p>
                    <pre className="bg-muted p-2 rounded-md text-sm mt-2">3, 34, 4, 12, 5, 2{"\n"}9</pre>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {result && (
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium">Result</h3>
                    <p>Sum: {result.sum}</p>
                    <p>Subset: [{result.subset.join(", ")}]</p>
                  </div>
                )}

                <SubsetSumVisualizer
                  numbers={visualizationState.numbers}
                  target={visualizationState.target}
                  currentSubset={visualizationState.currentSubset}
                  bestSubset={visualizationState.bestSubset}
                  message={visualizationState.message}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                {`/**
 * Solve the Subset Sum problem using Branch and Bound
 * @param {number[]} nums - Array of non-negative integers
 * @param {number} target - Target sum
 * @returns {object} - Object containing the best subset and its sum
 */
function subsetSum(nums, target) {
  // Sort in descending order for better pruning
  nums.sort((a, b) => b - a);
  
  let bestSum = 0;
  let bestSubset = [];
  
  // Calculate the total sum of all elements
  const totalSum = nums.reduce((sum, num) => sum + num, 0);
  
  // Branch and Bound function
  function search(index, currentSum, currentSubset, remainingSum) {
    // If we've found a sum equal to the target, return immediately
    if (currentSum === target) {
      bestSum = currentSum;
      bestSubset = [...currentSubset];
      return true;
    }
    
    // If we've reached the end of the array
    if (index === nums.length) {
      // Update best solution if this is better
      if (currentSum > bestSum && currentSum <= target) {
        bestSum = currentSum;
        bestSubset = [...currentSubset];
      }
      return false;
    }
    
    // Bound: If adding all remaining elements won't reach the target
    // and we don't have a solution yet, there's no point continuing
    if (currentSum + remainingSum < target && bestSum < target) {
      return false;
    }
    
    // Bound: If current sum already exceeds target, prune this branch
    if (currentSum > target) {
      return false;
    }
    
    // Try including the current element
    currentSubset.push(1); // 1 means include
    const foundWithCurrent = search(
      index + 1, 
      currentSum + nums[index], 
      currentSubset, 
      remainingSum - nums[index]
    );
    
    // If we found the exact target, we can return early
    if (foundWithCurrent) return true;
    
    // Try excluding the current element
    currentSubset[currentSubset.length - 1] = 0; // 0 means exclude
    const foundWithoutCurrent = search(
      index + 1, 
      currentSum, 
      currentSubset, 
      remainingSum - nums[index]
    );
    
    // Remove the last decision before returning
    currentSubset.pop();
    
    return foundWithCurrent || foundWithoutCurrent;
  }
  
  // Start the search
  search(0, 0, [], totalSum);
  
  // Convert the subset representation to the actual numbers
  const result = bestSubset.map((included, index) => 
    included === 1 ? nums[index] : null
  ).filter(num => num !== null);
  
  return {
    sum: bestSum,
    subset: result,
    binarySubset: bestSubset
  };
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
