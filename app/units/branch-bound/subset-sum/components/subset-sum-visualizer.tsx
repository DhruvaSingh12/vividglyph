"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SubsetSumVisualizerProps {
  numbers: number[]
  target: number
  currentSubset: number[]
  bestSubset: number[]
  message?: string
}

export function SubsetSumVisualizer({ numbers, target, currentSubset, bestSubset, message }: SubsetSumVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, width, height)

    // Draw tree visualization
    const maxDepth = numbers.length
    const nodeRadius = 20
    const horizontalSpacing = width / (Math.pow(2, maxDepth - 1) + 1)
    const verticalSpacing = (height - 100) / (maxDepth + 1)

    // Draw the decision tree (simplified version)
    function drawNode(x: number, y: number, depth: number, path: boolean[], sum: number) {
      if (!ctx) return
      
      // Draw node
      ctx.beginPath()
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI)

      // Color based on whether this node is in the current or best subset
      const isInCurrentPath =
        depth <= currentSubset.length && path.slice(0, depth).every((val, idx) => val === (currentSubset[idx] === 1))
      const isInBestPath =
        depth <= bestSubset.length && path.slice(0, depth).every((val, idx) => val === (bestSubset[idx] === 1))

      if (isInBestPath) {
        ctx.fillStyle = "rgba(34, 197, 94, 0.7)" // Green for best solution
      } else if (isInCurrentPath) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.7)" // Blue for current path
      } else {
        ctx.fillStyle = "rgba(148, 163, 184, 0.5)" // Gray for other nodes
      }

      ctx.fill()
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw node value
      ctx.fillStyle = "#1e293b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(sum.toString(), x, y)

      // Stop recursion at max depth
      if (depth >= maxDepth) return

      // Calculate child positions
      const nextLevel = depth + 1
      const horizontalOffset = width / Math.pow(2, nextLevel)
      const leftX = x - horizontalOffset / 2
      const rightX = x + horizontalOffset / 2
      const nextY = y + verticalSpacing

      // Draw edges to children
      ctx.beginPath()
      ctx.moveTo(x, y + nodeRadius)
      ctx.lineTo(leftX, nextY - nodeRadius)
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x, y + nodeRadius)
      ctx.lineTo(rightX, nextY - nodeRadius)
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 1
      ctx.stroke()

      // Recursively draw children
      // Left child (exclude current number)
      const leftPath = [...path, false]
      drawNode(leftX, nextY, nextLevel, leftPath, sum)

      // Right child (include current number)
      const rightPath = [...path, true]
      const nextNum = depth < numbers.length ? numbers[depth] : 0
      drawNode(rightX, nextY, nextLevel, rightPath, sum + nextNum)
    }

    // Start drawing from the root
    drawNode(width / 2, 50, 0, [], 0)

    // Draw target sum
    ctx.fillStyle = "#1e293b"
    ctx.font = "16px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`Target Sum: ${target}`, width / 2, height - 20)
  }, [numbers, target, currentSubset, bestSubset])

  return (
    <div className="space-y-4">
      {message && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-center font-medium">{message}</p>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Subset Sum Visualization</h3>
          <canvas ref={canvasRef} width={600} height={400} className="mx-auto border border-border" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Input Numbers</h3>
            <div className="flex flex-wrap gap-2">
              {numbers.map((num, index) => (
                <div key={index} className="p-2 rounded-md border bg-muted/30 flex items-center">
                  <span className="font-medium">{num}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Current Best Subset</h3>
            <div className="flex flex-wrap gap-2">
              {bestSubset.map(
                (included, index) =>
                  included === 1 && (
                    <div
                      key={index}
                      className="p-2 rounded-md border bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 flex items-center"
                    >
                      <span className="font-medium">{numbers[index]}</span>
                    </div>
                  ),
              )}
            </div>
            <p className="mt-2">
              Sum: {bestSubset.reduce((sum, included, index) => sum + (included === 1 ? numbers[index] : 0), 0)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
