import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function ClosestPair() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Closest Pair of Points Algorithm</h2>
          <p>
            The closest pair of points problem asks for the pair of points with the smallest Euclidean distance between them from a set of points in a plane. While a brute force approach would take O(n²) time by comparing all pairs, a divide-and-conquer approach can solve this problem in O(n log n) time.
          </p>

          <h3>Algorithm Overview</h3>
          <p>
            The divide-and-conquer algorithm for finding the closest pair of points works as follows:
          </p>
          <ol>
            <li>
              <strong>Preprocessing:</strong> Sort all points by their x-coordinates.
            </li>
            <li>
              <strong>Divide:</strong> Divide the sorted points into two halves by a vertical line.
            </li>
            <li>
              <strong>Conquer:</strong> Recursively find the closest pairs in the left and right halves.
            </li>
            <li>
              <strong>Combine:</strong> Find the closest pair that has one point in the left half and one in the right half, and compare with the closest pairs found in the recursive steps.
            </li>
          </ol>

          <h3>The Key Insight: The Strip</h3>
          <p>
            The most ingenious part of the algorithm is how it handles the combine step. After finding the closest pairs in the left and right halves (with distance δ), we only need to consider points that are within distance δ of the dividing line as potential candidates for a closer pair that crosses the dividing line.
          </p>
          <p>
            Furthermore, for each point in this "strip," we only need to check at most 7 points ahead of it (when sorted by y-coordinate) for potential closer pairs. This is because in a vertical strip of width 2δ, there can be at most a constant number of points within distance δ of any given point (due to the pigeonhole principle).
          </p>

          <div className="bg-muted p-4 rounded-md my-4">
            <h4>Detailed Algorithm Steps</h4>
            <ol>
              <li>
                <strong>Sort points by x-coordinate:</strong> P_x = sort(P) by x-coordinate
              </li>
              <li>
                <strong>Sort points by y-coordinate:</strong> P_y = sort(P) by y-coordinate
              </li>
              <li>
                <strong>Base case:</strong> If |P| ≤ 3, solve by brute force
              </li>
              <li>
                <strong>Divide:</strong> Split P_x into equal halves L_x and R_x by a vertical line x = x_mid
              </li>
              <li>
                <strong>Conquer:</strong>
                <ul>
                  <li>Recursively find closest pair in L_x with distance δ_L</li>
                  <li>Recursively find closest pair in R_x with distance δ_R</li>
                </ul>
              </li>
              <li>
                <strong>Combine:</strong>
                <ul>
                  <li>Let δ = min(δ_L, δ_R)</li>
                  <li>Create a strip S of points within distance δ of the dividing line</li>
                  <li>Sort S by y-coordinate (or use the pre-sorted P_y to extract these points)</li>
                  <li>For each point p in S, check at most 7 points ahead for a closer pair</li>
                  <li>Return the minimum of δ and the closest pair found in the strip</li>
                </ul>
              </li>
            </ol>
          </div>

          <h3>Time Complexity Analysis</h3>
          <p>
            The time complexity of the closest pair algorithm is O(n log n), which can be analyzed as follows:
          </p>
          <ul>
            <li>
              <strong>Preprocessing:</strong> Sorting points by x and y coordinates takes O(n log n) time.
            </li>
            <li>
              <strong>Divide and Conquer:</strong> The recurrence relation is T(n) = 2T(n/2) + O(n), which resolves to O(n log n) by the Master Theorem.
            </li>
            <li>
              <strong>Strip Processing:</strong> The strip processing step takes O(n) time because each point is compared with at most 7 other points.
            </li>
          </ul>

          <h3>Proof of Correctness</h3>
          <p>
            The key insight to prove the algorithm's correctness is showing that we only need to check a constant number of points in the strip. This is proven using a geometric argument: in a 2δ × δ rectangle, there can be at most a constant number of points with pairwise distance at least δ (otherwise, some pair would be closer than δ).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}