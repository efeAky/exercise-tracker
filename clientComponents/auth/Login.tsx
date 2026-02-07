"use client";

import { useState } from "react";
import { loginAction } from "@/serverActions/auth/login";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!usernameInput || !passwordInput) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      await loginAction(usernameInput, passwordInput);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          placeholder="Enter username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          disabled={isLoading}
          className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-primary-content placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-full h-12 px-4 rounded-lg border-2 border-slate-300 dark:border-[#23482c] bg-transparent text-primary-content placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <button 
          type="submit"
          disabled={isLoading}
          className="btn-base bg-primary text-[#112215] font-extrabold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        {error && !isLoading && (
          <div className="text-red-500 dark:text-red-400 text-sm font-medium text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}