import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Steps() {
    return (
        <Card className="w-full">
            <CardContent className="pt-3">
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Step-by-Step Substitution Method</h2>
                    <h2 className='text-lg font-normal mb-4'>The substitution method solves recurrences by guessing a bound,
                        then using induction to verify and adjust constants step by step until
                        the proposed solution holds for all input sizes.</h2>
                    <h3 className="text-xl font-semibold mt-10 mb-4">The Substitution Method Process</h3>

                    <div className="pl-4 mb-8">
                        <p className="mb-4">
                            The substitution method follows a systematic approach to solving recurrence relations:
                        </p>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 1: Make an Educated Guess</h4>
                            <p>Based on your understanding of the algorithm, make a reasonable guess about the asymptotic bound of the solution.</p>
                            <p className="mt-2 italic">For example, if you're analyzing a divide-and-conquer algorithm that seems similar to merge sort, you might guess O(n log n).</p>
                        </div>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 2: State Your Guess Formally</h4>
                            <p>Express your guess mathematically. For an upper bound, you would write:</p>
                            <p className="font-mono text-center my-2">T(n) ≤ c·f(n) for some constant c &gt; 0</p>
                            <p>Where f(n) is your guessed function (e.g., n log n, n², etc.).</p>
                        </div>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 3: Assume the Inductive Hypothesis</h4>
                            <p>Assume that your guess holds for all positive values less than n. For example:</p>
                            <p className="font-mono text-center my-2">T(k) ≤ c·f(k) for all k &lt; n</p>
                        </div>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 4: Prove the Inductive Step</h4>
                            <p>Substitute the inductive hypothesis into the recurrence relation to show that the bound holds for n as well.</p>
                            <ol className="list-decimal list-inside mt-2">
                                <li>Start with the original recurrence relation</li>
                                <li>Replace any recursive terms using your inductive hypothesis</li>
                                <li>Manipulate the resulting expression to show it satisfies your claimed bound</li>
                            </ol>
                        </div>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 5: Verify the Base Case(s)</h4>
                            <p>Check that your solution holds for the smallest valid input size(s).</p>
                            <p className="mt-2">For example, if T(1) = d, verify that d ≤ c·f(1) for your chosen constant c.</p>
                        </div>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Step 6: Choose Appropriate Constants</h4>
                            <p>Select values for any constants in your solution that make both the inductive step and base cases work.</p>
                            <p className="mt-2">Often, you'll need to choose c large enough to satisfy both requirements.</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">Strengthening the Induction Hypothesis</h3>
                    <div className="pl-4 mb-8">
                        <p className="mb-4">
                            Sometimes, a direct substitution doesn't work because the induction falls short at the end. In such cases, you may need to strengthen your hypothesis.
                        </p>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Common Strengthening Techniques:</h4>
                            <ul className="list-disc list-inside">
                                <li>Add a lower-order term: T(n) ≤ c₁·f(n) - c₂·g(n) where g(n) grows slower than f(n)</li>
                                <li>Subtract a constant: T(n) ≤ c·f(n) - d for some constants c, d &gt; 0</li>
                                <li>Use a tighter bound for smaller inputs: Define specific bounds for different ranges of input sizes</li>
                            </ul>
                        </div>

                        <p className="mt-4">
                            The key insight is to make your inductive hypothesis strong enough to push through the inductive step, while still being provable.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">Handling Different Types of Recurrences</h3>
                    <div className="pl-4 mb-8">
                        <p className="mb-4">
                            Different patterns of recurrences may require specific approaches:
                        </p>

                        <div className="grid grid-cols-1 gap-6 mb-6">
                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Divide-and-Conquer Recurrences</h4>
                                <p className="mb-2">For recurrences like T(n) = aT(n/b) + f(n):</p>
                                <ul className="list-disc list-inside">
                                    <li>If Master Theorem doesn't apply, use a recursion tree to guide your guess</li>
                                    <li>Consider cases where a &lt; b^d, a = b^d, and a &gt; b^d where d is the exponent of n in f(n)</li>
                                </ul>
                            </div>

                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Recurrences with Subtraction</h4>
                                <p className="mb-2">For recurrences like T(n) = T(n-1) + f(n):</p>
                                <ul className="list-disc list-inside">
                                    <li>Try guessing solutions related to sums, like O(n²) for T(n) = T(n-1) + n</li>
                                    <li>Consider using summation formulas to simplify the analysis</li>
                                </ul>
                            </div>

                            <div className="border border-muted-foreground/20 rounded-lg p-4 bg-muted/30">
                                <h4 className="text-lg font-medium mb-2 text-primary">Recurrences with Unequal Subproblems</h4>
                                <p className="mb-2">For recurrences like T(n) = T(n/3) + T(2n/3) + n:</p>
                                <ul className="list-disc list-inside">
                                    <li>The substitution method is particularly valuable here</li>
                                    <li>Make sure your guess is strong enough to handle the "worst" subproblem</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-10 mb-4">Proving Lower Bounds</h3>
                    <div className="pl-4 mb-6">
                        <p className="mb-4">
                            The substitution method can also be used to prove lower bounds by reversing the inequality:
                        </p>

                        <div className="bg-muted p-4 rounded-md my-6">
                            <h4 className="font-semibold mb-2">Steps for Lower Bound Proofs:</h4>
                            <ol className="list-decimal list-inside">
                                <li>Guess a lower bound: T(n) ≥ c·f(n) for some constant c &gt; 0</li>
                                <li>Assume the inductive hypothesis: T(k) ≥ c·f(k) for all k &lt; n</li>
                                <li>Substitute into the recurrence and show T(n) ≥ c·f(n)</li>
                                <li>Verify the base case(s)</li>
                                <li>Choose appropriate constants</li>
                            </ol>
                        </div>

                        <div className="mt-6 p-4 border-l-4 border-primary bg-muted/40 rounded-r-lg">
                            <p className="italic">
                                Proving both upper and lower bounds of the same growth rate (e.g., both Ω(n log n) and O(n log n)) establishes a tight bound Θ(n log n).
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}