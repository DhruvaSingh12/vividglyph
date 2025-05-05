"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NQueensControlsProps {
  inputSize: string;
  error: string | null;
  handleInputChange: (value: string) => void;
  handleVisualize: () => void;
}

export function NQueensControls({ inputSize, error, handleInputChange, handleVisualize }: NQueensControlsProps) {

  const boardSizeOptions = [4, 5, 6, 7, 8, 9, 10];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4 mb-2">
        <div className="flex-1">
          <Select 
            value={inputSize} 
            onValueChange={(value) => handleInputChange(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select board size" />
            </SelectTrigger>
            <SelectContent>
              {boardSizeOptions.map(size => (
                <SelectItem key={size} value={size.toString()}>
                  {size}×{size} Board
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Button onClick={handleVisualize}>Visualize</Button>
      </div>
    </div>
  )
}