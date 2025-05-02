"use client"

import { Card } from "@/components/ui/card"

interface InsertionSortVisualizerProps {
  data: number[]
  highlight: any
  message: string
}

export function InsertionSortVisualizer({ data, highlight, message }: InsertionSortVisualizerProps) {
  const maxValue = Math.max(...data, 1)
  const heightScale = Math.min(200 / maxValue, 10) 

  return (
    <Card className="w-full p-4">
      <div className="flex justify-center mb-4 text-sm font-medium">{message}</div>
      <div className="flex justify-center items-end h-64 gap-2 py-4">
        {data.map((value, index) => {
          let bgColor = "bg-muted"
          let textColor = "text-foreground"
          let borderColor = ""

          if (highlight) {
            if (highlight.type === "initial" || highlight.type === "sorted") {
              if (highlight.sorted && highlight.sorted.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
              }
            } else if (highlight.type === "select") {
              if (highlight.sorted && highlight.sorted.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
              } else if (index === highlight.current) {
                bgColor = "bg-yellow-500"
                textColor = "text-black"
                borderColor = "border-2 border-black"
              }
            } else if (highlight.type === "compare") {
              if (highlight.sorted && highlight.sorted.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
              } else if (index === highlight.current) {
                bgColor = "bg-yellow-500"
                textColor = "text-black"
              } else if (index === highlight.comparing) {
                bgColor = "bg-blue-500"
                textColor = "text-white"
              }
            } else if (highlight.type === "shift") {
              if (highlight.sorted && highlight.sorted.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
              } else if (index === highlight.current) {
                bgColor = "bg-yellow-500"
                textColor = "text-black"
              } else if (index === highlight.shifted) {
                bgColor = "bg-purple-500"
                textColor = "text-white"
                borderColor = "border-2 border-black"
              }
            } else if (highlight.type === "insert") {
              if (highlight.sorted && highlight.sorted.includes(index)) {
                bgColor = "bg-green-500"
                textColor = "text-white"
              }
              if (index === highlight.inserted) {
                bgColor = "bg-yellow-500"
                textColor = "text-black"
                borderColor = "border-2 border-black"
              }
            }
          }

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

      <div className="mt-6 flex justify-center items-center">
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Sorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
            <span>Current element</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span>Shifted</span>
          </div>
        </div>
      </div>
    </Card>
  )
}