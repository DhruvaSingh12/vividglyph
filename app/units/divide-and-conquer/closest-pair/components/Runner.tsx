"use client"

import { useState } from "react"
import { AlgorithmRunner } from "@/components/algorithm-runner"

type Point = { x: number; y: number };
type ClosestPairResult = {
  pair: [Point, Point] | null;
  distance: number;
};

export function Runner() {
  const [steps, setSteps] = useState<any[]>([])

  // Parse input for the algorithm runner
  function parseInput(input: string): Point[] {
    try {
      const lines = input.trim().split("\n")
      const points = lines.map((line) => {
        const [x, y] = line.split(",").map((coord) => {
          const num = Number(coord.trim())
          if (isNaN(num)) {
            throw new Error("Coordinates must be numbers")
          }
          return num
        })
        
        if (x === undefined || y === undefined) {
          throw new Error("Each line must contain two coordinates separated by a comma")
        }
        
        return { x, y }
      })

      if (points.length < 2) {
        throw new Error("At least two points are required")
      }

      return points
    } catch (error) {
      throw error
    }
  }

  // Calculate distance between two points
  function distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  // Find closest pair using brute force
  function bruteForceClosestPair(points: Point[], steps: any[]): ClosestPairResult {
    const n = points.length
    let minDistance = Number.POSITIVE_INFINITY
    let closestPair: [Point, Point] = [points[0], points[1]]
    
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const d = distance(points[i], points[j])
        if (d < minDistance) {
          minDistance = d
          closestPair = [points[i], points[j]]
        }
      }
    }
    
    steps.push({
      type: "brute-force",
      points,
      pair: closestPair,
      distance: minDistance,
      message: `Brute force found closest pair with distance ${minDistance.toFixed(2)}`,
    })
    
    return { pair: closestPair, distance: minDistance }
  }

  // Find closest pair in the strip
  function closestPairInStrip(
    strip: Point[],
    delta: number,
    steps: any[]
  ): ClosestPairResult {
    const n = strip.length
    let minDistance = delta
    let closestPair: [Point, Point] | null = null
    
    // Sort the strip by y-coordinate
    strip.sort((a, b) => a.y - b.y)
    
    // Check at most 7 points ahead (proven to be sufficient)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n && j < i + 8 && strip[j].y - strip[i].y < delta; j++) {
        const d = distance(strip[i], strip[j])
        if (d < minDistance) {
          minDistance = d
          closestPair = [strip[i], strip[j]]
          
          steps.push({
            type: "strip-update",
            pair: closestPair,
            distance: minDistance,
            message: `Found closer pair in strip with distance ${minDistance.toFixed(2)}`,
          })
        }
      }
    }
    
    if (closestPair === null) {
      steps.push({
        type: "strip-no-update",
        message: `No closer pair found in the strip`,
      })
      return { pair: null, distance: Number.POSITIVE_INFINITY }
    }
    
    return { pair: closestPair, distance: minDistance }
  }

  // Find the closest pair using divide and conquer
  function closestPairRecursive(
    pointsX: Point[],
    pointsY: Point[],
    steps: any[]
  ): ClosestPairResult {
    const n = pointsX.length;
    
    // Base case: If there are 2 or 3 points, solve by brute force
    if (n <= 3) {
      return bruteForceClosestPair(pointsX, steps)
    }
    
    // Divide the points into left and right halves
    const mid = Math.floor(n / 2)
    const midPoint = pointsX[mid]
    
    steps.push({
      type: "divide",
      points: pointsX,
      midPoint,
      midIndex: mid,
      message: `Dividing points at x = ${midPoint.x}`,
    })
    
    // Separate points into left and right halves
    const pointsXLeft = pointsX.slice(0, mid)
    const pointsXRight = pointsX.slice(mid)
    
    // Separate points by y-coordinate
    const pointsYLeft: Point[] = []
    const pointsYRight: Point[] = []
    
    for (const point of pointsY) {
      if (point.x <= midPoint.x) {
        pointsYLeft.push(point)
      } else {
        pointsYRight.push(point)
      }
    }
    
    steps.push({
      type: "separate",
      pointsXLeft,
      pointsXRight,
      pointsYLeft,
      pointsYRight,
      message: `Separated points into left and right halves`,
    })
    
    // Recursively find closest pairs in left and right halves
    const leftResult = closestPairRecursive(pointsXLeft, pointsYLeft, steps)
    const rightResult = closestPairRecursive(pointsXRight, pointsYRight, steps)
    
    steps.push({
      type: "recursive-results",
      leftPair: leftResult.pair,
      leftDistance: leftResult.distance,
      rightPair: rightResult.pair,
      rightDistance: rightResult.distance,
      message: `Found closest pairs in left and right halves`,
    })
    
    // Find the minimum distance from left and right halves
    let minResult: ClosestPairResult
    if (leftResult.distance <= rightResult.distance) {
      minResult = leftResult
    } else {
      minResult = rightResult
    }
    
    const delta = minResult.distance
    
    steps.push({
      type: "min-distance",
      minPair: minResult.pair,
      minDistance: delta,
      message: `Minimum distance so far: ${delta.toFixed(2)}`,
    })
    
    // Find points in the strip around the middle line
    const strip: Point[] = []
    for (const point of pointsY) {
      if (Math.abs(point.x - midPoint.x) < delta) {
        strip.push(point)
      }
    }
    
    steps.push({
      type: "strip",
      strip,
      midX: midPoint.x,
      delta,
      message: `Found ${strip.length} points in the strip within distance ${delta.toFixed(2)} of the middle line`,
    })
    
    // Find closest pair in the strip
    const stripResult = closestPairInStrip(strip, delta, steps)
    
    // Return the minimum of all results
    if (stripResult.distance < minResult.distance) {
      steps.push({
        type: "final-result",
        pair: stripResult.pair,
        distance: stripResult.distance,
        message: `Found closer pair in the strip: distance = ${stripResult.distance.toFixed(2)}`,
      })
      return stripResult
    } else {
      steps.push({
        type: "final-result",
        pair: minResult.pair,
        distance: minResult.distance,
        message: `No closer pair found in the strip. Final minimum distance = ${minResult.distance.toFixed(2)}`,
      })
      return minResult
    }
  }

  // Run the closest pair algorithm
  function runClosestPair(points: Point[]) {
    const steps: any[] = []
    
    // Sort points by x-coordinate
    const pointsSortedByX = [...points].sort((a, b) => a.x - b.x)
    
    // Sort points by y-coordinate
    const pointsSortedByY = [...points].sort((a, b) => a.y - b.y)
    
    steps.push({
      type: "sort",
      pointsSortedByX,
      pointsSortedByY,
      message: "Sorted points by x and y coordinates",
    })
    
    // Find the closest pair
    const result = closestPairRecursive(pointsSortedByX, pointsSortedByY, steps)
    
    setSteps(steps)
    
    return {
      result: {
        points,
        closestPair: result.pair,
        distance: result.distance,
      },
      steps,
    }
  }

  // Render the result of the algorithm runner
  function renderClosestPairResult(result: any) {
    return (
      <div>
        <p className="mb-2">
          <span className="font-medium">Number of Points:</span> {result.points.length}
        </p>
        {result.closestPair && (
          <>
            <p className="mb-2">
              <span className="font-medium">Closest Pair:</span>
            </p>
            <ul className="list-disc list-inside mb-2 ml-4">
              <li>
                Point 1: ({result.closestPair[0].x}, {result.closestPair[0].y})
              </li>
              <li>
                Point 2: ({result.closestPair[1].x}, {result.closestPair[1].y})
              </li>
            </ul>
            <p>
              <span className="font-medium">Distance:</span> {result.distance.toFixed(4)}
            </p>
          </>
        )}
      </div>
    )
  }

  return (
    <AlgorithmRunner
      title="Closest Pair Runner"
      description="Enter points as coordinates, one per line (format: x, y)"
      placeholder="1, 2\n3, 4\n5, 6\n7, 8\n9, 10"
      parseInput={parseInput}
      runAlgorithm={runClosestPair}
      renderResult={renderClosestPairResult}
    />
  )
}