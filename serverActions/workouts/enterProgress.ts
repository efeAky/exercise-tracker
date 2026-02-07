"use server";

import { Workout, Routine, Exercise } from "@/types";
import { redirect } from "next/navigation"; 
import fs from "fs";
import path from "path";

const workoutsFilePath = path.join(process.cwd(), "data", "workouts.json");

interface EnterProgressParams {
  routine: Routine;
  date: string;
  exercises: Exercise[];
}

export default async function enterProgress({
  routine,
  date,
  exercises,
}: EnterProgressParams): Promise<void> {
  try {

    const workoutsJson = fs.readFileSync(workoutsFilePath, "utf-8");
    const workoutsArr = JSON.parse(workoutsJson);

    // Create a new workout object
    const newWorkout: Workout = {
      id: Date.now(),
      routine,
      date: date,
      exercises,
    };

    workoutsArr.push(newWorkout);
    fs.writeFileSync(workoutsFilePath, JSON.stringify(workoutsArr, null, 2));
  } catch (error) {
    console.error("Error saving workout:", error);
    throw new Error("Failed to save workout");
  }
  redirect("/dashboard/progress")
}
