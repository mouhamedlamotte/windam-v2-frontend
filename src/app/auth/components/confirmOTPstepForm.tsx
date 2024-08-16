"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerFormOTPSchema } from "../schema/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRegisterFormStore } from "../stores/useRegisterFormStore";
import SubmitButton from "@/components/common/submitButton";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "@/lib/axios";
import { User } from "../types";

export const ConfirmOTPStepForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const pk = useRegisterFormStore((state) => state.userInfo?.pk);
  const otp = useRegisterFormStore((state) => state.userInfo?.otp);
  const nextStep = useRegisterFormStore((state) => state.nextStep);

  const upDateUserMuation = useMutation<
    User,
    unknown,
    { pk: number | undefined }
  >({
    mutationFn: async ({ pk }) => {
      const res = await Axiosinstance.put(`/users/${pk}/`, {
        is_email_verified: true,
      });
      return res.data;
    },
    onSuccess: () => {
      nextStep();
    },
    onError: (error) => {
      setIsLoading(false);
     
      toast({
        title: "Error",
        description: "Error updating user",
        variant: "destructive",
      });
    },
  });

  const verifyOTPMutation = useMutation<unknown, unknown, { otp_code: string }>(
    {
      mutationFn: async ({ otp_code }) => {
        const res = await Axiosinstance.post("/auth/verify-otp/", { otp_code });
        return res.data;
      },
      onSuccess: () => {
        upDateUserMuation.mutate({ pk: pk });
      },
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Error verifying OTP",
          variant: "destructive",
        });
      },
    }
  );
  const form = useForm<z.infer<typeof registerFormOTPSchema>>({
    resolver: zodResolver(registerFormOTPSchema),
  });

  function onSubmit(values: z.infer<typeof registerFormOTPSchema>) {
    if (values.otp !== otp) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Invalid OTP",
        variant: "destructive",
      });
    }

    verifyOTPMutation.mutate({ otp_code: values.otp });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className=" w-full flex flex-col  items-center justify-start">
              <FormControl className="w-full">
                <InputOTP
                  className="w-full"
                  maxLength={6}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage className="text-start" />
            </FormItem>
          )}
        />
        <SubmitButton title="Confirm OPT" isLoading={isLoading} />
      </form>
    </Form>
  );
};
