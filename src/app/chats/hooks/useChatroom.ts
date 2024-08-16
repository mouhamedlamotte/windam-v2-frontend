import Axiosinstance from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { ChatRoomType } from "../types/types"

const getChatroom = async (name:string) =>{
    const result = await Axiosinstance.get(`/messenger/chatroom/${name}/`)
    return result.data
}

export const useChatroom = () =>{
    return useMutation({
        mutationFn: getChatroom,
        onSuccess: (data) => {
          // Vous pouvez également gérer ce qui se passe après un succès ici
        },
        onError: (error) => {
          // Vous pouvez gérer les erreurs ici
        },
      });
}


