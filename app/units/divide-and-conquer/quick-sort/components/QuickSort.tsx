"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { QuickSortVisualizer } from "./QuickSortVisualizer"

export function QuickSort() {
  // States for the component
  const [array, setArray] = useState<number[]>([29, 17, 10, 12, 4, 9, 49, 23, 18])
  const [inputArray, setInputArray] = useState<string>("29, 17, 10, 12, 4, 9, 49, 23, 18")
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [speed, setSpeed] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Initialize with default steps when component mounts
  useEffect(() => {
    const initialSteps = generateQuickSortSteps(array)
    setSteps(initialSteps)
  }, [])

  // Function to generate quick sort steps for visualization
  function generateQuickSortSteps(arr: number[]) {
    const steps: any[] = []
    const arrCopy = [...arr]

    // Add initial state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "initial", indices: [] },
      message: "Initial array. We'll sort using Quick Sort algorithm.",
    })

    // Perform quick sort and track steps
    quickSortWithSteps(arrCopy, 0, arrCopy.length - 1, steps)

    // Add final state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "sorted", indices: arrCopy.map((_, i) => i) },
      message: "Array sorted! Quick Sort complete.",
    })

    return steps
  }

  // Quick sort implementation that tracks steps
  function quickSortWithSteps(arr: number[], low: number, high: number, steps: any[]) {
    if (low < high) {
      // Show the current subarray we're working on
      steps.push({
        data: [...arr],
        highlight: { type: "subarray", indices: Array.from({ length: high - low + 1 }, (_, i) => low + i) },
        message: `Sorting subarray from index ${low} to ${high}`,
      })

      // Partition the array and get the pivot index
      const pivotIndex = partitionWithSteps(arr, low, high, steps)

      // Show the partition result
      steps.push({
        data: [...arr],
        highlight: {
          type: "partition",
          pivot: pivotIndex,
          left: Array.from({ length: pivotIndex - low }, (_, i) => low + i),
          right: Array.from({ length: high - pivotIndex }, (_, i) => pivotIndex + 1 + i),
        },
        message: `Partitioned around pivot ${arr[pivotIndex]} at index ${pivotIndex}. Elements to the left are smaller, elements to the right are greater.`,
      })

      // Recursively sort the subarrays
      quickSortWithSteps(arr, low, pivotIndex - 1, steps)
      quickSortWithSteps(arr, pivotIndex + 1, high, steps)
    }
  }

  // Partition function with step tracking
  function partitionWithSteps(arr: number[], low: number, high: number, steps: any[]) {
    // Choose the rightmost element as the pivot
    const pivot = arr[high]

    // Show pivot selection
    steps.push({
      data: [...arr],
      highlight: { type: "pivot", pivot: high, range: [low, high] },
      message: `Selected pivot ${pivot} at index ${high}`,
    })

    let i = low - 1 // Index of smaller element

    for (let j = low; j < high; j++) {
      // Show current comparison
      steps.push({
        data: [...arr],
        highlight: {
          type: "compare",
          pivot: high,
          comparing: j,
          smaller: Array.from({ length: i + 1 }, (_, idx) => low + idx),
        },
        message: `Comparing ${arr[j]} with pivot ${pivot}`,
      })

      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++ // Increment index of smaller element

        // Swap arr[i] and arr[j]
        ;[arr[i], arr[j]] = [arr[j], arr[i]]

        // Show swap
        if (i !== j) {
          steps.push({
            data: [...arr],
            highlight: {
              type: "swap",
              pivot: high,
              swapped: [i, j],
              smaller: Array.from({ length: i }, (_, idx) => low + idx),
            },
            message: `Swapped ${arr[i]} and ${arr[j]} because ${arr[i]} < ${pivot}`,
          })
        }
      } else {
        steps.push({
          data: [...arr],
          highlight: {
            type: "compare",
            pivot: high,
            comparing: j,
            smaller: Array.from({ length: i + 1 }, (_, idx) => low + idx),
          },
          message: `${arr[j]} >= ${pivot}, so no swap needed`,
        })
      }
    }
    // Swap arr[i+1] and arr[high] (put the pivot in its correct position)
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

    // Show final pivot placement
    steps.push({
      data: [...arr],
      highlight: {
        type: "place-pivot",
        oldPivot: high,
        newPivot: i + 1,
        smaller: Array.from({ length: i + 1 }, (_, idx) => low + idx),
        greater: Array.from({ length: high - i - 1 }, (_, idx) => i + 2 + idx),
      },
      message: `Placed pivot ${pivot} at its correct position (index ${i + 1})`,
    })

    return i + 1 // Return the pivot index
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
      
      const generatedSteps = generateQuickSortSteps(parsedArray)
      setSteps(generatedSteps)
      setCurrentStep(0)
      setIsPlaying(false)
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
    setIsPlaying(false)
  }

  // Handle auto-play functionality
  const handleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Effect for auto-play
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          if (nextStep >= steps.length - 1) {
            setIsPlaying(false)
            return steps.length - 1
          }
          return nextStep
        })
      }, 1500 / speed) // Adjust speed based on slider
    }

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying, speed, steps.length])

  // Handle speed change
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0])
  }

  // Code to display
  const quickSortCode = `function quickSort(arr, low, high) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort the subarrays
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // Choose the rightmost element as pivot
  const pivot = arr[high];
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Swap the pivot element with the element at i+1
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Return the pivot index
  return i + 1;
}`

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Interactive Quick Sort</h3>
            <p className="text-muted-foreground">
              Enter comma-separated numbers and visualize how quick sort works step by step.
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
              <QuickSortVisualizer 
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
                  <Button onClick={handleAutoPlay}>
                    {isPlaying ? "Pause" : "Auto Play"}
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
        code={quickSortCode}
        language="javascript"
        title="Quick Sort Algorithm"
        timeComplexity="Best: O(n log n) | Average: O(n log n) | Worst: O(n²)"
        spaceComplexity="O(log n) - For the recursive stack"
      />
    </div>
  )
}