"use server";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { User } from "@/types";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function signupAction(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  const usersArr = JSON.parse(fs.readFileSync(filePath, "utf-8")) as User[];

  if (usersArr.find((u) => u.username === username)) {
    throw new Error("Username already taken");
  }

  if (password.length < 8) {
    throw new Error("Password must contain minimum 8 characters");
  } 
  else if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  } 
  else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
   throw new Error("Password must contain at least one special character");
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  usersArr.push({ id: Date.now(), username, hashedpassword });
  fs.writeFileSync(filePath, JSON.stringify(usersArr, null, 2));

  redirect("/"); // Redirect after successful signup
}
