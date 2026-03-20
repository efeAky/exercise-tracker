"use server";
import { Routine } from "@/types";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getRoutineAction(): Promise<Routine[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  let userId: number;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    userId = parseInt(decoded.userId, 10);
  } catch (error) {
    console.error("Invalid token:", error);
    redirect("/auth/login");
  }

  const routinesArr: Routine[] = (await redis.get("routines")) ?? [];

  const userRoutines = routinesArr.filter((r) => r.userId === userId);

  return userRoutines;
}