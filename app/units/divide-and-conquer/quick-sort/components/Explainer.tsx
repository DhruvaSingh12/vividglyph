"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Explainer() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">How Quick Sort Works</h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Walkthrough</h3>

          <p>
            Quick Sort is an efficient divide-and-conquer algorithm that works by selecting a 'pivot' element from the array
            and partitioning the other elements into two subarrays according to whether they are less than or greater than the pivot.
            The subarrays are then recursively sorted. This approach is efficient because partitioning can be done in-place.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Process</h3>
          
          <div className="pl-4 mb-8">
            <ol className="space-y-6 list-decimal">
              <li>
                <strong className="text-primary">Pivot Selection:</strong>
                <p>
                  Choose a pivot element from the array. In the classic implementation, the last element is often selected as the pivot.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded">4</span>
                    <div className="mt-1 text-sm">Original array with pivot (9) highlighted in red</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Partitioning:</strong>
                <p>
                  Rearrange the array so that all elements less than the pivot come before it, and all elements greater than the pivot come after it.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500 text-black font-bold rounded mr-1">7</span> {/* current element being compared */}
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded mr-1">9</span> {/* pivot */}
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded">4</span>
                    <div className="mt-1 text-sm">Comparing elements with pivot</div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">4</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded mr-1">9</span> {/* pivot */}
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded">5</span>
                    <div className="mt-1 text-sm">After partitioning: elements &lt; pivot (green), pivot (red), elements ≥ pivot (yellow)</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Pivot Placement:</strong>
                <p>
                  After partitioning, the pivot element is placed in its final position. This is the position it would occupy in the sorted array.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">4</span>
                    <span className="inline-block px-2 py-1 bg-purple-500 text-white font-bold border-2 border-black rounded mr-1">5</span> {/* new pivot position */}
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded">9</span>
                    <div className="mt-1 text-sm">Pivot (5) is now in its correct sorted position</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Recursive Sorting:</strong>
                <p>
                  Recursively apply the above steps to the subarrays on the left and right of the pivot.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2">
                  <div className="flex flex-col gap-4">
                    <div className="text-center">
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">3</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">2</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">1</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">4</span>
                      <span className="inline-block px-2 py-1 bg-purple-500 text-white rounded mr-1">5</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded mr-1">7</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded mr-1">8</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded">9</span>
                      <div className="mt-1 text-sm">Recursively sort left subarray (blue) and right subarray (yellow)</div>
                    </div>
                    
                    <div className="flex justify-around">
                      <div className="text-center">
                        <div>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">1</span>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">2</span>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">3</span>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded">4</span>
                        </div>
                        <div className="mt-1 text-sm">Sorted left subarray</div>
                      </div>
                      
                      <div className="text-center">
                        <div>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">7</span>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">8</span>
                          <span className="inline-block px-2 py-1 bg-green-500 text-white rounded">9</span>
                        </div>
                        <div className="mt-1 text-sm">Sorted right subarray</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Final Result:</strong>
                <p>
                  After all recursive calls complete, the entire array is sorted.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">4</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded">9</span>
                    <div className="mt-1 text-sm">Final sorted array</div>
                  </div>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">The Partitioning Process</h3>
          <p className="mb-4">
            The key to quick sort is the partitioning process. Let's look at how it works in detail:
          </p>
          
          <div className="bg-muted/30 p-4 rounded-md mt-4 mb-6">
            <h4 className="font-medium mb-2">Partitioning Example: [3, 7, 8, 5, 2, 1, 9, 5, 4] with pivot = 4 (last element)</h4>
            
            <div className="space-y-3 mt-4">
              <div>
                <div className="text-sm mb-1">Initialize two pointers: i = -1 (tracks the boundary between smaller and larger elements), j = 0 (for scanning)</div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">i</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">j</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Compare arr[j] (3) with pivot (4). Since 3 &lt; 4, increment i and swap arr[i] with arr[j]</div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">i</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">j</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
              </div>

              {/* Continue with other steps, showing j advancing through array and i incrementing/swapping when elements < pivot are found */}
              <div>
                <div className="text-sm mb-1">Compare arr[j] (7) with pivot (4). Since 7 &gt; 4, no action needed</div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">j</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
              </div>

              {/* After all comparisons and swaps */}
              <div>
                <div className="text-sm mb-1">After scanning the array and making all necessary swaps</div>
                <div className="flex gap-2">
                  <div className="w-8 text-center">i</div>
                  <div className="flex">
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">2</span>
                    <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">1</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">8</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">7</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">5</span>
                    <span className="inline-block px-2 py-1 bg-red-500 text-white rounded">4</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Final step: Swap pivot with element at position i+1</div>
                <div className="flex">
                  <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                  <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">2</span>
                  <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">1</span>
                  <span className="inline-block px-2 py-1 bg-red-500 text-white rounded mr-1">4</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">8</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">7</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">9</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded mr-1">5</span>
                  <span className="inline-block px-2 py-1 bg-yellow-500/50 rounded">5</span>
                </div>
                <div className="mt-2 text-sm">
                  <div>Pivot (4) is now at its final sorted position</div>
                  <div>Green elements (left side) are all less than the pivot</div>
                  <div>Yellow elements (right side) are all greater than or equal to the pivot</div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Analysis</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Time Complexity</h4>
              <ul className="space-y-2">
                <li><strong>Best Case:</strong> O(n log n) - When the pivot divides the array into roughly equal halves</li>
                <li><strong>Average Case:</strong> O(n log n) - Expected performance with random data</li>
                <li><strong>Worst Case:</strong> O(n²) - When the pivot is always the smallest or largest element</li>
              </ul>
              <p className="mt-3 text-sm">
                The worst case occurs when the array is already sorted or reverse sorted and the pivot selection is not optimized.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Space Complexity</h4>
              <ul className="space-y-2">
                <li><strong>O(log n)</strong> - For the recursive call stack in average case</li>
                <li><strong>O(n)</strong> - Worst case space complexity for the call stack</li>
                <li>The partitioning is done in-place, requiring no additional arrays</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Advantages and Disadvantages</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium mb-2 text-green-500">Advantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Very efficient on average with O(n log n) time complexity</li>
                <li>In-place partitioning requires minimal extra memory</li>
                <li>Cache-friendly due to good locality of reference</li>
                <li>Tail-call optimization can reduce space complexity</li>
                <li>Performs well on many different kinds of input data</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2 text-red-500">Disadvantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Worst-case time complexity is O(n²)</li>
                <li>Not stable - equal elements may change relative order</li>
                <li>Performance depends heavily on pivot selection</li>
                <li>Can be outperformed by insertion sort for small arrays</li>
                <li>Vulnerable to pathological inputs that trigger worst-case behavior</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Optimizations</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Median-of-three pivot selection</strong>: Choose the median of the first, middle, and last elements as pivot</li>
            <li><strong>Random pivot selection</strong>: Randomly choose the pivot to avoid worst-case behavior</li>
            <li><strong>Insertion sort for small subarrays</strong>: Switch to insertion sort when subarrays become small</li>
            <li><strong>Three-way partitioning</strong>: Handle equal elements more efficiently</li>
            <li><strong>Tail recursion elimination</strong>: Optimize the recursive calls to reduce stack space</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}