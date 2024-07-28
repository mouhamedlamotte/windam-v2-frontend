import React from 'react'

import {  Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatRoomType } from '../types';
import { ChatItem } from './chatroomItem';


const chatrooms: chatRoomType[] = [];

const names = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Dana Evans",
  "Ethan Foster",
  "Fiona Green",
  "George Harris",
  "Hannah Ivers",
  "Ian Jenkins",
  "Julia King",
  "Kevin Lee",
  "Lara Martin",
  "Mike Nelson",
  "Nina Ortiz",
  "Oscar Perry",
  "Paula Quinn",
  "Quincy Roberts",
  "Rachel Scott",
  "Steve Thompson",
  "Tina Underwood",
  "Ulysses Vincent",
  "Vera White",
  "Will Xander",
  "Xena Young",
  "Yuri Zimmerman",
  "Zoe Adams",
  "Arthur Clark",
  "Betty Davis",
];
const messages = [
  "Hello World",
  "How are you?",
  "Good morning!",
  "Good night!",
  "See you later!",
  "Have a nice day!",
  "What's up?",
  "Thank you!",
  "Congratulations!",
  "Sorry!",
  "Yes",
  "No",
  "Maybe",
  "I don't know",
  "Let's go!",
  "I'm busy",
  "Call me",
  "Message me",
  "Talk to you soon",
  "Take care",
  "Miss you",
  "Love you",
  "Happy birthday!",
  "Good luck!",
  "Nice to meet you",
  "Long time no see",
  "Welcome!",
  "Goodbye!",
  "Take it easy",
  "Cheers!",
];

for (let i = 0; i < 30; i++) {
  chatrooms.push({
    id: (i + 1).toString(),
    user: {
      id: (i + 1).toString(),
      name: names[i % names.length],
      avatar: `https://i.pravatar.cc/300?u=${(i + 1).toString()}`,
    },
    lastMessage: messages[i % messages.length],
    lastMessageTime: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}`,
    lastMessageReaded: Math.random() > 0.5,
  });
}



const ChatroomsSide = () => {
  return (
    <div className="w-80 h-full">
    <div className="p-6 flex items-center">
      <h3 className="text-2xl font-bold">Chats</h3>
      <Button variant="ghost" className="ml-auto text-primary p-2">
        <Edit className="text-primary" />
      </Button>
    </div>

    <Tabs defaultValue="chats" className="h-full mt-1">
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
        <TabsContent value="chats">
          {chatrooms.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </TabsContent>
        <TabsContent value="groups"></TabsContent>
      </ScrollArea>
    </Tabs>
  </div>
  )
}

export default ChatroomsSide