import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// This is a component specifically for displaying ASCII tree diagrams
export function TreeDiagram({ diagram }: { diagram: string }) {
  return (
    <div className="overflow-x-auto max-w-full">
      <div className="bg-muted/70 p-3 rounded font-mono whitespace-pre text-sm min-w-[600px]">
        {diagram}
      </div>
    </div>
  );
}

// Example usage in your component
export function Example() {
  const mergeSort = `                    cn             Level 0: 1 node, work = cn
                   /  \\
                c(n/2) c(n/2)      Level 1: 2 nodes, total work = cn
                /  \\    /  \\
               ...  ... ... ...     
                                  
               c(n/4) ... c(n/4)   Level 2: 4 nodes, total work = cn
                ...                 
                                  
                c(1) ... c(1)      Level log₂n: n nodes, total work = cn`;

  const increasingWork = `                          n                  Level 0: 1 node, work = n
                    /     |     \\    \\
                  n/2     n/2    n/2   n/2     Level 1: 4 nodes, total work = 2n
                 /|\\     /|\\   /|\\   /|\\
                ... ... ... ... ... ...   
                                        
               n/4 ... ... ... ... ... ... n/4 Level 2: 16 nodes, total work = 4n
                                        
                ... ... ... ... ... ...  
                                        
            1  ... ... ... ... ... ... ...  1  Level log₂n: 4^log₂n = n² nodes, work = n²`;
  
  return (
    <Card className="w-full">
      <CardContent className="pt-3">
        <div className="prose dark:prose-invert max-w-none">
          <h2>Recursion Tree Examples</h2>
          
          <h3>Merge Sort</h3>
          <TreeDiagram diagram={mergeSort} />
          
          <h3>Increasing Work Example</h3>
          <TreeDiagram diagram={increasingWork} />
        </div>
      </CardContent>
    </Card>
  );
}