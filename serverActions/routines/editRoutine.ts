"use server";
import { Routine, Exercise } from "@/types";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "routines.json");

export default async function editRoutineAction(
  userId: number,
  routineId: number,
  routinename: string,
  exercises: Exercise[]
): Promise<void> {
  if (!routinename?.trim() || exercises.length === 0) {
    throw new Error("All inputs must be provided");
  }

  const routinesJson = fs.readFileSync(filePath, "utf-8");
  const routinesArr = JSON.parse(routinesJson) as Routine[];

  // Find routine by ID and user
  const index = routinesArr.findIndex(
    (r) => r.id === routineId && r.userId === userId
  );
  if (index === -1) throw new Error("Routine not found or unauthorized");

  const editedRoutine: Routine = {
    id: routineId,
    routinename: routinename.trim(),
    exercises,
    userId: userId,
  };

  routinesArr[index] = editedRoutine;
  fs.writeFileSync(filePath, JSON.stringify(routinesArr, null, 2));

  redirect("/dashboard/routines");
}
