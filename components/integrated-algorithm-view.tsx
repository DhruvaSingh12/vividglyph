"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, RefreshCw, AlertCircle } from "lucide-react"

interface IntegratedAlgorithmViewProps {
  algorithmName: string
  defaultInput: string
  inputPlaceholder: string
  parseInput: (input: string) => any
  runAlgorithm: (input: any) => { result: any; steps: any[] }
  renderStep: (data: any, step: number, highlight: any) => React.ReactNode
  renderResult: (result: any) => React.ReactNode
  codeExplanation: (input: any, result: any) => React.ReactNode
}

export function IntegratedAlgorithmView({
  algorithmName,
  defaultInput,
  inputPlaceholder,
  parseInput,
  runAlgorithm,
  renderStep,
  renderResult,
  codeExplanation,
}: IntegratedAlgorithmViewProps) {
  const [input, setInput] = useState(defaultInput)
  const [parsedInput, setParsedInput] = useState<any>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [speed, setSpeed] = useState(1)
  const [timerRef, setTimerRef] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    handleRun()
  }, [])

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1)
        } else {
          setIsRunning(false)
        }
      }, 1000 / speed)
      setTimerRef(timer)
    }

    return () => {
      if (timerRef) {
        clearTimeout(timerRef)
      }
    }
  }, [isRunning, currentStep, speed, steps.length])

  const handleRun = () => {
    setError(null)
    setIsRunning(false)
    setCurrentStep(0)

    if (timerRef) {
      clearTimeout(timerRef)
      setTimerRef(null)
    }

    try {
      const parsed = parseInput(input)
      setParsedInput(parsed)

      const { result, steps } = runAlgorithm(parsed)

      setResult(result)
      setSteps(steps)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input format")
      setResult(null)
      setSteps([])
      setParsedInput(null)
    }
  }

  const togglePlay = () => {
    setIsRunning(!isRunning)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetVisualizer = () => {
    setCurrentStep(0)
    setIsRunning(false)
    if (timerRef) {
      clearTimeout(timerRef)
      setTimerRef(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
            <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center">
              <span className="text-lg">Input</span>
            </h3>
            
            <div className="relative">
              <Textarea
              id="algorithm-input"
              placeholder={inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] font-mono text-sm p-4 border-muted-foreground/20 focus:border-primary/50 transition-all"
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {input.length} characters
              </div>
            </div>

            <div className="flex justify-between items-center">
              {error && (
              <div className="text-sm text-destructive flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
              </div>
              )}
              <Button 
              onClick={handleRun} 
              disabled={!input.trim()}
              className="ml-auto"
              variant="default"
              >
              Run Algorithm
              </Button>
            </div>
            </div>
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 min-h-[300px] flex items-center justify-center">
              {renderStep(steps[currentStep]?.data || [], currentStep, steps[currentStep]?.highlight || null)}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Speed</span>
                  <Slider
                    value={[speed]}
                    min={0.5}
                    max={3}
                    step={0.5}
                    onValueChange={(value) => setSpeed(value[0])}
                    className="w-24"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" size="icon" onClick={resetVisualizer}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Reset</span>
                </Button>
                <Button variant="outline" size="icon" onClick={prevStep} disabled={currentStep === 0}>
                  <SkipBack className="h-4 w-4" />
                  <span className="sr-only">Previous step</span>
                </Button>
                <Button onClick={togglePlay}>
                  {isRunning ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Play
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                  <SkipForward className="h-4 w-4" />
                  <span className="sr-only">Next step</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium">Result</h3>
              <div className="bg-muted p-4 rounded-md">{renderResult(result)}</div>
            </CardContent>
          </Card>
          <div className="prose dark:prose-invert max-w-none">{codeExplanation(parsedInput, result)}</div>
        </div>
      )}
    </div>
  )
}
