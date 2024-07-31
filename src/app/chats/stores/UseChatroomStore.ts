import { create } from "zustand";
import { ChatRoomType, ChatroomMessageType } from "../types/types"

type ChatRoomAction =
  | { type: 'RECEIVE_MESSAGE'; payload: ChatroomMessageType }
  | { type: 'CHANGE_ROOM'; payload: ChatRoomType }

const chatRoomReducer = (state: ChatRoomType | null, action: ChatRoomAction): ChatRoomType | null => {
    switch (action.type) {
      case 'RECEIVE_MESSAGE':
        if (state) {
          return {
            ...state,
            chats: [...state.chats, action.payload],
          };
        }
        return state;
      case 'CHANGE_ROOM':
        return action.payload;
      default:
        return state;
    }
  };
  


  interface ChatroomState {
    chatroom: ChatRoomType | null;
    dispatch: (action: ChatRoomAction) => void;
  }
  
  export const useChatroomStore = create<ChatroomState>((set) => ({
    chatroom: null,
    dispatch: (action) => set((state) => ({ chatroom: chatRoomReducer(state.chatroom, action) }))
  }));
  