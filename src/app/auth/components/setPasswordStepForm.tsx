import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRegisterFormStore } from "../stores/useRegisterFormStore";
import { useForm } from "react-hook-form";
import { registerFormPasswordSchema } from "../schema/formSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import Axiosinstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { PublicUserType } from "@/app/profile/types/types";
import { useLoginUser } from "../hooks/useLoginUser";


export const SetPasswordStepForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const loginUser =useLoginUser()
  const userInfo = useRegisterFormStore((state) => state.userInfo);

  const setUserInfo = useRegisterFormStore((state) => state.setUserInfo);

  const nextStep = useRegisterFormStore((state) => state.nextStep);

  const SendOTPMuation = useMutation<
    { otp_code: string },
    unknown,
    { email: string | undefined }
  >({
    mutationFn: async ({ email }) => {
      const res = await Axiosinstance.post("/auth/send-otp/", { email: email });
      return res.data;
    },
    onSuccess: (data) => {
      setUserInfo({ ...userInfo, otp: data.otp_code });
      loginUser.mutate({ username: userInfo?.email, password: userInfo?.password })
      nextStep();
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Error creating user",
        variant: "destructive",
      });
    },
  });

  const createUserMutation = useMutation<
    PublicUserType,
    unknown,
    { email: string | undefined; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const data = {
        username: email,
        email: email,
        password: password,
      };
      const res = await Axiosinstance.post("/auth/register/", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUserInfo({ ...userInfo, pk: data.pk });
      SendOTPMuation.mutate({ email: userInfo?.email });
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Error creating user",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof registerFormPasswordSchema>>({
    resolver: zodResolver(registerFormPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerFormPasswordSchema>) {
    setIsLoading(true);
    setUserInfo({ ...userInfo, password: values.password });
    createUserMutation.mutate({
      email: userInfo?.email,
      password: values.password,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    autoComplete="off"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="link"
                    className="absolute right-0 top-0 text-foreground"
                    onClick={() => setShowPassword1(!showPassword1)}
                  >
                    {showPassword1 ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    autoComplete="off"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="link"
                    className="absolute right-0 top-0 text-foreground"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {showPassword2 ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader className="animate-spin text-foreground" />
          ) : (
            "Next"
          )}
        </Button>
      </form>
    </Form>
  );
};
