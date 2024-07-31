"use client"

import { z } from "zod"

export const loginFormSchema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(6).max(50),
})
