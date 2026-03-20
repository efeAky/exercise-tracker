"use server";
import { Routine, Exercise } from "@/types";
import { redirect } from "next/navigation";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function editRoutineAction(
  userId: number,
  routineId: number,
  routinename: string,
  exercises: Exercise[]
): Promise<void> {
  if (!routinename?.trim() || exercises.length === 0) {
    throw new Error("All inputs must be provided");
  }

  const routinesArr: Routine[] = (await redis.get("routines")) ?? [];

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
  await redis.set("routines", routinesArr);

  redirect("/dashboard/routines");
}