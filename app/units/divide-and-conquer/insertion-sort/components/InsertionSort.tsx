"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { InsertionSortVisualizer } from "./InsertionSortVisualizer"
import { Play } from "lucide-react"

export function InsertionSort() {
  // States for the component
  const [array, setArray] = useState<number[]>([5, 2, 4, 6, 1, 3])
  const [inputArray, setInputArray] = useState<string>("5, 2, 4, 6, 1, 3")
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [speed, setSpeed] = useState(1)
  const [error, setError] = useState<string | null>(null)

  // Initialize with default steps when component mounts
  useEffect(() => {
    const initialSteps = generateSteps(array)
    setSteps(initialSteps)
  }, [])

  // Generate steps for insertion sort visualization
  const generateSteps = (arr: number[]) => {
    const steps: any[] = []
    const arrCopy = [...arr]

    // Add initial state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "initial", sorted: [0], current: null },
      message: "Initial array. First element is considered sorted.",
    })

    for (let i = 1; i < arrCopy.length; i++) {
      // Current element to be inserted
      const key = arrCopy[i]

      // Show current element to be inserted
      steps.push({
        data: [...arrCopy],
        highlight: { type: "select", sorted: Array.from({ length: i }, (_, idx) => idx), current: i },
        message: `Selecting element ${key} at index ${i} to insert into the sorted portion.`,
      })

      let j = i - 1

      // Compare with each element in the sorted portion
      while (j >= 0 && arrCopy[j] > key) {
        // Show comparison
        steps.push({
          data: [...arrCopy],
          highlight: { type: "compare", sorted: Array.from({ length: i }, (_, idx) => idx), current: i, comparing: j },
          message: `Comparing ${key} with ${arrCopy[j]} at index ${j}. Since ${key} < ${arrCopy[j]}, we need to shift ${arrCopy[j]} to the right.`,
        })

        // Shift element to the right
        arrCopy[j + 1] = arrCopy[j]

        // Show shift
        steps.push({
          data: [...arrCopy],
          highlight: { type: "shift", sorted: Array.from({ length: i }, (_, idx) => idx), current: i, shifted: j + 1 },
          message: `Shifting ${arrCopy[j]} one position to the right (from index ${j} to ${j + 1}).`,
        })

        j--
      }

      // Insert the key at the correct position
      arrCopy[j + 1] = key

      // Show insertion
      steps.push({
        data: [...arrCopy],
        highlight: { type: "insert", sorted: Array.from({ length: i + 1 }, (_, idx) => idx), inserted: j + 1 },
        message: `Inserting ${key} at index ${j + 1}. The subarray from index 0 to ${i} is now sorted.`,
      })
    }

    // Add final state
    steps.push({
      data: [...arrCopy],
      highlight: { type: "sorted", sorted: arrCopy.map((_, i) => i) },
      message: "Array sorted! Insertion sort complete.",
    })

    return steps
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
  const handleStart = () => {
    try {
      setError(null)
      const parsedArray = parseInput(inputArray)
      setArray(parsedArray)
      
      const generatedSteps = generateSteps(parsedArray)
      setSteps(generatedSteps)
      setCurrentStep(0)
      setIsRunning(true)
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
  const insertionSortCode = `function insertionSort(arr) {
  const n = arr.length;
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Element to be inserted
    let key = arr[i];
    
    // Move elements greater than key one position ahead
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at the correct position
    arr[j + 1] = key;
  }
  
  return arr;
}`

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Interactive Insertion Sort</h3>
            <p className="text-muted-foreground">
              Enter comma-separated numbers and visualize how insertion sort works step by step.
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
            <Button onClick={handleStart}>Run Algorithm</Button>
          </div>
          
          {steps.length > 0 && (
            <div className="space-y-6">
              <InsertionSortVisualizer 
                data={steps[currentStep]?.data || array}
                highlight={steps[currentStep]?.highlight || { type: "initial", sorted: [0], current: null }}
                message={steps[currentStep]?.message || "Initial array. First element is considered sorted."}
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
                    <Play className="w-5 h-5 mr-2"/> Play
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
        code={insertionSortCode}
        language="javascript"
        title="Insertion Sort Algorithm"
        timeComplexity="Best: O(n) | Average: O(n²) | Worst: O(n²)"
        spaceComplexity="O(1) - In-place algorithm"
      />
    </div>
  )
}