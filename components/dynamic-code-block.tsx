"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, HardDrive, Clipboard, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface DynamicCodeBlockProps {
  code: string
  language?: string
  title?: string
  timeComplexity?: string
  spaceComplexity?: string
  inputValues?: any
  outputValues?: any
}

export function DynamicCodeBlock({
  code,
  language = "javascript",
  title,
  timeComplexity,
  spaceComplexity,
  inputValues,
  outputValues,
}: DynamicCodeBlockProps) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const processedCode = inputValues ? replacePlaceholders(code, inputValues, outputValues) : code

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
      setIsCopied(true);
      
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied with formatting preserved",
        duration: 3000,
      });
      
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard",
        variant: "destructive",
        duration: 3000,
      });
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="w-full border shadow-md border-muted-foreground/20">
      <CardContent className="px-0">
        <Tabs defaultValue="code" className="w-full">
          <div className="items-center border-b p-2 justify-between w-full flex flex-row">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                {title && <h3 className="text-lg font-medium">{title}</h3>}
              </div>
            </div>
            <div className="px-3">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                {(timeComplexity || spaceComplexity) && <TabsTrigger value="complexity">Complexity</TabsTrigger>}
              </TabsList>
            </div>
          </div>

            <TabsContent value="code" className="my-0 relative">
            <button 
              onClick={handleCopy}
              className="absolute top-2 border right-2 p-1.5 bg-secondary hover:bg-muted/80 rounded-md transition-colors"
              title="Copy code"
            >
              {isCopied ? (
                <Check className="h-5 w-5" />
              ) : (
                <Clipboard className="h-5 w-5" />
              )}
            </button>
            <pre className="bg-muted/60 p-4 lg:p-6 overflow-x-auto">
              <code className={`language-${language}`}>{processedCode}</code>
            </pre>
            </TabsContent>

          {(timeComplexity || spaceComplexity) && (
            <TabsContent value="complexity" className="mt-0">
              <div className="p-4 space-y-4 items">
                {timeComplexity && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-md p-1.5">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Time Complexity</h4>
                      <p className="text-sm">{timeComplexity}</p>
                    </div>
                  </div>
                )}

                {spaceComplexity && (
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-md p-1.5">
                      <HardDrive className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Space Complexity</h4>
                      <p className="text-sm">{spaceComplexity}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
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
