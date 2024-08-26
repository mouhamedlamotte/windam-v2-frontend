"use client"

import * as React from "react"


import {
  TooltipProvider,
} from "@/components/ui/tooltip"
import Asidebar from "@/components/asidebar"
import { useAuth } from "./auth/hooks/useAuth";
import { Loader, Home, MessageSquareText as MessageSquareTextIcon, Users2, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Layout({
  children}: Readonly<{ children: React.ReactNode }>) {


  const { user, error, isLoading } = useAuth();
  const pathname = usePathname();

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
    <div className="flex h-screen w-full flex-col bg-muted/40 p-0 m-0">
    <Asidebar />
    <div className="flex h-[50px] w-full fixed z-40 sm:hidden bottom-0">
      <nav className="flex justify-around items-center w-full h-full bg-background">
        {[
          { href: "/feed", icon: Home },
          { href: "/chats", icon: MessageSquareTextIcon },
          { href: "/friends", icon: Users2 },
          { href: "/notifications", icon: Bell },
          { href: "/settings", icon: Settings },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-center flex-1 h-full text-muted-foreground hover:text-foreground transition-colors",
              pathname === item.href && "text-primary"
            )}
          >
            <item.icon 
              className={cn(
                "h-5 w-5",
                pathname === item.href && "text-primary scale-110"
              )}
            />
          </Link>
        ))}
      </nav>
    </div>
      <div className="sm:pl-20 h-full">
          {children}
      </div>
    </div>
    </TooltipProvider>
  
  )
}