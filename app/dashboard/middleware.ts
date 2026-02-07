export const runtime = "nodejs"; // Middleware runs on Node.js

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // Secret key for JWT verification

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect if missing
  }

  try {
    jwt.verify(token, JWT_SECRET); // Verify JWT
    return NextResponse.next(); // Allow request if token valid
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect if invalid/expired
  }
}
