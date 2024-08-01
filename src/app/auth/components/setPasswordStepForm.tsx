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

export const SetPasswordStepForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
  
    const nextStep = useRegisterFormStore((state) => state.nextStep);
  
    const form = useForm<z.infer<typeof registerFormPasswordSchema>>({
      resolver: zodResolver(registerFormPasswordSchema),
    });
  
    function onSubmit(values: z.infer<typeof registerFormPasswordSchema>) {
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
              "Confirm Email"
            )}
          </Button>
        </form>
      </Form>
    );
  };