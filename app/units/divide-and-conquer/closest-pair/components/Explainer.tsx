import React from 'react';
import { AlgorithmExplainer } from "@/components/algorithm-explainer"

export function Explainer() {
  return (
    <AlgorithmExplainer
      title="Geometric Divide-and-Conquer Algorithms"
      description="Algorithms that solve geometric problems by dividing the input into smaller subproblems, solving them recursively, and combining the results."
      approach="Geometric divide-and-conquer algorithms apply the divide-and-conquer paradigm to problems involving points, lines, and other geometric objects. These algorithms typically divide the input points based on their spatial arrangement, solve subproblems recursively, and then combine the results with a clever merge step that exploits geometric properties."
      phases={[
        {
          title: "Preprocessing",
          description: "Sort or organize the input points to facilitate the divide step, often by coordinates.",
        },
        {
          title: "Divide",
          description: "Split the points into two or more subsets, typically by a spatial division like a vertical line.",
        },
        {
          title: "Conquer",
          description: "Recursively solve the problem for each subset of points.",
        },
        {
          title: "Combine",
          description: "Merge the solutions from the subproblems, handling points that interact across the division boundary.",
        },
      ]}
      complexity={{
        time: {
          best: "O(n log n)",
          average: "O(n log n)",
          worst: "O(n log n)",
        },
        space: "O(n)",
      }}
      pseudocode={`// General structure of geometric divide-and-conquer algorithms
function geometricDivideAndConquer(points):
    // Base case
    if points.length is small:
        return solveDirectly(points)
    
    // Preprocess (e.g., sort points)
    sortedPoints = sort(points)
    
    // Divide
    leftPoints, rightPoints = divide(sortedPoints)
    
    // Conquer
    leftSolution = geometricDivideAndConquer(leftPoints)
    rightSolution = geometricDivideAndConquer(rightPoints)
    
    // Combine
    return merge(leftSolution, rightSolution, points)`}
    />
  )
}