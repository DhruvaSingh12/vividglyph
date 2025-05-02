import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Mathematical Foundations for Algorithms</h2>
          <p className="text-lg mb-6">
            Mathematical tools provide the foundation for analyzing, designing, and proving the correctness of algorithms.
            These concepts are essential for understanding algorithm complexity, efficiency, and correctness.
            This section explores key mathematical techniques used in algorithm analysis and design.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-4">Key Mathematical Areas in Algorithm Analysis</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">Several areas of mathematics are particularly important for algorithm design:</p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Mathematical Induction:</strong> Used to prove that algorithms work correctly 
                for all input sizes by establishing a base case and an inductive step.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Recurrence Relations:</strong> Mathematical equations that define a sequence 
                recursively, used extensively in analyzing recursive algorithms.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Combinatorics:</strong> The study of counting, arrangement, and combination 
                of objects, essential for analyzing algorithmic possibilities and constraints.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Probability Theory:</strong> Important for analyzing randomized algorithms 
                and understanding expected performance.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Why Mathematical Tools Matter</h3>
          <div className="pl-4 mb-8">
            <p className="mb-4">
              Mathematical tools are essential for algorithm analysis and design for several reasons:
            </p>
            <ul className="space-y-3">
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Precise Analysis:</strong> Mathematics provides precise tools for 
                analyzing algorithm efficiency and resource usage.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Correctness Proofs:</strong> Mathematical techniques allow us to 
                prove that algorithms correctly solve the intended problems.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Performance Prediction:</strong> Mathematical models help predict 
                how algorithms will perform with different input sizes.
              </li>
              <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                <strong className="font-bold text-primary">Algorithm Design:</strong> Understanding mathematical patterns 
                often leads to more efficient algorithm designs.
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-10 mb-4">Building Mathematical Intuition</h3>
          <div className="pl-4 mb-6">
            <p className="mb-4">
              Developing mathematical intuition is crucial for algorithm designers. This intuition helps in:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Pattern Recognition</h4>
                <p>Identifying patterns in problems that can be solved using specific algorithmic approaches.</p>
              </div>
              
              <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                <h4 className="text-lg font-medium mb-2 text-primary">Complexity Estimation</h4>
                <p>Quickly estimating the computational complexity of different algorithmic approaches.</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
              <p className="italic">
                The ability to effectively apply mathematical tools to algorithm analysis separates novice 
                programmers from expert algorithm designers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}