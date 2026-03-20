"use server";

import { Workout, Routine, Exercise } from "@/types";
import { redirect } from "next/navigation";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface EnterProgressParams {
  routine: Routine;
  date: string;
  exercises: Exercise[];
}

export default async function enterProgress({
  routine,
  date,
  exercises,
}: EnterProgressParams): Promise<void> {
  try {
    const workoutsArr: Workout[] = (await redis.get("workouts")) ?? [];

    const newWorkout: Workout = {
      id: Date.now(),
      routine,
      date: date,
      exercises,
    };

    workoutsArr.push(newWorkout);
    await redis.set("workouts", workoutsArr);
  } catch (error) {
    console.error("Error saving workout:", error);
    throw new Error("Failed to save workout");
  }
  redirect("/dashboard/progress");
}