"use client"

import * as React from "react"


import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Asidebar from "@/components/asidebar"
import { useAuth } from "./auth/hooks/useAuth";
import { Loader } from "lucide-react";

export function Layout({
  children}: Readonly<{ children: React.ReactNode }>) {


  const { user, error, isLoading } = useAuth();

  if (isLoading) {
      return (
        <div className="flex h-screen w-full">
            <Loader className="animate-spin m-auto" />
        </div>
      )
  }

  if (error) {
      return <div className="flex h-screen w-full">
        <h3 className="m-auto text-sm font-bold max-w-md text-center">Une erreur est survenue, veuillez reessayer plutard, ou contacter l&apos;administrateur,
          <br/>
          <span className="mt-4 font-bold">{error.name} : {error.message}</span>
        </h3>
      </div>;
  }

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