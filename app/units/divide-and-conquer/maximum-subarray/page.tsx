"use client"
import { IntegratedAlgorithmView } from "@/components/integrated-algorithm-view"
import { AlgorithmExplainer } from "@/components/algorithm-explainer"
import { MiniFAQ } from "@/components/mini-faq"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"

export default function MaximumSubarrayPage() {
  // Sample array for the visualizer
  const initialArray = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
  const defaultInput = initialArray.join(", ")

  // Function to render the current step in the visualizer
  function renderMaximumSubarrayStep(data: number[], step: number, highlight: any) {
    // Scale factor for bar heights - adjusted for larger values
    const maxValue = Math.max(...data.map((v) => Math.abs(v)), 1)
    const heightScale = Math.min(150 / maxValue, 5) // Limit the height scale

    return (
      <div className="w-full">
        <div className="flex justify-center mb-4 text-sm">
          {highlight?.message || "Visualizing Maximum Subarray..."}
        </div>
        <div className="flex justify-center items-center h-64 gap-1">
          {data.map((value, index) => {
            // Determine the color based on the current state
            let bgColor = "bg-muted"
            let textColor = "text-foreground"
            let borderColor = ""

            if (highlight) {
              if (highlight.type === "initial") {
                bgColor = "bg-blue-500/20"
              } else if (highlight.type === "result" && highlight.indices.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
                borderColor = "border-2 border-black"
              } else if (highlight.type === "base-case" && index === highlight.index) {
                bgColor = "bg-purple-500"
                textColor = "text-white"
              } else if (highlight.type === "divide") {
                if (index === highlight.mid) {
                  bgColor = "bg-yellow-500"
                  textColor = "text-black"
                  borderColor = "border-2 border-black"
                } else if (index >= highlight.range[0] && index <= highlight.range[1]) {
                  bgColor = "bg-blue-500/30"
                }
              } else if (highlight.type === "left-result" && highlight.result.includes(index)) {
                bgColor = "bg-green-500/70"
                textColor = "text-white"
              } else if (highlight.type === "right-result" && highlight.result.includes(index)) {
                bgColor = "bg-green-500/70"
                textColor = "text-white"
              } else if (highlight.type.startsWith("crossing-left")) {
                if (index === highlight.mid) {
                  bgColor = "bg-yellow-500"
                  textColor = "text-black"
                } else if (index === highlight.current) {
                  bgColor = "bg-blue-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (
                  index >= highlight.bestLeft &&
                  index <= highlight.mid &&
                  highlight.type === "crossing-left-update"
                ) {
                  bgColor = "bg-green-500/50"
                }
              } else if (highlight.type.startsWith("crossing-right")) {
                if (index === highlight.mid) {
                  bgColor = "bg-yellow-500"
                  textColor = "text-black"
                } else if (index === highlight.current) {
                  bgColor = "bg-blue-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (
                  index >= highlight.mid + 1 &&
                  index <= highlight.bestRight &&
                  highlight.type === "crossing-right-update"
                ) {
                  bgColor = "bg-green-500/50"
                }
              } else if (highlight.type === "crossing-result") {
                if (index >= highlight.left && index <= highlight.right) {
                  bgColor = "bg-green-500/70"
                  textColor = "text-white"
                }
              }
            }

            // Calculate height based on value with scaling for large values
            const absValue = Math.abs(value)
            const height = `${Math.max(20, absValue * heightScale)}px`

            // Position bars in the middle for better visualization of negative values
            const isNegative = value < 0
            const barStyle = isNegative ? { height, marginTop: "auto" } : { height, marginBottom: "auto" }

            return (
              <div key={index} className="flex flex-col items-center h-full justify-center">
                <div
                  className={`w-10 ${bgColor} ${textColor} ${borderColor} flex items-center justify-center rounded-md transition-all duration-300 ${isNegative ? "rounded-b-md" : "rounded-t-md"}`}
                  style={barStyle}
                >
                  {value}
                </div>
                <div className="text-xs mt-1">{index}</div>
              </div>
            )
          })}
        </div>

        {highlight && highlight.type === "result" && (
          <div className="mt-4 text-center">
            <span className="font-bold">Maximum Sum: {highlight.sum}</span>
          </div>
        )}
      </div>
    )
  }

  // Parse input for the algorithm runner
  function parseInput(input: string) {
    try {
      const array = input.split(",").map((item) => {
        const num = Number(item.trim())
        if (isNaN(num)) {
          throw new Error("Array elements must be numbers")
        }
        return num
      })

      if (array.length === 0) {
        throw new Error("Array cannot be empty")
      }

      return array
    } catch (error) {
      throw error
    }
  }

  // Function to generate maximum subarray steps for visualization
  function generateMaximumSubarraySteps(arr: number[]) {
    const steps: any[] = []
    const arrCopy = [...arr]

    // Add initial state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "initial", indices: [] },
      message: "Initial array. We need to find the contiguous subarray with the largest sum.",
    })

    // Find the maximum subarray using divide and conquer
    const result = findMaximumSubarrayWithSteps(arrCopy, 0, arrCopy.length - 1, steps)

    // Add final state
    steps.push({
      data: [...arrCopy],
      highlight: {
        type: "result",
        indices: Array.from({ length: result.high - result.low + 1 }, (_, i) => result.low + i),
        sum: result.sum,
      },
      message: `Maximum subarray found from index ${result.low} to ${result.high} with sum ${result.sum}.`,
    })

    return steps
  }

  // Find maximum subarray that crosses the midpoint
  function findMaxCrossingSubarrayWithSteps(arr: number[], low: number, mid: number, high: number, steps: any[]) {
    // Find maximum subarray on the left side
    let leftSum = Number.NEGATIVE_INFINITY
    let sum = 0
    let maxLeft = mid

    steps.push({
      data: [...arr],
      highlight: {
        type: "crossing-left-start",
        range: [low, high],
        mid: mid,
      },
      message: `Finding maximum crossing subarray. First, looking at the left side from index ${mid} down to ${low}.`,
    })

    for (let i = mid; i >= low; i--) {
      sum += arr[i]

      steps.push({
        data: [...arr],
        highlight: {
          type: "crossing-left",
          range: [low, high],
          mid: mid,
          current: i,
          currentSum: sum,
          bestSum: leftSum,
          bestLeft: maxLeft,
        },
        message: `Adding element ${arr[i]} at index ${i}. Current sum: ${sum}.`,
      })

      if (sum > leftSum) {
        leftSum = sum
        maxLeft = i

        steps.push({
          data: [...arr],
          highlight: {
            type: "crossing-left-update",
            range: [low, high],
            mid: mid,
            current: i,
            currentSum: sum,
            bestSum: leftSum,
            bestLeft: maxLeft,
          },
          message: `Found new maximum left sum: ${leftSum} from index ${maxLeft} to ${mid}.`,
        })
      }
    }

    // Find maximum subarray on the right side
    let rightSum = Number.NEGATIVE_INFINITY
    sum = 0
    let maxRight = mid + 1

    steps.push({
      data: [...arr],
      highlight: {
        type: "crossing-right-start",
        range: [low, high],
        mid: mid,
      },
      message: `Now looking at the right side from index ${mid + 1} up to ${high}.`,
    })

    for (let i = mid + 1; i <= high; i++) {
      sum += arr[i]

      steps.push({
        data: [...arr],
        highlight: {
          type: "crossing-right",
          range: [low, high],
          mid: mid,
          current: i,
          currentSum: sum,
          bestSum: rightSum,
          bestRight: maxRight,
        },
        message: `Adding element ${arr[i]} at index ${i}. Current sum: ${sum}.`,
      })

      if (sum > rightSum) {
        rightSum = sum
        maxRight = i

        steps.push({
          data: [...arr],
          highlight: {
            type: "crossing-right-update",
            range: [low, high],
            mid: mid,
            current: i,
            currentSum: sum,
            bestSum: rightSum,
            bestRight: maxRight,
          },
          message: `Found new maximum right sum: ${rightSum} from index ${mid + 1} to ${maxRight}.`,
        })
      }
    }

    // Combine the results
    const crossingSum = leftSum + rightSum

    steps.push({
      data: [...arr],
      highlight: {
        type: "crossing-result",
        range: [low, high],
        mid: mid,
        left: maxLeft,
        right: maxRight,
        sum: crossingSum,
      },
      message: `Maximum crossing subarray found from index ${maxLeft} to ${maxRight} with sum ${crossingSum}.`,
    })

    return { low: maxLeft, high: maxRight, sum: crossingSum }
  }

  // Define the return type for the maximum subarray function
  interface MaxSubarrayResult {
    low: number;
    high: number;
    sum: number;
  }

  // Find maximum subarray using divide and conquer
  function findMaximumSubarrayWithSteps(arr: number[], low: number, high: number, steps: any[]): MaxSubarrayResult {
    // Base case: only one element
    if (low === high) {
      steps.push({
        data: [...arr],
        highlight: {
          type: "base-case",
          index: low,
        },
        message: `Base case: Subarray with single element ${arr[low]} at index ${low}.`,
      })

      return { low, high, sum: arr[low] }
    }

    // Divide the problem
    const mid = Math.floor((low + high) / 2)

    steps.push({
      data: [...arr],
      highlight: {
        type: "divide",
        range: [low, high],
        mid: mid,
      },
      message: `Dividing the problem at index ${mid}. Left subarray: [${low}..${mid}], Right subarray: [${mid + 1}..${high}].`,
    })

    // Find maximum subarray in the left half
    const leftResult = findMaximumSubarrayWithSteps(arr, low, mid, steps)

    steps.push({
      data: [...arr],
      highlight: {
        type: "left-result",
        range: [low, mid],
        result: Array.from({ length: leftResult.high - leftResult.low + 1 }, (_, i) => leftResult.low + i),
        sum: leftResult.sum,
      },
      message: `Maximum subarray in left half: from index ${leftResult.low} to ${leftResult.high} with sum ${leftResult.sum}.`,
    })

    // Find maximum subarray in the right half
    const rightResult = findMaximumSubarrayWithSteps(arr, mid + 1, high, steps)

    steps.push({
      data: [...arr],
      highlight: {
        type: "right-result",
        range: [mid + 1, high],
        result: Array.from({ length: rightResult.high - rightResult.low + 1 }, (_, i) => rightResult.low + i),
        sum: rightResult.sum,
      },
      message: `Maximum subarray in right half: from index ${rightResult.low} to ${rightResult.high} with sum ${rightResult.sum}.`,
    })

    // Find maximum subarray that crosses the midpoint
    const crossResult = findMaxCrossingSubarrayWithSteps(arr, low, mid, high, steps)

    // Compare the three results and return the maximum
    if (leftResult.sum >= rightResult.sum && leftResult.sum >= crossResult.sum) {
      steps.push({
        data: [...arr],
        highlight: {
          type: "compare-result",
          result: "left",
          leftSum: leftResult.sum,
          rightSum: rightResult.sum,
          crossSum: crossResult.sum,
        },
        message: `Left subarray has the maximum sum (${leftResult.sum}).`,
      })

      return leftResult
    } else if (rightResult.sum >= leftResult.sum && rightResult.sum >= crossResult.sum) {
      steps.push({
        data: [...arr],
        highlight: {
          type: "compare-result",
          result: "right",
          leftSum: leftResult.sum,
          rightSum: rightResult.sum,
          crossSum: crossResult.sum,
        },
        message: `Right subarray has the maximum sum (${rightResult.sum}).`,
      })

      return rightResult
    } else {
      steps.push({
        data: [...arr],
        highlight: {
          type: "compare-result",
          result: "cross",
          leftSum: leftResult.sum,
          rightSum: rightResult.sum,
          crossSum: crossResult.sum,
        },
        message: `Crossing subarray has the maximum sum (${crossResult.sum}).`,
      })

      return crossResult
    }
  }

  // Run the maximum subarray algorithm
  function runMaximumSubarray(array: number[]) {
    const arrCopy = [...array]
    const steps = generateMaximumSubarraySteps(arrCopy)

    // Get the result from the last step
    const lastStep = steps[steps.length - 1]
    const result = {
      subarray: lastStep.data.slice(
        lastStep.highlight.indices[0],
        lastStep.highlight.indices[lastStep.highlight.indices.length - 1] + 1,
      ),
      startIndex: lastStep.highlight.indices[0],
      endIndex: lastStep.highlight.indices[lastStep.highlight.indices.length - 1],
      sum: lastStep.highlight.sum,
    }

    return {
      result: {
        originalArray: array,
        maxSubarray: result.subarray,
        startIndex: result.startIndex,
        endIndex: result.endIndex,
        sum: result.sum,
      },
      steps,
    }
  }

  // Render the result of the algorithm runner
  function renderMaximumSubarrayResult(result: any) {
    return (
      <div>
        <p className="mb-2">
          <span className="font-medium">Original Array:</span> [{result.originalArray.join(", ")}]
        </p>
        <p className="mb-2">
          <span className="font-medium">Maximum Subarray:</span> [{result.maxSubarray.join(", ")}]
        </p>
        <p className="mb-2">
          <span className="font-medium">Indices:</span> {result.startIndex} to {result.endIndex}
        </p>
        <p>
          <span className="font-medium">Sum:</span> {result.sum}
        </p>
      </div>
    )
  }

  // Code explanation with dynamic values
  function codeExplanation(input: any, result: any) {
    const algorithm = `function findMaximumSubarray(arr, low, high) {
  // Base case: only one element
  if (low === high) {
    return { low, high, sum: arr[low] };
  }
  
  // Divide the problem
  const mid = Math.floor((low + high) / 2);
  
  // Find maximum subarray in the left half
  const leftResult = findMaximumSubarray(arr, low, mid);
  
  // Find maximum subarray in the right half
  const rightResult = findMaximumSubarray(arr, mid + 1, high);
  
  // Find maximum subarray that crosses the midpoint
  const crossResult = findMaxCrossingSubarray(arr, low, mid, high);
  
  // Return the maximum of the three results
  if (leftResult.sum >= rightResult.sum && leftResult.sum >= crossResult.sum) {
    return leftResult;
  } else if (rightResult.sum >= leftResult.sum && rightResult.sum >= crossResult.sum) {
    return rightResult;
  } else {
    return crossResult;
  }
}

function findMaxCrossingSubarray(arr, low, mid, high) {
  // Find maximum subarray on the left side
  let leftSum = -Infinity;
  let sum = 0;
  let maxLeft = mid;
  
  for (let i = mid; i >= low; i--) {
    sum += arr[i];
    if (sum > leftSum) {
      leftSum = sum;
      maxLeft = i;
    }
  }
  
  // Find maximum subarray on the right side
  let rightSum = -Infinity;
  sum = 0;
  let maxRight = mid + 1;
  
  for (let i = mid + 1; i <= high; i++) {
    sum += arr[i];
    if (sum > rightSum) {
      rightSum = sum;
      maxRight = i;
    }
  }
  
  // Return the combined result
  return { low: maxLeft, high: maxRight, sum: leftSum + rightSum };
}`

    const explanationSteps = `To find the maximum subarray in [${input.join(", ")}]:

1. Divide the array into two halves
2. Recursively find the maximum subarray in each half
3. Find the maximum subarray that crosses the midpoint
4. Return the maximum of these three subarrays

For this input, the maximum subarray is from index ${result.startIndex} to ${result.endIndex} with sum ${result.sum}.

The divide-and-conquer approach guarantees we find the optimal solution by considering all possible subarrays.`

    return (
      <div className="space-y-4">
        <DynamicCodeBlock
          code={algorithm}
          language="javascript"
          title="Maximum Subarray Algorithm (Divide and Conquer)"
          explanation={explanationSteps}
          inputValues={input}
          outputValues={result}
        />

        <h4 className="text-lg font-medium">Time and Space Complexity</h4>
        <p>
          <strong>Time Complexity:</strong> O(n log n) - The array is divided in half at each step (log n levels) and
          each level requires O(n) work to find the crossing subarray.
        </p>
        <p>
          <strong>Space Complexity:</strong> O(log n) - For the recursive call stack.
        </p>

        <h4 className="text-lg font-medium">Key Insights</h4>
        <ul className="list-disc list-inside">
          <li>
            The maximum subarray must be either entirely in the left half, entirely in the right half, or crossing the
            midpoint
          </li>
          <li>
            While this divide-and-conquer approach is O(n log n), there exists a linear time solution (Kadane's
            algorithm)
          </li>
          <li>This problem has applications in stock market analysis, signal processing, and data mining</li>
          <li>The algorithm can be modified to handle the case where all elements are negative</li>
        </ul>
      </div>
    )
  }

  // FAQ questions
  const faqQuestions = [
    {
      id: "complexity",
      question: "What's the time complexity of the divide-and-conquer approach for Maximum Subarray?",
    },
    {
      id: "kadane",
      question: "How does Kadane's algorithm compare to the divide-and-conquer approach?",
    },
    {
      id: "applications",
      question: "What are real-world applications of the Maximum Subarray problem?",
    },
    {
      id: "variations",
      question: "What are some variations of the Maximum Subarray problem?",
    },
    {
      id: "negative",
      question: "How does the algorithm handle arrays with all negative numbers?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Maximum Subarray</h1>
        <p className="text-muted-foreground">
          Find the contiguous subarray with the largest sum using the divide-and-conquer approach
        </p>
      </div>

      <Tabs defaultValue="interactive" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="interactive">Interactive Visualizer</TabsTrigger>
          <TabsTrigger value="explainer">Explainer</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive">
          <IntegratedAlgorithmView
            algorithmName="Maximum Subarray"
            defaultInput={defaultInput}
            inputPlaceholder="13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7"
            parseInput={parseInput}
            runAlgorithm={runMaximumSubarray}
            renderStep={renderMaximumSubarrayStep}
            renderResult={renderMaximumSubarrayResult}
            codeExplanation={codeExplanation}
          />
        </TabsContent>

        <TabsContent value="explainer">
          <AlgorithmExplainer
            title="Maximum Subarray"
            description="Find the contiguous subarray within a one-dimensional array of numbers that has the largest sum."
            approach="The divide-and-conquer approach to the Maximum Subarray problem works by dividing the array into two halves, finding the maximum subarray in each half recursively, and then finding the maximum subarray that crosses the midpoint. The maximum of these three subarrays is the solution. This approach is particularly interesting because it demonstrates how divide-and-conquer can be applied to problems beyond sorting and searching."
            phases={[
              {
                title: "Divide",
                description: "Divide the array into two subarrays of equal size (or as close as possible).",
              },
              {
                title: "Conquer",
                description: "Recursively find the maximum subarray in the left half and the right half.",
              },
              {
                title: "Combine",
                description:
                  "Find the maximum subarray that crosses the midpoint, and return the maximum of the three subarrays (left, right, and crossing).",
              },
              {
                title: "Base Case",
                description: "When the subarray has only one element, that element is the maximum subarray.",
              },
            ]}
            complexity={{
              time: {
                best: "O(n log n)",
                average: "O(n log n)",
                worst: "O(n log n)",
              },
              space: "O(log n)",
            }}
            pseudocode={`function findMaximumSubarray(arr, low, high):
    if low == high:
        return { low, high, sum: arr[low] }  // Base case: only one element
    
    mid = floor((low + high) / 2)
    
    // Find maximum subarray in the left half
    leftResult = findMaximumSubarray(arr, low, mid)
    
    // Find maximum subarray in the right half
    rightResult = findMaximumSubarray(arr, mid + 1, high)
    
    // Find maximum subarray that crosses the midpoint
    crossResult = findMaxCrossingSubarray(arr, low, mid, high)
    
    // Return the maximum of the three results
    if leftResult.sum >= rightResult.sum and leftResult.sum >= crossResult.sum:
        return leftResult
    else if rightResult.sum >= leftResult.sum and rightResult.sum >= crossResult.sum:
        return rightResult
    else:
        return crossResult

function findMaxCrossingSubarray(arr, low, mid, high):
    // Find maximum subarray on the left side
    leftSum = -∞
    sum = 0
    maxLeft = mid
    
    for i = mid down to low:
        sum = sum + arr[i]
        if sum > leftSum:
            leftSum = sum
            maxLeft = i
    
    // Find maximum subarray on the right side
    rightSum = -∞
    sum = 0
    maxRight = mid + 1
    
    for i = mid + 1 to high:
        sum = sum + arr[i]
        if sum > rightSum:
            rightSum = sum
            maxRight = i
    
    // Return the combined result
    return { low: maxLeft, high: maxRight, sum: leftSum + rightSum }`}
          />
        </TabsContent>

        <TabsContent value="faq">
          <MiniFAQ
            title="Maximum Subarray FAQ"
            algorithm="Maximum Subarray"
            questions={faqQuestions}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
