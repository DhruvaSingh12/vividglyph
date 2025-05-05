"use client"

import { useEffect, useRef, useState } from "react"
import { useResizeObserver } from "@/hooks/use-resize-observer"
import { useIsMobile } from "@/hooks/use-mobile"

interface NQueensVisualizerProps {
  size: number
  queens: number[]
  currentRow?: number
  message?: string
  compact?: boolean
}

export function NQueensVisualizer({ 
  size, 
  queens, 
  currentRow = -1, 
  message,
  compact = false 
}: NQueensVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const isMobile = useIsMobile()

  // Use a resize observer to track container size changes with reduced size for main visualization
  useResizeObserver(containerRef, (entry) => {
    if (entry) {
      const { width } = entry.contentRect
      // Calculate appropriate width based on compact mode
      const maxSize = compact ? width : Math.min(width, isMobile ? 280 : 320)
      setDimensions({ width: maxSize, height: maxSize })
    }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    // Set canvas dimensions to match container size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = dimensions.width / size
    const boardSize = cellSize * size

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the chessboard
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        ctx.fillStyle = (row + col) % 2 === 0 ? "#f0d9b5" : "#b58863"
        
        // Highlight current row if specified
        if (row === currentRow) {
          ctx.fillStyle = (row + col) % 2 === 0 ? "#c0e7ff" : "#80c0ff"
        }
        
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
      }
    }

    // Draw queens
    for (let row = 0; row < queens.length; row++) {
      const col = queens[row]
      if (col >= 0 && col < size) {
        // Draw queen
        ctx.fillStyle = "#000"
        
        // Adjust font size based on cell size
        const fontSize = Math.max(cellSize * 0.6, 10)
        ctx.font = `${fontSize}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("♕", col * cellSize + cellSize / 2, row * cellSize + cellSize / 2)
        
        // Highlight attacked positions if this is current row
        if (row === currentRow) {
          // Highlight column
          for (let r = 0; r < size; r++) {
            if (r !== row) {
              ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
              ctx.fillRect(col * cellSize, r * cellSize, cellSize, cellSize)
            }
          }
          
          // Highlight diagonals - optimized loop
          for (let i = 1; i < size; i++) {
            // Down-right diagonal
            if (row + i < size && col + i < size) {
              ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
              ctx.fillRect((col + i) * cellSize, (row + i) * cellSize, cellSize, cellSize)
            }
            
            // Down-left diagonal
            if (row + i < size && col - i >= 0) {
              ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
              ctx.fillRect((col - i) * cellSize, (row + i) * cellSize, cellSize, cellSize)
            }
            
            // Up-right diagonal
            if (row - i >= 0 && col + i < size) {
              ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
              ctx.fillRect((col + i) * cellSize, (row - i) * cellSize, cellSize, cellSize)
            }
            
            // Up-left diagonal
            if (row - i >= 0 && col - i >= 0) {
              ctx.fillStyle = "rgba(255, 0, 0, 0.3)"
              ctx.fillRect((col - i) * cellSize, (row - i) * cellSize, cellSize, cellSize)
            }
          }
        }
      }
    }

    // Draw grid lines
    ctx.strokeStyle = "#000"
    ctx.lineWidth = compact ? 0.5 : 1
    for (let i = 0; i <= size; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(boardSize, i * cellSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, boardSize)
      ctx.stroke()
    }
  }, [size, queens, currentRow, dimensions, isMobile])

  return (
    <div className="space-y-3 w-full">
      {message && !compact && (
        <div className="bg-muted/50 p-2 rounded-lg">
          <p className="text-center text-sm md:text-base">{message}</p>
        </div>
      )}

      <div className={compact ? "" : "card"}>
        <div className={compact ? "" : "p-2 md:p-4"}>
          <div 
            ref={containerRef} 
            className={`relative ${compact ? "w-full" : "w-full mx-auto"}`}
            style={{ maxWidth: compact ? "100%" : "320px" }}
          >
            <div className="pb-[100%]"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full border border-border shadow-sm"
                style={{ maxWidth: dimensions.width, maxHeight: dimensions.height }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
