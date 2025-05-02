export function generateRandomArray(length: number, min = 1, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

/**
 * Delays execution for a specified number of milliseconds
 * @param ms The number of milliseconds to delay
 * @returns A promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Swaps two elements in an array
 * @param arr The array
 * @param i The index of the first element
 * @param j The index of the second element
 */
export function swap<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * Creates a deep copy of an array
 * @param arr The array to copy
 * @returns A deep copy of the array
 */
export function deepCopy<T>(arr: T[]): T[] {
  return JSON.parse(JSON.stringify(arr))
}

/**
 * Checks if an array is sorted in ascending order
 * @param arr The array to check
 * @returns True if the array is sorted, false otherwise
 */
export function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false
    }
  }
  return true
}

/**
 * Formats a big O notation string for display
 * @param notation The big O notation (e.g., "O(n log n)")
 * @returns The formatted string with proper subscripts
 */
export function formatBigO(notation: string): string {
  return notation.replace(/O$$([^)]+)$$/g, "O($1)")
}
