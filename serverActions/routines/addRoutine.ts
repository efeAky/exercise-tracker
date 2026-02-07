"use server";
import { Routine, Exercise } from "@/types";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation"; 

const filePath = path.join(process.cwd(), "data", "routines.json");

export default async function addRoutineAction(
  userId: number,
  routinename: string,
  exercises: Exercise[]
): Promise<void> { 
  if (!routinename?.trim() || exercises.length === 0) {
    throw new Error("All inputs must be provided");
  }

  const routinesJson = fs.readFileSync(filePath, "utf-8");
  const routinesArr = JSON.parse(routinesJson) as Routine[];

  const newRoutine: Routine = {
    id: Date.now(),
    routinename: routinename.trim(),
    exercises,
    userId,
  };

  routinesArr.push(newRoutine);
  fs.writeFileSync(filePath, JSON.stringify(routinesArr, null, 2));

  redirect("/dashboard/routines"); 
}
