import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Overview() {
    return (
        <Card className="w-full">
            <CardContent className="pt-3">
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Introduction to the Substitution Method</h2>
                    <p className="text-lg mb-6">
                        The substitution method is a mathematical technique used to solve recurrence relations in algorithm analysis.
                        It involves guessing a solution and then using mathematical induction to prove that the guess is correct.
                        This method is particularly useful when other techniques such as the Master Theorem cannot be applied.
                    </p>

                    <h3 className="text-xl font-semibold mt-10 mb-4">Why Use the Substitution Method?</h3>
                    <div className="pl-4 mb-8">
                        <p className="mb-4">The substitution method offers several advantages in algorithm analysis:</p>
                        <ul className="space-y-3">
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Flexibility:</strong> It can handle a wide variety of recurrence relations,
                                including those that don't fit the standard forms required by the Master Theorem.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Insight:</strong> The process of solving recurrences using substitution provides
                                deeper understanding of the algorithm's behavior.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Verification:</strong> It can be used to verify solutions obtained through other
                                methods, such as recursion trees or the Master Theorem.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">General Applicability:</strong> It works for both upper and lower bound proofs,
                                making it versatile for comprehensive algorithm analysis.
                            </li>
                        </ul>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">The Basic Approach</h3>
                    <div className="pl-4 mb-8">
                        <p className="mb-4">
                            The substitution method follows these general steps:
                        </p>
                        <ul className="space-y-3">
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Step 1: Make an educated guess</strong> about the solution to the recurrence relation.
                                This requires intuition about the likely growth rate of the function.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Step 2: Assume the inductive hypothesis</strong> that your guess holds for all positive
                                values less than n.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Step 3: Substitute</strong> the guess into the recurrence relation to prove it works for n.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Step 4: Verify the base case(s)</strong> to complete the proof by induction.
                            </li>
                        </ul>
                        <p className="mt-4">
                            If the substitution works out, then your guess is correct. If not, you need to revise your guess and try again.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">When to Use the Substitution Method</h3>
                    <div className="pl-4 mb-6">
                        <p className="mb-4">
                            The substitution method is particularly useful in the following scenarios:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Complex Recurrences</h4>
                                <p>Recurrences that don't match the standard forms required by the Master Theorem.</p>
                            </div>

                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Unequal Subproblems</h4>
                                <p>When subproblems have different sizes, such as T(n) = T(n/3) + T(2n/3) + O(n).</p>
                            </div>

                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Tight Bounds</h4>
                                <p>When you need to establish tight upper and lower bounds on the solution.</p>
                            </div>

                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Verification</h4>
                                <p>To verify the correctness of solutions obtained through other methods.</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
                            <p className="italic">
                                While the substitution method is powerful, it requires a good initial guess. Techniques like drawing
                                recursion trees can help inform this initial guess by giving insight into the structure of the recurrence.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">Common Challenges</h3>
                    <div className="pl-4 mb-6">
                        <p className="mb-4">Using the substitution method may present some challenges:</p>

                        <ul className="space-y-3">
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Finding the Right Guess:</strong> Making an accurate initial guess can be difficult and may require several attempts.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Strengthening the Induction Hypothesis:</strong> Sometimes you need to strengthen your hypothesis to make the induction work.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Handling Floors and Ceilings:</strong> Recurrences with floor or ceiling functions can complicate the algebra.
                            </li>
                            <li className="pl-2 border-l-4 border-primary p-2 bg-muted/50">
                                <strong className="font-bold text-primary">Complex Algebraic Manipulations:</strong> Some substitutions require sophisticated algebraic manipulations.
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}