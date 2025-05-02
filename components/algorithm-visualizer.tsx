"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from "lucide-react"

interface VisualizerProps {
  algorithm: string
  initialData: any[]
  steps: any[]
  renderStep: (data: any, step: number, highlight: any) => React.ReactNode
}

export function AlgorithmVisualizer({ algorithm, initialData, steps, renderStep }: VisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [data, setData] = useState(initialData)
  const [highlight, setHighlight] = useState<any>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  
  useEffect(() => {
    resetVisualizer()
  }, [algorithm, initialData])

  
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          nextStep()
        } else {
          setIsPlaying(false)
        }
      }, 1000 / speed)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isPlaying, currentStep, speed, steps.length])

  
  useEffect(() => {
    if (steps[currentStep]) {
      setData(steps[currentStep].data || data)
      setHighlight(steps[currentStep].highlight || null)
    }
  }, [currentStep, steps])

  const resetVisualizer = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setData(initialData)
    setHighlight(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
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

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-6 min-h-[300px] flex items-center justify-center">
          {renderStep(data, currentStep, highlight)}
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
              {isPlaying ? (
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
  )
}
