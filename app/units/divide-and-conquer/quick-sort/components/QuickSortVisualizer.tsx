"use client"

import { Card } from "@/components/ui/card"

interface QuickSortVisualizerProps {
  data: number[]
  highlight: any
  message: string
}

export function QuickSortVisualizer({ data, highlight, message }: QuickSortVisualizerProps) {
  // Scale factor for bar heights - adjusted for larger values
  const maxValue = Math.max(...data, 1)
  const heightScale = Math.min(200 / maxValue, 5) // Limit the height scale

  return (
    <Card className="w-full p-4">
      <div className="flex justify-center mb-4 text-sm font-medium">{message}</div>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-end h-64 gap-2 py-4">
          {data.map((value, index) => {
            // Determine the color based on the current state
            let bgColor = "bg-muted"
            let textColor = "text-foreground"
            let borderColor = ""

            if (highlight) {
              // Initial array state
              if (highlight.type === "initial") {
                bgColor = "bg-blue-500/20"
              } 
              // Final sorted array
              else if (highlight.type === "sorted") {
                bgColor = "bg-green-500"
                textColor = "text-white"
              } 
              // Current subarray being processed
              else if (highlight.type === "subarray" && highlight.indices.includes(index)) {
                bgColor = "bg-yellow-500/30"
              } 
              // Pivot selection
              else if (highlight.type === "pivot") {
                if (index === highlight.pivot) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (index >= highlight.range[0] && index <= highlight.range[1]) {
                  bgColor = "bg-blue-500/20"
                }
              } 
              // Comparing elements with pivot
              else if (highlight.type === "compare") {
                if (index === highlight.pivot) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                } else if (index === highlight.comparing) {
                  bgColor = "bg-yellow-500"
                  textColor = "text-black"
                  borderColor = "border-2 border-black"
                } else if (highlight.smaller.includes(index)) {
                  bgColor = "bg-green-500/50"
                }
              } 
              // Swapping elements
              else if (highlight.type === "swap") {
                if (index === highlight.pivot) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                } else if (highlight.swapped.includes(index)) {
                  bgColor = "bg-purple-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (highlight.smaller.includes(index)) {
                  bgColor = "bg-green-500/50"
                }
              } 
              // Placing pivot in its correct position
              else if (highlight.type === "place-pivot") {
                if (index === highlight.newPivot) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (highlight.smaller.includes(index)) {
                  bgColor = "bg-green-500/50"
                } else if (highlight.greater.includes(index)) {
                  bgColor = "bg-yellow-500/50"
                }
              } 
              // After partitioning
              else if (highlight.type === "partition") {
                if (index === highlight.pivot) {
                  bgColor = "bg-red-500"
                  textColor = "text-white"
                  borderColor = "border-2 border-black"
                } else if (highlight.left.includes(index)) {
                  bgColor = "bg-green-500/50"
                } else if (highlight.right.includes(index)) {
                  bgColor = "bg-yellow-500/50"
                }
              }
            }

            // Calculate height based on value with scaling for large values
            const height = `${Math.max(30, value * heightScale)}px`

            return (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 ${bgColor} ${textColor} ${borderColor} flex items-center justify-center rounded-t-md transition-all duration-300`}
                  style={{ height }}
                >
                  {value}
                </div>
                <div className="text-xs mt-1">{index}</div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/20 rounded-sm"></div>
            <span className="text-sm">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <span className="text-sm">Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <span className="text-sm">Current Comparison</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/50 rounded-sm"></div>
            <span className="text-sm">Elements &lt; Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/50 rounded-sm"></div>
            <span className="text-sm">Elements ≥ Pivot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span className="text-sm">Swapped Elements</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-sm">Sorted</span>
          </div>
        </div>
      </div>
    </Card>
  )
}