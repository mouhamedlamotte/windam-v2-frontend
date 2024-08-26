import React from "react";
import { Layout } from "../_layout";
import ChatroomsSide from "./components/chatroomside";
import Chatroom from "./components/Chatroom";

const Chats = () => {
  return (
    <Layout>
      <div className="flex h-full w-full bg-muted/40 overflow-hidden">
        <ChatroomsSide />
          <Chatroom />
      </div>
          <div className="mb-20"></div>
    </Layout>
  );
};

export default Chats;
