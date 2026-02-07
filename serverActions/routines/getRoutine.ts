"use server";
import { Routine } from "@/types";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const filePath = path.join(process.cwd(), "data", "routines.json");
const JWT_SECRET = process.env.JWT_SECRET!;

export async function getRoutineAction(): Promise<Routine[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  let userId: number;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    userId = parseInt(decoded.userId, 10);
  } catch (error) {
    console.error("Invalid token:", error);
    redirect("/auth/login");
  }

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const routinesJson = fs.readFileSync(filePath, "utf-8");
  const routinesArr = JSON.parse(routinesJson) as Routine[];

  const userRoutines = routinesArr.filter((r) => r.userId === userId);

  return userRoutines;
}