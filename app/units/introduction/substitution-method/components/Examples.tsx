import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Reusable preformatted block to preserve whitespace and wrap long lines
function Preformatted({ children }: { children: React.ReactNode }) {
    return (
        <pre className="bg-muted/70 p-3 rounded whitespace-pre-wrap overflow-x-auto">
            {children}
        </pre>
    );
}

export function Examples() {
    return (
        <Card className="w-full">
            <CardContent className="pt-3">
                <div className="prose dark:prose-invert max-w-none">

                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Substitution Method Examples</h2>
                    <h2 className='text-lg font-normal mb-4'>The substitution method solves recurrences by guessing a bound,
                        then using induction to verify and adjust constants step by step until
                        the proposed solution holds for all input sizes.</h2>

                    <Section title="Example 1: Merge Sort Recurrence">
                        <p>Let's analyze the recurrence relation for Merge Sort:</p>
                        <Box>
                            <Heading level={4}>Recurrence Relation:</Heading>
                            <p className="font-mono text-center mb-4">T(n) = 2T(n/2) + cn</p>
                            <p>where c is a constant and T(1) = d (another constant)</p>

                            <Step title="Step 1: Make a Guess">
                                <p>Let's guess that T(n) = O(n log n), or more precisely:</p>
                                <p className="font-mono text-center">T(n) &le; a n log n for some constant a &gt; 0</p>
                            </Step>

                            <Step title="Step 2: Inductive Hypothesis">
                                <p>Assume that T(k) &le; a k log k for all k &lt; n</p>
                            </Step>

                            <Step title="Step 3: Inductive Step">
                                <p>Substitute into the recurrence:</p>
                                <Preformatted>{`T(n) = 2T(n/2) + cn
        ≤ 2(a(n/2) log(n/2)) + cn       [By inductive hypothesis]
        = a n log(n/2) + cn
        = a n (log n - log 2) + cn
        = a n log n - a n + cn`}</Preformatted>
                                <p>For this to be ≤ a n log n, we require:</p>
                                <Preformatted>{`a n log n - a n + cn ≤ a n log n
-an + cn ≤ 0
c n ≤ a n
c ≤ a`}</Preformatted>
                            </Step>

                            <Step title="Step 4: Base Case">
                                <p>
                                    We need T(1) ≤ a·1·log 1 = 0, but T(1) = d, which is not ≤ 0. This suggests our guess
                                    is insufficient.
                                </p>
                            </Step>

                            <Step title="Step 5: Strengthen the Hypothesis">
                                <p>Let's modify our guess to: T(n) ≤ a n log n + b for constants a, b &gt; 0</p>
                                <Preformatted>{`T(n) = 2T(n/2) + cn
        ≤ 2(a(n/2) log(n/2) + b) + cn
        = a n log(n/2) + 2b + cn
        = a n (log n - log 2) + 2b + cn
        = a n log n - a n + 2b + cn`}</Preformatted>
                                <p>For this to be ≤ a n log n + b, we need:</p>
                                <Preformatted>{`a n log n - a n + 2b + cn ≤ a n log n + b
-an + 2b + cn ≤ b
-an + b + cn ≤ 0
b ≤ a n - c n = (a - c) n`}</Preformatted>
                            </Step>

                            <Step title="Step 6: Choose Constants">
                                <p>
                                    Choose a = 2c (so c ≤ a) and let b = max(d, c) to satisfy the base case and inductive
                                    steps. Hence, T(n) = O(n log n).
                                </p>
                            </Step>
                        </Box>
                    </Section>

                    {/* Additional examples omitted for brevity; apply the same Preformatted component */}

                </div>
            </CardContent>
        </Card>
    );
}

// Helper components for consistency
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <>
            <h3 className="text-xl font-semibold mt-10 mb-4">{title}</h3>
            <div className="pl-4 mb-8">{children}</div>
        </>
    );
}

function Box({ children }: { children: React.ReactNode }) {
    return <div className="bg-muted p-4 rounded-md my-6">{children}</div>;
}

function Heading({ level, children }: { level: 4; children: React.ReactNode }) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    return <Tag className="font-semibold mb-2">{children}</Tag>;
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-4 border-t pt-4">
            <h5 className="font-semibold mb-2">{title}</h5>
            {children}
        </div>
    );
}
