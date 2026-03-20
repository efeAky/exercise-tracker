"use server";
import { User } from "@/types";
import { Redis } from "@upstash/redis";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const JWT_SECRET = process.env.JWT_SECRET!;

export async function loginAction(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  const usersArr: User[] = (await redis.get("users")) ?? [];

  const user = usersArr.find((u) => u.username === username);

  let isMatch: boolean = false;

  if (user) {
    isMatch = await bcrypt.compare(password, user.hashedpassword);
  }

  if (!user || !isMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  const cookieStore = await cookies();
  cookieStore.set("authToken", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/dashboard");
}