import React from "react";
import { Layout } from "../_layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleEllipsis, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import ChatroomsSide from "./components/chatroomside";

const Chats = () => {
  return (
    <Layout>
      <div className="flex h-full w-full bg-muted/40 overflow-hidden">
        <ChatroomsSide />
        <div className="grow h-full flex flex-col justify-between">
          <div className="w-full px-8 py-6 flex border-b border-l">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/300?u=a042581f4e29026704d" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="ml-auto flex gap-4">
              <Button variant="ghost" className="p-2">
                <Phone className="h-8s" />
              </Button>
              <Button variant="ghost" className="p-2">
                <CircleEllipsis className="rotate-90 h-6" />
              </Button>
            </div>
          </div>
          <div className="grow bg-background"></div>
          <div className="w-full px-6 py-4 border-t">
                <form action="">
                  <Input placeholder="Type your message here" />
                </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
