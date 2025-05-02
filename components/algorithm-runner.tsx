"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, AlertCircle } from "lucide-react"

interface RunnerProps {
  title: string
  description: string
  placeholder: string
  parseInput: (input: string) => any
  runAlgorithm: (input: any) => { result: any; steps: any[] }
  renderResult: (result: any) => React.ReactNode
  onStepsGenerated?: (steps: any[]) => void
}

export function AlgorithmRunner({
  title,
  description,
  placeholder,
  parseInput,
  runAlgorithm,
  renderResult,
  onStepsGenerated,
}: RunnerProps) {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setError(null)
    setIsRunning(true)

    try {
      const parsedInput = parseInput(input)
      const { result, steps } = runAlgorithm(parsedInput)

      setResult(result)
      if (onStepsGenerated) {
        onStepsGenerated(steps)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input format")
      setResult(null)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] font-mono"
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result !== null && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Result</h3>
            <div className="bg-muted p-4 rounded-md">{renderResult(result)}</div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleRun} disabled={isRunning || !input.trim()}>
          <Play className="mr-2 h-4 w-4" />
          Run Algorithm
        </Button>
      </CardFooter>
    </Card>
  )
}
