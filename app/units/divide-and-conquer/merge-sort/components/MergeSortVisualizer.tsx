"use client"

import { Card } from "@/components/ui/card"

interface MergeSortVisualizerProps {
  data: number[]
  highlight: any
  message: string
}

export function MergeSortVisualizer({ data, highlight, message }: MergeSortVisualizerProps) {
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
              if (highlight.type === "initial") {
                bgColor = "bg-blue-500/20"
              } else if (highlight.type === "sorted") {
                bgColor = "bg-green-500"
                textColor = "text-white"
              } else if (highlight.type === "divide" && highlight.indices.includes(index)) {
                bgColor = "bg-yellow-500"
                textColor = "text-black"
              } else if (highlight.type === "before-merge" && highlight.indices.includes(index)) {
                bgColor = "bg-purple-500/30"
              } else if (highlight.type === "merge-subarrays") {
                const leftEnd = highlight.leftIdx + highlight.left.length - 1
                const rightEnd = highlight.rightIdx + highlight.right.length - 1

                if (index >= highlight.leftIdx && index <= leftEnd) {
                  bgColor = "bg-blue-500/50"
                } else if (index >= highlight.rightIdx && index <= rightEnd) {
                  bgColor = "bg-red-500/50"
                }
              } else if (highlight.type === "merge-step" && highlight.indices.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
                borderColor = "border-2 border-black"
              } else if (highlight.type === "merged" && highlight.indices.includes(index)) {
                bgColor = "bg-purple-500/50"
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

        {highlight?.type === "merge-subarrays" && (
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500/50 rounded-sm"></div>
              <span className="text-sm">Left subarray: [{highlight.left.join(", ")}]</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/50 rounded-sm"></div>
              <span className="text-sm">Right subarray: [{highlight.right.join(", ")}]</span>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/20 rounded-sm"></div>
            <span className="text-sm">Initial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <span className="text-sm">Division Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/50 rounded-sm"></div>
            <span className="text-sm">Left Subarray</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/50 rounded-sm"></div>
            <span className="text-sm">Right Subarray</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500/50 rounded-sm"></div>
            <span className="text-sm">Merged</span>
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