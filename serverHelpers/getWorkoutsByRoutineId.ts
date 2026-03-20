import { Workout } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getWorkoutsByRoutineId(
  routineId: number
): Promise<Workout[]> {
  try {
    const workouts: Workout[] = (await redis.get("workouts")) ?? [];

    return workouts
      .filter((w) => w.routine.id === routineId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}