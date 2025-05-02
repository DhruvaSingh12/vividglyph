"use client"

import { Card, CardContent } from "@/components/ui/card"

export function Explainer() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">How Merge Sort Works</h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Walkthrough</h3>

          <p>
            Merge sort is a classic divide-and-conquer algorithm that works by breaking down an array into smaller
            subarrays, sorting each subarray, and then merging them back together. The key insight is that combining
            two sorted arrays is relatively simple and can be done efficiently.
          </p>
          <h3 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Process</h3>
          
          <div className="pl-4 mb-8">
            <ol className="space-y-6 list-decimal">
              <li>
                <strong className="text-primary">Divide:</strong>
                <p>
                  Split the unsorted array into two halves by finding the middle point. Continue splitting recursively until subarrays of size 1 are reached.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">38</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">27</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">43</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded mr-1">82</span>
                    <span className="inline-block px-2 py-1 bg-blue-500/20 rounded">10</span>
                    <div className="mt-1 text-sm">Original array</div>
                  </div>
                  <div className="flex justify-center gap-1">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">38</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">27</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">43</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded">3</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">9</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded mr-1">82</span>
                      <span className="inline-block px-2 py-1 bg-blue-500/40 rounded">10</span>
                    </div>
                    <div className="mt-1 text-sm">First division</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Continue Dividing:</strong>
                <p>
                  Keep dividing each subarray until you have subarrays of size 1 (which are inherently sorted).
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="flex flex-wrap justify-center gap-4 mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded mr-1">38</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded">27</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded mr-1">43</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded">3</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded mr-1">9</span>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded">82</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-500/40 rounded">10</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 mt-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">38</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">27</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">43</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">3</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">9</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">82</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-purple-500/40 rounded">10</span>
                    </div>
                    <div className="mt-1 text-sm">Individual elements (sorted by definition)</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Merge:</strong>
                <p>
                  Start merging pairs of subarrays back together, ensuring they stay sorted. First, merge the individual elements into sorted pairs.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="flex flex-wrap justify-center gap-6 mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">27</span>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded">38</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">3</span>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded">43</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded mr-1">9</span>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded">82</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/50 rounded">10</span>
                    </div>
                    <div className="mt-1 text-sm">First merge: Sorted pairs</div>
                  </div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Continue Merging:</strong>
                <p>
                  Keep merging the sorted subarrays into larger sorted subarrays.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div className="flex flex-wrap justify-center gap-6 mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded mr-1">3</span>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded mr-1">27</span>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded mr-1">38</span>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded">43</span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded mr-1">9</span>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded mr-1">10</span>
                      <span className="inline-block px-2 py-1 bg-green-500/70 rounded">82</span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm">Second merge: Larger sorted subarrays</div>
                </div>
              </li>

              <li>
                <strong className="text-primary">Final Merge:</strong>
                <p>
                  Perform the final merge to get a completely sorted array.
                </p>
                <div className="bg-muted/30 p-3 rounded-md mt-2 text-center">
                  <div>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">3</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">9</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">10</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">27</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">38</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded mr-1">43</span>
                    <span className="inline-block px-2 py-1 bg-green-500 text-white rounded">82</span>
                  </div>
                  <div className="mt-1 text-sm">Final sorted array</div>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">The Merge Process</h3>
          <p className="mb-4">
            The key to merge sort is the merge operation. Let's look at how two sorted subarrays are merged:
          </p>
          
          <div className="bg-muted/30 p-4 rounded-md mt-4 mb-6">
            <h4 className="font-medium mb-2">Example: Merging [3, 27, 38, 43] and [9, 10, 82]</h4>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex gap-2">
                <div className="w-24 text-right">Left array:</div>
                <div>[3, 27, 38, 43]</div>
              </div>
              <div className="flex gap-2">
                <div className="w-24 text-right">Right array:</div>
                <div>[9, 10, 82]</div>
              </div>
              <div className="flex gap-2">
                <div className="w-24 text-right">Result:</div>
                <div>[]</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm mb-1">Step 1: Compare first elements 3 vs 9</div>
                <div className="flex gap-2">
                  <div><span className="inline-block px-2 py-1 bg-blue-500/50 rounded">3</span>, 27, 38, 43</div>
                  <div><span className="inline-block px-2 py-1 bg-red-500/50 rounded">9</span>, 10, 82</div>
                  <div>→</div>
                  <div>Result: [<span className="font-medium">3</span>]</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Step 2: Compare next elements 27 vs 9</div>
                <div className="flex gap-2">
                  <div>3, <span className="inline-block px-2 py-1 bg-blue-500/50 rounded">27</span>, 38, 43</div>
                  <div><span className="inline-block px-2 py-1 bg-red-500/50 rounded">9</span>, 10, 82</div>
                  <div>→</div>
                  <div>Result: [3, <span className="font-medium">9</span>]</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Step 3: Compare next elements 27 vs 10</div>
                <div className="flex gap-2">
                  <div>3, <span className="inline-block px-2 py-1 bg-blue-500/50 rounded">27</span>, 38, 43</div>
                  <div>9, <span className="inline-block px-2 py-1 bg-red-500/50 rounded">10</span>, 82</div>
                  <div>→</div>
                  <div>Result: [3, 9, <span className="font-medium">10</span>]</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Step 4: Compare next elements 27 vs 82</div>
                <div className="flex gap-2">
                  <div>3, <span className="inline-block px-2 py-1 bg-blue-500/50 rounded">27</span>, 38, 43</div>
                  <div>9, 10, <span className="inline-block px-2 py-1 bg-red-500/50 rounded">82</span></div>
                  <div>→</div>
                  <div>Result: [3, 9, 10, <span className="font-medium">27</span>]</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Step 5: Add remaining elements from left array</div>
                <div className="flex gap-2">
                  <div>3, 27, <span className="inline-block px-2 py-1 bg-blue-500/50 rounded">38</span>, <span className="inline-block px-2 py-1 bg-blue-500/50 rounded">43</span></div>
                  <div>9, 10, 82 (all used)</div>
                  <div>→</div>
                  <div>Result: [3, 9, 10, 27, <span className="font-medium">38, 43</span>]</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Step 6: Add remaining elements from right array</div>
                <div className="flex gap-2">
                  <div>3, 27, 38, 43 (all used)</div>
                  <div>9, 10, <span className="inline-block px-2 py-1 bg-red-500/50 rounded">82</span></div>
                  <div>→</div>
                  <div>Result: [3, 9, 10, 27, 38, 43, <span className="font-medium">82</span>]</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 font-medium">Final merged array: [3, 9, 10, 27, 38, 43, 82]</div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Algorithm Analysis</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Time Complexity</h4>
              <ul className="space-y-2">
                <li><strong>Best Case:</strong> O(n log n) - The array is already sorted (still needs to go through all the steps)</li>
                <li><strong>Average Case:</strong> O(n log n) - Typical case for random data</li>
                <li><strong>Worst Case:</strong> O(n log n) - The array is sorted in reverse order</li>
              </ul>
              <p className="mt-3 text-sm">
                The algorithm performs log n levels of splitting and at each level, we do O(n) work for merging.
              </p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <h4 className="text-lg font-medium border-b pb-2 mb-3">Space Complexity</h4>
              <ul className="space-y-2">
                <li><strong>O(n)</strong> - Requires temporary arrays to merge</li>
                <li>Additional O(log n) space for the recursion stack</li>
                <li>For linked lists, can be implemented with O(1) extra space</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Advantages and Disadvantages</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium mb-2 text-green-500">Advantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Guaranteed O(n log n) time complexity in all cases</li>
                <li>Stable sorting algorithm, maintains order of equal elements</li>
                <li>Well-suited for external sorting of large data sets</li>
                <li>Parallelizable - different parts can be sorted concurrently</li>
                <li>Good for linked lists - requires no random access to elements</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2 text-red-500">Disadvantages</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Requires additional O(n) space for the merging operation</li>
                <li>Slower than quick sort for small datasets</li>
                <li>Not an in-place sorting algorithm</li>
                <li>Cache performance not as good as quick sort</li>
                <li>Overhead for recursive function calls</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}