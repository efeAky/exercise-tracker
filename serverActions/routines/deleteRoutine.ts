"use server";

import fs from "fs";
import path from "path";
import { Routine, Workout } from "@/types";

const routinesFilePath = path.join(process.cwd(), "data", "routines.json");
const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

export default async function deleteRoutine(routineId: number): Promise<void> {
  try {
    // Delete the routine
    const routinesJson = fs.readFileSync(routinesFilePath, "utf-8");
    const routines: Routine[] = JSON.parse(routinesJson);
    const updatedRoutines = routines.filter((r) => r.id !== routineId);
    fs.writeFileSync(routinesFilePath, JSON.stringify(updatedRoutines, null, 2));

    // Delete all workouts associated with this routine
    if (fs.existsSync(workoutsFilePath)) {
      const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
      const workouts: Workout[] = workoutsJson.trim() ? JSON.parse(workoutsJson) : [];
      const updatedWorkouts = workouts.filter((w) => w.routine.id !== routineId);
      fs.writeFileSync(workoutsFilePath, JSON.stringify(updatedWorkouts, null, 2));
    }
  } catch (error) {
    console.error("Error deleting routine and associated workouts:", error);
    throw new Error("Failed to delete routine");
  }
}