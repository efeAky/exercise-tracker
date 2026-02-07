"use server";

import fs from "fs";
import path from "path";
import { Workout } from "@/types";

const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

export default async function deleteWorkout(
  workoutId: number
): Promise<Workout[]> {
  try {
    if (!fs.existsSync(workoutsFilePath)) {
      throw new Error("No workouts found");
    }

    const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
    const workouts: Workout[] = JSON.parse(workoutsJson);
    const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);

    fs.writeFileSync(
      workoutsFilePath,
      JSON.stringify(updatedWorkouts, null, 2)
    );
    
    return updatedWorkouts;
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Failed to delete workout");
  }
}
