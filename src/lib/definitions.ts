import { z } from "zod"

export const SignupFormSchema = z.object({
  username: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })

    .trim()
})

export const SignInFromSchema = z.object({
  username: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }).trim()
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const aboutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["man", "woman"], {
    required_error: "Please select a gender"
  }),
  birthday: z.string({
    required_error: "Please select a date of birth"
  }),
  horoscope: z.string(),
  zodiac: z.string(),
  height: z
    .number()
    .min(100, "Height must be at least 100cm")
    .max(300, "Height must be less than 300cm"),
  weight: z
    .number()
    .min(30, "Weight must be at least 30kg")
    .max(300, "Weight must be less than 300kg"),
  image: z.string().optional()
})

export type AboutFormValues = z.infer<typeof aboutFormSchema>
