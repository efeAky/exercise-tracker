"use server";

import { Workout, Exercise } from "@/types";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function editWorkout(
  workoutId: number,
  date: string,
  exercises: Exercise[]
): Promise<void> {
  try {
    const workouts: Workout[] = (await redis.get("workouts")) ?? [];

    const workoutIndex = workouts.findIndex((w) => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new Error("Workout not found");
    }

    workouts[workoutIndex].date = date;
    workouts[workoutIndex].exercises = exercises;

    await redis.set("workouts", workouts);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/summary");
  } catch (error) {
    console.error("Error editing workout:", error);
    throw new Error("Failed to edit workout");
  }
}