"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Edge {
  source: number
  target: number
  weight: number
  included?: boolean
  highlight?: boolean
}

interface Node {
  id: number
  label: string
  visited?: boolean
  highlight?: boolean
}

interface HamiltonCircuitVisualizerProps {
  nodes: Node[]
  edges: Edge[]
  currentPath: number[]
  bestPath: number[]
  message?: string
}

export function HamiltonCircuitVisualizer({
  nodes,
  edges,
  currentPath,
  bestPath,
  message,
}: HamiltonCircuitVisualizerProps) {
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

    // Calculate node positions in a circle
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35

    const nodePositions: { [key: number]: { x: number; y: number } } = {}

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      nodePositions[node.id] = { x, y }
    })

    // Draw edges
    edges.forEach((edge) => {
      const sourcePos = nodePositions[edge.source]
      const targetPos = nodePositions[edge.target]

      if (!sourcePos || !targetPos) return

      // Check if this edge is in the current path
      const isInCurrentPath = currentPath.some((nodeId, index) => {
        if (index === currentPath.length - 1) return false
        return (
          (currentPath[index] === edge.source && currentPath[index + 1] === edge.target) ||
          (currentPath[index] === edge.target && currentPath[index + 1] === edge.source)
        )
      })

      // Check if this edge is in the best path
      const isInBestPath = bestPath.some((nodeId, index) => {
        if (index === bestPath.length - 1) return false
        return (
          (bestPath[index] === edge.source && bestPath[index + 1] === edge.target) ||
          (bestPath[index] === edge.target && bestPath[index + 1] === edge.source)
        )
      })

      ctx.beginPath()
      ctx.moveTo(sourcePos.x, sourcePos.y)
      ctx.lineTo(targetPos.x, targetPos.y)

      if (isInBestPath) {
        ctx.strokeStyle = "#22c55e" // Green for best path
        ctx.lineWidth = 3
      } else if (isInCurrentPath) {
        ctx.strokeStyle = "#3b82f6" // Blue for current path
        ctx.lineWidth = 2
      } else {
        ctx.strokeStyle = "#94a3b8" // Gray for regular edges
        ctx.lineWidth = 1
      }

      ctx.stroke()

      // Draw edge weight
      const midX = (sourcePos.x + targetPos.x) / 2
      const midY = (sourcePos.y + targetPos.y) / 2

      // Add a small offset to the weight text to avoid overlapping with the edge
      const dx = targetPos.x - sourcePos.x
      const dy = targetPos.y - sourcePos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const offsetX = (-dy / dist) * 15
      const offsetY = (dx / dist) * 15

      ctx.fillStyle = "#1e293b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw weight with background for better visibility
      const weightText = edge.weight.toString()
      const textWidth = ctx.measureText(weightText).width + 6

      ctx.fillStyle = "white"
      ctx.fillRect(midX + offsetX - textWidth / 2, midY + offsetY - 10, textWidth, 20)

      ctx.fillStyle = isInBestPath ? "#22c55e" : "#1e293b"
      ctx.fillText(weightText, midX + offsetX, midY + offsetY)
    })

    // Draw nodes
    nodes.forEach((node) => {
      const pos = nodePositions[node.id]
      if (!pos) return

      const isInCurrentPath = currentPath.includes(node.id)
      const isInBestPath = bestPath.includes(node.id)

      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)

      if (isInBestPath) {
        ctx.fillStyle = "rgba(34, 197, 94, 0.3)" // Green for best path
      } else if (isInCurrentPath) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)" // Blue for current path
      } else {
        ctx.fillStyle = "rgba(148, 163, 184, 0.3)" // Gray for regular nodes
      }

      ctx.fill()
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw node label
      ctx.fillStyle = "#1e293b"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, pos.x, pos.y)
    })

    // Draw path order for best path
    if (bestPath.length > 0) {
      bestPath.forEach((nodeId, index) => {
        const pos = nodePositions[nodeId]
        if (!pos) return

        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(pos.x + 15, pos.y - 15, 10, 0, 2 * Math.PI)
        ctx.fill()
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = "#1e293b"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText((index + 1).toString(), pos.x + 15, pos.y - 15)
      })
    }
  }, [nodes, edges, currentPath, bestPath])

  return (
    <div className="space-y-4">
      {message && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-center font-medium">{message}</p>
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Hamilton Circuit Visualization</h3>
          <canvas ref={canvasRef} width={600} height={500} className="mx-auto border border-border" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Best Path</h3>
            {bestPath.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {bestPath.map((nodeId, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-2 rounded-md border bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700">
                      <span className="font-medium">{nodes.find((n) => n.id === nodeId)?.label || nodeId}</span>
                    </div>
                    {index < bestPath.length - 1 && <span className="mx-1">→</span>}
                  </div>
                ))}
                {bestPath.length > 0 && bestPath[0] !== bestPath[bestPath.length - 1] && (
                  <>
                    <span className="mx-1">→</span>
                    <div className="p-2 rounded-md border bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700">
                      <span className="font-medium">
                        {nodes.find((n) => n.id === bestPath[0])?.label || bestPath[0]}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p>No path found yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Current Path</h3>
            {currentPath.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {currentPath.map((nodeId, index) => (
                  <div key={index} className="flex items-center">
                    <div className="p-2 rounded-md border bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700">
                      <span className="font-medium">{nodes.find((n) => n.id === nodeId)?.label || nodeId}</span>
                    </div>
                    {index < currentPath.length - 1 && <span className="mx-1">→</span>}
                  </div>
                ))}
              </div>
            ) : (
              <p>No current path</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
