"use server";

import { Workout } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function deleteWorkout(
  workoutId: number
): Promise<Workout[]> {
  try {
    const workouts: Workout[] = (await redis.get("workouts")) ?? [];
    const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
    await redis.set("workouts", updatedWorkouts);
    return updatedWorkouts;
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Failed to delete workout");
  }
}