
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { GroupchatRoomType, PrivatechatRoomType } from "../types";


export const PrivateChatItem = ({ chat }: { chat: PrivatechatRoomType }) => {
    return (
      <div className="w-full flex items-center hover:bg-muted p-3 px-4 cursor-pointer">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{chat.user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h4 className="font-semibold">{chat.user.username}</h4>
          <p className="text-sm text-muted-foreground">{chat.last_message.content.includes("image") || chat.last_message.content.includes("file") ? chat.last_message_by.username + " sent a file" : chat.last_message.content}</p>
        </div>
        <div className="ml-auto  flex flex-col items-end justify-between">
          <p className="text-xs text-muted-foreground text-end">
          {formatDate(chat.last_message.created_at)}
          </p>
          <p className="text-end">
            {/* {chat.lastMessageReaded ? (
              <CheckCheck className="text-primary h-4 w-4" />
            ) : (
              <div className="h-5 w-5 bg-red-500 flex rounded-full justify-center items-center text-xs">
                2
              </div>
            )} */}
          </p>
        </div>
      </div>
    );
  };



  export const GroupChatItem = ({ chat }: { chat: GroupchatRoomType }) => {
    return (
      <div className="w-full flex items-center hover:bg-muted p-3 px-4 cursor-pointer">
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
          {chat.last_message?.created_at && formatDate(chat.last_message.created_at)}
          </p>
          <p className="text-end">
            {/* {chat.lastMessageReaded ? (
              <CheckCheck className="text-primary h-4 w-4" />
            ) : (
              <div className="h-5 w-5 bg-red-500 flex rounded-full justify-center items-center text-xs">
                2
              </div>
            )} */}
          </p>
        </div>
      </div>
    );
  };


