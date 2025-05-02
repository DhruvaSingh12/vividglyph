"use client"
import { IntegratedAlgorithmView } from "@/components/integrated-algorithm-view"
import { AlgorithmExplainer } from "@/components/algorithm-explainer"
import { MiniFAQ } from "@/components/mini-faq"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicCodeBlock } from "@/components/dynamic-code-block"
import { Card, CardContent } from "@/components/ui/card"

export default function StrassenMatrixPage() {
  // Default input matrices
  const defaultMatrixA = "1, 2, 3, 4\n5, 6, 7, 8\n9, 10, 11, 12\n13, 14, 15, 16"
  const defaultMatrixB = "17, 18, 19, 20\n21, 22, 23, 24\n25, 26, 27, 28\n29, 30, 31, 32"
  const defaultInput = `${defaultMatrixA}\n\n${defaultMatrixB}`

  // Parse input for the algorithm runner
  function parseInput(input: string) {
    try {
      const parts = input.trim().split("\n\n")
      if (parts.length !== 2) {
        throw new Error("Input should contain two matrices separated by a blank line")
      }

      const matrixA = parseMatrix(parts[0])
      const matrixB = parseMatrix(parts[1])

      // Check if matrices can be multiplied
      if (matrixA[0].length !== matrixB.length) {
        throw new Error(
          `Cannot multiply matrices: dimensions don't match. Matrix A has ${matrixA[0].length} columns but Matrix B has ${matrixB.length} rows.`,
        )
      }

      return { matrixA, matrixB }
    } catch (error) {
      throw error
    }
  }

  // Helper function to parse a matrix from string
  function parseMatrix(matrixStr: string) {
    const rows = matrixStr.trim().split("\n")
    const matrix = rows.map((row) => {
      const elements = row.split(",").map((item) => {
        const num = Number(item.trim())
        if (isNaN(num)) {
          throw new Error("Matrix elements must be numbers")
        }
        return num
      })
      return elements
    })

    // Check if all rows have the same length
    const rowLength = matrix[0].length
    for (let i = 1; i < matrix.length; i++) {
      if (matrix[i].length !== rowLength) {
        throw new Error("All rows in a matrix must have the same length")
      }
    }

    return matrix
  }

  // Function to render the current step in the visualizer
  function renderMatrixStep(data: any, step: number, highlight: any) {
    // For matrix multiplication, we'll show the matrices and the current operation
    return (
      <div className="w-full">
        <div className="flex justify-center mb-4 text-sm">{highlight?.message || "Matrix multiplication steps..."}</div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Matrix A */}
          {highlight?.matrices?.A && (
            <div className="matrix-container">
              <h3 className="text-center mb-2">Matrix A</h3>
              <div className="bg-muted p-4 rounded-md">
                {highlight.matrices.A.map((row: number[], i: number) => (
                  <div key={i} className="flex gap-2 justify-center">
                    {row.map((value, j) => (
                      <div
                        key={j}
                        className={`w-12 h-12 flex items-center justify-center border ${
                          highlight.type === "standard-step" &&
                          highlight.position?.i === i &&
                          highlight.position?.k === j
                            ? "bg-yellow-500 text-black"
                            : "bg-muted"
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matrix B */}
          {highlight?.matrices?.B && (
            <div className="matrix-container">
              <h3 className="text-center mb-2">Matrix B</h3>
              <div className="bg-muted p-4 rounded-md">
                {highlight.matrices.B.map((row: number[], i: number) => (
                  <div key={i} className="flex gap-2 justify-center">
                    {row.map((value, j) => (
                      <div
                        key={j}
                        className={`w-12 h-12 flex items-center justify-center border ${
                          highlight.type === "standard-step" &&
                          highlight.position?.k === i &&
                          highlight.position?.j === j
                            ? "bg-blue-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Matrix */}
          {highlight?.result && (
            <div className="matrix-container">
              <h3 className="text-center mb-2">Result Matrix</h3>
              <div className="bg-muted p-4 rounded-md">
                {highlight.result.map((row: number[], i: number) => (
                  <div key={i} className="flex gap-2 justify-center">
                    {row.map((value, j) => (
                      <div
                        key={j}
                        className={`w-12 h-12 flex items-center justify-center border ${
                          highlight.type === "standard-step" &&
                          highlight.position?.i === i &&
                          highlight.position?.j === j
                            ? "bg-green-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Current operation explanation */}
        {highlight?.type === "standard-step" && (
          <div className="mt-6 text-center">
            <p>
              Computing C[{highlight.position?.i}][{highlight.position?.j}] = {highlight.current}
            </p>
          </div>
        )}

        {/* Strassen's algorithm specific visualizations */}
        {highlight?.type?.startsWith("strassen") && highlight?.type !== "strassen-result" && (
          <div className="mt-6 text-center">
            <p className="font-medium">Strassen's Algorithm Step: {highlight.type.replace("strassen-", "")}</p>
            {highlight.type === "strassen-products" && <p>Computing the seven Strassen products P1 through P7</p>}
          </div>
        )}
      </div>
    )
  }

  // Run the Strassen's matrix multiplication algorithm
  function runStrassenMatrix({ matrixA, matrixB }: { matrixA: number[][]; matrixB: number[][] }) {
    const steps: any[] = []

    // For simplicity, we'll use the standard matrix multiplication for non-square matrices
    // or matrices with dimensions that are not powers of 2
    let result

    if (
      isPowerOfTwo(matrixA.length) &&
      isPowerOfTwo(matrixA[0].length) &&
      isPowerOfTwo(matrixB.length) &&
      isPowerOfTwo(matrixB[0].length) &&
      matrixA.length === matrixA[0].length &&
      matrixB.length === matrixB[0].length &&
      matrixA.length === matrixB.length
    ) {
      // Use Strassen's algorithm for square matrices with dimensions that are powers of 2
      steps.push({
        type: "strassen-start",
        message: `Starting Strassen's algorithm for ${matrixA.length}x${matrixA.length} matrices`,
        matrices: { A: matrixA, B: matrixB },
      })

      result = strassenMultiply(matrixA, matrixB, steps)

      steps.push({
        type: "strassen-result",
        message: "Matrix multiplication complete using Strassen's algorithm",
        matrices: { A: matrixA, B: matrixB },
        result: result,
      })
    } else {
      // Use standard matrix multiplication for other cases
      steps.push({
        type: "standard",
        message: "Using standard matrix multiplication algorithm",
        matrices: { A: matrixA, B: matrixB },
      })

      result = standardMatrixMultiply(matrixA, matrixB, steps)

      steps.push({
        type: "standard-result",
        message: "Matrix multiplication complete",
        matrices: { A: matrixA, B: matrixB },
        result: result,
      })
    }

    return {
      result: {
        matrixA,
        matrixB,
        resultMatrix: result,
      },
      steps,
    }
  }

  // Check if a number is a power of 2
  function isPowerOfTwo(n: number) {
    return n > 0 && (n & (n - 1)) === 0
  }

  // Standard matrix multiplication
  function standardMatrixMultiply(A: number[][], B: number[][], steps: any[]) {
    const n = A.length
    const m = B[0].length
    const p = B.length
    const C = Array(n)
      .fill(0)
      .map(() => Array(m).fill(0))

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < p; k++) {
          C[i][j] += A[i][k] * B[k][j]

          steps.push({
            type: "standard-step",
            message: `C[${i}][${j}] += A[${i}][${k}] * B[${k}][${j}] = ${A[i][k]} * ${B[k][j]} = ${A[i][k] * B[k][j]}`,
            position: { i, j, k },
            current: C[i][j],
            matrices: { A, B },
            result: JSON.parse(JSON.stringify(C)), // Deep copy
          })
        }
      }
    }

    return C
  }

  // Strassen's matrix multiplication
  function strassenMultiply(A: number[][], B: number[][], steps: any[]) {
    const n = A.length

    // Base case: 1x1 matrices
    if (n === 1) {
      steps.push({
        type: "strassen-base",
        message: "Base case: 1x1 matrices",
        result: [[A[0][0] * B[0][0]]],
      })

      return [[A[0][0] * B[0][0]]]
    }

    // Split matrices into quadrants
    const mid = n / 2

    const A11 = getSubmatrix(A, 0, 0, mid)
    const A12 = getSubmatrix(A, 0, mid, mid)
    const A21 = getSubmatrix(A, mid, 0, mid)
    const A22 = getSubmatrix(A, mid, mid, mid)

    const B11 = getSubmatrix(B, 0, 0, mid)
    const B12 = getSubmatrix(B, 0, mid, mid)
    const B21 = getSubmatrix(B, mid, 0, mid)
    const B22 = getSubmatrix(B, mid, mid, mid)

    steps.push({
      type: "strassen-split",
      message: "Split matrices into quadrants",
      quadrants: { A11, A12, A21, A22, B11, B12, B21, B22 },
    })

    // Compute the seven products (recursively)
    steps.push({
      type: "strassen-products",
      message: "Computing the seven Strassen products",
    })

    // P1 = A11 * (B12 - B22)
    const S1 = matrixSubtract(B12, B22)
    steps.push({
      type: "strassen-s1",
      message: "S1 = B12 - B22",
      result: S1,
    })

    const P1 = strassenMultiply(A11, S1, steps)
    steps.push({
      type: "strassen-p1",
      message: "P1 = A11 * S1",
      result: P1,
    })

    // P2 = (A11 + A12) * B22
    const S2 = matrixAdd(A11, A12)
    steps.push({
      type: "strassen-s2",
      message: "S2 = A11 + A12",
      result: S2,
    })

    const P2 = strassenMultiply(S2, B22, steps)
    steps.push({
      type: "strassen-p2",
      message: "P2 = S2 * B22",
      result: P2,
    })

    // P3 = (A21 + A22) * B11
    const S3 = matrixAdd(A21, A22)
    steps.push({
      type: "strassen-s3",
      message: "S3 = A21 + A22",
      result: S3,
    })

    const P3 = strassenMultiply(S3, B11, steps)
    steps.push({
      type: "strassen-p3",
      message: "P3 = S3 * B11",
      result: P3,
    })

    // P4 = A22 * (B21 - B11)
    const S4 = matrixSubtract(B21, B11)
    steps.push({
      type: "strassen-s4",
      message: "S4 = B21 - B11",
      result: S4,
    })

    const P4 = strassenMultiply(A22, S4, steps)
    steps.push({
      type: "strassen-p4",
      message: "P4 = A22 * S4",
      result: P4,
    })

    // P5 = (A11 + A22) * (B11 + B22)
    const S5 = matrixAdd(A11, A22)
    const S6 = matrixAdd(B11, B22)
    steps.push({
      type: "strassen-s5-s6",
      message: "S5 = A11 + A22, S6 = B11 + B22",
      result: { S5, S6 },
    })

    const P5 = strassenMultiply(S5, S6, steps)
    steps.push({
      type: "strassen-p5",
      message: "P5 = S5 * S6",
      result: P5,
    })

    // P6 = (A12 - A22) * (B21 + B22)
    const S7 = matrixSubtract(A12, A22)
    const S8 = matrixAdd(B21, B22)
    steps.push({
      type: "strassen-s7-s8",
      message: "S7 = A12 - A22, S8 = B21 + B22",
      result: { S7, S8 },
    })

    const P6 = strassenMultiply(S7, S8, steps)
    steps.push({
      type: "strassen-p6",
      message: "P6 = S7 * S8",
      result: P6,
    })

    // P7 = (A11 - A21) * (B11 + B12)
    const S9 = matrixSubtract(A11, A21)
    const S10 = matrixAdd(B11, B12)
    steps.push({
      type: "strassen-s9-s10",
      message: "S9 = A11 - A21, S10 = B11 + B12",
      result: { S9, S10 },
    })

    const P7 = strassenMultiply(S9, S10, steps)
    steps.push({
      type: "strassen-p7",
      message: "P7 = S9 * S10",
      result: P7,
    })

    // Compute the four quadrants of the result matrix
    // C11 = P5 + P4 - P2 + P6
    const C11 = matrixAdd(matrixSubtract(matrixAdd(P5, P4), P2), P6)
    steps.push({
      type: "strassen-c11",
      message: "C11 = P5 + P4 - P2 + P6",
      result: C11,
    })

    // C12 = P1 + P2
    const C12 = matrixAdd(P1, P2)
    steps.push({
      type: "strassen-c12",
      message: "C12 = P1 + P2",
      result: C12,
    })

    // C21 = P3 + P4
    const C21 = matrixAdd(P3, P4)
    steps.push({
      type: "strassen-c21",
      message: "C21 = P3 + P4",
      result: C21,
    })

    // C22 = P5 + P1 - P3 - P7
    const C22 = matrixSubtract(matrixSubtract(matrixAdd(P5, P1), P3), P7)
    steps.push({
      type: "strassen-c22",
      message: "C22 = P5 + P1 - P3 - P7",
      result: C22,
    })

    // Combine the four quadrants into the result matrix
    const C = combineMatrices(C11, C12, C21, C22)
    steps.push({
      type: "strassen-combine",
      message: "Combined quadrants into the final result matrix",
      result: C,
    })

    return C
  }

  // Helper function to get a submatrix
  function getSubmatrix(matrix: number[][], rowStart: number, colStart: number, size: number): number[][] {
    const submatrix: number[][] = Array(size).fill(0).map(() => Array(size).fill(0))
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        submatrix[i][j] = matrix[rowStart + i][colStart + j]
      }
    }
    return submatrix
  }

  // Helper function to add two matrices
  function matrixAdd(A: number[][], B: number[][]) {
    const n = A.length
    const C = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        C[i][j] = A[i][j] + B[i][j]
      }
    }
    return C
  }

  // Helper function to subtract two matrices
  function matrixSubtract(A: number[][], B: number[][]) {
    const n = A.length
    const C = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        C[i][j] = A[i][j] - B[i][j]
      }
    }
    return C
  }

  // Helper function to combine four matrices into one
  function combineMatrices(C11: number[][], C12: number[][], C21: number[][], C22: number[][]) {
    const n = C11.length
    const C = Array(2 * n)
      .fill(0)
      .map(() => Array(2 * n).fill(0))

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        C[i][j] = C11[i][j]
        C[i][j + n] = C12[i][j]
        C[i + n][j] = C21[i][j]
        C[i + n][j + n] = C22[i][j]
      }
    }

    return C
  }

  // Render the result of the algorithm runner
  function renderStrassenMatrixResult(result: any) {
    return (
      <div>
        <p className="font-medium mb-2">Matrix A:</p>
        <div className="bg-muted p-2 rounded-md mb-4">
          {result.matrixA.map((row: number[], i: number) => (
            <div key={i} className="font-mono">
              [{row.join(", ")}]
            </div>
          ))}
        </div>

        <p className="font-medium mb-2">Matrix B:</p>
        <div className="bg-muted p-2 rounded-md mb-4">
          {result.matrixB.map((row: number[], i: number) => (
            <div key={i} className="font-mono">
              [{row.join(", ")}]
            </div>
          ))}
        </div>

        <p className="font-medium mb-2">Result Matrix:</p>
        <div className="bg-muted p-2 rounded-md">
          {result.resultMatrix.map((row: number[], i: number) => (
            <div key={i} className="font-mono">
              [{row.join(", ")}]
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Code explanation with dynamic values
  function codeExplanation(input: any, result: any) {
    const isPower2 =
      isPowerOfTwo(input.matrixA.length) &&
      input.matrixA.length === input.matrixA[0].length &&
      input.matrixA.length === input.matrixB.length

    const algorithm = isPower2
      ? `function strassenMultiply(A, B) {
  const n = A.length;
  
  // Base case: 1x1 matrices
  if (n === 1) {
    return [[A[0][0] * B[0][0]]];
  }
  
  // Split matrices into quadrants
  const mid = n / 2;
  const A11 = getSubmatrix(A, 0, 0, mid);
  const A12 = getSubmatrix(A, 0, mid, mid);
  const A21 = getSubmatrix(A, mid, 0, mid);
  const A22 = getSubmatrix(A, mid, mid, mid);
  
  const B11 = getSubmatrix(B, 0, 0, mid);
  const B12 = getSubmatrix(B, 0, mid, mid);
  const B21 = getSubmatrix(B, mid, 0, mid);
  const B22 = getSubmatrix(B, mid, mid, mid);
  
  // Compute the seven products
  const P1 = strassenMultiply(A11, subtract(B12, B22));
  const P2 = strassenMultiply(add(A11, A12), B22);
  const P3 = strassenMultiply(add(A21, A22), B11);
  const P4 = strassenMultiply(A22, subtract(B21, B11));
  const P5 = strassenMultiply(add(A11, A22), add(B11, B22));
  const P6 = strassenMultiply(subtract(A12, A22), add(B21, B22));
  const P7 = strassenMultiply(subtract(A11, A21), add(B11, B12));
  
  // Compute the four quadrants of the result
  const C11 = add(subtract(add(P5, P4), P2), P6);
  const C12 = add(P1, P2);
  const C21 = add(P3, P4);
  const C22 = subtract(subtract(add(P5, P1), P3), P7);
  
  // Combine the four quadrants into the result matrix
  return combineMatrices(C11, C12, C21, C22);
}`
      : `function standardMatrixMultiply(A, B) {
  const n = A.length;
  const m = B[0].length;
  const p = B.length;
  const C = Array(n).fill(0).map(() => Array(m).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < p; k++) {
        C[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  
  return C;
}`

    const explanationSteps = isPower2
      ? `To multiply matrices using Strassen's algorithm:

1. If the matrices are 1×1, simply multiply the single elements
2. Otherwise, divide each matrix into four equal-sized quadrants
3. Compute seven products P1 through P7 using clever combinations of the quadrants
4. Compute the four quadrants of the result matrix using these products
5. Combine the quadrants to form the final result matrix

Strassen's algorithm reduces the number of recursive multiplications from 8 to 7, resulting in a better asymptotic complexity of O(n^log₂7) ≈ O(n^2.81) compared to O(n^3) for standard matrix multiplication.`
      : `To multiply matrices using standard algorithm:

1. For each element C[i][j] in the result matrix:
   a. Initialize C[i][j] = 0
   b. For each k from 0 to p-1:
      - Add A[i][k] * B[k][j] to C[i][j]

This algorithm performs n×m×p multiplications and additions, resulting in O(n³) time complexity for square matrices.`

    return (
      <div className="space-y-4">
        <DynamicCodeBlock
          code={algorithm}
          language="javascript"
          title={isPower2 ? "Strassen's Matrix Multiplication Algorithm" : "Standard Matrix Multiplication Algorithm"}
          explanation={explanationSteps}
          inputValues={input}
          outputValues={result.resultMatrix}
        />

        <h4 className="text-lg font-medium">Time and Space Complexity</h4>
        {isPower2 ? (
          <>
            <p>
              <strong>Time Complexity:</strong> O(n^log₂7) ≈ O(n^2.81) - Better than the O(n³) complexity of standard
              matrix multiplication.
            </p>
            <p>
              <strong>Space Complexity:</strong> O(n²) - Additional space is required for the recursive calls and
              temporary matrices.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Time Complexity:</strong> O(n³) for square n×n matrices.
            </p>
            <p>
              <strong>Space Complexity:</strong> O(n²) - Space for the result matrix.
            </p>
          </>
        )}

        <h4 className="text-lg font-medium">Key Insights</h4>
        <ul className="list-disc list-inside">
          {isPower2 ? (
            <>
              <li>Strassen's algorithm is more efficient for large matrices but has higher constant factors</li>
              <li>It works best for matrices whose dimensions are powers of 2</li>
              <li>The algorithm trades increased space complexity for improved time complexity</li>
              <li>
                In practice, hybrid approaches are often used, switching to standard multiplication for small matrices
              </li>
            </>
          ) : (
            <>
              <li>Standard matrix multiplication is simple to implement but has cubic time complexity</li>
              <li>It's often more efficient for small matrices due to lower constant factors</li>
              <li>The algorithm can be optimized through techniques like loop unrolling and cache optimization</li>
              <li>For large matrices, advanced algorithms like Strassen's offer better asymptotic performance</li>
            </>
          )}
        </ul>
      </div>
    )
  }

  // FAQ questions
  const faqQuestions = [
    {
      id: "complexity",
      question: "What's the time complexity of Strassen's algorithm?",
    },
    {
      id: "comparison",
      question: "How does Strassen's algorithm compare to standard matrix multiplication?",
    },
    {
      id: "limitations",
      question: "What are the limitations of Strassen's algorithm?",
    },
    {
      id: "applications",
      question: "What are practical applications of Strassen's algorithm?",
    },
    {
      id: "improvements",
      question: "Are there improvements or variations of Strassen's algorithm?",
    },
  ]

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Strassen's Matrix Multiplication</h1>
        <p className="text-muted-foreground">An efficient divide-and-conquer algorithm for multiplying matrices</p>
      </div>

      <Tabs defaultValue="interactive" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="interactive">Interactive Visualizer</TabsTrigger>
          <TabsTrigger value="explainer">Explainer</TabsTrigger>
          <TabsTrigger value="visualization">Visualization</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="interactive">
          <IntegratedAlgorithmView
            algorithmName="Strassen's Matrix Multiplication"
            defaultInput={defaultInput}
            inputPlaceholder="1, 2, 3, 4\n5, 6, 7, 8\n9, 10, 11, 12\n13, 14, 15, 16\n\n17, 18, 19, 20\n21, 22, 23, 24\n25, 26, 27, 28\n29, 30, 31, 32"
            parseInput={parseInput}
            runAlgorithm={runStrassenMatrix}
            renderStep={renderMatrixStep}
            renderResult={renderStrassenMatrixResult}
            codeExplanation={codeExplanation}
          />
        </TabsContent>

        <TabsContent value="explainer">
          <AlgorithmExplainer
            title="Strassen's Matrix Multiplication"
            description="A divide-and-conquer algorithm for multiplying matrices that reduces the number of recursive multiplications from 8 to 7."
            approach="Strassen's algorithm improves upon the standard matrix multiplication algorithm by reducing the number of recursive multiplications needed. For two n×n matrices, the standard algorithm requires n³ multiplications. Strassen's algorithm divides each matrix into four n/2 × n/2 submatrices and uses a clever combination of additions and subtractions to compute the product with only 7 recursive multiplications instead of 8, resulting in a better asymptotic complexity."
            phases={[
              {
                title: "Divide",
                description: "Divide each n×n matrix into four n/2 × n/2 submatrices.",
              },
              {
                title: "Compute Products",
                description: "Compute seven products P1 through P7 using specific combinations of the submatrices.",
              },
              {
                title: "Combine",
                description: "Combine the products to form the four submatrices of the result matrix.",
              },
              {
                title: "Base Case",
                description: "When the matrices are 1×1, simply multiply the single elements.",
              },
            ]}
            complexity={{
              time: {
                best: "O(n^log₂7) ≈ O(n^2.81)",
                average: "O(n^log₂7) ≈ O(n^2.81)",
                worst: "O(n^log₂7) ≈ O(n^2.81)",
              },
              space: "O(n²)",
            }}
            pseudocode={`function strassenMultiply(A, B):
    n = A.rows
    
    if n == 1:
        return [[A[0][0] * B[0][0]]]  // Base case: 1×1 matrices
    
    // Divide matrices into quadrants
    mid = n / 2
    A11 = submatrix(A, 0, 0, mid)
    A12 = submatrix(A, 0, mid, mid)
    A21 = submatrix(A, mid, 0, mid)
    A22 = submatrix(A, mid, mid, mid)
    
    B11 = submatrix(B, 0, 0, mid)
    B12 = submatrix(B, 0, mid, mid)
    B21 = submatrix(B, mid, 0, mid)
    B22 = submatrix(B, mid, mid, mid)
    
    // Compute the seven products
    P1 = strassenMultiply(A11, subtract(B12, B22))
    P2 = strassenMultiply(add(A11, A12), B22)
    P3 = strassenMultiply(add(A21, A22), B11)
    P4 = strassenMultiply(A22, subtract(B21, B11))
    P5 = strassenMultiply(add(A11, A22), add(B11, B22))
    P6 = strassenMultiply(subtract(A12, A22), add(B21, B22))
    P7 = strassenMultiply(subtract(A11, A21), add(B11, B12))
    
    // Compute the four quadrants of the result matrix
    C11 = add(subtract(add(P5, P4), P2), P6)
    C12 = add(P1, P2)
    C21 = add(P3, P4)
    C22 = subtract(subtract(add(P5, P1), P3), P7)
    
    // Combine the four quadrants into the result matrix
    return combineMatrices(C11, C12, C21, C22)`}
          />
        </TabsContent>

        <TabsContent value="visualization">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Strassen's Algorithm Visualization</h2>
                <p>
                  Strassen's algorithm is complex to visualize step-by-step due to its recursive nature and the multiple
                  matrix operations involved. Below is a conceptual visualization of how the algorithm works for 2×2
                  matrices.
                </p>

                <h3>Example: Multiplying 2×2 Matrices</h3>
                <p>Consider two 2×2 matrices:</p>
                <div className="flex flex-col md:flex-row gap-8 mb-4">
                  <div>
                    <p className="font-medium">Matrix A:</p>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="font-mono">[a, b]</div>
                      <div className="font-mono">[c, d]</div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Matrix B:</p>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="font-mono">[e, f]</div>
                      <div className="font-mono">[g, h]</div>
                    </div>
                  </div>
                </div>

                <p>In standard matrix multiplication, we would compute:</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <div className="font-mono">[a*e + b*g, a*f + b*h]</div>
                  <div className="font-mono">[c*e + d*g, c*f + d*h]</div>
                </div>

                <p>This requires 8 multiplications and 4 additions.</p>

                <p>With Strassen's algorithm, we compute the following seven products:</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <div className="font-mono">P1 = a * (f - h)</div>
                  <div className="font-mono">P2 = (a + b) * h</div>
                  <div className="font-mono">P3 = (c + d) * e</div>
                  <div className="font-mono">P4 = d * (g - e)</div>
                  <div className="font-mono">P5 = (a + d) * (e + h)</div>
                  <div className="font-mono">P6 = (b - d) * (g + h)</div>
                  <div className="font-mono">P7 = (a - c) * (e + f)</div>
                </div>

                <p>Then we compute the four elements of the result matrix:</p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <div className="font-mono">C11 = P5 + P4 - P2 + P6</div>
                  <div className="font-mono">C12 = P1 + P2</div>
                  <div className="font-mono">C21 = P3 + P4</div>
                  <div className="font-mono">C22 = P5 + P1 - P3 - P7</div>
                </div>

                <p>
                  This requires 7 multiplications and 18 additions/subtractions. For small matrices, this is actually
                  less efficient than the standard algorithm due to the overhead of additions and subtractions. However,
                  for large matrices, the reduction in multiplications leads to better asymptotic performance.
                </p>

                <h3>Recursive Structure</h3>
                <p>
                  For larger matrices, Strassen's algorithm recursively applies the same process to the submatrices. The
                  key insight is that by reducing the number of recursive multiplications from 8 to 7, we improve the
                  asymptotic complexity from O(n³) to approximately O(n^2.81).
                </p>

                <div className="bg-blue-500/10 p-4 rounded-md mb-4">
                  <h4 className="text-blue-600 dark:text-blue-400">Complexity Analysis</h4>
                  <p>
                    The recurrence relation for Strassen's algorithm is:
                    <br />
                    T(n) = 7T(n/2) + O(n²)
                    <br />
                    Using the Master Theorem, this solves to:
                    <br />
                    T(n) = O(n^log₂7) ≈ O(n^2.81)
                  </p>
                </div>

                <p>
                  This improvement becomes significant for very large matrices, making Strassen's algorithm an important
                  theoretical breakthrough in computational complexity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <MiniFAQ
            title="Strassen's Matrix Multiplication FAQ"
            algorithm="Strassen's Matrix Multiplication"
            questions={faqQuestions}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
