import { CheckCheck } from "lucide-react";
import { chatRoomType } from "../types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const ChatItem = ({ chat }: { chat: chatRoomType }) => {
    return (
      <div className="w-full flex items-center hover:bg-muted p-3 px-4 cursor-pointer">
        <Avatar>
          <AvatarImage src={chat.user?.avatar} />
          <AvatarFallback>{chat.user?.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="font-semibold">{chat.user?.name}</h4>
          <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
        </div>
        <div className="ml-auto  flex flex-col items-end justify-between">
          <p className="text-xs text-muted-foreground text-end">
            {chat.lastMessageTime} PM
          </p>
          <p className="text-end">
            {chat.lastMessageReaded ? (
              <CheckCheck className="text-primary h-4 w-4" />
            ) : (
              <div className="h-5 w-5 bg-red-500 flex rounded-full justify-center items-center text-xs">
                2
              </div>
            )}
          </p>
        </div>
      </div>
    );
  };