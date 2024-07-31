"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ChatroomMessageType } from '../chats/types/types';

const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const socketUrl = 'ws://localhost:8000/ws/messenger/chatroom/aQoJV7HKsKm2uch5hfujsx/'
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<ChatroomMessageType[] | []>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {  
        const msg = JSON.parse(lastMessage.data).message;;
        setChats((prev) => prev.concat(msg));
    }
    return () => {
        
    }
  }, [lastMessage]);





  const handleClickSendMessage = useCallback(() => {
    sendMessage(JSON.stringify({content : message}))
    setMessage("");
  }, [message, sendMessage]);



    

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className='h-screen w-full flex justify-center items-start gap-6 px-60 flex-col'>
        <div className='grid grid-cols-1 gap-4'>
        {
            chats.map((chat, index) => (
                <div key={chat.pk}>
                    <h3 className='text-lg font-medium'>@{chat?.sender?.username}</h3>
                    <p className='text-sm'>{chat?.content}</p>
                </div>
            ))
        }
        </div>
        <div className='flex flex-col gap-4'>
            <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button onClick={handleClickSendMessage} >send</Button>
        <div>
            <p className='text-lg font-bold'> Status de la connexion : <span className={cn('font-normal', connectionStatus === 'Open' ? 'text-green-500' : 'text-orange-500')}>{connectionStatus}</span> </p>
        </div>
        </div>
    </div>
  );
};

export default WebSocketDemo