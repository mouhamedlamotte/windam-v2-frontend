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
import { registerFormEmailSchema } from "../schema/formSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import SubmitButton from "@/components/common/submitButton";

export const RegisterEmailStepForm = () => {
    const [isLoading, setIsLoading] = useState(false);
  
    const nextStep = useRegisterFormStore((state) => state.nextStep);
  
    const form = useForm<z.infer<typeof registerFormEmailSchema>>({
      resolver: zodResolver(registerFormEmailSchema),
      defaultValues: {
        email: "",
      },
    });
    function onSubmit(values: z.infer<typeof registerFormEmailSchema>) {
      setIsLoading(true);
      console.log(values);
      setTimeout(() => {
        setIsLoading(false);
        nextStep();
      }, 1000);
    }
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <SubmitButton title="Confirm Enail" isLoading={isLoading} />
        </form>
      </Form>
    );
  };