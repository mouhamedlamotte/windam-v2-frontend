import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRegisterFormStore } from "../stores/useRegisterFormStore";
import { useForm } from "react-hook-form";
import { registerFormOnboardingSchema } from "../schema/formSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDaysIcon } from "lucide-react";
import SubmitButton from "@/components/common/submitButton";
import { useMutation } from "@tanstack/react-query";
import Axiosinstance from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";



export const OnBoardingStepForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const pk = useRegisterFormStore((state) => state.userInfo?.pk);
  
    const form = useForm<z.infer<typeof registerFormOnboardingSchema>>({
      resolver: zodResolver(registerFormOnboardingSchema),
    });

    const mutation = useMutation({
      mutationFn: async () => {
        const res = await Axiosinstance.put(`/users/${pk}/`, {
          first_name: form.getValues("firstName"),
          last_name: form.getValues("lastName"),
        });
        return res.data;
      },
      onSuccess: () => {
        toast({
          title: "Success",
          description: "User created successfully",
        })
        window.location.href = "/"
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
  
    function onSubmit(values: z.infer<typeof registerFormOnboardingSchema>) {
      setIsLoading(true);
      mutation.mutate();
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl className="relative">
                  <div>
                    <Input
                      autoComplete="off"
                      formNoValidate
                      placeholder="your lastname"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
            <SubmitButton title='Enrigister' isLoading={isLoading} />
        </form>
      </Form>
    );
  };