"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, CircleEllipsis, Info, Lock, MessageSquareText, MoreHorizontal, Phone, SendHorizonal, UserPlus2, Zap } from "lucide-react";
import { ChatroomMessageType } from "../types/types";
import useAuthStore from "@/app/auth/stores/useAuthStore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { UserType } from "@/app/profile/types";

import { CopyBlock, dracula } from "react-code-blocks";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatroomStore } from "../stores/UseChatroomStore";
import useWebSocket from "react-use-websocket";
import { baseWsUrl } from "@/constants";

const Chatroom = () => {
  const user = useAuthStore((state) => state.user);


  const [message, setMessage] = useState("");
  const {chatroom, dispatch} = useChatroomStore()   

  const socketUrl = chatroom ? `${baseWsUrl}/messenger/chatroom/${chatroom.chatroom.name}/` : null;

  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => !!chatroom,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastMessage !== null && chatroom) {
      const msg = JSON.parse(lastMessage.data).message;
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    }
  }, [lastMessage, dispatch]);


  const handleClickSendMessage = useCallback(() => {
    if (message === "") return
    sendMessage(JSON.stringify({content : message}))
    setMessage("");
  }, [message, sendMessage]);

  if (!chatroom){
    return (<div className="hidden md:flex justify-center items-center h-screen w-5/6">
        <h3>Selectioner un message pour contnuer</h3>
    </div>)
  }

  return (
    <div className="w-full md:w-4/6 lg:w-5/6 flex flex-col justify-between">
      <div className="w-full px-2 md:px-8 py-4 flex items-center gap-1">
        <Button variant='ghost' size='icon' className="md:hidden" 
        
        onClick={() => dispatch({ type: 'RESET'})}
        >
          <ChevronLeft />
        </Button>
        {chatroom?.chatroom.private ? (
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {
                  chatroom?.chatroom.members.filter(
                    (member) => member.pk !== user?.pk
                  )[0].username[0]
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">
                {
                  chatroom?.chatroom.members.filter(
                    (member) => member.pk !== user?.pk
                  )[0].username
                }
              </h4>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{chatroom?.chatroom.group_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{chatroom?.chatroom.group_name}</h4>
              <p className="text-sm text-muted-foreground">
                {chatroom?.chatroom.members
                  .map((member) => member.username)
                  .join(", ")}
              </p>
            </div>
          </div>
        )}
        <div className="ml-auto flex gap-4">
          <Button variant="ghost" className="p-2">
            <Phone className="h-8s" />
          </Button>
          <Button variant="ghost" className="p-2">
            <CircleEllipsis className="rotate-90 h-6" />
          </Button>
        </div>
      </div>
      <div className="grow h-3/5 bg-background rounded-md rounded-tl-none py-2">
        <ScrollArea  className="h-full px-3">
          <div className="w-full flex items-center justify-center p-4">
            {chatroom?.chatroom.private ? (
              <Card className="p-4">
                <CardContent className="p-0 text-yellow-300 text-xs flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  <p>Les messages sont securises</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="p-2">
                <CardContent className="flex flex-col justify-center items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-5xl">
                      {" "}
                      {chatroom?.chatroom.group_name[0]}{" "}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    Groupe &#8226; Cree le{" "}
                    {chatroom?.chatroom.created_at && formatDate(chatroom?.chatroom.created_at)} par{" "}
                    {chatroom?.chatroom.created_by.username}
                  </p>
                  <Button variant="ghost">Ajouter une description...</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Info className="h-4 w-4" />
                      Info du groupe
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <UserPlus2 className="h-4 w-4" />
                      Ajouter un membre
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {chatroom?.chats.map((message) => (
              <ChatMessage key={message.pk} message={message} user={user} />
            ))}
          </div>
          {/* =<div ref={messageEndRef}/> */}
        </ScrollArea>
      </div>
      <div className="w-full border-t">
      <Card className=" shadow-lg px-3 py-1 overflow-hidden  rounded-none">
        <CardHeader className="items-start p-0">
          <Button
            variant="ghost"
            className="gap-2 p-0 hover:bg-transparent items-center"
          >
            <MessageSquareText
              fill="currentColor"
              stroke="white"
              className="h-6 w-6 mt-1.5"
            />
            Chats
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CardHeader>
        <div className="overflow-hidden">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Use ctrl + enter to send messages"
            className="w-full px-4 border-none shadow-none focus-within:border-none outline-none focus-within:outline-none focus-visible:ring-0 p-0 bg-transparent scrollbar-none resize-none"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="ghost" className="p-0 hover:bg-transparent">
            <Zap fill="currentColor" size={16} />
          </Button>
          <div className="flex">
            <Button variant="ghost" className="">
              <MoreHorizontal fill="currentColor" size={16} />
            </Button>
            <Button variant="ghost" className="" onClick={handleClickSendMessage}>
              <SendHorizonal fill="currentColor" size={16} />
            </Button>
          </div>
        </div>
      </Card>
      </div>
      <div className="mb-[3rem] sm:hidden"></div>
    </div>
  );
};

export default Chatroom;

const ChatMessage = ({
  message,
  user,
}: {
  message: ChatroomMessageType;
  user: UserType | null;
}) => {




  return (
    <div
      className={cn(
        "w-full flex ",
        message.sender.pk === user?.pk ? "justify-end" : "justify-start"
      )}
    >
      <div>

        <div
          className={cn(
            "flex gap-2  items-end",
            message.sender.pk === user?.pk ? "flex-row-reverse" : "flex-row"
          )}
        >
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{message.sender.username[0]}</AvatarFallback>
          </Avatar>
          <div>
          
          <div
            className={cn(
              "bg-muted max-w-4xl",
              message.sender.pk === user?.pk
                ? "bg-primary rounded-l-md rounded-tr-md"
                : "bg-muted rounded-r-md rounded-tl-md"
            )}
          >
            {message.type === "code" ? (
              <CodeSnippet>{message.content}</CodeSnippet>
            ) : (
              <p className="text-sm p-4">{message.content}</p>
            )}
          </div>

            <p className={cn("text-xs text-muted-foreground", message.sender.pk === user?.pk ? "text-right" : "text-left")}>
                <span className="font-bold me-2">@{message.sender.username}</span>
              {formatDate(message.created_at)}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

const CodeSnippet = ({ children }: { children: string }) => {
  return (
    <div className="text-sm  rounded-md p-2 bg-background scrollbar-none">
      <CopyBlock language="python" text={children} theme={dracula} codeBlock />
    </div>
  );
};
