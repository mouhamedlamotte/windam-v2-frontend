export type chatRoomType = {
    id: string;
    user: {
      id: string;
      name: string;
      avatar: string;
    };
    lastMessage: string;
    lastMessageTime: string;
    lastMessageReaded: boolean;
  };