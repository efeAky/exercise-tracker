import { Workout } from "@/types";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getRecentWorkout(userId: number): Promise<Workout | null> {
  try {
    const workouts: Workout[] = (await redis.get("workouts")) ?? [];

    const userWorkouts = workouts
      .filter((w) => w.routine.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userWorkouts[0] || null;
  } catch (error) {
    console.error("Error fetching recent workout:", error);
    return null;
  }
}