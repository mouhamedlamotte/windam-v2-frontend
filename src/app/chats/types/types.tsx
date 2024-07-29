import { UserType } from "@/app/profile/types";

export type PrivatechatRoomType = {
    pk: number,
    user: UserType,
    name : string,
    last_message : {
      type : "text" | "code" | "image" | "caption",
      content : string,
      created_at : string
    },
    last_message_by : UserType,
  };

export type GroupchatRoomType = {
  pk: number,
  name : string,
  group_name : string,
  private? : boolean,
  members : UserType[],
  created_at : string,
  created_by : UserType,
  last_message_by : UserType | null,
  last_message : {
    type : "text" | "code" | "image" | "caption",
    content : string,
    created_at : string
  } | null,
}

export type ChatroomMessageType = {
  pk: number
  sender: UserType
  type: "text" | "code" | "image" | "caption"
  file: string
  content: string
  seen: boolean
  created_at: string
}

export type ChatRoomType = {
    chats : ChatroomMessageType[],
    chatroom : GroupchatRoomType
}

