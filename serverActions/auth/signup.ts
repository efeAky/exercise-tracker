"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { User } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function signupAction(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  const usersArr: User[] = (await redis.get("users")) ?? [];

  if (usersArr.find((u) => u.username === username)) {
    throw new Error("Username already taken");
  }

  if (password.length < 8) {
    throw new Error("Password must contain minimum 8 characters");
  } 
  else if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  } 
  else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
    throw new Error("Password must contain at least one special character");
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  usersArr.push({ id: Date.now(), username, hashedpassword });
  await redis.set("users", usersArr);

  redirect("/");
}