"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../schema/formSchama';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

import { useMutation } from '@tanstack/react-query';
import Axiosinstance from '@/lib/axios';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast'


const LoginForm = () => {
    const router = useRouter();
    const {toast} = useToast();
    const queryParams = useSearchParams();
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const nextUrl = queryParams.get('next') ?? '/';


    const mutation = useMutation<{ access: string }, unknown, { username: string; password: string }>({
      mutationFn: async ({ username, password }) => {
        const res = await Axiosinstance.post('/auth/token/', { username, password });
        return res.data;
      },
      onSuccess: (data) => {
        setIsLoading(false);
        setCookie('token', data.access);
        router.replace(nextUrl);
      },
      onError: (error) => {
        setIsLoading(false);
        console.error('Error logging in:', error);
        toast({
          title: 'Error',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
      }
    });




    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      })

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true);
        mutation.mutate(values);
      }

    
    

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className='relative'>
                <div>
                <Input 
                autoComplete='off'
                formNoValidate 
                type={showPassword ? "text" : "password"} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" 
                {...field} />
                <Button type='button' variant="link" className='absolute right-0 top-0 text-foreground' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} /> }
                </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin text-foreground" /> : "Login"}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm