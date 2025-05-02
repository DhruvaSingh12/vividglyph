"use client"
import { IntegratedAlgorithmView } from "@/components/integrated-algorithm-view"
import { AlgorithmExplainer } from "@/components/algorithm-explainer"
import { MiniFAQ } from "@/components/mini-faq"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"

export default function MinMaxPage() {
  // Sample array for the visualizer
  const initialArray = [3, 7, 2, 1, 8, 9, 5, 4]
  const defaultInput = initialArray.join(", ")

  // Function to render the current step in the visualizer
  function renderMinMaxStep(data: number[], step: number, highlight: any) {
    // Scale factor for bar heights - adjusted for larger values
    const maxValue = Math.max(...data, 1)
    const heightScale = Math.min(200 / maxValue, 10) // Limit the height scale

    return (
      <div className="w-full">
        <div className="flex justify-center mb-4 text-sm">{highlight?.message || "Visualizing Min-Max..."}</div>
        <div className="flex justify-center items-end h-64 gap-1">
          {data.map((value, index) => {
            // Determine the color based on the current state
            let bgColor = "bg-muted"
            let textColor = "text-foreground"
            let borderColor = ""

            if (highlight) {
              if (highlight.type === "initial") {
                bgColor = "bg-blue-500/20"
              } else if (highlight.type === "result") {
                if (index === highlight.minIndex) {
                  bgColor = "bg-green-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (index === highlight.maxIndex) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                }
              } else if (highlight.type === "base-case" && index === highlight.index) {
                bgColor = "bg-purple-500"
                textColor = "text-white"
              } else if (highlight.type === "base-case-two" && highlight.indices.includes(index)) {
                if (data[index] === highlight.min) {
                  bgColor = "bg-green-500"
                  textColor = "text-white"
                } else if (data[index] === highlight.max) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                }
              } else if (highlight.type === "divide") {
                if (index === highlight.mid) {
                  bgColor = "bg-yellow-500"
                  textColor = "text-black"
                  borderColor = "border-2 border-black"
                } else if (index >= highlight.range[0] && index <= highlight.range[1]) {
                  bgColor = "bg-blue-500/30"
                }
              } else if (
                highlight.type === "left-result" &&
                index >= highlight.range[0] &&
                index <= highlight.range[1]
              ) {
                if (data[index] === highlight.min) {
                  bgColor = "bg-green-500/70"
                  textColor = "text-white"
                } else if (data[index] === highlight.max) {
                  bgColor = "bg-red-500/70"
                  textColor = "text-white"
                } else {
                  bgColor = "bg-blue-500/30"
                }
              } else if (
                highlight.type === "right-result" &&
                index >= highlight.range[0] &&
                index <= highlight.range[1]
              ) {
                if (data[index] === highlight.min) {
                  bgColor = "bg-green-500/70"
                  textColor = "text-white"
                } else if (data[index] === highlight.max) {
                  bgColor = "bg-red-500/70"
                  textColor = "text-white"
                } else {
                  bgColor = "bg-blue-500/30"
                }
              } else if (highlight.type === "combine") {
                if (data[index] === highlight.min) {
                  bgColor = "bg-green-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (data[index] === highlight.max) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                }
              }
            }

            // Calculate height based on value with scaling for large values
            const height = `${Math.max(30, value * heightScale)}px`

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 ${bgColor} ${textColor} ${borderColor} flex items-center justify-center rounded-t-md transition-all duration-300`}
                  style={{ height }}
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
            <span className="font-bold text-green-600 mr-4">Minimum: {highlight.min}</span>
            <span className="font-bold text-red-600">Maximum: {highlight.max}</span>
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

  // Function to generate min-max steps for visualization
  function generateMinMaxSteps(arr: number[]) {
    const steps: any[] = []
    const arrCopy = [...arr]

    // Add initial state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "initial", indices: [] },
      message: "Initial array. We need to find both the minimum and maximum elements.",
    })

    // Find min and max using divide and conquer
    const result = findMinMaxWithSteps(arrCopy, 0, arrCopy.length - 1, steps)

    // Add final state
    steps.push({
      data: [...arrCopy],
      highlight: {
        type: "result",
        min: result.min,
        max: result.max,
        minIndex: arrCopy.indexOf(result.min),
        maxIndex: arrCopy.indexOf(result.max),
      },
      message: `Found minimum value ${result.min} and maximum value ${result.max}.`,
    })

    return steps
  }

  // Find minimum and maximum using divide and conquer
  function findMinMaxWithSteps(arr: number[], low: number, high: number, steps: any[]) {
    // Base case: Only one element
    if (low === high) {
      steps.push({
        data: [...arr],
        highlight: {
          type: "base-case",
          index: low,
        },
        message: `Base case: Single element ${arr[low]} at index ${low} is both min and max.`,
      })

      return { min: arr[low], max: arr[low] }
    }

    // Base case: Only two elements
    if (high === low + 1) {
      let min, max
      if (arr[low] < arr[high]) {
        min = arr[low]
        max = arr[high]
      } else {
        min = arr[high]
        max = arr[low]
      }

      steps.push({
        data: [...arr],
        highlight: {
          type: "base-case-two",
          indices: [low, high],
          min,
          max,
        },
        message: `Base case: Two elements [${arr[low]}, ${arr[high]}]. Min = ${min}, Max = ${max}.`,
      })

      return { min, max }
    }

    // Divide the array into two halves
    const mid = Math.floor((low + high) / 2)

    steps.push({
      data: [...arr],
      highlight: {
        type: "divide",
        range: [low, high],
        mid: mid,
      },
      message: `Dividing the array at index ${mid}. Left subarray: [${low}..${mid}], Right subarray: [${mid + 1}..${high}].`,
    })

    // Recursively find min and max in the left half
    const leftResult = findMinMaxWithSteps(arr, low, mid, steps)

    steps.push({
      data: [...arr],
      highlight: {
        type: "left-result",
        range: [low, mid],
        min: leftResult.min,
        max: leftResult.max,
      },
      message: `Left half result: Min = ${leftResult.min}, Max = ${leftResult.max}.`,
    })

    // Recursively find min and max in the right half
    const rightResult = findMinMaxWithSteps(arr, mid + 1, high, steps)

    steps.push({
      data: [...arr],
      highlight: {
        type: "right-result",
        range: [mid + 1, high],
        min: rightResult.min,
        max: rightResult.max,
      },
      message: `Right half result: Min = ${rightResult.min}, Max = ${rightResult.max}.`,
    })

    // Combine the results
    const min = Math.min(leftResult.min, rightResult.min)
    const max = Math.max(leftResult.max, rightResult.max)

    steps.push({
      data: [...arr],
      highlight: {
        type: "combine",
        leftMin: leftResult.min,
        leftMax: leftResult.max,
        rightMin: rightResult.min,
        rightMax: rightResult.max,
        min: min,
        max: max,
      },
      message: `Combining results: Overall Min = ${min}, Overall Max = ${max}.`,
    })

    return { min, max }
  }

  // Run the min-max algorithm
  function runMinMax(array: number[]) {
    const arrCopy = [...array]
    const steps = generateMinMaxSteps(arrCopy)

    // Get the result from the last step
    const lastStep = steps[steps.length - 1]
    const result = {
      min: lastStep.highlight.min,
      max: lastStep.highlight.max,
      minIndex: lastStep.highlight.minIndex,
      maxIndex: lastStep.highlight.maxIndex,
    }

    return {
      result: {
        originalArray: array,
        min: result.min,
        max: result.max,
        minIndex: result.minIndex,
        maxIndex: result.maxIndex,
      },
      steps,
    }
  }

  // Render the result of the algorithm runner
  function renderMinMaxResult(result: any) {
    return (
      <div>
        <p className="mb-2">
          <span className="font-medium">Original Array:</span> [{result.originalArray.join(", ")}]
        </p>
        <p className="mb-2">
          <span className="font-medium text-green-600">Minimum Value:</span> {result.min} (at index {result.minIndex})
        </p>
        <p>
          <span className="font-medium text-red-600">Maximum Value:</span> {result.max} (at index {result.maxIndex})
        </p>
      </div>
    )
  }

  // Code explanation with dynamic values
  function codeExplanation(input: any, result: any) {
    const algorithm = `function findMinMax(arr, low, high) {
  // Base case: Only one element
  if (low === high) {
    return { min: arr[low], max: arr[low] };
  }
  
  // Base case: Only two elements
  if (high === low + 1) {
    let min, max;
    if (arr[low] < arr[high]) {
      min = arr[low];
      max = arr[high];
    } else {
      min = arr[high];
      max = arr[low];
    }
    return { min, max };
  }
  
  // Divide the array into two halves
  const mid = Math.floor((low + high) / 2);
  
  // Recursively find min and max in the left half
  const leftResult = findMinMax(arr, low, mid);
  
  // Recursively find min and max in the right half
  const rightResult = findMinMax(arr, mid + 1, high);
  
  // Combine the results
  const min = Math.min(leftResult.min, rightResult.min);
  const max = Math.max(leftResult.max, rightResult.max);
  
  return { min, max };
}`

    const explanationSteps = `To find the minimum and maximum in [${input.join(", ")}]:

1. Divide the array into two halves
2. Recursively find the minimum and maximum in each half
3. Compare the results to find the overall minimum and maximum

For this input:
- Minimum value: ${result.min} (at index ${result.minIndex})
- Maximum value: ${result.max} (at index ${result.maxIndex})

The divide-and-conquer approach reduces the number of comparisons needed compared to the naive approach of scanning the array twice.`

    return (
      <div className="space-y-4">
        <DynamicCodeBlock
          code={algorithm}
          language="javascript"
          title="Min-Max Finding Algorithm (Divide and Conquer)"
          inputValues={input}
          outputValues={result}
        />

        <h4 className="text-lg font-medium">Time and Space Complexity</h4>
        <p>
          <strong>Time Complexity:</strong> O(n) - We make approximately 3n/2 - 2 comparisons in the worst case, which
          is better than the 2n comparisons needed by the naive approach.
        </p>
        <p>
          <strong>Space Complexity:</strong> O(log n) - For the recursive call stack.
        </p>

        <h4 className="text-lg font-medium">Key Insights</h4>
        <ul className="list-disc list-inside">
          <li>This algorithm makes fewer comparisons than the naive approach of scanning the array twice</li>
          <li>The divide-and-conquer approach is particularly efficient for large arrays</li>
          <li>The base case handling for arrays of size 1 and 2 is crucial for the algorithm's correctness</li>
          <li>This technique can be extended to find other statistical properties of an array</li>
        </ul>
      </div>
    )
  }

  // FAQ questions
  const faqQuestions = [
    {
      id: "comparison-count",
      question: "How many comparisons does the divide-and-conquer min-max algorithm make?",
    },
    {
      id: "naive-approach",
      question: "How does this approach compare to the naive approach?",
    },
    {
      id: "tournament-method",
      question: "What is the tournament method for finding min and max?",
    },
    {
      id: "applications",
      question: "What are real-world applications of finding minimum and maximum values?",
    },
    {
      id: "optimizations",
      question: "Are there any optimizations for the min-max algorithm?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Finding Min & Max</h1>
        <p className="text-muted-foreground">
          Learn how to find both the minimum and maximum elements in an array using divide-and-conquer
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
            algorithmName="Min-Max Finder"
            defaultInput={defaultInput}
            inputPlaceholder="3, 7, 2, 1, 8, 9, 5, 4"
            parseInput={parseInput}
            runAlgorithm={runMinMax}
            renderStep={renderMinMaxStep}
            renderResult={renderMinMaxResult}
            codeExplanation={codeExplanation}
          />
        </TabsContent>

        <TabsContent value="explainer">
          <AlgorithmExplainer
            title="Finding Minimum and Maximum"
            description="A divide-and-conquer algorithm to find both the minimum and maximum elements in an array with fewer comparisons than the naive approach."
            approach="The divide-and-conquer approach to finding both the minimum and maximum elements works by dividing the array into two halves, recursively finding the minimum and maximum in each half, and then combining the results with just two comparisons. This approach reduces the total number of comparisons needed compared to the naive method of scanning the array twice."
            phases={[
              {
                title: "Divide",
                description: "Divide the array into two halves of roughly equal size.",
              },
              {
                title: "Conquer",
                description: "Recursively find the minimum and maximum in each half.",
              },
              {
                title: "Combine",
                description:
                  "Compare the minimums from both halves to find the overall minimum, and compare the maximums to find the overall maximum.",
              },
              {
                title: "Base Cases",
                description:
                  "For arrays of size 1, the single element is both the minimum and maximum. For arrays of size 2, compare the two elements directly.",
              },
            ]}
            complexity={{
              time: {
                best: "O(n)",
                average: "O(n)",
                worst: "O(n)",
              },
              space: "O(log n)",
            }}
            pseudocode={`function findMinMax(arr, low, high):
    // Base case: Only one element
    if low == high:
        return { min: arr[low], max: arr[low] }
    
    // Base case: Only two elements
    if high == low + 1:
        if arr[low] < arr[high]:
            return { min: arr[low], max: arr[high] }
        else:
            return { min: arr[high], max: arr[low] }
    
    // Divide the array into two halves
    mid = floor((low + high) / 2)
    
    // Recursively find min and max in the left half
    leftResult = findMinMax(arr, low, mid)
    
    // Recursively find min and max in the right half
    rightResult = findMinMax(arr, mid + 1, high)
    
    // Combine the results
    min = minimum(leftResult.min, rightResult.min)
    max = maximum(leftResult.max, rightResult.max)
    
    return { min, max }`}
          />
        </TabsContent>

        <TabsContent value="faq">
          <MiniFAQ
            title="Min-Max Finder FAQ"
            algorithm="Min-Max Finder"
            questions={faqQuestions}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
