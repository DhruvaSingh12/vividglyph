import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function ConvexHull() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Convex Hull Algorithm</h2>
          <p>
            The convex hull of a set of points is the smallest convex polygon that contains all the points. In simpler terms, it's like stretching a rubber band around all the points and letting it snap into place. Finding the convex hull is a fundamental problem in computational geometry with applications in pattern recognition, image processing, and geographic information systems.
          </p>

          <h3>Divide-and-Conquer Approach</h3>
          <p>
            While there are several algorithms to find the convex hull (such as Graham's scan and Jarvis march), a divide-and-conquer approach can solve this problem efficiently:
          </p>
          <ol>
            <li>
              <strong>Preprocessing:</strong> Sort all points by their x-coordinates.
            </li>
            <li>
              <strong>Divide:</strong> Split the sorted points into left and right halves.
            </li>
            <li>
              <strong>Conquer:</strong> Recursively find the convex hulls of the left and right halves.
            </li>
            <li>
              <strong>Combine:</strong> Merge the two convex hulls by finding the upper and lower tangent lines between them.
            </li>
          </ol>

          <h3>The Merge Step: Finding Tangent Lines</h3>
          <p>
            The key to the divide-and-conquer algorithm for convex hull is efficiently finding the tangent lines between two convex hulls during the merge step:
          </p>
          <ul>
            <li>
              <strong>Upper Tangent:</strong> The line connecting a point on the left hull and a point on the right hull such that all other points of both hulls are below the line.
            </li>
            <li>
              <strong>Lower Tangent:</strong> The line connecting a point on the left hull and a point on the right hull such that all other points of both hulls are above the line.
            </li>
          </ul>

          <div className="bg-muted p-4 rounded-md my-4">
            <h4>Detailed Algorithm Steps</h4>
            <ol>
              <li>
                <strong>Sort points:</strong> Sort all points by x-coordinate.
              </li>
              <li>
                <strong>Base case:</strong> If there are fewer than 4 points, compute the convex hull directly.
              </li>
              <li>
                <strong>Divide:</strong> Split the points into left half P_L and right half P_R.
              </li>
              <li>
                <strong>Conquer:</strong>
                <ul>
                  <li>Recursively compute the convex hull CH_L of P_L</li>
                  <li>Recursively compute the convex hull CH_R of P_R</li>
                </ul>
              </li>
              <li>
                <strong>Combine:</strong>
                <ul>
                  <li>Find the upper tangent between CH_L and CH_R</li>
                  <li>Find the lower tangent between CH_L and CH_R</li>
                  <li>Merge the two hulls by retaining points from each hull that lie between the tangent points</li>
                </ul>
              </li>
            </ol>
          </div>

          <h3>Time Complexity Analysis</h3>
          <p>
            The time complexity of the divide-and-conquer convex hull algorithm is O(n log n):
          </p>
          <ul>
            <li>
              <strong>Preprocessing:</strong> Sorting points takes O(n log n) time.
            </li>
            <li>
              <strong>Divide and Conquer:</strong> The recurrence relation is T(n) = 2T(n/2) + O(n), which resolves to O(n log n) by the Master Theorem.
            </li>
            <li>
              <strong>Finding Tangents:</strong> The tangent-finding procedure can be implemented in O(n) time.
            </li>
          </ul>

          <h3>Applications of Convex Hull</h3>
          <p>
            The convex hull algorithm has numerous practical applications:
          </p>
          <ul>
            <li>
              <strong>Collision Detection:</strong> In computer graphics and physics simulations, convex hulls are used to approximate objects for efficient collision detection.
            </li>
            <li>
              <strong>Image Processing:</strong> Convex hulls help in shape analysis and feature detection.
            </li>
            <li>
              <strong>Geographic Information Systems:</strong> Convex hulls can define boundaries around geographic features.
            </li>
            <li>
              <strong>Pattern Recognition:</strong> Convex hulls help extract shape descriptors for classification tasks.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}