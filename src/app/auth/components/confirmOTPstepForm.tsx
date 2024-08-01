"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {registerFormOTPSchema} from "../schema/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {  Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRegisterFormStore } from "../stores/useRegisterFormStore";
import SubmitButton from "@/components/common/submitButton";


export const ConfirmOTPStepForm = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const nextStep = useRegisterFormStore((state) => state.nextStep);
  
    const form = useForm<z.infer<typeof registerFormOTPSchema>>({
      resolver: zodResolver(registerFormOTPSchema),
    });
  
    function onSubmit(values: z.infer<typeof registerFormOTPSchema>) {
      setIsLoading(true);
      console.log(values);
      setTimeout(() => {
        setIsLoading(false);
        nextStep();
      }, 1000);
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