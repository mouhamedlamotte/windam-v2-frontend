"use client"

import { z } from "zod"

export const loginFormSchema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
})

export const registerFormEmailSchema = z.object({
  email: z.string().email()
})

export const registerFormOTPSchema = z.object({
  otp: z.string().min(6).max(6)
})

export const registerFormPasswordSchema = z.object({
  password: z.string().min(6).max(50),
  confirmPassword: z.string().min(6).max(50)
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

export const registerFormOnboardingSchema = z.object({
  firstName :z.string().min(2).max(50),
  lastName :z.string().min(2).max(50),
  birth :z.date({
    required_error: "Date of Birth is required",
  }),
})