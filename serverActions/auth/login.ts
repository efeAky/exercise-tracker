"use server";
import { User } from "@/types";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

const filePath = path.join(process.cwd(), "data", "users.json");
const JWT_SECRET = process.env.JWT_SECRET!; // Secret key for JWT

export async function loginAction(username: string, password: string) {
  const usersArr = JSON.parse(fs.readFileSync(filePath, "utf-8")) as User[];

  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  const user = usersArr.find((u) => u.username === username);

  let isMatch: boolean = false 

  if (user) {
    isMatch = await bcrypt.compare(password, user.hashedpassword);
  }

  if (!user || !isMatch) {
    throw new Error("Invalid username or password");
  }

  // Create JWT token with userId, expires in 1 hour
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  // Set HTTP-only cookie for authentication
  const cookieStore = await cookies();
  cookieStore.set("authToken", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/dashboard");
}
