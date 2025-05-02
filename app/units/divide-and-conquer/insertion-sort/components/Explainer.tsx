"use client"
import { Card, CardContent } from "@/components/ui/card"

export function Explainer() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">How Insertion Sort Works</h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Walkthrough</h3>

          <p>
            Insertion sort works by building a sorted array one element at a time. It iterates through an array, 
            consuming one input element at each step, and growing a sorted output list. At each iteration, insertion 
            sort removes one element from the unsorted portion, finds where it belongs within the sorted portion, and 
            inserts it there. This continues until no input elements remain.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Process</h3>
          
          <div className="pl-4 mb-8">
            <ol className="space-y-6 list-decimal">
              <li>
                <strong className="text-primary">Initialization:</strong>
                <p>
                  Start with the first element as a "sorted" subarray of size 1. The rest of the array is considered the "unsorted" portion.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">2</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">6</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded">3</span>
                  <div className="mt-2 text-sm">
                    <span className="inline-block w-16 text-green-500">Sorted</span>
                    <span className="inline-block w-24">Unsorted</span>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Selection:</strong>
                <p>
                  Take the first element from the unsorted region (the element at index 1, which is 2).
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500 text-black font-bold rounded mr-1">2</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">6</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded">3</span>
                </div>
              </li>

              <li>
                <strong className="text-primary">Comparison and Shifting:</strong>
                <p>
                  Compare this element with the sorted portion. Shift elements in the sorted portion that are greater than the current element one position to the right.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <span className="inline-block px-2 py-1 bg-blue-500 text-white rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500 text-black font-bold rounded mr-1">→</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">6</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded">3</span>
                  <div className="mt-2 text-sm">
                    <span>2 &lt; 5, so 5 is shifted right</span>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Insertion:</strong>
                <p>
                  Insert the current element into its correct position in the sorted region.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">2</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">6</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-muted rounded">3</span>
                  <div className="mt-2 text-sm">
                    <span className="inline-block w-28 text-green-500">Sorted</span>
                    <span className="inline-block w-24">Unsorted</span>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Iteration:</strong>
                <p>
                  Repeat the process for each remaining element in the unsorted region until the entire array is sorted.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">2</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">3</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-green-500 text-white rounded">6</span>
                  <div className="mt-2 text-sm">
                    <span>Final sorted array</span>
                  </div>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Analysis</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Time Complexity</h4>
              <ul className="space-y-2">
                <li><strong>Best Case:</strong> O(n) - When the array is already sorted</li>
                <li><strong>Average Case:</strong> O(n²) - When elements are in random order</li>
                <li><strong>Worst Case:</strong> O(n²) - When the array is sorted in reverse order</li>
              </ul>
              <p className="mt-3 text-sm">
                The algorithm requires approximately n² / 4 comparisons and n² / 4 swaps on average.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Space Complexity</h4>
              <ul className="space-y-2">
                <li><strong>O(1)</strong> - Insertion sort is an in-place algorithm</li>
                <li>It only requires a constant amount of additional memory space</li>
                <li>No additional data structures are needed</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Advantages and Disadvantages</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium mb-2 text-green-500">Advantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Simple to implement and understand</li>
                <li>Efficient for small data sets</li>
                <li>Adaptive - efficient for partially sorted arrays</li>
                <li>Stable - maintains relative order of equal elements</li>
                <li>In-place - requires minimal extra memory</li>
                <li>Online - can sort a list as it receives it</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2 text-red-500">Disadvantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Inefficient for large data sets</li>
                <li>Quadratic time complexity in average and worst cases</li>
                <li>Performs many element movements compared to other algorithms</li>
                <li>Not suitable for large, unsorted datasets</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}