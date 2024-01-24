import { number, object, string } from "yup";

export const RegisterSchema = object({
  name: string().required().label("Full name").min(2).max(50),
  email: string().required().label("Email").email(),
  password: string().required().label("Password").min(8).max(50),
});

export const LoginSchema = object({
  email: string().required().label("Email").email(),
  password: string().required().label("Password").min(8).max(50),
});

export const ForgotPasswordSchema = object({
  email: string().required().label("Email").email(),
});

export const PetSchema = object({
  id: string().nullable().label("ID"),
  name: string().required().label("Pet name").min(2).max(50),
  age: number().required().label("Pet age").min(0).max(50).typeError("Age must be a number"),
  createdAt: string().nullable().label("Created at"),
  updatedAt: string().nullable().label("Updated at"),
  userId: string().nullable().label("User ID"),
});
