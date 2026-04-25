"use server";

import { login } from "@/lib/auth";

export async function handleLoginAction(password: string) {
  return await login(password);
}
