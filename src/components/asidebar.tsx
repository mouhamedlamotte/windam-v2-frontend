"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  Bell,
  BotMessageSquare,
  Home,
  MessageSquareTextIcon,
  Package2,
  Settings,
  Users2,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type SideBarLinkProps = {
  href: string;
  name: string;
  icon: any;
};

const Asidebar = () => {
  const links: SideBarLinkProps[] = [
    {
      href: "/feed",
      name: "Home",
      icon: Home,
    },
    {
      href: "/chats",
      name: "Chats",
      icon: MessageSquareTextIcon,
    },
    {
      href: "/friends",
      name: "Friends",
      icon: Users2,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 sm:py-4 mt-10">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <BotMessageSquare className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Windam</span>
        </Link>
        <div className="mt-10 flex flex-col items-center gap-6 w-full">
          {links.map((link) => (
            <SideBarLink key={link.href} link={link} />
          ))}
        </div>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Notifications</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        <Separator />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Avatar className="rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="rounded-md">SC</AvatarFallback>
              </Avatar>
              <span className="sr-only">Profile</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Profile</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

const SideBarLink = ({ link }: { link: SideBarLinkProps }) => {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link.href}
          className={cn(
            "flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground w-full",
            pathname == link.href && "border-l-2 border-l-primary text-primary"
          )}
        >
          <link.icon
            className={cn(
              pathname == link.href ? "text-primary" : "text-muted-foreground",
              "h-5 w-5"
            )}
          />
          <span className="sr-only">{link.name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{link.name}</TooltipContent>
    </Tooltip>
  );
};

export default Asidebar;
