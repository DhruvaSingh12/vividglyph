"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { MergeSortVisualizer } from "./MergeSortVisualizer"

export function MergeSort() {
  // States for the component
  const [array, setArray] = useState<number[]>([38, 27, 43, 3, 9, 82, 10])
  const [inputArray, setInputArray] = useState<string>("38, 27, 43, 3, 9, 82, 10")
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [speed, setSpeed] = useState(1)
  const [error, setError] = useState<string | null>(null)

  // Initialize with default steps when component mounts
  useEffect(() => {
    const initialSteps = generateMergeSortSteps(array)
    setSteps(initialSteps)
  }, [])

  // Generate steps for merge sort visualization
  function generateMergeSortSteps(arr: number[]) {
    const steps: any[] = []
    const arrCopy = [...arr]

    // Add initial state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "initial", indices: [] },
      message: "Initial array",
    })

    // Perform merge sort and track steps
    mergeSortWithSteps(arrCopy, 0, arrCopy.length - 1, steps)

    // Add final state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "sorted", indices: arrCopy.map((_, i) => i) },
      message: "Array sorted!",
    })

    return steps
  }

  // Merge sort implementation that tracks steps
  function mergeSortWithSteps(arr: number[], left: number, right: number, steps: any[]) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)

      // Show division step
      steps.push({
        data: [...arr],
        highlight: { type: "divide", indices: [left, mid, right] },
        message: `Dividing array from index ${left} to ${right}`,
      })

      // Recursively sort first and second halves
      mergeSortWithSteps(arr, left, mid, steps)
      mergeSortWithSteps(arr, mid + 1, right, steps)

      // Show before merge
      steps.push({
        data: [...arr],
        highlight: { type: "before-merge", indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) },
        message: `About to merge subarrays from index ${left} to ${mid} and from ${mid + 1} to ${right}`,
      })

      // Merge the sorted halves
      merge(arr, left, mid, right, steps)
    }
  }

  // Merge function with step tracking
  function merge(arr: number[], left: number, mid: number, right: number, steps: any[]) {
    const n1 = mid - left + 1
    const n2 = right - mid

    // Create temporary arrays
    const L = new Array(n1)
    const R = new Array(n2)

    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i]
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j]
    }

    // Show the two subarrays that will be merged
    steps.push({
      data: [...arr],
      highlight: { type: "merge-subarrays", left: L, right: R, leftIdx: left, rightIdx: mid + 1 },
      message: `Merging subarrays [${L.join(", ")}] and [${R.join(", ")}]`,
    })

    // Merge the temporary arrays back into arr[left..right]
    let i = 0 // Initial index of first subarray
    let j = 0 // Initial index of second subarray
    let k = left // Initial index of merged subarray

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i]
        i++
      } else {
        arr[k] = R[j]
        j++
      }
      k++

      // Show each comparison and placement
      steps.push({
        data: [...arr],
        highlight: { type: "merge-step", indices: [k - 1], leftIdx: i - 1, rightIdx: j - 1 },
        message: `Placing ${arr[k - 1]} at index ${k - 1}`,
      })
    }

    // Copy the remaining elements of L[], if any
    while (i < n1) {
      arr[k] = L[i]
      i++
      k++
      steps.push({
        data: [...arr],
        highlight: { type: "merge-step", indices: [k - 1], leftIdx: i - 1, rightIdx: -1 },
        message: `Placing remaining element ${arr[k - 1]} from left subarray at index ${k - 1}`,
      })
    }

    // Copy the remaining elements of R[], if any
    while (j < n2) {
      arr[k] = R[j]
      j++
      k++
      steps.push({
        data: [...arr],
        highlight: { type: "merge-step", indices: [k - 1], leftIdx: -1, rightIdx: j - 1 },
        message: `Placing remaining element ${arr[k - 1]} from right subarray at index ${k - 1}`,
      })
    }

    // Show the merged subarray
    steps.push({
      data: [...arr],
      highlight: { type: "merged", indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) },
      message: `Merged subarray from index ${left} to ${right}`,
    })
  }

  // Parse input array string to array of numbers
  const parseInput = (input: string) => {
    try {
      const parsedArray = input
        .split(",")
        .map((val) => {
          const num = Number(val.trim())
          if (isNaN(num)) throw new Error("Input contains non-numeric values")
          return num
        })
      
      if (parsedArray.length === 0) throw new Error("Array cannot be empty")
      if (parsedArray.length > 20) throw new Error("Array is too large. Maximum size is 20 elements")
      
      return parsedArray
    } catch (error: any) {
      throw new Error(error.message || "Invalid input")
    }
  }

  // Handle array input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputArray(e.target.value)
  }

  // Handle visualization start
  const handleVisualize = () => {
    try {
      setError(null)
      const parsedArray = parseInput(inputArray)
      setArray(parsedArray)
      
      const generatedSteps = generateMergeSortSteps(parsedArray)
      setSteps(generatedSteps)
      setCurrentStep(0)
    } catch (error: any) {
      setError(error.message)
    }
  }

  // Handle next step in visualization
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1)
    }
  }

  // Handle previous step in visualization
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1)
    }
  }

  // Handle reset visualization
  const handleReset = () => {
    setCurrentStep(0)
  }

  // Handle auto-play functionality
  const handleAutoPlay = () => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prevStep => {
          const nextStep = prevStep + 1
          if (nextStep >= steps.length - 1) {
            return steps.length - 1
          }
          return nextStep
        })
        
        // Continue auto-play if not at the last step
        if (currentStep + 1 < steps.length - 1) {
          handleAutoPlay()
        }
      }, 1500 / speed) // Adjust speed based on slider
      
      return () => clearTimeout(timer)
    }
  }

  // Handle speed change
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0])
  }

  // Code to display
  const mergeSortCode = `function mergeSort(arr, left, right) {
  if (left < right) {
    // Find middle point
    const mid = Math.floor((left + right) / 2);
    
    // Sort first and second halves
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    // Merge the sorted halves
    merge(arr, left, mid, right);
  }
}

function merge(arr, left, mid, right) {
  // Create temporary arrays
  const leftArray = arr.slice(left, mid + 1);
  const rightArray = arr.slice(mid + 1, right + 1);
  
  // Merge the arrays back into arr[left...right]
  let i = 0, j = 0, k = left;
  
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
  }
  
  // Copy remaining elements
  while (i < leftArray.length) {
    arr[k] = leftArray[i];
    i++;
    k++;
  }
  
  while (j < rightArray.length) {
    arr[k] = rightArray[j];
    j++;
    k++;
  }
}`

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Interactive Merge Sort</h3>
            <p className="text-muted-foreground">
              Enter comma-separated numbers and visualize how merge sort works step by step.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                value={inputArray}
                onChange={handleInputChange}
                placeholder="Enter numbers separated by commas"
                className="w-full"
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button onClick={handleVisualize}>Visualize</Button>
          </div>
          
          {steps.length > 0 && (
            <div className="space-y-6">
              <MergeSortVisualizer 
                data={steps[currentStep]?.data || array}
                highlight={steps[currentStep]?.highlight || { type: "initial", indices: [] }}
                message={steps[currentStep]?.message || "Initial array"}
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm mr-2">Speed:</div>
                    <Slider
                      value={[speed]}
                      min={0.5}
                      max={3}
                      step={0.5}
                      onValueChange={handleSpeedChange}
                      className="w-32"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={handleReset} disabled={currentStep === 0}>
                    Reset
                  </Button>
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                    Previous
                  </Button>
                  <Button onClick={handleAutoPlay} disabled={currentStep === steps.length - 1}>
                    Auto Play
                  </Button>
                  <Button variant="outline" onClick={handleNext} disabled={currentStep === steps.length - 1}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <DynamicCodeBlock
        code={mergeSortCode}
        language="javascript"
        title="Merge Sort Algorithm"
        timeComplexity="Best: O(n log n) | Average: O(n log n) | Worst: O(n log n)"
        spaceComplexity="O(n) - Requires auxiliary space for merging"
      />
    </div>
  )
}