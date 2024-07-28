import * as React from "react"


import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Asidebar from "@/components/asidebar"

export function Layout({
  children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider> 
    <div className="flex h-screen w-full flex-col bg-muted/40">
    <Asidebar />
      <div className="sm:pl-20 h-full">
          {children}
      </div>
    </div>
    </TooltipProvider>
  
  )
}
