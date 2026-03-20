"use server";
import { Routine, Exercise } from "@/types";
import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function addRoutineAction(
  userId: number,
  routinename: string,
  exercises: Exercise[]
): Promise<void> {
  if (!routinename?.trim() || exercises.length === 0) {
    throw new Error("All inputs must be provided");
  }

  const routinesArr: Routine[] = (await redis.get("routines")) ?? [];

  const newRoutine: Routine = {
    id: Date.now(),
    routinename: routinename.trim(),
    exercises,
    userId,
  };

  routinesArr.push(newRoutine);
  await redis.set("routines", routinesArr);

  redirect("/dashboard/routines");
}