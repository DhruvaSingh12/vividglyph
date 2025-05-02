"use client"
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export interface BinarySearchInput {
  array: number[];
  target: number;
}

export interface BinarySearchResult {
  array: number[];
  target: number;
  index: number;
}

export interface BinarySearchStep {
  data: number[];
  highlight: {
    left: number;
    right: number;
    mid: number;
    status: string;
    message: string;
    target: number;
  };
}

export interface BinarySearchOutput {
  result: BinarySearchResult;
  steps: BinarySearchStep[];
}

export function parseInput(input: string): BinarySearchInput {
  try {
    const [arrayPart, targetPart] = input.split("\n\n");
    
    if (!arrayPart || !targetPart) {
      throw new Error("Please provide both an array and a target value");
    }
    
    const array = arrayPart.split(",").map(item => parseInt(item.trim()));
    const target = parseInt(targetPart.trim());
    
    if (array.some(isNaN)) {
      throw new Error("Array contains invalid numbers");
    }
    
    if (isNaN(target)) {
      throw new Error("Target value is not a valid number");
    }
    
    return { array: array.sort((a, b) => a - b), target };
  } catch (error) {
    throw new Error("Input format error: Please provide a comma-separated list of numbers, followed by two newlines, followed by the target value");
  }
}

export function runBinarySearch(input: BinarySearchInput): BinarySearchOutput {
  const { array, target } = input;
  const steps: BinarySearchStep[] = [];
  let left = 0;
  let right = array.length - 1;
  let foundIndex = -1;
  
  steps.push({
    data: [...array],
    highlight: {
      left,
      right,
      mid: -1,
      status: 'start',
      message: `Starting binary search for target ${target} in sorted array`,
      target: target
    }
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      data: [...array],
      highlight: {
        left,
        right,
        mid,
        status: 'comparing',
        message: `Comparing array[${mid}] = ${array[mid]} with target ${target}`,
        target: target
      }
    });
    
    if (array[mid] === target) {
      foundIndex = mid;
      steps.push({
        data: [...array],
        highlight: {
          left,
          right,
          mid,
          status: 'found',
          message: `Found ${target} at index ${mid}!`,
          target: target
        }
      });
      break;
    }
    
    if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        data: [...array],
        highlight: {
          left,
          right,
          mid,
          status: 'move-right',
          message: `${array[mid]} < ${target}, so search right half [${left}...${right}]`,
          target: target
        }
      });
    } else {
      right = mid - 1;
      steps.push({
        data: [...array],
        highlight: {
          left,
          right,
          mid,
          status: 'move-left',
          message: `${array[mid]} > ${target}, so search left half [${left}...${right}]`,
          target: target
        }
      });
    }
  }
  
  if (foundIndex === -1) {
    steps.push({
      data: [...array],
      highlight: {
        left,
        right,
        mid: -1,
        status: 'not-found',
        message: `${target} not found in the array`,
        target: target
      }
    });
  }
  
  return {
    result: { 
      array,
      target,
      index: foundIndex
    },
    steps
  };
}

export function renderBinarySearchStep(data: number[], step: number, highlight: any) {
  const maxValue = Math.max(...data, 1)
  const heightScale = Math.min(200 / maxValue, 10)

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 text-sm font-medium">
        {highlight?.message || "Visualizing Binary Search..."}
      </div>

      <div className="flex justify-center items-end h-64 gap-1">
        {data.map((value, i) => {
          let bgColor = "bg-muted";
          let textColor = "text-foreground";
          
          if (highlight?.status === 'start') {
            bgColor = "bg-blue-100 dark:bg-blue-900/20";
          } else if (i === highlight?.mid) {
            if (highlight?.status === 'comparing') {
              bgColor = "bg-yellow-500";
              textColor = "text-black";
            } else if (highlight?.status === 'found') {
              bgColor = "bg-green-500";
              textColor = "text-white";
            }
          } else if (i >= highlight?.left && i <= highlight?.right) {
            bgColor = "bg-blue-500/50";
          } else {
            bgColor = "bg-gray-300/30 dark:bg-gray-700/30";
            textColor = "text-gray-500 dark:text-gray-400";
          }
          
          const height = `${Math.max(30, value * heightScale)}px`
          
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-10 ${bgColor} ${textColor} flex items-center justify-center rounded-t-md transition-all duration-300`}
                style={{ height }}
              >
                {value}
              </div>
              <div className="text-xs mt-1">{i}</div>
              {i === highlight?.mid && (
                <div className="text-xs text-primary font-medium mt-1">mid</div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Target value indicator */}
      <div className="mt-6 flex justify-center">
        <Badge variant="secondary" className="px-3 py-1">
          <Search className="w-4 h-4 mr-2" />
          Target: {highlight?.target !== undefined ? highlight.target : "?"}
        </Badge>
      </div>
    </div>
  );
}