"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getUserIdFromCookie(): Promise<number> {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number | string };
    return typeof decoded.userId === "string" ? parseInt(decoded.userId, 10) : decoded.userId;
  } catch (error) {
    // Token is invalid or expired, redirect to login
    redirect("/auth/login");
  }
}