"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleEllipsis, Info, Lock, Phone, UserPlus2 } from "lucide-react";
import { ChatRoomType, ChatroomMessageType } from "../types/types";
import useAuthStore from "@/app/auth/stores/useAuthStore";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { UserType } from "@/app/profile/types";

import { CopyBlock, dracula } from "react-code-blocks";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chatroom = () => {
  const { user } = useAuthStore();

  console.table(user);

  const chatroom: ChatRoomType = {
    chats : [
      {
        pk: 2,
        sender: {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "code",
        file: "",
        content: `from django.db import models
    import shortuuid
    from accounts.models import User
    
    # Create your models here.
    
    class ChatRoom(models.Model):
        name = models.CharField(max_length=255, unique=True, default=shortuuid.uuid)
        created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chatrooms_created_by')
        group_name = models.CharField(max_length=255, blank=True)
        private = models.BooleanField(default=False)
        members = models.ManyToManyField(User, related_name='chatrooms_members', blank=True)
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
        last_message = models.JSONField(null=True, blank=True)
        last_message_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='last_message_by', null=True, blank=True)
        def __str__(self):
            return self.name`,
        seen: false,
        created_at: "2024-07-28T17:01:02.844780Z",
      },
      {
        pk: 1,
        sender: {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Tu as implemente le chatroom ?",
        seen: false,
        created_at: "2024-07-28T16:38:39.348686Z",
      },
      {
        pk: 3,
        sender: {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Oui, tu peut jeter un coud d'oeuil su le model django",
        seen: false,
        created_at: "2024-07-28T16:38:39.348686Z",
      },
      {
        pk: 4,
        sender: {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Il a l'air bien. Tu as prévu des fonctionnalités supplémentaires comme les notifications ou la recherche dans les messages ? 🛠️",
        seen: false,
        created_at: "2024-07-28T17:15:22.123456Z",
      },
      {
        pk: 5,
        sender: {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Pas encore, mais c'est une bonne idée ! 🤔 Pour les notifications, je pensais utiliser Django Channels pour gérer le temps réel. 📩 Pour la recherche, on pourrait utiliser le champ `search` de Django. Tu as des suggestions spécifiques ?",
        seen: false,
        created_at: "2024-07-28T17:20:55.789101Z",
      },
      {
        pk: 6,
        sender: {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Ça semble parfait ! 👍 Ça pourrait être utile d'ajouter des fonctionnalités de filtrage des messages par date ou par utilisateur. Pour les notifications, une classe `Notification` pourrait être ajoutée pour gérer les notifications des nouveaux messages. 💬",
        seen: false,
        created_at: "2024-07-28T17:25:10.234567Z",
      },
      {
        pk: 7,
        sender: {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "code",
        file: "",
        content: `from django.db import models
    
    class Notification(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
        message = models.TextField()
        read = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_now_add=True)
    
        def __str__(self):
            return \`Notification for \${self.user.username} in chatroom \${self.chatroom.name}\``,
        seen: false,
        created_at: "2024-07-28T17:30:00.987654Z",
      },
      {
        pk: 8,
        sender: {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Super ajout ! Pour les filtres, on pourrait ajouter des champs de date et d'utilisateur dans le modèle `Message`. Voilà un exemple de code pour le modèle `Message` avec ces filtres :",
        seen: false,
        created_at: "2024-07-28T17:35:45.345678Z",
      },
      {
        pk: 9,
        sender: {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "code",
        file: "",
        content: `from django.db import models
    from accounts.models import User
    from chatrooms.models import ChatRoom
    
    class Message(models.Model):
        chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
        sender = models.ForeignKey(User, on_delete=models.CASCADE)
        content = models.TextField()
        created_at = models.DateTimeField(auto_now_add=True)
        updated_at = models.DateTimeField(auto_now=True)
    
        class Meta:
            indexes = [models.Index(fields=['created_at'])]
    
        def __str__(self):
            return \`\${self.sender.username}: \${self.content[:50]}\``,
        seen: false,
        created_at: "2024-07-28T17:40:22.456789Z",
      },
      {
        pk: 10,
        sender: {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        type: "text",
        file: "",
        content: "Top ! 👍 Avec cette approche, on pourra facilement filtrer les messages par date et utilisateur. Merci pour les conseils, ça rendra le projet encore plus robuste ! Si tu as d'autres idées ou questions, fais-le moi savoir. 🙌",
        seen: false,
        created_at: "2024-07-28T17:45:33.567890Z",
      }
    ],
    chatroom: {
      pk: 4,
      name: "aQoJV7HKsKm2uch5hfujsx",
      created_by: {
        pk: 3,
        username: "baba",
        first_name: "",
        last_name: "",
        email: "",
      },
      last_message_by: {
        pk: 2,
        username: "mouhamed",
        first_name: "",
        last_name: "",
        email: "",
      },
      last_message: {
        type: "text",
        content: "hi everyone",
        created_at: "2024-07-28T14:43:20.837699Z",
      },
      group_name: "Odc Dev Team",
      members: [
        {
          pk: 2,
          username: "mouhamed",
          first_name: "",
          last_name: "",
          email: "",
        },
        {
          pk: 3,
          username: "baba",
          first_name: "",
          last_name: "",
          email: "",
        },
      ],
      created_at: "2024-07-28T15:57:37.925070Z",
      private: true,
    },
  };

    const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatroom]);
  return (
    <div className="w-5/6 flex flex-col justify-between">
      <div className="w-full px-8 py-4 flex">
        {chatroom.chatroom.private ? (
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {
                  chatroom.chatroom.members.filter(
                    (member) => member.pk !== user?.pk
                  )[0].username[0]
                }
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">
                {
                  chatroom.chatroom.members.filter(
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
              <AvatarFallback>{chatroom.chatroom.group_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{chatroom.chatroom.group_name}</h4>
              <p className="text-sm text-muted-foreground">
                {chatroom.chatroom.members
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
            {chatroom.chatroom.private ? (
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
                      {chatroom.chatroom.group_name[0]}{" "}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    Groupe &#8226; Cree le{" "}
                    {formatDate(chatroom.chatroom.created_at)} par{" "}
                    {chatroom.chatroom.created_by.username}
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
            {chatroom.chats.map((message) => (
              <ChatMessage key={message.pk} message={message} user={user} />
            ))}
          </div>
          {/* =<div ref={messageEndRef}/> */}
        </ScrollArea>
      </div>
      <div className="w-full px-6 py-4 border-t">
        <form action="">
          <Input placeholder="Type your message here" />
        </form>
      </div>
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
              "bg-muted max-w-xl",
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
    <div className="text-sm  rounded-md p-2 bg-background">
      <CopyBlock language="py" text={children} theme={dracula} codeBlock />
    </div>
  );
};
