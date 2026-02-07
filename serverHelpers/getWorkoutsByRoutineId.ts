import { Workout } from "@/types";
import fs from "fs";
import path from "path";

const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

export async function getWorkoutsByRoutineId(
  routineId: number
): Promise<Workout[]> {
  try {
    if (!fs.existsSync(workoutsFilePath)) {
      return [];
    }

    const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
    const workouts: Workout[] = workoutsJson.trim() ? JSON.parse(workoutsJson) : [];
    
    // Filter workouts by routine ID and sort by date (most recent first)
    return workouts
      .filter((w) => w.routine.id === routineId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}