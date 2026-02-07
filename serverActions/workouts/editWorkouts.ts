"use server";

import { Workout, Exercise } from "@/types";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

export default async function editWorkout(
  workoutId: number,
  date: string,
  exercises: Exercise[]
): Promise<void> {
  try {
    if (!fs.existsSync(workoutsFilePath)) {
      throw new Error("No workouts found");
    }

    const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
    const workouts: Workout[] = JSON.parse(workoutsJson);
    
    const workoutIndex = workouts.findIndex((w) => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new Error("Workout not found");
    }

    // Update the workout with new date and exercises
    workouts[workoutIndex].date = date; // Store date as "YYYY-MM-DD"
    workouts[workoutIndex].exercises = exercises;

    // Save updated workouts to file
    fs.writeFileSync(workoutsFilePath, JSON.stringify(workouts, null, 2));
    
    // Revalidate pages that depend on workout data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/summary");
  } catch (error) {
    console.error("Error editing workout:", error);
    throw new Error("Failed to edit workout");
  }
}
