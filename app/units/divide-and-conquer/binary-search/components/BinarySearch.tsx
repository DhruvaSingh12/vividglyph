"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { IntegratedAlgorithmView } from "@/components/integrated-algorithm-view"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import {
  parseInput,
  runBinarySearch,
  renderBinarySearchStep,
  BinarySearchInput,
  BinarySearchResult
} from "./BinarySearchVisualizer"

export function BinarySearch() {
  const initialArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
  const defaultInput = `${initialArray.join(", ")}\n\n11`

  function renderBinarySearchResult(result: BinarySearchResult) {
    return (
      <div className="space-y-2 mt-4">
        <div className="font-medium">Input Array: [{result.array.join(", ")}]</div>
        <div className="font-medium">Target Value: {result.target}</div>
        <div className="font-medium">
          Result: {result.index !== -1 
            ? `Found at index ${result.index}` 
            : "Target not found in array"}
        </div>
      </div>
    );
  }

  function codeExplanation(input: BinarySearchInput, result: BinarySearchResult) {
    const binarySearchCode = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    // Found the target
    if (arr[mid] === target) {
      return mid;
    }
    
    // Discard left half
    if (arr[mid] < target) {
      left = mid + 1;
    } 
    // Discard right half
    else {
      right = mid - 1;
    }
  }
  
  // Target is not in the array
  return -1;
}`;

    return (
      <div className="space-y-4">
        <DynamicCodeBlock
          code={binarySearchCode}
          language="javascript"
          title="Binary Search Algorithm"
          timeComplexity="O(log n) - The search space is halved in each step. Best case is O(1) when the target is found in the middle on first attempt."
          spaceComplexity="O(1) - Only a constant amount of extra space is needed for the iterative approach. Recursive implementation would use O(log n) stack space."
          inputValues={[input.array, input.target]}
          outputValues={result.index >= 0 ? `Found at index ${result.index}` : "Not found"}
        />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Interactive Binary Search</h2>
          <IntegratedAlgorithmView
            algorithmName="Binary Search"
            defaultInput={defaultInput}
            inputPlaceholder="1, 3, 5, 7, 9, 11, 13, 15, 17, 19

11"
            parseInput={parseInput}
            runAlgorithm={runBinarySearch}
            renderStep={renderBinarySearchStep}
            renderResult={renderBinarySearchResult}
            codeExplanation={codeExplanation}
          />
        </div>
      </CardContent>
    </Card>
  )
}
