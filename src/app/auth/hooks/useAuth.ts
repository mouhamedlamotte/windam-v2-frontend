"use client";

import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../stores/useAuthStore";
import { User } from "../types";
import Axiosinstance from "@/lib/axios";
import { deleteCookie } from "cookies-next";

export const useAuth = () => {
    const login = useAuthStore(state => state.login);
    const logout = useAuthStore(state => state.logout);

    const { data: user, error, isLoading } = useQuery<User>({
        queryKey: ['me'],
        queryFn: async () =>{
          const res = await Axiosinstance.get('/auth/me/');
          return res.data;
        }
      })
    
    if (user) {
        login(user);
    }
    if (error){
      logout()
      deleteCookie('token')
    }
    return { user, error, isLoading };
};