import { useState, useEffect } from "react";
import { NQueensStep } from "./NQueensTypes";
import { generateNQueensSteps, generateAllSolutions, QUEEN_SOLUTION_COUNTS } from "./NQueensAlgorithm";

export function useNQueens(initialSize: number = 6) {
  // Core states
  const [boardSize, setBoardSize] = useState<number>(initialSize);
  const [inputSize, setInputSize] = useState<string>(initialSize.toString());
  const [error, setError] = useState<string | null>(null);

  // Visualization states
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<NQueensStep[]>([]);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Solution states
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [currentSolution, setCurrentSolution] = useState<number>(0);
  const [allSolutions, setAllSolutions] = useState<number[][]>([]);
  const [totalSolutions, setTotalSolutions] = useState<number>(0);
  const [isGeneratingAllSolutions, setIsGeneratingAllSolutions] = useState<boolean>(false);
  
  // Pagination states
  const [solutionsPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Initialize with default steps when component mounts
  useEffect(() => {
    const result = generateNQueensSteps(boardSize);
    setSteps(result.steps);
    setSolutions(result.solutions);
    setTotalSolutions(result.totalCount);
    fetchAllSolutions(boardSize);
  }, []);

  // Function to fetch all solutions
  const fetchAllSolutions = (n: number, updateUI = false) => {
    if (updateUI) {
      setIsGeneratingAllSolutions(true);
    }
    
    try {
      const result = generateAllSolutions(n);
      
      if (updateUI) {
        setAllSolutions(result.solutions);
        setTotalSolutions(result.total);
        setCurrentPage(1);
        setIsGeneratingAllSolutions(false);
      } else {
        setAllSolutions(result.solutions);
        setTotalSolutions(result.total);
      }
    } catch (e) {
      if (updateUI) {
        setError("Error generating solutions");
        setIsGeneratingAllSolutions(false);
      }
    }
  };

  // Handle board size input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setInputSize(e);
    } else {
      setInputSize(e.target.value);
    }
  };

  // Handle visualization start
  const handleVisualize = () => {
    try {
      setError(null);
      const size = parseInt(inputSize);

      if (isNaN(size)) {
        throw new Error("Please enter a valid number");
      }

      if (size < 1) {
        throw new Error("Board size must be at least 1");
      }

      if (size > 10) {
        throw new Error("Maximum board size is 10");
      }

      setBoardSize(size);
      setCurrentSolution(0);
      setCurrentPage(1);
      
      const result = generateNQueensSteps(size);
      setSteps(result.steps);
      setSolutions(result.solutions);
      setTotalSolutions(result.totalCount);
      setCurrentStep(0);
      setIsPlaying(false);
      
      fetchAllSolutions(size, true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle next step in visualization
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  // Handle previous step in visualization
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  // Handle reset visualization
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Handle auto-play functionality
  const handleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle solution cycling
  const handleNextSolution = () => {
    if (solutions.length > 0) {
      setCurrentSolution((currentSolution + 1) % solutions.length);
    }
  };

  // Handle solution pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const maxPages = Math.ceil(allSolutions.length / solutionsPerPage);
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle speed change
  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
  };

  // Effect for auto-play
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep >= steps.length - 1) {
            setIsPlaying(false);
            return steps.length - 1;
          }
          return nextStep;
        });
      }, 1000 / speed);
    }

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, speed, steps.length]);

  // Get current page data
  const getCurrentPageSolutions = () => {
    const startIdx = (currentPage - 1) * solutionsPerPage;
    const endIdx = Math.min(startIdx + solutionsPerPage, allSolutions.length);
    return allSolutions.slice(startIdx, endIdx);
  };

  const totalPages = Math.ceil(allSolutions.length / solutionsPerPage);

  return {
    // State values
    boardSize,
    inputSize,
    error,
    currentStep,
    steps,
    speed,
    isPlaying,
    solutions,
    currentSolution,
    allSolutions,
    totalSolutions,
    isGeneratingAllSolutions,
    currentPage,
    totalPages,
    
    // Actions
    handleInputChange,
    handleVisualize,
    handleNext,
    handlePrevious,
    handleReset,
    handleAutoPlay,
    handleNextSolution,
    handlePrevPage,
    handleNextPage,
    handleSpeedChange,
    
    // Computed values
    currentPageSolutions: getCurrentPageSolutions(),
  };
}