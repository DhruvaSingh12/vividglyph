"use client";

import { ChevronDown, Home, BookOpenCheck, GraduationCap, Brain, Puzzle, Shuffle, ArrowLeft, ArrowRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

// This is the data structure for our sidebar navigation
const units = [
  {
    title: "Algorithm Design",
    path: "/units/introduction",
    icon: <GraduationCap className="h-4 w-4" />,
    topics: [
      { title: "Correctness & Proof Techniques", path: "/units/introduction/correctness-proof" },
      { title: "Time-complexity Analysis", path: "/units/introduction/time-complexity" },
      { title: "Asymptotic Notations", path: "/units/introduction/asymptotic-notations" },
      { title: "Mathematical Tools", path: "/units/introduction/mathematical-tools" },
      { title: "Substitution Method", path: "/units/introduction/substitution-method" },
      { title: "Recursion Trees", path: "/units/introduction/recursion-trees" },
      { title: "Master Theorem", path: "/units/introduction/master-theorem" },
    ],
  },
  {
    title: "Divide & Conquer",
    path: "/units/divide-and-conquer",
    icon: <Puzzle className="h-4 w-4" />,
    topics: [
      { title: "Binary Search", path: "/units/divide-and-conquer/binary-search" },
      { title: "Insertion Sort", path: "/units/divide-and-conquer/insertion-sort" },
      { title: "Merge Sort", path: "/units/divide-and-conquer/merge-sort" },
      { title: "Quick Sort", path: "/units/divide-and-conquer/quick-sort" },
      { title: "Strassen's Matrix Multiplication", path: "/units/divide-and-conquer/strassen-matrix" },
      { title: "Maximum Subarray", path: "/units/divide-and-conquer/maximum-subarray" },
      { title: "Finding Min & Max", path: "/units/divide-and-conquer/min-max" },
      { title: "Closest-pair & Convex Hull", path: "/units/divide-and-conquer/closest-pair" },
    ],
  },
  {
    title: "Greedy & Dynamic",
    path: "/units/greedy-dynamic-programming",
    icon: <Brain className="h-4 w-4" />,
    topics: [
      { title: "Huffman Coding", path: "/units/greedy-dynamic-programming/huffman-coding" },
      { title: "Knapsack Problem", path: "/units/greedy-dynamic-programming/knapsack" },
      { title: "Tree Traversals & MST", path: "/units/greedy-dynamic-programming/mst" },
      { title: "Matrix Chain Multiplication", path: "/units/greedy-dynamic-programming/matrix-chain" },
      { title: "Longest Common Subsequence", path: "/units/greedy-dynamic-programming/lcs" },
      { title: "Optimal Binary Search Tree", path: "/units/greedy-dynamic-programming/optimal-bst" },
    ],
  },
  {
    title: "Backtracking",
    path: "/units/branch-bound",
    icon: <BookOpenCheck className="h-4 w-4" />,
    topics: [
      { title: "N-Queens", path: "/units/branch-bound/n-queens" },
      { title: "Subset-sum", path: "/units/branch-bound/subset-sum" },
      { title: "Hamiltonian Circuit", path: "/units/branch-bound/hamilton-circuit" },
      { title: "Knapsack (Branch-and-Bound)", path: "/units/branch-bound/knapsack" },
      { title: "Travelling Salesman", path: "/units/branch-bound/tsp" },
      { title: "DFS & BFS", path: "/units/branch-bound/dfs-bfs" },
      { title: "Floyd–Warshall", path: "/units/branch-bound/floyd-warshall" },
    ],
  },
  {
    title: "Random & Approx.",
    path: "/units/randomized-approximation",
    icon: <Shuffle className="h-4 w-4" />,
    topics: [
      { title: "Randomized Hiring & QuickSort", path: "/units/randomized-approximation/randomized-quicksort" },
      { title: "Rabin–Karp String Matching", path: "/units/randomized-approximation/rabin-karp" },
      { title: "Vertex Cover", path: "/units/randomized-approximation/vertex-cover" },
      { title: "Complexity Classes", path: "/units/randomized-approximation/complexity-classes" },
      { title: "Hamiltonian Cycle & SAT", path: "/units/randomized-approximation/hamiltonian-sat" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname();
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});
  const router = useRouter();
  
  // Automatically expand the unit that contains the current page
  useEffect(() => {
    if (pathname) {
      const newExpandedState = { ...expandedUnits };
      
      units.forEach((unit) => {
        // Expand if we're on the unit page or any of its topics
        if (pathname === unit.path || unit.topics.some(topic => topic.path === pathname)) {
          newExpandedState[unit.title] = true;
        }
      });
      
      setExpandedUnits(newExpandedState);
    }
  }, [pathname]);
  
  const toggleUnit = (unitTitle: string) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitTitle]: !prev[unitTitle]
    }));
  };
  
  // Determine if a path is the current page or not
  const isActivePath = (path: string) => pathname === path;

  // Handle backward navigation
  const handleBack = () => {
    router.back();
  };

  // Handle forward navigation
  const handleForward = () => {
    router.forward();
  };

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex text-center leading-none">
                  <span className="font-bold tracking-tight text-[24px]">VividGlyph</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-2">
          <div className="relative">
            <input
              type="search"
              placeholder="Search algorithms..."
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Search size={20} className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-1">
        <SidebarGroup>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={handleBack}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={handleForward}
              className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              aria-label="Go forward"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </SidebarGroup>
        
        <SidebarSeparator className="my-2" />
        
        <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">
          LEARNING TRACKS
        </div>
        
        <SidebarGroup>
          <SidebarMenu className="space-y-1.5">
            {units.map((unit, index) => {
              const isUnitActive = isActivePath(unit.path);
              const isAnyTopicActive = unit.topics.some(topic => isActivePath(topic.path));
              const isExpanded = expandedUnits[unit.title] || false;
              
              return (
                <Collapsible 
                  key={unit.title} 
                  className="group/collapsible"
                  open={isExpanded}
                  onOpenChange={() => toggleUnit(unit.title)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        isActive={isUnitActive || isAnyTopicActive}
                        className={`transition-all ${isUnitActive ? 'bg-primary/10 font-medium' : 'hover:translate-x-1'}`}
                      >
                        {unit.icon}
                        <span>{unit.title}</span>
                        <ChevronDown className={`ml-auto h-4 w-4 shrink-0 opacity-70 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''}`} />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="transition-all duration-300 ease-in-out">
                      <SidebarMenuSub className="ml-2 mt-1 border-l-2 border-primary/20 py-1.5">
                        {unit.topics.map((topic) => {
                          const isTopicActive = isActivePath(topic.path);
                          
                          return (
                            <SidebarMenuSubItem key={topic.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                isActive={isTopicActive}
                                className={`transition-all duration-150 ${isTopicActive ? 'bg-primary/10 font-medium' : 'hover:translate-x-1'}`}
                              >
                                <Link href={topic.path}>
                                  <span className="truncate">{topic.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <p className="font-medium font-muted-foreground leading-none">Made by Dhruva</p>
            </div>
          </div>
          <ModeToggle />
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
