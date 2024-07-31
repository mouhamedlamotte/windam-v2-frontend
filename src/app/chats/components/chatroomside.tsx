"use client"

import React from 'react'

import {  Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GroupChatItem, PrivateChatItem } from './chatroomItem';
import { useQuery } from '@tanstack/react-query';
import Axiosinstance from '@/lib/axios';
import { GroupchatRoomType, PrivatechatRoomType } from '../types';
import { useChatroom } from '../hooks/useChatroom';
import { useChatroomStore } from '../stores/UseChatroomStore';









const ChatroomsSide = () => {

  const { mutate, data, error } = useChatroom();

  const {dispatch} = useChatroomStore()

  const handleClick = (name:string) =>{
    mutate(name, {
      onSuccess: (chatroomData) => {
        dispatch({ type: "CHANGE_ROOM", payload: chatroomData });
      },
    });
  }

  return (
    <div className="w-3/12 h-full border-r">
    <div className="p-5 flex items-center">
      <h3 className="text-2xl font-bold">Chats</h3>
      <Button variant="ghost" className="ml-auto text-primary p-2">
        <Edit className="text-primary" />
      </Button>
    </div>

    <Tabs defaultValue="chats" className="h-full">
      <TabsList className="w-full h-12 rounded-none px-6 bg-muted">
        <TabsTrigger
          className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          value="chats"
        >
          Chats
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          value="groups"
        >
          Groups
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="h-full">
          <PrivateChatrooms handleClick = {handleClick}/>
          <GroupChatrooms handleClick = {handleClick}/>
      </ScrollArea>
    </Tabs>
  </div>
  )
}

export default ChatroomsSide


const PrivateChatrooms = ({handleClick}: {handleClick: (name:string) => void}) =>{
  const { isLoading, error, data } = useQuery<PrivatechatRoomType[]>({
    queryKey: ['private-chatrooms'],
    queryFn: async () =>{
      const res = await Axiosinstance.get('/messenger/private-chatrooms/');
      return res.data;
    }
  })

  
  return(
    <TabsContent value="chats">
    {data?.map((chat) => (
      <PrivateChatItem key={chat.pk} chat={chat} handleClick = {handleClick} />
    ))}
  </TabsContent>
  )
}


const GroupChatrooms = ({handleClick}: {handleClick: (name:string) => void}) =>{
  const { isLoading, error, data } = useQuery<GroupchatRoomType[]>({
    queryKey: ['group-chatrooms'],
    queryFn: async () =>{
      const res = await Axiosinstance.get('/messenger/group-chatrooms/');
      return res.data;
    }
  })
  return(
    <TabsContent value="groups">
    {data?.map((chat) => (
      <GroupChatItem key={chat.pk} chat={chat}  handleClick = {handleClick} />
    ))}
  </TabsContent>
  )
}