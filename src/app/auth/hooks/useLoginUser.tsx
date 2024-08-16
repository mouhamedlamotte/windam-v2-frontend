import Axiosinstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

export const useLoginUser = () => {
    const loginUser = useMutation<{ access: string }, unknown, { username: string | undefined; password: string | undefined}>({
        mutationFn: async ({ username, password }) => {
          const res = await Axiosinstance.post('/auth/token/', { username, password });
          return res.data;
        },
        onSuccess: (data) => {
          setCookie('token', data.access);
        },
      });

    return loginUser
}