"use server";
import { Routine, Workout } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function deleteRoutine(routineId: number): Promise<void> {
  try {
    const routines: Routine[] = (await redis.get("routines")) ?? [];
    const updatedRoutines = routines.filter((r) => r.id !== routineId);
    await redis.set("routines", updatedRoutines);

    const workouts: Workout[] = (await redis.get("workouts")) ?? [];
    const updatedWorkouts = workouts.filter((w) => w.routine.id !== routineId);
    await redis.set("workouts", updatedWorkouts);
  } catch (error) {
    console.error("Error deleting routine and associated workouts:", error);
    throw new Error("Failed to delete routine");
  }
}