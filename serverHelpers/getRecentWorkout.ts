import { Workout } from "@/types";
import fs from "fs";
import path from "path";

const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

// Return the most recent workout for a given user, or null if none exist
export async function getRecentWorkout(userId: number): Promise<Workout | null> {
  try {
    if (!fs.existsSync(workoutsFilePath)) {
      return null;
    }

    const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
    const workouts: Workout[] = workoutsJson.trim() ? JSON.parse(workoutsJson) : [];
    
    const userWorkouts = workouts
      .filter((w) => w.routine.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return userWorkouts[0] || null;
  } catch (error) {
    console.error("Error fetching recent workout:", error);
    return null;
  }
}