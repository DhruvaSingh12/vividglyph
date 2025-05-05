"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, HardDrive, Clipboard, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface DynamicCodeBlockProps {
  code: string
  language?: string
  title?: string
  timeComplexity?: string
  spaceComplexity?: string
  inputValues?: any
  outputValues?: any
  className?: string
}

export function DynamicCodeBlock({
  code,
  language = "javascript",
  title,
  timeComplexity,
  spaceComplexity,
  inputValues,
  outputValues,
  className,
}: DynamicCodeBlockProps) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const processedCode = inputValues ? replacePlaceholders(code, inputValues, outputValues) : code

  useEffect(() => {
    const checkOverflow = () => {
      const preElements = document.querySelectorAll('pre');
      preElements.forEach(pre => {
        setIsOverflowing(pre.scrollWidth > pre.clientWidth);
      });
    };
    
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [processedCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
      setIsCopied(true);
      
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied",
        duration: 2000,
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code",
        variant: "destructive",
        duration: 2000,
      });
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className={cn("w-full border shadow-md border-muted-foreground/20", className)}>
      <CardContent className="px-0 py-0 sm:py-3">
        <Tabs defaultValue="code" className="w-full">
          <div className="flex items-center border-b p-2 justify-between w-full flex-row xs:flex-row xs:items-center sm:p-2">
            <div className="flex items-center p-2 xs:p-3">
              <div className="flex items-center gap-2">
                {title && (
                  <>
                    <h3 className="text-base sm:text-lg font-medium truncate max-w-[180px] xs:max-w-[250px] md:max-w-full">
                      {title}
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="px-2 xs:px-3 items-center self-end xs:self-auto">
              <TabsList className="h-8 sm:h-9">
                <TabsTrigger value="code" className="text-xs sm:text-sm">Code</TabsTrigger>
                {(timeComplexity || spaceComplexity) && (
                  <TabsTrigger value="complexity" className="text-xs sm:text-sm">Complexity</TabsTrigger>
                )}
              </TabsList>
            </div>
          </div>

          <TabsContent value="code" className="my-0 relative">
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 z-10 p-1 sm:p-1.5 bg-secondary hover:bg-muted/80 rounded-md transition-colors"
              aria-label={isCopied ? "Copied" : "Copy code"}
            >
              {isCopied ? (
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Clipboard className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
            
            {isOverflowing && (
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md">
                Scroll horizontally →
              </div>
            )}
            
            <pre className="bg-muted/60 p-3 sm:p-4 lg:p-6 overflow-x-auto text-xs sm:text-sm md:text-base scrollbar-thin">
              <code className={`language-${language}`}>{processedCode}</code>
            </pre>
          </TabsContent>

          {(timeComplexity || spaceComplexity) && (
            <TabsContent value="complexity" className="mt-0">
              <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {timeComplexity && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-md p-1 sm:p-1.5">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-medium mb-1">Time Complexity</h4>
                      <p className="text-xs sm:text-sm break-words">{timeComplexity}</p>
                    </div>
                  </div>
                )}

                {spaceComplexity && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-md p-1 sm:p-1.5">
                      <HardDrive className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-medium mb-1">Space Complexity</h4>
                      <p className="text-xs sm:text-sm break-words">{spaceComplexity}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function replacePlaceholders(code: string, inputValues: any, outputValues: any): string {
  let processedCode = code

  if (inputValues) {
    if (Array.isArray(inputValues)) {
      processedCode = processedCode.replace(/INPUT_ARRAY/g, JSON.stringify(inputValues))
    } else if (typeof inputValues === "object") {
      Object.entries(inputValues).forEach(([key, value]) => {
        const regex = new RegExp(`INPUT_${key.toUpperCase()}`, "g")
        processedCode = processedCode.replace(regex, JSON.stringify(value))
      })
    } else {
      processedCode = processedCode.replace(/INPUT_VALUE/g, JSON.stringify(inputValues))
    }
  }

  if (outputValues) {
    if (Array.isArray(outputValues)) {
      processedCode = processedCode.replace(/OUTPUT_ARRAY/g, JSON.stringify(outputValues))
    } else if (typeof outputValues === "object") {
      Object.entries(outputValues).forEach(([key, value]) => {
        const regex = new RegExp(`OUTPUT_${key.toUpperCase()}`, "g")
        processedCode = processedCode.replace(regex, JSON.stringify(value))
      })
    } else {
      processedCode = processedCode.replace(/OUTPUT_VALUE/g, JSON.stringify(outputValues))
    }
  }

  return processedCode
}
