
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { GroupchatRoomType, PrivatechatRoomType } from "../types";



export const PrivateChatItem = ({ chat, handleClick }: { chat: PrivatechatRoomType, handleClick: (name: string) => void }) => {

    return (
      <a href="#" className="w-full flex items-center hover:bg-muted p-3 px-4 cursor-pointer" onClick={() => handleClick(chat.name)}>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{chat.user.first_name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="font-semibold sm:max-w-[8rem] lg:max-w-[12rem] truncate">{chat.user.first_name}</h4>
          <p className="text-sm text-muted-foreground">{chat.last_message?.content.includes("image") || chat.last_message?.content.includes("file") ? chat.last_message_by.username + " sent a file" : chat.last_message?.content}</p>
        </div>
        <div className="ml-auto  flex flex-col items-end justify-between">
          <p className="text-xs text-muted-foreground text-end">
          {chat.last_message ? formatDate(chat.last_message?.created_at) : ""}
          </p>
          <p className="text-end">
              {
                
              }
          </p>
        </div>
      </a>
    );
  };



  export const GroupChatItem = ({ chat, handleClick }: { chat: GroupchatRoomType, handleClick: (name: string) => void }) => {
    return (
      <a href="#" onClick={() => handleClick(chat.name)} className="w-full flex items-center hover:bg-muted p-3 px-4 cursor-pointer" >
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{chat.group_name[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="font-semibold">{chat.group_name}</h4>
          <p className="text-sm text-muted-foreground">
            {!chat.last_message && "Vos discussion sont securisees"}
            {chat.last_message?.content.includes("image") || chat.last_message?.content.includes("file") ? chat.last_message_by?.username + " sent a file" : chat.last_message?.content}</p>
        </div>
        <div className="ml-auto  flex flex-col items-end justify-between">
          <p className="text-xs text-muted-foreground text-end">
          {chat.last_message?.created_at && chat.last_message ? formatDate(chat.last_message?.created_at) : ""}
          </p>
          <p className="text-end">
          </p>
        </div>
      </a>
    );
  };